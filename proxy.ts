import { NextRequest, NextResponse } from 'next/server';
import { DESTINAZIONE_CATEGORIA } from './data/categorie-corsi';

/**
 * Il vecchio filtro /corsi?categoria=<chiave> (e /all-courses?categoria=<chiave>) non esiste più: 301 alla pagina di categoria
 * o alla pagina di /formazione che la sostituisce (mappa in data/categorie-corsi.js).
 * Sta qui e non in next.config.js perché i redirect di next.config.js riportano sempre la query di partenza nella destinazione
 * (?categoria=icdl resterebbe appiccicato all'indirizzo nuovo); qui la destinazione è pulita. Gira solo su queste due pagine.
 */
export function proxy(request: NextRequest) {
  const chiave = request.nextUrl.searchParams.get('categoria');
  const destinazione = chiave ? (DESTINAZIONE_CATEGORIA as Record<string, string>)[chiave] : undefined;
  const url = request.nextUrl.clone();
  if (destinazione) {
    url.pathname = destinazione;
    url.search = '';
    return NextResponse.redirect(url, 301);
  }
  // Categoria sconosciuta: su /corsi si mostra il catalogo com'è; su /all-courses (pagina che non esiste più) si va a /corsi.
  if (url.pathname === '/all-courses') {
    url.pathname = '/corsi';
    url.searchParams.delete('categoria');
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/corsi', '/all-courses'] };
