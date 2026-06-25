import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CONFIGURACIÓN: MODIFICÁ ESTOS DATOS PARA OTRA LOCALIDAD
// ==========================================
//const NOMBRE_LOCALIDAD = 'San Antonio de Areco';
// const NOMBRE_LOCALIDAD = 'Baradero'; 
// const NOMBRE_LOCALIDAD = 'Pergamino'; 
// const NOMBRE_LOCALIDAD = 'San Andres de Giles'; 
// const NOMBRE_LOCALIDAD = 'Mercedes';
 const NOMBRE_LOCALIDAD = 'Capitan Sarmiento';  

// <-- Cambiá el calendario acá
// const CALENDARIO_RAW = [
//   { fecha: '2026-07-01', claveFarmacia: 'Central' },
//   { fecha: '2026-07-02', claveFarmacia: 'Del Pueblo' },
// ];
const CALENDARIO_RAW = [
  { fecha: '2026-06-01', claveFarmacia: 'Ruiz' },
  { fecha: '2026-06-02', claveFarmacia: 'Lagorio' },
  { fecha: '2026-06-03', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-04', claveFarmacia: 'Perez' },
  { fecha: '2026-06-05', claveFarmacia: 'Bava' },
  { fecha: '2026-06-06', claveFarmacia: 'Folguera' },
  { fecha: '2026-06-07', claveFarmacia: 'Ruiz' },

  { fecha: '2026-06-08', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-09', claveFarmacia: 'Lagorio' },
  { fecha: '2026-06-10', claveFarmacia: 'Perez' },
  { fecha: '2026-06-11', claveFarmacia: 'Bava' },
  { fecha: '2026-06-12', claveFarmacia: 'Folguera' },
  { fecha: '2026-06-13', claveFarmacia: 'Ruiz' },
  { fecha: '2026-06-14', claveFarmacia: 'Lagorio' },

  { fecha: '2026-06-15', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-16', claveFarmacia: 'Perez' },
  { fecha: '2026-06-17', claveFarmacia: 'Bava' },
  { fecha: '2026-06-18', claveFarmacia: 'Folguera' },
  { fecha: '2026-06-19', claveFarmacia: 'Ruiz' },
  { fecha: '2026-06-20', claveFarmacia: 'Lagorio' },
  { fecha: '2026-06-21', claveFarmacia: 'Del Pueblo' },

  { fecha: '2026-06-22', claveFarmacia: 'Perez' },
  { fecha: '2026-06-23', claveFarmacia: 'Bava' },
  { fecha: '2026-06-24', claveFarmacia: 'Folguera' },
  { fecha: '2026-06-25', claveFarmacia: 'Ruiz' },
  { fecha: '2026-06-26', claveFarmacia: 'Lagorio' },
  { fecha: '2026-06-27', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-28', claveFarmacia: 'Perez' },

  { fecha: '2026-06-29', claveFarmacia: 'Bava' },
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
    where: { localidadId: localidad.id },
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