"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Send, Sparkles } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";

type KnowledgeItem = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

// Componente para renderizar respuestas con formato Unicode
function FormattedResponse({ text }: { text: string }) {
  return (
    <pre className="text-slate-300 leading-relaxed font-mono text-xs whitespace-pre-wrap break-words">
      {text}
    </pre>
  );
}

function EngineMascot({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 380"
      className="gaia-mascot"
    >
      <defs>
        {/* Gradiente metálico para los brazos */}
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8F4F8" />
          <stop offset="50%" stopColor="#8B9DC3" />
          <stop offset="100%" stopColor="#5A6B8C" />
        </linearGradient>
        {/* Gradiente para la base */}
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" />
          <stop offset="50%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
        {/* Brillo holográfico */}
        <radialGradient id="holoGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* BASE con gradiente */}
      <ellipse cx="150" cy="260" rx="100" ry="18" fill="url(#baseGradient)" opacity="0.8" className="base-glow"/>

      {/* MANO IZQUIERDA */}
      <g className="hand-left">
        {/* Palma */}
        <ellipse cx="75" cy="115" rx="14" ry="18" fill="url(#metalGradient)" stroke="#2D3748" strokeWidth="2"/>
        {/* Dedos mejorados */}
        <ellipse cx="62" cy="100" rx="4" ry="9" fill="#8B9DC3" stroke="#2D3748" strokeWidth="1.5" transform="rotate(-20 62 100)"/>
        <ellipse cx="75" cy="95" rx="4" ry="10" fill="#8B9DC3" stroke="#2D3748" strokeWidth="1.5"/>
        <ellipse cx="88" cy="100" rx="4" ry="9" fill="#8B9DC3" stroke="#2D3748" strokeWidth="1.5" transform="rotate(20 88 100)"/>
        {/* Brillo */}
        <ellipse cx="72" cy="108" rx="5" ry="8" fill="#E8F4F8" opacity="0.4"/>
      </g>

      {/* MANO DERECHA */}
      <g className="hand-right">
        {/* Palma */}
        <ellipse cx="225" cy="115" rx="14" ry="18" fill="url(#metalGradient)" stroke="#2D3748" strokeWidth="2"/>
        {/* Dedos mejorados */}
        <ellipse cx="212" cy="100" rx="4" ry="9" fill="#8B9DC3" stroke="#2D3748" strokeWidth="1.5" transform="rotate(20 212 100)"/>
        <ellipse cx="225" cy="95" rx="4" ry="10" fill="#8B9DC3" stroke="#2D3748" strokeWidth="1.5"/>
        <ellipse cx="238" cy="100" rx="4" ry="9" fill="#8B9DC3" stroke="#2D3748" strokeWidth="1.5" transform="rotate(-20 238 100)"/>
        {/* Brillo */}
        <ellipse cx="228" cy="108" rx="5" ry="8" fill="#E8F4F8" opacity="0.4"/>
      </g>

      {/* OJOS - brillantes y expresivos */}
      <g className="eyes-blink">
        {/* Ojo izquierdo */}
        <ellipse cx="120" cy="130" rx="16" ry="20" fill="#00D9FF" className="eye-glow-left"/>
        <ellipse cx="120" cy="130" rx="12" ry="16" fill="#00A3CC"/>
        <circle cx="120" cy="126" r="6" fill="#FFFFFF" className="eye-shine"/>
        
        {/* Ojo derecho */}
        <ellipse cx="180" cy="130" rx="16" ry="20" fill="#00D9FF" className="eye-glow-right"/>
        <ellipse cx="180" cy="130" rx="12" ry="16" fill="#00A3CC"/>
        <circle cx="180" cy="126" r="6" fill="#FFFFFF" className="eye-shine"/>
      </g>

      {/* SONRISA amigable */}
      <path d="M 120 160 Q 150 175, 180 160" stroke="#00D9FF" strokeWidth="4" fill="none" strokeLinecap="round" className="smile-glow"/>

      {/* CEREBRO HOLOGRÁFICO - red neuronal - ELEMENTO PRINCIPAL */}
      <g className="holographic-brain float-body">
        {/* Esfera base del cerebro */}
        <circle cx="150" cy="100" r="50" fill="url(#holoGlow)" opacity="0.3" className="brain-pulse"/>
        
        {/* Red neuronal - nodos */}
        <circle cx="150" cy="60" r="3" fill="#00D9FF" className="node-pulse-1"/>
        <circle cx="170" cy="75" r="3" fill="#00D9FF" className="node-pulse-2"/>
        <circle cx="180" cy="95" r="3" fill="#00D9FF" className="node-pulse-3"/>
        <circle cx="165" cy="120" r="3" fill="#00D9FF" className="node-pulse-1"/>
        <circle cx="130" cy="75" r="3" fill="#00D9FF" className="node-pulse-2"/>
        <circle cx="120" cy="95" r="3" fill="#00D9FF" className="node-pulse-3"/>
        <circle cx="135" cy="120" r="3" fill="#00D9FF" className="node-pulse-1"/>
        <circle cx="150" cy="130" r="3" fill="#00D9FF" className="node-pulse-2"/>
        
        {/* Conexiones neuronales */}
        <line x1="150" y1="60" x2="170" y2="75" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-1"/>
        <line x1="170" y1="75" x2="180" y2="95" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-2"/>
        <line x1="180" y1="95" x2="165" y2="120" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-3"/>
        <line x1="150" y1="60" x2="130" y2="75" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-1"/>
        <line x1="130" y1="75" x2="120" y2="95" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-2"/>
        <line x1="120" y1="95" x2="135" y2="120" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-3"/>
        <line x1="150" y1="130" x2="170" y2="75" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-1"/>
        <line x1="150" y1="130" x2="130" y2="75" stroke="#00D9FF" strokeWidth="1" opacity="0.6" className="synapse-2"/>
        
        {/* Partículas flotantes alrededor */}
        <circle cx="110" cy="70" r="2" fill="#00D9FF" opacity="0.8" className="particle-1"/>
        <circle cx="190" cy="85" r="2" fill="#00D9FF" opacity="0.8" className="particle-2"/>
        <circle cx="115" cy="125" r="2" fill="#00D9FF" opacity="0.8" className="particle-3"/>
        <circle cx="185" cy="115" r="2" fill="#00D9FF" opacity="0.8" className="particle-1"/>
      </g>

      {/* TEXTO GAIA - GRANDE Y LEGIBLE */}
      <text x="150" y="220" textAnchor="middle" fontSize="48" fontWeight="900" className="gaia-rainbow" opacity="0.95">
        GAIA AI
      </text>
    </svg>
  );
}

function scoreMatch(question: string, item: KnowledgeItem) {
  const q = question.toLowerCase().trim();
  let score = 0;

  // Remove punctuation for more flexible matching
  const qClean = q.replace(/[?.!,;:()]/g, '');
  const titleClean = item.title.toLowerCase().replace(/[?.!,;:()]/g, '');

  // CRÍTICO: Detectar números de parte (Bosch: 0445110xxx, Denso: 295xxx, Delphi: 28xxx)
  const partNumberPattern = /\b(0445110\d{3}|295\d{4,5}|28(1|2)\d{4})\b/i;
  const questionHasPartNumber = partNumberPattern.test(q);
  
  if (questionHasPartNumber) {
    const foundPartMatch = item.keywords.some(keyword => 
      partNumberPattern.test(keyword) && 
      q.includes(keyword.match(partNumberPattern)?.[0] || '')
    );
    
    if (foundPartMatch) {
      score += 20; // MÁXIMA PRIORIDAD para números de parte exactos
    }
  }

  // Exact match in title (highest priority)
  if (qClean.includes(titleClean) || titleClean.includes(qClean)) {
    score += 5;
  }

  // Check individual words and acronyms in title
  const titleWords = titleClean.split(/\s+/);
  for (const word of titleWords) {
    // Allow matching even for short words/acronyms (AH, VL, VE, etc.)
    if (word.length > 1 && qClean.includes(word)) {
      score += 2;
    }
  }

  // Check keywords (each match adds points)
  for (const key of item.keywords) {
    const keyLower = key.toLowerCase();
    if (qClean.includes(keyLower)) {
      score += 3; // keywords worth more points
    }
  }

  // Partial keyword matches - allow short acronyms too
  for (const key of item.keywords) {
    const keyLower = key.toLowerCase();
    const keyWords = keyLower.split(/\s+/);
    for (const keyWord of keyWords) {
      // Allow acronyms (2+ chars) and regular words (3+ chars)
      if ((keyWord.match(/^[a-z0-9]{2}$/i) || keyWord.length > 2) && qClean.includes(keyWord)) {
        score += 1;
      }
    }
  }

  return score;
}

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
  
  // Temas NO automotrices (filtro de exclusión)
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

  // Si contiene temas no automotrices, rechazar inmediatamente
  if (nonAutomotiveTopics.some(topic => q.includes(topic))) {
    return false;
  }

  // Keywords TÉCNICOS que indican tema automotriz (removí palabras genéricas)
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
    // Acrónimos técnicos de inyectores (requieren contexto)
    "ankerhub", "düsennadelhub", "rücklaufspiel",
    "shim", "lámina de reglaje", "lamina de reglaje",
    // Sistemas específicos
    "freno", "embrague", "transmision", "suspension", "escape",
    "radiador", "termostato", "bujia", "alternador", "bateria",
    "cigüeñal", "pistón", "biela", "arbol de levas", "cadena de tiempo",
    "junta", "empaque", "sello", "reten", "manguera"
  ];

  // Solo si tiene al menos UNA palabra técnica automotriz
  const hasAutomotiveKeyword = automotiveKeywords.some(keyword => q.includes(keyword));
  
  // Además, verificar acrónimos SOLO si están en contexto automotriz
  const acronyms = ["ah", "dnh", "rls", "vl", "ve", "dfk", "leak", "dll", "ll", "dnp", "nve", "pk"];
  const hasAcronymInContext = acronyms.some(acr => {
    // El acrónimo debe estar aislado (no parte de otra palabra)
    const regex = new RegExp(`\\b${acr}\\b`, 'i');
    return regex.test(q) && (
      q.includes("inyector") || q.includes("diesel") || q.includes("common rail") ||
      q.includes("que es") || q.includes("qué es") || q.includes("falla") ||
      q.includes("medicion") || q.includes("prueba")
    );
  });

  return hasAutomotiveKeyword || hasAcronymInContext;
}

export default function FloatingAssistant() {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hola, soy GAIA, tu asistente en autotrónica. Por ahora me especializo en sistemas Common Rail mientras continúo aprendiendo. ¿En qué puedo ayudarte?",
    },
  ]);
  const [kb, setKb] = useState<KnowledgeItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Draggable state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 24, y: 24 });
  const [displayPosition, setDisplayPosition] = useState<{ x: number; y: number }>({ x: 24, y: 24 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [wasDragged, setWasDragged] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    setToken(storedToken);
  }, []);

  // Load position from localStorage
  useEffect(() => {
    const savedPos = localStorage.getItem("gaia_position");
    if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        setPosition(pos);
        setDisplayPosition(pos);
      } catch {
        // use default if parse fails
      }
    }
  }, []);

  // Save position to localStorage
  const savePosition = (newPos: { x: number; y: number }) => {
    setPosition(newPos);
    localStorage.setItem("gaia_position", JSON.stringify(newPos));
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle drag move
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setWasDragged(true);
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
      setDisplayPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      savePosition(position);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position, dragOffset]);

  // Adjust position when opening to ensure window is visible
  useEffect(() => {
    if (!isOpen) {
      // When closing, restore original position
      setDisplayPosition(position);
      return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const chatBoxWidth = 380;
    const chatBoxHeight = 520;
    const margin = 16;

    let newX = position.x;
    let newY = position.y;

    // If chat box would go off-screen to the right, move it left
    if (position.x + chatBoxWidth + margin > windowWidth) {
      newX = Math.max(margin, windowWidth - chatBoxWidth - margin);
    }

    // If chat box would go off-screen to the bottom, move it up
    if (position.y + chatBoxHeight + margin > windowHeight) {
      newY = Math.max(margin, windowHeight - chatBoxHeight - margin);
    }

    // If chat box would go off-screen to the left, move it right
    if (position.x < margin) {
      newX = margin;
    }

    // If chat box would go off-screen to the top, move it down
    if (position.y < margin) {
      newY = margin;
    }

    // Only update display position, don't save to localStorage
    setDisplayPosition({ x: newX, y: newY });
  }, [isOpen, position]);

  useEffect(() => {
    const loadKb = async () => {
      try {
        // KB is public - no auth required
        const res = await fetch("/api/remote/assistant/kb");
        if (res.ok) {
          const data = await res.json();
          setKb(Array.isArray(data.items) ? data.items : []);
        }
      } catch {
        setKb([]);
      }
    };

    loadKb();
  }, []);

  const quickQuestions = useMemo(() => {
    // Preguntas por defecto más buscadas/populares en autotrónica
    const defaultQuestions = [
      "¿Qué es un sistema Common Rail?",
      "¿Cómo diagnosticar problemas en inyectores?",
      "¿Cuál es la función del sensor MAP?"
    ];
    
    // Si hay KB, usar las primeras 3, sino usar por defecto
    if (kb.length >= 3) {
      return kb.slice(0, 3).map((item) => item.title);
    }
    return defaultQuestions;
  }, [kb]);

  const handleAsk = async (text?: string) => {
    const q = (text ?? question).trim();
    if (!q) return;

    if (!isAuthenticated) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Para usar GAIA necesitas iniciar sesión. Inicia sesión para continuar.",
        },
      ]);
      setQuestion("");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: q }]);

    // Detectar códigos incompletos (ej: "codigo 0001" sin letra P/C/B/U)
    const qLower = q.toLowerCase();
    const hasCodeWord = qLower.includes("codigo") || qLower.includes("código");
    const hasOnlyNumbers = /\b[0-9]{3,4}\b/.test(qLower) && !/\b[pcbu]0[0-9]{3}\b/i.test(qLower);
    
    if (hasCodeWord && hasOnlyNumbers) {
      const incompleteCodeReply = "Para ayudarte con códigos de diagnóstico, necesito el código completo con su letra inicial:\n\n🔹 **P0xxx** - Tren motriz (motor, combustible, inyección)\n🔹 **C0xxx** - Chasis (frenos, ABS, suspensión)\n🔹 **B0xxx** - Carrocería (luces, puertas)\n🔹 **U0xxx** - Red de comunicación\n\nPor ejemplo: \"¿Qué significa el código P0087?\"";
      setMessages((prev) => [...prev, { role: "assistant", text: incompleteCodeReply }]);
      setQuestion("");
      return;
    }

    // Check if question is automotive-related
    if (!isAutomotiveRelated(q)) {
      const offTopicReply = "Lo siento, solo puedo responder preguntas relacionadas con autotrónica, sistemas Common Rail, diagnóstico automotriz y temas relacionados. Este sitio está especializado en tecnología automotriz. 🔧";
      setMessages((prev) => [...prev, { role: "assistant", text: offTopicReply }]);
      setQuestion("");
      
      // Log but don't register as unanswered
      if (token) {
        try {
          await fetch("/api/remote/assistant/logs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ question: q, answer: offTopicReply }),
          });
        } catch {
          // ignore
        }
      }
      return;
    }

    // Detectar si es un código OBD específico
    const obdCodePattern = /\b[pcbu]0[0-9]{3}\b/i;
    const isOBDCode = obdCodePattern.test(q);

    // Detectar si es un número de parte específico
    const partNumberPattern = /\b(0445110\d{3}|295\d{4,5}|28(1|2)\d{4})\b/i;
    const hasPartNumber = partNumberPattern.test(q);
    const partNumber = q.match(partNumberPattern)?.[0];

    let best: KnowledgeItem | null = null;
    let bestScore = 0;

    // Si hay número de parte, primero buscar artículos con ese número exacto
    if (hasPartNumber && partNumber) {
      for (const item of kb) {
        const hasPartInTitle = item.title.toLowerCase().includes(partNumber.toLowerCase());
        const hasPartInKeywords = item.keywords.some(k => 
          k.toLowerCase().includes(partNumber.toLowerCase())
        );
        
        if (hasPartInTitle || hasPartInKeywords) {
          const score = scoreMatch(q, item);
          if (score > bestScore) {
            bestScore = score;
            best = item;
          }
        }
      }
      
      // Si encontramos un match con el número de parte exacto, usar ese
      if (best && bestScore >= 3) {
        // Skip the general KB search below
      } else {
        // Si no hay match exacto, limpiar best y hacer búsqueda general
        best = null;
        bestScore = 0;
      }
    }

    // Búsqueda general en KB si no hay match exacto con número de parte
    if (!best) {
      for (const item of kb) {
        const score = scoreMatch(q, item);
        if (score > bestScore) {
          bestScore = score;
          best = item;
        }
      }
    }

    let reply = "";
    let webSearchUsed = false;

    // Si es un código OBD, verificar que el match sea EXACTO en el título
    if (isOBDCode && best) {
      const codeMatch = q.match(obdCodePattern);
      const code = codeMatch ? codeMatch[0].toUpperCase() : "";
      const titleHasCode = best.title.toUpperCase().includes(code);
      
      // Si el código NO está en el título del artículo, forzar búsqueda web
      if (!titleHasCode) {
        bestScore = 0; // Forzar búsqueda web
        best = null;
      }
    }

    // Si tenemos una respuesta con buen score, usarla
    if (bestScore > 2 && best) {
      reply = best.answer;
    } 
    // Si el score es bajo pero la pregunta es automotriz, buscar en web
    else if (bestScore <= 2) {
      try {
        console.log('[GAIA] Activando búsqueda web para:', q);
        
        // Intentar búsqueda web con IA
        const aiResponse = await fetch("/api/ai-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q }),
        });

        console.log('[GAIA] Respuesta de AI search:', aiResponse.status);

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          console.log('[GAIA] Datos recibidos:', aiData);
          
          if (aiData.success && aiData.answer) {
            reply = aiData.answer;
            webSearchUsed = true;
          } else {
            // Si falló la búsqueda web, usar mensaje por defecto
            reply = "Excelente pregunta sobre autotrónica. Aún no tengo una respuesta en mi base de conocimiento, pero tu pregunta ha sido registrada. El equipo de administración la revisará y la cargaré en mi memoria. Gracias por ayudarme a mejorar. 🚀";
          }
        } else {
          console.error('[GAIA] Error en respuesta:', await aiResponse.text());
          // Si falló la búsqueda web, usar mensaje por defecto
          reply = "Excelente pregunta sobre autotrónica. Aún no tengo una respuesta en mi base de conocimiento, pero tu pregunta ha sido registrada. El equipo de administración la revisará y la cargaré en mi memoria. Gracias por ayudarme a mejorar. 🚀";
        }
      } catch (error) {
        console.error("[GAIA] Error en búsqueda web:", error);
        // Si hubo error, usar mensaje por defecto
        reply = "Excelente pregunta sobre autotrónica. Aún no tengo una respuesta en mi base de conocimiento, pero tu pregunta ha sido registrada. El equipo de administración la revisará y la cargaré en mi memoria. Gracias por ayudarme a mejorar. 🚀";
      }
    }

    setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    setQuestion("");

    if (token) {
      try {
        await fetch("/api/remote/assistant/logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ question: q, answer: reply }),
        });

        // If no match was found (but question IS automotive-related), register unanswered question
        if (bestScore === 0) {
          await fetch("/api/remote/assistant/unanswered", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ question: q }),
          });
        }
      } catch {
        // ignore log errors
      }
    }
  };

  return (
    <div
      className="fixed z-50"
      style={{
        left: `${displayPosition.x}px`,
        top: `${displayPosition.y}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {isOpen && (
        <div className="w-[380px] h-[520px] bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div
            onMouseDown={handleMouseDown}
            className="px-4 py-3 border-b border-white/10 flex items-center justify-between cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              <EngineMascot size={80} />
              GAIA
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === "user"
                    ? "ml-8 bg-sky-600/20 text-sky-100 px-3 py-2 rounded-xl text-sm"
                    : "mr-8 bg-slate-800 text-slate-200 px-3 py-2 rounded-xl text-sm"
                }
              >
                {msg.role === "assistant" ? (
                  <FormattedResponse text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>

          {isAuthenticated && quickQuestions.length > 0 && messages.length === 0 && (
            <div className="px-3 py-2 border-t border-white/10 flex gap-2 flex-wrap">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleAsk(q)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-white/10 flex flex-col gap-2 relative">
            <div className="flex items-center gap-2">
              <input
                value={question}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setQuestion(newValue);
                  
                  // Filter KB suggestions
                  if (newValue.trim().length > 0) {
                    const filtered = kb
                      .filter(item =>
                        item.title.toLowerCase().includes(newValue.toLowerCase())
                      )
                      .map(item => item.title)
                      .slice(0, 5);
                    setSuggestions(filtered);
                  } else {
                    setSuggestions([]);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAsk();
                  }
                }}
                placeholder={isAuthenticated ? "Escribe tu pregunta..." : "Inicia sesión para usar GAIA"}
                className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-500/60"
                disabled={!isAuthenticated}
              />
              <button
                onClick={() => handleAsk()}
                className="bg-sky-600 hover:bg-sky-500 text-white px-3 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isAuthenticated}
              title="Enviar"
            >
              <Send className="w-4 h-4" />
            </button>
            </div>

            {/* Autocomplete suggestions */}
            {isAuthenticated && suggestions.length > 0 && (
              <div className="absolute top-full left-3 right-3 mt-1 bg-slate-800 border border-white/20 rounded-lg shadow-lg z-50">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuestion(suggestion);
                      setSuggestions([]);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-700 transition border-b border-white/5 last:border-b-0 text-slate-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onMouseDown={(e) => {
            setWasDragged(false);
            handleMouseDown(e);
          }}
          onClick={() => {
            if (!wasDragged) {
              setIsOpen(true);
            }
            setWasDragged(false);
          }}
          className="bg-transparent text-white w-40 h-40 rounded-full shadow-none flex items-center justify-center transition cursor-grab active:cursor-grabbing"
          title="Abrir GAIA / Arrastrar para mover"
        >
          <EngineMascot size={120} />
        </button>
      )}
    </div>
  );
}
