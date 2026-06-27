import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

const farmacias = [
  {
    nombre: 'Farmacia Vitarelli',
    direccion: '25 de Mayo 49',
    telefono: '+542475463289',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Rojas',
    direccion: 'María Unzué de Alvear y 25 de Mayo',
    telefono: '+542475462240',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Castro',
    direccion: '25 de Mayo y Lavalle',
    telefono: '+542475465036',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Boveri',
    direccion: 'Irigoyen 26',
    telefono: '+542475464381',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Chiavarino',
    direccion: 'Leandro N. Alem y 9 de Julio',
    telefono: '+542475463052',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Del Pueblo',
    direccion: 'General Frías 287/93',
    telefono: '+542475462151',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Filippi',
    direccion: '25 de Mayo 202',
    telefono: '+542475463383',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Carabelas',
    direccion: 'Sarmiento 435, Carabelas',
    telefono: '+542475497258',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Villa',
    direccion: 'Iribarne 372',
    telefono: '+542475463066',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Liliana Delbaldo',
    direccion: 'General Paz 164',
    telefono: '+542475462963',
    localidadId: 11,
  },
  {
    nombre: 'Farmacia Montenovo',
    direccion: 'Dardo Rocha 235',
    telefono: '+542475462472',
    localidadId: 11,
  },
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