import Head from 'next/head';
import Image from 'next/image';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';
import Header from '../../components/Header';
import { ALL_NEWS, formatDate } from '../../lib/newsData';
import Reveal from '../../components/Reveal';

function NewsCard({ news }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{
        borderRadius: '1rem',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 12px 32px rgba(0,0,0,0.1)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Immagine */}
      <div style={{ position: 'relative', paddingTop: '56.25%', background: '#F0FDFA', overflow: 'hidden' }}>
        {!imgError ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            onError={() => setImgError(true)}
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#F0FDFA',
          }}>
          </div>
        )}
      </div>

      {/* Contenuto */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#008C95' }}>
          {formatDate(news.date)}
        </span>

        <h3 className="text-slate-900 dark:text-white" style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: 800,
          lineHeight: 1.4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {news.title}
        </h3>

        <p className="text-slate-600 dark:text-gray-300" style={{
          margin: 0,
          fontSize: '0.875rem',
          lineHeight: 1.65,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          flex: 1,
        }}>
          {news.excerpt}
        </p>

        <Link
          href={`/news/${news.slug}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.25rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#008C95',
            textDecoration: 'none',
          }}
        >
          Leggi l&#39;articolo
        </Link>
      </div>
    </div>
  );
}

const CATEGORIE = [
  { value: '', label: 'Tutte' },
  { value: 'apl', label: 'Agenzia per il lavoro' },
  { value: 'formazione', label: 'Formazione' },
];

export default function NewsPage() {
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');

  const years = [...new Set(ALL_NEWS.map(n => Number(n.date.slice(0, 4))))].sort((a, b) => b - a);

  const filtered = ALL_NEWS.filter(news => {
    const matchQuery =
      query === '' ||
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchYear =
      selectedYear === '' || news.date.slice(0, 4) === selectedYear;
    const matchCategoria =
      selectedCategoria === '' || news.tags?.includes(selectedCategoria);
    return matchQuery && matchYear && matchCategoria;
  });

  return (
    <>
      <Head>
        <title>News - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Notizie e aggiornamenti su formazione, lavoro e opportunità professionali in Sicilia. Il blog di Alètheia Srl."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <Header active="/news" />

      <main>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.55s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.08s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.18s; opacity: 0; }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
        }
        .breadcrumb a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb a:hover { color: #6EE7B7; }
        .breadcrumb span { color: rgba(255,255,255,0.3); }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6EE7B7;
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .news-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .news-grid { grid-template-columns: 1fr; }
          .filter-row { flex-direction: column !important; }
          .search-box { max-width: 100% !important; }
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 1px solid #E2E8F0;
          border-radius: 999px;
          font-size: 0.9rem;
          color: #0F172A;
          background: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .search-input:focus {
          border-color: #008C95;
          box-shadow: 0 0 0 3px rgba(0,140,149,0.1);
        }
        .search-input::placeholder { color: #94A3B8; }
        :global(.dark) .search-input {
          background: #374151;
          color: #F8FAFC;
          border-color: #374151;
        }
        :global(.dark) .year-select {
          background-color: #374151;
          color: #F8FAFC;
          border-color: #374151;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2310B981' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
        }

        .year-select {
          padding: 0.75rem 1.5rem;
          padding-right: 2.75rem;
          border: 1px solid #E2E8F0;
          border-radius: 999px;
          font-size: 0.9rem;
          color: #0F172A;
          background-color: #fff;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23008C95' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.1rem center;
          background-size: 10px;
          outline: none;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
          min-width: 160px;
        }
        .year-select:focus {
          border-color: #008C95;
          box-shadow: 0 0 0 3px rgba(0,140,149,0.1);
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
          paddingTop: '120px',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(0,140,149,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          <div className="hero-badge fade-up">
            News
          </div>

          <h1
            className="fade-up fade-up-1"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.12,
              marginBottom: '1.25rem',
              maxWidth: '680px',
            }}
          >
            Ultime{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #10B981, #008C95)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Notizie
            </span>
          </h1>

          <p
            className="fade-up fade-up-2"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(255,255,255,0.68)',
              maxWidth: '820px',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Aggiornamenti su formazione, lavoro e opportunità professionali.
          </p>
        </div>
      </section>

      {/* ── FILTRI ───────────────────────────────────────────── */}
      <section className="bg-slate-50 dark:bg-dark-bg border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '2rem 0' }}>
        <div className="container">
          {/* Filtro categoria */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {CATEGORIE.map((c) => {
              const isActive = selectedCategoria === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setSelectedCategoria(c.value)}
                  aria-pressed={isActive}
                  className={isActive ? '' : 'text-slate-600 dark:text-gray-300 border-slate-200 dark:border-[rgba(255,255,255,0.15)]'}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                    border: isActive ? 'none' : '1px solid',
                    background: isActive ? 'linear-gradient(90deg, #008C95, #10B981)' : 'transparent',
                    color: isActive ? '#fff' : undefined,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div
            className="filter-row"
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}
          >
            {/* Ricerca */}
            <div
              className="search-box"
              style={{ position: 'relative', flex: 1, maxWidth: '480px' }}
            >
              <i
                className="fas fa-search"
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                  fontSize: '0.85rem',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                className="search-input"
                placeholder="Cerca nelle notizie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Cerca nelle notizie"
              />
            </div>

            {/* Filtro anno */}
            <select
              className="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Filtra per anno"
            >
              <option value="">Tutti gli anni</option>
              {years.map(y => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
          </div>

          {/* Contatore risultati */}
          <p style={{ margin: '0.75rem 0 0', fontSize: '0.82rem', color: '#94A3B8' }}>
            <strong style={{ color: '#008C95' }}>{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'notizia trovata' : 'notizie trovate'}
          </p>
        </div>
      </section>

      {/* ── GRIGLIA ──────────────────────────────────────────── */}
      <section className="bg-light dark:bg-dark-bg" style={{ padding: '4rem 0 5rem' }}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className="news-grid">
              {filtered.map((news, i) => (
                <Reveal key={news.id} delay={(i % 6) * 80} className="h-full">
                  <NewsCard news={news} />
                </Reveal>
              ))}
            </div>
          ) : (
            /* Stato vuoto */
            <div style={{
              textAlign: 'center',
              padding: '5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: '#F0FDFA', border: '1px solid #CCFBF1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.75rem', color: '#008C95',
              }}>
              </div>
              <h3 className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                Nessuna notizia trovata
              </h3>
              <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.9rem', maxWidth: '340px', lineHeight: 1.6 }}>
                Prova con parole chiave diverse o cambia l&#39;anno selezionato.
              </p>
              <button
                onClick={() => { setQuery(''); setSelectedYear(''); setSelectedCategoria(''); }}
                style={{
                  marginTop: '0.5rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.7rem 1.75rem', borderRadius: '999px',
                  background: 'linear-gradient(90deg, #008C95, #10B981)',
                  color: '#fff', fontWeight: 700, fontSize: '0.875rem',
                  border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 4px 16px rgba(0,140,149,0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,140,149,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,140,149,0.3)';
                }}
              >
                Azzera filtri
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      </main>
      <Footer />
    </>
  );
}
