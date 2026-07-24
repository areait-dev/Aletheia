import Head from 'next/head';
import Footer from '../../../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/Header';
import { OFFERTE, getOffertaBySlug } from '../../../data/offerte';

export default function OffertaDettaglio({ offerta }) {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    cv: null,
    letteraPresentazione: '',
    privacy: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [cvFileName, setCvFileName] = useState('');

  if (!offerta) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 24px', minHeight: '60vh' }}>
          <h1>Offerta non trovata</h1>
          <p>L'offerta che stai cercando non esiste.</p>
          <a href="/agenzia-per-il-lavoro/offerte-di-lavoro" style={{ color: '#008C95' }}>
            Torna alle offerte
          </a>
        </div>
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setForm((prev) => ({ ...prev, [name]: files[0] || null }));
      setCvFileName(files[0]?.name || '');
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = 'Campo obbligatorio';
    if (!form.cognome.trim()) e.cognome = 'Campo obbligatorio';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Email non valida';
    if (!form.cv) e.cv = 'Carica il tuo CV';
    if (form.cv && form.cv.size > 5 * 1024 * 1024) e.cv = 'File troppo grande (max 5MB)';
    if (form.cv && form.cv.type !== 'application/pdf') e.cv = 'Solo file PDF consentiti';
    if (!form.letteraPresentazione.trim()) e.letteraPresentazione = 'Campo obbligatorio';
    if (!form.privacy) e.privacy = 'Devi accettare la privacy policy';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    console.log('=== CANDIDATURA INVIATA ===');
    console.log('Offerta:', offerta.titolo);
    console.log('Candidato:', `${form.nome} ${form.cognome}`);
    console.log('Email:', form.email);
    console.log('Telefono:', form.telefono);
    console.log('CV:', cvFileName);
    console.log('Lettera:', form.letteraPresentazione);
    console.log('Privacy accettata:', form.privacy);
    console.log('========================');

    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>{offerta.titolo} - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      <Header active="/agenzia-per-il-lavoro" />

      <style jsx>{`

        .hero-breadcrumb {
          background: linear-gradient(135deg, #0F172A 0%, #134E4A 100%);
          padding: 120px 24px 40px;
        }

        .hero-breadcrumb {
          background: linear-gradient(135deg, #0F172A 0%, #1a3a3a 100%);
        }

        .breadcrumb {
          max-width: 1200px;
          margin: 0 auto;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
        }

        .breadcrumb {
          color: rgba(255,255,255,0.6);
        }

        .breadcrumb a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .breadcrumb a:hover {
          color: #6EE7B7;
        }

        .breadcrumb a {
          color: rgba(255,255,255,0.7);
        }

        .breadcrumb a:hover {
          color: #10B981;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .offerta-details {
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .offerta-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
        }

        .offerta-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .offerta-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .meta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .meta-icon {
          font-size: 1rem;
        }

        .offerta-description {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .section {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-icon {
          font-size: 1.1rem;
        }

        .list-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .list-items li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .list-items li::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #008C95;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        .list-items li::before {
          background: #10B981;
        }

        .form-sidebar {
          position: sticky;
          top: 120px;
        }

        .form-container {
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .form-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #0F172A;
        }

        .form-title {
          color: #ffffff;
        }

        .form-subtitle {
          font-size: 0.85rem;
          margin-bottom: 24px;
          line-height: 1.5;
          color: #64748B;
        }

        .form-subtitle {
          color: #A0AEC0;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #334155;
        }

        .form-label {
          color: #A0AEC0;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1.5px solid #E2E8F0;
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: inherit;
          background: #ffffff;
          color: #0F172A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .form-input,
        .form-textarea {
          background: #003134;
          border-color: #374151;
          color: #F8FAFC;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: #008C95;
          box-shadow: 0 0 0 3px rgba(0, 140, 149, 0.1);
        }

        .form-input.error,
        .form-textarea.error {
          border-color: #EF4444;
        }

        .form-input.error,
        .form-textarea.error {
          border-color: #F87171;
        }

        .form-error {
          font-size: 0.75rem;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .form-error {
          color: #FECACA;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .file-input-wrapper {
          position: relative;
          overflow: hidden;
        }

        .file-input-label {
          display: block;
          padding: 10px 12px;
          border: 1.5px dashed #008C95;
          border-radius: 8px;
          text-align: center;
          font-size: 0.85rem;
          color: #008C95;
          background: rgba(0, 140, 149, 0.08);
          cursor: pointer;
          transition: all 0.2s;
        }

        .file-input-label {
          border-color: #10B981;
          color: #10B981;
          background: rgba(16, 185, 129, 0.08);
        }

        .file-input-label:hover {
          background: rgba(0, 140, 149, 0.12);
        }

        .file-input-label:hover {
          background: rgba(16, 185, 129, 0.12);
        }

        .file-input-wrapper input[type='file'] {
          display: none;
        }

        .file-name {
          font-size: 0.8rem;
          margin-top: 4px;
          font-weight: 600;
          color: #475569;
        }

        .file-name {
          color: #A0AEC0;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 20px 0;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #008C95;
          flex-shrink: 0;
        }

        .checkbox-label {
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.6;
          cursor: pointer;
        }

        .checkbox-label {
          color: #A0AEC0;
        }

        .checkbox-label a {
          color: #008C95;
          font-weight: 700;
          text-decoration: none;
        }

        .checkbox-label a {
          color: #10B981;
        }

        .submit-btn {
          width: 100%;
          padding: 12px 16px;
          background: linear-gradient(90deg, #008C95, #10B981);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 16px;
          box-shadow: 0 4px 12px rgba(0, 140, 149, 0.25);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 140, 149, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-message {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #008C95, #10B981);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #ffffff;
          font-size: 2rem;
          box-shadow: 0 8px 24px rgba(0, 140, 149, 0.3);
        }

        .success-icon {
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);
        }

        .success-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 12px;
        }

        .success-title {
          color: #ffffff;
        }

        .success-text {
          color: #64748B;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .success-text {
          color: #A0AEC0;
        }

        .footer {
          background: #0F172A;
          color: #ffffff;
          padding: 60px 24px 30px;
          margin-top: 60px;
        }

        .footer {
          background: #0F172A;
        }

        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 30px;
        }

        .footer-col h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #ffffff;
        }

        .footer-col p,
        .footer-col a {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 8px;
          text-decoration: none;
          transition: color 0.2s;
          display: block;
        }

        .footer-col a:hover {
          color: #10B981;
        }

        .social-icons {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        .social-icons a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          transition: all 0.2s;
          margin-bottom: 0;
        }

        .social-icons a:hover {
          background: #10B981;
          color: #0F172A;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
        }
      `}</style>

      <div className="hero-breadcrumb">
          <div className="breadcrumb">
            <a href="/agenzia-per-il-lavoro" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Agenzia per il Lavoro</a>
            {' / '}
            <a href="/agenzia-per-il-lavoro/offerte-di-lavoro" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Offerte di Lavoro</a>
            {' / '}
            <span style={{ color: '#6EE7B7' }}>{offerta.titolo}</span>
          </div>
      </div>

      {/* CONTENT */}
        <div className="content-wrapper">
          {/* LEFT: OFFERTA DETAILS */}
          <div className="offerta-details bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
            <div className="offerta-header border-b-2 border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
              <h1 className="offerta-title text-gray-900 dark:text-white">{offerta.titolo}</h1>
              <div className="offerta-meta">
                <div className="meta-badge bg-[#008C95]/10 dark:bg-[#10B981]/10 border border-[#008C95]/20 dark:border-[#10B981]/20 text-[#008C95] dark:text-[#10B981]">
                  <i className="fas fa-map-pin meta-icon"></i>
                  {offerta.città}
                </div>
                <div className="meta-badge bg-[#008C95]/10 dark:bg-[#10B981]/10 border border-[#008C95]/20 dark:border-[#10B981]/20 text-[#008C95] dark:text-[#10B981]">
                  <i className="fas fa-clock meta-icon"></i>
                  {offerta.tipoContratto}
                </div>
              </div>
            </div>

            <p className="offerta-description text-gray-600 dark:text-gray-300">{offerta.descrizione}</p>

            <div className="section">
              <h2 className="section-title text-gray-900 dark:text-white">
                <i className="fas fa-tasks section-icon text-[#008C95] dark:text-[#10B981]"></i>
                Responsabilità principali
              </h2>
              <ul className="list-items text-gray-600 dark:text-gray-300">
                {offerta.responsabilita.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title text-gray-900 dark:text-white">
                <i className="fas fa-check-circle section-icon text-[#008C95] dark:text-[#10B981]"></i>
                Requisiti richiesti
              </h2>
              <ul className="list-items text-gray-600 dark:text-gray-300">
                {offerta.requisiti.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title text-gray-900 dark:text-white">
                <i className="fas fa-gift section-icon text-[#008C95] dark:text-[#10B981]"></i>
                Cosa offriamo
              </h2>
              <ul className="list-items text-gray-600 dark:text-gray-300">
                {offerta.offriamo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="form-sidebar">
            <div className="form-container bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="success-title text-gray-900 dark:text-white">Candidatura inviata!</h3>
                  <p className="success-text text-gray-600 dark:text-gray-300">
                    Grazie per la tua candidatura. Ti contatteremo al più presto per i prossimi passi.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        nome: '',
                        cognome: '',
                        email: '',
                        telefono: '',
                        cv: null,
                        letteraPresentazione: '',
                        privacy: false,
                      });
                      setCvFileName('');
                    }}
                    style={{
                      marginTop: '20px',
                      padding: '8px 16px',
                      background: 'none',
                      border: '1.5px solid #008C95',
                      color: '#008C95',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      fontFamily: 'inherit',
                    }}
                  >
                    Torna alle offerte
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="form-title text-slate-900 dark:text-white">Invia la tua candidatura</h3>
                  <p className="form-subtitle">Compila il modulo per candidarti a questa posizione</p>

                  <div className="form-group">
                    <label htmlFor="nome" className="form-label text-slate-700 dark:text-gray-300">Nome *</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      placeholder="Mario"
                      value={form.nome}
                      onChange={handleChange}
                      className={`form-input ${errors.nome ? 'error' : ''} bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`}
                    />
                    {errors.nome && <div className="form-error"><i className="fas fa-exclamation-circle"></i>{errors.nome}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="cognome" className="form-label">Cognome *</label>
                    <input
                      id="cognome"
                      name="cognome"
                      type="text"
                      placeholder="Rossi"
                      value={form.cognome}
                      onChange={handleChange}
                      className={`form-input ${errors.cognome ? 'error' : ''} bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`}
                    />
                    {errors.cognome && <div className="form-error"><i className="fas fa-exclamation-circle"></i>{errors.cognome}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="mario@esempio.it"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'error' : ''} bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`}
                    />
                    {errors.email && <div className="form-error"><i className="fas fa-exclamation-circle"></i>{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+39 000 0000000"
                      value={form.telefono}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Posizione *</label>
                    <input
                      type="text"
                      value={offerta.titolo}
                      readOnly
                      className="form-input"
                      style={{ backgroundColor: '#F1F5F9', opacity: 0.7 }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">CV (PDF max 5MB) *</label>
                    <div className="file-input-wrapper">
                      <label htmlFor="cv" className="file-input-label">
                        <i className="fas fa-cloud-upload-alt"></i> Carica il tuo CV
                      </label>
                      <input
                        id="cv"
                        name="cv"
                        type="file"
                        accept=".pdf"
                        onChange={handleChange}
                      />
                      {cvFileName && <div className="file-name"><i className="fas fa-check-circle"></i> {cvFileName}</div>}
                    </div>
                    {errors.cv && <div className="form-error"><i className="fas fa-exclamation-circle"></i>{errors.cv}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="letteraPresentazione" className="form-label">Lettera di presentazione *</label>
                    <textarea
                      id="letteraPresentazione"
                      name="letteraPresentazione"
                      placeholder="Raccontaci perché sei interessato a questa posizione..."
                      value={form.letteraPresentazione}
                      onChange={handleChange}
                      className={`form-textarea ${errors.letteraPresentazione ? 'error' : ''} bg-white dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400`}
                    />
                    {errors.letteraPresentazione && <div className="form-error"><i className="fas fa-exclamation-circle"></i>{errors.letteraPresentazione}</div>}
                  </div>

                  <div className="checkbox-wrapper">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      checked={form.privacy}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <label htmlFor="privacy" className="checkbox-label">
                      Ho letto e accetto la <a href="/privacy-policy">Privacy Policy</a> e acconsento al trattamento dei miei dati personali ai sensi del GDPR. *
                    </label>
                  </div>
                  {errors.privacy && <div className="form-error"><i className="fas fa-exclamation-circle"></i>{errors.privacy}</div>}

                  <button type="submit" className="submit-btn">
                    Invia candidatura
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = OFFERTE.map((offerta) => ({
    params: { slug: offerta.slug },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const offerta = getOffertaBySlug(params.slug);
  if (!offerta) {
    return { notFound: true };
  }
  return { props: { offerta }, revalidate: 3600 };
}
