import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

const SETTORI = [
  'Agricoltura / Agroalimentare',
  'Commercio / Retail',
  'Edilizia / Costruzioni',
  'Industria / Manifatturiero',
  'Informatica / Tecnologia',
  'Pubblica Amministrazione',
  'Sanità / Assistenza',
  'Servizi / Consulenza',
  'Turismo / Ristorazione',
  'Altro',
];

const DIPENDENTI = ['1-10', '11-50', '51-200', 'Oltre 200'];

const SERVIZI = [
  'Somministrazione di Lavoro',
  'Ricerca e Selezione del Personale',
  'Consulenza HR',
  'Formazione Aziendale',
  'Intermediazione Lavoro',
  'Riqualificazione e Upskilling',
];

const INFO_ITEMS = [
  { icon: 'fas fa-phone',         label: 'Telefono', value: '+39 0932 862613',   href: 'tel:+390932862613' },
  { icon: 'fas fa-envelope',      label: 'Email',    value: 'info@aletheiasrl.it', href: 'mailto:info@aletheiasrl.it' },
  { icon: 'fas fa-map-marker-alt',label: 'Sede',     value: 'Via del Carrubo, snc - 97019 Vittoria (RG)', href: null as string | null },
  { icon: 'fas fa-clock',         label: 'Orari',    value: 'Lun-Ven: 9:00-13:00 / 15:00-18:00', href: null as string | null },
];

interface FormFields {
  ragioneSociale: string;
  partitaIva: string;
  nomeReferente: string;
  cognomeReferente: string;
  email: string;
  telefono: string;
  settore: string;
  dipendenti: string;
  servizio: string;
  descrizione: string;
  privacy: boolean;
}

const EMPTY: FormFields = {
  ragioneSociale: '', partitaIva: '',
  nomeReferente: '', cognomeReferente: '',
  email: '', telefono: '',
  settore: '', dipendenti: '', servizio: '',
  descrizione: '', privacy: false,
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  isDark: boolean;
}

function Field({ label, required, error, children, isDark }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <label style={{
        fontSize: '0.78rem', fontWeight: 700,
        color: error ? '#F87171' : isDark ? 'rgba(226,232,240,0.75)' : 'rgba(255,255,255,0.75)',
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

const baseInput = (hasError: boolean, isDark: boolean): CSSProperties => ({
  width: '100%', padding: '0.7rem 1rem', borderRadius: '10px',
  border: `1.5px solid ${hasError ? '#F87171' : isDark ? 'rgba(148,163,184,0.2)' : 'rgba(255,255,255,0.12)'}`,
  background: isDark ? 'rgba(51,65,85,0.3)' : 'rgba(255,255,255,0.06)',
  color: isDark ? '#E2E8F0' : '#fff',
  fontSize: '0.9rem', outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  fontFamily: 'inherit', boxSizing: 'border-box',
});

const selectStyle = (hasError: boolean, isDark: boolean): CSSProperties => ({
  ...baseInput(hasError, isDark),
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2310B981' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  backgroundSize: '10px',
  paddingRight: '2.5rem',
  cursor: 'pointer',
});

const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.target.style.borderColor = '#10B981'; };
const focusOff = (hasErr: boolean, isDark: boolean) => (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.target.style.borderColor = hasErr ? '#F87171' : isDark ? 'rgba(148,163,184,0.2)' : 'rgba(255,255,255,0.12)'; };

export default function FormAzienda() {
  const { theme } = useTheme() || { theme: 'light' };
  const isDark = theme === 'dark';
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFields((p) => ({ ...p, [k]: e.target.value }));
  const setCheck = (e: React.ChangeEvent<HTMLInputElement>) => setFields((p) => ({ ...p, privacy: e.target.checked }));

  function validate(): FormErrors {
    const err: FormErrors = {};
    if (!fields.ragioneSociale.trim()) err.ragioneSociale = 'Campo obbligatorio';
    if (!fields.nomeReferente.trim())  err.nomeReferente  = 'Campo obbligatorio';
    if (!fields.cognomeReferente.trim()) err.cognomeReferente = 'Campo obbligatorio';
    if (!fields.email.trim())          err.email = 'Campo obbligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) err.email = 'Email non valida';
    if (!fields.telefono.trim())       err.telefono = 'Campo obbligatorio';
    if (!fields.settore)               err.settore = 'Seleziona un settore';
    if (!fields.dipendenti)            err.dipendenti = 'Seleziona una fascia';
    if (!fields.servizio)              err.servizio = 'Seleziona un servizio';
    if (!fields.privacy)               err.privacy = 'Devi accettare la Privacy Policy';
    return err;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section
      id="contatta-azienda"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #003134 0%, #0F1419 100%)'
          : 'linear-gradient(135deg, #0F172A 0%, #0D1F2D 100%)',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* blobs decorativi */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,140,149,0.11) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{
            display: 'inline-block', fontSize: '0.68rem', fontWeight: 800,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: isDark ? '#86EFAC' : '#6EE7B7', marginBottom: '0.6rem',
          }}>
            Contatto aziendale
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900,
            color: '#fff', marginBottom: '0.6rem', lineHeight: 1.2,
          }}>
            Parliamo delle tue esigenze
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Compila il form, ti risponderemo entro 24 ore
          </p>
        </div>

        {/* Grid layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.8fr)',
          gap: '4rem', alignItems: 'start',
        }} className="form-az-grid">

          {/* ── Colonna sinistra: info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                Consulenza su misura
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                Il nostro team HR è a disposizione per analizzare le tue esigenze e proporti la soluzione più adatta. Primo contatto gratuito e senza impegno.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {INFO_ITEMS.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(0,140,149,0.1)', border: '1px solid rgba(0,140,149,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', color: '#008C95',
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

            {/* Perché noi */}
            <div style={{
              padding: '1.25rem', borderRadius: '12px',
              background: 'rgba(0,140,149,0.07)', border: '1px solid rgba(0,140,149,0.18)',
              display: 'flex', flexDirection: 'column', gap: '0.65rem',
              marginTop: '0.5rem',
            }}>
              <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#008C95' }}>
                Perché sceglierci
              </p>
              {[
                'Autorizzati ANPAL - DDS Nr. 1.100/2019',
                'Operativi in Sicilia dal 2005',
                'Parte del network PromoterGroup S.p.A.',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-check-circle" style={{ color: '#008C95', fontSize: '0.75rem', flexShrink: 0 }}></i>
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {[
                { icon: 'fab fa-facebook-f', href: '#' },
                { icon: 'fab fa-instagram',  href: '#' },
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
                    e.currentTarget.style.background = 'rgba(0,140,149,0.15)';
                    e.currentTarget.style.color = '#008C95';
                    e.currentTarget.style.borderColor = 'rgba(0,140,149,0.35)';
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
                justifyContent: 'center', gap: '1rem',
                padding: '3rem 1rem', textAlign: 'center',
              }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'rgba(0,140,149,0.15)', border: '2px solid #008C95',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', color: '#008C95',
                }}>
                  <i className="fas fa-check"></i>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Richiesta inviata!
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', maxWidth: '360px', lineHeight: 1.65, margin: 0 }}>
                  Grazie per averci contattato. Un nostro consulente HR ti risponderà entro 24 ore lavorative.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFields(EMPTY); }}
                  style={{
                    marginTop: '0.5rem', padding: '0.65rem 1.75rem', borderRadius: '999px',
                    background: 'rgba(0,140,149,0.12)', border: '1.5px solid rgba(0,140,149,0.35)',
                    color: '#008C95', fontWeight: 700, fontSize: '0.875rem',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  Invia una nuova richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Ragione Sociale + P.IVA */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="az-row">
                  <Field label="Ragione Sociale" required error={errors.ragioneSociale} isDark={isDark}>
                    <input type="text" value={fields.ragioneSociale} onChange={set('ragioneSociale')}
                      placeholder="Azienda S.r.l."
                      style={baseInput(!!errors.ragioneSociale, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.ragioneSociale, isDark)} />
                  </Field>
                  <Field label="Partita IVA" error={errors.partitaIva} isDark={isDark}>
                    <input type="text" value={fields.partitaIva} onChange={set('partitaIva')}
                      placeholder="IT12345678901"
                      style={baseInput(false, isDark)}
                      onFocus={focusOn} onBlur={focusOff(false, isDark)} />
                  </Field>
                </div>

                {/* Nome + Cognome referente */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="az-row">
                  <Field label="Nome referente" required error={errors.nomeReferente} isDark={isDark}>
                    <input type="text" value={fields.nomeReferente} onChange={set('nomeReferente')}
                      placeholder="Mario"
                      style={baseInput(!!errors.nomeReferente, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.nomeReferente, isDark)} />
                  </Field>
                  <Field label="Cognome referente" required error={errors.cognomeReferente} isDark={isDark}>
                    <input type="text" value={fields.cognomeReferente} onChange={set('cognomeReferente')}
                      placeholder="Rossi"
                      style={baseInput(!!errors.cognomeReferente, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.cognomeReferente, isDark)} />
                  </Field>
                </div>

                {/* Email + Telefono */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="az-row">
                  <Field label="Email aziendale" required error={errors.email} isDark={isDark}>
                    <input type="email" value={fields.email} onChange={set('email')}
                      placeholder="info@azienda.it"
                      style={baseInput(!!errors.email, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.email, isDark)} />
                  </Field>
                  <Field label="Telefono" required error={errors.telefono} isDark={isDark}>
                    <input type="tel" value={fields.telefono} onChange={set('telefono')}
                      placeholder="+39 0932 000000"
                      style={baseInput(!!errors.telefono, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.telefono, isDark)} />
                  </Field>
                </div>

                {/* Settore + Dipendenti */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="az-row">
                  <Field label="Settore aziendale" required error={errors.settore} isDark={isDark}>
                    <select value={fields.settore} onChange={set('settore')}
                      style={selectStyle(!!errors.settore, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.settore, isDark)}>
                      <option value="" style={{ background: '#0F172A' }}>Seleziona…</option>
                      {SETTORI.map((s) => <option key={s} value={s} style={{ background: '#0F172A' }}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="N° dipendenti" required error={errors.dipendenti} isDark={isDark}>
                    <select value={fields.dipendenti} onChange={set('dipendenti')}
                      style={selectStyle(!!errors.dipendenti, isDark)}
                      onFocus={focusOn} onBlur={focusOff(!!errors.dipendenti, isDark)}>
                      <option value="" style={{ background: '#0F172A' }}>Seleziona…</option>
                      {DIPENDENTI.map((d) => <option key={d} value={d} style={{ background: '#0F172A' }}>{d}</option>)}
                    </select>
                  </Field>
                </div>

                {/* Servizio richiesto */}
                <Field label="Servizio richiesto" required error={errors.servizio} isDark={isDark}>
                  <select value={fields.servizio} onChange={set('servizio')}
                    style={selectStyle(!!errors.servizio, isDark)}
                    onFocus={focusOn} onBlur={focusOff(!!errors.servizio, isDark)}>
                    <option value="" style={{ background: '#0F172A' }}>Seleziona un servizio…</option>
                    {SERVIZI.map((s) => <option key={s} value={s} style={{ background: '#0F172A' }}>{s}</option>)}
                  </select>
                </Field>

                {/* Descrizione esigenza */}
                <Field label="Descrizione esigenza" isDark={isDark}>
                  <textarea
                    value={fields.descrizione} onChange={set('descrizione')}
                    placeholder="Descrivi brevemente la tua necessità: profili ricercati, tempistiche, numero di risorse, eventuali competenze specifiche richieste…"
                    rows={4}
                    style={{ ...baseInput(false, isDark), resize: 'vertical', minHeight: '110px', lineHeight: 1.6 }}
                    onFocus={focusOn} onBlur={focusOff(false, isDark)}
                  />
                </Field>

                {/* Privacy */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                    <div style={{ position: 'relative', flexShrink: 0, marginTop: '1px' }}>
                      <input
                        type="checkbox" checked={fields.privacy} onChange={setCheck}
                        style={{ opacity: 0, position: 'absolute', inset: 0, cursor: 'pointer', margin: 0 }}
                      />
                      <div style={{
                        width: '18px', height: '18px', borderRadius: '5px',
                        border: `2px solid ${errors.privacy ? '#F87171' : fields.privacy ? '#008C95' : 'rgba(255,255,255,0.2)'}`,
                        background: fields.privacy ? '#008C95' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}>
                        {fields.privacy && <i className="fas fa-check" style={{ fontSize: '9px', color: '#fff' }}></i>}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.825rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                      Ho letto e accetto la{' '}
                      <a href="/privacy-cookie" style={{ color: '#008C95', textDecoration: 'underline' }}>
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
                    background: loading ? 'rgba(0,140,149,0.35)' : 'linear-gradient(90deg, #008C95, #10B981)',
                    color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(0,140,149,0.35)',
                    transition: 'all 0.2s ease',
                    marginTop: '0.25rem',
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,140,149,0.52)'; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,140,149,0.35)'; }}
                >
                  {loading ? (
                    <><i className="fas fa-circle-notch fa-spin" style={{ fontSize: '0.85rem' }}></i> Invio in corso…</>
                  ) : (
                    <>Richiedi consulenza</>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .form-az-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .az-row       { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
