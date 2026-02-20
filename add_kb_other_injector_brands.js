const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kxokcjxntikrbgalmajp.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error("Falta variable de entorno: SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const otherInjectors = [
  // DENSO
  {
    partNumber: "295050-0160",
    manufacturer: "Denso",
    voltage: "12V",
    resistance: "0.5-0.6Ω",
    current: "20-24A",
    applications: ["Isuzu D-Max 3.0", "Isuzu NQR 5.2", "Isuzu N-Series"],
    orifices: "6",
    orificeSize: "0.15mm",
    maxPressure: "1800",
  },
  {
    partNumber: "295050-0170",
    manufacturer: "Denso",
    voltage: "12V",
    resistance: "0.5-0.6Ω",
    current: "20-24A",
    applications: ["Isuzu D-Max 3.0 (v6)", "Isuzu N-Series mejorado"],
    orifices: "6",
    orificeSize: "0.15mm",
    maxPressure: "1800",
  },
  {
    partNumber: "295080-0100",
    manufacturer: "Denso",
    voltage: "12V",
    resistance: "0.55-0.65Ω",
    current: "18-22A",
    applications: ["Hino 300 Series", "Hino 500 Series", "Toyota Diesel pesados"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "295900-0160",
    manufacturer: "Denso",
    voltage: "24V",
    resistance: "1.0-1.2Ω",
    current: "10-12A",
    applications: ["Caterpillar 320D", "Volvo FH16", "Scania R440", "DAF camiones pesados"],
    orifices: "7",
    orificeSize: "0.14mm",
    maxPressure: "1800",
  },
  // DELPHI
  {
    partNumber: "28440894",
    manufacturer: "Delphi",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Ford Transit Custom 2.0 TDCi", "Ford Kuga 2.0 TDCi", "Volvo C30 2.0D"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "28229273",
    manufacturer: "Delphi",
    voltage: "12V",
    resistance: "0.46-0.56Ω",
    current: "18-22A",
    applications: ["Jaguar 2.2 Diesel", "Land Rover 2.2 TDCi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "28295315",
    manufacturer: "Delphi",
    voltage: "12V",
    resistance: "0.48-0.58Ω",
    current: "18-22A",
    applications: ["Jeep Liberty 2.8 CRD", "Jeep Grand Cherokee 3.0 CRD"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  // MITSUBISHI OEM
  {
    partNumber: "1465A041",
    manufacturer: "Mitsubishi",
    voltage: "12V",
    resistance: "0.5-0.6Ω",
    current: "18-22A",
    applications: ["Mitsubishi Pajero 3.2 Di-D", "Mitsubishi L200 3.2", "Mitsubishi Challenger"],
    orifices: "7",
    orificeSize: "0.14mm",
    maxPressure: "1800",
  },
  {
    partNumber: "1465A209",
    manufacturer: "Mitsubishi",
    voltage: "12V",
    resistance: "0.48-0.58Ω",
    current: "18-22A",
    applications: ["Mitsubishi Lancer 2.0 Di-D", "Mitsubishi Colt 1.5 CIE"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  // CHRYSLER/JET
  {
    partNumber: "EV14ST",
    manufacturer: "Chrysler (Jet Precision Engineering)",
    voltage: "12V",
    resistance: "0.42-0.52Ω",
    current: "16-20A",
    applications: ["Jeep TJ 2.4L (diesel conversión)", "Dodge Ram 2500/3500 5.9 ISB"],
    orifices: "6",
    orificeSize: "0.14mm",
    maxPressure: "1700",
  },
];

function generateOtherInjectorArticle(injector) {
  const appList = injector.applications.map((app) => `   • ${app}`).join("\n");

  return {
    title: `Inyector ${injector.manufacturer} ${injector.partNumber} - Especificaciones Técnicas Diesel Common Rail`,
    keywords: [
      injector.partNumber,
      `${injector.manufacturer.toLowerCase()} ${injector.partNumber}`,
      `${injector.manufacturer.toLowerCase()} inyector`,
      "inyector diesel",
      "common rail",
      "especificaciones",
      "voltaje",
      ...injector.applications.slice(0, 2).map((app) => app.toLowerCase()),
    ],
    answer: `╔══════════════════════════════════════════════════════════════════════╗
║              INYECTOR ${injector.manufacturer.toUpperCase()} ${injector.partNumber}                        ║
║              Diesel Common Rail - Especificaciones Técnicas             ║
╚══════════════════════════════════════════════════════════════════════╝

────────────────────────────────────────────────────────────────────────
📋 IDENTIFICACIÓN DEL INYECTOR
────────────────────────────────────────────────────────────────────────

├─ NÚMERO DE PARTE: ${injector.partNumber}
├─ FABRICANTE: ${injector.manufacturer}
├─ TIPO: Inyector Common Rail Diesel
├─ VOLTAJE SISTEMA: ${injector.voltage}
└─ GENERACIÓN: Moderna (CRI2+)

────────────────────────────────────────────────────────────────────────
► VEHÍCULOS COMPATIBLES ◄
────────────────────────────────────────────────────────────────────────

${appList}

────────────────────────────────────────────────────────────────────────
⚡ ESPECIFICACIONES ELÉCTRICAS
────────────────────────────────────────────────────────────────────────

█ VOLTAJE DE ALIMENTACIÓN:
  │  Sistema: ${injector.voltage}
  │  Rango Operativo: ${injector.voltage === "12V" ? "10.8V - 13.2V" : "20V - 28V"}
  │  Límite Mínimo: ${injector.voltage === "12V" ? "9.0V" : "18.0V"}
  └─ CRÍTICO: Por debajo mínimo NO inyecta combustible

█ RESISTENCIA (Impedancia):
  │  Rango: ${injector.resistance} (a 20°C)
  │  Tipo: Baja Impedancia Peak-and-Hold
  │  Método: Óhmetro entre pines (verificar manual específico)
  └─ Desviación >10% = fallo probable

█ CORRIENTE MÁXIMA PICO:
  │  Apertura: ${injector.current}
  │  Duración: <10ms
  │  Sostenida: 2A - 4A
  └─ PROTECCIÓN: Circuito limita sobre-corriente

════════════════════════════════════════════════════════════════════════

█ ESPECIFICACIONES MECÁNICAS

Presión Inyección:
  │  Máxima: ${injector.maxPressure} bar
  │  Nominal: 600-1400 bar (operación normal)
  │  Mínima Arranque Frío: 300-400 bar
  └─ Sistema: Common Rail presión constante

Orificio Spray:
  │  Cantidad: ${injector.orifices} orificios
  │  Diámetro: ${injector.orificeSize}
  │  Cono Dispersión: 60-70°
  └─ Material: Acero preciso de Bosch/OEM

════════════════════════════════════════════════════════════════════════

█ DIAGNÓSTICO RÁPIDO:

  MEDIDA                 VALOR NORMAL           ACCIÓN SI FUERA
  ─────────────────────────────────────────────────────────────
  Resistencia            ${injector.resistance}         Fuera rango → Cambiar
  Voltaje                ${injector.voltage}               <${injector.voltage === "12V" ? "9V" : "18V"} → Revisar batería/alternador
  Corriente Pico         ${injector.current}       <15A o 0A → Problema ECU
  Presión Rail           >1500bar sin motor      <1500bar → Bomba defectuosa
  Pulso Spray            0.5-1.2ms duración     Irregular → Inyector dañado

════════════════════════════════════════════════════════════════════════

█ SÍNTOMAS DE FALLO:
  
  ├─ Dificultad arranque especialmente en frío
  ├─ Pérdida de potencia progresiva
  ├─ Consumo combustible excesivo (>8L/100km)
  ├─ Humo negro/gris excesivo en escape
  ├─ Vibración/picado en ralentí
  ├─ Códigos P026X en escaneo OBD2
  └─ Detonación audible (motor golpeando)

════════════════════════════════════════════════════════════════════════

█ PROCEDIMIENTO DE MEDICIÓN:

  1️⃣ Desconectar conector eléctrico inyector
  2️⃣ Medir resistencia con multímetro
  3️⃣ Rango: ${injector.resistance} Ω
  4️⃣ Si fuera → Reemplazar
  5️⃣ Si correcto → Medir corriente con pinza
  6️⃣ Ciclo inyección: ${injector.current}
  7️⃣ Si <15A → Revisar ECU/mazo/conexión

════════════════════════════════════════════════════════════════════════

█ DIFERENCIAS VS BOSCH COMÚN:

  ${injector.manufacturer === "Denso" ? `Denso es OEM para Isuzu, Hino, Toyota pesados.
  Característica: Diseño compacto, conector pequeño.
  En camiones: 24V en series pesadas (vs 12V Bosch).
  Nota: NO intercambiar con Bosch sin reprogramar ECU completa.` : ""}

  ${injector.manufacturer === "Delphi" ? `Delphi utiliza en Ford (TDCi) y Jaguar (DDIS).
  Compatible parcialmente con Bosch en algunos vehículos.
  Posee control de inyección propio en conectores.
  Nota: Verificar compatibilidad ECU antes de cambiar.` : ""}

  ${injector.manufacturer === "Mitsubishi" ? `Mitsubishi OEM para modelos Di-D y CIE.
  Diseño específico para ECU Mitsubishi.
  Rango presión 1600-1800 bar.
  Nota: NO intercambiar con terceros sin reprogramación.` : ""}

════════════════════════════════════════════════════════════════════════

█ REEMPLAZO Y PASOS CRÍTICOS:

  ⚠️ PRE-INSTALACIÓN:
     ├─ Limpiar asiento inyector
     ├─ Reemplazar O-ring
     ├─ Verificar presión residual rail (>1500bar)
     └─ Obtener calibración código IMA si aplica

  ⚠️ INSTALACIÓN:
     ├─ Torque correcto (25-30 N·m típico)
     ├─ Lubrear punta suavemente
     └─ Apretar conector firmemente

  ⚠️ POST-INSTALACIÓN:
     ├─ Reprogramar número de serie (algunos fabricantes)
     ├─ Purgar aire sistemas
     ├─ Verificar presión idle
     └─ Limpiar códigos, rodar 100km

════════════════════════════════════════════════════════════════════════

█ COMPATIBILIDAD:
  
  ✓ MISMO TIPO: ${injector.manufacturer} ${injector.partNumber}
  ? SIMILAR: Verificar con manual OEM específico
  ✗ DIFERENTE FABRICANTE: NO sin recalibración ECU

════════════════════════════════════════════════════════════════════════

█ INFORMACIÓN PRECIO Y DISPONIBILIDAD:

  OEM ${injector.manufacturer}: ${injector.voltage === "24V" ? "$350-$500" : "$200-$300"} USD
  Aftermarket: ${injector.voltage === "24V" ? "$150-$250" : "$80-$150"} USD (calidad variable)
  Disponibilidad: Stock limitado (parte especializada)

════════════════════════════════════════════════════════════════════════`,
  };
}

async function insertOtherInjectors() {
  console.log(`Insertando ${otherInjectors.length} inyectores adicionales (Denso, Delphi, Mitsubishi)...\n`);

  let insertedCount = 0;
  let errorCount = 0;

  for (const injector of otherInjectors) {
    try {
      const article = generateOtherInjectorArticle(injector);

      const { data, error } = await supabase
        .from("assistant_kb")
        .insert([article])
        .select();

      if (error) {
        console.error(`❌ ${injector.manufacturer} ${injector.partNumber}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ ${injector.manufacturer} ${injector.partNumber}`);
        insertedCount++;
      }
    } catch (err) {
      console.error(`❌ Error ${injector.partNumber}:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n════════════════════════════════════════════════════════════`);
  console.log(`✅ COMPLETADO - Inyectores Alternativos`);
  console.log(`✅ Insertados: ${insertedCount}`);
  if (errorCount > 0) console.log(`❌ Errores: ${errorCount}`);
  console.log(`📊 Total: ${insertedCount}/${otherInjectors.length}`);
  console.log(`════════════════════════════════════════════════════════════`);
}

insertOtherInjectors();
