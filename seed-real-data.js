const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Datos reales extraídos de las tablas de especificaciones técnicas
const realInjectorsData = [
  {
    number: "0445110027",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 49.0, return: 32.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110021",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1300, rpm: 1000, pulse: 1300, flow: 72.0, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 40.0, return: 22.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 19.2, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 600, flow: 4.0, return: 1.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110022",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 950, flow: 31.0, return: 2.4, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 34.0, return: 17.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 13.2, return: 2.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 650, flow: 4.8, return: 1.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110023",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 950, flow: 31.0, return: 2.4, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 34.0, return: 17.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 13.2, return: 2.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 650, flow: 4.8, return: 1.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110024",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 51.8, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 47.0, return: 30.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.4, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.9, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110025",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 51.8, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 47.0, return: 30.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.4, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.9, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110002",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 45.8, return: 4.2, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 41.0, return: 23.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.9, return: 3.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 550, flow: 2.7, return: 2.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110007",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 55.6, return: 4.2, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 41.0, return: 23.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.0, return: 3.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 550, flow: 3.0, return: 1.4, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110008",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 1000, flow: 54.3, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 42.0, return: 24.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.9, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 600, flow: 3.4, return: 1.4, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110009",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 49.0, return: 32.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110010",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 49.0, return: 32.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110011",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 49.0, return: 32.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110012",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 49.0, return: 32.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110014",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 41.0, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 47.0, return: 30.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.2, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 5.2, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110015",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 41.0, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 47.0, return: 30.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.2, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 5.2, return: 1.6, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110019",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 41.3, return: 4.2, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 39.0, return: 11.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 16.5, return: 3.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 550, flow: 2.5, return: 2.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  },
  {
    number: "0445110020",
    brand: "Bosch",
    type: "SOLENOIDE",
    fuelType: "diesel",
    category: "inyector",
    testPlans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 35.0, return: 35.0, tolerance: "5%" },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 1000, flow: 54.3, return: 4.0, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 42.0, return: 24.0, tolerance: "5%" },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.9, return: 2.5, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 600, flow: 3.4, return: 1.4, tolerance: "5%" },
      { name: "", pressure: "", rpm: "", pulse: "", flow: 0, return: 0, tolerance: "5%" },
    ]
  }
];

async function seedRealData() {
  try {
    console.log("🔄 Actualizando TestPlans con datos reales...\n");

    for (const injectorData of realInjectorsData) {
      const injector = await prisma.injector.findUnique({
        where: { number: injectorData.number }
      });

      if (injector) {
        console.log(`📝 Actualizando datos para: ${injectorData.number}`);

        // Eliminar TestPlans antiguos
        await prisma.testPlan.deleteMany({
          where: { injectorId: injector.id }
        });

        // Insertar nuevos TestPlans
        for (const plan of injectorData.testPlans) {
          if (plan.name) {
            await prisma.testPlan.create({
              data: {
                injectorId: injector.id,
                name: plan.name,
                parameters: JSON.stringify({
                  pressure: plan.pressure,
                  rpm: plan.rpm,
                  pulse: plan.pulse,
                  flow: plan.flow,
                  return: plan.return,
                  tolerance: plan.tolerance
                })
              }
            });
          }
        }

        console.log(`   ✅ ${injectorData.testPlans.length} registros creados`);
      } else {
        console.log(`   ⚠️  Inyector NO encontrado: ${injectorData.number}`);
      }
    }

    console.log("\n✅ Datos reales actualizados exitosamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seedRealData();
