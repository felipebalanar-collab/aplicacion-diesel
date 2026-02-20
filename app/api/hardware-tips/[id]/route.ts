import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/remoteAuth';

// PUT /api/hardware-tips/[id] - Update tip (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authContext = await requireAuth(req);
    requireAdmin(authContext);

    const body = await req.json();
    const { title, iconName, detail, imagePath, order, injectorType, category } = body;

    const tip = await prisma.hardwareTip.update({
      where: { id: params.id },
      data: {
        title,
        iconName,
        detail,
        imagePath,
        order,
        injectorType,
        category
      }
    });

    return NextResponse.json(tip);
  } catch (error: any) {
    console.error('Error updating hardware tip:', error);
    
    if (error.message === 'MISSING_AUTH' || error.message === 'INVALID_TOKEN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Error al actualizar tip' }, { status: 500 });
  }
}

// DELETE /api/hardware-tips/[id] - Delete tip (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authContext = await requireAuth(req);
    requireAdmin(authContext);

    await prisma.hardwareTip.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Tip eliminado' });
  } catch (error: any) {
    console.error('Error deleting hardware tip:', error);
    
    if (error.message === 'MISSING_AUTH' || error.message === 'INVALID_TOKEN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Error al eliminar tip' }, { status: 500 });
  }
}
