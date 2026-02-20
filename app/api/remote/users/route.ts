import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { requireAuth, requireAdmin } from "@/lib/remoteAuth";

export async function GET(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    requireAdmin(ctx);

    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[GET /api/remote/users] Supabase error:", error);
      return NextResponse.json({ error: "FETCH_FAILED", details: error }, { status: 500 });
    }

    console.log("[GET /api/remote/users] First user sample:", data?.[0] ? Object.keys(data[0]) : "no data");
    return NextResponse.json({ users: data });
  } catch (err: any) {
    console.error("[GET /api/remote/users] Exception:", err);
    const code = err?.message || "SERVER_ERROR";
    const status = code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ error: code }, { status });
  }
}
