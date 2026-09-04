import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormAzienda from '../../components/FormAzienda';

const vantaggi = [
  'Formazione a costo zero (o quasi): i corsi sono finanziati dal Fondo, non dal bilancio aziendale',
  'Percorsi su misura: progettati sui reali fabbisogni della tua azienda, non corsi standard',
  'Dipendenti più competenti e aggiornati, senza dover trovare budget extra',
  'Più produttività e competitività, con un investimento che non pesa sui costi correnti',
  'Valorizzare risorse che altrimenti resterebbero inutilizzate',
];

const partner = ['Fondimpresa', 'Fon.Ter', 'For.Agri'];

const faqs = [
  {
    domanda: 'Chi può accedere ai Fondi Interprofessionali?',
    risposta: 'Tutte le aziende con dipendenti, di qualsiasi settore e dimensione, che versano già il contributo obbligatorio dello 0,30% all\'INPS. Basta aderire al Fondo scelto: l\'adesione è gratuita e non comporta costi aggiuntivi.',
  },
  {
    domanda: 'Quanto costa alla mia azienda?',
    risposta: 'Nulla di aggiuntivo: i corsi sono finanziati dal Fondo con le risorse che l\'azienda versa già per legge tramite i contributi INPS. Non è un incentivo da richiedere, ma un contributo già dovuto da attivare.',
  },
  {
    domanda: 'Quale Fondo devo scegliere per la mia azienda?',
    risposta: 'Dipende dal settore e dal CCNL applicato (es. Fon.Ter, For.Agri, Fondimpresa e altri). Il nostro team verifica gratuitamente qual è il Fondo più adatto e ti segue nell\'attivazione.',
  },
  {
    domanda: 'Quanto tempo serve per attivare un percorso formativo?',
    risposta: 'I tempi variano in base al Fondo e all\'avviso di riferimento. Alètheia segue l\'intero iter, dall\'analisi dei fabbisogni alla progettazione, per rendere il processo il più rapido possibile.',
  },
];

export default function FondiInterprofessionali() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <>
      <Head>
        <title>Fondi Interprofessionali per Aziende - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Trasforma i contributi INPS che la tua azienda versa già in formazione gratuita per i dipendenti attraverso i Fondi Paritetici Interprofessionali. Alètheia gestisce tutto il processo."
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

        /* Loghi partner scorrevoli */
        .partner-row {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
        }
        .partner-row::-webkit-scrollbar { height: 6px; }
        .partner-row::-webkit-scrollbar-thumb { background: rgba(0,140,149,0.25); border-radius: 999px; }
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
            <span style={{ color: '#6EE7B7' }}>Fondi Interprofessionali</span>
          </nav>

          <div className="hero-badge fade-up">Formazione finanziata per le aziende</div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '820px' }}>
            Trasforma i contributi che versi in{' '}
            <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              formazione gratuita
            </span>{' '}
            per i tuoi dipendenti
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Ogni azienda versa già lo 0,30% dei contributi INPS destinato alla formazione continua. Attraverso i Fondi Interprofessionali quelle risorse diventano percorsi formativi senza costi aggiuntivi per l&apos;impresa. Alètheia ti accompagna in ogni fase del processo: analizziamo i fabbisogni formativi, individuiamo il Fondo più adatto, progettiamo il piano formativo e gestiamo tutta la parte amministrativa fino alla rendicontazione finale.
          </p>

          <div className="fade-up fade-up-3">
            <a href="/contatti" className="cta-btn-primary">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESSO & VANTAGGI AZIENDALI ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          {/* Blocco attivazione */}
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="section-badge">Formazione a costo zero</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Attivare un Fondo Interprofessionale è più semplice di quanto pensi
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              L&apos;adesione a un Fondo Interprofessionale è gratuita e non comporta costi aggiuntivi per l&apos;azienda. Una volta individuato il Fondo più adatto al tuo settore, le risorse accantonate possono finanziare percorsi di formazione costruiti sulle reali esigenze della tua impresa. Alètheia gestisce l&apos;intero processo, dalla verifica delle opportunità disponibili alla progettazione dei corsi, fino alla gestione documentale e alla rendicontazione.
            </p>
          </div>

          {/* Blocco vantaggi */}
          <div>
            <span className="section-badge">I vantaggi per la tua impresa</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Investi nelle competenze dei tuoi dipendenti
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Utilizzare i Fondi Interprofessionali significa trasformare un contributo già versato in un&apos;opportunità concreta di crescita. I vantaggi per le aziende che aderiscono ai Fondi Interprofessionali sono:
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {vantaggi.map((v) => (
                <li key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check-circle" style={{ color: '#10B981', marginTop: '0.25rem', flexShrink: 0 }}></i>
                  <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════ IL VALORE DI ALÈTHEIA & PARTNER ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">Perché scegliere Alètheia</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Un unico partner per progettare, finanziare e gestire la formazione aziendale
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              La vera difficoltà non è trovare i finanziamenti, ma gestire correttamente tutto il percorso. Scelta del fondo, analisi dei fabbisogni, progettazione, gestione amministrativa e rendicontazione richiedono tempo e competenze specifiche. Con Alètheia tutto questo diventa semplice: affianchiamo le imprese in ogni fase, dalla prima analisi fino alla rendicontazione finale. Non è necessario avere già un progetto definito, bastano poche informazioni e noi le trasformiamo in un piano formativo finanziato e pronto per essere realizzato. Concentrati sulla tua azienda. Alla formazione dei tuoi dipendenti ci pensiamo noi, a costo zero.
            </p>
          </div>

          {/* Loghi partner */}
          <div style={{ marginTop: '3rem' }}>
            <span className="section-badge">I nostri Fondi partner</span>
            <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.5rem', lineHeight: 1.3 }}>
              I fondi con cui operiamo
            </h3>

            <div className="partner-row">
              {partner.map((p) => (
                <div
                  key={p}
                  className="bg-white dark:bg-dark-card border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-600 dark:text-gray-500"
                  style={{
                    flex: '0 0 220px',
                    height: '120px',
                    border: '1px dashed',
                    borderRadius: '1rem',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                  aria-label={`Logo ${p} (placeholder)`}
                >
                  <i className="far fa-image" style={{ fontSize: '1.5rem' }} aria-hidden="true"></i>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: '0 0 0.5rem', lineHeight: 1.25 }}>
              Domande frequenti
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              FAQ sui Fondi Interprofessionali per le aziende
            </p>
          </div>

          <div className="faq-grid">
            {faqs.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.domanda} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
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
            Non sai da dove iniziare?
          </h3>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '680px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Non tutti i fondi sono uguali e non tutti i percorsi fanno per te. Raccontaci la tua situazione, in pochi minuti selezioniamo il fondo da attivare e i corsi disponibili per la tua azienda.
          </p>
          <a href="/contatti" className="cta-btn-primary">Richiedi una consulenza gratuita</a>
        </div>
      </section>

      <FormAzienda />

      </main>
      <Footer />
    </>
  );
}
