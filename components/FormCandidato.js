import { useState, useRef } from 'react';

const SERVIZI = [
  'Ricerca Attiva del Lavoro',
  'Orientamento Professionale',
  'Supporto al Colloquio',
  'Programma G.O.L.',
  'Garanzia Giovani',
  'Outplacement',
  'Candidatura Spontanea',
];

const INFO_ITEMS = [
  {
    icon: 'fas fa-phone',
    label: 'Telefono',
    value: '+39 0932 862613',
    href: 'tel:+390932862613',
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'info@aletheiasrl.it',
    href: 'mailto:info@aletheiasrl.it',
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Sede',
    value: 'Via del Carrubo, snc - 97019 Vittoria (RG)',
    href: null,
  },
  {
    icon: 'fas fa-clock',
    label: 'Orari',
    value: 'Lun-Ven: 9:00-13:00 / 15:00-18:00',
    href: null,
  },
];

const EMPTY = {
  nome: '', cognome: '', email: '', telefono: '',
  dataNascita: '', comune: '', servizio: '', messaggio: '',
  privacy: false, cv: null,
};

function Field({ label, required, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{
        fontSize: '0.78rem', fontWeight: 700,
        color: error ? '#F87171' : 'rgba(255,255,255,0.75)',
        letterSpacing: '0.02em',
      }}>
        {label}{required && <span style={{ color: '#10B981', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: '0.72rem', color: '#F87171' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '4px' }}></i>{error}
        </span>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '0.7rem 1rem',
  borderRadius: '10px',
  border: `1.5px solid ${hasError ? '#F87171' : 'rgba(255,255,255,0.12)'}`,
  background: 'rgba(255,255,255,0.06)',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
});

export default function FormCandidato({ posizioneDefault = '' }) {
  const [fields, setFields] = useState({ ...EMPTY, messaggio: posizioneDefault ? `Candidatura per: ${posizioneDefault}` : '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef(null);

  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));
  const setCheck = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.checked }));

  function validate() {
    const e = {};
    if (!fields.nome.trim()) e.nome = 'Campo obbligatorio';
    if (!fields.cognome.trim()) e.cognome = 'Campo obbligatorio';
    if (!fields.email.trim()) e.email = 'Campo obbligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Email non valida';
    if (!fields.comune.trim()) e.comune = 'Campo obbligatorio';
    if (!fields.servizio) e.servizio = 'Seleziona un servizio';
    if (!fields.privacy) e.privacy = 'Devi accettare la Privacy Policy';
    return e;
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setFields((p) => ({ ...p, cv: file }));
      setFileName(file.name);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate async send
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="contatta-candidato"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #0D2D2A 100%)',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', left: '-80px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-60px', right: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,140,149,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.68rem', fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#6EE7B7', marginBottom: '0.6rem',
          }}>
            Candidati
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900,
            color: '#fff', marginBottom: '0.6rem', lineHeight: 1.2,
          }}>
            Contattaci
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Compila il form, ti risponderemo entro 24 ore
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.8fr)',
          gap: '4rem',
          alignItems: 'start',
        }}
          className="form-grid"
        >

          {/* ── Colonna sinistra: info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                Siamo qui per aiutarti
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                Contattaci direttamente o compila il modulo. Uno dei nostri consulenti ti risponderà nel più breve tempo possibile.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {INFO_ITEMS.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', color: '#10B981',
                  }}>
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} style={{
                        fontSize: '0.9rem', fontWeight: 600, color: '#fff',
                        textDecoration: 'none', transition: 'color 0.2s',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#6EE7B7'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
              {[
                { icon: 'fab fa-facebook-f', href: '#' },
                { icon: 'fab fa-instagram', href: '#' },
                { icon: 'fab fa-linkedin-in', href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} aria-label={s.icon} style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(16,185,129,0.15)';
                    e.currentTarget.style.color = '#10B981';
                    e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* ── Colonna destra: form ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.25rem',
            padding: '2.5rem',
          }}>
            {submitted ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '1rem', padding: '3rem 1rem', textAlign: 'center',
              }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', color: '#10B981',
                }}>
                  <i className="fas fa-check"></i>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Candidatura inviata!
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', maxWidth: '360px', lineHeight: 1.65, margin: 0 }}>
                  Grazie per averci contattato. Uno dei nostri consulenti ti risponderà entro 24 ore lavorative.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFields(EMPTY); setFileName(''); }}
                  style={{
                    marginTop: '0.5rem', padding: '0.65rem 1.75rem', borderRadius: '999px',
                    background: 'rgba(16,185,129,0.15)', border: '1.5px solid rgba(16,185,129,0.4)',
                    color: '#10B981', fontWeight: 700, fontSize: '0.875rem',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Invia un'altra candidatura
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Nome + Cognome */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="name-row">
                  <Field label="Nome" required error={errors.nome}>
                    <input
                      type="text" value={fields.nome} onChange={set('nome')}
                      placeholder="Mario"
                      style={inputStyle(!!errors.nome)}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = errors.nome ? '#F87171' : 'rgba(255,255,255,0.12)'}
                    />
                  </Field>
                  <Field label="Cognome" required error={errors.cognome}>
                    <input
                      type="text" value={fields.cognome} onChange={set('cognome')}
                      placeholder="Rossi"
                      style={inputStyle(!!errors.cognome)}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = errors.cognome ? '#F87171' : 'rgba(255,255,255,0.12)'}
                    />
                  </Field>
                </div>

                {/* Email + Telefono */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="name-row">
                  <Field label="Email" required error={errors.email}>
                    <input
                      type="email" value={fields.email} onChange={set('email')}
                      placeholder="mario@esempio.it"
                      style={inputStyle(!!errors.email)}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = errors.email ? '#F87171' : 'rgba(255,255,255,0.12)'}
                    />
                  </Field>
                  <Field label="Telefono" error={errors.telefono}>
                    <input
                      type="tel" value={fields.telefono} onChange={set('telefono')}
                      placeholder="+39 333 1234567"
                      style={inputStyle(false)}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                    />
                  </Field>
                </div>

                {/* Data nascita + Comune */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="name-row">
                  <Field label="Data di nascita">
                    <input
                      type="date" value={fields.dataNascita} onChange={set('dataNascita')}
                      style={{ ...inputStyle(false), colorScheme: 'dark' }}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                    />
                  </Field>
                  <Field label="Comune di residenza" required error={errors.comune}>
                    <input
                      type="text" value={fields.comune} onChange={set('comune')}
                      placeholder="Vittoria"
                      style={inputStyle(!!errors.comune)}
                      onFocus={(e) => e.target.style.borderColor = '#10B981'}
                      onBlur={(e) => e.target.style.borderColor = errors.comune ? '#F87171' : 'rgba(255,255,255,0.12)'}
                    />
                  </Field>
                </div>

                {/* Servizio */}
                <Field label="Servizio di interesse" required error={errors.servizio}>
                  <select
                    value={fields.servizio} onChange={set('servizio')}
                    style={{
                      ...inputStyle(!!errors.servizio),
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2310B981' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10B981'}
                    onBlur={(e) => e.target.style.borderColor = errors.servizio ? '#F87171' : 'rgba(255,255,255,0.12)'}
                  >
                    <option value="" style={{ background: '#0F172A' }}>Seleziona un servizio…</option>
                    {SERVIZI.map((s) => (
                      <option key={s} value={s} style={{ background: '#0F172A' }}>{s}</option>
                    ))}
                  </select>
                </Field>

                {/* CV */}
                <Field label="Allega CV">
                  <div
                    onClick={() => fileRef.current?.click()}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.7rem 1rem', borderRadius: '10px', cursor: 'pointer',
                      border: '1.5px dashed rgba(16,185,129,0.35)',
                      background: 'rgba(16,185,129,0.04)',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(16,185,129,0.7)';
                      e.currentTarget.style.background = 'rgba(16,185,129,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(16,185,129,0.35)';
                      e.currentTarget.style.background = 'rgba(16,185,129,0.04)';
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', color: fileName ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                      {fileName || 'Clicca per allegare il CV (.pdf, .doc, .docx)'}
                    </span>
                  </div>
                  <input
                    ref={fileRef} type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    style={{ display: 'none' }}
                  />
                </Field>

                {/* Messaggio */}
                <Field label="Messaggio">
                  <textarea
                    value={fields.messaggio} onChange={set('messaggio')}
                    placeholder="Raccontaci brevemente la tua situazione o le tue aspettative…"
                    rows={4}
                    style={{
                      ...inputStyle(false),
                      resize: 'vertical',
                      minHeight: '100px',
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10B981'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                </Field>

                {/* Privacy */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer',
                  }}>
                    <div style={{ position: 'relative', flexShrink: 0, marginTop: '1px' }}>
                      <input
                        type="checkbox" checked={fields.privacy} onChange={setCheck('privacy')}
                        style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', margin: 0 }}
                      />
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '5px',
                        border: `2px solid ${errors.privacy ? '#F87171' : fields.privacy ? '#10B981' : 'rgba(255,255,255,0.2)'}`,
                        background: fields.privacy ? '#10B981' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}>
                        {fields.privacy && <i className="fas fa-check" style={{ fontSize: '9px', color: '#fff' }}></i>}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                      Ho letto e accetto la{' '}
                      <a href="/privacy-cookie" style={{ color: '#10B981', textDecoration: 'underline' }}>
                        Privacy Policy
                      </a>{' '}
                      di Alètheia S.r.l.
                      <span style={{ color: '#10B981', marginLeft: '2px' }}>*</span>
                    </span>
                  </label>
                  {errors.privacy && (
                    <span style={{ fontSize: '0.72rem', color: '#F87171', marginLeft: '1.65rem' }}>
                      <i className="fas fa-exclamation-circle" style={{ marginRight: '4px' }}></i>
                      {errors.privacy}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                    padding: '0.9rem 2rem', borderRadius: '999px', border: 'none',
                    background: loading ? 'rgba(16,185,129,0.4)' : 'linear-gradient(90deg, #008C95, #10B981)',
                    color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(0,140,149,0.35)',
                    transition: 'all 0.2s ease',
                    marginTop: '0.25rem',
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,140,149,0.5)'; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,140,149,0.35)'; }}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '0.85rem' }}></i>
                      Invio in corso…
                    </>
                  ) : (
                    <>Invia candidatura</>

                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .name-row  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
