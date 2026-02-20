import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const body = await request.json();
    const update: Record<string, unknown> = {};

    if (body.title) update.title = String(body.title);
    if (body.answer) update.answer = String(body.answer);
    if (body.keywords) update.keywords = Array.isArray(body.keywords) ? body.keywords : [];
    if (body.active !== undefined) update.active = Boolean(body.active);
    update.updated_at = new Date().toISOString();

    const { error } = await supabaseAdmin
      .from("assistant_kb")
      .update(update)
      .eq("id", params.id);

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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const { error } = await supabaseAdmin
      .from("assistant_kb")
      .delete()
      .eq("id", params.id);

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
