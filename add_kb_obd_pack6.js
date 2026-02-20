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
    title: "OBD P0001 - Regulador de Combustible Circuito",
    keywords: ["p0001", "regulador", "combustible", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del regulador de combustible (Fuel Volume Regulator). El PCM detecta circuito abierto o corto.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, falta de potencia, tironeo, modo limp, humo negro en diesel.[/FALLA]\n\n[POSIBLES CAUSAS]Regulador defectuoso, cableado roto, conector suelto, baja presion real, driver PCM fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia del regulador, verificar presion real, reemplazar regulador si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0010 - Solenoide VVT Banco 1",
    keywords: ["p0010", "vvt", "solenoide", "banco1", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del solenoide de control VVT del banco 1.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, falta de potencia, consumo alto, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide VVT defectuoso, aceite sucio, cableado abierto, conector sulfatado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar nivel y calidad de aceite, limpiar o reemplazar solenoide, revisar cableado y conector.[/SOLUCION]"
  },
  {
    title: "OBD P0011 - Tiempo de Arbol de Levas Adelantado",
    keywords: ["p0011", "vvt", "arbol", "timing", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el arbol de levas esta adelantado mas de lo esperado (banco 1).[/SIGNIFICADO]\n\n[FALLA]RalentI inestable, falta de potencia, consumo elevado, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide VVT trabado, aceite sucio, cadena estirada, sensor CMP defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Cambiar aceite y filtro, limpiar solenoide, verificar tension de cadena, revisar CMP.[/SOLUCION]"
  },
  {
    title: "OBD P0012 - Tiempo de Arbol de Levas Atrasado",
    keywords: ["p0012", "vvt", "arbol", "timing", "obd"],
    answer: "[SIGNIFICADO]El arbol de levas esta atrasado respecto al objetivo (banco 1).[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, respuesta lenta, ralenti irregular, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide VVT con baja respuesta, aceite sucio, filtro de aceite tapado, cadena estirada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Cambiar aceite, limpiar solenoide VVT, revisar presion de aceite, verificar sincronizacion.[/SOLUCION]"
  },
  {
    title: "OBD P0053 - Calentador O2 B1S1 Resistencia",
    keywords: ["p0053", "o2", "calentador", "resistencia", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta resistencia fuera de rango en el calentador del sensor O2 banco 1 sensor 1.[/SIGNIFICADO]\n\n[FALLA]Lazo cerrado tardio, consumo alto, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Calentador abierto, sensor defectuoso, cableado dañado, fusible quemado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del calentador, revisar fusible, reemplazar sensor si esta fuera de rango.[/SOLUCION]"
  },
  {
    title: "OBD P0057 - Calentador O2 B2S2 Resistencia",
    keywords: ["p0057", "o2", "calentador", "b2s2", "obd"],
    answer: "[SIGNIFICADO]Resistencia fuera de rango en el calentador del sensor O2 banco 2 sensor 2.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas, diagnostico de catalizador retrasado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, cableado abierto, fusible quemado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia, revisar cableado, reemplazar sensor si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD P0087 - Presion de Combustible/Rail Baja",
    keywords: ["p0087", "presion", "rail", "combustible", "obd"],
    answer: "[SIGNIFICADO]La presion de combustible en el rail es mas baja que el valor objetivo. Comun en diesel common rail.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, apagones, arranque dificil, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Filtro de combustible tapado, bomba de alta desgastada, regulador defectuoso, fuga en inyectores, sensor de presion sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar filtro, medir presion real, probar retorno de inyectores, verificar bomba y regulador.[/SOLUCION]"
  },
  {
    title: "OBD P0088 - Presion de Combustible/Rail Alta",
    keywords: ["p0088", "presion", "rail", "alta", "obd"],
    answer: "[SIGNIFICADO]La presion del rail es mas alta que el objetivo. Indica regulacion deficiente.[/SIGNIFICADO]\n\n[FALLA]Tironeo, humo negro, consumo elevado, posible daño de inyectores.[/FALLA]\n\n[POSIBLES CAUSAS]Regulador trabado, sensor de presion defectuoso, retorno de inyectores bloqueado, PCM con control incorrecto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar regulador, medir presion con manometro, revisar retorno, comprobar sensor de presion.[/SOLUCION]"
  },
  {
    title: "OBD P0093 - Fuga Grande en Sistema de Combustible",
    keywords: ["p0093", "fuga", "combustible", "diesel", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta una fuga grande en el sistema de combustible. Comun en diesel por retorno excesivo.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, apagones, falta de potencia, posible olor a diesel.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga en lineas, inyectores con retorno excesivo, filtro mal sellado, bomba de alta defectuosa.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar fugas externas, prueba de retorno de inyectores, revisar sellos del filtro, verificar presion.[/SOLUCION]"
  },
  {
    title: "OBD P0107 - Sensor MAP Circuito Bajo",
    keywords: ["p0107", "map", "bajo", "presion", "obd"],
    answer: "[SIGNIFICADO]El voltaje del sensor MAP esta bajo. El PCM interpreta presion de admision muy baja.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, tironeo, humo negro en diesel, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor MAP en corto, cableado a tierra, manguera desconectada, sensor defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir voltaje, limpiar MAP, reemplazar sensor si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0108 - Sensor MAP Circuito Alto",
    keywords: ["p0108", "map", "alto", "presion", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el sensor MAP. Puede indicar circuito abierto o presion anormal.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, consumo elevado, modo limp, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Circuito abierto, sensor desconectado, cableado roto, sobrepresion real.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad, verificar manguera, medir voltaje, reemplazar MAP si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0130 - Sensor O2 Circuito B1S1",
    keywords: ["p0130", "o2", "b1s1", "sensor", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del sensor O2 banco 1 sensor 1. La senal no es valida.[/SIGNIFICADO]\n\n[FALLA]Consumo elevado, emisiones altas, ralenti irregular, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, cableado abierto, conector suelto, fuga de escape.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir senal, inspeccionar fugas, reemplazar sensor si la senal es fija.[/SOLUCION]"
  },
  {
    title: "OBD P0133 - Sensor O2 Respuesta Lenta",
    keywords: ["p0133", "o2", "respuesta", "lenta", "obd"],
    answer: "[SIGNIFICADO]El sensor O2 B1S1 responde lentamente a cambios de mezcla.[/SIGNIFICADO]\n\n[FALLA]Consumo elevado, emisiones altas, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 envejecido, contaminacion por aceite, fuga de escape, mezcla rica prolongada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fugas, verificar trims, reemplazar sensor si esta lento.[/SOLUCION]"
  },
  {
    title: "OBD P0158 - Sensor O2 B2S2 Alto",
    keywords: ["p0158", "o2", "b2s2", "alto", "obd"],
    answer: "[SIGNIFICADO]El sensor O2 banco 2 sensor 2 reporta voltaje alto constante.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, posible mezcla rica, diagnostico de catalizador afectado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado en corto a voltaje, mezcla muy rica, fuga de combustible.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, verificar mezcla, reemplazar sensor si la senal esta fija.[/SOLUCION]"
  },
  {
    title: "OBD P0170 - Trim de Combustible Banco 1",
    keywords: ["p0170", "fuel trim", "banco1", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta trim de combustible fuera de rango en el banco 1.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, consumo elevado, tironeo, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]MAF sucio, fuga de vacio, presion de combustible incorrecta, sensor O2 sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar MAF, buscar fugas, medir presion de combustible, revisar O2 y trims.[/SOLUCION]"
  },
  {
    title: "OBD P0181 - Sensor Temp Combustible Rango",
    keywords: ["p0181", "temperatura", "combustible", "rango", "obd"],
    answer: "[SIGNIFICADO]El sensor de temperatura de combustible reporta valores fuera de rango o erraticos.[/SIGNIFICADO]\n\n[FALLA]Arranque irregular, consumo elevado, estrategia de inyeccion alterada.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado con falso contacto, conector sulfatado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir resistencia del sensor, reemplazar si hay saltos.[/SOLUCION]"
  },
  {
    title: "OBD P0182 - Sensor Temp Combustible Bajo",
    keywords: ["p0182", "temperatura", "combustible", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo del sensor de temperatura de combustible. Puede ser corto a tierra.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, consumo alto, estrategia de combustible alterada.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor en corto, cableado a tierra, conector dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje de referencia, revisar cableado, reemplazar sensor si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0190 - Sensor Presion Combustible Circuito",
    keywords: ["p0190", "presion", "combustible", "sensor", "obd"],
    answer: "[SIGNIFICADO]Falla general en el circuito del sensor de presion de combustible.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, falta de potencia, apagones, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado abierto, conector flojo, baja presion real.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir voltajes, comparar presion real, reemplazar sensor si no responde.[/SOLUCION]"
  },
  {
    title: "OBD P0192 - Sensor Presion Combustible Bajo",
    keywords: ["p0192", "presion", "combustible", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo del sensor de presion de combustible. Puede indicar baja presion real.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, apagones, arranque dificil.[/FALLA]\n\n[POSIBLES CAUSAS]Bomba debil, filtro tapado, regulador defectuoso, sensor defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion real, revisar filtro, verificar regulador, reemplazar sensor si esta sesgado.[/SOLUCION]"
  },
  {
    title: "OBD P0193 - Sensor Presion Combustible Alto",
    keywords: ["p0193", "presion", "combustible", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto del sensor de presion. Puede ser circuito abierto o presion real alta.[/SIGNIFICADO]\n\n[FALLA]Tironeo, humo negro, modo limp, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado abierto, regulador trabado, retorno bloqueado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir presion real, verificar regulador, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0200 - Circuito de Inyectores",
    keywords: ["p0200", "inyectores", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla general en el circuito de inyectores. El PCM detecta problema de control en uno o mas inyectores.[/SIGNIFICADO]\n\n[FALLA]Misfire, falta de potencia, humo, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Cableado en corto, inyectores en corto, PCM con driver fallando, conectores dañados.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar arnes, medir resistencia de inyectores, verificar pulsos, reparar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0207 - Circuito del Inyector Cilindro 7",
    keywords: ["p0207", "inyector", "cilindro7", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del inyector del cilindro 7.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, humo, falta de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector defectuoso, cableado roto, conector flojo, driver PCM dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia, revisar cableado, probar pulso, reemplazar inyector si corresponde.[/SOLUCION]"
  },
  {
    title: "OBD P0208 - Circuito del Inyector Cilindro 8",
    keywords: ["p0208", "inyector", "cilindro8", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del inyector del cilindro 8.[/SIGNIFICADO]\n\n[FALLA]Misfire, humo, tironeo, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector abierto, cableado dañado, conector suelto, PCM con driver fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir resistencia, intercambiar inyector, reparar arnes.[/SOLUCION]"
  },
  {
    title: "OBD P0222 - Sensor TPS/APP Circuito Bajo",
    keywords: ["p0222", "tps", "app", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el sensor TPS/APP. El PCM detecta discrepancia en el acelerador.[/SIGNIFICADO]\n\n[FALLA]Modo limp, respuesta lenta, ralenti irregular, luz de traccion.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor APP defectuoso, cableado en corto, conector suelto, cuerpo de aceleracion sucio.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar voltajes APP/TPS, limpiar cuerpo de aceleracion, revisar cableado, reemplazar sensor si hay saltos.[/SOLUCION]"
  },
  {
    title: "OBD P0223 - Sensor TPS/APP Circuito Alto",
    keywords: ["p0223", "tps", "app", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el sensor TPS/APP. Indica circuito abierto o corto a voltaje.[/SIGNIFICADO]\n\n[FALLA]RalentI alto, modo limp, respuesta anormal.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, conector desconectado, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir voltajes, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0231 - Bomba de Combustible Circuito Bajo",
    keywords: ["p0231", "bomba", "combustible", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito secundario de la bomba de combustible.[/SIGNIFICADO]\n\n[FALLA]No arranca, arranque prolongado, falta de presion.[/FALLA]\n\n[POSIBLES CAUSAS]Rele defectuoso, cableado en corto, bomba con alto consumo, fusible quemado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltaje en bomba, revisar rele y fusible, probar consumo de bomba, reparar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0232 - Bomba de Combustible Circuito Alto",
    keywords: ["p0232", "bomba", "combustible", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el circuito de la bomba de combustible. Puede indicar corto a voltaje.[/SIGNIFICADO]\n\n[FALLA]Bomba funcionando constante, posible consumo elevado, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Rele pegado, corto a voltaje, PCM no controla la salida.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar rele, medir voltajes, inspeccionar cableado, reemplazar rele si esta pegado.[/SOLUCION]"
  },
  {
    title: "OBD P0244 - Solenoide de Turbo Rango",
    keywords: ["p0244", "turbo", "solenoide", "rango", "obd"],
    answer: "[SIGNIFICADO]El solenoide de control de turbo esta fuera de rango o no responde adecuadamente.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, modo limp, presion de turbo inestable.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide defectuoso, mangueras de vacio rotas, cableado dañado, wastegate trabada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar solenoide, revisar mangueras, verificar accionamiento, reemplazar si no responde.[/SOLUCION]"
  },
  {
    title: "OBD P0269 - Balance de Aporte Cilindro 3",
    keywords: ["p0269", "cilindro3", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta aporte bajo de potencia en el cilindro 3.[/SIGNIFICADO]\n\n[FALLA]Vibracion, falta de potencia, humo, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector con bajo flujo, compresion baja, fuga en retorno, problema electrico.[/POSIBLES CAUSAS]\n\n[SOLUCION]Prueba de balance, prueba de retorno, medir compresion, revisar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0272 - Balance de Aporte Cilindro 4",
    keywords: ["p0272", "cilindro4", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]Aporte de potencia bajo en el cilindro 4.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, humo, perdida de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector deficiente, compresion baja, fuga interna, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Balance de cilindros, retorno de inyectores, compresion, revisar arnes.[/SOLUCION]"
  },
  {
    title: "OBD P0275 - Balance de Aporte Cilindro 5",
    keywords: ["p0275", "cilindro5", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]El cilindro 5 aporta menos potencia que el resto.[/SIGNIFICADO]\n\n[FALLA]Vibracion, falta de potencia, humo, ralenti irregular.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector con bajo flujo, compresion baja, problemas electricos, fuga de retorno.[/POSIBLES CAUSAS]\n\n[SOLUCION]Prueba de retorno, medir compresion, revisar cableado, reemplazar inyector si es necesario.[/SOLUCION]"
  },
  {
    title: "OBD P0278 - Balance de Aporte Cilindro 6",
    keywords: ["p0278", "cilindro6", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]Aporte bajo de potencia en cilindro 6.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, vibracion, humo, perdida de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector deficiente, compresion baja, fuga en retorno, circuito electrico defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Balance de cilindros, prueba de retorno, medir compresion, revisar arnes.[/SOLUCION]"
  },
  {
    title: "OBD P0281 - Balance de Aporte Cilindro 7",
    keywords: ["p0281", "cilindro7", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]Aporte bajo de potencia en cilindro 7.[/SIGNIFICADO]\n\n[FALLA]Vibracion, misfire, humo, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector defectuoso, compresion baja, retorno excesivo, falla electrica.[/POSIBLES CAUSAS]\n\n[SOLUCION]Prueba de balance, retorno de inyectores, compresion, revisar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0284 - Balance de Aporte Cilindro 8",
    keywords: ["p0284", "cilindro8", "balance", "inyeccion", "obd"],
    answer: "[SIGNIFICADO]El cilindro 8 aporta menos potencia que el resto.[/SIGNIFICADO]\n\n[FALLA]Vibracion, falta de potencia, humo, consumo elevado.[/FALLA]\n\n[POSIBLES CAUSAS]Inyector con bajo flujo, compresion baja, circuito electrico defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Balance de cilindros, prueba de retorno, medir compresion, revisar arnes.[/SOLUCION]"
  },
  {
    title: "OBD P0298 - Sobretemperatura de Aceite",
    keywords: ["p0298", "aceite", "temperatura", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta temperatura de aceite excesiva.[/SIGNIFICADO]\n\n[FALLA]Modo limp, luz de advertencia, posible degradacion de aceite.[/FALLA]\n\n[POSIBLES CAUSAS]Nivel de aceite bajo, radiador de aceite obstruido, sensor defectuoso, uso severo.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar nivel y calidad de aceite, revisar enfriador, medir sensor, corregir causa de sobrecalentamiento.[/SOLUCION]"
  },
  {
    title: "OBD P0301 - Fallo de Encendido Cilindro 1",
    keywords: ["p0301", "cilindro1", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de encendido detectado en el cilindro 1.[/SIGNIFICADO]\n\n[FALLA]Vibracion, perdida de potencia, consumo elevado, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia desgastada, bobina defectuosa, inyector con fallo, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar bujia y bobina, probar inyector, medir compresion, revisar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0302 - Fallo de Encendido Cilindro 2",
    keywords: ["p0302", "cilindro2", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de encendido en el cilindro 2.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, vibracion, falta de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia o bobina defectuosa, inyector con fallo, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar sistema de encendido, probar inyector, medir compresion, revisar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0303 - Fallo de Encendido Cilindro 3 (Resumen)",
    keywords: ["p0303", "cilindro3", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de encendido en el cilindro 3.[/SIGNIFICADO]\n\n[FALLA]Vibracion, perdida de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia, bobina, inyector o compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar bujia/bobina, probar inyector, medir compresion.[/SOLUCION]"
  },
  {
    title: "OBD P0304 - Fallo de Encendido Cilindro 4 (Resumen)",
    keywords: ["p0304", "cilindro4", "misfire", "obd"],
    answer: "[SIGNIFICADO]Fallo de encendido en el cilindro 4.[/SIGNIFICADO]\n\n[FALLA]Vibracion, falta de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Bujia, bobina, inyector, compresion baja.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar encendido, inyectores y compresion.[/SOLUCION]"
  },
  {
    title: "OBD U0102 - Perdida de Comunicacion con TCM",
    keywords: ["u0102", "tcm", "comunicacion", "can", "obd"],
    answer: "[SIGNIFICADO]Perdida de comunicacion con el modulo de transmision (TCM) en la red CAN.[/SIGNIFICADO]\n\n[FALLA]Cambios bruscos, modo limp, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]TCM sin alimentacion, corto en CAN, conector flojo, modulo defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar fusibles y tierras, medir CAN, inspeccionar conectores, reemplazar TCM si no comunica.[/SOLUCION]"
  },
  {
    title: "OBD U0151 - Perdida de Comunicacion con Modulo de Airbag",
    keywords: ["u0151", "airbag", "srs", "comunicacion", "obd"],
    answer: "[SIGNIFICADO]El PCM o BCM pierde comunicacion con el modulo de airbag (SRS).[/SIGNIFICADO]\n\n[FALLA]Luz SRS encendida, airbags desactivados.[/FALLA]\n\n[POSIBLES CAUSAS]Modulo SRS sin alimentacion, corto en CAN, conector suelto, modulo defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar fusibles y tierras del SRS, revisar conectores, medir CAN, reemplazar modulo si no comunica.[/SOLUCION]"
  },
  {
    title: "OBD B0024 - Airbag Lateral Derecho",
    keywords: ["b0024", "airbag", "lateral", "derecho", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del airbag lateral derecho.[/SIGNIFICADO]\n\n[FALLA]Luz SRS encendida, airbag deshabilitado.[/FALLA]\n\n[POSIBLES CAUSAS]Conector suelto, cableado dañado, airbag defectuoso, modulo SRS fallando.[/POSIBLES CAUSAS]\n\n[SOLUCION]Desconectar bateria, revisar conectores amarillos, medir resistencia, reparar cableado o reemplazar airbag.[/SOLUCION]"
  },
  {
    title: "OBD C0038 - Sensor de Velocidad de Rueda Trasera Derecha",
    keywords: ["c0038", "abs", "sensor", "rueda", "trasera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor ABS de la rueda trasera derecha.[/SIGNIFICADO]\n\n[FALLA]Luz ABS encendida, ESP desactivado, lectura erratica.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor dañado, cable cortado, anillo reluctor roto, suciedad metalica.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar sensor, limpiar, medir resistencia, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD C0077 - Sensor de Presion Neumaticos",
    keywords: ["c0077", "tpms", "presion", "neumaticos", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor de presion de neumaticos (TPMS).[/SIGNIFICADO]\n\n[FALLA]Luz TPMS encendida, lectura incorrecta de presion.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor TPMS sin bateria, sensor dañado, falla de comunicacion, rueda no programada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Reprogramar sensor, revisar bateria del TPMS, reemplazar sensor si no transmite.[/SOLUCION]"
  }
];

async function seedKnowledgeBase() {
  console.log("Iniciando carga de Knowledge Base - OBD Pack 6...");
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

  console.log("\n✅ Proceso completado - Pack 6");
  console.log("Total procesado:", newArticles.length, "articulos");
}

seedKnowledgeBase();
