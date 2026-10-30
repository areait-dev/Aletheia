import Link from 'next/link';
import Image from 'next/image';

interface Variante {
  livelloKey: string;
  label: string;
  tipo?: string;
  attestato?: string;
  durataOre?: string | null;
  modalita?: string;
}

interface Family {
  slug: string;
  titolo: string;
  provider: string;
  image?: string;
  gradient?: string;
  badge: string;
  varianti: Variante[];
}

// Etichetta sintetica di un livello per il tag "L1 · L2 · L3" (es. "Livello 1" -> "L1", "Gruppo A" -> "A")
function shortLevelLabel(label: string): string {
  const m = /livello\s*(\d+)/i.exec(label);
  if (m) return `L${m[1]}`;
  const g = /gruppo\s*([abc](\s*(e|\/)\s*[abc])?)/i.exec(label);
  if (g) return g[1].toUpperCase().replace(/\s+/g, '');
  // "Modulo 1 - Agricoltura, ..." / "Modulo A Esterno" -> "Modulo 1" / "Modulo A" (le etichette lunghe occupano una riga intera)
  const mod = /^modulo\s+([a-c]|\d+)\b/i.exec(label);
  if (mod) return `Modulo ${mod[1].toUpperCase()}`;
  const r = /rischio\s*(basso|medio|alto)/i.exec(label);
  if (r) return r[1].charAt(0).toUpperCase() + r[1].slice(1);
  return label;
}

// Etichetta di un aggiornamento con varianti proprie (es. RLS: "Meno Di 50 Dipendenti" -> "Agg. meno di 50 dip."); null se non riconoscibile
function shortAggLabel(label: string): string | null {
  const m = /(meno|più)\s+di\s+(\d+)\s+dipendenti/i.exec(label);
  return m ? `Agg. ${m[1].toLowerCase()} di ${m[2]} dip.` : null;
}

/** Card unificata per famiglia di corso (es. Antincendio) - un solo livello di UI per tutte le varianti annidate. */
export default function CourseFamilyCard({ family }: { family: Family }) {
  // Tag sotto il divisore: ogni card li ha sempre, così l'area non resta vuota.
  // - livelli del corso base (L1 · L2 · L3, Basso · Medio · Alto...), oppure "Corso" se la famiglia ha un solo livello;
  // - aggiornamenti: un solo tag "Aggiornamento", salvo quando l'aggiornamento ha varianti proprie (es. RLS: meno/più di 50 dipendenti).
  const livelliCorso = Array.from(new Map(family.varianti.filter((v) => v.tipo !== 'aggiornamento').map((v) => [v.livelloKey, v.label])).values());
  const livelliAgg = Array.from(new Map(family.varianti.filter((v) => v.tipo === 'aggiornamento').map((v) => [v.livelloKey, v.label])).values());
  const corsoTags = livelliCorso.length > 1 ? livelliCorso.map(shortLevelLabel) : ['Corso'];
  const aggVarianti = livelliAgg.map(shortAggLabel).filter((t): t is string => !!t);
  const aggTags = livelliAgg.length === 0 ? [] : aggVarianti.length === livelliAgg.length && aggVarianti.length > 1 ? aggVarianti : ['Aggiornamento'];
  // Area ad altezza fissa (2 righe): i tag di aggiornamento hanno sempre la precedenza, i livelli in eccesso diventano "+N".
  const MAX_TAGS = 4;
  const maxCorso = corsoTags.length + aggTags.length > MAX_TAGS ? MAX_TAGS - aggTags.length - 1 : corsoTags.length;
  const corsoVisibili = corsoTags.slice(0, Math.max(maxCorso, 1));
  const tagExtra = corsoTags.length - corsoVisibili.length;
  const tags = [...corsoVisibili, ...(tagExtra > 0 ? [`+${tagExtra}`] : []), ...aggTags];

  return (
    <Link href={`/all-courses/${family.slug}`} style={{ textDecoration: 'none' }} className="group block h-full">
      <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-slate-100 dark:border-[rgba(255,255,255,0.08)] shadow-sm transition-all duration-300 w-full h-full min-h-[420px] flex flex-col hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-[180px] overflow-hidden flex-shrink-0">
          {family.image && (
            <Image
              src={family.image}
              alt={family.titolo}
              fill
              sizes="(max-width: 768px) 100vw, 340px"
              className="object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: family.image ? 'rgba(0,0,0,0.35)' : family.gradient }}
          />
          <span className="badge-overlay absolute top-3 left-3 z-10">
            {family.badge}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1 overflow-hidden">
          <h3
            className="font-viga uppercase text-[18px] text-slate-900 dark:text-white leading-snug mt-1 mb-1 min-h-[3.4375rem] group-hover:text-[#04767D] dark:group-hover:text-primary-on-dark transition-colors line-clamp-2"
            style={{ fontSynthesis: 'none' }}
          >
            {family.titolo}
          </h3>

          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 min-h-[20px] text-[13px] text-slate-600 dark:text-gray-400">
            {family.varianti[0]?.durataOre && (
              <span className="inline-flex items-center gap-1.5">
                <i className="fas fa-clock text-[12px] text-[#018891] dark:text-primary-on-dark" aria-hidden="true" />
                {family.varianti[0].durataOre}
              </span>
            )}
            {family.varianti[0]?.modalita && (
              <span className="inline-flex items-center gap-1.5">
                <i className="fas fa-chalkboard-user text-[12px] text-[#018891] dark:text-primary-on-dark" aria-hidden="true" />
                {family.varianti[0].modalita}
              </span>
            )}
          </div>

          <hr className="my-4 border-t border-slate-100 dark:border-[rgba(255,255,255,0.08)]" />

          <div className="flex flex-wrap content-start items-start gap-1.5 mb-3 min-h-[3.25rem] max-h-[3.25rem] overflow-hidden" aria-label="Livelli e aggiornamenti disponibili">
            {tags.map((t) => (
              <span key={t} className="badge-chip max-w-full" title={t}>
                <span className="truncate">{t}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[12px] text-slate-600 dark:text-gray-300 mb-3 mt-auto">
            <i className="fas fa-circle-check fa-fw text-[16px] text-[#008C95]" aria-hidden="true" />
            <span className="line-clamp-1">{family.varianti[0]?.attestato}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
