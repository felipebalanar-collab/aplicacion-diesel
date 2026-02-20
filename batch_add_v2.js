const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const injectors = [
    {
        number: "0445110012",
        brand: "BOSCH",
        type: "110",
        testSteps: [
            { name: "Leak Test", p: 1350, rpm: 1500, us: 0, flow: 0, ret: 35.0, tol: 0 },
            { name: "Full Load (VL)", p: 1350, rpm: 1000, us: 800, flow: 50.9, ret: 49.0, tol: 4.0 },
            { name: "Emission (EM)", p: 800, rpm: 1000, us: 500, flow: 18.8, ret: 0, tol: 2.5 },
            { name: "Idle (LL)", p: 250, rpm: 1500, us: 675, flow: 4.7, ret: 0, tol: 1.6 },
            { name: "Pre-Injection (VE)", p: 800, rpm: 1500, us: 160, flow: 1.5, ret: 0, tol: 1.2 }
        ]
    },
    {
        number: "0445110014",
        brand: "BOSCH",
        type: "110",
        testSteps: [
            { name: "Leak Test", p: 1350, rpm: 1500, us: 0, flow: 0, ret: 35.0, tol: 0 },
            { name: "Full Load (VL)", p: 1350, rpm: 1000, us: 800, flow: 41.0, ret: 47.0, tol: 4.0 },
            { name: "Emission (EM)", p: 800, rpm: 1000, us: 500, flow: 17.2, ret: 0, tol: 2.5 },
            { name: "Idle (LL)", p: 250, rpm: 1500, us: 675, flow: 5.2, ret: 0, tol: 1.6 },
            { name: "Pre-Injection (VE)", p: 800, rpm: 1500, us: 160, flow: 1.7, ret: 0, tol: 1.3 }
        ]
    },
    {
        number: "0445110015",
        brand: "BOSCH",
        type: "110",
        testSteps: [
            { name: "Leak Test", p: 1350, rpm: 1500, us: 0, flow: 0, ret: 35.0, tol: 0 },
            { name: "Full Load (VL)", p: 1350, rpm: 1000, us: 800, flow: 41.0, ret: 47.0, tol: 4.0 },
            { name: "Emission (EM)", p: 800, rpm: 1000, us: 500, flow: 17.2, ret: 0, tol: 2.5 },
            { name: "Idle (LL)", p: 250, rpm: 1500, us: 675, flow: 5.2, ret: 0, tol: 1.6 },
            { name: "Pre-Injection (VE)", p: 800, rpm: 1500, us: 160, flow: 1.7, ret: 0, tol: 1.3 }
        ]
    },
    {
        number: "0445110020",
        brand: "BOSCH",
        type: "110",
        testSteps: [
            { name: "Leak Test", p: 1400, rpm: 1500, us: 0, flow: 0, ret: 35.0, tol: 0 },
            { name: "Full Load (VL)", p: 1350, rpm: 1000, us: 1000, flow: 54.3, ret: 42.0, tol: 4.0 },
            { name: "Emission (EM)", p: 800, rpm: 1000, us: 500, flow: 17.9, ret: 0, tol: 2.5 },
            { name: "Idle (LL)", p: 250, rpm: 1500, us: 600, flow: 3.4, ret: 0, tol: 1.4 },
            { name: "Pre-Injection (VE)", p: 800, rpm: 1500, us: 160, flow: 1.9, ret: 0, tol: 1.3 }
        ]
    },
    {
        number: "0445110019",
        brand: "BOSCH",
        type: "110",
        testSteps: [
            { name: "Leak Test", p: 1400, rpm: 1500, us: 0, flow: 0, ret: 35.0, tol: 0 },
            { name: "Full Load (VL)", p: 1350, rpm: 1000, us: 800, flow: 41.3, ret: 39.0, tol: 4.2 },
            { name: "Emission (EM)", p: 800, rpm: 1000, us: 500, flow: 16.5, ret: 0, tol: 3.0 },
            { name: "Idle (LL)", p: 250, rpm: 1500, us: 550, flow: 2.5, ret: 0, tol: 2.0 },
            { name: "Pre-Injection (VE)", p: 800, rpm: 1500, us: 160, flow: 1.8, ret: 0, tol: 1.3 }
        ]
    }
];

async function main() {
    for (const inj of injectors) {
        try {
            await prisma.testPlan.deleteMany({ where: { injector: { number: inj.number } } });
            await prisma.injector.deleteMany({ where: { number: inj.number } });

            await prisma.injector.create({
                data: {
                    number: inj.number,
                    brand: inj.brand,
                    type: inj.type,
                    vehicles: "Aplicaciones Diesel Common Rail",
                    resistance: 0.3,
                    inductance: 1.45,
                    isolationMems: 2500,
                    bipTime: 0.5,
                    testPlans: {
                        create: inj.testSteps.map(step => ({
                            name: step.name,
                            parameters: JSON.stringify({
                                pressure: step.p,
                                rpm: step.rpm,
                                pulse: step.us,
                                flow: step.flow,
                                return: step.ret,
                                tolerance: step.tol
                            })
                        }))
                    }
                }
            });
            console.log(`- Agregado: ${inj.number}`);
        } catch (e) {
            console.error(`Error en ${inj.number}:`, e);
        }
    }
    await prisma.$disconnect();
}

main();
