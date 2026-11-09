/**
 * OBSOLETO: i meta tag SEO (description, canonical, Open Graph, Twitter) e il JSON-LD li emette ora components/SeoCentrale.tsx per ogni pagina
 * (montato in pages/_app.js; valori in data/seo-pagine.js o in `seoPagina` tra le props della pagina). Questo componente non renderizza più nulla:
 * resta solo perché alcune pagine lo importano ancora e per le costanti. Nelle pagine nuove NON usarlo.
 */
import { SITE_NAME, SITE_URL } from '../lib/seo';

export { SITE_NAME, SITE_URL };

interface SeoHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  url?: string;
  type?: 'website' | 'article';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SeoHead(_props: SeoHeadProps) {
  return null;
}
