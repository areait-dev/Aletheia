// Lighthouse sulla build di test (server di produzione su 127.0.0.1:3101). NESSUNA dipendenza nel progetto:
// il CLI gira con `npx --yes lighthouse@<versione fissa>`, scaricato nella cache di npx.
//
// Uso (dalla radice del progetto, con il server di test già avviato):
//   node tests/lighthouse/lighthouse.mjs esegui <etichetta> [passate=3]   → tests/riferimenti/lighthouse/<etichetta>.json
//   node tests/lighthouse/lighthouse.mjs confronta <base> <nuova>         → tabella Markdown (mediane) su stdout
//
// Avviare il server di test:  NEXT_DIST_DIR=.next-test node node_modules/next/dist/bin/next start -p 3101 -H 127.0.0.1
// Pagine: home, /calendario-corsi, /chi-siamo, /all-courses/antincendio; mobile (emulazione predefinita) e desktop.
// Si riporta la MEDIANA di N passate. Le variabili sono quelle del giorno del base (stessa versione di Lighthouse,
// stesse pagine, stesso Chrome di Playwright): per confronti validi lanciare base e finale sulla stessa macchina.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const VERSIONE_LIGHTHOUSE = '13.6.0';
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3101';
// PAGINE (elenco separato da virgole) e FORME (mobile,desktop) si possono sovrascrivere da ambiente; senza variabili
// valgono le quattro pagine storiche in entrambe le forme, quindi i confronti con le misure precedenti restano validi.
const PAGINE = process.env.PAGINE ? process.env.PAGINE.split(',') : ['/', '/calendario-corsi', '/chi-siamo', '/all-courses/antincendio'];
const FORME = process.env.FORME ? process.env.FORME.split(',') : ['mobile', 'desktop'];
const radice = path.resolve(import.meta.dirname, '..', '..');
const cartellaRis = path.join(radice, 'tests', 'riferimenti', 'lighthouse');

function chromePlaywright() {
  const d = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright');
  const c = fs.readdirSync(d).filter((x) => /^chromium-\d+$/.test(x)).sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]));
  return process.env.CHROMIUM_PATH || path.join(d, c[0], 'chrome-win64', 'chrome.exe');
}

const mediana = (a) => { const s = [...a].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

function unaPassata(url, forma, tmp) {
  const args = ['--yes', `lighthouse@${VERSIONE_LIGHTHOUSE}`, url, '--quiet', '--output=json', `--output-path=${tmp}`,
    `--chrome-path=${chromePlaywright()}`, '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
    '--only-categories=performance,accessibility,best-practices,seo'];
  if (forma === 'desktop') args.push('--preset=desktop');
  // La pagina 404 risponde con status 404: senza questo flag Lighthouse rifiuta di analizzarla.
  if (/non-esiste/.test(url)) args.push('--ignore-status-code');
  const r = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, { cwd: os.tmpdir(), encoding: 'utf8', shell: process.platform === 'win32', timeout: 300_000 });
  if (r.status !== 0 || !fs.existsSync(tmp)) throw new Error(`Lighthouse fallito su ${url} (${forma}): ${r.stderr || r.stdout}`);
  const l = JSON.parse(fs.readFileSync(tmp, 'utf8'));
  fs.rmSync(tmp, { force: true });
  const script = (l.audits['network-requests'].details?.items ?? []).filter((x) => x.resourceType === 'Script');
  return {
    performance: Math.round(l.categories.performance.score * 100),
    accessibility: Math.round(l.categories.accessibility.score * 100),
    bestPractices: Math.round(l.categories['best-practices'].score * 100),
    seo: Math.round(l.categories.seo.score * 100),
    fcpMs: Math.round(l.audits['first-contentful-paint'].numericValue),
    lcpMs: Math.round(l.audits['largest-contentful-paint'].numericValue),
    tbtMs: Math.round(l.audits['total-blocking-time'].numericValue),
    cls: Number(l.audits['cumulative-layout-shift'].numericValue.toFixed(3)),
    pesoTotaleKB: Math.round(l.audits['total-byte-weight'].numericValue / 1024),
    javascriptKB: Math.round(script.reduce((s, x) => s + (x.transferSize || 0), 0) / 1024),
  };
}

function esegui(etichetta, passate) {
  fs.mkdirSync(cartellaRis, { recursive: true });
  const risultati = [];
  for (const forma of FORME) {
    for (const pagina of PAGINE) {
      const righe = [];
      for (let i = 0; i < passate; i++) righe.push(unaPassata(BASE_URL + pagina, forma, path.join(os.tmpdir(), `lh-${process.pid}-${i}.json`)));
      const med = {};
      for (const k of Object.keys(righe[0])) med[k] = mediana(righe.map((r) => r[k]));
      risultati.push({ forma, pagina, mediana: med, passate: righe });
      console.log(forma.padEnd(8), pagina.padEnd(28), JSON.stringify(med));
    }
  }
  const file = path.join(cartellaRis, `${etichetta}.json`);
  fs.writeFileSync(file, JSON.stringify({ etichetta, lighthouse: VERSIONE_LIGHTHOUSE, passate, data: new Date().toISOString(), node: process.version, risultati }, null, 2));
  console.log(`Salvato ${path.relative(radice, file)}`);
}

function confronta(a, b) {
  const leggi = (e) => JSON.parse(fs.readFileSync(path.join(cartellaRis, `${e}.json`), 'utf8'));
  const A = leggi(a), B = leggi(b);
  const campi = [['performance', 'Perf'], ['accessibility', 'A11y'], ['bestPractices', 'BP'], ['seo', 'SEO'], ['lcpMs', 'LCP ms'], ['tbtMs', 'TBT ms'], ['cls', 'CLS'], ['javascriptKB', 'JS KB']];
  console.log(`| Forma | Pagina | ${campi.map(([, n]) => n).join(' | ')} |\n|---|---|${campi.map(() => '---').join('|')}|`);
  for (const ra of A.risultati) {
    const rb = B.risultati.find((x) => x.forma === ra.forma && x.pagina === ra.pagina);
    console.log(`| ${ra.forma} | ${ra.pagina} | ${campi.map(([k]) => `${ra.mediana[k]} → ${rb ? rb.mediana[k] : '—'}`).join(' | ')} |`);
  }
}

const [, , comando, x, y] = process.argv;
if (comando === 'esegui') esegui(x || 'base', Number(y || 3));
else if (comando === 'confronta') confronta(x, y);
else { console.error('Uso: esegui <etichetta> [passate] | confronta <base> <nuova>'); process.exit(1); }
