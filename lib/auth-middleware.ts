import { jwtVerify } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'banco-de-pruebas-secret-key-2026');

export async function verifyAuth(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export async function getUserPermissions(userId: string) {
  try {
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    const permissions = new Set();
    for (const userRole of userRoles) {
      for (const rolePermission of userRole.role.permissions) {
        permissions.add(rolePermission.permission.name);
      }
    }

    return Array.from(permissions);
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return [];
  }
}

export async function checkPermission(userId: string, requiredPermission: string) {
  const permissions = await getUserPermissions(userId);
  return permissions.includes(requiredPermission);
}

export async function requirePermission(request: Request, requiredPermission: string) {
  const auth = await verifyAuth(request);
  
  if (!auth || !auth.sub) {
    return {
      error: 'Unauthorized',
      status: 401,
    };
  }

  const hasPermission = await checkPermission(auth.sub, requiredPermission);
  
  if (!hasPermission) {
    return {
      error: 'Forbidden - Missing permission: ' + requiredPermission,
      status: 403,
    };
  }

  return { auth, error: null };
}
