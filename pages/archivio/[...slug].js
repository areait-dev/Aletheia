import ArchivioTesto from '../../components/ArchivioTesto';
import ArchivioScheda from '../../components/ArchivioScheda';
import ArchivioShell, { DocumentiLista, H2_STYLE, LISTA_STYLE, RIGA_CLASS, RIGA_STYLE } from '../../components/ArchivioShell';
import { FAMIGLIE } from '../../data/archivio-famiglie';
import { descrizioneFamiglia, getArchivio, getFamiglia, getVoce, SEZIONI, sottovociPanoramica, VOCI_SPOSTATE } from '../../lib/wp-archivio';
import { isWpEnabled, isrOptions } from '../../lib/wp';
import { withSiteOptions } from '../../lib/wp-site';

/**
 * Archivio dei bandi: un'unica rotta per tutte le pagine.
 *  /archivio/<famiglia>            panoramica di una famiglia (Misura PSR 1.1, Avviso 2/2018)
 *  /archivio/<slug>                voce singola
 *  /archivio/<famiglia>/<slug>     voce di una famiglia
 * Le voci arrivano dai dati locali storici e dal CPT `archivio` di WordPress (lib/wp-archivio.ts): una voce nuova
 * creata in WordPress ha la sua pagina senza toccare il codice. Le voci con layout a scheda (avviso-7-2023,
 * avviso-20-2024-fse: dati in data/archivio-schede.js) usano components/ArchivioScheda.js.
 */

export async function getStaticPaths() {
  const voci = await getArchivio();
  const paths = [
    ...voci.filter((v) => !VOCI_SPOSTATE[v.slug]).map((v) => ({ params: { slug: v.slug.split('/') } })),
    ...FAMIGLIE.map((f) => ({ params: { slug: [f.chiave] } })),
  ];
  return { paths, fallback: isWpEnabled() ? 'blocking' : false };
}

async function getPageStaticProps({ params }) {
  const slug = params.slug.join('/');

  const famiglia = getFamiglia(slug);
  if (famiglia) {
    const voci = await getArchivio();
    return {
      props: { tipo: 'panoramica', famiglia, descr: descrizioneFamiglia(slug), sottovoci: sottovociPanoramica(famiglia, voci) },
      ...isrOptions(),
    };
  }

  const voce = await getVoce(slug);
  if (!voce || VOCI_SPOSTATE[slug]) return { notFound: true, ...isrOptions() };
  return { props: { tipo: 'voce', voce }, ...isrOptions() };
}

// Corpo delle pagine non a scheda: stesso schema della scheda (sezioni con titolo H2, righe a scheda), dentro ArchivioShell.
function Panoramica({ famiglia, descr, sottovoci }) {
  return (
    <ArchivioShell
      titolo={descr.titolo || famiglia.titolo}
      badge="Archivio"
      briciole={[{ label: 'Archivio', href: '/archivio' }, { label: famiglia.titolo }]}
    >
      {descr.descrizione && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>Di cosa si tratta</h2>
          <ArchivioTesto testo={descr.descrizione} className="text-slate-600 dark:text-gray-300 text-[0.95rem] leading-[1.85]" />
        </section>
      )}

      <section>
        <h2 className="text-slate-900 dark:text-gray-50" style={{ ...H2_STYLE, marginBottom: '1rem' }}>{famiglia.sezione}</h2>
        <ul style={{ ...LISTA_STYLE, gap: '0.75rem' }}>
          {sottovoci.map(({ slug, titolo }) => (
            <li key={slug}>
              <a href={`/archivio/${famiglia.chiave}/${slug}`} className={`${RIGA_CLASS} hover:border-[#008C95] transition-colors`} style={{ ...RIGA_STYLE, textDecoration: 'none' }}>
                <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{titolo}</span>
                <i className="fa-solid fa-chevron-right text-gray-500" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </ArchivioShell>
  );
}

function Voce({ voce }) {
  const dati = voce.documenti || {};
  const sezioni = SEZIONI.filter(({ key }) => (dati[key] || []).length > 0);
  const famiglia = getFamiglia(voce.famiglia);
  return (
    <ArchivioShell
      titolo={voce.titolo}
      badge={famiglia ? famiglia.titolo : 'Archivio'}
      metaTitolo={voce.metaTitolo}
      metaDescrizione={voce.metaDescrizione}
      briciole={[
        { label: 'Archivio', href: '/archivio' },
        ...(famiglia ? [{ label: famiglia.titolo, href: `/archivio/${famiglia.chiave}` }] : []),
        { label: voce.titolo },
      ]}
    >
      {voce.descrizione && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>Di cosa si tratta</h2>
          <ArchivioTesto testo={voce.descrizione} className="text-slate-600 dark:text-gray-300 text-[0.95rem] leading-[1.85]" />
        </section>
      )}

      {voce.destinatari && (
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>Requisiti di accesso</h2>
          <ArchivioTesto testo={voce.destinatari} className="text-slate-600 dark:text-gray-300 text-[0.95rem] leading-[1.85]" />
        </section>
      )}

      {sezioni.length > 0 ? (
        <section>
          <h2 className="text-slate-900 dark:text-gray-50" style={{ ...H2_STYLE, marginBottom: '1rem' }}>Documenti scaricabili</h2>
          {sezioni.map(({ key, label }) => (
            <div key={key} style={{ marginBottom: '1.75rem' }}>
              {/* Con più sezioni di documenti, una sottointestazione per tipo; con una sola l'elenco sta sotto il titolo */}
              {sezioni.length > 1 && (
                <h3 className="text-slate-700 dark:text-gray-200" style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>{label}</h3>
              )}
              <DocumentiLista documenti={dati[key]} />
            </div>
          ))}
        </section>
      ) : (
        <p className="text-slate-600 dark:text-gray-300">Nessun documento disponibile per questo avviso.</p>
      )}
    </ArchivioShell>
  );
}

export default function ArchivioPagina({ tipo, famiglia, descr, sottovoci, voce }) {
  // Voce con layout a scheda (hero, requisiti, documenti…): corpo con sezioni dedicate.
  if (tipo === 'voce' && voce.scheda) return <ArchivioScheda voce={voce} />;
  return tipo === 'panoramica' ? <Panoramica famiglia={famiglia} descr={descr} sottovoci={sottovoci} /> : <Voce voce={voce} />;
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
