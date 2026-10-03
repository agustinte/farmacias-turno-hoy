const localidadId = process.argv[2];
const fechaInicio = process.argv[3];
const dias = parseInt(process.argv[4] || '30', 10);

if (!localidadId || !fechaInicio) {
  console.log(
    'Uso: node turnos.js <localidadId> <fechaInicio YYYY-MM-DD> [dias]'
  );
  process.exit(1);
}

function parseLocalDate(dateString) {
  const [yyyy, mm, dd] = dateString.split('-').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

function formatRequestDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

function formatOutputDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

async function main() {
  const calendario = [];

  // Crear la fecha en horario local, no UTC
  const inicio = parseLocalDate(fechaInicio);

  for (let i = 0; i < dias; i++) {
    const fecha = new Date(inicio);
    fecha.setDate(fecha.getDate() + i);

    const fechaOutput = formatOutputDate(fecha);

    const url =
      `https://extranet.osam.org.ar/Consulta/buscarTurnos.action` +
      `?selectedLoc=${localidadId}` +
      `&fecha=${encodeURIComponent(formatRequestDate(fecha))}` +
      `&_=${Date.now()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.farmacias?.length > 0) {
        data.farmacias.forEach(farmacia => {
          calendario.push({
            fecha: fechaOutput,
            claveFarmacia: farmacia.nombre.trim()
          });
        });
      }

      process.stdout.write('.');
    } catch (err) {
      console.error(
        `\nError en ${fechaOutput}:`,
        err.message
      );
    }
  }

  console.log('\n');

  console.log('const CALENDARIO_RAW = [');
  calendario.forEach(item => {
    console.log(
      `  { fecha: '${item.fecha}', claveFarmacia: '${item.claveFarmacia}' },`
    );
  });
  console.log('];');
}

main();