import type { MouseEventHandler, ReactNode } from 'react';

interface PriceRow {
  label: string;
  value: ReactNode;
}

interface CoursePricingSidebarProps {
  priceRows?: PriceRow[];
  customContent?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  onPrimaryClick?: MouseEventHandler<HTMLAnchorElement>;
  whatsappHref?: string;
}

/**
 * Sidebar prezzo ultra-minimale in stile glassmorphism/SaaS per le pagine corso
 * (pages/all-courses/[slug].js), sticky a destra su desktop. La label della CTA primaria
 * è sovrascrivibile con `primaryLabel`.
 */
export default function CoursePricingSidebar({
  priceRows,
  customContent,
  primaryLabel,
  primaryHref,
  onPrimaryClick,
  whatsappHref,
}: CoursePricingSidebarProps) {
  const label = primaryLabel || 'Richiedi un preventivo';
  const icon = 'fas fa-arrow-right';

  return (
    <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-white/10 p-6 md:p-8 flex flex-col gap-6 rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-none max-w-sm w-full ml-auto transition-all hover:shadow-2xl">

      {/* Intestazione Prezzo Minimale */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-600 dark:text-[#9aa8a6]">
          Iscrizione e Tariffe
        </span>
        {customContent ?? (priceRows?.map((row, i) => (
          <div key={row.label} className="flex flex-col">
            <span className="text-[0.7rem] font-bold text-slate-600 dark:text-[#9aa8a6]">{row.label}</span>
            <span className="text-[#008C95] dark:text-[#10B981] font-black text-3xl tracking-tight mt-0.5">{row.value}</span>
          </div>
        )))}
      </div>

      {/* Spazio di Conversione Principale */}
      <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
        <a
          href={primaryHref || '#'}
          onClick={onPrimaryClick}
          className="w-full text-center text-white rounded-full min-h-[52px] px-6 font-bold no-underline bg-[#008C95] dark:bg-[#10B981] hover:bg-[#006B73] dark:hover:bg-[#059669] transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#008C95]/20 dark:shadow-none group whitespace-nowrap"
        >
          {label}
          <i className={`${icon} text-xs transition-transform group-hover:translate-x-1`}></i>
        </a>

        {whatsappHref && (
          <a
            href={whatsappHref} target="_blank" rel="noopener noreferrer"
            className="w-full text-center py-2 font-medium text-xs no-underline text-slate-600 dark:text-[#9aa8a6] hover:text-[#008C95] dark:hover:text-[#10B981] bg-transparent flex items-center justify-center gap-1.5 transition-colors"
          >
            <i className="fab fa-whatsapp text-sm text-[#10B981]"></i> Parla con un consulente su WhatsApp
          </a>
        )}
      </div>

      {/* Trust Badges in stile Apple Micro-copy */}
      <div className="flex justify-between items-center text-[0.65rem] font-semibold text-slate-600 dark:text-[#9aa8a6] px-1 pt-1">
        <span className="flex items-center gap-1"><i className="fas fa-circle text-[4px] text-[#10B981]"></i> Preventivo gratuito</span>
        <span className="flex items-center gap-1"><i className="fas fa-circle text-[4px] text-[#10B981]"></i> Risposta in 24h</span>
      </div>

    </div>
  );
}
