import { Nunito, Viga } from 'next/font/google';

/**
 * Font del sito, self-hosted da next/font (nessuna richiesta a Google a runtime, nessun foglio CSS bloccante).
 * Pesi e comportamento identici al vecchio link Google Fonts: Nunito 300-900 (solo normale, niente corsivo),
 * Viga 400 (unico peso), display=swap. Le variabili CSS (--font-nunito, --font-viga) sono messe su <html> da
 * pages/_document.js e usate da styles/globals.css e tailwind.config.js. next/font aggiunge da solo un font di
 * ripiego con metriche corrette (riduce lo spostamento di layout allo scambio).
 */
export const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
  display: 'swap',
  variable: '--font-nunito',
});

export const viga = Viga({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  display: 'swap',
  variable: '--font-viga',
});
