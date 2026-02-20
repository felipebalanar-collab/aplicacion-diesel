import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken, verifyPassword } from "@/lib/auth";

function daysBetween(a: Date, b: Date) {
  const ms = b.getTime() - a.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const deviceId = String(body.dispositivo_id || body.deviceId || "").trim();
    const deviceName = String(body.nombre_dispositivo || body.deviceName || "").trim();

    if (!email || !password || !deviceId) {
      return NextResponse.json({ 
        message: "Faltan campos requeridos", 
        code: "MISSING_FIELDS" 
      }, { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin
      .from("users")
      .select("id,email,password_hash,nombre,rol,estado,fecha_vencimiento,limite_dispositivos")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json({ 
        message: "Credenciales inválidas", 
        code: "INVALID_CREDENTIALS" 
      }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ 
        message: "Credenciales inválidas", 
        code: "INVALID_CREDENTIALS" 
      }, { status: 401 });
    }

    if (user.estado !== "activo") {
      return NextResponse.json({ 
        message: "Usuario inactivo", 
        code: "USER_INACTIVE" 
      }, { status: 403 });
    }

    const vencimiento = new Date(user.fecha_vencimiento);
    const hoy = new Date();
    if (vencimiento.getTime() < hoy.getTime()) {
      return NextResponse.json({ 
        message: "Licencia vencida", 
        code: "LICENSE_EXPIRED",
        fecha_vencimiento: user.fecha_vencimiento 
      }, { status: 403 });
    }

    const { data: existingDevice } = await supabaseAdmin
      .from("dispositivos")
      .select("id,usuario_id,dispositivo_id,total_accesos")
      .eq("dispositivo_id", deviceId)
      .eq("usuario_id", user.id)
      .single();

    if (!existingDevice) {
      const { count } = await supabaseAdmin
        .from("dispositivos")
        .select("id", { count: "exact", head: true })
        .eq("usuario_id", user.id)
        .eq("estado", "activo");

      if ((count || 0) >= (user.limite_dispositivos || 1)) {
        return NextResponse.json({ 
          message: "Límite de dispositivos alcanzado", 
          code: "DEVICE_LIMIT",
          limite: user.limite_dispositivos 
        }, { status: 403 });
      }

      await supabaseAdmin.from("dispositivos").insert({
        usuario_id: user.id,
        dispositivo_id: deviceId,
        nombre_dispositivo: deviceName || null,
        sistema_operativo: request.headers.get("user-agent") || null,
        version_app: request.headers.get("x-app-version") || null,
      });
    } else {
      await supabaseAdmin.from("dispositivos")
        .update({ 
          ultimo_acceso: new Date().toISOString(), 
          total_accesos: (existingDevice.total_accesos || 0) + 1 
        })
        .eq("id", existingDevice.id);
    }

    await supabaseAdmin.from("users").update({
      ultimo_acceso: new Date().toISOString(),
      ip_ultimo_acceso: request.headers.get("x-forwarded-for") || "",
    }).eq("id", user.id);

    const token = await signToken({ sub: user.id, rol: user.rol, email: user.email }, "7d");
    const diasRestantes = daysBetween(hoy, vencimiento);

    return NextResponse.json({
      token,
      user: { id: user.id, email: user.email, nombre: user.nombre, rol: user.rol },
      licencia: { fechaVencimiento: user.fecha_vencimiento, diasRestantes, estado: "activo" },
    });
  } catch (err) {
    console.error("[remote/login] Error:", err);
    return NextResponse.json({ 
      message: "Error del servidor", 
      code: "SERVER_ERROR" 
    }, { status: 500 });
  }
}
