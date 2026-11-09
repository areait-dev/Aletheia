// SEO condiviso: costanti, indirizzi canonici, formati dei titoli e descrizioni, dati strutturati JSON-LD.
// UN solo punto: components/SeoCentrale.tsx (montato in pages/_app.js) li usa per OGNI pagina, così le pagine nuove li ereditano
// (canonical, og:url, og:image predefinita, Organization). Una pagina dinamica passa `seo` tra le props di getStaticProps (tipo SeoPagina).
// Tutti gli URL assoluti usano https://www.aletheiasrl.it, mai vercel.app.

export const SITE_NAME = 'Alètheia Srl';
export const SITE_URL = 'https://www.aletheiasrl.it';
/** Immagine di condivisione predefinita 1200x630 (scripts/genera-og-default.js): logo + "Formazione e lavoro" su sfondo del brand. */
export const OG_IMAGE_DEFAULT = `${SITE_URL}/images/og-default.png`;

export type Json = Record<string, unknown>;

/** Cosa una pagina dinamica comunica al componente SEO centrale (tutti i campi sono facoltativi). */
export type SeoPagina = {
  /** <title> completo ("Nome pagina - Alètheia Srl"). */
  title?: string;
  description?: string;
  /** Immagine di condivisione: URL assoluto o percorso (/images/...). */
  image?: string;
  /** og:type: 'website' (predefinito) o 'article'. */
  type?: 'website' | 'article';
  /** Dati strutturati della pagina (Course, BreadcrumbList, NewsArticle...), uno <script> ciascuno. */
  jsonLd?: Json[];
};

/** URL assoluto di un percorso o di un indirizzo già assoluto. */
export function urlAssoluto(valore: string, base: string = SITE_URL): string {
  try {
    return new URL(valore, base).toString();
  } catch {
    return valore;
  }
}

/** Percorso canonico di un indirizzo (asPath): senza query né #, senza slash finale (tranne la home). */
export function percorsoCanonico(asPath: string): string {
  const senza = String(asPath || '/').split('#')[0].split('?')[0] || '/';
  return senza.length > 1 ? senza.replace(/\/+$/, '') || '/' : '/';
}

/** Canonical assoluto di una pagina. */
export function urlCanonico(asPath: string): string {
  return urlAssoluto(percorsoCanonico(asPath));
}

/** "<nome> - Alètheia Srl". */
export function titoloPagina(nome: string): string {
  return `${nome} - ${SITE_NAME}`;
}

/** Toglie il markup e le spaziature in eccesso da un testo (estratti di news, ecc.). */
export function testoSemplice(html: string): string {
  return String(html ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Accorcia a `max` caratteri alla parola intera, con puntini di sospensione se serve. */
export function accorcia(testo: string, max = 160): string {
  const t = testoSemplice(testo);
  if (t.length <= max) return t;
  const taglio = t.slice(0, max - 1);
  return `${taglio.slice(0, Math.max(taglio.lastIndexOf(' '), 0) || taglio.length).replace(/[\s,;:.\-–]+$/, '')}…`;
}

// ── Dati strutturati ──────────────────────────────────────────────────────────────────────────────────────────────

export type SedeSeo = { città: string; indirizzo: string; cap?: string };
export type IdentitaSeo = { telefono: string; email: string; social: { href: string }[] };

// Orari di apertura (identità del sito: "Lun - Ven · 9:00-13:00 / 14:00-18:00")
const ORARI = [
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '13:00' },
  { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:00', closes: '18:00' },
];

/** Provincia e CAP: solo Vittoria ha un CAP indicato nei dati; per le altre sedi non si inventa. */
function indirizzoSede(s: SedeSeo): Json {
  const cap = /\b(\d{5})\b/.exec(s.cap ?? '')?.[1];
  return {
    '@type': 'PostalAddress',
    streetAddress: s.indirizzo,
    addressLocality: s.città,
    addressRegion: 'RG',
    ...(cap ? { postalCode: cap } : {}),
    addressCountry: 'IT',
  };
}

/** EducationalOrganization con le sedi come location, telefono, email, orari e profili social. */
export function organizzazioneJsonLd(identita: IdentitaSeo, sedi: SedeSeo[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'Organization'],
    '@id': `${SITE_URL}/#organizzazione`,
    name: SITE_NAME,
    legalName: 'Alètheia S.r.l.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: OG_IMAGE_DEFAULT,
    telephone: identita.telefono,
    email: identita.email,
    address: sedi[0] ? indirizzoSede(sedi[0]) : undefined,
    location: sedi.map((s) => ({ '@type': 'Place', name: `${SITE_NAME} - sede di ${s.città}`, address: indirizzoSede(s), telephone: identita.telefono })),
    openingHoursSpecification: ORARI,
    areaServed: { '@type': 'AdministrativeArea', name: 'Sicilia' },
    sameAs: identita.social.map((s) => s.href),
  };
}

/** Briciole di pane: elenco { nome, percorso } dalla home alla pagina. */
export function breadcrumbJsonLd(voci: { nome: string; percorso?: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: voci.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.nome,
      ...(v.percorso ? { item: urlAssoluto(v.percorso) } : {}),
    })),
  };
}

/**
 * Descrizione di 140-160 caratteri a partire da un testo libero (estratto, descrizione di una voce): lo accorcia alla parola intera se supera 160;
 * se è sotto 140 vi aggiunge, in ordine, le frasi di riempimento che ci stanno.
 */
export function descrizioneEntro(base: string, riempimenti: string[] = [], min = 140, max = 160): string {
  let s = accorcia(base, max);
  for (const r of riempimenti) {
    if (s.length >= min) break;
    const unita = /[.!?…]$/.test(s) ? `${s} ${r}` : `${s}. ${r}`;
    if (unita.length <= max) s = unita;
  }
  return s;
}

/** Dati strutturati di un articolo (NewsArticle). */
export function articoloJsonLd(a: { titolo: string; descrizione: string; percorso: string; immagine: string; dataPubblicazione: string; dataModifica?: string; autore?: string }): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': urlAssoluto(a.percorso) },
    headline: a.titolo.slice(0, 110),
    description: a.descrizione,
    image: [urlAssoluto(a.immagine)],
    datePublished: a.dataPubblicazione,
    dateModified: a.dataModifica || a.dataPubblicazione,
    author: { '@type': a.autore ? 'Person' : 'Organization', name: a.autore || SITE_NAME },
    publisher: { '@type': 'Organization', '@id': `${SITE_URL}/#organizzazione`, name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
  };
}
