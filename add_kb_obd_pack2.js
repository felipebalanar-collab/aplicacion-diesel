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
    title: "OBD P0303 - Fallo de Encendido en Cilindro 3",
    keywords: ["p0303", "cilindro3", "fallo", "encendido", "misfire", "obd"],
    answer: "[SIGNIFICADO]Detecta fallos de combustión específicamente en el cilindro número 3. El PCM monitorea las irregularidades en la velocidad del cigüeñal para identificar fallos de encendido.[/SIGNIFICADO]\n\n[FALLA]Fallo intermitente o constante en cilindro 3, pérdida de potencia notable, motor tiembla o vibra en ralentí, luz Check Engine encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bujía del cilindro 3 desgastada o contaminada, bobina de encendido defectuosa, inyector obstruido o con fuga, baja compresión en cilindro 3, cables de bujía dañados, problema en válvulas.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Inspeccionar y reemplazar bujía del cilindro 3, verificar bobina de encendido con multímetro, probar inyector (resistencia y patrón de spray), realizar prueba de compresión, revisar estado de cables de alta tensión.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0304 - Fallo de Encendido en Cilindro 4",
    keywords: ["p0304", "cilindro4", "fallo", "encendido", "misfire", "obd"],
    answer: "[SIGNIFICADO]Indica fallo de combustión en el cilindro 4. Sistema OBD-II detecta irregularidades en revoluciones del motor causadas por fallos de encendido.[/SIGNIFICADO]\n\n[FALLA]Ralentí irregular con vibración, pérdida de aceleración, aumento en consumo de combustible, posible daño al convertidor catalítico si no se corrige.[/FALLA]\n\n[POSIBLES CAUSAS]Bujía deteriorada en cilindro 4, bobina de encendido sin chispa, inyector tapado o goteando, fuga de compresión (anillos, válvulas), cableado o conector dañado.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Cambiar bujía y verificar gap correcto, probar resistencia de bobina (típicamente 0.5-2Ω primario), limpiar o reemplazar inyector, prueba de compresión y fugas, inspeccionar arnés eléctrico.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0305 - Fallo de Encendido en Cilindro 5",
    keywords: ["p0305", "cilindro5", "fallo", "encendido", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de combustión detectado en cilindro 5 (común en V6 o motores de 6+ cilindros). Más de 2% de fallos registrados en 1000 revoluciones.[/SIGNIFICADO]\n\n[FALLA]Motor funciona desbalanceado, vibración excesiva en ralentí, reducción de potencia, posible sobrecalentamiento del catalizador.[/FALLA]\n\n[POSIBLES CAUSAS]Bujía con carbón o aceite, bobina COP (coil-on-plug) dañada, inyector con baja presión de apertura, compresión baja por anillos gastados, válvula de admisión con carbón acumulado.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Reemplazar bujía OEM especificada, medir resistencia secundaria de bobina (6-8kΩ), probar balance de inyectores, endoscopía para ver pistón y válvulas, limpieza de carbón con Seafoam o walnut blasting.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0306 - Fallo de Encendido en Cilindro 6",
    keywords: ["p0306", "cilindro6", "fallo", "encendido", "misfire", "obd"],
    answer: "[SIGNIFICADO]Sistema detecta fallos de encendido en últimos cilindros (posición 6). En motores V6 suele ser el cilindro trasero del banco 2.[/SIGNIFICADO]\n\n[FALLA]Pérdida notable de suavidad del motor, Check Engine parpadeando (fallo severo), olor a combustible sin quemar, temperatura alta en convertidor.[/FALLA]\n\n[POSIBLES CAUSAS]Bujía inundada con combustible, bobina con corto interno, inyector pegado abierto, válvula rota o caída, empaque de culata soplado en cilindro 6, problema mecánico severo.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Inspección visual del cilindro con boroscopio, prueba de compresión húmeda y seca, verificar spark con probador de chispa, medir duty cycle del inyector, revisar presión de combustible.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0307 - Fallo de Encendido en Cilindro 7",
    keywords: ["p0307", "cilindro7", "fallo", "encendido", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de combustión en cilindro 7 (motores V8 o más). Código grave que requiere atención inmediata para evitar daños al catalizador.[/SIGNIFICADO]\n\n[FALLA]Vibración severa del motor, potencia reducida significativamente, humo blanco o negro del escape, posible daño al catalizador por combustible sin quemar.[/FALLA]\n\n[POSIBLES CAUSAS]Sistema de encendido defectuoso, inyector obstruido o con fuga, problema de compresión mecánica, válvulas desajustadas o rotas, árbol de levas desgastado en lóbulo 7.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar chispa con probador LED, inspeccionar conexiones eléctricas del cilindro, probar flujo y resistencia del inyector, prueba de compresión comparativa, verificar juego de válvulas.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0308 - Fallo de Encendido en Cilindro 8",
    keywords: ["p0308", "cilindro8", "fallo", "encendido", "misfire", "obd"],
    answer: "[SIGNIFICADO]Último cilindro en motores V8. Fallo detectado por sensor de posición del cigüeñal que mide desaceleración irregular de revoluciones.[/SIGNIFICADO]\n\n[FALLA]Motor corre en 7 cilindros, pérdida de aproximadamente 12.5% de potencia, consumo elevado y emisiones altas, puede causar vibración torsional dañina.[/FALLA]\n\n[POSIBLES CAUSAS]Bujía con vida útil agotada, bobina de alta tensión deteriorada, inyector con patrones de spray deficientes, baja compresión por fuga de anillos, timing de distribución incorrecto.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Cambio de bujías por set completo (mismo lote), prueba de bobinas en frío y caliente, ultrasonido para detectar fugas del inyector, prueba de fugas con aire comprimido, verificar marcas de distribución.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0442 - Fuga Pequeña Detectada en Sistema EVAP",
    keywords: ["p0442", "evap", "fuga", "pequena", "vapores", "obd"],
    answer: "[SIGNIFICADO]Sistema de control de emisiones evaporativas detecta fuga menor (típicamente 0.040 pulgadas o 1mm). El PCM no puede mantener vacío en el sistema de vapores de combustible.[/SIGNIFICADO]\n\n[FALLA]Luz Check Engine encendida, posible olor a gasolina, no hay síntomas de conducción, falla en prueba de emisiones.[/FALLA]\n\n[POSIBLES CAUSAS]Tapa de combustible floja o dañada, válvula de purge pegada abierta, líneas EVAP agrietadas o porosas, canister de carbón saturado o roto, sello del tanque deteriorado, sensor de presión del tanque defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar tapa de combustible (3 clics al cerrar), prueba de humo para localizar fuga, inspeccionar líneas de vapor por grietas, probar válvula purge con vacuómetro, verificar sensor de presión (FTPS).[/SOLUCIÓN]"
  },
  {
    title: "OBD P0455 - Fuga Grande en Sistema EVAP",
    keywords: ["p0455", "evap", "fuga", "grande", "vapores", "obd"],
    answer: "[SIGNIFICADO]Fuga mayor detectada en sistema de emisiones evaporativas (0.080\" o mayor). Sistema no puede sellar para prueba de integridad.[/SIGNIFICADO]\n\n[FALLA]Check Engine encendido, olor fuerte a gasolina, posible pérdida de MPG, rechazo en verificación de emisiones.[/FALLA]\n\n[POSIBLES CAUSAS]Tapa de combustible perdida o muy dañada, línea EVAP desconectada o rota, válvula purge rota completamente, canister EVAP agrietado, tanque de combustible con fisura.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Inspección visual completa del sistema, verificar tapa con medidor de presión, máquina de humo profesional, revisar conexiones en tanque y canister, inspeccionar tanque por daño físico.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0456 - Fuga Muy Pequeña Detectada en Sistema EVAP",
    keywords: ["p0456", "evap", "fuga", "micro", "vapores", "obd"],
    answer: "[SIGNIFICADO]Fuga minúscula en sistema EVAP (0.020\" o 0.5mm). La más difícil de diagnosticar por su tamaño imperceptible.[/SIGNIFICADO]\n\n[FALLA]Solo luz Check Engine, sin síntomas operacionales, olor a gasolina apenas perceptible, código intermitente común.[/FALLA]\n\n[POSIBLES CAUSAS]Tapa de combustible con sello desgastado, micro fisuras en líneas de vapor, O-ring de sensor de presión endurecido, conector de línea EVAP con empaque malo, porosidad en canister por edad.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Reemplazar tapa de combustible primero (solución más común), máquina de humo de alta sensibilidad, revisar todos los O-rings y empaques, inspeccionar líneas con lupa por micro fisuras.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0403 - Circuito de Control EGR (Mal Funcionamiento)",
    keywords: ["p0403", "egr", "circuito", "control", "obd"],
    answer: "[SIGNIFICADO]El circuito de la válvula de recirculación de gases de escape presenta voltaje o corriente fuera de rango. PCM detecta que la válvula no responde correctamente a comandos.[/SIGNIFICADO]\n\n[FALLA]Ralentí inestable o irregular, fallos de encendido en aceleración, aumento de NOx (óxidos de nitrógeno), pérdida de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Válvula EGR con carbón acumulado, solenoide EGR con bobina abierta, cableado roto o en corto, conector corroído, PCM con driver dañado, sensor de posición EGR defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Medir resistencia del solenoide (típicamente 10-30Ω), verificar voltaje de alimentación (12V), limpiar pasajes de EGR con limpiador de carbón, inspeccionar pines del conector por corrosión.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0404 - Rango/Rendimiento del Circuito EGR",
    keywords: ["p0404", "egr", "rango", "rendimiento", "flujo", "obd"],
    answer: "[SIGNIFICADO]La válvula EGR no alcanza la posición esperada o tarda demasiado en responder. El sensor de posición indica que el flujo no coincide con el comando del PCM.[/SIGNIFICADO]\n\n[FALLA]Detonación (ping) bajo carga, sobrecalentamiento de NOx en catalizador, ralentí áspero, código intermitente.[/FALLA]\n\n[POSIBLES CAUSAS]Acumulación de carbón limitando movimiento, pasajes EGR parcialmente bloqueados, sensor de posición desajustado, diafragma de vacío roto (EGR neumática), motor paso a paso EGR desgastado.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Desmontar y limpiar válvula EGR completamente, limpiar pasajes con cepillo de alambre, calibrar sensor de posición, probar vacío con bomba manual, verificar operación con scanner en vivo.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0405 - Sensor de Posición EGR 'A' Circuito Bajo",
    keywords: ["p0405", "egr", "sensor", "posicion", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje del sensor de posición de la válvula EGR está por debajo del rango esperado. PCM lee menos de 0.5V cuando debería estar en rango de 0.5-4.5V.[/SIGNIFICADO]\n\n[FALLA]Válvula EGR puede no abrir correctamente, aumento de emisiones NOx, posible detonación en motor, Check Engine encendido.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de posición EGR en corto a tierra, cableado dañado o pelado, conector con humedad o corrosión, sensor defectuoso internamente, tierra del sensor abierta.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Medir voltaje del sensor con llave ON (debe ser ~0.5V), verificar voltaje de referencia 5V del PCM, inspeccionar arnés por daños o roce, desconectar sensor y medir resistencia, verificar continuidad de tierra.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0461 - Rango/Desempeño del Sensor de Nivel de Combustible",
    keywords: ["p0461", "nivel", "combustible", "sensor", "flotador", "obd"],
    answer: "[SIGNIFICADO]Señal del sensor de nivel de combustible no varía correctamente o permanece fija. PCM compara el consumo calculado vs. la lectura del sensor.[/SIGNIFICADO]\n\n[FALLA]Indicador de combustible erróneo, medidor clavado en vacío o lleno, luz de combustible bajo constante o nunca enciende, cálculo incorrecto de autonomía.[/FALLA]\n\n[POSIBLES CAUSAS]Flotador del tanque pegado, resistor variable del sensor desgastado, cableado con resistencia alta, conector del tanque corroído, brazo del flotador doblado, tanque deformado.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar resistencia del sensor en diferentes niveles, inspeccionar tanque por abolladuras, limpiar conectores del módulo de bomba, probar voltaje en cluster vs. sensor, verificar tierra del circuito.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0462 - Circuito del Sensor de Nivel de Combustible Bajo",
    keywords: ["p0462", "nivel", "combustible", "bajo", "corto", "obd"],
    answer: "[SIGNIFICADO]Voltaje del sensor de nivel de combustible está constantemente bajo (cerca de 0V). PCM detecta posible corto a tierra.[/SIGNIFICADO]\n\n[FALLA]Indicador siempre en vacío, luz de combustible bajo siempre encendida, no se puede calcular autonomía, posible activación de modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Cableado en corto a tierra, sensor del tanque internamente en corto, conector con pines cruzados, módulo de la bomba con tierra interna, daño en arnés por roce o corrosión.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Desconectar sensor y verificar si código desaparece, medir resistencia del sensor (debe variar 0-90Ω aprox), inspeccionar arnés completo del tanque a cluster, verificar ausencia de voltaje con sensor desconectado.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0463 - Circuito del Sensor de Nivel de Combustible Alto",
    keywords: ["p0463", "nivel", "combustible", "alto", "abierto", "obd"],
    answer: "[SIGNIFICADO]Voltaje del sensor de nivel excede el rango máximo esperado (>4.9V). Indica posible circuito abierto o corto a voltaje.[/SIGNIFICADO]\n\n[FALLA]Indicador clavado en 'lleno', sistema no detecta nivel bajo, autonomía calculada incorrecta, posible no arranque por 'anti-derrame'.[/FALLA]\n\n[POSIBLES CAUSAS]Circuito abierto en cableado, conector del tanque desconectado, resistor del sensor abierto internamente, flotador caído o desconectado, corto a voltaje en arnés.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar conexión del conector del tanque, medir continuidad del cableado, probar resistencia del sensor (debe cambiar al mover), inspeccionar flotador por daño físico, verificar 5V de referencia del PCM.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0480 - Mal Funcionamiento del Circuito del Ventilador de Enfriamiento 1",
    keywords: ["p0480", "ventilador", "enfriamiento", "radiador", "obd"],
    answer: "[SIGNIFICADO]PCM detecta que el ventilador primario del radiador no opera correctamente. No hay cambio en corriente cuando se activa el relé.[/SIGNIFICADO]\n\n[FALLA]Motor se sobrecalienta en tráfico, ventilador no enciende o no apaga, aire acondicionado no enfría bien, temperatura del motor alta en ralentí.[/FALLA]\n\n[POSIBLES CAUSAS]Motor del ventilador quemado, relé del ventilador pegado o sin contacto, fusible quemado, cableado roto o en corto, resistor del ventilador dañado.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Probar motor directamente con 12V, verificar relé con multímetro y auditivamente, revisar fusibles y fusible links, medir corriente de operación del motor, verificar tierra del circuito.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0500 - Mal Funcionamiento del Sensor de Velocidad del Vehículo",
    keywords: ["p0500", "vss", "velocidad", "sensor", "velocimetro", "obd"],
    answer: "[SIGNIFICADO]Sensor de velocidad del vehículo (VSS) no envía señal o la señal es errática. PCM no puede determinar la velocidad del vehículo correctamente.[/SIGNIFICADO]\n\n[FALLA]Velocímetro errático o no funciona, transmisión no cambia correctamente, control crucero no funciona, ABS/ESP pueden desactivarse, consumo de combustible alto.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor VSS defectuoso, conectores del sensor corroídos o sueltos, cableado roto o en corto, engranaje impulsor del sensor roto, problemas en ABS (sensor de rueda).[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar señal del VSS con scanner (debería variar con velocidad), inspeccionar conector del sensor por corrosión, medir resistencia del sensor (típicamente 190-250Ω), verificar engranaje impulsor en transmisión.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0562 - Voltaje del Sistema Bajo",
    keywords: ["p0562", "voltaje", "bajo", "bateria", "alternador", "obd"],
    answer: "[SIGNIFICADO]PCM detecta que el voltaje del sistema eléctrico está por debajo de 10V por más de 60 segundos con motor en marcha. Indica problema en sistema de carga.[/SIGNIFICADO]\n\n[FALLA]Luces tenues o parpadeantes, dificultad para arrancar, accesorios funcionan débilmente, códigos múltiples pueden aparecer, posible modo limp o apagado.[/FALLA]\n\n[POSIBLES CAUSAS]Alternador defectuoso o con regulador malo, batería descargada o sulfatada, banda del alternador floja o rota, conexiones de batería flojas/corroídas, cableado principal con resistencia alta.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Medir voltaje con motor encendido (debe ser 13.8-14.8V), probar salida del alternador bajo carga, verificar tensión de banda y estado, limpiar terminales de batería, prueba de caída de voltaje en cables principales.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0563 - Voltaje del Sistema Alto",
    keywords: ["p0563", "voltaje", "alto", "sobrecarga", "regulador", "obd"],
    answer: "[SIGNIFICADO]PCM detecta voltaje del sistema por encima de 16V. Regulador de voltaje no está controlando correctamente la salida del alternador.[/SIGNIFICADO]\n\n[FALLA]Bombillas quemándose frecuentemente, batería hirviendo o hinchada, módulos electrónicos pueden dañarse, olor a batería sobrecargada, luces brillan excesivamente.[/FALLA]\n\n[POSIBLES CAUSAS]Regulador de voltaje del alternador defectuoso, PCM enviando señal incorrecta al alternador, cableado del campo del alternador en corto, batería con celda abierta, tierra del alternador deficiente.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Medir voltaje inmediatamente (si >16V apagar motor), desconectar alternador y verificar si voltaje normaliza, probar regulador con carga variable, verificar tierra del alternador (<0.1Ω), inspeccionar batería por daño físico.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0601 - Error de Memoria Interna del PCM",
    keywords: ["p0601", "pcm", "memoria", "rom", "ecu", "obd"],
    answer: "[SIGNIFICADO]Módulo de control del tren motriz detectó error en su memoria ROM o RAM interna. Checksum de memoria no coincide o hay corrupción de datos.[/SIGNIFICADO]\n\n[FALLA]Motor no arranca o arranca y se apaga, funcionamiento errático del motor, códigos múltiples almacenados sin sentido, pérdida de datos de adaptación, posible modo limp severo.[/FALLA]\n\n[POSIBLES CAUSAS]Corrupción de memoria ROM/EEPROM, voltaje bajo o picos de voltaje, PCM dañado por sobrecarga eléctrica, programación incompleta o fallida, chip de memoria defectuoso, daño por agua o corrosión interna.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar voltaje de batería estable (12.4-12.8V apagado), intentar reprogramación del PCM/ECU, verificar tierras del PCM (<0.1Ω), disconnect battery y esperar 30 min, verificar si hay TSBs de software.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0602 - Error de Programación del Módulo de Control",
    keywords: ["p0602", "pcm", "programacion", "flash", "calibracion", "obd"],
    answer: "[SIGNIFICADO]PCM detecta que la programación está incompleta, corrupta o no coincide con el VIN del vehículo. Módulo no puede validar su software.[/SIGNIFICADO]\n\n[FALLA]Motor no arranca, funciona en modo de emergencia, sin comunicación con scanner, pérdida total de funciones, DTC múltiples simultáneos.[/FALLA]\n\n[POSIBLES CAUSAS]Programación flash interrumpida, archivo de calibración incorrecto instalado, pérdida de voltaje durante programación, PCM de vehículo diferente instalado, corrupción de memoria flash.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Reprogramar PCM con J2534/IDS dealer software, verificar VIN coincide con software, usar fuente de alimentación externa durante flash, verificar comunicación CAN/OBD estable, obtener archivo correcto de fabricante.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0603 - Error de Memoria KAM (Keep Alive Memory) del PCM",
    keywords: ["p0603", "pcm", "kam", "memoria", "adaptativa", "obd"],
    answer: "[SIGNIFICADO]La memoria de adaptación del PCM se perdió o está corrupta. Esta memoria almacena ajustes aprendidos del motor como trim de combustible y adaptación de transmisión.[/SIGNIFICADO]\n\n[FALLA]Ralentí alto o inestable inicialmente, cambios de transmisión bruscos, consumo de combustible alterado temporalmente, motor funciona pero no optimizado, código después de desconectar batería.[/FALLA]\n\n[POSIBLES CAUSAS]Batería desconectada o descargada completamente, voltaje bajo prolongado (<9V), memoria volátil del PCM defectuosa, batería interna del PCM agotada, corrupción por interferencia eléctrica.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar voltaje de batería adecuado, realizar procedimiento de reaprendizaje (drive cycle), dejar vehículo en ON 10 minutos sin arrancar, borrar código y conducir 20-30 millas, verificar si hay procedimiento de inicialización específico.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0705 - Mal Funcionamiento del Circuito del Sensor de Posición de la Transmisión (PRNDL)",
    keywords: ["p0705", "prndl", "selector", "transmision", "neutral", "obd"],
    answer: "[SIGNIFICADO]El módulo no puede determinar en qué posición está la palanca de cambios (Park, Reverse, Neutral, Drive, Low). Señal del sensor de rango de transmisión (TR) es inválida.[/SIGNIFICADO]\n\n[FALLA]Vehículo no arranca en Park/Neutral, luces de posición de cambios incorrectas o todas encendidas, transmisión no cambia correctamente, control crucero no funciona, reversa no activa luces traseras.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor TR/PRNDL desajustado o defectuoso, linkaje de cambios mal ajustado, cableado del sensor roto o en corto, conector del sensor corroído, válvula manual de la transmisión trabada.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar ajuste del linkaje de cambios, inspeccionar y limpiar conector del sensor TR, medir resistencias del sensor en cada posición, ajustar sensor según procedimiento del fabricante, verificar operación interna de válvula manual.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0715 - Circuito del Sensor de Velocidad de Entrada de Transmisión",
    keywords: ["p0715", "iss", "input", "transmision", "turbine", "obd"],
    answer: "[SIGNIFICADO]Sensor de velocidad del eje de entrada (input shaft speed sensor) no envía señal o es errática. TCM no puede monitorear RPM del turbine/input.[/SIGNIFICADO]\n\n[FALLA]Cambios bruscos o demora en cambios, transmisión en modo limp (solo 2da o 3ra), clutch del convertidor no lockea, velocímetro puede ser errático, no hay kickdown.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de velocidad de entrada defectuoso, reluctor/tone ring dañado o sucio, cableado roto o conector suelto, contaminación metálica en sensor magnético, internal transmission failure (input shaft).[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar señal del sensor con osciloscopio, medir resistencia del sensor (típicamente 200-1000Ω), inspeccionar conector por aceite o corrosión, verificar gap del sensor (típicamente 0.5-1.5mm), remover sensor e inspeccionar por virutas metálicas.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0720 - Circuito del Sensor de Velocidad de Salida de Transmisión",
    keywords: ["p0720", "oss", "output", "transmision", "velocidad", "obd"],
    answer: "[SIGNIFICADO]Output shaft speed sensor (OSS) no proporciona señal válida. TCM no puede determinar velocidad real del vehículo desde la transmisión.[/SIGNIFICADO]\n\n[FALLA]Velocímetro no funciona o errático, cambios incorrectos de transmisión, TCC (torque converter clutch) no lockea, ABS/ESP pueden tener problemas, modo limp activado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor OSS defectuoso, reluctor ring del sensor roto, cableado dañado o cortado, conector expuesto a fluido de transmisión, sensor magnético contaminado con viruta, problema interno de transmisión.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar señal con scanner en vivo durante manejo, medir resistencia del sensor (compara con especificación), inspeccionar conector y pines por ATF, verificar operación de sensor con drill (fuera del vehículo), limpiar sensor de virutas metálicas.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0731 - Relación de Engranaje 1 Incorrecta",
    keywords: ["p0731", "gear", "primera", "transmision", "slippage", "obd"],
    answer: "[SIGNIFICADO]TCM detecta que la relación real entre velocidad de entrada y salida no coincide con la esperada para primera velocidad. Slippage o problema mecánico.[/SIGNIFICADO]\n\n[FALLA]Primera velocidad patina, aceleración pobre desde parado, RPM suben pero vehículo acelera lento, posible modo limp, transmisión caliente.[/FALLA]\n\n[POSIBLES CAUSAS]Clutch o banda de 1ra velocidad desgastada, presión hidráulica baja en transmisión, solenoide de cambio pegado o defectuoso, líquido de transmisión bajo o quemado, filtro de transmisión obstruido.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar nivel y condición del ATF, probar presión de línea (debe estar en spec), diagnosticar solenoides con scanner bidireccional, verificar lecturas de ISS y OSS durante slippage, revisar códigos relacionados de presión.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0732 - Relación de Engranaje 2 Incorrecta",
    keywords: ["p0732", "gear", "segunda", "transmision", "slippage", "obd"],
    answer: "[SIGNIFICADO]Relación de segunda velocidad no es correcta. TCM detecta slippage entre entrada y salida en 2da gear.[/SIGNIFICADO]\n\n[FALLA]Segunda velocidad patina o flare, RPM suben durante cambio 1-2, transmisión tarda en engranar 2da, sobrecalentamiento del ATF, aceleración reducida.[/FALLA]\n\n[POSIBLES CAUSAS]Clutch pack de 2da velocidad quemado, solenoide de shift B defectuoso, válvula del cuerpo de válvulas pegada, ATF contaminado o nivel bajo, suncar y planet gears desgastados.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar presión de solenoide de 2da velocidad, revisar ATF por olor a quemado y partículas, probar operación de solenoides con scanner, verificar sensors ISS/OSS durante upshift, diagnóstico con manómetros de presión.[/SOLUCIÓN]"
  },
  {
    title: "OBD P0735 - Relación de Engranaje 5 Incorrecta",
    keywords: ["p0735", "gear", "quinta", "overdrive", "transmision", "obd"],
    answer: "[SIGNIFICADO]TCM detecta slippage o relación incorrecta en quinta velocidad (overdrive). Común en transmisiones de 5+ velocidades.[/SIGNIFICADO]\n\n[FALLA]Quinta velocidad no entra o patina, RPM altas en carretera, no hay overdrive, consumo de combustible alto, transmisión no lockea convertidor.[/FALLA]\n\n[POSIBLES CAUSAS]Clutch de overdrive desgastado, solenoide de OD defectuoso, problema en planetarios de OD, presión hidráulica insuficiente, TCM con estrategia incorrecta, sensor OSS dando lectura falsa.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar operación de solenoide OD con scanner, medir presión de OD clutch, revisar ATF por nivel y condición, verificar ratio calculations de TCM, probar lockup del convertidor, overhaul de unidad OD si es mecánico.[/SOLUCIÓN]"
  },
  {
    title: "OBD U0121 - Pérdida de Comunicación con el Módulo de Control de Frenos ABS",
    keywords: ["u0121", "abs", "comunicacion", "can", "red", "obd"],
    answer: "[SIGNIFICADO]PCM no puede comunicarse con el módulo ABS/ESP a través del bus CAN. Pérdida total de datos de velocidad de ruedas y control de frenos.[/SIGNIFICADO]\n\n[FALLA]Luz ABS encendida, ESP/Traction control desactivado, posible pérdida de función de velocímetro, control crucero puede no funcionar, sistema de estabilidad inoperante.[/FALLA]\n\n[POSIBLES CAUSAS]Módulo ABS sin alimentación, cables CAN High/Low abiertos o en corto, conector del módulo ABS suelto, módulo ABS defectuoso internamente, interferencia en red CAN, resistencias de terminación incorrectas.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar alimentación y tierras del módulo ABS, medir resistencia entre CAN H y CAN L (120Ω típicamente), inspeccionar conectores del ABS, scanner con capacidad de visualizar bus CAN, osciloscopio para ver señales CAN (2.5V idle).[/SOLUCIÓN]"
  },
  {
    title: "OBD U0155 - Pérdida de Comunicación con Módulo de Control de Instrumentos (IPC)",
    keywords: ["u0155", "cluster", "instrumentos", "comunicacion", "can", "obd"],
    answer: "[SIGNIFICADO]ECM/PCM perdió comunicación con el cluster de instrumentos a través de red CAN o LIN. Datos del motor no llegan al tablero.[/SIGNIFICADO]\n\n[FALLA]Gauges del tablero no funcionan, odómetro en blanco, luces de advertencia erráticas, tacómetro y velocímetro muertos, posible no arranque por antirrobo.[/FALLA]\n\n[POSIBLES CAUSAS]Cluster sin alimentación o tierra mala, red de comunicación interrumpida, conector del cluster flojo, módulo de instrumentos fallado, gateway o BCM sin comunicar, software del cluster corrupto.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar fusibles del cluster de instrumentos, probar comunicación con scanner en cluster, revisar voltaje de alimentación (12V) y tierra, inspeccionar conector trasero del cluster, verificar red CAN/LIN hasta el cluster, reprogramar o reemplazar cluster.[/SOLUCIÓN]"
  },
  {
    title: "OBD B0082 - Mal Funcionamiento del Sensor de Ocupación del Asiento del Pasajero",
    keywords: ["b0082", "airbag", "sensor", "asiento", "ocupacion", "obd"],
    answer: "[SIGNIFICADO]Sensor de peso/ocupación del asiento delantero derecho no proporciona señal válida al módulo de airbags. Sistema no puede determinar si debe desplegar airbag.[/SIGNIFICADO]\n\n[FALLA]Luz de airbag del pasajero siempre OFF o siempre ON, SRS light encendida, airbag puede no desplegar en accidente, peso no detectado correctamente, sistema de airbag desactivado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor de presión bajo cojín dañado, cableado del sensor cortado o en corto, conector bajo asiento suelto o corroído, mat del asiento con sensor deteriorado, líquido derramado en sensor de peso.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]NO trabajar en sistema SRS sin desconectar batería, verificar conector bajo asiento (amarillo), medir resistencia del sensor (varía con peso), revisar por daño de líquidos o corrosión, verificar calibración con pesas conocidas.[/SOLUCIÓN]"
  },
  {
    title: "OBD C0040 - Mal Funcionamiento de la Válvula Solenoide del Freno Delantero Derecho",
    keywords: ["c0040", "abs", "solenoide", "valvula", "freno", "obd"],
    answer: "[SIGNIFICADO]Módulo ABS detectó problema en válvula solenoide que controla presión de freno en rueda delantera derecha. Sistema ABS no puede modular correctamente.[/SIGNIFICADO]\n\n[FALLA]ABS no funciona en RF wheel, posible jalón al frenar fuerte, luz ABS encendida, ESP/ESC puede desactivarse, bloqueo de rueda en frenadas de emergencia.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide del ABS con bobina abierta o en corto, válvula mecánicamente trabada, conector del HCU corroído, cableado roto al solenoide, módulo ABS con driver dañado, contaminación en fluido de frenos.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Medir resistencia del solenoide (típicamente 2-6Ω), verificar voltaje de comando del módulo ABS, escuchar operación del solenoide al activar ABS, purgar completamente sistema de frenos, inspeccionar conector del HCU (Hydraulic Control Unit).[/SOLUCIÓN]"
  },
  {
    title: "OBD C1201 - Motor del Sistema de Control de Suspensión Desconectado",
    keywords: ["c1201", "suspension", "neumatica", "compresor", "actuador", "obd"],
    answer: "[SIGNIFICADO]Módulo de suspensión activa/neumática detectó que un compresor o actuador de suspensión está desconectado o no responde.[/SIGNIFICADO]\n\n[FALLA]Suspensión no se ajusta en altura, vehículo cae a una esquina, advertencia de suspensión en tablero, modo manual permanente, ride quality pobre.[/FALLA]\n\n[POSIBLES CAUSAS]Compresor de aire sin alimentación, conector del actuador desconectado, motor del compresor quemado, fuga de aire en sistema neumático, sensor de altura defectuoso, relé del compresor pegado.[/POSIBLES CAUSAS]\n\n[SOLUCIÓN]Verificar fusibles y relés del sistema de suspensión, inspeccionar conexiones de compressor y actuators, probar operación del compresor directamente, verificar fugas con agua jabonosa, medir altura de suspensión en cada esquina.[/SOLUCIÓN]"
  }
];

async function seedKnowledgeBase() {
  console.log("Iniciando carga de Knowledge Base - OBD Pack 2...");
  console.log(`Total de artículos a insertar: ${newArticles.length}\n`);

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
      console.error(`❌ Excepción insertando \"${article.title}\":`, err.message);
    }
  }

  console.log("\n✅ Proceso completado - Pack 2");
  console.log("Total procesado:", newArticles.length, "artículos");
}

seedKnowledgeBase();
