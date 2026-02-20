import { NextResponse } from 'next/server';
import { requirePermission } from '@/lib/auth-middleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const auth = await requirePermission(request, 'assign_role');
    
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { userId } = await params;
    const body = await request.json();
    const { roleIds } = body;

    if (!Array.isArray(roleIds)) {
      return NextResponse.json(
        { error: 'roleIds must be an array' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete existing roles
    await prisma.userRole.deleteMany({
      where: { userId },
    });

    // Assign new roles
    const roles = await prisma.role.findMany({
      where: { name: { in: roleIds } },
    });

    for (const role of roles) {
      await prisma.userRole.create({
        data: {
          userId,
          roleId: role.id,
        },
      });
    }

    // Return updated user with roles
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to retrieve updated user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        ...updatedUser,
        roles: updatedUser.userRoles.map(ur => ur.role),
      },
    });
  } catch (error) {
    console.error('Error updating user roles:', error);
    return NextResponse.json({ error: 'Failed to update user roles' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const auth = await requirePermission(request, 'edit_user');
    
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { userId } = await params;
    const body = await request.json();
    const { isActive, name } = body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(name && { name }),
      },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    return NextResponse.json({
      user: {
        ...updatedUser,
        roles: updatedUser.userRoles.map(ur => ur.role),
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const auth = await requirePermission(request, 'delete_user');
    
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { userId } = await params;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Deactivate user instead of deleting
    const deactivatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    return NextResponse.json({
      message: 'User deactivated successfully',
      user: deactivatedUser,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
