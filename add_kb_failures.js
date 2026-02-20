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
    title: "Fallas comunes del turbo",
    keywords: ["turbo", "vgt", "wastegate", "falla"],
    answer:
      "[SINTOMAS]Falta de potencia, humo negro, silbidos, consumo alto.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Fugas en mangueras, actuador defectuoso, geometria trabada, aceite contaminado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fugas, limpiar VGT, verificar presion de aceite y reemplazar si hay juego excesivo.[/SOLUCION]",
  },
  {
    title: "Fallas comunes de inyectores",
    keywords: ["inyector", "falla", "goteo", "humo"],
    answer:
      "[SINTOMAS]Humo negro/blanco, consumo alto, tironeos, arranque dificil.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Aguja desgastada, asiento erosionado, bobina dañada, suciedad interna.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpieza ultrasonica, calibracion, reemplazo de tobera o inyector.[/SOLUCION]",
  },
  {
    title: "Fallas comunes de la bomba de alta",
    keywords: ["bomba de alta", "cp3", "cp4", "falla"],
    answer:
      "[SINTOMAS]Presion baja de riel, arranque dificil, codigos P0087/P0088.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Desgaste interno, baja lubricacion, combustible contaminado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar presion real, filtros, retorno; reconstruir o reemplazar bomba.[/SOLUCION]",
  },
  {
    title: "Fallas comunes del sensor MAP",
    keywords: ["map", "sensor", "falla"],
    answer:
      "[SINTOMAS]Falta de potencia, humo, consumo alto, codigos P0105-P0109.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Sensor sucio, manguera dañada, cableado defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar sensor, revisar manguera y cableado, reemplazar si es necesario.[/SOLUCION]",
  },
  {
    title: "Fallas comunes del sensor MAF",
    keywords: ["maf", "sensor", "falla"],
    answer:
      "[SINTOMAS]Ralentí inestable, tirones, consumo alto, codigos P0100-P0104.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Sensor contaminado, filtro de aire sucio, falso contacto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar con spray MAF, revisar filtro, reemplazar si falla.[/SOLUCION]",
  },
  {
    title: "Fallas comunes del sistema EGR",
    keywords: ["egr", "valvula", "falla"],
    answer:
      "[SINTOMAS]Humo negro, tironeos, perdida de potencia, ralenti irregular.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Valvula trabada por carbonilla, enfriador obstruido, sensor defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpieza EGR, revisar actuador y enfriador, reemplazar si es necesario.[/SOLUCION]",
  },
  {
    title: "Fallas comunes del DPF",
    keywords: ["dpf", "filtro de particulas", "falla"],
    answer:
      "[SINTOMAS]Modo emergencia, consumo alto, humo, regeneraciones frecuentes.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Filtro saturado, sensor diferencial defectuoso, uso urbano.[/POSIBLES CAUSAS]\n\n[SOLUCION]Regeneracion forzada, limpieza profesional, reemplazo si esta dañado.[/SOLUCION]",
  },
  {
    title: "Fallas comunes del sistema ABS",
    keywords: ["abs", "frenos", "falla"],
    answer:
      "[SINTOMAS]Luz ABS encendida, bloqueo en frenadas, codigos ABS.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Sensor de rueda sucio, cableado roto, anillo reluctor dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar sensor, reparar cableado, reemplazar sensor o anillo.[/SOLUCION]",
  },
  {
    title: "Fallas comunes de la transmision CVT",
    keywords: ["cvt", "transmision", "falla"],
    answer:
      "[SINTOMAS]Patinamiento, tirones, ruido, modo emergencia.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Fluido incorrecto, desgaste de correa/cadena, sensores dañados.[/POSIBLES CAUSAS]\n\n[SOLUCION]Usar fluido correcto, realizar diagnostico y reparar por especialista.[/SOLUCION]",
  },
  {
    title: "Fallas comunes del sistema EVAP",
    keywords: ["evap", "purge", "canister", "falla"],
    answer:
      "[SINTOMAS]Olor a gasolina, luz check engine, codigos P0440-P0456.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Tapa de tanque floja, canister saturado, valvula purge trabada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Ajustar tapa, revisar mangueras, reemplazar valvula o canister.[/SOLUCION]",
  },
  {
    title: "OBD P0300 - Misfire aleatorio",
    keywords: ["p0300", "misfire", "obd"],
    answer:
      "[SIGNIFICADO]P0300 indica fallas de encendido aleatorias en varios cilindros.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Bujias, bobinas, inyectores, baja compresion, mezcla pobre.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar encendido, combustible y compresion cilindro por cilindro.[/SOLUCION]",
  },
  {
    title: "OBD P0420 - Eficiencia del catalizador",
    keywords: ["p0420", "catalizador", "obd"],
    answer:
      "[SIGNIFICADO]P0420 indica eficiencia baja del catalizador.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Catalizador desgastado, sensor O2 defectuoso, mezcla incorrecta.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensores O2 y fugas; reemplazar catalizador si es necesario.[/SOLUCION]",
  },
  {
    title: "OBD P0401 - Flujo insuficiente EGR",
    keywords: ["p0401", "egr", "obd"],
    answer:
      "[SIGNIFICADO]P0401 indica flujo insuficiente de EGR.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Valvula EGR trabada, conductos obstruidos, sensor defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpieza EGR y conductos, revisar actuador y sensor.[/SOLUCION]",
  },
  {
    title: "OBD P0402 - Flujo excesivo EGR",
    keywords: ["p0402", "egr", "obd"],
    answer:
      "[SIGNIFICADO]P0402 indica flujo excesivo de EGR.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Valvula EGR abierta, actuador defectuoso, sensor fuera de rango.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar valvula y control; limpiar o reemplazar.[/SOLUCION]",
  },
  {
    title: "OBD P0101 - MAF rango/funcion",
    keywords: ["p0101", "maf", "obd"],
    answer:
      "[SIGNIFICADO]P0101 indica MAF fuera de rango o desempeño incorrecto.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor sucio, fuga de aire, filtro tapado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar MAF, revisar admision y reemplazar si falla.[/SOLUCION]",
  },
  {
    title: "OBD P0106 - MAP rango/funcion",
    keywords: ["p0106", "map", "obd"],
    answer:
      "[SIGNIFICADO]P0106 indica MAP fuera de rango o desempeño incorrecto.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Manguera dañada, sensor sucio, fuga de vacio.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar mangueras y limpiar sensor.[/SOLUCION]",
  },
  {
    title: "OBD P0171 - Mezcla pobre",
    keywords: ["p0171", "mezcla pobre", "obd"],
    answer:
      "[SIGNIFICADO]P0171 indica mezcla pobre (exceso de aire).[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Fugas de vacio, MAF sucio, baja presion de combustible.[/POSIBLES CAUSAS]\n\n[SOLUCION]Buscar fugas, limpiar MAF, verificar bomba y regulador.[/SOLUCION]",
  },
  {
    title: "OBD P0172 - Mezcla rica",
    keywords: ["p0172", "mezcla rica", "obd"],
    answer:
      "[SIGNIFICADO]P0172 indica mezcla rica (exceso de combustible).[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Inyectores goteando, MAF defectuoso, regulador fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar inyectores, sensores y presion de combustible.[/SOLUCION]",
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
