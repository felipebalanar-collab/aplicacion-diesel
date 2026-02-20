const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Datos reales extraídos de las tablas  - Mapeados a inyectores existentes
const realTestPlans = [
  {
    injectorNumber: "0445110183",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110059",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1300, rpm: 1000, pulse: 1300, flow: 72.0, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 19.2, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 600, flow: 4.0, return: 1.5 }
    ]
  },
  {
    injectorNumber: "0445110201",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 950, flow: 31.0, return: 2.4 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 13.2, return: 2.0 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 650, flow: 4.8, return: 1.5 }
    ]
  },
  {
    injectorNumber: "0445110202",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 950, flow: 31.0, return: 2.4 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 13.2, return: 2.0 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 650, flow: 4.8, return: 1.5 }
    ]
  },
  {
    injectorNumber: "0445110203",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 51.8, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.4, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.9, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110204",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 51.8, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.4, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.9, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110205",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 45.8, return: 4.2 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.9, return: 3.0 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 550, flow: 2.7, return: 2.0 }
    ]
  },
  {
    injectorNumber: "0445110206",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 55.6, return: 4.2 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.0, return: 3.0 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 550, flow: 3.0, return: 1.4 }
    ]
  },
  {
    injectorNumber: "0445110207",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 1000, flow: 54.3, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.9, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 600, flow: 3.4, return: 1.4 }
    ]
  },
  {
    injectorNumber: "0445110208",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110209",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110211",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110212",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 50.9, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 18.8, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 4.7, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110213",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 41.0, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.2, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 5.2, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110214",
    plans: [
      { name: "VL", pressure: 1350, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 41.0, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.2, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 675, flow: 5.2, return: 1.6 }
    ]
  },
  {
    injectorNumber: "0445110215",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 800, flow: 41.3, return: 4.2 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 16.5, return: 3.0 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 550, flow: 2.5, return: 2.0 }
    ]
  },
  {
    injectorNumber: "0445110216",
    plans: [
      { name: "VL", pressure: 1400, rpm: 1500, pulse: 0, flow: 0, return: 0 },
      { name: "LL", pressure: 1350, rpm: 1000, pulse: 1000, flow: 54.3, return: 4.0 },
      { name: "VE", pressure: 800, rpm: 1000, pulse: 500, flow: 17.9, return: 2.5 },
      { name: "EM", pressure: 250, rpm: 1500, pulse: 600, flow: 3.4, return: 1.4 }
    ]
  }
];

async function seedRealData() {
  try {
    console.log("🔄 Cargando TestPlans reales en inyectores Bosch...\n");

    for (const data of realTestPlans) {
      const injector = await prisma.injector.findUnique({
        where: { number: data.injectorNumber }
      });

      if (injector) {
        console.log(`📝 Actualizando: ${data.injectorNumber}`);

        // Eliminar TestPlans antiguos
        await prisma.testPlan.deleteMany({
          where: { injectorId: injector.id }
        });

        // Insertar nuevos TestPlans
        for (const plan of data.plans) {
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
                tolerance: "5%"
              })
            }
          });
        }

        console.log(`   ✅ 4 TestPlans creados`);
      }
    }

    console.log("\n✅ Datos técnicos reales cargados exitosamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seedRealData();
