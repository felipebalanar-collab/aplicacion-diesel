import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const body = await request.json();
    const { testPlans, caudalTables, id, ...injectorData } = body || {};

    const injector = await prisma.injector.update({
      where: { id: params.id },
      data: {
        ...injectorData,
        testPlans: {
          deleteMany: {},
          create: Array.isArray(testPlans)
            ? testPlans.map((tp: any) => ({
                name: tp.name,
                parameters: tp.parameters,
                isUniversal: tp.isUniversal ?? true,
              }))
            : [],
        },
        caudalTables: {
          deleteMany: {},
          create: Array.isArray(caudalTables)
            ? caudalTables.map((ct: any) => ({
                pressure: ct.pressure ?? null,
                rpm: ct.rpm ?? null,
                pulse: ct.pulse ?? null,
                normal: ct.normal ?? null,
                normalDelta: ct.normalDelta ?? null,
                real: ct.real ?? null,
                flowRateMin: ct.flowRateMin ?? null,
                flowRateMax: ct.flowRateMax ?? null,
                returnFlowMin: ct.returnFlowMin ?? null,
                returnFlowMax: ct.returnFlowMax ?? null,
                matchingTime: ct.matchingTime ?? null,
              }))
            : [],
        },
      },
      include: {
        testPlans: true,
        caudalTables: true,
      },
    });

    return NextResponse.json({ ok: true, injector });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
