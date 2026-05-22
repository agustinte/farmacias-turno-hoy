import { PrismaClient } from '@prisma/client';
import type { Farmacia, Localidad } from '@prisma/client';

const prisma = new PrismaClient();

const NOMBRE_LOCALIDAD = 'Capitan Sarmiento';
const SLUG_LOCALIDAD = 'capitan-sarmiento';

// Farmacias provistas (nombre - direccion - telefono cuando esté disponible)
const FARMACIAS_DATA: Array<{ nombre: string; direccion?: string; telefono?: string }> = [
  { nombre: 'Farmacia Folguera', direccion: 'Aristóbulo del Valle', telefono: undefined },
  { nombre: 'Farmacia Lagorio', direccion: 'Av. Roque Sáenz Peña 598', telefono: '+542478603272' },
  { nombre: 'Farmacia Perez', direccion: 'Av. Pres. Perón, B2752', telefono: undefined },
  { nombre: 'Farmacia Ruiz', direccion: 'Av. Leandro N. Alem 504', telefono: '+542478481348' },
  { nombre: 'Farmacia del Pueblo', direccion: 'Rivadavia 715', telefono: '+542478481253' },
];

// Calendario mayo 2026: día -> claves
const SCHEDULE: Record<number, string[]> = {
  1: ['FOLGUERA'],
  2: ['RUIZ'],
  3: ['FOLGUERA'],
  4: ['DEL PUEBLO'],
  5: ['PEREZ'],
  6: ['BAVA'],
  7: ['FOLGUERA'],
  8: ['RUIZ'],
  9: ['LAGORIO'],
 10: ['DEL PUEBLO'],
 11: ['PEREZ'],
 12: ['BAVA'],
 13: ['RUIZ'],
 14: ['BAVA'],
 15: ['LAGORIO'],
 16: ['DEL PUEBLO'],
 17: ['PEREZ'],
 18: ['BAVA'],
 19: ['DEL PUEBLO'],
 20: ['LAGORIO'],
  21: ['RUIZ'],
  22: ['DEL PUEBLO'],
  23: ['PEREZ'],
  24: ['BAVA'],
  25: ['PEREZ'],
  26: ['RUIZ'],
  27: ['LAGORIO'],
  28: ['DEL PUEBLO'],
  29: ['RUIZ'],
  30: ['BAVA'],
  31: ['PEREZ'],
};

// Expand to raw calendario entries
const CALENDARIO_RAW: Array<{ fecha: string; claveFarmacia: string }> = [];
for (const [dayStr, claves] of Object.entries(SCHEDULE)) {
  const day = Number(dayStr);
  for (const clave of claves) {
    const fecha = `2026-05-${String(day).padStart(2, '0')}`;
    CALENDARIO_RAW.push({ fecha, claveFarmacia: clave });
  }
}

function normalizeForMatch(s: string): string {
  return (s || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^0-9A-Za-z\s]/g, '')
    .toUpperCase()
    .trim();
}

async function main() {
  console.log(`\n🚀 Seed: Capitan Sarmiento — creando localidad, farmacias y turnos (Mayo 2026)`);

  // 1) Buscar o crear localidad por slug
  let localidad: Localidad | null = await prisma.localidad.findUnique({ where: { slug: SLUG_LOCALIDAD } });
  if (!localidad) {
    console.log(`⚠️ Localidad "${NOMBRE_LOCALIDAD}" no encontrada. Creando...`);
    localidad = await prisma.localidad.create({ data: { nombre: NOMBRE_LOCALIDAD, slug: SLUG_LOCALIDAD } });
    console.log(`✅ Localidad creada id=${localidad.id}`);
  }

  // 2) Traer farmacias existentes de la localidad
  const farmaciasExistentes = await prisma.farmacia.findMany({ where: { localidadId: localidad.id } });
  const farmaciasMap = new Map<string, Farmacia>();
  for (const f of farmaciasExistentes) {
    farmaciasMap.set(normalizeForMatch(f.nombre), f);
  }

  // 3) Crear las farmacias provistas si faltan
  for (const f of FARMACIAS_DATA) {
    const key = normalizeForMatch(f.nombre);
    if (!farmaciasMap.has(key)) {
      const creado = await prisma.farmacia.create({
        data: {
          nombre: f.nombre,
          direccion: f.direccion ?? 'Dirección no provista',
          telefono: f.telefono || null,
          localidadId: localidad.id,
        },
      });
      farmaciasMap.set(normalizeForMatch(creado.nombre), creado);
      console.log(`+ Farmacia creada: ${creado.nombre} (id=${creado.id})`);
    }
  }

  // 4) Detectar claves en el schedule que no muestrean en FARMACIAS_DATA y crear placeholders
  const clavesUnicas = Array.from(new Set(CALENDARIO_RAW.map((c) => c.claveFarmacia)));
  for (const clave of clavesUnicas) {
    const claveNorm = normalizeForMatch(clave);
    if (!Array.from(farmaciasMap.keys()).includes(claveNorm)) {
      // Crear placeholder con el nombre tal cual
      const creado = await prisma.farmacia.create({
        data: {
          nombre: clave.charAt(0) + clave.slice(1).toLowerCase(),
          direccion: 'Dirección no provista',
          telefono: null,
          localidadId: localidad.id,
        },
      });
      farmaciasMap.set(normalizeForMatch(creado.nombre), creado);
      console.warn(`⚠️ Se creó farmacia placeholder para clave del calendario: ${clave} -> id=${creado.id}`);
    }
  }

  const farmaciasFinal = Array.from(farmaciasMap.values());

  // 5) Construir idMap mediante matching flexible
  const idMap: Record<string, number> = {};
  for (const clave of clavesUnicas) {
    const claveNorm = normalizeForMatch(clave);
    const match = farmaciasFinal.find((f) => {
      const nombreNorm = normalizeForMatch(f.nombre);
      return nombreNorm.includes(claveNorm) || claveNorm.includes(nombreNorm);
    });
    if (match) idMap[clave] = match.id;
  }

  console.log('📦 idMap generado:', idMap);

  // 6) Crear turnos evitando duplicados
  let creados = 0;
  for (const item of CALENDARIO_RAW) {
    const farmaciaId = idMap[item.claveFarmacia];
    if (!farmaciaId) {
      console.warn(`⚠️ Clave no emparejada en idMap: "${item.claveFarmacia}" para fecha ${item.fecha}`);
      continue;
    }

    const [y, m, d] = item.fecha.split('-').map(Number);
    const fechaInicio = new Date(y, m - 1, d, 8, 0, 0, 0);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + 1);

    const existente = await prisma.turno.findFirst({ where: { farmaciaId, fechaInicio } });
    if (existente) {
      console.warn(`⚠️ Turno existente omitido: ${item.fecha} -> ${item.claveFarmacia} (farmaciaId=${farmaciaId})`);
      continue;
    }

    await prisma.turno.create({ data: { farmaciaId, fechaInicio, fechaFin } });
    creados++;
    console.log(`+ Turno creado: ${item.fecha} -> ${item.claveFarmacia} (farmaciaId=${farmaciaId})`);
  }

  console.log(`\n✅ Seed completado. Turnos creados: ${creados}`);
}

main()
  .catch((err) => {
    console.error('\n❌ Error en seed_capitan_sarmiento:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Prisma desconectado.');
  });
