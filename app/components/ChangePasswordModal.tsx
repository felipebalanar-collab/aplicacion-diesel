'use client'

import { FormEvent, useState } from 'react'
import { useAuth } from '@/app/hooks/useAuth'

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { token } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Completa todos los campos')
      setMessageType('error')
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas nuevas no coinciden')
      setMessageType('error')
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres')
      setMessageType('error')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error || 'Error al cambiar contraseña')
        setMessageType('error')
      } else {
        setMessage('✓ Contraseña cambiada exitosamente')
        setMessageType('success')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        
        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (err: any) {
      setMessage(`Error: ${err.message}`)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Cambiar Contraseña</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Contraseña Actual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Tu contraseña actual"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Nueva contraseña (mín. 6 caracteres)"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              placeholder="Confirma la nueva contraseña"
              required
            />
          </div>

          {message && (
            <div className={`p-3 rounded text-sm ${
              messageType === 'success' 
                ? 'bg-green-900 text-green-200' 
                : 'bg-red-900 text-red-200'
            }`}>
              {message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 rounded transition font-semibold"
            >
              {loading ? 'Cambiando...' : 'Cambiar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
