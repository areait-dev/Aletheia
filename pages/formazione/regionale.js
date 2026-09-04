import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';

const avvisi = [
  {
    badge: 'Corsi con qualifica professionale',
    logo: 'POC Sicilia',
    title: 'Avviso 1/2026 POC',
    text: 'Percorsi di formazione professionale finanziati dal Programma Operativo Complementare Sicilia, finalizzati al conseguimento di una qualifica professionale riconosciuta e spendibile nel mercato del lavoro.',
    modalita: 'Aula (o variabile)',
    href: '/archivio/avviso-1-2026-poc',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Aula di formazione professionale con studenti',
  },
  {
    badge: 'Disoccupati, NASpI, ADI',
    logo: 'UE · Ministero del Lavoro · GOL',
    title: 'Avviso 6/2025 GOL – Garanzia di Occupabilità dei Lavoratori',
    text: 'Il Programma GOL – Garanzia di Occupabilità dei Lavoratori finanzia percorsi di formazione gratuiti dedicati a chi desidera aggiornare le proprie competenze e rientrare rapidamente nel mondo del lavoro.',
    modalita: 'Aula (o variabile)',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Persona in colloquio di lavoro per il reinserimento occupazionale',
  },
  {
    badge: 'Qualifica, Stage, Indennità di frequenza',
    logo: 'Coesione Italia · Cofinanziato UE · Ministero',
    title: 'Avviso 7/2023 - II Finestra',
    text: 'Percorsi rivolti a disoccupati e inoccupati che prevedono una qualifica professionale riconosciuta, indennità di frequenza e stage presso aziende partner.',
    modalita: 'Aula + Stage (o variabile)',
    href: '/archivio/avviso-7-2023',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Stage in azienda con affiancamento professionale',
  },
  {
    badge: 'Assistente Familiare',
    logo: 'Coesione Italia · Cofinanziato UE · Ministero',
    title: 'Avviso n. 20/2024 FSE+',
    text: 'Percorso finanziato dedicato alla formazione della figura professionale di Assistente Familiare, sempre più richiesta nel settore socio-assistenziale. Il corso comprende formazione teorica, attività pratiche e rilascio della qualifica professionale.',
    durata: '300 ore',
    modalita: 'Aula + Stage',
    href: '/archivio/avviso-20-2024-fse',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    imageAlt: 'Assistente familiare che si prende cura di una persona anziana',
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
  {
    domanda: 'I corsi regionali sono davvero gratuiti?',
    risposta: 'Sì, i percorsi finanziati attraverso FSE+, POC Sicilia e gli altri programmi regionali sono completamente gratuiti per i partecipanti. In molti casi è prevista anche un\'indennità di frequenza.',
  },
  {
    domanda: 'Ottengo una qualifica riconosciuta al termine del corso?',
    risposta: 'Sì, la maggior parte degli avvisi regionali prevede il rilascio di una qualifica professionale o di un attestato riconosciuto a livello regionale e nazionale, spendibile nel mercato del lavoro.',
  },
  {
    domanda: 'Come faccio a sapere quale avviso è attivo per il mio profilo?',
    risposta: 'I requisiti cambiano da avviso ad avviso. Contattaci per una verifica gratuita: analizziamo la tua situazione e ti indichiamo subito se hai i requisiti per uno o più percorsi disponibili.',
  },
];

function AvvisoCard({ badge, logo, title, text, durata, modalita, href, external, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  const clickable = Boolean(href);
  const Tag = clickable ? 'a' : 'div';
  return (
    <Tag
      href={clickable ? href : undefined}
      target={clickable && external ? '_blank' : undefined}
      rel={clickable && external ? 'noopener noreferrer' : undefined}
      onMouseEnter={clickable ? () => setHovered(true) : undefined}
      onMouseLeave={clickable ? () => setHovered(false) : undefined}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: clickable ? 'pointer' : 'default',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
        opacity: clickable ? 1 : 0.85,
      }}
    >
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }} />
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
        <span style={{ fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '0.25rem 0.65rem', borderRadius: '999px', width: 'fit-content' }}>
          {badge}
        </span>

        <div style={{ borderRadius: '0.6rem', overflow: 'hidden', height: '140px', position: 'relative' }}>
          <Image src={image} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 340px" style={{ objectFit: 'cover' }} />
        </div>

        <span className="text-slate-600 dark:text-gray-500" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
          {logo}
        </span>

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
          {clickable ? (
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: hovered ? 1 : 0.6, transition: 'opacity 0.2s' }}>
              Scopri {durata ? 'il corso' : 'i corsi'}
            </span>
          ) : (
            <span className="text-slate-600 dark:text-gray-500" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
              Prossimamente
            </span>
          )}
        </div>
      </div>
    </Tag>
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

        @media (max-width: 640px) {
          .requisiti-list { grid-template-columns: 1fr !important; }
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
            fontSize: 'clamp(2.1rem, 4.5vw, 3.25rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            Formazione regionale{' '}
            <span style={{
              background: 'linear-gradient(90deg, #10B981, #008C95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              gratuita
            </span>{' '}
            in Sicilia con qualifica riconosciuta.
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Alètheia Srl è ente accreditato dalla Regione Siciliana (DDG n. 78/2017). Eroga percorsi formativi finanziati attraverso FSE+, Programma GOL, POC Sicilia e altri programmi regionali, rivolti a disoccupati, inoccupati e persone in cerca di nuove opportunità professionali. I corsi sono gratuiti con qualifica riconosciuta, indennità di frequenza e stage in azienda, per trasformare la formazione in un&apos;opportunità concreta di lavoro.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#avvisi" className="cta-btn-primary">Scopri gli avvisi</a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ══════════════ PERCHÉ SCEGLIERE LA FORMAZIONE FINANZIATA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div>
            <span className="section-badge">Perché scegliere la formazione finanziata</span>
            <p className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', fontWeight: 800, margin: '0 0 1.5rem', lineHeight: 1.4 }}>
              Gratuita. Certificata. Spendibile nel mondo del lavoro.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {puntiDiForza.map((p, i) => (
                <Reveal key={p.text} delay={(i % 4) * 80}>
                  <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.85rem', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className={p.icon} style={{ color: '#008C95', fontSize: '1rem' }}></i>
                    </div>
                    <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
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
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Ogni avviso pubblico finanzia specifici percorsi di formazione destinati a categorie differenti di partecipanti. Seleziona il programma che ti interessa e consulta corsi disponibili, requisiti di accesso e modalità di iscrizione.
            </p>
          </div>

          <div className="avvisi-grid">
            {avvisi.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90}>
                <AvvisoCard {...a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ REQUISITI & VALORE ALÈTHEIA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            {/* Requisiti di accesso */}
            <div>
              <span className="section-badge">Requisiti di accesso</span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.3 }}>
                Hai i requisiti? Scoprilo subito
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                I requisiti cambiano in base al bando, ma generalmente possono partecipare:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', columnGap: '1.5rem', rowGap: '0.65rem' }} className="requisiti-list">
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
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge">Domande frequenti sulla formazione regionale in Sicilia</span>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
              Hai dubbi? Leggi le risposte alle domande che riceviamo più spesso.
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

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', marginBottom: '1rem' }}>
            Hai domande?
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Non sai quale corso scegliere?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Raccontaci la tua situazione, in pochi minuti ti diciamo se hai i requisiti, quale avviso fa per te e come candidarti. Il servizio di orientamento è gratuito.
          </p>
          <a href="/contatti" className="cta-btn-primary">Contattaci</a>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
