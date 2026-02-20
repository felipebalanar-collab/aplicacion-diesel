const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kxokcjxntikrbgalmajp.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error("Falta variable de entorno: SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const injectorDatabase = [
  {
    partNumber: "0445110021",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Mercedes OM611/OM612", "Mercedes E-Class 2.1/2.7L CDi", "Mercedes A/C-Class 2.0-2.7 CDi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110059",
    voltage: "12V",
    resistance: "0.48-0.58Ω",
    current: "18-22A",
    applications: ["Renault 1.5 dCi", "Nissan 1.5 dCi", "Dacia logan/Sandero 1.5 dCi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110064",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Fiat 1.3 Multijet", "Fiat Panda", "Fiat Punto 1.3 Diesel"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110080",
    voltage: "12V",
    resistance: "0.45-0.53Ω",
    current: "18-22A",
    applications: ["Ford Transit 2.4 TDCi", "Ford Ranger 2.5 TDCi", "Ford Everest 2.5 TDCi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110094",
    voltage: "12V",
    resistance: "0.46-0.56Ω",
    current: "18-22A",
    applications: ["Peugeot 2.0 HDi", "Citroën 2.0 HDi", "Peugeot Partner 1.6 HDi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110111",
    voltage: "12V",
    resistance: "0.44-0.54Ω",
    current: "18-22A",
    applications: ["Opel Vectra 1.7 CDTi", "Vauxhall 1.7 CDTi", "Opel Astra 1.7"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110129",
    voltage: "12V",
    resistance: "0.47-0.57Ω",
    current: "18-22A",
    applications: ["Ford Focus 1.6 TDCi", "Ford Mondeo 1.6 TDCi", "Ford C-MAX 1.6 TDCi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110126",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Hyundai i30", "Kia Cee'd", "Hyundai Santa Fe 2.2 CRDi", "Kia Sorento 2.2 CRDi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110183",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Renault 1.5 dCi (últimas gen)", "Nissan 1.5 dCi (K9K)", "Dacia 1.5 dCi mejorado"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110212",
    voltage: "12V",
    resistance: "0.46-0.56Ω",
    current: "18-22A",
    applications: ["VW 2.0 TDi", "Audi A3 2.0 TDi", "Skoda 2.0 TDi", "SEAT 2.0 TDi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110243",
    voltage: "12V",
    resistance: "0.44-0.54Ω",
    current: "18-22A",
    applications: ["Mercedes Sprinter 2.1 CDi", "Mercedes Vito 2.1 CDi", "Mercedes camiones"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110250",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Hyundai Santa Fe 2.0-2.2 CRDi", "Kia Sorento 2.0-2.2 CRDi", "Hyundai Tucson 2.0 CRDi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110273",
    voltage: "12V",
    resistance: "0.46-0.56Ω",
    current: "18-22A",
    applications: ["Mazda 2.0/2.2 MZR-CD", "Mazda CX-7 2.2 Diesel", "Mazda Premacy 2.0 Diesel"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110276",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Toyota Hilux 2.5 D4-D", "Toyota Fortuner 2.5 Diesel", "Toyota Innova 2.5 D4-D"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110293",
    voltage: "12V",
    resistance: "0.47-0.57Ω",
    current: "18-22A",
    applications: ["Mitsubishi L200 2.5 Di-D", "Mitsubishi Pajero 2.5 Diesel", "Mitsubishi Triton 2.5"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110305",
    voltage: "12V",
    resistance: "0.44-0.54Ω",
    current: "18-22A",
    applications: ["Nissan Navara 2.5 dCi", "Nissan Pathfinder 2.5 dCi", "Nissan Maxima 2.5 dCi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110318",
    voltage: "12V",
    resistance: "0.45-0.55Ω",
    current: "18-22A",
    applications: ["Chevrolet Captiva 2.0 VCDi", "Chevrolet Trailblazer 2.0 Diesel", "Opel Antara 2.0 VCDi"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
  {
    partNumber: "0445110376",
    voltage: "12V",
    resistance: "0.46-0.56Ω",
    current: "18-22A",
    applications: ["Ford Ranger 3.2 TDCi", "Ford Everest 3.2 TDCi", "Ford Pickup 3.2 Turbo"],
    orifices: "7",
    orificeSize: "0.135mm",
    maxPressure: "1600",
  },
];

function generateArticle(injector) {
  const appList = injector.applications.map((app) => `   • ${app}`).join("\n");

  return {
    title: `Inyector Bosch ${injector.partNumber} - Especificaciones Técnicas Completas Common Rail Diesel`,
    keywords: [
      injector.partNumber,
      `bosch ${injector.partNumber}`,
      "inyector diesel",
      "bosch common rail",
      "especificaciones",
      "voltaje",
      "ohm",
      "presión",
      ...injector.applications.slice(0, 3).map((app) => app.toLowerCase()),
    ],
    answer: `╔══════════════════════════════════════════════════════════════════════╗
║                    INYECTOR BOSCH ${injector.partNumber}                            ║
║            Common Rail Diesel - Especificaciones Técnicas Completas      ║
╚══════════════════════════════════════════════════════════════════════╝

────────────────────────────────────────────────────────────────────────
📋 IDENTIFICACIÓN DEL INYECTOR
────────────────────────────────────────────────────────────────────────

├─ NÚMERO DE PARTE: ${injector.partNumber}
├─ FABRICANTE: Bosch (Robert Bosch GmbH)
├─ TIPO: Inyector Common Rail Diesel de Baja Impedancia (Smart)
├─ GENERACIÓN: CRI2 / CRI2.5
└─ FAMILIA: 0445110XXX (Rango válido para aplicaciones múltiples)

────────────────────────────────────────────────────────────────────────
► VEHÍCULOS COMPATIBLES ◄
────────────────────────────────────────────────────────────────────────

${appList}

────────────────────────────────────────────────────────────────────────
⚡ ESPECIFICACIONES ELÉCTRICAS
────────────────────────────────────────────────────────────────────────

█ VOLTAJE DE ALIMENTACIÓN:
  │  Rango Nominal:       ${injector.voltage} DC ± 0.5V
  │  Rango Operativo:     10.8V - 13.2V
  │  Límite Mínimo Arranque: 9.0V
  └─ CRÍTICO: Por debajo de 9V NO inyecta combustible

█ RESISTENCIA (Impedancia):
  │  Rango: ${injector.resistance} (a 20°C)
  │  Tipo: Baja Impedancia (Smart/Peak-and-Hold)
  │  Método Medición: Óhmetro entre pines 1-2
  └─ Típica: ~ ± 0.05Ω de rango

█ CORRIENTE MÁXIMA PICO:
  │  En Apertura:        ${injector.current}
  │  Duración Máxima:    10ms sin dañar bobina
  │  Corriente Sostenida: 2A - 4A
  └─ PROTECCIÓN: Over-current a 25A

█ DRIVER REQUERIDO:
  │  Tipo: Peak-and-hold especializado
  │  Control ECU: Pulso modulado (PWM)
  │  Tiempo Respuesta: ~0.5ms
  └─ Compatibilidad: ECU Bosch/compatibles 1997+

────────────────────────────────────────────────────────────────────────
🔧 ESPECIFICACIONES MECÁNICAS
────────────────────────────────────────────────────────────────────────

█ PRESIÓN DE INYECCIÓN:
  │  Rango Nominal:    200 - ${injector.maxPressure} bar (máx)
  │  Arranque en Frío: 300 - 400 bar
  │  Crucero Estable:  600 - 900 bar
  │  Aceleración Plena: 1200 - 1600 bar
  └─ Control: ECU modula presión por demanda

█ ORIFICIO DE INYECCIÓN:
  │  Cantidad: ${injector.orifices} orificios (común en Bosch)
  │  Diámetro: ${injector.orificeSize} (± 0.005mm)
  │  Ángulo Dispersión: 60° cono de spray
  │  Material: Acero endurecido de precisión
  └─ Tolerancia: ±2 micras de fábrica

█ COMPORTAMIENTO HIDRÁULICO:
  │  Volumen Inyectado: 65-70 mm³/1000 ciclos
  │  Tiempo Respuesta Apertura: 0.5ms
  │  Tiempo Cierre: 0.3ms
  │  Repetibilidad: ±2% ciclo a ciclo
  └─ CRÍTICO: Desviación >±5% = fallo en cilindro

█ BOBINA ELECTROMAGNÉTICA:
  │  Tipo: Solenoide Directo (actuador integrado)
  │  Inductancia: 3.5mH - 4.5mH
  │  Resistencia Térmica: ${injector.resistance} (nominal)
  │  Material Núcleo: Hierro de alta permeabilidad
  └─ Potencia: 24W @ 12V nominal

════════════════════════════════════════════════════════════════════════

█ DIAGNÓSTICO RÁPIDO:
  │  ✓ BUENO:   ${injector.resistance.split('-')[0]} medido, voltaje ${injector.voltage}, ${injector.current}
  │  ? DÉBIL:   Próximo a ${injector.resistance.split('-')[1]} pero corriente limitada
  │  ✗ FALLO:   Fuera de rango o sin corriente observable
  └─ Acción: >0.58Ω o <0.43Ω = reemplazar

════════════════════════════════════════════════════════════════════════

█ CÓDIGOS DE FALLA ASOCIADOS:
  │  P0261 - Cylinder X Injector Low
  │  P0262 - Cylinder X Injector High
  │  P0263 - Cylinder X Injector Electrical / Open
  │  P0264 - Cylinder X+1 Injector Low
  │  P0301+ - Multiple Cylinder Misfire (si hay problema en cilindro)
  └─ Todos = revisión de inyectores (resistencia, corriente, pulsos)

════════════════════════════════════════════════════════════════════════

█ PROCEDIMIENTO DE MEDICIÓN IN-SITU:
  
  1️⃣ Desconectar arnés eléctrico del inyector
  2️⃣ Medir resistencia con óhmetro entre pines 1-2
  3️⃣ Rango esperado: ${injector.resistance}
  4️⃣ Si fuera de rango → Reemplazar inyector
  5️⃣ Si dentro del rango → Medir corriente con pinza amperimétrica
  6️⃣ Esperar pulso de inyección (0.5-1.2ms de duración)
  7️⃣ Corriente pico debe ser ${injector.current}
  8️⃣ Si <15A o falta pulso → Problema en ECU/mazo

════════════════════════════════════════════════════════════════════════

█ SÍNTOMAS DE FALLO:
  
  ├─ Motor no arranca o arranca muy difícil en frío
  ├─ Pérdida de potencia bajo carga o aceleración
  ├─ Consumo excesivo de combustible (>8L/100km)
  ├─ Humo negro visible en escape (injección retrasada)
  ├─ Vibración anormal en ralentí (cilindro desbalanceado)
  ├─ Código de fallo P026X activado por escaneo
  ├─ Cilindro no comprime/inicia normalmente
  └─ Deltonación audible (sonido de golpe/detonación)

════════════════════════════════════════════════════════════════════════

█ REEMPLAZO Y CALIBRACIÓN:

  🔴 CRÍTICO: Inyector de baja impedancia (${injector.resistance})
  
  ├─ ANTES DE INSTALAR:
  │  ├─ Limpiar asiento de inyector con cepillo de precisión
  │  ├─ Inspeccionar O-ring de precarga (reemplazar si >3mm blando)
  │  ├─ Verificar presión residual common rail (debe ser >1500bar)
  │  └─ Calibrar inyector nuevo en ECU antes de instalar
  │
  ├─ INSTALACIÓN:
  │  ├─ Aplicar WD-40 suave en punta de inyector
  │  ├─ Insertar suavemente en cilindro
  │  ├─ Torque de tuerca: 25-30 N·m (no apriete excesivo)
  │  └─ Reconectar arnés eléctrico
  │
  └─ DESPUÉS DE INSTALAR:
     ├─ Codificar número de inyector en ECU (IMA code)
     ├─ Hacer purga de aire en common rail
     ├─ Verificar sin arrancar: presión residual >1500bar
     ├─ Arrancar motor (primeros 5s ritmo lento)
     ├─ Completar tanque combustible (purga burbujas)
     ├─ Borrar fallos, releer códigos
     └─ Conducir 100km a régimen normal

════════════════════════════════════════════════════════════════════════

█ COMPATIBILIDAD CON OTROS NÚMEROS:

  Similar en Especificaciones Técnicas (intercambiable si misma ECU):
  
  ├─ Rango 0445110XXX: Todos 12V + baja impedancia
  ├─ Varía: Aplicación OEM, calibración ECU, geometría tobera
  ├─ NO intercambiar sin reprogramar: IMA = Individual Injector Adjustment
  └─ Riesgo: Humo negro, pérdida potencia, detonación

════════════════════════════════════════════════════════════════════════

█ INFORMACIÓN DE PRECIO Y DISPONIBILIDAD:
  
  Disponibilidad: Stock limitado (parte envejecida, 10+ años)
  OEM Bosch Original: 200-280 USD por unidad
  Aftermarket Calidad: 70-120 USD (variable)
  Repuestos China: $30-$50 (baja confiabilidad)
  
════════════════════════════════════════════════════════════════════════

█ NOTAS IMPORTANTES:

  ⚠️ CRÍTICO: No mezclar inyectores de diferentes números en mismo motor
  ⚠️ CRÍTICO: Cada inyector tiene código IMA individual único
  ⚠️ Reprogramación: Requiere odómetro + calibración ECU profesional
  ⚠️ Selección: Verificar número OEM exacto en motor antes de comprar

════════════════════════════════════════════════════════════════════════`,
  };
}

async function insertInjectors() {
  console.log(`Insertando ${injectorDatabase.length} inyectores en tabla assistant_kb...\n`);

  let insertedCount = 0;
  let errorCount = 0;

  for (const injector of injectorDatabase) {
    try {
      const article = generateArticle(injector);
      
      const { data, error } = await supabase
        .from("assistant_kb")
        .insert([article])
        .select();

      if (error) {
        console.error(`❌ Error insertando ${injector.partNumber}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ ${injector.partNumber} - ${injector.applications[0]}`);
        insertedCount++;
      }
    } catch (err) {
      console.error(`❌ Excepción ${injector.partNumber}:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n════════════════════════════════════════════════════════════`);
  console.log(`✅ PROCESO COMPLETADO`);
  console.log(`✅ Insertados: ${insertedCount} inyectores`);
  if (errorCount > 0) console.log(`❌ Errores: ${errorCount}`);
  console.log(`📊 Total: ${insertedCount}/${injectorDatabase.length}`);
  console.log(`════════════════════════════════════════════════════════════`);
}

insertInjectors();
