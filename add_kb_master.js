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
    title: "Que es la bomba CP3",
    keywords: ["cp3", "bomba", "common rail", "diesel"],
    answer:
      "[SIGNIFICADO]La CP3 es una bomba de alta presion Common Rail muy usada en diesel pesado.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Es robusta y tolera combustible de baja lubricidad mejor que la CP4.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la bomba CP4",
    keywords: ["cp4", "bomba", "common rail", "diesel"],
    answer:
      "[SIGNIFICADO]La CP4 es una bomba de alta presion Common Rail mas eficiente pero sensible a baja lubricacion.[/SIGNIFICADO]\n\n[ADVERTENCIA]Si falla, puede contaminar todo el sistema con limaduras.[/ADVERTENCIA]",
  },
  {
    title: "Que es la bomba HP3 y HP4 (Denso)",
    keywords: ["hp3", "hp4", "denso", "bomba", "common rail"],
    answer:
      "[SIGNIFICADO]HP3 y HP4 son bombas de alta presion Denso para sistemas Common Rail.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usadas en Toyota, Isuzu y otros fabricantes asiaticos.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un inyector solenoide",
    keywords: ["inyector", "solenoide", "bobina"],
    answer:
      "[SIGNIFICADO]Un inyector solenoide usa una bobina para mover la aguja y abrir el paso de combustible.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Respuesta mas lenta que piezo pero mas economico.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un inyector piezo",
    keywords: ["inyector", "piezo", "piezoelectrico"],
    answer:
      "[SIGNIFICADO]Un inyector piezo usa cristales piezoelectricos para mover la aguja con alta velocidad.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Permite multiples inyecciones y alta precision.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor de presion del riel",
    keywords: ["sensor", "rail pressure", "presion de riel"],
    answer:
      "[SIGNIFICADO]El sensor de presion del riel mide la presion real del combustible en el Common Rail.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Lecturas erraticas causan baja potencia y codigos P0087/P0088.[/POSIBLES CAUSAS]",
  },
  {
    title: "Que es el regulador de presion de combustible",
    keywords: ["regulador", "presion", "fuel pressure"],
    answer:
      "[SIGNIFICADO]El regulador controla la presion del combustible en el riel o en la bomba.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas generan presion baja o alta y problemas de arranque.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor MAP",
    keywords: ["map", "sensor", "presion admision"],
    answer:
      "[SIGNIFICADO]MAP mide la presion en el multiple de admision.[/SIGNIFICADO]\n\n[CONSEJO]Lecturas falsas generan mezcla incorrecta y humo o falta de potencia.[/CONSEJO]",
  },
  {
    title: "Que es el sensor MAF",
    keywords: ["maf", "sensor", "flujo de aire"],
    answer:
      "[SIGNIFICADO]MAF mide el flujo de aire que entra al motor.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Suciedad o falla causa mezcla pobre o rica y fallas de potencia.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor CKP",
    keywords: ["ckp", "sensor", "cigueñal"],
    answer:
      "[SIGNIFICADO]CKP detecta la posicion y velocidad del ciguenal.[/SIGNIFICADO]\n\n[ADVERTENCIA]Sin CKP no hay inyeccion ni chispa.[/ADVERTENCIA]",
  },
  {
    title: "Que es el sensor CMP",
    keywords: ["cmp", "sensor", "arbol de levas"],
    answer:
      "[SIGNIFICADO]CMP detecta la posicion del arbol de levas para sincronizar inyeccion.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas causan arranque dificil y modo emergencia.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor TPS",
    keywords: ["tps", "sensor", "mariposa"],
    answer:
      "[SIGNIFICADO]TPS mide la posicion de la mariposa de aceleracion.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Falla genera respuesta lenta o tironeos.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor APP",
    keywords: ["app", "sensor", "pedal"],
    answer:
      "[SIGNIFICADO]APP mide la posicion del pedal del acelerador.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Falla activa modo seguro y limita potencia.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor IAT",
    keywords: ["iat", "sensor", "temperatura de admision"],
    answer:
      "[SIGNIFICADO]IAT mide la temperatura del aire de admision.[/SIGNIFICADO]\n\n[CONSEJO]Lecturas incorrectas alteran el calculo de mezcla.[/CONSEJO]",
  },
  {
    title: "Que es el sensor ECT",
    keywords: ["ect", "sensor", "temperatura motor"],
    answer:
      "[SIGNIFICADO]ECT mide la temperatura del refrigerante del motor.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Afecta arranque en frio, ventiladores y mezcla.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor de detonacion (Knock)",
    keywords: ["knock", "sensor", "detonacion", "picado"],
    answer:
      "[SIGNIFICADO]El sensor knock detecta detonacion para ajustar avance de encendido.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Falla puede causar perdida de potencia o dano interno.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor O2 (Lambda)",
    keywords: ["o2", "lambda", "sensor"],
    answer:
      "[SIGNIFICADO]El sensor O2 mide oxigeno en escape para controlar mezcla.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Falla aumenta consumo y emisiones.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sensor NOx",
    keywords: ["nox", "sensor", "emisiones"],
    answer:
      "[SIGNIFICADO]El sensor NOx mide oxidos de nitrogeno en el escape.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Clave en sistemas SCR y normas Euro.[/DATOS CRITICOS]",
  },
  {
    title: "Que es EGR",
    keywords: ["egr", "valvula", "recirculacion"],
    answer:
      "[SIGNIFICADO]EGR recircula gases de escape para reducir NOx.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Si se atasca, causa humo negro y perdida de potencia.[/POSIBLES CAUSAS]",
  },
  {
    title: "Que es DPF",
    keywords: ["dpf", "filtro de particulas"],
    answer:
      "[SIGNIFICADO]DPF es el filtro de particulas diesel que atrapa hollin.[/SIGNIFICADO]\n\n[CONSEJO]Requiere regeneracion periodica para no taparse.[/CONSEJO]",
  },
  {
    title: "Que es SCR y AdBlue",
    keywords: ["scr", "adblue", "def"],
    answer:
      "[SIGNIFICADO]SCR reduce NOx usando AdBlue/DEF inyectado en el escape.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Falla genera codigos U o P y modo emergencia.[/DATOS CRITICOS]",
  },
  {
    title: "Que es VGT y Wastegate",
    keywords: ["vgt", "wastegate", "turbo"],
    answer:
      "[SIGNIFICADO]VGT controla geometria variable del turbo y wastegate controla presion de sobrealimentacion.[/SIGNIFICADO]\n\n[CONSEJO]Fallas causan falta de potencia o sobrepresion.[/CONSEJO]",
  },
  {
    title: "Que es EVAP y PCV",
    keywords: ["evap", "pcv", "canister", "purge"],
    answer:
      "[SIGNIFICADO]EVAP controla vapores de combustible; PCV controla vapores del carter.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas generan olor a combustible o codigos EVAP.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la ECU/PCM",
    keywords: ["ecu", "pcm", "modulo", "motor"],
    answer:
      "[SIGNIFICADO]La ECU/PCM es la computadora que controla motor e inyeccion.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Gestiona sensores, actuadores y diagnostico OBD.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la TCM",
    keywords: ["tcm", "transmision", "modulo"],
    answer:
      "[SIGNIFICADO]La TCM controla el cambio y la presion en transmisiones automaticas.[/SIGNIFICADO]\n\n[CONSEJO]Fallas generan cambios bruscos o modo emergencia.[/CONSEJO]",
  },
  {
    title: "Que es la BCM",
    keywords: ["bcm", "carroceria", "modulo"],
    answer:
      "[SIGNIFICADO]La BCM gestiona funciones de carroceria como luces y cierre central.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas causan multiples sintomas electricos.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la red CAN",
    keywords: ["can", "red", "comunicacion"],
    answer:
      "[SIGNIFICADO]CAN es la red principal de comunicacion entre modulos del vehiculo.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas causan codigos U0xxx y perdida de comunicacion.[/DATOS CRITICOS]",
  },
  {
    title: "Que es la red LIN",
    keywords: ["lin", "red", "comunicacion"],
    answer:
      "[SIGNIFICADO]LIN es una red secundaria de baja velocidad para modulos simples.[/SIGNIFICADO]\n\n[CONSEJO]Se usa en espejos, asientos y sensores secundarios.[/CONSEJO]",
  },
  {
    title: "Que es K-Line",
    keywords: ["k-line", "diagnostico", "obd"],
    answer:
      "[SIGNIFICADO]K-Line es un protocolo antiguo de diagnostico OBD.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Aun se ve en vehiculos pre-CAN.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el sistema OBD-II",
    keywords: ["obd", "obd2", "dtc", "diagnostico"],
    answer:
      "[SIGNIFICADO]OBD-II es el sistema estandar de diagnostico a bordo con codigos P, C, B y U.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Permite leer fallas y datos en tiempo real.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un codigo P0087",
    keywords: ["p0087", "codigo", "dtc"],
    answer:
      "[SIGNIFICADO]P0087 indica presion del riel de combustible demasiado baja.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Filtro tapado, bomba debil, regulador fallando, fugas.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar presion real, filtros, bomba de baja y alta.[/SOLUCION]",
  },
  {
    title: "Que es P0001",
    keywords: ["p0001", "codigo", "dtc"],
    answer:
      "[SIGNIFICADO]P0001 indica circuito de control del regulador de combustible abierto.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Cableado abierto, conector sulfatado, regulador defectuoso.[/POSIBLES CAUSAS]",
  },
  {
    title: "Que es misfire",
    keywords: ["misfire", "falla de encendido"],
    answer:
      "[SIGNIFICADO]Misfire es una falla de combustion en uno o varios cilindros.[/SIGNIFICADO]\n\n[POSIBLES CAUSAS]Bujias, bobinas, inyectores, compresion baja.[/POSIBLES CAUSAS]",
  },
  {
    title: "Que es un catalizador",
    keywords: ["catalizador", "catalyst", "emisiones"],
    answer:
      "[SIGNIFICADO]El catalizador reduce emisiones convirtiendo gases toxicos.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Fallas causan bajo rendimiento y codigos P0420/P0430.[/DATOS CRITICOS]",
  },
  {
    title: "Que es HCCI y PCCI",
    keywords: ["hcci", "pcci", "ppci"],
    answer:
      "[SIGNIFICADO]HCCI/PCCI son estrategias de combustion que buscan eficiencia y bajas emisiones.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Uso limitado por control complejo de la combustion.[/DATOS CRITICOS]",
  },
  {
    title: "Que es el ciclo Atkinson y Miller",
    keywords: ["atkinson", "miller", "ciclo"],
    answer:
      "[SIGNIFICADO]Atkinson/Miller son ciclos termodinamicos que mejoran eficiencia a costa de potencia.[/SIGNIFICADO]\n\n[CONSEJO]Se usan mucho en hibridos.[/CONSEJO]",
  },
  {
    title: "Que es un vehiculo hibrido (HEV/PHEV)",
    keywords: ["hibrido", "hev", "phev", "mhev"],
    answer:
      "[SIGNIFICADO]Un hibrido combina motor de combustion y motor electrico para mejorar eficiencia.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Usa bateria de traccion, inverter y control BMS.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un vehiculo electrico (EV)",
    keywords: ["ev", "electrico", "bateria"],
    answer:
      "[SIGNIFICADO]Un EV usa motor electrico y bateria de traccion sin combustion.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Componentes clave: inverter, BMS, motor electrico, DC-DC.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un BMS",
    keywords: ["bms", "bateria", "electrico"],
    answer:
      "[SIGNIFICADO]BMS gestiona y protege la bateria de traccion (voltaje, temperatura, balance).[/SIGNIFICADO]\n\n[ADVERTENCIA]Fallas pueden limitar potencia o deshabilitar el vehiculo.[/ADVERTENCIA]",
  },
  {
    title: "Que es un inverter",
    keywords: ["inverter", "inversor", "electrico"],
    answer:
      "[SIGNIFICADO]El inverter convierte corriente DC de la bateria en AC para el motor electrico.[/SIGNIFICADO]\n\n[DATOS CRITICOS]Es clave en EV e hibridos.[/DATOS CRITICOS]",
  },
  {
    title: "Que es un DC-DC",
    keywords: ["dc-dc", "convertidor", "electrico"],
    answer:
      "[SIGNIFICADO]El DC-DC reduce el alto voltaje de la bateria a 12V para accesorios.[/SIGNIFICADO]\n\n[CONSEJO]Si falla, la bateria auxiliar se descarga.[/CONSEJO]",
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
