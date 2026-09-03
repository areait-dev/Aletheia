import { useEffect, useState } from 'react';

const SOGLIA_AVVIO = 15;

interface EnrollmentProgressProps {
  /** Identificatore univoco del corso (slug), usato per la chiave di storage. */
  courseId: string;
  courseTitle: string;
}

/**
 * Contatore iscrizioni "a soglia" per i corsi a partenza differita (OSS, ASACOM,
 * Conduttore d'Impresa Agricola): ogni click su "Iscriviti" incrementa il conteggio
 * salvato in localStorage. Al raggiungimento di SOGLIA_AVVIO iscrizioni mostra un
 * avviso di corso confermato.
 *
 * Mockup senza backend (vedi CLAUDE.md - "No API routes or backend logic"): la
 * notifica allo staff per ricontattare gli iscritti e avviare il corso è simulata
 * con un console.log. In produzione qui andrebbe una chiamata a un endpoint reale
 * (es. email/Slack) che scatta al superamento della soglia.
 */
export default function EnrollmentProgress({ courseId, courseTitle }: EnrollmentProgressProps) {
  const storageKey = `aletheia_enrollments_${courseId}`;
  const [count, setCount] = useState(0);
  const [justEnrolled, setJustEnrolled] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setCount(saved ? parseInt(saved, 10) || 0 : 0);
    } catch (e) {}
  }, [storageKey]);

  const iscriviti = () => {
    setCount((prev) => {
      const next = Math.min(prev + 1, SOGLIA_AVVIO);
      try {
        localStorage.setItem(storageKey, String(next));
      } catch (e) {}
      if (next >= SOGLIA_AVVIO && prev < SOGLIA_AVVIO) {
        // TODO: sostituire con una chiamata reale a un endpoint di notifica (email/Slack)
        // quando sarà disponibile un backend - per ora simula l'invio dell'avviso allo staff.
        // eslint-disable-next-line no-console
        console.log(`[EnrollmentProgress] Soglia di ${SOGLIA_AVVIO} iscrizioni raggiunta per "${courseTitle}" (${courseId}): notificare lo staff per ricontattare gli iscritti e avviare il corso.`);
      }
      return next;
    });
    setJustEnrolled(true);
  };

  const soglaRaggiunta = count >= SOGLIA_AVVIO;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <button
        type="button"
        onClick={iscriviti}
        disabled={soglaRaggiunta}
        className="w-full text-center text-white rounded-xl py-3 px-6 no-underline transition-transform !m-0"
        style={{
          background: soglaRaggiunta ? '#9CA3AF' : 'linear-gradient(90deg, #0d9488, #10b981)',
          fontWeight: 700, fontSize: '0.95rem', border: 'none',
          boxShadow: soglaRaggiunta ? 'none' : '0 2px 6px rgba(13,148,136,0.25)',
          boxSizing: 'border-box', cursor: soglaRaggiunta ? 'default' : 'pointer', fontFamily: 'inherit',
        }}
      >
        <i className={`fas ${soglaRaggiunta ? 'fa-check' : 'fa-user-plus'}`} style={{ marginRight: '0.5rem' }}></i>
        {soglaRaggiunta ? 'Corso confermato' : 'Iscriviti'}
      </button>

      <div className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div className="bg-slate-100 dark:bg-gray-700" style={{ flex: 1, height: '6px', borderRadius: '999px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${(count / SOGLIA_AVVIO) * 100}%`,
              height: '100%',
              background: soglaRaggiunta ? '#10B981' : '#008C95',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ whiteSpace: 'nowrap' }}>{count}/{SOGLIA_AVVIO} iscritti</span>
      </div>

      {soglaRaggiunta ? (
        <p className="text-emerald-700 dark:text-emerald-400" style={{ fontSize: '0.78rem', margin: 0 }}>
          Soglia di {SOGLIA_AVVIO} iscrizioni raggiunta: il corso partirà a breve, il nostro staff ricontatterà gli iscritti per calendarizzarlo.
        </p>
      ) : justEnrolled ? (
        <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.78rem', margin: 0 }}>
          Iscrizione registrata. Ti ricontatteremo per avviare il corso al raggiungimento di {SOGLIA_AVVIO} iscritti.
        </p>
      ) : (
        <p className="text-slate-600 dark:text-gray-400" style={{ fontSize: '0.78rem', margin: 0 }}>
          Il corso parte al raggiungimento di {SOGLIA_AVVIO} iscrizioni.
        </p>
      )}
    </div>
  );
}
