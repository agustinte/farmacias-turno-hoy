import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CONFIGURACIÓN: MODIFICÁ ESTOS DATOS PARA OTRA LOCALIDAD
// ==========================================
//const NOMBRE_LOCALIDAD = 'San Antonio de Areco';
// const NOMBRE_LOCALIDAD = 'Baradero'; 
//const NOMBRE_LOCALIDAD = 'San Andres de Giles'; 
// const NOMBRE_LOCALIDAD = 'Mercedes';
 const NOMBRE_LOCALIDAD = 'San Isidro';  
// const NOMBRE_LOCALIDAD = 'Lanus';  

const CALENDARIO_RAW = [
  { fecha: '2026-11-02', claveFarmacia: 'Alesel SCS' },
  { fecha: '2026-11-02', claveFarmacia: 'Central Marmat' },
  { fecha: '2026-11-02', claveFarmacia: 'El Fenix' },
  { fecha: '2026-11-02', claveFarmacia: 'Fogacci' },

  { fecha: '2026-11-03', claveFarmacia: 'Behring' },
  { fecha: '2026-11-03', claveFarmacia: 'F.D.L. Legua SCS' },
  { fecha: '2026-11-03', claveFarmacia: 'Lioy' },
  { fecha: '2026-11-03', claveFarmacia: 'San Isidro Lomas SCS' },
  { fecha: '2026-11-03', claveFarmacia: 'Sznirer' },

  { fecha: '2026-11-04', claveFarmacia: 'Agarie' },
  { fecha: '2026-11-04', claveFarmacia: 'Beccar' },
  { fecha: '2026-11-04', claveFarmacia: 'Bigi' },
  { fecha: '2026-11-04', claveFarmacia: 'Caminos' },

  { fecha: '2026-11-05', claveFarmacia: 'Cientifica Jr S.C.S' },
  { fecha: '2026-11-05', claveFarmacia: 'Dankner' },
  { fecha: '2026-11-05', claveFarmacia: 'Juncal' },
  { fecha: '2026-11-05', claveFarmacia: 'Modarelli' },
  { fecha: '2026-11-05', claveFarmacia: 'Salazar' },

  { fecha: '2026-11-06', claveFarmacia: 'Camsimm' },
  { fecha: '2026-11-06', claveFarmacia: 'Cardero' },
  { fecha: '2026-11-06', claveFarmacia: 'DyF' },
  { fecha: '2026-11-06', claveFarmacia: 'Gomez' },

  { fecha: '2026-11-07', claveFarmacia: 'Cargnoni' },
  { fecha: '2026-11-07', claveFarmacia: 'Dibilio' },
  { fecha: '2026-11-07', claveFarmacia: 'Paladino' },
  { fecha: '2026-11-07', claveFarmacia: 'Rolon' },

  { fecha: '2026-11-08', claveFarmacia: 'Chiusano' },
  { fecha: '2026-11-08', claveFarmacia: 'La Paz SCS' },
  { fecha: '2026-11-08', claveFarmacia: 'Mark scs' },
  { fecha: '2026-11-08', claveFarmacia: 'Martinez' },
  { fecha: '2026-11-08', claveFarmacia: 'Sarratea' },

  { fecha: '2026-11-09', claveFarmacia: 'Borzone' },
  { fecha: '2026-11-09', claveFarmacia: 'Ishikawa' },
  { fecha: '2026-11-09', claveFarmacia: 'Lagonegro' },
  { fecha: '2026-11-09', claveFarmacia: 'Nueva Santa Rita' },

  { fecha: '2026-11-10', claveFarmacia: 'Brucoli' },
  { fecha: '2026-11-10', claveFarmacia: 'Punta Chica' },
  { fecha: '2026-11-10', claveFarmacia: 'San Antonio' },

  { fecha: '2026-11-11', claveFarmacia: 'Catania' },
  { fecha: '2026-11-11', claveFarmacia: 'Del Pueblo Beccar' },
  { fecha: '2026-11-11', claveFarmacia: 'Olsina' },

  { fecha: '2026-11-12', claveFarmacia: 'Baz' },
  { fecha: '2026-11-12', claveFarmacia: 'Iglesias' },
  { fecha: '2026-11-12', claveFarmacia: 'Moreno Salinas' },
  { fecha: '2026-11-12', claveFarmacia: 'Thames' },

  { fecha: '2026-11-13', claveFarmacia: 'Alfaro S.C.S.' },
  { fecha: '2026-11-13', claveFarmacia: 'Asame' },
  { fecha: '2026-11-13', claveFarmacia: 'MFM' },
  { fecha: '2026-11-13', claveFarmacia: 'Salvucci Valenti' },
  { fecha: '2026-11-13', claveFarmacia: 'Thevenet' },

  { fecha: '2026-11-14', claveFarmacia: 'Aguirre' },
  { fecha: '2026-11-14', claveFarmacia: 'Del Angel' },
  { fecha: '2026-11-14', claveFarmacia: 'Molino' },
  { fecha: '2026-11-14', claveFarmacia: 'Peatonal' },
  { fecha: '2026-11-14', claveFarmacia: 'Podium' },

  { fecha: '2026-11-15', claveFarmacia: 'Agnese' },
  { fecha: '2026-11-15', claveFarmacia: 'Irie' },
  { fecha: '2026-11-15', claveFarmacia: 'Rosendi' },
  { fecha: '2026-11-15', claveFarmacia: 'Tomkinson' },

  { fecha: '2026-11-16', claveFarmacia: 'Ader' },
  { fecha: '2026-11-16', claveFarmacia: 'De La Costa SCS' },
  { fecha: '2026-11-16', claveFarmacia: 'Loureiro' },
  { fecha: '2026-11-16', claveFarmacia: 'Sznirer' },

  { fecha: '2026-11-17', claveFarmacia: 'Añón' },
  { fecha: '2026-11-17', claveFarmacia: 'Mariotto' },
  { fecha: '2026-11-17', claveFarmacia: 'Schinca' },
  { fecha: '2026-11-17', claveFarmacia: 'Zinga' },

  { fecha: '2026-11-18', claveFarmacia: 'Alesel SCS' },
  { fecha: '2026-11-18', claveFarmacia: 'Fogacci' },
  { fecha: '2026-11-18', claveFarmacia: 'La merced' },
  { fecha: '2026-11-18', claveFarmacia: 'Marmol' },

  { fecha: '2026-11-19', claveFarmacia: 'Central Marmat' },
  { fecha: '2026-11-19', claveFarmacia: 'El Fenix' },
  { fecha: '2026-11-19', claveFarmacia: 'Lioy' },
  { fecha: '2026-11-19', claveFarmacia: 'Sambam' },

  { fecha: '2026-11-20', claveFarmacia: 'Behring' },
  { fecha: '2026-11-20', claveFarmacia: 'Bigi' },
  { fecha: '2026-11-20', claveFarmacia: 'Caminos' },
  { fecha: '2026-11-20', claveFarmacia: 'F.D.L. Legua SCS' },
  { fecha: '2026-11-20', claveFarmacia: 'San Isidro Lomas SCS' },

  { fecha: '2026-11-21', claveFarmacia: 'Agarie' },
  { fecha: '2026-11-21', claveFarmacia: 'Beccar' },
  { fecha: '2026-11-21', claveFarmacia: 'Cientifica Jr S.C.S' },
  { fecha: '2026-11-21', claveFarmacia: 'Dankner' },

  { fecha: '2026-11-22', claveFarmacia: 'Camsimm' },
  { fecha: '2026-11-22', claveFarmacia: 'DyF' },
  { fecha: '2026-11-22', claveFarmacia: 'Juncal' },
  { fecha: '2026-11-22', claveFarmacia: 'Modarelli' },
  { fecha: '2026-11-22', claveFarmacia: 'Salazar' },

  { fecha: '2026-11-23', claveFarmacia: 'Cardero' },
  { fecha: '2026-11-23', claveFarmacia: 'Cargnoni' },
  { fecha: '2026-11-23', claveFarmacia: 'Dibilio' },
  { fecha: '2026-11-23', claveFarmacia: 'Gomez' },

  { fecha: '2026-11-24', claveFarmacia: 'Chiusano' },
  { fecha: '2026-11-24', claveFarmacia: 'Paladino' },
  { fecha: '2026-11-24', claveFarmacia: 'Rolon' },
  { fecha: '2026-11-24', claveFarmacia: 'Sarratea' },

  { fecha: '2026-11-25', claveFarmacia: 'Borzone' },
  { fecha: '2026-11-25', claveFarmacia: 'La Paz SCS' },
  { fecha: '2026-11-25', claveFarmacia: 'Mark scs' },
  { fecha: '2026-11-25', claveFarmacia: 'Martinez' },
  { fecha: '2026-11-25', claveFarmacia: 'Nueva Santa Rita' },

  { fecha: '2026-11-26', claveFarmacia: 'Ishikawa' },
  { fecha: '2026-11-26', claveFarmacia: 'Lagonegro' },
  { fecha: '2026-11-26', claveFarmacia: 'San Antonio' },

  { fecha: '2026-11-27', claveFarmacia: 'Brucoli' },
  { fecha: '2026-11-27', claveFarmacia: 'Catania' },
  { fecha: '2026-11-27', claveFarmacia: 'Punta Chica' },

  { fecha: '2026-11-28', claveFarmacia: 'Del Pueblo Beccar' },
  { fecha: '2026-11-28', claveFarmacia: 'Moreno Salinas' },
  { fecha: '2026-11-28', claveFarmacia: 'Olsina' },
  { fecha: '2026-11-28', claveFarmacia: 'Thames' },

  { fecha: '2026-11-29', claveFarmacia: 'Asame' },
  { fecha: '2026-11-29', claveFarmacia: 'Baz' },
  { fecha: '2026-11-29', claveFarmacia: 'Iglesias' },
  { fecha: '2026-11-29', claveFarmacia: 'MFM' },

  { fecha: '2026-11-30', claveFarmacia: 'Alfaro S.C.S.' },
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
