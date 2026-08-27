import Image from 'next/image';

const certificazioni = [
  { name: 'ISO 9001', src: '/images/certificazioni/Logo_9001_IT-removebg-preview.png', srcDark: '/images/certificazioni_dark/Logo 9001 IT.png' },
  { name: 'ISO 14001', src: '/images/certificazioni/Logo_14001_IT-removebg-preview.png', srcDark: '/images/certificazioni_dark/Logo 14001 IT.png' },
  { name: 'ISO 45001', src: '/images/certificazioni/Logo_45001_IT-removebg-preview.png', srcDark: '/images/certificazioni_dark/Logo 45001 IT.png' },
];

export default function Footer() {
  return (
    <footer id="contatti" className="bg-slate-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Col 1 - Contatti */}
          <div>
            <span className="text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase mb-6 block">Alètheia S.r.l.</span>

            <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-2.5">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Via+del+Carrubo+Vittoria+RG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <svg className="text-teal-600 dark:text-teal-400 shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Via del Carrubo, snc - 97019 Vittoria (RG)
              </a>
              <a href="tel:+390932862613" className="flex items-center gap-2.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <svg className="text-teal-600 dark:text-teal-400 shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +39 0932 862613
              </a>
              <a href="mailto:info@aletheiasrl.it" className="flex items-center gap-2.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <svg className="text-teal-600 dark:text-teal-400 shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                info@aletheiasrl.it
              </a>
              <span className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-500 pt-1">
                <svg className="text-teal-600 dark:text-teal-400 shrink-0 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Lun - Ven · 9:00-13:00 / 14:00-18:00
              </span>
            </div>

            <div className="mt-6 flex gap-4 text-slate-400 dark:text-slate-500 text-lg">
              <a href="https://www.facebook.com/aletheiasrl.it/?locale=it_IT" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-slate-800 dark:hover:text-white transition-colors"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com/aletheiasrl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-slate-800 dark:hover:text-white transition-colors"><i className="fab fa-instagram" /></a>
              <a href="https://it.linkedin.com/company/al%C3%A9theia-srl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-slate-800 dark:hover:text-white transition-colors"><i className="fab fa-linkedin-in" /></a>
              <a href="https://t.me/alethiaapl" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-slate-800 dark:hover:text-white transition-colors"><i className="fab fa-telegram" /></a>
            </div>

            <div className="flex flex-col gap-1.5 mt-6 text-xs text-slate-500 dark:text-slate-500">
              <a href="/privacy-cookie" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Privacy e Cookie</a>
              <a href="/reclami-proposte" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Reclami e Proposte</a>
              <a href="/aiuti-di-stato-2023" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Obblighi di pubblicazione per i beneficiari di contributi 2023</a>
              <a href="/aiuti-di-stato-2024" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Obblighi di pubblicazione per i beneficiari di contributi 2024</a>
            </div>
          </div>

          {/* Col 2 - Link rapidi */}
          <div>
            <span className="text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase mb-6 block">Link rapidi</span>

            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 block">Formazione</span>
            <div className="pl-3 space-y-2.5 text-[13px] text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800">
              <a href="/pdf/catalogo.pdf" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="text-teal-600/70 dark:text-teal-400/70 mr-1.5 font-bold">›</span>Catalogo corsi (pdf scaricabile)
              </a>
              <a href="/calendario-corsi" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="text-teal-600/70 dark:text-teal-400/70 mr-1.5 font-bold">›</span>Calendario corsi
              </a>
              <a href="https://www.aletheiasrl.it/elearning2/" target="_blank" rel="noopener noreferrer" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <span className="text-teal-600/70 dark:text-teal-400/70 mr-1.5 font-bold">›</span>Piattaforma e-learning
              </a>
            </div>

            <div className="space-y-3 mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
              <a href="/agenzia-per-il-lavoro" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Agenzia per il lavoro</a>
              <a href="/chi-siamo" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Chi siamo</a>
              <a href="/news" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">News</a>
              <a href="/archivio" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Archivio</a>
              <a href="/contatti" className="block hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Contatti</a>
            </div>
          </div>

          {/* Col 3 - Accreditamenti */}
          <div>
            <span className="text-slate-900 dark:text-white font-bold text-xs tracking-widest uppercase mb-6 block">Accreditamenti e certificazioni</span>

            <div className="text-xs text-slate-500 dark:text-slate-500 space-y-2 leading-relaxed">
              <p>Accreditamento APL D.D.S n. 1100 del 26/04/2019</p>
              <p>Test Center AICA n. AKHF0001</p>
              <p>UNI ISO 29992:2019</p>
              <p>UNI ISO 29993:2019</p>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-6">
              {certificazioni.map((cert) => (
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
                    src={cert.srcDark}
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
          <div className="flex flex-col md:flex-row md:justify-between items-center text-[11px] text-slate-500 dark:text-slate-500 gap-2">
            <span>© 2026 Alètheia S.r.l. · P.IVA 01524530894 · aletheiasrl@legalmail.it</span>
            <span>
              Ente di{' '}
              <a
                href="https://www.promotergroup.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors underline"
              >
                Promotergroup S.p.A.
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
