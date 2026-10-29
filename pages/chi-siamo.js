import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Header from '../components/Header';
import SeoHead from '../components/SeoHead';
import { getLenis } from '../lib/lenis';
import Reveal from '../components/Reveal';
import { getPartners } from '../lib/wp-partner';
import { getSchede } from '../lib/wp-schede';
import { isrOptions } from '../lib/wp';
import { getPagina } from '../lib/wp-pagine';
import HeroTitle from '../components/HeroTitle';
import { withSiteOptions } from '../lib/wp-site';
import { useSiteOptions } from '../context/SiteOptionsContext';

// Scroll fluido (Lenis) verso la sezione Qualità e Certificazioni,
// con fallback nativo se Lenis non è ancora inizializzato.
function scrollToCertificazioni() {
  const target = document.getElementById('certificazioni');
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -80 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Punti di forza: icone lineari (stile Lucide, stroke 1.75), una per posizione nella lista `chi-punti-forza`
const PF_ICONE = [
  <><rect width="8" height="8" x="3" y="3" rx="2" /><path d="M7 11v4a2 2 0 0 0 2 2h4" /><rect width="8" height="8" x="13" y="13" rx="2" /></>, // workflow: sistema formazione-lavoro integrato
  <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>, // shield-check: affidabilità certificata
  <><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></>, // banknote: esperti in formazione finanziata
  <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>, // badge-check: certificazioni riconosciute
  <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>, // target: competenze verticali
  <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>, // users: la forza di rete
];

function AccreditamentoCard({ logo, logoAlt, title, code, logoScale, icon }) {
  return (
    <article className="group h-full bg-white dark:bg-dark-card rounded-xl p-6 sm:p-7 flex flex-col transition-all duration-300 shadow-sm border border-slate-200 dark:border-[rgba(255,255,255,0.08)] hover:-translate-y-1 hover:shadow-md">
      {/* Logo — base bianca dietro l'immagine solo in dark mode: i loghi reali (Regione
          Siciliana, ECM, ecc.) sono pensati per sfondo chiaro e sparirebbero/stonerebbero
          sul teal scuro della card (dark-card = #004d52). */}
      <div className="relative w-full h-20 max-w-[70%] flex items-center justify-start">
        {!logo && icon && (
          <div className="w-16 h-16 bg-[#018891]/10 dark:bg-[#018891]/10 rounded-full flex items-center justify-center text-3xl text-[#006066] dark:text-primary-on-dark" role="img" aria-label={logoAlt}>
            <i className={icon}></i>
          </div>
        )}
        {logo && (
          <div className="relative w-full h-full dark:bg-white dark:rounded-lg dark:p-2.5" style={{ maxWidth: '200px' }}>
            <Image
              src={logo}
              alt={logoAlt}
              fill
              sizes="200px"
              loading="lazy"
              className="object-contain object-left dark:object-center"
              style={logoScale ? { transform: `scale(${logoScale})`, transformOrigin: 'left center' } : undefined}
            />
          </div>
        )}
      </div>

      {/* Titolo */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mt-6 mb-3">
        {title}
      </h3>

      {/* Badge accreditamento */}
      {code && (
        <span className="inline-block self-start mt-auto text-xs font-bold uppercase tracking-wide text-[#0B4A52] dark:text-primary-on-dark bg-[#0B4A52]/8 dark:bg-[#018891]/10 px-3 py-1.5 rounded-lg">
          {code}
        </span>
      )}
    </article>
  );
}

function CertCard({ icon, title, subtitle, description, benefits, pdfUrl, extraLinks }) {
  const [showModal, setShowModal] = useState(false);

  // Esc chiude il modale (solo mentre è aperto)
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e) => { if (e.key === 'Escape') setShowModal(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showModal]);

  return (
    <>
      {/* Card cliccabile E raggiungibile da tastiera (Tab + Invio/Spazio) */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={() => setShowModal(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowModal(true); } }}
        className="h-full bg-slate-50 dark:bg-dark-bg rounded-2xl p-7 text-center cursor-pointer transition-all duration-300 border border-slate-200 dark:border-[rgba(255,255,255,0.1)] hover:-translate-y-2 hover:border-[#018891] dark:hover:border-primary-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#018891] flex flex-col items-center group"
      >
        <div className="w-16 h-16 bg-[#018891]/10 dark:bg-[#018891]/10 rounded-full flex items-center justify-center mb-4 text-3xl text-[#006066] dark:text-primary-on-dark transition-colors duration-300 group-hover:bg-[#018891]/15 dark:group-hover:bg-[#006B73]/20" aria-hidden="true">
          <i className={icon}></i>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-gray-300 mb-5 flex-1">{subtitle}</p>
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B4A52] dark:text-primary-on-dark border border-slate-200 dark:border-[rgba(255,255,255,0.15)] rounded-full px-4 py-2 transition-all duration-300 group-hover:border-[#018891] dark:group-hover:border-[#018891]/40">
          Scopri i dettagli
          <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" style={{ fontSize: '9px' }}></i>
        </span>
      </div>

      {/* Modale in un portal su document.body (non annidato nella card). showModal diventa true solo
          dopo un click, quindi document esiste sempre (nessun problema SSR). */}
      {showModal && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-dark-card rounded-2xl max-w-lg w-[90%] max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              aria-label="Chiudi finestra"
              className="absolute top-4 right-4 text-slate-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-on-dark transition-colors text-xl bg-transparent border-none cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="w-20 h-20 bg-[#018891]/10 dark:bg-[#018891]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-[#006066] dark:text-primary-on-dark">
              <i className={icon}></i>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-1">{title}</h3>
            <p className="text-primary-text dark:text-primary-on-dark font-semibold text-center mb-6">{subtitle}</p>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">{description}</p>

            {benefits && benefits.length > 0 && (
              <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 mb-6 space-y-2">
                {benefits.map((benefit, i) => (
                  <p key={i} className="text-slate-700 dark:text-gray-300 text-sm flex items-start gap-2">
                    <i className="fas fa-check-circle text-primary dark:text-primary-on-dark mt-0.5 flex-shrink-0"></i>
                    {benefit}
                  </p>
                ))}
              </div>
            )}

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full h-[44px] bg-primary dark:bg-[#008C95] hover:bg-[#006B73] dark:hover:bg-[#006B73] text-white font-semibold rounded-full transition-all duration-200 text-sm no-underline"
              >
                <i className="fas fa-file-pdf"></i> Visualizza Certificato
              </a>
            )}

            {extraLinks && extraLinks.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                {extraLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full h-[44px] bg-white dark:bg-transparent border border-primary dark:border-primary-on-dark text-primary dark:text-primary-on-dark hover:bg-[#018891]/10 dark:hover:bg-primary-on-dark/10 font-semibold rounded-full transition-all duration-200 text-sm no-underline"
                  >
                    <i className="fas fa-file-pdf"></i> {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// Loghi dell'ecosistema: WordPress (CPT partner) se WP_URL è impostato, altrimenti data/partner.js (vedi lib/wp-partner.ts).
async function getPageStaticProps() {
  return {
    props: {
      pagina: await getPagina('chi-siamo'),
      ecoLoghi: await getPartners('ecosistema'),
      // Elenchi della pagina: schede di WordPress (liste chi-*) o data/schede.js
      storia: await getSchede('chi-storia'),
      tabsLista: await getSchede('chi-tabs'),
      puntiForza: await getSchede('chi-punti-forza'),
      expertise: await getSchede('chi-expertise'),
      certificazioni: await getSchede('chi-certificazioni'),
      accreditamenti: await getSchede('chi-accreditamenti'),
    },
    ...isrOptions(),
  };
}

export default function ChiSiamo({ ecoLoghi, pagina, storia, tabsLista, puntiForza, expertise, certificazioni, accreditamenti }) {
  const T = pagina.testi;
  const { seo } = useSiteOptions(); // immagine OG predefinita (opzioni globali)
  // Tab Missione / Visione / Valori: schede della lista chi-tabs (nome della tab = badge)
  const tabs = tabsLista.map((t) => ({ key: t.tab, data: t }));
  const [activeTab, setActiveTab] = useState(tabs[0]?.key);
  const activeData = tabs.find((t) => t.key === activeTab)?.data;

  return (
    <>
      <Head>
        <title>{pagina.seo.titolo || "Chi Siamo - Alètheia Srl"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <SeoHead
          title="Chi Siamo - Alètheia Srl"
          description="Alètheia Srl: mission, vision e valori di un ente di formazione professionale e Agenzia per il Lavoro attivo dal 2005 a Vittoria (RG), parte del gruppo Promotergroup."
          url="/chi-siamo"
          ogImage={pagina.seo.ogImage || seo.ogImage || undefined}
        />
      </Head>

      <Header active="/chi-siamo" />

      <main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.22s ease-out forwards; }

        @keyframes eco-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-eco-marquee { animation: eco-marquee 45s linear infinite; }
        .animate-eco-marquee:hover { animation-play-state: paused; }
        .eco-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
      `}</style>

      {/* HERO — gradiente pieno, coerente con homepage e le altre pagine interne (formazione,
          agenzia-per-il-lavoro): niente intestazione "compatta" isolata su questa sola pagina. */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-badge">{T.hero_eyebrow}</div>
          <h1 className="text-balance max-w-3xl mx-auto">
              <HeroTitle text={T.hero_titolo} renderHighlight={(w) => <span>{w}</span>} />
            </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">{T.hero_sottotitolo}</p>
          <div className="page-hero-actions flex-col sm:flex-row items-center">
            <a
              href={T.hero_cta1.href}
              className="btn btn-md btn-light"
            >{T.hero_cta1.label}</a>
            <a
              href={T.hero_cta2.href}
              className="btn btn-md btn-ghost-light"
            >{T.hero_cta2.label}</a>
          </div>
        </div>
      </section>

      {/* LA NOSTRA STORIA — timeline invece di un unico blocco di testo. Le date 2017/2019
          corrispondono agli accreditamenti reali citati più sotto in pagina (DDG n. 78 del
          20/01/2017 - Regione Siciliana; DDS n. 1100 del 26/04/2019 - Agenzia per il Lavoro),
          non sono aggiunte inventate. */}
      <section className="bg-light dark:bg-dark-bg" aria-labelledby="storia-heading">
        {/* Due colonne da lg (titolo | tappe), come la sezione "sede" più sotto: prima la timeline
            occupava solo 640px lasciando vuota metà della riga. Stesso py-20/px del resto della pagina. */}
        <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-x-12 gap-y-10 items-start">
          <div style={{ maxWidth: '640px' }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-4">
              {T.s1_badge}
            </span>
            <h2 id="storia-heading" className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {T.s1_titolo}
            </h2>
          </div>

          <div style={{ maxWidth: '640px' }}>
            {storia.map((step, i, arr) => (
              <Reveal key={step.anno} delay={i * 90}>
                <div className="flex gap-5" style={{ paddingBottom: i === arr.length - 1 ? 0 : '1.75rem' }}>
                  <div className="flex flex-col items-center" style={{ width: '3.5rem', flexShrink: 0 }}>
                    {/* Cerchio con bordo brand e testo scuro: prima testo bianco su #008C95 (3.9:1) e su
                        #018891 in dark (2.5:1), sotto WCAG AA 4.5:1. Ora #006B73 su bianco 6.4:1 e
                        #018891 su #161C1A 7:1; il turchese brand resta invariato nel bordo. */}
                    <span className="flex items-center justify-center rounded-full bg-white dark:bg-dark-bg border-2 border-[#018891] dark:border-primary-on-dark text-[#04767D] dark:text-primary-on-dark font-viga tabular-nums" style={{ width: '3.5rem', height: '3.5rem', fontSize: '0.95rem' }}>
                      {step.anno}
                    </span>
                    {i < arr.length - 1 && (
                      <span className="bg-[#018891]/40 dark:bg-[#018891]/40" style={{ width: '2px', flex: 1, marginTop: '0.4rem' }} />
                    )}
                  </div>
                  <div style={{ paddingTop: '0.5rem' }}>
                    <h3 className="text-slate-900 dark:text-white font-bold text-base mb-1">{step.titolo}</h3>
                    <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE PRINCIPALE */}
      <section id="cosa-facciamo" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-text dark:text-primary-on-dark mb-2">
          {T.s2_badge}
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-10">
          <HeroTitle text={T.s2_titolo} renderHighlight={(w) => <span className="text-primary dark:text-primary-on-dark">{w}</span>} />
        </h2>

        {/* Tab Missione / Visione / Valori: un solo blocco alla volta. Il testo sta direttamente sullo
            sfondo della sezione (niente riquadro): il sito è già pieno di card, tre schede affiancate
            ne aggiungevano altre. */}
        <div role="tablist" aria-label="Missione, visione e valori" className="flex flex-wrap border-b-2 border-slate-200 dark:border-[rgba(255,255,255,0.12)] mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                id={`tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls="tabpanel-missione"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.key)}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                  const i = tabs.findIndex((t) => t.key === activeTab);
                  const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
                  setActiveTab(next.key);
                  document.getElementById(`tab-${next.key}`)?.focus();
                }}
                className={`-mb-0.5 px-5 py-2.5 text-sm whitespace-nowrap bg-transparent border-0 border-b-[3px] cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-[#008C95] ${
                  isActive
                    ? 'font-bold border-[#018891] dark:border-primary-on-dark text-primary-text dark:text-primary-on-dark'
                    : 'font-semibold border-transparent text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.key}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="tabpanel-missione" aria-labelledby={`tab-${activeTab}`}>
          {activeData && (
            <div key={activeTab} className="animate-fadeIn">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{activeData.titolo}</h3>
              <p className="text-primary-text dark:text-primary-on-dark font-medium mb-4 text-sm">{activeData.sottotitolo}</p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-base m-0">{activeData.desc}</p>
            </div>
          )}
        </div>
      </section>

      {/* PERCHÉ SCEGLIERE ALÈTHEIA (punti di forza): sei tessere uguali con icona e titolo, 3 colonne desktop / 2 tablet / 1 mobile. */}
      <section className="bg-slate-50 dark:bg-dark-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-3">
              {T.s3_badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white text-balance max-w-3xl mx-auto">
              {T.s3_titolo}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-gray-300 leading-[1.6] max-w-4xl mx-auto">
              {T.s3_testo[0]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {puntiForza.map((card, i) => (
              // Reveal ha già una transizione inline su opacità/trasformazione: lo sfondo (hover) sta nell'elemento interno
              <Reveal key={card.titolo} delay={i * 80}>
                {/* Contrasti (WCAG AA): titolo #004d52 su #E6F4F5 8,5:1 (hover #D6EDEF 7,9:1); dark: titolo bianco su #0F3B3E 12,2:1 (hover #14494D ~11:1).
                    Icona #008C95 su bianco 4,05:1 (non testuale, soglia 3:1); dark #5FC2C8 su #0F3B3E ~7:1. Solo titoli: nessuna descrizione. */}
                <article className="h-full rounded-2xl p-[22px] sm:p-7 bg-[#E6F4F5] hover:bg-[#D6EDEF] dark:bg-[#0F3B3E] dark:hover:bg-[#14494D] transition-colors duration-200">
                  <span aria-hidden="true" className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#008C95] dark:bg-white/10 dark:text-primary-on-dark">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      {PF_ICONE[i % PF_ICONE.length]}
                    </svg>
                  </span>
                  <h3 className="text-[22px] sm:text-2xl !font-semibold leading-snug normal-case tracking-normal text-[#004d52] dark:text-white" /* !font-*: la regola globale degli h3 azzera il peso */>{card.titolo}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LE NOSTRE EXPERTISE */}
      <section className="bg-light dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12">
          <div className="mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-4">
              {T.s4_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
              {T.s4_titolo}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {expertise.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 90}>
                <div>
                  {/* Numero puramente decorativo (opacità bassa): nascosto agli screen reader */}
                  <span aria-hidden="true" className="text-4xl font-black text-[#018891] dark:text-primary-on-dark mb-2 block tracking-tight" /* verde Alètheia pieno; decorativo (aria-hidden), dark: #5FC2C8 */>{s.n}</span>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 normal-case tracking-normal">{s.titolo}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE CERTIFICAZIONI */}
      <section id="certificazioni" className="bg-slate-50 dark:bg-dark-bg" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
          <div className="text-left mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-text dark:text-primary-on-dark mb-2">
              {T.s5_badge}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              {T.s5_titolo}
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
              {T.s5_testo[0]}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {certificazioni.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="h-full w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
                <CertCard
                  icon={c.icon}
                  title={c.title}
                  subtitle={c.subtitle}
                  description={c.description}
                  benefits={c.benefits}
                  pdfUrl={c.pdfUrl}
                  extraLinks={c.extraLinks}
                />
              </Reveal>
            ))}
          </div>

          {/* Accreditamenti istituzionali */}
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
            <div className="text-left mb-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-text dark:text-primary-on-dark mb-2">
                {T.s6_badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {T.s6_titolo}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {accreditamenti.map((a, i) => (
                <Reveal key={a.title} delay={i * 80} className="h-full">
                  <AccreditamentoCard logo={a.logo} logoAlt={a.logoAlt} title={a.title} code={a.code} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEDE E CTA FINALE */}
      <section className="bg-light dark:bg-dark-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          {/* Colonna sede */}
          <Reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-text dark:text-primary-on-dark mb-4">
              {T.s7_badge}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {T.s7_titolo}
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
              {T.s7_testo[0]}
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="text-primary dark:text-primary-on-dark shrink-0 w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <span className="text-slate-800 dark:text-gray-100 text-sm font-medium block">Via del Carrubo snc · 97019 Vittoria (RG)</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Via+del+Carrubo+Vittoria+RG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sezione !text-xs mt-1"
                  >
                    Vedi su Google Maps
                    <i className="fas fa-arrow-right text-[10px]" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="text-primary dark:text-primary-on-dark shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-slate-600 dark:text-gray-300 text-sm">Lun - Ven · 9:00-13:00 / 14:00-18:00</span>
              </div>
            </div>
          </Reveal>

          {/* Colonna CTA */}
          <Reveal delay={100} className="bg-gradient-to-br from-slate-950 via-[#003134] to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-center shadow-lg border border-slate-800/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {T.cta_titolo}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {T.cta_testo}
            </p>
            <a
              href={T.cta_bottone1.href}
              className="btn btn-md btn-light w-full sm:w-auto self-start"
            >
              {T.cta_bottone1.label}
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      </main>
      <Footer />
    </>
  );
}

// Aggiunge le opzioni globali (Header/Footer) alle props: vedi lib/wp-site.ts.
export const getStaticProps = withSiteOptions(getPageStaticProps);
