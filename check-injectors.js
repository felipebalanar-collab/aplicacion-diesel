const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkInjectors() {
  try {
    // Contar todos los inyectores
    const totalInjectors = await prisma.injector.count();
    console.log(`\n📊 Total de inyectores en la BD: ${totalInjectors}`);
    
    // Bosch Diesel
    const boschDiesel = await prisma.injector.findMany({
      where: {
        brand: 'Bosch',
        fuelType: 'diesel'
      },
      select: {
        number: true,
        testPlans: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        number: 'asc'
      }
    });
    
    console.log(`\n🔍 Inyectores Bosch Diesel: ${boschDiesel.length}`);
    console.log('\nLista completa:');
    boschDiesel.forEach((inj, idx) => {
      console.log(`${idx + 1}. ${inj.number} - ${inj.testPlans.length} TestPlans`);
    });
    
    // Verificar los 16 con datos reales
    const realDataNumbers = [
      '0445110183', '0445110059', '0445110201', '0445110202',
      '0445110203', '0445110204', '0445110205', '0445110206',
      '0445110207', '0445110208', '0445110209', '0445110211',
      '0445110212', '0445110213', '0445110214', '0445110215',
      '0445110216'
    ];
    
    console.log('\n✨ Verificando inyectores con datos reales:');
    for (const num of realDataNumbers) {
      const inj = await prisma.injector.findUnique({
        where: { number: num },
        include: {
          testPlans: true
        }
      });
      
      if (inj) {
        console.log(`✅ ${num} - ${inj.testPlans.length} TestPlans`);
      } else {
        console.log(`❌ ${num} - NO ENCONTRADO`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkInjectors();
