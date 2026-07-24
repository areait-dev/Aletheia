const { coursesData } = require('./data/coursesRaw');
const { buildCourseFamilies } = require('./data/courseFamilies');

/**
 * Redirect 301 permanenti dai vecchi slug per-livello (es. /all-courses/antincendio-rischio-basso-livello-1,
 * già linkati in data/calendario.ts e potenzialmente indicizzati) al nuovo slug di famiglia con ?livello=.
 * Generati automaticamente da coursesData: quiet=true perché qui non servono i prezzi, solo lo slug/indice livello.
 */
function buildCourseRedirects() {
  const families = buildCourseFamilies(coursesData, {}, { quiet: true });
  const redirects = [];

  for (const family of families) {
    const livelloKeys = Array.from(new Set(family.varianti.map((v) => v.livelloKey)));
    family.varianti.forEach((variante) => {
      if (variante.slug === family.slug) return; // già canonico, nessun redirect necessario
      const livelloIndex = livelloKeys.indexOf(variante.livelloKey) + 1;
      redirects.push({
        source: `/all-courses/${variante.slug}`,
        destination: `/all-courses/${family.slug}?livello=${livelloIndex}`,
        permanent: true,
      });
    });
  }

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
