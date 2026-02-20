'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChangePasswordModal } from './ChangePasswordModal'

export function Navbar() {
  const { user, logout, isAuthenticated, roles } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const router = useRouter()

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Injector Manager</h1>
            <a href="/admin/dashboard" className="text-sm text-blue-400 hover:text-blue-300 px-3 py-1 bg-blue-900/30 rounded">
              👥 Administración
            </a>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              <span>{user?.name || user?.email}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-700 rounded shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-600">
                  <div className="font-semibold">{user?.email}</div>
                  {roles && roles.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {roles.map((role) => (
                        <span
                          key={role.id}
                          className="inline-block bg-blue-600 text-white text-xs px-2 py-0.5 rounded"
                        >
                          {role.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <a
                  href="/admin/dashboard"
                  onClick={() => setShowMenu(false)}
                  className="block px-4 py-2 text-sm text-blue-400 hover:bg-gray-600"
                >
                  📊 Gestionar Usuarios
                </a>
                <button
                  onClick={() => {
                    setShowChangePasswordModal(true)
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-yellow-400 hover:bg-gray-600"
                >
                  🔑 Cambiar Contraseña
                </button>
                <button
                  onClick={() => {
                    logout()
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ChangePasswordModal 
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </>
  )
}
