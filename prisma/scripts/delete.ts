// npx tsx prisma/scripts/delete.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRawUnsafe(`
    DELETE FROM Turno
    WHERE id IN (
      SELECT t.id
      FROM Turno t
      INNER JOIN Farmacia f ON f.id = t.farmaciaId
      INNER JOIN Localidad l ON l.id = f.localidadId
      WHERE l.id = 1
        AND datetime(t.fechaInicio / 1000, 'unixepoch') >= '2026-06-01'
    );
  `);

  console.log(`Registros eliminados: ${result}`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });