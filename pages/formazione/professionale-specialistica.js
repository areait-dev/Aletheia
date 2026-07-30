import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const heroBadges = [
  { icon: 'fas fa-award', label: 'Ente accreditato Regione Siciliana' },
  { icon: 'fas fa-laptop-code', label: 'Test Center AICA' },
  { icon: 'fas fa-user-doctor', label: 'Provider ECM' },
];

const valori = [
  {
    icon: 'fas fa-lightbulb',
    title: 'Contenuti aggiornati',
    text: "Programmi progettati con docenti professionisti, non teoria fine a sé stessa, ma competenze che funzionano fuori dall'aula.",
  },
  {
    icon: 'fas fa-file-circle-check',
    title: 'Certificazioni riconosciute',
    text: 'ICDL, qualifiche professionali, crediti ECM, titoli e certificazioni con valore reale sul mercato del lavoro, nei concorsi pubblici e nelle graduatorie scolastiche.',
  },
  {
    icon: 'fas fa-bullseye',
    title: 'Percorsi su misura',
    text: 'Per privati e PA. In aula, online o direttamente presso il tuo ente.',
  },
];

const verticali = [
  {
    badge: 'Riconosciute in 150+ paesi',
    title: 'Certificazioni informatiche ICDL',
    text: 'La certificazione ICDL è lo standard europeo per le competenze digitali — riconosciuta in oltre 150 paesi, richiesta nei concorsi pubblici, valida per le graduatorie scolastiche e sempre più richiesta dalle aziende nei processi di selezione. Alètheia è Test Center AICA qualificato, gli esami si sostengono direttamente nella nostra sede di Vittoria (RG), senza spostamenti.',
    icon: 'fas fa-laptop-code',
    cta: 'Scopri le certificazioni',
    href: '/all-courses?categoria=certificazioni-informatiche',
  },
  {
    badge: 'Qualifiche professionali riconosciute',
    title: 'Corsi Qualificati',
    text: 'Percorsi di qualifica e riqualificazione professionale per acquisire competenze certificate e nuove opportunità lavorative. Pensati per chi vuole specializzarsi in un settore, cambiare professione o rafforzare il proprio profilo con titoli riconosciuti a livello nazionale. Ogni corso si conclude con un attestato o una qualifica professionale inserita nel Repertorio Nazionale, spendibile subito nel mercato del lavoro.',
    icon: 'fas fa-certificate',
    cta: 'Scopri i corsi qualificati',
    href: '/all-courses?categoria=certificazione',
  },
  {
    badge: 'Educazione Continua in Medicina',
    title: 'Corsi ECM',
    text: "La formazione continua non è un'opzione per i professionisti della salute — è un requisito. Il sistema ECM obbliga medici, infermieri, farmacisti e tutti gli operatori sanitari ad acquisire crediti formativi ogni anno. Alètheia è Provider ECM accreditato e progetta percorsi specifici per operatori sanitari e sociosanitari, contenuti aggiornati, crediti certificati, modalità flessibili per chi lavora in corsia e non può fermarsi.",
    icon: 'fas fa-user-doctor',
    cta: 'Scopri i corsi ECM',
    href: '/formazione/ecm',
  },
  {
    badge: 'Percorsi su misura per enti pubblici',
    title: 'Formazione per la Pubblica Amministrazione',
    text: 'Gli enti pubblici hanno esigenze formative specifiche, normative in continua evoluzione, digitalizzazione dei processi, anticorruzione, trasparenza, gestione dei procedimenti amministrativi. Alètheia progetta percorsi dedicati al personale della PA, erogabili direttamente presso la sede dell\'ente con docenti specializzati in ambito istituzionale. Formazione che rispetta i tempi e le esigenze operative della Pubblica Amministrazione.',
    icon: 'fas fa-landmark',
    cta: 'Scopri la formazione PA',
    href: '/formazione/corsi-pa',
  },
];

function VerticaleCard({ badge, title, text, icon, cta, href }) {
  return (
    <a
      href={href}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] group area-nav-card"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
    >
      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }} className="group-hover:bg-[#008C95]">
        <i className={icon} style={{ fontSize: '1.35rem', color: '#008C95' }}></i>
      </div>

      <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#008C95' }}>
        {badge}
      </span>

      <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, lineHeight: 1.3 }}>{title}</h3>

      <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.88rem', lineHeight: 1.8, margin: 0, flex: 1 }}>{text}</p>

      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {cta} <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
      </span>
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
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

        .aree-grid-fps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        @media (max-width: 800px) { .aree-grid-fps { grid-template-columns: 1fr; } }

        .area-nav-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
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
            Corsi qualificati, certificazioni riconosciute e percorsi formativi per persone, aziende e Pubblica Amministrazione. Alètheia progetta percorsi professionalizzanti con un obiettivo preciso: competenze concrete, riconosciute, immediatamente spendibili. Dalle certificazioni informatiche ICDL ai corsi ECM per operatori sanitari, dai corsi qualificati ai percorsi su misura per la Pubblica Amministrazione, un unico partner per aggiornare le tue competenze o quelle della tua organizzazione.
          </p>

          <div className="fade-up fade-up-3">
            <a href="#aree" className="cta-btn-primary-fps">Scopri i nostri corsi</a>
          </div>
        </div>
      </section>

      {/* ══════════════ FORMAZIONE CHE CREA VALORE ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center' }}>
            Formazione che crea valore, non solo attestati
          </h3>
          <div className="valori-grid-fps">
            {valori.map((v) => (
              <div key={v.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.75rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={v.icon} style={{ color: '#008C95', fontSize: '1.15rem' }}></i>
                </div>
                <span className="text-slate-900 dark:text-white" style={{ fontSize: '1rem', fontWeight: 800 }}>{v.title}</span>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.75, margin: 0, maxWidth: '320px' }}>{v.text}</p>
              </div>
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
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Che tu sia un professionista, un&apos;azienda o un ente pubblico, Alètheia ha il percorso giusto. Clicca sulla categoria che ti interessa e scopri di più.
            </p>
          </div>

          <div className="aree-grid-fps">
            {verticali.map((v) => (
              <VerticaleCard key={v.title} {...v} />
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
