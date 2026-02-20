import Tesseract from 'tesseract.js';
import sharp from 'sharp';

export interface CaudaltableData {
  pressure: number;
  rpm: number;
  pulse: number;
  normal: number;
  normalDelta: number;
  real: number;
  matchingTime?: number;
}

export interface OCRResult {
  success: boolean;
  injectorNumber?: string;
  injectorBrand?: string;
  data?: CaudaltableData[];
  text?: string;
  confidence?: number;
  error?: string;
  warning?: string[];
}

/**
 * Procesa una imagen de tabla de calibración usando OCR
 */
export async function processCalibrationTableOCR(
  imageBuffer: Buffer,
  options: {
    preprocess?: boolean;
    confidence?: number; // Umbral mínimo de confianza (0-1)
  } = {}
): Promise<OCRResult> {
  try {
    // Preprocess image if requested
    let processedBuffer = imageBuffer;
    if (options.preprocess !== false) {
      processedBuffer = await preprocessImage(imageBuffer);
    }

    // Perform OCR
    const { data } = await Tesseract.recognize(processedBuffer, 'spa', {
      logger: (m) => console.log('OCR Progress:', m.status, m.progress),
    });

    const text = data.text;
    const confidence = data.confidence;

    // Parse the OCR text to extract table data
    const result = parseCalibrationTable(text, confidence, options.confidence || 0.5);

    return result;
  } catch (error) {
    console.error('OCR Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown OCR error',
    };
  }
}

/**
 * Preprocesa la imagen para mejorar OCR
 */
async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(imageBuffer)
      .grayscale() // Convertir a escala de grises
      .normalize() // Normalizar contraste
      .sharpen() // Afilar la imagen
      .resize(2000, 1500, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();
  } catch (error) {
    console.warn('Image preprocessing failed, using original:', error);
    return imageBuffer;
  }
}

/**
 * Parsea el texto OCR para extraer datos de la tabla de calibración
 */
export function parseCalibrationTable(
  text: string,
  confidence: number,
  confidenceThreshold: number = 0.5
): OCRResult {
  const warnings: string[] = [];

  if (confidence < confidenceThreshold) {
    warnings.push(
      `Low OCR accuracy detected (${(confidence * 100).toFixed(1)}%). Please verify all values.`
    );
  }

  // Extract injector number and brand
  const injectorNumberMatch = text.match(
    /BOSCH|0\s*445\s*110\s*\d{3}|[A-Z]+\s+\d{1,4}\s+-\s*0\s*445/i
  );
  const injectorNumber = injectorNumberMatch ? injectorNumberMatch[0].trim() : undefined;

  // Extract table data
  // Heurística mejorada: la OCR a veces pone valores en líneas separadas.
  // Vamos a dividir el texto en líneas, extraer secuencias numéricas y agrupar
  // combinando líneas siguientes hasta tener 6 números (pressure, rpm, pulse, normal, normalDelta, real).
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const data: CaudaltableData[] = [];

  const extractNums = (s: string) => (s.match(/[-+]?\d+[.,]?\d*/g) || []).map((n) => n.replace(',', '.'));

  for (let i = 0; i < lines.length; i++) {
    let nums: string[] = extractNums(lines[i]);

    // If this line doesn't contain any numeric tokens, skip
    if (nums.length === 0) continue;

    // If looks like a header or small numbers, skip heuristically
    const potentialPressure = parseFloat(nums[0]);
    const isPressureLike = !isNaN(potentialPressure) && potentialPressure > 50 && potentialPressure < 3000;

    // If the first number isn't pressure-like, still attempt to parse if there are many numbers
    if (!isPressureLike && nums.length < 6) {
      // try to combine with following lines
    }

    // Combine following lines until we have at least 6 numeric tokens or reach a new pressure-like line
    let combined = [...nums];
    let j = i + 1;
    while (combined.length < 6 && j < lines.length) {
      const nextNums = extractNums(lines[j]);
      if (nextNums.length === 0) { j++; continue; }

      // If next line starts with a pressure-like number and we already have >=1 token, stop (likely new row)
      const nextFirst = parseFloat(nextNums[0]);
      const nextIsPressure = !isNaN(nextFirst) && nextFirst > 50 && nextFirst < 3000;
      if (nextIsPressure && combined.length >= 1) break;

      combined = combined.concat(nextNums);
      j++;
    }

    // Move i to j-1 so outer loop continues after consumed lines
    i = Math.max(i, j - 1);

    // Now try to map first 6 numeric tokens
    if (combined.length >= 6) {
      const [p, r, pu, no, nd, re] = combined;
      const record: CaudaltableData = {
        pressure: parseFloat(p),
        rpm: parseInt(r, 10),
        pulse: parseFloat(pu),
        normal: parseFloat(no),
        normalDelta: parseFloat(String(nd).replace(/[±,]/g, '.')),
        real: parseFloat(re),
        matchingTime: 150,
      };

      if (
        !isNaN(record.pressure) && record.pressure > 0 && record.pressure < 3000 &&
        !isNaN(record.rpm) && record.rpm > 0 && record.rpm < 5000 &&
        !isNaN(record.pulse) && record.pulse >= 0 && record.pulse < 2000
      ) {
        data.push(record);
      }
    } else {
      // If didn't get 6 tokens, try to salvage if at least 3 tokens (pressure,rpm,pulse)
      if (combined.length >= 3) {
        const [p, r, pu] = combined;
        const record: CaudaltableData = {
          pressure: parseFloat(p) || 0,
          rpm: parseInt(r || '0', 10) || 0,
          pulse: parseFloat(pu) || 0,
          normal: 0,
          normalDelta: 0,
          real: 0,
          matchingTime: 150,
        };
        data.push(record);
      }
    }
  }

  if (data.length === 0) {
    return {
      success: false,
      error: 'No table data found in image. Please ensure the image contains a calibration table.',
      text: text.substring(0, 200), // First 200 chars for debugging
      warning: warnings,
    };
  }

  return {
    success: true,
    injectorNumber,
    data,
    text: text.substring(0, 500), // For debugging/verification
    confidence,
    warning: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Valida los datos extraídos contra restricciones comunes
 */
export function validateCaudaltableData(data: CaudaltableData[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!Array.isArray(data) || data.length === 0) {
    return {
      valid: false,
      errors: ['No data provided'],
    };
  }

  for (let i = 0; i < data.length; i++) {
    const record = data[i];

    // Check required fields
    if (!record.pressure || record.pressure <= 0) {
      errors.push(`Record ${i}: Invalid pressure value`);
    }
    if (!record.rpm || record.rpm <= 0) {
      errors.push(`Record ${i}: Invalid RPM value`);
    }
    if (record.pulse === undefined || record.pulse < 0) {
      errors.push(`Record ${i}: Invalid pulse value`);
    }
    if (!record.normal) {
      errors.push(`Record ${i}: Missing normal value`);
    }
    if (!record.real) {
      errors.push(`Record ${i}: Missing real value`);
    }

    // Check value ranges
    if (record.pressure > 3000) {
      errors.push(`Record ${i}: Pressure exceeds 3000 BAR`);
    }
    if (record.rpm > 5000) {
      errors.push(`Record ${i}: RPM exceeds 5000`);
    }
    if (record.pulse > 2000) {
      errors.push(`Record ${i}: Pulse exceeds 2000 µs`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
