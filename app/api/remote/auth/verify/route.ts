import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/remoteAuth";

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireAuth(request);
    return NextResponse.json({ valid: true, user: ctx });
  } catch (err: any) {
    const code = err?.message || "INVALID_TOKEN";
    const status = code === "LICENSE_EXPIRED" ? 403 : 401;
    return NextResponse.json({ valid: false, error: code }, { status });
  }
}
