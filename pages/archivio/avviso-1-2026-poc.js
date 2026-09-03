import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DOCUMENTI = [
  { titolo: 'Catalogo completo dei corsi', href: 'https://www.aletheiasrl.it/images/AVVISO1-POC/catalogo_completo.pdf' },
  { titolo: 'Catalogo descrittivo dei corsi', href: 'https://www.aletheiasrl.it/images/AVVISO1-POC/catalogo_corsi_web.pdf' },
  { titolo: 'Bando selezione allievi', href: 'https://www.aletheiasrl.it/images/AVVISO1-POC/BANDO-ALLIEVI-avv.-1.26-POC-Sicilia_Aletheia.pdf' },
  { titolo: 'Domanda di iscrizione allievi', href: 'https://www.aletheiasrl.it/images/AVVISO1-POC/Domanda-di-iscrizione-ALLIEVI_Avv.1.26-POC-Sicilia.pdf' },
  { titolo: 'Bando selezione docenti', href: 'https://www.aletheiasrl.it/images/AVVISO1-POC/BANDO-DOCENTI-avv.-1.26-POC-Sicilia_Aletheia.pdf' },
  { titolo: 'Domanda di iscrizione docenti', href: 'https://www.aletheiasrl.it/images/AVVISO1-POC/allegati-bando-DOCENTI-avv.-1.26-POC-Sicilia_Aletheia.pdf' },
];

const QUALIFICHE = [
  'Addetto Giardinaggio', 'Panificatore Pasticciere', 'Pizzaiolo', 'Acconciatore', 'Estetista',
  'Tecnico Laboratorio Educativo', 'Operatore Informatico', 'Sarto Confezionista', 'Addetto Elettrico',
  'Amministrativo', 'Contabilità', 'Magazzino e Logistica',
];

const REQUISITI = [
  'Residenza o domicilio in Sicilia',
  'Età lavorativa',
  'Titolo di studio minimo richiesto per il percorso scelto',
  'Per cittadini extra UE: regolare permesso di soggiorno valido',
];

export default function Avviso12026Poc() {
  return (
    <>
      <Head>
        <title>Avviso 1/2026 POC Sicilia - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Avviso pubblico n. 1/2026 POC Sicilia 2014-2020: catalogo regionale dell'offerta formativa, percorsi di qualificazione gratuiti per disoccupati e inoccupati in Sicilia."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/" solid />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
        paddingTop: '120px',
        paddingBottom: '4rem',
      }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</a>
            <span aria-hidden="true">›</span>
            <a href="/formazione/regionale" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Formazione Regionale</a>
            <span aria-hidden="true">›</span>
            <span style={{ color: '#6EE7B7' }}>Avviso 1/2026 POC</span>
          </nav>
          <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.25rem' }}>
            Corsi con qualifica professionale
          </span>
          <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '1rem', maxWidth: '820px' }}>
            Avviso pubblico n. 1/2026 POC Sicilia 2014-2020
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.68)', maxWidth: '820px', lineHeight: 1.8 }}>
            Costituzione del Catalogo Regionale dell&apos;offerta formativa e realizzazione di percorsi di qualificazione mirati al rafforzamento dell&apos;occupabilità in Sicilia.
          </p>
        </div>
      </section>

      <main className="bg-white dark:bg-gray-900">
        <div className="container" style={{ maxWidth: '860px', padding: '4rem 1.5rem' }}>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-slate-900 dark:text-gray-50" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Di cosa si tratta
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85 }}>
              L&apos;avviso promuove l&apos;apprendimento permanente e il miglioramento del livello delle competenze, anticipando le nuove esigenze richieste dal mercato del lavoro e facilitando il riorientamento professionale. Sono previste 19 qualifiche professionali, con percorsi della durata variabile da 120 a 600 ore.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-slate-900 dark:text-gray-50" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Requisiti di accesso
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Possono partecipare le persone non occupate (disoccupati, inoccupati, inattivi) in possesso dei seguenti requisiti:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {REQUISITI.map((r) => (
                <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <i className="fas fa-check-circle" style={{ color: '#10B981', marginTop: '0.2rem', flexShrink: 0 }}></i>
                  <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-slate-900 dark:text-gray-50" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Qualifiche disponibili (esempi)
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {QUALIFICHE.map((q) => (
                <span key={q} className="bg-[#008C95]/10 dark:bg-[#10B981]/10 border border-[#008C95]/30 dark:border-[#10B981]/30 text-primary dark:text-[#10B981]" style={{ padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600 }}>
                  {q}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-[#008C95]/10 dark:bg-[#10B981]/10 border border-[#008C95]/30 dark:border-[#10B981]/30" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <p className="text-[#004D52] dark:text-[#10B981]" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.7 }}>
              <i className="far fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>
              Scadenza pre-iscrizioni: 13 aprile 2026, ore 16:00. Pre-iscrizione online su{' '}
              <a href="https://corsi.aletheiasrl.it/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>corsi.aletheiasrl.it</a>.
            </p>
          </section>

          <section>
            <h2 className="text-slate-900 dark:text-gray-50" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>
              Documenti scaricabili
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DOCUMENTI.map((doc) => (
                <li
                  key={doc.href}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderRadius: '0.75rem', padding: '0.85rem 1.25rem', flexWrap: 'wrap' }}
                >
                  <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.titolo}</span>
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.1rem', borderRadius: '999px', background: '#008C95', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}
                  >
                    <i className="fas fa-download"></i> Scarica PDF
                  </a>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
