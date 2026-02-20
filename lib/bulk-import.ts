import Papa from 'papaparse'
import { CaudaltableData } from './ocr-calibration'

export interface CSVRow {
  [key: string]: string
}

export interface JSONCalibrationImport {
  injectorNumber: string
  injectorBrand?: string
  data: CaudaltableData[]
}

export interface BulkImportResult {
  success: boolean
  totalRecords: number
  importedGroups: number
  errors: string[]
  warnings: string[]
  data?: JSONCalibrationImport[]
}

/**
 * Parsea un archivo CSV de calibración
 * Espera columnas: injectorNumber, pressure, rpm, pulse, normal, normalDelta, real, [matchingTime]
 */
export function parseCSVCalibration(csvContent: string): BulkImportResult {
  const errors: string[] = []
  const warnings: string[] = []
  const data: JSONCalibrationImport[] = []

  try {
    const parsed = Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    })

    if (parsed.errors && parsed.errors.length > 0) {
      parsed.errors.forEach((err) => {
        errors.push(`Row ${err.row}: ${err.message}`)
      })
    }

    // Group by injectorNumber
    const groupedByInjector: {
      [key: string]: { data: Partial<CaudaltableData>[]; brand?: string }
    } = {}

    ;(parsed.data as CSVRow[]).forEach((row, index) => {
      const injectorNumber = row.injectorNumber?.toString().trim()
      const brand = row.injectorBrand?.toString().trim()

      if (!injectorNumber) {
        errors.push(`Row ${index + 1}: Missing injectorNumber`)
        return
      }

      if (!groupedByInjector[injectorNumber]) {
        groupedByInjector[injectorNumber] = { data: [], brand }
      }

      try {
        const record: Partial<CaudaltableData> = {
          pressure: parseFloat(row.pressure),
          rpm: parseInt(row.rpm, 10),
          pulse: parseFloat(row.pulse),
          normal: parseFloat(row.normal),
          normalDelta: parseFloat(row.normalDelta),
          real: parseFloat(row.real),
          matchingTime: row.matchingTime ? parseFloat(row.matchingTime) : 150,
        }

        // Validate required fields
        if (
          isNaN(record.pressure as any) ||
          isNaN(record.rpm as any) ||
          isNaN(record.pulse as any) ||
          isNaN(record.normal as any) ||
          isNaN(record.real as any)
        ) {
          errors.push(
            `Row ${index + 1} (${injectorNumber}): Invalid numeric values`
          )
          return
        }

        // Validate ranges
        if (record.pressure! <= 0 || record.pressure! > 3000) {
          warnings.push(
            `Row ${index + 1}: Pressure out of range (${record.pressure} BAR)`
          )
        }
        if (record.rpm! <= 0 || record.rpm! > 5000) {
          warnings.push(
            `Row ${index + 1}: RPM out of range (${record.rpm} RPM)`
          )
        }
        if (record.pulse! < 0 || record.pulse! > 2000) {
          warnings.push(
            `Row ${index + 1}: Pulse out of range (${record.pulse} µs)`
          )
        }

        groupedByInjector[injectorNumber].data.push(record as CaudaltableData)
      } catch (err) {
        errors.push(`Row ${index + 1}: ${err instanceof Error ? err.message : 'Parse error'}`)
      }
    })

    // Convert grouped data to import format
    Object.entries(groupedByInjector).forEach(([injectorNumber, group]) => {
      if (group.data.length > 0) {
        data.push({
          injectorNumber,
          injectorBrand: group.brand,
          data: (group.data as CaudaltableData[]),
        })
      }
    })

    return {
      success: errors.length === 0,
      totalRecords: data.reduce((sum, g) => sum + g.data.length, 0),
      importedGroups: data.length,
      errors,
      warnings,
      data,
    }
  } catch (err) {
    return {
      success: false,
      totalRecords: 0,
      importedGroups: 0,
      errors: [err instanceof Error ? err.message : 'CSV parsing failed'],
      warnings: [],
    }
  }
}

/**
 * Parsea un archivo JSON de calibraciones
 */
export function parseJSONCalibration(jsonContent: string): BulkImportResult {
  const errors: string[] = []
  const warnings: string[] = []

  try {
    const parsed = JSON.parse(jsonContent)

    // Accept both array and object with calibrations
    let calibrations: JSONCalibrationImport[] = []

    if (Array.isArray(parsed)) {
      calibrations = parsed
    } else if (parsed.calibrations && Array.isArray(parsed.calibrations)) {
      calibrations = parsed.calibrations
    } else if (parsed.injectorNumber) {
      calibrations = [parsed]
    } else {
      return {
        success: false,
        totalRecords: 0,
        importedGroups: 0,
        errors: ['Invalid JSON format'],
        warnings: [],
      }
    }

    // Validate each calibration
    const validCalibrations: JSONCalibrationImport[] = []
    let totalRecords = 0

    calibrations.forEach((cal, index) => {
      if (!cal.injectorNumber) {
        errors.push(`Calibration ${index}: Missing injectorNumber`)
        return
      }

      if (!Array.isArray(cal.data) || cal.data.length === 0) {
        errors.push(`Calibration ${index}: Missing or empty data array`)
        return
      }

      // Validate each record
      const validData: CaudaltableData[] = []
      cal.data.forEach((record, recordIndex) => {
        try {
          const r: CaudaltableData = {
            pressure: Number(record.pressure),
            rpm: Number(record.rpm),
            pulse: Number(record.pulse),
            normal: Number(record.normal),
            normalDelta: Number(record.normalDelta),
            real: Number(record.real),
            matchingTime: Number(record.matchingTime) || 150,
          }

          if (isNaN(r.pressure) || isNaN(r.rpm) || isNaN(r.pulse)) {
            errors.push(
              `Calibration ${index}, Record ${recordIndex}: Invalid numeric values`
            )
            return
          }

          validData.push(r)
          totalRecords++
        } catch (err) {
          errors.push(
            `Calibration ${index}, Record ${recordIndex}: ${err instanceof Error ? err.message : 'Parse error'}`
          )
        }
      })

      if (validData.length > 0) {
        validCalibrations.push({
          injectorNumber: cal.injectorNumber,
          injectorBrand: cal.injectorBrand,
          data: validData,
        })
      }
    })

    return {
      success: errors.length === 0,
      totalRecords,
      importedGroups: validCalibrations.length,
      errors,
      warnings,
      data: validCalibrations,
    }
  } catch (err) {
    return {
      success: false,
      totalRecords: 0,
      importedGroups: 0,
      errors: [err instanceof Error ? err.message : 'JSON parsing failed'],
      warnings: [],
    }
  }
}

/**
 * Genera una plantilla CSV de ejemplo
 */
export function generateCSVTemplate(): string {
  const headers = [
    'injectorNumber',
    'injectorBrand',
    'pressure',
    'rpm',
    'pulse',
    'normal',
    'normalDelta',
    'real',
    'matchingTime',
  ]

  const examples = [
    [
      'BOSCH 110 - 0 445 110 027',
      'BOSCH',
      '1350',
      '1500',
      '0',
      '0.0',
      '0.0',
      '0.0',
      '150',
    ],
    [
      'BOSCH 110 - 0 445 110 027',
      'BOSCH',
      '800',
      '1000',
      '500',
      '25.5',
      '0.5',
      '25.3',
      '150',
    ],
  ]

  const rows = [headers, ...examples]
  return rows.map((row) => row.map((val) => `"${val}"`).join(',')).join('\n')
}

/**
 * Genera una plantilla JSON de ejemplo
 */
export function generateJSONTemplate(): string {
  return JSON.stringify(
    [
      {
        injectorNumber: 'BOSCH 110 - 0 445 110 027',
        injectorBrand: 'BOSCH',
        data: [
          {
            pressure: 1350,
            rpm: 1500,
            pulse: 0,
            normal: 0.0,
            normalDelta: 0.0,
            real: 0.0,
            matchingTime: 150,
          },
          {
            pressure: 800,
            rpm: 1000,
            pulse: 500,
            normal: 25.5,
            normalDelta: 0.5,
            real: 25.3,
            matchingTime: 150,
          },
        ],
      },
    ],
    null,
    2
  )
}
