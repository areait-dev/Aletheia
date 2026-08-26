import Link from 'next/link';

interface Variante {
  livelloKey: string;
  label: string;
  attestato?: string;
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
  const r = /rischio\s*(basso|medio|alto)/i.exec(label);
  if (r) return r[1].charAt(0).toUpperCase() + r[1].slice(1);
  return label;
}

/** Card unificata per famiglia di corso (es. Antincendio) - un solo livello di UI per tutte le varianti annidate. */
export default function CourseFamilyCard({ family }: { family: Family }) {
  const livelli = Array.from(new Map(family.varianti.map((v) => [v.livelloKey, v.label])).values());
  const hasMultipleLivelli = livelli.length > 1 && livelli.some((l) => l !== family.titolo);

  return (
    <Link href={`/all-courses/${family.slug}`} style={{ textDecoration: 'none' }} className="group block h-full">
      <div className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-slate-100 dark:border-[rgba(255,255,255,0.08)] shadow-sm transition-all duration-300 w-full h-full min-h-[420px] flex flex-col hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-[180px] overflow-hidden flex-shrink-0">
          <img
            src={family.image}
            alt={family.titolo}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: family.image ? 'rgba(0,0,0,0.35)' : family.gradient }}
          />
          <span className="absolute top-3 left-3 inline-flex items-center h-6 px-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[12px] font-bold rounded-full z-10 uppercase tracking-wide">
            {family.badge}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1 overflow-hidden">
          <h3
            className="font-viga uppercase text-[18px] text-slate-900 dark:text-white leading-snug mt-1 mb-1 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors line-clamp-3"
            style={{ fontSynthesis: 'none' }}
          >
            {family.titolo}
          </h3>

          <p className="text-[14px] text-slate-400 dark:text-gray-400 leading-relaxed line-clamp-2">{family.provider}</p>

          <hr className="my-4 border-t border-slate-100 dark:border-[rgba(255,255,255,0.08)]" />

          {hasMultipleLivelli && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3" aria-label="Livelli disponibili">
              {livelli.map((l) => (
                <span
                  key={l}
                  className="inline-flex items-center h-5 px-2 bg-[#008C95]/10 dark:bg-[#10B981]/10 text-[#008C95] dark:text-[#10B981] text-[11px] font-bold rounded-full"
                >
                  {shortLevelLabel(l)}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-[12px] text-slate-600 dark:text-gray-300 mb-3 mt-auto">
            <i className="fas fa-circle-check fa-fw text-[16px] text-[#008C95]" aria-hidden="true" />
            <span>{family.varianti[0]?.attestato}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
