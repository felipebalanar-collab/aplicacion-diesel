import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth-middleware';
import {
  parseCSVCalibration,
  parseJSONCalibration,
  JSONCalibrationImport,
} from '@/lib/bulk-import';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const auth = await requirePermission(request, 'upload_calibration');
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const format = formData.get('format') as string; // 'csv' or 'json'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!['csv', 'json'].includes(format)) {
      return NextResponse.json(
        { error: 'Format must be "csv" or "json"' },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();

    // Parse based on format
    let parseResult;
    if (format === 'csv') {
      parseResult = parseCSVCalibration(content);
    } else {
      parseResult = parseJSONCalibration(content);
    }

    // If parsing failed, return early
    if (!parseResult.success && parseResult.errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'File parsing failed',
          errors: parseResult.errors,
          warnings: parseResult.warnings,
        },
        { status: 400 }
      );
    }

    // Return parsed data for user verification
    return NextResponse.json({
      success: true,
      totalRecords: parseResult.totalRecords,
      importedGroups: parseResult.importedGroups,
      data: parseResult.data,
      warnings: parseResult.warnings,
      message: 'Please review data and confirm import',
    });
  } catch (error) {
    console.error('Bulk import parse error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}
