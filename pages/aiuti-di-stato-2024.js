import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ENTI = [
  {
    ente: "ASSESSORATO REGIONALE FAMIGLIA-POLITICHE SOCIALI E LAVORO - C.F. 80012000826",
    righe: [
      {
        data: '23/09/2024',
        importo: '€ 500,00',
        titolo: "Avviso n. 4/2020 - Misura 5 - Formazione mirata all'inserimento lavorativo - Asse 1 bis PON Iniziativa Occupazione Giovani, Fase 2",
        cup: 'CUP - G41B21007210006',
      },
      {
        data: '23/09/2024',
        importo: '€ 2.000,00',
        titolo: "Avviso n. 4/2020 - Misura 5 - Formazione mirata all'inserimento lavorativo - Asse 1 bis PON Iniziativa Occupazione Giovani, Fase 2",
        cup: 'CUP - G51B21004950006',
      },
      {
        data: '04/10/2024',
        importo: '€ 284,00',
        titolo: "Avviso n. 2/2020 - Misura 1C - Formazione mirata all'inserimento lavorativo - Asse 1 bis PON Iniziativa Occupazione Giovani, Fase 2",
        cup: 'CUP - G51B21004410006',
      },
      {
        data: '13/11/2024',
        importo: '€ 3.195,20',
        titolo: 'Avviso n. 1/2022 - Programma GOL - Corrispettivi per servizi di orientamento specialistico',
        cup: 'CUP: G61D22000260001',
      },
      {
        data: '06/12/2024',
        importo: '€ 29.395,84',
        titolo: 'Avviso n. 1/2022 - Programma GOL - Corrispettivi per servizi di orientamento specialistico',
        cup: 'CUP: G61D22000260001',
      },
    ],
  },
  {
    ente: 'AGEA C.F. 97181460581',
    righe: [
      {
        data: '19/04/2024',
        importo: '€ 2.361,60',
        titolo: 'PRS MISURA 1.1 2B Sostegno ad azioni di formazione professionale ed acquisizione di competenze del PSR Sicilia 2014-2020',
        cup: 'CUP G57C19000170009',
      },
      {
        data: '19/04/2024',
        importo: '€ 30.092,00',
        titolo: 'PRS MISURA 1.1 2A Sostegno ad azioni di formazione professionale ed acquisizione di competenze del PSR Sicilia 2014-2020',
        cup: 'CUP G57C19000150009',
      },
    ],
  },
  {
    ente: 'Regione Siciliana – Dipartimento Formazione Professionale C.F. 80012000826',
    righe: [
      {
        data: '12/08/2024',
        importo: '€ 55.559,70',
        titolo: 'Avviso n.7 2023 PR FSE+ Sicilia 2021/2027 Costituzione Catalogo Regionale dell’Offerta Formativa e correlata realizzazione di percorsi formativi di qualificazione mirati al rafforzamento dell’occupabilità in Sicilia - Corso: OPERATORE INFORMATICO DI RISORSE WEB',
        cup: 'CS3142-ED6982 - CIP2021.IT.05.SFPR.014/002/04.7/09.01.04/AVV_07/229 - CUP G51J24000440006',
      },
      {
        data: '12/08/2024',
        importo: '€ 73.756,67',
        titolo: 'Avviso n.7 2023 PR FSE+ Sicilia 2021/2027 Costituzione Catalogo Regionale dell’Offerta Formativa e correlata realizzazione di percorsi formativi di qualificazione mirati al rafforzamento dell’occupabilità in Sicilia - Corso: ADDETTO AMMINISTRATIVO SEGRETARIALE',
        cup: 'CS3131-ED6959 - CIP2021.IT.05.SFPR.014/002/04.7/09.01.04/AVV_07/411 - CUP G51J24000430006',
      },
      {
        data: '12/08/2024',
        importo: '€ 64.778,70',
        titolo: 'Avviso n.7 2023 PR FSE+ Sicilia 2021/2027 Costituzione Catalogo Regionale dell’Offerta Formativa e correlata realizzazione di percorsi formativi di qualificazione mirati al rafforzamento dell’occupabilità in Sicilia - Corso: OPERATORE DELLE CONFEZIONI /SARTO CONFEZIONISTA',
        cup: 'CS3174-ED7050 - CIP2021.IT.05.SFPR.014/002/04.7/09.01.04/AVV_07/531 - CUP G51J24000450006',
      },
      {
        data: '12/08/2024',
        importo: '€ 69.839,96',
        titolo: 'Avviso n.7 2023 PR FSE+ Sicilia 2021/2027 Costituzione Catalogo Regionale dell’Offerta Formativa e correlata realizzazione di percorsi formativi di qualificazione mirati al rafforzamento dell’occupabilità in Sicilia - Corso: ADDETTO AMMINISTRATIVO SEGRETARIALE',
        cup: 'CS3131-ED15256 - CIP2021.IT.05.SFPR.014/002/04.7/09.01.04/AVV_07/355 - CUP G51J24000410006',
      },
      {
        data: '12/08/2024',
        importo: '€ 95.606,70',
        titolo: 'Avviso n.7 2023 PR FSE+ Sicilia 2021/2027 Costituzione Catalogo Regionale dell’Offerta Formativa e correlata realizzazione di percorsi formativi di qualificazione mirati al rafforzamento dell’occupabilità in Sicilia - Corso: ASSISTENTE ALL\'AUTONOMIA ED ALLA COMUNICAZIONE DEI DISABILI',
        cup: 'CS3107-ED6840 - CIP2021.IT.05.SFPR.014/002/04.7/09.01.04/AVV_07/123 - CUP G51J24000420006',
      },
    ],
  },
];

function TabellaEnte({ ente, righe }) {
  return (
    <div className="mb-10">
      <p className="text-gray-700 dark:text-gray-200 font-semibold mb-3">
        La società Aletheia srl C.F. 01524530894 (soggetto ricevente), nell&apos;anno 2024, ha ricevuto da{' '}
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

export default function AiutiDiStato2024() {
  return (
    <>
      <Head>
        <title>Obblighi di pubblicazione per i beneficiari di contributi 2024 | Alètheia S.r.l.</title>
      </Head>
      <Header />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <section className="max-w-4xl mx-auto px-6 sm:px-12 pt-40 pb-24">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-xs tracking-widest uppercase mb-4 block">
            Trasparenza
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50 mb-4">
            Obblighi di pubblicazione per i beneficiari di contributi 2024
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

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            La società Aletheia srl C.F. 01524530894 ha beneficiato nell&apos;anno 2024 della riduzione dei
            contributi previdenziali dovuti all&apos;INPS C.F. 80078750587 di € 12.393,90 per decontribuzione sud, di
            € 500,00 per decontribuzione under 36, € 10.349,61 per esonero giovani assunzioni/trasformazione
            contratti a tempo indeterminato ed € 4.055,33 per esonero contributivo in favore di lavoratrici madri.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Ha inoltre ricevuto in data 14/08/2024 € 8.626,89 come saldo per Contributo fondo nuove Competenze.
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
