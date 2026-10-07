import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import LinkText from './LinkText';
import { useSiteOptions } from '../context/SiteOptionsContext';

/**
 * Layout "a scheda" di una voce dell'archivio (es. Avviso 1/2026 POC, Avviso 20/2024 FSE+): hero con briciole e badge,
 * "Di cosa si tratta", requisiti, un blocco extra (qualifiche o sedi), riquadro avviso (es. scadenza), documenti in
 * un'unica lista e contatti. Tutti i testi vengono dalla voce (dati locali o WordPress): vedi lib/wp-archivio.ts.
 */

// Titolo di sezione e paragrafo di testo condivisi dalle sezioni della scheda.
const H2_STYLE = { fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' };
const LISTA_STYLE = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const VOCE_STYLE = { display: 'flex', alignItems: 'flex-start', gap: '0.65rem' };

export default function ArchivioScheda({ voce }) {
  const { scheda: s } = voce;
  const { identita, seo } = useSiteOptions();
  // Un'unica lista, senza titoli di sezione: nell'ordine in cui i documenti sono stati inseriti.
  const documenti = Object.values(voce.documenti || {}).flat();
  const paragrafi = (voce.descrizione || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Head>
        <title>{voce.metaTitolo || `${voce.titolo} - Alètheia Srl`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {(voce.metaDescrizione || seo.descrizione) && <meta name="description" content={voce.metaDescrizione || seo.descrizione} />}
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
            <span style={{ color: '#6EE7B7' }}>{s.titoloBreve || voce.titolo}</span>
          </nav>
          {s.badge && (
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: 'rgba(1,136,145,0.12)', border: '1px solid rgba(1,136,145,0.25)', padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.25rem' }}>
              {s.badge}
            </span>
          )}
          <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '1rem', maxWidth: '820px' }}>
            {voce.titolo}
          </h1>
          {s.sottotitolo && (
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.68)', maxWidth: '820px', lineHeight: 1.8 }}>
              {s.sottotitolo}
            </p>
          )}
        </div>
      </section>

      <main className="bg-white dark:bg-gray-900">
        <div className="container" style={{ maxWidth: '860px', padding: '4rem 1.5rem' }}>

          {paragrafi.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>
                Di cosa si tratta
              </h2>
              {paragrafi.map((p, i) => (
                <p key={i} className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85 }}>
                  {p}
                </p>
              ))}
            </section>
          )}

          {s.requisiti.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>
                Requisiti di accesso
              </h2>
              {s.requisitiIntro && (
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {s.requisitiIntro}
                </p>
              )}
              <ul style={LISTA_STYLE}>
                {s.requisiti.map((r) => (
                  <li key={r} style={VOCE_STYLE}>
                    <i className="fas fa-check-circle" style={{ color: '#018891', marginTop: '0.2rem', flexShrink: 0 }}></i>
                    <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {s.extra.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>
                {s.extraTitolo}
              </h2>
              {s.extraTipo === 'sedi' ? (
                <ul style={LISTA_STYLE}>
                  {s.extra.map((sede) => (
                    <li key={sede} style={VOCE_STYLE}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#008C95', marginTop: '0.2rem', flexShrink: 0 }}></i>
                      <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{sede}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {s.extra.map((q) => (
                    <span key={q} className="bg-[#018891]/10 dark:bg-[#018891]/10 border border-[#018891]/30 dark:border-primary-on-dark/30 text-[#006066] dark:text-primary-on-dark" style={{ padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600 }}>
                      {q}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {s.avviso && (
            <section className="bg-[#018891]/10 dark:bg-[#018891]/10 border border-[#018891]/30 dark:border-primary-on-dark/30" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <p className="text-[#004D52] dark:text-primary-on-dark" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.7 }}>
                <i className="far fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>
                <LinkText text={s.avviso} newTab style={{ color: 'inherit', textDecoration: 'underline' }} />
              </p>
            </section>
          )}

          {documenti.length > 0 && (
            <section>
              <h2 className="text-slate-900 dark:text-gray-50" style={{ ...H2_STYLE, marginBottom: '1rem' }}>
                Documenti scaricabili
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {documenti.map((doc) => (
                  <li
                    key={doc.percorsoLocale}
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderRadius: '0.75rem', padding: '0.85rem 1.25rem', flexWrap: 'wrap' }}
                  >
                    <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.titoloLink}</span>
                    <a
                      href={doc.percorsoLocale}
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
          )}

          {s.contatti && (
            <div className="border-t border-gray-200 dark:border-gray-700" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', fontSize: '0.85rem' }}>
              <p className="text-slate-600 dark:text-gray-400" style={{ margin: 0 }}>
                Per informazioni: <a href={`mailto:${identita.email}`} style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}>{identita.email}</a> — Tel. <a href={`tel:${identita.telefono.replace(/\s+/g, '')}`} style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}>{identita.telefono}</a>
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
