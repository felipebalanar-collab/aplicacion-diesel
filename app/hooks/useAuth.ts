'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Role {
  id: string
  name: string
  description?: string
}

interface User {
  id: string
  email: string
  nombre?: string
  rol?: string
  roles?: Role[]
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  logout: () => void
  isAuthenticated: boolean
  permissions: string[]
  roles: Role[]
  hasPermission: (permission: string) => boolean
}

const normalizeRole = (role?: string): User['rol'] => {
  if (!role) return role
  const normalized = role.toLowerCase().trim()
  if (normalized === 'admin' || normalized === 'administrador' || normalized === 'superadmin') {
    return 'admin'
  }
  if (normalized === 'user' || normalized === 'usuario' || normalized === 'cliente') {
    return 'cliente'
  }
  return role
}

export function useAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [permissions, setPermissions] = useState<string[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const router = useRouter()

  // Verify token and refresh role info
  const fetchUserInfo = async (authToken: string) => {
    try {
      const response = await fetch('/api/remote/auth/verify', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
      })

      if (!response.ok) {
        logout()
        return
      }

      const data = await response.json()
      if (data?.valid && data?.user) {
        setUser((prev) => ({
          id: data.user.userId,
          email: data.user.email,
          rol: normalizeRole(data.user.rol),
          nombre: prev?.nombre,
        }))
      }
    } catch (err) {
      console.error('Error fetching user info:', err)
    }
  }

  useEffect(() => {
    const syncFromStorage = () => {
      try {
        // Solo acceder a localStorage en el cliente
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('auth_token')
          const storedUser = localStorage.getItem('auth_user')

          if (storedToken && storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setToken(storedToken)
            setUser({
              ...parsedUser,
              rol: normalizeRole(parsedUser?.rol),
            })
            fetchUserInfo(storedToken)
          } else {
            setToken(null)
            setUser(null)
            setPermissions([])
            setRoles([])
          }
        }
      } catch (err) {
        console.error('Error accediendo localStorage:', err)
      } finally {
        setLoading(false)
      }
    }

    syncFromStorage()

    const handleAuthChange = () => syncFromStorage()
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'auth_token' || event.key === 'auth_user') {
        syncFromStorage()
      }
    }

    window.addEventListener('auth-changed', handleAuthChange)
    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('auth-changed', handleAuthChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const logout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('token')
        localStorage.removeItem('auth_user')
        localStorage.removeItem('user')
        localStorage.removeItem('user_licencia')
      }
    } catch (err) {
      console.error('Error limpiando localStorage:', err)
    }
    setToken(null)
    setUser(null)
    setPermissions([])
    setRoles([])
    router.push('/login')
  }

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission)
  }

  return {
    user,
    token,
    loading,
    logout,
    isAuthenticated: !!token,
    permissions,
    roles,
    hasPermission,
  }
}
