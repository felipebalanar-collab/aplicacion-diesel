#!/usr/bin/env node
/**
 * Seed script for GAIA knowledge base
 * Common Rail diesel and gasoline injector diagnostic information
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const kbItems = [
  // Common Rail Systems - Diesel
  {
    title: "¿Qué es un sistema Common Rail Diesel?",
    keywords: ["common rail", "diesel", "sistema", "inyección"],
    answer: "El sistema Common Rail diesel es un sistema de inyección de combustible de alta presión que mantiene el combustible a presión constante en un carril común, desde donde se distribuye a los inyectores. Permite mayor precisión en la inyección, mejor eficiencia del combustible y menor emisión de contaminantes. Presiones típicas: 1,200 a 2,000 bar."
  },
  {
    title: "¿Cuál es la diferencia entre Common Rail Diesel y Common Rail Gasolina?",
    keywords: ["common rail", "diesel", "gasolina", "diferencia"],
    answer: "Diesel: presión 1,200-2,000 bar, inyectores solenoide o piezo, inyección por compresión. Gasolina: presión 300-500 bar típicamente en DI (inyección directa), inyectores principalmente solenoide, inyección por chispa. El diesel requiere presiones mucho mayores debido a la naturaleza de la combustión."
  },
  
  // Tipos de Inyectores
  {
    title: "¿Cuáles son los tipos de inyectores Common Rail?",
    keywords: ["tipos", "inyectores", "solenoide", "piezo"],
    answer: "1. Inyectores Solenoide: usan electroimán, respuesta más lenta, costo menor. 2. Inyectores Piezo: usan cristales piezoeléctricos, respuesta ultrarrápida (µs), mejor control, mayor precisión. 3. EUI (Unit Injector): inyector electrónico unitario. Requieren distintos bancos de prueba y parámetros de medición."
  },
  {
    title: "¿Qué diferencia hay entre inyectores piezo y solenoide?",
    keywords: ["piezo", "solenoide", "diferencia", "velocidad", "respuesta"],
    answer: "Piezo: tiempo de respuesta < 0.1ms, multi-inyecciones posibles, mayor precisión, costo alto. Solenoide: tiempo de respuesta 1-2ms, una inyección principal, menor costo. Medición RLC diferente, voltajes de comando diferentes. Los piezos requieren amplificadores especiales."
  },
  
  // Mediciones RLC
  {
    title: "¿Qué es la medición RLC en inyectores?",
    keywords: ["RLC", "medición", "resistencia", "inductancia", "capacitancia"],
    answer: "RLC mide las propiedades eléctricas del inyector: R (Resistencia) en Ohms, L (Inductancia) en mH, C (Capacitancia) en µF. Estos valores identifican el tipo de inyector, detectan cortocircuitos internos y validez del componente. Valores fuera de rango indican daño o pieza defectuosa."
  },
  {
    title: "¿Cuáles son valores RLC normales en inyectores solenoide?",
    keywords: ["RLC", "solenoide", "valores", "normal", "rango"],
    answer: "Solenoide típico: R = 10-16 Ohms, L = 1.8-2.5 mH, C < 0.5 µF. Varían por fabricante y modelo. Resistencia 0 Ohms = cortocircuito. Resistencia ∞ = circuito abierto. L baja o nula = bobina dañada. C elevada = fallo de aislamiento."
  },
  {
    title: "¿Cuáles son valores RLC normales en inyectores piezo?",
    keywords: ["RLC", "piezo", "valores", "normal", "rango"],
    answer: "Piezo típico: R = 1-20 Ohms (muy variable), L = 0.5-3 mH, C = 100-600 nF (muy variable). Piezos tienen características capacitivas altas. Valores fuera de rango riesgo de fallo. Necesitan medidor especializado. Comparar siempre con especificación del fabricante."
  },
  
  // Punto Bip
  {
    title: "¿Qué es el Punto Bip en inyectores?",
    keywords: ["punto bip", "bip", "presión", "inyección", "apertura"],
    answer: "Punto Bip es la presión mínima a la que el inyector comienza a inyectar combustible. Se mide en bar. En bancos de prueba, se incrementa presión lentamente hasta escuchar/detectar el primer sonido (bip). Si está fuera de especificación, el inyector no abre correctamente. Afecta directamente el funcionamiento del motor."
  },
  {
    title: "¿Cuál es el rango normal de Punto Bip en Common Rail?",
    keywords: ["punto bip", "rango", "bar", "especificación"],
    answer: "Varía por fabricante y modelo. Típicamente: Diesel CR 600-800 bar, Gasolina CR 300-450 bar. Tolerancia usualmente ±10-15 bar. Bip bajo = inyección débil o prematura. Bip alto = inicio retrasado, posible no-inyección. Verificar contra tabla de especificaciones del fabricante."
  },
  
  // NOP (Nozzle Open Pressure)
  {
    title: "¿Qué es NOP (Nozzle Open Pressure)?",
    keywords: ["NOP", "nozzle open pressure", "presión apertura", "aguja"],
    answer: "NOP es la Presión de Apertura de la Tobera (aguja del inyector). Es la presión mínima necesaria para que la aguja se levante completamente y comience a pulverizar combustible. Diferente del Punto Bip. Es más preciso y crítico para diagnosticar desgaste de la aguja y el asiento."
  },
  {
    title: "¿Cuál es la diferencia entre Punto Bip y NOP?",
    keywords: ["punto bip", "NOP", "diferencia", "medición"],
    answer: "Punto Bip: presión del primer sonido (inicio de movimiento). NOP: presión de apertura completa de la aguja (máxima pulverización). NOP > Punto Bip generalmente. Bip puede ser 300 bar, NOP 350 bar por ejemplo. Dan información complementaria: Bip lento = guía desgastada, Bip y NOP distantes = válvula debilitada."
  },
  
  // MST (Measure Start Time)
  {
    title: "¿Qué es MST (Measure Start Time)?",
    keywords: ["MST", "measure start time", "tiempo inicio medición"],
    answer: "MST es el Tiempo de Inicio la Medición en respuesta de inyección. Mide el tiempo que tarda el inyector en responder desde que recibe la orden eléctrica hasta que comienza la inyección de combustible. Valores típicos en microsegundos (µs). Fuera de rango indica lentitud o fallo en respuesta."
  },
  {
    title: "¿Cuáles son valores normales de MST en inyectores?",
    keywords: ["MST", "valores", "tiempo", "microsegundos", "normal"],
    answer: "Solenoide: típicamente 100-500 µs (1-5 ms). Piezo: < 100 µs (ultrarrápido). Varían por fabricante. Aumento de MST indica desgaste o cambios en viscosidad del combustible. Si MST muy alto = respuesta lenta = pobre atomización, combustión deficiente y contaminación."
  },
  
  // Procedimientos de Medición
  {
    title: "¿Cómo se realiza una medición RLC en un inyector?",
    keywords: ["medición RLC", "procedimiento", "pasos", "cómo"],
    answer: "1. Desmontar inyector limpio. 2. Conectar conectores del inyector al medidor RLC multiparámetro. 3. Seleccionar modo RLC o resistencia según equipo. 4. Tomar lectura. 5. Anotar valores. 6. Comparar con especificación de fabricante. 7. Si fuera de rango = rechazar. Importante: usar conectores limpios, evitar soldaduras."
  },
  {
    title: "¿Cuál es la forma correcta de medir Punto Bip en banco de prueba?",
    keywords: ["punto bip", "banco", "medición", "procedimiento"],
    answer: "1. Montar inyector en banco CR con antecámara. 2. Llenar depósito con diesel de referencia. 3. Conectar inyector a controlador de presión. 4. Incrementar presión lentamente (1-5 bar/seg). 5. Escuchar el primer chasquido o 'bip'. 6. Anotar presión exacta. 7. Repetir 3 veces. Promediar. Especificación suele ±5-10 bar."
  },
  {
    title: "¿Cómo se mide NOP en banco de prueba Common Rail?",
    keywords: ["NOP", "banco", "medición", "procedimiento"],
    answer: "1. Inyector montado en antecámara con aguja instruida. 2. Aumentar presión hasta que aguja levante completamente. 3. Puede usarse transductor de presión o sensor visual. 4. Anotar presión exacta de levante completo. 5. Repetir varias veces. 6. Comparar con especificación. Diferencia bip-NOP debe ser típicamente ±30-50 bar según diseño."
  },
  {
    title: "¿Cuál es el procedimiento para medir MST?",
    keywords: ["MST", "medición", "procedimiento", "tiempo respuesta"],
    answer: "1. Inyector en banco con sensor de respuesta (óptico o inductivo). 2. Aplicar pulso eléctrico calibrado. 3. Cronometrar desde pulso hasta detección de movimiento/flujo. 4. Instrumento mide automáticamente en microsegundos. 5. Repetir múltiples pulsos (típicamente 10). Promediar. 6. Comparar con rango especificado. MST ↑ = posible desgaste."
  },
  
  // Problemas Comunes
  {
    title: "¿Cuáles son problemas comunes en inyectores Common Rail?",
    keywords: ["problemas", "fallas", "común", "síntomas"],
    answer: "1. Depósito de carbón: bloqueo parcial, flujo irregular. 2. Desgaste de aguja: pérdida de hermeticidad, goteo. 3. Fallo eléctrico: bobina cortocircuitada o abierta. 4. Cavitación: erosión de componentes internos. 5. Acumulación de agua: corrosión interna. 6. Desgaste de guía: respuesta lenta, dispersión."
  },
  {
    title: "¿Qué indica un inyector con Punto Bip muy alto?",
    keywords: ["punto bip alto", "síntoma", "diagnóstico"],
    answer: "Punto Bip elevado indica: 1. Acumulación de depósito en asiento/aguja. 2. Desgaste de resorte principal. 3. Sucio combustible. 4. Posible inyección retrasada o incompleta. 5. Mayor consumo de combustible. 6. Emisiones elevadas. Limpiar o reemplazar según evaluación completa."
  },
  {
    title: "¿Qué significa RLC con resistencia en 0 Ohms?",
    keywords: ["RLC", "resistencia cero", "cortocircuito", "fallo"],
    answer: "Resistencia 0 Ohms = Cortocircuito interno. La bobina o circuito eléctrico tiene continuidad sin oposición. Causas: aislamiento fallido, bobina dañada, conexión indebida. Inyector NO SIRVE, requiere reemplazo. No intentar reparar, riesgo de incendio en banco de pruebas."
  },
  {
    title: "¿Qué significa RLC con resistencia en infinito?",
    keywords: ["RLC", "resistencia infinita", "circuito abierto"],
    answer: "Resistencia ∞ = Circuito Abierto. No hay continuidad. Causas: bobina quemada, conexión suelta, soldadura rota, devanado roto. Inyector NO FUNCIONA. No inyecta. Requiere reemplazo. Verificar conectores antes de descartar."
  },
  
  // Limpieza y Mantenimiento
  {
    title: "¿Cuál es el procedimiento correcto para limpiar inyectores?",
    keywords: ["limpiar", "limpieza", "procedimiento", "mantenimiento"],
    answer: "1. Desmontar inyector. 2. Inspeccionar exterior por daño. 3. Lavado ultrasónico en solvente de limpieza especializado (diesel limpio o gasolina). 20-30 minutos típicamente. 4. Secado con aire comprimido seco. 5. NO usar agua ni solventes fuertes que dañen sellos. 6. Inspeccionar aguja, no debe rallarse. 7. Si daño visible, reemplazar."
  },
  {
    title: "¿Cada cuánto hay que hacer mantenimiento de inyectores?",
    keywords: ["mantenimiento", "intervalo", "cada cuanto", "servicios"],
    answer: "Recomendaciones típicas: 1. Inspección visual cada 60,000 km. 2. Limpieza ultrasónica cada 150,000-200,000 km. 3. Reemplazo si desgaste evidente cada 250,000-400,000 km según motor. Depende: combustible calidad, condiciones conducción, tipo motor. Motores con problemas pueden requerir más frecuencia."
  },
  
  // Diesel vs Gasolina
  {
    title: "¿Cuáles son especificaciones diferentes entre inyectores Diesel CR y Gasolina CR?",
    keywords: ["diesel", "gasolina", "diferencia especificación", "CR"],
    answer: "Diesel: presión operativa 1,200-2,000 bar, tiempo de inyección 0.5-3 ms, patrón multipulso, boquilla robusta. Gasolina: presión 300-500 bar, tiempo inyección 3-8 ms, patrón simple o doble, boquilla más fina. Conectores diferentes. Tolerancias más estrictas en diesel. No Son intercambiables."
  },
  {
    title: "¿Por qué los inyectores diesel requieren mayor presión que gasolina?",
    keywords: ["presión", "diesel", "gasolina", "por qué", "razón"],
    answer: "Diesel: combustión por compresión, requiere pulverización fina y penetración en cámara a alta compresión (15-18:1), necesita 1,200+ bar para atomización y mezcla óptima. Gasolina: combustión por chispa, 8-10:1 compresión, necesita menos relación presión/volumen. Mayor presión = mejor eficiencia y control en diesel."
  },
  
  // Problemas de Inyectores - Detalles
  {
    title: "¿Cómo detectar un inyector pegado o bloqueado?",
    keywords: ["pegado", "bloqueado", "falla", "síntoma", "detectar"],
    answer: "Síntomas: 1. Falta de potencia en cilindro específico. 2. Humo negro o excesivo. 3. Consumo alto de combustible. 4. Vibración en ralentí. 5. Dificultad al arrancar. 6. En banco: sin pulverización. 7. RLC normal pero no inyecta. 8. Prueba: presurizar con combustible limpio. Si no mejora, requiere reconstrucción o remplazo."
  },
  {
    title: "¿Qué causa la cavitación en inyectores?",
    keywords: ["cavitación", "erosión", "daño", "causa"],
    answer: "Cavitación es la formación de burbujas en el combustible a alta velocidad. Causas: 1. Presión demasiado baja. 2. Gasolina de pobre calidad. 3. Entrada al inyector obstruida. 4. Daño en la bomba. Consecuencias: erosión interna, perforación de componentes, fallo prematuro. Prevención: mantener presión correcta, usar combustible certificado."
  },
  {
    title: "¿Por qué un inyector gotea combustible?",
    keywords: ["goteo", "fuga", "combustible", "por qué"],
    answer: "Causas de goteo: 1. Aguja desgastada - no sella completamente. 2. Asiento erosionado - desgaste en la tobera. 3. Depósito de carbón - pequeños bloques. 4. Presión del retorno alta - causa salpicado. 5. Resorte principal debilitado. Consecuencias: pérdida de potencia, sobrecalentamiento del motor, consumo alto. Solución: limpiar o reemplazar."
  },
  {
    title: "¿Cómo afecta la calidad del combustible a los inyectores?",
    keywords: ["combustible", "calidad", "gasolina", "diesel", "afecta"],
    answer: "Combustible de mala calidad causa: 1. Depósitos de carbón y goma. 2. Envejecimiento de sellos. 3. Corrosión de piezas. 4. Aumento de partículas en oleo. 5. Mayor viscosidad - respuesta lenta. 6. Biodiésel > 5% = problemas con sellos antiguos. Solución: usar carburantes de marcas reputadas, filtros adecuados, aditivos limpiadores."
  },
  
  // Marcas y Fabricantes
  {
    title: "¿Cuáles son los principales fabricantes de inyectores Common Rail?",
    keywords: ["fabricantes", "marcas", "bosch", "denso", "delphi"],
    answer: "Principales proveedores: 1. Bosch - 60% del mercado, iCR, CRI2 (Diesel), GDI (Gasolina). 2. Denso - inyectores piezo de alta precisión. 3. Delphi - inyectores robustos. 4. Siemens/Continental - sistemas integrados. 5. Valvetronic/Waterman - repuesto adaptable. Cada marca tiene especificaciones únicas, no son intercambiables."
  },
  {
    title: "¿Cómo identificar un inyector Bosch iCR original?",
    keywords: ["bosch", "icr", "original", "identificar", "falsificación"],
    answer: "Características de Bosch iCR original: 1. Sello de seguridad visible. 2. Marcado claro con número de parte. 3. Conector robusto sin deformaciones. 4. Peso específico (típicamente 180-220g según versión). 5. Resistencia RLC coherente. 6. Serial en cuerpo. Falsificaciones: sellos deficientes, numeración borrosa, conectores débiles, RLC fuera de rango."
  },
  {
    title: "¿Cuáles son modelos de inyectores Denso piezo más comunes?",
    keywords: ["denso", "piezo", "modelos", "common rail"],
    answer: "Denso Common Rail piezo: 1. DCRP311880 - Hyundai, Kia. 2. DCRP311881 - Isuzu, Mitsubishi. 3. DCRP316250 - Hino, Toyota. 4. DCRP315220 - Mercedes, BMW. 5. DCRP311891 - Nissan. Cada modelo tiene parámetros RLC, NOP, MST específicos. Denso mantiene estándares muy altos. Falsificaciones raras pero verificar origen."
  },
  
  // Banco de Pruebas
  {
    title: "¿Cuáles son funciones principales de un banco de pruebas Common Rail?",
    keywords: ["banco", "pruebas", "equipo", "funciones"],
    answer: "Funciones críticas: 1. Generación de presión 0-3000 bar controlada. 2. Medición RLC eléctrica. 3. Detección de Punto Bip automática. 4. Medición de NOP precisamente. 5. Cálculo de MST. 6. Análisis de patrón de pulverización. 7. Prueba de respuesta a múltiples pulsos. 8. Registro de datos. 9. Comparación contra especificaciones. 10. Certificado de prueba."
  },
  {
    title: "¿Qué equipamiento mínimo necesito para calibración de inyectores?",
    keywords: ["equipamiento", "herramientas", "necesario", "calibración"],
    answer: "Mínimo: 1. Banco de pruebas Common Rail (100k+ USD). 2. Medidor RLC multiparámetro (500-2000 USD). 3. Ultrasonido para limpieza (2000-5000 USD). 4. Micrometría (calibre 0.01mm). 5. Combustible de referencia (diesel/gasolina pura). 6. Solventes especializados. 7. Aire comprimido seco y filtrado. 8. Conectores de prueba standard. Inversión total: 120k-150k USD mínimo."
  },
  
  // Legislación y Normas
  {
    title: "¿Qué normas internacionales regulan inyectores Common Rail?",
    keywords: ["normas", "ISO", "EURO", "regulación", "legislación"],
    answer: "Normas principales: 1. ISO 10012 - metrología y calibración. 2. ISO 13849 - seguridad de máquinas. 3. EURO VI - emisiones de gases. 4. SAE J1703 - diesel marino. 5. Especificaciones OEM (Bosch, Denso, etc.). 6. Protocolos ISO 9001 - sistemas de calidad. Cumplimiento obligatorio para servicio autorizado y certificación de técnicos."
  },
  
  // Capacitación
  {
    title: "¿Cuál es la capacitación recomendada para técnico en inyectores?",
    keywords: ["capacitación", "entrenamiento", "técnico", "certificación"],
    answer: "Ruta recomendada: 1. Curso básico mecánica diesel (40 horas). 2. Fundamentos Common Rail (30 horas). 3. Operación banco de pruebas (40 horas prácticas). 4. Medición RLC y diagnóstico (30 horas). 5. Calibración y reconstrucción (60+ horas prácticas). 6. Especialización por marca (Bosch, Denso). Certificaciones: fabricante + ISO. Tiempo total: 6-12 meses."
  },
  {
    title: "¿Dónde puedo conseguir repuestos originales de inyectores?",
    keywords: ["repuestos", "comprar", "distribuidor", "proveedor"],
    answer: "Canales recomendados: 1. Distribuidores autoriza dos OEM (piezas garantizadas). 2. Bosch Service (red global). 3. Denso Technical. 4. Delphi Parts. 5. Proveedores certificados ISO 9001 (verificar). 6. No comprar en plataformas chinas - falsificaciones. 7. Solicitar certificado de autenticidad. 8. Precios: inyector original 50-200 USD según modelo."
  }
];

async function seedKnowledgeBase() {
  try {
    console.log("🔄 Iniciando carga de conocimiento GAIA...");
    
    // Get admin user (assuming first admin or specific user)
    const { data: adminData, error: adminError } = await supabase
      .from('users')
      .select('id')
      .eq('rol', 'admin')
      .limit(1)
      .single();
    
    if (adminError || !adminData) {
      console.warn("⚠️ No admin found, skipping created_by field");
    }
    
    const adminId = adminData?.id || null;
    
    // Insert KB items
    for (const item of kbItems) {
      const { error } = await supabase
        .from('assistant_kb')
        .insert({
          title: item.title,
          keywords: item.keywords,
          answer: item.answer,
          active: true,
          created_by: adminId
        });
      
      if (error) {
        console.error(`❌ Error insertando "${item.title}":`, error.message);
      } else {
        console.log(`✅ "${item.title}"`);
      }
    }
    
    console.log(`\n✨ Carga completa: ${kbItems.length} artículos de conocimiento`);
  } catch (err) {
    console.error("❌ Error fatal:", err);
    process.exit(1);
  }
}

seedKnowledgeBase();
