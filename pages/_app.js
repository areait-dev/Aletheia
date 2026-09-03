import '../styles/globals.css';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import { initLenis, destroyLenis } from '../lib/lenis';
import { SITE_NAME, SITE_URL } from '../components/SeoHead';
import CookieConsent from '../components/CookieConsent';

// Chatbot non contribuisce al first paint: caricato lato client dopo l'idratazione
// per non bloccare il rendering iniziale della pagina.
const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false });

const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via del Carrubo, snc',
    addressLocality: 'Vittoria',
    addressRegion: 'RG',
    postalCode: '97019',
    addressCountry: 'IT',
  },
  telephone: '+39 0932 862613',
  email: 'info@aletheiasrl.it',
  sameAs: [
    'https://www.facebook.com/aletheiasrl.it/?locale=it_IT',
    'https://www.instagram.com/aletheiasrl/',
    'https://it.linkedin.com/company/al%C3%A9theia-srl',
    'https://t.me/alethiaapl',
  ],
};

function MyApp({ Component, pageProps }) {
  // Avvia lo smooth scrolling Lenis lato client.
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          try {
            // Default light al primo accesso: dark solo se l'utente l'ha scelto in precedenza.
            const stored = localStorage.getItem('theme');
            if (stored === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (e) {}
        })()
      `}} />
      <ThemeProvider>
        <CartProvider>
          {/* Font Awesome: non-blocking (media=print + onLoad) per non ritardare FCP/LCP */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            media="print"
            onLoad="this.media='all'"
          />
          <noscript>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
              integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
          </noscript>
          {/* Viga caricato via CDN (evita il fetch a build-time di next/font), reso non-blocking */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Viga&display=swap"
            media="print"
            onLoad="this.media='all'"
          />
          <noscript>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Viga&display=swap" />
          </noscript>
          {/* La variabile --font-viga viene resa disponibile a tutta l'app */}
          <div style={{ '--font-viga': "'Viga', sans-serif", display: 'contents' }}>
            <Component {...pageProps} />
            <Chatbot />
            <CookieConsent />
          </div>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;