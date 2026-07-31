// npx tsx prisma/scripts/select.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const turnos = await prisma.$queryRawUnsafe(`
    SELECT
      t.id,
      t.fechaInicio,
      t.fechaFin,
	  f.nombre

    FROM Turno t
	inner join Farmacia f on f.id = t.farmaciaId
	inner join Localidad l on l.id = f.localidadId
	where l.id = 1	
	and datetime(t.fechaInicio / 1000, 'unixepoch') >= '2026-06-01'
    ORDER BY t.fechaInicio;
  `);

  console.log(turnos);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });