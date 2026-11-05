// Link WhatsApp dei corsi di formazione obbligatoria (pages/all-courses/[slug].js, CoursePricingSidebar).
// Il numero lo fornisce il reparto formazione e arriva dalla variabile NEXT_PUBLIC_WHATSAPP (Vercel, Production e Preview).
// Finché la variabile manca, o non è valida, la funzione restituisce null e il pulsante NON compare: mai href="#".
// Accetta un indirizzo completo (https://wa.me/39…) oppure il solo numero con prefisso internazionale ("+39 333 1234567",
// "0039 333…", "39333…"). Un numero senza prefisso (es. "333 1234567") viene rifiutato: un link sbagliato è peggio di nessun link.
// NEXT_PUBLIC_*: il valore entra nel codice al momento della build, quindi dopo averlo cambiato serve un nuovo deploy.

/** Link `https://…` pronto per l'href, oppure null (= niente pulsante). */
export function whatsappLink(valore: string | null | undefined): string | null {
  const v = (valore || '').trim();
  if (!v) return null;
  if (/^https:\/\//i.test(v)) {
    try {
      return new URL(v).toString();
    } catch {
      return null;
    }
  }
  if (/^http:\/\//i.test(v) || /[a-z]/i.test(v)) return null; // niente http in chiaro, niente testo a caso (es. "#", "da definire")
  const cifre = v.replace(/\D/g, '').replace(/^00/, '');
  // Prefisso internazionale incluso: almeno 11 cifre (es. 39 + 9 o 10 cifre); al massimo 15 (standard E.164).
  if (cifre.length < 11 || cifre.length > 15) return null;
  return `https://wa.me/${cifre}`;
}
