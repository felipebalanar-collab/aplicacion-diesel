const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kxokcjxntikrbgalmajp.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error(
    "Falta variable de entorno: SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertArticles() {
  const articles = [
    {
      title: "Inyector Bosch 0445110126 - Especificaciones Técnicas Common Rail Diesel",
      keywords: [
        "0445110126",
        "bosch",
        "inyector",
        "diesel",
        "common rail",
        "hyundai",
        "kia",
        "volkswagen",
        "bmw",
        "especificaciones",
        "voltaje",
        "ohm",
      ],
      answer: `╔══════════════════════════════════════════════════════════════════════╗
║                    INYECTOR BOSCH 0445110126                           ║
║            Common Rail Diesel - Especificaciones Técnicas              ║
╚══════════════════════════════════════════════════════════════════════╝

────────────────────────────────────────────────────────────────────────
📋 IDENTIFICACIÓN DEL INYECTOR
────────────────────────────────────────────────────────────────────────

├─ NÚMERO DE PARTE: 0445110126
├─ FABRICANTE: Bosch (Grupo Robert Bosch GmbH)
├─ TIPO: Inyector Common Rail Diesel de Baja Impedancia (Smart)
├─ GENERACIÓN: CRI2 / CRI2.5
├─ APLICACIÓN: Motores Diesel 1.6 - 2.2L
└─ UBICACIÓN: Cilindro individual

────────────────────────────────────────────────────────────────────────
► VEHÍCULOS COMPATIBLES ◄
────────────────────────────────────────────────────────────────────────

🚗 HYUNDAI:
   ├─ i30 CW 2007-2012 (1.6 CRDi)
   ├─ Santa Fe 2006-2012 (2.2 CRDi)
   └─ Tucson 2004-2009 (2.0 CRDi)

🚗 KIA:
   ├─ Cee'd 2007-2012 (1.6 CRDi)
   ├─ Sorento 2006-2012 (2.2 CRDi)
   └─ Sportage 2004-2010 (2.0 CRDi)

🚗 VOLKSWAGEN:
   ├─ Polo 2004-2009 (1.9 TDi)
   └─ Golf 2004-2008 (1.9/2.0 TDi)

🚗 BMW:
   ├─ X5 E53 2004-2006 (3.0 D)
   └─ 320d E90 2005-2009

────────────────────────────────────────────────────────────────────────
⚡ ESPECIFICACIONES ELÉCTRICAS
────────────────────────────────────────────────────────────────────────

█ VOLTAJE DE ALIMENTACIÓN:
  │  Rango Nominal:       12V DC ± 0.5V
  │  Rango Operativo:     10.8V - 13.2V
  │  Límite Mínimo Arranque: 9.0V
  └─ CRÍTICO: Por debajo de 9V NO inyecta combustible

█ RESISTENCIA (Impedancia):
  │  Rango: 0.45Ω - 0.55Ω (a 20°C)
  │  Tipo: Baja Impedancia (Smart)
  │  Método Medición: Óhmetro entre pines 1-2
  └─ Típica: 0.50Ω ± 0.05Ω

█ CORRIENTE MÁXIMA PICO:
  │  En Apertura:        18A - 22A
  │  Duración Máxima:    10ms sin dañar bobina
  │  Corriente Sostenida: 2A - 4A
  └─ PROTECCIÓN: Over-current a 25A

█ ENERGÍA INYECTADA POR CICLO:
  │  Pulso Típico:     250μs - 1200μs
  │  Energía @ Máxima Apertura: 0.8-1.2W
  └─ Rango Completo de Inyección

────────────────────────────────────────────────────────────────────────
🔧 ESPECIFICACIONES MECÁNICAS
────────────────────────────────────────────────────────────────────────

█ PRESIÓN DE INYECCIÓN:
  │  Rango Nominal:    200 - 1600 bar (máx)
  │  Arranque en Frío: 300 - 400 bar
  │  Crucero Estable:  600 - 900 bar
  │  Aceleración Plena: 1200 - 1600 bar
  └─ Control: ECU modula presión por demanda

█ ORIFICIO DE INYECCIÓN:
  │  Cantidad: 7 orificios (monohole)
  │  Diámetro: 0.135mm (± 0.005mm)
  │  Ángulo Dispersión: 60° cono de spray
  │  Material: Acero endurecido de precisión
  └─ Tolerancia: ±2 micras de fábrica

█ COMPORTAMIENTO HIDRÁULICO:
  │  Volumen Inyectado: 65-68 mm³/1000 ciclos
  │  Tiempo Respuesta Apertura: 0.5ms
  │  Tiempo Cierre: 0.3ms
  │  Repetibilidad: ±2% ciclo a ciclo
  └─ CRÍTICO: Desviación >±5% = fallo en cilindro

█ BOBINA ELECTROMAGNÉTICA:
  │  Tipo: Solenoide Directo (actuador integrado)
  │  Inductancia: 3.5mH - 4.5mH
  │  Resistencia Térmica: 0.48Ω - 0.52Ω
  │  Material Núcleo: Hierro de alta permeabilidad
  └─ Potencia: 24W @ 12V nominal

════════════════════════════════════════════════════════════════════════

█ DIAGNÓSTICO RÁPIDO:
  │  ✓ BUENO:   0.50Ω medido, voltaje 12V, 18A pico
  │  ? DÉBIL:   0.48Ω pero corriente limitada a 15A
  │  ✗ FALLO:   >0.60Ω o <0.40Ω, o sin corriente
  └─ Acción: >0.55Ω = reemplazar

════════════════════════════════════════════════════════════════════════

█ CÓDIGOS DE FALLA ASOCIADOS:
  │  P0261 - Cylinder 1 Injector Low
  │  P0263 - Cylinder 1 Injector Electrical
  │  P0264 - Cylinder 2 Injector Low
  │  P0301 - Random/Multiple Cylinder Misfire
  │  P0335 - Crankshaft Position Sensor
  └─ Todos = revisión de inyectores (resistencia, corriente)

════════════════════════════════════════════════════════════════════════

█ PROCEDIMIENTO DE MEDICIÓN IN-SITU:
  
  1️⃣ Desconectar arnés eléctrico del inyector
  2️⃣ Medir resistencia con óhmetro entre pines 1-2
  3️⃣ Rango esperado: 0.45Ω - 0.55Ω
  4️⃣ Si fuera de rango → Reemplazar inyector
  5️⃣ Si dentro del rango → Medir corriente con pinza amperimétrica
  6️⃣ Esperar pulso de inyección (0.5-1.2ms de duración)
  7️⃣ Corriente pico debe ser 18A-22A
  8️⃣ Si <15A o falta pulso → Problema en ECU/mazo

════════════════════════════════════════════════════════════════════════

█ SÍNTOMAS DE FALLO:
  
  ├─ Motor no arranca o arranca muy difícil
  ├─ Pérdida de potencia bajo carga
  ├─ Consumo excesivo de combustible (>8L/100km)
  ├─ Humo negro visible en escape
  ├─ Vibración anormal en ralentí
  ├─ Código de fallo P026X activado
  ├─ Cilindro no inicia/comprime anormalmente
  └─ Deltonación audible (sonido de golpe)

════════════════════════════════════════════════════════════════════════

█ REEMPLAZO Y CALIBRACIÓN:

  🔴 CRÍTICO: Inyector de baja impedancia (0.50Ω)
  
  ├─ ANTES DE INSTALAR:
  │  ├─ Limpiar asiento de inyector con cepillo de precisión
  │  ├─ Inspeccionar O-ring de precarga (reemplazar si es >3mm blando)
  │  ├─ Verificar presión residual del sistema (debe ser >1500bar)
  │  └─ Calibrar inyector nuevo en ECU antes de instalar
  │
  ├─ INSTALACIÓN:
  │  ├─ Aplicar WD-40 suave en punta de inyector
  │  ├─ Insertar suavemente en cilindro
  │  ├─ Torque de tuerca: 25-30 N·m (no más, evita aplastamiento)
  │  └─ Reconectar arnés eléctrico
  │
  └─ DESPUÉS DE INSTALAR:
     ├─ Bomba con código de inyector en ECU
     ├─ Hacer purga de aire en common rail
     ├─ Verificar sin arrancar: presión residual >1500bar
     ├─ Arrancar motor (primeros 5s ritmo lento)
     ├─ Completar capacidad tanque (purga burbujas)
     └─ Borrar fallos, conducir 100km, releer códigos

════════════════════════════════════════════════════════════════════════

█ COMPATIBILIDAD Y EQUIVALENCIAS:

  Este inyector (0445110126) puede reemplazarse POR:
  
  ├─ Bosch de fábrica: 0445110126 (original recomendado ✓)
  ├─ Bosch Similar 1.6 CRDi: 0445110250 (con calibración)
  ├─ Replikás chinas: 0445110126 (mala calidad ✗)
  └─ Continental/Denso: NO compatibles sin modificar

════════════════════════════════════════════════════════════════════════

█ FECHA DISPONIBILIDAD EN MERCADO:
  
  Producción Bosch: 2004-2012 (máximo 8 años en servicio)
  Disponibilidad: Stock limitado (parte envejecida)
  Precio OEM: 220-280 USD/unidad
  Aftermarket: 80-120 USD (calidad variable)
  
════════════════════════════════════════════════════════════════════════`,
    },
  ];

  console.log("Insertando artículos en la tabla assistant_kb...");

  for (const article of articles) {
    try {
      const { data, error } = await supabase
        .from("assistant_kb")
        .insert([article])
        .select();

      if (error) {
        console.error(`Error insertando "${article.title}":`, error.message);
      } else {
        console.log(
          `✅ Insertado: "${article.title}" (ID: ${data[0].id})`
        );
      }
    } catch (err) {
      console.error(`Error en inserción:`, err.message);
    }
  }

  console.log("\n✅ Proceso completado");
}

insertArticles();
