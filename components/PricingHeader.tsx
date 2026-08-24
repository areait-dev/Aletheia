import type { ReactNode } from 'react';

interface PricingHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

/**
 * Header per sezioni prezzi/landing in stile apple.com: titolo centrato
 * d'impatto, sottotitolo distanziato, CTA subito sotto, ampio respiro
 * verticale. Palette/font brand Alètheia (nessun colore hardcoded fuori
 * dalle variabili/design tokens già definiti).
 */
export default function PricingHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className = '',
}: PricingHeaderProps) {
  return (
    <header
      className={`flex flex-col items-center text-center px-6 py-24 md:py-32 ${className}`}
    >
      {eyebrow && (
        <span className="text-ds-span uppercase tracking-widest font-semibold text-primary dark:text-brand-200 mb-4">
          {eyebrow}
        </span>
      )}

      <h1 className="font-heading text-4xl md:text-ds-h1 font-bold leading-tight text-grey-500 dark:text-white max-w-4xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-6 text-ds-p1 text-grey-300 dark:text-grey-100 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {actions && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {actions}
        </div>
      )}
    </header>
  );
}
