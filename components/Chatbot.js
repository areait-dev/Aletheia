import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const FAQ_FORMAZIONE = [
  { q: "Come mi iscrivo a un corso?", a: "Puoi iscriverti direttamente dal nostro sito nella sezione 'Tutti i corsi', oppure contattarci al +39 0932 862613 o via email a info@aletheiasrl.it." },
  { q: "I corsi sono in presenza o online?", a: "Offriamo entrambe le modalità: corsi in presenza presso la nostra sede di Vittoria (RG) e corsi FAD (Formazione a Distanza) sulla nostra piattaforma e-learning." },
  { q: "Ci sono corsi gratuiti disponibili?", a: "Sì! Gestiamo corsi finanziati attraverso il Programma G.O.L., l'Avviso FSE+ e altri bandi regionali. Contattaci per scoprire se hai i requisiti per accedere gratuitamente." },
  { q: "Rilasciate attestati e certificazioni?", a: "Sì, al termine di ogni corso rilasciamo attestati riconosciuti. Per i corsi ECDL/ICDL siamo Test Center AICA accreditato. Per i corsi sulla sicurezza rilasciamo attestati conformi alla normativa vigente." },
  { q: "Quanto durano i corsi?", a: "La durata varia in base al corso: dai corsi sulla sicurezza di poche ore, ai corsi professionalizzanti di centinaia di ore. Ogni corso ha la durata indicata nella sua scheda." },
  { q: "Dove si trova la vostra sede?", a: "La nostra sede è in Via del Carrubo, snc - 97019 Vittoria (RG). Siamo aperti dal lunedì al venerdì, 9:00-18:00." },
  { q: "Cos'è il corso ECDL/ICDL?", a: "È la certificazione informatica più diffusa al mondo, riconosciuta a livello internazionale. Siamo Test Center AICA accreditato e offriamo percorsi Base, Standard, Full Standard e DigComp 2.2." },
  { q: "Come posso pagare un corso?", a: "Contattaci direttamente per conoscere le modalità di pagamento disponibili: bonifico bancario, rateizzazione o finanziamenti agevolati. Chiamaci al +39 0932 862613." },
];

const FAQ_LAVORO = [
  { q: "Come posso candidarmi a un'offerta di lavoro?", a: "Puoi consultare le offerte attive nella sezione 'Offerte di Lavoro' e candidarti online, oppure inviarci il tuo CV a info@aletheiasrl.it specificando il ruolo di interesse." },
  { q: "Cos'è il Programma G.O.L.?", a: "Il Programma Garanzia Occupabilità Lavoratori (G.O.L.) è un piano nazionale per il reinserimento lavorativo. Offre percorsi personalizzati di formazione e riqualificazione professionale completamente finanziati." },
  { q: "Cosa si intende per Garanzia Giovani?", a: "È un programma rivolto ai giovani NEET (under 30 non occupati e non in formazione) che offre orientamento, formazione e tirocinio finanziati dalla Regione Siciliana." },
  { q: "Offrite supporto per la stesura del CV?", a: "Sì, nell'ambito dei nostri servizi alla persona offriamo supporto nella stesura del CV, preparazione al colloquio e orientamento professionale personalizzato." },
  { q: "Siete un'agenzia per il lavoro autorizzata?", a: "Sì, Alètheia S.r.l. è Agenzia per il Lavoro autorizzata dal Ministero del Lavoro con decreto DDS Nr. 1.100/2019, iscritta all'Albo Nazionale delle Agenzie per il Lavoro." },
  { q: "Quali servizi offrite alle aziende?", a: "Offriamo somministrazione di lavoro, ricerca e selezione del personale, consulenza HR, formazione aziendale e intermediazione lavoro. Contattaci per una consulenza gratuita." },
  { q: "Come funziona la somministrazione di lavoro?", a: "Forniamo personale qualificato tramite contratti di somministrazione a tempo determinato e indeterminato, garantendo piena conformità normativa e riducendo i costi amministrativi per la tua azienda." },
  { q: "Dove si trova la vostra sede?", a: "La nostra sede è in Via del Carrubo, snc - 97019 Vittoria (RG). Puoi contattarci al +39 0932 862613 o via email a info@aletheiasrl.it." },
];

const FAQ_GENERALE = [
  { q: "Chi è Alètheia S.r.l.?", a: "Alètheia S.r.l. è un ente di formazione professionale e agenzia per il lavoro con sede a Vittoria (RG), operativo dal 2005 in Sicilia. Facciamo parte del gruppo PromoterGroup S.p.A." },
  { q: "Quali servizi offrite?", a: "Offriamo formazione professionale (corsi obbligatori, ECDL/ICDL, corsi finanziati), servizi di agenzia per il lavoro (ricerca personale, somministrazione, orientamento) e supporto alle imprese." },
  { q: "Avete corsi sulla sicurezza sul lavoro?", a: "Sì, siamo specializzati in formazione obbligatoria sulla sicurezza: corsi per lavoratori, preposti, dirigenti e datori di lavoro, conformi all'Accordo Stato-Regioni." },
  { q: "Come posso contattarvi?", a: "Puoi chiamarci al +39 0932 862613, scriverci a info@aletheiasrl.it, o visitarci in Via del Carrubo, snc - Vittoria (RG). Siamo disponibili dal lunedì al venerdì, 9:00-18:00." },
  { q: "Dove si trova la vostra sede?", a: "La nostra sede è in Via del Carrubo, snc - 97019 Vittoria (RG), in Sicilia." },
  { q: "Siete accreditati dalla Regione Siciliana?", a: "Sì, siamo accreditati dalla Regione Siciliana per la formazione professionale (DDG n 78/2017) e autorizzati come Agenzia per il Lavoro (DDS Nr. 1.100/2019)." },
  { q: "Cosa sono i corsi FSE+?", a: "Sono corsi professionalizzanti co-finanziati dal Fondo Sociale Europeo, spesso gratuiti per i partecipanti. Gestiamo diversi avvisi FSE+ per la Regione Siciliana." },
];

const ALL_FAQ = [...FAQ_FORMAZIONE, ...FAQ_LAVORO, ...FAQ_GENERALE];

// Parole chiave sui temi trattati dal sito: se la domanda libera non ne contiene
// nessuna, l'assistente non tenta un match e resta pertinente al solo ambito Alètheia.
const SITE_KEYWORDS = [
  'corso', 'corsi', 'formazione', 'iscriv', 'attestat', 'certificaz', 'ecdl', 'icdl',
  'rspp', 'rls', 'antincendio', 'sicurezza', 'primo soccorso', 'haccp', 'fitosanitari',
  'lavoro', 'lavora', 'candidat', 'cv', 'curriculum', 'assunzion', 'somministrazion',
  'agenzia', 'azienda', 'colloquio', 'gol', 'garanzia giovani', 'fse', 'finanziat', 'gratuit',
  'sede', 'contatt', 'orari', 'telefono', 'email', 'prezzo', 'costo', 'pagamento',
  'aletheia', 'alètheia', 'vittoria', 'preposto', 'dirigente', 'rischio', 'dpi', 'carrell',
  'gru', 'trattori', 'ple', 'quota', 'elettric', 'fondo', 'psr', 'oss', 'asacom',
];

function tokenize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

/** Cerca tra tutte le FAQ del sito la risposta più pertinente alla domanda libera
 *  dell'utente. Ritorna null se la domanda non tocca nessun argomento del sito
 *  (l'assistente non deve rispondere a temi non pertinenti). */
function findBestAnswer(question) {
  const qNorm = question.toLowerCase();
  const isOnTopic = SITE_KEYWORDS.some((kw) => qNorm.includes(kw));
  if (!isOnTopic) return null;

  const qTokens = new Set(tokenize(question));
  let best = null;
  let bestScore = 0;
  for (const faq of ALL_FAQ) {
    const faqTokens = tokenize(faq.q + ' ' + faq.a);
    let score = 0;
    for (const t of faqTokens) if (qTokens.has(t)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }
  return bestScore > 0 ? best : null;
}

function useFAQ() {
  const router = useRouter();
  const path = router.pathname;
  if (path.includes('agenzia-per-il-lavoro')) return FAQ_LAVORO;
  if (path.includes('all-courses') || path.includes('corsi') || path.includes('formazione')) return FAQ_FORMAZIONE;
  return FAQ_GENERALE;
}

export default function Chatbot() {
  const { theme } = useTheme() || { theme: 'light' };
  const { cartOpen } = useCart() || {};
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [notPertinent, setNotPertinent] = useState(false);
  const [query, setQuery] = useState('');
  const [btnHover, setBtnHover] = useState(false);
  const [chipHover, setChipHover] = useState(null);
  const bodyRef = useRef(null);
  const faqs = useFAQ();

  const handleAsk = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const match = findBestAnswer(q);
    if (match) {
      setSelected(match);
      setNotPertinent(false);
    } else {
      setSelected(null);
      setNotPertinent(true);
    }
    setQuery('');
  };

  useEffect(() => {
    if (selected && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [selected]);

  const handleOpen = () => {
    setOpen(true);
    setSelected(null);
    setNotPertinent(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(null);
    setNotPertinent(false);
  };

  // Nascondi il chatbot mentre il carrello è aperto: si sovrappone ai pulsanti
  // del footer del drawer (stesso angolo in basso a destra).
  if (cartOpen) return null;

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' }}>
      <style jsx>{`
        @keyframes chatbot-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.16); }
        }
        .chatbot-toggle-mark {
          animation: chatbot-breathe 2.2s ease-in-out infinite;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
        }
        @keyframes chatbot-glow {
          0%, 100% { box-shadow: 0 4px 20px var(--chatbot-glow-color, rgba(0,140,149,0.45)); }
          50% { box-shadow: 0 4px 32px var(--chatbot-glow-color, rgba(0,140,149,0.45)), 0 0 0 8px var(--chatbot-glow-ring, rgba(0,140,149,0.12)); }
        }
        .chatbot-toggle-btn {
          animation: chatbot-glow 2.2s ease-in-out infinite;
        }
        .chatbot-toggle-mark.is-open {
          animation: none;
          transform: rotate(90deg) scale(0.9);
          opacity: 0;
        }
        .chatbot-toggle-close {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
          transform: rotate(-90deg) scale(0.5);
          opacity: 0;
        }
        .chatbot-toggle-close.is-open {
          transform: rotate(0deg) scale(1);
          opacity: 1;
        }
      `}</style>

      {/* Finestra chat */}
      <div style={{
        width: '360px',
        maxWidth: 'calc(100vw - 2rem)',
        borderRadius: '1.25rem',
        boxShadow: theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        background: theme === 'dark' ? '#004d52' : '#fff',
        marginBottom: '0.75rem',
        transformOrigin: 'bottom right',
        transform: open ? 'scale(1)' : 'scale(0.85)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.25s ease, opacity 0.25s ease',
        // Il wrapper esterno ha pointerEvents:none (occupa un'area fissa 360x583 in basso a
        // destra, sovrapposta ad altri elementi della pagina anche a chat chiusa): questa
        // finestra deve riattivare i click solo quando è effettivamente visibile (open).
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #008C95, #10B981)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', lineHeight: 1.2 }}>Assistente Alètheia</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.15rem' }}>Rispondo subito alle tue domande</div>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
              width: '28px', height: '28px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background 0.2s',
            }}
            aria-label="Chiudi chat"
          >
            <i className="fas fa-times" style={{ color: '#fff', fontSize: '0.8rem' }}></i>
          </button>
        </div>

        {/* Body */}
        <div ref={bodyRef} style={{
          background: theme === 'dark' ? '#004d52' : '#fff',
          padding: '1rem',
          overflowY: 'auto',
          maxHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}>
          {notPertinent ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: theme === 'dark' ? '#374151' : '#fff',
                  border: theme === 'dark' ? '1px solid #4B5563' : '1px solid #E2E8F0',
                  borderRadius: '1rem 1rem 1rem 0.25rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.82rem',
                  color: theme === 'dark' ? '#E2E8F0' : '#334155',
                  maxWidth: '90%',
                  lineHeight: 1.6,
                }}>
                  Posso rispondere solo a domande su corsi, formazione e servizi Alètheia (agenzia per il lavoro). Per questa richiesta contattaci direttamente.
                  <div style={{ marginTop: '0.6rem', borderTop: theme === 'dark' ? '1px solid #4B5563' : '1px solid #F1F5F9', paddingTop: '0.5rem' }}>
                    <a href="/#contatti" style={{ fontSize: '0.76rem', color: theme === 'dark' ? '#10B981' : '#008C95', fontWeight: 700, textDecoration: 'none' }}>
                      Contattaci per saperne di più →
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setNotPertinent(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: theme === 'dark' ? '#9CA3AF' : '#64748B', fontSize: '0.78rem', fontWeight: 600,
                  padding: '0.25rem 0', textAlign: 'left', marginTop: '0.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                }}
              >
                ← Torna alle domande
              </button>
            </>
          ) : selected === null ? (
            <>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: theme === 'dark' ? '#9CA3AF' : '#64748B', textAlign: 'center' }}>
                Scrivi una domanda qui sotto o scegline una per ricevere una risposta immediata
              </p>
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(faq)}
                  onMouseEnter={() => setChipHover(i)}
                  onMouseLeave={() => setChipHover(null)}
                  style={{
                    background: chipHover === i
                      ? (theme === 'dark' ? '#1e3a3a' : '#F0FDFA')
                      : (theme === 'dark' ? '#374151' : '#fff'),
                    border: chipHover === i ? '1px solid #10B981' : (theme === 'dark' ? '1px solid #4B5563' : '1px solid #E2E8F0'),
                    borderRadius: '999px',
                    padding: '0.6rem 1rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: chipHover === i ? '#10B981' : (theme === 'dark' ? '#E2E8F0' : '#0F172A'),
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.2s',
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </button>
              ))}
            </>
          ) : (
            <>
              {/* Domanda (destra) */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: theme === 'dark' ? '#10B981' : '#008C95',
                  color: '#fff',
                  borderRadius: '1rem 1rem 0.25rem 1rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  maxWidth: '85%',
                  lineHeight: 1.45,
                }}>
                  {selected.q}
                </div>
              </div>

              {/* Risposta (sinistra) */}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: theme === 'dark' ? '#374151' : '#fff',
                  border: theme === 'dark' ? '1px solid #4B5563' : '1px solid #E2E8F0',
                  borderRadius: '1rem 1rem 1rem 0.25rem',
                  padding: '0.75rem 1rem',
                  fontSize: '0.82rem',
                  color: theme === 'dark' ? '#E2E8F0' : '#334155',
                  maxWidth: '90%',
                  lineHeight: 1.6,
                }}>
                  {selected.a}
                  <div style={{ marginTop: '0.6rem', borderTop: theme === 'dark' ? '1px solid #4B5563' : '1px solid #F1F5F9', paddingTop: '0.5rem' }}>
                    <a href="/#contatti" style={{ fontSize: '0.76rem', color: theme === 'dark' ? '#10B981' : '#008C95', fontWeight: 700, textDecoration: 'none' }}>
                      Contattaci per saperne di più →
                    </a>
                  </div>
                </div>
              </div>

              {/* Torna alle domande */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: theme === 'dark' ? '#9CA3AF' : '#64748B', fontSize: '0.78rem', fontWeight: 600,
                  padding: '0.25rem 0', textAlign: 'left', marginTop: '0.25rem',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                }}
              >
                ← Torna alle domande
              </button>
            </>
          )}
        </div>

        {/* Footer — barra per formulare una domanda libera (risposte solo su temi del sito) */}
        <form onSubmit={handleAsk} style={{
          background: theme === 'dark' ? '#374151' : '#fff',
          borderTop: theme === 'dark' ? '1px solid #4B5563' : '1px solid #E2E8F0',
          padding: '0.75rem',
          display: 'flex',
          gap: '0.5rem',
        }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Scrivi una domanda su corsi o lavoro..."
            style={{
              flex: 1,
              minWidth: 0,
              background: theme === 'dark' ? '#1f2937' : '#F8FAFC',
              border: theme === 'dark' ? '1px solid #4B5563' : '1px solid #E2E8F0',
              borderRadius: '999px',
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              color: theme === 'dark' ? '#F8FAFC' : '#0F172A',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            aria-label="Invia domanda"
            style={{
              background: 'linear-gradient(135deg, #008C95, #10B981)',
              border: 'none',
              borderRadius: '50%',
              width: '38px', height: '38px',
              flexShrink: 0,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <i className="fas fa-paper-plane" style={{ color: '#fff', fontSize: '0.85rem' }}></i>
          </button>
        </form>
      </div>

      {/* Pulsante toggle */}
      <button
        onClick={open ? handleClose : handleOpen}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        aria-label={open ? 'Chiudi assistente' : 'Apri assistente FAQ'}
        className={!open ? 'chatbot-toggle-btn' : ''}
        style={{
          position: 'relative',
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: theme === 'dark' ? 'linear-gradient(135deg, #10B981, #34D399)' : 'linear-gradient(135deg, #008C95, #10B981)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open ? (theme === 'dark' ? '0 4px 20px rgba(16,185,129,0.45)' : '0 4px 20px rgba(0,140,149,0.45)') : undefined,
          '--chatbot-glow-color': theme === 'dark' ? 'rgba(16,185,129,0.45)' : 'rgba(0,140,149,0.45)',
          '--chatbot-glow-ring': theme === 'dark' ? 'rgba(16,185,129,0.14)' : 'rgba(0,140,149,0.12)',
          transform: btnHover ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          flexShrink: 0,
          pointerEvents: 'auto',
        }}
      >
        <div style={{ position: 'relative', width: '26px', height: '26px' }}>
          <img
            src="/images/logo/pittogramma-white.png"
            alt=""
            aria-hidden="true"
            className={`chatbot-toggle-mark${open ? ' is-open' : ''}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
          />
          <i
            className={`fas fa-times chatbot-toggle-close${open ? ' is-open' : ''}`}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.3rem' }}
          ></i>
        </div>
        {!open && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            width: '20px', height: '20px', borderRadius: '50%',
            background: '#EF4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.65rem', fontWeight: 800, color: '#fff',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            border: '2px solid #fff',
          }}>
            ?
          </span>
        )}
      </button>
    </div>
  );
}
