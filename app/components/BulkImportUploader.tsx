'use client'

import { useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import { generateCSVTemplate, generateJSONTemplate, JSONCalibrationImport } from '@/lib/bulk-import'

export function BulkImportUploader() {
  const { hasPermission, loading } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<'csv' | 'json'>('csv')
  const [parsing, setParsing] = useState(false)
  const [parsedData, setParsedData] = useState<JSONCalibrationImport[] | null>(null)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [warnings, setWarnings] = useState<string[]>([])

  if (loading) {
    return <div className="animate-pulse">Cargando...</div>
  }

  if (!hasPermission('upload_calibration')) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
        No tienes permiso para subir calibraciones
      </div>
    )
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
      setParsedData(null)
    }
  }

  const handleParse = async () => {
    if (!file) {
      setError('Selecciona un archivo')
      return
    }

    try {
      setParsing(true)
      setError('')
      setWarnings([])

      const formData = new FormData()
      formData.append('file', file)
      formData.append('format', format)

      const token = localStorage.getItem('token') || localStorage.getItem('auth_token')
      const response = await fetch('/api/calibration/bulk-import', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setParsedData(result.data)
        setSuccess(`Parseado correctamente: ${result.totalRecords} registros de ${result.importedGroups} inyectores`)
        if (result.warnings && result.warnings.length > 0) {
          setWarnings(result.warnings)
        }
      } else {
        setError(result.error || 'Error parseando archivo')
        if (result.errors) {
          setError(result.error + '\n' + result.errors.join('\n'))
        }
      }
    } catch (err) {
      setError('Error cargando archivo')
      console.error(err)
    } finally {
      setParsing(false)
    }
  }

  const handleImport = async () => {
    if (!parsedData || parsedData.length === 0) {
      setError('No hay datos para importar')
      return
    }

    try {
      setImporting(true)
      setError('')

      const token = localStorage.getItem('token') || localStorage.getItem('auth_token')
      const response = await fetch('/api/calibration/bulk-import/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ calibrations: parsedData }),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(`✅ ${result.message}`)
        setFile(null)
        setParsedData(null)
        setTimeout(() => {
          setSuccess('')
        }, 3000)
      } else {
        setError(result.error || 'Error importando')
      }
    } catch (err) {
      setError('Error importando datos')
      console.error(err)
    } finally {
      setImporting(false)
    }
  }

  const downloadTemplate = () => {
    const content = format === 'csv' ? generateCSVTemplate() : generateJSONTemplate()
    const filename = `calibration-template.${format}`
    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800">📁 Importación Masiva CSV/JSON</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded whitespace-pre-wrap">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
          {success}
        </div>
      )}

      {warnings.length > 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
          <p className="font-semibold mb-2">⚠️ Advertencias:</p>
          <ul className="list-disc list-inside text-sm">
            {warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {!parsedData && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formato
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={format === 'csv'}
                    onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
                    className="mr-2"
                  />
                  <span>CSV</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="json"
                    checked={format === 'json'}
                    onChange={(e) => setFormat(e.target.value as 'csv' | 'json')}
                    className="mr-2"
                  />
                  <span>JSON</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo
              </label>
              <input
                type="file"
                accept={format === 'csv' ? '.csv' : '.json'}
                onChange={handleFileSelect}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleParse}
              disabled={!file || parsing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {parsing ? '⏳ Parseando...' : '📋 Parsear Archivo'}
            </button>

            <button
              onClick={downloadTemplate}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              ⬇️ Descargar Plantilla
            </button>
          </div>
        </div>
      )}

      {parsedData && parsedData.length > 0 && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="font-semibold text-blue-900">
              ✅ {parsedData.length} inyector(es) con {parsedData.reduce((sum, c) => sum + c.data.length, 0)} registros
            </p>
          </div>

          {/* Summary by Injector */}
          <div className="space-y-2">
            {parsedData.map((cal, idx) => (
              <div key={idx} className="border border-gray-200 p-3 rounded">
                <p className="font-semibold text-gray-800">
                  {cal.injectorNumber} ({cal.injectorBrand || 'N/A'})
                </p>
                <p className="text-sm text-gray-600">
                  {cal.data.length} registros de calibración
                </p>

                {/* Sample of first record */}
                {cal.data.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    Ej: Presión={cal.data[0].pressure} BAR, RPM={cal.data[0].rpm}, Pulse={cal.data[0].pulse}µs
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {importing ? '⏳ Importando...' : '✅ Confirmar Importación'}
            </button>

            <button
              onClick={() => {
                setFile(null)
                setParsedData(null)
                setError('')
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mt-6">
        <h3 className="font-semibold text-gray-800 mb-2">📖 Formato Esperado</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>CSV:</strong> Columnas separadas por comas con encabezados: injectorNumber,
            injectorBrand, pressure, rpm, pulse, normal, normalDelta, real, matchingTime
          </p>
          <p>
            <strong>JSON:</strong> Array de objetos con propiedades: injectorNumber, injectorBrand,
            data (array de calibraciones)
          </p>
          <p>
            <strong>Unidades:</strong> Presión (BAR), RPM (revoluciones), Pulse (microsegundos),
            Normal/Real (mm/Hub)
          </p>
        </div>
      </div>
    </div>
  )
}
