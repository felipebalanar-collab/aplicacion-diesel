import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/remoteAuth';

// GET /api/manuals/[id] - Get single manual with contents
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const manual = await prisma.manual.findUnique({
      where: { id: params.id },
      include: {
        contents: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!manual) {
      return NextResponse.json({ error: 'Manual no encontrado' }, { status: 404 });
    }

    return NextResponse.json(manual);
  } catch (error) {
    console.error('Error fetching manual:', error);
    return NextResponse.json({ error: 'Error al cargar manual' }, { status: 500 });
  }
}

// PUT /api/manuals/[id] - Update manual (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authContext = await requireAuth(req);
    requireAdmin(authContext);

    const body = await req.json();
    const { title, iconName, imagePath, order, contents } = body;

    // Delete existing contents
    await prisma.manualContent.deleteMany({
      where: { manualId: params.id }
    });

    // Update manual with new contents
    const manual = await prisma.manual.update({
      where: { id: params.id },
      data: {
        title,
        iconName,
        imagePath,
        order,
        contents: {
          create: contents || []
        }
      },
      include: {
        contents: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(manual);
  } catch (error: any) {
    console.error('Error updating manual:', error);
    
    if (error.message === 'MISSING_AUTH' || error.message === 'INVALID_TOKEN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Error al actualizar manual' }, { status: 500 });
  }
}

// DELETE /api/manuals/[id] - Delete manual (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authContext = await requireAuth(req);
    requireAdmin(authContext);

    await prisma.manual.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Manual eliminado' });
  } catch (error: any) {
    console.error('Error deleting manual:', error);
    
    if (error.message === 'MISSING_AUTH' || error.message === 'INVALID_TOKEN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Error al eliminar manual' }, { status: 500 });
  }
}
