'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useAuth } from '@/app/hooks/useAuth'

interface User {
  id: string
  email: string
  name?: string
  role: string
  createdAt: string
}

export default function AdminUsersPage() {
  const { logout } = useAuth()
  const [adminSecret, setAdminSecret] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleAdminAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // El admin secret debe ser pasado desde variables de entorno
    fetch('/api/auth/users?adminSecret=' + adminSecret)
      .then(res => {
        if (res.ok) {
          setAuthenticated(true)
          return res.json()
        }
        throw new Error('Unauthorized')
      })
      .then(data => setUsers(data.users || []))
      .catch(() => setMessage('Contraseña de administrador incorrecta'))
  }

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, adminSecret })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Error creating user')
      }

      setMessage(`✓ Usuario ${email} creado exitosamente`)
      setEmail('')
      setPassword('')
      setName('')
      setShowForm(false)
      
      // Recargar usuarios
      const usersRes = await fetch(`/api/auth/users?adminSecret=${adminSecret}`)
      if (usersRes.ok) {
        const data = await usersRes.json()
        setUsers(data.users || [])
      }
    } catch (err: any) {
      setMessage(`✗ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-6">Administración de Usuarios</h1>
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">Contraseña de Admin</label>
              <input
                type="password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                placeholder="Contraseña maestra"
                required
              />
            </div>
            {message && <div className="text-red-400 text-sm">{message}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              Ingresar como Admin
            </button>
          </form>
          <p className="text-gray-400 text-xs mt-4 text-center">
            Contacta al desarrollador si olvidaste la contraseña
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded mb-6 ${message.includes('✓') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Usuarios Registrados ({users.length})</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            {showForm ? 'Cancelar' : '+ Nuevo Usuario'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateUser} className="bg-gray-700 p-4 rounded mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 text-sm"
                  placeholder="cliente@ejemplo.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 text-sm"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-300 text-sm mb-2">Contraseña Temporal</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 text-sm"
                  placeholder="Contraseña para el cliente"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 rounded text-sm font-semibold transition"
            >
              {loading ? 'Creando...' : 'Crear Usuario'}
            </button>
          </form>
        )}

        <div className="space-y-2">
          {users.length === 0 ? (
            <div className="text-gray-400 text-sm text-center py-8">No hay usuarios registrados aún</div>
          ) : (
            users.map((user) => (
              <div key={user.id} className="bg-gray-900 p-4 rounded flex justify-between items-center hover:bg-gray-850 transition">
                <div>
                  <div className="text-white font-semibold">{user.name || user.email}</div>
                  <div className="text-gray-400 text-sm">{user.email}</div>
                  <div className="text-gray-500 text-xs mt-1">
                    Creado: {new Date(user.createdAt).toLocaleDateString('es-AR')}
                  </div>
                </div>
                <div className="bg-blue-900 px-3 py-1 rounded text-xs text-blue-300 font-semibold">
                  {user.role}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-900/50 p-4 rounded text-sm text-blue-200">
        <p className="font-semibold mb-2">Instrucciones para los clientes:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Cada cliente recibirá su usuario y contraseña</li>
          <li>Pueden cambiar la contraseña desde su perfil</li>
          <li>Solo verán la información que les corresponde</li>
        </ul>
      </div>
    </div>
  )
}
