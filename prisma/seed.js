const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt')
async function main() {
    const injectors = [
        // --- BOSCH DIESEL (Solenoid) ---
        {
            number: '0445110183', brand: 'Bosch', type: 'diesel', vehicles: 'Mercedes Sprinter 2.2 CDi',
            similarParts: '0445110182, 0986435084', spareParts: 'F00VC01359 (Valvula), F00VC01502 (Bola)',
            resistance: 0.30, inductance: 1.45, isolationMems: 2500, bipTime: 0.48,
            testSteps: [
                { name: 'VL (Plena Carga)', pressure: 1600, flow: '49.0 - 55.0', return: '35.0 - 55.0' },
                { name: 'LL (Ralentí)', pressure: 250, flow: '4.5 - 6.5', return: '25.0 - 45.0' },
                { name: 'VE (Pre-Inyección)', pressure: 800, flow: '1.2 - 3.2', return: '20.0 - 45.0' },
                { name: 'EM (Emisiones)', pressure: 800, flow: '18.0 - 24.0', return: '30.0 - 50.0' }
            ]
        },
        {
            number: '0445110059', brand: 'Bosch', type: 'diesel', vehicles: 'Hyundai Santa Fe 2.0/2.2',
            similarParts: '33800-27000', spareParts: 'Anillo O, Microfiltro',
            resistance: 0.26, inductance: 1.25, isolationMems: 1800, bipTime: 0.45,
            testSteps: [
                { name: 'VL (Plena Carga)', pressure: 1350, flow: '52.0 - 58.0', return: '30.0 - 50.0' },
                { name: 'LL (Ralentí)', pressure: 250, flow: '4.8 - 7.5', return: '20.0 - 40.0' }
            ]
        },
        {
            number: '0445115067', brand: 'Bosch Piezo', type: 'diesel', vehicles: 'Audi A4/A6 3.0 TDI',
            similarParts: '059130277BE', spareParts: 'Kit Piezo Bosch Original',
            resistance: 180000, capacitance: 3.2, isolationMems: 5000, bipTime: 0.35,
            testSteps: [
                { name: 'VL (Plena Carga)', pressure: 1600, flow: '42.0 - 48.0', return: '15.0 - 25.0' },
                { name: 'LL (Ralentí)', pressure: 250, flow: '3.5 - 5.5', return: '5.0 - 15.0' }
            ]
        },
        // --- DELPHI DIESEL ---
        {
            number: 'EJBR00101Z', brand: 'Delphi', type: 'diesel', vehicles: 'Renault Kangoo 1.5 dCi',
            similarParts: '28232242', spareParts: '9308-621C (Valvula), L096PBD (Tobera)',
            resistance: 0.22, inductance: 0.85, isolationMems: 1200, bipTime: 0.58,
            testSteps: [
                { name: 'VL (Plena Carga)', pressure: 1400, flow: '44.5 - 47.5', return: '25.0 - 45.0' },
                { name: 'LL (Ralentí)', pressure: 230, flow: '4.2 - 6.2', return: '15.0 - 35.0' }
            ]
        },
        // --- DENSO DIESEL ---
        {
            number: '23670-30050', brand: 'Denso', type: 'diesel', vehicles: 'Toyota Hilux 3.0 D-4D',
            similarParts: '095000-5881', spareParts: 'Tobera DLLA145P870',
            resistance: 0.42, inductance: 1.65, isolationMems: 1600, bipTime: 0.65,
            testSteps: [
                { name: 'VL (Plena Carga)', pressure: 1600, flow: '58.0 - 64.0', return: '40.0 - 65.0' },
                { name: 'LL (Ralentí)', pressure: 280, flow: '5.5 - 9.5', return: '30.0 - 55.0' }
            ]
        },
        // --- BOSCH GASOLINE (GDI) ---
        {
            number: '0261500011', brand: 'Bosch GDI', type: 'gasoline', vehicles: 'VW Golf GTI MK5',
            similarParts: '06H906036G', spareParts: 'Microfiltro GDI, Teflon Ring',
            resistance: 12.5, inductance: 12.2, isolationMems: 1000, bipTime: 0.85,
            testSteps: [
                { name: 'High Static Flow', pressure: 100, flow: '120.0 - 140.0', return: '0.0' },
                { name: 'Pulsed Flow', pressure: 50, flow: '25.0 - 32.0', return: '0.0' }
            ]
        }
    ];

    console.log('Cleaning existing data...');
    await prisma.testPlan.deleteMany({});
    await prisma.caudalTable.deleteMany({});
    await prisma.hardwareTip.deleteMany({});
    await prisma.injector.deleteMany({});

    console.log('Inserting detailed Injectors and Test Plans...');
    for (const inj of injectors) {
        const { testSteps, ...injectorData } = inj;
        const createdInjector = await prisma.injector.create({
            data: {
                ...injectorData,
                testPlans: {
                    create: testSteps.map(step => ({
                        name: step.name,
                        parameters: JSON.stringify({ pressure: step.pressure, flow: step.flow, return: step.return })
                    }))
                }
            }
        });

        // Also create some caudal table entries for the chart/reference
        await prisma.caudalTable.createMany({
            data: testSteps.map(step => ({
                injectorId: createdInjector.id,
                pressure: step.pressure,
                flowRateMin: parseFloat(step.flow.split(' - ')[0]),
                flowRateMax: parseFloat(step.flow.split(' - ')[1] || step.flow.split(' - ')[0]),
                returnFlowMin: step.return ? parseFloat(step.return.split(' - ')[0]) : 0,
                returnFlowMax: step.return ? parseFloat(step.return.split(' - ')[1] || step.return.split(' - ')[0]) : 0,
            }))
        });
    }

    // Add 50 more generic but differentiated models
    for (let i = 1; i <= 50; i++) {
        const num = `0445110${200 + i}`;
        const brand = i % 10 === 0 ? 'Delphi' : 'Bosch';
        const resistance = brand === 'Delphi' ? 0.22 : 0.30;

        const createdInj = await prisma.injector.create({
            data: {
                number: num,
                brand: brand,
                type: 'diesel',
                vehicles: 'Generic Euro Engine',
                resistance: resistance + (Math.random() * 0.05),
                inductance: 1.2 + (Math.random() * 0.5),
                isolationMems: 1500 + (Math.random() * 2000),
                testPlans: {
                    create: [
                        { name: 'VL', parameters: JSON.stringify({ pressure: 1400, flow: '52-56', return: '30-50' }) },
                        { name: 'LL', parameters: JSON.stringify({ pressure: 250, flow: '5-7', return: '15-35' }) }
                    ]
                },
                caudalTables: {
                    create: [{ pressure: 1400, flowRateMin: 52, flowRateMax: 56, returnFlowMin: 30, returnFlowMax: 50 }]
                }
            }
        });
    }

    console.log('Inserting Educational Tips for AI...');
    await prisma.hardwareTip.createMany({
        data: [
            {
                injectorType: 'diesel', category: 'diagnostic', title: 'Medición de Aislamiento',
                detail: 'Es NECESARIO medir el aislamiento (>1000 MΩ) a 500V o 1000V. Si hay fuga a masa, la corriente "salta" a la carcasa, lo que puede provocar que el driver de la computadora se queme instantáneamente o que el vehículo se apague en caliente al dilatarse los materiales.'
            },
            {
                injectorType: 'diesel', category: 'diagnostic', title: 'Inductancia vs Resistencia',
                detail: 'La bobina puede marcar 0.3 Ω (bién) pero tener 0.5 mH (mal). Una inductancia baja sugiere espiras en cortocircuito internas, lo que debilita el campo magnético y causa fallos de entrega bajo carga.'
            },
            {
                injectorType: 'diesel', category: 'diagnostic', title: 'El Tiempo BIP',
                detail: 'El Begin of Injection Period (BIP) mide el tiempo exacto desde que se envía la corriente hasta que la válvula cierra mecánicamente. Diferencias de >0.05ms entre inyectores de un mismo motor causan inestabilidad y cabeceo.'
            }
        ]
    });
    // Create admin user for login
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    // Get or create admin role
    let adminRole = await prisma.role.findUnique({ where: { name: 'admin' } })
    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: { name: 'admin', description: 'Administrator role' }
        })
    }
    
    await prisma.user.upsert({
        where: { email: 'admin@test.com' },
        update: { passwordHash: hashedPassword },
        create: {
            email: 'admin@test.com',
            passwordHash: hashedPassword,
            name: 'Admin User',
            userRoles: {
                create: {
                    roleId: adminRole.id
                }
            }
        }
    });
    console.log('✅ Admin user created: admin@test.com / password123');

    console.log('Seed finished with total information for 56 models.');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
