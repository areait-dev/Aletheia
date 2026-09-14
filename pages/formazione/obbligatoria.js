import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CALENDARIO } from '../../data/calendario';
import { useTheme } from '../../context/ThemeContext';
import Reveal from '../../components/Reveal';

const aree = [
  {
    badge: 'D.Lgs. 81/08 · Accordo Stato-Regioni',
    icon: 'fas fa-hard-hat',
    title: 'Sicurezza sul lavoro',
    text: 'Corsi obbligatori per lavoratori, preposti, dirigenti e addetti alle emergenze (RSPP, antincendio, primo soccorso).',
    cta: 'Scopri i corsi sicurezza',
    href: '/all-courses?categoria=sicurezza-lavoro',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Lavoratore con casco e dispositivi di sicurezza in cantiere',
  },
  {
    badge: 'Accordo Stato-Regioni · Abilitazione obbligatoria',
    icon: 'fas fa-tools',
    title: 'Corsi abilitazione attrezzature di lavoro',
    text: 'Corsi per il rilascio del patentino attrezzature: carrelli elevatori, gru, piattaforme aeree (PLE) ed escavatori.',
    cta: 'Scopri i corsi attrezzature',
    href: '/all-courses?categoria=decreto-attrezzature',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Operatore alla guida di un carrello elevatore in magazzino',
  },
  {
    badge: 'Patentino obbligatorio',
    icon: 'fas fa-leaf',
    title: 'Fitosanitario',
    text: "Corsi per il rilascio e il rinnovo del patentino obbligatorio per l'acquisto, l'utilizzo e la distribuzione di prodotti professionali.",
    cta: 'Scopri i corsi',
    href: '/all-courses?categoria=fitosanitario',
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Trattamento fitosanitario in campo agricolo',
  },
  {
    badge: 'Reg. CE 852/2004 · HACCP',
    icon: 'fas fa-utensils',
    title: 'Sicurezza alimentare',
    text: 'Corsi HACCP per tutti gli operatori del settore alimentare: titolari, manipolatori, addetti alla conservazione e vendita.',
    cta: 'Scopri i corsi',
    href: '/all-courses?categoria=sicurezza-alimentare',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Operatore alimentare al lavoro in cucina professionale',
  },
];

const step = [
  { n: '1', icon: 'fas fa-comments', title: 'Ci contatti' },
  { n: '2', icon: 'fas fa-clipboard-check', title: 'Valutiamo gli obblighi' },
  { n: '3', icon: 'fas fa-calendar-alt', title: 'Organizziamo il corso' },
  { n: '4', icon: 'fas fa-certificate', title: 'Rilasciamo gli attestati' },
];

const puntiForza = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Attestati validi ovunque',
    text: (
      <>Corsi pienamente conformi al <strong className="text-slate-900 dark:text-white font-bold">D.Lgs. 81/08</strong> e all&apos;<strong className="text-slate-900 dark:text-white font-bold">Accordo Stato-Regioni</strong>. Rilasciamo attestati ufficiali validi su tutto il territorio nazionale.</>
    ),
  },
  {
    icon: 'fas fa-sliders-h',
    title: 'Flessibilità reale',
    text: (
      <>Formazione cucita sulle esigenze aziendali: corsi in <strong className="text-slate-900 dark:text-white font-bold">aula</strong> presso le nostre sedi, in <strong className="text-slate-900 dark:text-white font-bold">FAD (online)</strong> o direttamente presso la tua sede.</>
    ),
  },
  {
    icon: 'fas fa-bell',
    title: 'Gestione delle scadenze',
    text: (
      <>Ci occupiamo noi di tutto. Alètheia <strong className="text-slate-900 dark:text-white font-bold">monitora le scadenze</strong> della formazione dei tuoi dipendenti e pianifica i rinnovi per tenerti sempre in regola.</>
    ),
  },
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
  ragioneSociale: '', piva: '', ateco: '', telefono: '', email: '',
  nome: '', cognome: '', sede: '', partecipanti: '', categoriaCorso: '', privacy: false,
};

function AreaCard({ badge, icon, title, text, cta, href, image, imageAlt }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        minHeight: '380px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.22)' : '0 4px 18px rgba(0,0,0,0.1)',
      }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        style={{
          objectFit: 'cover',
          transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.5s ease',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.3) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, justifyContent: 'flex-start' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className={icon} style={{ fontSize: '1.05rem', color: '#6EE7B7' }}></i>
        </div>
        <span style={{ fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6EE7B7', width: 'fit-content' }}>
          {badge}
        </span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, lineHeight: 1.3, color: '#fff' }}>{title}</h3>
        <p style={{ fontSize: '0.83rem', lineHeight: 1.65, margin: 0, color: 'rgba(255,255,255,0.85)' }}>{text}</p>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: 'auto' }}>
          {cta} <i className="fas fa-arrow-right" style={{ fontSize: '0.72rem' }}></i>
        </span>
      </div>
    </a>
  );
}

const MONTHS_IT_SHORT = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];

// Selettore di date a pillole orizzontali sopra l'elenco: un giorno può avere più
// corsi, quindi l'utente sceglie la data e sotto compaiono tutte le card di quel
// giorno (card orizzontali compatte, larghe quanto la colonna sinistra).
function CorsiObbligatoriTabs({ giorni, isDark }) {
  const [selectedDate, setSelectedDate] = useState('all');

  if (!giorni.length) return null;

  const corsi = giorni
    .flatMap(({ data, corsi: c }) => c.map((corso) => ({ ...corso, data })))
    .slice(0, 8);

  const corsiFiltrati = selectedDate === 'all' ? corsi : corsi.filter((c) => c.data === selectedDate);

  return (
    <div>
      {/* Pillole data: orizzontali, scrollabili, "Vedi tutte" per rimuovere il filtro */}
      <div className="corsi-date-pills">
        {giorni.map(({ data }) => {
          const [y, m, d] = data.split('-').map(Number);
          const mese = MONTHS_IT_SHORT[m - 1];
          const isActive = data === selectedDate;
          return (
            <button
              key={data}
              type="button"
              onClick={() => setSelectedDate(data)}
              aria-pressed={isActive}
              className={`corso-date-pill${isActive ? ' active' : ''}`}
            >
              {d} {mese}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setSelectedDate('all')}
          aria-pressed={selectedDate === 'all'}
          className={`corso-date-pill${selectedDate === 'all' ? ' active' : ''}`}
        >
          Vedi tutte
        </button>
      </div>

      <div className="corsi-catalog-list">
        {corsiFiltrati.map((c) => {
          const [y, m, d] = c.data.split('-').map(Number);
          const mese = MONTHS_IT_SHORT[m - 1];
          return (
            <div
              key={c.id}
              className="corso-row-card"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
              }}
            >
              <div className="corso-row-thumb">
                <Image
                  src={`/images/courses/${(c.id % 3) + 1}.jpg`}
                  alt={c.titolo}
                  width={140}
                  height={100}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                {/* Badge data: bollino sovrapposto all'angolo dell'immagine */}
                <span className="corso-row-date-badge">
                  {d} {mese}
                </span>
              </div>

              <div className="corso-row-body">
                <h3 className="font-bold" style={{ color: isDark ? '#fff' : '#0F172A', fontSize: '0.92rem', lineHeight: 1.35, margin: 0 }}>
                  {c.titolo}
                </h3>
                <span className="inline-flex items-center gap-1.5" style={{ fontSize: '0.75rem', color: isDark ? 'rgba(255,255,255,0.55)' : '#64748B' }}>
                  <i className="fas fa-location-dot" aria-hidden="true" />
                  {c.sede}
                </span>
              </div>

              <a
                href={`/all-courses/${c.slug}`}
                className="bg-primary hover:bg-[#006B73] text-white font-semibold rounded-full text-sm transition-colors text-center corso-row-cta"
              >
                Iscriviti ora
              </a>
            </div>
          );
        })}
        {corsiFiltrati.length === 0 && (
          <p style={{ fontSize: '0.85rem', color: isDark ? 'rgba(255,255,255,0.5)' : '#64748B', margin: 0 }}>
            Nessun corso in partenza per questa data.
          </p>
        )}
      </div>
    </div>
  );
}

function FormField({ label, required, children, isDark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.75)' : '#334155', letterSpacing: '0.02em' }}>
        {label}{required && <span style={{ color: '#10B981', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const getInputStyle = (isDark) => ({
  width: '100%', padding: '0.85rem 1rem', borderRadius: '12px',
  border: isDark ? '1.5px solid rgba(255,255,255,0.12)' : '1.5px solid #E2E8F0',
  background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
  color: isDark ? '#fff' : '#0F172A',
  fontSize: '1rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
});
const focusOn = (e) => {
  e.target.style.borderColor = '#008C95';
  e.target.style.boxShadow = '0 0 0 4px rgba(0,140,149,0.12)';
};
const focusOff = (isDark) => (e) => {
  e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.12)' : '#E2E8F0';
  e.target.style.boxShadow = 'none';
};

function ConsulenzaForm({ isDark }) {
  const [fields, setFields] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));
  const setCheck = (e) => setFields((p) => ({ ...p, privacy: e.target.checked }));
  const inputStyle = getInputStyle(isDark);
  const groupLabelColor = isDark ? 'rgba(110,231,183,0.8)' : '#008C95';

  function handleSubmit(e) {
    e.preventDefault();
    if (!fields.privacy) { setErrors({ privacy: 'Devi accettare la Privacy Policy' }); return; }
    setErrors({});
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
          style={{ marginTop: '0.5rem', padding: '0 1.5rem', minHeight: 'var(--btn-height-sm)', whiteSpace: 'nowrap', borderRadius: 'var(--btn-radius)', background: 'rgba(0,140,149,0.12)', border: '1.5px solid rgba(0,140,149,0.35)', color: '#008C95', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Invia una nuova richiesta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Azienda
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Ragione sociale" required isDark={isDark}>
            <input type="text" required value={fields.ragioneSociale} onChange={set('ragioneSociale')} placeholder="Azienda S.r.l." style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="P.IVA / Codice Fiscale" required isDark={isDark}>
            <input type="text" required value={fields.piva} onChange={set('piva')} placeholder="IT12345678901" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Codice ATECO" isDark={isDark}>
            <input type="text" value={fields.ateco} onChange={set('ateco')} placeholder="es. 41.20.00" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Referente
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Nome" required isDark={isDark}>
            <input type="text" required value={fields.nome} onChange={set('nome')} placeholder="Mario" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Cognome" required isDark={isDark}>
            <input type="text" required value={fields.cognome} onChange={set('cognome')} placeholder="Rossi" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Telefono" required isDark={isDark}>
            <input type="tel" required value={fields.telefono} onChange={set('telefono')} placeholder="+39 0932 000000" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Email" required isDark={isDark}>
            <input type="email" required value={fields.email} onChange={set('email')} placeholder="info@azienda.it" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: groupLabelColor }}>
          Corso richiesto
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Categoria corso" required isDark={isDark}>
            <select required value={fields.categoriaCorso} onChange={set('categoriaCorso')} style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)}>
              <option value="" disabled>Seleziona una categoria</option>
              <option value="sicurezza-lavoro">Sicurezza sul lavoro</option>
              <option value="decreto-attrezzature">Decreto attrezzature</option>
              <option value="fitosanitario">Fitosanitario</option>
              <option value="sicurezza-alimentare">Sicurezza alimentare</option>
            </select>
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }} className="obb-form-row">
          <FormField label="Sede" required isDark={isDark}>
            <input type="text" required value={fields.sede} onChange={set('sede')} placeholder="Vittoria (RG)" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
          <FormField label="Numero partecipanti" required isDark={isDark}>
            <input type="number" min="1" required value={fields.partecipanti} onChange={set('partecipanti')} placeholder="es. 12" style={inputStyle} onFocus={focusOn} onBlur={focusOff(isDark)} />
          </FormField>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <input
          id="obb-privacy"
          type="checkbox"
          checked={fields.privacy}
          onChange={setCheck}
          style={{ marginTop: '2px', width: '16px', height: '16px', accentColor: '#008C95', flexShrink: 0, cursor: 'pointer' }}
        />
        <label htmlFor="obb-privacy" style={{ fontSize: '0.8rem', lineHeight: 1.6, cursor: 'pointer', color: isDark ? 'rgba(255,255,255,0.65)' : '#475569' }}>
          Ho letto e accetto la{' '}
          <a href="/privacy-cookie" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a>
          {' '}e acconsento al trattamento dei dati ai sensi del GDPR. <span style={{ color: '#008C95' }}>*</span>
        </label>
      </div>
      {errors.privacy && <p style={{ margin: '-0.85rem 0 0', fontSize: '0.75rem', color: '#EF4444' }}><i className="fas fa-exclamation-circle" style={{ marginRight: '4px' }}></i>{errors.privacy}</p>}

      <button
        type="submit"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          width: '100%', padding: '0 3rem', minHeight: 'var(--btn-height-lg)', whiteSpace: 'nowrap', borderRadius: 'var(--btn-radius)', border: 'none',
          background: 'linear-gradient(90deg, #008C95, #10B981)',
          color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer',
          fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,140,149,0.35)',
          marginTop: '0.5rem', boxSizing: 'border-box',
        }}
      >
        <i className="fas fa-paper-plane" style={{ fontSize: '0.9rem' }}></i>
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
      </Head>

      <Header active="/" solid />

      <main>

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
          padding: 0 2rem; min-height: var(--btn-height-lg); border-radius: var(--btn-radius);
          white-space: nowrap;
          background: linear-gradient(90deg, #008C95, #10B981); color: #fff;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          box-shadow: 0 4px 24px rgba(0,140,149,0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: none; cursor: pointer; font-family: inherit;
        }
        .cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,140,149,0.5); }
        .cta-btn-outline {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0 2rem; min-height: var(--btn-height-lg); border-radius: var(--btn-radius); background: transparent;
          white-space: nowrap;
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

        /* "Come lavoriamo": stile Kanban aperto, senza card/bordi/ombre.
           Linea di flusso orizzontale con i numeri, 4 colonne tipografiche sotto. */
        .stream-numbers {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid #e2e8f0;
        }
        :global(.dark) .stream-numbers {
          border-bottom-color: rgba(255,255,255,0.1);
        }
        .stream-numbers span {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #008C95;
        }
        :global(.dark) .stream-numbers span {
          color: #6EE7B7;
        }
        .stream-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-top: 1.75rem;
        }
        .stream-col h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }
        :global(.dark) .stream-col h3 {
          color: #F8FAFC;
        }
        .stream-col-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #008C95, #10B981);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          .stream-numbers { display: none; }
          .stream-columns { grid-template-columns: 1fr; gap: 2rem; margin-top: 0; }
          .stream-col {
            padding-left: 1.25rem;
            border-left: 1px solid #e2e8f0;
          }
          :global(.dark) .stream-col {
            border-left-color: rgba(255,255,255,0.1);
          }
          .stream-col .stream-n-mobile {
            display: block;
            font-size: 0.85rem;
            font-weight: 700;
            color: #008C95;
            margin-bottom: 0.5rem;
          }
          :global(.dark) .stream-col .stream-n-mobile {
            color: #6EE7B7;
          }
        }
        .stream-n-mobile { display: none; }

        /* "Perché Alètheia": vero bento grid.
           Card scura = hero, in alto, a piena larghezza.
           Le 3 card bianche sotto, in riga, larghezza uguale. */
        .perche-bento {
          display: grid;
          gap: 1.5rem;
        }
        .perche-card.dark-card {
          grid-column: 1 / -1;
          border-radius: 24px;
          padding: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
          background: #0f172a;
        }
        .perche-card.dark-card .perche-icon {
          width: 56px;
          height: 56px;
          min-width: 56px;
          border-radius: 12px;
          background: rgba(110, 231, 183, 0.15);
          border: 1px solid rgba(110, 231, 183, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .perche-card.dark-card .perche-text { flex: 1; min-width: 260px; }
        .perche-card.dark-card h3 { font-size: 1.15rem; font-weight: 800; color: #ffffff; margin: 0 0 0.6rem; }
        .perche-card.dark-card p { font-size: 1rem; line-height: 1.75; color: #cbd5e1; margin: 0; }
        .perche-card.dark-card p strong { color: #ffffff; font-weight: 700; }

        .perche-row {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .perche-card.light-card {
          border-radius: 20px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 0.85rem;
          background: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }
        .perche-card.light-card .perche-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(0, 140, 149, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .perche-card.light-card h3 { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0; }
        .perche-card.light-card p { font-size: 1rem; line-height: 1.7; color: #64748b; margin: 0; }
        :global(.dark) .perche-card.light-card {
          background: #1f2937;
        }
        :global(.dark) .perche-card.light-card h3 {
          color: #F8FAFC;
        }
        :global(.dark) .perche-card.light-card p {
          color: #CBD5E1;
        }
        @media (max-width: 768px) {
          .perche-card.dark-card { flex-direction: column; align-items: flex-start; }
          .perche-row { grid-template-columns: 1fr; }
        }

        .obb-form-row { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .obb-form-row { grid-template-columns: 1fr !important; } }


        .faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem 1.5rem; align-items: start; }
        @media (max-width: 800px) { .faq-grid { grid-template-columns: 1fr; } }

        /* Corsi (sinistra) / Form (destra): sidebar destra sticky durante lo scroll dei corsi */
        .calendario-form-grid2 {
          display: grid;
          grid-template-columns: 3fr 7fr;
          gap: 48px;
          align-items: start;
          width: 100%;
        }
        .colonna-destra-form {
          position: sticky;
          top: 40px;
          align-self: start;
        }

        /* Selettore date: pillole orizzontali, scrollabili su overflow */
        .corsi-date-pills {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 16px;
        }
        .corso-date-pill {
          flex-shrink: 0;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          border: none;
          background: #F1F5F9;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.2s ease;
        }
        :global(.dark) .corso-date-pill {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.65);
        }
        .corso-date-pill.active {
          background: #008C95;
          color: #ffffff;
        }
        :global(.dark) .corso-date-pill.active {
          background: #008C95;
          color: #ffffff;
        }

        /* Catalogo corsi: card orizzontali compatte, una sotto l'altra */
        .corsi-catalog-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .corso-row-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 16px;
          border-radius: 16px;
        }
        .corso-row-thumb {
          position: relative;
          width: 140px;
          height: 100px;
          min-width: 140px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .corso-row-date-badge {
          position: absolute;
          top: 6px;
          left: 6px;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 999px;
          background: rgba(16,185,129,0.92);
          color: #fff;
          backdrop-filter: blur(2px);
        }
        .corso-row-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .corso-row-cta {
          flex-shrink: 0;
          padding: 0 1.25rem;
          min-height: var(--btn-height-sm);
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--btn-radius);
        }
        @media (max-width: 992px) {
          .calendario-form-grid2 { grid-template-columns: 1fr; }
          .colonna-destra-form { position: static; top: auto; }
        }
        @media (max-width: 640px) {
          .corso-row-card { flex-wrap: wrap; }
          .corso-row-cta { width: 100%; text-align: center; }
        }
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

          <div className="fade-up fade-up-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <a href="#corsi" className="cta-btn-primary">Scopri i corsi</a>
            <a href="#form-contatto" className="cta-btn-outline">Contattaci</a>
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
            Il D.Lgs. 81/08 obbliga ogni datore di lavoro a formare i propri dipendenti, a prescindere dalle dimensioni aziendali. La mancata formazione espone a pesanti sanzioni finanziarie e penali. Affidati ad unico partner per tutti i corsi obbligatori della tua azienda.
          </p>

        </div>
      </section>

      {/* ══════════════ PERCHÉ ALÈTHEIA (BENTO GRID) ══════════════ */}
      <section style={{ padding: '5rem 0', background: isDark ? undefined : '#f8fafc' }} className="dark:bg-dark-bg">
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">Perché scegliere Alètheia</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Oltre 5.000 lavoratori formati. Da vent&apos;anni.
            </h2>
          </div>

          <div className="perche-bento">
            {/* Card scura: hero a piena larghezza, in alto */}
            <div className="perche-card dark-card">
              <span className="perche-icon" aria-hidden="true">
                <i className="fas fa-diagram-project" style={{ color: '#6EE7B7', fontSize: '1.5rem' }}></i>
              </span>
              <div className="perche-text">
                <h3>Una rete di competenze al servizio della tua azienda</h3>
                <p>
                  Alètheia fa parte di <strong>Promotergroup</strong>, un ecosistema di aziende specializzate nella gestione integrata di formazione e sicurezza sul lavoro. Un unico interlocutore per garantirti <strong>competenze coordinate, tempi certi e costi ottimizzati</strong>.
                </p>
              </div>
            </div>

            {/* 3 card bianche: sotto, in riga */}
            <div className="perche-row">
              {puntiForza.map((p) => (
                <div key={p.title} className="perche-card light-card">
                  <span className="perche-icon" aria-hidden="true">
                    <i className={p.icon} style={{ color: '#008C95', fontSize: '1.15rem' }}></i>
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
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
            <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: 1.75 }}>
              Ogni obbligo di legge ha il suo corso. Seleziona l&apos;area che ti riguarda e scopri corsi, date, modalità e costi.
            </p>
          </div>

          <div className="aree-grid">
            {aree.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90}>
                <AreaCard {...a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ METODOLOGIA (stile Kanban aperto, senza card) ══════════════ */}
      <section className="bg-white dark:bg-dark-card" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', maxWidth: '760px' }}>
            <span className="section-badge">Come lavoriamo</span>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 900, margin: 0, lineHeight: 1.25 }}>
              Dalla necessità all&apos;attestato in pochi passaggi
            </h2>
          </div>

          {/* Barra di flusso: i 4 numeri sopra la linea orizzontale continua */}
          <div className="stream-numbers">
            {step.map((s) => (
              <span key={s.n}>{s.n.padStart(2, '0')}</span>
            ))}
          </div>

          {/* Colonne aperte: titolo in alto, icona staccata sotto */}
          <div className="stream-columns">
            {step.map((s) => (
              <div key={s.n} className="stream-col">
                <span className="stream-n-mobile">{s.n.padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <span className="stream-col-icon" aria-hidden="true">
                  <i className={s.icon} style={{ color: '#fff', fontSize: '1rem' }}></i>
                </span>
              </div>
            ))}
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
      <section id="form-contatto" style={{
        background: isDark ? 'linear-gradient(135deg, #0F172A 0%, #0D1F2D 100%)' : '#F1F5F9',
        padding: '5rem 0',
      }}>
        <div className="container">
          {/* Banner consulenza */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
              Non sai quali corsi obbligatori servono alla tua azienda?
            </h3>
            <p style={{ fontSize: '0.92rem', color: isDark ? 'rgba(255,255,255,0.65)' : '#475569', lineHeight: 1.8, margin: 0 }}>
              Ogni impresa ha obblighi diversi in base al settore, ai lavoratori e alle attività svolte. Contattaci per una verifica gratuita degli obblighi formativi: controlliamo la situazione dei tuoi dipendenti, identifichiamo i corsi necessari e ti proponiamo un calendario su misura.
            </p>
          </div>

          <div className="calendario-form-grid2">
            {/* Colonna sinistra: catalogo corsi in partenza, card orizzontali compatte */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '11px', background: 'rgba(0,140,149,0.15)', border: '1px solid rgba(0,140,149,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-calendar-days" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1rem' }}></i>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: 0, lineHeight: 1.3 }}>
                  Corsi in partenza
                </h3>
              </div>

              <CorsiObbligatoriTabs giorni={giorniObbligatoria} isDark={isDark} />

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <a
                  href="/calendario-corsi"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
                    padding: '0 2rem', minHeight: 'var(--btn-height-lg)', whiteSpace: 'nowrap', borderRadius: 'var(--btn-radius)', background: 'transparent',
                    color: isDark ? 'rgba(255,255,255,0.85)' : '#334155', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                    border: isDark ? '2px solid rgba(255,255,255,0.22)' : '2px solid #CBD5E1', boxSizing: 'border-box',
                  }}
                >
                  Vedi tutto il calendario
                </a>
              </div>
            </div>

            {/* Colonna destra: form contatto, sticky durante lo scroll — sfondo grigio/azzurro chiarissimo, nessun bordo */}
            <div
              className="colonna-destra-form"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : '#F8FAFC',
                borderRadius: '1.5rem', overflow: 'hidden',
              }}
            >
              <div style={{ padding: '3.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ width: '52px', height: '52px', minWidth: '52px', borderRadius: '14px', background: 'rgba(0,140,149,0.15)', border: '1px solid rgba(0,140,149,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="fas fa-calendar-check" style={{ color: isDark ? '#6EE7B7' : '#008C95', fontSize: '1.3rem' }}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: isDark ? '#fff' : '#0F172A', margin: 0, lineHeight: 1.3 }}>
                      Richiedi il tuo calendario su misura
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: isDark ? 'rgba(255,255,255,0.5)' : '#64748B', margin: '0.3rem 0 0' }}>
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

      </main>
      <Footer />
    </>
  );
}
