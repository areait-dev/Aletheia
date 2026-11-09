// Genera tests/regressione/urls.json dall'output della build (.next/server/pages) e da next.config.js.
// Eseguire DOPO `next build` sul codice di riferimento: `node tests/regressione/genera-urls.mjs`.
// Il risultato è la lista autoritativa degli URL del sito (stesse fonti di getStaticPaths).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const radice = path.resolve(import.meta.dirname, '..', '..');
const pagine = path.join(radice, process.env.NEXT_DIST_DIR || '.next-test', 'server', 'pages');

function html(dir, prefisso = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) out.push(...html(path.join(dir, e.name), `${prefisso}${e.name}/`));
    else if (e.name.endsWith('.html')) out.push(prefisso + e.name.replace(/\.html$/, ''));
  }
  return out;
}

const percorsi = html(pagine)
  .filter((p) => p !== '404' && p !== '500')
  .map((p) => (p === 'index' ? '/' : `/${p}`))
  .sort();

// Varianti con query string (le pagine di categoria sono file statici e arrivano da sole in `percorsi`).
const conQuery = ['/corsi/antincendio?livello=2'];

// Redirect di next.config.js (ground truth: stesso file usato dal sito).
const config = require(path.join(radice, 'next.config.js'));
const redirect = (await config.redirects()).map((r) => ({ da: r.source, a: r.destination, permanente: r.permanent }));

// Campioni per gli screenshot: tutte le pagine "uniche" + 3 corsi + 2 news + gli archivi + le varianti query; il resto
// delle pagine dinamiche è coperto dal confronto dei metadata/HTML grezzo (che le comprende tutte).
const dinamiche = ['/corsi/', '/news/', '/archivio/', '/aiuti-di-stato/'];
const campioneVisivo = (p) => {
  if (!dinamiche.some((d) => p.startsWith(d))) return true;
  return [
    '/corsi/antincendio', '/corsi/macchine-movimento-terra', '/corsi/icdl-base', '/corsi/sicurezza-lavoro', '/corsi/certificazioni-informatiche', '/corsi/formazione-dei-lavoratori',
    '/news/bonus-giovani-under-35-aprile-2026', '/news/corsi-gratuiti-progetto-gol-sicilia',
    '/archivio/avviso-7-2023', '/archivio/misura-psr-1-1', '/archivio/avviso-2-2018/corso-di-cucina',
    '/aiuti-di-stato/2023', '/aiuti-di-stato/2024',
  ].includes(p);
};

const urls = [
  ...percorsi.map((p) => ({ url: p, visivo: campioneVisivo(p) })),
  ...conQuery.map((p) => ({ url: p, visivo: ['/corsi/antincendio?livello=2'].includes(p) })),
  { url: '/url-inesistente-404', visivo: true, atteso: 404 },
];

fs.writeFileSync(path.join(import.meta.dirname, 'urls.json'), JSON.stringify({ urls, redirect }, null, 2));
console.log(`${urls.length} URL (${urls.filter((u) => u.visivo).length} con screenshot), ${redirect.length} redirect`);
