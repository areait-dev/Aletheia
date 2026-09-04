import { useEffect, useRef, useState } from 'react';

export const COOKIE_CONSENT_KEY = 'cookie-consent';

/** Legge la scelta salvata ('accepted' | 'rejected' | null se non ancora scelta). */
export function getCookieConsent(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
}

/**
 * Banner di consenso cookie GDPR semplice (nessuna libreria esterna).
 * Mostra il banner solo se non è ancora presente una scelta in localStorage;
 * salva 'accepted' o 'rejected' e notifica il resto della pagina con un
 * evento custom ('cookie-consent-change'), così componenti come la mappa
 * di Google Maps in contatti.js possono reagire senza dover ricaricare.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  // Comunica l'altezza reale del banner (varia con il wrap del testo su schermi stretti)
  // al chatbot tramite una CSS custom property, così il FAB si sposta sopra il banner
  // invece di restarci nascosto dietro.
  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !bannerRef.current) {
      root.style.setProperty('--cookie-banner-height', '0px');
      return;
    }
    const el = bannerRef.current;
    const update = () => root.style.setProperty('--cookie-banner-height', `${el.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty('--cookie-banner-height', '0px');
    };
  }, [visible]);

  const choose = (value: 'accepted' | 'rejected') => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      // localStorage non disponibile (es. modalità privata restrittiva): non blocchiamo l'utente.
    }
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label="Consenso cookie"
      className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        padding: '1rem 1.25rem',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <p className="text-gray-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.85rem', maxWidth: '640px', flex: '1 1 320px' }}>
        Utilizziamo cookie tecnici e, previo consenso, cookie non tecnici per migliorare l&apos;esperienza sul sito.
        Consulta la nostra{' '}
        <a href="/privacy-cookie" className="text-[#006B73] dark:text-[#10B981]" style={{ fontWeight: 700, textDecoration: 'underline' }}>
          Privacy e Cookie Policy
        </a>{' '}
        per maggiori informazioni.
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
        <button
          onClick={() => choose('rejected')}
          className="text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
          style={{ padding: '0.55rem 1.1rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Rifiuta
        </button>
        <button
          onClick={() => choose('accepted')}
          style={{
            padding: '0.55rem 1.1rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            border: 'none',
            color: '#fff',
            background: 'linear-gradient(90deg, #008C95, #10B981)',
          }}
        >
          Accetta
        </button>
      </div>
    </div>
  );
}
