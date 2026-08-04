import Head from 'next/head';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { ALL_NEWS, getNewsBySlug, formatDate } from '../../lib/newsData';
import { useTheme } from '../../context/ThemeContext';

/* ─── Data fetching (invariato) ─────────────────────────────── */

export async function getStaticPaths() {
  return {
    paths: ALL_NEWS.map((n) => ({ params: { slug: n.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = getNewsBySlug(params.slug);
  if (!article) return { notFound: true };
  const related = ALL_NEWS.filter((n) => n.slug !== params.slug).slice(0, 3);
  return { props: { article, related } };
}

/* ─── Utilities ─────────────────────────────────────────────── */

function estimateReadingTime(text) {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

function getCategory(slug) {
  if (/sicurezza|accordo-stato|obbligatori/.test(slug)) return { label: 'Sicurezza sul lavoro', color: '#F59E0B' };
  if (/intelligenza|ai|digitale/.test(slug)) return { label: 'Innovazione', color: '#6366F1' };
  if (/formazione|corsi|gol|fse/.test(slug)) return { label: 'Formazione', color: '#10B981' };
  if (/lavoro|lavoratori|imprese|assumere/.test(slug)) return { label: 'Mercato del lavoro', color: '#008C95' };
  if (/sicilia|microchip/.test(slug)) return { label: 'Sicilia', color: '#EC4899' };
  if (/smart-working/.test(slug)) return { label: 'Smart Working', color: '#8B5CF6' };
  if (/empowerment|femminile/.test(slug)) return { label: 'Parità di genere', color: '#F43F5E' };
  if (/credito|imposta|bonus/.test(slug)) return { label: 'Agevolazioni', color: '#F97316' };
  return { label: 'News', color: '#008C95' };
}

function getTags(slug) {
  const map = {
    'bonus': 'Bonus assunzioni', 'giovani': 'Under 35', 'formazione': 'Formazione',
    'sicurezza': 'Sicurezza', 'lavoro': 'Lavoro', 'sicilia': 'Sicilia',
    'intelligenza-artificiale': 'IA & AI Act', 'smart-working': 'Smart Working',
    'accordo': 'Normativa', 'credito': 'Fiscale', 'stress': 'Benessere',
    'imprese': 'PMI', 'stranieri': 'Lavoro stranieri', 'microchip': 'Tech',
    'gol': 'Programma GOL', 'empowerment': 'Parità di genere', 'frontiere': 'Tendenze',
  };
  return Object.entries(map)
    .filter(([k]) => slug.includes(k))
    .map(([, v]) => v)
    .slice(0, 5);
}

/* ─── renderBody ────────────────────────────────────────────── */

function renderBody(text) {
  return text.split('\n\n').filter(Boolean).map((para, i) => {
    const toBold = (s) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    /* heading: riga solitaria in grassetto */
    if (/^\*\*[^*]+\*\*$/.test(para.trim())) {
      return (
        <h2 key={i} className="article-h2" dangerouslySetInnerHTML={{ __html: toBold(para.trim()) }} />
      );
    }
    /* lista numerata */
    if (/^\d+\.\s/m.test(para)) {
      const items = para.split('\n').filter(Boolean);
      return (
        <ol key={i} className="article-ol">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: toBold(item.replace(/^\d+\.\s/, '')) }} />
          ))}
        </ol>
      );
    }
    /* lista puntata */
    if (para.includes('\n- ') || para.startsWith('- ')) {
      const items = para.split('\n').filter((l) => l.startsWith('- '));
      return (
        <ul key={i} className="article-ul">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: toBold(item.slice(2)) }} />
          ))}
        </ul>
      );
    }
    /* paragrafo normale */
    return (
      <p key={i} className="article-p" dangerouslySetInnerHTML={{ __html: toBold(para) }} />
    );
  });
}

/* ─── ProgressBar ───────────────────────────────────────────── */

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 10000, background: 'rgba(0,0,0,0.08)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #008C95, #10B981)', transition: 'width 0.08s linear' }} />
    </div>
  );
}

/* ─── ShareBar (inline, fine articolo) ─────────────────────── */

function ShareBar() {
  const [copied, setCopied] = useState(false);

  const shareLinkedIn = () => {
    if (typeof window !== 'undefined')
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener');
  };
  const shareFacebook = () => {
    if (typeof window !== 'undefined')
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'noopener');
  };
  const copyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const btnBase = {
    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
    padding: '0.5rem 1rem', borderRadius: '999px',
    cursor: 'pointer', border: '1px solid #E2E8F0',
    fontWeight: 700, fontSize: '0.8rem',
    transition: 'all 0.2s',
  };

  return (
    <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)] bg-slate-50 dark:bg-gray-800/60"
      style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', borderRadius: '1rem', border: '1px solid', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '0.25rem', flexShrink: 0 }}>
        Condividi:
      </span>

      <button onClick={shareLinkedIn} title="Condividi su LinkedIn" aria-label="Condividi su LinkedIn"
        style={{ ...btnBase, background: '#fff', color: '#0A66C2', borderColor: '#BFDBFE' }}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, { background: '#0A66C2', color: '#fff', borderColor: '#0A66C2' })}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: '#fff', color: '#0A66C2', borderColor: '#BFDBFE' })}>
        <i className="fab fa-linkedin-in" style={{ fontSize: '0.85rem' }} /> LinkedIn
      </button>

      <button onClick={shareFacebook} title="Condividi su Facebook" aria-label="Condividi su Facebook"
        style={{ ...btnBase, background: '#fff', color: '#1877F2', borderColor: '#BFDBFE' }}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, { background: '#1877F2', color: '#fff', borderColor: '#1877F2' })}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: '#fff', color: '#1877F2', borderColor: '#BFDBFE' })}>
        <i className="fab fa-facebook-f" style={{ fontSize: '0.85rem' }} /> Facebook
      </button>

      <button onClick={copyLink} title={copied ? 'Link copiato!' : 'Copia link'} aria-label="Copia link"
        style={{ ...btnBase, background: copied ? '#008C95' : '#fff', color: copied ? '#fff' : '#64748B', borderColor: copied ? '#008C95' : '#E2E8F0', marginLeft: 'auto' }}>
        <i className={copied ? 'fas fa-check' : 'fas fa-link'} style={{ fontSize: '0.8rem' }} />
        {copied ? 'Copiato!' : 'Copia link'}
      </button>
    </div>
  );
}

/* ─── RelatedCard (sidebar) ─────────────────────────────────── */

function RelatedCardSmall({ article }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/news/${article.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={hovered ? 'bg-teal-50 dark:bg-gray-700' : ''}
      style={{ display: 'flex', gap: '0.75rem', textDecoration: 'none', padding: '0.75rem', borderRadius: '0.75rem', transition: 'background 0.2s' }}>
      <div className="bg-slate-200 dark:bg-gray-700" style={{ flexShrink: 0, width: '72px', height: '54px', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <img src={article.image} alt={article.title} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#008C95' }}>{formatDate(article.date)}</span>
        <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.8rem', fontWeight: 700, color: hovered ? '#008C95' : undefined, lineHeight: 1.35, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', transition: 'color 0.2s' }}>
          {article.title}
        </span>
      </div>
    </Link>
  );
}

/* ─── RelatedCard (bottom grid) ─────────────────────────────── */

function RelatedCardLarge({ article }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/news/${article.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]"
      style={{ display: 'flex', flexDirection: 'column', borderRadius: '1rem', overflow: 'hidden', textDecoration: 'none', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.25s ease' }}>
      <div className="bg-teal-50 dark:bg-gray-700" style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
        <img src={article.image} alt={article.title} loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#008C95' }}>{formatDate(article.date)}</span>
        <h4 className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: hovered ? '#008C95' : undefined, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', transition: 'color 0.2s' }}>
          {article.title}
        </h4>
        <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.6, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', flex: 1 }}>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function ArticlePage({ article, related }) {
  const readingTime = estimateReadingTime(article.body);
  const category = getCategory(article.slug);
  const tags = getTags(article.slug);
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';

  return (
    <>
      <Head>
        <title>{article.title} - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={article.excerpt} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <ProgressBar />
      <Header active="/news" />

      <style jsx global>{`
        .article-h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0F172A;
          margin: 2.25rem 0 0.875rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .article-h2 strong { font-weight: 900; color: #0F172A; }
        .article-p {
          font-size: 1.125rem;
          line-height: 1.85;
          color: #374151;
          margin: 0 0 1.4rem;
          text-align: justify;
        }
        .article-p strong { font-weight: 700; color: #003134; }
        .article-ul, .article-ol {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #374151;
          padding-left: 1.625rem;
          margin: 0.5rem 0 1.4rem;
        }
        .article-ul li, .article-ol li {
          margin-bottom: 0.5rem;
        }
        .article-ul li strong, .article-ol li strong { font-weight: 700; color: #003134; }

        .dark .article-h2, .dark .article-h2 strong { color: #F8FAFC; }
        .dark .article-p, .dark .article-ul, .dark .article-ol { color: #CBD5E1; }
        .dark .article-p strong,
        .dark .article-ul li strong,
        .dark .article-ol li strong { color: #F8FAFC; }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate {
          animation: heroFadeUp 0.7s ease-out forwards;
        }
        .hero-animate-1 { animation-delay: 0.1s; opacity: 0; }
        .hero-animate-2 { animation-delay: 0.22s; opacity: 0; }
        .hero-animate-3 { animation-delay: 0.34s; opacity: 0; }

        .article-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 3.5rem;
          align-items: flex-start;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 1100px) {
          .article-layout {
            grid-template-columns: 1fr;
          }
          .article-sidebar {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
          .article-p, .article-ul, .article-ol {
            font-size: 1rem;
          }
        }
        @media (max-width: 580px) {
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 581px) and (max-width: 900px) {
          .related-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          HERO - solo gradiente, nessuna immagine. Titolo + meta.
          ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 min-h-[320px] flex items-center pt-28 pb-12 px-5 sm:px-6 md:pt-32 md:pb-16">

        {/* Linea accent turchese in cima */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#008C95' }} />

        {/* Contenuto hero centrato */}
        <div className="max-w-5xl mx-auto w-full">

          {/* Badge categoria */}
          <div className="hero-animate hero-animate-1" style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.3rem 0.875rem', borderRadius: '999px',
              background: `${category.color}28`,
              border: `1px solid ${category.color}60`,
              fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: category.color,
            }}>
              {category.label}
            </span>
          </div>

          {/* Titolo */}
          <h1 className="hero-animate hero-animate-2" style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.12, letterSpacing: '-0.02em',
            marginBottom: '1.25rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.4)',
          }}>
            {article.title}
          </h1>

          {/* Metadati: data + tempo di lettura */}
          <div className="hero-animate hero-animate-3" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
              <i className="far fa-calendar-alt" style={{ fontSize: '0.8rem', color: '#6EE7B7' }} />
              {formatDate(article.date)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
              <i className="far fa-clock" style={{ fontSize: '0.8rem', color: '#6EE7B7' }} />
              {readingTime} min di lettura
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CORPO: layout a due colonne
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-light dark:bg-dark-bg" style={{ padding: '4rem 0 5rem' }}>
        <div className="container">

          {/* Immagine articolo - standalone, a tutta larghezza del contenitore */}
          {article.image && (
            <div className="max-w-5xl mx-auto" style={{ marginBottom: '32px' }}>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: '16px', display: 'block', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          )}

          <div className="article-layout">

            {/* ── Colonna principale (70%) ────────────────────── */}
            <main>
              {/* Lead / excerpt in evidenza */}
              <p className="text-slate-600 dark:text-gray-300 bg-teal-50 dark:bg-teal-900/20" style={{
                fontSize: '1.2rem', fontWeight: 500,
                lineHeight: 1.75, borderLeft: '3px solid #008C95',
                paddingLeft: '1.25rem', marginBottom: '2.25rem',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 0.75rem 0.75rem 0',
              }}>
                {article.excerpt}
              </p>

              {/* Testo articolo */}
              <article>
                {renderBody(article.body)}
              </article>

              {/* Condividi */}
              <ShareBar />

              {/* Tag */}
              {tags.length > 0 && (
                <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.25rem' }}>Tag:</span>
                  {tags.map((tag) => (
                    <span key={tag} className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/40 text-teal-700 dark:text-teal-300" style={{ padding: '0.3rem 0.875rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer articolo: back + CTA */}
              <div className="border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <Link href="/news" className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] text-slate-700 dark:text-gray-200" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.4rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', transition: 'all 0.2s' }}>
                  ← Torna alle notizie
                </Link>
                <a href="/contatti" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.5rem', borderRadius: '999px', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,140,149,0.28)', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,140,149,0.45)' })}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 4px 16px rgba(0,140,149,0.28)' })}>
                  Contattaci
                </a>
              </div>
            </main>

            {/* ── Sidebar (30%) ───────────────────────────────── */}
            <aside className="article-sidebar">
              <div style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Widget: articoli correlati */}
                <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                  <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '1rem 1.25rem', borderBottom: '1px solid', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '3px', height: '16px', background: 'linear-gradient(180deg, #008C95, #10B981)', borderRadius: '2px', display: 'inline-block' }} />
                    <h3 className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: '0.825rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Altre notizie</h3>
                  </div>
                  <div style={{ padding: '0.5rem 0' }}>
                    {related.map((a) => (
                      <RelatedCardSmall key={a.id} article={a} />
                    ))}
                  </div>
                  <div className="border-slate-100 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid' }}>
                    <Link href="/news" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#008C95', textDecoration: 'none' }}>
                      Vedi tutte le notizie →
                    </Link>
                  </div>
                </div>

                {/* Widget: tag */}
                {tags.length > 0 && (
                  <div className="bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '1rem', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                      <span style={{ width: '3px', height: '16px', background: 'linear-gradient(180deg, #008C95, #10B981)', borderRadius: '2px', display: 'inline-block' }} />
                      <h3 className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: '0.825rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Argomenti</h3>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {tags.map((tag) => (
                        <span key={tag} className="bg-white dark:bg-gray-700 border border-teal-100 dark:border-gray-600 text-teal-700 dark:text-teal-300" style={{ padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Widget: CTA contatti */}
                <div style={{
                  background: isDark ? '#1f2937' : 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)',
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  borderLeft: isDark ? '3px solid #10B981' : 'none',
                  borderRadius: '1rem', padding: '1.5rem', textAlign: 'center',
                }}>
                  <p style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', fontWeight: 800, color: '#fff', lineHeight: 1.35 }}>
                    Vuoi maggiori informazioni?
                  </p>
                  <p style={{ margin: '0 0 1.25rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>
                    Il nostro team è a tua disposizione per rispondere a qualsiasi domanda.
                  </p>
                  <a href="/contatti" style={{ display: 'block', padding: '0.7rem 1rem', borderRadius: '999px', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,140,149,0.4)', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,140,149,0.55)' })}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 4px 16px rgba(0,140,149,0.4)' })}>
                    Contattaci ora
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ARTICOLI CORRELATI - griglia 3 colonne
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 dark:bg-dark-bg border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '5rem 0 6rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#008C95' }}>Continua a leggere</p>
              <h2 className="text-slate-900 dark:text-white" style={{ margin: 0, fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 1.2 }}>
                Potrebbe interessarti
              </h2>
            </div>
            <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 700, color: '#008C95', textDecoration: 'none' }}>
              Tutte le notizie →
            </Link>
          </div>

          <div className="related-grid">
            {related.map((a) => (
              <RelatedCardLarge key={a.id} article={a} />
            ))}
          </div>

          {/* Bottone "Torna alle notizie" ben visibile */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.875rem 2.25rem', borderRadius: '999px', background: 'linear-gradient(90deg, #008C95, #10B981)', color: '#fff', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,140,149,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(0,140,149,0.45)' })}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 4px 20px rgba(0,140,149,0.3)' })}>
              ← Torna alle notizie
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
