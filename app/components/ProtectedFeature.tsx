'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/app/hooks/useAuth'

interface ProtectedFeatureProps {
  permission: string | string[]
  children: ReactNode
  fallback?: ReactNode
  requireAll?: boolean
}

export function ProtectedFeature({
  permission,
  children,
  fallback = null,
  requireAll = false,
}: ProtectedFeatureProps) {
  const { hasPermission, loading } = useAuth()

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-10 rounded"></div>
  }

  const permissions = Array.isArray(permission) ? permission : [permission]

  const hasAccess = requireAll
    ? permissions.every(p => hasPermission(p))
    : permissions.some(p => hasPermission(p))

  if (!hasAccess) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

interface ProtectedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  permission: string | string[]
  children: ReactNode
  requireAll?: boolean
}

export function ProtectedButton({
  permission,
  children,
  requireAll = false,
  ...props
}: ProtectedButtonProps) {
  const { hasPermission, loading } = useAuth()

  if (loading) {
    return (
      <button disabled className="opacity-50 cursor-not-allowed" {...props}>
        {children}
      </button>
    )
  }

  const permissions = Array.isArray(permission) ? permission : [permission]

  const hasAccess = requireAll
    ? permissions.every(p => hasPermission(p))
    : permissions.some(p => hasPermission(p))

  return (
    <button
      disabled={!hasAccess}
      className={`${
        !hasAccess
          ? 'opacity-50 cursor-not-allowed'
          : ''
      } ${props.className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
