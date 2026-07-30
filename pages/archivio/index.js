import { useState } from 'react';
import Header from '../../components/Header';
import archivioIndex from '../../public/pdf/archivio/index.json';
import descrizioniArchivio from '../../public/pdf/archivio/descrizioni.json';

function titoloFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => (w.match(/^\d+$/) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

const FAMIGLIE = [
  { prefisso: 'misura-psr-1-1/', titolo: 'Misura PSR 1.1', panoramica: 'Panoramica Misura PSR 1.1' },
  { prefisso: 'avviso-2-2018/', titolo: 'Avviso 2/2018', panoramica: 'Panoramica Avviso 2/2018' },
];

function AccordionFamiglia({ famiglia, sottovoci, aperta, onToggle }) {
  return (
    <li className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:text-[#008C95] transition-colors"
      >
        <span className="text-gray-900 dark:text-gray-50 font-medium">{famiglia.titolo}</span>
        <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform ${aperta ? 'rotate-180' : ''}`} />
      </button>

      {aperta && (
        <ul className="border-t border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          <li>
            <a
              href={`/archivio/${famiglia.prefisso.slice(0, -1)}`}
              className="flex items-center justify-between px-4 py-3 pl-8 hover:text-[#008C95] transition-colors"
            >
              <span className="text-gray-600 dark:text-gray-300">{famiglia.panoramica}</span>
              <i className="fa-solid fa-chevron-right text-gray-400" />
            </a>
          </li>
          {sottovoci.map(({ slug, titolo }) => (
            <li key={slug}>
              <a
                href={`/archivio/${famiglia.prefisso}${slug}`}
                className="flex items-center justify-between px-4 py-3 pl-8 hover:text-[#008C95] transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300">{titolo}</span>
                <i className="fa-solid fa-chevron-right text-gray-400" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function ArchivioIndex() {
  const [famigliaAperta, setFamigliaAperta] = useState(null);

  const voci = [];
  const sottovociPerFamiglia = {};
  for (const famiglia of FAMIGLIE) sottovociPerFamiglia[famiglia.prefisso] = [];

  for (const slug of Object.keys(archivioIndex)) {
    const famiglia = FAMIGLIE.find((f) => slug.startsWith(f.prefisso));
    if (famiglia) {
      const sottoSlug = slug.slice(famiglia.prefisso.length);
      sottovociPerFamiglia[famiglia.prefisso].push({
        slug: sottoSlug,
        titolo: descrizioniArchivio[slug]?.titolo || titoloFromSlug(sottoSlug),
      });
    } else {
      voci.push(slug);
    }
  }

  return (
    <>
      <Header solid />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            Archivio
          </h1>
          <ul className="space-y-3">
            {voci.map((slug) => (
              <li key={slug}>
                <a
                  href={`/archivio/${slug}`}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-[#008C95] transition-colors"
                >
                  <span className="text-gray-900 dark:text-gray-50 font-medium">
                    {titoloFromSlug(slug)}
                  </span>
                  <i className="fa-solid fa-chevron-right text-gray-400" />
                </a>
              </li>
            ))}

            {FAMIGLIE.map((famiglia) =>
              sottovociPerFamiglia[famiglia.prefisso].length > 0 ? (
                <AccordionFamiglia
                  key={famiglia.prefisso}
                  famiglia={famiglia}
                  sottovoci={sottovociPerFamiglia[famiglia.prefisso]}
                  aperta={famigliaAperta === famiglia.prefisso}
                  onToggle={() =>
                    setFamigliaAperta((corrente) => (corrente === famiglia.prefisso ? null : famiglia.prefisso))
                  }
                />
              ) : null
            )}
          </ul>
        </div>
      </main>
    </>
  );
}
