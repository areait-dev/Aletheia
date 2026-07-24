import Head from 'next/head';
import Footer from '../../components/Footer';
import { useState, useMemo, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import { OFFERTE } from '../../data/offerte';
import JobOfferCard from '../../components/JobOfferCard';
import FormCandidato from '../../components/FormCandidato';

const TIPI_CONTRATTO = ['Tempo determinato', 'Tempo indeterminato', 'Somministrazione'];

export default function OfferteDiLavoro() {
  const [query, setQuery] = useState('');
  const [sede, setSede] = useState('');
  const [tipo, setTipo] = useState('');
  const [activeOfferta, setActiveOfferta] = useState(null);
  const modalRef = useRef(null);

  const sedi = useMemo(
    () => [...new Set(OFFERTE.map((o) => o.città))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return OFFERTE.filter((o) => {
      const matchQuery = q === '' || o.titolo.toLowerCase().includes(q);
      const matchSede = sede === '' || o.città === sede;
      const matchTipo = tipo === '' || o.tipoContratto === tipo;
      return matchQuery && matchSede && matchTipo;
    });
  }, [query, sede, tipo]);

  const resetFiltri = () => { setQuery(''); setSede(''); setTipo(''); };
  const hasFiltri = query !== '' || sede !== '' || tipo !== '';

  const openModal  = (offerta) => setActiveOfferta(offerta);
  const closeModal = () => setActiveOfferta(null);

  /* chiudi modal con ESC o click fuori */
  useEffect(() => {
    if (!activeOfferta) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeOfferta]);

  return (
    <>
      <Head>
        <title>Offerte di Lavoro - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Scopri le offerte di lavoro disponibili presso Alètheia Srl - Agenzia per il Lavoro in Sicilia." />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }

        .hero-section {
          background: linear-gradient(135deg, #0F172A 0%, #134E4A 100%);
          color: #ffffff;
          padding: 120px 24px 60px;
        }
        .hero-content { max-width: 1200px; margin: 0 auto; }
        .hero-label {
          display: inline-block;
          font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
          color: #10B981; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3);
          padding: 0.4rem 0.95rem; border-radius: 999px; margin-bottom: 1.5rem;
        }
        .hero-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; line-height: 1.15; margin-bottom: 0.75rem; }
        .hero-subtitle { font-size: clamp(0.95rem, 2vw, 1.1rem); color: rgba(255,255,255,0.8); line-height: 1.7; max-width: 820px; }

        .content-section { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; }

        .poster-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-panel {
          animation: modalIn 0.28s cubic-bezier(0.22,1,0.36,1) forwards;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-label fade-in">Posizioni aperte</div>
          <h1 className="hero-title fade-in">Offerte di Lavoro</h1>
          <p className="hero-subtitle fade-in">
            Scopri le opportunità di lavoro disponibili presso Alètheia Srl e le aziende partner. Invia la tua candidatura e unisciti al nostro team.
          </p>
        </div>
      </section>

      <div className="content-section">

        {/* ── FILTRI ── */}
        <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-4 md:p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 text-sm pointer-events-none"></i>
              <input
                type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca per ruolo o parola chiave" aria-label="Cerca per ruolo"
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400 outline-none focus:border-[#008C95] dark:focus:border-[#10B981] transition-colors"
              />
            </div>
            <select value={sede} onChange={(e) => setSede(e.target.value)} aria-label="Filtra per sede"
              className="py-3 px-4 rounded-xl text-sm bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 outline-none focus:border-[#008C95] transition-colors cursor-pointer md:min-w-[180px]">
              <option value="">Tutte le sedi</option>
              {sedi.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Filtra per tipo contratto"
              className="py-3 px-4 rounded-xl text-sm bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 outline-none focus:border-[#008C95] transition-colors cursor-pointer md:min-w-[200px]">
              <option value="">Tutti i contratti</option>
              {TIPI_CONTRATTO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <button onClick={resetFiltri} disabled={!hasFiltri}
              className="py-3 px-5 rounded-xl text-sm font-semibold whitespace-nowrap border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-transparent cursor-pointer">
              <i className="fas fa-rotate-left mr-2 text-xs"></i>Reset filtri
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-gray-400">
            <strong className="text-[#008C95] dark:text-[#10B981]">{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'offerta trovata' : 'offerte trovate'}
          </p>
        </div>

        {/* ── GRID POSTER ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-500 dark:text-gray-300 text-lg font-medium">Nessuna offerta trovata</p>
            <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">Prova a modificare i filtri di ricerca</p>
          </div>
        ) : (
          <div className="poster-grid">
            {filtered.map((offerta) => (
              <JobOfferCard key={offerta.id} offerta={offerta} onApply={openModal} />
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL CANDIDATURA ── */}
      {activeOfferta && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Candidatura per ${activeOfferta.titolo}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            ref={modalRef}
            className="modal-panel"
            style={{
              background: '#fff',
              borderRadius: '1.5rem',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
            }}
          >
            {/* Header modal */}
            <div style={{
              padding: '1.5rem 1.75rem 1.25rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem',
            }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#10B981', marginBottom: '0.3rem' }}>
                  CANDIDATURA PER
                </p>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0F172A', lineHeight: 1.2 }}>
                  {activeOfferta.titolo}
                </h2>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: '#008C95' }}></i>
                  {activeOfferta.città}
                </p>
              </div>
              <button
                onClick={closeModal}
                aria-label="Chiudi"
                style={{
                  flexShrink: 0, background: '#f1f5f9', border: 'none', borderRadius: '50%',
                  width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#475569', fontSize: '0.9rem',
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
              <FormCandidato posizioneDefault={activeOfferta.titolo} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
