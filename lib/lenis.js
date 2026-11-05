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
 * Perché non basta window.scrollTo(0, 0): Lenis tiene un proprio "bersaglio" di scorrimento e lo anima nel loop RAF. Se si cambia pagina
 * mentre l'animazione è ancora in corso (rotellina e subito un clic su una scheda), l'animazione continua sulla pagina nuova e la porta
 * a metà pagina (misurato: la scheda del corso restava a 2400-3000px). resize() ricalcola i limiti, scrollTo(0, immediate + force)
 * annulla l'animazione e aggiorna il bersaglio. Senza Lenis (o lato server): window.scrollTo istantaneo.
 */
export function scrollToTopNow() {
  if (typeof window === 'undefined') return;
  const riallinea = () => {
    // Prima la posizione NATIVA, poi Lenis: lenis.scrollTo(immediate) chiama reset(), che rilegge window.scrollY. In WebKit lo scorrimento
    // nativo si applica in modo asincrono: con l'ordine inverso Lenis rileggeva la posizione vecchia e riprendeva a scorrere verso il
    // bersaglio di prima (misurato: la scheda restava a 2400-3000px su Safari/iPad anche dopo il reset).
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  };
  riallinea();
  // Ripetuto nei due fotogrammi successivi, quando lo scorrimento nativo è certamente a 0 e Lenis può allinearsi (circa 30ms).
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
