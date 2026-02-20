import { NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('image') as Blob | null;
    if (!file) return NextResponse.json({ error: 'No image provided' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Preprocesado con sharp para mejorar OCR: rotar según EXIF, redimensionar, gris, normalizar y aplicar PNG
    const preprocessed = await sharp(buffer)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .grayscale()
      .normalize()
      .toFormat('png')
      .toBuffer();

    const worker = createWorker({});
    await worker.load();
    await worker.loadLanguage('eng+spa');
    await worker.initialize('eng+spa');

    const { data } = await worker.recognize(preprocessed);
    await worker.terminate();

    const text: string = data?.text || '';
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

    // Heurística simple: extraer secuencias numéricas por línea
    const parsed = lines.map((l) => {
      const nums = l.match(/[-+]?\d+[.,]?\d*/g) || [];
      return nums.map((n) => n.replace(',', '.'));
    });

    return NextResponse.json({ text, lines, parsed });
  } catch (error: any) {
    console.error('OCR error', error);
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
