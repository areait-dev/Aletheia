import type { ReactNode } from 'react';

interface ServiceCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

/**
 * Card riutilizzabile per servizi/feature, ispirata alle card apple.com:
 * angoli molto arrotondati, padding generosi, ombra finissima e leggero
 * scale all'hover. Usa i colori/font brand Alètheia definiti in Tailwind.
 */
export default function ServiceCard({
  icon,
  title,
  description,
  href,
  className = '',
}: ServiceCardProps) {
  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={`group block rounded-3xl bg-white dark:bg-dark-card shadow-sm hover:shadow-lg border border-grey-50 dark:border-[rgba(255,255,255,0.08)] p-8 md:p-10 transition-all duration-300 ease-out hover:scale-[1.02] no-underline ${className}`}
    >
      {icon && (
        <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-brand-100 dark:bg-[rgba(0,140,149,0.15)] text-primary dark:text-brand-200 text-xl">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-ds-h3 font-bold text-grey-500 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-ds-p2 leading-relaxed text-grey-300 dark:text-grey-100">
        {description}
      </p>
    </Wrapper>
  );
}
