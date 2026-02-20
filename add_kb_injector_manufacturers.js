import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const articles = [
  {
    title: "Inyectores Piezoeléctricos Siemens/Continental - Especificaciones Técnicas Detalladas",
    keywords: [
      "inyector siemens",
      "inyector continental",
      "piezoelectrico siemens",
      "voltaje inyector siemens",
      "especificaciones siemens",
      "inyector piezo continental",
      "vdo siemens",
      "siemens gdi",
      "continental piezo"
    ],
    answer: `
[FABRICANTE]
Siemens VDO Automotive (ahora Continental Automotive)
- Fabricante alemán líder en inyectores piezoeléctricos
- Especializado en: GDI (Gasoline Direct Injection), HDEV (High Dynamic Electronic Valve)
- Aplicaciones: BMW, Mercedes-Benz, Volkswagen/Audi, Ford EcoBoost, PSA Peugeot-Citroën

[ARQUITECTURA ELECTRICA PIEZOELECTRICA]

**Sistema de Voltaje Dual:**

1. ALIMENTACION PRINCIPAL (Batería):
   - Voltaje Entrada: 12V nominal (10.5V - 15.0V rango)
   - Corriente Consumo Total: 3-8 Amperios por inyector durante inyección
   - Protección: Fusible dedicado ECU inyectores

2. ACTUADOR PIEZOELECTRICO (Convertidor Interno):
   - Voltaje Actuador: 60V - 150V DC (típicamente 120V)
   - Generado por: Convertidor DC-DC dentro de driver ECU
   - Cristal Piezoeléctrico: Stack de 200-400 capas cerámicas
   - Expansión Cristal: 40-60 micrómetros bajo 120V
   - Capacitancia: 1-5 microfaradios

**Comparación Voltajes:**

Sistema             Batería    Actuador    Tiempo Respuesta
─────────────────────────────────────────────────────────────
Solenoide Normal    12V        12V         2-5 ms
Piezoeléctrico      12V        60-150V     0.1-0.5 ms

[ESPECIFICACIONES TECNICAS INYECTOR SIEMENS PIEZO]

**Modelo HDEV5 (High Dynamic Electronic Valve Gen 5):**

ELECTRICAS:
- Voltaje Alimentación ECU: 12V ±2V
- Voltaje Actuador Piezo: 110-130V DC
- Corriente Pico Carga: 5-10A (durante 0.2 ms carga capacitor)
- Corriente Mantenimiento: 0.5-2A
- Resistencia Circuito Driver: 2-4 ohms
- Capacitancia Actuador: 2.5 microfaradios típico

MECANICAS:
- Presión Operación: 5-20 MPa (50-200 bar / 725-2900 PSI)
- Presión Máxima: 20 MPa (200 bar)
- Caudal Nominal: 180-350 cc/min según aplicación
- Masa Móvil: 1.5-2.0 gramos
- Carrera Aguja: 40-60 micrómetros

RESPUESTA DINAMICA:
- Tiempo Apertura (Opening): 0.15-0.30 ms
- Tiempo Cierre (Closing): 0.10-0.25 ms
- Tiempo Respuesta Total: 0.25-0.55 ms
- Frecuencia Inyección Máxima: 5-8 inyecciones por ciclo motor
- Duración Mínima Pulso: 0.08-0.15 ms

**Inyecciones Múltiples Posibles:**
1. Pre-Inyección (Pilot): 0.1-0.3 mg
2. Inyección Principal: 8-25 mg
3. Post-Inyección 1: 0.5-2 mg
4. Post-Inyección 2: 0.3-1 mg
5. Post-Inyección Tardía: 1-3 mg (reducción NOx)

[PRINCIPIO FUNCIONAMIENTO PIEZOELECTRICO]

**Efecto Piezoeléctrico Inverso:**

1. ESTADO REPOSO (Inyector Cerrado):
   - Voltaje Actuador: 0V
   - Cristal Longitud: Estado natural
   - Aguja: Cerrada por resorte (fuerza 50-80N)
   - Presión Combustible: Presente ambos lados aguja (equilibrio)

2. COMANDO INYECCION (Apertura):
   - ECU aplica: 120V al stack piezoeléctrico
   - Cristal se expande: 50 micrómetros en 0.15 ms
   - Expansión activa: Válvula control presión
   - Diferencial presión: Abre aguja inyector
   - Combustible inyecta: A través de orificios (típicamente 6-8 orificios)

3. COMANDO CIERRE:
   - ECU corta voltaje: 120V → 0V en 0.10 ms
   - Cristal contrae: Retorna a longitud original
   - Válvula control cierra
   - Resorte cierra aguja: Inmediatamente
   - Sin goteo: Cierre hermético instantáneo

[DIAGNOSTICO ELECTRICO ESPECIFICO]

**PRUEBA 1: Resistencia Driver Circuit**

Herramienta: Multímetro digital (DVOM)

Procedimiento:
1. Desconectar conector inyector (4 pines típicamente)
2. Medir resistencia entre:
   - Pin 1 (+) y Pin 2 (-) Driver: 2-4 ohms
   - Pin 3 (Sensor Posición) y Pin 4 (Ground): 1000-2000 ohms

Interpretación:
- Si Driver <1 ohm: Cortocircuito interno, reemplazar
- Si Driver >10 ohms: Circuito abierto, reemplazar
- Si Sensor <100 ohms o >5000 ohms: Sensor defectuoso

**PRUEBA 2: Voltaje Alimentación ECU**

Herramienta: Multímetro, motor encendido

Procedimiento:
1. Conectar DVOM al conector inyector (backprobe)
2. Pin (+): Debe leer 12V con motor OFF
3. Arrancar motor y medir:
   - Ralentí: 13.5-14.5V
   - 2000 RPM: 13.8-14.8V
   - Si <12V: Problema alternador o cableado

**PRUEBA 3: Señal de Control con Osciloscopio**

Herramienta: Osciloscopio automotriz (mínimo 20 MHz)

Configuración:
- Canal 1: Pin control inyector
- Escala Voltaje: 50V/división
- Escala Tiempo: 2 ms/división
- Trigger: Flanco ascendente 10V

Patrón Normal (Ralentí 800 RPM):
\`\`\`
Voltaje
  │
150V│     ┌──────┐
  │     │      │
120V│     │      │
  │     │      │ 
 60V│   ┌┘      └┐
  │   │          │
  0V└───┴──────────┴────────────> Tiempo
      │◄──2.5ms──►│
      Inyección     Pausa
\`\`\`

Mediciones Esperadas:
- Voltaje Pico: 110-130V
- Duración Pulso Ralentí: 1.5-3.0 ms
- Duración Pulso 3000 RPM: 2.5-5.0 ms
- Frecuencia: Debe sincronizar con RPM motor
- Forma: Subida rápida (<0.2 ms), meseta estable, bajada abrupta

Anormalidades:
- Voltaje <80V: Driver ECU defectuoso o convertidor DC-DC dañado
- Voltaje >160V: Peligro daño inyector, ECU defectuoso
- Forma irregular: Inyector bloqueado mecánicamente
- Sin señal: ECU no comanda o cableado abierto

**PRUEBA 4: Corriente de Carga (Clamp Amperométrica)**

Herramienta: Pinza amperimétrica AC/DC

Procedimiento:
1. Colocar pinza en cable (+) individual inyector
2. Motor en ralentí
3. Observar patrón corriente

Corriente Normal:
- Pico Inicial: 5-10A durante 0.1-0.3 ms (carga capacitor)
- Mantenimiento: 0.5-2A durante resto pulso
- Duración Total: Corresponde a pulso ECU

Anormalidades:
- Corriente Constante Alta (>5A continuo): Cortocircuito inyector
- Sin Pico Inicial: Capacitor piezoeléctrico dañado
- Corriente Errática: Conexión intermitente

[DIAGNOSTICO MECANICO Y FLUJO]

**PRUEBA 5: Test de Balance de Cilindros**

Herramienta: Escáner OBD2 profesional (VCDS, Autel, Snap-on)

Procedimiento:
1. Conectar escáner
2. Motor temperatura operación (90°C)
3. Seleccionar: "Injector Flow Test" o "Cylinder Balance"
4. ECU desactiva cilindros uno por uno
5. Medir caída RPM cada cilindro

Resultados Normales:
- Caída RPM Típica: 80-150 RPM por cilindro
- Diferencia Entre Cilindros: <30 RPM (máximo 20%)
- Si un cilindro <50 RPM: Inyector de ese cilindro defectuoso (bajo flujo)
- Si un cilindro >200 RPM: Inyector sobrealimentando o fuga

**PRUEBA 6: Tiempo de Inyección (Scan Tool)**

Herramienta: Escáner OBD2 con live data

Parámetros Monitorear:
\`\`\`
Condición          Inyector 1    Inyector 2    Inyector 3    Inyector 4
─────────────────────────────────────────────────────────────────────────
Ralentí 800 RPM    2.2 ms        2.3 ms        2.2 ms        2.4 ms    ✓ OK
3000 RPM           4.5 ms        4.6 ms        4.5 ms        4.7 ms    ✓ OK
WOT Aceleración    12.5 ms       12.8 ms       12.4 ms       18.5 ms   ✗ Cil 4 Defectuoso
\`\`\`

Interpretación:
- Diferencia <10% entre cilindros: Normal
- Diferencia >15%: Investigar inyector diferente
- Diferencia >25%: Inyector defectuoso, reemplazar

**PRUEBA 7: Spray Pattern (Banco de Prueba)**

Equipo: Banco limpieza/prueba inyectores (Asnu, Launch, etc.)

Procedimiento:
1. Extraer inyector del motor
2. Conectar a banco con adaptador piezoeléctrico (requiere 120V driver)
3. Conectar probetas graduadas bajo cada orificio
4. Pulsar 100 inyecciones a frecuencia normal
5. Medir volumen en cada probeta

Patrón Normal Siemens HDEV:
- Número Orificios: 6-8 orificios típicamente
- Ángulo Spray: 30-60° cónico
- Atomización: Niebla fina (gotas <50 micrómetros)
- Simetría: Todas las corrientes iguales
- Sin Goteo: 0 gotas después de cerrar

Anormalidades:
- Spray Asimétrico: Orificios bloqueados
- Goteo Post-Cierre: Asiento dañado o cristal piezo agrietado
- No Pulveriza: Inyector completamente bloqueado
- Flujo Bajo: Depósitos carbón u obstrucción parcial

[FALLAS COMUNES INYECTORES SIEMENS PIEZO]

**FALLA 1: Cristal Piezoeléctrico Agrietado**

Síntomas:
- Código DTC: P0201-P0204 (Circuit Malfunction)
- Misfire aleatorio en cilindro afectado
- Tiempo inyección inconsistente
- Sonido "tic" metálico diferente

Causa:
- Sobrevoltaje (>160V)
- Golpe mecánico
- Fatiga por ciclos (>200 millones inyecciones)
- Contaminación combustible (agua, suciedad)

Diagnóstico:
- Osciloscopio: Patrón voltaje irregular
- Corriente: Sin pico de carga capacitor
- Resistencia: Puede mostrar infinito

Solución:
- Reemplazo inyector completo (cristal no reemplazable)
- Investigar causa (calidad combustible, voltaje ECU)

**FALLA 2: Válvula Control Presión Atascada**

Síntomas:
- Arranque difícil en frío
- Humo blanco al arrancar
- Códigos: P0300 + P020X (Misfire + Injector)
- Inyección continua o nula

Causa:
- Barniz combustible (gasolina vieja)
- Depósitos carbón
- Partículas metálicas

Diagnóstico:
- Test balance: Caída RPM anormal (muy alta o muy baja)
- Extracción: Inspección visual válvula
- Banco prueba: Goteo continuo

Solución:
- Limpieza ultrasónica profesional (éxito 40-60%)
- Preferible: Reemplazo inyector
- Nunca usar limpiadores agresivos (dañan piezo)

**FALLA 3: Driver ECU Convertidor DC-DC Dañado**

Síntomas:
- Múltiples cilindros afectados (generalmente todos)
- Código: P0685 - Circuito Control Relay Principal
- Motor funciona mal, bajo rendimiento
- Sin potencia

Causa:
- Cortocircuito en un inyector
- Sobrecarga eléctrica
- Falla componente ECU

Diagnóstico:
- Osciloscopio todos inyectores: Voltaje bajo (<80V)
- Multímetro: Voltaje batería OK (12V)
- Escáner: ECU reporta "High Voltage Circuit Fault"

Solución:
- Verificar cada inyector individualmente (desconectar uno a uno)
- Si todos inyectores OK: Reparación o reemplazo ECU
- Costo ECU reparación: Moderado-Alto
- Alternativa: ECU usado programado para vehículo

**FALLA 4: Contaminación Combustible (Agua/Partículas)**

Síntomas:
- Múltiples cilindros misfire
- Performance degradado gradualmente
- Códigos: P0300, P0087 (Fuel Pressure Low)
- Posible daño bomba alta presión

Causa:
- Combustible contaminado (estación service mala)
- Tanque oxidado
- Filtro combustible saturado

Diagnóstico:
- Inspección filtro combustible: Presencia agua o sedimento
- Extracción inyectores: Inspección visual orificios
- Test presión combustible: Puede estar baja

Solución:
1. Drenar tanque combustible
2. Reemplazar filtro combustible
3. Limpieza sistema combustible
4. Limpieza ultrasónica inyectores (o reemplazo si muy dañados)
5. Verificar bomba alta presión (puede requerir reemplazo)

[MANTENIMIENTO PREVENTIVO]

**Cada 30,000 km:**
- Usar limpiador inyectores (líquido aditivo tanque)
- Marca recomendada: Liqui Moly, Techron, BG 44K
- Dosis: Según fabricante (típicamente 1 botella por tanque)

**Cada 60,000 km:**
- Limpieza profesional inyectores (banco limpieza ultrasónico)
- Verificación spray pattern
- Test flujo todos inyectores

**Cada 120,000 km:**
- Considerar reemplazo preventivo inyectores
- Especialmente si: Kilometraje alto ciudad, combustible dudoso, historial problemas

**Combustible:**
- Usar siempre gasolina de estaciones confiables
- Preferir Premium/Super (mayor calidad detergentes)
- Evitar: Tanque vacío completo (sedimento fondo tanque)
- Reemplazar filtro combustible según especificación (cada 40,000-60,000 km)

[NUMEROS DE PARTE Y COMPATIBILIDAD]

Ejemplos Aplicaciones Siemens/Continental:

**BMW:**
- N54 (Twin Turbo): Siemens HDEV5 - PN: 13537585261
- N55 (Single Turbo): Continental HDEV5.2 - PN: 13538616079
- Voltaje: 120V actuador, 12V alimentación

**Mercedes-Benz:**
- M276 (V6 3.5L): Continental Piezo - PN: A2760780323
- M278 (V8 4.7L): Continental HDEV - PN: A2780780323

**Volkswagen/Audi:**
- EA888 Gen 3 (2.0T): Continental HDEV5 - PN: 06L906036G
- Voltaje: 110V actuador

**Ford EcoBoost:**
- 3.5L V6: Continental Piezo - PN: CM5G9F593AA

[HERRAMIENTAS REQUERIDAS DIAGNOSTICO]

Básico:
- Multímetro digital (DVOM): Min 4000 cuentas, True RMS
- Escáner OBD2: Capacidad live data inyectores

Profesional:
- Osciloscopio: Min 2 canales, 20 MHz, 100 MS/s
- Pinza amperimétrica: AC/DC, min 60A rango
- Banco prueba inyectores: Con driver piezoeléctrico (requiere 120V)
- Scanner marca específica: VCDS (VAG), INPA (BMW), STAR (Mercedes)

Especial:
- Adaptador Piezo: Para banco prueba (generic no funciona)
- Probetas Graduadas: Para test spray pattern
- Medidor Presión: 0-200 bar para verificar presión rail

[COSTO APROXIMADO REEMPLAZO]

Inyector Individual:
- Original Siemens/Continental: $150-$350 USD
- OEM Equivalente: $100-$200 USD
- Reconstruido: $80-$150 USD (garantía limitada)

Mano Obra:
- Extracción/Instalación: 2-4 horas
- Costo: $100-$300 USD según taller

Recomendación:
- Reemplazar siempre en juego completo (todos cilindros)
- Razón: Desgaste similar, flujo balanceado
- Motores V6/V8: Considerar reemplazar solo banco afectado

[DIFERENCIAS VS INYECTORES SOLENOIDE]

\`\`\`
Característica           Solenoide           Piezoeléctrico Siemens
────────────────────────────────────────────────────────────────────────
Voltaje Actuador         12V                 60-150V (120V típico)
Tiempo Respuesta         2-5 ms              0.15-0.5 ms
Inyecciones por Ciclo    1-2                 5-8
Presión Máxima           10 MPa              20 MPa
Durabilidad (ciclos)     100 millones        200 millones
Precisión Dosis          ±5%                 ±2%
Costo                    Bajo                Alto (2-3x)
Complejidad Diagnóstico  Baja                Alta (requiere osciloscopio)
Limpieza                 Buena respuesta     Limitada respuesta
Reemplazo                Individual OK       Preferible juego completo
\`\`\`

**Ventaja Principal Siemens Piezo:**
Permite estrategias inyección avanzadas:
- Pre-inyección: Reduce ruido combustión
- Inyección principal: Entrega potencia
- Post-inyección 1: Reduce NOx
- Post-inyección 2: Regeneración DPF/catalizador
- Post tardía: Limpieza catalizador

Resultado: Menores emisiones, mejor economía combustible, mayor potencia específica.
`
  },
  {
    title: "Inyectores Bosch - Especificaciones Técnicas por Tipo (Solenoide, EV1, EV6, EV14, Piezoeléctrico)",
    keywords: [
      "inyector bosch",
      "bosch ev1",
      "bosch ev6",
      "bosch ev14",
      "voltaje bosch",
      "especificaciones bosch",
      "inyector piezo bosch",
      "bosch solenoide",
      "inyector gasolina bosch",
      "inyector diesel bosch"
    ],
    answer: `
[FABRICANTE]
Robert Bosch GmbH - Líder mundial en sistemas inyección
- Mayor fabricante global: >50% mercado mundial
- Aplicaciones: Prácticamente todos fabricantes vehículos
- Tecnologías: Solenoide (EV1-EV14), Piezoeléctrico, Common Rail Diesel

[CLASIFICACION INYECTORES BOSCH GASOLINA]

**GENERACIONES SOLENOIDE:**

**1. EV1 (1990-2005):**
- Conector: Jetronic (2 pines, conector cuadrado)
- Impedancia: Alta (12-16 ohms)
- Voltaje: 12V directo
- Caudal: 180-450 cc/min
- Resistencia: 12-16 ohms
- Aplicaciones: GM, Ford, Chrysler años 90s

**2. EV6 (1995-2010):**
- Conector: USCAR (2 pines, conector clip)
- Impedancia: Baja (2-5 ohms)
- Voltaje: 12V con driver peak-and-hold
- Caudal: 200-600 cc/min
- Resistencia: 2.0-5.0 ohms
- Aplicaciones: Ford, Mazda, Mitsubishi, Subaru, Honda

**3. EV14 (2008-Presente):**
- Conector: USCAR (identical EV6 pero electrónica avanzada)
- Impedancia: Muy Baja (0.8-2.5 ohms)
- Voltaje: 12V con control PWM avanzado
- Caudal: 250-2000 cc/min (amplio rango)
- Resistencia: 0.8-2.5 ohms
- Respuesta: 1.5-3.0 ms (más rápido que EV6)
- Aplicaciones: VW/Audi, BMW, Mercedes, Ford EcoBoost, Performance/Turbo

[ESPECIFICACIONES TECNICAS DETALLADAS]

**INYECTOR BOSCH EV1 (Alta Impedancia):**

Eléctrico:
- Voltaje Operación: 12V nominal (10-15V rango)
- Corriente Operación: 0.75-1.2 Amperios
- Resistencia Bobina: 12-16 ohms (típicamente 14 ohms)
- Potencia: 9-18 Watts
- Inductancia: 8-12 mH
- Driver ECU: Saturado (simple on/off)

Mecánico:
- Presión Operación: 2.5-4.0 bar (36-58 PSI)
- Caudal Típico: 180-450 cc/min @ 3 bar
- Tiempo Apertura: 2.5-4.0 ms
- Tiempo Cierre: 1.5-2.5 ms
- Spray Patrón: Cónico simple (ángulo 15-25°)

Diagnóstico:
\`\`\`
Parámetro                Especificación       Anormal
───────────────────────────────────────────────────────
Resistencia (motor OFF)  12-16 ohms          <10 ohms: Corto
                                             >20 ohms: Abierto
Voltaje alimentación     12V ±1V             <11V: Bajo voltaje
Corriente inyección      0.8-1.2A            >2A: Cortocircuito
Duración pulso ralentí   3-5 ms              <2ms: Problema ECU
                                             >8ms: Flujo bajo
\`\`\`

**INYECTOR BOSCH EV6 (Baja Impedancia):**

Eléctrico:
- Voltaje Operación: 12V nominal (10-15V rango)
- Sistema Control: Peak-and-Hold
  - Pico Apertura: 4-6 Amperios (durante 0.5-1.0 ms)
  - Hold Mantenimiento: 1.0-1.5 Amperios (resto del pulso)
- Resistencia Bobina: 2.0-5.0 ohms (típicamente 2.5 ohms)
- Inductancia: 2-4 mH
- Driver ECU: Peak-and-Hold o PWM

Mecánico:
- Presión Operación: 3.0-5.5 bar (43-80 PSI)
- Caudal Típico: 250-650 cc/min @ 3 bar
- Tiempo Apertura: 1.5-2.5 ms
- Tiempo Cierre: 0.8-1.5 ms
- Spray Patrón: Cónico mejorado (ángulo 15-30°)
- Orificios: 1-4 orificios según aplicación

Diagnóstico:
\`\`\`
Parámetro                Especificación       Anormal
───────────────────────────────────────────────────────
Resistencia estática     2.0-5.0 ohms        <1.5 ohms: Corto
                                             >8 ohms: Bobina dañada
Corriente pico           4-6A                >8A: Cortocircuito
Corriente hold           1.0-1.5A            <0.5A: Conexión mala
Patrón osciloscopio      Peak + Hold claro   Irregular: Inyector o driver
\`\`\`

**INYECTOR BOSCH EV14 (Muy Baja Impedancia):**

Eléctrico:
- Voltaje Operación: 12V nominal (9-16V rango)
- Sistema Control: PWM de alta frecuencia (1-20 kHz)
- Corriente Pico: 6-12 Amperios (muy breve, <0.3 ms)
- Corriente Operación: 2-4 Amperios (controlado modulación PWM)
- Resistencia Bobina: 0.8-2.5 ohms (típicamente 1.5 ohms)
- Inductancia: 0.5-1.5 mH (muy baja)
- Driver ECU: PWM avanzado con feedback corriente

Mecánico:
- Presión Operación: 3.5-6.5 bar (51-94 PSI) gasolina port
- Presión GDI: 50-200 bar (725-2900 PSI) inyección directa
- Caudal: 250-2000 cc/min según modelo
  - EV14-250: 250 cc/min
  - EV14-500: 500 cc/min
  - EV14-1000: 1000 cc/min
  - EV14-2000: 2000 cc/min (aplicaciones turbo extremo)
- Tiempo Apertura: 0.8-1.5 ms (muy rápido)
- Tiempo Cierre: 0.5-1.0 ms
- Respuesta Total: 1.3-2.5 ms
- Spray Patrón: Multi-orificio optimizado (6-12 orificios)
- Atomización: Gotas <30 micrómetros

Diagnóstico:
\`\`\`
Parámetro                Especificación       Anormal
───────────────────────────────────────────────────────
Resistencia estática     0.8-2.5 ohms        <0.5 ohms: Cortocircuito
                                             >4 ohms: Bobina dañada
Corriente pico           6-12A               >15A: Corto peligroso
Corriente PWM promedio   2-4A                Errático: Driver defectuoso
Frecuencia PWM           1-20 kHz            Verificar con osciloscopio
Duración pulso ralentí   1.5-2.5 ms          <1ms: Problema presión
                                             >4ms: Flujo bajo
\`\`\`

[INYECTORES BOSCH PIEZOELECTRICOS]

**Modelo: Bosch HDEV (High Dynamic Electronic Valve)**

Similar a Siemens pero con diferencias:

Eléctrico:
- Voltaje Alimentación: 12V batería
- Voltaje Actuador Piezo: 80-150V (típicamente 100V)
- Capacitancia Piezo: 1-3 microfaradios
- Corriente Pico Carga: 8-15A (durante 0.2-0.5 ms)
- Corriente Mantenimiento: 0.3-0.8A

Mecánico:
- Presión Operación GDI: 20-35 MPa (200-350 bar / 2900-5000 PSI)
- Presión Máxima: 35 MPa (350 bar)
- Caudal: Variable, controlado tiempo+presión
- Tiempo Respuesta: 0.15-0.40 ms
- Múltiples Inyecciones: Hasta 5 por ciclo

Aplicaciones Típicas:
- Audi/VW FSI/TFSI (algunos modelos)
- Mercedes-Benz CGI
- Diversos GDI europeos

[INYECTORES BOSCH DIESEL COMMON RAIL]

**Generaciones:**

**1. CRI 1.0 (1997-2001):**
- Presión: 1350 bar máxima
- Voltaje: 12V/24V solenoide
- Corriente: 15-20A
- Inyecciones por ciclo: 1 (piloto + principal = 2 eventos)

**2. CRI 2.0 (2001-2005):**
- Presión: 1600 bar máxima
- Voltaje: 12V/24V con driver mejorado
- Corriente: 12-18A
- Inyecciones: 3-4 por ciclo

**3. CRI 3.0 (2005-2016):**
- Presión: 1800-2000 bar
- Voltaje: 12V/24V
- Corriente: 10-15A (optimizado)
- Inyecciones: 5-7 por ciclo
- Piezoeléctrico opcional

**4. CRI 4.0 (2016-Presente):**
- Presión: 2500-3000 bar
- Piezoeléctrico exclusivamente
- Voltaje Piezo: 150V
- Inyecciones: 8-10 por ciclo
- Precisión: ±1%

**Especificaciones Diesel Common Rail (CRI 3.0 típico):**

Eléctrico:
- Voltaje: 12V (autos) o 24V (camiones)
- Corriente Pico: 15-20A
- Corriente Hold: 8-12A
- Resistencia Solenoide: 0.3-0.8 ohms (muy baja)
- Driver: Peak-and-Hold especializado

Mecánico:
- Presión Rail: 200-2000 bar (variable)
- Caudal: 120-250 mg por inyección
- Tiempo Apertura: 0.5-1.5 ms
- Orificios: 6-8 orificios (diámetro 0.12-0.18 mm)

[DIAGNOSTICO INYECTORES BOSCH]

**PRUEBA 1: Identificación Tipo Inyector**

Visual:
- Conector EV1: Cuadrado Jetronic, 2 pines
- Conector EV6/EV14: USCAR clip, 2 pines (idénticos externamente)
- Color inyector: Típicamente negro (Bosch), puede variar

Resistencia:
- Alta Impedancia (12-16 ohms): EV1
- Baja Impedancia (2-5 ohms): EV6
- Muy Baja (0.8-2.5 ohms): EV14 o diesel
- Piezoeléctrico: 2-4 ohms (resistencia driver, no cristal)

**PRUEBA 2: Test Osciloscopio según Tipo**

**EV1 (Saturado):**
\`\`\`
Corriente
  │
1.2A│      ┌─────────────┐
  │      │             │
0.8A│      │             │
  │      │             │
  0A└──────┴─────────────┴───────> Tiempo
         │◄───3-5ms────►│
\`\`\`
- Forma: Cuadrada limpia
- Subida: Gradual (inductancia alta)
- Meseta: Estable 0.8-1.2A
- Bajada: Gradual con pico inductivo

**EV6 (Peak-and-Hold):**
\`\`\`
Corriente
  │
 6A│    ┌┐
  │    ││
 4A│    ││
  │    │└────────────┐
1.5A│    │           │
  │    │           │
  0A└────┴───────────┴─────> Tiempo
       │◄───2-4ms────►│
\`\`\`
- Pico Inicial: 4-6A durante 0.5-1ms
- Reducción rápida
- Hold: 1.0-1.5A resto pulso
- Transiciones limpias

**EV14 (PWM):**
\`\`\`
Corriente
  │
10A│  ┌┐┌┐┌┐┌┐┌┐┌┐┌┐┌┐
  │  ││││││││││││││││
 5A│  ││││││││││││││││
  │  ││││││││││││││││
 0A└──┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴──> Tiempo
     │◄─PWM 5-20kHz──►│
\`\`\`
- Modulación alta frecuencia
- Pico inicial muy breve
- PWM visible (requiere osciloscopio 100 MHz)
- Promedio: 2-4A

**PRUEBA 3: Test de Fugas (Leak-Down)**

Equipamiento: Banco prueba inyectores

Procedimiento:
1. Montar inyector en banco
2. Presurizar según tipo (3 bar gasolina, 100 bar diesel)
3. NO activar eléctricamente
4. Observar 60 segundos

Especificación Bosch:
- Goteo Permitido: 0 gotas (tolerancia máxima: 1 gota/60 seg)
- Si >1 gota/60seg: Asiento desgastado, reemplazar
- Diesel: 0 gotas absoluto (presiones altas)

**PRUEBA 4: Flow Test (Prueba Flujo)**

Equipamiento: Banco con probetas graduadas

Procedimiento:
1. Configurar frecuencia pulsos: 3000 pulsos/min (50 Hz)
2. Duración pulso: 3.0 ms
3. Presión: 3.0 bar
4. Tiempo test: 60 segundos
5. Medir volumen en cc

Especificación:
- Ejemplo EV14-500: Debe entregar 480-520 cc en 60 seg
- Tolerancia: ±4% según Bosch
- Diferencia entre cilindros: <2%

Cálculo:
\`\`\`
Rata Flujo (cc/min) = Volumen_60seg × 1

Si medido 495 cc en 60 seg:
Flujo = 495 cc/min ✓ OK para EV14-500
\`\`\`

**PRUEBA 5: Spray Pattern Visual**

Procedimiento:
1. Extraer inyector
2. Activar con estroboscopio
3. Observar patrón spray

Bosch EV1:
- Ángulo: 15-25° cónico
- Forma: Cono sólido
- Atomización: Gotas medianas (50-100 micrones)

Bosch EV6:
- Ángulo: 20-30° cónico
- Forma: Cono con mejor atomización
- Atomización: Gotas 40-80 micrones

Bosch EV14:
- Ángulo: Variable según diseño (25-60°)
- Forma: Multi-corrientes (6-12 corrientes)
- Atomización: Fina (<30 micrones)
- Simetría: Todas corrientes iguales

Diesel Common Rail:
- Ángulo: 140-160° total (cónico amplio)
- Orificios: 6-8 corrientes individuales
- Atomización: Muy fina (<10 micrones)
- Penetración: 40-60 mm

Defectos:
- Corrientes asimétricas: Orificios bloqueados
- Spray débil: Baja presión o inyector gastado
- Goteo continuo: Asiento dañado
- Sin spray: Inyector completamente bloqueado

[FALLAS COMUNES BOSCH]

**FALLA 1: Bobina Quemada (Open Circuit)**

Síntomas:
- Código DTC: P0201-P0208 (Injector Circuit Open)
- Cilindro no funciona
- Inyector frío al tacto (no activa)

Diagnóstico:
- Resistencia: Infinita (circuito abierto)
- Voltaje: 12V presente en conector
- Corriente: 0 Amperios (no fluye)

Causa:
- Sobrecalentamiento
- Cortocircuito previo
- Calidad combustible (corrosión)

Solución:
- Reemplazo inyector
- No reparable

**FALLA 2: Bobina en Cortocircuito**

Síntomas:
- Fusible inyectores quemado repetidamente
- Código: P0200 (Injector Circuit Malfunction)
- Posible daño driver ECU

Diagnóstico:
- Resistencia: <0.5 ohms (muy baja anormal)
- Desconectar inyectores uno a uno hasta identificar
- Corriente: Excesiva (>20A)

Solución:
- Reemplazo inyector defectuoso
- Verificar ECU no dañado

**FALLA 3: Orificios Bloqueados / Depósitos Carbón**

Síntomas:
- Misfire en cilindro específico
- Arranque difícil
- Economía combustible pobre
- Humo negro

Diagnóstico:
- Test balance: Caída RPM baja en cilindro afectado
- Extracción: Depósitos visibles en punta
- Banco prueba: Flujo bajo o spray asimétrico

Solución:
- Limpieza ultrasónica profesional
- Tasa éxito: 60-80% según severidad
- Si muy dañado: Reemplazo

**FALLA 4: Asiento Desgastado (Goteo)**

Síntomas:
- Arranque difícil (especialmente caliente)
- Humo blanco al arrancar
- Olor gasolina no quemada
- Posible código: P0300 (Random Misfire)

Diagnóstico:
- Test fugas: Goteo continuo
- ExtRacción: Inspección asiento con lupa
- Banco: Goteo después cesar pulso

Solución:
- Reemplazo inyector (asiento no reparable)
- Verificar presión combustible (presión alta acelera desgaste)

[NUMEROS DE PARTE COMUNES]

**EV1 (Alta Impedancia):**
- Bosch 0280150 series
- Ejemplo: 0280150415 (Ford), 0280150846 (GM)

**EV6 (Baja Impedancia):**
- Bosch 0280155 series / 0280156 series
- Ejemplo: 0280155968 (Ford), 0280156280 (Mazda)

**EV14 (Performance):**
- Bosch 0280158 series
- Ejemplo: 0280158040 (500cc), 0280158117 (1000cc)

**Common Rail Diesel:**
- Bosch 0445110 series (inyector completo)
- Bosch 0986435 series (aftermarket)

[INTERCAMBIABILIDAD Y UPGRADE]

**Upgrade EV1 → EV6:**
- POSIBLE si ECU soporta baja impedancia
- Verificar: ECU debe tener driver peak-and-hold
- Conector: Requiere adaptador o cambio conector

**Upgrade EV6 → EV14:**
- GENERALMENTE COMPATIBLE (mismo conector)
- Verificar: Caudal apropiado (cc/min)
- ECU moderna: Ya soporta PWM/peak-hold
- Beneficio: Mejor atomización, respuesta más rápida

**Consideraciones:**
- Flujo (cc/min) debe coincidir ±10%
- Presión combustible debe ser compatible
- Largo inyector debe coincidir (algunos motores espacio limitado)
- Resistencia: Verificar compatibilidad driver ECU

[MANTENIMIENTO Y PREVENCION]

**Cada 30,000 km:**
- Agregar limpiador inyectores al tanque
- Marcas compatibles: Bosch, Liqui Moly, Techron

**Cada 60,000 km:**
- Limpieza profesional recomendada
- Método ultrasónico preferible
- Test flujo y spray pattern

**Cada 100,000-120,000 km:**
- Considerar reemplazo preventivo
- Especialmente: Motores turbo, combustible dudoso

**Combustible:**
- Usar gasolina Top Tier (EE.UU.) o equivalente
- Evitar gasolina etanol >10% (degrada sellos)
- Reemplazar filtro combustible regularmente

[COSTO APROXIMADO]

Inyector Bosch Original:
- EV1: $40-$80 USD
- EV6: $60-$120 USD
- EV14: $100-$250 USD (según cc/min)
- Piezoeléctrico GDI: $150-$400 USD
- Diesel Common Rail: $200-$600 USD

Limpieza:
- Servicio limpieza profesional: $100-$200 USD (set completo)

Instalación:
- Mano obra: 1-3 horas ($80-$250 USD)
`
  },
  {
    title: "Inyectores Denso - Especificaciones Técnicas (Toyota, Honda, Mazda, Nissan)",
    keywords: [
      "inyector denso",
      "denso toyota",
      "denso honda",
      "voltaje denso",
      "especificaciones denso",
      "inyector japones",
      "denso d4",
      "denso gdi"
    ],
    answer: `
[FABRICANTE]
Denso Corporation (Nippon Denso)
- Fabricante japonés, segundo mayor mundial
- Proveedor principal: Toyota, Honda, Mazda, Nissan, Subaru
- Tecnologías: Solenoide convencional, D4/D4S (GDI), Common Rail Diesel

[TIPOS INYECTORES DENSO]

**GASOLINA PORT INJECTION:**

1. **Tipo Solenoide Estándar (1995-Presente):**
   - Impedancia: Alta (12-16 ohms) o Baja (2-4 ohms)
   - Voltaje: 12V
   - Aplicaciones: Toyota, Honda, Mazda años 90s-2000s

2. **Sistema D4 (Direct Injection 4-stroke):**
   - Inyección directa gasolina (GDI)
   - Voltaje: 12V batería + 50-70V actuador
   - Presión: 13-20 MPa (130-200 bar)
   - Aplicaciones: Toyota desde 2006+

3. **Sistema D4-S (D4 + Port Injection):**
   - Dual inyección: Directa + puerto
   - Control: ECU alterna según carga motor
   - Aplicaciones: Toyota/Lexus motores V6/V8 modernos

**DIESEL COMMON RAIL:**

1. **G3 (Generación 3):**
   - Presión: 1800-2000 bar
   - Aplicaciones: Toyota Hilux, Fortuner, Land Cruiser Prado

2. **G4 (Generación 4):**
   - Presión: 2500-3000 bar
   - Piezoeléctrico opcional
   - Aplicaciones: Toyota diesel modernos

[ESPECIFICACIONES TECNICAS DENSO GASOLINA]

**INYECTOR DENSO SOLENOIDE ALTA IMPEDANCIA:**

Eléctrico:
- Voltaje Operación: 12V nominal (10-15V)
- Corriente: 0.8-1.3 Amperios
- Resistencia: 12-16 ohms (típicamente 13.8 ohms Toyota)
- Inductancia: 10-15 mH
- Potencia: 10-16 Watts
- Driver ECU: Saturado (simple switching)

Mecánico:
- Presión Operación: 2.5-4.5 bar (36-65 PSI)
  - Toyota típica: 2.8-3.0 bar (44 PSI)
  - Honda típica: 3.5-4.0 bar (51-58 PSI)
- Caudal Típico: 160-380 cc/min @ 3 bar
  - Motor 1.6L: 180-220 cc/min
  - Motor 2.0L: 220-280 cc/min
  - Motor 2.5L+: 300-380 cc/min
- Tiempo Respuesta: 2.0-3.5 ms
- Spray Patrón: Cónico (ángulo 20-35°)
- Atomización: Gotas 40-80 micrómetros

**INYECTOR DENSO BAJA IMPEDANCIA:**

Eléctrico:
- Voltaje: 12V nominal
- Corriente Pico: 4-8 Amperios (0.3-0.8 ms)
- Corriente Hold: 1.0-2.0 Amperios
- Resistencia: 2.0-4.0 ohms (típicamente 2.5 ohms)
- Driver: Peak-and-Hold

Mecánico:
- Presión: 3.0-5.0 bar
- Caudal: 220-520 cc/min
- Respuesta: 1.5-2.5 ms (más rápido que alta impedancia)

[SISTEMA DENSO D4 (INYECCION DIRECTA)]

**Especificaciones D4:**

Eléctrico:
- Voltaje Batería: 12V alimentación
- Voltaje Inyector: 50-70V (convertidor boost ECU)
- Corriente Pico: 8-15 Amperios
- Corriente Hold: 2-4 Amperios
- Resistencia Solenoide: 0.5-1.5 ohms
- Driver: Boost + Peak-and-Hold

Mecánico:
- Presión Operación: 5-20 MPa (50-200 bar / 725-2900 PSI)
  - Ralentí/Baja Carga: 5-8 MPa
  - Media Carga: 10-15 MPa
  - Alta Carga/WOT: 15-20 MPa
- Bomba Alta Presión: Accionada mecánicamente por motor
- Caudal: Variable según presión y tiempo
- Tiempo Inyección: 0.5-15 ms según carga
- Respuesta: 0.8-1.5 ms
- Orificios: 6-8 micro-orificios (diámetro 0.15-0.20 mm)
- Spray Patrón: Multi-chorro optimizado
- Atomización: <20 micrómetros

**Sistema D4-S (Dual Injection):**

Port Injection:
- Inyector convencional: 12V, alta impedancia
- Presión: 3.0-4.0 bar
- Uso: Arranque frío, alta carga

Direct Injection:
- Inyector D4: 50-70V, 50-200 bar
- Uso: Ralentí, crucero, media carga

Estrategia ECU:
\`\`\`
Condición Motor          Port     Direct    Razón
───────────────────────────────────────────────────────────────────
Arranque Frío (<40°C)    100%     0%        Mejor vaporización port
Calentamiento            80%      20%       Gradual transición
Ralentí Caliente         0%       100%      Economía combustible
Crucero 2000-3000 RPM    0%       100%      Eficiencia máxima
Aceleración Media        20%      80%       Respuesta suave
WOT / Alta Carga         40%      60%       Enfriamiento cámara
\`\`\`

[ESPECIFICACIONES DENSO DIESEL COMMON RAIL]

**Denso G3 (Generación 3):**

Eléctrico:
- Voltaje: 12V (autos) / 24V (camiones)
- Corriente Pico: 18-25 Amperios
- Corriente Hold: 10-15 Amperios
- Resistencia: 0.3-0.6 ohms
- Driver: Peak-and-Hold especializado

Mecánico:
- Presión Rail: 200-2000 bar (variable)
  - Ralentí: 300-500 bar
  - Crucero: 800-1200 bar
  - Alta Carga: 1600-2000 bar
- Caudal: 100-200 mg por inyección
- Tiempo Apertura: 0.5-1.5 ms
- Tiempo Cierre: 0.3-0.8 ms
- Orificios: 6-8 (diámetro 0.12-0.16 mm)
- Múltiples Inyecciones:
  - Piloto: 1-3 mg (reduce ruido)
  - Principal: 20-80 mg (potencia)
  - Post: 2-10 mg (reducción NOx)

**Denso G4 (Generación 4 - Piezoeléctrico):**

Similar especificaciones pero:
- Presión: Hasta 3000 bar
- Tiempo Respuesta: 0.2-0.5 ms (más rápido)
- Inyecciones: Hasta 8 eventos por ciclo
- Precisión: ±0.5% (vs ±2% solenoide)

[DIAGNOSTICO INYECTORES DENSO]

**PRUEBA 1: Identificación y Resistencia**

Procedimiento:
1. Desconectar conector inyector
2. Medir resistencia con DVOM
3. Comparar con especificación

Valores Denso:
\`\`\`
Tipo                    Resistencia      Aplicación Típica
─────────────────────────────────────────────────────────────────
Alta Impedancia         12-16 ohms       Toyota Camry, Corolla 90s-2000s
Baja Impedancia         2.0-4.0 ohms     Honda, Mazda turbo
D4 Direct Injection     0.5-1.5 ohms     Toyota 2AZ-FE, 2GR-FSE
Diesel G3               0.3-0.6 ohms     Toyota Hilux, Fortuner
\`\`\`

Interpretación:
- Si <50% valor especificado: Cortocircuito interno
- Si >200% valor especificado: Bobina dañada (comenzando falla)
- Si infinito: Circuito abierto, inyector defectuoso

**PRUEBA 2: Voltaje Alimentación**

Con motor encendido:
1. Conectar DVOM a conector inyector (backprobe)
2. Pin positivo debe mostrar voltaje batería

Especificación:
- Inyectores Port: 12V ±1V
- Inyectores D4: 12V en conector (50-70V interno ECU)
- Diesel: 12V o 24V según vehículo

Si voltaje bajo (<11V):
- Verificar: Conexión conector, cableado, relay inyectores

**PRUEBA 3: Señal de Control (Osciloscopio)**

**Para Inyector Alta Impedancia (Saturado):**

Configuración osciloscopio:
- Escala Voltaje: 5V/división
- Escala Tiempo: 5 ms/división
- Trigger: Flanco descendente

Patrón Normal:
\`\`\`
Voltaje
  │
12V│──────┐            ┌────────
  │      │            │
  │      │            │
  │      └────────────┘
  0V└──────────────────────────> Tiempo
         │◄──3-5ms───►│
\`\`\`

Mediciones:
- Voltaje Alto: 12V (inyector cerrado)
- Voltaje Bajo: 0-1V (inyector abierto)
- Duración Ralentí: 3-5 ms
- Duración 3000 RPM: 5-8 ms
- Frecuencia: Sincronizada con RPM (4 cilindros: RPM/60 × 2)

**Para Inyector D4 (Direct Injection):**

Patrón más complejo:
\`\`\`
Voltaje
  │
70V│  ┌─┐
  │  │ │
50V│  │ │
  │  │ └──┐
12V│──┘    └──┐
  │          │
  0V└────────┴────────────────> Tiempo
      │◄1-3ms►│
\`\`\`

Características:
- Pico boost: 50-70V (generado internamente ECU)
- Duración boost: 0.5-1.5 ms
- Después: Hold a 12V
- Forma depende de driver ECU específico

**PRUEBA 4: Test de Balance de Cilindros**

Herramienta: Escáner OBD2 Toyota/Honda específico (Techstream, HDS)

Procedimiento:
1. Motor a temperatura operación
2. Función: "Injector Balance Test" o "Cylinder Power Balance"
3. ECU desactiva cilindros secuencialmente
4. Observar caída RPM

Especificación Denso:
\`\`\`
Cilindro    Caída RPM    Estado
─────────────────────────────────
Cilindro 1   120 RPM     ✓ OK
Cilindro 2   115 RPM     ✓ OK
Cilindro 3   125 RPM     ✓ OK
Cilindro 4   130 RPM     ✓ OK
Diferencia:  15 RPM      ✓ OK (<20 RPM)
\`\`\`

Interpretación:
- Diferencia <20 RPM: Normal
- Diferencia 20-40 RPM: Monitorear, posible desgaste
- Diferencia >40 RPM: Inyector defectuoso en cilindro con mayor diferencia
- Si cilindro con caída muy baja (<80 RPM): Inyector débil/bloqueado
- Si cilindro con caída excesiva (>180 RPM): Inyector con goteo

**PRUEBA 5: Duración Pulso (Live Data)**

Escáner: Mostrar "Injector Pulse Width" todos cilindros

Valores Típicos Toyota 2.0L:
\`\`\`
Condición               Duración Pulso    Presión Combustible
────────────────────────────────────────────────────────────────
Ralentí 750 RPM         2.5-3.5 ms        3.0 bar (44 PSI)
Crucero 2000 RPM        3.5-5.0 ms        3.0 bar
Aceleración 4000 RPM    6.0-10.0 ms       3.0 bar
WOT                     12-18 ms          3.0 bar
\`\`\`

Si duración excesiva mismo cilindro:
- Indica: Flujo bajo ese inyector
- ECU compensa aumentando tiempo
- Acción: Limpieza o reemplazo

**PRUEBA 6: Limpieza y Flow Test en Banco**

Equipamiento: Banco limpieza/prueba Denso compatible

Procedimiento:
1. Extraer inyectores
2. Conectar a banco (verificar adaptadores correctos)
3. Pre-test flujo:
   - Frecuencia: 3000 pulsos/min
   - Duración: 3.0 ms
   - Presión: 3.0 bar
   - Tiempo: 60 segundos
4. Limpieza ultrasónica (15-30 min)
5. Post-test flujo (mismo procedimiento)

Especificación:
- Flujo similar pre/post: Inyector sin depósitos significativos
- Mejora >10% post-limpieza: Limpieza efectiva
- Mejora <5% y flujo bajo: Desgaste mecánico, reemplazar
- Diferencia entre inyectores: <3% ideal, <5% aceptable

[FALLAS COMUNES DENSO]

**FALLA 1: Depósitos Carbón (Denso Port Injection)**

Síntomas:
- Arranque difícil motor frío
- Ralentí irregular
- Misfire ocasional cilindro específico
- Economía combustible reducida

Diagnóstico:
- Códigos: P0300 (Random Misfire) + P030X (Cylinder X)
- Test balance: Caída RPM baja en cilindro afectado
- Extracción: Depósitos visibles punta inyector

Causa:
- Combustible bajo octanaje o con impurezas
- Largos períodos ralentí (taxis, entregas)
- Mantenimiento postergado

Solución:
- Limpieza ultrasónica: 70-80% éxito
- Aditivo limpiador tanque: Prevención
- Si limpieza no funciona: Reemplazo

**FALLA 2: Bobina Abierta (Open Circuit)**

Síntomas:
- Cilindro completamente muerto
- Código: P0201-P0204 (Circuit Open)
- Motor funciona con 3 cilindros (4 cil) o fallando

Diagnóstico:
- Resistencia: Infinita (>1 Mohm)
- Voltaje presente: 12V en conector
- Corriente: 0A

Causa:
- Sobrecalentamiento
- Edad/desgaste (>200,000 km común)
- Vibración motor (montajes desgastados)

Solución:
- Reemplazo inyector
- No reparable

**FALLA 3: Sistema D4 - Presión Alta Anormal**

Síntomas:
- Ruido metálico motor
- Vibraciones
- Código: P1604 (Startability Malfunction)
- Difícil arranque

Diagnóstico:
- Escáner: "Fuel Pressure (Direct)" >20 MPa en ralentí
- Normal: 5-8 MPa ralentí
- Causa posible: Regulador presión defectuoso

Solución:
- Verificar: Válvula reguladora presión (en bomba o rail)
- Reemplazo regulador
- Verificar inyectores no dañados por sobrepresión

**FALLA 4: Sistema D4 - Inyector Gotea**

Síntomas:
- Humo blanco al arrancar (especialmente caliente)
- Olor gasolina no quemada
- Bujías húmedas/negras
- Posible código: P1A80 (Direct Injection System Malfunction)

Diagnóstico:
- Test presión: Caída rápida después apagar motor
- Extracción inyectores: Uno o más con carbonilla excesiva
- Banco prueba: Goteo visible después cesar pulso

Causa:
- Asiento inyector dañado
- Presión excesiva crónica
- Partículas bloquean cierre

Solución:
- Reemplazo inyector(es) afectado(s)
- Toyota recomienda: Reemplazar todos si >150,000 km

**FALLA 5: Diesel G3 - Inyector Bloqueado**

Síntomas:
- Humo negro cilindro específico
- Pérdida potencia
- Ruido motor anormal (golpeteo)
- Códigos: P0201-P0204 + P0300-P0304

Diagnóstico:
- Escáner: "Injection Quantity Correction" uno cilindro fuera rango
  - Normal: -2.0 a +2.0 mg/stroke
  - Defectuoso: <-5.0 o >+5.0 mg/stroke
- Test balance: Desbalance severo

Causa:
- Combustible diesel contaminado
- Agua en diesel
- Carbón acumulado

Solución:
- Limpieza profesional: 50% éxito (diesel más difícil que gasolina)
- Generalmente: Reemplazo requerido
- Verificar sistema combustible (filtro, tanque, bomba)

[NUMEROS DE PARTE DENSO]

**Toyota:**
- Denso 23250-series (Gasolina Port)
  - Ejemplo: 23250-28020 (Camry 2.4L 2AZ-FE)
  - 23250-74270 (Corolla 1.8L 2ZR-FE)
- Denso 23209-series (D4 Direct Injection)
  - Ejemplo: 23209-39145 (Camry 2.5L D4)
- Denso 23670-series (Diesel)
  - Ejemplo: 23670-30400 (Hilux 3.0L)

**Honda:**
- Denso 297500-series
  - Ejemplo: 297500-0620 (Honda Civic Si)
  - 16450-RNA-A01 (Honda OEM packaging)

**Mazda:**
- Denso 195500-series
  - Ejemplo: 195500-4450 (Mazda3 2.0L)

**Nissan:**
- Denso 16600-series
  - Ejemplo: 1660000Q0J (Nissan Sentra)

[CROSS-REFERENCE Y COMPATIBILIDAD]

Denso vs Bosch:
- NO directamente intercambiables generalmente
- Diferencias: Longitud, conector, spray patrón, flujo
- Algunos modelos Honda: Pueden usar Bosch o Denso (verificar año)

OEM vs Aftermarket:
- Denso Original: Mayor calidad, mayor costo
- Denso Aftermarket: Calidad equivalente, empaque diferente
- Alternativas: GB Remanufacturing, Standard Motor Products

Upgrade Flujo:
- Posible para tuning: Usar inyector Denso mayor cc/min
- Ejemplo: Civic Si upgrade de 310cc a 410cc
- Importante: ECU debe ser reprogramado (tune)

[MANTENIMIENTO PREVENTIVO]

**Toyota D4/D4-S Específico:**

Cada 10,000-15,000 km:
- Usar aditivo limpiador inyectores directos
- Recomendado: Toyota Fuel Injector Cleaner
- Alternativa: Liqui Moly Jectron, BG 44K

Cada 50,000 km:
- Inspección visual inyectores (si accesible)
- Verificar códigos almacenados (history)
- Test balance cilindros

Cada 100,000 km:
- Limpieza profesional walnut blasting válvulas admisión
- Razón: D4 no limpia válvulas (inyección directa)
- Limpieza inyectores banco profesional

Cada 160,000 km:
- Considerar reemplazo preventivo inyectores D4
- Toyota especifica: "Service life" aproximadamente este kilometraje

**Honda/Mazda Port Injection:**

Cada 30,000 km:
- Aditivo limpiador Top Tier
- Verificar filtro combustible

Cada 80,000 km:
- Limpieza profesional inyectores
- Test flujo y spray

Cada 150,000 km:
- Considerar reemplazo si síntomas presentes

**Diesel Common Rail:**

Cada 20,000 km:
- Aditivo diesel (lubricante y limpiador)
- Drenar agua filtro combustible

Cada 40,000 km:
- Reemplazo filtro combustible (crítico)

Cada 80,000 km:
- Limpieza sistema Common Rail completo
- Test inyectores en banco especializado

[COSTOS APROXIMADOS]

Inyectores Originales Denso:
- Port Injection Gasolina: $70-$150 USD cada uno
- D4 Direct Injection: $200-$400 USD cada uno
- Diesel G3 Common Rail: $300-$600 USD cada uno

Limpieza:
- Limpieza en vehículo (servicio): $120-$200 USD
- Limpieza banco profesional (set 4): $150-$300 USD
- Walnut blasting válvulas (D4): $300-$600 USD

Instalación:
- Port injection: 1-2 horas ($80-$180 USD)
- D4 direct injection: 3-5 horas ($250-$450 USD) - mayor complejidad

Recomendación:
- Puerto: Reemplazar individualmente OK
- D4/Diesel: Preferible reemplazar set completo (flujo balanceado)
`
  },
  {
    title: "Inyectores Delphi - Especificaciones Técnicas (GM, Chrysler, Ford)",
    keywords: [
      "inyector delphi",
      "delphi gm",
      "delphi multec",
      "voltaje delphi",
      "especificaciones delphi",
      "inyector chrysler",
      "delphi ford"
    ],
    answer: `
[FABRICANTE]
Delphi Technologies (anteriormente Delphi Automotive, antes Delco Electronics)
- División GM, ahora independiente (BorgWarner desde 2020)
- Proveedor principal: General Motors, Chrysler, Ford, diversos europeos
- Tecnologías: Multec series (port injection), GDi (direct injection), Diesel Common Rail

[FAMILIA INYECTORES DELPHI MULTEC]

**GENERACIONES:**

**Multec 1 (1990-2000):**
- Tipo: Solenoide saturado
- Impedancia: Alta (12-16 ohms)
- Conector: Top-feed o side-feed
- Aplicaciones: GM TBI, PFI años 90s

**Multec 2 (1997-2010):**
- Tipo: Solenoide peak-and-hold
- Impedancia: Baja (2-5 ohms)
- Presión: 3.5-4.5 bar
- Aplicaciones: GM, Opel, Saab

**Multec 3 (2000-2015):**
- Tipo: Solenoide mejorado
- Spray: Multi-orificio optimizado (12 orificios)
- Atomización: Mejorada (<50 micrones)
- Aplicaciones: GM Ecotec, Chrysler

**Multec 3.5 (2010-Presente):**
- Tipo: Solenoide alta respuesta
- Impedancia: 0.8-3.0 ohms
- Orificios: 12-16 micro-orificios
- Aplicaciones: GM Ecotec turbo, performance

[ESPECIFICACIONES TECNICAS DELPHI]

**MULTEC 1 (Alta Impedancia - Saturado):**

Eléctrico:
- Voltaje Operación: 12V nominal (9-16V)
- Corriente: 0.8-1.2 Amperios
- Resistencia Bobina: 12-16 ohms (típicamente 13.5 ohms)
- Inductancia: 10-14 mH
- Potencia: 10-15 Watts
- Driver ECU: Saturated switching (simple on/off)

Mecánico:
- Presión Operación: 2.5-4.0 bar (36-58 PSI)
  - TBI (Throttle Body): 0.8-1.2 bar (12-18 PSI)
  - PFI (Port): 3.0-3.5 bar (43-51 PSI)
- Caudal: 150-350 cc/min @ 3 bar
- Tiempo Respuesta: 2.5-4.5 ms
- Spray: Cónico simple (ángulo 15-30°)
- Orificios: 1-4 orificios

**MULTEC 2 (Baja Impedancia - Peak-and-Hold):**

Eléctrico:
- Voltaje: 12V nominal
- Corriente Pico: 4-7 Amperios (0.5-1.0 ms)
- Corriente Hold: 1.0-1.8 Amperios
- Resistencia: 2.0-5.0 ohms (típicamente 2.7 ohms GM)
- Inductancia: 2-4 mH
- Driver: Peak-and-hold (corriente dual)

Mecánico:
- Presión: 3.5-4.5 bar (51-65 PSI)
- Caudal: 220-480 cc/min
- Respuesta: 1.5-2.8 ms
- Spray: Cónico mejorado (25-40°)
- Orificios: 4-8 orificios

**MULTEC 3 (12-Hole Design):**

Eléctrico:
- Voltaje: 12V
- Corriente Pico: 5-8A
- Corriente Hold: 1.2-2.0A
- Resistencia: 1.5-3.5 ohms
- Driver: Peak-and-hold o PWM

Mecánico:
- Presión: 3.8-5.5 bar (55-80 PSI)
- Caudal: 280-650 cc/min @ 3.5 bar
- Respuesta: 1.2-2.2 ms (mejorada)
- Orificios: 12 micro-orificios (configuración circular)
- Spray: Multi-chorro optimizado
- Atomización: Gotas <50 micrómetros
- Ángulo: Variable según aplicación (30-60° total)

Ventaja 12 Orificios:
- Atomización superior (gotas más pequeñas)
- Distribución uniforme combustible
- Menor formación depósitos
- Mayor eficiencia combustión

**MULTEC 3.5 (Performance/Turbo):**

Eléctrico:
- Voltaje: 12V
- Resistencia: 0.8-2.5 ohms (muy baja)
- Corriente: 3-6A (PWM controlado)
- Driver: PWM alta frecuencia

Mecánico:
- Presión: 4.0-6.5 bar (58-94 PSI)
- Caudal: 300-1200 cc/min (amplio rango)
  - Multec 3.5-380: 380 cc/min
  - Multec 3.5-630: 630 cc/min
  - Multec 3.5-1000: 1000 cc/min (turbo extremo)
- Respuesta: 0.8-1.8 ms (muy rápida)
- Orificios: 12-16 micro-orificios

[SISTEMA DELPHI GDi (INYECCION DIRECTA)]

**Especificaciones Delphi GDi:**

Eléctrico:
- Voltaje Batería: 12V alimentación
- Voltaje Inyector: 48-65V (convertidor boost ECU interno)
- Corriente Pico: 10-18 Amperios
- Corriente Hold: 2-5 Amperios
- Resistencia Solenoide: 0.4-1.2 ohms
- Driver: Voltage boost + current control

Mecánico:
- Presión Operación: 5-20 MPa (50-200 bar / 725-2900 PSI)
  - Ralentí: 5-10 MPa
  - Crucero: 10-15 MPa
  - WOT: 15-20 MPa
- Bomba Presión: Mecánica (accionada árbol levas) + eléctrica baja presión
- Caudal: Variable según presión y tiempo
- Tiempo Inyección: 0.5-12 ms según carga
- Respuesta: 0.7-1.3 ms
- Orificios: 6-8 micro-orificios
- Spray Patrón: Multi-chorro dirigido
- Atomización: <25 micrómetros

Aplicaciones:
- GM Ecotec 2.0T, 2.4L GDi
- Cadillac V6/V8 direct injection
- Buick LaCrosse 3.6L

[DIESEL COMMON RAIL DELPHI]

**Generaciones:**

**DCR1 (Common Rail Diesel Gen 1):**
- Presión: 1350-1600 bar
- Aplicaciones: GM/Isuzu diesel 2000s

**DCR2:**
- Presión: 1600-1800 bar
- Inyecciones: 3-4 por ciclo

**DCR3 (Actual):**
- Presión: 2000-2500 bar
- Inyecciones: 5-7 por ciclo
- Aplicaciones: GM Duramax moderne, diversos diesel mercado

**Especificaciones DCR3:**

Eléctrico:
- Voltaje: 12V (pickup) o 24V (camión pesado)
- Corriente Pico: 20-28 Amperios
- Corriente Hold: 12-18 Amperios
- Resistencia: 0.25-0.55 ohms
- Driver: Peak-and-hold diesel específico

Mecánico:
- Presión Rail: 300-2500 bar (variable según carga)
- Caudal: 120-280 mg por inyección
- Tiempo Apertura: 0.4-1.2 ms
- Orificios: 6-8 (diámetro 0.12-0.18 mm)
- Múltiples Inyecciones:
  - Pre-pilot: 0.5-2 mg
  - Pilot: 2-5 mg
  - Principal: 30-120 mg
  - Post 1: 3-8 mg
  - Post 2: 2-5 mg (regeneración DPF)

[DIAGNOSTICO INYECTORES DELPHI]

**PRUEBA 1: Resistencia Estática**

Procedimiento:
1. Desconectar conector inyector
2. Medir resistencia entre terminales
3. Comparar con especificación

Valores Delphi:
\`\`\`
Serie              Resistencia      Tipo Driver        Aplicación
───────────────────────────────────────────────────────────────────────
Multec 1           12-16 ohms       Saturado           GM TBI/PFI 90s
Multec 2           2.0-5.0 ohms     Peak-Hold          GM Ecotec, Opel
Multec 3           1.5-3.5 ohms     Peak-Hold/PWM      GM Ecotec II
Multec 3.5         0.8-2.5 ohms     PWM                Turbo, Performance
GDi                0.4-1.2 ohms     Boost 48-65V       Direct Injection
Diesel DCR3        0.25-0.55 ohms   Peak-Hold Diesel   Duramax, etc
\`\`\`

Interpretación:
- Si <50% especificación: Cortocircuito bobina
- Si >150% especificación: Bobina en proceso falla
- Si infinito: Circuito abierto, reemplazar

**PRUEBA 2: Test Corriente con Pinza Amperimétrica**

Herramienta: Pinza profesional AC/DC

Procedimiento:
1. Motor encendido, ralentí
2. Colocar pinza en cable positivo inyector individual
3. Observar patrón corriente

**Multec 1 (Saturado):**
\`\`\`
Corriente
  │
1.2A│      ┌──────────────┐
  │      │              │
0.8A│      │              │
  │      │              │
  0A└──────┴──────────────┴──────> Tiempo
         │◄────3-5ms────►│
\`\`\`
- Forma: Cuadrada con subida/bajada relativamente lenta
- Pico único: 0.8-1.2A constante
- Duración: 3-5 ms ralentí

**Multec 2/3 (Peak-and-Hold):**
\`\`\`
Corriente
  │
 6A│   ┌┐
  │   ││
 4A│   ││
  │   │└───────────┐
1.5A│   │          │
  │   │          │
  0A└───┴──────────┴─────> Tiempo
      │◄───2-4ms───►│
\`\`\`
- Pico inicial: 4-6A (0.5-1ms)
- Hold: 1.0-1.8A resto pulso
- Transición: Rápida y limpia

**Multec 3.5 (PWM):**
\`\`\`
Corriente
  │
 8A│ ┌┐┌┐┌┐┌┐┌┐┌┐┌┐┌┐
  │ ││││││││││││││││
 4A│ ││││││││││││││││
  │ ││││││││││││││││
  0A└─┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴──> Tiempo
     │◄PWM 5-15kHz ►│
\`\`\`
- Modulación alta frecuencia visible
- Promedio: 3-6A
- Requiere osciloscopio > 50 MHz para detalle

**PRUEBA 3: Test Balance Inyectores (Escáner GM Específico)**

Herramienta: Tech 2, GDS2, MDI con software GM

Procedimiento:
1. Motor temperatura operación (85-95°C)
2. Conectar escáner
3. Navegar: Powertrain → Fuel System → Injector Balance Test
4. ECU desactiva cilindros secuencialmente
5. Observar caída RPM

Especificación GM:
\`\`\`
Cilindro      Caída RPM      Estado
────────────────────────────────────────
Cilindro 1     110 RPM       ✓ OK
Cilindro 2     105 RPM       ✓ OK
Cilindro 3     115 RPM       ✓ OK
Cilindro 4     108 RPM       ✓ OK
Máxima Dif:    10 RPM        ✓ OK (<25 RPM)
\`\`\`

Interpretación:
- Diferencia <25 RPM: Normal
- Diferencia 25-50 RPM: Revisar inyector outlier
- Diferencia >50 RPM: Inyector defectuoso
- Caída <80 RPM: Inyector débil/bloqueado
- Caída >160 RPM: Inyector con goteo o sobreflujo

**PRUEBA 4: Inspección Spray Pattern (Banco Prueba)**

Equipamiento: Banco limpieza/prueba compatible Delphi

Multec 3 Pattern Normal (12 Orificios):
\`\`\`
Vista Frontal Inyector:
       
    ○ ○ ○        12 chorros
  ○  \ | /  ○    simétricos
  ○ ─ ◉ ─ ○    radiales
  ○  / | \  ○    desde centro
    ○ ○ ○
\`\`\`

Características:
- 12 chorros equidistantes
- Ángulo: 30-50° cónico
- Longitud chorros: Similar (±5%)
- Atomización: Niebla fina
- Sin goteo post-cierre

Defectos Comunes:
- Chorros desbalanceados: Orificios bloqueados
- Spray asimétrico: Depósitos carbón
- Goteo: Asiento dañado
- Chorros focalizados (no atomizados): Presión baja

[FALLAS COMUNES DELPHI]

**FALLA 1: Seal (O-Ring) Deteriorado - Fuga Externa**

Síntomas:
- Olor gasolina en compartimiento motor
- Manchas gasolina en intake manifold o inyector
- Posible código: P0171/P0174 (System Lean) - pierde presión
- Arranque difícil después estar estacionado

Diagnóstico:
- Inspección visual: Gasolina visible external inyector
- Presión combustible: Cae rápidamente motor OFF
- Extracción: O-rings rígidos, agrietados, hinchados

Causa:
- Edad (caucho se degrada)
- Combustible etanol (E15, E85) acelera degradación
- Calor motor excesivo

Solución:
- Reemplazo O-rings:
  - Superior (combustible)
  - Inferior (sellado intake)
- Costo: $10-$30 kit seals
- Tiempo: 1-2 horas
- Recomendación: Reemplazar todos cilindros simultáneamente

**FALLA 2: Spider Injector (GM TBI) - Fuga Interna**

Específico: GM Vortec 4.3L, 5.0L, 5.7L (1996-2002) con CSFI/CMFI

Síntomas:
- Misfire múltiples cilindros
- Humo blanco
- Hydro-lock (casos severos)
- Códigos: P0300 + múltiples P030X

Diagnóstico:
- Remoción plenum: Inspeccionar popet valves y distribuidores
- Evidencia: Combustible acumulado en intake runners
- Popets: Pueden estar pegados o con fugas

Causa:
- Diseño deficiente GM (fallo conocido)
- Popet seals se degradan
- Combustible gotea continuamente

Solución:
- Reemplazo assembly completo "spider"
- Costo: $200-$400 assembly
- Alternativa: Kit upgrade (convierte a inyección multi-port verdadera)
- Mano obra: 3-5 horas (trabajoso - remover plenum completo)

**FALLA 3: Multec 3 - Orificios Bloqueados Parcialmente**

Síntomas:
- Pérdida potencia gradual
- Economía combustible reducida
- Misfire intermitente (P0300)
- Arranque difícil frío

Diagnóstico:
- Test balance: Inyector muestra débil (caída RPM baja)
- Live data: Duración pulso mayor ese cilindro (ECU compensa)
- Extracción: Depósitos visibles en 12 orificios

Causa:
- Combustible bajo calidad
- Largos períodos sin usar vehículo
- Carbón acumulación (GDi especialmente)

Solución:
- Limpieza ultrasónica: 60-70% efectividad Multec 3
- Procedimiento:
  1. Extracción inyectores
  2. Ultrasónico 15-30 min
  3. Flush reverso
  4. Test flujo post-limpieza
- Si limpieza no restaura: Reemplazo
- Prevención: Usar Top Tier gasoline, aditivos cada 5000 km

**FALLA 4: GDi Delphi - Carbon Buildup Válvulas**

Común en: GM Ecotec turbo direct injection

Síntomas:
- Pérdida potencia progresiva
- Ralentí irregular después 80,000+ km
- Misfire múltiple (P0300)
- Códigos: P0299 (Turbo Underboost)

Diagnóstico:
- Boroscopio: Inspección válvulas admisión
  - Normal: Metal limpio visible
  - Defectuoso: Capa gruesa carbón negro (2-5mm)
- Test compresión: Puede estar afectada
- Inyectores: Típicamente OK (carbón en válvulas, no inyectores)

Causa:
- GDi no "lava" válvulas admisión con combustible
- PCV (aceite) crea depósitos
- Normal después 60,000-100,000 km

Solución:
- Walnut blasting (granallado nuez):
  - Procedimiento: 2-4 horas
  - Costo: $300-$600 USD
  - Efectividad: 95%
- Prevención:
  - Usar aceite bajo cenizas (Low SAPS)
  - Cambios aceite frecuentes (5000 km)
  - Aditivo PCV cleaner
  - Considerar: Catch can (oil separator)

**FALLA 5: Diesel DCR - Inyector Stuck Open**

Síntomas:
- Ruido metálico severo motor
- Humo blanco excesivo
- Motor no arranca o arranca y para
- Códigos: P0201-P0208 + P0093 (Large Fuel Leak)

Diagnóstico:
- Escáner: "Injection Quantity Deviation" uno cilindro extremo (>±10)
- Test retorno combustible: Flujo excesivo
- Extracción: Inyector con aguja pegada abierta

Causa:
- Combustible contaminado (agua, suciedad)
- Fallo solenoide
- Desgaste mecánico aguja

Solución:
- Reemplazo inyector inmediato (puede dañar motor)
- Verificar sistema combustible:
  - Drenar tanque si contaminado
  - Reemplazar filtros
  - Verificar bomba alta presión no dañada
- Costo inyector Delphi diesel: $400-$700 USD

[NUMEROS DE PARTE DELPHI]

**GM Applications:**
- Multec 1: 17109450, 17113124 (diversos TBI/PFI 90s)
- Multec 2: 12562641 (Ecotec 2.2L), 12580426 (various)
- Multec 3: 12613411, 12629992 (Ecotec 2.4L)
- Multec 3.5: 12638530 (Ecotec turbo)
- Spider (CSFI): 17113124 (V6/V8 Vortec)

**Chrysler Applications:**
- Delphi FJ10054 (various port injection)
- Delphi FJ705 (Jeep 4.0L)

**Performance/Aftermarket:**
- Delphi 12580426 (380 cc/min - popular tuning)
- Delphi FJ10326 (630 cc/min - turbo)

[INTERCAMBIABILIDAD]

**Multec Series:**
- Multec 2 ↔ Multec 3: Generalmente compatible si mismo caudal
- Verificar: Longitud física (algunos intake rails diferentes)
- Conector: Típicamente compatible

**Cross-Reference:**
- Delphi Multec ↔ Bosch EV6: Algunos modelos intercambiables
  - Verificar: Flujo, resistencia, longitud
  - Conector puede diferir
- Delphi ↔ Siemens: NO compatible (diseños muy diferentes)

**Upgrade Flujo:**
- Común tuning: Upgrade a mayor cc/min
- Ejemplo: Ecotec 2.0T stock 380 cc → 630 cc turbo upgrade
- Requiere: ECU tune, verificar presión combustible adecuada

[MANTENIMIENTO PREVENTIVO DELPHI]

**Multec Port Injection:**
- Cada 25,000 km: Aditivo limpiador tanque
- Cada 80,000 km: Limpieza profesional
- Cada 150,000 km: Considerar reemplazo

**GDi Direct Injection:**
- Cada 15,000 km: Aditivo específico GDi
- Cada 50,000 km: Inspección boroscopio válvulas
- Cada 80,000-100,000 km: Walnut blasting válvulas admisión
- Cada 120,000 km: Considerar limpieza inyectores GDi

**Spider Injector (GM Vortec):**
- REEMPLAZO PREVENTIVO recomendado si >100,000 km
- No esperar falla (puede causar daño motor)

**Diesel Common Rail:**
- Cada 20,000 km: Aditivo diesel calidad
- Cada 40,000 km: Filtro combustible
- Cada 80,000 km: Test inyectores banco profesional

[COSTOS APROXIMADOS]

Inyectores Nuevos:
- Multec 1/2: $40-$90 USD cada uno
- Multec 3: $80-$150 USD cada uno
- Multec 3.5: $120-$250 USD cada uno
- GDi: $180-$380 USD cada uno
- Diesel DCR: $400-$700 USD cada uno
- Spider Assembly: $200-$400 USD

Servicios:
- Reemplazo O-rings: $50-$150 USD (mano obra + partes)
- Limpieza inyectores banco: $120-$250 USD (set 4-6)
- Walnut blasting (GDi): $300-$600 USD
- Spider replacement: $350-$700 USD (labor intensivo)

Recomendación:
- Port injection: Individual OK
- GDi/Diesel: Juego completo preferible
- Spider GM: Siempre assembly completo + upgrade kit si disponible
`
  }
];

async function loadArticles() {
  console.log('Iniciando carga de Artículos de Fabricantes de Inyectores...');
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
  console.log('✅ Proceso completado - Artículos de Fabricantes');
  console.log(`Total procesado: ${articles.length} artículos`);
  console.log('');
  console.log('RESUMEN:');
  console.log('- Siemens/Continental Piezoeléctricos (GDI): Voltajes 60-150V, respuesta 0.15-0.5ms');
  console.log('- Bosch EV1/EV6/EV14: Generaciones solenoide, 12-16 / 2-5 / 0.8-2.5 ohms');
  console.log('- Denso (Toyota/Honda): D4/D4-S sistemas, 50-70V directos, diesel G3/G4');
  console.log('- Delphi Multec: Series 1-3.5, spider injectors GM, GDi 48-65V');
}

loadArticles();
