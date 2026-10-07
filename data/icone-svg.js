// Catalogo delle icone SVG disegnate (viewBox 24×24, solo tratto): nome → tracciato `d`. Servono alle liste con icone
// non Font Awesome (vantaggi e servizi del Fondo Nuove Competenze). In WordPress, nel campo "Icona" della scheda si
// scrive il NOME (es. `fulmine`); un nome sconosciuto o vuoto non disegna nulla. L'<svg> sta nel JSX della pagina
// (non in un componente), così vale il CSS scoped della pagina. Per aggiungere un'icona basta una riga qui, più il
// nome nell'istruzione del campo "Icona" in wordpress/build-acf-json.mjs.
export const ICONE_SVG = {
  fulmine: 'M13 2 3 14h7l-1 8 10-12h-7l1-8Z',
  bersaglio: 'M12 2a10 10 0 1 0 10 10M22 2 12 12M16 2h6v6',
  cuore: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z',
  moneta: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  lente: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  scudo: 'm9 12 2 2 4-4M12 3a9 9 0 0 0-8 4.7V17a9 9 0 0 0 16 0V7.7A9 9 0 0 0 12 3Z',
  matita: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z',
  ricevuta: 'M9 12h6M9 16h6M8 3h8a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2Z',
  busta: 'M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2m18 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0-9 6-9-6',
  gruppo: 'M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  grafico: 'M3 3v18h18M7 15l4-4 3 3 5-6',
};
