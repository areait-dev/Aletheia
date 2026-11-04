import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { useSiteOptions } from '../context/SiteOptionsContext';
import { isrOptions } from '../lib/wp';
import { withSiteOptions } from '../lib/wp-site';
import { validaModulo } from '../lib/moduli';
import { useInvioModulo } from '../lib/use-invio-modulo';
import EsitoModulo from '../components/EsitoModulo';
import CampoTrappola from '../components/CampoTrappola';

const PAGE_TITLE = 'Pre-iscrizione al corso - Alètheia Srl';
const PAGE_DESCRIPTION =
  'Pre-iscriviti a un corso Alètheia Srl a partenza differita (OSS, ASACOM, Conduttore d\'Impresa Agricola): lasci i tuoi dati senza impegno e senza pagamento anticipato, ti contattiamo noi per quota e date.';

// Niente promesse su soglie o contatori: oggi non esiste un dato reale da cui prenderli (vedi MIGRAZIONE.md).
const PASSI = [
  { icon: 'fas fa-user-plus', titolo: 'Ti pre-iscrivi', testo: 'Lasci nome, email e telefono: bastano un minuto e nessun pagamento.' },
  { icon: 'fas fa-headset', titolo: 'Ti contattiamo', testo: 'Un consulente ti risponde per definire quota e date del corso.' },
  { icon: 'fas fa-calendar-check', titolo: 'Si parte', testo: 'Il corso si avvia quando si raggiunge il numero minimo di iscritti.' },
];

const EMPTY = { corso: '', nome: '', email: '', telefono: '', privacy: false };

// Campi: bordo input gray-500 in dark (3:1 minimo per i controlli, CLAUDE.md). Il colore del placeholder
// arriva dal token --placeholder in globals.css: niente classi placeholder-* qui.
const inputClass =
  'w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 dark:border-gray-500 ' +
  'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 ' +
  'outline-none focus:border-primary dark:focus:border-primary-on-dark transition-colors';

function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold tracking-wide text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-primary-text dark:text-primary-on-dark ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400 m-0 flex items-center gap-1.5">
          <i className="fas fa-exclamation-circle" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

// Pagina statica: nessun dato da WordPress, ma le opzioni globali (Header/Footer/identità) passano da withSiteOptions.
async function getPageStaticProps() {
  return { props: {}, ...isrOptions() };
}

export default function PreIscrizione() {
  const router = useRouter();
  const { identita, seo } = useSiteOptions();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // Invio reale: il server (pages/api/moduli/preiscrizione) risponde "ok" solo se Resend ha accettato l'email.
  const { inviando: loading, esito, invia, azzera } = useInvioModulo('preiscrizione', identita.email);
  const sent = esito?.stato === 'ok';

  // Il corso arriva da ?corso= (pulsante "Pre-iscriviti" della scheda corso). Non sovrascrive ciò che l'utente ha già scritto.
  useEffect(() => {
    if (!router.isReady) return;
    const { corso } = router.query;
    if (typeof corso === 'string' && corso.trim()) {
      setFields((p) => (p.corso ? p : { ...p, corso: corso.trim().slice(0, 200) }));
    }
  }, [router.isReady, router.query]);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  function mostraErrori(errs) {
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(first)?.focus();
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    // Regole condivise con il server: lib/moduli.ts
    const errs = validaModulo('preiscrizione', fields);
    if (Object.keys(errs).length > 0) { mostraErrori(errs); return; }
    setErrors({});
    const r = await invia(ev.currentTarget, fields);
    if (r.stato === 'errori') mostraErrori(r.errori);
  }

  function reset() {
    azzera();
    setFields(EMPTY);
    setErrors({});
  }

  const aria = (id) => ({ 'aria-invalid': !!errors[id], 'aria-describedby': errors[id] ? `${id}-error` : undefined });
  const cls = (id) => `${inputClass}${errors[id] ? ' !border-red-600 dark:!border-red-400' : ''}`;

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <SeoHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} url="/pre-iscrizione" ogImage={seo.ogImage || undefined} />
      </Head>

      <Header active="/all-courses" />

      <main>
        {/* HERO: componente comune .page-hero (globals.css) */}
        <section className="page-hero page-hero--dark page-hero--left">
          <div className="container">
            <div className="page-hero-badge">Senza impegno</div>
            <h1>Pre-iscrizione al corso</h1>
            <p>
              Lascia i tuoi dati: nessun pagamento anticipato. Ti contattiamo noi per definire quota e date quando il corso è in programma.
            </p>
          </div>
        </section>

        <section className="bg-light dark:bg-dark-bg py-16 md:py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
              {/* FORM */}
              <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-gray-700 p-6 md:p-10 shadow-sm">
                {sent ? (
                  <div className="text-center py-10" role="status">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#018891] flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-check text-white text-3xl" aria-hidden="true" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50 mb-3">Pre-iscrizione inviata!</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-2">
                      Grazie, abbiamo ricevuto la tua pre-iscrizione a <strong>{fields.corso}</strong>.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-8">
                      Ti ricontatteremo all&apos;indirizzo <strong>{fields.email}</strong> per definire quota e date.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a href="/all-courses" className="btn btn-primary btn-md">Torna ai corsi</a>
                      <button type="button" onClick={reset} className="btn btn-outline btn-md">Nuova pre-iscrizione</button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-50 mb-1">I tuoi dati</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 m-0">
                        I campi con <span className="text-primary-text dark:text-primary-on-dark font-bold">*</span> sono obbligatori.
                      </p>
                    </div>

                    <Field id="corso" label="Corso" required error={errors.corso}>
                      <input id="corso" name="corso" type="text" value={fields.corso} onChange={onChange} autoComplete="off"
                        placeholder="Es. Operatore Socio Sanitario (OSS)" className={cls('corso')} {...aria('corso')} />
                    </Field>

                    <Field id="nome" label="Nome e cognome" required error={errors.nome}>
                      <input id="nome" name="nome" type="text" value={fields.nome} onChange={onChange} autoComplete="name"
                        placeholder="Mario Rossi" className={cls('nome')} {...aria('nome')} />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="email" label="Email" required error={errors.email}>
                        <input id="email" name="email" type="email" value={fields.email} onChange={onChange} autoComplete="email"
                          placeholder="mario@esempio.it" className={cls('email')} {...aria('email')} />
                      </Field>
                      <Field id="telefono" label="Telefono" required error={errors.telefono}>
                        <input id="telefono" name="telefono" type="tel" value={fields.telefono} onChange={onChange} autoComplete="tel"
                          placeholder="+39 333 1234567" className={cls('telefono')} {...aria('telefono')} />
                      </Field>
                    </div>

                    <div>
                      <div className="flex items-start gap-3">
                        <input id="privacy" name="privacy" type="checkbox" checked={fields.privacy} onChange={onChange}
                          className="mt-1 w-4 h-4 accent-[#008C95] cursor-pointer shrink-0" {...aria('privacy')} />
                        <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer">
                          Ho letto e accetto la{' '}
                          <a href="/privacy-cookie" className="text-primary-text dark:text-primary-on-dark font-bold underline">Privacy Policy</a>{' '}
                          e acconsento al trattamento dei miei dati personali ai sensi del GDPR.{' '}
                          <span className="text-primary-text dark:text-primary-on-dark font-bold" aria-hidden="true">*</span>
                        </label>
                      </div>
                      {errors.privacy && (
                        <p id="privacy-error" role="alert" className="text-xs text-red-600 dark:text-red-400 mt-2 mb-0 flex items-center gap-1.5">
                          <i className="fas fa-exclamation-circle" aria-hidden="true" /> {errors.privacy}
                        </p>
                      )}
                    </div>

                    <CampoTrappola />
                    <EsitoModulo esito={esito} tipo="preiscrizione" valori={fields} />

                    <button type="submit" disabled={loading} className="btn btn-primary btn-lg self-start disabled:opacity-60">
                      {loading ? 'Invio in corso…' : 'Invia la pre-iscrizione'}
                      {!loading && <i className="fas fa-arrow-right btn-arrow" aria-hidden="true" />}
                    </button>
                  </form>
                )}
              </div>

              {/* COLONNA LATERALE: come funziona + contatti diretti */}
              <aside className="flex flex-col gap-6">
                <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-5">Come funziona</h2>
                  <ol className="list-none m-0 p-0 flex flex-col gap-5">
                    {PASSI.map((p, i) => (
                      <li key={p.titolo} className="flex gap-4">
                        <span className="w-10 h-10 rounded-xl bg-[#018891]/10 flex items-center justify-center shrink-0" aria-hidden="true">
                          <i className={`${p.icon} text-primary-text dark:text-primary-on-dark`} />
                        </span>
                        <div>
                          <p className="m-0 font-bold text-sm text-gray-900 dark:text-gray-50">{i + 1}. {p.titolo}</p>
                          <p className="m-0 mt-0.5 text-sm text-gray-600 dark:text-gray-300 leading-snug">{p.testo}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-4">Preferisci parlarci?</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-0 mb-4">
                    Lun - Ven: 9:00-13:00 / 14:00-18:00
                  </p>
                  <div className="flex flex-col gap-2">
                    <a href={`tel:${identita.telefono.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 font-semibold text-sm text-primary-text dark:text-primary-on-dark no-underline hover:underline">
                      {/* Niente classe `text-center` sulle icone: in globals.css .text-center aggiunge margin-top:3rem */}
                      <i className="fas fa-phone w-4 shrink-0 [text-align:center]" aria-hidden="true" /> {identita.telefono}
                    </a>
                    <a href={`mailto:${identita.email}`} className="flex items-center gap-3 font-semibold text-sm text-primary-text dark:text-primary-on-dark no-underline hover:underline break-all">
                      <i className="fas fa-envelope w-4 shrink-0 [text-align:center]" aria-hidden="true" /> {identita.email}
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
