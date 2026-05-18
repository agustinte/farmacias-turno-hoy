import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando carga de datos para Pergamino...');

  // 1. Crear o buscar la Localidad de Pergamino
  const pergamino = await prisma.localidad.upsert({
    where: { slug: 'pergamino' },
    update: {},
    create: {
      nombre: 'Pergamino',
      slug: 'pergamino',
    },
  });

  const LOCALIDAD_ID = pergamino.id;
  console.log(`📍 Localidad procesada: ${pergamino.nombre} (ID: ${LOCALIDAD_ID})`);

  // 2. Listado Maestro de Farmacias con datos 100% completos
  const PHARMACIES = [
    { name: 'FARMACIA AVENIDA', address: 'AV. DE MAYO 892', phone: '-' },
    { name: 'FARMACIA DEL PUENTE', address: 'JUAN B. JUSTO 1596', phone: '-' },
    { name: 'FARMACIA PANELLA', address: 'AV. DE MAYO 1098', phone: '-' },
    { name: 'FARMACIA RIERA', address: 'SAN NICOLAS 699', phone: '-' },
    { name: 'FARMACIA RODRIGUEZ', address: 'ALSINA 1253', phone: '43-6955' },
    { name: 'FARMACIA BANFI', address: 'AMEGHINO 821', phone: '43-7813' },
    { name: 'FARMACIA CARNEVALE', address: 'V. SARFIELD Y SALTA', phone: '-' },
    { name: 'FARMACIA CERVANTES', address: 'AV. DE MAYO 205', phone: '-' },
    { name: 'FARMACIA CHACON', address: 'SCALABRINI ORTIZ 711', phone: '-' },
    { name: 'FARMACIA COLELL', address: 'VELEZ SARSFIELD 308', phone: '-' },
    { name: 'FARMACIA CONTICELLO', address: 'HIPOLITO IRIGOYEN 101', phone: '42-3846' },
    { name: 'FARMACIA DEL CRUCE', address: 'H. IRIGOYEN 1053', phone: '42-5231' },
    { name: 'FARMACIA DEL PUEBLO', address: 'SAN NICOLAS 600', phone: '42-3278' },
    { name: 'FARMACIA FENIX', address: 'BV. ALSINA 690', phone: '-' },
    { name: 'FARMACIA FERNANDEZ', address: 'BV. M. UGARTE 447', phone: '-' },
    { name: 'FARMACIA GAICH', address: 'AV. JUAN B. JUSTO 2383', phone: '-' },
    { name: 'FARMACIA GARYULO', address: 'CASTELLI 109', phone: '42-5933' },
    { name: 'FARMACIA LAVANDERA', address: 'FLORIDA 962', phone: '42-3878' },
    { name: 'FARMACIA LOS ANDES', address: 'MITRE 814', phone: '-' },
    { name: 'FARMACIA MANZOCO', address: 'BV. ROCHA 501', phone: '-' },
    { name: 'FARMACIA MC DONNELL', address: 'AV. ILLIA 2553', phone: '42-2054' },
    { name: 'FARMACIA PAZ', address: 'ALSINA 902', phone: '43-6289' },
    { name: 'FARMACIA PEREZ', address: 'COLON 602', phone: '44-1555' },
    { name: 'FARMACIA PICCO', address: 'AV. DE MAYO 1391', phone: '-' },
    { name: 'FARMACIA PIERGALLINI', address: 'AMEGHINO 2002', phone: '44-0843' },
    { name: 'FARMACIA RATTO', address: 'BV. COLON', phone: '-' },
    { name: 'FARMACIA RAWSON', address: 'MERCED 1102', phone: '-' },
    { name: 'FARMACIA ROASENDA', address: 'RASTREADOR FOURNIER 1646', phone: '42-0536' },
    { name: 'FARMACIA SAN ANTONIO', address: 'AV. DE MAYO 493', phone: '-' },
    { name: 'FARMACIA SPERANZA', address: 'AV. DE MAYO 1160', phone: '42-4088' },
    { name: 'FARMACIA TASSAROLO', address: 'ALBERTI 200', phone: '-' },
    { name: 'FARMACIA TROTTA', address: 'AV. TENIENTE ASUA 1675', phone: '43-5448' },
    { name: 'FARMACIA VASCHETTI', address: 'MERCED Y ECHEVARRIA', phone: '43-7662' },
    { name: 'FARMACIA ZAGO', address: 'SARMIENTO 806', phone: '-' },
    
    // Farmacias actualizadas y completadas con tus nuevos datos:
    { name: 'FARMACIA ALCOBENDAS', address: 'Avda. E. Illia y Monroe', phone: '(02477) 411567' },
    { name: 'FARMACIA MASERA', address: 'Bolivia 628', phone: '(02477) 430570' },
    { name: 'FARMACIA MARTINEZ', address: 'Dr. Alem 875', phone: '(02477) 415930' },
    { name: 'FARMACIA MARIANI', address: 'Ameghino 402', phone: '(02477) 412823' },
    { name: 'FARMACIA ANASTASINI', address: 'Florida 962', phone: '(02477) 423878' },
    { name: 'FARMACIA BAGLIONI', address: 'Avda. E.Illia y Solís', phone: '(02477) 421928' },
    { name: 'FARMACIA MALVINAS', address: 'Avda.Rivero y Fta.Sarmiento', phone: '(02477) 415863' },
    { name: 'FARMACIA LOPEZ', address: 'Velez Sarsfield y Salta', phone: '(02477) 411397' },
    { name: 'FARMACIA GALLI', address: 'Bv.Colón y Mitre', phone: '(02477) 441555' },
    { name: 'FARMACIA BAUZA', address: 'Avda. de Mayo y Moreno', phone: '(02477) 423701' },
    { name: 'FARMACIA GARDES', address: 'C.Costa y Ecuador', phone: '(02477) 436867' }
  ];

  // Mapa temporal para capturar los IDs autoincrementales
  const farmaciaIdMap: Record<string, number> = {};

  console.log('📦 Insertando farmacias en la base de datos...');
  for (const f of PHARMACIES) {
    const nuevaFarmacia = await prisma.farmacia.create({
      data: {
        nombre: f.name,
        direccion: f.address,
        telefono: f.phone,
        localidadId: LOCALIDAD_ID,
      },
    });
    
    // Clave limpia en mayúsculas para asociar los turnos fácilmente
    const clave = f.name.replace('FARMACIA ', '').trim().toUpperCase();
    farmaciaIdMap[clave] = nuevaFarmacia.id;
  }
  console.log('✅ Todas las farmacias de Pergamino insertadas correctamente.');

  // 3. Estructura de Turnos Grupales por Día
  const TURNOS_POR_DIA = [
    {
      date: '2026-05-16',
      farmacias: ['ALCOBENDAS', 'MASERA', 'MARTINEZ', 'MARIANI', 'VASCHETTI']
    },
    {
      date: '2026-05-17',
      farmacias: ['ANASTASINI', 'MANZOCO', 'BAGLIONI', 'DEL CRUCE', 'COLELL']
    },
    {
      date: '2026-05-18',
      farmacias: ['MALVINAS', 'LOPEZ', 'GALLI', 'BAUZA', 'GARDES']
    }
  ];

  console.log('⏳ Generando calendario de turnos rotativos...');
  for (const grupo of TURNOS_POR_DIA) {
    const fechaInicio = new Date(`${grupo.date}T08:00:00`);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + 1);

    for (const nombreClave of grupo.farmacias) {
      const farmaciaId = farmaciaIdMap[nombreClave];

      if (farmaciaId) {
        await prisma.turno.create({
          data: {
            fechaInicio,
            fechaFin,
            farmaciaId: farmaciaId,
          },
        });
      } else {
        console.warn(`⚠️ No se encontró ID para la farmacia de guardia: ${nombreClave}`);
      }
    }
  }

  console.log('🏁 ¡Proceso completado con éxito para la localidad de Pergamino!');
}

main()
  .catch((e) => {
    console.error('❌ Error crítico en el script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });