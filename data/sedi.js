// Sedi di Alètheia (pagina /contatti). Sorgente locale: con WP_URL attivo prevale il CPT `sede` (lib/wp-sedi.ts).
export const SEDI = [
  {
    città: 'Vittoria',
    indirizzo: 'Via del Carrubo, snc',
    cap: '97019 Vittoria (RG)',
    // Link e embed puntano allo stesso luogo Google (pin "PROMOTERGROUP S.p.A.", 36.9676, 14.5558): stesso ftid dell'embed
    mapsHref: 'https://www.google.com/maps?ftid=0x1311a473afdcbf41:0x2f2626c2fa9958be',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.767471209099!2d14.555755176275595!3d36.96760995824408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1311a473afdcbf41%3A0x2f2626c2fa9958be!2sPROMOTERGROUP%20S.p.A.!5e0!3m2!1sit!2sit!4v1790761569752!5m2!1sit!2sit',
  },
  {
    città: 'Ragusa',
    indirizzo: 'Viale delle Americhe, 141',
    cap: 'Ragusa (RG)',
    mapsHref: 'https://maps.google.com/?q=Viale+delle+Americhe+141+Ragusa',
    mapsEmbed: 'https://www.google.com/maps?q=Viale+delle+Americhe+141+Ragusa&output=embed',
  },
  {
    città: 'Pozzallo',
    indirizzo: 'Via Ginevra, 9',
    cap: 'Pozzallo (RG)',
    mapsHref: 'https://maps.google.com/?q=Via+Ginevra+9+Pozzallo',
    mapsEmbed: 'https://www.google.com/maps?q=Via+Ginevra+9+Pozzallo+RG&output=embed',
  },
  {
    città: 'Acate',
    indirizzo: 'C.da Casazza, snc',
    cap: 'Acate (RG)',
    mapsHref: 'https://maps.google.com/?q=PROMOTERAGRI',
    mapsEmbed: 'https://www.google.com/maps?q=PROMOTERAGRI&output=embed',
  },
];
