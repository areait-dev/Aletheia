import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { finalitaTrattamento, categorieCookie, censimentoCookie, cronologiaRevisioni } from '../data/privacy';
import { getPagina } from '../lib/wp-pagine';
import { isrOptions } from '../lib/wp';
import { withSiteOptions } from '../lib/wp-site';

function SectionTitle({ children, id }) {
  return (
    <h2 id={id} className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4 scroll-mt-24">
      {children}
    </h2>
  );
}

function SubTitle({ children }) {
  return (
    <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2 mt-6">
      {children}
    </h3>
  );
}

function DataTable({ head, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 my-4">
      <table className="w-full text-left text-sm border-collapse min-w-[720px]">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-bold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

// Testi e contenuto: pagina WordPress "privacy-cookie" se WP_URL è impostato e ha un contenuto; altrimenti il testo qui sotto.
async function getPageStaticProps() {
  return { props: { pagina: await getPagina('privacy-cookie') }, ...isrOptions() };
}

export default function PrivacyCookie({ pagina }) {
  const T = pagina.testi;
  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Privacy e Cookie Policy | Alètheia S.r.l."}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pagina.seo.descrizione || "Informativa Privacy e Cookie Policy ufficiale del sito web di Alètheia S.r.l., Vittoria (RG). Aggiornata ai sensi del GDPR."}
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header />

      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-40 pb-24">
          <span className="text-primary-text dark:text-primary-on-dark font-bold text-xs tracking-widest uppercase mb-4 block">{T.hero_eyebrow}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-3">{T.hero_titolo}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">{T.hero_sottotitolo}</p>

          {pagina.contenuto ? (
            <div className="legal-content" dangerouslySetInnerHTML={{ __html: pagina.contenuto }} />
          ) : (
            <>
          {/* Box titolare del trattamento */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
              Dati del Titolare del trattamento
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Titolare:</dt>
                <dd>Alètheia S.r.l.</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">P.IVA:</dt>
                <dd>01524530894</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Sede:</dt>
                <dd>Via del Carrubo snc, 97019 Vittoria (RG)</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">Tel.:</dt>
                <dd>+39 0932 862613</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">E-mail:</dt>
                <dd>info@aletheiasrl.it</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold shrink-0">PEC:</dt>
                <dd>aletheia.srl@legalmail.it</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-14 text-gray-600 dark:text-gray-300 leading-relaxed">

            {/* ══════════════ 1. PRIVACY POLICY ══════════════ */}
            <div>
              <span className="text-primary-text dark:text-primary-on-dark font-bold text-xs tracking-widest uppercase mb-2 block">
                Sezione 1
              </span>
              <SectionTitle id="privacy-policy">Privacy Policy</SectionTitle>

              <SubTitle>1.1 Titolare del trattamento</SubTitle>
              <p>
                Per l&apos;esercizio dei diritti previsti dalla normativa privacy è possibile contattare il Titolare
                del trattamento ai recapiti indicati nel box &quot;Dati del Titolare del trattamento&quot; in cima a questa pagina.
              </p>

              <SubTitle>1.2 Finalità del trattamento e basi giuridiche</SubTitle>
              <DataTable
                head={['Finalità', 'Dati trattati', 'Base giuridica', 'Conservazione']}
                rows={finalitaTrattamento.map((r) => (
                  <tr key={r.finalita} className="border-b border-gray-100 dark:border-gray-800 last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{r.finalita}</td>
                    <td className="px-4 py-3">{r.dati}</td>
                    <td className="px-4 py-3">{r.base}</td>
                    <td className="px-4 py-3">{r.conservazione}</td>
                  </tr>
                ))}
              />

              <SubTitle>1.3 Destinatari e soggetti autorizzati</SubTitle>
              <p>
                I dati possono essere trattati da personale autorizzato di Alètheia S.r.l. e da fornitori o consulenti
                esterni nominati responsabili del trattamento ai sensi dell&apos;art. 28 GDPR. I dati possono essere
                comunicati a soggetti pubblici o autorità quando previsto dalla legge.
              </p>

              <SubTitle>1.4 Trasferimenti extra UE</SubTitle>
              <p>
                Eventuali trasferimenti verso Paesi extra UE avverranno solo in presenza di adeguate garanzie ai sensi
                del GDPR (decisioni di adeguatezza, clausole contrattuali standard, ecc.).
              </p>

              <SubTitle>1.5 Diritti dell&apos;interessato</SubTitle>
              <p className="mb-3">
                In qualità di interessato, hai diritto a:
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>Accesso ai tuoi dati personali</li>
                <li>Rettifica dei dati inesatti o incompleti</li>
                <li>Cancellazione dei dati (diritto all&apos;oblio)</li>
                <li>Limitazione del trattamento</li>
                <li>Opposizione al trattamento</li>
                <li>Portabilità dei dati</li>
                <li>Revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basato sul consenso prima della revoca</li>
              </ul>
              <p className="mt-3">
                Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali.
              </p>
            </div>

            {/* ══════════════ 2. COOKIE POLICY ══════════════ */}
            <div>
              <span className="text-primary-text dark:text-primary-on-dark font-bold text-xs tracking-widest uppercase mb-2 block">
                Sezione 2
              </span>
              <SectionTitle id="cookie-policy">Cookie Policy</SectionTitle>

              <SubTitle>2.1 Premessa</SubTitle>
              <p>
                Il sito utilizza cookie per garantire il funzionamento e raccogliere statistiche. La semplice
                prosecuzione della navigazione, lo scroll o la chiusura del banner non costituiscono consenso valido.
              </p>

              <SubTitle>2.2 Categorie di cookie</SubTitle>
              <ul className="list-disc list-inside space-y-1.5">
                {categorieCookie.map((c) => (
                  <li key={c.nome}>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{c.nome}</span>
                    {' '}<span className="text-gray-500 dark:text-gray-400">({c.nota})</span>
                  </li>
                ))}
              </ul>

              <SubTitle>2.3 Tabella di censimento dei cookie</SubTitle>
              <DataTable
                head={['Categoria', 'Nome', 'Fornitore', 'Finalità', 'Durata', 'Base giuridica', 'Note']}
                rows={censimentoCookie.map((c) => (
                  <tr key={c.nome} className="border-b border-gray-100 dark:border-gray-800 last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{c.categoria}</td>
                    <td className="px-4 py-3">{c.nome}</td>
                    <td className="px-4 py-3">{c.fornitore}</td>
                    <td className="px-4 py-3">{c.finalita}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{c.durata}</td>
                    <td className="px-4 py-3">{c.base}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{c.note || '—'}</td>
                  </tr>
                ))}
              />

              <SubTitle>2.4 Gestione del consenso</SubTitle>
              <p>
                Per impostazione predefinita sono attivi solo i cookie tecnici. L&apos;utente può modificare o
                revocare il consenso in qualsiasi momento tramite il link o pulsante &quot;Gestisci preferenze
                cookie&quot;.
              </p>
            </div>

            {/* ══════════════ 3. TESTO BANNER COOKIE ══════════════ */}
            <div>
              <span className="text-primary-text dark:text-primary-on-dark font-bold text-xs tracking-widest uppercase mb-2 block">
                Sezione 3
              </span>
              <SectionTitle>Testo per il banner cookie</SectionTitle>
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                Copia ufficiale di riferimento per il componente banner di consenso cookie del sito.
              </p>
              <blockquote className="border-l-4 border-primary dark:border-primary-on-dark bg-gray-50 dark:bg-gray-800 rounded-r-xl px-5 py-4 italic text-gray-700 dark:text-gray-200">
                Questo sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie o strumenti
                di terze parti per statistiche, contenuti incorporati o altre finalità indicate nella Cookie Policy.
                Puoi accettare tutti i cookie, rifiutare quelli non necessari o personalizzare le tue preferenze. Puoi
                modificare o revocare il consenso in qualsiasi momento tramite il link &quot;Gestisci preferenze
                cookie&quot;.
              </blockquote>
            </div>

            {/* ══════════════ 4. CRONOLOGIA REVISIONI ══════════════ */}
            <div>
              <SectionTitle>Cronologia revisioni</SectionTitle>
              <DataTable
                head={['Revisione', 'Data', 'Descrizione']}
                rows={cronologiaRevisioni.map((r) => (
                  <tr key={r.rev} className="border-b border-gray-100 dark:border-gray-800 last:border-0 align-top">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">{r.rev}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.data}</td>
                    <td className="px-4 py-3">{r.descrizione}</td>
                  </tr>
                ))}
              />
            </div>

          </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

// Opzioni globali (Header/Footer) da WordPress o dati locali: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
