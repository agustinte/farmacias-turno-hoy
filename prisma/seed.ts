import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CONFIGURACIÓN: MODIFICÁ ESTOS DATOS PARA OTRA LOCALIDAD
// ==========================================
const NOMBRE_LOCALIDAD = 'Lanus';

const CALENDARIO_RAW = [
  // 21/10/2026
  { fecha: '2026-10-21', claveFarmacia: 'PRADO' },
  { fecha: '2026-10-21', claveFarmacia: 'YACHELINI' },
  { fecha: '2026-10-21', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-21', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-21', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-21', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-21', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-21', claveFarmacia: 'COUTO MARTINEZ' },
  { fecha: '2026-10-21', claveFarmacia: 'MADAME CURIE' },

  // 22/10/2026
  { fecha: '2026-10-22', claveFarmacia: 'NIZOWSKI' },
  { fecha: '2026-10-22', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-22', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-22', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-22', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-22', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-22', claveFarmacia: 'BRANDO' },
  { fecha: '2026-10-22', claveFarmacia: 'ELÍAS S.C.S.' },
  { fecha: '2026-10-22', claveFarmacia: 'PINTOS' },

  // 23/10/2026
  { fecha: '2026-10-23', claveFarmacia: 'SANTA ISABEL' },
  { fecha: '2026-10-23', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-23', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-23', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-23', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-23', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-23', claveFarmacia: 'NOBEL' },
  { fecha: '2026-10-23', claveFarmacia: 'REX' },

  // 24/10/2026
  { fecha: '2026-10-24', claveFarmacia: 'ROTOLO' },
  { fecha: '2026-10-24', claveFarmacia: 'SAN LUIS DE MONFORT' },
  { fecha: '2026-10-24', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-24', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-24', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-24', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-24', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-24', claveFarmacia: 'ZARZA TUFARI' },
  { fecha: '2026-10-24', claveFarmacia: 'BERALDI' },
  { fecha: '2026-10-24', claveFarmacia: 'VENDITTI' },

  // 25/10/2026
  { fecha: '2026-10-25', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-25', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-25', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-25', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-25', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-25', claveFarmacia: 'PARISI' },

  // 26/10/2026
  { fecha: '2026-10-26', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-26', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-26', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-26', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-26', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-26', claveFarmacia: 'MIGLIORE' },
  { fecha: '2026-10-26', claveFarmacia: 'GOLD' },
  { fecha: '2026-10-26', claveFarmacia: 'MARA' },

  // 27/10/2026
  { fecha: '2026-10-27', claveFarmacia: 'MARÍA DEL ROSARIO' },
  { fecha: '2026-10-27', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-27', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-27', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-27', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-27', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-27', claveFarmacia: 'MEDICAMENTA' },
  { fecha: '2026-10-27', claveFarmacia: 'NAVIK' },

  // 28/10/2026
  { fecha: '2026-10-28', claveFarmacia: 'PF MONTE CHINGOLO S.C.S.' },
  { fecha: '2026-10-28', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-28', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-28', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-28', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-28', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-28', claveFarmacia: 'M. FERNÁNDEZ' },
  { fecha: '2026-10-28', claveFarmacia: 'SAN MARCO DE LEÓN' },

  // 29/10/2026
  { fecha: '2026-10-29', claveFarmacia: 'PRADO' },
  { fecha: '2026-10-29', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-29', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-29', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-29', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-29', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-29', claveFarmacia: 'CABEZUELO S.C.S.' },
  { fecha: '2026-10-29', claveFarmacia: 'VERGARA' },

  // 30/10/2026
  { fecha: '2026-10-30', claveFarmacia: 'ZUKAUSKAS' },
  { fecha: '2026-10-30', claveFarmacia: 'NIZOWSKI' },
  { fecha: '2026-10-30', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-30', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-30', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-30', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-30', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-30', claveFarmacia: 'POSIK' },
  { fecha: '2026-10-30', claveFarmacia: 'BASILIO' },

  // 31/10/2026
  { fecha: '2026-10-31', claveFarmacia: 'CENTRAL' },
  { fecha: '2026-10-31', claveFarmacia: 'SANTA ISABEL' },
  { fecha: '2026-10-31', claveFarmacia: 'NUEVA MOURIN' },
  { fecha: '2026-10-31', claveFarmacia: 'CROUZAT' },
  { fecha: '2026-10-31', claveFarmacia: 'NESTORE' },
  { fecha: '2026-10-31', claveFarmacia: 'LA PAZ' },
  { fecha: '2026-10-31', claveFarmacia: 'ESCALADA' },
  { fecha: '2026-10-31', claveFarmacia: 'SAN JOSÉ' },
  { fecha: '2026-10-31', claveFarmacia: 'MENDOZA' },
];

// ==========================================
async function main() {
  console.log(`\n🚀 Iniciando carga inteligente de turnos para: ${NOMBRE_LOCALIDAD}...`);

  // 1. Buscar la localidad en memoria para compatibilidad absoluta de motores de DB
  const localidades = await prisma.localidad.findMany();
  
  const localidad = localidades.find(
    (l) => l.nombre.toLowerCase().trim() === NOMBRE_LOCALIDAD.toLowerCase().trim()
  );

  if (!localidad) {
    throw new Error(`❌ Error crítico: No se encontró la localidad "${NOMBRE_LOCALIDAD}" en la base de datos.`);
  }

  // 2. Traer las farmacias asociadas a esta localidad
  const farmaciasEnDB = await prisma.farmacia.findMany({
    where: { localidades: { some: { localidadId: localidad.id } } },
  });

  if (farmaciasEnDB.length === 0) {
    console.warn(`⚠️ Advertencia: No se encontraron farmacias vinculadas al ID de localidad: ${localidad.id}.`);
  }

  // 3. Crear el idMap (clave string -> ID numérico de farmacia) de forma flexible
  const idMap: Record<string, number> = {};
  const clavesTurnos = Array.from(new Set(CALENDARIO_RAW.map((c) => c.claveFarmacia)));

  clavesTurnos.forEach((clave) => {
    const claveNormalizada = clave.toLowerCase().trim();

    const farmaciaMatch = farmaciasEnDB.find((f) =>
      f.nombre.toLowerCase().includes(claveNormalizada)
    );

    if (farmaciaMatch) {
      idMap[clave] = farmaciaMatch.id; 
    }
  });

  console.log('📦 Mapa de vinculación en memoria generado de forma exitosa.');

  // 4. Iterar y procesar el calendario (Crear o Saltar duplicados)
  let turnosCreados = 0;
  let turnosOmitidos = 0;

  for (const item of CALENDARIO_RAW) {
    const farmaciaId = idMap[item.claveFarmacia];

    if (!farmaciaId) {
      console.warn(`⚠️ No se pudo emparejar la clave "${item.claveFarmacia}" para el día ${item.fecha}. Registro omitido.`);
      continue;
    }

    // Configurar rangos de fechas (08:00 AM a 08:00 AM del día siguiente)
    const fechainicio = new Date(`${item.fecha}T08:00:00`);
    const fechafin = new Date(fechainicio);
    fechafin.setDate(fechafin.getDate() + 1);

    // Evitar duplicados: Verificar si ya existe este turno exacto
    const turnoExistente = await prisma.turno.findFirst({
      where: {
        farmaciaId: farmaciaId,
        fechaInicio: fechainicio,
      },
    });

    if (turnoExistente) {
      console.log(`ℹ️ El turno para la farmacia ID ${farmaciaId} el día ${item.fecha} ya existe en la DB. Saltando...`);
      turnosOmitidos++;
      continue;
    }

    // Insertar registro si pasa el control
    await prisma.turno.create({
      data: {
        farmaciaId: farmaciaId,
        fechaInicio : fechainicio,
        fechaFin : fechafin,
      },
    });

    turnosCreados++;
  }

  // Resumen final de la operación
  console.log(`\n==================================================`);
  console.log(`✅ Proceso finalizado para la localidad: ${NOMBRE_LOCALIDAD}`);
  console.log(`✨ Turnos nuevos creados: ${turnosCreados}`);
  console.log(`🔄 Turnos omitidos (ya existían): ${turnosOmitidos}`);
  console.log(`==================================================\n`);
}

main()
  .catch((e) => {
    console.error('\n❌ Ocurrió un error inesperado durante la automatización:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexión con Prisma Client cerrada de manera segura.');
  });
