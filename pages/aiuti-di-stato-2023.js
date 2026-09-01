import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ENTI = [
  {
    ente: "ASSESSORATO REGIONALE FAMIGLIA-POLITICHE SOCIALI E LAVORO - C.F. 80012000826",
    righe: [
      {
        data: '29/12/2023',
        importo: '€ 21.858,20',
        titolo: "Avviso n. 2/2020 - Misura 2A - Formazione mirata all'inserimento lavorativo - Asse 1 bis PON Iniziativa Occupazione Giovani, Fase 2 - DDRN. 6043",
        cup: 'CUP G51B21004610006',
      },
    ],
  },
  {
    ente: 'AGEA C.F. 97181460581',
    righe: [
      {
        data: '04/04/2023',
        importo: '€ 39.432,00',
        titolo: 'PRS MISURA 1.1 2B Sostegno ad azioni di formazione professionale ed acquisizione di competenze del PSR Sicilia 2014-2020',
        cup: 'CUP G57C19000170009',
      },
    ],
  },
  {
    ente: 'Regione Siciliana C.F. 80012000826',
    righe: [
      {
        data: '28/09/2023',
        importo: '€ 23.100,80',
        titolo: 'FEAMP 1.29 Promozione capitale umano, creazione posti di lavoro e dialogo sociale',
        cup: 'CUP G54D23001020009 SIPA 04/CLS/23',
      },
      {
        data: '29/09/2023',
        importo: '€ 64.800,00',
        titolo: "PO FSE 2014-2020, Azione 9.3.7: Avviso 29/2019 per la realizzazione di percorsi per la formazione di assistenti familiari – IN SICILIA SI-CURA",
        cup: 'CIP 2014.IT.05.SFOP.014/2/9.2/7.1.1/0185 – CUP 59D20000270006',
      },
      {
        data: '29/09/2023',
        importo: '€ 38.800,00',
        titolo: "PO FSE 2014-2020, Azione 9.3.7: Avviso 29/2019 per la realizzazione di percorsi per la formazione di assistenti familiari – IN SICILIA SI-CURA",
        cup: 'CIP 2014.IT.05.SFOP.014/2/9.2/7.1.1/0185 – CUP 59D20000270006',
      },
    ],
  },
];

function TabellaEnte({ ente, righe }) {
  return (
    <div className="mb-10">
      <p className="text-gray-700 dark:text-gray-200 font-semibold mb-3">
        La società Aletheia srl C.F. 01524530894 (soggetto ricevente), nell&apos;anno 2023, ha ricevuto da{' '}
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

export default function AiutiDiStato2023() {
  return (
    <>
      <Head>
        <title>Obblighi di pubblicazione per i beneficiari di contributi 2023 | Alètheia S.r.l.</title>
      </Head>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-40 pb-24">
          <span className="text-primary dark:text-[#10B981] font-bold text-xs tracking-widest uppercase mb-4 block">
            Trasparenza
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
            Obblighi di pubblicazione per i beneficiari di contributi 2023
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

          {ENTI.map((e, i) => (
            <TabellaEnte key={i} ente={e.ente} righe={e.righe} />
          ))}

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            La società Aletheia srl C.F. 01524530894 ha beneficiato nell&apos;anno 2023 della riduzione dei
            contributi previdenziali dovuti all&apos;INPS C.F. 80078750587 di € 11.676,52 per decontribuzione sud e
            di € 6.772,89 per decontribuzione under 36.
          </p>

          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Per gli altri aiuti ricevuti dalla società si rinvia al registro nazionale per gli aiuti di stato.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
