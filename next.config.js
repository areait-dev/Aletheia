const { coursesData } = require('./data/coursesRaw');
const { buildCourseFamilies } = require('./data/courseFamilies');

/**
 * Override manuali dei redirect automatici per singolo slug grezzo. Necessari quando
 * buildCourseFamilies() normalizza una variante in una famiglia "isolata" con slug proprio (perché
 * il titolo in coursesData non combacia con quello delle altre varianti della stessa categoria) e
 * quindi genererebbe un redirect verso uno slug-famiglia che non ha (o non ha più) una pagina
 * dedicata — es. le 6 varianti macchina di Macchine Movimento Terra, tutte riunite in un'unica
 * pagina switchabile su /all-courses/macchine-movimento-terra invece che sui 6 slug-famiglia
 * isolati che la normalizzazione automatica assegnerebbe loro.
 */
const REDIRECT_OVERRIDES = {
  'mmt-escavatori-idraulici': '/all-courses/macchine-movimento-terra',
  'mmt-escavatori-a-fune': '/all-courses/macchine-movimento-terra',
  'mmt-pale-caricatrici-frontali': '/all-courses/macchine-movimento-terra',
  'mmt-terne': '/all-courses/macchine-movimento-terra',
  'mmt-autoribaltabili-a-cingoli': '/all-courses/macchine-movimento-terra',
  'mmt-escavatori-caricatori-frontali-terne': '/all-courses/macchine-movimento-terra',
};

/**
 * Redirect 301 permanenti dai vecchi slug per-livello (es. /all-courses/antincendio-rischio-basso-livello-1,
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
      redirects.push({
        source: `/all-courses/${variante.slug}`,
        destination: `/all-courses/${family.slug}?livello=${livelloIndex}`,
        permanent: true,
      });
    });
  }

  Object.entries(REDIRECT_OVERRIDES).forEach(([slug, destination]) => {
    redirects.push({
      source: `/all-courses/${slug}`,
      destination,
      permanent: true,
    });
  });

  return redirects;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.aletheiasrl.it'],
  },
  async redirects() {
    return buildCourseRedirects();
  },
};

module.exports = nextConfig;
