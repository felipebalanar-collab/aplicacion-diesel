import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth } from "@/lib/remoteAuth";

export async function POST(request: NextRequest) {
  try {
    await requireAuth(request);
    const { data, error } = await supabaseAdmin
      .from("database_versions")
      .select("version,descripcion,url_descarga,tipo,es_critica,requiere_reinstalacion,fecha_publicacion")
      .eq("publicada", true)
      .order("fecha_publicacion", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json({ updateAvailable: false });
    }

    return NextResponse.json({ updateAvailable: true, update: data });
  } catch (err) {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
