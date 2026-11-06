import { Html, Head, Main, NextScript } from 'next/document';
import { nunito, viga } from '../lib/fonts';
import { ipadDesktopScript } from '../lib/ipad-desktop';

export default function Document() {
  return (
    <Html lang="it" data-scroll-behavior="smooth" className={`${nunito.variable} ${viga.variable}`}>{/* Next 16 non sovrascrive più scroll-behavior durante le navigazioni: mantiene il "smooth" di globals.css */}
      <Head>
        {/* iPad in modalità sito desktop: script bloccante prima del primo paint, vedi lib/ipad-desktop.js (non cambia nulla su Mac, telefoni, iPad mobile). */}
        <script dangerouslySetInnerHTML={{ __html: ipadDesktopScript }} />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="true" />
        {/* Nunito e Viga: self-hosted con next/font (lib/fonts.js), variabili CSS su <html>: nessun link a Google Fonts. */}

        {/* Font Awesome: link sincrono. Il precedente pattern preload+onLoad non
            attivava sempre lo swap a rel="stylesheet" (icone mancanti in alcuni
            browser), quindi si carica direttamente come stylesheet. */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
