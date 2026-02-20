const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Adding BOSCH 110 - 0 445 110 027 with calibration data...');

  // Create or update the injector
  const injector = await prisma.injector.upsert({
    where: { number: '0 445 110 027' },
    update: {},
    create: {
      number: '0 445 110 027',
      brand: 'Bosch',
      type: 'diesel',
      fuelType: 'diesel',
      category: 'inyector',
      family: '110',
      technology: 'solenoide',
      vehicles: 'Various diesel engines',
      resistance: 0.30,
      inductance: 1.45,
      isolationMems: 2500,
      bipTime: 0.48
    }
  });

  console.log('Injector created/updated:', injector.id);

  // Calibration data from the image - BOSCH 110 - 0 445 110 027
  const calibrationData = [
    // Row 1
    { pressure: 1350, rpm: 1500, pulse: 0, normal: 0, normalDelta: 0, real: 0.0, matchingTime: 150 },
    // Row 1 second set
    { pressure: 1350, rpm: 1500, pulse: 0, normal: 35.0, normalDelta: 35.0, real: 0.0, matchingTime: 150 },
    // Row 2
    { pressure: 1350, rpm: 1000, pulse: 800, normal: 50.9, normalDelta: 4.0, real: 0.0, matchingTime: 150 },
    // Row 2 second set
    { pressure: 1350, rpm: 1000, pulse: 800, normal: 49.0, normalDelta: 32.0, real: 0.0, matchingTime: 150 },
    // Row 3
    { pressure: 800, rpm: 1000, pulse: 500, normal: 18.8, normalDelta: 2.5, real: 0.0, matchingTime: 150 },
    // Row 3 second set
    { pressure: 800, rpm: 1000, pulse: 500, normal: 0, normalDelta: 0, real: 0.0, matchingTime: 150 },
    // Row 4
    { pressure: 250, rpm: 1500, pulse: 675, normal: 4.7, normalDelta: 1.6, real: 0.0, matchingTime: 150 },
    // Row 4 second set
    { pressure: 250, rpm: 1500, pulse: 675, normal: 0, normalDelta: 0, real: 0.0, matchingTime: 150 },
    // Row 5
    { pressure: 800, rpm: 1500, pulse: 160, normal: 1.5, normalDelta: 1.2, real: 0.0, matchingTime: 150 },
    // Row 5 second set
    { pressure: 800, rpm: 1500, pulse: 160, normal: 0, normalDelta: 0, real: 0.0, matchingTime: 150 },
    // Row 6
    { pressure: 800, rpm: 1000, pulse: 500, normal: 18.8, normalDelta: 2.5, real: 0.0, matchingTime: 150 },
    // Row 6 second set
    { pressure: 800, rpm: 1000, pulse: 500, normal: 0, normalDelta: 0, real: 0.0, matchingTime: 150 }
  ];

  // Delete existing calibration for this injector (to avoid duplicates)
  await prisma.caudalTable.deleteMany({
    where: { injectorId: injector.id }
  });

  // Insert calibration data
  for (const data of calibrationData) {
    await prisma.caudalTable.create({
      data: {
        injectorId: injector.id,
        pressure: data.pressure,
        rpm: data.rpm,
        pulse: data.pulse,
        normal: data.normal,
        normalDelta: data.normalDelta,
        real: data.real,
        matchingTime: data.matchingTime
      }
    });
  }

  console.log(`✅ Added ${calibrationData.length} calibration records for BOSCH 110 - 0 445 110 027`);
}

main().catch(e => {
  console.error('Error:', e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
