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
    title: "OBD P0117 - Sensor ECT Circuito Bajo",
    keywords: ["p0117", "ect", "temperatura", "refrigerante", "bajo", "obd"],
    answer: "[SIGNIFICADO]El sensor de temperatura de refrigerante (ECT) reporta voltaje bajo, equivalente a temperatura muy alta o corto a tierra.[/SIGNIFICADO]\n\n[FALLA]Ventilador encendido constante, mezcla pobre en frio, arranque dificil, consumo irregular.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor ECT en corto, cableado pellizcado, conector sulfatado, referencia 5V en corto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado y conector, medir resistencia del ECT, comparar lectura con termometro, reemplazar sensor si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0118 - Sensor ECT Circuito Alto",
    keywords: ["p0118", "ect", "temperatura", "refrigerante", "alto", "obd"],
    answer: "[SIGNIFICADO]El sensor ECT reporta voltaje alto, equivalente a temperatura muy baja o circuito abierto.[/SIGNIFICADO]\n\n[FALLA]RalentI alto en frio, mezcla rica, ventilador puede no activar, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor ECT desconectado, circuito abierto, conector dañado, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar continuidad, revisar conector, medir resistencia del sensor, reemplazar ECT si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0122 - Sensor TPS Circuito Bajo",
    keywords: ["p0122", "tps", "acelerador", "bajo", "throttle", "obd"],
    answer: "[SIGNIFICADO]El TPS reporta voltaje bajo. El PCM detecta acelerador cerrado o circuito en corto.[/SIGNIFICADO]\n\n[FALLA]Respuesta lenta, modo limp, ralenti irregular, falta de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor TPS defectuoso, cableado en corto, conector flojo, cuerpo de aceleracion sucio.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar voltaje de TPS, inspeccionar arnes, limpiar cuerpo de aceleracion, reemplazar TPS si hay saltos.[/SOLUCION]"
  },
  {
    title: "OBD P0123 - Sensor TPS Circuito Alto",
    keywords: ["p0123", "tps", "acelerador", "alto", "throttle", "obd"],
    answer: "[SIGNIFICADO]El TPS reporta voltaje alto fuera de rango. El PCM interpreta acelerador abierto permanentemente.[/SIGNIFICADO]\n\n[FALLA]Ralenti alto, respuesta anormal, modo limp, tironeo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a voltaje en TPS, sensor defectuoso, conector con humedad, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje del TPS, revisar cableado, limpiar conector, reemplazar sensor si no baja a 0.5V en reposo.[/SOLUCION]"
  },
  {
    title: "OBD P0203 - Circuito del Inyector Cilindro 3",
    keywords: ["p0203", "inyector", "cilindro3", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del inyector del cilindro 3. El PCM detecta circuito abierto o corto.[/SIGNIFICADO]\n\n[FALLA]Tironeo, falta de potencia, ralenti irregular, humo, posible fallo de encendido.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector abierto, conector suelto, cableado roto, driver del PCM dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del inyector, revisar conector, probar continuidad, intercambiar inyector para confirmar.[/SOLUCION]"
  },
  {
    title: "OBD P0204 - Circuito del Inyector Cilindro 4",
    keywords: ["p0204", "inyector", "cilindro4", "circuito", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallo en el circuito del inyector del cilindro 4.[/SIGNIFICADO]\n\n[FALLA]Perdida de potencia, ralenti irregular, humo, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector defectuoso, cableado en corto, conector suelto, driver PCM fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del inyector, revisar arnes, verificar pulso con noid light, reemplazar inyector si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0205 - Circuito del Inyector Cilindro 5",
    keywords: ["p0205", "inyector", "cilindro5", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla del circuito del inyector en cilindro 5.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, misfire, humo, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector con bobina abierta, conector flojo, cableado dañado, PCM con driver defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar resistencia del inyector, revisar cableado, intercambiar inyector, revisar pulso de control.[/SOLUCION]"
  },
  {
    title: "OBD P0206 - Circuito del Inyector Cilindro 6",
    keywords: ["p0206", "inyector", "cilindro6", "circuito", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta problema en el circuito del inyector del cilindro 6.[/SIGNIFICADO]\n\n[FALLA]Tironeo, fallo de encendido, humo, perdida de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector abierto o en corto, conector suelto, cableado roto, driver PCM dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del inyector, revisar continuidad del arnes, probar con noid light, reemplazar inyector si corresponde.[/SOLUCION]"
  },
  {
    title: "OBD P0316 - Fallo de Encendido al Arranque",
    keywords: ["p0316", "misfire", "arranque", "fallo", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallos de encendido durante los primeros segundos despues del arranque.[/SIGNIFICADO]\n\n[FALLA]Arranque irregular, vibracion en frio, posibles apagones.[/FALLA]\n\n[POSIBLES CAUSAS]Bujias desgastadas, presion de combustible baja al arranque, inyectores sucios, sensor ECT defectuoso, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar bujias, medir presion al arranque, limpiar inyectores, verificar ECT y trims, prueba de compresion.[/SOLUCION]"
  },
  {
    title: "OBD P0341 - Rango/Desempeno del Sensor CMP",
    keywords: ["p0341", "cmp", "arbol", "rango", "obd"],
    answer: "[SIGNIFICADO]La senal del sensor CMP no concuerda con la esperada. Puede ser intermitente o desfasada.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, tironeo, falta de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor CMP defectuoso, sincronizacion fuera de punto, reluctor dañado, cableado con interferencia.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar sincronizacion, medir senal con osciloscopio, revisar cableado, reemplazar CMP si la senal es inestable.[/SOLUCION]"
  },
  {
    title: "OBD P0380 - Circuito de Bujias Incandescentes",
    keywords: ["p0380", "glow", "bujias", "incandescentes", "diesel", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito de bujias incandescentes o su modulo de control. Afecta el arranque en frio.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil en frio, humo blanco, vibracion inicial.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia incandescente quemada, rele/modulo defectuoso, cableado dañado, fusible abierto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia de bujias, revisar fusibles, probar rele/modulo, reemplazar bujias defectuosas.[/SOLUCION]"
  },
  {
    title: "OBD P0421 - Eficiencia del Catalizador Calentamiento",
    keywords: ["p0421", "catalizador", "warmup", "eficiencia", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que la eficiencia del catalizador durante el calentamiento es baja.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas, posible olor a azufre.[/FALLA]\n\n[POSIBLES CAUSAS]Catalizador degradado, sensor O2 defectuoso, mezcla rica prolongada, fugas de escape.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar O2 delantero y trasero, inspeccionar fugas de escape, corregir mezcla rica, reemplazar catalizador si esta agotado.[/SOLUCION]"
  },
  {
    title: "OBD P0440 - Falla del Sistema EVAP",
    keywords: ["p0440", "evap", "falla", "vapores", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta un mal funcionamiento general del sistema EVAP. No puede sellar o purgar correctamente.[/SIGNIFICADO]\n\n[FALLA]Check Engine encendida, sin sintomas de manejo, olor a gasolina.[/FALLA]\n\n[POSIBLES CAUSAS]Tapa floja, lineas EVAP con fugas, valvula purge defectuosa, canister saturado, sensor de presion fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar tapa, hacer prueba de humo, verificar valvulas purge y vent, inspeccionar lineas y canister.[/SOLUCION]"
  },
  {
    title: "OBD P0441 - Flujo Purga EVAP Incorrecto",
    keywords: ["p0441", "evap", "purga", "flujo", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta flujo de purga EVAP fuera de rango.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, olor a combustible, posibles fallas en emisiones.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula purge trabada, lineas obstruidas, canister saturado, vacio incorrecto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar valvula purge con vacuo, revisar lineas, limpiar o reemplazar canister, verificar vacio.[/SOLUCION]"
  },
  {
    title: "OBD P0451 - Sensor de Presion EVAP Rango",
    keywords: ["p0451", "evap", "presion", "sensor", "rango", "obd"],
    answer: "[SIGNIFICADO]El sensor de presion del tanque EVAP reporta valores fuera del rango esperado.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, fallas en prueba EVAP, sin sintomas de manejo.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de presion defectuoso, manguera tapada, conector sulfatado, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir voltaje del sensor, verificar lineas de vacio, reemplazar sensor si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0452 - Sensor de Presion EVAP Bajo",
    keywords: ["p0452", "evap", "presion", "bajo", "obd"],
    answer: "[SIGNIFICADO]El voltaje del sensor de presion EVAP esta bajo. Puede indicar corto a tierra o sensor dañado.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, prueba EVAP fallida, olor a gasolina.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor en corto, cableado a tierra, conector mojado, circuito defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje de referencia 5V, revisar continuidad, reemplazar sensor si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0453 - Sensor de Presion EVAP Alto",
    keywords: ["p0453", "evap", "presion", "alto", "obd"],
    answer: "[SIGNIFICADO]El voltaje del sensor de presion EVAP esta alto, equivalente a circuito abierto.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, fallas en prueba EVAP.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor desconectado, circuito abierto, conector suelto, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir continuidad, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0471 - Sensor de Presion de Escape Rango",
    keywords: ["p0471", "presion", "escape", "sensor", "dpf", "obd"],
    answer: "[SIGNIFICADO]El sensor de presion de escape (DPF/EBP) reporta valores fuera de rango.[/SIGNIFICADO]\n\n[FALLA]Modo limp, falta de potencia, regeneraciones frecuentes, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, manguera de presion obstruida, carbon en tuberia, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar mangueras, revisar sensor, medir voltaje, reemplazar sensor si es necesario.[/SOLUCION]"
  },
  {
    title: "OBD P0481 - Ventilador de Enfriamiento 2",
    keywords: ["p0481", "ventilador", "enfriamiento", "rele", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallo en el circuito del ventilador secundario.[/SIGNIFICADO]\n\n[FALLA]Sobrecalentamiento en trafico, aire acondicionado deficiente, ventilador no activa.[/FALLA]\n\n[POSIBLES CAUSAS]Rele defectuoso, motor del ventilador dañado, fusible quemado, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar motor con 12V, revisar fusibles, medir voltaje en rele, reparar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0496 - Flujo de Purga EVAP en Condicion No Comandada",
    keywords: ["p0496", "evap", "purga", "flujo", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta flujo de purga EVAP cuando no deberia. Normalmente la valvula purge esta abierta o hay fuga.[/SIGNIFICADO]\n\n[FALLA]Arranque largo, mezcla rica, ralenti irregular, olor a gasolina.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula purge trabada abierta, linea EVAP conectada incorrectamente, canister saturado, sensor de presion sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar valvula purge, revisar conexiones EVAP, reemplazar canister si esta saturado, verificar sensor de presion.[/SOLUCION]"
  },
  {
    title: "OBD P0521 - Sensor de Presion de Aceite Rango",
    keywords: ["p0521", "aceite", "presion", "sensor", "obd"],
    answer: "[SIGNIFICADO]El sensor de presion de aceite reporta valores fuera de rango o inconsistentes con el regimen del motor.[/SIGNIFICADO]\n\n[FALLA]Luz de aceite, modo limp, ruidos en motor, apagones preventivos.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, baja presion real de aceite, cableado dañado, aceite incorrecto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar presion con manometro mecanico, revisar nivel y tipo de aceite, medir senal del sensor, reemplazar sensor si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0560 - Voltaje del Sistema",
    keywords: ["p0560", "voltaje", "sistema", "bateria", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta voltaje de sistema fuera de rango general (alto o bajo).[/SIGNIFICADO]\n\n[FALLA]Luces tenues, apagones, codigos multiples, comportamiento erratico.[/FALLA]\n\n[POSIBLES CAUSAS]Alternador defectuoso, bateria debil, conexiones sueltas, regulador fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje de carga, revisar conexiones, probar alternador y bateria, reparar cableado principal.[/SOLUCION]"
  },
  {
    title: "OBD P0571 - Interruptor de Freno Circuito",
    keywords: ["p0571", "freno", "interruptor", "crucero", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallo en el circuito del interruptor de freno. Afecta el control crucero y luces de freno.[/SIGNIFICADO]\n\n[FALLA]Crucero no funciona, luces de freno intermitentes, cambios bruscos en transmisiones automaticas.[/FALLA]\n\n[POSIBLES CAUSAS]Interruptor de freno defectuoso, conector flojo, cableado dañado, ajuste incorrecto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar ajuste del switch, medir continuidad, inspeccionar arnes, reemplazar interruptor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0607 - Desempeno del Modulo de Control",
    keywords: ["p0607", "pcm", "modulo", "desempeno", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallo interno de desempeno o procesamiento. Puede ser intermitente.[/SIGNIFICADO]\n\n[FALLA]Apagones, modo limp, codigos multiples, arranque irregular.[/FALLA]\n\n[POSIBLES CAUSAS]PCM dañado, voltaje inestable, humedad en el modulo, reprogramacion fallida.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar alimentacion y tierras, revisar conectores, intentar reprogramar, reemplazar PCM si persiste.[/SOLUCION]"
  },
  {
    title: "OBD P0650 - Circuito de MIL",
    keywords: ["p0650", "mil", "check", "luz", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallo en el circuito de la luz MIL (Check Engine).[/SIGNIFICADO]\n\n[FALLA]Luz MIL no enciende en prueba o permanece encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bombilla quemada, circuito abierto, cluster defectuoso, PCM no controla la salida.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar foco/LED en tablero, revisar cableado, probar salida del PCM, reparar cluster si aplica.[/SOLUCION]"
  },
  {
    title: "OBD U0001 - Red CAN Alta Velocidad",
    keywords: ["u0001", "can", "red", "comunicacion", "obd"],
    answer: "[SIGNIFICADO]Error general en la red CAN de alta velocidad. Puede haber corto o interrupcion en comunicaciones.[/SIGNIFICADO]\n\n[FALLA]Perdida de comunicacion con modulos, MIL encendida, funciones desactivadas.[/FALLA]\n\n[POSIBLES CAUSAS]Corto en CAN H/L, modulo defectuoso bloqueando la red, resistencias de terminacion incorrectas, arnes dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia entre CAN H y CAN L (120 ohm), aislar modulos uno a uno, inspeccionar arnes, reparar corto.[/SOLUCION]"
  },
  {
    title: "OBD U0073 - Bus de Comunicacion Deshabilitado",
    keywords: ["u0073", "can", "bus", "deshabilitado", "obd"],
    answer: "[SIGNIFICADO]El bus de comunicacion se deshabilito por corto o falla critica.[/SIGNIFICADO]\n\n[FALLA]Perdida de comunicacion, multiples modulos sin respuesta, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Corto en bus, modulo defectuoso, arnes dañado, baja tension.[/POSIBLES CAUSAS]\n\n[SOLUCION]Desconectar modulos para aislar, revisar resistencia CAN, inspeccionar cableado, reparar corto y restablecer comunicaciones.[/SOLUCION]"
  },
  {
    title: "OBD B0100 - Circuito del Airbag Delantero",
    keywords: ["b0100", "airbag", "frontal", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del airbag frontal. El modulo SRS detecta resistencia fuera de rango.[/SIGNIFICADO]\n\n[FALLA]Luz SRS encendida, airbag frontal deshabilitado.[/FALLA]\n\n[POSIBLES CAUSAS]Conector suelto, cableado dañado, airbag defectuoso, modulo SRS fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Desconectar bateria, revisar conectores amarillos, medir resistencia segun manual, reparar cableado o reemplazar airbag.[/SOLUCION]"
  },
  {
    title: "OBD C0110 - Bomba ABS Motor Circuito",
    keywords: ["c0110", "abs", "bomba", "motor", "circuito", "obd"],
    answer: "[SIGNIFICADO]El modulo ABS detecta falla en el circuito del motor de la bomba hidraulica.[/SIGNIFICADO]\n\n[FALLA]ABS deshabilitado, luz ABS encendida, control de estabilidad inoperante.[/FALLA]\n\n[POSIBLES CAUSAS]Motor de bomba dañado, rele defectuoso, fusible quemado, cableado en corto, modulo ABS fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fusibles y rele, medir voltaje en la bomba, probar motor con 12V, inspeccionar arnes, reemplazar modulo si no hay control.[/SOLUCION]"
  }
];

async function seedKnowledgeBase() {
  console.log("Iniciando carga de Knowledge Base - OBD Pack 4...");
  console.log(`Total de articulos a insertar: ${newArticles.length}\n`);

  for (const article of newArticles) {
    try {
      const { error } = await supabase
        .from("assistant_kb")
        .insert([
          {
            title: article.title,
            keywords: article.keywords,
            answer: article.answer,
          },
        ]);

      if (error) {
        console.error(`❌ Error insertando \"${article.title}\":`, error.message);
      } else {
        console.log(`✅ Insertado: ${article.title}`);
      }
    } catch (err) {
      console.error(`❌ Excepcion insertando \"${article.title}\":`, err.message);
    }
  }

  console.log("\n✅ Proceso completado - Pack 4");
  console.log("Total procesado:", newArticles.length, "articulos");
}

seedKnowledgeBase();
