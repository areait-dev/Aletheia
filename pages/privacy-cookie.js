import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyCookie() {
  return (
    <>
      <Head>
        <title>Privacy e Cookie | Alètheia S.r.l.</title>
      </Head>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 sm:px-12 py-24">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-xs tracking-widest uppercase mb-4 block">
            Trasparenza
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-10">
            Privacy e Cookie Policy
          </h1>

          <div className="space-y-10 text-gray-600 dark:text-gray-300 leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Informativa sulla Privacy</h2>
              <p>
                Alètheia S.r.l. si impegna a proteggere i dati degli utenti senza contribuire in alcun modo allo spam
                in rete. I suoi dati non verranno in nessun modo diffusi in rete o ceduti a terzi, se non quando ciò
                sia richiesto per obbligo di legge o sia tecnicamente necessario per l&apos;erogazione del servizio.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Raccolta dei dati</h2>
              <p className="mb-3">Il sito raccoglie informazioni attraverso:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>L&apos;invio di commenti (compresi indirizzo IP e dati del browser)</li>
                <li>Le interazioni con i contenuti multimediali presenti sul sito</li>
                <li>Le credenziali di accesso e le preferenze utente</li>
                <li>I contenuti incorporati da siti web esterni</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Diritti dell&apos;utente</h2>
              <p>
                Gli utenti possono richiedere in qualsiasi momento di verificare, modificare o cancellare le proprie
                informazioni personali scrivendo una email o una lettera all&apos;indirizzo della società: Via del
                Carrubo, snc - 97019 Vittoria (RG).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Categorie di cookie</h2>
              <p className="mb-3">Il sito utilizza diverse tipologie di cookie:</p>
              <ul className="list-disc list-inside space-y-1.5">
                <li><span className="font-semibold text-gray-800 dark:text-gray-100">Cookie tecnici</span>: consentono la navigazione e l&apos;autenticazione sul sito</li>
                <li><span className="font-semibold text-gray-800 dark:text-gray-100">Cookie di analisi</span>: monitorano le performance e il comportamento degli utenti</li>
                <li><span className="font-semibold text-gray-800 dark:text-gray-100">Cookie di preferenza</span>: memorizzano scelte dell&apos;utente come la lingua</li>
                <li><span className="font-semibold text-gray-800 dark:text-gray-100">Cookie pubblicitari</span>: forniscono contenuti mirati in base alle abitudini di navigazione</li>
                <li><span className="font-semibold text-gray-800 dark:text-gray-100">Cookie dei social network</span>: abilitano la condivisione di contenuti</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Conservazione dei dati</h2>
              <p>
                I commenti vengono conservati a tempo indeterminato per finalità di moderazione. Le informazioni degli
                utenti registrati possono essere modificate o cancellate su richiesta. Il trattamento dei dati avviene
                nel rispetto del Regolamento UE 2016/679 (GDPR).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">Gestione dei cookie</h2>
              <p>
                Gli utenti possono disabilitare i cookie tramite le impostazioni del browser (Internet Explorer,
                Chrome, Firefox, Opera, Safari). Le preferenze possono essere modificate in qualsiasi momento tramite
                il banner di consenso presente sul sito.
              </p>
            </div>

            <p className="text-sm text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
              Ultimo aggiornamento: 10 Gennaio 2022
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
