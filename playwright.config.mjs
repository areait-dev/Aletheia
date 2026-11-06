// Test di regressione della migrazione (vedi MIGRAZIONE.md, Fase 1).
// Si testa SEMPRE una build di produzione: `npm run build` e poi `npm run test:regressione`.
import { defineConfig } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { OFFERTE_DI_PROVA } from './tests/regressione/offerte-di-prova.mjs';

const PORTA = process.env.PORTA_TEST || '3101';
// URL_BASE: esegue i test contro un indirizzo già online (anteprima o produzione di Vercel) invece della build locale: senza
// avvio del server. Serve ai test che devono vedere l'ambiente reale (es. font.spec.mjs, che in locale su Windows non poteva
// vedere un problema che compare solo nella build di Vercel). Le anteprime protette da login richiedono una chiave di bypass.
const URL_BASE = process.env.URL_BASE;

// Chromium già presente sul computer (la build attesa da Playwright 1.61 potrebbe non essere scaricata):
// si usa la più recente tra quelle installate in ms-playwright, a meno che non sia impostato CHROMIUM_PATH.
function trovaChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright');
  try {
    const cartelle = fs.readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]));
    for (const c of cartelle) {
      const exe = path.join(base, c, 'chrome-win64', 'chrome.exe');
      if (fs.existsSync(exe)) return exe;
    }
  } catch {}
  return undefined; // Playwright userà il proprio
}

export default defineConfig({
  testDir: './tests/regressione',
  testMatch: '**/*.spec.mjs',
  timeout: 120_000,
  workers: Number(process.env.WORKERS || 2),
  fullyParallel: true,
  reporter: [['list']],
  // I riferimenti (PNG) stanno in tests/riferimenti/immagini: NON si rigenerano senza autorizzazione.
  snapshotPathTemplate: 'tests/riferimenti/immagini/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      // Tolleranza minima, solo per l'anti-aliasing: max 0,1% di pixel diversi.
      maxDiffPixelRatio: 0.001,
      threshold: 0.1,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    },
  },
  use: {
    baseURL: URL_BASE || `http://127.0.0.1:${PORTA}`,
    locale: 'it-IT',
    timezoneId: 'Europe/Rome',
    // Con riduzione del movimento il sito mostra subito i contenuti (Reveal, contatori, animazioni dei titoli).
    reducedMotion: 'reduce',
    launchOptions: { executablePath: trovaChromium() },
  },
  webServer: URL_BASE ? undefined : {
    command: `node node_modules/next/dist/bin/next start -p ${PORTA} -H 127.0.0.1`,
    // JOBS_API_URL: lo stesso elenco fisso di offerte della build (offerte-di-prova.mjs); la pagina si rigenera ogni 5 minuti (ISR)
    env: { NEXT_DIST_DIR: process.env.NEXT_DIST_DIR || '.next-test', CALENDARIO_FONTE: 'locale', // dati locali: i test non leggono mai il foglio Google vero (.env.local)
       JOBS_API_URL: process.env.JOBS_API_URL || OFFERTE_DI_PROVA },
    url: `http://127.0.0.1:${PORTA}/`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
