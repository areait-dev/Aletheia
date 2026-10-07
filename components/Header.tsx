import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useSiteOptions } from '../context/SiteOptionsContext';

interface HeaderProps {
  active?: string;
  solid?: boolean;
}

// Voci di menu, gruppi del mega-menu "Formazione" e pulsanti arrivano dalle opzioni globali (WordPress o data/site-options.js).
// I gruppi sono l'unica fonte dati condivisa tra il mega-menu desktop e la schermata Formazione del menu mobile
// (sotto i 992px il mega-menu passa a position:static e finisce dietro l'overlay fisso del menu mobile, non
// cliccabile, quindi su mobile serve una resa alternativa).

const isExternal = (href: string) => /^https?:\/\//.test(href);

export default function Header({ active, solid = false }: HeaderProps) {
  const { header } = useSiteOptions();
  const FORMAZIONE_GROUPS = header.formazione;
  const themeCtx = useTheme();
  const theme = themeCtx?.theme;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formazioneOpen, setFormazioneOpen] = useState(false);
  // Solo mobile: "Formazione" apre una seconda schermata dedicata dentro il menu
  // a tutto schermo (con pulsante "Torna al menu"), invece di un accordion inline
  // che allungherebbe troppo il menu principale.
  const [mobileFormazioneScreen, setMobileFormazioneScreen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Un solo sottomenu aperto alla volta: si memorizza l'href del gruppo aperto.
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubDropdown = (key: string) => {
    setOpenSub((prev) => (prev === key ? null : key)); // apre quella cliccata e chiude le altre
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

  const links = header.links;

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
        <nav
          className={`navbar${menuOpen ? ' navbar-open' : ''}${mobileFormazioneScreen ? ' navbar-screen-formazione' : ''}`}
          id="mainNav"
        >
          {/* Schermata principale: su desktop è la barra orizzontale normale (i
              wrapper spariscono via display:contents), su mobile è la lista di
              link a tutto schermo. Nascosta su mobile mentre è attiva la
              sotto-schermata "Formazione" (vedi .navbar-screen-formazione in CSS). */}
          <div className="navbar-screen-main">
            {links.map((link) => {
              if (!link.href) {
                // Voce senza URL = apre il mega-menu Formazione
                return (
                  <a
                    key={link.label}
                    href="/#formazione"
                    className=""
                    aria-expanded={formazioneOpen}
                    aria-haspopup="true"
                    onClick={(e) => {
                      e.preventDefault();
                      if (menuOpen) {
                        // Mobile: apre la sotto-schermata dedicata invece del mega-menu
                        // desktop (che sotto i 992px finirebbe nascosto dietro l'overlay).
                        setMobileFormazioneScreen(true);
                      } else {
                        setFormazioneOpen(!formazioneOpen);
                      }
                    }}
                  >
                    {link.label}
                    <i className="fas fa-chevron-right navbar-formazione-caret" aria-hidden="true"></i>
                  </a>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={active === link.href ? 'active' : ''}
                  onClick={() => {
                    setMenuOpen(false);
                    setFormazioneOpen(false);
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={header.ctaLavoro.href}
              {...(isExternal(header.ctaLavoro.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="navbar-mobile-cta"
              onClick={() => { setMenuOpen(false); setFormazioneOpen(false); }}
            >
              {header.ctaLavoro.label}
            </a>
          </div>

          {/* Sotto-schermata "Formazione": solo mobile, sostituisce la lista
              principale invece di espandersi in un accordion (che allungherebbe
              troppo il menu). Nascosta di default via CSS, mostrata solo sotto i
              768px quando .navbar-screen-formazione è attiva. */}
          <div className="navbar-screen-formazione-panel">
            <button
              type="button"
              className="navbar-back-btn"
              onClick={() => setMobileFormazioneScreen(false)}
            >
              <i className="fas fa-arrow-left" aria-hidden="true"></i> Torna al menu
            </button>
            {FORMAZIONE_GROUPS.map((group) => (
              <div key={group.href} className="navbar-formazione-group">
                <a
                  href={group.href}
                  onClick={() => { setMenuOpen(false); setMobileFormazioneScreen(false); }}
                >
                  {group.title}
                </a>
                <div className="navbar-formazione-sublinks">
                  {group.items.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => { setMenuOpen(false); setMobileFormazioneScreen(false); }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a
              href={header.megaCalendario.btn.href}
              className="navbar-formazione-calendar"
              onClick={() => { setMenuOpen(false); setMobileFormazioneScreen(false); }}
            >
              {header.megaCalendario.btn.label} <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </nav>

        {/* HEADER RIGHT */}
        <div className="header-right">
          <ThemeToggle color={iconColor} />
          <a
            href={header.ctaLavoro.href}
            {...(isExternal(header.ctaLavoro.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="cta-nav-btn-outline"
            style={{ color: iconColor }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#027F87'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = iconColor; }}
          >
            {header.ctaLavoro.label}
          </a>
          <div className="cta-dropdown" ref={dropdownRef}>
            <button
              className="cta-nav-btn-outline"
              style={{ color: iconColor }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#027F87'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = iconColor; }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Piattaforma
            </button>
            {dropdownOpen && (
              <div className="cta-dropdown-menu">
                <a
                  href={header.elearning.href}
                  {...(isExternal(header.elearning.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="cta-dropdown-item"
                >
                  {header.elearning.label}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* HAMBURGER */}
        <button
          className={`hamburger${menuOpen ? ' hamburger-open' : ''}`}
          onClick={() => {
            setMenuOpen(!menuOpen);
            setMobileFormazioneScreen(false);
          }}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
          aria-controls="mainNav"
          style={{ zIndex: 200 }}
        >
          {/* A menu aperto la "X" sta sempre sopra l'overlay scuro a schermo intero
              (stesso gradiente in entrambi i temi, vedi .navbar), quindi va sempre
              chiara — non dipende da `theme` come nello stato chiuso, dove invece
              l'icona sta sopra l'header e ne segue lo sfondo variabile. */}
          <span style={{ background: menuOpen ? '#FFFFFF' : iconColor }}></span>
          <span style={{ background: menuOpen ? '#FFFFFF' : iconColor }}></span>
          <span style={{ background: menuOpen ? '#FFFFFF' : iconColor }}></span>
        </button>
      </div>

      {/* MEGA MENU */}
      {formazioneOpen && (
        <div className="mega-menu-dropdown">
          <div className="mega-menu-container">
            {FORMAZIONE_GROUPS.map((group) => (
              <div key={group.href} className="mega-col-links">
                <div className="sub-dropdown-wrapper">
                  <div className="sub-dropdown-toggle-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a
                      href={group.href}
                      onClick={() => setFormazioneOpen(false)}
                      className="text-slate-900 dark:text-white"
                      style={{ fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}
                    >
                      {group.title}
                    </a>
                    <button
                      className="sub-dropdown-toggle-icon text-[#018891] dark:text-primary-on-dark"
                      onClick={() => toggleSubDropdown(group.href)}
                      aria-label={`Espandi sottomenu ${group.title}`}
                      aria-expanded={openSub === group.href}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                    >
                      ▾
                    </button>
                  </div>
                  <div className={`sub-dropdown-menu${openSub === group.href ? ' open' : ''}`}>
                    {group.items.map((item) => (
                      <a key={item.href} href={item.href} onClick={() => setFormazioneOpen(false)}>{item.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Col 4: Calendario */}
            <div className="mega-col-info">
              <h3>{header.megaCalendario.titolo}</h3>
              <p>{header.megaCalendario.testo}</p>
              <a href={header.megaCalendario.btn.href} className="mega-calendar-btn" onClick={() => setFormazioneOpen(false)}>
                {header.megaCalendario.btn.label}
              </a>
              <a
                href={header.megaCorsiBtn.href}
                onClick={() => setFormazioneOpen(false)}
                className="text-[#018891] dark:text-primary-on-dark"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none' }}
              >
                {header.megaCorsiBtn.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>

    </>
  );
}
