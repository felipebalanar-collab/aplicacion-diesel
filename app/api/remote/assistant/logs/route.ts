import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function GET(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const { data, error } = await supabaseAdmin
      .from("assistant_logs")
      .select("id,user_id,question,answer,created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      return NextResponse.json({ error: "FETCH_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ logs: data });
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
    const question = String(body.question || "").trim();
    const answer = String(body.answer || "").trim();

    if (!question || !answer) {
      return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("assistant_logs")
      .insert({
        user_id: ctx.userId,
        question,
        answer,
      });

    if (error) {
      return NextResponse.json({ error: "CREATE_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ saved: true });
  } catch (err: any) {
    const code = err?.message || "SERVER_ERROR";
    const status = code === "MISSING_AUTH" ? 401 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
