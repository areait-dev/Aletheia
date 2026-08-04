import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const avvisi = [
  {
    badge: 'Corsi con qualifica professionale',
    logo: 'POC Sicilia',
    title: 'Avviso 1/2026 POC',
    text: 'Percorsi di formazione professionale finanziati dal Programma Operativo Complementare Sicilia, finalizzati al conseguimento di una qualifica professionale riconosciuta e spendibile nel mercato del lavoro.',
    modalita: 'Aula (o variabile)',
    href: '/calendario-corsi',
  },
  {
    badge: 'Disoccupati - NASpI - ADI',
    logo: 'UE · Ministero del Lavoro · GOL',
    title: 'Avviso 6/2025 GOL – Garanzia di Occupabilità dei Lavoratori',
    text: 'Il Programma GOL – Garanzia di Occupabilità dei Lavoratori finanzia percorsi di formazione gratuiti dedicati a chi desidera aggiornare le proprie competenze e rientrare rapidamente nel mondo del lavoro. Rivolto a disoccupati, beneficiari di NASpI, Assegno di Inclusione e altre categorie previste dal programma.',
    modalita: 'Aula (o variabile)',
    href: '/calendario-corsi',
  },
  {
    badge: 'Qualifica, Stage, Indennità di frequenza',
    logo: 'Coesione Italia · Cofinanziato UE · Ministero',
    title: 'Avviso 7/2023 - II Finestra',
    text: 'Percorsi rivolti a disoccupati e inoccupati che prevedono una qualifica professionale riconosciuta, indennità di frequenza e stage presso aziende partner.',
    modalita: 'Aula + Stage (o variabile)',
    href: '/archivio/avviso-7-2023',
  },
  {
    badge: 'Assistente Familiare',
    logo: 'Coesione Italia · Cofinanziato UE · Ministero',
    title: 'Avviso n. 20/2024 FSE+',
    text: 'Percorso finanziato dedicato alla formazione della figura professionale di Assistente Familiare, sempre più richiesta nel settore socio-assistenziale. Il corso comprende formazione teorica, attività pratiche e rilascio della qualifica professionale.',
    durata: '300 ore',
    modalita: 'Aula + Stage',
    href: '/all-courses/avviso-20-2024-fse',
  },
];

const requisiti = [
  'Residenti o domiciliati in Sicilia',
  'Persone tra i 18 e i 65 anni (salvo requisiti specifici)',
  'Disoccupati, inoccupati, inattivi o beneficiari di misure di sostegno al reddito',
  'Utenti presi in carico dal Centro per l\'Impiego quando previsto',
  'Cittadini extra UE con permesso di soggiorno valido',
  'Candidati in possesso del titolo di studio richiesto dal corso',
];

const puntiDiForza = [
  { icon: 'fas fa-euro-sign', text: 'Formazione completamente gratuita' },
  { icon: 'fas fa-chalkboard-teacher', text: 'Docenti qualificati e materiale incluso' },
  { icon: 'fas fa-briefcase', text: 'Stage in azienda' },
  { icon: 'fas fa-certificate', text: 'Qualifiche riconosciute a livello regionale e nazionale' },
];

const faqs = [
  {
    domanda: 'Come si accede ai corsi di formazione regionale gratuiti in Sicilia?',
    risposta: 'Per accedere ai corsi di formazione regionale in Sicilia è necessario possedere i requisiti previsti dallo specifico bando o avviso pubblico (come lo stato di disoccupazione, la residenza in Sicilia o specifiche fasce d\'età) e presentare la domanda di iscrizione direttamente presso il nostro ente Alètheia, che ti supporterà in tutta la fase di verifica e presentazione.',
  },
];

function AvvisoCard({ badge, logo, title, text, durata, modalita, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }} />
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
        <span style={{ fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '0.25rem 0.65rem', borderRadius: '999px', width: 'fit-content' }}>
          {badge}
        </span>

        {/* Placeholder loghi ente/programma - da sostituire con le immagini reali quando disponibili */}
        <div
          className="border-slate-200 dark:border-[rgba(255,255,255,0.1)] text-slate-400 dark:text-gray-500"
          style={{ border: '1px dashed', borderRadius: '0.6rem', padding: '0.5rem 0.75rem', fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <i className="far fa-image" aria-hidden="true"></i>
          <span>{logo}</span>
        </div>

        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1rem', fontWeight: 800, margin: 0, lineHeight: 1.35 }}>{title}</h3>
        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem', lineHeight: 1.7, margin: 0, flex: 1 }}>{text}</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {durata && (
            <span className="text-slate-600 dark:text-gray-300" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
              <i className="fas fa-clock" style={{ color: '#008C95', fontSize: '0.7rem' }}></i>
              {durata}
            </span>
          )}
          <span className="text-slate-600 dark:text-gray-300" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}>
            <i className="fas fa-laptop" style={{ color: '#008C95', fontSize: '0.7rem' }}></i>
            {modalita}
          </span>
        </div>

        <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s' }}>
            Scopri {durata ? 'il corso' : 'i corsi'}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function FormazioneRegionale() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <>
      <Head>
        <title>Formazione Regionale - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Percorsi di formazione regionale finanziati dalla Regione Siciliana: FSE+, POC Sicilia, Garanzia Giovani e Programma G.O.L. Spesso gratuiti per i partecipanti."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
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

        .avvisi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1100px) {
          .avvisi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .avvisi-grid { grid-template-columns: 1fr; }
        }

        .requisiti-valore-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 900px) {
          .requisiti-valore-grid { grid-template-columns: 1fr; }
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
      `}</style>

      {/* ── HERO ── */}
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
            <span style={{ color: '#6EE7B7' }}>Formazione Regionale</span>
          </nav>

          <div className="hero-badge fade-up">
            Formazione Finanziata
          </div>

          <h1 className="fade-up fade-up-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            maxWidth: '700px',
          }}>
            Formazione{' '}
            <span style={{
              background: 'linear-gradient(90deg, #10B981, #008C95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Regionale
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '820px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Percorsi formativi finanziati dalla Regione Siciliana attraverso avvisi pubblici europei e nazionali. Spesso completamente gratuiti per i partecipanti.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#avvisi" className="cta-btn-primary">Vedi gli avvisi</a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ flex: 1 }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#008C95', marginBottom: '0.5rem' }}>
              Fondi regionali per la formazione
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Avvisi pubblici della{' '}
              <span style={{ color: '#008C95' }}>Regione Siciliana</span>
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              La Formazione Regionale comprende tutti i percorsi attivati attraverso avvisi pubblici finanziati dalla Regione Siciliana, spesso in co-finanziamento con fondi europei (FSE+, FESR) o nazionali (PNRR). Alètheia Srl è ente accreditato dalla Regione Siciliana (DDG n. 78/2017) e gestisce questi percorsi dalla progettazione alla rendicontazione finale, garantendo la massima qualità e conformità normativa.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ DETTAGLIO CORSI GRATUITI REGIONALI ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 420px', minWidth: '280px' }}>
              <span className="section-badge">Corsi gratuiti in Sicilia FSE+, GOL, POC</span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
                Corsi di formazione gratuiti in Sicilia con qualifica riconosciuta
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                Cerchi corsi gratuiti in Sicilia per trovare lavoro, cambiare professione o acquisire nuove competenze? Alètheia è un Ente di Formazione accreditato dalla Regione Siciliana e realizza percorsi finanziati attraverso FSE+, Programma GOL, POC Sicilia e altri programmi regionali, rivolti a disoccupati, inoccupati e persone in cerca di nuove opportunità professionali. I corsi sono completamente gratuiti e possono includere qualifica professionale riconosciuta, indennità di frequenza e stage presso aziende del territorio, per trasformare la formazione in una concreta opportunità di inserimento lavorativo.
              </p>
              <a href="#avvisi" className="cta-btn-primary">Scopri i corsi</a>
            </div>

            {/* Placeholder logo Regione Siciliana */}
            <div
              className="bg-white dark:bg-dark-card border-slate-200 dark:border-[rgba(255,255,255,0.08)] text-slate-400 dark:text-gray-500"
              style={{ flex: '0 0 260px', minWidth: '220px', height: '220px', border: '1px dashed', borderRadius: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
              aria-label="Logo Regione Siciliana (placeholder)"
            >
              <i className="fas fa-image" style={{ fontSize: '2.25rem' }} aria-hidden="true"></i>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textAlign: 'center', padding: '0 1rem' }}>Logo Regione Siciliana</span>
            </div>
          </div>

          {/* Perché la formazione finanziata */}
          <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '2.5rem', marginTop: '3rem' }}>
            <span className="section-badge">Perché scegliere la formazione finanziata</span>
            <p className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.4 }}>
              Gratuita. Certificata. Spendibile nel mondo del lavoro.
            </p>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0, maxWidth: '820px' }}>
              Frequentare un corso finanziato significa acquisire competenze richieste dalle aziende senza sostenere costi. Ogni percorso promosso da Alètheia è progettato per favorire l&apos;ingresso o il reinserimento nel mercato del lavoro attraverso una formazione pratica, qualifiche riconosciute e il supporto di docenti specializzati.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ AVVISI DELLA REGIONE SICILIANA ══════════════ */}
      <section id="avvisi" className="bg-white dark:bg-dark-card" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">Avvisi della Regione Siciliana</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Scegli il programma di finanziamento più adatto a te
            </h2>
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Ogni avviso pubblico finanzia specifici percorsi di formazione destinati a categorie differenti di partecipanti. Seleziona il programma che ti interessa e consulta corsi disponibili, requisiti di accesso e modalità di iscrizione.
            </p>
          </div>

          <div className="avvisi-grid">
            {avvisi.map((a) => (
              <AvvisoCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ REQUISITI & VALORE ALÈTHEIA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="requisiti-valore-grid">
            {/* Requisiti di accesso */}
            <div>
              <span className="section-badge">Requisiti di accesso</span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.3 }}>
                Hai i requisiti? Scoprilo subito
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                I requisiti cambiano in base al bando, ma generalmente possono partecipare:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {requisiti.map((r) => (
                  <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <i className="fas fa-check-circle" style={{ color: '#10B981', marginTop: '0.2rem', flexShrink: 0 }}></i>
                    <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  Non sai se possiedi i requisiti? Contattaci, verifichiamo insieme la tua situazione in pochi minuti e ti indichiamo il percorso più adatto.
                </p>
                <a href="/contatti" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#008C95', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}>
                  Verifica i tuoi requisiti <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
                </a>
              </div>
            </div>

            {/* Perché Alètheia */}
            <div>
              <span className="section-badge">Perché Alètheia</span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.3 }}>
                L&apos;ente di formazione che ti accompagna fino all&apos;inserimento lavorativo
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Non organizziamo semplicemente corsi. Ti aiutiamo a scegliere il percorso più adatto, verifichiamo i requisiti di accesso e ti accompagniamo durante tutto il percorso formativo.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {puntiDiForza.map((p) => (
                  <div key={p.text} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.85rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={p.icon} style={{ color: '#008C95', fontSize: '1rem' }}></i>
                    </div>
                    <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge">Domande frequenti sulla formazione regionale in Sicilia</span>
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              Hai dubbi? Leggi le risposte alle domande che riceviamo più spesso.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
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

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', marginBottom: '1rem' }}>
            Hai domande?
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Scopri se hai i requisiti
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Ogni avviso ha requisiti specifici di accesso. Contattaci per una consulenza gratuita: ti aiutiamo a individuare il percorso più adatto alla tua situazione.
          </p>
          <a href="/contatti" className="cta-btn-primary">Contattaci</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
