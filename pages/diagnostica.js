import Head from 'next/head';
import { useEffect, useState } from 'react';

// PAGINA TEMPORANEA DI DIAGNOSTICA (6 nov 2026): serve a sapere che larghezza vede il sito su un iPad vero (modalità "sito desktop"
// compresa), perché l'emulazione in WebKit non la riproduce. Non è linkata da nessuna parte, ha noindex e non c'è una sitemap.
// DA TOGLIERE PRIMA DEL PASSAGGIO DEI DNS (vedi MIGRAZIONE.md): eliminare questo file e il suo test.
// Niente Header/Footer e niente dati: HTML statico, le misure si leggono nel browser (useEffect).

const MQ = [
  '(pointer: coarse)', '(pointer: fine)', '(any-pointer: coarse)', '(any-pointer: fine)',
  '(hover: hover)', '(hover: none)', '(any-hover: hover)', '(orientation: portrait)', '(orientation: landscape)',
  '(max-width: 1023px)', '(min-width: 1024px)', '(prefers-color-scheme: dark)',
];

function misura() {
  const de = document.documentElement;
  const vv = window.visualViewport;
  return {
    innerWidth: window.innerWidth,
    visualViewportWidth: vv ? Math.round(vv.width * 100) / 100 : null,
    visualViewportScale: vv ? Math.round(vv.scale * 1000) / 1000 : null,
    clientWidth: de.clientWidth,
    scrollWidth: de.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
    orientamento: (window.screen.orientation && window.screen.orientation.type) || (window.innerHeight >= window.innerWidth ? 'portrait (stimato)' : 'landscape (stimato)'),
    maxTouchPoints: navigator.maxTouchPoints,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    metaViewport: (document.querySelector('meta[name="viewport"]') || {}).content || null,
    mq: MQ.map((q) => [q, window.matchMedia(q).matches]),
  };
}

export default function Diagnostica() {
  const [m, setM] = useState(null);
  const [copiato, setCopiato] = useState(false);

  useEffect(() => {
    const aggiorna = () => setM(misura());
    aggiorna();
    window.addEventListener('resize', aggiorna);
    window.addEventListener('orientationchange', aggiorna);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', aggiorna);
    return () => {
      window.removeEventListener('resize', aggiorna);
      window.removeEventListener('orientationchange', aggiorna);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', aggiorna);
    };
  }, []);

  const righeGrandi = m && [
    ['innerWidth', m.innerWidth],
    ['visualViewport.width', m.visualViewportWidth],
    ['documentElement.clientWidth', m.clientWidth],
    ['documentElement.scrollWidth', m.scrollWidth],
    ['devicePixelRatio', m.devicePixelRatio],
    ['orientamento', m.orientamento],
    ['maxTouchPoints', m.maxTouchPoints],
  ];

  // Prova dal vivo di meta viewport alternativi (il browser li rilegge): serve a sapere quale correzione funzionerebbe sull'iPad vero.
  const [metaAttivo, setMetaAttivo] = useState('width=device-width, initial-scale=1');
  const provaMeta = (contenuto) => {
    const el = document.querySelector('meta[name="viewport"]');
    if (el) el.setAttribute('content', contenuto);
    setMetaAttivo(contenuto);
    setTimeout(() => setM(misura()), 400);
  };
  const VARIANTI = [
    ['A · come il sito', 'width=device-width, initial-scale=1'],
    ['B · senza initial-scale', 'width=device-width'],
    ['C · width=1024', 'width=1024'],
  ];

  const copia = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(m, null, 2));
      setCopiato(true);
    } catch {
      setCopiato(false);
    }
  };

  return (
    <>
      <Head>
        <title>Diagnostica viewport</title>
        {/* Stesso meta viewport di tutte le altre pagine del sito (ognuna lo dichiara da sé): così la misura è rappresentativa. */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <main className="bg-white dark:bg-dark-card text-gray-900 dark:text-gray-50" style={{ minHeight: '100vh', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem' }}>Diagnostica viewport</h1>
        <p className="text-gray-600 dark:text-gray-300" style={{ margin: '0 0 1rem', fontSize: '1rem' }}>
          Pagina temporanea. Fai uno screenshot di tutta la pagina e mandalo, con e senza la modalità sito desktop.
        </p>

        {!m && <p>Misure in corso…</p>}

        {m && (
          <>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {righeGrandi.map(([nome, valore]) => (
                <div key={nome} className="bg-light dark:bg-dark-bg" style={{ borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                  <div className="text-gray-600 dark:text-gray-300" style={{ fontSize: '0.95rem' }}>{nome}</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, overflowWrap: 'anywhere' }}>{String(valore)}</div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>Dettagli</h2>
            <dl style={{ margin: 0, fontSize: '1rem', lineHeight: 1.5 }}>
              {[
                ['userAgent', m.userAgent],
                ['platform', m.platform],
                ['meta viewport', m.metaViewport],
                ['screen', `${m.screenWidth} × ${m.screenHeight}`],
                ['outerWidth', m.outerWidth],
                ['innerHeight', m.innerHeight],
                ['visualViewport.scale', m.visualViewportScale],
                ['body.scrollWidth', m.bodyScrollWidth],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: '0.5rem', overflowWrap: 'anywhere' }}>
                  <dt className="text-gray-600 dark:text-gray-300" style={{ fontWeight: 700 }}>{k}</dt>
                  <dd style={{ margin: 0 }}>{String(v)}</dd>
                </div>
              ))}
            </dl>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>Media query</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '1rem', lineHeight: 1.6 }}>
              {m.mq.map(([q, ok]) => (
                <li key={q}>
                  <strong>{ok ? 'sì' : 'no'}</strong> — {q}
                </li>
              ))}
            </ul>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>Prova meta viewport</h2>
            <p className="text-gray-600 dark:text-gray-300" style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>
              Tocca A, B, C e guarda se i numeri e la pagina cambiano. In uso: <strong>{metaAttivo}</strong>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {VARIANTI.map(([nome, valore]) => (
                <button key={nome} type="button" onClick={() => provaMeta(valore)} className="btn btn-outline btn-md" aria-pressed={metaAttivo === valore}>
                  {nome}
                </button>
              ))}
            </div>

            <button type="button" onClick={copia} className="btn btn-primary btn-md" style={{ marginTop: '1.5rem' }}>
              {copiato ? 'Copiato' : 'Copia i dati'}
            </button>
          </>
        )}
      </main>
    </>
  );
}
