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
import { whatsappLink, WHATSAPP_FORMAZIONE } from '../lib/whatsapp';
import CampoTrappola from '../components/CampoTrappola';

const PAGE_TITLE = 'Richiedi un preventivo - Alètheia Srl';
const PAGE_DESCRIPTION =
  'Richiedi un preventivo gratuito per i corsi di formazione Alètheia Srl: indica corso, partecipanti e modalità e ti rispondiamo entro 24 ore lavorative.';

// Per chi è il corso. "Per me" = privato (tipologia 'Privato', 1 partecipante, nessuna ragione sociale);
// "Per la mia azienda o ente" = tipologia a scelta tra Azienda ed Ente pubblico / PA (i valori che il campo "Sei" aveva prima), con ragione sociale e partecipanti.
const PER_ME = 'Per me';
const PER_AZIENDA = 'Per la mia azienda o ente';
const DESTINATARI = [PER_ME, PER_AZIENDA];
const TIPOLOGIE_ORGANIZZAZIONE = ['Azienda', 'Ente pubblico / PA'];
const MODALITA = ['Presso una sede Alètheia', 'Presso la mia azienda', 'Online / e-learning', 'Non lo so ancora'];

const PASSI = [
  { icon: 'fas fa-paper-plane', titolo: 'Invii la richiesta', testo: 'Compili il modulo in un minuto, senza impegno.' },
  { icon: 'fas fa-headset', titolo: 'Ti contattiamo', testo: 'Un consulente ti risponde entro 24 ore lavorative.' },
  { icon: 'fas fa-file-invoice', titolo: 'Ricevi il preventivo', testo: 'Quota e date su misura, gratuito e personalizzato.' },
];

// Dopo l'invio: cosa succede adesso
const PASSI_DOPO_INVIO = [
  { icon: 'fas fa-inbox', titolo: 'Richiesta ricevuta', testo: 'Abbiamo la tua richiesta: non devi fare altro.' },
  { icon: 'fas fa-headset', titolo: 'Quota e date entro 24 ore', testo: 'Un consulente ti scrive con quota e date, gratuito e senza impegno.' },
  { icon: 'fas fa-circle-check', titolo: 'Confermi il tuo posto', testo: 'Se la proposta ti va bene, ci dici come procedere e riserviamo il tuo posto.' },
];

const EMPTY = {
  corso: '', destinatario: '', tipologia: '', azienda: '', nome: '', cognome: '', email: '', telefono: '',
  partecipanti: '', modalita: '', messaggio: '', privacy: false,
};

// Campi: bordo input gray-500 in dark (3:1 minimo per i controlli, CLAUDE.md). Il colore del placeholder
// arriva dal token --placeholder in globals.css: niente classi placeholder-* qui.
const inputClass =
  'w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 dark:border-gray-500 ' +
  'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 ' +
  'outline-none focus:border-primary dark:focus:border-primary-on-dark transition-colors';

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold tracking-wide text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-primary-text dark:text-primary-on-dark ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-600 dark:text-gray-400 m-0">{hint}</p>}
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

export default function RichiediPreventivo() {
  const router = useRouter();
  const { identita, seo } = useSiteOptions();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // Invio reale: il server (pages/api/moduli/preventivo) risponde "ok" solo se Resend ha accettato l'email.
  const { inviando: loading, esito, invia, azzera } = useInvioModulo('preventivo', identita.email);
  const sent = esito?.stato === 'ok';

  // Il corso arriva da ?corso= (pulsante "Richiedi preventivo" delle schede corso). Non sovrascrive ciò che l'utente ha già scritto.
  useEffect(() => {
    if (!router.isReady) return;
    const { corso, edizione } = router.query;
    if (typeof corso === 'string' && corso.trim()) {
      setFields((p) => (p.corso ? p : { ...p, corso: corso.trim().slice(0, 200) }));
    }
    // ?edizione= (scheda corso): l'edizione scelta entra nelle note, modificabili. Non sovrascrive ciò che l'utente ha già scritto.
    if (typeof edizione === 'string' && edizione.trim()) {
      setFields((p) => (p.messaggio ? p : { ...p, messaggio: `Edizione di interesse: ${edizione.trim().slice(0, 150)}.` }));
    }
  }, [router.isReady, router.query]);

  const perMe = fields.destinatario === PER_ME;
  const perAzienda = fields.destinatario === PER_AZIENDA;
  const whatsapp = whatsappLink(process.env.NEXT_PUBLIC_WHATSAPP) || whatsappLink(WHATSAPP_FORMAZIONE);

  // Valori inviati e validati. "Per me": tipologia Privato, 1 partecipante, nessuna azienda (stessi campi di prima per il server e per l'email).
  const valoriInvio = () => (perMe ? { ...fields, tipologia: 'Privato', azienda: '', partecipanti: '1' } : fields);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  }

  // Regole condivise con il server: lib/moduli.ts
  function mostraErrori(errs) {
    setErrors(errs);
    // Porta il focus sul primo campo in errore
    const first = Object.keys(errs)[0];
    if (first) document.getElementById(first)?.focus();
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const valori = valoriInvio();
    const errs = validaModulo('preventivo', valori);
    if (Object.keys(errs).length > 0) { mostraErrori(errs); return; }
    setErrors({});
    const r = await invia(ev.currentTarget, valori);
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
        <SeoHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} url="/richiedi-preventivo" ogImage={seo.ogImage || undefined} />
      </Head>

      <Header active="/corsi" />

      <main>
        {/* HERO: componente comune .page-hero (globals.css) */}
        <section className="page-hero page-hero--dark page-hero--left">
          <div className="container">
            <div className="page-hero-badge">Preventivo gratuito</div>
            <h1>Richiedi un preventivo</h1>
            <p>
              Raccontaci quale corso ti interessa e quante persone vuoi formare: ti rispondiamo entro 24 ore lavorative con
              quota e date su misura.
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
                    <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-50 mb-3">Richiesta inviata!</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-2">
                      Grazie, abbiamo ricevuto la tua richiesta per <strong>{fields.corso}</strong>.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto mb-8">
                      Ti rispondiamo entro 24 ore lavorative all&apos;indirizzo <strong>{fields.email}</strong>.
                    </p>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-4">Cosa succede adesso</h3>
                    <ol className="list-none m-0 p-0 mb-8 flex flex-col gap-4 text-left max-w-md mx-auto">
                      {PASSI_DOPO_INVIO.map((p, i) => (
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
                    <div className="flex flex-wrap gap-3 justify-center">
                      {whatsapp && (
                        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md">
                          <i className="fab fa-whatsapp" aria-hidden="true" /> Scrivici su WhatsApp
                        </a>
                      )}
                      <a href="/corsi" className={`btn ${whatsapp ? 'btn-outline' : 'btn-primary'} btn-md`}>Torna ai corsi</a>
                      <button type="button" onClick={reset} className="btn btn-outline btn-md">Nuova richiesta</button>
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
                        placeholder="Es. Corso antincendio rischio medio" className={cls('corso')} {...aria('corso')} />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="destinatario" label="Per chi è il corso" required error={errors.destinatario}>
                        <select id="destinatario" name="destinatario" value={fields.destinatario} onChange={onChange} className={cls('destinatario')} {...aria('destinatario')}>
                          <option value="">Seleziona…</option>
                          {DESTINATARI.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </Field>
                      {perAzienda && (
                        <Field id="tipologia" label="Tipo di organizzazione" required error={errors.tipologia}>
                          <select id="tipologia" name="tipologia" value={fields.tipologia} onChange={onChange} className={cls('tipologia')} {...aria('tipologia')}>
                            <option value="">Seleziona…</option>
                            {TIPOLOGIE_ORGANIZZAZIONE.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </Field>
                      )}
                    </div>

                    {perAzienda && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field id="azienda" label="Ragione sociale" required error={errors.azienda}>
                          <input id="azienda" name="azienda" type="text" value={fields.azienda} onChange={onChange} autoComplete="organization"
                            placeholder="Es. Rossi S.r.l." className={cls('azienda')} {...aria('azienda')} />
                        </Field>
                        <Field id="partecipanti" label="Numero di partecipanti" required error={errors.partecipanti}>
                          <input id="partecipanti" name="partecipanti" type="number" inputMode="numeric" min="1" max="999" value={fields.partecipanti} onChange={onChange}
                            placeholder="Es. 10" className={cls('partecipanti')} {...aria('partecipanti')} />
                        </Field>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="nome" label="Nome" required error={errors.nome}>
                        <input id="nome" name="nome" type="text" value={fields.nome} onChange={onChange} autoComplete="given-name"
                          placeholder="Mario" className={cls('nome')} {...aria('nome')} />
                      </Field>
                      <Field id="cognome" label="Cognome" required error={errors.cognome}>
                        <input id="cognome" name="cognome" type="text" value={fields.cognome} onChange={onChange} autoComplete="family-name"
                          placeholder="Rossi" className={cls('cognome')} {...aria('cognome')} />
                      </Field>
                    </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="modalita" label="Modalità preferita" required error={errors.modalita}>
                        <select id="modalita" name="modalita" value={fields.modalita} onChange={onChange} className={cls('modalita')} {...aria('modalita')}>
                          <option value="">Seleziona…</option>
                          {MODALITA.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </Field>
                    </div>

                    <Field id="messaggio" label="Note (facoltativo)" hint="Date desiderate, esigenze particolari, sede dell'azienda…">
                      <textarea id="messaggio" name="messaggio" rows={4} value={fields.messaggio} onChange={onChange}
                        placeholder="Scrivi qui eventuali dettagli utili…" className={`${inputClass} resize-y`} />
                    </Field>

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
                    <EsitoModulo esito={esito} tipo="preventivo" valori={fields} />

                    <button type="submit" disabled={loading} className="btn btn-primary btn-lg self-start disabled:opacity-60">
                      {loading ? 'Invio in corso…' : 'Invia la richiesta'}
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
                      {/* Niente classe `text-center` sulle icone: in globals.css .text-center aggiunge margin-top:3rem e spingeva l'icona sotto il testo */}
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
