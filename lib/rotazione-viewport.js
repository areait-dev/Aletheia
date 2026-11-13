// Correzione della rotazione su iPad (Chrome, modalità "sito desktop"): dopo il passaggio verticale ↔ orizzontale il browser aggiorna innerWidth e
// manda i `resize`, ma NON ricalcola la larghezza del layout (media query comprese). Misurato sull'iPad mini il 13 nov 2026:
//   - verticale rimasto largo: innerWidth 744, documentElement.clientWidth/scrollWidth 1133, (max-width:1023px) falsa, la pagina scorre a destra;
//   - orizzontale rimasto stretto: pagina a 744 su schermo da 1133 (hamburger, fascia grigia a destra);
//   - con il meta riscritto (toglierlo e rimetterlo, stesso elemento: rimedio "a" di /diagnostica-b) il layout torna corretto.
// Bug noto di WebKit nelle webview (Chrome su iOS): https://bugs.webkit.org/show_bug.cgi?id=170595 ; l'equivalente di Firefox in modalità desktop:
// https://bugzilla.mozilla.org/show_bug.cgi?id=1509552. Vedi MIGRAZIONE.md, sezione iPad.
//
// Regole (decise dal committente il 13 nov 2026):
//  - NESSUNA condizione sui valori di innerWidth/clientWidth/outerWidth: in quel momento sono inaffidabili;
//  - a ogni cambio di orientamento: meta riscritto subito, poi a 500 ms e a 1000 ms (il browser si assesta dopo);
//  - solo su dispositivi touch (pointer: coarse); nessun ciclo; nessun intervento sui resize normali (tastiera, barra del browser, finestra del desktop);
//  - un nuovo cambio di orientamento mentre la sequenza è in corso la riavvia (mai più di 3 riscritture per cambio);
//  - ascolta `orientationchange` e `screen.orientation` evento `change` (stesso significato) E i `resize` in cui la LARGHEZZA cambia di almeno LARGHEZZA_MIN_PX
//    (aggiunto il 13 nov 2026: sull'iPad in modalità desktop il registro mostrava solo `resize`, mai `orientationchange`, quindi ascoltare solo gli eventi di
//    orientamento non partiva). Tastiera e barra del browser cambiano solo l'ALTEZZA: nessun intervento. Un altro innesco entro SEQUENZA_DOPPIA_MS è la
//    stessa rotazione (Chromium li manda tutti e tre insieme) e non riavvia la sequenza;
//  - su telefoni e desktop è un'operazione senza effetti: i desktop non sono touch, sui telefoni il meta riscritto vale quanto prima (test in
//    tests/regressione/rotazione-viewport.spec.mjs). Log in console solo in sviluppo o con ?diagnostica nell'indirizzo.

export const RITARDI_MS = [0, 500, 1000];
export const LARGHEZZA_MIN_PX = 50; // un resize con la larghezza cambiata di meno non è una rotazione (barra di scorrimento, arrotondamenti)
export const SEQUENZA_DOPPIA_MS = 300; // più innesci ravvicinati = la stessa rotazione

/** Toglie e rimette lo STESSO elemento meta viewport (con un elemento nuovo next/head ne reinserirebbe uno suo e resterebbero due meta). */
export function rilanciaMetaViewport(doc) {
  const el = doc.querySelector('meta[name="viewport"]');
  if (!el) return false;
  el.remove();
  doc.head.appendChild(el);
  return true;
}

const touch = (win) => !!(win.matchMedia && win.matchMedia('(pointer: coarse)').matches);

function logAttivo(win) {
  return process.env.NODE_ENV !== 'production' || /[?&]diagnostica(=|&|$)/.test(win.location.search || '');
}

/** Avvia l'ascolto. Restituisce la funzione che lo ferma. Chiamare solo nel browser (useEffect). */
export function avviaCorrezioneRotazione(win = window) {
  let timer = [];
  let inizioSequenza = -Infinity;
  let ultimaLarghezza = win.innerWidth;
  const ora = () => (win.performance ? win.performance.now() : Date.now());
  const ferma = () => { timer.forEach((t) => win.clearTimeout(t)); timer = []; };

  const avvia = (origine) => {
    if (!touch(win)) return; // desktop e mouse: niente
    if (ora() - inizioSequenza < SEQUENZA_DOPPIA_MS) return; // stessa rotazione già in corso (più eventi insieme)
    inizioSequenza = ora();
    ferma(); // un nuovo cambio, più tardi, riavvia la sequenza
    RITARDI_MS.forEach((ms) => {
      const esegui = () => {
        const fatto = rilanciaMetaViewport(win.document);
        if (logAttivo(win)) {
          const de = win.document.documentElement;
          // eslint-disable-next-line no-console
          console.info(`rotazione-viewport: meta ${fatto ? 'riscritto' : 'assente'} (${origine}, +${ms} ms)`, { inner: win.innerWidth, client: de.clientWidth, scroll: de.scrollWidth, outer: win.outerWidth });
        }
      };
      if (ms === 0) esegui(); else timer.push(win.setTimeout(esegui, ms));
    });
  };

  const aOri = () => avvia('orientationchange');
  const aScr = () => avvia('screen.orientation');
  const aRes = () => {
    const l = win.innerWidth;
    const cambiata = Math.abs(l - ultimaLarghezza) >= LARGHEZZA_MIN_PX;
    ultimaLarghezza = l;
    if (!cambiata) return; // solo l'altezza (tastiera, barra del browser) o pochi pixel: niente
    const vv = win.visualViewport;
    if (vv && Math.abs(vv.scale - 1) > 0.01) return; // zoomata (pinch o zoom al focus): riscrivere il meta potrebbe azzerare lo zoom
    avvia('resize (larghezza cambiata)');
  };
  win.addEventListener('orientationchange', aOri);
  win.addEventListener('resize', aRes);
  const so = win.screen && win.screen.orientation;
  if (so && so.addEventListener) so.addEventListener('change', aScr);
  return () => {
    ferma();
    win.removeEventListener('orientationchange', aOri);
    win.removeEventListener('resize', aRes);
    if (so && so.removeEventListener) so.removeEventListener('change', aScr);
  };
}
