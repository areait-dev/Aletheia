import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { isrOptions } from '../lib/wp';
import { withSiteOptions } from '../lib/wp-site';

/**
 * Pagina 404 del sito. Next la serve con stato HTTP 404 reale (è pages/404.js: pagina statica, non una pagina normale che mostra un messaggio).
 * Non va indicizzata (noindex) e propone i punti da cui ripartire: corsi, calendario, contatti. Passa da _app come ogni altra pagina
 * (chat, tema); intestazione e piè di pagina arrivano dalle opzioni globali (getStaticProps con withSiteOptions).
 */
const LINK = [
  { href: '/corsi', label: 'Tutti i corsi', icona: 'fas fa-graduation-cap', primario: true },
  { href: '/calendario-corsi', label: 'Calendario corsi', icona: 'fas fa-calendar-days' },
  { href: '/contatti', label: 'Contatti', icona: 'fas fa-envelope' },
];

async function getPageStaticProps() {
  return { props: {}, ...isrOptions() };
}

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Pagina non trovata - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header />

      <main>
        <section className="page-hero page-hero--dark page-hero--left">
          <div className="container">
            <div className="page-hero-badge">Errore 404</div>
            <h1>Pagina non trovata</h1>
            <p>La pagina che cerchi non esiste più o l&apos;indirizzo non è corretto. Da qui puoi ripartire.</p>
          </div>
        </section>

        <section className="bg-light dark:bg-dark-bg py-16 md:py-20">
          <div className="container">
            <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-gray-700 p-6 md:p-10 shadow-sm max-w-2xl">
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-50 mb-2">Dove vuoi andare?</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Scegli una di queste pagine, oppure torna alla home.</p>
              <div className="flex flex-wrap gap-3">
                {LINK.map((l) => (
                  <a key={l.href} href={l.href} className={`btn ${l.primario ? 'btn-primary' : 'btn-outline'} btn-md`}>
                    <i className={l.icona} aria-hidden="true" /> {l.label}
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 mb-0">
                <a href="/" className="text-primary-text dark:text-primary-on-dark font-bold">Torna alla home</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps = withSiteOptions(getPageStaticProps);
