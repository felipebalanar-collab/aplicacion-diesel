const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const numbers = ["0445110007", "0445110008", "0445110009", "0445110010", "0445110011", "0445110012", "0445110014", "0445110015", "0445110019", "0445110020"];
    const found = await prisma.injector.findMany({
        where: { number: { in: numbers } },
        select: { number: true }
    });
    console.log("Injectors found:", found.map(f => f.number).join(", "));
    await prisma.$disconnect();
}
main();
