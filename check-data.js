const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function check() {
  try {
    const injectors = await prisma.injector.count()
    const testPlans = await prisma.testPlan.count()
    const caudalTables = await prisma.caudalTable.count()
    const hardwareTips = await prisma.hardwareTip.count()
    
    console.log('\n📊 ESTADÍSTICAS DE BD:')
    console.log(`✅ Injectors: ${injectors}`)
    console.log(`✅ TestPlans: ${testPlans}`)
    console.log(`✅ CaudalTables: ${caudalTables}`)
    console.log(`✅ HardwareTips: ${hardwareTips}`)
    
    if (testPlans > 0) {
      const sample = await prisma.testPlan.findFirst()
      console.log('\n📋 Ejemplo TestPlan:')
      console.log(JSON.stringify(sample, null, 2).slice(0, 300))
    }
    
    process.exit(0)
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

check()
