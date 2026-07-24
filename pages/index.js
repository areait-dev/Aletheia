import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import NumberCounter from '../components/NumberCounter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CALENDARIO, CATEGORIE } from '../data/calendario';

/* ─── Dati statici ───────────────────────────────────────── */

const categorie = [
  {
    href: '/formazione/regionale-fse',
    badge: 'Gratuito',
    badgeColor: '#10B981',
    title: 'Formazione Finanziata',
    description: 'Percorsi finanziati da fondi regionali, europei e interprofessionali per acquisire nuove competenze, ottenere qualifiche professionali e aumentare le opportunità di inserimento lavorativo.',
    color: '#008C95',
  },
  {
    href: '/formazione/obbligatoria',
    badge: 'Obbligatorio',
    badgeColor: '#F59E0B',
    title: 'Formazione obbligatoria',
    description: 'Corsi obbligatori conformi al D.Lgs. 81/08. Sicurezza sul lavoro, Decreto Attrezzature, Fitosanitario e Sicurezza alimentare. Metti a norma la tua azienda.',
    color: '#008C95',
  },
  {
    href: '/formazione/professionale-specialistica',
    badge: 'Certificazioni riconosciute',
    badgeColor: '#6366F1',
    title: 'Formazione professionale',
    description: 'Certificazioni ICDL, corsi con qualifica professionale, formazione continua e percorsi per la Pubblica Amministrazione. I corsi che potenziano il tuo curriculum.',
    color: '#008C95',
  },
];

function CategoriaCard({ href, badge, badgeColor, title, description, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-8 flex flex-col gap-4 no-underline cursor-pointer transition-all duration-300"
      style={{
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Badge */}
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        alignSelf: 'flex-start',
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: badgeColor,
        background: `${badgeColor}18`,
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
      }}>
        {badge}
      </span>

      {/* Titolo */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0 leading-snug">
        {title}
      </h3>

      {/* Descrizione */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed m-0 flex-1">
        {description}
      </p>

      {/* Link */}
      <span style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        fontSize: '0.85rem', fontWeight: 700, color,
        marginTop: '0.25rem',
      }}>
        Scopri i corsi
      </span>
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

/* Aziende del gruppo Promotergroup - loghi in public/images/gruppo/ */
const gruppoLoghi = [
  { name: 'Promotergroup', src: '/images/gruppo/Logo Promotergroup (R).png' },
  { name: 'Doses', src: '/images/gruppo/DOSES - logo orizzontale.png' },
  { name: 'Iside', src: '/images/gruppo/Risorsa 8.png' },
];

const newsItems = [
  {
    id: 1,
    slug: 'bonus-giovani-under-35-aprile-2026',
    title: "Aprile 2026, ultimo mese per l'assunzione di under 35 con il Bonus Giovani",
    excerpt: "Il decreto Coesione garantisce alle aziende uno sgravio contributivo fino al 100% per le nuove assunzioni under 35.",
    date: '2026-04-01',
    image: 'https://www.aletheiasrl.it/media/k2/items/cache/6a501db6788f8bc3147fbec59d7a4924_L.jpg',
  },
  {
    id: 2,
    slug: 'priorita-lavoratori-2026-workforce-trends',
    title: 'Meno fughe, più ambizioni: come cambiano le priorità dei lavoratori nel 2026',
    excerpt: 'Il Workforce Trends Report di The Adecco Group fotografa un mondo del lavoro in profonda trasformazione.',
    date: '2026-03-15',
    image: 'https://www.aletheiasrl.it/media/k2/items/cache/b069b892c6725bd357423bc8f6c17d01_L.jpg',
  },
  {
    id: 3,
    slug: 'accordo-stato-regioni-formazione-sicurezza-2025',
    title: 'Formazione sulla sicurezza: il nuovo Accordo Stato-Regioni rivoluziona il sistema formativo',
    excerpt: 'Un quadro unitario, obblighi per i datori di lavoro, percorsi strutturati e attenzione alla qualità.',
    date: '2025-04-17',
    image: 'https://www.aletheiasrl.it/media/k2/items/cache/9b8bb3eb74bd3cd97bb3679c60950d61_M.jpg',
  },
  {
    id: 4,
    slug: 'intelligenza-artificiale-obbligo-formazione-2025',
    title: "L'Intelligenza Artificiale entra nelle aziende: obbligo di formazione dal 2025",
    excerpt: "Dal 2 febbraio 2025, le imprese devono garantire formazione adeguata sull'AI ai propri dipendenti.",
    date: '2025-02-02',
    image: 'https://www.aletheiasrl.it/media/k2/items/cache/b3a54ecc0915f9347c3f53fa31d161fe_M.jpg',
  },
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

// Stile pill pastello per categoria
const CATEGORIA_BADGE = {
  'obbligatoria': 'bg-amber-50 text-amber-800 border border-amber-200',
  'regionale-fse': 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  'professionale': 'bg-indigo-50 text-indigo-800 border border-indigo-200',
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

// Giorni dei prossimi corsi (max 10 distinti), ciascuno con i suoi corsi
const corsiOrdinati = [...CALENDARIO].sort((a, b) => a.data.localeCompare(b.data));
const giorniCalendario = [...new Set(corsiOrdinati.map((c) => c.data))]
  .slice(0, 10)
  .map((data) => ({ data, corsi: corsiOrdinati.filter((c) => c.data === data) }));

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
              className={`flex flex-col items-center justify-center shrink-0 w-16 h-16 rounded-xl transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-gray-50 dark:bg-dark-bg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card'
              }`}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wide">{wd}</span>
              <span className="text-lg font-bold leading-none mt-0.5">{d}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide">{mese}</span>
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
              <img
                src={`/images/courses/${(corso.id % 3) + 1}.jpg`}
                alt={corso.titolo}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = CATEGORIA_THUMB[corso.categoria] || CATEGORIA_THUMB['professionale'];
                }}
              />
            </div>

            {/* Testi */}
            <div className="flex-grow px-2 flex flex-col gap-1 w-full">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
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
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shrink-0 w-full md:w-auto text-center"
            >
              Iscriviti ora
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
  { value: 'offerte', label: 'Offerte di lavoro', href: '/agenzia-per-il-lavoro/offerte-di-lavoro' },
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
          style={{ zIndex: 9999 }}
          className={`absolute left-0 sm:right-0 sm:left-auto top-full mt-3 w-full sm:w-64 bg-white dark:bg-dark-card rounded-2xl shadow-xl p-2 z-[9999] origin-top transition-all duration-200 ease-out ${
            open
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {SEARCH_CATEGORIES.map((cat) => (
            <li key={cat.value}>
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
                    ? 'bg-[#008C95]/10 text-[#008C95] dark:text-[#10B981]'
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
        className="px-8 py-2.5 bg-[#008C95] hover:bg-[#006B73] dark:bg-[#10B981] dark:hover:bg-[#059669] text-white font-bold rounded-full transition-all duration-200 whitespace-nowrap"
      >
        Cerca
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Head>
        <title>Alètheia Srl - Formazione Professionale</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </Head>

      <Header active="/" />

      {/* ── 1 · HERO ─────────────────────────────────────── */}
      <section className="hero" style={{ overflow: 'visible' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }} aria-hidden="true">
          <div className="hero-deco hero-deco-1"></div>
          <div className="hero-deco hero-deco-2"></div>
        </div>
        <div className="container">
          <div className="hero-badge">
            Formiamo. Orientiamo. Inseriamo.
          </div>
          <h1>
            Siamo il ponte tra <span>formazione</span> e <span>lavoro</span>
          </h1>
          <p>
            Trasformiamo competenze in occupazione concreta. Dall&apos;orientamento
            alla formazione, fino all&apos;inserimento lavorativo. Accompagniamo
            persone e imprese in ogni fase della crescita professionale.
          </p>

          {/* Filtro di ricerca - barra unica a capsula */}
          <HeroSearch />

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="/all-courses"
              className="inline-flex items-center gap-2 bg-[#008C95] hover:bg-[#006B73] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
            >
              Scopri i corsi
            </a>
            <a
              href="/agenzia-per-il-lavoro/offerte-di-lavoro"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-200 text-base"
            >
              <i className="fas fa-briefcase text-sm" aria-hidden="true" />
              Vedi offerte di lavoro
            </a>
          </div>
        </div>
      </section>

      {/* ── 1b · CALENDARIO CORSI ────────────────────────── */}
      <section className="pt-14 pb-20 bg-light dark:bg-dark-bg" aria-labelledby="calendario-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-50 dark:bg-[#008C95]/20 text-teal-700 dark:text-[#10B981] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Calendario corsi
            </span>
            <h2 id="calendario-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Corsi in partenza
            </h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 max-w-4xl mx-auto">
              Questi corsi partono a breve. Controlla le date e prenota il tuo posto.
            </p>
          </div>

          <div className="mt-10">
            <CorsiCalendarTabs giorni={giorniCalendario} />
          </div>

          <div className="text-center mt-12">
            <a
              href="/calendario-corsi"
              className="inline-flex items-center gap-2 text-teal-600 dark:text-[#10B981] hover:text-teal-700 dark:hover:text-[#059669] font-semibold transition-colors"
            >
              Vedi il calendario completo →
            </a>
          </div>
        </div>
      </section>

      {/* ── 2 · I NOSTRI CORSI ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-dark-bg" aria-labelledby="courses-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="inline-block bg-[#008C95]/10 text-[#008C95] dark:bg-[#008C95]/20 dark:text-[#10B981] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              I nostri percorsi formativi
            </span>
            <h2 id="courses-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white text-balance max-w-3xl mx-auto">
              Trova il percorso giusto per il tuo futuro professionale
            </h2>
            <p className="mt-3 text-slate-500 dark:text-gray-300 text-lg max-w-4xl mx-auto">
              Dalla formazione finanziata alle certificazioni professionali, fino ai corsi obbligatori per aziende e lavoratori: sviluppiamo competenze richieste dal mercato e spendibili nel mondo del lavoro.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="courses-cat-grid">
            {categorie.map((cat) => (
              <CategoriaCard key={cat.href} {...cat} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/all-courses"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.95rem', fontWeight: 700, color: '#008C95',
                textDecoration: 'none',
              }}
            >
              Vedi tutti i corsi →
            </a>
          </div>

        </div>
      </section>

      {/* ── 3 · STATS / NUMERI ───────────────────────────── */}
      <section className="numbers-section">
        <div className="container">
          <div className="text-center mb-10">
            <span className="inline-block bg-white/10 text-[#10B981] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              Alètheia in numeri
            </span>
          </div>
          <div className="numbers-grid">
            <NumberCounter target="+20"   label="Anni di esperienza" icon="fas fa-user-graduate" />
            <NumberCounter target="+100"  label="Progetti formativi realizzati" icon="fas fa-chalkboard" />
            <NumberCounter target="+10000" label="Persone formate" icon="fas fa-star" />
            <NumberCounter target="+200"  label="Aziende clienti" icon="fas fa-chalkboard-teacher" />
          </div>
        </div>
      </section>

      {/* ── 3b · COSA FACCIAMO ───────────────────────────── */}
      <section className="py-20 bg-light dark:bg-dark-bg" aria-labelledby="cosa-facciamo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="inline-block bg-teal-50 dark:bg-[#008C95]/20 text-teal-700 dark:text-[#10B981] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Cosa facciamo
            </span>
            <h2 id="cosa-facciamo-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Formazione e lavoro.<br />Un unico interlocutore.
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-base mt-3 max-w-4xl mx-auto leading-relaxed">
              Alètheia è il punto d&apos;incontro tra formazione e lavoro. Accompagniamo
              persone e imprese nello sviluppo delle competenze, nell&apos;orientamento
              professionale e nell&apos;inserimento occupazionale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

            {/* Card Formazione */}
            <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
                alt="Aula di formazione professionale"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-950/70 to-transparent" />
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end h-full text-white">
                <p className="font-black tracking-wider text-xs text-teal-300 uppercase mb-2">Sviluppo delle Competenze</p>
                <h3 className="text-2xl font-bold text-white mb-3">Formazione</h3>
                <p className="text-slate-200 text-sm leading-relaxed max-w-md">
                  Progettiamo percorsi formativi che rispondono alle esigenze reali del
                  mercato del lavoro. Corsi finanziati, formazione obbligatoria, qualifiche
                  professionali e certificazioni riconosciute.
                </p>
                <a
                  href="/all-courses"
                  className="mt-5 self-start bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors duration-200"
                >
                  Scopri di più →
                </a>
              </div>
            </div>

            {/* Card Orientamento */}
            <div className="group relative h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
                alt="Colloquio di selezione del personale"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/95 via-indigo-950/70 to-transparent" />
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end h-full text-white">
                <p className="font-black tracking-wider text-xs text-indigo-300 uppercase mb-2">Orientamento e inserimento</p>
                <h3 className="text-2xl font-bold text-white mb-3">Agenzia per il Lavoro</h3>
                <p className="text-slate-200 text-sm leading-relaxed max-w-md">
                  Siamo Agenzia per il Lavoro autorizzata. Supportiamo giovani, lavoratori
                  e aziende nei processi di orientamento e selezione, creando la connessione
                  perfetta tra profili e imprese.
                </p>
                <a
                  href="/agenzia-per-il-lavoro"
                  className="mt-5 self-start bg-indigo-500 hover:bg-indigo-400 text-indigo-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors duration-200"
                >
                  Scopri di più →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3e · PARTE DEL GRUPPO ────────────────────────── */}
      <section className="pt-16 pb-20 bg-[linear-gradient(135deg,#0F172A_0%,#0a4f54_50%,#008C95_100%)]" aria-labelledby="gruppo-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/10 text-[#10B981] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Parte del Gruppo
            </span>
            <h2 id="gruppo-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance max-w-3xl mx-auto">
              Alètheia è l&rsquo;ente di formazione di Promotergroup S.p.A.
            </h2>
            <p className="mt-2 text-slate-200 max-w-4xl mx-auto">
              Un ecosistema integrato di servizi per le imprese e il territorio.
            </p>
          </div>

        </div>

        {/* Ticker loghi gruppo - ogni metà ripetuta più volte per riempire sempre la banda */}
        <div className="relative overflow-hidden marquee-mask">
          <div className="flex w-max animate-marquee">
            {[...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi, ...gruppoLoghi].map((logo, i) => (
              <div
                key={i}
                aria-hidden={i >= gruppoLoghi.length * 3}
                className="flex items-center justify-center h-16 mx-8 shrink-0"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-10 w-auto object-contain shrink-0 brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
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
            -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
            mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          }
        `}</style>
      </section>

      {/* ── 4 · ULTIME NOTIZIE ───────────────────────────── */}
      <section id="news" className="py-16 md:py-24 bg-light dark:bg-dark-bg" aria-labelledby="news-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header sezione */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-block bg-[#008C95]/10 text-[#008C95] dark:bg-[#008C95]/20 dark:text-[#10B981] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                News
              </span>
              <h2 id="news-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Ultime Notizie
              </h2>
            </div>
            <a
              href="/news"
              aria-label="Vedi tutte le notizie"
              className="inline-flex items-center gap-2 text-[#008C95] dark:text-[#10B981] font-semibold hover:text-[#006B73] dark:hover:text-[#059669] transition-colors text-sm"
            >
              Vedi tutte le notizie
            </a>
          </div>

          {/* 3 card affiancate - prime tre notizie */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {newsItems.slice(0, 3).map((item) => (
              <a
                key={item.id}
                href={`/news/${item.slug}`}
                aria-label={`Leggi l'articolo: ${item.title}`}
                className="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008C95]"
              >
                {/* Immagine 16/9 */}
                <div className="relative aspect-video bg-slate-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                {/* Testo */}
                <div className="flex flex-col flex-1 p-5">
                  <time dateTime={item.date} className="text-xs text-slate-400 dark:text-gray-500 font-medium mb-2">
                    {formatDateItalian(item.date)}
                  </time>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-[#008C95] dark:group-hover:text-[#10B981] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-500 dark:text-gray-300 text-sm line-clamp-2 flex-1">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[#008C95] dark:text-[#10B981] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    Leggi
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4a · LOGHI CLIENTI ───────────────────────────── */}
      <section className="py-20 bg-light dark:bg-dark-bg" aria-labelledby="clienti-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-teal-50 dark:bg-[#008C95]/20 text-teal-700 dark:text-[#10B981] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
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
                className="flex items-center justify-center h-12 px-10 shrink-0 text-slate-400 dark:text-white/70"
                aria-hidden={i >= clientiLoghi.length}
              >
                {/* Placeholder logo - sostituire con <img src="/images/clienti/..." /> */}
                <span className="flex items-center gap-2 text-lg font-bold whitespace-nowrap">
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

      {/* ── 4b · CTA FINALE ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 text-white border-t border-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
            Hai bisogno di un corso<br className="hidden sm:block" /> o stai cercando lavoro?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-4xl mx-auto font-normal leading-relaxed">
            Il team di Alètheia è a disposizione per orientarti verso il percorso più
            adatto alle tue esigenze.
          </p>
          <div className="pt-4">
            <a
              href="/contatti"
              className="inline-block bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold px-8 py-4 rounded-xl text-base transition-all duration-[250ms] shadow-lg shadow-teal-500/10 hover:shadow-teal-400/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>

      {/* ── 5 · FOOTER ───────────────────────────────────── */}
      <Footer />
    </>
  );
}
