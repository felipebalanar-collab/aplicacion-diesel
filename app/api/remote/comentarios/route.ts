import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth } from "@/lib/remoteAuth";

export async function GET(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    const inyectorId = request.nextUrl.searchParams.get("inyectorId");

    let query = supabaseAdmin.from("comentarios").select("*").order("timestamp", { ascending: false });

    if (ctx.rol !== "admin") {
      query = query.eq("usuario_id", ctx.userId);
    }

    if (inyectorId) {
      query = query.eq("inyector_id", inyectorId);
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: "FETCH_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ comentarios: data });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    const body = await request.json();

    const asunto = String(body.asunto || "").trim();
    const texto = String(body.texto || "").trim();
    const tipo = String(body.tipo || "sugerencia");
    const inyectorId = body.inyectorId ? String(body.inyectorId) : null;

    if (!asunto || !texto) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from("comentarios").insert({
      usuario_id: ctx.userId,
      asunto,
      texto,
      tipo,
      inyector_id: inyectorId,
      estado: "nuevo",
    }).select("id,timestamp").single();

    if (error) {
      return NextResponse.json({ error: "CREATE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ comment: data });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
