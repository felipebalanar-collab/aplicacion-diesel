import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth-middleware';
import { JSONCalibrationImport } from '@/lib/bulk-import';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const auth = await requirePermission(request, 'upload_calibration');
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { calibrations, overwrite = false } = body;

    if (!Array.isArray(calibrations) || calibrations.length === 0) {
      return NextResponse.json(
        { error: 'Invalid calibrations data' },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    for (const cal of calibrations) {
      try {
        const { injectorNumber, injectorBrand, data } = cal as JSONCalibrationImport;

        if (!injectorNumber || !Array.isArray(data) || data.length === 0) {
          errors.push(`Skipped: Invalid calibration for ${injectorNumber}`);
          continue;
        }

        // Find or create injector
        let injector = await prisma.injector.findUnique({
          where: { number: injectorNumber },
        });

        if (!injector) {
          const numberParts = injectorNumber.split('-').map(s => s.trim());
          const brand = injectorBrand || numberParts[0] || 'UNKNOWN';

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

        // Delete existing calibration if overwrite is true
        if (overwrite) {
          await prisma.caudalTable.deleteMany({
            where: { injectorId: injector.id },
          });
        }

        // Import records
        const importedCount = await prisma.caudalTable.createMany({
          data: data.map(record => ({
            injectorId: injector.id,
            pressure: record.pressure,
            rpm: record.rpm,
            pulse: record.pulse,
            normal: record.normal,
            normalDelta: record.normalDelta,
            real: record.real,
            matchingTime: record.matchingTime || 150,
          })),
        });

        results.push({
          injectorNumber,
          recordsImported: importedCount.count,
          status: 'success',
        });
      } catch (err) {
        errors.push(
          `Error importing ${cal.injectorNumber}: ${err instanceof Error ? err.message : 'Unknown error'}`
        );
      }
    }

    const totalRecords = results.reduce((sum, r) => sum + (r.recordsImported || 0), 0);

    return NextResponse.json({
      success: errors.length === 0,
      message: `Successfully imported ${totalRecords} records from ${results.length} injectors`,
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Bulk import confirm error:', error);
    return NextResponse.json(
      { error: 'Failed to import calibrations' },
      { status: 500 }
    );
  }
}
