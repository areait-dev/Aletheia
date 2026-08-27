/**
 * Blocco di meta tag SEO/Open Graph riutilizzabile. Non renderizza un proprio <Head> —
 * va inserito DENTRO il <Head> già presente in ogni pagina (title, favicon, viewport
 * restano dove sono), così le pagine mantengono il controllo di title/link esistenti.
 */

export const SITE_NAME = 'Alètheia Srl';
export const SITE_URL = 'https://www.aletheiasrl.it';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

interface SeoHeadProps {
  /** Titolo della pagina, usato anche per og:title/twitter:title (senza duplicare <title>) */
  title: string;
  description: string;
  /** URL assoluto o path relativo (verrà risolto rispetto a SITE_URL) */
  ogImage?: string;
  /** Path relativo (es. "/chi-siamo") o URL assoluto della pagina */
  url: string;
  type?: 'website' | 'article';
}

function resolveUrl(value: string, base: string): string {
  try {
    return new URL(value, base).toString();
  } catch {
    return value;
  }
}

export default function SeoHead({ title, description, ogImage, url, type = 'website' }: SeoHeadProps) {
  const absoluteUrl = resolveUrl(url, SITE_URL);
  const absoluteImage = ogImage ? resolveUrl(ogImage, SITE_URL) : DEFAULT_OG_IMAGE;

  return (
    <>
      <meta name="description" content={description} />
      <link rel="canonical" href={absoluteUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </>
  );
}
