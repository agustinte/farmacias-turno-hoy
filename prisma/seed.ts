import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CONFIGURACIÓN: MODIFICÁ ESTOS DATOS PARA OTRA LOCALIDAD
// ==========================================
//const NOMBRE_LOCALIDAD = 'San Antonio de Areco';
// const NOMBRE_LOCALIDAD = 'Baradero'; 
const NOMBRE_LOCALIDAD = 'Pergamino'; 
// const NOMBRE_LOCALIDAD = 'San Andres de Giles'; 
// const NOMBRE_LOCALIDAD = 'Mercedes';
// const NOMBRE_LOCALIDAD = 'Capitan Sarmiento';  
// const NOMBRE_LOCALIDAD = 'Arrecifes';  
// const NOMBRE_LOCALIDAD = 'Carmen de Areco';  
// const NOMBRE_LOCALIDAD = 'Junin';  
// const NOMBRE_LOCALIDAD = 'Ramallo';  
// const NOMBRE_LOCALIDAD = 'Rojas';  
// const NOMBRE_LOCALIDAD = 'Salto';
// const NOMBRE_LOCALIDAD = 'Mar del Plata';  
// const NOMBRE_LOCALIDAD = 'Campana';  
// const NOMBRE_LOCALIDAD = 'Zarate';  
// const NOMBRE_LOCALIDAD = 'San Isidro';  
// const NOMBRE_LOCALIDAD = 'Lanus';  

// <-- Cambiá el calendario acá
// const CALENDARIO_RAW = [
//   { fecha: '2026-07-01', claveFarmacia: 'Central' },
//   { fecha: '2026-07-02', claveFarmacia: 'Del Pueblo' },
// ];
const CALENDARIO_RAW = [
  { fecha: '2026-11-01', claveFarmacia: 'Anastasini' },
  { fecha: '2026-11-01', claveFarmacia: 'Manzoco' },
  { fecha: '2026-11-01', claveFarmacia: 'Baglioni' },
  { fecha: '2026-11-01', claveFarmacia: 'Del Cruce' },
  { fecha: '2026-11-01', claveFarmacia: 'Colell' },
  { fecha: '2026-11-02', claveFarmacia: 'Malvinas' },
  { fecha: '2026-11-02', claveFarmacia: 'Lopez' },
  { fecha: '2026-11-02', claveFarmacia: 'Galli' },
  { fecha: '2026-11-02', claveFarmacia: 'Bauzá' },
  { fecha: '2026-11-02', claveFarmacia: 'Gardes' },
  { fecha: '2026-11-03', claveFarmacia: 'Rodriguez' },
  { fecha: '2026-11-03', claveFarmacia: 'San Antonio' },
  { fecha: '2026-11-03', claveFarmacia: 'Piergallini' },
  { fecha: '2026-11-03', claveFarmacia: 'Ventola' },
  { fecha: '2026-11-03', claveFarmacia: 'Biagi' },
  { fecha: '2026-11-04', claveFarmacia: 'Los Andes' },
  { fecha: '2026-11-04', claveFarmacia: 'Garyulo' },
  { fecha: '2026-11-04', claveFarmacia: 'Banfi' },
  { fecha: '2026-11-04', claveFarmacia: 'Gaich' },
  { fecha: '2026-11-04', claveFarmacia: 'Chacón' },
  { fecha: '2026-11-05', claveFarmacia: 'Picco' },
  { fecha: '2026-11-05', claveFarmacia: 'Navarro' },
  { fecha: '2026-11-05', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-11-05', claveFarmacia: 'De Gaetani' },
  { fecha: '2026-11-05', claveFarmacia: 'Trotta' },
  { fecha: '2026-11-06', claveFarmacia: 'Verdún' },
  { fecha: '2026-11-06', claveFarmacia: 'Valdez' },
  { fecha: '2026-11-06', claveFarmacia: 'La Licata' },
  { fecha: '2026-11-06', claveFarmacia: 'Boldrini' },
  { fecha: '2026-11-06', claveFarmacia: 'Panella' },
  { fecha: '2026-11-07', claveFarmacia: 'Malvinas' },
  { fecha: '2026-11-07', claveFarmacia: 'Galetto' },
  { fecha: '2026-11-07', claveFarmacia: 'Conticello' },
  { fecha: '2026-11-08', claveFarmacia: 'Pistone' },
  { fecha: '2026-11-08', claveFarmacia: 'Avenida' },
  { fecha: '2026-11-08', claveFarmacia: 'Del Puente' },
  { fecha: '2026-11-08', claveFarmacia: 'Schneider' },
  { fecha: '2026-11-08', claveFarmacia: 'Fernández' },
  { fecha: '2026-11-09', claveFarmacia: 'Gallo' },
  { fecha: '2026-11-09', claveFarmacia: 'Cosio' },
  { fecha: '2026-11-09', claveFarmacia: 'Millán' },
  { fecha: '2026-11-09', claveFarmacia: 'Centenario' },
  { fecha: '2026-11-09', claveFarmacia: 'Seta' },
  { fecha: '2026-11-10', claveFarmacia: 'Fenix' },
  { fecha: '2026-11-10', claveFarmacia: 'Riera' },
  { fecha: '2026-11-10', claveFarmacia: 'Alé' },
  { fecha: '2026-11-10', claveFarmacia: 'Mac Donnell' },
  { fecha: '2026-11-10', claveFarmacia: 'Pretini' },
  { fecha: '2026-11-11', claveFarmacia: 'Otegui' },
  { fecha: '2026-11-11', claveFarmacia: 'Couso' },
  { fecha: '2026-11-11', claveFarmacia: 'Sierra' },
  { fecha: '2026-11-11', claveFarmacia: 'Speranza' },
  { fecha: '2026-11-11', claveFarmacia: 'Zeppa' },
  { fecha: '2026-11-12', claveFarmacia: 'Alcobendas' },
  { fecha: '2026-11-12', claveFarmacia: 'Masera' },
  { fecha: '2026-11-12', claveFarmacia: 'Martínez' },
  { fecha: '2026-11-12', claveFarmacia: 'Mariani' },
  { fecha: '2026-11-12', claveFarmacia: 'Vaschetti' },
  { fecha: '2026-11-13', claveFarmacia: 'Anastasini' },
  { fecha: '2026-11-13', claveFarmacia: 'Manzoco' },
  { fecha: '2026-11-13', claveFarmacia: 'Baglioni' },
  { fecha: '2026-11-13', claveFarmacia: 'Del Cruce' },
  { fecha: '2026-11-13', claveFarmacia: 'Colell' },
  { fecha: '2026-11-14', claveFarmacia: 'Malvinas' },
  { fecha: '2026-11-14', claveFarmacia: 'Lopez' },
  { fecha: '2026-11-14', claveFarmacia: 'Galli' },
  { fecha: '2026-11-14', claveFarmacia: 'Bauzá' },
  { fecha: '2026-11-14', claveFarmacia: 'Gardes' },
  { fecha: '2026-11-15', claveFarmacia: 'Rodriguez' },
  { fecha: '2026-11-15', claveFarmacia: 'San Antonio' },
  { fecha: '2026-11-15', claveFarmacia: 'Piergallini' },
  { fecha: '2026-11-15', claveFarmacia: 'Ventola' },
  { fecha: '2026-11-15', claveFarmacia: 'Biagi' },
  { fecha: '2026-11-16', claveFarmacia: 'Los Andes' },
  { fecha: '2026-11-16', claveFarmacia: 'Garyulo' },
  { fecha: '2026-11-16', claveFarmacia: 'Banfi' },
  { fecha: '2026-11-16', claveFarmacia: 'Gaich' },
  { fecha: '2026-11-16', claveFarmacia: 'Chacón' },
  { fecha: '2026-11-17', claveFarmacia: 'Picco' },
  { fecha: '2026-11-17', claveFarmacia: 'Navarro' },
  { fecha: '2026-11-17', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-11-17', claveFarmacia: 'De Gaetani' },
  { fecha: '2026-11-17', claveFarmacia: 'Trotta' },
  { fecha: '2026-11-18', claveFarmacia: 'Verdún' },
  { fecha: '2026-11-18', claveFarmacia: 'Valdez' },
  { fecha: '2026-11-18', claveFarmacia: 'La Licata' },
  { fecha: '2026-11-18', claveFarmacia: 'Boldrini' },
  { fecha: '2026-11-18', claveFarmacia: 'Panella' },
  { fecha: '2026-11-19', claveFarmacia: 'Malvinas' },
  { fecha: '2026-11-19', claveFarmacia: 'Galetto' },
  { fecha: '2026-11-19', claveFarmacia: 'Conticello' },
  { fecha: '2026-11-20', claveFarmacia: 'Pistone' },
  { fecha: '2026-11-20', claveFarmacia: 'Avenida' },
  { fecha: '2026-11-20', claveFarmacia: 'Del Puente' },
  { fecha: '2026-11-20', claveFarmacia: 'Schneider' },
  { fecha: '2026-11-20', claveFarmacia: 'Fernández' },
  { fecha: '2026-11-21', claveFarmacia: 'Gallo' },
  { fecha: '2026-11-21', claveFarmacia: 'Cosio' },
  { fecha: '2026-11-21', claveFarmacia: 'Millán' },
  { fecha: '2026-11-21', claveFarmacia: 'Centenario' },
  { fecha: '2026-11-21', claveFarmacia: 'Seta' },
  { fecha: '2026-11-22', claveFarmacia: 'Fenix' },
  { fecha: '2026-11-22', claveFarmacia: 'Riera' },
  { fecha: '2026-11-22', claveFarmacia: 'Alé' },
  { fecha: '2026-11-22', claveFarmacia: 'Mac Donnell' },
  { fecha: '2026-11-22', claveFarmacia: 'Pretini' },
  { fecha: '2026-11-23', claveFarmacia: 'Otegui' },
  { fecha: '2026-11-23', claveFarmacia: 'Couso' },
  { fecha: '2026-11-23', claveFarmacia: 'Sierra' },
  { fecha: '2026-11-23', claveFarmacia: 'Speranza' },
  { fecha: '2026-11-23', claveFarmacia: 'Zeppa' },
  { fecha: '2026-11-24', claveFarmacia: 'Alcobendas' },
  { fecha: '2026-11-24', claveFarmacia: 'Masera' },
  { fecha: '2026-11-24', claveFarmacia: 'Martínez' },
  { fecha: '2026-11-24', claveFarmacia: 'Mariani' },
  { fecha: '2026-11-24', claveFarmacia: 'Vaschetti' },
  { fecha: '2026-11-25', claveFarmacia: 'Anastasini' },
  { fecha: '2026-11-25', claveFarmacia: 'Manzoco' },
  { fecha: '2026-11-25', claveFarmacia: 'Baglioni' },
  { fecha: '2026-11-25', claveFarmacia: 'Del Cruce' },
  { fecha: '2026-11-25', claveFarmacia: 'Colell' },
  { fecha: '2026-11-26', claveFarmacia: 'Malvinas' },
  { fecha: '2026-11-26', claveFarmacia: 'Lopez' },
  { fecha: '2026-11-26', claveFarmacia: 'Bauzá' },
  { fecha: '2026-11-26', claveFarmacia: 'Gardes' },
  { fecha: '2026-11-27', claveFarmacia: 'Rodriguez' },
  { fecha: '2026-11-27', claveFarmacia: 'San Antonio' },
  { fecha: '2026-11-27', claveFarmacia: 'Piergallini' },
  { fecha: '2026-11-27', claveFarmacia: 'Ventola' },
  { fecha: '2026-11-27', claveFarmacia: 'Biagi' },
  { fecha: '2026-11-28', claveFarmacia: 'Los Andes' },
  { fecha: '2026-11-28', claveFarmacia: 'Garyulo' },
  { fecha: '2026-11-28', claveFarmacia: 'Banfi' },
  { fecha: '2026-11-28', claveFarmacia: 'Gaich' },
  { fecha: '2026-11-28', claveFarmacia: 'Chacón' },
  { fecha: '2026-11-29', claveFarmacia: 'Picco' },
  { fecha: '2026-11-29', claveFarmacia: 'Navarro' },
  { fecha: '2026-11-29', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-11-29', claveFarmacia: 'De Gaetani' },
  { fecha: '2026-11-29', claveFarmacia: 'Trotta' },
  { fecha: '2026-11-30', claveFarmacia: 'Verdún' },
  { fecha: '2026-11-30', claveFarmacia: 'Valdez' },
  { fecha: '2026-11-30', claveFarmacia: 'La Licata' },
  { fecha: '2026-11-30', claveFarmacia: 'Boldrini' },
  { fecha: '2026-11-30', claveFarmacia: 'Panella' },
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
