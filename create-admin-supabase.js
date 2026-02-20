const readline = require("readline");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: ".env.local" });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// Inicializar Supabase Admin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: Faltan variables de entorno en .env.local");
  console.error("Necesitas: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Función para encriptar contraseña
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  console.log("\n🔐 Creación de Administrador en Supabase\n");
  console.log("Este admin tendrá:");
  console.log("  ✅ Acceso total al sistema");
  console.log("  ✅ Licencia válida por 10 años");
  console.log("  ✅ 3 dispositivos permitidos\n");

  try {
    const email = (await ask("📧 Email admin: ")).trim().toLowerCase();
    const nombre = (await ask("👤 Nombre admin: ")).trim();
    const password = (await ask("🔑 Password admin: ")).trim();

    if (!email || !nombre || !password) {
      console.log("\n❌ Error: Todos los campos son obligatorios.");
      process.exit(1);
    }

    if (password.length < 6) {
      console.log("\n❌ Error: La contraseña debe tener al menos 6 caracteres.");
      process.exit(1);
    }

    console.log("\n⏳ Procesando...");

    const now = new Date();
    const fechaInicio = now.toISOString().slice(0, 10);
    const fechaVencimiento = new Date(now.getFullYear() + 10, now.getMonth(), now.getDate()).toISOString().slice(0, 10);

    // Encriptar contraseña
    const passwordHash = await hashPassword(password);

    // Insertar en Supabase
    const { data, error } = await supabaseAdmin.from("users").insert({
      email,
      password_hash: passwordHash,
      nombre,
      rol: "admin",
      estado: "activo",
      fecha_inicio: fechaInicio,
      fecha_vencimiento: fechaVencimiento,
      meses_contratados: 120,
      tipo_licencia: "permanente",
      limite_dispositivos: 3,
      dispositivos_activos: 0
    }).select("id,email,nombre,rol,fecha_vencimiento").single();

    if (error) {
      console.error("\n❌ Error creando admin:", error.message);
      if (error.code === "23505") {
        console.error("   El email ya existe en la base de datos.");
      }
      process.exit(1);
    }

    console.log("\n✅ ¡Admin creado exitosamente!\n");
    console.log("📋 Detalles:");
    console.log(`   ID:      ${data.id}`);
    console.log(`   Email:   ${data.email}`);
    console.log(`   Nombre:  ${data.nombre}`);
    console.log(`   Rol:     ${data.rol}`);
    console.log(`   Vence:   ${data.fecha_vencimiento}`);
    console.log("\n🎯 Ahora puedes usar estas credenciales para iniciar sesión.\n");

  } catch (err) {
    console.error("\n❌ Error inesperado:", err.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
