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
    title: "El motor no enciende (causas comunes)",
    keywords: ["no enciende", "arranque", "motor", "falla"],
    answer:
      "[SINTOMAS]El motor gira pero no enciende, o no gira.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Bateria baja, motor de arranque, falta de combustible, inmovilizador, sensor CKP, baja compresion.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar bateria, escanear codigos, medir compresion y presion de combustible.[/SOLUCION]",
  },
  {
    title: "Ralentí inestable",
    keywords: ["ralenti", "inestable", "temblor", "falla"],
    answer:
      "[SINTOMAS]Motor tiembla o baja RPM en ralentí.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Fugas de vacio, MAF/MAP sucio, cuerpo de aceleracion, inyectores, EGR.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar admision, limpiar cuerpo de aceleracion, escanear sensores.[/SOLUCION]",
  },
  {
    title: "Humo negro en diesel",
    keywords: ["humo negro", "diesel", "falla"],
    answer:
      "[SINTOMAS]Humo negro y consumo alto.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Exceso de combustible, turbo fallando, inyectores goteando, EGR trabada, filtro de aire sucio.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar admision, turbo, inyectores y presion de riel.[/SOLUCION]",
  },
  {
    title: "Humo blanco en diesel",
    keywords: ["humo blanco", "diesel", "falla"],
    answer:
      "[SINTOMAS]Humo blanco al arrancar o en frio.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Combustible sin quemar, calentadores, baja compresion, inyectores defectuosos.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir compresion, revisar calentadores e inyectores.[/SOLUCION]",
  },
  {
    title: "Humo azul",
    keywords: ["humo azul", "aceite", "falla"],
    answer:
      "[SINTOMAS]Humo azul y consumo de aceite.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Aros desgastados, guias de valvula, turbo con fuga de aceite.[/POSIBLES CAUSAS]\n\n[SOLUCION]Prueba de compresion y verificacion de turbo.[/SOLUCION]",
  },
  {
    title: "Sobrecalentamiento del motor",
    keywords: ["sobrecalentamiento", "temperatura", "falla"],
    answer:
      "[SINTOMAS]Temperatura alta, vapor, perdida de potencia.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Fuga de refrigerante, termostato trabado, bomba de agua, radiador obstruido, ventilador.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fugas, termostato, bomba y radiador.[/SOLUCION]",
  },
  {
    title: "Vibraciones al acelerar",
    keywords: ["vibraciones", "acelerar", "falla"],
    answer:
      "[SINTOMAS]Vibraciones en aceleracion o a cierta velocidad.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Balanceo, homocineticas, soportes de motor, misfire.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar balanceo, tren motriz y codigos de falla.[/SOLUCION]",
  },
  {
    title: "Luz Check Engine encendida",
    keywords: ["check engine", "luz motor", "mil", "falla"],
    answer:
      "[SINTOMAS]Luz MIL encendida en tablero.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Cualquier DTC: sensores, emisiones, mezcla, encendido.[/POSIBLES CAUSAS]\n\n[SOLUCION]Escanear OBD, leer codigos y datos en vivo.[/SOLUCION]",
  },
  {
    title: "Consumo alto de combustible",
    keywords: ["consumo alto", "combustible", "falla"],
    answer:
      "[SINTOMAS]Gasto excesivo de combustible.[/SINTOMAS]\n\n[POSIBLES CAUSAS]O2/MAF defectuoso, presion incorrecta, inyectores goteando, filtro de aire.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensores, presion de combustible e inyectores.[/SOLUCION]",
  },
  {
    title: "Transmision patina",
    keywords: ["transmision", "patina", "falla"],
    answer:
      "[SINTOMAS]RPM sube pero el auto no acelera.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Fluido bajo, embrague desgastado, convertidor de par.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar nivel y estado de fluido; diagnostico de transmision.[/SOLUCION]",
  },
  {
    title: "Frenos con vibracion",
    keywords: ["frenos", "vibracion", "falla"],
    answer:
      "[SINTOMAS]Vibracion al frenar, volante tiembla.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Discos deformados, pastillas cristalizadas, caliper pegado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Rectificar o reemplazar discos y revisar calipers.[/SOLUCION]",
  },
  {
    title: "Aire acondicionado no enfria",
    keywords: ["aire acondicionado", "a/c", "falla"],
    answer:
      "[SINTOMAS]A/C sin frio o con frio debil.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Falta de gas, compresor dañado, fuga, ventilador.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar presiones, buscar fugas y probar compresor.[/SOLUCION]",
  },
  {
    title: "Direccion dura",
    keywords: ["direccion", "dura", "eps", "hidraulica"],
    answer:
      "[SINTOMAS]Volante duro al girar.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Bomba hidraulica, nivel de fluido, EPS fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fluido/bomba o escanear EPS.[/SOLUCION]",
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
