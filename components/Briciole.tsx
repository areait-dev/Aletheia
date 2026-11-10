import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { CSSProperties } from 'react';
import { breadcrumbJsonLd, percorsoCanonico } from '../lib/seo';

export type Voce = { label: string; href?: string };

type Props = {
  /** Le briciole mostrate a video, nell'ordine; "Home" è aggiunta da `conHome`. L'ultima è la pagina corrente (o, nelle schede corso, la categoria). */
  voci: Voce[];
  /** 'scuro' = hero scure (frecce ›); 'chiaro' = schede corso (separatore "/"); 'gol' = come 'scuro' con gli stili di Programma G.O.L. */
  variante?: 'scuro' | 'chiaro' | 'gol';
  /** Aggiunge "Home" (link a /) come prima voce, a video e nel JSON-LD. Predefinito: sì per le hero scure, no per le schede corso. */
  conHome?: boolean;
  /** true se l'ultima voce (senza link) è la pagina corrente: nel JSON-LD riceve il suo indirizzo. false per le schede corso, dove l'ultima è la categoria. */
  ultimaEPagina?: boolean;
  /** Margine inferiore (rem) della nav. */
  margineBasso?: string;
  className?: string;
  stile?: CSSProperties;
};

/**
 * UNICO componente delle briciole: disegna la nav e, dalla stessa lista `voci`, emette il BreadcrumbList JSON-LD
 * (URL assoluti su https://www.aletheiasrl.it). Così le voci strutturate non possono divergere da quelle visibili.
 * Test: tests/regressione/briciole.spec.mjs.
 */
export default function Briciole({ voci, variante = 'scuro', conHome, ultimaEPagina = true, margineBasso, className, stile }: Props) {
  const { asPath } = useRouter();
  const home = conHome ?? variante !== 'chiaro';
  const tutte: Voce[] = home ? [{ label: 'Home', href: '/' }, ...voci] : voci;
  const ultima = tutte.length - 1;

  const json = breadcrumbJsonLd(
    tutte.map((v, i) => ({
      nome: v.label,
      percorso: i === ultima && !v.href ? (ultimaEPagina ? percorsoCanonico(asPath) : undefined) : v.href,
    })),
  );
  const script = (
    <Head>
      <script key="ld-briciole" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    </Head>
  );

  if (variante === 'chiaro') {
    return (
      <>
        {script}
        <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: `${margineBasso ?? '1'}rem`, flexWrap: 'wrap', ...stile }} className={className}>
          {tutte.map((v, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="text-slate-300 dark:text-gray-600">/</span>}
              {v.href && i < ultima ? (
                <Link href={v.href} className="text-slate-600 dark:text-gray-400" style={{ textDecoration: 'none' }}>{v.label}</Link>
              ) : (
                <span className="text-slate-600 dark:text-gray-300">{v.label}</span>
              )}
            </span>
          ))}
        </nav>
      </>
    );
  }

  const gol = variante === 'gol';
  const colLink = 'rgba(255,255,255,0.5)';
  return (
    <>
      {script}
      <nav
        aria-label="Breadcrumb"
        className={[gol ? 'briciole-gol' : '', className].filter(Boolean).join(' ') || undefined}
        style={gol ? stile : { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: colLink, marginBottom: `${margineBasso ?? '1.5'}rem`, flexWrap: 'wrap', ...stile }}
      >
        {tutte.map((v, i) => (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <span aria-hidden="true">›</span>}
            {v.href && i < ultima ? (
              <a href={v.href} style={gol ? undefined : { color: colLink, textDecoration: 'none' }}>{v.label}</a>
            ) : (
              <span style={{ color: gol ? 'rgba(255,255,255,0.75)' : '#6EE7B7' }}>{v.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
