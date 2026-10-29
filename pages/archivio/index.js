import { useState } from 'react';
import ArchivioShell, { LISTA_STYLE, RIGA_CLASS, RIGA_STYLE } from '../../components/ArchivioShell';
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
    <li className={`${RIGA_CLASS} overflow-hidden`} style={{ borderRadius: '0.75rem' }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left hover:text-[#008C95] transition-colors" style={{ padding: '0.85rem 1.25rem' }}
      >
        <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{famiglia.titolo}</span>
        <i className={`fa-solid fa-chevron-down text-gray-500 transition-transform ${aperta ? 'rotate-180' : ''}`} />
      </button>

      {aperta && (
        <ul className="border-t border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
          <li>
            <a
              href={`/archivio/${famiglia.chiave}`}
              className="flex items-center justify-between py-3 pl-8 pr-5 hover:text-[#008C95] transition-colors"
            >
              <span className="text-gray-600 dark:text-gray-300">{famiglia.panoramica}</span>
              <i className="fa-solid fa-chevron-right text-gray-500" />
            </a>
          </li>
          {famiglia.sottovoci.map(({ slug, titolo }) => (
            <li key={slug}>
              <a
                href={`/archivio/${famiglia.chiave}/${slug}`}
                className="flex items-center justify-between py-3 pl-8 pr-5 hover:text-[#008C95] transition-colors"
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
    <ArchivioShell
      titolo="Archivio"
      badge="Bandi e avvisi"
      briciole={[{ label: 'Archivio' }]}
    >
      <ul style={{ ...LISTA_STYLE, gap: '0.75rem' }}>
        {voci.map(({ slug, titolo }) => (
          <li key={slug}>
            <a href={`/archivio/${slug}`} className={`${RIGA_CLASS} hover:border-[#008C95] transition-colors`} style={{ ...RIGA_STYLE, textDecoration: 'none' }}>
              <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.9rem', fontWeight: 600 }}>{titolo}</span>
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
    </ArchivioShell>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
