const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const updatedAnswers = [
  {
    title: "¿Qué es el AH (Ankerhub)?",
    answer: `[SIGNIFICADO]El AH (Ankerhub) es la carrera del inducido o del disco del electroimán.[/SIGNIFICADO]

[IMPORTANCIA]Es el 'corazón' del tiempo de respuesta del inyector.[/IMPORTANCIA]

[FALLA]Si es muy alto: El inyector tarda en abrir, causando pérdida de potencia.
Si es muy bajo: El inyector no cierra bien o se queda abierto, generando humo negro.[/FALLA]

[SOLUCIÓN]Cambiar la arandela de ajuste del inducido.[/SOLUCIÓN]

[CONSEJO]Si el AH está bien calibrado, el tiempo de inyección será preciso y el motor funcionará con normalidad.[/CONSEJO]`,
  },
  {
    title: "¿Qué es el DNH (Düsennadelhub)?",
    answer: `[SIGNIFICADO]El DNH (Düsennadelhub) es la alzada de la aguja de la tobera del inyector.[/SIGNIFICADO]

[IMPACTO]Si es insuficiente, el caudal en Carga Total (VL) será muy bajo aunque el resto de parámetros estén bien.
Esto causa falta de potencia y mala combustión.[/IMPACTO]

[SOLUCIÓN]Ajustar la arandela que limita el recorrido de la aguja dentro de la tobera.[/SOLUCIÓN]

[MEDICIÓN]Estas medidas se ajustan con láminas de reglaje (shims) y reloj comparador con precisión de ±0.05mm.[/MEDICIÓN]`,
  },
  {
    title: "¿Qué es el RLS (Rücklaufspiel)?",
    answer: `[SIGNIFICADO]El RLS (Rücklaufspiel) es el juego de retorno del inyector.[/SIGNIFICADO]

[CRÍTICO]Un RLS excesivo genera demasiado retorno de combustible hacia el tanque, haciendo que el riel pierda presión. Esto causa:
- El motor se apague
- No encienda correctamente
- Fallos intermitentes de arranque[/CRÍTICO]

[ADVERTENCIA]Esta es una de las medidas más críticas en inyectores Bosch serie 0445110/120.[/ADVERTENCIA]

[MEDICIÓN]Mídelo siempre con un sensor de micras electrónico si es posible.[/MEDICIÓN]`,
  },
  {
    title: "¿Qué significa un fallo en VL (Carga Total)?",
    answer: `[SIGNIFICADO]VL (Carga Total) es la cantidad de combustible inyectado bajo carga máxima del motor.[/SIGNIFICADO]

[SÍNTOMAS]Un fallo en VL indica problemas de potencia:
- Vehículo sin fuerza en subidas
- No alcanza velocidad máxima
- Pérdida general de potencia[/SÍNTOMAS]

[POSIBLES CAUSAS]1. Tobera obstruida o parcialmente bloqueada
2. DNH muy bajo (alzada de aguja insuficiente)
3. Presión de bomba de alta insuficiente[/POSIBLES CAUSAS]

[SOLUCIÓN]Limpieza por ultrasonido de la tobera o sustitución de la misma si está dañada. Revisar también presión del riel de inyección.[/SOLUCIÓN]`,
  },
  {
    title: "¿Qué significa un fallo en VE (Pre-inyección)?",
    answer: `[SIGNIFICADO]VE (Pre-inyección) es una pequeña inyección que ocurre antes de la inyección principal.[/SIGNIFICADO]

[SÍNTOMAS]Un fallo en VE causa golpeteo metálico fuerte en ralentí.
Motor hace 'clacking' muy audible cuando está en marcha lenta.[/SÍNTOMAS]

[POSIBLES CAUSAS]1. El imán está demasiado cerca del inducido (AH muy bajo)
2. El resorte de la tobera está vencido o debilitado
3. Inyector con desgaste prematuro[/POSIBLES CAUSAS]

[DATOS CRÍTICOS]La pre-inyección inyecta apenas unos mm³ de combustible. Un error de 1 micra en el ajuste puede duplicar el caudal de VE.[/DATOS CRÍTICOS]

[SOLUCIÓN]Revisar y ajustar el AH o cambiar el inyector si está desgastado.[/SOLUCIÓN]`,
  },
  {
    title: "¿Qué significa un fallo en DFK / LEAK (Estanqueidad)?",
    answer: `[SIGNIFICADO]DFK / LEAK (Estanqueidad) mide si el inyector tiene fugas internas de combustible.[/SIGNIFICADO]

[SÍNTOMAS]Motor tarda mucho en arrancar en frío
Humo blanco o azulado al encender
Dificultad de arranque especialmente en climas fríos[/SÍNTOMAS]

[POSIBLES CAUSAS]1. Válvula de mando (esfera y asiento) erosionada
2. Suciedad en el asiento de la tobera
3. Desgaste del conjunto válvula-asiento[/POSIBLES CAUSAS]

[SOLUCIÓN]Rectificar el asiento de la válvula o cambiar el conjunto de válvula de mando.
Limpieza profunda del inyector.[/SOLUCIÓN]

[CRÍTICO]Esta medida es crítica para arranques en frío y economía de combustible.[/CRÍTICO]`,
  },
  {
    title: "¿Qué es el BIP (Beginning of Injection Period)?",
    answer: `[SIGNIFICADO]BIP (Beginning of Injection Period) mide cuánto tarda en salir el diesel desde que la ECU manda la señal.[/SIGNIFICADO]

[IMPACTO]Motor inestable y vibraciones constantes
Falta de sincronización entre cilindros
Parece que el motor estuviera 'fuera de punto'[/IMPACTO]

[RANGO]Se expresa típicamente en microsegundos (µs).[/RANGO]

[SOLUCIÓN SI FALLA]1. Revisar la bobina (medir resistencia)
2. Ajustar el entrehierro magnético
3. Verificar conectores eléctricos[/SOLUCIÓN SI FALLA]

[CONSEJO]Un BIP correcto es esencial para la estabilidad del motor.[/CONSEJO]`,
  },
  {
    title: "¿Qué es la Capacitancia (C) en inyectores Piezo?",
    answer: `[SIGNIFICADO]La Capacitancia (C) en inyectores Piezo es la capacidad de carga del cristal piezoeléctrico.[/SIGNIFICADO]

[FUNCIÓN]El cristal Piezo es el 'motor' del inyector. La capacitancia determina su capacidad de carga e impacta directamente el movimiento.[/FUNCIÓN]

[FALLA CRÍTICA]Si el valor está fuera de rango, el inyector simplemente no se mueve, causando avería total.[/FALLA CRÍTICA]

[RANGO]Varía según fabricante (Bosch, Delphi, etc.).[/RANGO]

[ADVERTENCIA]⚡ NUNCA toques los pines de un inyector Piezo con los dedos mientras funciona. La descarga eléctrica es MUY ALTA y puedes dañar el cristal permanentemente.
Desconecta siempre antes de trabajar.[/ADVERTENCIA]`,
  },
  {
    title: "Flujo de diagnóstico rápido de inyectores",
    answer: `[TABLA DE DIAGNÓSTICO RÁPIDO]Según síntomas:[/TABLA DE DIAGNÓSTICO RÁPIDO]

🔴 **No arranca el motor**
Revisa: DFK / LEAK (Estanqueidad)
Acción: Reparación de válvula

🔊 **Golpeteo fuerte (Clacking en ralentí)**
Revisa: VE (Pre-inyección)
Acción: Calibración de AH

💨 **Humo Negro / Mucho consumo de combustible**
Revisa: VL y DNH
Acción: Cambio de Tobera o limpieza

📉 **Motor 'tiembla' en ralentí**
Revisa: LL (Mínimo)
Acción: Limpieza y ajuste fino

📊 **Sin potencia en subidas**
Revisa: VL (Carga Total)
Acción: Limpieza de tobera o ajuste de presión

[CONSEJO]Siempre mide con precisión antes de reparar.[/CONSEJO]`,
  },
  {
    title: "Ajustes mecánicos en inyectores: Láminas de reglaje (Shims)",
    answer: `[SIGNIFICADO]Las láminas de reglaje (shims) y el reloj comparador son herramientas fundamentales para calibrar inyectores precisamente.[/SIGNIFICADO]

[PROCEDIMIENTO GENERAL]1. Medir valor actual con reloj comparador
2. Calcular diferencia vs. especificación
3. Cambiar shim al siguiente tamaño
4. Medir de nuevo
5. Repetir hasta estar en especificación[/PROCEDIMIENTO GENERAL]

[QUÉ SE AJUSTA CON SHIMS]
**AH (Ankerhub):** La carrera del inducido
- Cambiar el grosor de la arandela de ajuste
- Rangos típicos: 0.5mm - 2.0mm

**DNH (Düsennadelhub):** La alzada de la aguja
- Ajustar la arandela que limita el recorrido
- Precisión: ±0.01mm

**LL (Presión de mínimo):** El estiraje de resorte
- Arandelas de presión
- Afecta el ralentí[/QUÉ SE AJUSTA CON SHIMS]

[PRECISIÓN]±0.05mm máximo recomendado.[/PRECISIÓN]`,
  },
];

async function updateAnswers() {
  try {
    console.log("Actualizando respuestas con colores...\n");

    for (const update of updatedAnswers) {
      const { data, error } = await supabase
        .from("assistant_kb")
        .update({ answer: update.answer })
        .eq("title", update.title);

      if (error) {
        console.error(`❌ Error actualizando "${update.title}":`, error.message);
      } else {
        console.log(`✅ Respuesta actualizada: ${update.title}`);
      }
    }

    console.log(
      "\n✅ Proceso completado. Las respuestas ahora tienen colores para mejor diferenciación."
    );
  } catch (err) {
    console.error("Error general:", err.message);
  }
}

updateAnswers();
