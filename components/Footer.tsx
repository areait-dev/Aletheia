import Image from 'next/image';

import { useSiteOptions } from '../context/SiteOptionsContext';

const isExternal = (href: string) => /^https?:\/\//.test(href);
const extProps = (href: string) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {});

export default function Footer() {
  const { identita, footer } = useSiteOptions();
  const telHref = `tel:${identita.telefono.replace(/[^+\d]/g, '')}`;
  return (
    <footer id="contatti" className="bg-slate-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Col 1 - Contatti */}
          <div>
            <span className="text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase mb-6 block">Alètheia S.r.l.</span>

            <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2.5">
              <a
                href={footer.indirizzoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-primary dark:hover:text-primary-on-dark transition-colors"
              >
                <svg className="text-primary dark:text-primary-on-dark shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {footer.indirizzo}
              </a>
              <a href={telHref} className="flex items-center gap-2.5 hover:text-primary dark:hover:text-primary-on-dark transition-colors">
                <svg className="text-primary dark:text-primary-on-dark shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {identita.telefono}
              </a>
              <a href={`mailto:${identita.email}`} className="flex items-center gap-2.5 hover:text-primary dark:hover:text-primary-on-dark transition-colors">
                <svg className="text-primary dark:text-primary-on-dark shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                {identita.email}
              </a>
              <span className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-500 pt-1">
                <svg className="text-primary dark:text-primary-on-dark shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {identita.orari}
              </span>
            </div>

            <div className="mt-6 flex gap-4 text-slate-600 dark:text-slate-500 text-lg">
              {identita.social.map((soc) => (
                <a key={soc.href} href={soc.href} target="_blank" rel="noopener noreferrer" aria-label={soc.name || undefined} className="hover:text-slate-800 dark:hover:text-white transition-colors"><i className={soc.icon} /></a>
              ))}
            </div>

            <div className="flex flex-col gap-1 mt-6 text-xs text-slate-600 dark:text-slate-500">
              {footer.linkLegali.map((l) => (
                <a key={l.href} href={l.href} {...extProps(l.href)} className="py-1 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Col 2 - Link rapidi (colonne da WordPress: ogni gruppo con sottotitolo è l'elenco con freccia, senza sottotitolo l'elenco principale) */}
          <div>
            {footer.colonne.map((col, ci) => (
              <div key={col.titolo} className={ci > 0 ? 'mt-8' : undefined}>
                <span className="text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase mb-6 block">{col.titolo}</span>
                {col.gruppi.map((g, gi) =>
                  g.sottotitolo ? (
                    <div key={g.sottotitolo + gi}>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 block">{g.sottotitolo}</span>
                      <div className="pl-3 space-y-2.5 text-[13px] text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800">
                        {g.links.map((l) => (
                          <a key={l.href} href={l.href} {...extProps(l.href)} className="block hover:text-primary dark:hover:text-primary-on-dark transition-colors">
                            <span className="text-primary/70 dark:text-primary-on-dark/70 mr-1.5 font-bold">›</span>{l.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div key={'g' + gi} className="space-y-3 mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {g.links.map((l) => (
                        <a key={l.href} href={l.href} {...extProps(l.href)} className="block hover:text-primary dark:hover:text-primary-on-dark transition-colors">{l.label}</a>
                      ))}
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>

          {/* Col 3 - Accreditamenti */}
          <div>
            <span className="text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase mb-6 block">{footer.accreditamentiTitolo}</span>

            <div className="text-xs text-slate-600 dark:text-slate-500 space-y-2 leading-relaxed">
              {footer.accreditamenti.map((a) => (
                <p key={a}>{a}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              {footer.certificazioni.map((cert) => (
                <div key={cert.name}>
                  {/* Light mode */}
                  <Image
                    src={cert.src}
                    alt={cert.name}
                    width={140}
                    height={95}
                    loading="lazy"
                    className="block dark:hidden h-[95px] w-auto object-contain"
                  />
                  {/* Dark mode - loghi dedicati */}
                  <Image
                    src={cert.srcDark || cert.src}
                    alt={cert.name}
                    width={140}
                    height={95}
                    loading="lazy"
                    className="hidden dark:block h-[95px] w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Barra inferiore */}
        <div className="border-t border-slate-200/80 dark:border-slate-900 pt-6 mt-12">
          <div className="flex flex-col md:flex-row md:justify-between items-center text-[11px] text-slate-600 dark:text-slate-500 gap-2">
            <span>{footer.copyright}</span>
            <span>
              {footer.creditsTesto}{' '}
              <a
                href={footer.creditsLink.href}
                {...extProps(footer.creditsLink.href)}
                className="text-[#04767D] dark:text-primary-on-dark hover:text-[#005259] dark:hover:text-[#99D1D5] transition-colors underline"
              >
                {footer.creditsLink.label}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
