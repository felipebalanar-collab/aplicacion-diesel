import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const articles = [
  {
    title: "Inyector Bosch 0445110250 - Especificaciones Técnicas Completas Common Rail Diesel",
    keywords: [
      "0445110250",
      "bosch 0445110250",
      "inyector 0445110250",
      "voltaje 0445110250",
      "especificaciones 0445110250",
      "common rail 0445110250",
      "diesel 0445110250"
    ],
    answer: `
[IDENTIFICACION]
Número de Parte: Bosch 0445 110 250
Familia: Common Rail Diesel Generation 2 (CRI 2.2)
Fabricante: Robert Bosch GmbH
Tipo: Solenoide electromagnético

[APLICACIONES VEHICULARES]

Marca/Modelo Principal:
- Hyundai Santa Fe 2.2 CRDi (D4EB engine) 2006-2010
- Hyundai Tucson 2.0 CRDi (D4EA engine) 2004-2009
- Kia Sportage 2.0 CRDi (D4EA engine) 2004-2010
- Kia Sorento 2.5 CRDi (D4CB engine) 2006-2009

Motores Compatibles:
- D4EA (2.0L diesel)
- D4EB (2.2L diesel)
- D4CB (2.5L diesel)

[ESPECIFICACIONES ELECTRICAS]

Voltaje Operación:
- Voltaje Alimentación: 12V DC nominal
- Rango Trabajo: 10.5V - 15.0V
- Voltaje Mínimo Funcional: 9.0V (degradado)
- Voltaje Máximo: 16.0V (puede dañar solenoide)

Corriente Consumo:
- Corriente Pico Apertura: 18-22 Amperios
- Duración Pico: 0.3-0.5 milisegundos
- Corriente Hold (Mantenimiento): 10-14 Amperios
- Corriente Promedio: 12 Amperios típico

Resistencia Bobina Solenoide:
- Resistencia a 20°C: 0.45-0.55 ohms
- Resistencia Típica: 0.50 ohms
- Resistencia a 80°C: 0.55-0.65 ohms (aumenta con temperatura)

Inductancia:
- Inductancia Bobina: 180-220 microhenrios (µH)
- Típica: 200 µH

Driver ECU:
- Tipo Control: Peak-and-Hold especializado diesel
- Frecuencia PWM Hold: 1-5 kHz
- Protección: Limitación corriente, protección térmica

[ESPECIFICACIONES MECANICAS]

Presión Operación:
- Presión Rail Mínima: 200 bar (2900 PSI)
- Presión Rail Máxima: 1600 bar (23,200 PSI)
- Presión Típica Ralentí: 300-400 bar
- Presión Típica Crucero: 600-900 bar
- Presión Máxima Carga: 1400-1600 bar

Caudal Inyección:
- Flujo Nominal: 1000-1200 mg/ciclo (máximo)
- Ralentí: 8-15 mg/ciclo
- Crucero: 20-40 mg/ciclo
- Alta Carga: 60-100 mg/ciclo
- WOT: 100-120 mg/ciclo

Tiempos Respuesta:
- Tiempo Apertura (Opening Time): 0.35-0.50 ms
- Tiempo Cierre (Closing Time): 0.25-0.40 ms
- Tiempo Respuesta Total: 0.60-0.90 ms
- Tiempo Mínimo Inyección: 0.15 ms

Características Físicas:
- Longitud Total: 127.5 mm
- Diámetro Cuerpo: 17.0 mm
- Peso: 195 gramos aproximadamente
- Material Cuerpo: Acero inoxidable
- Orificios Spray: 7 orificios
- Diámetro Orificios: 0.135 mm cada uno
- Ángulo Spray: 152° total (cónico)

[PATRON INYECCION MULTIPLE]

Capacidad Inyecciones por Ciclo:
- Generación CRI 2.2: Hasta 5 inyecciones

Estrategia Típica:
1. Pre-Inyección Piloto: 1-2 mg (reduce ruido combustión)
2. Inyección Piloto: 3-6 mg (suaviza arranque combustión)
3. Inyección Principal: 25-95 mg (genera potencia)
4. Post-Inyección 1: 2-5 mg (reduce NOx, mejora emisiones)
5. Post-Inyección 2: 3-8 mg (regeneración DPF, limpieza catalizador)

[DIAGNOSTICO ELECTRICO]

PRUEBA 1: Resistencia Bobina Solenoide

Equipamiento:
- Multímetro digital (DVOM) resolución 0.1 ohm

Procedimiento:
1. Motor apagado, llave OFF
2. Desconectar conector eléctrico inyector (2 pines)
3. Medir resistencia entre Terminal 1 (+) y Terminal 2 (-)
4. Temperatura ambiente (20°C)

Especificación 0445110250:
- Resistencia Normal: 0.45-0.55 ohms
- Valor Típico: 0.50 ohms

Interpretación:
- Si 0.45-0.55 ohms: ✓ Bobina OK
- Si 0.30-0.44 ohms: Posible cortocircuito interno parcial
- Si <0.30 ohms: ✗ Cortocircuito severo, reemplazar
- Si >0.60 ohms: Bobina degradada, verificar conexión
- Si >1.0 ohm: ✗ Bobina en proceso falla
- Si infinito (OL): ✗ Circuito abierto, reemplazar inmediatamente

PRUEBA 2: Aislamiento a Tierra (Masa)

Procedimiento:
1. Conector inyector desconectado
2. Medir resistencia entre cada terminal y cuerpo metálico inyector

Especificación:
- Resistencia Terminal→Tierra: >10 Megaohms (infinito en DVOM normal)

Interpretación:
- Si infinito: ✓ Aislamiento OK
- Si <1 Megaohm: ✗ Fuga a tierra, reemplazar

PRUEBA 3: Voltaje Alimentación ECU

Equipamiento:
- Multímetro, motor encendido

Procedimiento:
1. Conector inyector desconectado
2. Llave ON, motor apagado
3. Medir voltaje en conector cableado (lado ECU)
4. Terminal positivo debe mostrar voltaje batería

Especificación:
- Llave ON, motor OFF: 12.0-12.8V
- Motor en marcha, ralentí: 13.5-14.5V
- Motor en marcha, 2000 RPM: 13.8-14.8V

Si voltaje bajo (<11V):
- Verificar: Batería, alternador, conexiones, relay inyectores

PRUEBA 4: Señal Control con Osciloscopio

Equipamiento:
- Osciloscopio automotriz mínimo 20 MHz, 100 MS/s
- Pinza corriente o sonda voltaje

Configuración:
- Canal 1: Sonda voltaje en Terminal positivo inyector (backprobe)
- Canal 2 (opcional): Pinza corriente en cable positivo
- Escala Voltaje: 5V/división
- Escala Corriente: 10A/división
- Escala Tiempo: 2 ms/división
- Trigger: Flanco descendente voltaje, nivel 6V

Patrón Normal Voltaje (Ralentí 800 RPM):
Voltaje
  │
12V│───┐                     ┐
   │   │                     │
   │   │                     │
 0V└───┴─────────────────────┴──────> Tiempo
      │◄──1.5ms──►│

Patrón Normal Corriente (Ralentí 800 RPM):
Corriente
  │
20A│  ┌─┐
   │  │ │
15A│  │ │
   │  │ └──────┐
10A│  │        │
   │  │        │
 0A└──┴────────┴────────────────> Tiempo
     │◄─1.5ms──►│

Mediciones Esperadas:
- Voltaje Alto (inyector cerrado): 12V
- Voltaje Bajo (inyector abierto): 0-1V
- Corriente Pico Inicial: 18-22A (0.3-0.5 ms)
- Corriente Hold: 10-14A (resto del pulso)
- Duración Pulso Ralentí: 1.2-2.0 ms
- Duración Pulso 2000 RPM: 2.5-4.5 ms
- Duración Pulso Alta Carga: 6-12 ms
- Frecuencia: Sincronizada con RPM motor (4 cil: RPM÷30 Hz)

Anormalidades:
- Sin pico corriente inicial: Driver ECU defectuoso
- Corriente excesiva continua (>25A): Cortocircuito inyector
- Voltaje no baja a 0V: Inyector abierto (bobina) o driver ECU
- Patrón irregular: Conexión intermitente o inyector mecánicamente bloqueado
- Duración excesiva un cilindro: Inyector débil (ECU compensa con más tiempo)

PRUEBA 5: Test de Balance con Escáner

Equipamiento:
- Escáner profesional OBD2 (compatible Hyundai/Kia: GDS, Hi-DS, Autel, Launch)

Procedimiento:
1. Motor a temperatura operación (80-95°C)
2. Conectar escáner
3. Menú: Engine → Fuel System → Injector Compensation Values
4. Observar valores compensación cada cilindro

Parámetro Clave: "Injection Quantity Correction" o "IMA" (Injection Mass Adjustment)

Especificación Bosch 0445110250:
- Valor Normal: -3.0 a +3.0 mg/stroke por cilindro
- Diferencia Entre Cilindros: <2.0 mg/stroke

Ejemplo Normal (Motor 4 Cilindros):
Cilindro 1: +0.8 mg/stroke
Cilindro 2: -0.5 mg/stroke
Cilindro 3: +1.2 mg/stroke
Cilindro 4: -0.3 mg/stroke
→ Diferencia máxima: 1.7 mg ✓ OK

Interpretación:
- Si todos valores -3.0 a +3.0: ✓ Inyectores balanceados
- Si un cilindro >+4.0: Inyector débil (flujo bajo), necesita más combustible
- Si un cilindro <-4.0: Inyector fuerte (flujo alto o goteo)
- Si diferencia >4.0 mg entre cilindros: Reemplazar inyector outlier

PRUEBA 6: Test de Retorno (Leak-Back Test)

Equipamiento:
- 4x probetas graduadas (100 mL)
- 4x mangueras transparentes (Ø 6mm)
- Cronómetro

Procedimiento:
1. Motor a temperatura operación
2. Desconectar líneas retorno cada inyector
3. Conectar mangueras transparentes individuales
4. Colocar extremo libre cada manguera en probeta graduada separada
5. Ralentí 800-900 RPM durante 60 segundos
6. Medir volumen retorno cada cilindro

Especificación Bosch CRI 2.2:
- Retorno Normal Ralentí: 15-35 mL en 60 segundos por inyector
- Diferencia Entre Inyectores: <10 mL máximo

Ejemplo Normal:
Cilindro 1: 22 mL
Cilindro 2: 25 mL
Cilindro 3: 20 mL
Cilindro 4: 24 mL
→ Diferencia máxima: 5 mL ✓ OK

Interpretación:
- Si 15-35 mL: ✓ Inyector OK
- Si <10 mL: Inyector bloqueado internamente (válvula control)
- Si >50 mL: ✗ Inyector con fuga interna (válvula desgastada)
- Si un inyector >>diferente otros: Reemplazar ese inyector
- Si todos >50 mL: Verificar presión rail (puede estar excesiva) o inyectores todos desgastados

[DIAGNOSTICO MECANICO]

PRUEBA 7: Extracción e Inspección Visual

Herramientas:
- Llave dinamométrica
- Extractor inyectores
- Lupa o microscopio

Procedimiento:
1. Desconectar batería
2. Desmontar tuberías alta presión
3. Desconectar cableado y retorno
4. Extraer inyectores con extractor (cuidado no dañar orificios)
5. Inspección visual

Puntos Inspección:

Punta Inyector (Nozzle):
- Normal: 7 orificios limpios, visibles, metal brillante
- Defecto: Orificios bloqueados, carbón negro, punta erosionada
- Crítico: Orificios agrandados (aumenta flujo, reduce atomización)

Asiento Aguja:
- Normal: Superficie lisa, sin rayas
- Defecto: Rayas circulares (desgaste), picaduras
- Crítico: Aguja no cierra herméticamente → goteo

Cuerpo Inyector:
- Normal: Sin grietas, sin fugas gasoil externas
- Defecto: Manchas gasoil en cuerpo, O-rings hinchados/duros

PRUEBA 8: Test en Banco Profesional

Equipamiento:
- Banco prueba inyectores Common Rail (EPS815, Bosch EPS, Launch CNC-801, etc.)

Procedimiento:
1. Montar inyector en banco
2. Conectar alta presión a inyector
3. Conectar driver eléctrico (12V)
4. Configurar parámetros test:
   - Presión: 1000 bar (test estándar)
   - Frecuencia: 1000 inyecciones/min
   - Duración pulso: 1.5 ms
   - Tiempo test: 60 segundos

Tests Banco:

A) SPRAY PATTERN (Patrón Pulverización):
- Observación visual con estroboscopio
- Normal: 7 chorros simétricos, ángulo 152° cónico amplio
- Atomización: Niebla fina (gotas <10 micrómetros)
- Defecto: Chorros asimétricos, uno o más bloqueados, goteo post-cierre

B) LEAK TEST (Prueba Fugas):
- Presurizar inyector a 1000 bar
- NO activar eléctricamente
- Observar 60 segundos
- Normal: 0 gotas
- Defecto: >1 gota = Asiento aguja desgastado, reemplazar

C) INJECTION QUANTITY (Cantidad Inyección):
- Configurar: 1000 bar, 1.5 ms, 1000 inyecciones
- Recolectar combustible en probeta graduada
- Medir volumen total

Especificación 0445110250:
- Volumen Esperado: 25-35 mL por 1000 inyecciones @ 1000 bar, 1.5 ms
- Tolerancia: ±10% (22.5-38.5 mL aceptable)

Si fuera especificación:
- <22 mL: Flujo bajo (orificios bloqueados, válvula defectuosa)
- >40 mL: Flujo alto (orificios erosionados, válvula con fuga)

D) INJECTION TIMING (Tiempo Respuesta):
- Medir con sensor piezoeléctrico inicio inyección
- Comando eléctrico → Inicio flujo combustible
- Normal: 0.35-0.50 ms
- Si >0.70 ms: Inyector lento (desgaste mecánico)

[CODIGOS DTC RELACIONADOS]

Códigos Específicos Inyector:
- P0201: Inyector Cilindro 1 - Circuit Malfunction
- P0202: Inyector Cilindro 2 - Circuit Malfunction
- P0203: Inyector Cilindro 3 - Circuit Malfunction
- P0204: Inyector Cilindro 4 - Circuit Malfunction
- P0261: Inyector 1 - Circuit Low
- P0264: Inyector 2 - Circuit Low
- P0267: Inyector 3 - Circuit Low
- P0270: Inyector 4 - Circuit Low

Códigos Sistema Common Rail:
- P0087: Fuel Rail Pressure Too Low
- P0088: Fuel Rail Pressure Too High
- P0093: Fuel System Large Leak Detected
- P0190: Fuel Rail Pressure Sensor Circuit
- P0335: Crankshaft Position Sensor (afecta sincronización inyección)

[FALLAS COMUNES 0445110250]

FALLA 1: Válvula Control Bloqueada

Síntomas:
- Cilindro específico no funciona
- Humo negro
- Pérdida potencia
- Código: P020X (Circuit Malfunction)

Causa:
- Combustible diesel contaminado
- Partículas metálicas sistema alta presión
- Barniz/depósitos carbón

Diagnóstico:
- Test retorno: Flujo muy bajo (<10 mL/min)
- Escáner: Valor compensación >+5.0 mg
- Extracción: Válvula control bloqueada (visible)

Solución:
- Limpieza ultrasónica profesional: 40-60% éxito
- Generalmente requiere: Reemplazo inyector
- Verificar: Filtros combustible, bomba alta presión (partículas indican fallo bomba)

FALLA 2: Asiento Aguja Desgastado (Goteo Interno)

Síntomas:
- Humo blanco/gris al arrancar (especialmente caliente)
- Ralentí irregular
- Ruido combustión anormal (golpeteo)
- Difícil arranque motor caliente

Causa:
- Kilometraje alto (>200,000 km)
- Combustible mala calidad (bajo poder lubricante)
- Presión rail excesiva crónica

Diagnóstico:
- Test retorno: Flujo excesivo (>50 mL/min)
- Banco prueba: Goteo visible después cesar pulso eléctrico
- Escáner: Valor compensación <-5.0 mg (ECU reduce tiempo)

Solución:
- Reemplazo inyector
- No reparable (asiento y aguja set matched de fábrica)
- Verificar presión rail no excesiva (sensor presión defectuoso puede causar)

FALLA 3: Orificios Spray Erosionados

Síntomas:
- Pérdida potencia gradual
- Aumento consumo combustible
- Humo negro en aceleración
- Códigos: P0300 (misfire) + P0087 (presión baja)

Causa:
- Uso prolongado (>250,000 km)
- Cavitación (burbujas colapsan erosionan metal)
- Combustible con agua

Diagnóstico:
- Banco prueba: Flujo alto (>40 mL/1000 iny)
- Spray pattern: Chorros más gruesos, menos atomización
- Inspección microscopio: Orificios diámetro mayor (>0.140 mm vs 0.135 mm especificación)

Solución:
- Reemplazo inyector
- Verificar sistema combustible (filtros, tanque, bomba)

FALLA 4: Bobina Solenoide en Cortocircuito

Síntomas:
- Fusible inyectores quemado
- Código: P020X + posible P0685 (ECM/PCM Power Relay)
- Motor no arranca o arranca con 3 cilindros

Causa:
- Penetración humedad en conector
- Desgaste aislamiento interno
- Vibración motor (montajes desgastados)

Diagnóstico:
- Resistencia bobina: <0.30 ohms
- Desconectar inyectores uno a uno → fusible deja de quemar cuando desconectas el defectuoso

Solución:
- Reemplazo inyector
- Verificar driver ECU no dañado (común que cortocircuito dañe driver)

FALLA 5: Contaminación Agua en Combustible

Síntomas:
- Múltiples inyectores afectados simultáneamente
- Pérdida potencia severa
- Humo blanco
- Motor no arranca

Causa:
- Tanque combustible con condensación
- Filtro separador agua saturado
- Combustible contaminado en estación servicio

Diagnóstico:
- Drenar filtro agua: Agua visible
- Resistencia múltiples inyectores: Anormal (corrosión)
- Extracción: Corrosión visible componentes internos

Solución:
1. Drenar sistema combustible completo
2. Reemplazar filtros combustible y agua
3. Reemplazo inyectores afectados (generalmente todos)
4. Verificar bomba alta presión (agua la daña)
5. Costo significativo ($1500-$3000 USD set completo+bomba si necesaria)

[REEMPLAZO Y CALIBRACION]

Procedimiento Reemplazo:

1. Remover Inyectores Viejos:
   - Desconectar batería
   - Despresurizar sistema (arranque motor con relay bomba desconectado hasta que muera)
   - Limpiar área trabajo (evitar suciedad entre en cilindros)
   - Remover tuberías alta presión (cuidado no dañar)
   - Remover inyector con extractor

2. Preparar Instalación:
   - Limpiar asiento inyector en culata con escariador especial
   - Limpiar orificios spray (no dejar residuos)
   - Inspeccionar O-rings, washers de cobre (reemplazar siempre)

3. Instalación Inyector Nuevo:
   - Lubricar O-rings con grasa especial diesel o gasoil limpio
   - Insertar washer de cobre nuevo
   - Instalar inyector verticalmente (no torcer)
   - Torque: 28-32 Nm (según especificación Hyundai/Kia)
   - Conectar tubería alta presión: Torque 27-33 Nm
   - Conectar retorno
   - Conectar conector eléctrico

4. Codificación/Adaptación:

**CRÍTICO**: Inyector Bosch 0445110250 requiere codificación ECU

Cada inyector tiene código IMA (Injection Mass Adjustment) grabado láser en cuerpo:
- Formato: Serie alfanumérica tipo "0986435129"
- También código QR o Datamatrix en etiqueta

Procedimiento Codificación:

Opción A: Con Escáner Profesional (GDS, Hi-DS)
1. Conectar escáner
2. Engine → Injector Coding
3. Introducir código IMA cada inyector en posición correcta cilindro
4. Guardar en ECU
5. ECU ahora compensa variaciones fabricación individual

Opción B: Sin Códigos (No Recomendado)
- Si instala sin codificar: Motor funciona pero:
  - Ralentí irregular posible
  - Economía combustible subóptima
  - Emisiones fuera especificación
  - ECU aprende compensación gradual (500-1000 km)

5. Purga Sistema:
   - Activar bomba combustible (llave ON posición 3 veces)
   - Verificar no haya fugas tuberías
   - Arranque motor (puede tardar 10-20 seg primero arranque)

6. Verificación:
   - Motor debe arrancar suave
   - Ralentí estable (±30 RPM)
   - Sin códigos pendientes
   - Test drive confirmar performance normal

[MANTENIMIENTO PREVENTIVO]

Combustible:
- Usar SOLO diesel de calidad (estaciones confiables)
- Evitar estaciones sospechosas bajo precio
- En climas fríos: Diesel winterizado (#1D o aditivo anti-gel)

Filtros:
- Filtro Combustible Principal: Cada 20,000-30,000 km
- Filtro Separador Agua: Drenar cada 10,000 km
- Reemplazo separador agua: Cada 40,000 km

Aditivos:
- Aditivo Lubricante Diesel: Cada tanque (especialmente diesel ultra-bajo azufre)
- Limpiador Inyectores Diesel: Cada 10,000 km
- Marcas recomendadas: Liqui Moly, Wynns, BG

Inspección:
- Cada 40,000 km: Test retorno inyectores (leak-back)
- Cada 80,000 km: Verificar códigos IMA con escáner
- Cada 100,000 km: Considerar limpieza profesional banco

Vida Útil:
- Esperada: 200,000-300,000 km con mantenimiento adecuado
- Factores reducen vida:
  - Combustible mala calidad
  - Filtros no cambiados a tiempo
  - Ralentí excesivo prolongado
  - Remolque cargas pesadas constante

[NUMEROS DE PARTE EQUIVALENTES]

Bosch Original 0445110250:
- Precio: $280-$400 USD (original nuevo)

Bosch Remanufacturado:
- 0445110626 (remanufacturado 0445110250)
- Precio: $180-$280 USD
- Garantía: 12-24 meses

OEM Hyundai/Kia:
- Hyundai: 33800-27000 (packaging OEM, inyector Bosch idéntico)
- Kia: 0K2A4-13250 (packaging OEM)
- Precio: $350-$500 USD (sobreprecio marca)

Aftermarket Compatible:
- Delphi: No hay equivalente directo
- Denso: No compatible
- Marcas genéricas: NO RECOMENDADO (fallas frecuentes)

Recomendación:
- Usar SOLO Bosch original o remanufacturado oficial
- Evitar: Inyectores genéricos chinos (fallas <20,000 km común)

[COSTO APROXIMADO REPARACION]

Inyector Individual:
- Bosch Original: $280-$400 USD
- Mano Obra Reemplazo (1 inyector): $120-$200 USD
- Sub-total: $400-$600 USD

Set Completo (4 inyectores):
- 4x Inyectores Bosch: $1,120-$1,600 USD
- Mano Obra Set Completo: $300-$500 USD
- Codificación (si requiere): $50-$150 USD
- Filtros Combustible: $40-$80 USD
- Total: $1,510-$2,330 USD

Recomendación:
- Si 1 inyector falla y >150,000 km: Reemplazar set completo
- Razón: Otros inyectores próximos a fallar (desgaste similar)
- Si <100,000 km: Individual aceptable

[DIAGNOSTICO DIFERENCIAL]

Síntomas similares, NO inyector:

Pérdida Potencia + Humo Negro:
- Verificar: Turbocompresor (boost bajo)
- Verificar: Filtro aire obstruido
- Verificar: Sensor MAF defectuoso
- Verificar: EGR atascada abierta

Ralentí Irregular:
- Verificar: Sensor posición cigüeñal
- Verificar: Presión compresión cilindros
- Verificar: Válvulas desajustadas

Difícil Arranque:
- Verificar: Bujías incandescencia (glow plugs)
- Verificar: Batería (bajo voltaje afecta inyectores)
- Verificar: Bomba alta presión
- Verificar: Sensor presión rail

Códigos P020X:
- Verificar PRIMERO: Cableado, conectores (problema común)
- Verificar: Driver ECU (reparable en algunos casos)
- ÚLTIMO: Inyector defectuoso

[HERRAMIENTAS REQUERIDAS]

Básicas:
- Multímetro digital DVOM (0.1 ohm resolución)
- Llaves métricas (8-17mm)
- Destornilladores
- Extractor inyectores (específico Common Rail)

Profesional:
- Osciloscopio automotriz (20+ MHz)
- Pinza amperimétrica AC/DC (60A rango)
- Escáner OBD2 profesional (GDS, Hi-DS, Autel IM608, Launch X431)
- Probetas graduadas (4x 100 mL)
- Llave dinamométrica (5-50 Nm)

Especializado:
- Banco prueba Common Rail
- Escariador limpieza asientos inyector
- Adaptadores codificación inyector
- Software diagnóstico Hyundai/Kia licenciado

[SEGURIDAD]

Advertencias Sistema Alta Presión:

PELIGRO:
- Presión 1600 bar = 23,200 PSI
- Chorro diesel alta presión puede penetrar piel → infección severa, amputación
- NUNCA tocar tuberías o inyector con motor en marcha
- SIEMPRE despresurizar antes desarmar

Procedimiento Despresurización:
1. Desconectar relay bomba combustible
2. Arrancar motor hasta que muera (consume presión residual)
3. Esperar 5 minutos
4. Recién entonces desconectar tuberías

Protección Personal:
- Guantes nitrilo/neopreno
- Gafas protección
- No fumar (diesel inflamable)
- Buena ventilación (vapores diesel)
`
  },
  {
    title: "Números de Parte Inyectores Bosch Common Rail Diesel 0445110XXX - Guía Referencia Rápida",
    keywords: [
      "0445110",
      "bosch 0445110",
      "numero parte bosch",
      "common rail bosch",
      "tabla inyectores bosch",
      "0445110094",
      "0445110129",
      "0445110183",
      "0445110276",
      "0445110318"
    ],
    answer: `
[IDENTIFICACION FAMILIA]

Código Estructura: 0445 110 XXX

Desglose:
- 0445: Familia Common Rail Bosch
- 110: Inyectores (vs 120=otro tipo)
- XXX: Variante específica aplicación

Generación: Principalmente CRI 2.0 - 2.5 (2001-2015)

[TABLA REFERENCIA NUMEROS DE PARTE COMUNES]

Parte No.       Voltaje   Resistencia   Aplicación Principal
─────────────────────────────────────────────────────────────────────────
0445110021      12V       0.45-0.55Ω    Mercedes OM611/OM612 2.1/2.7L
0445110059      12V       0.48-0.58Ω    Renault 1.5 dCi, Nissan 1.5 dCi
0445110064      12V       0.45-0.55Ω    Fiat 1.3 Multijet
0445110080      12V       0.45-0.53Ω    Ford Transit 2.4 TDCi
0445110094      12V       0.46-0.56Ω    Peugeot/Citroën 2.0 HDi
0445110111      12V       0.44-0.54Ω    Opel/Vauxhall 1.7 CDTi
0445110129      12V       0.47-0.57Ω    Ford Focus/Mondeo 1.6 TDCi
0445110183      12V       0.45-0.55Ω    Renault, Nissan, Dacia 1.5 dCi
0445110212      12V       0.46-0.56Ω    VW/Audi 2.0 TDi (algunos)
0445110243      12V       0.44-0.54Ω    Mercedes Sprinter 2.1 CDi
0445110250      12V       0.45-0.55Ω    Hyundai/Kia 2.0/2.2/2.5 CRDi
0445110273      12V       0.46-0.56Ω    Mazda 2.0/2.2 MZR-CD
0445110276      12V       0.45-0.55Ω    Toyota Hilux/Fortuner 2.5 D4-D
0445110293      12V       0.47-0.57Ω    Mitsubishi L200 2.5 Di-D
0445110305      12V       0.44-0.54Ω    Nissan Navara 2.5 dCi
0445110318      12V       0.45-0.55Ω    Chevrolet Captiva 2.0 VCDi
0445110376      12V       0.46-0.56Ω    Ford Ranger 3.2 TDCi

[ESPECIFICACIONES GENERALES FAMILIA 0445110XXX]

Comunes a Todos:

Eléctrico:
- Voltaje Sistema: 12V DC
- Rango Operación: 10.5-15.0V
- Resistencia Bobina: 0.44-0.58 ohms (varía por modelo)
- Corriente Pico: 18-24 Amperios
- Corriente Hold: 10-15 Amperios
- Driver: Peak-and-hold especializado

Mecánico:
- Presión Máxima: 1600-1800 bar (según generación)
- Orificios Spray: 6-8 orificios típicamente
- Conectores: 2 pines (estándar Bosch)

[IDENTIFICACION VISUAL]

Localización Código:

1. Código Grabado Láser Cuerpo:
   - Ubicación: Lado cuerpo metálico inyector
   - Formato: "0445 110 XXX"
   - Visible: Con buena luz

2. Código IMA (Injection Mass Adjustment):
   - Ubicación: Etiqueta adhesiva lateral
   - Formato: Alfanumérico 10-16 caracteres
   - Ejemplo: "0986435129" o similar
   - Crítico: Necesario para codificación ECU

3. Código QR/Datamatrix:
   - Algunos modelos recientes
   - Lectura con escáner especial

[VOLTAJE ESPECIFICO POR APLICACION]

TODOS los inyectores familia 0445110XXX usan:
- Voltaje Alimentación: 12V sistema vehículo
- NO existen variantes 24V en esta familia (24V es familia 0445120XXX para camiones pesados)

Corriente Detallada:

Fase 1 - Pico Apertura:
- Corriente: 18-24A
- Duración: 0.3-0.6 ms
- Propósito: Apertura rápida válvula control

Fase 2 - Hold (Mantenimiento):
- Corriente: 10-15A
- Duración: Resto del pulso (0.8-10ms según carga)
- Propósito: Mantener válvula abierta

Energía Total por Inyección:
- Típica: 15-35 milijoules
- Depende: Duración pulso, presión rail

[DIAGNOSTICO RAPIDO POR RESISTENCIA]

Medición Resistencia (Motor Frío, 20°C):

Si mides:
- 0.40-0.60 ohms: ✓ Normal (mayoría variantes)
- 0.30-0.39 ohms: ⚠ Posible corto parcial, verificar cuidadosamente
- <0.30 ohms: ✗ Cortocircuito, reemplazar
- 0.61-0.80 ohms: ⚠ Bobina degradada, monitorear
- >0.80 ohms: ✗ Bobina en falla, reemplazar
- Infinito (OL): ✗ Circuito abierto, reemplazar

Nota Temperatura:
- Resistencia aumenta con temperatura
- A 80°C: Añadir ~0.08-0.12 ohms al valor 20°C
- Siempre comparar con inyectores del mismo vehículo

[COMPATIBILIDAD E INTERCAMBIO]

Reglas Generales:

1. Mismo Motor = Intercambiable:
   - Ejemplo: En Ford 1.6 TDCi, si lleva 0445110129, puedes usar 0445110129
   - NO sustituir con otro número sin verificar especificaciones

2. Motores Diferentes Mismo Fabricante:
   - Generalmente NO intercambiable
   - Diferencias: Flujo, spray pattern, longitud
   - Verificar: Especificación técnica exacta

3. Remanufacturados:
   - Bosch ofrece remanufacturados con número diferente
   - Ejemplo: 0445110626 es reman de 0445110250
   - Totalmente compatible

[CODIGOS IMA Y CALIBRACION]

Código IMA Crítico:

Todos inyectores 0445110XXX requieren:
- Codificación en ECU después instalación
- Código IMA es único cada inyector individual
- Compensa variaciones fabricación (tolerancia ±2%)

Dónde Encontrar Código IMA:

1. Etiqueta Inyector:
   - Ubicación: Lateral cuerpo
   - Formato: Serie alfanumérica
   - Puede incluir código barras

2. Embalaje Original:
   - Caja inyector nuevo
   - Etiqueta externa
   - Guardar si reemplazas

3. Software Escáner:
   - Algunos escáneres pueden leer código desde chip interno inyector
   - Requiere: Conexión directa o lectura ECU

Procedimiento Codificación:

Sin Código IMA (Perdido):
- Motor funciona pero subóptimo
- ECU usa valores promedio default
- Ralentí puede ser irregular (±50 RPM)
- Economía combustible -5 a -10%
- Emisiones fuera especificación
- ECU aprende compensación gradual (pero nunca perfecto)

Con Código IMA (Correcto):
- Ralentí estable (±20 RPM)
- Economía combustible óptima
- Emisiones dentro especificación
- Performance como nuevo

[FALLAS COMUNES FAMILIA]

Las mismas para todos 0445110XXX:

1. Válvula Control Bloqueada (40%):
   - Causa: Combustible contaminado
   - Síntoma: Cilindro muerto
   - Solución: Generalmente reemplazo

2. Asiento Aguja Desgastado (30%):
   - Causa: Kilometraje alto (>200k)
   - Síntoma: Goteo, humo blanco
   - Solución: Reemplazo

3. Orificios Erosionados (20%):
   - Causa: Uso prolongado
   - Síntoma: Pérdida potencia, consumo alto
   - Solución: Reemplazo

4. Bobina Defectuosa (10%):
   - Causa: Cortocircuito, humedad
   - Síntoma: Fusible quemado
   - Solución: Reemplazo

[PRUEBAS UNIVERSALES]

Aplicables a TODOS 0445110XXX:

Test Resistencia:
- Desconectar conector
- Medir entre terminales
- Esperado: 0.44-0.58 ohms (frío)

Test Aislamiento:
- Medir terminal → cuerpo metálico
- Esperado: >10 Megaohms (infinito)

Test Retorno (Leak-Back):
- Ralentí 60 segundos
- Medir volumen retorno
- Esperado: 15-35 mL por inyector
- Diferencia entre cilindros: <10 mL

Test Balance (Escáner):
- Leer valores IMA compensation
- Esperado: -3.0 a +3.0 mg/stroke
- Diferencia: <2.0 mg entre cilindros

[COSTOS REEMPLAZO]

Precios Aproximados (USD):

Bosch Original Nuevo:
- $250-$450 por inyector
- Varía por número parte específico

Bosch Remanufacturado:
- $180-$320 por inyector
- Garantía 12-24 meses

Set Completo (4 cilindros):
- Original: $1,000-$1,800
- Reman: $720-$1,280
- Incluye: Codificación, instalación +$300-$600

[MANTENIMIENTO PREVENTIVO]

Para Maximizar Vida Útil:

Combustible:
- Diesel calidad premium estaciones confiables
- Evitar: Combustible dudoso bajo precio
- Aditivo lubricante: Cada tanque

Filtros:
- Filtro Principal: Cada 20,000-30,000 km
- Separador Agua: Drenar cada 10,000 km

Inspección:
- Test retorno: Cada 40,000 km
- Escáner valores IMA: Cada 80,000 km

Vida Esperada:
- Con buen mantenimiento: 200,000-300,000 km
- Con combustible malo: 80,000-150,000 km

[RECURSOS TECNICOS]

Documentación Bosch:
- Cada número parte tiene datasheet técnico
- Disponible: Bosch Automotive Aftermarket
- Incluye: Dimensiones, especificaciones eléctricas/mecánicas

Software Diagnóstico:
- Bosch ESI[tronic]: Base datos completa
- ETKA/ELSA: Cross-reference OEM
- TecDoc: Aplicaciones vehículos

Bancos Prueba Compatible:
- Bosch EPS series
- Launch CNC series
- Autoboss BT series
- Actia MUT series

[ADVERTENCIA FALSIFICACIONES]

Problema Creciente:

Inyectores Falsos en Mercado:
- Aspecto similar exterion
- Precio 30-50% bajo original
- Calidad inferior
- Fallas <20,000 km comunes

Identificación Originales Bosch:
- Marcado láser nítido (no serigrafiado)
- Código QR/Datamatrix (recientes)
- Empaque Bosch con hologramas seguridad
- Peso: Original ~195g, falso ~180g (materiales baratos)
- Proveedor: Distribuidor autorizado Bosch

Recomendación:
- Comprar SOLO distribuidores autorizados
- Si precio "demasiado bueno": Probablemente falso
- Garantía: Original tiene garantía Bosch oficial
`
  }
];

async function loadArticles() {
  console.log('Iniciando carga de Números de Parte Específicos Inyectores...');
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
  console.log('✅ Proceso completado - Números de Parte Inyectores');
  console.log(`Total procesado: ${articles.length} artículos`);
  console.log('');
  console.log('RESUMEN ARTICULOS:');
  console.log('1. Bosch 0445110250 - Especificaciones completas Hyundai/Kia Common Rail');
  console.log('   • Voltaje: 12V, Resistencia: 0.45-0.55Ω, Corriente Pico: 18-22A');
  console.log('   • Presión: 200-1600 bar, 7 orificios, ángulo 152°');
  console.log('   • Aplicaciones: Hyundai Santa Fe/Tucson, Kia Sportage/Sorento 2.0-2.5L CRDi');
  console.log('');
  console.log('2. Tabla Referencia 0445110XXX - 17 números parte comunes con aplicaciones');
  console.log('   • Rango resistencias 0.44-0.58Ω, todos 12V');
  console.log('   • Marcas: Mercedes, Ford, VW, Toyota, Nissan, Hyundai, Mazda, etc.');
}

loadArticles();
