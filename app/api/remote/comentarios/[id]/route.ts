import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const body = await request.json();
    const update: Record<string, unknown> = {};

    if (body.estado) update.estado = String(body.estado);
    if (body.leido !== undefined) update.leido = Boolean(body.leido);
    if (body.respuesta) update.respuesta = String(body.respuesta);

    const { error } = await supabaseAdmin.from("comentarios").update(update).eq("id", params.id);
    if (error) {
      return NextResponse.json({ error: "UPDATE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ updated: true });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
