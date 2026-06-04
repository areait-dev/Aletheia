import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Header';

export default function ChiSiamo() {
  const [activeTab, setActiveTab] = useState('Visione');

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
              <ul className="about-tab-list">
                <li><strong>Sviluppo locale:</strong> Promuoviamo la crescita economica e l'occupazione attraverso sinergie stabili.</li>
                <li><strong>Rete territoriale:</strong> Collaboriamo attivamente con Associazioni Datoriali, Sindacati, Enti Bilaterali, Terzo Settore e Pubblica Amministrazione.</li>
                <li><strong>Radicamento siciliano:</strong> Costruiamo ponti solidi tra i professionisti del settore e il sistema socio-economico dell'isola.</li>
              </ul>
            )}
            {activeTab === 'Missione' && (
              <ul className="about-tab-list">
                <li><strong>Formazione e Consulenza:</strong> Progettiamo azioni formative mirate per giovani (ingresso nel lavoro) e occupati (aggiornamento tecnologico).</li>
                <li><strong>Servizi accreditati:</strong> Offriamo Orientamento, Formazione Continua, Formazione a Distanza (FAD) e Sostegno all'inserimento lavorativo.</li>
                <li><strong>Soluzioni per le imprese:</strong> Accompagniamo aziende private e PA dall'analisi dei problemi all'introduzione di nuove metodologie.</li>
                <li><strong>Focus Agroalimentare:</strong> Vantiamo una specifica esperienza con oltre 40 piani formativi realizzati nell'ultimo triennio nel settore agricolo.</li>
              </ul>
            )}
            {activeTab === 'I Nostri Valori' && (
              <ul className="about-tab-list">
                <li><strong>Certificazioni ufficiali:</strong> Agenzia per il lavoro (DDS Nr 1.100 - ANPAL) ed Ente di formazione accreditato alla Regione Siciliana (ddg n 78).</li>
                <li><strong>Competenza elevata:</strong> Team di operatori ad alta specializzazione che coprono diagnosi, progettazione, monitoraggio e valutazione.</li>
                <li><strong>Strutture all'avanguardia:</strong> Sedi facilmente accessibili dotate di laboratori informatici, aule teoriche, postazioni multimediali e sistemi di feedback sistematici.</li>
              </ul>
            )}
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
