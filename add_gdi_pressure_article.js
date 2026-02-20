import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const gdiArticle = {
  title: "Sistema GDI - Presión de Operación y Especificaciones",
  keywords: ["gdi", "inyección directa", "gasolina", "presión", "sistema", "bomba", "combustible", "psi", "bar", "especificaciones"],
  answer: "[SIGNIFICADO]\nGDI (Inyección Directa de Gasolina) es un sistema de inyección de combustible de alta presión que pulveriza combustible directamente en la cámara de combustión. Este sistema funciona bajo presiones controladas para optimizar la atomización y quemazón del combustible.\n[/SIGNIFICADO]\n\n[PRESION DE OPERACION]\nLos sistemas GDI funcionan típicamente a las siguientes presiones:\n- PRESION MINIMA: 300-500 PSI (2-3.5 MPa) en ralentí\n- PRESION NOMINAL: 1000-1500 PSI (7-10 MPa) durante aceleración normal\n- PRESION MAXIMA: 2000-2500 PSI (14-17 MPa) en demanda máxima de potencia\n\nLa presión exacta varía según el fabricante y modelo del vehículo:\n- BMW, Mercedes, Audi: 1000-1700 PSI\n- Ford, GM, Chrysler: 1200-2000 PSI\n- Toyota, Honda, Mazda: 900-1500 PSI\n- Sistemas de diésel con GDI: Hasta 2800-3600 PSI en algunos casos\n[/PRESION DE OPERACION]\n\n[COMPONENTES CLAVE]\nBomba de Combustible de Alta Presión: Crea la presión requerida (pueden ser mecánicas o eléctricas)\nRaíl de Combustible: Almacena combustible a presión constante\nInyectores: Pulverizan el combustible a través de orificios ultraprecisos (0.1-0.2mm)\nRegulador de Presión: Mantiene la presión dentro de especificaciones\nSensor de Presión: Monitorea y comunica presión a la ECU\n[/COMPONENTES CLAVE]\n\n[VENTAJAS DE LA PRESION CONTROLADA]\n- Mejor atomización del combustible = combustión más eficiente\n- Mayor potencia con menor consumo de combustible\n- Emiciones reducidas\n- Control preciso de inyección en microsegundos\n- Adaptación automática según condiciones de carga\n[/VENTAJAS DE LA PRESION CONTROLADA]\n\n[DIAGNOSTICO DE PRESION]\nPara verificar presión GDI:\n1. Usar medidor de presión de combustible digital (0-3000 PSI recomendado)\n2. Conectar directamente al raíl de combustible (nunca a la línea)\n3. Con motor en ralentí: Debe estar entre 300-500 PSI\n4. Con motor acelerado: Debe aumentar a 1000-1500 PSI\n5. Presión debe ser estable sin fluctuaciones\n\nCódigos OBD comúnmente asociados:\n- P0087: Presión de combustible demasiado baja\n- P0089: Presión de combustible fuera de rango\n- P0090: Regulador de presión de combustible abierto\n- P0091: Regulador presion combustible rango bajo\n- P0092: Regulador presion combustible rango alto\n[/DIAGNOSTICO DE PRESION]\n\n[PROBLEMAS COMUNES DE PRESION]\nPresión Baja (< 300 PSI):\n- Bomba de combustible defectuosa o desgastada\n- Filtro de combustible obstruido\n- Regulador de presión defectuoso\n- Línea de combustible con fugas\n- Conector suelto del inyector\n- Batería baja\n\nPresión Alta (> 2500 PSI):\n- Regulador de presión atascado\n- Sensor de presión defectuoso\n- ECU mandando comando de presión máxima sostenida\n- Línea de retorno de combustible obstruida\n- Alivio de presión defectuoso\n\nFluctuaciones de Presión:\n- Inyector con fugas internas\n- Problemas con el acumulador de presión\n- Sensor de presión intermitente\n- Solenoide regulador de presión defectuoso\n[/PROBLEMAS COMUNES DE PRESION]\n\n[MANTENIMIENTO]\n- Cambiar filtro de combustible cada 15,000-20,000 km\n- Usar combustible de calidad con detergentes\n- Evitar dejar tanque semi-vacío (sedimentos se concentran)\n- Verificar presión anualmente si el sistema es antiguo\n- Limpiar inyectores GDI cada 50,000-80,000 km (depende del combustible)\n[/MANTENIMIENTO]\n\n[SEGURIDAD]\n⚠️ ADVERTENCIA: Un sistema GDI presurizado es peligroso\n- Nunca trabaje en líneas de combustible con motor en marcha\n- Despresurizar el sistema antes de cualquier reparación\n- Usar equipo de protección adecuado\n- Trabajar en área bien ventilada\n- Tener extintor de fuego a mano\n- No fumar cerca del combustible\n[/SEGURIDAD]"
};

async function addGDIArticle() {
  console.log('Insertando artículo: Sistema GDI - Presión de Operación...\n');

  try {
    const { error } = await supabase
      .from('assistant_kb')
      .insert([
        {
          title: gdiArticle.title,
          keywords: gdiArticle.keywords,
          answer: gdiArticle.answer,
        }
      ]);

    if (error) {
      console.log(`❌ Error al insertar: ${gdiArticle.title}`);
      console.log(`Error details: ${error.message}`);
    } else {
      console.log(`✅ Artículo insertado exitosamente`);
      console.log(`Título: ${gdiArticle.title}`);
      console.log(`Palabras clave: ${gdiArticle.keywords.join(', ')}`);
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }
}

addGDIArticle();
