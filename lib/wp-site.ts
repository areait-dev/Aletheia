import { SITE_OPTIONS as LOCAL } from '../data/site-options';
import { isWpEnabled, isrOptions, wpGet } from './wp';
import { lines, parseFooterColonne, parseLinks, parseMenuGroups, parseSocial } from './wp-lists';
import type { FooterColonna, Link, MenuGroup, SocialLink } from './wp-lists';
import { getPartners } from './wp-partner';
import type { Partner } from './wp-partner';
import { getChatbotFaqs } from './wp-faq';
import type { ChatbotFaqs } from './wp-faq';

/**
 * Opzioni globali (identità, Header, Footer) dalla pagina WP "opzioni-globali" (`/aletheia/v1/options`),
 * con ripiego campo per campo sui valori di `data/site-options.js`: un campo vuoto o assente non svuota il sito.
 * SOLO lato server (getStaticProps). Le pagine le ricevono come prop `siteOptions` tramite `withSiteOptions`,
 * `_app.js` le passa al contesto letto da Header e Footer.
 */

export type SiteOptions = {
  identita: { telefono: string; email: string; orari: string; social: SocialLink[] };
  header: {
    links: Link[];
    formazione: MenuGroup[];
    ctaLavoro: Link;
    elearning: Link;
    megaCalendario: { titolo: string; testo: string; btn: Link };
    megaCorsiBtn: Link;
  };
  footer: {
    indirizzo: string;
    indirizzoLink: string;
    linkLegali: Link[];
    colonne: FooterColonna[];
    accreditamentiTitolo: string;
    accreditamenti: string[];
    certificazioni: Partner[];
    copyright: string;
    creditsTesto: string;
    creditsLink: Link;
  };
  contatti: { motivi: string[] };
  moduli: {
    serviziCandidato: string[];
    settoriAzienda: string[];
    dipendentiAzienda: string[];
    serviziAzienda: string[];
    privacyTesto: string;
    successoCandidato: { titolo: string; testo: string };
    successoAzienda: { titolo: string; testo: string };
    successoReclami: { titolo: string; testo: string };
  };
  /** `faq`: FAQ del chatbot da WordPress (CPT `faq`, `pagina` = `chatbot-*`); assente = usa i testi locali del chatbot. */
  chatbot: { attivo: boolean; nome: string; benvenuto: string; placeholder: string; fallback: string; email: string; faq?: ChatbotFaqs };
  seo: { ogImage: string; verificaGoogle: string; descrizione: string };
  legale: { banner: string; btnAccetta: string; btnRifiuta: string };
};

type Acf = Record<string, unknown>;

const text = (v: unknown, fallback: string): string => (typeof v === 'string' && v.trim() ? v.trim() : fallback);
const list = <T>(v: T[], fallback: T[]): T[] => (v.length > 0 ? v : fallback);

/** Campo ACF "link" (`{ title, url }`) → Link; ripiega sul valore locale se manca l'URL. */
function link(v: unknown, fallback: Link): Link {
  if (v && typeof v === 'object') {
    const { title, url } = v as { title?: unknown; url?: unknown };
    if (typeof url === 'string' && url) return { label: text(title, fallback.label), href: url };
  }
  return fallback;
}

/** Messaggio di successo: due righe `Titolo` / `Testo` (con una sola riga si usa il titolo locale). */
function successo(rows: string[], fallback: { titolo: string; testo: string }) {
  const [titolo, testo] = rows;
  if (!titolo) return fallback;
  return testo ? { titolo, testo } : { titolo: fallback.titolo, testo: titolo };
}

const DEFAULTS = LOCAL as unknown as SiteOptions;

function build(acf: Acf, certificazioni: Partner[], chatbotFaq: ChatbotFaqs | null): SiteOptions {
  const d = DEFAULTS;
  const catalogo = (acf.footer_catalogo_pdf as { url?: string } | null | undefined)?.url;
  const colonne = list(parseFooterColonne(acf.footer_colonne), d.footer.colonne);
  return {
    identita: {
      telefono: text(acf.telefono, d.identita.telefono),
      email: text(acf.email, d.identita.email),
      orari: text(acf.orari, d.identita.orari),
      social: list(parseSocial(acf.social), d.identita.social),
    },
    header: {
      links: list(parseLinks(acf.menu_voci), d.header.links),
      formazione: list(parseMenuGroups(acf.menu_formazione), d.header.formazione),
      ctaLavoro: link(acf.header_cta_lavoro, d.header.ctaLavoro),
      elearning: link(acf.header_elearning, d.header.elearning),
      megaCalendario: {
        titolo: text(acf.mega_calendario_titolo, d.header.megaCalendario.titolo),
        testo: text(acf.mega_calendario_testo, d.header.megaCalendario.testo),
        btn: link(acf.mega_calendario_btn, d.header.megaCalendario.btn),
      },
      megaCorsiBtn: link(acf.mega_corsi_btn, d.header.megaCorsiBtn),
    },
    footer: {
      indirizzo: text(acf.footer_indirizzo, d.footer.indirizzo),
      indirizzoLink: text(acf.footer_indirizzo_link, d.footer.indirizzoLink),
      linkLegali: list(parseLinks(acf.footer_link_legali), d.footer.linkLegali),
      // Il PDF caricato in WordPress sostituisce l'URL del link al catalogo (quello locale è /pdf/catalogo.pdf).
      colonne: catalogo
        ? colonne.map((c) => ({
            ...c,
            gruppi: c.gruppi.map((g) => ({ ...g, links: g.links.map((l) => (l.href === '/pdf/catalogo.pdf' ? { ...l, href: catalogo } : l)) })),
          }))
        : colonne,
      accreditamentiTitolo: d.footer.accreditamentiTitolo,
      accreditamenti: list(lines(acf.footer_accreditamenti), d.footer.accreditamenti),
      certificazioni,
      copyright: text(acf.footer_copyright, d.footer.copyright),
      creditsTesto: text(acf.footer_credits_testo, d.footer.creditsTesto),
      creditsLink: link(acf.footer_credits_link, d.footer.creditsLink),
    },
    contatti: { motivi: list(lines(acf.motivi_contatto), d.contatti.motivi) },
    moduli: {
      serviziCandidato: list(lines(acf.form_servizi_candidato), d.moduli.serviziCandidato),
      settoriAzienda: list(lines(acf.form_settori_azienda), d.moduli.settoriAzienda),
      dipendentiAzienda: list(lines(acf.form_dipendenti_azienda), d.moduli.dipendentiAzienda),
      serviziAzienda: list(lines(acf.form_servizi_azienda), d.moduli.serviziAzienda),
      privacyTesto: text(acf.form_privacy_testo, d.moduli.privacyTesto),
      // Un solo campo per i due moduli: righe 1-2 = candidato, 3-4 = azienda, 5-6 = reclami e proposte (se mancano si usano i locali).
      successoCandidato: successo(lines(acf.form_successo_testo).slice(0, 2), d.moduli.successoCandidato),
      successoAzienda: successo(lines(acf.form_successo_testo).slice(2, 4), d.moduli.successoAzienda),
      successoReclami: successo(lines(acf.form_successo_testo).slice(4, 6), d.moduli.successoReclami),
    },
    chatbot: {
      attivo: acf.chatbot_attivo !== false, // solo "falso" esplicito lo spegne
      nome: text(acf.chatbot_nome, d.chatbot.nome),
      benvenuto: text(acf.chatbot_benvenuto, d.chatbot.benvenuto),
      placeholder: text(acf.chatbot_placeholder, d.chatbot.placeholder),
      fallback: text(acf.chatbot_fallback, d.chatbot.fallback),
      email: text(acf.chatbot_email, d.chatbot.email),
      faq: chatbotFaq ?? undefined, // undefined sparisce nel roundtrip JSON di getSiteOptions: props locali invariate
    },
    seo: {
      ogImage: (acf.sito_seo_og as { url?: string } | null | undefined)?.url ?? d.seo.ogImage,
      verificaGoogle: text(acf.sito_seo_gsv, d.seo.verificaGoogle),
      descrizione: text(acf.sito_seo_descrizione, d.seo.descrizione),
    },
    legale: {
      banner: text(acf.legale_banner, d.legale.banner),
      btnAccetta: text(acf.legale_btn_accetta, d.legale.btnAccetta),
      btnRifiuta: text(acf.legale_btn_rifiuta, d.legale.btnRifiuta),
    },
  };
}

const MEMO_TTL_MS = 5000;
let memo: { at: number; value: Promise<SiteOptions> } | null = null;

async function load(): Promise<SiteOptions> {
  const certificazioni = await getPartners('certificazioni');
  const chatbotFaq = await getChatbotFaqs(); // null se WordPress è spento: il chatbot usa i testi locali
  if (!isWpEnabled()) return build({}, certificazioni, chatbotFaq);
  try {
    const acf = await wpGet<Acf | unknown[]>('/aletheia/v1/options');
    return build(Array.isArray(acf) ? {} : acf, certificazioni, chatbotFaq);
  } catch (err) {
    console.warn(`[wp] opzioni globali non disponibili da WordPress, uso i dati locali: ${(err as Error).message}`);
    return build({}, certificazioni, chatbotFaq);
  }
}

export async function getSiteOptions(): Promise<SiteOptions> {
  if (!memo || Date.now() - memo.at > MEMO_TTL_MS) memo = { at: Date.now(), value: load() };
  // Roundtrip JSON: le props di getStaticProps non devono contenere `undefined`.
  return JSON.parse(JSON.stringify(await memo.value)) as SiteOptions;
}

type StaticResult = { props?: Record<string, unknown>; [k: string]: unknown };

/**
 * Avvolge il `getStaticProps` di una pagina aggiungendo `siteOptions` alle props (notFound / redirect passano
 * invariati). Senza argomento crea il getStaticProps per una pagina che non ne aveva (ISR solo con WordPress attivo).
 */
export function withSiteOptions<C = unknown>(gsp?: (ctx: C) => Promise<StaticResult> | StaticResult) {
  return async (ctx: C): Promise<StaticResult> => {
    const result: StaticResult = gsp ? await gsp(ctx) : { props: {}, ...isrOptions() };
    if (!result || !result.props) return result;
    return { ...result, props: { ...result.props, siteOptions: await getSiteOptions() } };
  };
}
