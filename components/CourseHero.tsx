import Link from 'next/link';
import type { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface CourseHeroProps {
  breadcrumb?: Breadcrumb[];
  badge?: string;
  title: ReactNode;
  titleSuffix?: ReactNode;
}

/**
 * Hero scura "slim" per le pagine corso: solo breadcrumb + badge + H1. Va renderizzata FUORI dal
 * grid a due colonne (prima di FormazioneValoreSection e prima di cp-page-grid) - la scheda tecnica
 * (durata/modalità/attestato/ecc.) NON vive più qui, ma dentro il tab "Panoramica" tramite
 * CourseSchedaTecnica, secondo lo standard architetturale approvato per tutte le pagine corso.
 */
export default function CourseHero({ breadcrumb = [], badge, title, titleSuffix }: CourseHeroProps) {
  return (
    <div className="cp-hero-slim">
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {breadcrumb.map((crumb, i) => (
          <span key={crumb.label} style={{ display: 'contents' }}>
            {i > 0 && <span className="text-slate-300 dark:text-gray-600">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>
                {crumb.label}
              </Link>
            ) : (
              <span className="text-slate-600 dark:text-gray-300">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #134E4A 100%)', borderRadius: '1.75rem', padding: 'clamp(1.5rem, 3.5vw, 2.25rem)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(16,185,129,0.14) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {badge && (
            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6EE7B7', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', padding: '0.35rem 0.9rem', borderRadius: '999px', marginBottom: '1.1rem' }}>
              {badge}
            </span>
          )}
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15, margin: 0 }}>
            {title} {titleSuffix && <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>{titleSuffix}</span>}
          </h1>
        </div>
      </div>
    </div>
  );
}
