import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";

export type AuthContext = {
  userId: string;
  email: string;
  rol: "admin" | "cliente";
};

export async function requireAuth(request: NextRequest): Promise<AuthContext> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("MISSING_AUTH");
  }

  const token = authHeader.replace("Bearer ", "");
  const payload = await verifyToken(token);

  const userId = payload.sub as string | undefined;
  if (!userId) {
    throw new Error("INVALID_TOKEN");
  }

  const { data: user, error } = await supabaseAdmin
    .from("users")
    .select("id,email,rol,estado,fecha_vencimiento")
    .eq("id", userId)
    .single();

  if (error || !user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.estado !== "activo") {
    throw new Error("USER_INACTIVE");
  }

  const vencimiento = new Date(user.fecha_vencimiento);
  const hoy = new Date();
  if (vencimiento.getTime() < hoy.getTime()) {
    throw new Error("LICENSE_EXPIRED");
  }

  return {
    userId: user.id,
    email: user.email,
    rol: user.rol,
  };
}

export function requireAdmin(ctx: AuthContext) {
  if (ctx.rol !== "admin") {
    throw new Error("FORBIDDEN");
  }
}
