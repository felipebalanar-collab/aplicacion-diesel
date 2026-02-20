const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kxokcjxntikrbgalmajp.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticles = [
  {
    title: "¿Qué es el AH (Ankerhub)?",
    keywords: ["AH", "Ankerhub", "carrera", "inducido", "electroimán"],
    answer:
      "El AH (Ankerhub) es la carrera del inducido o del disco del electroimán.\n\n**Importancia:** Es el 'corazón' del tiempo de respuesta del inyector.\n\n**Fallas comunes:**\n- Si es muy alto: El inyector tarda en abrir, causando pérdida de potencia.\n- Si es muy bajo: El inyector no cierra bien o se queda abierto, generando humo negro.\n\n**Solución:** Cambiar la arandela de ajuste del inducido.\n\n**Consejo de GAIA:** Si el AH está bien calibrado, el tiempo de inyección será preciso y el motor funcionará con normalidad.",
  },
  {
    title: "¿Qué es el DNH (Düsennadelhub)?",
    keywords: ["DNH", "Düsennadelhub", "alzada", "aguja", "tobera"],
    answer:
      "El DNH (Düsennadelhub) es la alzada de la aguja de la tobera del inyector.\n\n**Impacto en el funcionamiento:**\n- Si es insuficiente, el caudal en Carga Total (VL) será muy bajo aunque el resto de parámetros estén bien.\n- Esto causa falta de potencia y mala combustión.\n\n**Solución:** Ajustar la arandela que limita el recorrido de la aguja dentro de la tobera.\n\n**Medición:** Estas medidas se ajustan con láminas de reglaje (shims) y reloj comparador.",
  },
  {
    title: "¿Qué es el RLS (Rücklaufspiel)?",
    keywords: ["RLS", "Rücklaufspiel", "juego", "retorno", "combustible"],
    answer:
      "El RLS (Rücklaufspiel) es el juego de retorno del inyector.\n\n**Falla crítica:**\nUn RLS excesivo genera demasiado retorno de combustible hacia el tanque, haciendo que el riel pierda presión. Esto causa que:\n- El motor se apague\n- No encienda correctamente\n- Fallos intermitentes de arranque\n\n**Crítico en:** Inyectores Bosch serie 0445110/120\n\n**Medición recomendada:** Usar un sensor de micras electrónico si es posible, ya que es una de las medidas más críticas del sistema.",
  },
  {
    title: "¿Qué significa un fallo en VL (Carga Total)?",
    keywords: [
      "VL",
      "Carga Total",
      "fallo",
      "potencia",
      "velocidad",
      "caudal",
    ],
    answer:
      "Un fallo en VL (Carga Total) indica que el inyector no entrega suficiente combustible bajo carga máxima.\n\n**Síntomas:**\n- Vehículo sin fuerza en subidas\n- No alcanza velocidad máxima\n- Pérdida general de potencia\n\n**Posibles causas:**\n1. Tobera obstruida o parcialmente bloqueada\n2. DNH muy bajo (alzada de aguja insuficiente)\n3. Presión de bomba de alta insuficiente\n\n**Soluciones:**\n- Limpieza por ultrasonido de la tobera\n- Sustitución de la tobera si está dañada\n- Revisar presión del riel de inyección",
  },
  {
    title: "¿Qué significa un fallo en VE (Pre-inyección)?",
    keywords: ["VE", "Pre-inyección", "golpeteo", "clacking", "ruido"],
    answer:
      "Un fallo en VE (Pre-inyección) causa golpeteo metálico fuerte en ralentí.\n\n**Síntoma característico:** Motor hace 'clacking' muy audible cuando está en marcha lenta.\n\n**Posibles causas:**\n1. El imán está demasiado cerca del inducido (AH muy bajo)\n2. El resorte de la tobera está vencido o debilitado\n3. Inyector con desgaste prematuro\n\n**Datos importantes:** La pre-inyección inyecta apenas unos mm³ de combustible. Un error de 1 micra en el ajuste puede duplicar el caudal de VE.\n\n**Solución:** Revisar y ajustar el AH o cambiar el inyector si está desgastado.",
  },
  {
    title: "¿Qué significa un fallo en DFK / LEAK (Estanqueidad)?",
    keywords: ["DFK", "LEAK", "Estanqueidad", "fuga", "válvula", "arranque"],
    answer:
      "Un fallo en DFK / LEAK (Estanqueidad) significa que el inyector tiene fugas internas.\n\n**Síntomas:**\n- Motor tarda mucho en arrancar en frío\n- Humo blanco o azulado al encender\n- Dificultad de arranque especialmente en climas fríos\n\n**Posibles causas:**\n1. Válvula de mando (esfera y asiento) erosionada\n2. Suciedad en el asiento de la tobera\n3. Desgaste del conjunto válvula-asiento\n\n**Soluciones:**\n- Rectificar el asiento de la válvula\n- Cambiar el conjunto de válvula de mando\n- Limpieza profunda del inyector\n\n**Crítico para:** Arranques en frío y economía de combustible.",
  },
  {
    title: "¿Qué es el BIP (Beginning of Injection Period)?",
    keywords: ["BIP", "Beginning", "Injection", "tiempo", "respuesta", "ECU"],
    answer:
      "BIP (Beginning of Injection Period) es el tiempo de respuesta que mide cuánto tarda en salir el diesel desde que la ECU manda la señal.\n\n**Impacto en el funcionamiento:**\n- Motor inestable y vibraciones constantes\n- Falta de sincronización entre cilindros\n- Parece que el motor estuviera 'fuera de punto'\n\n**Medición:** Se expresa típicamente en microsegundos (µs).\n\n**Solución si falla:**\n1. Revisar la bobina (medir resistencia)\n2. Ajustar el entrehierro magnético\n3. Verificar conectores eléctricos\n\n**Consejo de GAIA:** Un BIP correcto es esencial para la estabilidad del motor.",
  },
  {
    title: "¿Qué es la Capacitancia (C) en inyectores Piezo?",
    keywords: [
      "Capacitancia",
      "C",
      "Piezo",
      "cristal",
      "piezoeléctrico",
      "movimiento",
    ],
    answer:
      "La Capacitancia (C) en inyectores Piezo es la capacidad de carga del cristal piezoeléctrico.\n\n**Función:**\nEl cristal Piezo es el 'motor' del inyector. La capacitancia determina su capacidad de carga e impacta directamente el movimiento.\n\n**Falla crítica:**\nSi el valor está fuera de rango, el inyector simplemente no se mueve, causando avería total.\n\n**Rango típico:** Varía según fabricante (Bosch, Delphi, etc.)\n\n**Advertencia de GAIA:** \n⚡ NUNCA toques los pines de un inyector Piezo con los dedos mientras funciona. La descarga eléctrica es MUY ALTA y puedes dañar el cristal permanentemente.\n\n**Desconecta siempre antes de trabajar.**",
  },
  {
    title: "Flujo de diagnóstico rápido de inyectores",
    keywords: [
      "diagnóstico",
      "síntomas",
      "troubleshooting",
      "flujo",
      "inyector",
    ],
    answer:
      "**Tabla de diagnóstico rápido según síntomas:**\n\n🔴 **No arranca el motor**\n↓ Revisa: DFK / LEAK (Estanqueidad)\n↓ Acción: Reparación de válvula\n\n🔊 **Golpeteo fuerte (Clacking en ralentí)**\n↓ Revisa: VE (Pre-inyección)\n↓ Acción: Calibración de AH\n\n💨 **Humo Negro / Mucho consumo de combustible**\n↓ Revisa: VL y DNH\n↓ Acción: Cambio de Tobera o limpieza\n\n📉 **Motor 'tiembla' en ralentí**\n↓ Revisa: LL (Mínimo)\n↓ Acción: Limpieza y ajuste fino\n\n📊 **Sin potencia en subidas**\n↓ Revisa: VL (Carga Total)\n↓ Acción: Limpieza de tobera o ajuste de presión\n\n**Consejo:** Siempre mide con precisión antes de reparar.",
  },
  {
    title: "Ajustes mecánicos en inyectores: Láminas de reglaje (Shims)",
    keywords: [
      "shims",
      "láminas",
      "reglaje",
      "ajuste",
      "arandela",
      "calibración",
    ],
    answer:
      "Las láminas de reglaje (shims) y el reloj comparador son herramientas fundamentales para calibrar inyectores precisamente.\n\n**¿Qué se ajusta con shims?**\n\n1. **AH (Ankerhub):** La carrera del inducido\n   - Cambiar el grosor de la arandela de ajuste\n   - Rangos típicos: 0.5mm - 2.0mm\n\n2. **DNH (Düsennadelhub):** La alzada de la aguja\n   - Ajustar la arandela que limita el recorrido\n   - Precisión: ±0.01mm\n\n3. **LL (Presión de mínimo):** El estiraje de resorte\n   - Arandelas de presión\n   - Afecta el ralentí\n\n**Procedimiento general:**\n1. Medir valor actual con reloj comparador\n2. Calcular diferencia vs. especificación\n3. Cambiar shim al siguiente tamaño\n4. Medir de nuevo\n5. Repetir hasta estar en especificación\n\n**Precisión recomendada:** ±0.05mm máximo",
  },
];

async function addArticles() {
  try {
    console.log("Conectando a Supabase...");

    for (const article of newArticles) {
      const { data, error } = await supabase
        .from("assistant_kb")
        .insert([
          {
            title: article.title,
            keywords: article.keywords,
            answer: article.answer,
          },
        ]);

      if (error) {
        console.error(
          `Error al agregar "${article.title}":`,
          error.message
        );
      } else {
        console.log(`✅ Agregado: ${article.title}`);
      }
    }

    console.log(
      "\n✅ Proceso completado. Todos los artículos han sido agregados a la base de conocimiento de GAIA."
    );
  } catch (err) {
    console.error("Error general:", err.message);
  }
}

addArticles();
