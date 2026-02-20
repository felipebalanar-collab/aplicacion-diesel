const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verify() {
  try {
    const users = await prisma.user.findMany()
    const injectors = await prisma.injector.findMany()
    
    console.log('✅ Users:', users.length)
    users.forEach(u => console.log(`   - ${u.email} (role: ${u.role})`))
    
    console.log('✅ Injectors:', injectors.length)
    
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

verify()
