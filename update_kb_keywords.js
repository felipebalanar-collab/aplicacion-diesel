const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const keywordUpdates = [
  {
    title: "¿Qué es el AH (Ankerhub)?",
    keywords: ["ah", "ankerhub", "carrera", "inducido", "electroimán", "que es ah"],
  },
  {
    title: "¿Qué es el DNH (Düsennadelhub)?",
    keywords: ["dnh", "düsennadelhub", "alzada", "aguja", "tobera", "que es dnh"],
  },
  {
    title: "¿Qué es el RLS (Rücklaufspiel)?",
    keywords: ["rls", "rücklaufspiel", "juego", "retorno", "combustible", "que es rls"],
  },
  {
    title: "¿Qué significa un fallo en VL (Carga Total)?",
    keywords: ["vl", "carga total", "potencia", "velocidad", "caudal", "que es vl"],
  },
  {
    title: "¿Qué significa un fallo en VE (Pre-inyección)?",
    keywords: ["ve", "pre-inyección", "pre inyección", "golpeteo", "clacking", "que es ve"],
  },
  {
    title: "¿Qué significa un fallo en DFK / LEAK (Estanqueidad)?",
    keywords: ["dfk", "leak", "estanqueidad", "fuga", "válvula", "valvula", "que es dfk"],
  },
  {
    title: "¿Qué es el BIP (Beginning of Injection Period)?",
    keywords: ["bip", "beginning injection", "tiempo respuesta", "que es bip"],
  },
  {
    title: "¿Qué es la Capacitancia (C) en inyectores Piezo?",
    keywords: ["capacitancia", "c", "piezo", "cristal", "piezoeléctrico", "que es capacitancia"],
  },
  {
    title: "Flujo de diagnóstico rápido de inyectores",
    keywords: ["diagnóstico", "diagnóstico rápido", "síntomas", "troubleshooting", "flujo"],
  },
  {
    title: "Ajustes mecánicos en inyectores: Láminas de reglaje (Shims)",
    keywords: ["shims", "láminas", "reglaje", "ajuste", "arandela", "calibración"],
  },
];

async function updateKeywords() {
  try {
    console.log("Actualizando keywords en la base de conocimiento...\n");

    for (const update of keywordUpdates) {
      const { data, error } = await supabase
        .from("assistant_kb")
        .update({ keywords: update.keywords })
        .eq("title", update.title);

      if (error) {
        console.error(`❌ Error actualizando "${update.title}":`, error.message);
      } else {
        console.log(`✅ Keywords actualizados: ${update.title}`);
        console.log(`   → ${update.keywords.join(", ")}\n`);
      }
    }

    console.log("✅ Proceso completado. Keywords optimizados para búsqueda mejorada.");
  } catch (err) {
    console.error("Error general:", err.message);
  }
}

updateKeywords();
