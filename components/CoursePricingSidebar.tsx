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
  /** Solo nei corsi di formazione obbligatoria: negli altri casi non va passato (niente pulsante WhatsApp). */
  whatsappHref?: string;
  /** Riga di testo sotto il pulsante principale (es. "Gratuito e senza impegno: ti inviamo quota e date entro 24 ore"). */
  sottoCta?: string;
  /** Linea sopra i pulsanti. Falsa per il riquadro a iscrizione (ha già i suoi blocchi: la linea lasciava un vuoto tra l'avviso giallo e "Richiedi un preventivo"). */
  divisore?: boolean;
}

/**
 * Sidebar prezzo ultra-minimale in stile glassmorphism/SaaS per le pagine corso
 * (pages/corsi/[slug].js), sticky a destra su desktop. La label della CTA primaria
 * è sovrascrivibile con `primaryLabel`.
 */
export default function CoursePricingSidebar({
  priceRows,
  customContent,
  primaryLabel,
  primaryHref,
  onPrimaryClick,
  whatsappHref,
  sottoCta,
  divisore = true,
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
            <span className="text-[#018891] dark:text-primary-on-dark font-black text-3xl tracking-tight mt-0.5">{row.value}</span>
          </div>
        )))}
      </div>

      {/* Spazio di Conversione Principale. `!mt-0` sui link con `text-center`: in globals.css .text-center aggiunge margin-top:3rem
          (48px di vuoto sopra il pulsante, vedi CLAUDE.md). */}
      <div className={`flex flex-col gap-4 ${divisore ? 'pt-4 border-t border-slate-100 dark:border-white/5' : ''}`}>
        <a
          href={primaryHref || '#'}
          onClick={onPrimaryClick}
          className="w-full text-center !mt-0 text-white rounded-full min-h-[52px] px-6 font-bold no-underline bg-[#018891] dark:bg-[#018891] hover:bg-[#006B73] dark:hover:bg-[#006B73] transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#018891]/20 dark:shadow-none group whitespace-nowrap"
        >
          {label}
          <i className={`${icon} text-xs transition-transform group-hover:translate-x-1`}></i>
        </a>

        {sottoCta && (
          // Niente `text-center`: in globals.css aggiunge margin-top:3rem (vedi il commento sopra).
          <p className="text-xs leading-snug text-slate-600 dark:text-[#9aa8a6] m-0 !mt-0 [text-align:center]">{sottoCta}</p>
        )}

        {whatsappHref && (
          <a
            href={whatsappHref} target="_blank" rel="noopener noreferrer"
            className="w-full text-center !mt-0 py-2 font-medium text-xs no-underline text-slate-600 dark:text-[#9aa8a6] hover:text-[#018891] dark:hover:text-primary-on-dark bg-transparent flex items-center justify-center gap-1.5 transition-colors"
          >
            <i className="fab fa-whatsapp text-sm text-[#018891]"></i> Parla con un consulente su WhatsApp
          </a>
        )}
      </div>

      {/* Trust Badges in stile Apple Micro-copy */}
      <div className="flex justify-between items-center text-[0.65rem] font-semibold text-slate-600 dark:text-[#9aa8a6] px-1 pt-1">
        <span className="flex items-center gap-1"><i className="fas fa-circle text-[4px] text-[#018891]"></i> Preventivo gratuito</span>
      </div>

    </div>
  );
}
