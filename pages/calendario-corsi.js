import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CALENDARIO, CATEGORIE } from '../data/calendario';

const MESI = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];
const MESI_ABBR = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

const categoryColor = {
  'regionale-fse': '#10B981',
  'obbligatoria': '#F59E0B',
  'professionale': '#6366F1',
};
const categoryLabel = Object.fromEntries(CATEGORIE.map((c) => [c.key, c.label]));

function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return { y, m: m - 1, d };
}

// "lunedì 8 giugno 2026"
function formatLongDate(s) {
  const { y, m, d } = parseDate(s);
  const giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const dow = new Date(y, m, d).getDay();
  return `${giorni[dow]} ${d} ${MESI[m]} ${y}`;
}

function postiStyle(postiDisponibili) {
  if (postiDisponibili === 0) return { color: '#DC2626', label: 'Posti esauriti', icon: 'fa-circle-xmark' };
  if (postiDisponibili <= 3) return { color: '#F59E0B', label: `${postiDisponibili} posti rimasti`, icon: 'fa-triangle-exclamation' };
  return { color: '#10B981', label: `${postiDisponibili} posti disponibili`, icon: 'fa-circle-check' };
}

export default function CalendarioCorsi() {
  const [categoriaFiltro, setCategoriaFiltro] = useState(''); // es. "obbligatoria"
  const [meseAperto, setMeseAperto] = useState(null); // indice mese (0-11) espanso in fisarmonica, o null

  // Corsi filtrati per categoria (il mese non è più un filtro ma un accordion nella vista principale)
  const corsiFiltrati = useMemo(() => {
    return CALENDARIO
      .filter((c) => categoriaFiltro === '' || c.categoria === categoriaFiltro)
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [categoriaFiltro]);

  // Finestra fissa del calendario: da Agosto 2026 a Luglio 2027 (12 mesi consecutivi a cavallo di due anni)
  const FINESTRA_MESI = useMemo(() => {
    const out = [];
    for (let i = 0; i < 12; i++) {
      const m = (7 + i) % 12; // 7 = Agosto (indice 0-based)
      const y = 2026 + Math.floor((7 + i) / 12);
      out.push({ m, y });
    }
    return out;
  }, []);

  // I mesi della finestra, ciascuno con i propri corsi (array vuoto se nessuno)
  const mesiConCorsi = useMemo(() => {
    const map = new Map(); // "y-m" -> corsi[]
    corsiFiltrati.forEach((c) => {
      const { y, m } = parseDate(c.data);
      const key = `${y}-${m}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(c);
    });
    return FINESTRA_MESI.map(({ m, y }) => ({ m, y, corsi: map.get(`${y}-${m}`) || [] }));
  }, [corsiFiltrati, FINESTRA_MESI]);

  // Raggruppamento per data dei corsi di un singolo mese (usato nell'accordion aperto)
  const gruppiPerMese = (corsiDelMese) => {
    const map = new Map();
    corsiDelMese.forEach((c) => {
      if (!map.has(c.data)) map.set(c.data, []);
      map.get(c.data).push(c);
    });
    return [...map.entries()]; // [ [data, corsi[]], ... ]
  };

  const toggleMese = (m) => setMeseAperto((prev) => (prev === m ? null : m));

  const hasFilters = categoriaFiltro !== '';
  const resetFiltri = () => { setCategoriaFiltro(''); };

  return (
    <>
      <Head>
        <title>Calendario Corsi - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Scopri le date dei prossimi corsi in partenza e iscriviti." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/calendario-corsi" solid />

      {/* HERO - stesso gradiente della pagina news */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-[#004D52] min-h-[320px] flex items-center pt-28 pb-12 px-5 sm:px-6 md:pt-32 md:pb-16">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#008C95' }} />
        <div className="max-w-6xl mx-auto w-full">
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.3rem 0.875rem', borderRadius: '999px',
            background: 'rgba(0,140,149,0.16)', border: '1px solid rgba(0,140,149,0.38)',
            fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#6EE7B7', marginBottom: '1rem',
          }}>
            Formazione
          </span>
          <h1 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', fontWeight: 900, color: '#fff', lineHeight: 1.12, letterSpacing: '-0.02em', margin: '0 0 0.875rem' }}>
            Calendario Corsi
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', maxWidth: '820px', lineHeight: 1.6, margin: 0 }}>
            Scopri le date dei prossimi corsi in partenza, filtra per mese o categoria e prenota subito il tuo posto.
          </p>
        </div>
      </section>

      {/* CONTENUTO - due colonne */}
      <section className="bg-light dark:bg-dark-bg" style={{ padding: '3.5rem 0 5rem' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-8">

          {/* SIDEBAR FILTRI */}
          <aside className="lg:sticky h-fit" style={{ top: '6rem' }}>
            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-sm">
              <h2 className="text-slate-900 dark:text-gray-50 font-extrabold text-sm uppercase tracking-wider mb-4">
                Filtra i corsi
              </h2>

              {/* Filtro categoria */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Categoria
                </label>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setCategoriaFiltro('')}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      categoriaFiltro === '' ? 'bg-[#008C95]/10 dark:bg-[#10B981]/10 text-primary dark:text-[#10B981]' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Tutte le categorie
                  </button>
                  {CATEGORIE.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setCategoriaFiltro(cat.key)}
                      className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        categoriaFiltro === cat.key ? 'bg-[#008C95]/10 dark:bg-[#10B981]/10 text-primary dark:text-[#10B981]' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: categoryColor[cat.key], flexShrink: 0 }} />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={resetFiltri}
                disabled={!hasFilters}
                className={`w-full px-3 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                  hasFilters
                    ? 'border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer'
                    : 'border-slate-100 dark:border-[rgba(255,255,255,0.08)] text-slate-300 dark:text-gray-600 cursor-not-allowed'
                }`}
              >
                <i className="fas fa-rotate-left mr-2" /> Reset filtri
              </button>
            </div>
          </aside>

          {/* LISTA CORSI */}
          <main>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500 dark:text-gray-400">
                <span className="font-bold text-slate-800 dark:text-gray-100">{corsiFiltrati.length}</span>{' '}
                {corsiFiltrati.length === 1 ? 'corso in programma' : 'corsi in programma'}
              </p>
            </div>

            {corsiFiltrati.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <i className="far fa-calendar-xmark text-4xl text-slate-300 dark:text-gray-600 mb-3" />
                <p className="text-slate-500 dark:text-gray-300 text-lg font-medium">Nessun corso trovato</p>
                <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">Prova a modificare i filtri di ricerca</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {mesiConCorsi.map(({ m, y, corsi }) => {
                  const aperto = meseAperto === m;
                  return (
                    <div
                      key={m}
                      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl shadow-sm overflow-hidden"
                    >
                      {/* Header mese - cliccabile per espandere/chiudere solo se ha corsi in programma */}
                      <button
                        type="button"
                        onClick={() => corsi.length > 0 && toggleMese(m)}
                        aria-expanded={aperto}
                        disabled={corsi.length === 0}
                        className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors ${
                          corsi.length > 0 ? 'hover:bg-slate-50 dark:hover:bg-gray-700 cursor-pointer' : 'cursor-default opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ background: aperto ? '#008C95' : 'rgba(0,140,149,0.1)' }}
                          >
                            <i
                              className="fas fa-calendar-days"
                              style={{ fontSize: '1.1rem', color: aperto ? '#fff' : '#008C95' }}
                            />
                          </div>
                          <div>
                            <h3 className="text-slate-900 dark:text-gray-50 font-extrabold text-base leading-snug">
                              {MESI[m]} {y}
                            </h3>
                            <p className="text-slate-500 dark:text-gray-400 text-sm">
                              {corsi.length === 0 ? 'Nessun corso in programma' : `${corsi.length} ${corsi.length === 1 ? 'corso in programma' : 'corsi in programma'}`}
                            </p>
                          </div>
                        </div>
                        {corsi.length > 0 && (
                          <i
                            className="fas fa-chevron-down text-slate-400 dark:text-gray-500 transition-transform flex-shrink-0"
                            style={{ transform: aperto ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        )}
                      </button>

                      {/* Corpo mese - giorni con corsi, visibile solo se aperto */}
                      {aperto && corsi.length > 0 && (
                        <div className="px-5 pb-5 pt-1 flex flex-col gap-8 border-t border-slate-100 dark:border-gray-700">
                          {gruppiPerMese(corsi).map(([data, corsiDelGiorno]) => (
                            <div key={data} className="mt-6">
                              {/* Intestazione data gruppo */}
                              <h4 className="text-sm font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider mb-3 pl-1">
                                {formatLongDate(data)}
                              </h4>

                              <div className="flex flex-col gap-4">
                                {corsiDelGiorno.map((corso) => {
                                  const { d, m: meseCorso } = parseDate(corso.data);
                                  const posti = postiStyle(corso.postiDisponibili);
                                  const esaurito = corso.postiDisponibili === 0;
                                  return (
                                    <div
                                      key={corso.id}
                                      className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-5 flex flex-col sm:flex-row gap-5 transition-shadow hover:shadow-md"
                                    >
                                      {/* Data in evidenza */}
                                      <div className="flex sm:flex-col items-center justify-center sm:justify-start flex-shrink-0 sm:w-20 gap-2 sm:gap-0">
                                        <span style={{ fontSize: '2.25rem', fontWeight: 900, color: '#008C95', lineHeight: 1 }}>
                                          {String(d).padStart(2, '0')}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#008C95', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                          {MESI_ABBR[meseCorso]}
                                        </span>
                                      </div>

                                      {/* Separatore verticale (desktop) */}
                                      <div className="hidden sm:block w-px bg-slate-200 dark:bg-gray-700" />

                                      {/* Dettagli */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                          <span style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                            padding: '0.2rem 0.7rem', borderRadius: '999px',
                                            background: `${categoryColor[corso.categoria]}1f`,
                                            border: `1px solid ${categoryColor[corso.categoria]}55`,
                                            fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                                            color: categoryColor[corso.categoria],
                                          }}>
                                            {categoryLabel[corso.categoria]}
                                          </span>
                                        </div>

                                        <h5 className="text-slate-900 dark:text-gray-50 font-extrabold text-base leading-snug mb-3">
                                          {corso.titolo}
                                        </h5>

                                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-gray-300">
                                          <span className="inline-flex items-center gap-1.5">
                                            <i className="fas fa-location-dot text-primary dark:text-[#10B981]" /> {corso.sede}
                                          </span>
                                          <span className="inline-flex items-center gap-1.5">
                                            <i className="far fa-clock text-primary dark:text-[#10B981]" /> {corso.orario}
                                          </span>
                                          <span className="inline-flex items-center gap-1.5">
                                            <i className="fas fa-hourglass-half text-primary dark:text-[#10B981]" /> {corso.durata}
                                          </span>
                                        </div>

                                        {/* Posti */}
                                        <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: posti.color }}>
                                          <i className={`fas ${posti.icon}`} /> {posti.label}
                                        </div>
                                      </div>

                                      {/* Azione */}
                                      <div className="flex items-center sm:items-end flex-shrink-0">
                                        {esaurito ? (
                                          <a
                                            href={`/contatti?corso=${encodeURIComponent(corso.titolo)}&intento=lista-attesa`}
                                            className="inline-flex items-center gap-2 bg-slate-200 dark:bg-gray-700 text-slate-600 dark:text-gray-300 font-bold text-sm px-5 py-2.5 rounded-xl no-underline hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                                          >
                                            <i className="fas fa-clock-rotate-left" /> Lista d'attesa
                                          </a>
                                        ) : (
                                          <a
                                            href={`/all-courses/${corso.slug}`}
                                            className="text-white font-bold text-sm px-6 py-2.5 rounded-xl no-underline transition-colors whitespace-nowrap"
                                            style={{ background: '#008C95' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = '#006B73')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = '#008C95')}
                                          >
                                            Iscriviti
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
}
