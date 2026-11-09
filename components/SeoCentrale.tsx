import Head from 'next/head';
import { SEO_PAGINE } from '../data/seo-pagine';
import { SEDI } from '../data/sedi';
import { OG_IMAGE_DEFAULT, SITE_NAME, organizzazioneJsonLd, percorsoCanonico, titoloPagina, urlAssoluto, urlCanonico } from '../lib/seo';
import type { SeoPagina } from '../lib/seo';

/**
 * Il punto UNICO per title, description, canonical, Open Graph, Twitter e JSON-LD di ogni pagina (montato in pages/_app.js, DOPO la pagina:
 * next/head tiene l'ultimo tag con lo stesso nome, quindi questi valori prevalgono su quelli scritti nella pagina).
 *
 * Fonte dei valori, in ordine:
 *  1. `seo` tra le props della pagina (pagine dinamiche: schede corso, news, archivio, categorie...; vedi SeoPagina in lib/seo.ts);
 *  2. `pagina.seo` (campi SEO della pagina WordPress, quando valorizzati);
 *  3. il registro data/seo-pagine.js per le pagine statiche.
 * Una pagina nuova eredita comunque canonical, og:url, og:site_name, og:locale, twitter:card, immagine di condivisione e Organization;
 * title e description arrivano dal registro o da `seo`.
 */
type Props = {
  asPath: string;
  pathname: string;
  seo?: SeoPagina;
  /** `pagina.seo` di WordPress (titolo, descrizione, ogImage). */
  paginaSeo?: { titolo?: string; descrizione?: string; ogImage?: string } | null;
  /** Immagine di condivisione dalle opzioni globali (WordPress). */
  ogImageGlobale?: string;
  /** Descrizione predefinita dalle opzioni globali (WordPress), solo per pagine senza descrizione propria. */
  descrizioneGlobale?: string;
  identita: { telefono: string; email: string; social: { href: string }[] };
};

// Pagine di errore: non hanno un indirizzo proprio, niente canonical né og:url.
const SENZA_CANONICAL = new Set(['/404', '/500', '/_error']);

export default function SeoCentrale({ asPath, pathname, seo, paginaSeo, ogImageGlobale, descrizioneGlobale, identita }: Props) {
  const percorso = percorsoCanonico(asPath);
  const voce = (SEO_PAGINE as Record<string, { nome: string; descrizione: string }>)[percorso];
  const title = seo?.title || paginaSeo?.titolo || (voce ? titoloPagina(voce.nome) : undefined);
  const description = seo?.description || paginaSeo?.descrizione || voce?.descrizione || descrizioneGlobale || undefined;
  const image = urlAssoluto(seo?.image || paginaSeo?.ogImage || ogImageGlobale || OG_IMAGE_DEFAULT);
  const canonical = SENZA_CANONICAL.has(pathname) ? null : urlCanonico(asPath);
  const type = seo?.type ?? 'website';

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="it_IT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {/* Dati strutturati: l'organizzazione in tutte le pagine; poi quelli della pagina (Course, BreadcrumbList, NewsArticle...) */}
      <script key="ld-organizzazione" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizzazioneJsonLd(identita, SEDI)) }} />
      {(seo?.jsonLd ?? []).map((dato, i) => (
        <script key={`ld-pagina-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dato) }} />
      ))}
    </Head>
  );
}
