// Controllo a tappeto del layout delle schede corso (riquadro di richiesta + scheda tecnica, switch) in WebKit:
// tutte le schede /all-courses/<slug> x 12 misure iPad (verticale e orizzontale) + telefono 390 px.
// Script a parte (non un test di Playwright Test): dentro il lanciatore webkit.launch() si chiude subito su questa macchina
// (vedi font-webkit.mjs). Uso:  node tests/regressione/schede-corso-layout.mjs <indirizzo-base>   (es. http://localhost:3101)
// Esce con 1 se trova anche una sola violazione. Regole verificate:
//   744-1099px  scheda tecnica e riquadro sulla STESSA riga, stessa altezza (±1px), allineati in alto e in basso
//   < 744px     impilati, riquadro a tutta larghezza della scheda
//   >= 1100px   colonna destra; vuoto tra scheda tecnica e tab non maggiore di 60px
//   sempre      nessuno scroll orizzontale; sotto i 1100px la nota "Riceverai una conferma" a >= 6px dalle tab;
//               switch: pillole alte almeno 44px, testo su una riga, dentro il riquadro, stessa altezza nel gruppo
import { webkit } from '@playwright/test';
import { urls } from './util.mjs';

const base = process.argv[2] || 'http://localhost:3101';
const MISURE = [[744, 1133], [1133, 744], [768, 1024], [1024, 768], [820, 1180], [1180, 820], [834, 1194], [1194, 834], [1024, 1366], [1366, 1024], [1032, 1376], [1376, 1032], [390, 844]];
const pagine = urls.map((u) => u.url).filter((u) => /^\/all-courses\/[^?/]+$/.test(u));

const browser = await webkit.launch();
const violazioni = [];
let carichi = 0;
for (const [w, h] of MISURE) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { try { localStorage.setItem('cookie-consent', 'all'); } catch {} });
  const page = await ctx.newPage();
  for (const u of pagine) {
    await page.goto(base + u, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.waitForSelector('.cp-scheda-area', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(200);
    carichi++;
    const m = await page.evaluate(() => {
      const r = (e) => { if (!e) return null; const x = e.getBoundingClientRect(); return { top: x.top + scrollY, bottom: x.bottom + scrollY, left: x.left, right: x.right, w: x.width, h: x.height }; };
      const scheda = r(document.querySelector('.cp-scheda-area')?.firstElementChild);
      const card = r(document.querySelector('.cp-info-area')?.firstElementChild);
      const tabs = r(document.querySelector('.cp-tabs-area'));
      const nota = r(document.querySelector('.cp-info-area > p'));
      // blocchi interni del riquadro: vuoti tra un blocco e il successivo, spazio sopra/sotto il contenuto, linea divisoria
      const cardEl = document.querySelector('.cp-info-area')?.firstElementChild;
      const figli = cardEl ? [...cardEl.children].map((e) => e.getBoundingClientRect()) : [];
      const cardR = cardEl?.getBoundingClientRect(); const cs = cardEl ? getComputedStyle(cardEl) : null;
      const vuoti = figli.slice(1).map((x, i) => x.top - figli[i].bottom);
      const sopra = cardR ? figli[0].top - cardR.top - parseFloat(cs.paddingTop) - parseFloat(cs.borderTopWidth) : 0;
      const sotto = cardR ? cardR.bottom - figli[figli.length - 1].bottom - parseFloat(cs.paddingBottom) - parseFloat(cs.borderBottomWidth) : 0;
      const cta = cardEl ? [...cardEl.querySelectorAll('a')].find((a) => /Richiedi un preventivo/.test(a.textContent)) : null; const margineCta = cta ? parseFloat(getComputedStyle(cta).marginTop) : 0;
      const iscrizione = !!cardEl?.querySelector('a[href^="/iscrizione"]'); const conLinea = [...(cardEl?.children || [])].some((e) => getComputedStyle(e).borderTopWidth !== '0px');
      const switches = [...document.querySelectorAll('[role="tablist"]')].map((g) => {
        const gr = g.getBoundingClientRect(); const par = g.parentElement.getBoundingClientRect();
        const bt = [...g.querySelectorAll('button')].map((b) => {
          const br = b.getBoundingClientRect(); const tops = new Set(); const tw = document.createTreeWalker(b, NodeFilter.SHOW_TEXT); let n;
          while ((n = tw.nextNode())) { const rg = document.createRange(); rg.selectNodeContents(n); [...rg.getClientRects()].forEach((x) => tops.add(Math.round(x.top))); }
          return { h: Math.round(br.height), righe: tops.size };
        });
        return { label: g.getAttribute('aria-label'), esce: gr.right > par.right + 1, hMin: Math.min(...bt.map((x) => x.h)), hMax: Math.max(...bt.map((x) => x.h)), spezzati: bt.filter((x) => x.righe > 1).length };
      });
      return { vuoti, sopra, sotto, margineCta, iscrizione, conLinea, scheda, card, tabs, nota, switches, overflowX: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    const v = (msg) => violazioni.push(`${w}x${h} ${u}: ${msg}`);
    if (!m.scheda || !m.card) { v('scheda tecnica o riquadro mancanti'); continue; }
    if (m.overflowX) v('scroll orizzontale');
    const { scheda: s, card: c, tabs: t, nota } = m;
    if (w >= 744 && w <= 1099) {
      if (!(c.left >= s.right - 1) || Math.abs(c.top - s.top) > 1) v(`non sulla stessa riga (scheda ${Math.round(s.top)}-${Math.round(s.bottom)}, riquadro ${Math.round(c.top)}-${Math.round(c.bottom)})`);
      if (Math.abs(c.bottom - s.bottom) > 1) v(`altezze diverse: scheda ${Math.round(s.h)}px, riquadro ${Math.round(c.h)}px`);
    } else if (w < 744) {
      if (!(c.top >= s.bottom - 1)) v('sotto i 744px non sono impilati');
      if (Math.abs(c.w - s.w) > 1) v(`riquadro non a tutta larghezza (${Math.round(c.w)} contro ${Math.round(s.w)})`);
    } else {
      if (!(c.left >= s.right)) v('da 1100px il riquadro deve stare a destra');
      if (t && t.top - s.bottom > 60) v(`vuoto di ${Math.round(t.top - s.bottom)}px tra scheda tecnica e tab`);
    }
    if (Math.max(0, ...m.vuoti) > 40) v(`buco dentro il riquadro: ${Math.round(Math.max(...m.vuoti))}px tra due blocchi`);
    if (m.margineCta > 0) v(`il pulsante "Richiedi un preventivo" ha un margine di ${m.margineCta}px (.text-center)`);
    if (m.iscrizione && m.conLinea) v('riquadro a iscrizione: linea divisoria tra l\'avviso giallo e il pulsante');
    if (w >= 744 && w <= 1099 && Math.abs(m.sopra - m.sotto) > 2) v(`contenuto non centrato nel riquadro (spazio sopra ${Math.round(m.sopra)}px, sotto ${Math.round(m.sotto)}px)`);
    if (w < 1100 && nota && t && nota.bottom > t.top - 6) v(`la nota "Riceverai una conferma" tocca le tab (${Math.round(nota.bottom)} > ${Math.round(t.top)})`);
    for (const sw of m.switches) {
      if (sw.hMin < 44) v(`switch "${sw.label}": pillola alta ${sw.hMin}px (< 44)`);
      if (sw.hMax !== sw.hMin) v(`switch "${sw.label}": altezze diverse ${sw.hMin}-${sw.hMax}`);
      if (sw.spezzati) v(`switch "${sw.label}": ${sw.spezzati} testi su più righe`);
      if (sw.esce) v(`switch "${sw.label}": esce dal riquadro`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`${carichi} caricamenti (${pagine.length} schede x ${MISURE.length} misure), violazioni: ${violazioni.length}`);
violazioni.slice(0, 60).forEach((x) => console.log(' -', x));
process.exit(violazioni.length ? 1 : 0);
