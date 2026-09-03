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
    area: 'a',
  },
  {
    title: 'Competenze allineate al mercato',
    text: 'Percorsi su misura su digitale, sostenibilità e organizzazione, non corsi standard.',
    area: 'b',
  },
  {
    title: 'Personale più motivato e trattenuto',
    text: 'Investire sulle persone riduce il turnover e rafforza il senso di appartenenza.',
    area: 'c',
  },
  {
    title: 'Un investimento sostenibile',
    text: 'Cresci sul capitale umano senza intaccare la liquidità aziendale.',
    area: 'd',
  },
];

const servizi = [
  'Analisi dei fabbisogni aziendali',
  'Verifica dei requisiti di accesso',
  'Progettazione del piano formativo',
  'Supporto nella predisposizione degli accordi previsti dalla misura',
  'Gestione della domanda',
  'Coordinamento delle attività formative',
  'Monitoraggio e rendicontazione finale',
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
          padding: 0.85rem 2rem;
          border-radius: 999px;
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
          padding: 0.85rem 2rem;
          border-radius: 999px;
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

        /* Bento grid vantaggi (asimmetrica) */
        .bento-vantaggi {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          grid-template-rows: auto auto;
          grid-template-areas:
            "a b b"
            "a c d";
          gap: 1.25rem;
          margin-top: 2.5rem;
        }
        .bento-vantaggi .area-a { grid-area: a; }
        .bento-vantaggi .area-b { grid-area: b; }
        .bento-vantaggi .area-c { grid-area: c; }
        .bento-vantaggi .area-d { grid-area: d; }
        @media (max-width: 900px) {
          .bento-vantaggi {
            grid-template-columns: 1fr;
            grid-template-areas: "a" "b" "c" "d";
          }
        }

        /* FAQ a 2 colonne */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-flow: column;
          grid-template-rows: repeat(2, auto);
          gap: 0.85rem 1.5rem;
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; grid-auto-flow: row; grid-template-rows: none; }
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

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Il Fondo Nuove Competenze è una misura ANPAL che permette alle imprese di destinare parte dell&apos;orario di lavoro alla formazione, ottenendo il rimborso delle ore dedicate all&apos;aggiornamento professionale. Pensato per accompagnare le aziende nella digitalizzazione, nella transizione ecologica e nell&apos;innovazione organizzativa senza rallentare il business. Con Alètheia verifichi i requisiti, progetti il percorso e gestisci l&apos;intera domanda con un unico partner.
          </p>

          <div className="fade-up fade-up-3">
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
              Il Fondo Nuove Competenze è rivolto alle imprese che desiderano preparare il proprio personale alle nuove esigenze del mercato. È particolarmente indicato per chi affronta:
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

      {/* ══════════════ VANTAGGI (BENTO GRID) ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
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

          <div className="bento-vantaggi">
            {vantaggi.map((v) => (
              <div
                key={v.title}
                className={`area-${v.area} bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]`}
                style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.6rem' }}
              >
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{v.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{v.text}</p>
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

          <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '2.5rem', marginTop: '2.5rem' }}>
            <span className="section-badge">Ci occupiamo di</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {servizi.map((s) => (
                <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check-circle" style={{ color: '#10B981', marginTop: '0.25rem', flexShrink: 0 }}></i>
                  <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            borderRadius: '1.25rem',
            padding: '2.5rem',
            marginTop: '2rem',
            background: isDark ? '#1f2937' : 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
            borderLeft: isDark ? '3px solid #10B981' : 'none',
            display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start',
          }}>
            <p style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.5,
              margin: 0,
            }}>
              Tu definisci gli obiettivi della tua impresa. Noi trasformiamo il progetto in un&apos;opportunità di finanziamento.
            </p>
            <a href="/contatti" className="cta-btn-primary">
              Parla con il nostro Team
              <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }}></i>
            </a>
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
                <div key={item.domanda} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="text-slate-900 dark:text-white"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <span>{item.domanda}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
                  </button>
                  {isOpen && (
                    <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.4rem 1.4rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                      {item.risposta}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA FINALE ══════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Hai i requisiti? Verifichiamolo insieme
          </h3>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Raccontaci il tuo progetto: analizzeremo gratuitamente la situazione della tua impresa, verificheremo i requisiti previsti dall&apos;avviso e ti indichiamo se il Fondo Nuove Competenze è lo strumento più adatto per finanziare la formazione dei tuoi dipendenti.
          </p>
          <a href="/contatti" className="cta-btn-primary">Richiedi una consulenza gratuita</a>
        </div>
      </section>

      <FormAzienda />

      <Footer />
    </>
  );
}
