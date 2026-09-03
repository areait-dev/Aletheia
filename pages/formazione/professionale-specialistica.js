import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';

const heroBadges = [
  { icon: 'fas fa-award', label: 'Ente accreditato Regione Siciliana' },
  { icon: 'fas fa-laptop-code', label: 'Test Center AICA' },
  { icon: 'fas fa-user-doctor', label: 'Provider ECM' },
];

const valori = [
  {
    icon: 'fas fa-lightbulb',
    title: 'Contenuti aggiornati',
    text: (
      <>Programmi progettati con <strong className="text-slate-900 dark:text-white font-bold">docenti professionisti</strong>: non teoria fine a sé stessa, ma <strong className="text-slate-900 dark:text-white font-bold">competenze pratiche</strong> spendibili sul lavoro.</>
    ),
  },
  {
    icon: 'fas fa-file-circle-check',
    title: 'Certificazioni riconosciute',
    text: (
      <><strong className="text-slate-900 dark:text-white font-bold">ICDL, qualifiche regionali e crediti ECM</strong>. Titoli validi per il mercato privato, concorsi pubblici e graduatorie scolastiche.</>
    ),
  },
  {
    icon: 'fas fa-bullseye',
    title: 'Percorsi su misura',
    text: (
      <>Soluzioni flessibili per <strong className="text-slate-900 dark:text-white font-bold">privati, aziende e Pubblica Amministrazione</strong>. Corsi in aula, online o direttamente presso il tuo ente.</>
    ),
  },
];

const verticali = [
  {
    color: 'blue',
    sopratitolo: 'Certificazioni digitali',
    title: 'Certificazioni Informatiche ICDL',
    bullets: [
      'Standard europeo per le competenze digitali richiesto nei concorsi pubblici.',
      'Test Center AICA qualificato con esami direttamente in sede a Vittoria.',
      'Percorsi flessibili per studenti, professionisti e docenti.',
    ],
    icon: 'fas fa-laptop-code',
    cta: 'Scopri le certificazioni',
    href: '/all-courses?categoria=certificazioni-informatiche',
  },
  {
    color: 'amber',
    sopratitolo: 'Crescita professionale',
    title: 'Corsi Qualificati',
    bullets: [
      'Percorsi di qualifica e riqualificazione per nuove opportunità lavorative.',
      'Qualifiche ufficiali inserite nel Repertorio Nazionale e spendibili sul mercato.',
      'Certificazione delle competenze acquisite con titoli riconosciuti.',
    ],
    icon: 'fas fa-certificate',
    cta: 'Scopri i corsi qualificati',
    href: '/all-courses?categoria=certificazione',
  },
  {
    color: 'teal',
    sopratitolo: 'Educazione sanitaria',
    title: 'Corsi ECM',
    bullets: [
      'Crediti formativi obbligatori ogni anno per tutti i professionisti della salute.',
      'Provider ECM accreditato con contenuti scientifici sempre aggiornati.',
      'Modalità di fruizione flessibili studiate per chi già lavora in corsia.',
    ],
    icon: 'fas fa-user-doctor',
    cta: 'Scopri i corsi ECM',
    href: '/formazione/ecm',
  },
  {
    color: 'indigo',
    sopratitolo: 'Per enti pubblici',
    title: 'Formazione per la PA',
    bullets: [
      'Piani formativi mirati su digitalizzazione, anticorruzione e trasparenza.',
      'Corsi erogabili direttamente in sede o in modalità dedicate.',
      'Docenti altamente specializzati e orientati alle esigenze della PA.',
    ],
    icon: 'fas fa-landmark',
    cta: 'Scopri la formazione PA',
    href: '/formazione/corsi-pa',
  },
];

// Classi statiche (necessarie per Tailwind JIT: niente interpolazione dinamica di classi colore)
const COLOR_STYLES = {
  blue: {
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    iconText: 'text-blue-600 dark:text-blue-300',
    sopratitolo: 'text-blue-600 dark:text-blue-300',
    topBorder: 'bg-blue-600',
    bullet: 'text-blue-600 dark:text-blue-300',
    btn: 'border-blue-600 text-blue-600 dark:border-blue-300 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-300 dark:hover:text-slate-900',
  },
  amber: {
    iconBg: 'bg-amber-50 dark:bg-amber-900/20',
    iconText: 'text-amber-600 dark:text-amber-300',
    sopratitolo: 'text-amber-600 dark:text-amber-300',
    topBorder: 'bg-amber-600',
    bullet: 'text-amber-600 dark:text-amber-300',
    btn: 'border-amber-600 text-amber-600 dark:border-amber-300 dark:text-amber-300 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-300 dark:hover:text-slate-900',
  },
  teal: {
    iconBg: 'bg-[#008C95]/10 dark:bg-[#10B981]/10',
    iconText: 'text-primary dark:text-[#10B981]',
    sopratitolo: 'text-primary dark:text-[#10B981]',
    topBorder: 'bg-primary',
    bullet: 'text-primary dark:text-[#10B981]',
    btn: 'border-primary text-primary dark:border-[#10B981] dark:text-[#10B981] hover:bg-primary hover:text-white dark:hover:bg-[#10B981] dark:hover:text-slate-900',
  },
  indigo: {
    iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
    iconText: 'text-indigo-900 dark:text-indigo-300',
    sopratitolo: 'text-indigo-900 dark:text-indigo-300',
    topBorder: 'bg-indigo-900',
    bullet: 'text-indigo-900 dark:text-indigo-300',
    btn: 'border-indigo-900 text-indigo-900 dark:border-indigo-300 dark:text-indigo-300 hover:bg-indigo-900 hover:text-white dark:hover:bg-indigo-300 dark:hover:text-slate-900',
  },
};

function VerticaleCard({ color, sopratitolo, title, bullets, icon, cta, href }) {
  const c = COLOR_STYLES[color];
  return (
    <a
      href={href}
      className="h-full bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] flex flex-col overflow-hidden no-underline transition-all duration-300 hover:-translate-y-2 hover:shadow-md rounded-2xl"
    >
      <div className={`h-1 ${c.topBorder}`} />
      <div className="p-8 flex flex-col gap-3 flex-1">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${c.iconBg}`}>
          <i className={`${icon} ${c.iconText}`} style={{ fontSize: '1.35rem' }}></i>
        </div>

        <span className={`text-xs font-extrabold uppercase tracking-widest ${c.sopratitolo}`}>
          {sopratitolo}
        </span>

        <h3 className="text-slate-900 dark:text-white text-xl font-extrabold leading-snug m-0">
          {title}
        </h3>

        <ul className="list-none m-0 p-0 space-y-2 flex-1">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
              <i className={`fas fa-check text-xs mt-1 shrink-0 ${c.bullet}`}></i>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <span className={`mt-auto inline-flex items-center justify-center gap-2 text-sm font-bold rounded-full border-2 px-5 py-2.5 transition-all duration-300 ${c.btn}`}>
          {cta} <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
        </span>
      </div>
    </a>
  );
}

export default function FormazioneProfessionaleSpecialistica() {
  return (
    <>
      <Head>
        <title>Formazione Professionale e Corsi per la Pubblica Amministrazione - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corsi qualificati, certificazioni ICDL, corsi ECM e formazione per la Pubblica Amministrazione. Alètheia, ente accreditato Regione Siciliana, Test Center AICA e Provider ECM."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.38s; opacity: 0; }

        .hero-badge-fps {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.03em;
          color: #6EE7B7; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
          padding: 0.4rem 0.9rem; border-radius: 999px;
        }
        .cta-btn-primary-fps {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary-fps:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }

        .fps-badges-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem; }

        /* Blocco compatto 3 colonne sotto la hero */
        .valori-grid-fps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 800px) { .valori-grid-fps { grid-template-columns: 1fr; } }

        .aree-grid-fps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; align-items: stretch; }
        @media (max-width: 800px) { .aree-grid-fps { grid-template-columns: 1fr; } }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', paddingTop: '120px', paddingBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fps-badges-row fade-up">
            {heroBadges.map((b) => (
              <span key={b.label} className="hero-badge-fps">
                <i className={b.icon} style={{ fontSize: '0.8rem' }}></i>
                {b.label}
              </span>
            ))}
          </div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '900px' }}>
            Formazione professionale e corsi per la{' '}
            <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Pubblica Amministrazione
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '960px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Corsi qualificati, certificazioni riconosciute e percorsi formativi per persone, aziende e Pubblica Amministrazione. Dalle certificazioni ICDL ai corsi ECM, dai percorsi qualificati alla formazione su misura per la PA, un unico partner per sviluppare competenze concrete, riconosciute e immediatamente spendibili.
          </p>

          <div className="fade-up fade-up-3">
            <a href="#aree" className="cta-btn-primary-fps">Scopri i nostri corsi</a>
          </div>
        </div>
      </section>

      {/* ══════════════ FORMAZIONE CHE CREA VALORE ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center' }}>
            Formazione che crea valore, non solo attestati
          </h3>
          <div className="valori-grid-fps items-stretch">
            {valori.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 80} className="h-full">
                <div
                  className="h-full bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] rounded-xl p-8 flex flex-col items-start text-left gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#008C95]/10 dark:bg-[#10B981]/10 flex items-center justify-center">
                    <i className={`${v.icon} text-primary dark:text-[#10B981]`} style={{ fontSize: '1.3rem' }}></i>
                  </div>
                  <span className="text-slate-900 dark:text-white text-lg font-extrabold">{v.title}</span>
                  <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed m-0">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SMISTAMENTO / NAVIGAZIONE ══════════════ */}
      <section id="aree" className="bg-slate-50 dark:bg-dark-bg border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008C95', marginBottom: '0.6rem' }}>
              Le aree della formazione
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Trova il percorso formativo adatto a te
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Che tu sia un professionista, un&apos;azienda o un ente pubblico, Alètheia ha il percorso giusto. Clicca sulla categoria che ti interessa e scopri di più.
            </p>
          </div>

          <div className="aree-grid-fps">
            {verticali.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 90} className="h-full">
                <VerticaleCard {...v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CHIUSURA ══════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.3 }}>
            Non trovi il percorso formativo che cerchi?
          </h3>
          <a href="/all-courses" className="cta-btn-primary-fps">Visiona tutti i nostri corsi</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
