import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body
    if (!email || !password) return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const secret = process.env.JWT_SECRET || 'banco-de-pruebas-secret-key-2026'
    const token = jwt.sign({ sub: user.id, email: user.email }, secret, { expiresIn: '7d' })

    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Server error: ${msg}` }, { status: 500 })
  }
}
