import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function GET() {
    const injectors = await prisma.injector.findMany({
        include: {
            testPlans: true,
            caudalTables: true,
        },
        orderBy: {
            number: 'asc'
        }
    });
    return NextResponse.json(injectors);
}

export async function POST(request: NextRequest) {
    try {
        const authResult = await requireAuth(request);
        if (authResult.error) {
            return NextResponse.json({ error: authResult.error }, { status: authResult.status });
        }

        const adminResult = await requireAdmin(request, authResult.user!);
        if (adminResult.error) {
            return NextResponse.json({ error: adminResult.error }, { status: adminResult.status });
        }

        const body = await request.json();
        const { testPlans, caudalTables, ...injectorData } = body;

        if (!injectorData.number) {
            return NextResponse.json({ error: "El número de parte es requerido" }, { status: 400 });
        }

        // Check if injector already exists
        const existing = await prisma.injector.findUnique({
            where: { number: injectorData.number }
        });

        if (existing) {
            return NextResponse.json({ error: "Ya existe un inyector con ese número" }, { status: 409 });
        }

        const injector = await prisma.injector.create({
            data: {
                ...injectorData,
                testPlans: {
                    create: Array.isArray(testPlans) ? testPlans.map((tp: any) => ({
                        name: tp.name,
                        parameters: tp.parameters || "{}",
                        isUniversal: tp.isUniversal ?? true,
                    })) : []
                },
                caudalTables: {
                    create: Array.isArray(caudalTables) ? caudalTables : []
                }
            },
            include: {
                testPlans: true,
                caudalTables: true
            }
        });

        return NextResponse.json(injector, { status: 201 });
    } catch (error: any) {
        console.error("Error creating injector:", error);
        return NextResponse.json({ error: error.message || "Error al crear inyector" }, { status: 500 });
    }
}
