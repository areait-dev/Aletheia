import Header from '../../components/Header';
import ArchivioTesto from '../../components/ArchivioTesto';
import descrizioniArchivio from '../../public/pdf/archivio/descrizioni.json';

const SOTTOVOCI = [
  { slug: 'corso-di-cucina', titolo: 'Corso di Cucina (576 ore)' },
  { slug: 'operatore-informatico-risorse-web', titolo: 'Operatore Informatico di risorse Web (544 ore)' },
  { slug: 'addetto-panificatore-pasticciere', titolo: 'Addetto panificatore e pasticciere (644 ore)' },
];

export default function Avviso22018() {
  const descr = descrizioniArchivio['avviso-2-2018'] || {};

  return (
    <>
      <Header solid />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            {descr.titolo || 'Avviso 2/2018'}
          </h1>

          {descr.descrizione && (
            <ArchivioTesto testo={descr.descrizione} className="mb-10 text-gray-600 dark:text-gray-300" />
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Corsi
            </h2>
            <ul className="space-y-3">
              {SOTTOVOCI.map(({ slug, titolo }) => (
                <li key={slug}>
                  <a
                    href={`/archivio/avviso-2-2018/${slug}`}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-[#008C95] transition-colors"
                  >
                    <span className="text-gray-900 dark:text-gray-50 font-medium">{titolo}</span>
                    <i className="fa-solid fa-chevron-right text-gray-400" />
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
