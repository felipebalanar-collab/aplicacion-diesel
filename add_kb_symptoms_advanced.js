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
    title: "No pasa de 2000 RPM",
    keywords: ["no pasa de 2000", "limp mode", "modo emergencia", "rpm"],
    answer:
      "[SINTOMAS]El motor queda limitado y no sube de 2000-3000 RPM.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Modo emergencia por DTC, presion de riel baja, turbo sin carga, DPF saturado, sensor MAF/MAP.[/POSIBLES CAUSAS]\n\n[SOLUCION]Escanear codigos, verificar presion de riel, turbo y DPF.[/SOLUCION]",
  },
  {
    title: "Humo negro al acelerar",
    keywords: ["humo negro", "acelerar", "diesel"],
    answer:
      "[SINTOMAS]Humo negro al pisar el acelerador.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Exceso de combustible, turbo sin presion, filtro de aire tapado, EGR trabada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar admision, turbo, EGR e inyectores.[/SOLUCION]",
  },
  {
    title: "Falla intermitente",
    keywords: ["falla intermitente", "intermitente", "se apaga"],
    answer:
      "[SINTOMAS]El motor falla a ratos y luego vuelve a la normalidad.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Sensor CKP/CMP intermitente, cableado, relays, bomba de combustible caliente.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, usar scanner en vivo, probar sensores en caliente.[/SOLUCION]",
  },
  {
    title: "Vibracion en alta",
    keywords: ["vibracion", "alta", "velocidad"],
    answer:
      "[SINTOMAS]Vibracion notable a alta velocidad.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Balanceo, llantas deformadas, alineacion, cardan, homocineticas.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar balanceo y componentes de tren motriz.[/SOLUCION]",
  },
  {
    title: "Presion de riel baja",
    keywords: ["presion de riel", "baja", "common rail"],
    answer:
      "[SINTOMAS]Arranque dificil, falta de potencia, DTC P0087.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Filtro tapado, bomba debil, fuga en inyectores, regulador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion real, revisar retorno e inyectores.[/SOLUCION]",
  },
  {
    title: "Presion de riel alta",
    keywords: ["presion de riel", "alta", "common rail"],
    answer:
      "[SINTOMAS]DTC P0088, ruido, humo negro.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Regulador trabado, sensor de presion defectuoso, retorno obstruido.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar regulador y sensor de riel.[/SOLUCION]",
  },
  {
    title: "Se apaga al frenar",
    keywords: ["se apaga", "frenar", "ralenti"],
    answer:
      "[SINTOMAS]Al frenar o al llegar al alto el motor se apaga.[/SINTOMAS]\n\n[POSIBLES CAUSAS]IAC sucio (gasolina), cuerpo de aceleracion, vacio, mezcla pobre.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar cuerpo de aceleracion y revisar vacio.[/SOLUCION]",
  },
  {
    title: "Humo blanco continuo",
    keywords: ["humo blanco", "continuo", "diesel"],
    answer:
      "[SINTOMAS]Humo blanco permanente en marcha.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Inyector goteando, compresion baja, refrigerante entrando a cilindro.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir compresion, revisar inyectores y sistema de refrigeracion.[/SOLUCION]",
  },
  {
    title: "No tiene fuerza en bajas",
    keywords: ["sin fuerza", "bajas", "falla"],
    answer:
      "[SINTOMAS]Respuesta lenta en bajas RPM.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Turbo con retardo, MAF sucio, EGR abierta, inyectores sucios.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar MAF, EGR y turbo.[/SOLUCION]",
  },
  {
    title: "No tiene fuerza en altas",
    keywords: ["sin fuerza", "altas", "falla"],
    answer:
      "[SINTOMAS]Pierde potencia en altas RPM.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Filtro tapado, turbo sin presion, limitador por DTC.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar admision, turbo y escanear codigos.[/SOLUCION]",
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
