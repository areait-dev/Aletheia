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
//  - ascolta `orientationchange` e `screen.orientation` evento `change` (stesso significato; non è detto che Chrome su iPad in modalità desktop mandi il primo);
//  - su telefoni e desktop è un'operazione senza effetti: i desktop non sono touch, sui telefoni il meta riscritto vale quanto prima (test in
//    tests/regressione/rotazione-viewport.spec.mjs). Log in console solo in sviluppo o con ?diagnostica nell'indirizzo.

export const RITARDI_MS = [0, 500, 1000];

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
  const ferma = () => { timer.forEach((t) => win.clearTimeout(t)); timer = []; };

  const alCambioOrientamento = (origine) => () => {
    if (!touch(win)) return; // desktop e mouse: niente
    ferma(); // un nuovo cambio riavvia la sequenza
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

  const aOri = alCambioOrientamento('orientationchange');
  const aScr = alCambioOrientamento('screen.orientation');
  win.addEventListener('orientationchange', aOri);
  const so = win.screen && win.screen.orientation;
  if (so && so.addEventListener) so.addEventListener('change', aScr);
  return () => {
    ferma();
    win.removeEventListener('orientationchange', aOri);
    if (so && so.removeEventListener) so.removeEventListener('change', aScr);
  };
}
