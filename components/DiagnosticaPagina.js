import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

// PAGINE TEMPORANEE DI DIAGNOSTICA (/diagnostica, /diagnostica-b, /diagnostica-c; 6 nov 2026): stesso contenuto, cambia solo il meta viewport dichiarato
// nel codice HTML (il browser lo legge al caricamento: cambiarlo dopo non basta). Pagine in pages/diagnostica*.js.
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
    // larghezza dello schermo in punti secondo tre fonti diverse (servono a scegliere come adattare la pagina)
    puntiDaViewport: vv ? Math.round(vv.width * vv.scale) : null,
    puntiDaScreenMin: Math.min(window.screen.width, window.screen.height),
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio,
    orientamento: (window.screen.orientation && window.screen.orientation.type) || (window.innerHeight >= window.innerWidth ? 'portrait (stimato)' : 'landscape (stimato)'),
    maxTouchPoints: navigator.maxTouchPoints,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    scrollX: Math.round(window.scrollX),
    metaViewport: (document.querySelector('meta[name="viewport"]') || {}).content || null,
    mq: MQ.map((q) => [q, window.matchMedia(q).matches]),
  };
}

export default function DiagnosticaPagina({ nomeVariante, metaViewport, cosaGuardare }) {
  const [m, setM] = useState(null);
  const [copiato, setCopiato] = useState(false);
  // Storico: una riga a ogni cambio di misure (rotazione, ridimensionamento, zoom): con una sola schermata si vedono verticale e orizzontale.
  const [storico, setStorico] = useState([]);

  // ROTAZIONE verticale → orizzontale (Chrome su iPad, modalità desktop: la pagina resta stretta, si sistema ricaricando; 13 nov 2026).
  // `registro`: per ogni evento di rotazione/ridimensionamento le misure subito, dopo 400 ms e dopo 1,5 s (un evento che non arriva si vede dall'assenza di righe).
  // `rimedio`: tecnica applicata da sola a ogni rotazione per costringere il browser a rileggere il meta viewport (n = nessuna).
  const [registro, setRegistro] = useState([]);
  const [rimedio, setRimedio] = useState('n');
  const rimedioRef = useRef('n');
  rimedioRef.current = rimedio;
  const rilanciaMeta = (tecnica) => {
    const el = document.querySelector('meta[name="viewport"]');
    if (!el || tecnica === 'n') return;
    const c = el.getAttribute('content');
    if (tecnica === 'a') { el.remove(); document.head.appendChild(el); } // stesso elemento tolto e rimesso
    else if (tecnica === 'b') { const nuovo = document.createElement('meta'); nuovo.name = 'viewport'; nuovo.content = c; nuovo.setAttribute('data-next-head', ''); /* senza, next/head reinserisce il suo e restano due meta */ el.replaceWith(nuovo); } // elemento nuovo
    else if (tecnica === 'c') { el.setAttribute('content', `${c}, initial-scale=1`); setTimeout(() => el.setAttribute('content', c), 60); } // alterna e torna
  };
  const campiona = (nome) => {
    [0, 400, 1500].forEach((ms) => setTimeout(() => {
      const mm = misura();
      const riga = `${new Date().toLocaleTimeString('it-IT')} · ${nome} +${ms}ms · inner ${mm.innerWidth}×${mm.innerHeight} · vv ${mm.visualViewportWidth} (scala ${mm.visualViewportScale}) · scrollWidth ${mm.scrollWidth} · schermo ${mm.screenWidth}×${mm.screenHeight} · rimedio ${rimedioRef.current}`;
      setRegistro((prima) => [...prima, riga].slice(-24));
    }, ms));
  };

  useEffect(() => {
    const evento = (nome) => () => {
      campiona(nome);
      if (rimedioRef.current !== 'n') setTimeout(() => { rilanciaMeta(rimedioRef.current); campiona(`${nome}→rimedio ${rimedioRef.current}`); }, 120);
    };
    const eOri = evento('orientationchange'), eRes = evento('resize');
    window.addEventListener('orientationchange', eOri);
    window.addEventListener('resize', eRes);
    return () => { window.removeEventListener('orientationchange', eOri); window.removeEventListener('resize', eRes); };
  }, []);

  useEffect(() => {
    const aggiorna = () => {
      const mm = misura();
      setM(mm);
      const firma = [mm.orientamento, mm.innerWidth, mm.innerHeight, mm.visualViewportWidth, mm.visualViewportScale, mm.scrollWidth, mm.screenWidth, mm.screenHeight].join('|');
      setStorico((prima) => {
        if (prima.length && prima[prima.length - 1].firma === firma) return prima;
        const ora = new Date().toLocaleTimeString('it-IT');
        const riga = `${ora} · ${String(mm.orientamento).replace('-primary', '')} · inner ${mm.innerWidth}×${mm.innerHeight} · vv ${mm.visualViewportWidth} (scala ${mm.visualViewportScale}) · scrollWidth ${mm.scrollWidth} · schermo ${mm.screenWidth}×${mm.screenHeight}`;
        return [...prima, { firma, riga }].slice(-12);
      });
    };
    aggiorna();
    window.addEventListener('resize', aggiorna);
    window.addEventListener('orientationchange', aggiorna);
    window.addEventListener('scroll', aggiorna, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', aggiorna);
    return () => {
      window.removeEventListener('resize', aggiorna);
      window.removeEventListener('orientationchange', aggiorna);
      window.removeEventListener('scroll', aggiorna);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', aggiorna);
    };
  }, []);

  const righeGrandi = m && [
    ['innerWidth', m.innerWidth],
    ['visualViewport.width', m.visualViewportWidth],
    ['documentElement.clientWidth', m.clientWidth],
    ['documentElement.scrollWidth', m.scrollWidth],
    ['scrollX (quanto hai spostato la pagina a destra)', m.scrollX],
    ['devicePixelRatio', m.devicePixelRatio],
    ['orientamento', m.orientamento],
    ['maxTouchPoints', m.maxTouchPoints],
  ];

  // Prova dal vivo di meta viewport alternativi (il browser li rilegge): serve a sapere quale correzione funzionerebbe sull'iPad vero.
  const [metaAttivo, setMetaAttivo] = useState(metaViewport);
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

  // PROVE per l'iPad in modalità sito desktop (pagina temporanea, non toccano il resto del sito). Ognuna mostra i numeri dopo la prova.
  const [prova, setProva] = useState('nessuna');
  const [esitoProva, setEsitoProva] = useState('');
  const [riquadro, setRiquadro] = useState(0);
  const azzeraProve = () => {
    document.documentElement.style.zoom = '';
    document.documentElement.style.width = '';
    document.documentElement.style.touchAction = '';
    document.body.style.touchAction = '';
    setRiquadro(0);
    setProva('nessuna');
    setEsitoProva('');
    setTimeout(() => setM(misura()), 300);
  };
  const eseguiZoom = (nome, punti, bloccaTocco) => {
    azzeraProve();
    setTimeout(() => {
      const layout = window.innerWidth;
      const z = punti / layout;
      document.documentElement.style.zoom = String(z);
      document.documentElement.style.width = `${layout}px`; // zoom da solo ridistribuisce la pagina su più spazio: la larghezza resta quella di layout
      if (bloccaTocco) {
        // il browser considera ancora la pagina larga come il layout: l'area vuota a destra resta raggiungibile, a meno di bloccare il trascinamento orizzontale
        document.documentElement.style.touchAction = 'pan-y pinch-zoom';
        document.body.style.touchAction = 'pan-y pinch-zoom';
      }
      setProva(nome);
      setTimeout(() => {
        const mm = misura();
        setM(mm);
        setEsitoProva(`${nome}: zoom ${z.toFixed(3)} su ${punti} pt. Dopo: scrollWidth ${mm.scrollWidth}, innerWidth ${mm.innerWidth}. ${bloccaTocco ? 'Con blocco del tocco orizzontale (touch-action: pan-y). ' : 'Senza blocco del tocco. '}Prova a trascinare la pagina verso destra: lo scrollX qui sopra deve restare 0.`);
      }, 400);
    }, 350);
  };
  const eseguiRiquadro = () => {
    azzeraProve();
    setTimeout(() => {
      const w = Math.min(window.screen.width, window.screen.height);
      setRiquadro(w);
      setProva('3 · sito in un riquadro stretto');
      setEsitoProva(`3 · sito in un riquadro stretto: sotto c'è /chi-siamo in un riquadro largo ${w} pt. Se qui vedi hamburger e layout a colonne, il sito dentro un riquadro stretto si adatta.`);
    }, 350);
  };

  const copia = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify({ ...m, storico: storico.map((s) => s.riga), registro }, null, 2));
      setCopiato(true);
    } catch {
      setCopiato(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`Diagnostica viewport ${nomeVariante}`}</title>
        {/* Stesso meta viewport di tutte le altre pagine del sito (ognuna lo dichiara da sé): così la misura è rappresentativa. */}
        <meta name="viewport" content={metaViewport} />
        <meta name="robots" content="noindex, nofollow, noarchive" />
      </Head>
      <main className="bg-white dark:bg-dark-card text-gray-900 dark:text-gray-50" style={{ minHeight: '100vh', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.25rem' }}>{`Diagnostica viewport · ${nomeVariante}`}</h1>
        <p className="text-gray-600 dark:text-gray-300" style={{ margin: '0 0 1rem', fontSize: '1rem' }}>
          Pagina temporanea. Fai uno screenshot di tutta la pagina e mandalo, con e senza la modalità sito desktop.
        </p>

        {cosaGuardare && (
          <p className="bg-light dark:bg-dark-bg" style={{ margin: '0 0 1rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontSize: '1rem', lineHeight: 1.5 }}>
            <strong>Cosa guardare:</strong> {cosaGuardare}
          </p>
        )}

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

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>Storico delle misure</h2>
            <p className="text-gray-600 dark:text-gray-300" style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>
              Ruota l'iPad in orizzontale e di nuovo in verticale, poi fai uno screenshot: ogni cambio di misure aggiunge una riga.
            </p>
            <ol data-storico style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
              {storico.map((s) => (
                <li key={s.firma + s.riga}>{s.riga}</li>
              ))}
            </ol>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>Rotazione: registro e rimedi sul meta viewport</h2>
            <p className="text-gray-600 dark:text-gray-300" style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>
              Apri la pagina in VERTICALE (scheda nuova), scegli un rimedio, poi gira l'iPad in ORIZZONTALE. Il registro scrive le misure a ogni evento (subito, dopo 0,4 s e dopo 1,5 s):
              se la pagina resta stretta, guarda se <strong>inner</strong> resta 744 mentre <strong>schermo</strong> dice 1133, e se arriva qualche evento. "Rilancia ora" applica il rimedio senza ruotare.
            </p>
            <div role="group" aria-label="Rimedio alla rotazione" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {[['n', 'Nessun rimedio'], ['a', 'a · togli e rimetti il meta'], ['b', 'b · meta nuovo'], ['c', 'c · alterna initial-scale']].map(([k, et]) => (
                <button key={k} type="button" className="btn btn-outline btn-md" aria-pressed={rimedio === k} onClick={() => setRimedio(k)}>{et}</button>
              ))}
              <button type="button" className="btn btn-primary btn-md" onClick={() => { rilanciaMeta(rimedio); campiona(`rilancia ora ${rimedio}`); }}>Rilancia ora</button>
              <button type="button" className="btn btn-outline btn-md" onClick={() => setRegistro([])}>Svuota registro</button>
            </div>
            <ol data-registro style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
              {registro.map((r, i) => <li key={i}>{r}</li>)}
            </ol>

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
                  <strong>{ok ? 'sì' : 'no'}</strong> - {q}
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

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>Prove di adattamento</h2>
            <p className="text-gray-600 dark:text-gray-300" style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>
              Tocca una prova alla volta, guarda se la pagina entra nello schermo senza scorrere a destra e fai uno screenshot. "Azzera" le toglie.
              Punti dello schermo secondo il browser: da viewport <strong>{String(m.puntiDaViewport)}</strong>, da screen <strong>{String(m.puntiDaScreenMin)}</strong>.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button type="button" className="btn btn-outline btn-md" aria-pressed={prova.startsWith('1')} onClick={() => eseguiZoom('1 · zoom da viewport', m.puntiDaViewport || m.puntiDaScreenMin, true)}>
                Prova 1 · zoom (viewport) + blocco tocco
              </button>
              <button type="button" className="btn btn-outline btn-md" aria-pressed={prova.startsWith('2')} onClick={() => eseguiZoom('2 · zoom da screen', m.puntiDaScreenMin, false)}>
                Prova 2 · zoom (screen)
              </button>
              <button type="button" className="btn btn-outline btn-md" aria-pressed={prova.startsWith('3')} onClick={eseguiRiquadro}>
                Prova 3 · riquadro stretto
              </button>
              <button type="button" className="btn btn-primary btn-md" onClick={azzeraProve}>Azzera</button>
            </div>
            {esitoProva && <p style={{ margin: '0.75rem 0 0', fontSize: '1rem', fontWeight: 700 }}>{esitoProva}</p>}
            {riquadro > 0 && (
              <iframe title="Prova: sito in un riquadro stretto" src="/chi-siamo" style={{ width: `${riquadro}px`, maxWidth: 'none', height: '70vh', border: '3px solid #008C95', borderRadius: '12px', marginTop: '0.75rem', background: '#fff', boxSizing: 'border-box', marginLeft: '-1rem' /* il <main> ha padding 1rem: senza, il bordo destro dell'iframe (largo quanto lo schermo) arriva a +16 pt e il body misura 760 su 744 */ }} />
            )}

            <button type="button" onClick={copia} className="btn btn-primary btn-md" style={{ marginTop: '1.5rem' }}>
              {copiato ? 'Copiato' : 'Copia i dati'}
            </button>
          </>
        )}
      </main>
    </>
  );
}
