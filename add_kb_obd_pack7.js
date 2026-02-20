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
    title: "OBD P0030 - Calentador O2 B1S1 Circuito",
    keywords: ["p0030", "o2", "calentador", "b1s1", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del calentador del sensor O2 banco 1 sensor 1.[/SIGNIFICADO]\n\n[FALLA]Lazo cerrado tardio, consumo alto, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Calentador abierto, fusible quemado, cableado dañado, sensor defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia del calentador, revisar fusible y alimentacion, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0036 - Calentador O2 B1S2 Circuito",
    keywords: ["p0036", "o2", "calentador", "b1s2", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del calentador del sensor O2 banco 1 sensor 2.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, diagnostico de catalizador retrasado.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, fusible quemado, cableado abierto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar fusible, medir resistencia, reemplazar sensor si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD P0068 - Correlacion MAP/MAF",
    keywords: ["p0068", "map", "maf", "correlacion", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta discrepancia entre las lecturas del MAP y MAF.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, tironeo, humo negro en diesel, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]MAF sucio, MAP sucio, fugas de admision, turbo con fugas.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar MAF/MAP, revisar mangueras y abrazaderas, verificar lecturas con scanner.[/SOLUCION]"
  },
  {
    title: "OBD P0073 - Sensor Temp Aire Ambiente Alto",
    keywords: ["p0073", "aat", "temperatura", "ambiente", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el sensor de temperatura ambiente. Indica circuito abierto.[/SIGNIFICADO]\n\n[FALLA]Lectura incorrecta en tablero, estrategias HVAC afectadas.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor desconectado, cableado roto, conector sulfatado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir continuidad, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0089 - Regulador Presion Combustible Rendimiento",
    keywords: ["p0089", "regulador", "presion", "combustible", "obd"],
    answer: "[SIGNIFICADO]El regulador de presion de combustible no mantiene la presion objetivo.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, tironeo, apagones, humo negro.[/FALLA]\n\n[POSIBLES CAUSAS]Regulador defectuoso, filtro tapado, bomba debil, sensor de presion sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir presion real, revisar filtro, probar regulador, verificar sensor.[/SOLUCION]"
  },
  {
    title: "OBD P0090 - Regulador Combustible Circuito",
    keywords: ["p0090", "regulador", "combustible", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del regulador de presion de combustible.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, falta de potencia, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Regulador defectuoso, cableado abierto, conector suelto, driver PCM.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia, reemplazar regulador si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD P0091 - Regulador Combustible Circuito Bajo",
    keywords: ["p0091", "regulador", "combustible", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del regulador de combustible.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, apagones, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, regulador en corto, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado y conector, medir resistencia, reparar corto.[/SOLUCION]"
  },
  {
    title: "OBD P0092 - Regulador Combustible Circuito Alto",
    keywords: ["p0092", "regulador", "combustible", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el circuito del regulador de combustible.[/SIGNIFICADO]\n\n[FALLA]Tironeo, humo negro, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Circuito abierto, regulador desconectado, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad, conectar regulador, reparar cableado.[/SOLUCION]"
  },
  {
    title: "OBD P0121 - Sensor TPS Rango",
    keywords: ["p0121", "tps", "rango", "acelerador", "obd"],
    answer: "[SIGNIFICADO]El TPS reporta valores fuera de rango respecto al flujo de aire.[/SIGNIFICADO]\n\n[FALLA]Respuesta irregular, modo limp, ralenti inestable.[/FALLA]\n\n[POSIBLES CAUSAS]TPS desgastado, cuerpo de aceleracion sucio, cableado con falso contacto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar cuerpo de aceleracion, revisar voltajes TPS, reemplazar sensor si hay saltos.[/SOLUCION]"
  },
  {
    title: "OBD P0131 - O2 B1S1 Circuito Bajo",
    keywords: ["p0131", "o2", "b1s1", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo constante en el sensor O2 B1S1. Indica mezcla pobre o sensor defectuoso.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, tironeo, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga de vacio, sensor O2 defectuoso, cableado abierto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Buscar fugas, revisar cableado, reemplazar O2 si la senal es fija.[/SOLUCION]"
  },
  {
    title: "OBD P0132 - O2 B1S1 Circuito Alto",
    keywords: ["p0132", "o2", "b1s1", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto constante en el sensor O2 B1S1. Indica mezcla rica o corto a voltaje.[/SIGNIFICADO]\n\n[FALLA]Humo negro, consumo alto, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Inyectores goteando, sensor O2 defectuoso, cableado en corto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar mezcla, revisar cableado, reemplazar O2 si la senal es fija.[/SOLUCION]"
  },
  {
    title: "OBD P0134 - O2 B1S1 Sin Actividad",
    keywords: ["p0134", "o2", "b1s1", "sin actividad", "obd"],
    answer: "[SIGNIFICADO]El sensor O2 B1S1 no muestra actividad. La senal esta fija.[/SIGNIFICADO]\n\n[FALLA]Consumo alto, emisiones elevadas, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor O2 defectuoso, cableado abierto, fusible del calentador quemado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar cableado y fusible, reemplazar sensor si no responde.[/SOLUCION]"
  },
  {
    title: "OBD P0151 - O2 B2S1 Circuito Bajo",
    keywords: ["p0151", "o2", "b2s1", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en O2 banco 2 sensor 1.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, MIL encendida, mezcla pobre.[/FALLA]\n\n[POSIBLES CAUSAS]Fuga de vacio, sensor O2 defectuoso, cableado abierto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Buscar fugas, revisar cableado, reemplazar sensor si la senal es fija.[/SOLUCION]"
  },
  {
    title: "OBD P0152 - O2 B2S1 Circuito Alto",
    keywords: ["p0152", "o2", "b2s1", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en O2 banco 2 sensor 1.[/SIGNIFICADO]\n\n[FALLA]Humo negro, consumo alto, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Mezcla rica, sensor O2 defectuoso, corto a voltaje.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar mezcla, revisar cableado, reemplazar sensor si no cambia.[/SOLUCION]"
  },
  {
    title: "OBD P0173 - Trim Combustible Banco 2",
    keywords: ["p0173", "fuel trim", "banco2", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta trim de combustible fuera de rango en banco 2.[/SIGNIFICADO]\n\n[FALLA]RalentI irregular, tironeo, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]MAF sucio, fuga de vacio banco 2, presion incorrecta, O2 sesgado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar MAF, fugas, presion de combustible, revisar O2.[/SOLUCION]"
  },
  {
    title: "OBD P0180 - Sensor Temp Combustible Circuito",
    keywords: ["p0180", "temperatura", "combustible", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla en el circuito del sensor de temperatura de combustible.[/SIGNIFICADO]\n\n[FALLA]Arranque irregular, consumo alto, estrategia de inyeccion alterada.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado abierto, conector suelto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar conector, medir resistencia, reemplazar sensor si no responde.[/SOLUCION]"
  },
  {
    title: "OBD P0219 - Sobrevelocidad del Motor",
    keywords: ["p0219", "sobrevelocidad", "rpm", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el motor excedio el limite de RPM.[/SIGNIFICADO]\n\n[FALLA]Modo proteccion, MIL encendida, posible limitacion de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Sobre-revolucion por cambio incorrecto, fallo de control, sensor CKP/CMP.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar historial, verificar sensores, inspeccionar danos si hubo sobre-revolucion.[/SOLUCION]"
  },
  {
    title: "OBD P0220 - Sensor TPS/APP Circuito",
    keywords: ["p0220", "tps", "app", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla general en el circuito del sensor TPS/APP.[/SIGNIFICADO]\n\n[FALLA]Modo limp, respuesta lenta, ralenti irregular.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado dañado, conector suelto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir voltajes, revisar arnes, reemplazar sensor si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD P0245 - Solenoide Turbo Circuito Bajo",
    keywords: ["p0245", "turbo", "solenoide", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del solenoide de control de turbo.[/SIGNIFICADO]\n\n[FALLA]Falta de potencia, modo limp, presion inestable.[/FALLA]\n\n[POSIBLES CAUSAS]Solenoide en corto, cableado a tierra, conector suelto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia del solenoide, reemplazar si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0246 - Solenoide Turbo Circuito Alto",
    keywords: ["p0246", "turbo", "solenoide", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el circuito del solenoide de control de turbo.[/SIGNIFICADO]\n\n[FALLA]Modo limp, presion erratica, falta de potencia.[/FALLA]\n\n[POSIBLES CAUSAS]Circuito abierto, conector suelto, solenoide desconectado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad, revisar conector, reemplazar solenoide si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0251 - Bomba Inyeccion A Rango",
    keywords: ["p0251", "bomba", "inyeccion", "rango", "diesel", "obd"],
    answer: "[SIGNIFICADO]Rango/resultado incorrecto del control de la bomba de inyeccion A.[/SIGNIFICADO]\n\n[FALLA]Arranque dificil, falta de potencia, humo, modo limp.[/FALLA]\n\n[POSIBLES CAUSAS]Bomba desgastada, regulador defectuoso, sensor de posicion bomba, combustible contaminado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar presion, revisar regulador, probar sensores, inspeccionar bomba.[/SOLUCION]"
  },
  {
    title: "OBD P0261 - Inyector Cilindro 1 Circuito Bajo",
    keywords: ["p0261", "inyector", "cilindro1", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 1.[/SIGNIFICADO]\n\n[FALLA]Misfire, falta de potencia, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector en corto, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0264 - Inyector Cilindro 2 Circuito Bajo",
    keywords: ["p0264", "inyector", "cilindro2", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 2.[/SIGNIFICADO]\n\n[FALLA]Misfire, tironeo, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector defectuoso, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar arnes, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0267 - Inyector Cilindro 3 Circuito Bajo",
    keywords: ["p0267", "inyector", "cilindro3", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 3.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector en corto, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0270 - Inyector Cilindro 4 Circuito Bajo",
    keywords: ["p0270", "inyector", "cilindro4", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 4.[/SIGNIFICADO]\n\n[FALLA]Misfire, falta de potencia, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector defectuoso, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar arnes, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0273 - Inyector Cilindro 5 Circuito Bajo",
    keywords: ["p0273", "inyector", "cilindro5", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 5.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, humo, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector en corto, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0276 - Inyector Cilindro 6 Circuito Bajo",
    keywords: ["p0276", "inyector", "cilindro6", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 6.[/SIGNIFICADO]\n\n[FALLA]Misfire, falta de potencia, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector defectuoso, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0279 - Inyector Cilindro 7 Circuito Bajo",
    keywords: ["p0279", "inyector", "cilindro7", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 7.[/SIGNIFICADO]\n\n[FALLA]Misfire, tironeo, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector en corto, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar arnes, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0282 - Inyector Cilindro 8 Circuito Bajo",
    keywords: ["p0282", "inyector", "cilindro8", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 8.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector defectuoso, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar arnes, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0285 - Inyector Cilindro 9 Circuito Bajo",
    keywords: ["p0285", "inyector", "cilindro9", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 9.[/SIGNIFICADO]\n\n[FALLA]Misfire, falta de potencia, humo.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector defectuoso, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0288 - Inyector Cilindro 10 Circuito Bajo",
    keywords: ["p0288", "inyector", "cilindro10", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del inyector del cilindro 10.[/SIGNIFICADO]\n\n[FALLA]Misfire, vibracion, humo, consumo alto.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, inyector en corto, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar arnes, medir resistencia, reemplazar inyector si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0297 - Sobrevelocidad del Vehiculo",
    keywords: ["p0297", "sobrevelocidad", "vss", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta que el vehiculo excedio la velocidad maxima programada.[/SIGNIFICADO]\n\n[FALLA]Modo proteccion, limitacion de potencia, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Velocidad real alta, VSS sesgado, configuracion incorrecta.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar VSS, revisar configuracion, borrar codigo si fue evento unico.[/SOLUCION]"
  },
  {
    title: "OBD P0458 - Valvula Ventilacion EVAP Circuito Bajo",
    keywords: ["p0458", "evap", "vent", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito de la valvula de ventilacion EVAP.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, fallas en prueba EVAP.[/FALLA]\n\n[POSIBLES CAUSAS]Valvula en corto, cableado a tierra, conector suelto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Medir resistencia, revisar cableado, reemplazar valvula si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0459 - Valvula Ventilacion EVAP Circuito Alto",
    keywords: ["p0459", "evap", "vent", "alto", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el circuito de la valvula de ventilacion EVAP.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, fallas en prueba EVAP.[/FALLA]\n\n[POSIBLES CAUSAS]Circuito abierto, conector suelto, valvula desconectada.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad, asegurar conectores, reemplazar valvula si esta abierta.[/SOLUCION]"
  },
  {
    title: "OBD P0460 - Sensor Nivel Combustible Circuito",
    keywords: ["p0460", "nivel", "combustible", "circuito", "obd"],
    answer: "[SIGNIFICADO]Falla general en el circuito del sensor de nivel de combustible.[/SIGNIFICADO]\n\n[FALLA]Indicador erratico, lectura incorrecta, luz de reserva erratica.[/FALLA]\n\n[POSIBLES CAUSAS]Flotador pegado, sensor desgastado, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar resistencia del sensor, revisar arnes, reemplazar unidad emisora si aplica.[/SOLUCION]"
  },
  {
    title: "OBD P0491 - Aire Secundario Flujo Insuficiente B1",
    keywords: ["p0491", "aire", "secundario", "flujo", "b1", "obd"],
    answer: "[SIGNIFICADO]Flujo insuficiente en el sistema de aire secundario banco 1.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas.[/FALLA]\n\n[POSIBLES CAUSAS]Bomba de aire debil, valvula check atascada, mangueras rotas.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar bomba, revisar valvulas y mangueras, reparar fugas.[/SOLUCION]"
  },
  {
    title: "OBD P0492 - Aire Secundario Flujo Insuficiente B2",
    keywords: ["p0492", "aire", "secundario", "flujo", "b2", "obd"],
    answer: "[SIGNIFICADO]Flujo insuficiente en el sistema de aire secundario banco 2.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, emisiones elevadas.[/FALLA]\n\n[POSIBLES CAUSAS]Bomba de aire debil, valvula check atascada, mangueras rotas.[/POSIBLES CAUSAS]\n\n[SOLUCION]Probar bomba, revisar valvulas y mangueras, reparar fugas.[/SOLUCION]"
  },
  {
    title: "OBD P0501 - VSS Rango/Desempeno",
    keywords: ["p0501", "vss", "velocidad", "rango", "obd"],
    answer: "[SIGNIFICADO]El sensor de velocidad del vehiculo esta fuera de rango o es erratico.[/SIGNIFICADO]\n\n[FALLA]Velocimetro erratico, cambios irregulares, ABS/ESP afectados.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor VSS defectuoso, cableado dañado, engranaje impulsor roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor, medir resistencia, inspeccionar engranaje, reemplazar si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD P0502 - VSS Circuito Bajo",
    keywords: ["p0502", "vss", "bajo", "obd"],
    answer: "[SIGNIFICADO]Voltaje bajo en el circuito del sensor de velocidad.[/SIGNIFICADO]\n\n[FALLA]Velocimetro sin lectura, cambios erraticos, ABS/ESP afectados.[/FALLA]\n\n[POSIBLES CAUSAS]Corto a tierra, sensor VSS defectuoso, cableado dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar cableado, medir voltaje, reemplazar sensor si esta en corto.[/SOLUCION]"
  },
  {
    title: "OBD P0503 - VSS Senal Intermitente",
    keywords: ["p0503", "vss", "intermitente", "obd"],
    answer: "[SIGNIFICADO]Senal intermitente del sensor de velocidad. El PCM detecta cortes o picos.[/SIGNIFICADO]\n\n[FALLA]Velocimetro erratico, cambios bruscos, ABS/ESP afectados.[/FALLA]\n\n[POSIBLES CAUSAS]Conector flojo, cableado dañado, sensor VSS defectuoso.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar conector, revisar cableado, reemplazar sensor si la senal es inestable.[/SOLUCION]"
  },
  {
    title: "OBD P0599 - Termostato Calentador Alto",
    keywords: ["p0599", "termostato", "calentador", "obd"],
    answer: "[SIGNIFICADO]Voltaje alto en el circuito del calentador del termostato (si aplica).[/SIGNIFICADO]\n\n[FALLA]Tiempo de calentamiento anormal, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Circuito abierto, termostato defectuoso, cableado roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar continuidad, inspeccionar cableado, reemplazar termostato si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD P0605 - Error ROM PCM",
    keywords: ["p0605", "pcm", "rom", "obd"],
    answer: "[SIGNIFICADO]El PCM detecta error en la memoria ROM.[/SIGNIFICADO]\n\n[FALLA]Apagones, modo limp, codigos multiples.[/FALLA]\n\n[POSIBLES CAUSAS]PCM dañado, voltaje inestable, corrupcion de software.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar alimentacion y tierras, reprogramar si aplica, reemplazar PCM si persiste.[/SOLUCION]"
  },
  {
    title: "OBD U0401 - Datos Invalidos ECM/PCM",
    keywords: ["u0401", "datos", "pcm", "can", "obd"],
    answer: "[SIGNIFICADO]Se recibieron datos invalidos desde el ECM/PCM.[/SIGNIFICADO]\n\n[FALLA]MIL encendida, comportamiento erratico, modulos con fallas.[/FALLA]\n\n[POSIBLES CAUSAS]PCM con falla interna, ruido en CAN, software corrupto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar red CAN, revisar alimentacion del PCM, reprogramar si aplica.[/SOLUCION]"
  },
  {
    title: "OBD U0422 - Datos Invalidos del Modulo de Carroceria",
    keywords: ["u0422", "bcm", "datos", "can", "obd"],
    answer: "[SIGNIFICADO]Se reciben datos invalidos del BCM en la red CAN.[/SIGNIFICADO]\n\n[FALLA]Funciones de carroceria erraticas, MIL encendida.[/FALLA]\n\n[POSIBLES CAUSAS]BCM defectuoso, ruido en CAN, alimentacion inestable.[/POSIBLES CAUSAS]\n\n[SOLUCION]Verificar CAN, revisar fusibles y tierras del BCM, reprogramar si aplica.[/SOLUCION]"
  },
  {
    title: "OBD C0041 - Sensor Velocidad Rueda Delantera Izquierda",
    keywords: ["c0041", "abs", "sensor", "rueda", "delantera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor de velocidad de rueda delantera izquierda.[/SIGNIFICADO]\n\n[FALLA]ABS/ESP desactivados, luz ABS encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor dañado, cable cortado, anillo reluctor roto.[/POSIBLES CAUSAS]\n\n[SOLUCION]Inspeccionar sensor y anillo, medir resistencia, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD C0042 - Sensor Velocidad Rueda Delantera Derecha",
    keywords: ["c0042", "abs", "sensor", "rueda", "delantera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor de velocidad de rueda delantera derecha.[/SIGNIFICADO]\n\n[FALLA]ABS/ESP inoperante, luz ABS encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor defectuoso, cableado roto, anillo reluctor dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Revisar sensor, limpiar, medir resistencia, reemplazar si no cumple.[/SOLUCION]"
  },
  {
    title: "OBD C0043 - Sensor Velocidad Rueda Trasera Izquierda",
    keywords: ["c0043", "abs", "sensor", "rueda", "trasera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor de velocidad de rueda trasera izquierda.[/SIGNIFICADO]\n\n[FALLA]ABS desactivado, luz ABS encendida, lectura erratica.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor sucio, cableado roto, anillo reluctor dañado.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar sensor, revisar cableado, reemplazar sensor si esta abierto.[/SOLUCION]"
  },
  {
    title: "OBD C0044 - Sensor Velocidad Rueda Trasera Derecha",
    keywords: ["c0044", "abs", "sensor", "rueda", "trasera", "obd"],
    answer: "[SIGNIFICADO]Falla en el sensor de velocidad de rueda trasera derecha.[/SIGNIFICADO]\n\n[FALLA]ABS/ESP inoperante, luz ABS encendida.[/FALLA]\n\n[POSIBLES CAUSAS]Sensor dañado, cableado roto, anillo reluctor con suciedad.[/POSIBLES CAUSAS]\n\n[SOLUCION]Limpiar sensor, revisar cableado, reemplazar sensor si no cumple.[/SOLUCION]"
  }
];

async function seedKnowledgeBase() {
  console.log("Iniciando carga de Knowledge Base - OBD Pack 7...");
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

  console.log("\n✅ Proceso completado - Pack 7");
  console.log("Total procesado:", newArticles.length, "articulos");
}

seedKnowledgeBase();
