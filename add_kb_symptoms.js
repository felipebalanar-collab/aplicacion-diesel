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
    title: "Se apaga en caliente",
    keywords: ["se apaga", "caliente", "falla", "motor"],
    answer:
      "[SINTOMAS]El motor funciona en frio y se apaga cuando calienta.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Sensor CKP/CMP intermitente, bobinas, modulo ECU sobrecalentado, bomba de combustible debil.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar CKP/CMP con escaner, medir presion de combustible, verificar ventilacion de ECU.[/SOLUCION]",
  },
  {
    title: "Pierde fuerza en subida",
    keywords: ["pierde fuerza", "subida", "falla", "potencia"],
    answer:
      "[SINTOMAS]El vehiculo no responde en pendientes o con carga.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Filtro de aire/combustible tapado, turbo sin presion, inyectores sucios, presion baja de riel.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar filtros, turbo, presion de riel e inyectores.[/SOLUCION]",
  },
  {
    title: "Se apaga al acelerar",
    keywords: ["se apaga", "acelerar", "falla", "motor"],
    answer:
      "[SINTOMAS]El motor se apaga al pisar el acelerador.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Falta de combustible, TPS/APP defectuoso, cuerpo de aceleracion sucio, bomba debil.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar presion de combustible, sensores de pedal y mariposa.[/SOLUCION]",
  },
  {
    title: "Arranca y se apaga",
    keywords: ["arranca y se apaga", "falla", "motor"],
    answer:
      "[SINTOMAS]Enciende por unos segundos y se apaga.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Inmovilizador, presion baja de combustible, fuga de aire, sensores CKP/CMP.[/POSIBLES CAUSAS]\n\n[SOLUCION]Escanear inmovilizador, medir presion de combustible, revisar sensores.[/SOLUCION]",
  },
  {
    title: "Humo solo en frio",
    keywords: ["humo", "frio", "arranque", "diesel"],
    answer:
      "[SINTOMAS]Humo al encender en frio que desaparece luego.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Calentadores, baja compresion, inyectores goteando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar calentadores y compresion.[/SOLUCION]",
  },
  {
    title: "Arranque lento",
    keywords: ["arranque lento", "bateria", "motor de arranque"],
    answer:
      "[SINTOMAS]El motor gira lento al dar arranque.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Bateria baja, bornes sulfatados, motor de arranque desgastado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Cargar bateria, limpiar bornes, revisar consumo de arranque.[/SOLUCION]",
  },
  {
    title: "Golpeteo metalico",
    keywords: ["golpeteo", "ruido", "metalico"],
    answer:
      "[SINTOMAS]Ruido metalico al acelerar o en carga.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Avance excesivo, inyectores, bielas, detonacion.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar avance, inyectores y calidad de combustible.[/SOLUCION]",
  },
  {
    title: "Tironeo al conducir",
    keywords: ["tironeo", "jaloneo", "falla"],
    answer:
      "[SINTOMAS]Tirones al acelerar o mantener velocidad.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Misfire, bobinas, inyectores, mezcla pobre/rica.[/POSIBLES CAUSAS]\n\n[SOLUCION]Escanear codigos, revisar encendido e inyectores.[/SOLUCION]",
  },
  {
    title: "Consumo de aceite alto",
    keywords: ["consumo de aceite", "aceite", "falla"],
    answer:
      "[SINTOMAS]Baja nivel de aceite rapidamente.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Aros desgastados, retenes de valvula, turbo con fuga.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir compresion y revisar turbo.[/SOLUCION]",
  },
  {
    title: "Vibracion en ralentí",
    keywords: ["vibracion", "ralenti", "falla"],
    answer:
      "[SINTOMAS]Motor vibra al estar detenido.[/SINTOMAS]\n\n[POSIBLES CAUSAS]Soportes, misfire, inyectores desbalanceados, baja compresion.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar soportes, encendido y compresion.[/SOLUCION]",
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
