import type { CorsoCalendario } from '../data/calendario';

const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

/** "2026-11-12" → "12 novembre 2026" (nessun fuso: la data è già quella italiana del foglio). */
function dataEstesa(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MESI[m - 1]} ${y}`;
}

/**
 * Scheda corso: "Prossima edizione: <data>, <sede>" se il foglio del calendario ha per questo corso un'edizione pubblicata che inizia da oggi in poi
 * (prossimaEdizione in lib/wp-calendario.ts). Senza edizione (null) non mostra nulla: la scheda resta com'era. Per la FAD, che non ha sede, al posto
 * della sede c'è la modalità.
 */
export default function ProssimaEdizione({ edizione, scelta = false }: { edizione: CorsoCalendario | null; scelta?: boolean }) {
  if (!edizione) return null;
  const luogo = edizione.sede || edizione.modalita || '';
  return (
    <div
      className="prossima-edizione bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl"
      style={{ padding: '1rem 1.15rem', marginBottom: '1rem' }}
    >
      <p className="text-slate-900 dark:text-gray-50" style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, lineHeight: 1.4 }}>
        <i className="fas fa-calendar-check text-primary-text dark:text-primary-on-dark" aria-hidden="true" style={{ marginRight: '0.5rem' }} />
        {scelta ? 'Edizione scelta' : 'Prossima edizione'}: {dataEstesa(edizione.data)}
        {luogo ? `, ${luogo}` : ''}
      </p>
      {edizione.variante && (
        <p className="text-slate-600 dark:text-gray-300" style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', lineHeight: 1.5 }}>
          {edizione.variante}
          {edizione.giorni ? ` · ${edizione.giorni}` : ''}
        </p>
      )}
    </div>
  );
}
