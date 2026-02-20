import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth, requireAdmin } from '@/lib/remoteAuth';

// GET /api/hardware-tips - Get all hardware tips
export async function GET(req: NextRequest) {
  try {
    const tips = await prisma.hardwareTip.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(tips);
  } catch (error) {
    console.error('Error fetching hardware tips:', error);
    return NextResponse.json({ error: 'Error al cargar tips' }, { status: 500 });
  }
}

// POST /api/hardware-tips - Create new tip (Admin only)
export async function POST(req: NextRequest) {
  try {
    const authContext = await requireAuth(req);
    requireAdmin(authContext);

    const body = await req.json();
    const { title, iconName, detail, imagePath, order, injectorType, category } = body;

    if (!title || !iconName || !detail) {
      return NextResponse.json(
        { error: 'title, iconName y detail son requeridos' },
        { status: 400 }
      );
    }

    const tip = await prisma.hardwareTip.create({
      data: {
        title,
        iconName,
        detail,
        imagePath: imagePath || null,
        order: order || 0,
        injectorType: injectorType || 'diesel',
        category: category || 'general'
      }
    });

    return NextResponse.json(tip, { status: 201 });
  } catch (error: any) {
    console.error('Error creating hardware tip:', error);
    
    if (error.message === 'MISSING_AUTH' || error.message === 'INVALID_TOKEN') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Error al crear tip' }, { status: 500 });
  }
}
