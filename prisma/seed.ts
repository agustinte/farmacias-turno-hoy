import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Configuración de datos de entrada basados en tu listado
const LOCALIDAD_ID = 3;

interface TurnoCalendario {
  fechaStr: string; // Formato D/M/YYYY
  farmacias: string[];
}

const calendarioTurnos: TurnoCalendario[] = [
  { fechaStr: '20/5/2026', farmacias: ['Rodríguez', 'San Antonio', 'Piergallini', 'Ventola', 'Biagi'] },
  { fechaStr: '21/5/2026', farmacias: ['Los Andes', 'Garyulo', 'Banfi', 'Gaich', 'Chacón'] },
  { fechaStr: '22/5/2026', farmacias: ['Picco', 'Navarro', 'Del Pueblo', 'De Gaetani', 'Trotta'] },
  { fechaStr: '23/5/2026', farmacias: ['Verdún', 'Valdez', 'La Licata', 'Boldrini', 'Panella'] },
  { fechaStr: '24/5/2026', farmacias: ['Pistone', 'Avenida', 'Del Puente', 'Schneider', 'Fernández'] },
  { fechaStr: '25/5/2026', farmacias: ['Gallo', 'Cosio', 'Millán', 'Centenario', 'Seta'] },
  { fechaStr: '26/5/2026', farmacias: ['Fenix', 'Riera', 'Alé', 'Mac Donnell', 'Pretini'] },
  { fechaStr: '27/5/2026', farmacias: ['Otegui', 'Couso', 'Sierra', 'Speranza', 'Zeppa'] },
  { fechaStr: '28/5/2026', farmacias: ['Alcobendas', 'Masera', 'Martínez', 'Mariani', 'Vaschetti'] },
  { fechaStr: '29/5/2026', farmacias: ['Anastasini', 'Manzoco', 'Baglioni', 'Del Cruce', 'Colell'] },
  { fechaStr: '30/5/2026', farmacias: ['Malvinas', 'López', 'Galli', 'Bauzá', 'Gardes'] },
  { fechaStr: '31/5/2026', farmacias: ['Rodríguez', 'San Antonio', 'Piergallini', 'Ventola', 'Biagi'] },
];

/**
 * Función auxiliar para normalizar texto: quita tildes, diéresis y pasa a minúsculas
 */
function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina los caracteres de acentuación
    .trim();
}

/**
 * Parsea un string "D/M/YYYY" y devuelve un objeto Date seteado a las 08:00 AM local
 */
function crearFechaInicio(fechaStr: string): Date {
  const [dia, mes, anio] = fechaStr.split('/').map(Number);
  // Nota: El mes en JavaScript Date va de 0 a 11 (enero es 0, mayo es 4)
  return new Date(anio, mes - 1, dia, 8, 0, 0, 0);
}

async function main() {
  console.log('🚀 Iniciando la carga del calendario de turnos...');

  // 1. Verificar que la localidad existe en la base de datos
  const localidad = await prisma.localidad.findUnique({
    where: { id: LOCALIDAD_ID },
  });

  if (!localidad) {
    throw new Error(`❌ Error crítico: No se encontró la Localidad con ID ${LOCALIDAD_ID} en la base de datos.`);
  }

  console.log(`📌 Localidad confirmada: ID ${localidad.id}`);

  // 2. Traer todas las farmacias vinculadas a esta localidad
  const farmaciasDb = await prisma.farmacia.findMany({
    where: { localidadId: localidad.id },
  });

  if (farmaciasDb.length === 0) {
    console.warn(`⚠️ Advertencia: No se encontraron farmacias registradas para la localidad ID ${localidad.id}.`);
  }

  console.log(`📦 Se recuperaron ${farmaciasDb.length} farmacias de la base de datos.`);

  // 3. Procesar e iterar el calendario para dar de alta los turnos
  let turnosCreadosContador = 0;

  for (const entrada of calendarioTurnos) {
    const fechaInicio = crearFechaInicio(entrada.fechaStr);

    // Calcular la fecha de fin exactamente 24 horas después
    const fechaFin = new Date(fechaInicio);
    fechaFin.setHours(fechaFin.getHours() + 24);

    console.log(`\n📅 Procesando turnos para el día: ${entrada.fechaStr} (08:00 AM a 08:00 AM del día siguiente)`);

    for (const nombreTurno of entrada.farmacias) {
      const nombreTurnoNorm = normalizarTexto(nombreTurno);

      // Búsqueda flexible dentro de las farmacias traídas de la DB
      const farmaciaMatch = farmaciasDb.find((f) => {
        const nombreDbNorm = normalizarTexto(f.nombre);
        // Verifica si el nombre de la DB contiene la palabra del turno (ej: "FARMACIA RODRIGUEZ" contiene "rodriguez")
        return nombreDbNorm.includes(nombreTurnoNorm);
      });

      if (!farmaciaMatch) {
        console.warn(`⚠️ [Descalzado] No se encontró coincidencia en la DB para el turno: "${nombreTurno}"`);
        continue;
      }

      // 4. Crear el registro del turno asignando la relación correspondiente
      await prisma.turno.create({
        data: {
          fechaInicio,
          fechaFin,
          farmaciaId: farmaciaMatch.id, // Con esto es suficiente, la localidad se infiere de la farmacia
        },
      });

      turnosCreadosContador++;
    }
  }

  console.log(`\n✨ Proceso finalizado con éxito. Se crearon ${turnosCreadosContador} registros de turnos.`);
}

main()
  .catch((error) => {
    console.error('❌ Ocurrió un error durante la ejecución del script:');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    // Desconexión segura de Prisma Client
    await prisma.$disconnect();
  });