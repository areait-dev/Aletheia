// Costruzione della sitemap (solo lato server: legge catalogo, news, archivio e aiuti di Stato). La usa pages/sitemap.xml.js.
import { SEO_PAGINE, PAGINE_SERVIZIO } from '../data/seo-pagine';
import { CATEGORIE_CORSI } from '../data/categorie-corsi';
import { FAMIGLIE } from '../data/archivio-famiglie';
import { buildCourseFamilies } from '../data/courseFamilies';
import { getCoursesRaw } from '../lib/wp-corsi';
import { getAllNews } from '../lib/wp-news';
import { getArchivio, VOCI_SPOSTATE } from '../lib/wp-archivio';
import { getAiutiAnni } from '../lib/wp-aiuti';
import { SITE_URL } from '../lib/seo';

/**
 * Contenuto di /sitemap.xml: home, pagine istituzionali, aree formative, /corsi, le pagine di categoria, tutte le schede corso, tutte le news e
 * l'archivio. Esclusi: pagine di servizio (moduli e strumenti: PAGINE_SERVIZIO in data/seo-pagine.js), redirect, 404 e le API.
 * `lastmod` solo dove c'è una data vera (le news: data di pubblicazione); per le altre pagine NON si inventa, il tag manca.
 * Gli URL sono sempre quelli del dominio definitivo (SITE_URL), mai vercel.app.
 */
const esc = (s: unknown) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function raccogliUrl() {
  const voci = new Map<string, string | null>(); // percorso -> lastmod|null (la prima data trovata vince; senza duplicati)
  const aggiungi = (percorso: string, lastmod: string | null = null) => { if (!voci.has(percorso)) voci.set(percorso, lastmod); };

  // Pagine statiche del registro SEO (home, istituzionali, aree formative, /corsi, news, archivio, aiuti) meno le pagine di servizio
  Object.keys(SEO_PAGINE).filter((p) => !PAGINE_SERVIZIO.includes(p)).forEach((p) => aggiungi(p));
  Object.keys(CATEGORIE_CORSI).forEach((c) => aggiungi(`/corsi/${c}`));

  const famiglie = buildCourseFamilies(await getCoursesRaw(), {}, { quiet: true });
  famiglie.forEach((f) => aggiungi(`/corsi/${f.slug}`));

  const news = await getAllNews();
  news.forEach((n) => aggiungi(`/news/${n.slug}`, /^\d{4}-\d{2}-\d{2}/.test(n.date || '') ? n.date.slice(0, 10) : null));

  (await getArchivio()).filter((v) => !VOCI_SPOSTATE[v.slug]).forEach((v) => aggiungi(`/archivio/${v.slug}`));
  FAMIGLIE.forEach((f) => aggiungi(`/archivio/${f.chiave}`));
  (await getAiutiAnni()).forEach((anno) => aggiungi(`/aiuti-di-stato/${anno}`));

  // Alfabetico, tranne le news: subito dopo /news, nell'ordine unico del sito (data di pubblicazione decrescente, vedi ordinaNews)
  const percorsiNews = news.map((n) => `/news/${n.slug}`);
  const altri = Array.from(voci.keys()).filter((p) => !percorsiNews.includes(p)).sort((x, y) => x.localeCompare(y));
  const ordine = altri.flatMap((p) => (p === '/news' ? [p, ...percorsiNews] : [p]));
  return ordine.map((percorso) => [percorso, voci.get(percorso) ?? null] as [string, string | null]).map(([percorso, lastmod]) => ({ loc: percorso === '/' ? `${SITE_URL}/` : `${SITE_URL}${percorso}`, lastmod }));
}

export function costruisciXml(url: { loc: string; lastmod: string | null }[]) {
  const righe = url.map((u) => `  <url>\n    <loc>${esc(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${righe.join('\n')}\n</urlset>\n`;
}
