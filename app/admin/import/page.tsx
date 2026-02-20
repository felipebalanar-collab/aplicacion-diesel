import { CalibrationImageUploader } from '@/app/components/CalibrationImageUploader'
import { BulkImportUploader } from '@/app/components/BulkImportUploader'

export const metadata = {
  title: 'Importar Calibraciones - Gestor de Inyectores',
  description: 'Sube imágenes de tablas de calibración o archivos CSV/JSON para importación masiva',
}

export default function ImportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📥 Importar Calibraciones</h1>
          <p className="text-gray-600">
            Elige entre OCR de imágenes o importación de archivos CSV/JSON para agregar calibraciones masivamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image OCR */}
          <div>
            <CalibrationImageUploader />
          </div>

          {/* CSV/JSON Import */}
          <div>
            <BulkImportUploader />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-3">📸 OCR de Imágenes</h3>
            <p className="text-sm text-blue-800 mb-3">
              Sube fotos de tablas de calibración impresas o digitales. El OCR extraerá automáticamente los datos.
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>✓ Detecta números automáticamente</li>
              <li>✓ Permite corrección manual</li>
              <li>✓ Muestra confianza OCR</li>
              <li>✓ Soporta múltiples formatos de imagen</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-3">📋 Importación CSV/JSON</h3>
            <p className="text-sm text-green-800 mb-3">
              Carga archivos CSV o JSON con múltiples inyectores y calibraciones en una sola operación.
            </p>
            <ul className="text-xs text-green-700 space-y-1">
              <li>✓ Importa múltiples inyectores</li>
              <li>✓ Plantillas descargables</li>
              <li>✓ Validación de datos</li>
              <li>✓ Procesamiento por lotes</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h3 className="font-bold text-amber-900 mb-3">✅ Mejores Prácticas</h3>
            <p className="text-sm text-amber-800 mb-3">
              Para obtener los mejores resultados en importación de datos:
            </p>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>✓ Verifica datos antes de importar</li>
              <li>✓ Usa plantillas de ejemplo</li>
              <li>✓ Revisa advertencias OCR</li>
              <li>✓ Realiza copias de seguridad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
