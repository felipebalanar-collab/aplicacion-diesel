const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function test() {
  try {
    console.log('🔍 Test: Buscar inyectores con número contiendo "011"')
    
    // Test 1: SQL directo
    const all = await prisma.$queryRawUnsafe('SELECT * FROM Injector')
    console.log(`Total en BD: ${all.length}`)
    
    // Test 2: Buscar con filter como en actions.ts
    const query = '011'
    const results = all.filter(inj => {
      const matchesQuery = [
        inj.number,
        inj.family,
        inj.brand,
        inj.vehicles,
        inj.similarParts
      ].some(field => {
        if (!field) return false
        const f = String(field).toLowerCase()
        return f.includes(query.toLowerCase())
      })
      return matchesQuery
    })
    
    console.log(`\n✅ Encontrados ${results.length} con "011":`)
    results.slice(0, 5).forEach(r => {
      console.log(`   - ${r.number} | ${r.brand} | ${r.vehicles}`)
    })
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  } finally {
    process.exit(0)
  }
}

test()
