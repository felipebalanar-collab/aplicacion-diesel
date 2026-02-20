import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import InjectorDetailClient from "./InjectorDetailClient";

export default async function InjectorDetail({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
    const injector = await prisma.injector.findUnique({
        where: { number: number },
        include: {
            testPlans: true,
            caudalTables: true,
        },
    });

    if (!injector) notFound();

    const hardwareTips = await prisma.hardwareTip.findMany({
        where: { injectorType: injector.type },
    });

    return <InjectorDetailClient injector={injector} hardwareTips={hardwareTips} />;
}
