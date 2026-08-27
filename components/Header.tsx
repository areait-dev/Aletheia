import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  active?: string;
  solid?: boolean;
}

type SubDropdownKey = 'regionale' | 'obbligatoria' | 'professionale';

export default function Header({ active, solid = false }: HeaderProps) {
  const themeCtx = useTheme();
  const theme = themeCtx?.theme;
  const cartCtx = useCart();
  const count = cartCtx?.count ?? 0;
  const cartOpen = cartCtx?.cartOpen ?? false;
  const setCartOpen = cartCtx?.setCartOpen || (() => {});
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formazioneOpen, setFormazioneOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [subDropdowns, setSubDropdowns] = useState<Record<SubDropdownKey, boolean>>({
    regionale: false,
    obbligatoria: false,
    professionale: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubDropdown = (key: SubDropdownKey) => {
    setSubDropdowns((prev) => ({
      regionale: false,
      obbligatoria: false,
      professionale: false,
      [key]: !prev[key], // apre quella cliccata e chiude le altre
    }));
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      const headerEl = document.querySelector('.site-header');
      if (headerEl && !headerEl.contains(e.target as Node)) setFormazioneOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 60); }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = scrolled || formazioneOpen || solid;
  // Colore icone/hamburger: la CSS gestisce già i link nav e il telefono (classi
  // .scrolled / --solid, con varianti html.dark dedicate). Le icone sciolte (tema,
  // carrello, hamburger) non hanno equivalente CSS, quindi vanno calcolate qui
  // tenendo conto sia dello stato scrolled/solid sia del tema attivo.
  const iconColor = isLight ? (theme === 'dark' ? '#F8FAFC' : '#0F172A') : '#FFFFFF';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/chi-siamo', label: 'Chi Siamo' },
    { href: '/#formazione', label: 'Formazione' },
    { href: '/agenzia-per-il-lavoro', label: 'Agenzia per il Lavoro' },
    { href: '/news', label: 'News' },
    { href: '/contatti', label: 'Contatti' },
  ];

  return (
    <>
    <header
      className={`site-header${isLight ? ' scrolled' : ''}${formazioneOpen ? ' menu-is-open' : ''}${solid ? ' site-header--solid' : ''}${menuOpen ? ' mobile-nav-open' : ''}`}
      style={solid ? { background: '#ffffff', backdropFilter: 'none', WebkitBackdropFilter: 'none', boxShadow: '0 2px 20px rgba(0,0,0,0.08)' } : undefined}
    >
      <div className="container">
        {/* LOGO */}
        <div className="logo">
          <a href="/" aria-label="Vai alla homepage" style={{ display: 'inline-flex' }}>
            <Image
              src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
              alt="Alètheia"
              width={200}
              height={80}
              priority
              style={{ height: '80px', width: 'auto' }}
            />
          </a>
        </div>

        {/* NAV */}
        <nav className={`navbar${menuOpen ? ' navbar-open' : ''}`} id="mainNav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? 'active' : ''}
              aria-expanded={link.label === 'Formazione' ? formazioneOpen : undefined}
              aria-haspopup={link.label === 'Formazione' ? 'true' : undefined}
              onClick={(e) => {
                if (link.label === 'Formazione') {
                  e.preventDefault();
                  setFormazioneOpen(!formazioneOpen);
                } else {
                  setMenuOpen(false);
                  setFormazioneOpen(false);
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* HEADER RIGHT */}
        <div className="header-right">
          <ThemeToggle color={iconColor} />
          <div className="cta-dropdown" ref={dropdownRef}>
            <button className="cta-nav-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Piattaforma
            </button>
            {dropdownOpen && (
              <div className="cta-dropdown-menu">
                <a
                  href="https://www.aletheiasrl.it/elearning2/"
                  target="_blank"
                  rel="noreferrer"
                  className="cta-dropdown-item"
                >
                  Piattaforma E-learning
                </a>
              </div>
            )}
          </div>
          {/* CARRELLO */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Apri carrello"
            title="Carrello"
            style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', flexShrink: 0 }}
          >
            <i
              className="fas fa-shopping-cart"
              style={{ fontSize: '1.2rem', color: iconColor, transition: 'color 0.3s ease' }}
            ></i>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0,
                background: '#008C95', color: '#fff',
                fontSize: '0.65rem', fontWeight: 700,
                width: '18px', height: '18px', borderRadius: '9999px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {count}
              </span>
            )}
          </button>
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger${menuOpen ? ' hamburger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="mainNav"
          style={{ zIndex: 200 }}
        >
          <span style={{ background: menuOpen ? (theme === 'dark' ? '#F8FAFC' : '#0F172A') : iconColor }}></span>
          <span style={{ background: menuOpen ? (theme === 'dark' ? '#F8FAFC' : '#0F172A') : iconColor }}></span>
          <span style={{ background: menuOpen ? (theme === 'dark' ? '#F8FAFC' : '#0F172A') : iconColor }}></span>
        </button>
      </div>

      {/* MEGA MENU */}
      {formazioneOpen && (
        <div className="mega-menu-dropdown">
          <div className="mega-menu-container">
            {/* Col 1: Formazione Finanziata */}
            <div className="mega-col-links">
              <div className="sub-dropdown-wrapper">
                <div className="sub-dropdown-toggle-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a
                    href="/formazione/regionale-fse"
                    onClick={() => setFormazioneOpen(false)}
                    className="text-slate-900 dark:text-white"
                    style={{ fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    Formazione Finanziata
                  </a>
                  <button
                    className="sub-dropdown-toggle-icon text-[#008C95] dark:text-[#10B981]"
                    onClick={() => toggleSubDropdown('regionale')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                  >
                    ▾
                  </button>
                </div>
                <div className={`sub-dropdown-menu${subDropdowns.regionale ? ' open' : ''}`}>
                  <a href="https://aletheiasrl.vercel.app/formazione/regionale" onClick={() => setFormazioneOpen(false)}>Formazione Regionale</a>
                  <a href="/formazione/fondi-interprofessionali" onClick={() => setFormazioneOpen(false)}>Fondi Interprofessionali</a>
                  <a href="/formazione/fondo-nuove-competenze" onClick={() => setFormazioneOpen(false)}>Fondo Nuove Competenze</a>
                </div>
              </div>
            </div>

            {/* Col 2: Formazione Obbligatoria */}
            <div className="mega-col-links">
              <div className="sub-dropdown-wrapper">
                <div className="sub-dropdown-toggle-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a
                    href="/formazione/obbligatoria"
                    onClick={() => setFormazioneOpen(false)}
                    className="text-slate-900 dark:text-white"
                    style={{ fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    Formazione Obbligatoria
                  </a>
                  <button
                    className="sub-dropdown-toggle-icon text-[#008C95] dark:text-[#10B981]"
                    onClick={() => toggleSubDropdown('obbligatoria')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                  >
                    ▾
                  </button>
                </div>
                <div className={`sub-dropdown-menu${subDropdowns.obbligatoria ? ' open' : ''}`}>
                  <a href="/all-courses?categoria=sicurezza-lavoro" onClick={() => setFormazioneOpen(false)}>Sicurezza sui luoghi di lavoro</a>
                  <a href="/all-courses?categoria=decreto-attrezzature" onClick={() => setFormazioneOpen(false)}>Decreto attrezzature</a>
                  <a href="/all-courses?categoria=fitosanitario" onClick={() => setFormazioneOpen(false)}>Fitosanitario</a>
                  <a href="/all-courses?categoria=sicurezza-alimentare" onClick={() => setFormazioneOpen(false)}>Sicurezza alimentare</a>
                </div>
              </div>
            </div>

            {/* Col 3: Formazione Professionale */}
            <div className="mega-col-links">
              <div className="sub-dropdown-wrapper">
                <div className="sub-dropdown-toggle-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <a
                    href="/formazione/professionale-specialistica"
                    onClick={() => setFormazioneOpen(false)}
                    className="text-slate-900 dark:text-white"
                    style={{ fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    Formazione Professionale e PA
                  </a>
                  <button
                    className="sub-dropdown-toggle-icon text-[#008C95] dark:text-[#10B981]"
                    onClick={() => toggleSubDropdown('professionale')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                  >
                    ▾
                  </button>
                </div>
                <div className={`sub-dropdown-menu${subDropdowns.professionale ? ' open' : ''}`}>
                  <a href="/all-courses?categoria=certificazioni-informatiche" onClick={() => setFormazioneOpen(false)}>Certificazioni Informatiche</a>
                  <a href="/all-courses?categoria=certificazione" onClick={() => setFormazioneOpen(false)}>Corsi Qualificati</a>
                  <a href="/formazione/ecm" onClick={() => setFormazioneOpen(false)}>ECM</a>
                  <a href="/formazione/corsi-pa" onClick={() => setFormazioneOpen(false)}>Corsi per la PA</a>
                </div>
              </div>
            </div>

            {/* Col 4: Calendario */}
            <div className="mega-col-info">
              <h3>Calendario Corsi</h3>
              <p>Scopri le date dei prossimi corsi in partenza e pianifica la tua formazione.</p>
              <a href="/calendario-corsi" className="mega-calendar-btn" onClick={() => setFormazioneOpen(false)}>
                Calendario Corsi
              </a>
              <a
                href="/all-courses"
                onClick={() => setFormazioneOpen(false)}
                className="text-[#008C95] dark:text-[#10B981]"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}
              >
                Scopri tutti i corsi <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>

    {/* CartDrawer fuori da <header> per evitare il containment di position:fixed */}
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
