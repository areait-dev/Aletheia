import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import NumberCounter from '../components/NumberCounter';
import SeoHead from '../components/SeoHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import HeroParallax from '../components/HeroParallax';
import CtaFinale from '../components/CtaFinale';
import { CATEGORIE } from '../data/calendario';
import { getCalendario, upcomingDays } from '../lib/wp-calendario';
import { isrOptions, isWpEnabled } from '../lib/wp';
import { getPartners } from '../lib/wp-partner';
import { getSchede } from '../lib/wp-schede';
import { getNewsList } from '../lib/wp-news';
import { HOME_NEWS } from '../data/home-news';
import { getPagina } from '../lib/wp-pagine';
import HeroTitle from '../components/HeroTitle';
import { withSiteOptions } from '../lib/wp-site';
import { useSiteOptions } from '../context/SiteOptionsContext';

/* ─── Dati statici ───────────────────────────────────────── */

// Righe `Valore|Suffisso|Etichetta` (es. `20|+|Anni di esperienza`) → { target: "20+", label }. NumberCounter ricava il
// suffisso (+ o %) dal target. Righe senza valore numerico o senza etichetta si scartano.
function contatori(righe) {
  return (righe || [])
    .map((r) => {
      const [valore = '', suffisso = '', ...resto] = r.split('|').map((c) => c.trim());
      return { target: `${valore}${suffisso}`, label: resto.join('|'), valido: /^\d+$/.test(valore) };
    })
    .filter((n) => n.valido && n.label);
}

function CategoriaCard({ href, badge, badgeColor, title, description, image, imageAlt }) {
  return (
    <a
      href={href}
      className="percorso-card group block relative h-[420px] rounded-3xl overflow-hidden no-underline cursor-pointer"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
    >
      {/* Immagine di sfondo */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[#004D52]/25 mix-blend-multiply" aria-hidden="true" /> {/* velatura brand: uniforma le foto stock */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />

      {/* Contenuto sovrapposto */}
      <div className="absolute inset-0 z-10 p-7 flex flex-col justify-end h-full text-white">
        {/* Badge */}
        <span className="badge-overlay" style={{ marginBottom: '0.85rem' }}>
          <span className="badge-overlay-dot" style={{ '--badge-dot': badgeColor }} aria-hidden="true" />
          {badge}
        </span>

        {/* Titolo */}
        <h3 className="text-xl font-bold text-white m-0 leading-snug mb-2">
          {title}
        </h3>

        {/* Descrizione */}
        <p className="text-sm text-slate-200 leading-relaxed m-0 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Link */}
        <span className="inline-flex items-center gap-2 self-start text-sm font-bold text-white">
          Scopri i corsi
          <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </a>
  );
}

/* Loghi clienti - placeholder, sostituire con <img src="/images/clienti/..." /> */
const clientiLoghi = [
  { name: 'Acme Corp', icon: 'fas fa-cube' },
  { name: 'Globex', icon: 'fas fa-globe' },
  { name: 'Initech', icon: 'fas fa-industry' },
  { name: 'Umbrella', icon: 'fas fa-umbrella' },
  { name: 'Stark Ind.', icon: 'fas fa-bolt' },
  { name: 'Wayne Ent.', icon: 'fas fa-building' },
];

/* ─── Utility ────────────────────────────────────────────── */

const MONTHS_IT = [
  'gennaio','febbraio','marzo','aprile','maggio','giugno',
  'luglio','agosto','settembre','ottobre','novembre','dicembre',
];

function formatDateItalian(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${day} ${MONTHS_IT[month - 1]} ${year}`;
}

// Etichetta leggibile della categoria a partire dalla key
const CATEGORIA_LABEL = Object.fromEntries(CATEGORIE.map((c) => [c.key, c.label]));

// Stile pill pastello per categoria (solo tinte brand #018891/#018891 + un neutro)
const CATEGORIA_BADGE = {
  'obbligatoria': 'bg-[#018891]/8 text-[#006066] border border-[#018891]/25 dark:bg-[#018891]/10 dark:text-[#5FC2C8] dark:border-primary-on-dark/30',
  'regionale-fse': 'bg-brand-100/40 text-brand-600 border border-brand-200 dark:bg-[#018891]/10 dark:text-[#5FC2C8] dark:border-primary-on-dark/30',
  'professionale': 'bg-slate-50 text-slate-700 border border-slate-200 dark:bg-white/5 dark:text-gray-200 dark:border-white/15',
};

// Thumbnail placeholder per categoria (sostituibili con immagini reali)
const CATEGORIA_THUMB = {
  'obbligatoria': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80',
  'regionale-fse': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
  'professionale': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
};

// Modalità derivata dalla sede (Online vs In presenza)
function modalitaFromSede(sede) {
  return /online/i.test(sede) ? 'Online' : 'In Presenza';
}

// Giorni della settimana (indice = Date.getDay(), 0 = domenica)
const WEEKDAYS_IT = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];

/* ─── Calendario a tab giornalieri "Corsi in partenza" ───── */

function CorsiCalendarTabs({ giorni }) {
  const [activeTab, setActiveTab] = useState(giorni[0]?.data);
  const attivo = giorni.find((g) => g.data === activeTab) || giorni[0];

  return (
    <div>
      {/* Barra tab - i prossimi giorni */}
      <div className="flex justify-start md:justify-center gap-3 mb-8 max-w-full mx-auto flex-nowrap overflow-x-auto pb-2">
        {giorni.map(({ data }) => {
          const [y, m, d] = data.split('-').map(Number);
          const wd = WEEKDAYS_IT[new Date(y, m - 1, d).getDay()];
          const mese = MONTHS_IT[m - 1].slice(0, 3);
          const isActive = data === activeTab;
          return (
            <button
              key={data}
              type="button"
              onClick={() => setActiveTab(data)}
              aria-pressed={isActive}
              className={`cal-tab flex flex-col items-center justify-center shrink-0 w-16 h-[72px] rounded-xl transition-all ${
                isActive
                  ? 'cal-tab-active bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-card' /* WCAG AA: gray-600 6,75:1 su gray-50 */
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">{wd}</span>
              <span className="font-viga text-2xl leading-none my-0.5 tabular-nums">{d}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide opacity-90">{mese}</span>
            </button>
          );
        })}
      </div>

      {/* Riga/e del giorno attivo */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {attivo.corsi.map((corso) => (
          <div
            key={corso.id}
            className="flex flex-col md:flex-row items-center justify-between p-4 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-[rgba(255,255,255,0.08)] shadow-sm gap-4"
          >
            {/* Immagine di anteprima */}
            <div className="w-full md:w-32 h-24 rounded-xl overflow-hidden relative shrink-0">
              <Image
                src={`/images/courses/${(corso.id % 3) + 1}.jpg`}
                alt={corso.titolo}
                width={128}
                height={96}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = CATEGORIA_THUMB[corso.categoria] || CATEGORIA_THUMB['professionale'];
                }}
              />
            </div>

            {/* Testi */}
            <div className="flex-grow px-2 flex flex-col gap-1 w-full">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-300">
                <span className={`font-semibold px-2 py-0.5 rounded-full ${CATEGORIA_BADGE[corso.categoria] || 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
                  {CATEGORIA_LABEL[corso.categoria]}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="fas fa-location-dot" aria-hidden="true" />
                  {corso.sede}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <i className="fas fa-laptop-house" aria-hidden="true" />
                  {modalitaFromSede(corso.sede)}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-950 dark:text-white">
                {corso.titolo}
              </h3>
            </div>

            {/* Azione */}
            <a
              href={`/all-courses/${corso.slug}`}
              className="group/btn inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-[#006B73] text-white font-semibold rounded-xl text-sm transition-colors duration-300 shrink-0 w-full md:w-auto text-center"
            >
              Iscriviti ora
              <i className="fas fa-arrow-right text-xs transition-transform duration-300 ease-out group-hover/btn:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero search bar (capsule + custom dropdown) ─────────── */

const SEARCH_CATEGORIES = [
  { value: '', label: 'Tutte le categorie' },
  { value: 'fse', label: 'Formazione Finanziata' },
  { value: 'obbligatoria', label: 'Formazione Obbligatoria' },
  { value: 'professionale', label: 'Formazione Professionale e PA' },
  { value: 'offerte', label: 'Offerte di lavoro', href: 'https://aletheia4job.it/' },
];

function HeroSearch() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Chiude il dropdown al click esterno
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel =
    SEARCH_CATEGORIES.find((c) => c.value === selected)?.label || 'Tutte le categorie';

  return (
    <div className="relative z-[9999] flex flex-col sm:flex-row items-stretch gap-2 sm:gap-1 mt-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 rounded-3xl sm:rounded-full p-2 focus-within:border-white/60 dark:focus-within:border-white/40 transition-colors">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Di cosa hai bisogno? Cerca un corso..."
        className="flex-1 px-5 py-2.5 bg-transparent text-white placeholder-white/50 dark:placeholder-white/40 focus:outline-none rounded-full"
      />

      <div className="hidden sm:block w-px self-center h-6 bg-white/20" aria-hidden="true" />

      {/* Dropdown personalizzato - sostituisce il <select> nativo */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="w-full sm:w-auto flex items-center justify-between gap-3 px-5 py-2.5 bg-transparent text-white focus:outline-none cursor-pointer rounded-full whitespace-nowrap"
        >
          <span>{selectedLabel}</span>
          <i
            className={`fas fa-chevron-down text-xs transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <ul
          role="listbox"
          aria-label="Categoria di ricerca"
          style={{ zIndex: 9999 }}
          className={`absolute left-0 sm:right-0 sm:left-auto top-full mt-3 w-full sm:w-64 bg-white dark:bg-dark-card rounded-2xl shadow-xl p-2 z-[9999] origin-top transition-all duration-200 ease-out ${
            open
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {SEARCH_CATEGORIES.map((cat) => (
            <li key={cat.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={selected === cat.value}
                onClick={() => {
                  if (cat.href) {
                    window.location.href = cat.href;
                    return;
                  }
                  setSelected(cat.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  selected === cat.value
                    ? 'bg-[#018891]/10 text-[#006066] dark:text-primary-on-dark' /* WCAG AA 4.5:1 su sfondo tinta */
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="px-8 min-h-[44px] inline-flex items-center justify-center bg-[#018891] hover:bg-[#006B73] dark:bg-[#018891] dark:hover:bg-[#006B73] text-white font-bold text-sm rounded-full transition-all duration-200 whitespace-nowrap"
      >
        Cerca
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

/* Calendario: WordPress se WP_URL è impostato, altrimenti dati locali (vedi lib/wp-calendario.ts); loghi del gruppo: CPT partner (lib/wp-partner.ts).
   "Oggi" si calcola qui, a ogni rigenerazione, e non più una sola volta al caricamento del modulo.
   Il confronto su stringa 'YYYY-MM-DD' funziona perché è lessicograficamente ordinabile come una data. */
// Ultime tre notizie: con WordPress attivo le ultime pubblicate; senza, la copia storica della home (data/home-news.js)
// così il sito resta identico a prima. Solo i campi usati dalla card.
async function ultimeNews() {
  if (!isWpEnabled()) return HOME_NEWS.slice(0, 3);
  const all = await getNewsList();
  return all.slice(0, 3).map(({ id, slug, title, excerpt, date, image }) => ({ id, slug, title, excerpt, date, image: image || '' }));
}

async function getPageStaticProps() {
  const calendario = await getCalendario();
  const oggiISO = new Date().toISOString().slice(0, 10);
  return { props: { giorniCalendario: upcomingDays(calendario, oggiISO, 10), gruppoLoghi: await getPartners('ecosistema'), categorie: await getSchede('categorie-home'), pagina: await getPagina('home'), newsItems: await ultimeNews() }, ...isrOptions() };
}

// Loghi del marquee: [aspect ratio del contenuto (file già ritagliati), --logo-scale, altezza fissa px, larghezza max px, --logo-offset-y px].
// Altezza di default = 80 * AR^-0.5 (limitata a 24-60px) * scala: i wordmark larghi (Promo.San 9,4:1) restano bassi, i compatti (Iside, Promesys) più alti.
// Loghi testuali: x-height ("promo") uguale a 14,8px (misurata sui file rasterizzati) per Promoter coop (40px di altezza), Promo.San (19,5px: x-height 76% dell'altezza) e Promotergroup / Promoter srl / Promoter agri (73px: x-height 20,1%).
// Questi tre hanno il box "ter" alto quanto tutto il file per design del marchio (flush con il viewBox): il testo sta nel 60% inferiore, quindi si sposta con --logo-offset-y per portare la linea mediana delle minuscole sulla stessa linea di Promo.San (mediana a -2,0px dal centro; Promoter coop a -3,5px, spostato di +1,5px; i tre a +7,3px, spostati di -9,9px (corretto sulla misura a schermo)).
// Iside: altezza totale (emblema + scritta + sottotitolo) = 73px come il box "ter" di Promoter srl/agri/group, con lo stesso offset (-9,9px) così occupa la stessa fascia verticale (stessi bordi alto e basso e stessa mediana del box); tratto ispessito nel file iside-bold.svg. Promesys e Doses: scala 0,9.
const LOGO_METRICS = {
  'promotergroup': [4.15, 1, 73, 310, -9.9],
  'promosan': [9.4, 1, 19.5, 200],
  'promoter-soc-coop-bianco': [4.0, 1, undefined, undefined, 1.5],
  'promoter-srl': [2.98, 1, 73, 240, -9.9],
  'promoteragri': [3.13, 1, 73, 240, -9.9],
  'iside-bold': [1.17, 1, 73, 200, -9.9],
  'promesys-rebranding': [1.38, 0.9],
  'DOSES-logo-orizzontale-bianco': [4.55, 1, 46, 300], // 46px: il sottotitolo arriva a ~5px di maiuscole (a 34px erano 3,7px, illeggibili); DOSES risulta più alto degli altri testi ma resta nella fascia dei loghi
};
const logoSize = (src) => {
  const [ar, scala, hFisso, maxW, offsetY] = LOGO_METRICS[src.split('/').pop().split('.')[0]] || [4, 1];
  const h = hFisso ?? Math.min(60, Math.max(24, 80 * Math.pow(ar, -0.5))) * scala;
  return { h: Math.round(h * 10) / 10, maxW: maxW ?? 200, offsetY: offsetY ?? 0 };
};

export default function Home({ giorniCalendario, gruppoLoghi, categorie, pagina, newsItems }) {
  const T = pagina.testi;
  const numeri = contatori(T.numeri);
  const { seo } = useSiteOptions(); // immagine OG predefinita (opzioni globali): i figli di <Head> non leggono il contesto
  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Alètheia Srl - Formazione Professionale"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <SeoHead
          title="Alètheia Srl - Formazione Professionale"
          description={pagina.seo.descrizione || "Alètheia Srl: ente di formazione professionale e Agenzia per il Lavoro a Vittoria (RG). Corsi finanziati, formazione obbligatoria, certificazioni e inserimento lavorativo."}
          url="/"
          ogImage={pagina.seo.ogImage || seo.ogImage || undefined}
        />
      </Head>

      <Header active="/" />

      <main className="home-main">

      {/* ── 1 · HERO ─────────────────────────────────────── */}
      <section className="hero" style={{ overflow: 'visible' }}>
        <HeroParallax>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }} aria-hidden="true">
            <div className="hero-deco hero-deco-1" data-parallax-fast></div>
            <div className="hero-deco hero-deco-2" data-parallax-fast></div>
          </div>
          <div className="container" data-parallax-slow>
            <div className="hero-badge">{T.hero_eyebrow}</div>
            <h1>
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span>{w}</span>} />
            </h1>
            <p>{T.hero_sottotitolo}</p>

            {/* Filtro di ricerca - barra unica a capsula */}
            <HeroSearch />

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a
                href={T.hero_cta1.href}
                className="btn btn-lg btn-light"
              >{T.hero_cta1.label}</a>
              <a
                href={T.hero_cta2.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-ghost-light"
              >
                <i className="fas fa-briefcase text-sm" aria-hidden="true" />{T.hero_cta2.label}</a>
            </div>
          </div>
        </HeroParallax>
      </section>

      {/* ── 1b · CALENDARIO CORSI ────────────────────────── */}
      <Reveal as="section" className="pt-16 pb-24 bg-light dark:bg-dark-bg" aria-labelledby="calendario-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-3">{T.s1_badge}</span>
            <h2 id="calendario-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{T.s1_titolo}</h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 max-w-4xl mx-auto">{T.s1_testo[0]}</p>
          </div>

          <div className="mt-10">
            <CorsiCalendarTabs giorni={giorniCalendario} />
          </div>

          <div className="text-center mt-12">
            <a href="/calendario-corsi" className="link-sezione">
              Vedi il calendario completo
              <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Reveal>

      {/* ── 2 · I NOSTRI CORSI ───────────────────────────── */}
      <section className="py-20 md:py-24 bg-slate-50 dark:bg-dark-bg" aria-labelledby="courses-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-3">{T.s2_badge}</span>
            <h2 id="courses-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white text-balance max-w-3xl mx-auto mb-2">{T.s2_titolo}</h2>
          </Reveal>

          {/* Prima categoria più larga (1,5fr): fa da apertura, le altre due la affiancano */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '1.5rem' }} className="courses-cat-grid">
            {categorie.map((cat, i) => (
              <Reveal key={cat.href} delay={i * 100}>
                <CategoriaCard {...cat} />
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/all-courses" className="link-sezione">
              Vedi tutti i corsi
              <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
            </a>
          </div>

        </div>
      </section>

      {/* ── 3 · STATS / NUMERI ───────────────────────────────────
          Un numero protagonista (persone formate, il dato più rappresentativo)
          più grande, con gli altri tre di contorno più piccoli, invece di 4
          statistiche identiche senza gerarchia visiva. */}
      <section className="numbers-section">
        <div className="container">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white">{T.numeri_badge}</span>
          </div>
          <div className="numbers-hero-grid">
            {/* Contatori da T.numeri (righe `Valore|Suffisso|Etichetta`): la prima è il numero grande, le altre di contorno */}
            {numeri.length > 0 && (
              <div className="numbers-hero-main">
                <NumberCounter
                  target={numeri[0].target}
                  label={numeri[0].label}
                  valueClassName="text-6xl sm:text-7xl font-extrabold text-white tracking-tight tabular-nums leading-none"
                  labelClassName="text-sm"
                  smallSuffix
                />
              </div>
            )}
            <div className="numbers-hero-side">
              {numeri.slice(1).map((n) => (
                <NumberCounter key={n.label} target={n.target} label={n.label} smallSuffix valueClassName="text-3xl font-extrabold text-white tracking-tight tabular-nums leading-none" />
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          .numbers-hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: center;
          }
          .numbers-hero-main {
            display: flex;
            justify-content: center;
            text-align: center;
          }
          .numbers-hero-side {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            border-top: 1px solid rgba(255,255,255,0.12);
            padding-top: 1.5rem;
          }
          @media (min-width: 900px) {
            .numbers-hero-grid {
              grid-template-columns: auto 1fr;
              gap: 3rem;
            }
            .numbers-hero-side {
              border-top: none;
              border-left: 1px solid rgba(255,255,255,0.12);
              padding-top: 0;
              padding-left: 3rem;
            }
          }
        `}</style>
      </section>

      {/* ── 3b · COSA FACCIAMO ───────────────────────────── */}
      <Reveal as="section" className="py-24 bg-light dark:bg-dark-bg" aria-labelledby="cosa-facciamo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-3">{T.s3_badge}</span>
            <h2 id="cosa-facciamo-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Formazione e lavoro.<br />Un unico interlocutore.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

            {/* Card Formazione */}
            <Reveal>
              <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <Image
                  src={T.s3_img_1.src}
                  alt={T.s3_img_1.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D52]/95 via-[#004D52]/70 to-transparent" />
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end h-full text-white">
                  <span className="badge-overlay mb-3">
                    <span className="badge-overlay-dot" aria-hidden="true" />
                    Sviluppo delle Competenze
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">Formazione</h3>
                  <p className="text-slate-200 text-sm leading-relaxed max-w-md">
                    Progettiamo percorsi formativi che rispondono alle esigenze reali del
                    mercato del lavoro. Corsi finanziati, formazione obbligatoria, qualifiche
                    professionali e certificazioni riconosciute.
                  </p>
                  <a
                    href="/all-courses"
                    className="btn btn-sm btn-light mt-5 self-start"
                  >
                    Scopri di più →
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Card Orientamento */}
            <Reveal delay={120}>
              <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <Image
                  src={T.s3_img_2.src}
                  alt={T.s3_img_2.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D52]/95 via-[#004D52]/70 to-transparent" />
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end h-full text-white">
                  <span className="badge-overlay mb-3">
                    <span className="badge-overlay-dot" aria-hidden="true" />
                    Orientamento e inserimento
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">Agenzia per il Lavoro</h3>
                  <p className="text-slate-200 text-sm leading-relaxed max-w-md">
                    Siamo Agenzia per il Lavoro autorizzata. Supportiamo giovani, lavoratori
                    e aziende nei processi di orientamento e selezione, creando la connessione
                    perfetta tra persone e imprese.
                  </p>
                  <a
                    href="/agenzia-per-il-lavoro"
                    className="btn btn-sm btn-light mt-5 self-start"
                  >
                    Scopri di più →
                  </a>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </Reveal>

      {/* ── 3e · PARTE DEL GRUPPO ────────────────────────── */}
      <section className="pt-20 pb-[4.5rem] bg-[linear-gradient(135deg,#0F172A_0%,#0a4f54_50%,#008C95_100%)]" aria-labelledby="gruppo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 !mt-0" /* annulla il margin-top 3rem della regola globale .text-center, così il padding sopra e sotto la sezione è simmetrico */>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white mb-3">{T.s4_badge}</span>
            <h2 id="gruppo-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance max-w-3xl mx-auto">{T.s4_titolo}</h2>
            <p className="mt-2 text-slate-200 max-w-4xl mx-auto">{T.s4_testo[0]}</p>
          </div>

        </div>

        {/* Ticker loghi gruppo - ogni metà ripetuta più volte per riempire sempre la banda */}
        <div className="relative overflow-hidden marquee-mask">
          <div className="flex w-max animate-marquee">
            {[...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi].map((logo, i) => (
              <div
                key={i}
                aria-hidden={i >= gruppoLoghi.length * 3}
                className="flex items-center justify-center h-24 mx-7 shrink-0" /* gap costante, loghi centrati in verticale */
              >
                {/* <img> nativo intenzionale: il marquee ripete questi loghi 6x (36 istanze
                    simultanee) per il loop continuo - convertirli a next/image moltiplica
                    l'overhead client (observer/mount per istanza) e degrada il TBT sotto
                    CPU throttled, misurato con un calo di Performance mobile (82->72). I
                    file sono già piccoli (PNG/SVG del gruppo), quindi l'ottimizzazione di
                    next/image non porta beneficio reale qui. */}
                <img
                  src={logo.src}
                  alt={logo.name}
                  decoding="sync"
                  // Altezza ottica per logo (vedi LOGO_METRICS); --logo-k riduce tutto su mobile; stessa opacità per tutti
                  style={{ height: `calc(${logoSize(logo.src).h}px * var(--logo-k, 1))`, maxWidth: `calc(${logoSize(logo.src).maxW}px * var(--logo-k, 1))`, transform: `translateY(calc(${logoSize(logo.src).offsetY}px * var(--logo-k, 1)))` }}
                  className="w-auto object-contain shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    el.insertAdjacentHTML(
                      'afterend',
                      `<span class="text-xs font-semibold text-white/60 whitespace-nowrap">${logo.name}</span>`
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 55s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .marquee-mask {
            --logo-k: 1;
            -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
            mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          }
          @media (max-width: 640px) {
            .marquee-mask { --logo-k: 0.75; }
          }
        `}</style>
      </section>

      {/* ── 4 · ULTIME NOTIZIE ───────────────────────────── */}
      <section id="news" className="py-20 md:py-24 bg-light dark:bg-dark-bg" aria-labelledby="news-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header sezione */}
          <Reveal className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-3">{T.s5_badge}</span>
              <h2 id="news-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">{T.s5_titolo}</h2>
            </div>
            <a
              href="/news"
              aria-label="Vedi tutte le notizie"
              className="link-sezione text-sm"
            >
              Vedi tutte le notizie
              <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
            </a>
          </Reveal>

          {/* 3 card affiancate - prime tre notizie */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {newsItems.slice(0, 3).map((item, i) => (
              <Reveal key={item.id} delay={i * 100} className="h-full">
                <a
                  href={`/news/${item.slug}`}
                  aria-label={`Leggi l'articolo: ${item.title}`}
                  className="percorso-card group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008C95]"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                >
                  {/* Immagine 16/9 */}
                  <div className="relative aspect-video bg-slate-200 dark:bg-gray-700 overflow-hidden">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    {/* WCAG AA: gray-300 su dark-card (gray-500 era sotto 4.5:1) */}
                    <time dateTime={item.date} className="text-xs text-slate-600 dark:text-gray-300 font-medium mb-2">
                      {formatDateItalian(item.date)}
                    </time>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary-text dark:group-hover:text-primary-on-dark transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600 dark:text-gray-300 text-sm line-clamp-2 flex-1">
                      {item.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-primary-text dark:text-primary-on-dark font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                      Leggi
                      <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4a · LOGHI CLIENTI ───────────────────────────── */}
      {/* TODO: riattivare con loghi reali dopo consenso clienti — vedi nota.
          Disattivata con {false && (...)} anziché rimossa: il blocco contiene
          già un commento JSX annidato, che non può stare dentro un altro
          commento a blocco. Le sezioni sopra/sotto hanno padding verticale
          proprio (py-24 / py-20), quindi la rimozione non lascia vuoti. */}
      {false && (
      <section className="py-24 bg-light dark:bg-dark-bg" aria-labelledby="clienti-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-3">
              Clienti
            </span>
            <h2 id="clienti-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance max-w-3xl mx-auto">
              Alcune delle realtà che si affidano ad Alètheia
            </h2>
          </div>
        </div>

        {/* Ticker loghi infinito */}
        <div className="relative overflow-hidden marquee-mask">
          <div className="flex w-max animate-marquee">
            {[...clientiLoghi, ...clientiLoghi].map((logo, i) => (
              <div
                key={i}
                className="group/logo flex items-center justify-center h-12 px-10 shrink-0"
                aria-hidden={i >= clientiLoghi.length}
              >
                {/* Placeholder logo - sostituire con <img src="/images/clienti/..." className="grayscale opacity-70 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-300" /> */}
                <span className="flex items-center gap-2 text-lg font-bold whitespace-nowrap text-slate-700 dark:text-white/70 grayscale opacity-100 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 group-hover/logo:text-[#018891] dark:group-hover/logo:text-[#018891] transition-all duration-300">
                  <i className={`${logo.icon} text-2xl`} aria-hidden="true" />
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          .marquee-mask {
            -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
            mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          }
        `}</style>
      </section>
      )}

      {/* ── 4b · CTA FINALE ──────────────────────────────── */}
      <CtaFinale
        background="linear-gradient(to bottom right, #020617, #003134, #020617)" /* gradiente originale della CTA home */
        title={<>Hai bisogno di un corso<br className="hidden sm:block" /> o stai cercando lavoro?</>}
        text={T.cta_testo}
        primary={{ label: T.cta_bottone1.label, href: T.cta_bottone1.href }}
      />

      {/* ── 5 · FOOTER ───────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
