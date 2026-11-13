// Decisione del rimedio "d" per la rotazione su iPad (Chrome, modalità desktop): impostare il meta viewport a `width=<outerWidth>` SOLO se il layout
// non corrisponde alla finestra. Perché non `device-width`: su questo iPad `screen` resta 744×1133 in entrambe le orientazioni e `device-width` segue
// `screen`, quindi riscrivere il meta dà sempre 744 (giusto in verticale, sbagliato in orizzontale; MIGRAZIONE.md, sezione iPad, 13 nov 2026).
// `outerWidth` invece segue la rotazione subito (744 / 1133 in ogni evento del registro). Bug WebKit 170595 / Firefox 1509552.
// Pura: legge solo da `win`, non scrive nulla. Usata per ora SOLO dalla pagina /diagnostica* (prova); sul sito non c'è nessuno script.
export const SOGLIA_PX = 20; // la barra di scorrimento dei desktop è ~15 px: sotto soglia non è uno scarto

export function leggiValori(win) {
  const de = win.document.documentElement;
  const vv = win.visualViewport;
  return { inner: win.innerWidth, client: de.clientWidth, scroll: de.scrollWidth, outer: win.outerWidth, scala: vv ? vv.scale : 1 };
}

/**
 * Restituisce { agisci, larghezza, motivo, valori }. Agisce solo se TUTTE queste condizioni valgono:
 *  - outerWidth disponibile (> 0);
 *  - pagina non zoomata (visualViewport.scale = 1): riscrivere il meta potrebbe azzerare lo zoom;
 *  - outerWidth coincide con innerWidth (±SOGLIA_PX): significa che outerWidth è la larghezza vera della finestra. Con Split View o Stage Manager
 *    outerWidth potrebbe essere la larghezza dello schermo mentre la finestra è più stretta: allora NON si fida e non scatta;
 *  - clientWidth (la larghezza del layout) differisce da outerWidth di più di SOGLIA_PX.
 * Su telefoni e desktop client, inner e outer coincidono: non scatta mai.
 */
export function decidiLarghezza(win) {
  const v = leggiValori(win);
  const no = (motivo) => ({ agisci: false, larghezza: null, motivo, valori: v });
  if (!(v.outer > 0)) return no('outerWidth non disponibile');
  if (Math.abs(v.scala - 1) > 0.01) return no(`pagina zoomata (scala ${v.scala})`);
  if (Math.abs(v.inner - v.outer) > SOGLIA_PX) return no(`outerWidth ${v.outer} non coincide con innerWidth ${v.inner}: non è la larghezza della finestra (Split View, Stage Manager?)`);
  if (Math.abs(v.client - v.outer) <= SOGLIA_PX) return no('layout coerente con la finestra');
  return { agisci: true, larghezza: Math.round(v.outer), motivo: `clientWidth ${v.client} ≠ outerWidth ${v.outer}`, valori: v };
}
