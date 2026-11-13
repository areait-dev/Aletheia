// Meta viewport: UN SOLO tag per pagina, "width=device-width" SENZA initial-scale, dichiarato in pages/_app.js (valido per tutte le pagine,
// 404 comprese). Con initial-scale=1 l'iPad in modalità "sito desktop" disegna a ~1024 pt su uno schermo da 744 pt e la pagina scorre di lato
// (misurato sull'iPad mini il 13 nov 2026, vedi MIGRAZIONE.md sezione iPad). Le pagine /diagnostica* lo ridefiniscono apposta e sono escluse.
import { test, expect } from '@playwright/test';
import { urls } from './util.mjs';

const SERVIZIO = ['/diagnostica', '/diagnostica-b', '/diagnostica-c'];
const PAGINE = [
  ...urls.map((u) => u.url).filter((u) => !SERVIZIO.includes(u)),
  '/corsi/corso-che-non-esiste', '/news/articolo-che-non-esiste', '/formazione/non-esiste',
];

test('ogni pagina (404 comprese) ha un solo meta viewport "width=device-width", senza initial-scale @rapido', async ({ request }) => {
  const errori = [];
  for (const url of new Set(PAGINE)) {
    const html = await (await request.get(url)).text();
    const tag = [...html.matchAll(/<meta\s+name="viewport"\s+content="([^"]*)"/g)].map((m) => m[1]);
    if (tag.length !== 1 || tag[0] !== 'width=device-width') errori.push(`${url}: ${JSON.stringify(tag)}`);
  }
  expect(errori, errori.join('\n')).toEqual([]);
});

test('nessun file di pagina o componente dichiara un meta viewport proprio (solo _app.js e le pagine di diagnostica) @rapido', async () => {
  const { readdirSync, readFileSync, statSync } = await import('node:fs');
  const { join } = await import('node:path');
  const trovati = [];
  const visita = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) visita(p);
      else if (/\.(js|jsx|ts|tsx)$/.test(f) && /name=["']viewport["']/.test(readFileSync(p, 'utf8'))) trovati.push(p.split('\\').join('/'));
    }
  };
  for (const d of ['pages', 'components']) visita(d);
  expect(trovati.sort()).toEqual(['components/DiagnosticaPagina.js', 'pages/_app.js']);
});
