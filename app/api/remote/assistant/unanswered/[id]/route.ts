import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "sin autenticarse" }, { status: 401 });
    }

    const userData = verifyToken(token);
    if (!userData || !userData.isAdmin) {
      return NextResponse.json({ error: "no autorizado" }, { status: 403 });
    }

    const { error } = await supabase
      .from("unanswered_questions")
      .delete()
      .eq("id", params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in DELETE unanswered:", err);
    return NextResponse.json({ error: "error interno" }, { status: 500 });
  }
}
