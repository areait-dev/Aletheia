// Loghi partner per gruppo (home e /chi-siamo). Sorgente locale: con WP_URL attivo prevale il CPT `partner`
// (campo `gruppo`), vedi lib/wp-partner.ts. Loghi in public/images/gruppo/.
export const PARTNER = {
  // Aziende del gruppo Promotergroup
  ecosistema: [
    { name: 'Promotergroup', src: '/images/gruppo/promotergroup.svg' },
    { name: 'Promosan', src: '/images/gruppo/promosan.svg' },
    { name: 'Promoter Soc. Coop.', src: '/images/gruppo/promoter-soc-coop.svg' },
    { name: 'Promoter Srl', src: '/images/gruppo/promoter-srl.svg' },
    { name: 'Promoteragri', src: '/images/gruppo/promoteragri.svg' },
    { name: 'Iside', src: '/images/gruppo/iside.svg' },
    { name: 'Promesys', src: '/images/gruppo/promesys.svg' },
    { name: 'Doses', src: '/images/gruppo/doses.svg' },
  ],
  // Certificazioni del Footer: `srcDark` = logo per il tema scuro
  certificazioni: [
    { name: 'ISO 9001', src: '/images/certificazioni/Logo_9001_IT-removebg-preview.png', srcDark: '/images/certificazioni_dark/Logo 9001 IT.png' },
    { name: 'ISO 14001', src: '/images/certificazioni/Logo_14001_IT-removebg-preview.png', srcDark: '/images/certificazioni_dark/Logo 14001 IT.png' },
    { name: 'ISO 45001', src: '/images/certificazioni/Logo_45001_IT-removebg-preview.png', srcDark: '/images/certificazioni_dark/Logo 45001 IT.png' },
  ],
};
