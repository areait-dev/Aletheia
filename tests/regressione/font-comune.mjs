// Parti condivise tra font.spec.mjs (Chromium) e font-webkit.mjs (WebKit). Le funzioni vengono eseguite nella pagina.
export const CONSENSO = () => { try { localStorage.setItem('cookie-consent', 'accepted'); localStorage.setItem('theme', 'light'); } catch {} };

// Marca con data-font-test un elemento campione per tipo: solo testo "semplice" (lettere e punteggiatura comune), così
// un glifo mancante in Nunito (frecce, simboli) non genera falsi allarmi.
export const MARCA = () => {
  const testoOk = (t) => t.length > 3 && /^[\p{L}\s.,'’:;!?\-()0-9/]+$/u.test(t);
  const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
  const trova = (sel, extra = () => true) => Array.from(document.querySelectorAll(sel)).find((e) => vis(e) && !e.closest('.chatbot-root') && testoOk(e.textContent.trim().replace(/\s+/g, ' ')) && extra(e));
  const campioni = { menu: trova('.navbar a'), paragrafo: trova('main p, section p'), pulsante: trova('button, .btn, a.btn', (e) => !e.closest('.hamburger, .theme-toggle')), titolo: trova('h1, h2') };
  const trovati = [];
  for (const [k, e] of Object.entries(campioni)) if (e) { e.setAttribute('data-font-test', k); trovati.push(k); }
  return trovati;
};
