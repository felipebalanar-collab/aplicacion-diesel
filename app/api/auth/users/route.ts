import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, adminSecret } = body

    // Verificar que sea el admin (usa una contraseña maestra desde variables de entorno)
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin_secret_change_this'
    if (adminSecret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hash,
        name: name || email.split('@')[0]
      }
    })

    return NextResponse.json({ 
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name } 
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const adminSecret = searchParams.get('adminSecret')

    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin_secret_change_this'
    if (adminSecret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, isActive: true, createdAt: true }
    })

    return NextResponse.json({ users })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
