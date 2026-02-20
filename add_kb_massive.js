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
    title: "Que es una transmision automatica (AT)",
    keywords: ["transmision", "automatica", "at"],
    answer:
      "[SIGNIFICADO]La transmision automatica usa convertidor de par y engranajes planetarios para cambiar sin embrague manual.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas tipicas: patinamiento, golpes, sobrecalentamiento.[/DATOS CRITICOS]",
  },
  {
    title: "Que es una transmision CVT",
    keywords: ["cvt", "transmision"],
    answer:
      "[SIGNIFICADO]La CVT usa poleas y correa/cadena para variar la relacion de forma continua.[/SIGNIFICADO]\n\n[CONSEJO]Requiere fluido especifico y mantenimiento estricto.[/CONSEJO]",
  },
  {
    title: "Que es una transmision DCT/DSG",
    keywords: ["dct", "dsg", "transmision"],
    answer:
      "[SIGNIFICADO]DCT/DSG es una transmision de doble embrague para cambios rapidos.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas comunes: mecatronica, embragues desgastados.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema ABS",
    keywords: ["abs", "frenos"],
    answer:
      "[SIGNIFICADO]ABS evita el bloqueo de ruedas durante frenado.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensores de rueda sucios o dañados generan codigos ABS.[/POSIBLES CAUSAS]",
  },
  {
    title: "Que es el sistema ESP/ESC",
    keywords: ["esp", "esc", "estabilidad"],
    answer:
      "[SIGNIFICADO]ESP/ESC corrige derrapes aplicando frenos selectivos.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Depende de sensores de yaw, angulo de direccion y velocidad.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la direccion asistida EPS",
    keywords: ["eps", "direccion asistida"],
    answer:
      "[SIGNIFICADO]EPS usa motor electrico para asistir la direccion.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas causan direccion dura o warning en tablero.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema HVAC",
    keywords: ["hvac", "aire acondicionado", "climatizador"],
    answer:
      "[SIGNIFICADO]HVAC controla calefaccion, ventilacion y aire acondicionado.[/SIGNIFICADO]\n\n[CONSEJO]Fallas comunes: falta de gas, compresor dañado, fuga.[/CONSEJO]",
  },
  {
    title: "Que es el compresor de A/C",
    keywords: ["compresor", "aire acondicionado"],
    answer:
      "[SIGNIFICADO]El compresor comprime el refrigerante del A/C.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Sin compresor no hay enfriamiento.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema Airbag (SRS)",
    keywords: ["airbag", "srs", "seguridad"],
    answer:
      "[SIGNIFICADO]SRS controla airbags y pretensores en impacto.[/SIGNIFICADO]\n\n[ADVERTENCIA]No manipular conectores con bateria conectada.[/ADVERTENCIA]",
  },
  {
    title: "Que es el diferencial",
    keywords: ["diferencial", "transmision"],
    answer:
      "[SIGNIFICADO]El diferencial permite que las ruedas giren a distinta velocidad en curvas.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas generan ruidos y vibraciones.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema 4x4 y transfer",
    keywords: ["4x4", "transfer", "traccion"],
    answer:
      "[SIGNIFICADO]La caja de transferencia distribuye fuerza al eje delantero y trasero.[/SIGNIFICADO]\n\n[CONSEJO]Usar 4x4 solo en superficies de baja adherencia.[/CONSEJO]",
  },
  {
    title: "Que es el sistema de freno de estacionamiento electrico",
    keywords: ["freno de estacionamiento", "epb"],
    answer:
      "[SIGNIFICADO]EPB reemplaza el freno de mano mecanico con un actuador electrico.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Requiere modo servicio para cambio de pastillas.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema de inyeccion directa (DI)",
    keywords: ["direct injection", "di", "inyeccion directa"],
    answer:
      "[SIGNIFICADO]La inyeccion directa pulveriza combustible dentro de la camara.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Permite mayor eficiencia pero requiere bomba de alta.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema de inyeccion en puerto (MPI)",
    keywords: ["mpi", "mpfi", "port injection"],
    answer:
      "[SIGNIFICADO]La inyeccion en puerto pulveriza combustible en el multiple de admision.[/SIGNIFICADO]\n\n[CONSEJO]Es mas simple y tolera combustibles de menor calidad.[/CONSEJO]",
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
