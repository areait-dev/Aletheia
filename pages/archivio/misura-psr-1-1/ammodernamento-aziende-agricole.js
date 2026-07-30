import Header from '../../../components/Header';
import ArchivioTesto from '../../../components/ArchivioTesto';
import archivioIndex from '../../../public/pdf/archivio/index.json';
import descrizioniArchivio from '../../../public/pdf/archivio/descrizioni.json';

const SEZIONI = [
  { key: 'bandi-docenti', label: 'Bandi Docenti' },
  { key: 'bandi-tutor', label: 'Bandi Tutor' },
  { key: 'bandi-allievi', label: 'Bandi Allievi' },
  { key: 'altri', label: 'Altri Documenti' },
];

export default function AvvisoMisuraPsr11AmmodernamentoAziendeAgricole() {
  const dati = archivioIndex['misura-psr-1-1/ammodernamento-aziende-agricole'] || {};
  const descr = descrizioniArchivio['misura-psr-1-1/ammodernamento-aziende-agricole'] || {};

  return (
    <>
      <Header solid />
      <main className="bg-white dark:bg-gray-900 min-h-screen pt-40 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
            {descr.titolo || 'Ammodernamento Aziende Agricole'}
          </h1>

          {descr.descrizione && (
            <ArchivioTesto testo={descr.descrizione} className="mb-8 text-gray-600 dark:text-gray-300" />
          )}

          {descr.destinatari && (
            <div className="mb-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-3">
                Destinatari e requisiti
              </h2>
              <ArchivioTesto testo={descr.destinatari} className="text-gray-600 dark:text-gray-300" />
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium"
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
        </div>
      </main>
    </>
  );
}
