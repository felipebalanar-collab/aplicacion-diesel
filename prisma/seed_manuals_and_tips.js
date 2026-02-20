const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Manuales y Hardware Tips...');

  // Hardware Tips
  const hardwareTips = [
    {
      title: "Variacion de presion",
      iconName: "Gauge",
      detail: "Si la presion oscila, revisa el regulador, posibles fugas en riel y filtros. Verifica la bomba de alta y la valvula dosificadora.",
      order: 1,
      category: "general"
    },
    {
      title: "Temperatura elevada",
      iconName: "Thermometer",
      detail: "Un banco con temperatura alta puede provocar lecturas falsas. Asegura enfriamiento y controla el tiempo de prueba por ciclo.",
      order: 2,
      category: "general"
    },
    {
      title: "Fuga en retorno",
      iconName: "AlertTriangle",
      detail: "Retorno alto suele indicar desgaste en aguja o valvula. Verifica estanqueidad sin pulsos y revisa sellos.",
      order: 3,
      category: "general"
    },
    {
      title: "Inyector sin respuesta",
      iconName: "Zap",
      detail: "Comprueba continuidad, resistencia y driver. Si no hay respuesta, prueba con un arnes alterno.",
      order: 4,
      category: "general"
    },
    {
      title: "Lecturas inconsistentes",
      iconName: "Wrench",
      detail: "Limpia conectores, usa herramientas calibradas y ejecuta ciclos de precalentamiento antes de medir.",
      order: 5,
      category: "general"
    }
  ];

  for (const tip of hardwareTips) {
    await prisma.hardwareTip.create({ data: tip });
  }
  console.log(`✅ ${hardwareTips.length} Hardware Tips creados`);

  // Manuales con contenido
  const manualesData = [
    {
      title: "Diagnóstico Eléctrico",
      iconName: "Zap",
      imagePath: "/assets/multimetro_real.png",
      order: 1,
      contents: [
        {
          order: 1,
          subtitle: "Medición de Resistencia (Ω)",
          text: "Se utiliza un multímetro de precisión o puente de Wheatstone. Para inyectores Common Rail Solenoide (Bosch), los valores típicos oscilan entre 0.2 y 0.5 Ω. En sistemas Piezo, la resistencia es extremadamente alta (MΩ), por lo que se mide su capacitancia.",
          tip: "Una resistencia alta indica sulfatación en los contactos o cables internos dañados."
        },
        {
          order: 2,
          subtitle: "Medición de Inductancia (mH)",
          text: "Es vital usar un medidor LCR. La inductancia nos dice si el campo magnético se genera correctamente. Un valor de 1.4mH a 1.6mH es estándar para Bosch. Si el valor es bajo (<1.0mH), hay espiras en corto.",
          tip: "Incluso si la resistencia es correcta, una inductancia baja impedirá que el inyector abra bajo alta presión."
        }
      ]
    },
    {
      title: "Prueba de Aislamiento",
      iconName: "ShieldAlert",
      imagePath: "/assets/aislamiento_guia.png",
      order: 2,
      contents: [
        {
          order: 1,
          subtitle: "Prueba de Megado (500V/1000V)",
          text: "Se usa un Megaóhmetro. Se aplica voltaje entre uno de los pines y la carcasa del inyector. El valor DEBE ser mayor a 1000 MΩ.",
          tip: "Si el aislamiento es bajo, la corriente se fuga a la culata, pudiendo quemar la ECU o causar fallos intermitentes en caliente."
        }
      ]
    },
    {
      title: "Proceso de Verificación en Banco",
      iconName: "Layers",
      imagePath: "/assets/banco_guia.png",
      order: 3,
      contents: [
        {
          order: 1,
          subtitle: "1. Limpieza y Estanqueidad",
          text: "Antes de instalar en el banco, limpie la tobera. Aplique presión máxima (ej: 1600 bar) sin pulsos eléctricos. No debe haber goteo por la tobera.",
          tip: "Un retorno excesivo aquí indica falla en la válvula de mando o bola de asiento."
        },
        {
          order: 2,
          subtitle: "2. Prueba de Caudales (VL, EM, LL, VE)",
          text: "Verifique el volumen inyectado y retornado en todos los puntos de carga. Compare con las tablas técnicas del sistema.",
          tip: "Si falta caudal en VE (Pre-inyección), el motor tendrá problemas de encendido o golpeteo diesel."
        }
      ]
    }
  ];

  for (const manualData of manualesData) {
    const { contents, ...manual } = manualData;
    await prisma.manual.create({
      data: {
        ...manual,
        contents: {
          create: contents
        }
      }
    });
  }
  console.log(`✅ ${manualesData.length} Manuales creados con sus contenidos`);

  console.log('🎉 Seed completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
