import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const articles = [
  {
    title: "Inyector Bosch 0445110250 - Especificaciones Técnicas Completas Common Rail Diesel (Versión Coloreada)",
    keywords: [
      "0445110250",
      "bosch 0445110250 color",
      "inyector 0445110250 formateado",
      "voltaje 0445110250",
      "especificaciones formateadas"
    ],
    answer: `<span style="color:#FF6B6B"><b>🔍 IDENTIFICACION</b></span>
Número de Parte: <span style="color:#4ECDC4"><b>Bosch 0445 110 250</b></span>
Familia: Common Rail Diesel Generation 2 (CRI 2.2)
Fabricante: Robert Bosch GmbH
Tipo: Solenoide electromagnético

<span style="color:#FFD93D"><b>🚗 APLICACIONES VEHICULARES</b></span>
<span style="color:#6C5CE7"><b>Marca/Modelo Principal:</b></span>
• Hyundai Santa Fe 2.2 CRDi (D4EB engine) 2006-2010
• Hyundai Tucson 2.0 CRDi (D4EA engine) 2004-2009
• Kia Sportage 2.0 CRDi (D4EA engine) 2004-2010
• Kia Sorento 2.5 CRDi (D4CB engine) 2006-2009

<span style="color:#6C5CE7"><b>Motores Compatibles:</b></span>
• D4EA (2.0L diesel)
• D4EB (2.2L diesel)
• D4CB (2.5L diesel)

<span style="color:#FF6B6B"><b>⚡ ESPECIFICACIONES ELECTRICAS</b></span>

<span style="color:#00B894"><b>Voltaje Operación:</b></span>
• <span style="color:#FF6B6B"><b>Voltaje Alimentación: 12V DC nominal</b></span>
• Rango Trabajo: 10.5V - 15.0V
• Voltaje Mínimo Funcional: 9.0V (degradado)
• Voltaje Máximo: 16.0V (puede dañar solenoide)

<span style="color:#00B894"><b>Corriente Consumo:</b></span>
• <span style="color:#FF6B6B"><b>Corriente Pico Apertura: 18-22 Amperios</b></span>
• Duración Pico: 0.3-0.5 milisegundos
• <span style="color:#FF6B6B"><b>Corriente Hold (Mantenimiento): 10-14 Amperios</b></span>
• Corriente Promedio: 12 Amperios típico

<span style="color:#00B894"><b>Resistencia Bobina Solenoide:</b></span>
• <span style="color:#FF6B6B"><b>Resistencia a 20°C: 0.45-0.55 ohms</b></span>
• Resistencia Típica: 0.50 ohms
• Resistencia a 80°C: 0.55-0.65 ohms (aumenta con temperatura)

<span style="color:#00B894"><b>Inductancia:</b></span>
• Inductancia Bobina: 180-220 microhenrios (µH)
• Típica: 200 µH

<span style="color:#00B894"><b>Driver ECU:</b></span>
• Tipo Control: Peak-and-Hold especializado diesel
• Frecuencia PWM Hold: 1-5 kHz
• Protección: Limitación corriente, protección térmica

<span style="color:#A29BFE"><b>⚙️ ESPECIFICACIONES MECANICAS</b></span>

<span style="color:#00B894"><b>Presión Operación:</b></span>
• <span style="color:#FF6B6B"><b>Presión Rail Mínima: 200 bar (2900 PSI)</b></span>
• <span style="color:#FF6B6B"><b>Presión Rail Máxima: 1600 bar (23,200 PSI)</b></span>
• Presión Típica Ralentí: 300-400 bar
• Presión Típica Crucero: 600-900 bar
• Presión Máxima Carga: 1400-1600 bar

<span style="color:#00B894"><b>Caudal Inyección:</b></span>
• Flujo Nominal: 1000-1200 mg/ciclo (máximo)
• Ralentí: 8-15 mg/ciclo
• Crucero: 20-40 mg/ciclo
• Alta Carga: 60-100 mg/ciclo
• WOT: 100-120 mg/ciclo

<span style="color:#00B894"><b>Tiempos Respuesta:</b></span>
• Tiempo Apertura (Opening Time): 0.35-0.50 ms
• Tiempo Cierre (Closing Time): 0.25-0.40 ms
• Tiempo Respuesta Total: 0.60-0.90 ms
• Tiempo Mínimo Inyección: 0.15 ms

<span style="color:#00B894"><b>Características Físicas:</b></span>
• Longitud Total: 127.5 mm
• Diámetro Cuerpo: 17.0 mm
• Peso: 195 gramos aproximadamente
• Material Cuerpo: Acero inoxidable
• <span style="color:#FF6B6B"><b>Orificios Spray: 7 orificios</b></span>
• <span style="color:#FF6B6B"><b>Diámetro Orificios: 0.135 mm cada uno</b></span>
• <span style="color:#FF6B6B"><b>Ángulo Spray: 152° total (cónico)</b></span>

<span style="color:#FF6B6B"><b>📊 PATRON INYECCION MULTIPLE</b></span>

<span style="color:#00B894"><b>Capacidad Inyecciones por Ciclo:</b></span>
• Generación CRI 2.2: Hasta 5 inyecciones

<span style="color:#00B894"><b>Estrategia Típica:</b></span>
1. <span style="color:#FF6B6B"><b>Pre-Inyección Piloto:</b></span> 1-2 mg (reduce ruido combustión)
2. <span style="color:#FF6B6B"><b>Inyección Piloto:</b></span> 3-6 mg (suaviza arranque combustión)
3. <span style="color:#FF6B6B"><b>Inyección Principal:</b></span> 25-95 mg (genera potencia)
4. <span style="color:#FF6B6B"><b>Post-Inyección 1:</b></span> 2-5 mg (reduce NOx, mejora emisiones)
5. <span style="color:#FF6B6B"><b>Post-Inyección 2:</b></span> 3-8 mg (regeneración DPF, limpieza catalizador)

<span style="color:#6C5CE7"><b>🔧 DIAGNOSTICO ELECTRICO - PRUEBA 1</b></span>
<span style="color:#00B894"><b>Resistencia Bobina Solenoide</b></span>

<span style="color:#FFD93D"><b>Especificación 0445110250:</b></span>
• <span style="color:#FF6B6B"><b>Resistencia Normal: 0.45-0.55 ohms</b></span>
• Valor Típico: 0.50 ohms

<span style="color:#FFD93D"><b>Interpretación de Resultados:</b></span>
• ✓ Si 0.45-0.55 ohms: <span style="color:#00B894">Bobina OK</span>
• ⚠️ Si 0.30-0.44 ohms: Posible cortocircuito interno parcial
• ✗ Si <0.30 ohms: <span style="color:#FF6B6B">Cortocircuito severo, reemplazar</span>
• ⚠️ Si >0.60 ohms: Bobina degradada, verificar conexión
• ✗ Si >1.0 ohm: <span style="color:#FF6B6B">Bobina en proceso falla</span>
• ✗ Si infinito (OL): <span style="color:#FF6B6B">Circuito abierto, reemplazar inmediatamente</span>

<span style="color:#6C5CE7"><b>🔧 DIAGNOSTICO ELECTRICO - PRUEBA 5</b></span>
<span style="color:#00B894"><b>Test de Balance con Escáner</b></span>

<span style="color:#FFD93D"><b>Especificación Bosch 0445110250:</b></span>
• <span style="color:#FF6B6B"><b>Valor Normal: -3.0 a +3.0 mg/stroke por cilindro</b></span>
• Diferencia Entre Cilindros: <2.0 mg/stroke

<span style="color:#FFD93D"><b>Ejemplo Normal (Motor 4 Cilindros):</b></span>
• Cilindro 1: +0.8 mg/stroke
• Cilindro 2: -0.5 mg/stroke
• Cilindro 3: +1.2 mg/stroke
• Cilindro 4: -0.3 mg/stroke
→ Diferencia máxima: 1.7 mg <span style="color:#00B894">✓ OK</span>

<span style="color:#A29BFE"><b>⚠️ FALLAS COMUNES 0445110250</b></span>

<span style="color:#FF6B6B"><b>FALLA 1: Válvula Control Bloqueada</b></span>
<span style="color:#FFD93D"><b>Síntomas:</b></span> Cilindro específico no funciona, humo negro, pérdida potencia, Código P020X

<span style="color:#FFD93D"><b>Solución:</b></span> Limpieza ultrasónica (40-60% éxito) o reemplazo inyector

<span style="color:#FF6B6B"><b>FALLA 2: Asiento Aguja Desgastado (Goteo Interno)</b></span>
<span style="color:#FFD93D"><b>Síntomas:</b></span> Humo blanco al arrancar, ralentí irregular, difícil arranque caliente

<span style="color:#FFD93D"><b>Solución:</b></span> <span style="color:#FF6B6B">REEMPLAZO inyector (no reparable)</span>

<span style="color:#FF6B6B"><b>FALLA 3: Orificios Spray Erosionados</b></span>
<span style="color:#FFD93D"><b>Síntomas:</b></span> Pérdida potencia gradual, aumento consumo, humo negro en aceleración, P0300 + P0087

<span style="color:#FFD93D"><b>Solución:</b></span> <span style="color:#FF6B6B">REEMPLAZO inyector</span>

<span style="color:#FF6B6B"><b>FALLA 4: Bobina Solenoide en Cortocircuito</b></span>
<span style="color:#FFD93D"><b>Síntomas:</b></span> Fusible quemado, Código P020X + P0685, motor no arranca

<span style="color:#FFD93D"><b>Solución:</b></span> <span style="color:#FF6B6B">REEMPLAZO inyector + verificar driver ECU</span>

<span style="color:#FF6B6B"><b>FALLA 5: Contaminación Agua en Combustible</b></span>
<span style="color:#FFD93D"><b>Síntomas:</b></span> Múltiples inyectores afectados, pérdida potencia severa, humo blanco, no arranca

<span style="color:#FFD93D"><b>Solución:</b></span> Drenar combustible, reemplazar filtros, <span style="color:#FF6B6B">REEMPLAZO inyectores (generalmente todos)</span>, verificar bomba

<span style="color:#6C5CE7"><b>💰 COSTO APROXIMADO REPARACION</b></span>

<span style="color:#FFD93D"><b>Inyector Individual:</b></span>
• Bosch Original: <span style="color:#FF6B6B"><b>$280-$400 USD</b></span>
• Mano Obra Reemplazo: <span style="color:#FF6B6B"><b>$120-$200 USD</b></span>
• Sub-total: $400-$600 USD

<span style="color:#FFD93D"><b>Set Completo (4 inyectores):</b></span>
• 4x Inyectores Bosch: <span style="color:#FF6B6B"><b>$1,120-$1,600 USD</b></span>
• Mano Obra Set Completo: <span style="color:#FF6B6B"><b>$300-$500 USD</b></span>
• Codificación: $50-$150 USD
• Filtros Combustible: $40-$80 USD
• <span style="color:#FF6B6B"><b>Total: $1,510-$2,330 USD</b></span>

<span style="color:#FFD93D"><b>RECOMENDACION:</b></span>
Si >150,000 km: <span style="color:#FF6B6B"><b>Reemplazar set completo</b></span> (otros próximos a fallar)
Si <100,000 km: Individual aceptable

<span style="color:#00B894"><b>✅ RESUMEN CLAVE 0445110250</b></span>
• Voltaje: <span style="color:#FF6B6B"><b>12V DC</b></span>
• Resistencia: <span style="color:#FF6B6B"><b>0.45-0.55 Ω</b></span> (a 20°C)
• Corriente Pico: <span style="color:#FF6B6B"><b>18-22 A</b></span>
• Presión: <span style="color:#FF6B6B"><b>200-1600 bar</b></span>
• Orificios: <span style="color:#FF6B6B"><b>7 orificios (0.135mm)</b></span>
• Aplicación: <span style="color:#FF6B6B"><b>Hyundai/Kia 2.0-2.5L CRDi</b></span>
• Vida Útil: <span style="color:#FF6B6B"><b>200,000-300,000 km</b></span>
`
  }
];

async function loadArticles() {
  console.log('Iniciando carga de Artículo Formateado con Colores...');
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
  console.log('✅ Proceso completado - Artículo Formateado');
  console.log(`Total procesado: ${articles.length} artículos`);
  console.log('');
  console.log('FORMATO APLICADO:');
  console.log('🔍 SECCIONES PRINCIPALES - Rojo oscuro (#FF6B6B)');
  console.log('⚙️ SUBSECCIONES - Verde (#00B894)');
  console.log('📊 DATOS CRÍTICOS - Rojo brillante (#FF6B6B)');
  console.log('💰 COSTOS - Amarillo (#FFD93D)');
  console.log('⚠️ ADVERTENCIAS - Rojo para peligro (#FF6B6B)');
  console.log('✅ CONFIRMACIONES - Verde para OK');
  console.log('');
  console.log('Emojis añadidos para identificación visual rápida');
}

loadArticles();
