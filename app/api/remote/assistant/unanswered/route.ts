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

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "sin autenticarse" }, { status: 401 });
    }

    const userData = verifyToken(token);
    if (!userData || !userData.userId) {
      return NextResponse.json({ error: "token inválido" }, { status: 401 });
    }

    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "pregunta requerida" }, { status: 400 });
    }

    // Try to upsert: if question exists, increment count; otherwise create new
    const { data: existing } = await supabase
      .from("unanswered_questions")
      .select("id, count")
      .eq("question", question)
      .single();

    if (existing) {
      // Update count and timestamp
      const { error } = await supabase
        .from("unanswered_questions")
        .update({
          count: existing.count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      // Insert new unanswered question
      const { error } = await supabase
        .from("unanswered_questions")
        .insert({
          user_id: userData.userId,
          question: question.substring(0, 1000), // Limit length
          count: 1,
        });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: "pregunta registrada para revisión" });
  } catch (err) {
    console.error("Error in unanswered route:", err);
    return NextResponse.json({ error: "error interno" }, { status: 500 });
  }
}
