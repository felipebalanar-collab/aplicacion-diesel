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
    title: "OBD P0110 - Sensor IAT Circuito",
    keywords: ["p0110", "iat", "temperatura", "admission", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del sensor de temperatura del aire de admision (IAT). El PCM no recibe senal valida.[/SIGNIFICADO]\n\n[FALLA]Arranque irregular en frio, consumo elevado, mezcla rica o pobre, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor IAT defectuoso, conector sulfatado, cableado roto, corto a tierra o a voltaje.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar continuidad, medir resistencia del IAT, revisar conector, reemplazar sensor si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0106 - Sensor MAP Rango/Desempeno",
    keywords: ["p0106", "map", "presion", "rango", "obd"],
    answer: "[SIGNIFICADO]El sensor MAP reporta valores fuera de rango respecto a la carga del motor.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, tironeo, humo negro en diesel, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor MAP sucio o defectuoso, manguera de vacio rota, turbo con fugas, cableado con resistencia alta.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar MAP, revisar mangueras, medir voltaje de senal, reemplazar MAP si la lectura es erratica.[/SOLUCION]"
  },
  {
    title: "OBD P0155 - Calentador O2 Banco 2 Sensor 1",
    keywords: ["p0155", "o2", "b2s1", "calentador", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del calentador del sensor O2 del banco 2 sensor 1.[/SIGNIFICADO]\n\n[FALLA]Consumo elevado, emisiones altas, MIL encendida, lazo cerrado tardio.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, fusible quemado, cableado dañado, conector sulfatado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del calentador, revisar fusible y alimentacion, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0161 - Calentador O2 Banco 2 Sensor 2",
    keywords: ["p0161", "o2", "b2s2", "calentador", "obd"],
    answer: "[SIGNIFICADO]Falla en el calentador del sensor O2 post-catalizador banco 2.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas, diagnostico de catalizador retrasado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, cableado abierto, fusible quemado, conector con humedad.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia, revisar cableado, reemplazar sensor si la resistencia es infinita.[/SOLUCION]"
  },
  {
    title: "OBD P0171 - Mezcla Pobre Banco 1",
    keywords: ["p0171", "mezcla", "pobre", "bank1", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta mezcla pobre en el banco 1. Los trims de combustible estan altos.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, tironeo, falta de potencia, detonaciones.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga de vacio, MAF sucio, presion de combustible baja, inyectores obstruidos, sensor O2 sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Buscar fugas, limpiar MAF, medir presion, probar inyectores, revisar O2 y trims.[/SOLUCION]"
  },
  {
    title: "OBD P0172 - Mezcla Rica Banco 1",
    keywords: ["p0172", "mezcla", "rica", "bank1", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta mezcla rica en el banco 1. Los trims de combustible estan negativos.[/SIGNIFICADO]\n\n[FALLA]Humo negro, consumo alto, olor a gasolina, ralenti irregular.[/FALLA]\n\n[POSIBLES CAUSAS]Inyectores goteando, presion de combustible alta, MAF sesgado, sensor O2 defectuoso, regulador fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion, revisar inyectores, limpiar MAF, revisar O2, verificar regulador.[/SOLUCION]"
  },
  {
    title: "OBD P0175 - Mezcla Rica Banco 2",
    keywords: ["p0175", "mezcla", "rica", "bank2", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta mezcla rica en el banco 2. Los trims estan negativos.[/SIGNIFICADO]\n\n[FALLA]Humo negro, consumo elevado, tironeo, olor a combustible.[/FALLA]\n\n[POSIBLES CAUSAS]Inyectores con fuga, presion alta, sensor O2 sesgado, MAF contaminado, regulador defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion, revisar inyectores, limpiar MAF, revisar O2, verificar regulador.[/SOLUCION]"
  },
  {
    title: "OBD P0201 - Circuito del Inyector Cilindro 1",
    keywords: ["p0201", "inyector", "cilindro1", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del inyector del cilindro 1. Puede ser abierto o en corto.[/SIGNIFICADO]\n\n[FALLA]Misfire, perdida de potencia, ralenti irregular, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector abierto, conector suelto, cableado roto, driver PCM dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del inyector, revisar conector, probar pulso con noid light, reemplazar inyector si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0202 - Circuito del Inyector Cilindro 2",
    keywords: ["p0202", "inyector", "cilindro2", "circuito", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta problema en el circuito del inyector del cilindro 2.[/SIGNIFICADO]\n\n[FALLA]Tironeo, falta de potencia, humo, ralenti inestable.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector defectuoso, cableado en corto, conector flojo, driver PCM fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar resistencia del inyector, revisar arnes, verificar pulso, reemplazar inyector si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0217 - Sobretemperatura del Motor",
    keywords: ["p0217", "temperatura", "sobrecalentamiento", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta sobretemperatura del motor. Indica riesgo de dano severo.[/SIGNIFICADO]\n\n[FALLA]Luz de temperatura, perdida de potencia, modo limp, posible apagado de proteccion.[/FALLA]\n\n[POSIBLES CAUSAS]Falta de refrigerante, termostato pegado, ventilador inoperante, bomba de agua defectuosa, radiador obstruido.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar nivel de refrigerante, verificar ventiladores, inspeccionar termostato, revisar bomba de agua, purgar sistema.[/SOLUCION]"
  },
  {
    title: "OBD P0234 - Sobrepresion de Turbo",
    keywords: ["p0234", "turbo", "sobrepresion", "boost", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta presion de sobrealimentacion excesiva. Puede causar modo limp.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia en modo limp, tironeo, humo negro, respuesta irregular.[/FALLA]\n\n[POSIBLES CAUSAS]Wastegate trabada cerrada, actuador defectuoso, solenoide de boost fallando, sensor MAP sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar actuador y wastegate, medir presion con manometro, probar solenoide, verificar MAP.[/SOLUCION]"
  },
  {
    title: "OBD P0240 - Sensor MAP/Boost Banco 1",
    keywords: ["p0240", "boost", "map", "sensor", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta falla en el sensor de presion de sobrealimentacion del banco 1 o su circuito.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, modo limp, humo negro, turbo no regula.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor MAP defectuoso, cableado en corto, conector suelto, manguera de presion rota.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar mangueras, medir voltaje del sensor, limpiar MAP, reemplazar sensor si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0309 - Fallo de Encendido en Cilindro 9",
    keywords: ["p0309", "cilindro9", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de encendido detectado en el cilindro 9 (motores V10 o mayores).[/SIGNIFICADO]\n\n[FALLA]Vibracion, perdida de potencia, consumo elevado, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia desgastada, bobina defectuosa, inyector con fallo, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar bujia y bobina, probar inyector, medir compresion, revisar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0310 - Fallo de Encendido en Cilindro 10",
    keywords: ["p0310", "cilindro10", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de encendido en cilindro 10. Aplica a motores V10/V12.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, vibracion, perdida de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia o bobina defectuosa, inyector con fuga, compresion baja, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar sistema de encendido, probar inyector, medir compresion, reparar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0327 - Sensor Knock 1 Circuito Bajo",
    keywords: ["p0327", "knock", "sensor", "bajo", "obd"],
    answer: "[SIGNIFICADO]Senal baja del sensor de detonacion 1. El PCM no recibe señal adecuada.[/SIGNIFICADO]\n\n[FALLA]Detonacion, falta de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor knock defectuoso, cableado en corto, torque incorrecto, ruido mecanico bajo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia del sensor, instalar con torque correcto, reemplazar si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0336 - Sensor CKP Rango",
    keywords: ["p0336", "ckp", "rango", "cigue", "obd"],
    answer: "[SIGNIFICADO]La senal del sensor CKP esta fuera de rango o es erratica.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, apagones, tacometro erratico, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor CKP defectuoso, reluctor dañado, interferencia electrica, cableado con falso contacto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar reluctor, medir senal con osciloscopio, revisar cableado, reemplazar sensor si la senal es inestable.[/SOLUCION]"
  },
  {
    title: "OBD P0342 - Sensor CMP Circuito Bajo",
    keywords: ["p0342", "cmp", "bajo", "arbol", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta voltaje bajo del sensor CMP. Puede indicar corto a tierra o sensor defectuoso.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, falta de potencia, tironeo, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor CMP en corto, cableado pellizcado, conector suelto, referencia 5V afectada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje de referencia, revisar cableado, reemplazar CMP si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0343 - Sensor CMP Circuito Alto",
    keywords: ["p0343", "cmp", "alto", "arbol", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el circuito del sensor CMP. Puede indicar circuito abierto.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, tironeo, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor CMP desconectado, circuito abierto, conector sulfatado, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir continuidad, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0351 - Bobina de Encendido A Circuito",
    keywords: ["p0351", "bobina", "encendido", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito primario/secundario de la bobina de encendido A.[/SIGNIFICADO]\n\n[FALLA]Misfire, tironeo, falta de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bobina defectuosa, cableado abierto, bujia dañada, driver PCM fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar bobina, revisar cableado, cambiar bujia, reemplazar bobina si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0352 - Bobina de Encendido B Circuito",
    keywords: ["p0352", "bobina", "encendido", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito primario/secundario de la bobina de encendido B.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, consumo alto, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bobina defectuosa, conector flojo, cableado en corto, bujia en mal estado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar bobina, revisar arnes, reemplazar bobina, revisar bujia correspondiente.[/SOLUCION]"
  },
  {
    title: "OBD P0353 - Bobina de Encendido C Circuito",
    keywords: ["p0353", "bobina", "encendido", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito de la bobina de encendido C.[/SIGNIFICADO]\n\n[FALLA]Misfire, tironeo, MIL encendida, perdida de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Bobina defectuosa, cableado dañado, conector flojo, PCM con driver fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar resistencia de bobina, inspeccionar conector, reemplazar bobina si esta abierta.[/SOLUCION]"
  },
  {
    title: "OBD P0354 - Bobina de Encendido D Circuito",
    keywords: ["p0354", "bobina", "encendido", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito de la bobina de encendido D.[/SIGNIFICADO]\n\n[FALLA]Misfire, consumo alto, MIL encendida, vibracion.[/FALLA]\n\n[POSIBLES CAUSAS]Bobina defectuosa, cableado abierto, bujia dañada, driver PCM.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar bobina, revisar cableado, cambiar bujia, reemplazar bobina si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD P0400 - Flujo EGR General",
    keywords: ["p0400", "egr", "flujo", "obd"],
    answer: "[SIGNIFICADO]Falla general en el sistema EGR. El PCM detecta que el flujo no es el esperado.[/SIGNIFICADO]\n\n[FALLA]Detonacion, NOx alto, ralenti irregular, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula EGR sucia, pasajes obstruidos, solenoide defectuoso, vacio insuficiente, sensor EGR fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar EGR y pasajes, revisar vacio, probar solenoide, reemplazar EGR si no responde.[/SOLUCION]"
  },
  {
    title: "OBD P0410 - Sistema de Aire Secundario",
    keywords: ["p0410", "aire", "secundario", "smog", "obd"],
    answer: "[SIGNIFICADO]Falla en el sistema de inyeccion de aire secundario. El PCM no detecta el aumento de O2 esperado.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas, posible ruido de bomba.[/FALLA]\n\n[POSIBLES CAUSAS]Bomba de aire dañada, valvula check atascada, mangueras rotas, rele o fusible quemado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar bomba, revisar fusibles y rele, inspeccionar mangueras, reemplazar valvula check si esta trabada.[/SOLUCION]"
  },
  {
    title: "OBD P0422 - Eficiencia del Catalizador Banco 1",
    keywords: ["p0422", "catalizador", "banco1", "eficiencia", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta baja eficiencia del catalizador en el banco 1.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones altas, posible olor a azufre.[/FALLA]\n\n[POSIBLES CAUSAS]Catalizador agotado, sensor O2 posterior defectuoso, fugas de escape, mezcla rica prolongada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar O2 delantero y trasero, revisar fugas, corregir mezcla, reemplazar catalizador si esta degradado.[/SOLUCION]"
  },
  {
    title: "OBD P0430 - Eficiencia del Catalizador Banco 2",
    keywords: ["p0430", "catalizador", "banco2", "eficiencia", "obd"],
    answer: "[SIGNIFICADO]Baja eficiencia del catalizador en el banco 2.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas, posible olor a azufre.[/FALLA]\n\n[POSIBLES CAUSAS]Catalizador degradado, sensor O2 post defectuoso, fugas de escape, mezcla rica prolongada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar O2, inspeccionar fugas, corregir mezcla, reemplazar catalizador si esta agotado.[/SOLUCION]"
  },
  {
    title: "OBD P0507 - RalentI Alto",
    keywords: ["p0507", "ralenti", "alto", "iac", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el ralenti esta por encima del valor objetivo.[/SIGNIFICADO]\n\n[FALLA]RPM altas en neutro, consumo elevado, cambios bruscos en transmision.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga de vacio, cuerpo de aceleracion sucio, IAC trabado, ajuste incorrecto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Buscar fugas, limpiar cuerpo de aceleracion e IAC, recalibrar ralenti, revisar cables de acelerador.[/SOLUCION]"
  },
  {
    title: "OBD P0604 - Error de Memoria RAM PCM",
    keywords: ["p0604", "pcm", "memoria", "ram", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta error en la memoria RAM interna.[/SIGNIFICADO]\n\n[FALLA]Apagones, modo limp, codigos multiples, comportamiento erratico.[/FALLA]\n\n[POSIBLES CAUSAS]PCM dañado, voltaje inestable, sobrecalentamiento, humedad interna.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar voltaje y tierras, revisar conectores, reprogramar si aplica, reemplazar PCM si persiste.[/SOLUCION]"
  },
  {
    title: "OBD P0615 - Circuito del Rele de Arranque",
    keywords: ["p0615", "rele", "arranque", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del rele de arranque. El PCM detecta voltajes incorrectos.[/SIGNIFICADO]\n\n[FALLA]No arranca, arranque intermitente, click del rele.[/FALLA]\n\n[POSIBLES CAUSAS]Rele defectuoso, cableado abierto, switch de encendido defectuoso, PCM con salida dañada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar rele, revisar voltajes en terminales, inspeccionar cableado, reemplazar rele o reparar circuito.[/SOLUCION]"
  },
  {
    title: "OBD P0703 - Interruptor de Freno A",
    keywords: ["p0703", "freno", "switch", "transmision", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del interruptor de freno A. Afecta control crucero y cambios.[/SIGNIFICADO]\n\n[FALLA]Cruceo no funciona, cambios bruscos, luces de freno erraticas.[/FALLA]\n\n[POSIBLES CAUSAS]Switch defectuoso, ajuste incorrecto, cableado dañado, conector flojo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar ajuste, medir continuidad, reemplazar switch si esta abierto, inspeccionar arnes.[/SOLUCION]"
  },
  {
    title: "OBD U0100 - Perdida de Comunicacion con ECM/PCM",
    keywords: ["u0100", "pcm", "ecm", "comunicacion", "obd"],
    answer: "[SIGNIFICADO]Los modulos pierden comunicacion con el ECM/PCM en la red CAN.[/SIGNIFICADO]\n\n[FALLA]No arranque, MIL encendida, perdida de datos, multiples codigos U.[/FALLA]\n\n[POSIBLES CAUSAS]PCM sin alimentacion, corto en CAN, conector suelto, modulo defectuoso, baja tension.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar alimentacion y tierras del PCM, medir resistencia CAN, inspeccionar conectores, aislar modulo que bloquea la red.[/SOLUCION]"
  },
  {
    title: "OBD U0129 - Perdida de Comunicacion con Modulo de Frenos",
    keywords: ["u0129", "frenos", "abs", "comunicacion", "obd"],
    answer: "[SIGNIFICADO]El PCM pierde comunicacion con el modulo de frenos/ABS en la red CAN.[/SIGNIFICADO]\n\n[FALLA]ABS y ESP desactivados, MIL encendida, sin datos de frenos.[/FALLA]\n\n[POSIBLES CAUSAS]Modulo ABS sin alimentacion, cables CAN abiertos, conector flojo, modulo ABS defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar fusibles y tierras del ABS, medir CAN, revisar conectores, reemplazar modulo si no comunica.[/SOLUCION]"
  },
  {
    title: "OBD B0101 - Circuito del Airbag Pasajero",
    keywords: ["b0101", "airbag", "pasajero", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del airbag del pasajero. El SRS detecta resistencia fuera de rango.[/SIGNIFICADO]\n\n[FALLA]Luz SRS encendida, airbag pasajero deshabilitado.[/FALLA]\n\n[POSIBLES CAUSAS]Conector suelto, cableado dañado, airbag defectuoso, modulo SRS con falla.[/POSIBLES CAUSAS]\n\n[SOLUCION]Desconectar bateria, revisar conectores amarillos, medir resistencia, reparar cableado o reemplazar airbag.[/SOLUCION]"
  },
  {
    title: "OBD C0031 - Sensor de Velocidad de Rueda Delantera Derecha",
    keywords: ["c0031", "abs", "sensor", "rueda", "delantera", "obd"],
    answer: "[SIGNIFICADO]El modulo ABS detecta falla en el sensor de velocidad de la rueda delantera derecha.[/SIGNIFICADO]\n\n[FALLA]Luz ABS encendida, ESP desactivado, frenado con ABS inactivo.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor dañado, cable cortado, anillo reluctor roto, suciedad metalica.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar sensor y anillo, limpiar, medir resistencia, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD C0045 - Sensor de Velocidad de Rueda Trasera Izquierda",
    keywords: ["c0045", "abs", "sensor", "rueda", "trasera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor ABS de la rueda trasera izquierda.[/SIGNIFICADO]\n\n[FALLA]Luz ABS encendida, ESP inoperante, lectura de velocidad erratica.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor sucio o dañado, cableado roto, anillo reluctor con dientes dañados.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar sensor, revisar cableado, medir resistencia, reemplazar sensor si no hay señal.[/SOLUCION]"
  },
  {
    title: "OBD C0265 - Falla del Rele de la Bomba ABS",
    keywords: ["c0265", "abs", "rele", "bomba", "obd"],
    answer: "[SIGNIFICADO]El modulo ABS detecta fallo en el rele de la bomba hidraulica.[/SIGNIFICADO]\n\n[FALLA]ABS inoperante, luz ABS encendida, control de estabilidad desactivado.[/FALLA]\n\n[POSIBLES CAUSAS]Rele defectuoso, cableado abierto, fusible quemado, modulo ABS con salida dañada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fusibles, probar rele, medir voltaje en bomba, reparar cableado o reemplazar rele.[/SOLUCION]"
  }
];

async function seedKnowledgeBase() {
  console.log("Iniciando carga de Knowledge Base - OBD Pack 5...");
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

  console.log("\n✅ Proceso completado - Pack 5");
  console.log("Total procesado:", newArticles.length, "articulos");
}

seedKnowledgeBase();
