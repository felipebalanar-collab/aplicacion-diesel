const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('\n=== VERIFICACIÓN DE BASE DE DATOS ===\n');

    // Verificar inyectores
    const injectors = await prisma.injector.findMany();
    console.log(`✅ Total de inyectores: ${injectors.length}`);
    if (injectors.length > 0) {
      console.log('Primeros 3 inyectores:');
      injectors.slice(0, 3).forEach(inj => {
        console.log(`  - ${inj.number}: ${inj.brand} ${inj.family}`);
      });
    }

    // Verificar que se pueden buscar
    const searchResult = await prisma.injector.findMany({
      where: {
        fuelType: 'diesel'
      }
    });
    console.log(`\n✅ Inyectores diesel: ${searchResult.length}`);

    // Verificar estructura de datos
    if (injectors.length > 0) {
      console.log('\n✅ Estructura del primer inyector:');
      const first = injectors[0];
      console.log(JSON.stringify(first, null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
