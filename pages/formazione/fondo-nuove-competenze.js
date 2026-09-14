import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormAzienda from '../../components/FormAzienda';
import { useTheme } from '../../context/ThemeContext';

const target = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Transizione digitale',
    text: 'Nuovi software gestionali, cybersecurity, e-commerce, automazione, competenze digitali di base e avanzate.',
  },
  {
    icon: 'fas fa-leaf',
    title: 'Transizione ecologica',
    text: 'Sostenibilità, efficienza energetica, economia circolare, nuovi processi produttivi green.',
  },
  {
    icon: 'fas fa-sitemap',
    title: 'Innovazione organizzativa',
    text: 'Riorganizzazione dei processi, nuove figure professionali, cambiamenti tecnologici interni.',
  },
];

const vantaggi = [
  {
    title: 'Nessun blocco della produzione',
    text: 'La rimodulazione dell\'orario si progetta sulle esigenze reali dell\'azienda.',
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
  },
  {
    title: 'Competenze allineate al mercato',
    text: 'Percorsi su misura su digitale, sostenibilità e organizzazione, non corsi standard.',
    icon: <path d="M12 2a10 10 0 1 0 10 10M22 2 12 12M16 2h6v6" />,
  },
  {
    title: 'Personale più motivato e trattenuto',
    text: 'Investire sulle persone riduce il turnover e rafforza il senso di appartenenza.',
    icon: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
  },
  {
    title: 'Un investimento sostenibile',
    text: 'Cresci sul capitale umano senza intaccare la liquidità aziendale.',
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
];

const servizi = [
  {
    bold: 'Analisi',
    rest: ' dei fabbisogni aziendali',
    icon: <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35" />,
  },
  {
    bold: 'Verifica',
    rest: ' dei requisiti di accesso',
    icon: <path d="m9 12 2 2 4-4M12 3a9 9 0 0 0-8 4.7V17a9 9 0 0 0 16 0V7.7A9 9 0 0 0 12 3Z" />,
  },
  {
    bold: 'Progettazione',
    rest: ' del piano formativo',
    icon: <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" />,
    featured: true,
  },
  {
    bold: 'Supporto',
    rest: ' nella predisposizione degli accordi previsti dalla misura',
    icon: <path d="M9 12h6M9 16h6M8 3h8a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2Z" />,
  },
  {
    bold: 'Gestione',
    rest: ' della domanda',
    icon: <path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2m18 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-9 6-9-6" />,
  },
  {
    bold: 'Coordinamento',
    rest: ' delle attività formative',
    icon: <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  },
  {
    bold: 'Monitoraggio',
    rest: ' e rendicontazione finale',
    icon: <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />,
    featured: true,
  },
];

const faqs = [
  {
    domanda: 'Chi può accedere al Fondo Nuove Competenze?',
    risposta: 'Possono accedere le aziende private di ogni settore e dimensione che abbiano necessità di aggiornare le competenze dei propri dipendenti, previo accordo con i lavoratori o le rappresentanze sindacali.',
  },
  {
    domanda: 'Quanto costa alla mia azienda?',
    risposta: 'Le ore di lavoro destinate alla formazione sono coperte dal Fondo per la parte retributiva e contributiva. L\'azienda non sostiene il costo del lavoro relativo a quelle ore.',
  },
  {
    domanda: 'Che tipo di formazione posso attivare?',
    risposta: 'Percorsi orientati a transizione digitale, transizione ecologica e innovazione organizzativa, progettati sui reali fabbisogni della tua impresa.',
  },
  {
    domanda: 'Il Fondo è sempre attivo?',
    risposta: 'La misura viene rifinanziata a edizioni successive, con requisiti e finestre di apertura che possono variare. Contattaci per sapere se è attualmente attivabile e quali sono le condizioni aggiornate.',
  },
];

export default function FondoNuoveCompetenze() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>Fondo Nuove Competenze - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Il Fondo Nuove Competenze permette alle imprese di destinare parte dell'orario di lavoro alla formazione, ottenendo il rimborso del costo delle ore. Alètheia ti accompagna in ogni fase."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

      <main>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6EE7B7;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }
        .section-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #008C95;
          margin-bottom: 0.6rem;
        }
        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0 2rem;
          min-height: var(--btn-height-lg);
          white-space: nowrap;
          border-radius: var(--btn-radius);
          background: linear-gradient(90deg, #008C95, #10B981);
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,140,149,0.5);
        }
        .cta-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0 2rem;
          min-height: var(--btn-height-lg);
          white-space: nowrap;
          border-radius: var(--btn-radius);
          background: transparent;
          color: rgba(255,255,255,0.85);
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.22);
          transition: all 0.2s ease;
          font-family: inherit;
          cursor: pointer;
        }
        .cta-btn-outline:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.5);
        }

        /* Griglia target (transizione digitale / ecologica / organizzativa) */
        .target-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }
        @media (max-width: 900px) {
          .target-grid { grid-template-columns: 1fr; }
        }

        /* Vantaggi: layout minimale a 4 colonne, senza card/bordi/ombre */
        .vantaggi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          margin-top: 3rem;
          position: relative;
        }
        /* Linea sottile che collega le icone, come un "percorso" */
        .vantaggi-row::before {
          content: '';
          position: absolute;
          top: 1.375rem;
          left: calc(12.5% + 1.375rem);
          right: calc(12.5% + 1.375rem);
          height: 1px;
          background: #e2e8f0;
          z-index: 0;
        }
        .vantaggio-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.85rem;
          position: relative;
          z-index: 1;
        }
        .vantaggio-icon {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 140, 149, 0.1);
          color: #008C95;
          flex-shrink: 0;
        }
        .vantaggio-icon svg {
          width: 1.4rem;
          height: 1.4rem;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .vantaggio-item h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }
        .vantaggio-item p {
          font-size: 0.9rem;
          font-weight: 400;
          color: #64748b;
          margin: 0;
          line-height: 1.75;
        }
        :global(.dark) .vantaggi-row::before {
          background: rgba(255, 255, 255, 0.08);
        }
        :global(.dark) .vantaggio-item h3 {
          color: #F8FAFC;
        }
        :global(.dark) .vantaggio-item p {
          color: #CBD5E1;
        }
        @media (max-width: 900px) {
          .vantaggi-row { grid-template-columns: 1fr; gap: 2rem; }
          .vantaggi-row::before { display: none; }
        }

        /* Bento grid servizi */
        .bento-servizi {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 1fr;
          align-items: stretch;
          gap: 1.25rem;
          margin-top: 1.75rem;
        }
        .bento-card {
          --card-border: #e2e8f0;
          background: #ffffff;
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: flex-start;
          height: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          grid-column: span 1;
        }
        .bento-card:hover {
          transform: translateY(-4px);
          border-color: #10B981;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
        }
        .bento-card.featured {
          grid-column: span 2;
          background: linear-gradient(135deg, #f0fdfa 0%, #ffffff 60%);
        }
        /* "Coordinamento" (6° card nel DOM) chiude la griglia a piena larghezza */
        .bento-card:nth-child(6) {
          order: 7;
          grid-column: span 4;
        }
        /* "Monitoraggio" (7° card, featured) si sposta prima, a chiudere la 2° riga */
        .bento-card:nth-child(7) {
          order: 6;
        }
        .bento-card .bento-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          flex-shrink: 0;
        }
        .bento-card .bento-icon svg {
          width: 1.25rem;
          height: 1.25rem;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .bento-card p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.65;
          color: #475569;
        }
        .bento-card p b {
          color: #0f172a;
          font-weight: 800;
        }
        :global(.dark) .bento-card {
          --card-border: rgba(255,255,255,0.08);
          background: #1f2937;
        }
        :global(.dark) .bento-card.featured {
          background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, #1f2937 60%);
        }
        :global(.dark) .bento-card p {
          color: #CBD5E1;
        }
        :global(.dark) .bento-card p b {
          color: #F8FAFC;
        }
        @media (max-width: 900px) {
          .bento-servizi { grid-template-columns: repeat(2, 1fr); }
          .bento-card.featured,
          .bento-card:nth-child(6) { grid-column: span 2; }
        }
        @media (max-width: 640px) {
          .bento-servizi { grid-template-columns: 1fr; }
          .bento-card.featured,
          .bento-card:nth-child(6) { grid-column: span 1; order: initial; }
        }

        /* FAQ a 2 colonne indipendenti: ogni colonna impila le proprie card
           senza sincronizzare l'altezza di riga, così aprire una domanda
           non "spinge" o lascia buchi accanto alle altre */
        .faq-grid {
          column-count: 2;
          column-gap: 1.5rem;
        }
        .faq-item {
          break-inside: avoid;
          margin-bottom: 0.85rem;
        }
        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.28s ease;
        }
        .faq-answer-wrap.open {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
          min-height: 0;
        }
        .faq-chevron {
          transition: transform 0.25s ease;
        }
        .faq-chevron.open {
          transform: rotate(180deg);
        }
        @media (max-width: 768px) {
          .faq-grid { column-count: 1; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
        paddingTop: '120px',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true">›</span>
            <a href="/formazione/regionale-fse" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Formazione Finanziata</a>
            <span aria-hidden="true">›</span>
            <span style={{ color: '#6EE7B7' }}>Fondo Nuove Competenze</span>
          </nav>

          <span className="fade-up" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#10B981', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
            Fondo Nuove Competenze
          </span>

          <div className="hero-badge fade-up fade-up-1">Formazione senza costi retributivi</div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Fondo{' '}
            <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Nuove Competenze
            </span>
          </h1>

          <div className="fade-up fade-up-3" style={{ marginTop: '2.5rem' }}>
            <a href="/contatti" className="cta-btn-primary">
              Verifica se la tua azienda può accedere
              <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ A CHI SI RIVOLGE ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">A chi si rivolge</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Pensato per le aziende che vogliono crescere senza fermarsi
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', marginTop: '1rem', lineHeight: 1.85 }}>
              Il Fondo Nuove Competenze è una misura ANPAL che permette alle imprese di destinare parte dell&apos;orario di lavoro alla formazione, ottenendo il rimborso delle ore dedicate all&apos;aggiornamento professionale. È particolarmente indicato per chi affronta:
            </p>
          </div>

          <div className="target-grid">
            {target.map((t) => (
              <div
                key={t.title}
                className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
                style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={t.icon} style={{ fontSize: '1.2rem', color: '#008C95' }}></i>
                </div>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{t.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{t.text}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginTop: '2rem', fontWeight: 600 }}>
            Se la tua impresa sta evolvendo, il Fondo Nuove Competenze può diventare uno strumento concreto per accompagnare il cambiamento.
          </p>
        </div>
      </section>

      {/* ══════════════ VANTAGGI (layout minimale, no card) ══════════════ */}
      <section className="dark:bg-dark-bg" style={{ padding: '5rem 0', background: isDark ? undefined : '#f4f6f9' }}>
        <div className="container">
          <div>
            <span className="section-badge">I vantaggi per la tua azienda</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Investi sulle competenze senza rallentare la crescita
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.85 }}>
              Il Fondo Nuove Competenze ti permette di aggiornare il capitale umano trasformando la formazione in un investimento sostenibile.
            </p>
          </div>

          <div className="vantaggi-row">
            {vantaggi.map((v) => (
              <div key={v.title} className="vantaggio-item">
                <span className="vantaggio-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{v.icon}</svg>
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ VALORE ALÈTHEIA ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">Il tuo ente di fiducia</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Un unico partner per progettare e gestire il Fondo Nuove Competenze
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              Accedere al Fondo Nuove Competenze richiede competenze tecniche, progettazione accurata e una gestione amministrativa puntuale. Per questo Alètheia segue direttamente tutte le fasi del progetto. Il Fondo Nuove Competenze richiede un&apos;istanza strutturata: accordo sindacale o con i lavoratori, progetto formativo coerente con i fabbisogni, corretta quantificazione delle ore e delle competenze in uscita, rendicontazione puntuale. Un errore in fase di presentazione può costare l&apos;accesso al contributo.
            </p>
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <span className="hero-badge" style={{ color: '#059669', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>Servizi</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', fontWeight: 900, margin: 0 }}>
              Ci occupiamo di
            </h2>

            <div className="bento-servizi">
              {servizi.map((s) => (
                <div key={s.bold} className={`bento-card${s.featured ? ' featured' : ''}`}>
                  <span className="bento-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">{s.icon}</svg>
                  </span>
                  <p><b>{s.bold}</b>{s.rest}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge">Domande frequenti</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Fondo Nuove Competenze: le domande più comuni
            </h2>
          </div>

          <div className="faq-grid">
            {faqs.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.domanda} className="faq-item bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="text-slate-900 dark:text-white"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <span>{item.domanda}</span>
                    <i className={`fas fa-chevron-down faq-chevron${isOpen ? ' open' : ''}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
                  </button>
                  <div className={`faq-answer-wrap${isOpen ? ' open' : ''}`}>
                    <div className="faq-answer-inner">
                      <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.4rem 1.4rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                        {item.risposta}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FormAzienda
        title={<>Tu definisci gli obiettivi della tua impresa.<br />Noi trasformiamo il progetto in un&apos;opportunità di finanziamento.</>}
        subtitle="Compila il form e raccontaci il tuo progetto. Il nostro Team analizzerà gratuitamente la situazione della tua impresa."
      />

      </main>
      <Footer />
    </>
  );
}
