// turnos.js
// Requiere: npm install node-fetch@2 cheerio
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'http://www.colfarmamdp.com.ar';
const ENDPOINT = `${BASE_URL}/ajax/buscaturno2.php`;

function toDDMMYYYY(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function toISODate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${y}-${m}-${d}`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSessionCookie() {
  const res = await fetch(BASE_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const setCookie = res.headers.raw()['set-cookie'];
  if (!setCookie) return '';
  const match = setCookie[0].match(/PHPSESSID=[^;]+/);
  return match ? match[0] : '';
}

async function fetchTurnoForDate(date, cookie) {
  const fechaParam = toDDMMYYYY(date);
  const body = `fecha=${encodeURIComponent(fechaParam)}`;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      'Origin': BASE_URL,
      'Referer': BASE_URL + '/',
      'User-Agent': 'Mozilla/5.0',
      'Cookie': cookie
    },
    body
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} para fecha ${fechaParam}`);
  }

  const html = await res.text();
  return parseTurnos(html, toISODate(date));
}

function parseTurnos(html, isoDate) {
  const $ = cheerio.load(html);
  const resultados = [];

  $('#tabfarhoy tbody tr').each((_, tr) => {
    const nombre = $(tr).find('a.a2').first().text().trim();
    if (nombre) {
      resultados.push({ fecha: isoDate, claveFarmacia: nombre });
    }
  });

  return resultados;
}

async function obtenerMes(anio, mes) {
  const cookie = await getSessionCookie();
  const primerDia = new Date(anio, mes - 1, 1);
  const ultimoDia = new Date(anio, mes, 0);

  const todos = [];

  for (let dia = new Date(primerDia); dia <= ultimoDia; dia.setDate(dia.getDate() + 1)) {
    const fechaActual = new Date(dia);
    try {
      const turnos = await fetchTurnoForDate(fechaActual, cookie);
      console.error(`${toISODate(fechaActual)}: ${turnos.length} farmacias`);
      todos.push(...turnos);
    } catch (err) {
      console.error(`Error en ${toISODate(fechaActual)}:`, err.message);
    }
    await sleep(300);
  }

  return todos;
}

function imprimirComoJS(datos, nombreVariable = 'CALENDARIO_RAW') {
  const lineas = datos.map(item =>
    `  { fecha: '${item.fecha}', claveFarmacia: '${item.claveFarmacia.replace(/'/g, "\\'")}' },`
  );
  console.log(`const ${nombreVariable} = [\n${lineas.join('\n')}\n];`);
}

// --- Ejecución ---
(async () => {
  const ANIO = 2026;
  const MES = 9; // septiembre

  const resultado = await obtenerMes(ANIO, MES);

  // Todo por stdout, nada a disco
  imprimirComoJS(resultado, 'CALENDARIO_RAW');
})();