import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CONFIGURACIÓN: MODIFICÁ ESTOS DATOS PARA OTRA LOCALIDAD
// ==========================================
  
const NOMBRE_LOCALIDAD = 'San Isidro';  

const CALENDARIO_RAW = [
  // Jueves 1 de Octubre
  { fecha: '2026-10-01', claveFarmacia: 'Agarie' },
  { fecha: '2026-10-01', claveFarmacia: 'Alesel SCS' },
  { fecha: '2026-10-01', claveFarmacia: 'Beccar' },
  { fecha: '2026-10-01', claveFarmacia: 'Fogacci' },

  // Viernes 2 de Octubre
  { fecha: '2026-10-02', claveFarmacia: 'Juncal' },
  { fecha: '2026-10-02', claveFarmacia: 'Lioy' },
  { fecha: '2026-10-02', claveFarmacia: 'Modarelli' },
  { fecha: '2026-10-02', claveFarmacia: 'Salazar' },
  { fecha: '2026-10-02', claveFarmacia: 'Sambam' },

  // Sábado 3 de Octubre
  { fecha: '2026-10-03', claveFarmacia: 'Bigi' },
  { fecha: '2026-10-03', claveFarmacia: 'Caminos' },
  { fecha: '2026-10-03', claveFarmacia: 'Cardero' },
  { fecha: '2026-10-03', claveFarmacia: 'Gomez' },

  // Domingo 4 de Octubre
  { fecha: '2026-10-04', claveFarmacia: 'Cientifica Jr S.C.S' },
  { fecha: '2026-10-04', claveFarmacia: 'Dankner' },
  { fecha: '2026-10-04', claveFarmacia: 'Paladino' },
  { fecha: '2026-10-04', claveFarmacia: 'Rolon' },

  // Lunes 5 de Octubre
  { fecha: '2026-10-05', claveFarmacia: 'Camsimm' },
  { fecha: '2026-10-05', claveFarmacia: 'DyF' },
  { fecha: '2026-10-05', claveFarmacia: 'La Paz SCS' },
  { fecha: '2026-10-05', claveFarmacia: 'Mark scs' },
  { fecha: '2026-10-05', claveFarmacia: 'Martinez' },

  // Martes 6 de Octubre
  { fecha: '2026-10-06', claveFarmacia: 'Cargnoni' },
  { fecha: '2026-10-06', claveFarmacia: 'Dibilio' },
  { fecha: '2026-10-06', claveFarmacia: 'Ishikawa' },
  { fecha: '2026-10-06', claveFarmacia: 'Lagonegro' },

  // Miércoles 7 de Octubre
  { fecha: '2026-10-07', claveFarmacia: 'Brucoli' },
  { fecha: '2026-10-07', claveFarmacia: 'Chiusano' },
  { fecha: '2026-10-07', claveFarmacia: 'Punta Chica' },
  { fecha: '2026-10-07', claveFarmacia: 'Sarratea' },

  // Jueves 8 de Octubre
  { fecha: '2026-10-08', claveFarmacia: 'Borzone' },
  { fecha: '2026-10-08', claveFarmacia: 'Del Pueblo Beccar' },
  { fecha: '2026-10-08', claveFarmacia: 'Nueva Santa Rita' },
  { fecha: '2026-10-08', claveFarmacia: 'Olsina' },

  // Viernes 9 de Octubre
  { fecha: '2026-10-09', claveFarmacia: 'Baz' },
  { fecha: '2026-10-09', claveFarmacia: 'Iglesias' },
  { fecha: '2026-10-09', claveFarmacia: 'San Antonio' },

  // Sábado 10 de Octubre
  { fecha: '2026-10-10', claveFarmacia: 'Alfaro S.C.S.' },
  { fecha: '2026-10-10', claveFarmacia: 'Catania' },
  { fecha: '2026-10-10', claveFarmacia: 'Salvucci Valenti' },
  { fecha: '2026-10-10', claveFarmacia: 'Thevenet' },

  // Domingo 11 de Octubre
  { fecha: '2026-10-11', claveFarmacia: 'Aguirre' },
  { fecha: '2026-10-11', claveFarmacia: 'Del Angel' },
  { fecha: '2026-10-11', claveFarmacia: 'Molino' },
  { fecha: '2026-10-11', claveFarmacia: 'Moreno Salinas' },
  { fecha: '2026-10-11', claveFarmacia: 'Thames' },

  // Lunes 12 de Octubre
  { fecha: '2026-10-12', claveFarmacia: 'Asame' },
  { fecha: '2026-10-12', claveFarmacia: 'Irie' },
  { fecha: '2026-10-12', claveFarmacia: 'MFM' },
  { fecha: '2026-10-12', claveFarmacia: 'Tomkinson' },

  // Martes 13 de Octubre
  { fecha: '2026-10-13', claveFarmacia: 'De La Costa SCS' },
  { fecha: '2026-10-13', claveFarmacia: 'Loureiro' },
  { fecha: '2026-10-13', claveFarmacia: 'Peatonal' },
  { fecha: '2026-10-13', claveFarmacia: 'Podium' },

  // Miércoles 14 de Octubre
  { fecha: '2026-10-14', claveFarmacia: 'Agnese' },
  { fecha: '2026-10-14', claveFarmacia: 'Añon' },
  { fecha: '2026-10-14', claveFarmacia: 'Rosendi' },
  { fecha: '2026-10-14', claveFarmacia: 'Zinga' },

  // Jueves 15 de Octubre
  { fecha: '2026-10-15', claveFarmacia: 'Ader' },
  { fecha: '2026-10-15', claveFarmacia: 'La merced' },
  { fecha: '2026-10-15', claveFarmacia: 'Marmol' },
  { fecha: '2026-10-15', claveFarmacia: 'Sznirer' },

  // Viernes 16 de Octubre
  { fecha: '2026-10-16', claveFarmacia: 'Central Marmat' },
  { fecha: '2026-10-16', claveFarmacia: 'El Fenix' },
  { fecha: '2026-10-16', claveFarmacia: 'Mariotto' },
  { fecha: '2026-10-16', claveFarmacia: 'Schinca' },

  // Sábado 17 de Octubre
  { fecha: '2026-10-17', claveFarmacia: 'Behring' },
  { fecha: '2026-10-17', claveFarmacia: 'F.D.L. Legua SCS' },
  { fecha: '2026-10-17', claveFarmacia: 'San Isidro Lomas SCS' },

  // Domingo 18 de Octubre
  { fecha: '2026-10-18', claveFarmacia: 'Agarie' },
  { fecha: '2026-10-18', claveFarmacia: 'Beccar' },
  { fecha: '2026-10-18', claveFarmacia: 'Lioy' },
  { fecha: '2026-10-18', claveFarmacia: 'Sambam' },

  // Lunes 19 de Octubre
  { fecha: '2026-10-19', claveFarmacia: 'Bigi' },
  { fecha: '2026-10-19', claveFarmacia: 'Caminos' },
  { fecha: '2026-10-19', claveFarmacia: 'Juncal' },
  { fecha: '2026-10-19', claveFarmacia: 'Modarelli' },
  { fecha: '2026-10-19', claveFarmacia: 'Salazar' },

  // Martes 20 de Octubre
  { fecha: '2026-10-20', claveFarmacia: 'Cardero' },
  { fecha: '2026-10-20', claveFarmacia: 'Cientifica Jr S.C.S' },
  { fecha: '2026-10-20', claveFarmacia: 'Dankner' },
  { fecha: '2026-10-20', claveFarmacia: 'Gomez' },

  // Miércoles 21 de Octubre
  { fecha: '2026-10-21', claveFarmacia: 'Camsimm' },
  { fecha: '2026-10-21', claveFarmacia: 'DyF' },
  { fecha: '2026-10-21', claveFarmacia: 'Paladino' },
  { fecha: '2026-10-21', claveFarmacia: 'Rolon' },

  // Jueves 22 de Octubre
  { fecha: '2026-10-22', claveFarmacia: 'Cargnoni' },
  { fecha: '2026-10-22', claveFarmacia: 'Dibilio' },
  { fecha: '2026-10-22', claveFarmacia: 'La Paz SCS' },
  { fecha: '2026-10-22', claveFarmacia: 'Mark scs' },
  { fecha: '2026-10-22', claveFarmacia: 'Martinez' },

  // Viernes 23 de Octubre
  { fecha: '2026-10-23', claveFarmacia: 'Chiusano' },
  { fecha: '2026-10-23', claveFarmacia: 'Ishikawa' },
  { fecha: '2026-10-23', claveFarmacia: 'Lagonegro' },
  { fecha: '2026-10-23', claveFarmacia: 'Sarratea' },

  // Sábado 24 de Octubre
  { fecha: '2026-10-24', claveFarmacia: 'Borzone' },
  { fecha: '2026-10-24', claveFarmacia: 'Brucoli' },
  { fecha: '2026-10-24', claveFarmacia: 'Nueva Santa Rita' },
  { fecha: '2026-10-24', claveFarmacia: 'Punta Chica' }
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
