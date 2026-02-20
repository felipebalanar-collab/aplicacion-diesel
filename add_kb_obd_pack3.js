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
    title: "OBD P0101 - Rango/Desempeno del Sensor MAF",
    keywords: ["p0101", "maf", "sensor", "aire", "rango", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que la senal del sensor MAF esta fuera del rango esperado en relacion con la carga del motor. Puede ser una lectura erratica o incorrecta.[/SIGNIFICADO]\n\n[FALLA]RalentI inestable, falta de potencia, aceleracion lenta, consumo elevado, humo negro en motores diesel.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor MAF sucio, filtro de aire tapado, fuga de vacio despues del MAF, cableado con alta resistencia, sensor MAF defectuoso, admision con restricciones.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar MAF con limpiador especifico, revisar filtro de aire, inspeccionar mangueras de admision, verificar voltaje de senal, reemplazar MAF si no cumple especificacion.[/SOLUCION]"
  },
  {
    title: "OBD P0102 - Circuito del Sensor MAF Bajo",
    keywords: ["p0102", "maf", "bajo", "sensor", "aire", "obd"],
    answer: "[SIGNIFICADO]El voltaje del sensor MAF esta por debajo del rango normal. El PCM interpreta flujo de aire demasiado bajo.[/SIGNIFICADO]\n\n[FALLA]Motor pobre, tironeo, falta de potencia, posible paro en ralentI, humo negro en diesel si compensa con combustible.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor MAF desconectado, cableado en corto a tierra, sensor sucio, fuga grande en admision, filtro extremadamente tapado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar conector MAF, limpiar sensor, inspeccionar cables, revisar filtro de aire, comprobar senal con scanner (g/s).[/SOLUCION]"
  },
  {
    title: "OBD P0103 - Circuito del Sensor MAF Alto",
    keywords: ["p0103", "maf", "alto", "sensor", "aire", "obd"],
    answer: "[SIGNIFICADO]La senal del MAF esta muy alta para las condiciones de operacion. El PCM detecta flujo de aire excesivo o senal erronea.[/SIGNIFICADO]\n\n[FALLA]RalentI inestable, mezcla rica, humo negro, consumo elevado, tironeo en aceleracion.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor MAF contaminado con aceite, cableado en corto a voltaje, filtro de alto flujo con aceite, MAF defectuoso, turbulencia en admision.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar MAF, revisar cableado, eliminar exceso de aceite en filtro, verificar senal con scanner, reemplazar MAF si persiste.[/SOLUCION]"
  },
  {
    title: "OBD P0113 - Sensor IAT Circuito Alto",
    keywords: ["p0113", "iat", "temperatura", "admisio", "alto", "obd"],
    answer: "[SIGNIFICADO]El sensor de temperatura de aire de admision (IAT) reporta voltaje alto, equivalente a temperatura muy baja o circuito abierto.[/SIGNIFICADO]\n\n[FALLA]Arranque en frio irregular, consumo elevado, mezcla rica, ventilador puede activarse, codigos relacionados.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor IAT desconectado, circuito abierto, conector sulfatado, sensor defectuoso, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar continuidad, revisar conector, medir resistencia del IAT, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0128 - Termostato Debajo de Temperatura",
    keywords: ["p0128", "termostato", "temperatura", "coolant", "obd"],
    answer: "[SIGNIFICADO]El motor tarda demasiado en alcanzar la temperatura operativa. PCM detecta que la temperatura del refrigerante no sube como se espera.[/SIGNIFICADO]\n\n[FALLA]Calefaccion deficiente, consumo elevado, mezcla rica, ventilador puede trabajar mas tiempo.[/FALLA]\n\n[POSIBLES CAUSAS]Termostato abierto, sensor ECT impreciso, refrigerante bajo, flujo excesivo por radiador, clima muy frio (menos comun).[/POSIBLES CAUSAS]\n\n[SOLUCION]Reemplazar termostato, verificar nivel de refrigerante, comparar lectura ECT con termometro IR, purgar aire del sistema.[/SOLUCION]"
  },
  {
    title: "OBD P0135 - Calentador del Sensor O2 Banco 1 Sensor 1",
    keywords: ["p0135", "o2", "sensor", "calentador", "b1s1", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del calentador del sensor de oxigeno B1S1. El sensor tarda en calentarse y el PCM no entra en lazo cerrado.[/SIGNIFICADO]\n\n[FALLA]Consumo elevado, ralenti irregular en frio, emisiones altas, check engine encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Calentador del sensor abierto, fusible quemado, cableado dañado, conector sulfatado, sensor O2 defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del calentador, revisar fusible y alimentacion, inspeccionar cableado, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0141 - Calentador del Sensor O2 Banco 1 Sensor 2",
    keywords: ["p0141", "o2", "sensor", "calentador", "b1s2", "obd"],
    answer: "[SIGNIFICADO]El calentador del sensor de oxigeno B1S2 (post-catalizador) no funciona correctamente. El PCM detecta resistencia o voltaje fuera de rango.[/SIGNIFICADO]\n\n[FALLA]Emisiones elevadas, retraso en diagnostico de catalizador, check engine encendida, consumo levemente mayor.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, circuito del calentador abierto, fusible quemado, cableado dañado, conector con humedad.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar resistencia del calentador, revisar fusible, inspeccionar arnes, reemplazar sensor si la resistencia es infinita.[/SOLUCION]"
  },
  {
    title: "OBD P0174 - Mezcla Pobre Banco 2",
    keywords: ["p0174", "mezcla", "pobre", "bank2", "combustible", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta una mezcla pobre en el banco 2. Los trims de combustible estan elevados intentando compensar.[/SIGNIFICADO]\n\n[FALLA]RalentI inestable, tironeo, falta de potencia, posibles detonaciones, consumo irregular.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga de vacio en banco 2, MAF sucio, presion de combustible baja, inyectores obstruidos, sensor O2 sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Buscar fugas de vacio, limpiar MAF, medir presion de combustible, balance de inyectores, revisar O2 y trims en vivo.[/SOLUCION]"
  },
  {
    title: "OBD P0183 - Sensor de Temperatura de Combustible Alto",
    keywords: ["p0183", "temperatura", "combustible", "alto", "sensor", "obd"],
    answer: "[SIGNIFICADO]El sensor de temperatura de combustible reporta voltaje alto, equivalente a temperatura muy baja o circuito abierto.[/SIGNIFICADO]\n\n[FALLA]Arranque irregular, consumo elevado, estrategia de combustible alterada, posible humo en diesel.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de temperatura desconectado, circuito abierto, conector sulfatado, sensor defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector y continuidad, medir resistencia del sensor, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0191 - Rango/Desempeno del Sensor de Presion de Combustible",
    keywords: ["p0191", "presion", "combustible", "sensor", "rail", "obd"],
    answer: "[SIGNIFICADO]La senal del sensor de presion de combustible no concuerda con la presion esperada. Puede ser intermitente o fuera de rango.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, falta de potencia, tironeo, apagones, modo limp, humo negro en diesel.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de presion defectuoso, conector suelto, baja presion real por bomba, regulador fallando, filtro tapado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Comparar presion real con scanner, revisar filtro de combustible, medir voltaje del sensor, verificar regulador y bomba, inspeccionar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0221 - Rango/Desempeno del Sensor TPS/Banco",
    keywords: ["p0221", "tps", "acelerador", "rango", "throttle", "obd"],
    answer: "[SIGNIFICADO]El sensor de posicion del acelerador (TPS) o del pedal (APP) esta fuera del rango esperado. El PCM detecta discrepancia.[/SIGNIFICADO]\n\n[FALLA]Respuesta lenta del acelerador, modo limp, ralenti alto, tironeo, luz de traccion encendida en algunos modelos.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor TPS desgastado, cuerpo de aceleracion sucio, cableado dañado, APP defectuoso, PCM detecta incoherencia entre sensores A/B.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar cuerpo de aceleracion, verificar voltajes TPS/APP con scanner, revisar conectores, recalibrar acelerador si aplica, reemplazar sensor si hay saltos.[/SOLUCION]"
  },
  {
    title: "OBD P0230 - Circuito Primario de la Bomba de Combustible",
    keywords: ["p0230", "bomba", "combustible", "rele", "circuito", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta un problema en el circuito primario de control de la bomba de combustible. Puede ser rele, cableado o control.[/SIGNIFICADO]\n\n[FALLA]No arranca, arranque prolongado, apagones, falta de presion de combustible.[/FALLA]\n\n[POSIBLES CAUSAS]Rele de bomba defectuoso, fusible quemado, cableado en corto, mala tierra, bomba con consumo excesivo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar fusible y rele, medir voltaje en bomba, probar consumo de corriente, revisar tierra, reemplazar rele/bomba si necesario.[/SOLUCION]"
  },
  {
    title: "OBD P0243 - Solenoide de Control de Wastegate",
    keywords: ["p0243", "wastegate", "turbo", "solenoide", "boost", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del solenoide de control de la wastegate. El PCM no puede controlar la presion de sobrealimentacion.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, sobrepresion o subpresion, modo limp, humo negro en diesel, silbido anormal.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide defectuoso, mangueras de vacio rotas, cableado dañado, conector suelto, wastegate trabada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar solenoide con multimetro, revisar mangueras de vacio, verificar accionamiento de wastegate, revisar cableado y tierra.[/SOLUCION]"
  },
  {
    title: "OBD P0263 - Balance de Aporte de Combustible Cilindro 1",
    keywords: ["p0263", "cilindro1", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el cilindro 1 aporta menos potencia que los demas. Indica desequilibrio de inyeccion/combustion.[/SIGNIFICADO]\n\n[FALLA]Vibracion, falta de potencia, ralenti irregular, humo, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector del cilindro 1 deficiente, compresion baja, fuga en inyectores, problema electrico en el circuito, desgaste mecanico.[/POSIBLES CAUSAS]\n\n[SOLUCION]Prueba de balance de cilindros, medir retorno de inyectores (diesel), prueba de compresion, revisar cableado, reemplazar inyector si corresponde.[/SOLUCION]"
  },
  {
    title: "OBD P0266 - Balance de Aporte de Combustible Cilindro 2",
    keywords: ["p0266", "cilindro2", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]El cilindro 2 no esta aportando potencia adecuada en comparacion con los otros. El PCM detecta desequilibrio de potencia.[/SIGNIFICADO]\n\n[FALLA]Vibracion en motor, falta de potencia, tironeo, humo negro o blanco.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector con flujo bajo, compresion reducida, fuga de combustible, problema en el driver del PCM, conexion floja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Prueba de retorno de inyectores, comparar compresion entre cilindros, revisar arnes y conectores, reemplazar inyector si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0299 - Baja Presion de Turbo",
    keywords: ["p0299", "turbo", "boost", "baja", "sobrealimentacion", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que la presion de sobrealimentacion esta por debajo de lo esperado. Puede ser fuga o control deficiente del turbo.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, respuesta lenta, modo limp, humo negro, silbido bajo carga.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga en mangueras de intercooler, turbo desgastado, wastegate abierta, actuador defectuoso, sensor MAP incorrecto, EGR trabada abierta.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar mangueras y abrazaderas, probar actuador del turbo, verificar presion con manometro, limpiar MAP, inspeccionar EGR.[/SOLUCION]"
  },
  {
    title: "OBD P0300 - Fallo de Encendido Aleatorio",
    keywords: ["p0300", "misfire", "aleatorio", "fallo", "encendido", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallos de encendido en multiples cilindros sin un patron especifico. Indica problema general de combuston.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, vibracion general, falta de potencia, check engine parpadeante, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Bujias desgastadas, bobinas multiples defectuosas, presion de combustible baja, fuga de vacio, inyectores sucios, sensor CKP/CMP inestable.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar bujias y bobinas, medir presion de combustible, buscar fugas de vacio, limpiar inyectores, verificar sensores CKP/CMP con scanner.[/SOLUCION]"
  },
  {
    title: "OBD P0325 - Sensor de Detonacion 1 Circuito",
    keywords: ["p0325", "knock", "detonacion", "sensor", "obd"],
    answer: "[SIGNIFICADO]El circuito del sensor de detonacion 1 presenta fallo. El PCM no recibe senal valida de knock.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, detonacion audible, motor inestable, check engine encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de knock defectuoso, cableado en corto, torque incorrecto del sensor, conectores sueltos, ruido mecanico excesivo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar cableado, medir resistencia del sensor, apretar con torque especifico, reemplazar sensor si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0335 - Sensor CKP Circuito",
    keywords: ["p0335", "ckp", "cigue", "sensor", "rpm", "obd"],
    answer: "[SIGNIFICADO]El PCM no recibe senal valida del sensor de posicion del cigue (CKP). El motor puede no arrancar o apagarse.[/SIGNIFICADO]\n\n[FALLA]No arranca, apagones repentinos, tacometro en cero, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor CKP defectuoso, cableado roto, reluctor danado, conector suelto, interferencia electrica.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir senal con osciloscopio, inspeccionar reluctor, revisar cableado, reemplazar sensor si no hay senal.[/SOLUCION]"
  },
  {
    title: "OBD P0340 - Sensor CMP Circuito",
    keywords: ["p0340", "cmp", "arbol", "sensor", "fase", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta fallo en el circuito del sensor de posicion del arbol de levas (CMP). Puede afectar el encendido y la sincronizacion.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, tironeo, falta de potencia, consumo alto, check engine encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor CMP defectuoso, cableado danado, reluctor con problemas, sincronizacion fuera de punto, conector suelto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado y conector, medir senal, verificar sincronizacion, reemplazar sensor si la senal es inestable.[/SOLUCION]"
  },
  {
    title: "OBD P0401 - Flujo EGR Insuficiente",
    keywords: ["p0401", "egr", "flujo", "insuficiente", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el flujo de EGR es menor al esperado. La recirculacion de gases no es suficiente.[/SIGNIFICADO]\n\n[FALLA]Detonacion, NOx elevado, tironeo en aceleracion, check engine encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula EGR tapada por carbon, pasajes bloqueados, solenoide defectuoso, vacio insuficiente, sensor de posicion EGR mal.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar valvula y pasajes EGR, verificar vacio, probar solenoide, revisar sensores, reemplazar EGR si esta trabada.[/SOLUCION]"
  },
  {
    title: "OBD P0402 - Flujo EGR Excesivo",
    keywords: ["p0402", "egr", "flujo", "excesivo", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta flujo de EGR mayor al esperado. Esto suele causar ralenti irregular y falta de potencia.[/SIGNIFICADO]\n\n[FALLA]RalentI inestable, apagones, falta de potencia, humo negro en diesel, check engine encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula EGR trabada abierta, solenoide pegado, sensor EGR leyendo mal, vacio excesivo, carbon en valvula.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar valvula EGR, limpiar carbon, probar solenoide, verificar senal del sensor, reemplazar EGR si no cierra.[/SOLUCION]"
  },
  {
    title: "OBD P0420 - Eficiencia del Catalizador Bajo",
    keywords: ["p0420", "catalizador", "eficiencia", "o2", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el catalizador no esta reduciendo emisiones como se espera. La senal del O2 posterior imita a la delantera.[/SIGNIFICADO]\n\n[FALLA]Check engine encendida, emisiones elevadas, posible olor a azufre, consumo levemente mayor.[/FALLA]\n\n[POSIBLES CAUSAS]Catalizador degradado, sensor O2 posterior defectuoso, fugas de escape, mezcla rica prolongada, fallos de encendido previos.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar O2 delantero y trasero, revisar fugas de escape, solucionar fallos de encendido, reemplazar catalizador si esta agotado.[/SOLUCION]"
  },
  {
    title: "OBD P0457 - Tapa de Combustible Suelta",
    keywords: ["p0457", "evap", "tapa", "combustible", "fuga", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta una fuga de EVAP causada frecuentemente por tapa de combustible floja o dañada.[/SIGNIFICADO]\n\n[FALLA]Luz Check Engine encendida, sin sintomas de manejo, posible olor a gasolina.[/FALLA]\n\n[POSIBLES CAUSAS]Tapa de combustible floja, sello roto, rosca danada, cuello de llenado sucio, tapa incorrecta.[/POSIBLES CAUSAS]\n\n[SOLUCION]Apretar la tapa hasta 3 clics, revisar sello, limpiar cuello, reemplazar tapa si esta danada.[/SOLUCION]"
  },
  {
    title: "OBD P0505 - Control de RalentI (IAC) Mal Funcionamiento",
    keywords: ["p0505", "iac", "ralenti", "control", "obd"],
    answer: "[SIGNIFICADO]El control de ralenti (IAC) no puede mantener la velocidad objetivo. El PCM detecta inestabilidad de RPM.[/SIGNIFICADO]\n\n[FALLA]RalentI inestable, motor se apaga al detenerse, RPM altas o bajas, dificultades en frio.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula IAC sucia, cuerpo de aceleracion contaminado, fuga de vacio, IAC defectuoso, cableado danado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar IAC y cuerpo de aceleracion, revisar fugas de vacio, verificar voltajes, reemplazar IAC si no responde.[/SOLUCION]"
  },
  {
    title: "OBD P0606 - Error del Procesador del PCM",
    keywords: ["p0606", "pcm", "procesador", "ecu", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta un fallo interno en su procesador. Puede ser intermitente o permanente.[/SIGNIFICADO]\n\n[FALLA]Apagones, modo limp, codigos multiples, no arranca, comportamiento erratico.[/FALLA]\n\n[POSIBLES CAUSAS]PCM danado, voltaje inestable, humedad en el modulo, programacion corrupta, masa deficiente.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar voltaje y tierras, revisar conectores, intentar reprogramacion, reemplazar PCM si persiste.[/SOLUCION]"
  },
  {
    title: "OBD P0620 - Circuito de Control del Generador",
    keywords: ["p0620", "alternador", "generador", "control", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta un fallo en el circuito de control del alternador. La salida de carga no se regula correctamente.[/SIGNIFICADO]\n\n[FALLA]Luz de bateria encendida, voltaje bajo o alto, fallas electricas multiples, apagones.[/FALLA]\n\n[POSIBLES CAUSAS]Alternador defectuoso, regulador fallando, cableado del campo abierto, conector suelto, PCM con salida danada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje de carga, revisar cableado del alternador, probar regulador, verificar tierra, reemplazar alternador si no regula.[/SOLUCION]"
  },
  {
    title: "OBD P0641 - Circuito de Referencia 5V Sensor A",
    keywords: ["p0641", "5v", "referencia", "sensor", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el circuito de referencia de 5V para sensores esta fuera de rango. Puede estar en corto a tierra o a voltaje.[/SIGNIFICADO]\n\n[FALLA]Multiples codigos de sensores, modo limp, sensores fuera de rango, apagones.[/FALLA]\n\n[POSIBLES CAUSAS]Corto en sensor MAP/TPS, cableado pellizcado, sensor interno en corto, PCM danado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Desconectar sensores uno por uno para aislar el corto, medir 5V en el arnes, revisar cableado, reemplazar sensor que colapsa la linea.[/SOLUCION]"
  },
  {
    title: "OBD P0700 - Mal Funcionamiento en Transmision",
    keywords: ["p0700", "transmision", "tcm", "mil", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el TCM ha solicitado encender la MIL. Indica que hay codigos en el modulo de transmision.[/SIGNIFICADO]\n\n[FALLA]Cambios bruscos, modo limp, MIL encendida, perdida de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Codigos internos en TCM, fallas de solenoides, sensores de velocidad, problemas de presion, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Escanear TCM con equipo avanzado, leer codigos especificos, revisar ATF, reparar segun DTCs del TCM.[/SOLUCION]"
  },
  {
    title: "OBD P0740 - Falla del Embrague del Convertidor",
    keywords: ["p0740", "tcc", "convertidor", "transmision", "obd"],
    answer: "[SIGNIFICADO]El embrague del convertidor de torque no se acopla correctamente. El PCM detecta deslizamiento en el TCC.[/SIGNIFICADO]\n\n[FALLA]RPM altas en carretera, sobrecalentamiento, consumo alto, vibraciones en lockup.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide TCC defectuoso, fluido ATF contaminado, valvula de cuerpo de valvulas trabada, convertidor danado, cableado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar ATF, probar solenoide TCC, medir presion hidraulica, revisar cableado, reparar o reemplazar convertidor.[/SOLUCION]"
  },
  {
    title: "OBD U0101 - Perdida de Comunicacion con TCM",
    keywords: ["u0101", "tcm", "comunicacion", "can", "obd"],
    answer: "[SIGNIFICADO]El PCM no puede comunicarse con el modulo de control de transmision (TCM) en la red CAN.[/SIGNIFICADO]\n\n[FALLA]Modo limp, cambios erraticos, MIL encendida, sin datos de transmision.[/FALLA]\n\n[POSIBLES CAUSAS]TCM sin alimentacion, cables CAN abiertos, conector flojo, modulo TCM defectuoso, resistencias CAN incorrectas.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar alimentacion y tierra del TCM, medir resistencia CAN (120 ohm), inspeccionar conectores, escanear red CAN.[/SOLUCION]"
  },
  {
    title: "OBD U0140 - Perdida de Comunicacion con BCM",
    keywords: ["u0140", "bcm", "comunicacion", "can", "obd"],
    answer: "[SIGNIFICADO]El PCM pierde comunicacion con el modulo de carroceria (BCM). Puede afectar luces, cierres y sistemas de confort.[/SIGNIFICADO]\n\n[FALLA]Luces erraticas, cierre centralizado falla, ventanas no funcionan, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]BCM sin alimentacion, cortos en CAN, conector flojo, BCM defectuoso, baja tension en bateria.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar fusibles del BCM, revisar conexiones, medir CAN, comprobar alimentacion y tierra, reemplazar BCM si no comunica.[/SOLUCION]"
  },
  {
    title: "OBD B0020 - Circuito del Airbag Lateral Izquierdo",
    keywords: ["b0020", "airbag", "lateral", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del airbag lateral izquierdo. El modulo SRS detecta resistencia o voltaje fuera de rango.[/SIGNIFICADO]\n\n[FALLA]Luz de airbag encendida, SRS desactivado en ese lado.[/FALLA]\n\n[POSIBLES CAUSAS]Conector bajo asiento flojo, cableado dañado, airbag lateral defectuoso, modulo SRS con falla.[/POSIBLES CAUSAS]\n\n[SOLUCION]Desconectar bateria antes de trabajar, revisar conectores amarillos, medir resistencia segun manual, reparar cableado, reemplazar airbag si es necesario.[/SOLUCION]"
  },
  {
    title: "OBD B0092 - Sensor de Impacto Lateral",
    keywords: ["b0092", "impacto", "lateral", "sensor", "srs", "obd"],
    answer: "[SIGNIFICADO]El modulo SRS detecta un problema en el sensor de impacto lateral. Puede deshabilitar airbags laterales.[/SIGNIFICADO]\n\n[FALLA]Luz SRS encendida, airbags laterales desactivados.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de impacto defectuoso, cableado roto, conector sulfatado, montaje flojo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conectores, verificar montaje, reemplazar sensor si no responde, borrar codigo con scanner SRS.[/SOLUCION]"
  },
  {
    title: "OBD C0035 - Sensor de Velocidad de Rueda Delantera Izquierda",
    keywords: ["c0035", "abs", "sensor", "rueda", "izquierda", "obd"],
    answer: "[SIGNIFICADO]El modulo ABS detecta falla en el sensor de velocidad de la rueda delantera izquierda.[/SIGNIFICADO]\n\n[FALLA]Luz ABS encendida, ESP desactivado, frenado con ABS no disponible, velocidad de rueda erratica en scanner.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor ABS dañado, cable cortado, anillo reluctor roto, suciedad metalica en sensor, conector suelto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar sensor y anillo reluctor, limpiar, medir resistencia, revisar cableado, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD C0050 - Sensor de Velocidad de Rueda Trasera Derecha",
    keywords: ["c0050", "abs", "sensor", "rueda", "trasera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor de velocidad de la rueda trasera derecha. El ABS no recibe senal valida.[/SIGNIFICADO]\n\n[FALLA]Luz ABS encendida, ESP desactivado, lectura de velocidad erratica, posible tiron al frenar.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor ABS sucio o danado, cableado roto, anillo reluctor con dientes dañados, conector flojo, corrosion.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar sensor, revisar cableado, medir resistencia, inspeccionar anillo reluctor, reemplazar sensor si no hay senal.[/SOLUCION]"
  },
  {
    title: "OBD C1234 - Falla del Sensor de Angulo de Direccion",
    keywords: ["c1234", "angulo", "direccion", "sensor", "esp", "obd"],
    answer: "[SIGNIFICADO]El modulo ESP detecta que el sensor de angulo de direccion esta fuera de rango o sin calibracion.[/SIGNIFICADO]\n\n[FALLA]Luz ESP/ABS encendida, direccion asistida con fallas, control de estabilidad inoperante.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de angulo descalibrado, bateria desconectada, sensor defectuoso, cableado danado, modulo ESP con fallo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Realizar calibracion con scanner, verificar conectores, revisar voltajes de referencia, reemplazar sensor si no calibra.[/SOLUCION]"
  }
];

async function seedKnowledgeBase() {
  console.log("Iniciando carga de Knowledge Base - OBD Pack 3...");
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
        console.error(`❌ Error insertando "${article.title}":`, error.message);
      } else {
        console.log(`✅ Insertado: ${article.title}`);
      }
    } catch (err) {
      console.error(`❌ Excepcion insertando "${article.title}":`, err.message);
    }
  }

  console.log("\n✅ Proceso completado - Pack 3");
  console.log("Total procesado:", newArticles.length, "articulos");
}

seedKnowledgeBase();
