import Head from 'next/head';
import Footer from '../components/Footer';
import { useState } from 'react';
import Header from '../components/Header';
import { getLenis } from '../lib/lenis';

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

function CertCard({ icon, title, subtitle, description, benefits, pdfUrl, extraLinks }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="bg-white dark:bg-dark-card rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 shadow-sm border border-slate-200 dark:border-[rgba(255,255,255,0.08)] hover:-translate-y-1 hover:shadow-lg hover:border-teal-500 dark:hover:border-[#10B981] group"
      >
        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-teal-600 dark:text-[#10B981] transition-colors duration-300 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40">
          <i className={icon}></i>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">{subtitle}</p>
        <span className="text-xs text-teal-600 dark:text-[#10B981] inline-flex items-center gap-1 font-semibold">
          Clicca per dettagli <i className="fas fa-arrow-right" style={{ fontSize: '9px' }}></i>
        </span>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-dark-card rounded-2xl max-w-lg w-[90%] max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-[#10B981] transition-colors text-xl bg-transparent border-none cursor-pointer"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-teal-600 dark:text-[#10B981]">
              <i className={icon}></i>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-1">{title}</h3>
            <p className="text-teal-600 dark:text-[#10B981] font-semibold text-center mb-6">{subtitle}</p>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">{description}</p>

            {benefits && benefits.length > 0 && (
              <div className="bg-slate-50 dark:bg-gray-700 rounded-xl p-4 mb-6 space-y-2">
                {benefits.map((benefit, i) => (
                  <p key={i} className="text-slate-700 dark:text-gray-300 text-sm flex items-start gap-2">
                    <i className="fas fa-check-circle text-teal-600 dark:text-[#10B981] mt-0.5 flex-shrink-0"></i>
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
                className="flex items-center justify-center gap-3 w-full py-3 bg-teal-600 dark:bg-[#008C95] hover:bg-teal-700 dark:hover:bg-[#006B73] text-white font-semibold rounded-xl transition-all duration-200 text-sm no-underline"
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
                    className="flex items-center justify-center gap-3 w-full py-3 bg-white dark:bg-transparent border border-teal-600 dark:border-[#10B981] text-teal-600 dark:text-[#10B981] hover:bg-teal-50 dark:hover:bg-teal-900/20 font-semibold rounded-xl transition-all duration-200 text-sm no-underline"
                  >
                    <i className="fas fa-file-pdf"></i> {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const ecoLoghi = [
  { name: 'Promotergroup', src: '/images/gruppo/Logo Promotergroup (R).png' },
  { name: 'Promosan', src: '/images/gruppo/logo_promosan.png' },
  { name: 'Promoter Soc. Coop.', src: '/images/gruppo/Promoter Soc. Coop800.png' },
  { name: 'Doses', src: '/images/gruppo/DOSES - logo orizzontale.png' },
  { name: 'Iside', src: '/images/gruppo/Risorsa 8.png' },
];

export default function ChiSiamo() {
  const [activeTab, setActiveTab] = useState('Missione');

  const content = {
    missione: {
      titolo: 'MISSIONE',
      sottotitolo: 'Trasformare la formazione in occupazione.',
      punti: [
        { key: '', desc: "Non ci fermiamo all'aula. Progettiamo percorsi che trasformano il potenziale in competenze e le competenze in opportunità. Costruiamo reti tra persone e aziende, tra competenze e bisogni, tra chi forma e chi assume. Facciamo matching tra talenti e opportunità perché il risultato giusto non è mai casuale: è il frutto di un ecosistema che funziona. Come agenzia per il lavoro, come punto di orientamento, come partner, accompagniamo ogni persona lungo il proprio percorso professionale e ogni impresa nello sviluppo del proprio capitale umano." },
      ],
    },
    visione: {
      titolo: 'VISIONE',
      sottotitolo: 'Unire formazione e lavoro in un unico ecosistema.',
      punti: [
        { key: '', desc: "Puntiamo a un futuro in cui la formazione non sia mai separata dall'occupazione, ma ne sia il motore. Ogni percorso deve generare opportunità concrete per le persone e valore reale per le imprese. Perché il lavoro nasce dalle competenze. E le competenze crescono quando incontrano le giuste opportunità." },
      ],
    },
    valori: {
      titolo: 'VALORI',
      sottotitolo: 'Concretezza. Qualità. Aggiornamento continuo.',
      punti: [
        { key: '', desc: 'Una buona formazione si misura sui risultati, non sulle ore. Per questo ogni percorso nasce da bisogni reali, viene erogato secondo standard certificati e aggiornato costantemente per restare allineato a un mercato del lavoro che non smette di cambiare.' },
      ],
    },
  };

  const tabs = [
    { key: 'Missione', data: content.missione },
    { key: 'Visione', data: content.visione },
    { key: 'I Nostri Valori', data: content.valori },
  ];

  const activeData = tabs.find((t) => t.key === activeTab)?.data;

  return (
    <>
      <Head>
        <title>Chi Siamo - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/chi-siamo" />

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

      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-badge">Dal 2005 al fianco di persone e imprese</div>
          <h1 className="text-balance max-w-3xl mx-auto">
            Da vent&rsquo;anni trasformiamo la <span>formazione</span> in opportunità
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Alètheia è Ente di Formazione accreditato e Agenzia per il Lavoro autorizzata dalla
            Regione Siciliana. Progettiamo percorsi formativi che trasformano competenze in
            opportunità per le persone e per le imprese.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <a
              href="#cosa-facciamo"
              className="bg-teal-500 hover:bg-teal-400 text-teal-950 font-bold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Scopri cosa facciamo
            </a>
            <a
              href="/contatti"
              className="bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 px-6 py-3 rounded-xl text-sm transition-all"
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>

      {/* LA NOSTRA STORIA */}
      <section className="bg-light dark:bg-dark-bg">
        <div className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          {/* Testo a tutta larghezza */}
          <div>
            <span className="bg-teal-50 dark:bg-[#008C95]/20 text-teal-700 dark:text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
              La nostra storia
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
              Nati per formare. Cresciuti per andare oltre
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed mb-4">
              Alètheia nasce nel <span className="font-semibold">2005</span> a Vittoria, in
              provincia di Ragusa, con un obiettivo preciso: trasformare la formazione in uno
              strumento concreto di crescita professionale e occupazionale.
            </p>
            <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed mb-4">
              Nel tempo abbiamo ampliato il nostro ruolo, affiancando ai servizi formativi
              l&rsquo;orientamento, l&rsquo;accompagnamento al lavoro e il supporto alle imprese
              nella ricerca e valorizzazione dei talenti.
            </p>
            <p className="text-slate-600 dark:text-gray-300 text-base leading-relaxed">
              Oggi facciamo parte di <span className="font-semibold">Promotergroup S.p.A.</span>,
              un ecosistema integrato che unisce formazione, consulenza e servizi alle imprese.
              La nostra formazione è un punto di partenza, non un punto di arrivo. Far parte di
              questo ecosistema significa poter offrire ai corsisti e alle aziende clienti un
              accesso concreto a competenze che vanno ben oltre la formazione in aula.
            </p>
          </div>
        </div>
      </section>

      {/* SEZIONE PRINCIPALE */}
      <section id="cosa-facciamo" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400 mb-2">
          Ciò che guida ogni nostro progetto
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-10">
          Formazione che genera <span className="text-teal-600 dark:text-teal-400">impatto</span>
        </h2>

        {/* TAB NAV - fuori dalle colonne, sopra entrambe */}
        <div className="flex flex-wrap border-b-2 border-slate-200 dark:border-[rgba(255,255,255,0.08)] mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.key ? '3px solid #008C95' : '3px solid transparent',
                marginBottom: '-2px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                fontWeight: activeTab === tab.key ? '700' : '600',
                color: activeTab === tab.key ? '#008C95' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.key}
            </button>
          ))}
        </div>

        {/* Card testo a tutta larghezza */}
        <div className="flex">

          {/* CARD TESTO */}
          <div className="w-full flex flex-col">
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-slate-200 dark:border-[rgba(255,255,255,0.08)] p-6 shadow-sm flex-1">
              {activeData && (
                <div className="animate-fadeIn">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{activeData.titolo}</h3>
                  <p className="text-teal-600 dark:text-teal-400 font-medium mb-6 text-sm">{activeData.sottotitolo}</p>
                  <div className="space-y-5">
                    {activeData.punti.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <strong className="block text-slate-900 dark:text-white mb-1 text-sm">{item.key}</strong>
                          <p className="text-slate-500 dark:text-gray-300 leading-relaxed text-sm m-0">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* I NOSTRI PUNTI DI FORZA */}
      <section className="bg-slate-50 dark:bg-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <span className="bg-teal-50 dark:bg-[#008C95]/20 text-teal-700 dark:text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
            Perché scegliere Alètheia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Formazione e lavoro in un unico percorso
          </h2>
          <p className="text-slate-600 dark:text-gray-300 text-base mt-3 mb-12 leading-relaxed">
            Molti enti formano. Molte agenzie per il lavoro selezionano. Alètheia fa entrambe
            le cose. Per questo possiamo accompagnare persone e imprese lungo l&rsquo;intero
            percorso di crescita professionale: dall&rsquo;orientamento iniziale
            all&rsquo;acquisizione delle competenze, fino all&rsquo;inserimento lavorativo e
            allo sviluppo delle organizzazioni. Non offriamo semplicemente corsi. Costruiamo
            percorsi per affrontare le sfide di domani.
          </p>

          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 block">
            I nostri punti di forza
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { accent: 'bg-teal-500', titolo: 'Sistema formazione-lavoro integrato', desc: "Due ruoli, un obiettivo solo: trasformare ogni competenza acquisita in un'opportunità concreta di inserimento o crescita professionale." },
              { accent: 'bg-indigo-500', titolo: 'Affidabilità certificata', desc: 'Accreditamento regionale, iscrizione ANPAL e certificazioni ISO: garanzie ufficiali che attestano qualità e trasparenza.' },
              { accent: 'bg-teal-500', titolo: 'Esperti in formazione finanziata', desc: "Oltre 100 progetti gestiti con fondi FSE, PSR, FEAMP e Fondi Interprofessionali. Seguiamo l'intero processo, dall'analisi dei fabbisogni alla rendicontazione finale." },
              { accent: 'bg-indigo-500', titolo: 'Certificazioni riconosciute', desc: 'Percorsi qualificanti e certificazioni spendibili nel mercato del lavoro e nei concorsi pubblici. Siamo anche Test Center AICA.' },
              { accent: 'bg-teal-500', titolo: 'Competenze verticali', desc: 'Esperienza consolidata nei settori agricoltura, agroalimentare, sanità, servizi, sicurezza e pubblica amministrazione.' },
              { accent: 'bg-indigo-500', titolo: 'La forza di un gruppo', desc: 'Va ben oltre la prima formazione: un ecosistema che integra consulenza aziendale, salute e sicurezza, comunicazione, all’interno di Promotergroup S.p.A.' },
            ].map((card) => (
              <div
                key={card.titolo}
                className="group bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 flex items-center gap-2 normal-case tracking-normal">
                  <span className={`w-1.5 h-4 rounded-full inline-block ${card.accent}`} />
                  {card.titolo}
                </h3>
                <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LE NOSTRE EXPERTISE */}
      <section className="bg-light dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto py-20 px-6 sm:px-12">
          <div className="mb-16">
            <span className="bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-400 px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
              Le nostre Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">
              Formazione in ogni settore
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {[
              { n: '01', accent: 'text-teal-500/30 dark:text-teal-400/20', titolo: 'Sicurezza sul lavoro', desc: 'Oltre 5.000 lavoratori formati. Corsi conformi al D.Lgs. 81/08 per aziende e PA.' },
              { n: '02', accent: 'text-indigo-500/30 dark:text-indigo-400/20', titolo: 'Agricoltura e agroalimentare', desc: "Vantiamo una specifica esperienza nel settore agricolo e agroalimentare. Percorsi PSR, FEAMP, fitosanitario, conduzione d'impresa agricola, innovazione in agricoltura." },
              { n: '03', accent: 'text-teal-500/30 dark:text-teal-400/20', titolo: 'Formazione finanziata', desc: "FSE+, Fondi Interprofessionali, Fondo Nuove Competenze, POC Sicilia. Gestione completa: dall'analisi dei fabbisogni alla rendicontazione." },
              { n: '04', accent: 'text-indigo-500/30 dark:text-indigo-400/20', titolo: 'Sanità e welfare', desc: 'Percorsi per operatori socio-sanitari, assistenti familiari e operatori socio-assistenziali.' },
              { n: '05', accent: 'text-teal-500/30 dark:text-teal-400/20', titolo: 'Competenze digitali', desc: 'Certificazioni ICDL e percorsi AICA per scuola, imprese e pubblica amministrazione.' },
              { n: '06', accent: 'text-indigo-500/30 dark:text-indigo-400/20', titolo: 'Pubblica Amministrazione', desc: 'Percorsi su misura per enti locali, assessorati e operatori del settore pubblico. Formazione che rispetta i tempi e le esigenze della PA.' },
            ].map((s) => (
              <div key={s.n}>
                <span className={`text-4xl font-black ${s.accent} mb-2 block tracking-tight`}>{s.n}</span>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-2 normal-case tracking-normal">{s.titolo}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE CERTIFICAZIONI */}
      <section id="certificazioni" className="bg-slate-50 dark:bg-dark-bg" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
          <div className="text-left mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400 mb-2">
              Certificazioni e accreditamenti
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              La qualità che si verifica, non si dichiara.
            </h2>
            <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">
              Le certificazioni ISO e UNI PdR attestano standard di qualità, inclusione e
              misurabilità dei processi formativi. Non sono dichiarazioni di intenti, ma
              verifiche ufficiali riconosciute. Una garanzia per chi sceglie Alètheia come
              partner formativo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <CertCard
              icon="fas fa-certificate"
              title="ISO 9001"
              subtitle="Sistemi di gestione per la qualità"
              description="La certificazione ISO 9001:2015 attesta che Alètheia s.r.l. adotta un sistema di gestione della qualità conforme agli standard internazionali, garantendo processi efficienti, miglioramento continuo e soddisfazione del cliente."
              benefits={['Servizi di formazione e consulenza di qualità', 'Processi standardizzati e tracciabili', 'Miglioramento continuo delle performance']}
              pdfUrl="/pdf/certificati/ALTH2572Q1901_-certificate-release_ISO9001_20220408.pdf"
            />
            <CertCard
              icon="fas fa-venus-mars"
              title="UNI PDR 125:2022"
              subtitle="Parità di genere"
              description="La prassi di riferimento UNI/PdR 125:2022 certifica l'impegno di Alètheia s.r.l. per la parità di genere, garantendo politiche aziendali inclusive e trasparenti, riconosciute dal PNRR."
              benefits={['Pari opportunità di carriera', 'Trasparenza retributiva', 'Ambienti di lavoro inclusivi', 'Agevolazioni fiscali e premialità nei bandi']}
              pdfUrl="/pdf/certificati/2023_ALETHEIA_paritdigenere.pdf"
              extraLinks={[{ label: 'Politica Aziendale', url: '/pdf/certificati/ALL1--POLITICA-PDR-125-Aletheia.pdf' }]}
            />
            <CertCard
              icon="fas fa-school"
              title="UNI ISO 21001:2019"
              subtitle="Sistema di Gestione per Organizzazioni Educative"
              description="Certificazione specifica per le organizzazioni educative, garantisce che Alètheia s.r.l. eroga servizi formativi di alta qualità, centrati sull'apprendimento e il miglioramento continuo."
              benefits={['Processi formativi standardizzati', 'Focalizzazione sui bisogni dei discenti', "Valutazione dell'efficacia dell'apprendimento"]}
              pdfUrl="/pdf/certificati/ALTH2572A2002_certificate-release_ISO21001_20240322.pdf"
            />
            <CertCard
              icon="fas fa-chalkboard-user"
              title="UNI ISO 29993:2019"
              subtitle="Servizi di formazione professionale non formale"
              description="La norma definisce i requisiti per i servizi di formazione professionale non formale, garantendo trasparenza, coerenza e qualità nell'offerta formativa."
              benefits={["Trasparenza nell'offerta formativa", 'Qualità dei contenuti e dei materiali', 'Gestione efficace dei processi di erogazione']}
              pdfUrl="/pdf/certificati/ALTH2572A2003_certificate-release_ISO29993_20240322.pdf"
            />
            <CertCard
              icon="fas fa-clipboard-list"
              title="UNI ISO 29992:2019"
              subtitle="Valutazione dei risultati dell'apprendimento"
              description="La norma garantisce l'adozione di metodi rigorosi per la valutazione dei risultati dell'apprendimento, assicurando l'efficacia dei percorsi formativi."
              benefits={["Valutazione oggettiva delle competenze", "Monitoraggio continuo dell'apprendimento", 'Certificazione delle competenze acquisite']}
              pdfUrl="/pdf/certificati/ALTH2572A2404_certificate-release_ISO29992_20240322.pdf"
            />
          </div>

          {/* Accreditamenti istituzionali */}
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
            <div className="text-left mb-10">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 dark:text-teal-400 mb-2">
                Accreditamenti
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Autorizzati. Riconosciuti. Verificati.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-sm">
                <div className="h-14 flex items-center mb-4">
                  <img
                    src="/images/accreditamenti/regione.svg"
                    alt="Regione Siciliana"
                    loading="lazy"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">
                  Ente di formazione accreditato Regione Siciliana
                </h4>
                <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">
                  DDG n. 78 del 20/01/2017. Accreditamento per l&rsquo;erogazione di Orientamento,
                  Formazione Continua, Formazione a Distanza (FAD), Formazione Specialistica
                  post-diploma e post-laurea, Sostegno all&rsquo;inserimento lavorativo.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-sm">
                <div className="h-14 flex items-center mb-4">
                  <img
                    src="/images/accreditamenti/image-removebg-preview.png"
                    alt="Ministero del Lavoro e delle Politiche Sociali"
                    loading="lazy"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">
                  Agenzia per il lavoro autorizzata
                </h4>
                <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">
                  Iscrizione all&rsquo;Albo delle Agenzie per il Lavoro del Ministero del Lavoro
                  e delle Politiche Sociali e autorizzazione Regione Siciliana (DDS n. 1100 del
                  26/04/2019). Accreditata per i servizi per il lavoro generali e obbligatori
                  (SGO) e per i servizi per il lavoro specialistici facoltativi (SSF).
                </p>
              </div>
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-sm">
                <div className="h-14 flex items-center mb-4">
                  <img
                    src="/images/accreditamenti/aica.jpg"
                    alt="AICA"
                    loading="lazy"
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">
                  Test Center AICA - ICDL (AKHF0001)
                </h4>
                <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">
                  Sede ufficiale per certificazioni digitali riconosciute in oltre 150 Paesi.
                  Esami disponibili presso la sede di Vittoria. Un punto di riferimento nel
                  territorio ibleo.
                </p>
              </div>
              <div className="bg-white dark:bg-dark-card border border-slate-100 dark:border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-sm">
                <div className="h-20 flex items-center mb-4">
                  <img
                    src="/images/accreditamenti/image-removebg-preview (1).png"
                    alt="ECM - Educazione Continua in Medicina"
                    loading="lazy"
                    className="w-full object-contain"
                    style={{ maxHeight: '80px' }}
                  />
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">
                  Provider ECM - Educazione Continua in Medicina
                </h4>
                <p className="text-slate-500 dark:text-gray-300 text-sm leading-relaxed">
                  Alètheia è provider accreditato ECM per l&rsquo;erogazione di percorsi di
                  formazione continua riconosciuti dal Ministero della Salute, destinati a
                  professionisti sanitari e operatori del settore socio-sanitario.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEDE E CTA FINALE */}
      <section className="bg-light dark:bg-dark-bg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch py-20 px-6 sm:px-12 max-w-7xl mx-auto">
          {/* Colonna sede */}
          <div>
            <span className="bg-teal-50 dark:bg-[#008C95]/20 text-teal-700 dark:text-[#10B981] px-3 py-1 rounded-full text-xs font-semibold inline-block mb-4">
              La nostra sede
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Vieni a trovarci. O scrivici.
            </h2>
            <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
              La sede di Alètheia si trova a Vittoria (RG), con aule, laboratori informatici e
              spazi dedicati all&rsquo;orientamento. La formazione è disponibile anche in
              modalità online tramite piattaforma e-learning.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="text-teal-600 dark:text-[#10B981] shrink-0 w-5 h-5 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <span className="text-slate-800 dark:text-gray-100 text-sm font-medium block">Via del Carrubo snc · 97019 Vittoria (RG)</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Via+del+Carrubo+Vittoria+RG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 dark:text-[#10B981] dark:hover:text-[#059669] text-xs font-bold transition-colors block mt-0.5 cursor-pointer"
                  >
                    Vedi su Google Maps →
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="text-teal-600 dark:text-[#10B981] shrink-0 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-slate-600 dark:text-gray-300 text-sm">Lun - Ven · 9:00-13:00 / 14:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Colonna CTA */}
          <div className="bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-center shadow-lg border border-slate-800/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Vuoi costruire il tuo percorso professionale?
            </h3>
            <p className="text-indigo-200/90 text-sm leading-relaxed mb-6">
              Contattaci per una consulenza gratuita. Ti aiutiamo a capire qual è il percorso
              giusto per te o per la tua azienda.
            </p>
            <a
              href="/contatti"
              className="inline-block text-center bg-teal-500 hover:bg-teal-400 text-teal-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-teal-500/10 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto self-start cursor-pointer"
            >
              Richiedi consulenza gratuita
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
