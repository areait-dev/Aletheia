import Lenis from 'lenis';

// Istanza singleton di Lenis, accessibile da altri componenti
// per usare ad esempio lenis.scrollTo('#sezione').
let lenis = null;

/**
 * Inizializza Lenis con una configurazione base e avvia il loop RAF.
 * Idempotente: se un'istanza esiste già, la restituisce senza ricrearla.
 * @returns {Lenis} l'istanza di Lenis
 */
export function initLenis() {
  // Lenis funziona solo lato client (richiede window).
  if (typeof window === 'undefined') return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    // easeOutExpo: avvio rapido e decelerazione morbida
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Al clic su un link verso un'altra pagina annulla l'inerzia dello scorrimento PRIMA di navigare: senza, l'animazione in corso
    // (rotellina e subito un clic su una scheda) continuava sulla pagina nuova e la portava a metà (misurato su Chromium e WebKit).
    stopInertiaOnNavigate: true,
  });

  // Collega il RAF loop con requestAnimationFrame
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}

/**
 * Restituisce l'istanza Lenis corrente (o null se non inizializzata).
 * Utile in altri componenti per chiamare getLenis()?.scrollTo(...).
 */
export function getLenis() {
  return lenis;
}

/**
 * Salta in cima IMMEDIATAMENTE, azzerando anche lo stato di Lenis.
 * Perché non basta window.scrollTo(0, 0): con la rotellina Lenis anima lo scorrimento verso un proprio "bersaglio" per oltre un secondo; se
 * si cambia pagina durante l'animazione, questa continua sulla pagina nuova e la porta a metà (misurato: la scheda del corso restava a
 * 2400-3000px su Chromium e WebKit). Nemmeno lenis.scrollTo(0, { immediate }) basta: esce subito se il bersaglio coincide con quello che
 * Lenis ha già in memoria e allora l'animazione non viene fermata (succede con i link allo stesso corso, es. antincendio?livello=2).
 * stop() seguito da start() sono metodi pubblici e chiamano entrambi il reset interno (animazione annullata, stato riallineato alla
 * posizione nativa): non dipendono dal bersaglio. Poi la posizione nativa a 0, e resize() per i nuovi limiti della pagina.
 * Ripetuto nei due fotogrammi successivi: WebKit applica lo scorrimento nativo in modo asincrono. Senza Lenis: window.scrollTo istantaneo.
 */
export function scrollToTopNow() {
  if (typeof window === 'undefined') return;
  const riallinea = () => {
    if (lenis) { lenis.stop(); lenis.start(); }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lenis) lenis.resize();
  };
  riallinea();
  requestAnimationFrame(() => { riallinea(); requestAnimationFrame(riallinea); });
}

/**
 * Distrugge l'istanza Lenis e libera le risorse.
 */
export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
