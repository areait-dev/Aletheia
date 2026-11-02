// Preparazione comune delle pagine per screenshot e interazioni.
import { preparaRete } from './rete.mjs';
const STILE_FERMO = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; scroll-behavior: auto !important; }
`;

// La chat (components/Chatbot.tsx, widget del sito, posizione fissa) si nasconde negli screenshot di pagina: in uno scatto
// a pagina intera la sua posizione dipende dalla viewport e rende instabili tutti i confronti. Ha un test dedicato (chatbot.spec.mjs).
export const STILE_SCREENSHOT = `.chatbot-root { display: none !important; }`;

/** Fallisce se qualche risorsa esterna non ha la copia locale (mai ignorare: lo screenshot sarebbe incompleto). */
export function verificaRete(page) {
  const perse = page.__retePerse ?? [];
  if (perse.length) throw new Error(`Risorse esterne senza copia locale (rigenerare con AGGIORNA_RETE=1): ${Array.from(new Set(perse)).join(' | ')}`);
}

export async function preparaPagina(page, tema) {
  await preparaRete(page); // nessuna richiesta esterna reale: vedi rete.mjs
  await page.addInitScript((t) => {
    try {
      localStorage.setItem('theme', t === 'scuro' ? 'dark' : 'light');
      localStorage.setItem('cookie-consent', 'accepted'); // niente banner cookie davanti ai contenuti
    } catch {}
  }, tema);
}

/**
 * Porta la pagina in uno stato stabile prima dello screenshot. Con più worker in parallelo la CPU è sotto carico e
 * senza queste attese lo scatto può partire PRIMA che: l'idratazione abbia mostrato gli elementi <Reveal> (opacity 0
 * inline), i font abbiano assestato le altezze, o le immagini lazy siano arrivate. Il risultato erano screenshot
 * diversi a ogni esecuzione (test instabili): per questo si attende ogni condizione in modo esplicito.
 */
export async function caricaTutto(page) {
  await page.waitForLoadState('load', { timeout: 45_000 }).catch(() => {});
  // 1) scorri tutta la pagina: immagini lazy e rivelazioni
  await page.evaluate(async () => {
    const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
    const passo = Math.max(300, Math.floor(window.innerHeight * 0.7));
    for (let y = 0, guardia = 0; y < document.documentElement.scrollHeight && guardia < 120; y += passo, guardia++) {
      window.scrollTo(0, y);
      await pausa(80);
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await pausa(200);
    window.scrollTo(0, 0);
    await pausa(150);
  });
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
  // 2) font del sito realmente caricati (non solo "ready": i pesi usati si caricano a richiesta)
  await page.evaluate(() =>
    Promise.all(['400 1em Nunito', '600 1em Nunito', '700 1em Nunito', '800 1em Nunito', '900 1em Nunito', '1em Viga'].map((f) => document.fonts.load(f).catch(() => null))).then(() => document.fonts.ready)
  );
  // 3) immagini complete (decodificate)
  await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 30_000 }).catch(() => {});
  // 4) idratazione: nessun <Reveal> ancora nascosto (stile inline "opacity: 0" con will-change)
  await page.waitForFunction(() => !document.querySelector('[style*="will-change: opacity, transform"][style*="opacity: 0"]'), null, { timeout: 20_000 }).catch(() => {});
  await page.addStyleTag({ content: STILE_FERMO + STILE_SCREENSHOT });
  // 5) altezza stabile per ~1 s (4 campioni uguali a distanza di 250 ms)
  await page.evaluate(async () => {
    let ultima = -1;
    let uguali = 0;
    for (let i = 0; i < 60 && uguali < 4; i++) {
      const h = document.documentElement.scrollHeight;
      uguali = h === ultima ? uguali + 1 : 0;
      ultima = h;
      await new Promise((r) => setTimeout(r, 250));
    }
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}
