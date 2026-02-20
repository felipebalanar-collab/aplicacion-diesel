const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function check() {
  try {
    // Test direct SQL
    const raw = await prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM Injector')
    console.log('[RAW SQL] Count:', raw)
    
    // Test Prisma
    const injectors = await prisma.injector.findMany({ take: 5 })
    console.log('[PRISMA] Found:', injectors.length)
    if (injectors.length > 0) {
      console.log('First:', injectors[0])
    }
    
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

check()
