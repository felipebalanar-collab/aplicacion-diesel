import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/remoteAuth';

// GET /api/manuals - Get all manuals with contents
export async function GET(req: NextRequest) {
  try {
    const manuals = await prisma.manual.findMany({
      include: {
        contents: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(manuals);
  } catch (error) {
    console.error('Error fetching manuals:', error);
    return NextResponse.json({ error: 'Error al cargar manuales' }, { status: 500 });
  }
}

// POST /api/manuals - Create new manual (Admin only)
export async function POST(req: NextRequest) {
  try {
    const authContext = await requireAuth(req);
    requireAdmin(authContext);

    const body = await req.json();
    const { title, iconName, imagePath, order, contents } = body;

    if (!title || !iconName || !imagePath) {
      return NextResponse.json(
        { error: 'title, iconName y imagePath son requeridos' },
        { status: 400 }
      );
    }

    const manual = await prisma.manual.create({
      data: {
        title,
        iconName,
        imagePath,
        order: order || 0,
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

    return NextResponse.json(manual, { status: 201 });
  } catch (error: any) {
    console.error('Error creating manual:', error);
    
    if (error.message === 'MISSING_AUTH' || error.message === 'INVALID_TOKEN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Error al crear manual' }, { status: 500 });
  }
}
