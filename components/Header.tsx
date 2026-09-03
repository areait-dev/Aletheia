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

// Gruppi del mega-menu "Formazione": unica fonte dati condivisa tra il mega-menu
// desktop (colonne 1-3) e l'accordion mobile dentro .navbar (vedi sotto) — sotto i
// 992px il mega-menu passa a position:static e finisce dietro l'overlay fisso del
// menu mobile (non cliccabile), quindi su mobile serve una resa alternativa inline.
const FORMAZIONE_GROUPS: { key: SubDropdownKey; href: string; title: string; items: { label: string; href: string }[] }[] = [
  {
    key: 'regionale',
    href: '/formazione/regionale-fse',
    title: 'Formazione Finanziata',
    items: [
      { label: 'Formazione Regionale', href: 'https://aletheiasrl.vercel.app/formazione/regionale' },
      { label: 'Fondi Interprofessionali', href: '/formazione/fondi-interprofessionali' },
      { label: 'Fondo Nuove Competenze', href: '/formazione/fondo-nuove-competenze' },
    ],
  },
  {
    key: 'obbligatoria',
    href: '/formazione/obbligatoria',
    title: 'Formazione Obbligatoria',
    items: [
      { label: 'Sicurezza sui luoghi di lavoro', href: '/all-courses?categoria=sicurezza-lavoro' },
      { label: 'Decreto attrezzature', href: '/all-courses?categoria=decreto-attrezzature' },
      { label: 'Fitosanitario', href: '/all-courses?categoria=fitosanitario' },
      { label: 'Sicurezza alimentare', href: '/all-courses?categoria=sicurezza-alimentare' },
    ],
  },
  {
    key: 'professionale',
    href: '/formazione/professionale-specialistica',
    title: 'Formazione Professionale e PA',
    items: [
      { label: 'Certificazioni Informatiche', href: '/all-courses?categoria=certificazioni-informatiche' },
      { label: 'Corsi Qualificati', href: '/all-courses?categoria=certificazione' },
      { label: 'ECM', href: '/formazione/ecm' },
      { label: 'Corsi per la PA', href: '/formazione/corsi-pa' },
    ],
  },
];

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
  // Solo mobile: "Formazione" apre una seconda schermata dedicata dentro il menu
  // a tutto schermo (con pulsante "Torna al menu"), invece di un accordion inline
  // che allungherebbe troppo il menu principale.
  const [mobileFormazioneScreen, setMobileFormazioneScreen] = useState(false);
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
              if (link.label === 'Formazione') {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={active === link.href ? 'active' : ''}
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
                  key={link.href}
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
              <div key={group.key} className="navbar-formazione-group">
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
              href="/calendario-corsi"
              className="navbar-formazione-calendar"
              onClick={() => { setMenuOpen(false); setMobileFormazioneScreen(false); }}
            >
              Calendario Corsi <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
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
              <div key={group.key} className="mega-col-links">
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
                      className="sub-dropdown-toggle-icon text-[#008C95] dark:text-[#10B981]"
                      onClick={() => toggleSubDropdown(group.key)}
                      aria-label={`Espandi sottomenu ${group.title}`}
                      aria-expanded={!!subDropdowns[group.key]}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                    >
                      ▾
                    </button>
                  </div>
                  <div className={`sub-dropdown-menu${subDropdowns[group.key] ? ' open' : ''}`}>
                    {group.items.map((item) => (
                      <a key={item.href} href={item.href} onClick={() => setFormazioneOpen(false)}>{item.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}

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
