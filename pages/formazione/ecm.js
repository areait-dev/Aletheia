import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';

const modalita = [
  {
    title: 'Residenziale (RES)',
    text: 'Corsi, convegni e congressi in aula presso le nostre sedi o presso strutture sanitarie.',
  },
  {
    title: 'A distanza (FAD)',
    text: 'Percorsi online fruibili in autonomia, compatibili con i turni di lavoro.',
  },
  {
    title: 'Sul campo e su commessa',
    text: 'Progetti formativi su misura per strutture sanitarie, poliambulatori, RSA ed enti del territorio.',
  },
];

const faqs = [
  {
    domanda: 'Che cosa sono i crediti ECM?',
    risposta: "I crediti ECM sono crediti formativi assegnati ai professionisti sanitari che partecipano ad attività di Educazione Continua in Medicina riconosciute dal sistema ECM nazionale. Attestano l'impegno del professionista nell'aggiornamento costante delle proprie competenze.",
  },
  {
    domanda: 'Chi è obbligato ad acquisire i crediti ECM?',
    risposta: "L'obbligo ECM riguarda tutti i professionisti sanitari iscritti ai rispettivi ordini e albi che esercitano attività sanitaria, sia in regime dipendente sia libero-professionale.",
  },
  {
    domanda: 'Quanti crediti ECM devo acquisire?',
    risposta: 'Il fabbisogno formativo è definito per trienni dalla normativa nazionale. Il numero effettivo di crediti da maturare può variare in base a esoneri, esenzioni e alla situazione individuale del professionista. Ti aiutiamo a verificare la tua posizione e a pianificare i corsi necessari.',
  },
  {
    domanda: 'I corsi ECM di Alètheia rilasciano crediti validi?',
    risposta: 'Sì. In qualità di provider ECM accreditato, Alètheia rilascia direttamente i crediti formativi al termine delle attività, secondo le regole del sistema ECM.',
  },
  {
    domanda: 'Cosa succede se non raggiungo i crediti ECM richiesti?',
    risposta: 'Il mancato assolvimento dell\'obbligo formativo ECM può avere conseguenze sul piano professionale e assicurativo, ed è oggetto di verifica da parte degli ordini professionali. Frequentare corsi accreditati con regolarità è il modo più semplice per mantenersi in regola.',
  },
  {
    domanda: 'Dove posso frequentare corsi ECM in Sicilia?',
    risposta: 'Alètheia organizza corsi ECM in tutta la Sicilia come provider accreditato, con attività in aula presso le proprie sedi in provincia di Ragusa, presso strutture sanitarie e in modalità FAD online.',
  },
];

export default function FormazioneECM() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeModalita, setActiveModalita] = useState(0);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>Corsi ECM per Professionisti Sanitari - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corsi ECM accreditati per medici, infermieri, fisioterapisti e OSS. Alètheia, provider ECM accreditato dalla Regione Siciliana."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

      <main>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        
        .cta-btn-primary-ecm {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0 2rem; min-height: var(--btn-height-lg); border-radius: var(--btn-radius);
          white-space: nowrap;
          background: #008C95; color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary-ecm:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }
        .cta-btn-outline-ecm {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0 2rem; min-height: var(--btn-height-lg); border-radius: var(--btn-radius); background: transparent;
          white-space: nowrap;
          color: rgba(255,255,255,0.85); font-weight: 700; font-size: 0.95rem; text-decoration: none;
          border: 2px solid rgba(255,255,255,0.22); transition: all 0.2s ease;
          font-family: inherit; cursor: pointer;
        }
        .cta-btn-outline-ecm:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }

        /* Proposta formativa: tab selezionabili in riga, un solo blocco di testo
           visibile alla volta — non card ripetute (pattern già usato ovunque nel sito). */
        .modalita-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid #E2E8F0; margin-bottom: 1.75rem; }
        :global(.dark) .modalita-tabs { border-color: rgba(255,255,255,0.1); }
        .modalita-tab {
          background: none; border: none; cursor: pointer; font-family: inherit;
          font-weight: 700; font-size: 0.95rem; padding: 0.85rem 0.25rem; margin-right: 1.75rem;
          color: var(--muted-text); border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        :global(.dark) .modalita-tab { color: rgba(255,255,255,0.4); }
        .modalita-tab.active { color: #008C95; border-color: #008C95; }
        :global(.dark) .modalita-tab.active { color: #10B981; border-color: #10B981; }

        .faq-grid-ecm { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem 1.5rem; align-items: start; }
        @media (max-width: 800px) { .faq-grid-ecm { grid-template-columns: 1fr; } }

        .ecm-contact-card-info { padding: 2.5rem; }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="page-hero page-hero--dark page-hero--left">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <div className="page-hero-badge fade-up">Educazione Continua in Medicina</div>

            <h1 className="fade-up fade-up-1">
              Corsi{' '}
              <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ECM
              </span>
              {' '}per professionisti sanitari
            </h1>

            <div className="page-hero-actions fade-up fade-up-3">
              <a href="/contatti" className="cta-btn-outline-ecm">Contattaci</a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════ IL VALORE DEL PROVIDER ACCREDITATO ══════════════ */}
      <section id="corsi" className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">Provider ECM accreditato · Regione Siciliana</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25, maxWidth: '960px' }}>
            Formazione continua per i professionisti della sanità
          </h2>
          <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, maxWidth: '960px', margin: '0 0 1.5rem' }}>
            Alètheia S.r.l. è provider ECM accreditato dalla Regione Siciliana, abilitato alla progettazione e realizzazione di attività formative rivolte ai professionisti sanitari. Non tutti gli enti che erogano formazione sanitaria possono assegnare crediti ECM.
          </p>
          <p className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.7, maxWidth: '960px', margin: 0, borderLeft: '3px solid #008C95', paddingLeft: '1.25rem' }}>
            Alètheia rilascia direttamente i crediti ECM al termine delle attività, secondo le regole del sistema nazionale.
          </p>
        </div>
      </section>

      {/* ══════════════ TARGET & PROPOSTA FORMATIVA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">La proposta formativa</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
            Corsi ECM in aula e in FAD, in tutta la Sicilia
          </h2>
          <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '760px', marginBottom: '2rem' }}>
            Alètheia organizza attività formative accreditate in diverse modalità, per adattarsi ai tempi e alle esigenze dei professionisti sanitari.
          </p>

          <div className="modalita-tabs">
            {modalita.map((m, i) => (
              <button
                key={m.title}
                type="button"
                onClick={() => setActiveModalita(i)}
                className={`modalita-tab ${activeModalita === i ? 'active' : ''}`}
              >
                {m.title}
              </button>
            ))}
          </div>

          <p className="text-slate-700 dark:text-gray-300" style={{ fontSize: '1rem', lineHeight: 1.85, maxWidth: '760px', margin: 0 }}>
            {modalita[activeModalita].text}
          </p>

          <p className="text-slate-700 dark:text-gray-300" style={{ margin: '3rem 0 0', fontSize: '1rem', fontStyle: 'italic', lineHeight: 1.8, borderLeft: '3px solid #008C95', paddingLeft: '1.25rem', maxWidth: '860px' }}>
            Grazie all&apos;esperienza e alla rete di docenti qualificati di Promotergroup, Alètheia affianca aziende sanitarie e singoli professionisti nella pianificazione del proprio percorso di aggiornamento.
          </p>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">FAQ</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.25 }}>
            Domande frequenti sui corsi ECM
          </h2>

          <div className="faq-grid-ecm">
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
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: isDark ? '#6EE7B7' : '#008C95', flexShrink: 0 }}></i>
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

      {/* ══════════════ CONTATTI & FORM ══════════════ */}
      <section id="contatti-ecm" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div
            className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
            style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}
          >
            <div>
              <div className="ecm-contact-card-info">
                <span className="section-badge">Parliamone</span>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  Vuoi saperne di più sui corsi ECM?
                </h3>
                <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
                  Il nostro team è a disposizione per fornirti tutte le informazioni sui corsi ECM disponibili e sui crediti formativi acquisibili.
                </p>

                <a href="tel:+390932862613" className="text-slate-900 dark:text-white" style={{ display: 'block', fontSize: '1.25rem', fontWeight: 800, textDecoration: 'none', marginBottom: '0.5rem' }}>
                  +39 0932 862613
                </a>
                <a href="mailto:info@aletheiasrl.it" className="text-[#008C95] dark:text-[#10B981]" style={{ display: 'block', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}>
                  info@aletheiasrl.it
                </a>

                <a href="/contatti" className="cta-btn-primary-ecm" style={{ marginTop: '1.75rem' }}>Contattaci</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
