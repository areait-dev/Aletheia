import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';
import Reveal from '../../components/Reveal';

const percorsi = [
  {
    badge: 'FSE+, POC Sicilia, PSR, FEAMP',
    icon: 'fas fa-map-marked-alt',
    title: 'Formazione Regionale',
    bullets: [
      'Percorsi finanziati da Regione Siciliana e Unione Europea',
      'Rivolti a disoccupati, inoccupati e chi cerca nuove competenze',
      'Stage aziendali, indennità di frequenza, qualifiche riconosciute',
      'Alètheia ti segue nella verifica requisiti e iscrizione',
    ],
    cta: 'Scopri i corsi',
    href: '/formazione/regionale',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Aula di formazione regionale con studenti al lavoro',
  },
  {
    badge: 'La formazione che la tua azienda sta già finanziando',
    icon: 'fas fa-building',
    title: 'Fondi Interprofessionali per aziende',
    bullets: [
      'Usa lo 0,30% dei contributi INPS già versati per la formazione',
      'Fon.Ter, For.Agri, Fondimpresa e altri fondi paritetici',
      'Nessun costo aggiuntivo per l\'impresa',
      'Alètheia segue tutto: dai fabbisogni alla rendicontazione',
    ],
    cta: 'Scopri di più',
    href: '/formazione/fondi-interprofessionali',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Riunione aziendale per la formazione dei dipendenti',
  },
  {
    badge: 'Forma i tuoi dipendenti senza costi retributivi',
    icon: 'fas fa-lightbulb',
    title: 'Fondo Nuove Competenze',
    bullets: [
      'Formazione durante l\'orario di lavoro, con rimborso dei costi retributivi',
      'Digitalizzazione, transizione ecologica, competenze strategiche',
      'Investimento sostenibile per affrontare le sfide del mercato',
      'Verifica gratuita dei requisiti con il nostro team',
    ],
    cta: 'Scopri di più',
    href: '/formazione/fondo-nuove-competenze',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Team che lavora su innovazione e competenze digitali',
  },
];

function PercorsoCard({ badge, icon, title, bullets, cta, href, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        minHeight: '420px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.22)' : '0 4px 18px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(4,15,20,0.92) 10%, rgba(4,15,20,0.6) 55%, rgba(4,15,20,0.12) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, justifyContent: 'flex-end' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className={icon} style={{ fontSize: '1.05rem', color: '#6EE7B7' }}></i>
        </div>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6EE7B7', width: 'fit-content' }}>
          {badge}
        </span>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, lineHeight: 1.3, color: '#fff' }}>{title}</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.83rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>
              <i className="fas fa-check" style={{ color: '#6EE7B7', fontSize: '0.7rem', marginTop: '0.3rem', flexShrink: 0 }}></i>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
          {cta}
        </span>
      </div>
    </a>
  );
}

export default function FormazioneFinanziataSicilia() {
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>Formazione Finanziata in Sicilia - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corsi gratuiti in Sicilia finanziati da Regione Siciliana, Fondi Interprofessionali e Fondo Nuove Competenze. Alètheia: ente di formazione accreditato."
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

        .percorsi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .percorsi-grid { grid-template-columns: 1fr; }
        }

        .calendario-orientamento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .calendario-orientamento-grid { grid-template-columns: 1fr; }
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
          <div className="hero-badge fade-up">Formarsi senza costi</div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.12, marginBottom: '1.25rem', maxWidth: '760px' }}>
            Formazione{' '}
            <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Finanziata in Sicilia
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '820px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Fondi regionali, europei e interprofessionali esistono per questo. Ogni anno restano inutilizzati, noi ti aiutiamo ad attivarli e trasformarli in formazione concreta, a costo zero. Alètheia è un Ente di Formazione accreditato dalla Regione Siciliana e soggetto attuatore presso i principali Fondi Paritetici Interprofessionali nazionali.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#offerta" className="cta-btn-primary">Scopri i percorsi</a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ══════════════ OFFERTA FORMATIVA (3 MACRO-PERCORSI) ══════════════ */}
      <section id="offerta" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">La nostra offerta formativa</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Scegli il percorso di formazione più adatto alle tue esigenze
            </h2>
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Ogni opportunità di finanziamento risponde a esigenze diverse. Seleziona il percorso dedicato a te e scopri come accedere ai corsi disponibili.
            </p>
          </div>

          <div className="percorsi-grid">
            {percorsi.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 90}>
                <PercorsoCard {...p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CALENDARIO & ORIENTAMENTO ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-y border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="calendario-orientamento-grid">
            <div className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '2rem' }}>
              <span className="section-badge">Calendario corsi</span>
              <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.3 }}>
                I prossimi corsi in partenza
              </h3>
              <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                Controlla le prossime aperture e prenota il tuo posto.
              </p>
              <a href="/calendario-corsi" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#008C95', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Scopri di più <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
              </a>
            </div>

            <div style={{
              borderRadius: '1.25rem',
              padding: '2rem',
              background: isDark ? '#1f2937' : 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderLeft: isDark ? '3px solid #10B981' : 'none',
            }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.3, color: '#fff' }}>
                Non sai quale percorso scegliere?
              </h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.75, margin: '0 0 1.5rem', color: 'rgba(255,255,255,0.7)' }}>
                Il team di Alètheia analizza gratuitamente il tuo profilo o quello della tua azienda, verifica i bandi e i corsi disponibili e ti guida verso la soluzione più adatta ai tuoi obiettivi formativi. Un orientamento gratuito e senza impegno.
              </p>
              <a href="/contatti" className="cta-btn-primary">Contattaci</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

