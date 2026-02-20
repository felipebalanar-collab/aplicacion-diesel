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
    title: "OBD P0002 - Regulador de combustible rango/performance",
    keywords: ["p0002", "regulador", "combustible", "obd"],
    answer:
      "[SIGNIFICADO]P0002 indica que el regulador de combustible esta fuera de rango o rendimiento.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Regulador defectuoso, cableado, presion anormal, bomba con fallo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar presion real, revisar regulador y cableado.[/SOLUCION]",
  },
  {
    title: "OBD P0003 - Regulador de combustible circuito bajo",
    keywords: ["p0003", "regulador", "combustible", "obd"],
    answer:
      "[SIGNIFICADO]P0003 indica circuito bajo en el regulador de combustible.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Corto a tierra, cableado dañado, actuador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, conectores y regulador.[/SOLUCION]",
  },
  {
    title: "OBD P0004 - Regulador de combustible circuito alto",
    keywords: ["p0004", "regulador", "combustible", "obd"],
    answer:
      "[SIGNIFICADO]P0004 indica circuito alto en el regulador de combustible.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Circuito abierto, conector suelto, regulador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad y reemplazar regulador si aplica.[/SOLUCION]",
  },
  {
    title: "OBD P0087 - Presion de riel demasiado baja",
    keywords: ["p0087", "riel", "presion", "obd"],
    answer:
      "[SIGNIFICADO]P0087 indica presion del riel de combustible demasiado baja.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Filtro tapado, bomba debil, fuga en inyectores, regulador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion real, revisar retorno, bomba y regulador.[/SOLUCION]",
  },
  {
    title: "OBD P0088 - Presion de riel demasiado alta",
    keywords: ["p0088", "riel", "presion", "obd"],
    answer:
      "[SIGNIFICADO]P0088 indica presion del riel demasiado alta.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Regulador trabado, sensor de riel defectuoso, retorno obstruido.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar regulador, sensor y retorno.[/SOLUCION]",
  },
  {
    title: "OBD P0093 - Fuga grande en sistema de combustible",
    keywords: ["p0093", "fuga", "combustible", "obd"],
    answer:
      "[SIGNIFICADO]P0093 indica fuga grande de combustible (perdida de presion).[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Mangueras, retorno excesivo, fuga externa o interna.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar fugas y medir retorno de inyectores.[/SOLUCION]",
  },
  {
    title: "OBD P0100 - MAF circuito",
    keywords: ["p0100", "maf", "obd"],
    answer:
      "[SIGNIFICADO]P0100 indica falla en el circuito del sensor MAF.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor sucio, cableado, conector defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar MAF y revisar cableado.[/SOLUCION]",
  },
  {
    title: "OBD P0102 - MAF circuito bajo",
    keywords: ["p0102", "maf", "obd"],
    answer:
      "[SIGNIFICADO]P0102 indica señal baja en el sensor MAF.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor sucio, fuga de aire, cableado en corto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar admision, limpiar MAF y cableado.[/SOLUCION]",
  },
  {
    title: "OBD P0103 - MAF circuito alto",
    keywords: ["p0103", "maf", "obd"],
    answer:
      "[SIGNIFICADO]P0103 indica señal alta en el sensor MAF.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado abierto, admision alterada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado y reemplazar sensor si aplica.[/SOLUCION]",
  },
  {
    title: "OBD P0105 - MAP circuito",
    keywords: ["p0105", "map", "obd"],
    answer:
      "[SIGNIFICADO]P0105 indica falla en circuito del sensor MAP.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor sucio, manguera rota, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar manguera de vacio y sensor.[/SOLUCION]",
  },
  {
    title: "OBD P0110 - IAT circuito",
    keywords: ["p0110", "iat", "obd"],
    answer:
      "[SIGNIFICADO]P0110 indica falla en circuito del sensor IAT.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado abierto o en corto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad y reemplazar IAT si aplica.[/SOLUCION]",
  },
  {
    title: "OBD P0115 - ECT circuito",
    keywords: ["p0115", "ect", "obd"],
    answer:
      "[SIGNIFICADO]P0115 indica falla en circuito del sensor ECT.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor dañado, conector suelto, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor y cableado.[/SOLUCION]",
  },
  {
    title: "OBD P0120 - TPS circuito",
    keywords: ["p0120", "tps", "obd"],
    answer:
      "[SIGNIFICADO]P0120 indica falla en circuito del TPS.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]TPS defectuoso, cableado, cuerpo de aceleracion.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar señal TPS y reemplazar si aplica.[/SOLUCION]",
  },
  {
    title: "OBD P0130 - O2 circuito",
    keywords: ["p0130", "o2", "lambda", "obd"],
    answer:
      "[SIGNIFICADO]P0130 indica falla en circuito del sensor O2 banco 1 sensor 1.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado, fuga de escape.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor y fugas de escape.[/SOLUCION]",
  },
  {
    title: "OBD P0171 - Mezcla pobre (banco 1)",
    keywords: ["p0171", "mezcla pobre", "obd"],
    answer:
      "[SIGNIFICADO]P0171 indica mezcla pobre en banco 1.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Fugas de vacio, MAF sucio, baja presion de combustible.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fugas, limpiar MAF y medir presion.[/SOLUCION]",
  },
  {
    title: "OBD P0172 - Mezcla rica (banco 1)",
    keywords: ["p0172", "mezcla rica", "obd"],
    answer:
      "[SIGNIFICADO]P0172 indica mezcla rica en banco 1.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Inyectores goteando, regulador defectuoso, MAF fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar inyectores, regulador y sensores.[/SOLUCION]",
  },
  {
    title: "OBD P0201 - Inyector cilindro 1 circuito",
    keywords: ["p0201", "inyector", "obd"],
    answer:
      "[SIGNIFICADO]P0201 indica falla en circuito del inyector cilindro 1.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Cableado, conector, inyector abierto o en corto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad y resistencia del inyector.[/SOLUCION]",
  },
  {
    title: "OBD P0202 - Inyector cilindro 2 circuito",
    keywords: ["p0202", "inyector", "obd"],
    answer:
      "[SIGNIFICADO]P0202 indica falla en circuito del inyector cilindro 2.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Cableado o inyector defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector y resistencia del inyector.[/SOLUCION]",
  },
  {
    title: "OBD P0217 - Sobretemperatura del motor",
    keywords: ["p0217", "sobrecalentamiento", "obd"],
    answer:
      "[SIGNIFICADO]P0217 indica sobretemperatura del motor.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Falta de refrigerante, termostato, radiador obstruido.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sistema de enfriamiento.[/SOLUCION]",
  },
  {
    title: "OBD P0234 - Overboost",
    keywords: ["p0234", "overboost", "turbo", "obd"],
    answer:
      "[SIGNIFICADO]P0234 indica presion de turbo excesiva.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]VGT trabada, wastegate defectuosa, sensor MAP.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar actuador y control de turbo.[/SOLUCION]",
  },
  {
    title: "OBD P0299 - Underboost",
    keywords: ["p0299", "underboost", "turbo", "obd"],
    answer:
      "[SIGNIFICADO]P0299 indica presion de turbo insuficiente.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Fugas en admision, turbo dañado, VGT atascada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar mangueras, turbo y actuador.[/SOLUCION]",
  },
  {
    title: "OBD P0301 - Misfire cilindro 1",
    keywords: ["p0301", "misfire", "obd"],
    answer:
      "[SIGNIFICADO]P0301 indica falla de encendido en cilindro 1.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Bujia, bobina, inyector, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar encendido y compresion en cilindro 1.[/SOLUCION]",
  },
  {
    title: "OBD P0302 - Misfire cilindro 2",
    keywords: ["p0302", "misfire", "obd"],
    answer:
      "[SIGNIFICADO]P0302 indica falla de encendido en cilindro 2.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Bujia, bobina, inyector, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar encendido y compresion en cilindro 2.[/SOLUCION]",
  },
  {
    title: "OBD P0335 - CKP circuito",
    keywords: ["p0335", "ckp", "obd"],
    answer:
      "[SIGNIFICADO]P0335 indica falla en circuito del sensor CKP.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado, reluctor dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor CKP y cableado.[/SOLUCION]",
  },
  {
    title: "OBD P0340 - CMP circuito",
    keywords: ["p0340", "cmp", "obd"],
    answer:
      "[SIGNIFICADO]P0340 indica falla en circuito del sensor CMP.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado, sincronizacion.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor CMP y sincronizacion.[/SOLUCION]",
  },
  {
    title: "OBD P0401 - Flujo insuficiente EGR",
    keywords: ["p0401", "egr", "obd"],
    answer:
      "[SIGNIFICADO]P0401 indica flujo insuficiente EGR.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]EGR obstruida, conductos tapados, actuador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar EGR y conductos.[/SOLUCION]",
  },
  {
    title: "OBD P0402 - Flujo excesivo EGR",
    keywords: ["p0402", "egr", "obd"],
    answer:
      "[SIGNIFICADO]P0402 indica flujo excesivo EGR.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]EGR abierta, actuador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar EGR y control.[/SOLUCION]",
  },
  {
    title: "OBD P0420 - Eficiencia del catalizador",
    keywords: ["p0420", "catalizador", "obd"],
    answer:
      "[SIGNIFICADO]P0420 indica eficiencia baja del catalizador.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Catalizador degradado, sensor O2 defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar sensores O2 y catalizador.[/SOLUCION]",
  },
  {
    title: "OBD P0500 - Sensor de velocidad",
    keywords: ["p0500", "vss", "obd"],
    answer:
      "[SIGNIFICADO]P0500 indica fallo en sensor de velocidad del vehiculo.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor VSS, cableado, anillo reluctor.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor y cableado.[/SOLUCION]",
  },
  {
    title: "OBD P0562 - Voltaje bajo",
    keywords: ["p0562", "voltaje", "obd"],
    answer:
      "[SIGNIFICADO]P0562 indica voltaje del sistema bajo.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Bateria, alternador, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar bateria y carga del alternador.[/SOLUCION]",
  },
  {
    title: "OBD P0606 - PCM fallo interno",
    keywords: ["p0606", "pcm", "obd"],
    answer:
      "[SIGNIFICADO]P0606 indica fallo interno del PCM/ECU.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Fallo de modulo, voltaje inestable, software.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar voltaje y considerar reprogramacion o reemplazo.[/SOLUCION]",
  },
  {
    title: "OBD P0700 - Control de transmision",
    keywords: ["p0700", "tcm", "obd"],
    answer:
      "[SIGNIFICADO]P0700 indica fallo general de control de transmision.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Codigos en TCM, sensores, solenoides.[/POSIBLES CAUSAS]\n\n[SOLUCION]Leer codigos especificos en TCM.[/SOLUCION]",
  },
  {
    title: "OBD P0740 - Convertidor de par",
    keywords: ["p0740", "convertidor", "obd"],
    answer:
      "[SIGNIFICADO]P0740 indica falla en embrague del convertidor de par.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Solenoide, fluido, convertidor dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar solenoides y presion de transmision.[/SOLUCION]",
  },
  {
    title: "OBD P083F - Presion de aceite",
    keywords: ["p083f", "presion de aceite", "obd"],
    answer:
      "[SIGNIFICADO]P083F indica anomalia en sensor de presion de aceite (segun fabricante).[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor defectuoso, baja presion real, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion real y revisar sensor.[/SOLUCION]",
  },
  {
    title: "OBD U0100 - Perdida de comunicacion ECM/PCM",
    keywords: ["u0100", "can", "obd"],
    answer:
      "[SIGNIFICADO]U0100 indica perdida de comunicacion con ECM/PCM.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Red CAN, alimentacion ECU, conectores.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar red CAN y alimentacion del modulo.[/SOLUCION]",
  },
  {
    title: "OBD U0101 - Perdida de comunicacion TCM",
    keywords: ["u0101", "tcm", "obd"],
    answer:
      "[SIGNIFICADO]U0101 indica perdida de comunicacion con TCM.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Red CAN, alimentacion TCM, conectores.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar red CAN y alimentacion del TCM.[/SOLUCION]",
  },
  {
    title: "OBD B0028 - Sistema airbag",
    keywords: ["b0028", "airbag", "srs", "obd"],
    answer:
      "[SIGNIFICADO]B0028 indica falla en el sistema airbag (segun fabricante).[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Conectores, sensor de impacto, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sistema SRS con equipo adecuado.[/SOLUCION]",
  },
  {
    title: "OBD C0035 - Sensor de velocidad rueda",
    keywords: ["c0035", "abs", "obd"],
    answer:
      "[SIGNIFICADO]C0035 indica falla en sensor de velocidad de rueda.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Sensor dañado, cableado, anillo reluctor.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor y anillo reluctor.[/SOLUCION]",
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
