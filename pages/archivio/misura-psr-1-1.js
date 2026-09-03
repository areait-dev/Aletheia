import Header from '../../components/Header';
import ArchivioTesto from '../../components/ArchivioTesto';
import descrizioniArchivio from '../../public/pdf/archivio/descrizioni.json';

const SOTTOVOCI = [
  { slug: 'conduttore-impresa-agricola', titolo: 'Conduttore d’impresa agricola (200 ore)' },
  { slug: 'ammodernamento-aziende-agricole', titolo: 'Ammodernamento aziende agricole (20 ore)' },
  { slug: 'nuove-strategie-sviluppo-investimento', titolo: 'Nuove strategie di sviluppo e investimento (48 ore)' },
  { slug: 'workshop-strategie-marketing', titolo: 'Workshop | Strategie di marketing per le aziende agricole (8 ore)' },
  { slug: 'workshop-funzione-innovativa', titolo: 'Workshop | La funzione innovativa nelle aziende agricole (8 ore)' },
  { slug: 'workshop-agricoltura-multifunzionalita', titolo: 'Workshop | Agricoltura, multifunzionalità e diversificazione (8 ore)' },
  { slug: 'workshop-conduttore-impresa-agricola', titolo: 'Workshop | Il conduttore di impresa agricola (8 ore)' },
];

export default function MisuraPsr11() {
  const descr = descrizioniArchivio['misura-psr-1-1'] || {};

  return (
    <>
      <Header solid />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            {descr.titolo || 'Misura PSR 1.1'}
          </h1>

          {descr.descrizione && (
            <ArchivioTesto testo={descr.descrizione} className="mb-10 text-gray-600 dark:text-gray-300" />
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Corsi e workshop
            </h2>
            <ul className="space-y-3">
              {SOTTOVOCI.map(({ slug, titolo }) => (
                <li key={slug}>
                  <a
                    href={`/archivio/misura-psr-1-1/${slug}`}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-[#008C95] transition-colors"
                  >
                    <span className="text-gray-900 dark:text-gray-50 font-medium">{titolo}</span>
                    <i className="fa-solid fa-chevron-right text-gray-500" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
