// npx tsx prisma/scripts/update.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const turnos = await prisma.$queryRawUnsafe(`
    UPDATE Turno
	SET
		fechaInicio = strftime('%s', datetime(fechaInicio / 1000, 'unixepoch', '-1 day')) * 1000,
		fechaFin    = strftime('%s', datetime(fechaFin / 1000, 'unixepoch', '-1 day')) * 1000
	WHERE farmaciaId IN (
		SELECT f.id
		FROM Farmacia f
		INNER JOIN Localidad l ON l.id = f.localidadId
		WHERE l.id in (1, 3, 7, 8, 9, 10, 11, 12)
	)
	AND datetime(fechaInicio / 1000, 'unixepoch') >= '2026-06-01';
  `);

  console.log(turnos);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });