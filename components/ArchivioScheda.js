import LinkText from './LinkText';
import ArchivioShell, { DocumentiLista, H2_STYLE, LISTA_STYLE, VOCE_STYLE } from './ArchivioShell';
import { useSiteOptions } from '../context/SiteOptionsContext';

/**
 * Layout "a scheda" di una voce dell'archivio (es. Avviso 1/2026 POC, Avviso 20/2024 FSE+): hero con briciole e badge,
 * "Di cosa si tratta", requisiti, un blocco extra (qualifiche, sedi o elenco corsi con durata), riquadro avviso (es. scadenza), documenti in
 * un'unica lista e contatti. Tutti i testi vengono dalla voce (dati locali o WordPress): vedi lib/wp-archivio.ts.
 */

export default function ArchivioScheda({ voce }) {
  const { scheda: s } = voce;
  const { identita } = useSiteOptions();
  // Un'unica lista, senza titoli di sezione: nell'ordine in cui i documenti sono stati inseriti.
  const documenti = Object.values(voce.documenti || {}).flat();
  const gruppi = [];
  documenti.forEach((d) => {
    const g = gruppi.find((x) => x.gruppo === (d.gruppo || ''));
    if (g) g.docs.push(d);
    else gruppi.push({ gruppo: d.gruppo || '', docs: [d] });
  });
  const paragrafi = (voce.descrizione || '').split(/\n\s*\n/).filter(Boolean);

  return (
    <ArchivioShell
      titolo={voce.titolo}
      badge={s.badge}
      sottotitolo={s.sottotitolo}
      metaTitolo={voce.metaTitolo}
      metaDescrizione={voce.metaDescrizione}
      briciole={[voce.fuoriElenco ? { label: 'Formazione Regionale', href: '/formazione/regionale' } : { label: 'Archivio', href: '/archivio' }, { label: s.titoloBreve || voce.titolo }]} // fuoriElenco = avviso attivo (fuori dall'archivio); le altre voci sono archivio
    >
          {paragrafi.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>
                Di cosa si tratta
              </h2>
              {paragrafi.map((p, i) => (
                <p key={i} className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.85 }}>
                  {p}
                </p>
              ))}
            </section>
          )}

          {s.requisiti.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>
                Requisiti di accesso
              </h2>
              {s.requisitiIntro && (
                <p className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {s.requisitiIntro}
                </p>
              )}
              <ul style={LISTA_STYLE}>
                {s.requisiti.map((r) => (
                  <li key={r} style={VOCE_STYLE}>
                    <i className="fas fa-check-circle" style={{ color: '#018891', marginTop: '0.2rem', flexShrink: 0 }}></i>
                    <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {s.extra.length > 0 && (
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 className="text-slate-900 dark:text-gray-50" style={H2_STYLE}>
                {s.extraTitolo}
              </h2>
              {s.extraTipo === 'sedi' ? (
                <ul style={LISTA_STYLE}>
                  {s.extra.map((sede) => (
                    <li key={sede} style={VOCE_STYLE}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#008C95', marginTop: '0.2rem', flexShrink: 0 }}></i>
                      <span className="text-slate-700 dark:text-gray-300" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>{sede}</span>
                    </li>
                  ))}
                </ul>
              ) : s.extraTipo === 'corsi' ? (
                // Elenco corsi: voci "Nome del corso | durata", nome a sinistra e durata a destra
                <ul style={{ ...LISTA_STYLE, gap: '0.5rem' }}>
                  {s.extra.map((voceCorso) => {
                    const [nome, durata] = voceCorso.split('|').map((x) => x.trim());
                    return (
                      <li
                        key={voceCorso}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderRadius: '0.75rem', padding: '0.8rem 1.1rem' }}
                      >
                        <span className="text-slate-700 dark:text-gray-200" style={{ fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.5 }}>{nome}</span>
                        {durata && (
                          <span className="bg-[#018891]/10 border border-[#018891]/30 dark:border-primary-on-dark/30 text-[#006066] dark:text-primary-on-dark" style={{ flexShrink: 0, padding: '0.25rem 0.7rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            {durata}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {s.extra.map((q) => (
                    <span key={q} className="bg-[#018891]/10 dark:bg-[#018891]/10 border border-[#018891]/30 dark:border-primary-on-dark/30 text-[#006066] dark:text-primary-on-dark" style={{ padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600 }}>
                      {q}
                    </span>
                  ))}
                </div>
              )}
            </section>
          )}

          {s.avviso && (
            <section className="bg-[#018891]/10 dark:bg-[#018891]/10 border border-[#018891]/30 dark:border-primary-on-dark/30" style={{ borderRadius: '1rem', padding: '1.5rem', marginBottom: '2.5rem' }}>
              {/* Più paragrafi separati da una riga vuota (es. scadenza + news); l'icona sta solo sul primo */}
              {s.avviso.split(/\n\s*\n/).filter(Boolean).map((par, i) => (
                <p key={i} className="text-[#004D52] dark:text-primary-on-dark" style={{ margin: i === 0 ? 0 : '0.9rem 0 0', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.7 }}>
                  {i === 0 && <i className="far fa-calendar-alt" style={{ marginRight: '0.5rem' }}></i>}
                  <LinkText text={par} newTab style={{ color: 'inherit', textDecoration: 'underline' }} />
                </p>
              ))}
            </section>
          )}

          {documenti.length > 0 && (
            <section>
              <h2 className="text-slate-900 dark:text-gray-50" style={{ ...H2_STYLE, marginBottom: '1rem' }}>
                Documenti scaricabili
              </h2>
              {/* Se i documenti hanno un `gruppo`, un titoletto per ogni gruppo (come nella pagina originale); altrimenti un'unica lista */}
              {gruppi.map(({ gruppo, docs }) => (
                <div key={gruppo || 'documenti'} style={{ marginBottom: gruppo ? '1.75rem' : 0 }}>
                  {gruppo && (
                    <h3 className="text-slate-700 dark:text-gray-200" style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>{gruppo}</h3>
                  )}
                  <DocumentiLista documenti={docs} />
                </div>
              ))}
            </section>
          )}

          {s.contatti && (
            <div className="border-t border-gray-200 dark:border-gray-700" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', fontSize: '0.85rem' }}>
              <p className="text-slate-600 dark:text-gray-400" style={{ margin: 0 }}>
                Per informazioni: <a href={`mailto:${identita.email}`} style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}>{identita.email}</a> — Tel. <a href={`tel:${identita.telefono.replace(/\s+/g, '')}`} style={{ color: '#008C95', fontWeight: 700, textDecoration: 'none' }}>{identita.telefono}</a>
              </p>
            </div>
          )}

    </ArchivioShell>
  );
}
