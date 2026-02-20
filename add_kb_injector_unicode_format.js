import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const articles = [
  {
    title: "Inyector Bosch 0445110250 - Especificaciones Técnicas Completas Common Rail Diesel (Formato Unicode)",
    keywords: [
      "0445110250",
      "bosch 0445110250",
      "inyector 0445110250",
      "voltaje 0445110250",
      "especificaciones 0445110250",
      "common rail 0445110250",
      "diesel 0445110250"
    ],
    answer: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 IDENTIFICACION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ Número de Parte: BOSCH 0445 110 250
├─ Familia: Common Rail Diesel Generation 2 (CRI 2.2)
├─ Fabricante: Robert Bosch GmbH
└─ Tipo: Solenoide electromagnético

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚗 APLICACIONES VEHICULARES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ HYUNDAI Santa Fe 2.2 CRDi (D4EB) 2006-2010
├─ HYUNDAI Tucson 2.0 CRDi (D4EA) 2004-2009
├─ KIA Sportage 2.0 CRDi (D4EA) 2004-2010
├─ KIA Sorento 2.5 CRDi (D4CB) 2006-2009
└─ Motores: D4EA (2.0L) | D4EB (2.2L) | D4CB (2.5L)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ ESPECIFICACIONES ELECTRICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

║ VOLTAJE OPERACIÓN
├─ ► VOLTAJE ALIMENTACIÓN: 12V DC NOMINAL ◄
├─ Rango Trabajo: 10.5V - 15.0V
├─ Voltaje Mínimo Funcional: 9.0V (degradado)
└─ Voltaje Máximo: 16.0V (puede dañar solenoide)

║ CORRIENTE CONSUMO
├─ ► CORRIENTE PICO APERTURA: 18-22 AMPERIOS ◄
├─ Duración Pico: 0.3-0.5 milisegundos
├─ ► CORRIENTE HOLD (Mantenimiento): 10-14 AMPERIOS ◄
└─ Corriente Promedio: 12 Amperios típico

║ RESISTENCIA BOBINA SOLENOIDE
├─ ► RESISTENCIA A 20°C: 0.45-0.55 OHMS ◄ [CRÍTICA]
├─ Resistencia Típica: 0.50 ohms
├─ Resistencia a 80°C: 0.55-0.65 ohms
└─ Inductancia: 180-220 microhenrios (µH)

║ DRIVER ECU
├─ Tipo Control: Peak-and-Hold especializado diesel
├─ Frecuencia PWM Hold: 1-5 kHz
└─ Protección: Limitación corriente, protección térmica

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙️ ESPECIFICACIONES MECANICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

║ PRESIÓN OPERACIÓN
├─ ► PRESIÓN RAIL MÍNIMA: 200 BAR (2,900 PSI) ◄
├─ ► PRESIÓN RAIL MÁXIMA: 1600 BAR (23,200 PSI) ◄
├─ Presión Típica Ralentí: 300-400 bar
├─ Presión Típica Crucero: 600-900 bar
└─ Presión Máxima Carga: 1400-1600 bar

║ CAUDAL INYECCIÓN (mg/ciclo)
├─ Ralentí: 8-15
├─ Crucero: 20-40
├─ Alta Carga: 60-100
├─ WOT (Aceleración Máxima): 100-120
└─ Flujo Nominal Máximo: 1000-1200

║ TIEMPOS RESPUESTA
├─ Tiempo Apertura (Opening Time): 0.35-0.50 ms
├─ Tiempo Cierre (Closing Time): 0.25-0.40 ms
├─ Tiempo Respuesta Total: 0.60-0.90 ms
└─ Tiempo Mínimo Inyección: 0.15 ms

║ CARACTERÍSTICAS FÍSICAS
├─ Longitud Total: 127.5 mm
├─ Diámetro Cuerpo: 17.0 mm
├─ Peso: 195 gramos aproximadamente
├─ Material Cuerpo: Acero inoxidable
├─ ► ORIFICIOS SPRAY: 7 ORIFICIOS ◄
├─ ► DIÁMETRO ORIFICIOS: 0.135 MM CADA UNO ◄
└─ ► ÁNGULO SPRAY: 152° TOTAL (CÓNICO) ◄

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PATRON INYECCION MULTIPLE (CRI 2.2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generación: Hasta 5 inyecciones por ciclo motor

1. PRE-INYECCIÓN PILOTO: 1-2 mg → Reduce ruido combustión
2. INYECCIÓN PILOTO: 3-6 mg → Suaviza arranque combustión
3. ► INYECCIÓN PRINCIPAL: 25-95 mg ◄ → GENERA POTENCIA
4. POST-INYECCIÓN 1: 2-5 mg → Reduce NOx, mejora emisiones
5. POST-INYECCIÓN 2: 3-8 mg → Regeneración DPF, limpieza

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 DIAGNOSTICO ELECTRICO - PRUEBA 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESISTENCIA BOBINA SOLENOIDE

Especificación 0445110250:
├─ ► RESISTENCIA NORMAL: 0.45-0.55 OHMS ◄
└─ Valor Típico: 0.50 ohms

INTERPRETACIÓN DE RESULTADOS:
├─ ✓ Si 0.45-0.55 ohms → Bobina OK (dentro especificación)
├─ ⚠️ Si 0.30-0.44 ohms → Posible cortocircuito interno parcial
├─ ✗✗✗ Si <0.30 ohms → CORTOCIRCUITO SEVERO, REEMPLAZAR
├─ ⚠️ Si >0.60 ohms → Bobina degradada, verificar conexión
├─ ✗✗✗ Si >1.0 ohm → BOBINA EN PROCESO FALLA
└─ ✗✗✗ Si infinito (OL) → CIRCUITO ABIERTO, REEMPLAZAR INMEDIATAMENTE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 DIAGNOSTICO ELECTRICO - PRUEBA 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEST DE BALANCE CON ESCÁNER (Valor IMA)

Especificación Bosch 0445110250:
├─ ► VALOR NORMAL: -3.0 a +3.0 mg/stroke por cilindro ◄
└─ ► Diferencia Entre Cilindros: <2.0 mg/stroke ◄

EJEMPLO NORMAL (Motor 4 Cilindros):
├─ Cilindro 1: +0.8 mg/stroke
├─ Cilindro 2: -0.5 mg/stroke
├─ Cilindro 3: +1.2 mg/stroke
├─ Cilindro 4: -0.3 mg/stroke
└─ Diferencia máxima: 1.7 mg ✓ ACEPTABLE

INTERPRETACIÓN:
├─ ✓ Si todos -3.0 a +3.0 → Inyectores BALANCEADOS
├─ ⚠️ Si un cilindro >+4.0 → Inyector DÉBIL (flujo bajo)
├─ ⚠️ Si un cilindro <-4.0 → Inyector FUERTE (flujo alto o goteo)
└─ ✗✗✗ Si diferencia >4.0 mg → REEMPLAZAR INYECTOR OUTLIER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ FALLAS COMUNES INYECTOR 0445110250
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

█ FALLA 1: VÁLVULA CONTROL BLOQUEADA (40% casos)
├─ Síntomas: Cilindro muerto, humo negro, pérdida potencia
├─ Diagnóstico: Test retorno flujo muy bajo (<10 mL/min)
├─ Causa: Combustible contaminado, partículas metálicas, carbón
└─ Solución: Limpieza ultrasónica (40-60% éxito) o REEMPLAZO

█ FALLA 2: ASIENTO AGUJA DESGASTADO - GOTEO (30% casos)
├─ Síntomas: Humo blanco al arrancar, ralentí irregular
├─ Diagnóstico: Test retorno flujo alto (>50 mL/min)
├─ Causa: Kilometraje alto (>200,000 km), combustible mala calidad
└─ Solución: ✗✗✗ REEMPLAZO (no reparable, set matched fábrica)

█ FALLA 3: ORIFICIOS SPRAY EROSIONADOS (20% casos)
├─ Síntomas: Pérdida potencia gradual, consumo alto, humo negro
├─ Diagnóstico: Banco prueba flujo alto (>40 mL/1000 iny)
├─ Causa: Uso prolongado (>250,000 km), cavitación, agua en diesel
└─ Solución: ✗✗✗ REEMPLAZO inyector

█ FALLA 4: BOBINA SOLENOIDE EN CORTOCIRCUITO (10% casos)
├─ Síntomas: Fusible inyectores quemado, motor no arranca
├─ Diagnóstico: Resistencia bobina <0.30 ohms
├─ Causa: Humedad, aislamiento degradado, vibración motor
└─ Solución: REEMPLAZO inyector + verificar driver ECU

█ FALLA 5: CONTAMINACIÓN AGUA EN COMBUSTIBLE
├─ Síntomas: MÚLTIPLES inyectores, pérdida severa, no arranca
├─ Diagnóstico: Agua visible en filtro, corrosión visible
├─ Causa: Tanque condensación, filtro agua saturado
└─ Solución: Drenar combustible, filtros nuevos, REEMPLAZO TODOS (caro)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 COSTO APROXIMADO REPARACION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

║ INYECTOR INDIVIDUAL
├─ ► BOSCH ORIGINAL: $280-$400 USD ◄
├─ Mano Obra Reemplazo: $120-$200 USD
└─ SUBTOTAL: $400-$600 USD

║ SET COMPLETO (4 CILINDROS) - RECOMENDADO
├─ ► 4x INYECTORES BOSCH: $1,120-$1,600 USD ◄
├─ ► MANO OBRA SET COMPLETO: $300-$500 USD ◄
├─ Codificación IMA: $50-$150 USD
├─ Filtros Combustible: $40-$80 USD
└─ ► TOTAL: $1,510-$2,330 USD ◄

RECOMENDACIÓN:
├─ Si >150,000 km Y falla inyector → Reemplazar SET COMPLETO
│  (otros próximos a fallar por desgaste similar)
└─ Si <100,000 km → Individual aceptable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ RESUMEN CLAVE INYECTOR BOSCH 0445110250
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
├─ Voltaje: ► 12V DC ◄
├─ Resistencia: ► 0.45-0.55 Ω ◄ (a 20°C)
├─ Corriente Pico: ► 18-22 A ◄
├─ Presión: ► 200-1600 bar ◄
├─ Orificios: ► 7 orificios (0.135mm) ◄
├─ Ángulo Spray: ► 152° (cónico) ◄
├─ Aplicación: ► Hyundai/Kia 2.0-2.5L CRDi ◄
└─ Vida Útil: ► 200,000-300,000 km ◄

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
  }
];

async function loadArticles() {
  console.log('Iniciando carga de Artículo Formateado con Unicode...');
  console.log(`Total de artículos a insertar: ${articles.length}`);
  console.log('');

  for (const article of articles) {
    const { data, error } = await supabase
      .from('assistant_kb')
      .insert([article]);

    if (error) {
      console.error(`❌ Error insertando "${article.title}":`, error.message);
    } else {
      console.log(`✅ Insertado: ${article.title}`);
    }
  }

  console.log('');
  console.log('✅ Proceso completado - Artículo Formateado con Unicode');
  console.log(`Total procesado: ${articles.length} artículos`);
  console.log('');
  console.log('FORMATO APLICADO:');
  console.log('━━━ Líneas divisoras claras');
  console.log('├─ ├─ Estructura tipo árbol visual');
  console.log('► DATOS CRITICOS ◄ Destacados con símbolos');
  console.log('║ Columnas verticales para secciones');
  console.log('█ Bloques para fallas comunes');
  console.log('✓ ✗ Indicadores de OK/ERROR');
  console.log('⚠️ Avisos y advertencias');
  console.log('');
  console.log('COMPATIBLE CON: Cualquier chat, SMS, terminal, etc.');
}

loadArticles();
