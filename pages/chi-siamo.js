import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';

export default function ChiSiamo() {
  const [activeTab, setActiveTab] = useState('Visione');

  // Questi sono i dati di missione, visione e valori.
  // In un'applicazione reale, questi dati potrebbero provenire da un file JSON,
  // da un CMS o da un'API. Per ora, li useremo come dati hardcoded.
  const content = {
    missione: {
      titolo: "La Nostra Missione",
      testo: "La nostra missione è fornire soluzioni innovative e di alta qualità che soddisfino le esigenze dei nostri clienti, promuovendo la crescita e il successo reciproco."
    },
    visione: {
      titolo: "La Nostra Visione",
      testo: "Essere un punto di riferimento nel settore, riconosciuti per l'eccellenza, l'integrità e l'impegno verso un futuro sostenibile e tecnologicamente avanzato."
    },
    valori: {
      titolo: "I Nostri Valori",
      lista: [
        "Innovazione: Ricerca continua di nuove idee e tecnologie.",
        "Qualità: Impegno costante per l'eccellenza in ogni aspetto.",
        "Integrità: Agire con onestà, trasparenza ed etica.",
        "Collaborazione: Lavorare insieme per raggiungere obiettivi comuni.",
        "Responsabilità: Contribuire positivamente alla società e all'ambiente."
      ]
    },
    direttore: {
      nome: "Emilio Rossi",
      ruolo: "Direttore Generale",
      descrizione: "Emilio Rossi porta una vasta esperienza e una visione strategica, guidando Alètheia Srl verso l'innovazione e l'eccellenza nel settore della formazione.",
      immagine: "/images/emilio-direttore.jpg" // Assicurati di avere questa immagine nella cartella public/images
    }
  };

  return (
    <>
      <Head>
        <title>Chi Siamo - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/chi-siamo" />

      <section className="page-hero">
        <div className="container">
          <div className="page-hero-badge">Alètheia s.r.l.</div>
          <h1>Chi <span>Siamo</span></h1>
          <p>Da oltre 20 anni al tuo fianco nella formazione professionale in Sicilia.</p>
        </div>
      </section>

      <section id="chi-siamo" className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 relative">

        <span className="inline-block text-sm font-semibold tracking-[0.15em] uppercase text-[#008C95] mb-3">Chi Siamo</span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-8 leading-tight">
          Visione, Missione e <span className="text-[#008C95]">Valori</span>
        </h2>

        <div className="about-tabs mt-10">
          <div className="about-tabs-nav">
            {['Visione', 'Missione', 'I Nostri Valori'].map((tab) => (
              <button
                key={tab}
                className={`about-tab-btn${activeTab === tab ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="about-tab-content">
            {activeTab === 'Visione' && (
              <div>
                <h2>{content.visione.titolo}</h2>
                <p>{content.visione.testo}</p>
              </div>
            )}
            {activeTab === 'Missione' && (
              <div>
                <h2>{content.missione.titolo}</h2>
                <p>{content.missione.testo}</p>
              </div>
            )}
            {activeTab === 'I Nostri Valori' && (
              <div>
                <h2>{content.valori.titolo}</h2>
                <ul className="about-tab-list">
                  {content.valori.lista.map((valore, index) => (
                    <li key={index}>{valore}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* Sezione Direttore */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16 relative text-center bg-gray-50">
        <span className="inline-block text-sm font-semibold tracking-[0.15em] uppercase text-[#008C95] mb-3">Il Nostro Team</span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] mb-8 leading-tight">
          Conosci il Nostro <span className="text-[#008C95]">Direttore</span>
        </h2>
        <div className="relative inline-block w-60 h-60 rounded-full overflow-hidden shadow-lg group cursor-pointer">
          <img
            src={content.direttore.immagine}
            alt={content.direttore.nome}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-end p-4 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-bold">{content.direttore.nome}</h3>
            <p className="text-sm font-medium">{content.direttore.ruolo}</p>
            <p className="text-xs mt-2 hidden md:block">{content.direttore.descrizione}</p>
          </div>
        </div>
      </section>

      <footer id="contatti">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Alètheia Srl</h3>
              <p>Via del Carrubo, sn 97019 Vittoria (RG)</p>
              <p>Tel: +39 0932 862613</p>
              <p>Email: <a href="mailto:info@aletheiasrl.it">info@aletheiasrl.it</a></p>
            </div>
            <div className="footer-col">
              <h3>Link Rapidi</h3>
              <a href="/#services">Servizi</a>
              <a href="/all-courses">Tutti i Corsi</a>
              <a href="/#elearning">E-Learning</a>
            </div>
            <div className="footer-col">
              <h3>Seguici</h3>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; 2026 Alètheia Srl - Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </>
  );
}
