import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import SeoHead from './SeoHead';
import { useSiteOptions } from '../context/SiteOptionsContext';
import { validaModulo } from '../lib/moduli';
import { useInvioModulo } from '../lib/use-invio-modulo';
import EsitoModulo from './EsitoModulo';
import CampoTrappola from './CampoTrappola';

/**
 * Un solo modulo per due casi (cambiano solo i testi e l'oggetto dell'email, che sta in lib/moduli.ts):
 *  - iscrizione: corsi del catalogo a partenza differita (OSS, ASACOM, Conduttore d'Impresa Agricola, BLSD...);
 *  - preiscrizione: avvisi pubblici (corsi finanziati). Non garantisce il posto: requisiti e graduatorie.
 * Niente promesse su soglie o contatori: oggi non esiste un dato reale da cui prenderli (vedi MIGRAZIONE.md).
 */
export const TESTI = {
  iscrizione: {
    url: '/iscrizione',
    pageTitle: 'Iscrizione al corso - Alètheia Srl',
    pageDescription:
      "Iscriviti a un corso Alètheia Srl a partenza differita (OSS, ASACOM, Conduttore d'Impresa Agricola, BLSD): lasci i tuoi dati senza pagamento anticipato, ti contattiamo noi per quota e date.",
    badge: 'Nessun pagamento anticipato',
    h1: 'Iscrizione al corso',
    intro: 'Lascia i tuoi dati: nessun pagamento anticipato. Ti contattiamo noi per definire quota e date quando il corso è in programma.',
    passi: [
      { icon: 'fas fa-user-plus', titolo: 'Ti iscrivi', testo: 'Lasci nome, email e telefono: bastano un minuto e nessun pagamento.' },
      { icon: 'fas fa-headset', titolo: 'Ti contattiamo', testo: 'Un consulente ti risponde per definire quota e date del corso.' },
      { icon: 'fas fa-calendar-check', titolo: 'Si parte', testo: 'Il corso si avvia quando si raggiunge il numero minimo di iscritti.' },
    ],
    avviso: null,
    placeholderCorso: 'Es. Operatore Socio Sanitario (OSS)',
    inviata: 'Iscrizione inviata!',
    ricevuta: 'abbiamo ricevuto la tua iscrizione a',
    seguito: 'per definire quota e date.',
    bottone: "Invia l'iscrizione",
    nuova: 'Nuova iscrizione',
  },
  preiscrizione: {
    url: '/pre-iscrizione',
    pageTitle: 'Pre-iscrizione al corso - Alètheia Srl',
    pageDescription:
      'Pre-iscriviti a un corso finanziato Alètheia Srl (avvisi pubblici): lasci i tuoi dati senza impegno e senza pagamento. La pre-iscrizione non garantisce il posto: ti ricontattiamo per i requisiti e le graduatorie.',
    badge: 'Senza impegno',
    h1: 'Pre-iscrizione al corso',
    intro: 'Lascia i tuoi dati per i corsi finanziati dagli avvisi pubblici. La pre-iscrizione non garantisce il posto: ti ricontatteremo per i requisiti e le graduatorie.',
    passi: [
      { icon: 'fas fa-user-plus', titolo: 'Ti pre-iscrivi', testo: 'Lasci nome, email e telefono: bastano un minuto e nessun pagamento.' },
      { icon: 'fas fa-headset', titolo: 'Ti ricontattiamo', testo: "Un consulente verifica con te i requisiti di accesso previsti dall'avviso." },
      { icon: 'fas fa-list-ol', titolo: 'Graduatorie', testo: "L'ammissione dipende dai requisiti e dalle graduatorie dell'avviso." },
    ],
    avviso: "La pre-iscrizione non garantisce il posto: ti ricontatteremo per verificare i requisiti e comunicarti l'esito delle graduatorie.",
    placeholderCorso: 'Es. Avviso n. 1/2026 POC Sicilia',
    inviata: 'Pre-iscrizione inviata!',
    ricevuta: 'abbiamo ricevuto la tua pre-iscrizione a',
    seguito: "per verificare i requisiti e le graduatorie. La pre-iscrizione non garantisce il posto.",
    bottone: 'Invia la pre-iscrizione',
    nuova: 'Nuova pre-iscrizione',
  },
};

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

export default function ModuloIscrizione({ tipo = 'iscrizione' }) {
  const T = TESTI[tipo] || TESTI.iscrizione;
  const router = useRouter();
  const { identita, seo } = useSiteOptions();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // Invio reale: il server (pages/api/moduli/<tipo>) risponde "ok" solo se Resend ha accettato l'email.
  const { inviando: loading, esito, invia, azzera } = useInvioModulo(tipo, identita.email);
  const sent = esito?.stato === 'ok';

  // Il corso arriva da ?corso= (pulsante "Iscriviti"/"Pre-iscriviti" della scheda corso). Non sovrascrive ciò che l'utente ha già scritto.
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
    const errs = validaModulo(tipo, fields);
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
        <title>{T.pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <SeoHead title={T.pageTitle} description={T.pageDescription} url={T.url} ogImage={seo.ogImage || undefined} />
      </Head>

      <Header active="/corsi" />

      <main>
        {/* HERO: componente comune .page-hero (globals.css) */}
        <section className="page-hero page-hero--dark page-hero--left">
          <div className="container">
            <div className="page-hero-badge">{T.badge}</div>
            <h1>{T.h1}</h1>
            <p>{T.intro}</p>
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
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50 mb-3">{T.inviata}</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-2">
                      Grazie, {T.ricevuta} <strong>{fields.corso}</strong>.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-8">
                      Ti ricontatteremo all&apos;indirizzo <strong>{fields.email}</strong> {T.seguito}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <a href="/corsi" className="btn btn-primary btn-md">Torna ai corsi</a>
                      <button type="button" onClick={reset} className="btn btn-outline btn-md">{T.nuova}</button>
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
                        placeholder={T.placeholderCorso} className={cls('corso')} {...aria('corso')} />
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

                    {T.avviso && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-xl flex gap-3 items-start" style={{ padding: '0.85rem 1rem' }}>
                        <i className="fas fa-info-circle shrink-0" style={{ color: '#D97706', marginTop: '0.15rem' }} aria-hidden="true" />
                        <p className="text-amber-800 dark:text-amber-200 m-0 text-sm leading-relaxed">{T.avviso}</p>
                      </div>
                    )}

                    <CampoTrappola />
                    <EsitoModulo esito={esito} tipo={tipo} valori={fields} />

                    <button type="submit" disabled={loading} className="btn btn-primary btn-lg self-start disabled:opacity-60">
                      {loading ? 'Invio in corso…' : T.bottone}
                      {!loading && <i className="fas fa-arrow-right btn-arrow" aria-hidden="true" />}
                    </button>
                  </form>
                )}
              </div>

              {/* COLONNA LATERALE: come funziona + contatti diretti */}
              <aside className="form-side-sticky flex flex-col gap-6">
                <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-5">Come funziona</h2>
                  <ol className="list-none m-0 p-0 flex flex-col gap-5">
                    {T.passi.map((p, i) => (
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

