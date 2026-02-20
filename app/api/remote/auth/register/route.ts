import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const nombre = String(body.nombre || "");
    const rol = String(body.rol || "cliente");
    const meses = Number(body.meses || 1);
    const limiteDispositivos = Number(body.limiteDispositivos || 1);

    if (!email || !password || !nombre) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const now = new Date();
    const fechaInicio = new Date(now);
    const fechaVencimiento = new Date(now);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + meses);

    const passwordHash = await hashPassword(password);

    const { data, error } = await supabaseAdmin.from("users").insert({
      email,
      password_hash: passwordHash,
      nombre,
      rol: rol === "admin" ? "admin" : "cliente",
      estado: "activo",
      fecha_inicio: fechaInicio.toISOString().slice(0, 10),
      fecha_vencimiento: fechaVencimiento.toISOString().slice(0, 10),
      meses_contratados: meses,
      limite_dispositivos: limiteDispositivos,
      created_by: ctx.userId,
    }).select("id,email,nombre,rol,fecha_vencimiento").single();

    if (error) {
      return NextResponse.json({ error: "USER_CREATE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ user: data });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
