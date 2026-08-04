import Head from 'next/head';
import { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EMPTY = {
  nome: '', email: '', tipologia: '', parti: '', oggetto: '', messaggio: '',
  privacy: false, allegato: null,
};

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold tracking-wide text-gray-700 dark:text-gray-300">
        {label}{required && <span className="text-teal-600 dark:text-teal-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg text-sm border border-gray-300 dark:border-gray-700 ' +
  'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 ' +
  'outline-none focus:border-teal-600 dark:focus:border-teal-400 transition-colors';

export default function ReclamiProposte() {
  const [fields, setFields] = useState(EMPTY);
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setFields((p) => ({ ...p, allegato: file }));
      setFileName(file.name);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <>
      <Head>
        <title>Reclami e Proposte | Alètheia S.r.l.</title>
      </Head>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="max-w-3xl mx-auto px-6 sm:px-12 py-20">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-xs tracking-widest uppercase mb-4 block">
            Trasparenza
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
            Reclami e Proposte
          </h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            Ti invitiamo a compilare il seguente form, che può essere inviato anche in forma anonima. Il tuo
            contributo ci aiuta a migliorare la qualità del nostro servizio. In alternativa, puoi scaricare il
            modulo di segnalazione e inviarlo via email a{' '}
            <a href="mailto:segnalazioni@aletheiasrl.it" className="text-teal-600 dark:text-teal-400 underline">
              segnalazioni@aletheiasrl.it
            </a>, oppure allegarlo direttamente nel form.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center border border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800">
              <div className="w-16 h-16 rounded-full bg-teal-600/10 border-2 border-teal-600 flex items-center justify-center text-teal-600 dark:text-teal-400 text-2xl">
                <i className="fas fa-check" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Segnalazione inviata!</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm">
                Grazie per averci contattato. Valuteremo la tua segnalazione nel più breve tempo possibile.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFields(EMPTY); setFileName(''); }}
                className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-teal-600 text-teal-600 dark:text-teal-400 dark:border-teal-400 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-400 dark:hover:text-gray-900 transition-colors"
              >
                Invia un&apos;altra segnalazione
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nome e Cognome">
                  <input type="text" value={fields.nome} onChange={set('nome')} placeholder="Mario Rossi" className={inputClass} />
                </Field>
                <Field label="Email">
                  <input type="email" value={fields.email} onChange={set('email')} placeholder="mario@esempio.it" className={inputClass} />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Tipologia di comunicazione" required>
                  <select value={fields.tipologia} onChange={set('tipologia')} className={inputClass}>
                    <option value="">Seleziona…</option>
                    <option value="Proposta">Proposta</option>
                    <option value="Reclamo">Reclamo</option>
                    <option value="Altro">Altro</option>
                  </select>
                </Field>
                <Field label="Parti interessate" required>
                  <select value={fields.parti} onChange={set('parti')} className={inputClass}>
                    <option value="">Seleziona…</option>
                    <option value="Fornitori">Fornitori</option>
                    <option value="Dipendenti">Dipendenti</option>
                    <option value="Clienti">Clienti</option>
                    <option value="Altro">Altro</option>
                  </select>
                </Field>
              </div>

              <Field label="Oggetto" required>
                <input type="text" value={fields.oggetto} onChange={set('oggetto')} placeholder="Oggetto della segnalazione" className={inputClass} />
              </Field>

              <Field label="Messaggio" required>
                <textarea
                  value={fields.messaggio}
                  onChange={set('messaggio')}
                  rows={5}
                  placeholder="Descrivi la tua segnalazione…"
                  className={inputClass + ' resize-y'}
                />
              </Field>

              <Field label="Allega il modulo (opzionale, max 100 MB)">
                <div
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer border border-dashed border-teal-600/40 dark:border-teal-400/40 bg-teal-600/5 dark:bg-teal-400/5 hover:border-teal-600 dark:hover:border-teal-400 transition-colors"
                >
                  <span className={`text-sm ${fileName ? 'text-gray-900 dark:text-gray-50' : 'text-gray-400 dark:text-gray-500'}`}>
                    {fileName || 'Clicca per allegare un file'}
                  </span>
                </div>
                <input ref={fileRef} type="file" onChange={handleFile} className="hidden" />
              </Field>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fields.privacy}
                  onChange={(e) => setFields((p) => ({ ...p, privacy: e.target.checked }))}
                  className="mt-1"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ho letto e accetto la{' '}
                  <a href="/privacy-cookie" className="text-teal-600 dark:text-teal-400 underline">
                    Privacy Policy
                  </a>{' '}
                  di Alètheia S.r.l.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="self-start mt-2 px-8 py-3 rounded-full font-semibold text-sm text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-60 transition-colors shadow-md"
              >
                {loading ? 'Invio in corso…' : 'Invia segnalazione'}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
