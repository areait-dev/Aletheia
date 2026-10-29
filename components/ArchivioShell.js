import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useSiteOptions } from '../context/SiteOptionsContext';

/**
 * Struttura comune a TUTTE le pagine dell'archivio (elenco, panoramica di una famiglia, voce con layout a scheda e voce
 * storica): stessa hero (briciole, etichetta, titolo, sottotitolo), stesso corpo allineato a sinistra come il titolo
 * (largo al massimo 1100px) e stesso footer. Cambia solo il contenuto.
 */

// Titolo di sezione, liste e righe condivisi.
export const H2_STYLE = { fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' };
export const LISTA_STYLE = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' };
export const VOCE_STYLE = { display: 'flex', alignItems: 'flex-start', gap: '0.65rem' };
// Riga a scheda (documenti, link a voci e famiglie): stesso aspetto ovunque.
export const RIGA_CLASS = 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
export const RIGA_STYLE = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderRadius: '0.75rem', padding: '0.85rem 1.25rem' };

/** Elenco di documenti scaricabili (titolo a sinistra, pulsante "Scarica PDF" a destra). */
export function DocumentiLista({ documenti }) {
  return (
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
  );
}

/** Pagina dell'archivio: `briciole` = [{ label, href? }] dopo "Home" (l'ultima è la pagina corrente). */
export default function ArchivioShell({ titolo, badge, sottotitolo, briciole = [], metaTitolo, metaDescrizione, children }) {
  const { seo } = useSiteOptions();
  return (
    <>
      <Head>
        <title>{metaTitolo || `${titolo} - Alètheia Srl`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {(metaDescrizione || seo.descrizione) && <meta name="description" content={metaDescrizione || seo.descrizione} />}
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
            {briciole.map((b, i) => (
              <span key={b.label} style={{ display: 'contents' }}>
                <span aria-hidden="true">›</span>
                {b.href && i < briciole.length - 1
                  ? <a href={b.href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{b.label}</a>
                  : <span style={{ color: '#6EE7B7' }}>{b.label}</span>}
              </span>
            ))}
          </nav>
          {badge && (
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: 'rgba(1,136,145,0.12)', border: '1px solid rgba(1,136,145,0.25)', padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.25rem' }}>
              {badge}
            </span>
          )}
          <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: '1rem', maxWidth: '820px' }}>
            {titolo}
          </h1>
          {sottotitolo && (
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.68)', maxWidth: '820px', lineHeight: 1.8 }}>
              {sottotitolo}
            </p>
          )}
        </div>
      </section>

      <main className="bg-white dark:bg-gray-900">
        {/* Stesso .container della hero (stesso margine sinistro del titolo); contenuto largo al massimo 1100px, allineato a sinistra */}
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '1100px' }}>
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
