const { coursesData } = require('./data/coursesRaw');
const { buildCourseFamilies } = require('./data/courseFamilies');
const { costruisciRedirect } = require('./lib/redirect-vecchio-sito');

/**
 * Override manuali dei redirect automatici per singolo slug grezzo. Necessari quando
 * buildCourseFamilies() normalizza una variante in una famiglia "isolata" con slug proprio (perché
 * il titolo in coursesData non combacia con quello delle altre varianti della stessa categoria) e
 * quindi genererebbe un redirect verso uno slug-famiglia che non ha (o non ha più) una pagina
 * dedicata - es. le 6 varianti macchina di Macchine Movimento Terra, tutte riunite in un'unica
 * pagina switchabile su /corsi/macchine-movimento-terra invece che sui 6 slug-famiglia
 * isolati che la normalizzazione automatica assegnerebbe loro.
 */
/** Prefisso attuale della sezione corsi e prefisso storico (rinominato da /all-courses a /corsi): il vecchio deve sempre reindirizzare. */
const PREFISSI_CORSI = ['/corsi', '/all-courses'];

/** Il prefisso storico risponde 301 (richiesto); quello attuale resta com'era (permanent:true) per non cambiare i redirect già esistenti. */
const statoRedirect = (prefisso) => (prefisso === '/all-courses' ? { statusCode: 301 } : { permanent: true });

const REDIRECT_OVERRIDES = {
  'mmt-escavatori-idraulici': '/corsi/macchine-movimento-terra',
  'mmt-escavatori-a-fune': '/corsi/macchine-movimento-terra',
  'mmt-pale-caricatrici-frontali': '/corsi/macchine-movimento-terra',
  'mmt-terne': '/corsi/macchine-movimento-terra',
  'mmt-autoribaltabili-a-cingoli': '/corsi/macchine-movimento-terra',
  'mmt-escavatori-caricatori-frontali-terne': '/corsi/macchine-movimento-terra',
};

/**
 * Redirect 301 permanenti dai vecchi slug per-livello (es. /corsi/antincendio-rischio-basso-livello-1,
 * già linkati in data/calendario.ts e potenzialmente indicizzati) al nuovo slug di famiglia con ?livello=.
 * Generati automaticamente da coursesData: quiet=true perché qui non servono i prezzi, solo lo slug/indice livello.
 * Gli slug elencati in REDIRECT_OVERRIDES saltano la generazione automatica e usano la destinazione
 * manuale al suo posto (vedi commento sopra).
 */
function buildCourseRedirects() {
  const families = buildCourseFamilies(coursesData, {}, { quiet: true });
  const redirects = [];

  for (const family of families) {
    const livelloKeys = Array.from(new Set(family.varianti.map((v) => v.livelloKey)));
    family.varianti.forEach((variante) => {
      if (variante.slug === family.slug) return; // già canonico, nessun redirect necessario
      if (REDIRECT_OVERRIDES[variante.slug]) return; // gestito manualmente sotto
      const livelloIndex = livelloKeys.indexOf(variante.livelloKey) + 1;
      // Sia il prefisso attuale sia quello storico (/all-courses): un solo salto, senza passare da due 301.
      for (const prefisso of PREFISSI_CORSI) {
        redirects.push({
          source: `${prefisso}/${variante.slug}`,
          destination: `/corsi/${family.slug}?livello=${livelloIndex}`,
          ...statoRedirect(prefisso),
        });
      }
    });
  }

  Object.entries(REDIRECT_OVERRIDES).forEach(([slug, destination]) => {
    for (const prefisso of PREFISSI_CORSI) {
      redirects.push({ source: `${prefisso}/${slug}`, destination, ...statoRedirect(prefisso) });
    }
  });

  return redirects;
}

/**
 * Redirect 301 dalle vecchie pagine isolate /aiuti-di-stato-2023 e /aiuti-di-stato-2024
 * (migrate al template dinamico pages/aiuti-di-stato/[anno].js) verso i nuovi percorsi,
 * per non rompere link già indicizzati o condivisi.
 */
function buildAiutiDiStatoRedirects() {
  return ['2023', '2024'].map((anno) => ({
    source: `/aiuti-di-stato-${anno}`,
    destination: `/aiuti-di-stato/${anno}`,
    permanent: true,
  }));
}

/**
 * Voci spostate fuori da /archivio perché ancora attive (vedi VOCI_SPOSTATE in lib/wp-archivio.ts):
 * il vecchio indirizzo reindirizza alla nuova pagina.
 */
function buildArchivioSpostatiRedirects() {
  return [{ source: '/archivio/avviso-1-2026-poc', destination: '/formazione/avviso-1-2026-poc', permanent: true }];
}

/** Host di WordPress (da WP_URL) per le immagini in evidenza servite da next/image. Vuoto se WP non è configurato. */
function wpImageHosts() {
  try {
    return process.env.WP_URL ? [new URL(process.env.WP_URL).hostname] : [];
  } catch {
    return [];
  }
}

/** Origine di WordPress per l'anteprima live nell'editor (accettata come mittente dei postMessage). Non è un segreto. */
function wpOrigin() {
  try {
    return process.env.WP_URL ? new URL(process.env.WP_URL).origin : '';
  } catch {
    return '';
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solo per i test di regressione (tests/regressione): build in una cartella separata così non si pesta `next dev`.
  // Senza la variabile vale `.next` come sempre.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WP_ORIGIN: process.env.NEXT_PUBLIC_WP_ORIGIN || wpOrigin(),
  },
  images: {
    // Stessi domini di prima (images.domains è deprecato): senza protocollo/porta/percorso = identico a `domains`.
    remotePatterns: ['www.aletheiasrl.it', 'images.unsplash.com', 'images.pexels.com', ...wpImageHosts()].map((hostname) => ({ hostname })),
  },
  // Lo slash finale lo gestiamo noi: di default Next toglie lo slash con un redirect 308 messo PRIMA di tutti gli altri, e un vecchio URL
  // "/index.php/chi-siamo/" farebbe due salti (308 poi 301). Così i vecchi URL con slash finale fanno un salto solo (regole con `{/}?`),
  // mentre per tutto il resto del sito lo slash finale continua a essere tolto con lo stesso 308 di prima (regola più sotto).
  skipTrailingSlashRedirect: true,
  // Anteprime e qualsiasi host diverso dal dominio definitivo non vanno indicizzati: X-Robots-Tag noindex, nofollow.
  // Due regole, entrambe attive: (1) per host, valutata a ogni richiesta (copre anche aletheiasrl.vercel.app e gli alias
  // dell'anteprima); (2) per ambiente di build, se VERCEL_ENV è impostata e non è "production". Su www.aletheiasrl.it in
  // produzione non viene aggiunta nessuna intestazione.
  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    const regole = [{ source: '/:path*', has: [{ type: 'host', value: '(?!www\\.aletheiasrl\\.it$).*' }], headers: noindex }];
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') regole.push({ source: '/:path*', headers: noindex });
    return regole;
  },
  async redirects() {
    return [
      // Vecchio sito Joomla: regole ricavate da docs/mappa-redirect-301.md (lib/redirect-vecchio-sito.js), tutte 301.
      ...costruisciRedirect().redirects,
      ...buildCourseRedirects(),
      // Sezione rinominata: /all-courses → /corsi (301). Vanno DOPO i redirect per singolo slug, che hanno la precedenza.
      // Con ?categoria= la gestisce proxy.ts (un solo salto verso la destinazione finale, senza la query).
      { source: '/all-courses', missing: [{ type: 'query', key: 'categoria' }], destination: '/corsi', statusCode: 301 },
      { source: '/all-courses/:slug', destination: '/corsi/:slug', statusCode: 301 },
      ...buildAiutiDiStatoRedirects(),
      ...buildArchivioSpostatiRedirects(),
      // Stesso comportamento di prima per lo slash finale, escluso /index.php (gestito sopra). Identico alla regola interna di Next.
      { source: '/:path((?!index\\.php).+)/', destination: '/:path', statusCode: 308 },
    ];
  },
};

module.exports = nextConfig;
