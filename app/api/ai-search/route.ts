import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Función para buscar en DuckDuckGo
async function searchDuckDuckGo(query: string) {
  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
    );
    const data = await response.json();
    
    // Recopilar información relevante
    let searchResults = '';
    
    // Abstract (respuesta instantánea)
    if (data.Abstract) {
      searchResults += `Información principal: ${data.Abstract}\n\n`;
    }
    
    // Respuestas relacionadas
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      searchResults += 'Temas relacionados:\n';
      data.RelatedTopics.slice(0, 5).forEach((topic: any, index: number) => {
        if (topic.Text) {
          searchResults += `${index + 1}. ${topic.Text}\n`;
        }
      });
    }
    
    return searchResults || 'No se encontró información relevante en la búsqueda web.';
  } catch (error) {
    console.error('Error en DuckDuckGo:', error);
    throw new Error('Error al realizar la búsqueda web');
  }
}

// Función para procesar con Groq
async function processWithGroq(question: string, searchResults: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Eres GAIA, un asistente técnico experto en sistemas diesel de inyección common rail. 
Tu función es responder preguntas técnicas de manera clara y estructurada.

IMPORTANTE: Debes formatear tu respuesta usando SOLO estas etiquetas válidas:
[BÚSQUEDA WEB] - Para indicar que es búsqueda web
[SIGNIFICADO] - Para definiciones y conceptos
[SÍNTOMAS] - Para síntomas de fallas
[POSIBLES CAUSAS] - Para causas comunes
[SOLUCIÓN] - Para soluciones y reparaciones
[DATOS CRÍTICOS] - Para especificaciones técnicas
[CONSEJO] - Para recomendaciones prácticas
[ADVERTENCIA] - Para precauciones importantes

Formato de respuesta:
[BÚSQUEDA WEB]Esta información proviene de una búsqueda en internet:[/BÚSQUEDA WEB]

[SIGNIFICADO]Explicación del concepto...[/SIGNIFICADO]

[DATOS CRÍTICOS]Especificaciones técnicas...[/DATOS CRÍTICOS]

[CONSEJO]Recomendaciones prácticas...[/CONSEJO]

Si la información de búsqueda no es relevante para sistemas diesel, indícalo claramente.`
        },
        {
          role: 'user',
          content: `Pregunta del usuario: ${question}\n\nResultados de búsqueda web:\n${searchResults}\n\nPor favor, analiza esta información y proporciona una respuesta técnica clara y estructurada usando las etiquetas de formato.`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || 'No se pudo procesar la respuesta.';
  } catch (error) {
    console.error('Error en Groq:', error);
    throw new Error('Error al procesar la información con IA');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    
    console.log('[AI-Search] Pregunta recibida:', question);

    if (!question) {
      return NextResponse.json(
        { error: 'Pregunta requerida' },
        { status: 400 }
      );
    }

    // Verificar que la pregunta sea automotriz antes de buscar
    if (!isAutomotiveRelated(question)) {
      console.log('[AI-Search] Pregunta rechazada (no automotriz)');
      return NextResponse.json({
        success: false,
        error: 'Pregunta no relacionada con autotrónica',
        answer: 'Lo siento, solo puedo responder preguntas relacionadas con autotrónica, sistemas Common Rail, diagnóstico automotriz y temas relacionados.'
      });
    }

    // Verificar que la API key esté configurada
    if (!process.env.GROQ_API_KEY) {
      console.error('[AI-Search] API key de Groq no encontrada');
      return NextResponse.json(
        { error: 'API key de Groq no configurada' },
        { status: 500 }
      );
    }

    console.log('[AI-Search] Iniciando búsqueda en DuckDuckGo...');
    // Paso 1: Buscar en DuckDuckGo
    const searchResults = await searchDuckDuckGo(question);
    console.log('[AI-Search] Resultados de DuckDuckGo:', searchResults.substring(0, 200));

    console.log('[AI-Search] Procesando con Groq...');
    // Paso 2: Procesar con Groq
    const aiResponse = await processWithGroq(question, searchResults);
    console.log('[AI-Search] Respuesta de Groq generada');

    return NextResponse.json({
      success: true,
      answer: aiResponse,
      source: 'web-search'
    });

  } catch (error: any) {
    console.error('[AI-Search] Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Error al procesar la búsqueda',
        success: false 
      },
      { status: 500 }
    );
  }
}

// Función de filtro automotriz (igual que en FloatingAssistant)
function isAutomotiveRelated(question: string): boolean {
  const q = question.toLowerCase();
  
  // Códigos de diagnóstico OBD-II COMPLETOS (P, C, B, U + 4 dígitos)
  const obdCodePattern = /\b[pcbu]0[0-9]{3}\b/i;
  if (obdCodePattern.test(q)) {
    return true; // Cualquier código OBD completo es automotriz
  }

  // Si menciona "codigo" pero sin letra OBD, necesita contexto automotriz
  if (q.includes("codigo") || q.includes("código")) {
    // Rechazar si SOLO tiene números sin contexto (ej: "codigo 0001")
    const hasOnlyNumbers = /\b[0-9]{3,4}\b/.test(q) && !obdCodePattern.test(q);
    if (hasOnlyNumbers) {
      // Debe tener al menos una palabra automotriz adicional
      const hasAutomotiveContext = 
        q.includes("motor") || q.includes("inyector") || q.includes("diesel") ||
        q.includes("falla") || q.includes("averia") || q.includes("escaner") ||
        q.includes("obd") || q.includes("dtc") || q.includes("check engine");
      
      if (!hasAutomotiveContext) return false;
    }
  }
  
  const nonAutomotiveTopics = [
    "capital", "país", "ciudad", "mundo", "historia", "geografía",
    "presidente", "política", "religión", "comida", "receta",
    "música", "película", "deporte", "fútbol", "basketball",
    "matemática", "suma", "resta", "multiplicación", "división",
    "animal", "planta", "biología", "química", "física",
    "idioma", "traducir", "inglés", "francés", "alemán",
    "clima", "temperatura", "lluvia", "sol", "luna", "estrella",
    "actor", "cantante", "artista", "libro", "novela",
    "computadora", "laptop", "celular", "teléfono", "tablet",
    "internet", "facebook", "instagram", "twitter", "app",
    "juego", "videojuego", "playstation", "xbox", "nintendo"
  ];

  if (nonAutomotiveTopics.some(topic => q.includes(topic))) {
    return false;
  }

  const automotiveKeywords = [
    "inyector", "common rail", "diesel", "gasolina", "motor", "bomba", "vp44",
    "presion", "bip", "nop", "mst", "rlc", "piezo", "solenoide",
    "calibracion", "banco de prueba", "medicion", "diagnostico",
    "vehiculo", "auto", "carro", "camion", "camioneta", "sensor", "ecu",
    "inyeccion", "combustible", "falla", "eui", "eup", "cr",
    "tobera", "aguja", "válvula", "valvula", "electrovalvula",
    "bobina", "resistencia", "inductancia", "capacitancia",
    "riel", "carril", "humo", "arranque", "revoluciones", "rpm",
    "turbo", "filtro", "aceite", "refrigerante", "fuga",
    "autotronica", "automotriz", "mecanica automotriz", "electronica automotriz",
    "dervco", "bosch", "denso", "delphi", "siemens", "continental",
    // Bombas y sistemas de inyeccion diesel/gasolina
    "vp44", "vp37", "ve", "rotary pump", "distributor pump", "inline pump", "p-pump",
    "bomba rotativa", "bomba en linea", "bomba de alta", "bomba de baja", "bomba de transferencia",
    "pumpe duse", "unit injector", "uis", "ui", "heui", "hpi", "eui", "eup",
    "common rail", "crdi", "cdi", "hdi", "tdi", "d4d", "d-4d",
    "gdi", "fsi", "tfsi", "tsi", "mpfi", "mpi", "tbi", "spi", "efi",
    "direct injection", "port injection", "di", "idi",
    // Modulos y redes
    "ecu", "ecm", "pcm", "tcm", "bcm", "abs", "esp", "srs", "airbag",
    "immobilizer", "immo", "can", "lin", "flexray", "k-line",
    // Sensores y actuadores
    "map", "maf", "ckp", "cmp", "tps", "app", "iat", "ect", "o2", "lambda", "nox",
    "egr", "dpf", "scr", "adblue", "def", "vgt", "wastegate", "boost",
    "rail pressure", "fuel pressure", "turbocharger", "intercooler",
    "knock", "knock sensor", "sensor de detonacion", "sensor de picado",
    "throttle", "throttle body", "cuerpo de aceleracion", "mariposa",
    "evap", "pcv", "canister", "purge", "valvula purge",
    "misfire", "falla de encendido", "catalizador", "catalyst",
    "crank", "cam", "cam phaser", "vvt", "vvt-i", "vtec", "valvetronic",
    "sensor de oxigeno", "sensor lambda", "sensor de riel", "regulador de presion",
    // Tecnologias de combustion y combustibles
    "hcci", "pcci", "ppci", "lpg", "cng", "gnv", "glp",
    "atkinson", "miller", "otto", "diesel cycle", "gasolina",
    // EV / hibridos
    "ev", "hev", "phev", "mhev", "hibrido", "electrico", "bms", "inverter",
    "inversor", "dc-dc", "motor electrico", "bateria de traccion",
    // Lineas y marcas (diesel y gasolina)
    "duramax", "powerstroke", "cummins", "ram", "allison",
    "hdi", "tdci", "dci", "jtd", "multijet", "tdi", "cdi",
    "crdi", "d4d", "i-ctdi", "i-dtec", "di-d",
    "ecoboost", "skyactiv", "tgdi", "gdi",
    // Transmision y tren motriz
    "at", "mt", "cvt", "dct", "tiptronic", "dsg", "transmision",
    "transfer", "diferencial", "cardan", "homocinetica", "embrague",
    // Frenos y seguridad
    "abs", "ebd", "bas", "esc", "esp", "tc", "tcs", "asr",
    "freno", "pastillas", "discos", "tambor", "servofreno",
    // Direccion y suspension
    "eps", "direccion asistida", "cremallera", "amortiguador", "resorte",
    "alineacion", "balanceo", "estabilidad", "suspension",
    // HVAC y confort
    "hvac", "a/c", "ac", "aire acondicionado", "climatizador",
    "compresor", "evaporador", "condensador",
    // Carroceria y seguridad pasiva
    "airbag", "srs", "pretensor", "cinturon", "impacto",
    // Diagnóstico y códigos
    "escaner", "scanner", "computadora de diagnóstico", "check engine",
    "mil", "testigo", "luz de motor", "error", "averia",
    "ankerhub", "düsennadelhub", "rücklaufspiel",
    "shim", "lámina de reglaje", "lamina de reglaje",
    "freno", "embrague", "transmision", "suspension", "escape",
    "radiador", "termostato", "bujia", "alternador", "bateria",
    "cigüeñal", "pistón", "biela", "arbol de levas", "cadena de tiempo",
    "junta", "empaque", "sello", "reten", "manguera"
  ];

  const hasAutomotiveKeyword = automotiveKeywords.some(keyword => q.includes(keyword));
  
  const acronyms = ["ah", "dnh", "rls", "vl", "ve", "dfk", "leak", "dll", "ll", "dnp", "nve", "pk"];
  const hasAcronymInContext = acronyms.some(acr => {
    const regex = new RegExp(`\\b${acr}\\b`, 'i');
    return regex.test(q) && (
      q.includes("inyector") || q.includes("diesel") || q.includes("common rail") ||
      q.includes("que es") || q.includes("qué es") || q.includes("falla") ||
      q.includes("medicion") || q.includes("prueba")
    );
  });

  return hasAutomotiveKeyword || hasAcronymInContext;
}
