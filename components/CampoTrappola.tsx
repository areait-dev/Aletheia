import { CAMPO_TRAPPOLA } from '../lib/moduli';

// Campo-trappola antispam (honeypot): fuori schermo, invisibile ai lettori di schermo e saltato dalla tabulazione.
// Una persona non lo vede mai e lo lascia vuoto; molti bot compilano ogni campo che trovano e vengono scartati dal server.
export default function CampoTrappola() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
      <label>
        Lascia vuoto questo campo
        <input type="text" name={CAMPO_TRAPPOLA} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
