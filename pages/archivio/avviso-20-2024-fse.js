import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DOCUMENTI = [
  { titolo: 'Bando selezione allievi', href: 'https://www.aletheiasrl.it/images/avviso20_2024/BANDO_ALLIEVI_avv20_2024fse_Aletheia.pdf' },
  { titolo: 'Domanda di iscrizione allievi', href: 'https://www.aletheiasrl.it/images/avviso20_2024/Domanda_iscrizione_ALLIEVI_avv20_2024.pdf' },
  { titolo: 'Bando selezione docenti', href: 'https://www.aletheiasrl.it/images/avviso20_2024/BANDO_DOCENTI_avv20_2024fse_Aletheia.pdf' },
  { titolo: 'Domanda di iscrizione docenti', href: 'https://www.aletheiasrl.it/images/avviso20_2024/allegati_bando_DOCENTI_avv20_2024_Aletheia.pdf' },
];

const REQUISITI = [
  'Persone non occupate (disoccupati, inoccupati, inattivi)',
  'Residenti o domiciliati in Sicilia',
  'Età compresa tra 18 e 64 anni',
  'Possesso del titolo di studio minimo richiesto',
  'Per cittadini extra UE: regolare permesso di soggiorno valido',
];

const SEDI = [
  'Via del Carrubo snc, 97019 Vittoria (RG)',
  'Via Ginevra n. 9, 97016 Pozzallo (RG)',
  'Piazza Aldo Moro n. 7, 95040 Mirabella Imbaccari (CT)',
];

export default function Avviso202024Fse() {
  return (
    <>
      <Head>
        <title>Avviso 20/2024 FSE+ - Assistente Familiare - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Avviso 20/2024 FSE+: percorso gratuito per la qualifica di Assistente Familiare, rivolto a disoccupati e inoccupati in Sicilia. Alètheia Srl, ente accreditato."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
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
            <span style={{ color: '#6EE7B7' }}>Avviso 20/2024 FSE+</span>
          </nav>
          <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.25rem' }}>
            Assistente Familiare
          </span>
          <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '1rem', maxWidth: '820px' }}>
            Avviso 20/2024 FSE+ — Assistente Familiare
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.68)', maxWidth: '820px', lineHeight: 1.8 }}>
            Percorso finanziato per la formazione della figura professionale di Assistente Familiare, rivolto a disoccupati e inoccupati in Sicilia. 300 ore tra formazione teorica, attività pratiche e stage.
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
              Il percorso mira a fornire e sviluppare competenze tecnico-professionali, relazionali, comunicative e socio-culturali nell&apos;ambito dell&apos;assistenza familiare, con il rilascio della qualifica di &quot;Assistente Familiare&quot; secondo il D.A. n. 5816 del 26 luglio 2017. La figura professionale assiste al domicilio persone con ridotta o nulla autosufficienza, fornendo prestazioni preventive, assistenziali e riabilitative.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 className="text-slate-900 dark:text-gray-50" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              Requisiti di accesso
            </h2>
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
              Sedi del corso
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {SEDI.map((s) => (
                <li key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#008C95', marginTop: '0.2rem', flexShrink: 0 }}></i>
                  <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{s}</span>
                </li>
              ))}
            </ul>
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

          <div className="border-t border-gray-200 dark:border-gray-700" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', fontSize: '0.85rem' }}>
            <p className="text-slate-500 dark:text-gray-400" style={{ margin: 0 }}>
              Per informazioni: <a href="mailto:info@aletheiasrl.it" style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}>info@aletheiasrl.it</a> — Tel. <a href="tel:+390932862613" style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}>+39 0932 862613</a>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
