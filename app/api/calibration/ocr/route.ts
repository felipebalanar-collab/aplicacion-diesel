import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth-middleware';
import { processCalibrationTableOCR, validateCaudaltableData } from '@/lib/ocr-calibration';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const auth = await requirePermission(request, 'upload_calibration');
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save image to temp folder for backup (optional)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'calibration-images');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      const savedImagePath = path.join(uploadsDir, `${Date.now()}-${imageFile.name}`);
      await fs.writeFile(savedImagePath, buffer);
    } catch (saveError) {
      console.warn('Failed to save image backup:', saveError);
      // Continue even if save fails
    }

    // Process OCR
    const ocrResult = await processCalibrationTableOCR(buffer, {
      preprocess: true,
      confidence: 0.6,
    });

    if (!ocrResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: ocrResult.error,
          text: ocrResult.text, // For debugging
          warning: ocrResult.warning,
        },
        { status: 400 }
      );
    }

    // Validate extracted data
    const validation = validateCaudaltableData(ocrResult.data!);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
          data: ocrResult.data, // Return data for manual correction
          warning: ocrResult.warning,
        },
        { status: 400 }
      );
    }

    // Return OCR results for user verification before inserting to DB
    return NextResponse.json({
      success: true,
      injectorNumber: ocrResult.injectorNumber,
      data: ocrResult.data,
      recordCount: ocrResult.data!.length,
      confidence: ocrResult.confidence,
      warning: ocrResult.warning,
      message: 'Please review data and confirm before importing',
    });
  } catch (error) {
    console.error('OCR processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
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

    // List uploaded calibration images
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'calibration-images');
    
    let files: string[] = [];
    try {
      files = await fs.readdir(uploadsDir);
    } catch (err) {
      // Directory might not exist yet
      files = [];
    }

    return NextResponse.json({
      uploadedImages: files.map(file => ({
        filename: file,
        url: `/uploads/calibration-images/${file}`,
      })),
      count: files.length,
    });
  } catch (error) {
    console.error('Error listing uploads:', error);
    return NextResponse.json({ error: 'Failed to list uploads' }, { status: 500 });
  }
}
