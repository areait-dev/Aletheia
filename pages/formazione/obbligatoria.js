import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CALENDARIO } from '../../data/calendario';
import { useTheme } from '../../context/ThemeContext';

const aree = [
  {
    badge: 'D.Lgs. 81/08 · Accordo Stato-Regioni',
    icon: 'fas fa-hard-hat',
    title: 'Sicurezza sul lavoro',
    text: 'La sicurezza dei lavoratori parte dalla formazione. Il cuore della formazione obbligatoria: tutti i corsi previsti dal D.Lgs. 81/08 per lavoratori, preposti, dirigenti, datori di lavoro e figure della sicurezza aziendale (RSPP, antincendio, primo soccorso).',
    cta: 'Scopri i corsi sicurezza',
    href: '/all-courses?categoria=sicurezza-lavoro',
  },
  {
    badge: 'Accordo Stato-Regioni · Abilitazione obbligatoria',
    icon: 'fas fa-tools',
    title: 'Corsi abilitazione attrezzature di lavoro',
    text: "Corsi obbligatori per chi utilizza carrelli elevatori, gru, piattaforme aeree (PLE), escavatori e altre attrezzature specifiche. L'Accordo Stato-Regioni impone un'abilitazione standardizzata: senza attestato non si può operare legalmente.",
    cta: 'Scopri i corsi attrezzature',
    href: '/all-courses?categoria=decreto-attrezzature',
  },
  {
    badge: 'Patentino obbligatorio',
    icon: 'fas fa-leaf',
    title: 'Fitosanitario',
    text: 'Il patentino fitosanitario è obbligatorio per chi acquista, utilizza o distribuisce prodotti fitosanitari professionali.',
    cta: 'Scopri i corsi',
    href: '/all-courses?categoria=fitosanitario',
  },
  {
    badge: 'Reg. CE 852/2004 · HACCP',
    icon: 'fas fa-utensils',
    title: 'Sicurezza alimentare',
    text: 'Obbligatorio per tutti gli operatori del settore alimentare. Il corso HACCP, Hazard Analysis and Critical Control Points, è richiesto per chiunque manipoli, trasformi, conservi o distribuisca alimenti.',
    cta: 'Scopri i corsi',
    href: '/all-courses?categoria=sicurezza-alimentare',
  },
];

const step = [
  { n: '1', icon: 'fas fa-comments', title: 'Ci contatti', text: 'Raccontaci la tua situazione, settore, numero di dipendenti, corsi necessari. Ti risponderemo in pochi minuti via telefono o WhatsApp.' },
  { n: '2', icon: 'fas fa-clipboard-check', title: 'Valutiamo gli obblighi', text: 'Verifichiamo quali corsi sono obbligatori per la tua azienda in base al codice ATECO, alle mansioni dei lavoratori e alle attrezzature utilizzate.' },
  { n: '3', icon: 'fas fa-calendar-alt', title: 'Organizziamo il corso', text: 'In aula presso la nostra sede, in FAD o direttamente in azienda (minimo 15 partecipanti). Tu scegli la modalità, noi ci occupiamo di organizzazione e pianificazione.' },
  { n: '4', icon: 'fas fa-certificate', title: 'Rilasciamo gli attestati', text: 'Al termine del corso rilasciamo gli attestati validi in tutta Italia. Teniamo traccia delle scadenze e ti avvisiamo quando è il momento di rinnovare.' },
];

const puntiForza = [
  { icon: 'fas fa-shield-alt', title: 'Attestati validi ovunque', text: "Tutti i corsi sono conformi al D.Lgs. 81/08, all'Accordo Stato-Regioni 2025 e alle normative specifiche di settore. Gli attestati rilasciati sono riconosciuti su tutto il territorio nazionale." },
  { icon: 'fas fa-sliders-h', title: 'Flessibilità reale', text: 'La formazione si adatta alle esigenze della tua azienda: corsi in aula presso le nostre sedi, in FAD per i percorsi compatibili con la normativa vigente o direttamente presso la sede aziendale.' },
  { icon: 'fas fa-bell', title: 'Gestione delle scadenze', text: 'Non devi ricordarti da solo quando scade la formazione dei tuoi dipendenti. Alètheia monitora le scadenze e ti supporta nella pianificazione degli aggiornamenti, aiutandoti a mantenere sempre la tua azienda in regola.' },
];

const faqs = [
  {
    domanda: 'Quali corsi di formazione sono obbligatori per la mia azienda?',
    risposta: 'Dipende dal settore, dalle mansioni dei lavoratori e dalle attrezzature utilizzate. In linea generale, ogni azienda deve garantire almeno: formazione generale e specifica per tutti i lavoratori, formazione per preposti e dirigenti, designazione e formazione degli addetti antincendio e primo soccorso, formazione RSPP. Contattaci — verifichiamo insieme gli obblighi specifici per la tua realtà aziendale.',
  },
  {
    domanda: 'Cosa succede se non effettuo la formazione obbligatoria?',
    risposta: 'Il datore di lavoro che non garantisce la formazione obbligatoria ai propri dipendenti va incontro a sanzioni amministrative che possono arrivare fino a €6.400 per lavoratore non formato. In caso di infortunio, la mancata formazione aggrava significativamente la responsabilità penale del datore di lavoro. Non è un rischio che vale la pena correre.',
  },
  {
    domanda: 'Gli attestati rilasciati da Alètheia sono validi in tutta Italia?',
    risposta: "Sì. Tutti gli attestati rilasciati al termine dei corsi sono validi su tutto il territorio nazionale, in conformità con il D.Lgs. 81/08 e l'Accordo Stato-Regioni 2025. Alètheia è ente accreditato dalla Regione Siciliana — DDG n. 78 del 20/01/2017.",
  },
  {
    domanda: 'È possibile organizzare i corsi direttamente in azienda?',
    risposta: 'Sì, con un minimo di 15 partecipanti. Alètheia organizza il corso presso la tua sede, in orari compatibili con esigenze produttive, inclusa la parte pratica dove prevista. Contattaci per un preventivo personalizzato.',
  },
  {
    domanda: 'I corsi di formazione obbligatoria possono essere svolti online?',
    risposta: 'Alcuni sì, altri no. La formazione generale per i lavoratori, alcuni moduli RSPP e la parte tecnica di molti corsi sono disponibili in FAD o videoconferenza. La parte pratica — antincendio, primo soccorso, attrezzature — deve essere svolta obbligatoriamente in presenza. Ti indichiamo noi la modalità corretta per ogni corso.',
  },
  {
    domanda: 'Con quale frequenza va rinnovata la formazione obbligatoria?',
    risposta: 'Dipende dal corso. La formazione lavoratori va aggiornata ogni 5 anni (6 ore). L\'antincendio ogni 5 anni. Il primo soccorso ogni 3 anni. Le abilitazioni attrezzature ogni 5 anni. Alètheia monitora le scadenze per i propri clienti e invia un promemoria prima che la formazione scada.',
  },
];

const EMPTY_FORM = {
  ragioneSociale: '', piva: '', telefono: '', email: '',
  nome: '', cognome: '', sede: '', partecipanti: '',
};

function AreaCard({ badge, icon, title, text, cta, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)', opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }} />
      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#008C95', background: 'rgba(0,140,149,0.08)', padding: '0.25rem 0.6rem', borderRadius: '999px' }}>
            {badge}
          </span>
          <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: hovered ? '#008C95' : 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease' }}>
            <i className={icon} style={{ fontSize: '1.2rem', color: hovered ? '#fff' : '#008C95' }}></i>
          </div>
        </div>
        <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{title}</h3>
        <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.75, margin: 0, flex: 1 }}>{text}</p>
        <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ display: 'flex', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {cta} <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem' }}></i>
          </span>
        </div>
      </div>
    </a>
  );
}

const WEEKDAYS_IT = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
const MONTHS_IT_SHORT = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];

// Date in elenco verticale sulla sinistra + piccola card del corso a destra, dentro la colonna 1/3.
function CorsiObbligatoriTabs({ giorni, isDark }) {
  const [activeTab, setActiveTab] = useState(giorni[0]?.data);
  const attivo = giorni.find((g) => g.data === activeTab) || giorni[0];

  if (!giorni.length) return null;

  return (
    <div className="calendario-date-layout">
      {/* Elenco date in verticale */}
      <div className="flex flex-col gap-2 calendario-date-list">
        {giorni.map(({ data }) => {
          const [y, m, d] = data.split('-').map(Number);
          const wd = WEEKDAYS_IT[new Date(y, m - 1, d).getDay()];
          const mese = MONTHS_IT_SHORT[m - 1];
          const isActive = data === activeTab;
          return (
            <button
              key={data}
              type="button"
              onClick={() => setActiveTab(data)}
              aria-pressed={isActive}
              className="flex items-center gap-3"
              style={{
                padding: '0.6rem 0.85rem', borderRadius: '10px', textAlign: 'left',
                background: isActive ? 'linear-gradient(135deg, #008C95, #10B981)' : isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9',
                border: isActive ? 'none' : isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                color: isActive ? '#fff' : isDark ? 'rgba(255,255,255,0.6)' : '#475569',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '1.15rem', fontWeight: 800, lineHeight: 1, minWidth: '28px' }}>{d}</span>
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em' }}>{wd}</span>
                <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.05em' }}>{mese}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Piccola card con il/i corso/i del giorno selezionato */}
      <div key={activeTab} className="calendario-day-fade flex flex-col gap-3 calendario-date-card">
        {attivo.corsi.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-2 p-3 rounded-2xl"
            style={{
              background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
            }}
          >
            <div className="w-full h-36 rounded-xl overflow-hidden relative shrink-0">
              <img
                src={`/images/courses/${(c.id % 3) + 1}.jpg`}
                alt={c.titolo}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>

            <span
              className="font-semibold px-2 py-0.5 rounded-full w-fit"
              style={{
                fontSize: '0.62rem',
                background: isDark ? 'rgba(110,231,183,0.12)' : 'rgba(0,140,149,0.08)',
                color: isDark ? '#6EE7B7' : '#008C95',
                border: isDark ? '1px solid rgba(110,231,183,0.3)' : '1px solid rgba(0,140,149,0.25)',
              }}
            >
              Obbligatoria
            </span>
            <h3 className="font-bold" style={{ color: isDark ? '#fff' : '#0F172A', fontSize: '0.92rem', lineHeight: 1.35 }}>
              {c.titolo}
            </h3>
            <span className="inline-flex items-center gap-1.5" style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.55)' : '#64748B' }}>
              <i className="fas fa-location-dot" aria-hidden="true" />
              {c.sede}
            </span>

            <a
              href={`/all-courses/${c.slug}`}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors text-center"
              style={{ padding: '0.55rem', marginTop: '0.25rem' }}
            >
              Iscriviti ora
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormField({ label, required, children, isDark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.75)' : '#334155', letterSpacing: '0.02em' }}>
        {label}{required && <span style={{ color: '#10B981', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const getInputStyle = (isDark) => ({
  width: '100%', padding: '0.7rem 1rem', borderRadius: '10px',
  border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #CBD5E1',
  background: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
  color: isDark ? '#fff' : '#0F172A',
  fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
});
const focusOn = (e) => { e.target.style.borderColor = '#10B981'; };
const focusOff = (isDark) => (e) => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#CBD5E1'; };

function ConsulenzaForm({ isDark }) {
  const [fields, setFields] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));
  const inputStyle = getInputStyle(isDark);
  const groupLabelColor = isDark ? 'rgba(110,231,183,0.8)' : '#008C95';

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,140,149,0.15)', border: '2px solid #008C95', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', color: '#008C95' }}>
          <i className="fas fa-check"></i>
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: 0 }}>Richiesta inviata!</h3>
        <p style={{ fontSize: '0.9rem', color: isDark ? 'rgba(255,255,255,0.6)' : '#475569', maxWidth: '340px', lineHeight: 1.6, margin: 0 }}>
          Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative per proporti il calendario più adatto.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFields(EMPTY_FORM); }}
          style={{ marginTop: '0.5rem', padding: '0.6rem 1.5rem', borderRadius: '999px', background: 'rgba(0,140,149,0.12)', border: '1.5px solid rgba(0,140,149,0.35)', color: '#008C95', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Invia una nuova richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Azienda
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Ragione sociale" required isDark={isDark}>
            <input type="text" required value={fields.ragioneSociale} onChange={set('ragioneSociale')} placeholder="Azienda S.r.l." style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="P.IVA / Codice Fiscale" required isDark={isDark}>
            <input type="text" required value={fields.piva} onChange={set('piva')} placeholder="IT12345678901" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Referente
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Nome" required isDark={isDark}>
            <input type="text" required value={fields.nome} onChange={set('nome')} placeholder="Mario" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Cognome" required isDark={isDark}>
            <input type="text" required value={fields.cognome} onChange={set('cognome')} placeholder="Rossi" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Telefono" required isDark={isDark}>
            <input type="tel" required value={fields.telefono} onChange={set('telefono')} placeholder="+39 0932 000000" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Email" required isDark={isDark}>
            <input type="email" required value={fields.email} onChange={set('email')} placeholder="info@azienda.it" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Corso richiesto
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Sede" required isDark={isDark}>
            <input type="text" required value={fields.sede} onChange={set('sede')} placeholder="Vittoria (RG)" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Numero partecipanti" required isDark={isDark}>
            <input type="number" min="1" required value={fields.partecipanti} onChange={set('partecipanti')} placeholder="es. 12" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <button
        type="submit"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          width: '100%', padding: '0.95rem 2rem', borderRadius: '999px', border: 'none',
          background: 'linear-gradient(90deg, #008C95, #10B981)',
          color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
          fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,140,149,0.35)',
          marginTop: '0.25rem', boxSizing: 'border-box',
        }}
      >
        <i className="fas fa-paper-plane" style={{ fontSize: '0.85rem' }}></i>
        Lascia i tuoi dati
      </button>
    </form>
  );
}

export default function FormazioneObbligatoria() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  // Solo la sezione "Calendario + Form" in fondo pagina è sensibile al tema chiaro/scuro: le altre
  // sezioni (Hero, CTA finale) restano scure fisse per design, come altrove nel sito.
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  const corsiObbligatoriOrdinati = [...CALENDARIO]
    .filter((c) => c.categoria === 'obbligatoria')
    .sort((a, b) => a.data.localeCompare(b.data));
  const giorniObbligatoria = [...new Set(corsiObbligatoriOrdinati.map((c) => c.data))]
    .slice(0, 8)
    .map((data) => ({ data, corsi: corsiObbligatoriOrdinati.filter((c) => c.data === data) }));

  return (
    <>
      <Head>
        <title>Formazione Obbligatoria per la Sicurezza sul Lavoro - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Corsi obbligatori per legge conformi al D.Lgs. 81/08: sicurezza sul lavoro, attrezzature, fitosanitario, HACCP. Attestati validi in tutta Italia. Alètheia S.r.l."
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

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: #6EE7B7; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25);
          padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1.25rem;
        }
        .section-badge {
          display: inline-block; font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; color: #008C95; margin-bottom: 0.6rem;
        }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }
        .cta-btn-outline {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.85rem 2rem; border-radius: 999px; background: transparent;
          color: rgba(255,255,255,0.85); font-weight: 700; font-size: 0.95rem; text-decoration: none;
          border: 2px solid rgba(255,255,255,0.22); transition: all 0.2s ease;
          font-family: inherit; cursor: pointer;
        }
        .cta-btn-outline:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }

        .aree-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 1100px) { .aree-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .aree-grid { grid-template-columns: 1fr; } }

        .evidence-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        @media (max-width: 800px) { .evidence-grid { grid-template-columns: 1fr; } }

        .step-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
        @media (max-width: 1000px) { .step-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .step-grid { grid-template-columns: 1fr; } }

        .valore-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .valore-grid { grid-template-columns: 1fr; } }

        .obb-form-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 560px) { .obb-form-row { grid-template-columns: 1fr !important; } }

        .calendario-tabs-scroll::-webkit-scrollbar { height: 5px; }
        .calendario-tabs-scroll::-webkit-scrollbar-thumb { background: rgba(0,140,149,0.35); border-radius: 999px; }

        @keyframes calendarioDayFade {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .calendario-day-fade { animation: calendarioDayFade 0.35s ease-out; }

        .faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem 1.5rem; align-items: start; }
        @media (max-width: 800px) { .faq-grid { grid-template-columns: 1fr; } }

        /* Layout 1/3 (calendario) - 2/3 (form): stretch così le due colonne si allineano in altezza */
        .calendario-form-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; align-items: stretch; }
        @media (max-width: 900px) { .calendario-form-grid { grid-template-columns: 1fr; } }
        .calendario-panel { display: flex; flex-direction: column; height: 100%; }
        .calendario-panel-body { display: flex; flex-direction: column; flex: 1; }

        /* Date in verticale + card corso affiancata, dentro la colonna 1/3 - nessuno scroll interno,
           il contenuto determina l'altezza della colonna */
        .calendario-date-layout { display: flex; gap: 1rem; flex: 1; }
        .calendario-date-list { flex: 0 0 92px; }
        .calendario-date-card { flex: 1; min-width: 0; }
        @media (max-width: 560px) { .calendario-date-layout { flex-direction: column; } .calendario-date-list { flex-direction: row !important; overflow-x: auto; } }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', paddingTop: '120px', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-badge fade-up">Corsi conformi al D.Lgs. 81/08 · Accordo Stato-Regioni</div>

          <h1 className="fade-up fade-up-1" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '760px' }}>
            Formazione obbligatoria per la{' '}
            <span style={{ background: 'linear-gradient(90deg, #10B981, #008C95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              sicurezza sul lavoro
            </span>
          </h1>

          <p className="fade-up fade-up-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.68)', maxWidth: '820px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            La normativa impone gli obblighi. Alètheia ti aiuta a gestirli senza complicazioni. Dalla sicurezza sul lavoro alle attrezzature, dal settore agricolo all&apos;HACCP: un unico partner per tutti i corsi obbligatori della tua azienda. Docenti qualificati, attestati validi in tutta Italia, corsi in aula, in FAD o direttamente presso la tua sede aziendale.
          </p>

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#corsi" className="cta-btn-primary">Scopri i corsi</a>
            <a href="/contatti" className="cta-btn-outline">Contattaci</a>
          </div>
        </div>
      </section>

      {/* ══════════════ NORMATIVA & NUMERI ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <span className="section-badge">Non è una scelta. È un obbligo di legge</span>
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.25, maxWidth: '760px' }}>
            La formazione obbligatoria: un requisito per lavorare in sicurezza
          </h2>
          <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
            Il D.Lgs. 81/08, il Testo Unico sulla Salute e Sicurezza sul Lavoro, obbliga ogni datore di lavoro a formare tutti i lavoratori, in ogni settore e a prescindere dalle dimensioni aziendali. La mancata formazione espone a sanzioni fino a €6.400 per lavoratore e, in caso di infortunio, aggrava la responsabilità penale del datore di lavoro. La formazione obbligatoria non è un costo da minimizzare. È una responsabilità da gestire bene, con un partner affidabile, attestati riconosciuti e tempi certi.
          </p>

          <div className="evidence-grid" style={{ marginBottom: '3rem' }}>
            {[
              { icon: 'fas fa-triangle-exclamation', color: '#D97706', bg: 'rgba(217,119,6,0.1)', headline: 'Fino a €6.400', text: 'di sanzione per ogni lavoratore non formato, a carico del datore di lavoro' },
              { icon: 'fas fa-file-lines', color: '#008C95', bg: 'rgba(0,140,149,0.1)', headline: 'Valore nazionale', text: 'attestati validi su tutto il territorio italiano' },
              { icon: 'fas fa-circle-check', color: '#10B981', bg: 'rgba(16,185,129,0.1)', headline: 'Sempre aggiornati', text: "corsi conformi all'Accordo Stato-Regioni 2025" },
            ].map((k) => (
              <div
                key={k.headline}
                className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
                style={{ borderRadius: '1rem', overflow: 'hidden' }}
              >
                <div style={{ height: '3px', background: k.color }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={k.icon} style={{ color: k.color, fontSize: '1.3rem' }}></i>
                  </div>
                  <span className="text-slate-900 dark:text-white" style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{k.headline}</span>
                  <span className="text-slate-600 dark:text-gray-300" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 400, fontSize: '0.85rem', lineHeight: 1.6 }}>{k.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ AREE DELLA FORMAZIONE ══════════════ */}
      <section id="corsi" className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">Le aree della formazione obbligatoria</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Tutti i corsi obbligatori per la tua azienda, in un unico ente accreditato
            </h2>
            <p className="text-slate-500 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Ogni obbligo di legge ha il suo corso. Seleziona l&apos;area che ti riguarda e scopri corsi, date, modalità e costi.
            </p>
          </div>

          <div className="aree-grid">
            {aree.map((a) => (
              <AreaCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ METODOLOGIA ══════════════ */}
      <section className="bg-white dark:bg-dark-card" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">Come lavoriamo</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Dalla necessità all&apos;attestato in pochi passaggi
            </h2>
          </div>

          <div className="step-grid">
            {step.map((s) => (
              <div key={s.n} className="bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', minWidth: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #008C95, #10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={s.icon} style={{ color: '#fff', fontSize: '1.05rem' }}></i>
                  </div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'rgba(0,140,149,0.25)' }}>{s.n}</span>
                </div>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>{s.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.7, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PERCHÉ ALÈTHEIA ══════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">Perché scegliere Alètheia</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Oltre 5.000 lavoratori formati. Da vent&apos;anni.
            </h2>
          </div>

          <div className="valore-grid" style={{ marginBottom: '3rem' }}>
            {puntiForza.map((p) => (
              <div key={p.title} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0,140,149,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={p.icon} style={{ color: '#008C95', fontSize: '1.15rem' }}></i>
                </div>
                <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>{p.title}</h3>
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.87rem', lineHeight: 1.75, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>

          {/* Box ecosistema Promotergroup - dark mode invariato, light mode adattato */}
          <div
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)'
                : 'linear-gradient(135deg, #EFF6F6 0%, #E0F2E9 100%)',
              border: isDark ? 'none' : '1px solid #D1E7E9',
              borderRadius: '1.25rem', padding: '2.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center',
            }}
          >
            <div style={{ width: '56px', height: '56px', minWidth: '56px', borderRadius: '14px', background: isDark ? 'rgba(16,185,129,0.15)' : 'rgba(0,140,149,0.1)', border: isDark ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(0,140,149,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-diagram-project" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1.5rem' }}></i>
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: '0 0 0.6rem' }}>
                Una rete di competenze al servizio della tua azienda
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? 'rgba(255,255,255,0.65)' : '#475569', lineHeight: 1.75, margin: 0 }}>
                Alètheia fa parte di Promotergroup, un ecosistema di aziende specializzate che gestisce in modo integrato ogni esigenza di formazione e sicurezza sul lavoro. Oltre ai corsi obbligatori, puoi contare sull&apos;area Sicurezza sul Lavoro Promotergroup per consulenza, prevenzione e adempimenti normativi. Un unico interlocutore, competenze coordinate e tempi e costi ottimizzati.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-white dark:bg-dark-card border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0' }}>
        <div className="container">
          <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.25 }}>
            FAQ - Domande frequenti sulla formazione obbligatoria
          </h2>

          <div className="faq-grid">
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
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
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

      {/* ══════════════ CONSULENZA + CALENDARIO + FORM (sensibile al tema chiaro/scuro) ══════════════ */}
      <section style={{
        background: isDark ? 'linear-gradient(135deg, #0F172A 0%, #0D1F2D 100%)' : '#F1F5F9',
        padding: '5rem 0',
      }}>
        <div className="container">
          {/* Banner consulenza */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
              Non sai quali corsi obbligatori servono alla tua azienda?
            </h3>
            <p style={{ fontSize: '0.92rem', color: isDark ? 'rgba(255,255,255,0.65)' : '#475569', lineHeight: 1.8, margin: '0 0 1.25rem' }}>
              Ogni impresa ha obblighi diversi in base al settore, ai lavoratori e alle attività svolte. Contattaci per una verifica gratuita degli obblighi formativi: controlliamo la situazione dei tuoi dipendenti, identifichiamo i corsi necessari e ti proponiamo un calendario su misura.
            </p>
            <a href="/contatti" style={{ fontSize: '0.9rem', fontWeight: 700, color: isDark ? '#6EE7B7' : '#008C95', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              Richiedi una consulenza gratuita <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
            </a>
          </div>

          <div className="calendario-form-grid">
            {/* Colonna 1/3: calendario corsi in partenza */}
            <div
              className="calendario-panel"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                borderRadius: '1.25rem', overflow: 'hidden',
              }}
            >
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)' }} />
              <div className="calendario-panel-body" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '11px', background: 'rgba(0,140,149,0.15)', border: '1px solid rgba(0,140,149,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-calendar-days" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1rem' }}></i>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: 0, lineHeight: 1.3 }}>
                    Corsi in partenza
                  </h3>
                </div>
                <CorsiObbligatoriTabs giorni={giorniObbligatoria} isDark={isDark} />
                <a
                  href="/calendario-corsi"
                  style={{
                    marginTop: '1.5rem', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
                    padding: '0.85rem 2rem', borderRadius: '999px', background: 'transparent',
                    color: isDark ? 'rgba(255,255,255,0.85)' : '#334155', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                    border: isDark ? '2px solid rgba(255,255,255,0.22)' : '2px solid #CBD5E1', boxSizing: 'border-box',
                  }}
                >
                  Vedi tutto il calendario
                </a>
              </div>
            </div>

            {/* Colonna 2/3: form contatto */}
            <div
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                borderRadius: '1.25rem', overflow: 'hidden',
              }}
            >
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #008C95, #10B981)' }} />
              <div style={{ padding: '2.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem' }}>
                  <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(0,140,149,0.15)', border: '1px solid rgba(0,140,149,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-calendar-check" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1.1rem' }}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: 0, lineHeight: 1.3 }}>
                      Richiedi il tuo calendario su misura
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: isDark ? 'rgba(255,255,255,0.5)' : '#64748B', margin: '0.2rem 0 0' }}>
                      Non hai trovato la data o la sede che cerchi? Lascia i tuoi dati: ti avviseremo sulle nuove edizioni dei corsi.
                    </p>
                  </div>
                </div>
                <ConsulenzaForm isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
