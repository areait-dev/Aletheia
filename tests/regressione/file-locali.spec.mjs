// Nessun file (immagine, PDF) dipende dal vecchio sito: tutto sta in public/ e ogni riferimento a un file locale esiste davvero.
// Il vecchio sito (www.aletheiasrl.it) sarà sostituito da questo: un'immagine o un PDF ancora puntato lì si romperebbe al lancio.
import { test, expect } from '@playwright/test';
import * as cheerio from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import { urls } from './util.mjs';

const radice = path.resolve(import.meta.dirname, '..', '..');
const PAGINE = urls.map((u) => u.url).filter((u) => !u.includes('?'));
// URL assoluti del dominio verso una cartella di file. Il dominio è lo stesso del sito nuovo: un URL così va bene SOLO se il file esiste in public/
// (es. /images/og-default.png); /media/k2/... o /images/AVVISO1-POC/... del vecchio sito non esistono qui e al lancio si romperebbero.
const VECCHIO = /https?:\/\/(?:www\.)?aletheiasrl\.it(\/(?:images|media|templates|components|plugins)\/[^\s"'<>)]+)/gi;
const inesistenti = (testo) => Array.from(testo.matchAll(VECCHIO)).map((m) => m[1]).filter((p) => !fs.existsSync(path.join(radice, 'public', decodeURIComponent(p.split('?')[0]))));

function percorsoFile(riferimento) {
  let r = riferimento;
  if (r.startsWith('/_next/image')) r = decodeURIComponent(new URL(r, 'http://x').searchParams.get('url') || '');
  r = r.split('?')[0].split('#')[0];
  return r.startsWith('/') ? path.join(radice, 'public', decodeURIComponent(r)) : null;
}

test('nessun riferimento ai file del vecchio sito e tutti i file locali esistono @rapido', async ({ request }) => {
  const errori = [];
  const verificati = new Set();
  for (const url of PAGINE) {
    const html = await (await request.get(url)).text();
    const $ = cheerio.load(html);
    // Solo ciò che il browser carica o linka (src, srcset, href, content): i dati originali dentro il JSON di Next (urlOriginale) non contano
    const attributi = $('[src], [srcset], [href], meta[content]').map((_, e) => [$(e).attr('src'), $(e).attr('srcset'), $(e).attr('href'), $(e).is('meta') ? $(e).attr('content') : null].filter(Boolean).join(' ')).get().join(' ');
    for (const p of inesistenti(attributi)) errori.push(`${url}: ${p} non esiste in public/ (file del vecchio sito?)`);
    const riferimenti = [
      ...$('img[src], source[srcset]').map((_, e) => $(e).attr('src') || $(e).attr('srcset')?.split(' ')[0]).get(),
      ...$('meta[property="og:image"]').map((_, e) => $(e).attr('content').replace('https://www.aletheiasrl.it', '')).get(),
      ...$('a[href$=".pdf"]').map((_, e) => $(e).attr('href')).get(),
    ].filter(Boolean);
    for (const r of riferimenti) {
      const f = percorsoFile(r);
      if (!f || verificati.has(f)) continue;
      verificati.add(f);
      if (!fs.existsSync(f)) errori.push(`${url}: ${r} non esiste in public/`);
    }
  }
  expect(verificati.size).toBeGreaterThan(40);
  expect(errori).toEqual([]);
});

test('i file del codice (dati) non puntano al vecchio sito @rapido', () => {
  const dati = ['lib/newsData.js', 'data/archivio-schede.js'];
  for (const f of dati) expect(inesistenti(fs.readFileSync(path.join(radice, f), 'utf8')), f).toEqual([]);
});
