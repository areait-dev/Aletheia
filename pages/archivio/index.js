import { useState } from 'react';
import Header from '../../components/Header';
import { FAMIGLIE } from '../../data/archivio-famiglie';
import { getArchivio } from '../../lib/wp-archivio';
import { isrOptions } from '../../lib/wp';
import { withSiteOptions } from '../../lib/wp-site';

/* Elenco: voci locali storiche + voci del CPT `archivio` di WordPress (vedi lib/wp-archivio.ts).
   Le voci singole stanno in elenco; quelle di una famiglia, nel relativo accordion. */
async function getPageStaticProps() {
  const archivio = await getArchivio();
  const voci = archivio.filter((v) => !v.famiglia && !v.fuoriElenco).map((v) => ({ slug: v.slug, titolo: v.titoloIndice }));
  const famiglie = FAMIGLIE.map((f) => ({
    chiave: f.chiave,
    titolo: f.titolo,
    panoramica: f.panoramica,
    sottovoci: archivio.filter((v) => v.famiglia === f.chiave).map((v) => ({ slug: v.ultimo, titolo: v.titoloIndice })),
  })).filter((f) => f.sottovoci.length > 0);
  return { props: { voci, famiglie }, ...isrOptions() };
}

function AccordionFamiglia({ famiglia, aperta, onToggle }) {
  return (
    <li className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:text-[#008C95] transition-colors"
      >
        <span className="text-gray-900 dark:text-gray-50 font-medium">{famiglia.titolo}</span>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${aperta ? 'rotate-180' : ''}`} />
      </button>

      {aperta && (
        <ul className="border-t border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          <li>
            <a
              href={`/archivio/${famiglia.chiave}`}
              className="flex items-center justify-between px-4 py-3 pl-8 hover:text-[#008C95] transition-colors"
            >
              <span className="text-gray-600 dark:text-gray-300">{famiglia.panoramica}</span>
              <i className="fa-solid fa-chevron-right text-gray-500" />
            </a>
          </li>
          {famiglia.sottovoci.map(({ slug, titolo }) => (
            <li key={slug}>
              <a
                href={`/archivio/${famiglia.chiave}/${slug}`}
                className="flex items-center justify-between px-4 py-3 pl-8 hover:text-[#008C95] transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300">{titolo}</span>
                <i className="fa-solid fa-chevron-right text-gray-500" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ArchivioIndex({ voci, famiglie }) {
  const [famigliaAperta, setFamigliaAperta] = useState(null);

  return (
    <>
      <Header solid />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            Archivio
          </h1>
          <ul className="space-y-3">
            {voci.map(({ slug, titolo }) => (
              <li key={slug}>
                <a
                  href={`/archivio/${slug}`}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-[#008C95] transition-colors"
                >
                  <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {titolo}
                  </span>
                  <i className="fa-solid fa-chevron-right text-gray-500" />
                </a>
              </li>
            ))}

            {famiglie.map((famiglia) => (
              <AccordionFamiglia
                key={famiglia.chiave}
                famiglia={famiglia}
                aperta={famigliaAperta === famiglia.chiave}
                onToggle={() =>
                  setFamigliaAperta((corrente) => (corrente === famiglia.chiave ? null : famiglia.chiave))
                }
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
