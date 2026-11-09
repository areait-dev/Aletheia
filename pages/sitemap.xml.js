import { raccogliUrl, costruisciXml } from '../lib/sitemap';

/** /sitemap.xml dinamica (home, pagine istituzionali, aree formative, corsi, categorie, news, archivio): la logica è in lib/sitemap.ts. */

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Una copia per un'ora sul CDN; poi si rigenera in background (news e corsi nuovi compaiono senza un nuovo deploy)
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(costruisciXml(await raccogliUrl()));
  res.end();
  return { props: {} };
}

// La risposta è l'XML scritto sopra: il componente non viene mai mostrato.
export default function Sitemap() {
  return null;
}
