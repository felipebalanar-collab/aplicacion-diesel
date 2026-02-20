const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const injectors = await prisma.injector.findMany();
    console.log(`Migrating ${injectors.length} injectors to new hierarchy...`);

    for (const inj of injectors) {
        let fuelType = "diesel";
        let category = "inyector";
        let family = inj.family || "";

        // Basic logic to determine fuel type if not set
        if (inj.type === "gasoline") {
            fuelType = "gasoline";
        }

        await prisma.injector.update({
            where: { id: inj.id },
            data: { fuelType, category, family }
        });
    }

    console.log("Hierarchy migration complete!");
    await prisma.$disconnect();
}
main();
