import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function obtenerTurnos(localidadSlug: string, fecha: Date) {
  const inicioDia = new Date(fecha);
  inicioDia.setHours(0, 0, 0, 0);

  const finDia = new Date(fecha);
  finDia.setHours(23, 59, 59, 999);

  const turnos = await prisma.turno.findMany({
    where: {
      fechaInicio: {
        lte: finDia,
      },
      fechaFin: {
        gte: inicioDia,
      },
      farmacia: {
        localidad: {
          slug: localidadSlug,
        },
      },
    },
    include: {
      farmacia: {
        include: {
          localidad: true,
        },
      },
    },
    orderBy: {
      farmacia: {
        nombre: 'asc',
      },
    },
  });

  return turnos;
}

async function main() {
  const fecha = new Date('2026-07-17');

  const turnos = await obtenerTurnos('san-antonio-de-areco', fecha);

  console.log(`Turnos encontrados: ${turnos.length}\n`);

  for (const turno of turnos) {
    console.log({
      farmacia: turno.farmacia.nombre,
      direccion: turno.farmacia.direccion,
      telefono: turno.farmacia.telefono,
      inicio: turno.fechaInicio,
      fin: turno.fechaFin,
    });
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());