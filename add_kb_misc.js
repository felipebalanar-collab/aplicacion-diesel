const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Faltan variables de entorno para Supabase.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticles = [
  {
    title: "A cuantos PSI necesita un diesel para encender",
    keywords: ["psi", "presion", "arranque", "diesel", "compresion"],
    answer:
      "[SIGNIFICADO]Un motor diesel enciende por compresion, no por chispa. Para arrancar necesita suficiente presion de compresion en el cilindro y presion de combustible en el riel (si es Common Rail).[/SIGNIFICADO]\n\n[DATOS CRITICOS]Compresion minima tipica: 350-450 PSI (24-31 bar) para encender. Motor saludable: 400-600 PSI (27-41 bar), dependiendo del diseno y la altura.[/DATOS CRITICOS]\n\n[DATOS CRITICOS]En Common Rail, la presion de riel de arranque suele estar entre 250-300 bar (3,600-4,350 PSI). Algunos sistemas arrancan desde 180-250 bar.[/DATOS CRITICOS]\n\n[CONSEJO]Si no arranca: verificar compresion, velocidad de arranque, calentadores, presion de riel y retorno de inyectores.[/CONSEJO]",
  },
];

async function addArticles() {
  try {
    console.log("Conectando a Supabase...");

    for (const article of newArticles) {
      const { error } = await supabase.from("assistant_kb").insert([
        {
          title: article.title,
          keywords: article.keywords,
          answer: article.answer,
        },
      ]);

      if (error) {
        console.error(`Error al agregar "${article.title}":`, error.message);
      } else {
        console.log(`Agregado: ${article.title}`);
      }
    }

    console.log("Proceso completado.");
  } catch (err) {
    console.error("Error general:", err.message);
  }
}

addArticles();
