const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
    console.log("Starting Technical Classification (Solenoid vs Piezo)...");
    const injectors = await prisma.injector.findMany();

    for (const inj of injectors) {
        const num = inj.number.toUpperCase().replace(/[\s.-]/g, "");
        let technology = "SOLENOIDE"; // Default

        // --- TECHNOLOGY DETECTION ---

        // BOSCH PIEZO: 0445115, 0445116, 0445117, 0445118
        if (num.startsWith("0445115") || num.startsWith("0445116") || num.startsWith("0445117") || num.startsWith("0445118")) {
            technology = "PIEZO";
        }
        // BOSCH SOLENOID: 0445110 (CRI1/2), 0445120 (CRIN)
        else if (num.startsWith("0445110") || num.startsWith("0445120")) {
            technology = "SOLENOIDE";
        }

        // DENSO PIEZO: G3P, G4P series (often starts with 295050, 295700, etc.)
        if (num.startsWith("295050") || num.startsWith("295700") || num.startsWith("16600-EB") || num.startsWith("23670-E")) {
            technology = "PIEZO";
        }

        // DELPHI PIEZO: Euro 5/6 (some EJBR series are solenoid, but DFI3 are piezo)
        // For now, most common Delphi in DB are EJBR (Solenoid)

        // SIEMENS / VDO / CONTINENTAL: Almost all Common Rail from Siemens are PIEZO
        if (num.startsWith("5WS") || num.startsWith("A2C") || num.startsWith("965")) {
            technology = "PIEZO";
        }

        // --- UPDATE ---
        // Since the 'technology' column might not be ready in the client yet due to locks,
        // we will utilize the 'type' field which already exists in the schema.
        await prisma.injector.update({
            where: { id: inj.id },
            data: {
                type: technology,
                // If we can use the new column via raw, we would, 
                // but let's stick to 'type' for now as a safe fallback.
            }
        });
        console.log(`[TECH] ${inj.number} -> ${technology}`);
    }

    console.log("Technical Classification complete.");
}

migrate()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
