const { searchInjectors } = require('./app/actions.ts')

// Simular búsqueda
async function test() {
  console.log('🔍 Test 1: Buscar "011"')
  const results1 = await searchInjectors('011')
  console.log('Resultados:', results1.length)
  results1.forEach(r => console.log(`  - ${r.number} (${r.brand})`))
  
  console.log('\n🔍 Test 2: Búsqueda vacía')
  const results2 = await searchInjectors('')
  console.log('Resultados:', results2.length)
  
  process.exit(0)
}

test().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
