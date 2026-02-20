const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const injectors = await prisma.injector.findMany();
    console.log(`Updating ${injectors.length} injectors...`);

    for (const inj of injectors) {
        let family = inj.family;
        let type = inj.type;

        // If type looks like a family (e.g. "110"), move it to family and set type to "diesel"
        if (type && type !== "diesel" && type !== "gasoline") {
            family = type;
            type = "diesel";
        } else if (!family && inj.brand === "BOSCH") {
            family = "110"; // Most of our current batch is 110
        }

        await prisma.injector.update({
            where: { id: inj.id },
            data: { family, type }
        });
    }

    console.log("Migration complete!");
    await prisma.$disconnect();
}
main();
