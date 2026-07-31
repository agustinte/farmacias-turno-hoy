import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

const farmacias = [
  { nombre: 'OTEGUI', direccion: 'LINIERS Y ESTRADA', telefono: '02477429963', localidadId: 1 },
  { nombre: 'COUSO', direccion: 'PARAGUAY Y DOMINGO F. SARMIENTO', telefono: '02477422489', localidadId: 1 },
  { nombre: 'SIERRA', direccion: 'BV. ROCHA Y ECHEVERRIA', telefono: '02477443900', localidadId: 1 },
  { nombre: 'ZEPPA', direccion: 'FLORENCIO SÁNCHEZ 1050', telefono: '02477442701', localidadId: 1 },
  { nombre: 'ALÉ', direccion: 'BV. COLÓN 955', telefono: '02477443500', localidadId: 1 },
  { nombre: 'PRETINI', direccion: "LEBENSHON Y O'FARRELL", telefono: '02473429295', localidadId: 1 },
  { nombre: 'BIAGI', direccion: 'CASTELLI 1513', telefono: '02477438117', localidadId: 1 },
  { nombre: 'NAVARRO', direccion: 'SIRIA 1188', telefono: '02477443555', localidadId: 1 },
  { nombre: 'DE GAETANI', direccion: 'GRAL. PAZ Y MERCED', telefono: '02477418525', localidadId: 1 },
  { nombre: 'VERDÚN', direccion: 'MAIPÚ 602 ESQ. SARMIENTO', telefono: '02477321585', localidadId: 1 },
  { nombre: 'VALDEZ', direccion: 'I ANNAN 795', telefono: '02477441184', localidadId: 1 },
  { nombre: 'LA LICATA', direccion: 'BV. COLÓN 1446', telefono: '02477420734', localidadId: 1 },
  { nombre: 'BOLDRINI', direccion: 'ALBERTI Y ECHEVERRIA', telefono: '02477436760', localidadId: 1 },
  { nombre: 'YARROCH', direccion: 'DOMINGO F. SARMIENTO Y ESPAÑA', telefono: '02477423666', localidadId: 1 },
  { nombre: 'GALETTO', direccion: 'AVDA. JAUREGUI 1959', telefono: '02477413212', localidadId: 1 },
  { nombre: 'PISTONE', direccion: 'PEDRO TORRES 1160', telefono: '02477429805', localidadId: 1 },
  { nombre: 'SCHNEIDER', direccion: 'MITRE 284', telefono: '02477432748', localidadId: 1 },
  { nombre: 'GALLO', direccion: 'BV. ALSINA E ITALIA', telefono: '02477436289', localidadId: 1 },
  { nombre: 'COSIO', direccion: 'AVDA. ROCHA Y FLORIDA', telefono: '02477429328', localidadId: 1 },
  { nombre: 'MILLÁN', direccion: 'NICOLÁS REPETO 559', telefono: '02477442113', localidadId: 1 },
  { nombre: 'CENTENARIO', direccion: 'J.B. JUSTO 1897', telefono: '02477425540', localidadId: 1 },
  { nombre: 'SETA', direccion: 'MONTEAGUDO Y CASTELLI', telefono: '02477424883', localidadId: 1 },
];

await prisma.farmacia.createMany({
  data: farmacias,
});

  console.log('Farmacias importadas');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });