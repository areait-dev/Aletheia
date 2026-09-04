import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ANNI_DISPONIBILI = ['2023', '2024'];

function TabellaEnte({ anno, ente, righe }) {
  return (
    <div className="mb-10">
      <p className="text-gray-700 dark:text-gray-200 font-semibold mb-3">
        La società Aletheia srl C.F. 01524530894 (soggetto ricevente), nell&apos;anno {anno}, ha ricevuto da{' '}
        {ente} (ente erogatore) le seguenti somme:
      </p>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 font-bold text-gray-900 dark:text-gray-50 whitespace-nowrap">DATA</th>
              <th className="px-4 py-3 font-bold text-gray-900 dark:text-gray-50 whitespace-nowrap">IMPORTO</th>
              <th className="px-4 py-3 font-bold text-gray-900 dark:text-gray-50">TITOLO PROGETTO</th>
              <th className="px-4 py-3 font-bold text-gray-900 dark:text-gray-50">CIP – CUP - RUP</th>
            </tr>
          </thead>
          <tbody>
            {righe.map((r, i) => (
              <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap align-top">{r.data}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap align-top">{r.importo}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top">{r.titolo}</td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300 align-top">{r.cup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AiutiDiStatoAnno({ anno, enti, paragrafiFinali }) {
  return (
    <>
      <Head>
        <title>Obblighi di pubblicazione per i beneficiari di contributi {anno} | Alètheia S.r.l.</title>
      </Head>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-40 pb-24">
          <span className="text-primary dark:text-[#10B981] font-bold text-xs tracking-widest uppercase mb-4 block">
            Trasparenza
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
            Obblighi di pubblicazione per i beneficiari di contributi {anno}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Informazioni ex art. 1, comma 125, della legge 4 agosto 2017 n. 124
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            Ai sensi e per gli effetti dell&apos;art. 1 comma 125 della Legge 124/2017, si espongono di seguito i
            contributi, gli incarichi retribuiti e comunque i vantaggi economici di qualunque genere erogati dalle
            pubbliche amministrazioni nonché da società controllate di diritto e di fatto direttamente o
            indirettamente da pubbliche amministrazioni, utilizzando il principio di cassa.
          </p>

          {enti.map((e, i) => (
            <TabellaEnte key={i} anno={anno} ente={e.ente} righe={e.righe} />
          ))}

          {paragrafiFinali.map((testo, i) => (
            <p
              key={i}
              className={`text-gray-600 dark:text-gray-300 leading-relaxed ${i === paragrafiFinali.length - 1 ? 'mb-6' : 'mb-4'}`}
            >
              {testo}
            </p>
          ))}

          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Per gli altri aiuti ricevuti dalla società si rinvia al registro nazionale per gli aiuti di stato.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ANNI_DISPONIBILI.map((anno) => ({ params: { anno } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const content = require(`../../data/content/aiuti-di-stato/${params.anno}.js`);
  return {
    props: {
      anno: content.anno,
      enti: content.enti,
      paragrafiFinali: content.paragrafiFinali,
    },
  };
}
