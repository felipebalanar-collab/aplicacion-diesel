'use client'

import { useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'
import Image from 'next/image'

interface OCRData {
  pressure: number
  rpm: number
  pulse: number
  normal: number
  normalDelta: number
  real: number
  matchingTime?: number
}

interface OCRResult {
  success: boolean
  injectorNumber?: string
  data?: OCRData[]
  recordCount?: number
  confidence?: number
  warning?: string[]
  error?: string
  errors?: string[]
}

export function CalibrationImageUploader() {
  const { hasPermission, loading } = useAuth()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [importing, setImporting] = useState(false)
  const [importMessage, setImportMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editedData, setEditedData] = useState<OCRData[] | null>(null)

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
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setError('')
    setSuccess('')

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUploadAndOCR = async () => {
    if (!imageFile) {
      setError('Selecciona una imagen primero')
      return
    }

    try {
      setUploading(true)
      setError('')
      setOcrResult(null)

      const formData = new FormData()
      formData.append('image', imageFile)

      const token = localStorage.getItem('token') || localStorage.getItem('auth_token')
      const response = await fetch('/api/calibration/ocr', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const result: OCRResult = await response.json()
      setOcrResult(result)

      if (result.success) {
        setSuccess(`OCR completado: ${result.recordCount} registros encontrados`)
        setEditedData(result.data || [])
      } else {
        setError(result.error || 'Error procesando OCR')
      }
    } catch (err) {
      setError('Error uploading image')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleImport = async () => {
    if (!editedData || !ocrResult?.injectorNumber) {
      setError('No hay datos para importar')
      return
    }

    try {
      setImporting(true)
      setError('')

      const token = localStorage.getItem('token') || localStorage.getItem('auth_token')
      const response = await fetch('/api/calibration/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          injectorNumber: ocrResult.injectorNumber,
          data: editedData,
        }),
      })

      const result = await response.json()
      if (response.ok) {
        setSuccess(`✅ Importado: ${result.recordsCount} registros`)
        setImageFile(null)
        setPreview('')
        setOcrResult(null)
        setEditedData(null)
        // Reset form
        setTimeout(() => {
          setSuccess('')
          setImportMessage('')
        }, 3000)
      } else {
        setError(result.error || 'Error importando datos')
      }
    } catch (err) {
      setError('Error importing data')
      console.error(err)
    } finally {
      setImporting(false)
    }
  }

  const handleEditData = (index: number, field: keyof OCRData, value: string) => {
    if (!editedData) return

    const updated = [...editedData]
    updated[index] = {
      ...updated[index],
      [field]: ['pressure', 'rpm', 'pulse', 'normal', 'normalDelta', 'real'].includes(field)
        ? parseFloat(value) || 0
        : updated[index][field],
    }
    setEditedData(updated)
  }

  return (
    <div className="space-y-6 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800">📸 Subir Tabla de Calibración</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded">
          {success}
        </div>
      )}

      {/* Upload Section */}
      {!ocrResult && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-input"
            />
            <label
              htmlFor="image-input"
              className="cursor-pointer block"
            >
              {preview ? (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-gray-500 mb-4">
                  <svg
                    className="mx-auto w-16 h-16 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 12m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-lg font-medium">
                    Arrastra una imagen aquí o haz clic
                  </p>
                  <p className="text-sm">Formato: PNG, JPG, JPEG</p>
                </div>
              )}
              {imageFile && (
                <p className="text-sm text-gray-600">{imageFile.name}</p>
              )}
            </label>
          </div>

          <button
            onClick={handleUploadAndOCR}
            disabled={!imageFile || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            {uploading ? '🔄 Procesando OCR...' : '📋 Procesar con OCR'}
          </button>
        </div>
      )}

      {/* OCR Results */}
      {ocrResult && editedData && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="font-semibold text-blue-900">
              📊 Número de Inyector: {ocrResult.injectorNumber || 'No detectado'}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Registros encontrados: {editedData.length}
            </p>
            {ocrResult.confidence && (
              <p className="text-sm text-blue-800">
                Confianza OCR: {(ocrResult.confidence * 100).toFixed(1)}%
              </p>
            )}
            {ocrResult.warning && ocrResult.warning.length > 0 && (
              <div className="mt-2 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 text-sm">
                ⚠️ {ocrResult.warning.join('; ')}
              </div>
            )}
          </div>

          {/* Data Table for Editing */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-sm">Presión (BAR)</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm">RPM</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm">Pulse (µs)</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm">Normal</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm">± Delta</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm">Real</th>
                </tr>
              </thead>
              <tbody>
                {editedData.map((record, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={record.pressure}
                        onChange={(e) =>
                          handleEditData(idx, 'pressure', e.target.value)
                        }
                        className="w-full px-1 py-0.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={record.rpm}
                        onChange={(e) =>
                          handleEditData(idx, 'rpm', e.target.value)
                        }
                        className="w-full px-1 py-0.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        value={record.pulse}
                        onChange={(e) =>
                          handleEditData(idx, 'pulse', e.target.value)
                        }
                        className="w-full px-1 py-0.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        step="0.1"
                        value={record.normal}
                        onChange={(e) =>
                          handleEditData(idx, 'normal', e.target.value)
                        }
                        className="w-full px-1 py-0.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        step="0.1"
                        value={record.normalDelta}
                        onChange={(e) =>
                          handleEditData(idx, 'normalDelta', e.target.value)
                        }
                        className="w-full px-1 py-0.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-1">
                      <input
                        type="number"
                        step="0.1"
                        value={record.real}
                        onChange={(e) =>
                          handleEditData(idx, 'real', e.target.value)
                        }
                        className="w-full px-1 py-0.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
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
                setOcrResult(null)
                setEditedData(null)
                setImageFile(null)
                setPreview('')
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Error results */}
      {ocrResult && !ocrResult.success && (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="font-semibold text-red-900">Error OCR</p>
            <p className="text-sm text-red-800 mt-2">{ocrResult.error}</p>
            {ocrResult.errors && ocrResult.errors.length > 0 && (
              <ul className="text-sm text-red-800 mt-2 list-disc list-inside">
                {ocrResult.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => {
              setOcrResult(null)
              setImageFile(null)
              setPreview('')
              setEditedData(null)
            }}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Intentar Otra Imagen
          </button>
        </div>
      )}
    </div>
  )
}
