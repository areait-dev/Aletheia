import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';

const modalita = [
  {
    icon: 'fas fa-chalkboard-user',
    title: 'Formazione residenziale (RES)',
    text: 'Corsi, convegni e congressi in aula presso le nostre sedi o presso strutture sanitarie.',
  },
  {
    icon: 'fas fa-laptop-medical',
    title: 'Formazione a distanza (FAD)',
    text: 'Percorsi online fruibili in autonomia, compatibili con i turni di lavoro.',
  },
  {
    icon: 'fas fa-hospital-user',
    title: 'Formazione sul campo e su commessa',
    text: 'Progetti formativi su misura per strutture sanitarie, poliambulatori, RSA ed enti del territorio.',
  },
];

const faqs = [
  {
    domanda: 'Che cosa sono i crediti ECM?',
    risposta: "I crediti ECM sono crediti formativi assegnati ai professionisti sanitari che partecipano ad attività di Educazione Continua in Medicina riconosciute dal sistema ECM nazionale. Attestano l'impegno del professionista nell'aggiornamento costante delle proprie competenze.",
  },
  {
    domanda: 'Chi è obbligato ad acquisire i crediti ECM?',
    risposta: "L'obbligo ECM riguarda tutti i professionisti sanitari iscritti ai rispettivi ordini e albi che esercitano attività sanitaria, sia in regime dipendente sia libero-professionale.",
  },
  {
    domanda: 'Quanti crediti ECM devo acquisire?',
    risposta: 'Il fabbisogno formativo è definito per trienni dalla normativa nazionale. Il numero effettivo di crediti da maturare può variare in base a esoneri, esenzioni e alla situazione individuale del professionista. Ti aiutiamo a verificare la tua posizione e a pianificare i corsi necessari.',
  },
  {
    domanda: 'I corsi ECM di Alètheia rilasciano crediti validi?',
    risposta: 'Sì. In qualità di provider ECM accreditato, Alètheia rilascia direttamente i crediti formativi al termine delle attività, secondo le regole del sistema ECM.',
  },
  {
    domanda: 'Cosa succede se non raggiungo i crediti ECM richiesti?',
    risposta: 'Il mancato assolvimento dell\'obbligo formativo ECM può avere conseguenze sul piano professionale e assicurativo, ed è oggetto di verifica da parte degli ordini professionali. Frequentare corsi accreditati con regolarità è il modo più semplice per mantenersi in regola.',
  },
  {
    domanda: 'Dove posso frequentare corsi ECM in Sicilia?',
    risposta: 'Alètheia organizza corsi ECM in tutta la Sicilia come provider accreditato, con attività in aula presso le proprie sedi in provincia di Ragusa, presso strutture sanitarie e in modalità FAD online.',
  },
];

const EMPTY_FORM = {
  nome: '', cognome: '', professione: '', ordine: '', email: '', telefono: '', messaggio: '',
};

function ContattoECMForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  function validate() {
    const err = {};
    if (!form.nome.trim()) err.nome = 'Campo obbligatorio';
    if (!form.cognome.trim()) err.cognome = 'Campo obbligatorio';
    if (!form.email.trim()) err.email = 'Campo obbligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email non valida';
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) { setErrors(err); return; }
    setErrors({});
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #008C95, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 24px rgba(0,140,149,0.3)' }}>
          <i className="fas fa-check" style={{ color: '#fff', fontSize: '1.75rem' }}></i>
        </div>
        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.75rem' }}>
          Richiesta inviata!
        </h3>
        <p className="text-slate-500 dark:text-gray-300" style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 2rem' }}>
          Grazie per averci contattato. Il nostro team ti risponderà entro 24 ore lavorative con tutte le informazioni sui corsi ECM.
        </p>
        <button
          onClick={() => { setSent(false); setForm(EMPTY_FORM); }}
          className="text-[#008C95] dark:text-[#10B981] border border-[#008C95] dark:border-[#10B981]"
          style={{ background: 'none', borderRadius: '999px', padding: '0.6rem 1.5rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Invia una nuova richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="nome" className="text-slate-700 dark:text-gray-300">Nome <span style={{ color: '#EF4444' }}>*</span></label>
          <input id="nome" name="nome" type="text" placeholder="Mario" value={form.nome} onChange={handleChange} className={`${errors.nome ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
          {errors.nome && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.nome}</p>}
        </div>
        <div className="field">
          <label htmlFor="cognome" className="text-slate-700 dark:text-gray-300">Cognome <span style={{ color: '#EF4444' }}>*</span></label>
          <input id="cognome" name="cognome" type="text" placeholder="Rossi" value={form.cognome} onChange={handleChange} className={`${errors.cognome ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
          {errors.cognome && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.cognome}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="professione" className="text-slate-700 dark:text-gray-300">Professione sanitaria</label>
          <input id="professione" name="professione" type="text" placeholder="Es. Infermiere, Medico, Fisioterapista…" value={form.professione} onChange={handleChange} className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400" />
        </div>
        <div className="field">
          <label htmlFor="ordine" className="text-slate-700 dark:text-gray-300">Ordine / Albo di iscrizione</label>
          <input id="ordine" name="ordine" type="text" placeholder="Es. OPI Ragusa" value={form.ordine} onChange={handleChange} className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="email" className="text-slate-700 dark:text-gray-300">Email <span style={{ color: '#EF4444' }}>*</span></label>
          <input id="email" name="email" type="email" placeholder="mario@esempio.it" value={form.email} onChange={handleChange} className={`${errors.email ? 'error' : ''} bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`} />
          {errors.email && <p className="err-msg"><i className="fas fa-exclamation-circle"></i>{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="telefono" className="text-slate-700 dark:text-gray-300">Telefono</label>
          <input id="telefono" name="telefono" type="tel" placeholder="+39 000 0000000" value={form.telefono} onChange={handleChange} className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="messaggio" className="text-slate-700 dark:text-gray-300">Messaggio</label>
        <textarea id="messaggio" name="messaggio" placeholder="Scrivi qui la tua richiesta…" value={form.messaggio} onChange={handleChange} className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400" />
      </div>

      <button type="submit" className="submit-btn">
        Invia richiesta
      </button>

      <p className="text-slate-400 dark:text-gray-500" style={{ fontSize: '0.72rem', textAlign: 'center', margin: 0 }}>
        I tuoi dati sono al sicuro e non verranno condivisi con terze parti.
      </p>
    </form>
  );
}

export default function FormazioneECM() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>Corsi ECM per Professionisti Sanitari - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corsi ECM accreditati per medici, infermieri, fisioterapisti e OSS. Alètheia, provider ECM accreditato dalla Regione Siciliana."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/" />

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.28s; opacity: 0; }

        .hero-badge-ecm {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: #6EE7B7; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
          padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1.25rem;
        }
        .section-badge-ecm {
          display: inline-block; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #008C95; margin-bottom: 0.6rem;
        }
        .dark .section-badge-ecm { color: #6EE7B7; }
        .cta-btn-primary-ecm {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary-ecm:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }
        .cta-btn-outline-ecm {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px; background: transparent;
          color: rgba(255,255,255,0.85); font-weight: 700; font-size: 0.95rem; text-decoration: none;
          border: 2px solid rgba(255,255,255,0.22); transition: all 0.2s ease;
          font-family: inherit; cursor: pointer;
        }
        .cta-btn-outline-ecm:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }

        .modalita-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .modalita-grid { grid-template-columns: 1fr; } }

        .faq-grid-ecm { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem 1.5rem; align-items: start; }
        @media (max-width: 800px) { .faq-grid-ecm { grid-template-columns: 1fr; } }

        /* Form (stesso pattern di pages/contatti.js) */
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
        .field label { display: block; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem; }
        .field input, .field textarea {
          width: 100%; padding: 0.7rem 1rem; border: 1.5px solid #E2E8F0; border-radius: 0.75rem;
          font-size: 0.9rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit; box-sizing: border-box;
        }
        .field input:focus, .field textarea:focus {
          border-color: #008C95; box-shadow: 0 0 0 3px rgba(0,140,149,0.12);
        }
        .field input.error, .field textarea.error { border-color: #EF4444; }
        .field .err-msg { font-size: 0.73rem; color: #EF4444; margin-top: 0.25rem; display: flex; align-items: center; gap: 0.3rem; }
        .field textarea { resize: vertical; min-height: 120px; }
        .submit-btn {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.9rem 2.25rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; border: none; cursor: pointer;
          box-shadow: 0 4px 24px rgba(0,140,149,0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit; width: 100%; justify-content: center;
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }

        /* Contatti + Form: layout a due colonne per evitare la card isolata nel vuoto */
        .ecm-contact-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 2rem; align-items: stretch; }
        @media (max-width: 900px) { .ecm-contact-grid { grid-template-columns: 1fr; } }
        .ecm-contact-info { display: flex; flex-direction: column; height: 100%; }
        .ecm-info-row { display: flex; align-items: flex-start; gap: 0.85rem; }
        .ecm-info-row + .ecm-info-row { margin-top: 1.25rem; }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', paddingTop: '120px', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge-ecm fade-up">Educazione Continua in Medicina</div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '900px' }}>
            Corsi{' '}
            <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ECM
            </span>
            {' '}per professionisti sanitari
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '960px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Formazione continua accreditata per medici, infermieri, fisioterapisti e operatori sociosanitari. Ottieni i Crediti ECM.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#corsi" className="cta-btn-primary-ecm">Vedi i corsi</a>
            <a href="/contatti" className="cta-btn-outline-ecm">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ══════════════ IL VALORE DEL PROVIDER ACCREDITATO ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge-ecm">Provider ECM accreditato · Regione Siciliana</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25, maxWidth: '960px' }}>
            Un provider ECM accreditato per la tua formazione continua
          </h2>
          <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.5rem' }}>
            Alètheia S.r.l. è provider ECM accreditato dalla Regione Siciliana, abilitato alla progettazione e realizzazione di attività formative rivolte ai professionisti sanitari e al rilascio diretto dei crediti ECM. Non tutti gli enti che erogano formazione sanitaria possono assegnare crediti ECM: solo un provider accreditato è autorizzato dal sistema nazionale a farlo. Scegliere Alètheia significa affidarsi a un ente che risponde ai requisiti di qualità, trasparenza e appropriatezza scientifica previsti dalla normativa ECM. Come provider accreditato, Alètheia è abilitato a organizzare corsi, convegni, congressi e altre attività formative finalizzate all&apos;acquisizione dei crediti ECM obbligatori, garantendo che ogni percorso sia progettato secondo criteri di qualità dei contenuti e reale validità professionale.
          </p>
          <a href="/all-courses?categoria=ecm" id="corsi" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#008C95', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            Consulta i corsi ECM disponibili <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
          </a>
        </div>
      </section>

      {/* ══════════════ TARGET & PROPOSTA FORMATIVA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          {/* A chi si rivolge */}
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="section-badge-ecm">A chi si rivolgono i corsi ECM</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Formazione dedicata ai professionisti della sanità
            </h2>
            <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, margin: 0 }}>
              I corsi ECM di Alètheia si rivolgono a tutti i professionisti sanitari e sociosanitari tenuti all&apos;obbligo di aggiornamento continuo. Ogni percorso è progettato per coniugare rigore scientifico e applicabilità pratica, così da tradurre l&apos;aggiornamento obbligatorio in competenze realmente utili nell&apos;attività quotidiana.
            </p>
          </div>

          {/* Modalità */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-badge-ecm">La proposta formativa</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25 }}>
              Corsi ECM in aula e in FAD, in tutta la Sicilia
            </h2>
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '960px' }}>
              Alètheia organizza attività formative accreditate in diverse modalità, per adattarsi ai tempi e alle esigenze dei professionisti sanitari:
            </p>
          </div>

          <div className="modalita-grid" style={{ marginBottom: '2.5rem' }}>
            {modalita.map((m) => (
              <div key={m.title} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={m.icon} style={{ color: '#008C95', fontSize: '1.2rem' }}></i>
                </div>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>{m.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{m.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40" style={{ borderRadius: '1rem', padding: '1.25rem 1.75rem' }}>
            <p className="text-teal-900 dark:text-teal-200" style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.7 }}>
              Grazie all&apos;esperienza e alla rete di docenti qualificati di Promotergroup, Alètheia affianca aziende sanitarie e singoli professionisti nella pianificazione del proprio percorso di aggiornamento.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge-ecm">FAQ</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.25 }}>
            Domande frequenti sui corsi ECM
          </h2>

          <div className="faq-grid-ecm">
            {faqs.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.domanda} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="text-slate-900 dark:text-white"
                    style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    <span>{item.domanda}</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: isDark ? '#6EE7B7' : '#008C95', flexShrink: 0 }}></i>
                  </button>
                  {isOpen && (
                    <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.4rem 1.4rem', lineHeight: 1.75, fontSize: '0.9rem' }}>
                      {item.risposta}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTATTI & FORM ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem', maxWidth: '900px' }}>
            <span className="section-badge-ecm">Parliamone</span>
            <h3 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.3 }}>
              Vuoi saperne di più sui corsi ECM?
            </h3>
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.95rem', lineHeight: 1.75, margin: 0 }}>
              Il nostro team è a disposizione per fornirti tutte le informazioni sui corsi ECM disponibili e sui crediti formativi acquisibili.
            </p>
          </div>

          <div className="ecm-contact-grid">
            {/* Colonna informativa: dà contesto al form ed evita lo spazio vuoto */}
            <div
              className="ecm-contact-info"
              style={{
                background: isDark ? 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)' : '#fff',
                border: isDark ? 'none' : '1px solid #E2E8F0',
                borderRadius: '1.5rem', padding: '2.25rem', color: isDark ? '#fff' : '#0F172A', position: 'relative', overflow: 'hidden',
                boxShadow: isDark ? 'none' : '0 4px 30px rgba(0,0,0,0.05)',
              }}
            >
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: isDark ? 'radial-gradient(ellipse 60% 50% at 90% 10%, rgba(16,185,129,0.18) 0%, transparent 70%)' : 'radial-gradient(ellipse 60% 50% at 90% 10%, rgba(0,140,149,0.06) 0%, transparent 70%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '13px', background: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(0,140,149,0.08)', border: isDark ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(0,140,149,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  <i className="fas fa-user-doctor" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1.2rem' }}></i>
                </div>
                <h4 className="text-slate-900 dark:text-white" style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.6rem' }}>
                  Provider ECM accreditato
                </h4>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.75, margin: '0 0 1.75rem' }}>
                  Rispondiamo entro 24 ore lavorative con i corsi in programma, le modalità disponibili e i crediti acquisibili in base al tuo profilo professionale.
                </p>

                <div className="ecm-info-row">
                  <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-phone" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <span className="dark:text-gray-500" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>Telefono</span>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 700 }}>+39 0932 862613</span>
                  </div>
                </div>
                <div className="ecm-info-row">
                  <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-envelope" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <span className="dark:text-gray-500" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>Email</span>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 700 }}>info@aletheiasrl.it</span>
                  </div>
                </div>
                <div className="ecm-info-row">
                  <div style={{ width: '38px', height: '38px', minWidth: '38px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-clock" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '0.9rem' }}></i>
                  </div>
                  <div>
                    <span className="dark:text-gray-500" style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }}>Tempo di risposta</span>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.9rem', fontWeight: 700 }}>Entro 24 ore lavorative</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonna form */}
            <div
              className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
              style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.05)' }}
            >
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)' }} />
              <div style={{ padding: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
                  <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-paper-plane" style={{ color: '#008C95', fontSize: '1.1rem' }}></i>
                  </div>
                  <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                    Richiedi informazioni
                  </h3>
                </div>
                <ContattoECMForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
