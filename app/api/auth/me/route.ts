import { NextResponse } from 'next/server';
import { verifyAuth, getUserPermissions } from '@/lib/auth-middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request);
    
    if (!auth || !auth.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user with roles and permissions
    const user = await prisma.user.findUnique({
      where: { id: auth.sub },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const permissions = await getUserPermissions(auth.sub);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.userRoles.map(ur => ({
          id: ur.role.id,
          name: ur.role.name,
          description: ur.role.description,
        })),
      },
      permissions,
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request);
    
    if (!auth || !auth.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { permission } = body;

    if (!permission) {
      return NextResponse.json(
        { error: 'Permission parameter is required' },
        { status: 400 }
      );
    }

    const permissions = await getUserPermissions(auth.sub);
    const hasPermission = permissions.includes(permission);

    return NextResponse.json({
      permission,
      hasPermission,
    });
  } catch (error) {
    console.error('Error checking permission:', error);
    return NextResponse.json({ error: 'Failed to check permission' }, { status: 500 });
  }
}
