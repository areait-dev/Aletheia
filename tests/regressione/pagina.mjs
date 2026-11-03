// Preparazione comune delle pagine per screenshot e interazioni.
import { preparaRete } from './rete.mjs';
const STILE_FERMO = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; scroll-behavior: auto !important; }
`;

// La chat (components/Chatbot.tsx, widget del sito, posizione fissa) si nasconde negli screenshot di pagina: in uno scatto
// a pagina intera la sua posizione dipende dalla viewport e rende instabili tutti i confronti. Ha un test dedicato (chatbot.spec.mjs).
// Rivelazioni di <Reveal> (stile inline con will-change): forzate visibili solo nei test.
export const STILE_REVEAL = `[style*="will-change"][style*="translateY(28px)"] { opacity: 1 !important; transform: none !important; }` // l'HTML del server serializza senza spazi ("opacity:0"), dopo l'idratazione con spazi: il selettore regge entrambi;

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
  // 2) font del sito realmente caricati. Con next/font il nome della famiglia è generato (es. "__Nunito_abc123"), quindi si
  //    caricano tutte le facce Nunito/Viga dichiarate (i pesi usati si caricano a richiesta, non basta "ready").
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.fonts)
        .filter((f) => /nunito|viga/i.test(f.family) && ['400', '600', '700', '800', '900'].includes(String(f.weight)))
        .map((f) => f.load().catch(() => null))
    ).then(() => document.fonts.ready)
  );
  // 3) immagini: tutte forzate a loading="eager" e attese finché naturalWidth > 0 (non basta `complete`: un'immagine
  //    lazy non ancora richiesta risulta "complete" con naturalWidth 0). Le <img> senza src o in errore sono ignorate dopo il timeout.
  await page.evaluate(() => {
    for (const i of document.images) {
      i.loading = 'eager';
      if (i.getAttribute('loading') !== 'eager') i.setAttribute('loading', 'eager');
    }
  });
  await page.waitForFunction(() => Array.from(document.images).filter((i) => i.currentSrc || i.src).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 30_000 }).catch(() => {});
  // Immagini rimaste rotte (richiesta fallita sotto carico, es. /_next/image): fino a 3 tentativi di ricarica prima dello scatto.
  for (let t = 0; t < 3; t++) {
    const rotte = await page.evaluate(() => {
      const r = Array.from(document.images).filter((i) => (i.currentSrc || i.src) && i.complete && i.naturalWidth === 0);
      r.forEach((i) => { const s = i.src; i.src = ''; i.src = s; });
      return r.length;
    });
    if (!rotte) break;
    await page.waitForFunction(() => Array.from(document.images).filter((i) => i.currentSrc || i.src).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 10_000 }).catch(() => {});
  }
  await page.evaluate(() => Promise.race([Promise.all(Array.from(document.images).map((i) => (i.decode ? i.decode().catch(() => null) : null))), new Promise((r) => setTimeout(r, 5000))])); // decode() può non risolversi mai: massimo 5 s
  // 4) idratazione avvenuta: nessun <Reveal> ancora in stato iniziale (opacity 0 + translateY(28px), con o senza spazi
  //    nella serializzazione). Poi, per sicurezza, <Reveal> forzati visibili e stile "fermo".
  await page.waitForFunction(() => !Array.from(document.querySelectorAll('[style*="will-change"]')).some((e) => /opacity:\s*0\s*;/.test(e.getAttribute('style') || '') && /translateY\(28px\)/.test(e.getAttribute('style') || '')), null, { timeout: 30_000 }).catch(() => {});
  await page.addStyleTag({ content: STILE_REVEAL });
  await page.addStyleTag({ content: STILE_FERMO + STILE_SCREENSHOT });
  // 5) scatto solo dopo due letture uguali dell'altezza a 500 ms di distanza (al massimo ~30 s)
  await page.evaluate(async () => {
    const pausa = (ms) => new Promise((r) => setTimeout(r, ms));
    let ultima = -1;
    for (let i = 0; i < 60; i++) {
      const h = document.documentElement.scrollHeight;
      if (h === ultima) break;
      ultima = h;
      await pausa(500);
    }
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}
