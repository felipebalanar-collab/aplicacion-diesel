const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function verify() {
  try {
    console.log('\n📊 VERIFICACIÓN COMPLETA DE BD:\n')
    
    const injectors = await prisma.injector.count()
    const testPlans = await prisma.testPlan.count()
    const caudalTables = await prisma.caudalTable.count()
    const hardwareTips = await prisma.hardwareTip.count()
    const users = await prisma.user.count()
    
    console.log(`✅ Injectors:     ${injectors}`)
    console.log(`✅ TestPlans:    ${testPlans}`)
    console.log(`✅ CaudalTables: ${caudalTables}`)
    console.log(`✅ HardwareTips: ${hardwareTips}`)
    console.log(`✅ Users:        ${users}`)
    
    if (injectors > 0 && testPlans > 0) {
      const inj = await prisma.injector.findFirst({
        include: { testPlans: true, caudalTables: true }
      })
      console.log(`\n📋 Injector de ejemplo:`)
      console.log(`  - Número: ${inj.number}`)
      console.log(`  - Marca: ${inj.brand}`)
      console.log(`  - TestPlans: ${inj.testPlans.length}`)
      console.log(`  - CaudalTables: ${inj.caudalTables.length}`)
    }
    
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

verify()
