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
    title: "Que es la bomba VP44",
    keywords: ["vp44", "bomba", "diesel", "bosch", "rotativa"],
    answer:
      "[SIGNIFICADO]La VP44 es una bomba rotativa diesel de alta presion con control electronico, usada en motores diesel de los 90s y 2000s.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Integra bomba y modulo de control; es sensible a baja lubricacion y calor excesivo.[/DATOS CRITICOS]\n\n[POSIBLES CAUSAS]Fallas comunes: modulo electronico dañado, baja alimentacion de combustible, aire en el sistema.[/POSIBLES CAUSAS]\n\n[CONSEJO]Verifica presion de alimentacion y retorno antes de reemplazar la bomba.[/CONSEJO]",
  },
  {
    title: "Que es la bomba VP37",
    keywords: ["vp37", "bomba", "diesel", "rotativa"],
    answer:
      "[SIGNIFICADO]La VP37 es una bomba rotativa diesel de control electronico, previa a la VP44.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usa actuadores internos para controlar avance e inyeccion.[/DATOS CRITICOS]\n\n[POSIBLES CAUSAS]Fallas comunes: desgaste interno, actuador atascado, sensores internos fuera de rango.[/POSIBLES CAUSAS]",
  },
  {
    title: "Que es la bomba VE (rotativa distribuidora)",
    keywords: ["ve", "bomba", "rotativa", "distribuidora", "diesel"],
    answer:
      "[SIGNIFICADO]La bomba VE es una bomba rotativa distribuidora usada en diesel mecanicos y electronicos.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Combina presion y distribucion a cada cilindro.[/DATOS CRITICOS]\n\n[CONSEJO]Una VE en mal estado causa humo, falta de potencia y arranque dificil.[/CONSEJO]",
  },
  {
    title: "Que es una bomba en linea (P-Pump)",
    keywords: ["bomba en linea", "p-pump", "inline pump", "diesel"],
    answer:
      "[SIGNIFICADO]La bomba en linea (P-Pump) usa un elemento por cilindro y es muy robusta en diesel de trabajo pesado.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Es ideal para altas cargas y larga duracion.[/DATOS CRITICOS]",
  },
  {
    title: "Que es Pumpe Duse (PD/UIS)",
    keywords: ["pumpe duse", "pd", "uis", "unit injector"],
    answer:
      "[SIGNIFICADO]Pumpe Duse o UIS es un sistema donde cada inyector integra su propia bomba, accionada por el arbol de levas.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Presiones muy altas y control electronico directo en el inyector.[/DATOS CRITICOS]",
  },
  {
    title: "Que es HEUI",
    keywords: ["heui", "unit injector", "inyeccion"],
    answer:
      "[SIGNIFICADO]HEUI (Hydraulically Actuated Electronic Unit Injector) usa aceite del motor para accionar el inyector.[/SIGNIFICADO]\n\n[DATOS CRITICOS]La presion de aceite es critica para su funcionamiento.[/DATOS CRITICOS]",
  },
  {
    title: "Que es Common Rail",
    keywords: ["common rail", "cr", "riel", "diesel"],
    answer:
      "[SIGNIFICADO]Common Rail mantiene el combustible a alta presion en un riel comun y lo distribuye a los inyectores.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Permite multiples inyecciones y control preciso.[/DATOS CRITICOS]",
  },
  {
    title: "Que es GDI y MPFI",
    keywords: ["gdi", "mpfi", "mpi", "tbi", "spi", "gasolina"],
    answer:
      "[SIGNIFICADO]GDI es inyeccion directa de gasolina. MPFI/MPI es inyeccion multipunto en el multiple.[/SIGNIFICADO]\n\n[DATOS CRITICOS]GDI trabaja a mayor presion que MPFI y requiere bomba de alta.[/DATOS CRITICOS]",
  },
  {
    title: "Que es TDI, CDI, CRDI, HDI",
    keywords: ["tdi", "cdi", "crdi", "hdi", "diesel"],
    answer:
      "[SIGNIFICADO]Son nombres comerciales de sistemas diesel con inyeccion directa y control electronico.[/SIGNIFICADO]\n\n[DATOS CRITICOS]La mayoria usa Common Rail o Pumpe Duse segun fabricante.[/DATOS CRITICOS]",
  },
  {
    title: "Que es una ECU, PCM, TCM, BCM",
    keywords: ["ecu", "pcm", "tcm", "bcm", "modulo"],
    answer:
      "[SIGNIFICADO]La ECU/PCM controla motor e inyeccion, el TCM controla transmision y el BCM gestiona carroceria.[/SIGNIFICADO]\n\n[DATOS CRITICOS]La comunicacion entre modulos se realiza por redes como CAN o LIN.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la red CAN y LIN",
    keywords: ["can", "lin", "red", "comunicacion", "modulos"],
    answer:
      "[SIGNIFICADO]CAN es la red principal de comunicacion entre modulos; LIN es una red secundaria de baja velocidad.[/SIGNIFICADO]\n\n[CONSEJO]Fallas en CAN pueden generar multiples codigos U0xxx.[/CONSEJO]",
  },
  {
    title: "Que es el sensor MAP y MAF",
    keywords: ["map", "maf", "sensor", "admision"],
    answer:
      "[SIGNIFICADO]MAP mide presion en el multiple; MAF mide el flujo de aire.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Lecturas erraticas causan mezcla incorrecta y fallas de potencia.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor CKP y CMP",
    keywords: ["ckp", "cmp", "sensor", "cigueñal", "arbol de levas"],
    answer:
      "[SIGNIFICADO]CKP detecta posicion del cigueñal y CMP la del arbol de levas.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Sin estas señales no hay sincronizacion de inyeccion.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor TPS y APP",
    keywords: ["tps", "app", "acelerador", "sensor"],
    answer:
      "[SIGNIFICADO]TPS mide posicion de mariposa; APP mide posicion del pedal.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas generan modo emergencia o respuesta lenta.[/DATOS CRITICOS]",
  },
  {
    title: "Que es EGR, DPF y SCR",
    keywords: ["egr", "dpf", "scr", "adblue", "def"],
    answer:
      "[SIGNIFICADO]EGR recircula gases, DPF filtra particulas, SCR reduce NOx con AdBlue/DEF.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Sistemas de emisiones claves para normas Euro y EPA.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un sensor NOx y O2",
    keywords: ["nox", "o2", "lambda", "sensor"],
    answer:
      "[SIGNIFICADO]El sensor NOx mide oxidos de nitrogeno y el O2 (lambda) mide oxigeno en escape.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Son esenciales para control de emisiones y mezcla.[/DATOS CRITICOS]",
  },
  {
    title: "Tecnologias de combustion: HCCI, PCCI",
    keywords: ["hcci", "pcci", "ppci", "combustion"],
    answer:
      "[SIGNIFICADO]HCCI y PCCI buscan combustion mas limpia combinando ventajas de gasolina y diesel.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Aun se usan en investigacion o aplicaciones limitadas.[/DATOS CRITICOS]",
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
