import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function GET(request: NextRequest) {
  try {
    // Knowledge base is public - no auth required for reading
    const { data, error } = await supabaseAdmin
      .from("assistant_kb")
      .select("id,title,keywords,answer,active")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "FETCH_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ items: data });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    return NextResponse.json({ error: code }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const body = await request.json();
    const title = String(body.title || "").trim();
    const answer = String(body.answer || "").trim();
    const keywords = Array.isArray(body.keywords) ? body.keywords : [];
    const active = body.active !== undefined ? Boolean(body.active) : true;

    if (!title || !answer) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("assistant_kb")
      .insert({
        title,
        answer,
        keywords,
        active,
        created_by: ctx.userId,
      })
      .select("id,title,keywords,answer,active")
      .single();

    if (error) {
      return NextResponse.json({ error: "CREATE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ item: data });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
