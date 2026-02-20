import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "sin autenticarse" }, { status: 401 });
    }

    const userData = verifyToken(token);
    if (!userData || !userData.isAdmin) {
      return NextResponse.json({ error: "no autorizado" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("unanswered_questions")
      .select("*")
      .order("count", { ascending: false })
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ questions: data || [] });
  } catch (err) {
    console.error("Error in GET unanswered:", err);
    return NextResponse.json({ error: "error interno" }, { status: 500 });
  }
}
