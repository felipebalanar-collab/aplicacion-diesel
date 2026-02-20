'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

const PUBLIC_PATHS = ['/login'];

const isAdminRole = (role?: string) => {
  if (!role) return false;
  const normalized = role.toLowerCase().trim();
  return normalized === 'admin' || normalized === 'administrador' || normalized === 'superadmin';
};

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    if (isPublic) return;

    if (!loading && !isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (!loading && isAuthenticated && isAdminRoute && user?.rol && !isAdminRole(user?.rol)) {
      router.replace('/');
    }
  }, [isPublic, loading, isAuthenticated, isAdminRoute, router, user?.rol]);

  if (isPublic) {
    return <>{children}</>;
  }

  if (loading || (isAdminRoute && isAuthenticated && !user?.rol)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="mb-4">Cargando...</div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isAdminRoute && !isAdminRole(user?.rol)) {
    return null;
  }

  return <>{children}</>;
}
