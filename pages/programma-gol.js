import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const corsiGOL = [
  {
    slug: 'gol-reinserimento-lavorativo',
    title: 'Reinserimento Lavorativo',
    icon: 'fas fa-redo-alt',
    description: 'Percorso personalizzato per disoccupati e inattivi. Orientamento, formazione mirata e accompagnamento all\'inserimento o reinserimento nel mercato del lavoro.',
    misura: 'Misura 1 - Reinserimento lavorativo',
    target: 'Disoccupati, percettori NASpI / RdC',
  },
  {
    slug: 'gol-upskilling',
    title: 'Upskilling',
    icon: 'fas fa-level-up-alt',
    description: 'Aggiornamento delle competenze professionali per lavoratori a rischio di esclusione. Corsi brevi e certificati per rafforzare il profilo occupazionale.',
    misura: 'Misura 2 - Upskilling',
    target: 'Lavoratori fragili o a rischio',
  },
  {
    slug: 'gol-reskilling',
    title: 'Reskilling',
    icon: 'fas fa-sync-alt',
    description: 'Riqualificazione professionale completa per chi deve cambiare settore o ruolo. Percorsi formativi intensivi con rilascio di qualifica o certificazione.',
    misura: 'Misura 3 - Reskilling',
    target: 'Lavoratori in transizione professionale',
  },
  {
    slug: 'gol-lavoro-inclusione',
    title: 'Lavoro e Inclusione',
    icon: 'fas fa-hands-helping',
    description: 'Percorsi dedicati a persone con fragilità o distanza dal mercato del lavoro. Integrazione con i servizi sociali e supporto personalizzato all\'inserimento.',
    misura: 'Misura 4 - Lavoro e inclusione',
    target: 'Persone con fragilità sociale',
  },
  {
    slug: 'gol-ricollocazione-collettiva',
    title: 'Ricollocazione Collettiva',
    icon: 'fas fa-users',
    description: 'Interventi di outplacement collettivo per lavoratori in crisi aziendale. Supporto di gruppo e individuale per la transizione verso nuova occupazione.',
    misura: 'Misura 5 - Ricollocazione collettiva',
    target: 'Lavoratori in crisi aziendale / CIGS',
  },
];

function CourseCard({ title, icon, description, misura, target }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{
        height: '3px',
        background: 'linear-gradient(90deg, #10B981, #008C95)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }} />

      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
            background: hovered ? '#10B981' : 'rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s ease',
          }}>
            <i className={icon} style={{ fontSize: '1.2rem', color: hovered ? '#fff' : '#10B981' }}></i>
          </div>
          <span style={{
            fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: '#10B981',
            background: 'rgba(16,185,129,0.1)', padding: '0.22rem 0.6rem',
            borderRadius: '999px',
          }}>
            GOL
          </span>
        </div>

        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
          {title}
        </h3>

        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0, flex: 1 }}>
          {description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="fas fa-tag" style={{ color: '#10B981', fontSize: '0.65rem' }}></i>
            {misura}
          </span>
          <span className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <i className="fas fa-users" style={{ color: '#10B981', fontSize: '0.65rem' }}></i>
            {target}
          </span>
        </div>

        <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ paddingTop: '0.75rem', borderTop: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: '0.78rem', fontWeight: 700, color: '#10B981',
            opacity: hovered ? 1 : 0.55, transition: 'opacity 0.2s',
          }}>
            100% Finanziato
          </span>
          <a
            href="/contatti"
            style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#008C95',
              textDecoration: 'none',
              opacity: hovered ? 1 : 0.55, transition: 'opacity 0.2s',
            }}
          >
            Richiedi info →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProgrammaGOL() {
  return (
    <>
      <Head>
        <title>Programma G.O.L. - Garanzia di Occupabilità dei Lavoratori - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Alètheia Srl è operatore accreditato del Programma G.O.L. (Garanzia di Occupabilità dei Lavoratori). Percorsi gratuiti di orientamento, formazione e reinserimento professionale in Sicilia."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" />

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

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .courses-grid { grid-template-columns: 1fr; }
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
        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .breadcrumb a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: #6EE7B7; }
        .breadcrumb span { color: rgba(255,255,255,0.3); }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          background: linear-gradient(90deg, #10B981, #008C95);
          color: #fff;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 4px 24px rgba(16,185,129,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
        .cta-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(16,185,129,0.5);
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

        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #064E3B 100%)',
        paddingTop: '120px',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.15) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <nav className="breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/agenzia-per-il-lavoro">Agenzia per il Lavoro</a>
            <span>›</span>
            <a href="/agenzia-per-il-lavoro/servizi-alla-persona">Servizi alla Persona</a>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Programma G.O.L.</span>
          </nav>

          <div className="hero-badge fade-up">
            Piano Nazionale - 100% Finanziato
          </div>

          <h1 className="fade-up fade-up-1" style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
            maxWidth: '750px',
          }}>
            Programma{' '}
            <span style={{
              background: 'linear-gradient(90deg, #6EE7B7, #10B981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              G.O.L.
            </span>
            <br />
            <span style={{ fontSize: '0.55em', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
              Garanzia di Occupabilità dei Lavoratori
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: '820px',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            Alètheia Srl è operatore accreditato del Programma G.O.L., il piano nazionale finanziato dal PNRR per il reinserimento lavorativo. Percorsi gratuiti e personalizzati di orientamento, formazione e ricollocazione professionale in Sicilia.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#percorsi" className="cta-btn-primary">
              <i className="fas fa-rocket"></i>
              Scopri i percorsi
            </a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ── COS'È IL GOL ── */}
      <section className="bg-light dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#10B981', marginBottom: '0.5rem' }}>
                Il programma
              </span>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
                Cos&apos;è il{' '}
                <span style={{ color: '#10B981' }}>Programma G.O.L.?</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: '0 0 1rem' }}>
                Il Programma <strong className="text-slate-900 dark:text-white">Garanzia di Occupabilità dei Lavoratori (G.O.L.)</strong> è una misura del Piano Nazionale di Ripresa e Resilienza (PNRR) che mira a rafforzare le politiche attive del lavoro in Italia. Con una dotazione di 4,4 miliardi di euro, punta a coinvolgere almeno 3 milioni di persone entro il 2025.
              </p>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
                I beneficiari sono lavoratori fragili, disoccupati, percettori di ammortizzatori sociali (NASpI, CIGS, RdC) e giovani NEET. I percorsi sono <strong className="text-slate-900 dark:text-white">completamente gratuiti</strong> e si articolano in 5 misure in base al profilo e ai bisogni di ciascun lavoratore.
              </p>
            </div>
            <div style={{ flex: '0 0 auto', minWidth: '260px' }}>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40" style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="text-emerald-900 dark:text-emerald-200" style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Chi può aderire
                </h3>
                {[
                  { icon: 'fas fa-user-times', label: 'Disoccupati e inattivi' },
                  { icon: 'fas fa-hand-holding-usd', label: 'Percettori NASpI / RdC / CIGS' },
                  { icon: 'fas fa-briefcase', label: 'Lavoratori a rischio di esclusione' },
                  { icon: 'fas fa-graduation-cap', label: 'Giovani NEET (under 30)' },
                  { icon: 'fas fa-users', label: 'Lavoratori in crisi aziendale' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={item.icon} style={{ fontSize: '0.85rem', color: '#10B981' }}></i>
                    </div>
                    <span className="text-emerald-900 dark:text-emerald-200" style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERCORSI ── */}
      <section id="percorsi" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#10B981', marginBottom: '0.6rem' }}>
              Le 5 misure
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: '0 0 0.75rem', lineHeight: 1.25 }}>
              I percorsi del Programma G.O.L.
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.75 }}>
              Ogni percorso è personalizzato in base al profilo occupazionale del beneficiario e completamente finanziato dal PNRR.
            </p>
          </div>

          <div className="courses-grid">
            {corsiGOL.map((corso) => (
              <CourseCard key={corso.slug} {...corso} />
            ))}
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40" style={{
            marginTop: '3rem',
            borderRadius: '1rem',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}>
            <i className="fas fa-info-circle" style={{ color: '#10B981', fontSize: '1.25rem', flexShrink: 0 }}></i>
            <p className="text-emerald-900 dark:text-emerald-200" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.6 }}>
              Tutti i percorsi G.O.L. sono <strong>completamente gratuiti</strong> per i beneficiari. Contattaci per verificare la tua eleggibilità e avviare la presa in carico personalizzata.
            </p>
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section className="bg-white dark:bg-dark-card" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#10B981', marginBottom: '0.6rem' }}>
              Il processo
            </span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Come funziona?
            </h2>
          </div>

          <div className="info-grid">
            {[
              { step: '01', icon: 'fas fa-clipboard-check', title: 'Presa in carico', desc: 'Verifica della tua eleggibilità al programma con i nostri consulenti e registrazione sul sistema regionale.' },
              { step: '02', icon: 'fas fa-compass', title: 'Orientamento', desc: 'Colloquio di orientamento individuale per analizzare competenze, aspirazioni e bisogni formativi.' },
              { step: '03', icon: 'fas fa-route', title: 'Percorso personalizzato', desc: 'Definizione del percorso più adatto tra le 5 misure GOL, con formazione, tutoraggio e accompagnamento al lavoro.' },
            ].map((item) => (
              <div key={item.step} className="bg-slate-50 dark:bg-dark-bg" style={{ borderRadius: '1.25rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#10B981', letterSpacing: '0.08em' }}>STEP {item.step}</span>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={item.icon} style={{ fontSize: '1.1rem', color: '#10B981' }}></i>
                  </div>
                </div>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{item.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.875rem', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #064E3B 100%)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', marginBottom: '1rem' }}>
            Inizia ora
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Vuoi aderire al Programma G.O.L.?
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Contattaci per verificare la tua eleggibilità e avviare gratuitamente il percorso personalizzato più adatto a te.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contatti" className="cta-btn-primary">
              <i className="fas fa-paper-plane"></i>
              Contattaci
            </a>
            <a href="/agenzia-per-il-lavoro/servizi-alla-persona" className="cta-btn-outline">
              Tutti i servizi
            </a>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
