import '../styles/globals.css';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import Chatbot from '../components/Chatbot';
import CustomCursor from '../components/CustomCursor';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import { initLenis, destroyLenis } from '../lib/lenis';

function MyApp({ Component, pageProps }) {
  // Avvia lo smooth scrolling Lenis lato client.
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          {/* Viga caricato via CDN (evita il fetch a build-time di next/font) */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Viga&display=swap" />
          {/* La variabile --font-viga viene resa disponibile a tutta l'app */}
          <div style={{ '--font-viga': "'Viga', sans-serif", display: 'contents' }}>
            <Component {...pageProps} />
            <Chatbot />
            <CustomCursor />
          </div>
        </CartProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;