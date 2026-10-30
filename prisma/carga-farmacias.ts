import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

const farmacias = [
  { nombre: 'PRADO', direccion: 'CONDARCO 1586, MONTE CHINGOLO', telefono: '42301329', localidadIds: [22,23,24] },
  { nombre: 'YACHELINI', direccion: 'MATANZA 3259, MONTE CHINGOLO', telefono: '42469410', localidadIds: [22,23,24] },
  { nombre: 'NUEVA MOURIN', direccion: 'AV. H. YRIGOYEN 4581, LANÚS OESTE', telefono: '42474745', localidadIds: [22,23,24] },
  { nombre: 'CROUZAT', direccion: 'DERQUI 1687, LANÚS OESTE', telefono: '42477073', localidadIds: [22,23,24] },
  { nombre: 'NESTORE', direccion: 'DIP. PEDRERA 1026, LANÚS OESTE', telefono: '42182649', localidadIds: [22,23,24] },
  { nombre: 'LA PAZ', direccion: '9 DE JULIO 2501, LANÚS ESTE', telefono: '42419285', localidadIds: [22,23,24] },
  { nombre: 'ESCALADA', direccion: 'AV. H. YRIGOYEN 6201, R. DE ESCALADA', telefono: '42423276', localidadIds: [22,23,24] },
  { nombre: 'COUTO MARTINEZ', direccion: 'RIVADAVIA 1499, LANÚS OESTE', telefono: '42083405', localidadIds: [22,23,24] },
  { nombre: 'MADAME CURIE', direccion: 'EVA PERÓN 851, LANÚS ESTE', telefono: '42412357', localidadIds: [22,23,24] },
  { nombre: 'NIZOWSKI', direccion: 'EVA PERÓN 2875, LANÚS ESTE', telefono: '42300417', localidadIds: [22,23,24] },
  { nombre: 'BRANDO', direccion: 'MADARIAGA 491, LANÚS ESTE', telefono: '60885890', localidadIds: [22,23,24] },
  { nombre: 'ELÍAS S.C.S.', direccion: 'J.M. MORENO 2699, LANÚS OESTE', telefono: '43686897', localidadIds: [22,23,24] },
  { nombre: 'PINTOS', direccion: 'TAGLE 3413, LANÚS OESTE', telefono: '42626069', localidadIds: [22,23,24] },
  { nombre: 'SANTA ISABEL', direccion: 'EVA PERÓN 2570, LANÚS ESTE', telefono: '42471882', localidadIds: [22,23,24] },
  { nombre: 'NOBEL', direccion: 'CNO. GRAL. BELGRANO 601, GERLI', telefono: '42048598', localidadIds: [22,23,24] },
  { nombre: 'REX', direccion: '29 DE SETIEMBRE 1884, LANÚS ESTE', telefono: '1161421888', localidadIds: [22,23,24] },
  { nombre: 'ROTOLO', direccion: 'AV. H. YRIGOYEN 5399, R. DE ESCALADA', telefono: '42250203', localidadIds: [22,23,24] },
  { nombre: 'SAN LUIS DE MONFORT', direccion: 'M. OCAMPO 801, LANÚS OESTE', telefono: '42250558', localidadIds: [22,23,24] },
  { nombre: 'ZARZA TUFARI', direccion: 'SARMIENTO 298, GERLI', telefono: '75429089', localidadIds: [22,23,24] },
  { nombre: 'BERALDI', direccion: 'C. URUGUAYO 559, MONTE CHINGOLO', telefono: '42467549', localidadIds: [22,23,24] },
  { nombre: 'VENDITTI', direccion: 'VIAMONTE 501, LANÚS OESTE', telefono: '42410261', localidadIds: [22,23,24] },
  { nombre: 'PARISI', direccion: 'CNO. GRAL. BELGRANO 2979, LANÚS ESTE', telefono: '39774669', localidadIds: [22,23,24] },
  { nombre: 'MIGLIORE', direccion: 'TAGLE 3902, LANÚS OESTE', telefono: '42626367', localidadIds: [22,23,24] },
  { nombre: 'GOLD', direccion: 'PARAGUAY 3201, LANÚS OESTE', telefono: '42088348', localidadIds: [22,23,24] },
  { nombre: 'MARA', direccion: 'EVA PERÓN 4029, MONTE CHINGOLO', telefono: '20651202', localidadIds: [22,23,24] },
  { nombre: 'MARÍA DEL ROSARIO', direccion: 'AV. H. YRIGOYEN 3080, LANÚS OESTE', telefono: '42491023', localidadIds: [22,23,24] },
  { nombre: 'MEDICAMENTA', direccion: 'A. ILLIA 1170, LANÚS ESTE', telefono: '42495582', localidadIds: [22,23,24] },
  { nombre: 'NAVIK', direccion: 'HUMBERTO I 2399, LANÚS OESTE', telefono: '42626322', localidadIds: [22,23,24] },
  { nombre: 'PF MONTE CHINGOLO S.C.S.', direccion: 'EVA PERÓN 4743, MONTE CHINGOLO', telefono: '75116521', localidadIds: [22,23,24] },
  { nombre: 'M. FERNÁNDEZ', direccion: 'URIARTE 1299, R. DE ESCALADA', telefono: '', localidadIds: [22,23,24] },
  { nombre: 'SAN MARCO DE LEÓN', direccion: 'R. ESC. SAN MARTÍN 901, LANÚS OESTE', telefono: '', localidadIds: [22,23,24] },
  { nombre: 'CABEZUELO S.C.S.', direccion: 'M. AVELLANEDA 2502, R. DE ESCALADA', telefono: '42761354', localidadIds: [22,23,24] },
  { nombre: 'VERGARA', direccion: 'C. URUGUAYO 1459, LANÚS ESTE', telefono: '42202487', localidadIds: [22,23,24] },
  { nombre: 'ZUKAUSKAS', direccion: 'GRAL. RODRÍGUEZ 1501, LANÚS ESTE', telefono: '42409326', localidadIds: [22,23,24] },
  { nombre: 'POSIK', direccion: 'SALTA 1459, LANÚS ESTE', telefono: '42256116', localidadIds: [22,23,24] },
  { nombre: 'BASILIO', direccion: 'CONDARCO 3499, MONTE CHINGOLO', telefono: '', localidadIds: [22,23,24] },
  { nombre: 'CENTRAL', direccion: 'EVA PERÓN 4556, MONTE CHINGOLO', telefono: '42304006', localidadIds: [22,23,24] },
  { nombre: 'SAN JOSÉ', direccion: 'TTE. GRAL. J.D. PERÓN 2401, VALENTÍN ALSINA', telefono: '42088362', localidadIds: [22,23,24] },
  { nombre: 'MENDOZA', direccion: 'ACHÁVAL 2751, R. DE ESCALADA', telefono: '42468627', localidadIds: [22,23,24] },
];

await prisma.$transaction(async (tx) => {
  const localidadIds = [...new Set(farmacias.flatMap(({ localidadIds }) => localidadIds))];
  const localidades = await tx.localidad.findMany({
    where: { id: { in: localidadIds } },
    select: { id: true },
  });
  const localidadesExistentes = new Set(localidades.map(({ id }) => id));
  const localidadesFaltantes = localidadIds.filter((id) => !localidadesExistentes.has(id));

  if (localidadesFaltantes.length > 0) {
    throw new Error(`No existen las localidades: ${localidadesFaltantes.join(', ')}`);
  }

  let creadas = 0;
  let actualizadas = 0;
  let relacionesCreadas = 0;

  for (const { localidadIds: idsLocalidad, ...farmacia } of farmacias) {
    const existentes = await tx.farmacia.findMany({
      where: { nombre: farmacia.nombre, direccion: farmacia.direccion },
      select: { id: true },
    });

    if (existentes.length === 0) {
      await tx.farmacia.create({
        data: {
          ...farmacia,
          localidades: {
            create: idsLocalidad.map((localidadId) => ({
              localidad: { connect: { id: localidadId } },
            })),
          },
        },
      });
      creadas += 1;
      relacionesCreadas += idsLocalidad.length;
      continue;
    }

    for (const { id } of existentes) {
      await tx.farmacia.update({ where: { id }, data: farmacia });

      const relacionesExistentes = await tx.farmaciaLocalidad.findMany({
        where: { farmaciaId: id, localidadId: { in: idsLocalidad } },
        select: { localidadId: true },
      });
      const localidadesVinculadas = new Set(
        relacionesExistentes.map(({ localidadId }) => localidadId)
      );
      const nuevasRelaciones = idsLocalidad.filter(
        (localidadId) => !localidadesVinculadas.has(localidadId)
      );

      if (nuevasRelaciones.length > 0) {
        await tx.farmaciaLocalidad.createMany({
          data: nuevasRelaciones.map((localidadId) => ({
            farmaciaId: id,
            localidadId,
          })),
        });
        relacionesCreadas += nuevasRelaciones.length;
      }

      actualizadas += 1;
    }
  }

  console.log(
    `Carga finalizada: ${creadas} farmacias creadas, ${actualizadas} actualizadas, ${relacionesCreadas} vínculos agregados`
  );
});
}

main()
  .catch((error) => {
    console.error('Error al cargar farmacias:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });