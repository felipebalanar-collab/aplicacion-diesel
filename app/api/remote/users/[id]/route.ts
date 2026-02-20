import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const { error } = await supabaseAdmin.from("users").delete().eq("id", params.id);
    if (error) {
      return NextResponse.json({ error: "DELETE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ deleted: true });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const body = await request.json();
    const update: Record<string, unknown> = {};

    if (body.estado) update.estado = String(body.estado);
    if (body.fecha_vencimiento) update.fecha_vencimiento = String(body.fecha_vencimiento);
    if (body.limite_dispositivos !== undefined) update.limite_dispositivos = Number(body.limite_dispositivos);
    if (body.meses_contratados !== undefined) update.meses_contratados = Number(body.meses_contratados);
    if (body.nombre) update.nombre = String(body.nombre);
    if (body.empresa) update.empresa = String(body.empresa);
    if (body.telefono) update.telefono = String(body.telefono);

    console.log("[PUT /api/remote/users/[id]]", { userId: params.id, updateData: update });

    const { error, data } = await supabaseAdmin.from("users").update(update).eq("id", params.id).select();
    if (error) {
      console.error("[PUT /api/remote/users/[id]] Supabase error:", error);
      return NextResponse.json({ error: error.message || "UPDATE_FAILED", details: error }, { status: 500 });
    }

    console.log("[PUT /api/remote/users/[id]] Success:", data);
    return NextResponse.json({ updated: true, data });
  } catch (err: any) {
    console.error("[PUT /api/remote/users/[id]] Catch error:", err);
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
