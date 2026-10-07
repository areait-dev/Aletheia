import Header from '../../components/Header';
import ArchivioTesto from '../../components/ArchivioTesto';
import ArchivioScheda from '../../components/ArchivioScheda';
import { FAMIGLIE } from '../../data/archivio-famiglie';
import { descrizioneFamiglia, getArchivio, getFamiglia, getVoce, SEZIONI, sottovociPanoramica } from '../../lib/wp-archivio';
import { isWpEnabled, isrOptions } from '../../lib/wp';
import { withSiteOptions } from '../../lib/wp-site';

/**
 * Archivio dei bandi: un'unica rotta per tutte le pagine.
 *  /archivio/<famiglia>            panoramica di una famiglia (Misura PSR 1.1, Avviso 2/2018)
 *  /archivio/<slug>                voce singola
 *  /archivio/<famiglia>/<slug>     voce di una famiglia
 * Le voci arrivano dai dati locali storici e dal CPT `archivio` di WordPress (lib/wp-archivio.ts): una voce nuova
 * creata in WordPress ha la sua pagina senza toccare il codice. Le voci con layout a scheda (avviso-1-2026-poc,
 * avviso-20-2024-fse: dati in data/archivio-schede.js) usano components/ArchivioScheda.js.
 */

export async function getStaticPaths() {
  const voci = await getArchivio();
  const paths = [
    ...voci.map((v) => ({ params: { slug: v.slug.split('/') } })),
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
  if (!voce) return { notFound: true, ...isrOptions() };
  return { props: { tipo: 'voce', voce }, ...isrOptions() };
}

function Panoramica({ famiglia, descr, sottovoci }) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
        {descr.titolo || famiglia.titolo}
      </h1>

      {descr.descrizione && (
        <ArchivioTesto testo={descr.descrizione} className="mb-10 text-gray-600 dark:text-gray-300" />
      )}

      <section>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          {famiglia.sezione}
        </h2>
        <ul className="space-y-3">
          {sottovoci.map(({ slug, titolo }) => (
            <li key={slug}>
              <a
                href={`/archivio/${famiglia.chiave}/${slug}`}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-[#008C95] transition-colors"
              >
                <span className="text-gray-900 dark:text-gray-50 font-medium">{titolo}</span>
                <i className="fa-solid fa-chevron-right text-gray-500" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Voce({ voce }) {
  const dati = voce.documenti || {};

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
        {voce.titolo}
      </h1>

      {voce.descrizione && (
        <ArchivioTesto testo={voce.descrizione} className="mb-8 text-gray-600 dark:text-gray-300" />
      )}

      {voce.destinatari && (
        <div className="mb-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
            Destinatari e requisiti
          </h2>
          <ArchivioTesto testo={voce.destinatari} className="text-gray-600 dark:text-gray-300" />
        </div>
      )}

      {SEZIONI.map(({ key, label }) => {
        const documenti = dati[key] || [];
        if (documenti.length === 0) return null;

        return (
          <section key={key} className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
              {label}
            </h2>
            <ul className="space-y-3">
              {documenti.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3"
                >
                  <span className="text-gray-600 dark:text-gray-300">
                    {doc.titoloLink}
                  </span>
                  <a
                    href={doc.percorsoLocale}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 min-h-9 whitespace-nowrap rounded-full text-white font-medium text-sm"
                    style={{ backgroundColor: '#008C95' }}
                  >
                    <i className="fa-solid fa-download" />
                    Scarica PDF
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {Object.values(dati).every((arr) => !arr || arr.length === 0) && (
        <p className="text-gray-600 dark:text-gray-300">
          Nessun documento disponibile per questo avviso.
        </p>
      )}
    </>
  );
}

export default function ArchivioPagina({ tipo, famiglia, descr, sottovoci, voce }) {
  // Voce con layout a scheda (hero, requisiti, documenti…): pagina completa, con Header e Footer propri.
  if (tipo === 'voce' && voce.scheda) return <ArchivioScheda voce={voce} />;
  return (
    <>
      <Header solid />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {tipo === 'panoramica' ? <Panoramica famiglia={famiglia} descr={descr} sottovoci={sottovoci} /> : <Voce voce={voce} />}
        </div>
      </main>
    </>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
