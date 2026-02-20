import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth-middleware';
import { PrismaClient } from '@prisma/client';
import { validateCaudaltableData, CaudaltableData } from '@/lib/ocr-calibration';

const prisma = new PrismaClient();

interface ImportRequest {
  injectorNumber: string;
  data: CaudaltableData[];
  overwrite?: boolean;
}

export async function POST(request: Request) {
  try {
    const auth = await requirePermission(request, 'upload_calibration');
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body: ImportRequest = await request.json();
    const { injectorNumber, data, overwrite = false } = body;

    if (!injectorNumber || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Validate data
    const validation = validateCaudaltableData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    // Find or create injector
    let injector = await prisma.injector.findUnique({
      where: { number: injectorNumber },
    });

    if (!injector) {
      // Try to extract brand and family from number
      const numberParts = injectorNumber.split('-').map(s => s.trim());
      const brand = numberParts[0] || 'UNKNOWN';
      
      injector = await prisma.injector.create({
        data: {
          number: injectorNumber,
          brand,
          family: numberParts[1] || undefined,
          category: 'inyector',
          fuelType: 'diesel',
        },
      });
    }

    // Delete existing calibration data if overwrite is true
    if (overwrite) {
      await prisma.caudalTable.deleteMany({
        where: { injectorId: injector.id },
      });
    }

    // Import calibration data
    const importedRecords = await Promise.all(
      data.map(record =>
        prisma.caudalTable.create({
          data: {
            injectorId: injector.id,
            pressure: record.pressure,
            rpm: record.rpm,
            pulse: record.pulse,
            normal: record.normal,
            normalDelta: record.normalDelta,
            real: record.real,
            matchingTime: record.matchingTime || 150,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${importedRecords.length} calibration records`,
      injectorId: injector.id,
      injectorNumber: injector.number,
      recordsCount: importedRecords.length,
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to import calibration data' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const auth = await requirePermission(request, 'view_calibration');
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Get import history (from logs or created records)
    const recentCalibrations = await prisma.caudalTable.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { injector: true },
    });

    return NextResponse.json({
      recentImports: recentCalibrations.map(cal => ({
        id: cal.id,
        injectorNumber: cal.injector.number,
        injectorBrand: cal.injector.brand,
        importedAt: cal.createdAt,
        pressure: cal.pressure,
        rpm: cal.rpm,
      })),
    });
  } catch (error) {
    console.error('Error fetching import history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
