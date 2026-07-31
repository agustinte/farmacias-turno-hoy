import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ==========================================
// CONFIGURACIÓN: MODIFICÁ ESTOS DATOS PARA OTRA LOCALIDAD
// ==========================================
const NOMBRE_LOCALIDAD = 'San Antonio de Areco';
// const NOMBRE_LOCALIDAD = 'Baradero'; 
// const NOMBRE_LOCALIDAD = 'Pergamino'; 
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

// <-- Cambiá el calendario acá
// const CALENDARIO_RAW = [
//   { fecha: '2026-07-01', claveFarmacia: 'Central' },
//   { fecha: '2026-07-02', claveFarmacia: 'Del Pueblo' },
// ];
const CALENDARIO_RAW = [
  { fecha: '2026-06-01', claveFarmacia: 'Rodríguez Scheys' },
  { fecha: '2026-06-02', claveFarmacia: 'Torra' },
  { fecha: '2026-06-03', claveFarmacia: 'Fattore' },
  { fecha: '2026-06-04', claveFarmacia: 'Bauer' },
  { fecha: '2026-06-05', claveFarmacia: 'Risolino' },
  { fecha: '2026-06-06', claveFarmacia: 'Torra' },
  { fecha: '2026-06-07', claveFarmacia: 'Berola' },
  { fecha: '2026-06-08', claveFarmacia: 'Bobbett' },
  { fecha: '2026-06-09', claveFarmacia: 'Rodríguez Scheys' },
  { fecha: '2026-06-10', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-11', claveFarmacia: 'Fattore' },
  { fecha: '2026-06-12', claveFarmacia: 'Bauer' },
  { fecha: '2026-06-13', claveFarmacia: 'Risolino' },
  { fecha: '2026-06-14', claveFarmacia: 'Torra' },
  { fecha: '2026-06-15', claveFarmacia: 'Berola' },
  { fecha: '2026-06-16', claveFarmacia: 'Bobbett' },
  { fecha: '2026-06-17', claveFarmacia: 'Rodríguez Scheys' },
  { fecha: '2026-06-18', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-19', claveFarmacia: 'Fattore' },
  { fecha: '2026-06-20', claveFarmacia: 'Bauer' },
  { fecha: '2026-06-21', claveFarmacia: 'Risolino' },
  { fecha: '2026-06-22', claveFarmacia: 'Torra' },
  { fecha: '2026-06-23', claveFarmacia: 'Berola' },
  { fecha: '2026-06-24', claveFarmacia: 'Bobbett' },
  { fecha: '2026-06-25', claveFarmacia: 'Rodríguez Scheys' },
  { fecha: '2026-06-26', claveFarmacia: 'Del Pueblo' },
  { fecha: '2026-06-27', claveFarmacia: 'Fattore' },
  { fecha: '2026-06-28', claveFarmacia: 'Bauer' },
  { fecha: '2026-06-29', claveFarmacia: 'Risolino' },
  { fecha: '2026-06-30', claveFarmacia: 'Torra' },
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
    where: { localidadId: localidad.id },
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

/*  
Copiar a seed.ts y ejecutar:
RUN: npx prisma db seed

==========================================
PROMPT: Generar listado para turnos
==========================================

------------------------------------------
San Antonio de Areco
------------------------------------------
Obtener lista de tunos corriendo el siguiente script
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 8 2026-07-01 31
------------------------------------------
Baradero
------------------------------------------
Generar listado similar al siguiente con las fechas y farmacias de la imagen (año y mes actual). 
const CALENDARIO_RAW = [
  { fecha: '2026-07-01', claveFarmacia: 'Central' },
  { fecha: '2026-07-02', claveFarmacia: 'Del Pueblo' },
];
Mapear los nombres usando esta lista (si no se  puede mapear, informar):
Farmacia Amartino
Farmacia Anchorena
Farmacia Boedo
Farmacia Bolaños
Farmacia Braillard
Farmacia Chervaz
Farmacia Daubian
Farmacia Del Pueblo
Farmacia Del Varadero
Farmacia Italiana
Farmacia La Fe
Farmacia La Popular
Farmacia Musante
Farmacia Petruzzelli
Farmacia Silvano

------------------------------------------
Pergamino
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 1 2026-07-01 31

------------------------------------------
San Andrés de Giles
------------------------------------------
Generar listado similar al siguiente con las fechas y farmacias (año y mes actual). 
const CALENDARIO_RAW = [
  { fecha: '2026-07-01', claveFarmacia: 'Central' },
  { fecha: '2026-07-02', claveFarmacia: 'Del Pueblo' },
];

24/6/2026 Farmacia García
25/6/2026	Farmacia Mascardi	
26/6/2026	Farmacia Italiana	
27/6/2026	Farmacia Carnevale	
28/6/2026	Farmacia Fornari	
29/6/2026	Farmacia Silvera	
30/6/2026	Farmacia Modelo	
1/7/2026	Farmacia García	

Mapear los nombres usando esta lista (si no se  puede mapear, informar):
Bocassi
Farmacia Carnevale
Farmacia Fornari
Farmacia Mascardi
Farmacia Modelo de Giles (Ex Balado)
Farmacia Novelli
Farmacia García
Villa Espil
Farmacia Silvera
Farmacia Italiana

------------------------------------------
Mercedes
------------------------------------------
Generar listado similar al siguiente con las fechas y farmacias de la imagen (año y mes actual). 
const CALENDARIO_RAW = [
  { fecha: '2026-07-01', claveFarmacia: 'Central' },
  { fecha: '2026-07-02', claveFarmacia: 'Del Pueblo' },
];
Mapear los nombres usando esta lista (si no se  puede mapear, informar):
Acenso
Andres
Arenas
Barbatto
Biagioni
Bocca
Bugarín
Damonte
De la Merced
Del Pueblo
Delfino
Di Catarina
D´Agosto
Falabella
Fernández
Gonzalez
Huarte
Mangoni
Marchetti
Ninkov
Nosa
Palma
Rubiero
San José
San Patricio
Santa María
Silvestre
Tejedor
Telesca
Tiseyra

------------------------------------------
Capitan Sarmiento
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 11 2026-07-01 31

------------------------------------------
Arrecifes
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 10 2026-07-01 31

------------------------------------------
Carmen de Areco
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 32 2026-07-01 31

------------------------------------------
Junin
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 9 2026-07-01 31

------------------------------------------
Ramallo
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 33 2026-07-01 31

------------------------------------------
Rojas
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 13 2026-07-01 31

------------------------------------------
Salto
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataOsam.js 74 2026-07-01 31

------------------------------------------
Mar del Plata
------------------------------------------
C:\_data\sfdt\farmacias-turno\automate>node getDataMDQ.js

  */