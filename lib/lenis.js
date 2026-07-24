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
 * Distrugge l'istanza Lenis e libera le risorse.
 */
export function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
