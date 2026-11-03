import Head from 'next/head';

/**
 * Pagina 404: riproduce ESATTAMENTE la 404 predefinita di Next 13.4 (stesso markup, stessi stili, stesso testo in inglese),
 * ma passando da _app come prima (chat, JSON-LD, tema). Da Next 16 la 404 predefinita NON passa più da _app e cambia
 * aspetto (altezza di riga già diversa da 13.5): senza questo file il sito perderebbe la chat e l'aspetto cambierebbe.
 * Nessun redesign: non modificare il testo né gli stili.
 */
const stili = {
  errore: {
    fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: { display: 'inline-block', textAlign: 'left' },
  h1: { display: 'inline-block', margin: '0 20px 0 0', paddingRight: 23, fontSize: 24, fontWeight: 500, verticalAlign: 'top', lineHeight: '49px' },
  h2: { fontSize: 14, fontWeight: 400, lineHeight: '49px', margin: 0 },
};

export default function NotFound() {
  return (
    <div style={stili.errore}>
      <Head>
        <title>404: This page could not be found</title>
      </Head>
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              'body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}',
          }}
        />
        <h1 className="next-error-h1" style={stili.h1}>
          404
        </h1>
        <div style={stili.desc}>
          <h2 style={stili.h2}>This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}
