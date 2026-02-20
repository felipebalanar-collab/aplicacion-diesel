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
    title: "Que es Duramax",
    keywords: ["duramax", "diesel", "gm", "chevrolet"],
    answer:
      "[SIGNIFICADO]Duramax es la linea de motores diesel de GM usada en pickups y camiones.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usa Common Rail y turbo de geometria variable en versiones modernas.[/DATOS CRITICOS]",
  },
  {
    title: "Que es Powerstroke",
    keywords: ["powerstroke", "diesel", "ford"],
    answer:
      "[SIGNIFICADO]Powerstroke es la linea de motores diesel de Ford para trabajo pesado.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Versiones modernas usan Common Rail y turbo VGT.[/DATOS CRITICOS]",
  },
  {
    title: "Que es Cummins",
    keywords: ["cummins", "diesel", "ram"],
    answer:
      "[SIGNIFICADO]Cummins es un fabricante reconocido de motores diesel industriales y de camion.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Muy usado en RAM y aplicaciones de trabajo pesado.[/DATOS CRITICOS]",
  },
  {
    title: "Que es HDI",
    keywords: ["hdi", "diesel", "psa", "peugeot", "citroen"],
    answer:
      "[SIGNIFICADO]HDi es la tecnologia diesel de PSA (Peugeot/Citroen) basada en Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Conocida por eficiencia y bajas emisiones.[/DATOS CRITICOS]",
  },
  {
    title: "Que es TDCi",
    keywords: ["tdci", "diesel", "ford"],
    answer:
      "[SIGNIFICADO]TDCi es la denominacion diesel de Ford con inyeccion directa Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usa turbo y control electronico de inyeccion.[/DATOS CRITICOS]",
  },
  {
    title: "Que es dCi",
    keywords: ["dci", "diesel", "renault", "nissan"],
    answer:
      "[SIGNIFICADO]dCi es la tecnologia diesel de Renault/Nissan con Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Enfocada en consumo y emisiones bajas.[/DATOS CRITICOS]",
  },
  {
    title: "Que es JTD y Multijet",
    keywords: ["jtd", "multijet", "diesel", "fiat"],
    answer:
      "[SIGNIFICADO]JTD/Multijet son tecnologias diesel de FIAT basadas en Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Multijet permite multiples inyecciones por ciclo.[/DATOS CRITICOS]",
  },
  {
    title: "Que es TDI",
    keywords: ["tdi", "diesel", "vw", "audi"],
    answer:
      "[SIGNIFICADO]TDI es la tecnologia diesel de VW/Audi (inyeccion directa).[/SIGNIFICADO]\n\n[DATOS CRITICOS]Incluye versiones Pumpe Duse y Common Rail.[/DATOS CRITICOS]",
  },
  {
    title: "Que es CDI",
    keywords: ["cdi", "diesel", "mercedes"],
    answer:
      "[SIGNIFICADO]CDI es la denominacion diesel de Mercedes con Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Destaca por suavidad y torque alto.[/DATOS CRITICOS]",
  },
  {
    title: "Que es CRDi",
    keywords: ["crdi", "diesel", "hyundai", "kia"],
    answer:
      "[SIGNIFICADO]CRDi es la tecnologia diesel de Hyundai/Kia con Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usa inyeccion electronica de alta presion.[/DATOS CRITICOS]",
  },
  {
    title: "Que es D-4D",
    keywords: ["d4d", "d-4d", "diesel", "toyota"],
    answer:
      "[SIGNIFICADO]D-4D es la tecnologia diesel de Toyota con Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Conocida por confiabilidad y consumo bajo.[/DATOS CRITICOS]",
  },
  {
    title: "Que es i-CTDi e i-DTEC",
    keywords: ["i-ctdi", "i-dtec", "diesel", "honda"],
    answer:
      "[SIGNIFICADO]i-CTDi e i-DTEC son tecnologias diesel de Honda con Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Enfocadas en eficiencia y emisiones bajas.[/DATOS CRITICOS]",
  },
  {
    title: "Que es Di-D",
    keywords: ["di-d", "diesel", "mitsubishi"],
    answer:
      "[SIGNIFICADO]Di-D es la denominacion diesel de Mitsubishi con inyeccion directa.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usa Common Rail en la mayoria de versiones.[/DATOS CRITICOS]",
  },
  {
    title: "Que es EcoBoost",
    keywords: ["ecoboost", "gasolina", "ford", "turbo"],
    answer:
      "[SIGNIFICADO]EcoBoost es la linea gasolina turbo de Ford con inyeccion directa.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Combina turbo y GDI para alto torque y eficiencia.[/DATOS CRITICOS]",
  },
  {
    title: "Que es SkyActiv",
    keywords: ["skyactiv", "mazda", "gasolina", "diesel"],
    answer:
      "[SIGNIFICADO]SkyActiv es la familia de motores Mazda con alta eficiencia y compresion optimizada.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Incluye versiones gasolina y diesel.[/DATOS CRITICOS]",
  },
  {
    title: "Que es TGDI",
    keywords: ["tgdi", "gasolina", "turbo", "gdi"],
    answer:
      "[SIGNIFICADO]TGDI es inyeccion directa de gasolina con turbo.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Requiere bomba de alta y control preciso de mezcla.[/DATOS CRITICOS]",
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
