import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PricingSidebar from '../../components/PricingSidebar';
import CourseSchedaTecnica from '../../components/CourseSchedaTecnica';
import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { coursesData } from '../../data/coursesRaw';
import { buildCourseFamilies, resolveRelatedCourse } from '../../data/courseFamilies';
import antincendioContent from '../../data/content/antincendio-content';
import antincendioAggiornamentoContent from '../../data/content/antincendio-aggiornamento-content';
import carrelliElevatoriContent from '../../data/content/carrelli-elevatori-content';
import carrelliElevatoriAggiornamentoContent from '../../data/content/carrelli-elevatori-aggiornamento-content';
import trattoriAgricoliContent from '../../data/content/trattori-agricoli-content';
import trattoriAgricoliAggiornamentoContent from '../../data/content/trattori-agricoli-aggiornamento-content';
import formazioneDirigenteContent from '../../data/content/formazione-dirigente-content';
import formazioneDirigenteAggiornamentoContent from '../../data/content/formazione-dirigente-aggiornamento-content';
import formazioneLavoratoriContent from '../../data/content/formazione-lavoratori-content';
import formazioneLavoratoriAggiornamentoContent from '../../data/content/formazione-lavoratori-aggiornamento-content';
import lavoriInQuotaContent from '../../data/content/lavori-in-quota-content';
import lavoriInQuotaAggiornamentoContent from '../../data/content/lavori-in-quota-aggiornamento-content';
import pimusPonteggiContent from '../../data/content/pimus-ponteggi-content';
import pimusPonteggiAggiornamentoContent from '../../data/content/pimus-ponteggi-aggiornamento-content';
import primoSoccorsoContent from '../../data/content/primo-soccorso-content';
import primoSoccorsoAggiornamentoContent from '../../data/content/primo-soccorso-aggiornamento-content';
import rlsContent from '../../data/content/rls-content';
import rlsAggiornamentoContent from '../../data/content/rls-aggiornamento-content';
import rsppDatoreLavoroContent from '../../data/content/rspp-datore-lavoro-content';
import rsppDatoreLavoroAggiornamentoContent from '../../data/content/rspp-datore-lavoro-aggiornamento-content';
import rsppAsppContent from '../../data/content/rspp-aspp-content';
import rsppAsppAggiornamentoContent from '../../data/content/rspp-aspp-aggiornamento-content';

// Registro dei contenuti editoriali completi (descrizione/FAQ/moduli) per famiglia, separati per tipo
// ("corso" vs "aggiornamento", perché i due materiali sono scritti/pubblicati in tempi diversi).
// Nuove famiglie/varianti vanno aggiunte qui con lo stesso pattern.
const EDITORIAL_CONTENT = {
  antincendio: {
    corso: antincendioContent.antincendio,
    aggiornamento: antincendioAggiornamentoContent,
  },
  'carrelli-elevatori-semoventi-con-conduttore-a-bordo': {
    corso: carrelliElevatoriContent['carrelli-elevatori-semoventi-con-conduttore-a-bordo'],
    aggiornamento: carrelliElevatoriAggiornamentoContent,
  },
  // Famiglia "Trattoristi": un'unica pagina con switch Ruote / Cingoli / Ruote e Cingoli / Aggiornamento.
  // Le chiavi 'livello-1'..'livello-4' dentro trattori-agricoli-content.js/-aggiornamento-content.js sono
  // posizionali (stesso ordine delle 4 voci raw in data/coursesRaw.js), non semantiche - vedi il commento
  // su editorialLivelloKey più sotto.
  'trattori-agricoli-o-forestali': {
    corso: trattoriAgricoliContent['trattori-agricoli-o-forestali'],
    aggiornamento: trattoriAgricoliAggiornamentoContent,
  },
  // Famiglia "formazione-dirigente": già raggruppata automaticamente da buildCourseFamilies (pattern
  // "modulo comune" esistente in LEVEL_PATTERNS) - un'unica pagina con switch Corso/Aggiornamento.
  'formazione-dirigente': {
    corso: formazioneDirigenteContent['formazione-dirigente'],
    aggiornamento: formazioneDirigenteAggiornamentoContent,
  },
  // Famiglia "formazione-dei-lavoratori": già raggruppata automaticamente da buildCourseFamilies in 5
  // varianti (Parte Generale/Basso/Medio/Alto/Aggiornamento) - un'unica pagina con switch a 5 opzioni.
  'formazione-dei-lavoratori': {
    corso: formazioneLavoratoriContent['formazione-dei-lavoratori'],
    aggiornamento: formazioneLavoratoriAggiornamentoContent,
  },
  // Famiglia "lavori-in-quota": già raggruppata automaticamente da buildCourseFamilies (livelloKey
  // 'default' condivisa) - un'unica pagina con switch a pillola Corso/Aggiornamento.
  'lavori-in-quota': {
    corso: lavoriInQuotaContent['lavori-in-quota'],
    aggiornamento: lavoriInQuotaAggiornamentoContent,
  },
  // Famiglia "pimus-ponteggi": già raggruppata automaticamente da buildCourseFamilies (livelloKey
  // 'default' condivisa) - un'unica pagina con switch a pillola Corso/Aggiornamento.
  'pimus-ponteggi': {
    corso: pimusPonteggiContent['pimus-ponteggi'],
    aggiornamento: pimusPonteggiAggiornamentoContent,
  },
  // Famiglia "primo-soccorso-aziendale": già raggruppata automaticamente da buildCourseFamilies in 2
  // livelli (Gruppo A, Gruppo B E C), ciascuno con switch nidificato Corso/Aggiornamento - stesso
  // pattern di "antincendio" (che ha 3 livelli anziché 2).
  'primo-soccorso-aziendale': {
    corso: primoSoccorsoContent['primo-soccorso-aziendale'],
    aggiornamento: primoSoccorsoAggiornamentoContent,
  },
  // Famiglia "rls": già raggruppata automaticamente da buildCourseFamilies in 3 livelli a variante
  // unica (corso base 32h + 2 aggiornamenti annuali <50/>50 dipendenti, nessuno annidato con
  // corso/aggiornamento sullo stesso livello) - un'unica pagina con switch a 3 opzioni.
  rls: {
    corso: rlsContent.rls,
    aggiornamento: rlsAggiornamentoContent,
  },
  // Famiglia "rspp-datore-di-lavoro": già raggruppata automaticamente da buildCourseFamilies in 6
  // livelli a variante unica (Modulo Comune + 4 moduli settoriali, tutti tipo 'corso', + Aggiornamento
  // generico tipo 'aggiornamento') - un'unica pagina con switch a 6 opzioni.
  'rspp-datore-di-lavoro': {
    corso: rsppDatoreLavoroContent['rspp-datore-di-lavoro'],
    aggiornamento: rsppDatoreLavoroAggiornamentoContent,
  },
  // Famiglia "rspp-aspp" (RSPP/ASPP Esterno): già raggruppata automaticamente da buildCourseFamilies
  // in 4 livelli a variante unica (Modulo A/B/C tipo 'corso' + Aggiornamento tipo 'aggiornamento') -
  // un'unica pagina con switch a 4 opzioni.
  'rspp-aspp': {
    corso: rsppAsppContent['rspp-aspp'],
    aggiornamento: rsppAsppAggiornamentoContent,
  },
};

// Dettagli editoriali completi per famiglia di corso (overview, curriculum, instructor, prezzi per variante)
export const coursesDetails = {
  // FORMAZIONE OBBLIGATORIA
  'decreto-attrezzature': {
    title: 'Decreto Attrezzature',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '16 ore',
    modality: 'Aula / Online',
    price: '€ 250,00',
    priceVariants: [
      { label: 'Carrelli Elevatori Nuovo 12H', amount: 180 },
      { label: 'Carrelli Elevatori Aggiornamento 4H', amount: 100 },
      { label: 'PLE con/senza stabilizzatori 10H', amount: 170 },
      { label: 'PLE Aggiornamento 4H', amount: 90 },
      { label: 'Gru su autocarro Nuovo 12H', amount: 220 },
      { label: 'Gru Aggiornamento 4H', amount: 100 },
      { label: 'Macchine Movimento Terra 10-16H', amount: 220 },
      { label: 'MMT Aggiornamento 4H', amount: 100 },
      { label: 'Trattori Agricoli 8H', amount: 160 },
      { label: 'Trattori Aggiornamento 4H', amount: 90 },
      { label: 'Pompe Calcestruzzo 14H', amount: 240 },
      { label: 'Pompe Aggiornamento 4H', amount: 100 },
    ],
    level: 'Base - Intermedio',
    lessons: '6 moduli',
    students: '150+',
    target: 'Operatori che utilizzano attrezzature di lavoro',
    overview: 'Il corso "Decreto Attrezzature" fornisce la formazione obbligatoria per l\'utilizzo sicuro delle attrezzature di lavoro come previsto dal D.Lgs. 81/08.',
    curriculum: [
      { week: 1, title: 'Fondamenti e Normativa', hours: 4, lessons: ['Introduzione al D.Lgs. 81/08', 'Accordo Stato-Regioni', 'Responsabilità', 'Obblighi formativi'] },
      { week: 2, title: 'Tipologie di Attrezzature', hours: 4, lessons: ['Classificazione', 'Caratteristiche tecniche', 'Dispositivi di sicurezza', 'Manutenzione'] },
      { week: 3, title: 'Procedure di Sicurezza', hours: 4, lessons: ['Procedure operative', 'Gestione rischi', 'Segnaletica', 'DPI'] },
      { week: 4, title: 'Esercitazioni Pratiche', hours: 4, lessons: ['Esercitazione pratica', 'Simulazioni', 'Verifica teorica', 'Prova pratica'] }
    ],
    learningOutcomes: ['Conoscere normativa D.Lgs. 81/08', 'Utilizzare attrezzature in sicurezza', 'Eseguire controlli', 'Ottenere patentino']
  },
  'sicurezza-sul-lavoro': {
    title: 'Sicurezza sul Lavoro',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '8 ore',
    modality: 'Aula / Online',
    price: 'Gratuito',
    level: 'Base',
    lessons: '6 moduli',
    students: '2.500+',
    target: 'Lavoratori, RLS, RSPP',
    overview: 'Corso di Sicurezza sul Lavoro conforme al D.Lgs. 81/08. Copre prevenzione incendi, primo soccorso e gestione emergenze.',
    curriculum: [
      { week: 1, title: 'Principi di Sicurezza', hours: 4, lessons: ['Concetti fondamentali', 'Cultura della prevenzione', 'Soggetti coinvolti', 'Diritti e doveri'] },
      { week: 2, title: 'Gestione Emergenze', hours: 4, lessons: ['Prevenzione incendi', 'Procedure evacuazione', 'Primo soccorso', 'Emergenze sanitarie'] }
    ],
    learningOutcomes: ['Conoscere principi sicurezza', 'Identificare rischi', 'Gestire emergenze', 'Applicare procedure']
  },
  'fitosanitario': {
    title: 'Fitosanitario',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '16 ore',
    modality: 'Aula',
    price: '€ 300,00',
    level: 'Base',
    lessons: '8 moduli',
    students: '800+',
    target: 'Agricoltori, giardinieri, vivaisti',
    overview: 'Corso per patentino fitosanitario obbligatorio D.Lgs. 150/2012 per uso corretto dei prodotti fitosanitari.',
    curriculum: [
      { week: 1, title: 'Normativa', hours: 4, lessons: ['D.Lgs. 150/2012', 'Regolamento UE', 'Obblighi', 'Sanzioni'] },
      { week: 2, title: 'Prodotti fitosanitari', hours: 4, lessons: ['Classificazione', 'Etichettatura', 'Modalità d\'uso', 'Fasi fenologiche'] },
      { week: 3, title: 'Sicurezza e ambiente', hours: 4, lessons: ['Protezione operatore', 'Protezione ambiente', 'Smaltimento rifiuti', 'Emergenze'] },
      { week: 4, title: 'Esame finale', hours: 4, lessons: ['Ripasso', 'Simulazione', 'Prova teorica', 'Rilascio patentino'] }
    ],
    learningOutcomes: ['Conoscere normativa', 'Usare correttamente prodotti', 'Proteggere ambiente', 'Ottenere patentino']
  },
  'sicurezza-alimentare': {
    title: 'Sicurezza alimentare',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '8 ore',
    modality: 'Aula / Online',
    price: '€ 150,00',
    priceVariants: [
      { label: 'Nuovo 12H (Aula)', amount: 80 },
      { label: 'Nuovo 12H (FAD)', amount: 70 },
      { label: 'Aggiornamento 6H (Aula)', amount: 60 },
      { label: 'Aggiornamento 6H (FAD)', amount: 50 },
    ],
    level: 'Base',
    lessons: '6 moduli',
    students: '2.000+',
    target: 'Operatori settore alimentare',
    overview: 'Corso HACCP per corretta gestione igienico-sanitaria degli alimenti.',
    curriculum: [
      { week: 1, title: 'Principi di igiene', hours: 4, lessons: ['Normativa HACCP', 'Contaminazione', 'Microorganismi', 'Allergeni'] },
      { week: 2, title: 'Gestione sicurezza', hours: 4, lessons: ['Pulizia e sanificazione', 'Conservazione', 'Tracciabilità', 'Procedure HACCP'] }
    ],
    learningOutcomes: ['Conoscere HACCP', 'Gestire sicurezza alimentare', 'Prevenire contaminazioni', 'Ottenere certificazione']
  },
  // FORMAZIONE REGIONALE FSE
  'avviso-20-2024-fse': {
    title: 'FSE',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    category: 'Formazione Regionale FSE',
    duration: '300 ore',
    modality: 'Aula + Stage',
    price: '100% Finanziato',
    level: 'Base',
    lessons: '10 moduli',
    students: '500+',
    target: 'Giovani e adulti disoccupati',
    overview: 'Percorso formativo finanziato dal Fondo Sociale Europeo Plus per l\'inserimento lavorativo.',
    curriculum: [
      { week: 1, title: 'Competenze base', hours: 80, lessons: ['Competenze trasversali', 'Ricerca lavoro', 'Informatica', 'Comunicazione'] },
      { week: 2, title: 'Formazione specialistica', hours: 100, lessons: ['Tecniche di settore', 'Laboratori', 'Progetti', 'Soft skills'] },
      { week: 3, title: 'Stage', hours: 120, lessons: ['Inserimento azienda', 'Tutoraggio', 'Valutazione', 'Report finale'] }
    ],
    learningOutcomes: ['Acquisire competenze', 'Stage in azienda', 'Certificazione competenze', 'Inserimento lavorativo']
  },
  'fondi-interprofessionali': {
    title: 'Fondi Interprofessionali',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80',
    category: 'Formazione Regionale FSE',
    duration: '40 ore',
    modality: 'Online / Aula',
    price: '100% Finanziato',
    level: 'Base',
    lessons: '8 moduli',
    students: '500+',
    target: 'Lavoratori e imprese',
    overview: 'Formazione finanziata dai Fondi Interprofessionali per la formazione continua dei lavoratori.',
    curriculum: [
      { week: 1, title: 'Introduzione', hours: 8, lessons: ['Cosa sono i Fondi', 'Come funziona', 'Beneficiari', 'Tipologie corsi'] },
      { week: 2, title: 'Pianificazione', hours: 12, lessons: ['Analisi bisogni', 'Progettazione', 'Gestione', 'Rendicontazione'] },
      { week: 3, title: 'Aree tematiche', hours: 12, lessons: ['Sicurezza', 'Competenze digitali', 'Lingue', 'Management'] },
      { week: 4, title: 'Monitoraggio', hours: 8, lessons: ['Strumenti', 'Valutazione', 'Report', 'Certificazione'] }
    ],
    learningOutcomes: ['Conoscere i Fondi', 'Pianificare corsi', 'Gestire rendicontazione', 'Ottenere finanziamenti']
  },
  'misura-psr-1-2': {
    title: 'PSR',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    category: 'Formazione Regionale FSE',
    duration: '250 ore',
    modality: 'Aula + Azienda',
    price: 'Finanziato PSR',
    level: 'Base',
    lessons: '10 moduli',
    students: '300+',
    target: 'Operatori settore agricolo',
    overview: 'Corso finanziato dal PSR Sicilia per sviluppo agricolo e rurale.',
    curriculum: [
      { week: 1, title: 'Tecniche agricole', hours: 80, lessons: ['Tecniche moderne', 'Gestione risorse', 'Marketing', 'Normative'] },
      { week: 2, title: 'Innovazione', hours: 80, lessons: ['Agricoltura 4.0', 'Sostenibilità', 'Certificazioni', 'Digitalizzazione'] },
      { week: 3, title: 'Stage', hours: 90, lessons: ['Stage in azienda', 'Tutoraggio', 'Valutazione'] }
    ],
    learningOutcomes: ['Tecniche agricole', 'Gestione sostenibile', 'Marketing prodotti', 'Innovazione']
  },
  'fondo-nuove-competenze': {
    title: 'Fondo Nuove Competenze',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
    category: 'Formazione Regionale FSE',
    duration: '60 ore',
    modality: 'Online / Aula',
    price: '100% Finanziato',
    level: 'Base - Avanzato',
    lessons: '10 moduli',
    students: '300+',
    target: 'Lavoratori e aziende',
    overview: 'Fondo Nuove Competenze per sviluppo competenze nell\'innovazione e transizione digitale ed ecologica.',
    curriculum: [
      { week: 1, title: 'Il Fondo', hours: 10, lessons: ['Cos\'è', 'Normativa', 'Requisiti', 'Tempistiche'] },
      { week: 2, title: 'Competenze innovative', hours: 15, lessons: ['Competenze digitali', 'Green skills', 'Innovazione', 'Gestione cambiamento'] },
      { week: 3, title: 'Progettazione', hours: 15, lessons: ['Fabbisogni', 'Progettazione', 'Erogazione', 'Monitoraggio'] },
      { week: 4, title: 'Gestione', hours: 10, lessons: ['Documentazione', 'Rendicontazione', 'Verifiche', 'Chiusura'] }
    ],
    learningOutcomes: ['Conoscere il Fondo', 'Accedere finanziamenti', 'Progettare percorsi', 'Gestire rendicontazione']
  },
  // FORMAZIONE PROFESSIONALE
  'ecdl-icdl-full-standard': {
    title: 'ICDL',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '50 ore',
    modality: 'Online / In sede',
    price: '€ 350,00',
    priceVariants: [
      { label: 'ICDL Base (4 moduli)', amount: 180 },
      { label: 'ICDL Standard (5 moduli)', amount: 220 },
      { label: 'ICDL Full Standard (7 moduli tutto incluso)', amount: 270 },
      { label: 'ICDL DigComp 2.2', amount: 160 },
      { label: 'ICDL Update', amount: 100 },
    ],
    level: 'Base - Avanzato',
    lessons: '7 moduli',
    students: '1.200+',
    target: 'Studenti, professionisti',
    overview: 'Certificazione internazionale ICDL per competenze digitali.',
    curriculum: [
      { week: 1, title: 'Computer Essentials', hours: 10, lessons: ['Hardware', 'Software', 'Sistemi operativi', 'Gestione file'] },
      { week: 2, title: 'Online Essentials', hours: 10, lessons: ['Navigazione web', 'Email', 'Calendario', 'Cloud'] },
      { week: 3, title: 'Word Processing', hours: 8, lessons: ['Documenti', 'Tabelle', 'Immagini', 'Stampa'] },
      { week: 4, title: 'Spreadsheets', hours: 12, lessons: ['Fogli calcolo', 'Formule', 'Grafici', 'Pivot'] },
      { week: 5, title: 'Presentation', hours: 10, lessons: ['Slide', 'Animazioni', 'Multimedia', 'Presentazioni'] }
    ],
    learningOutcomes: ['Competenze digitali', 'Utilizzo Office', 'Sicurezza online', 'Certificazione internazionale']
  },
  'formazione-continua': {
    title: 'Formazione continua',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80',
    category: 'Formazione Professionale',
    duration: 'Variabile',
    modality: 'Online / Aula',
    price: '€ 500 - € 2.000',
    level: 'Tutti i livelli',
    lessons: 'Percorso personalizzato',
    students: '1.000+',
    target: 'Professionisti',
    overview: 'Corsi modulari per aggiornare competenze professionali.',
    curriculum: [{ week: 1, title: 'Moduli personalizzabili', hours: 0, lessons: ['Competenze digitali', 'Lingue', 'Management', 'Leadership', 'Comunicazione'] }],
    learningOutcomes: ['Aggiornare competenze', 'Crediti formativi', 'Crescita professionale', 'Opportunità carriera']
  },
  'corsi-qualificati': {
    title: 'Corsi qualificati e Certificazione competenze',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '100-500 ore',
    modality: 'Aula + Stage',
    price: '€ 1.500 - € 5.000',
    level: 'Specialistico',
    lessons: 'Varie',
    students: '800+',
    target: 'Professionisti',
    overview: 'Percorsi accreditati Regione Siciliana per qualifiche professionali.',
    curriculum: [
      { week: 1, title: 'Teoria', hours: 60, lessons: ['Nozioni fondamentali', 'Approfondimenti', 'Casi pratici', 'Simulazioni'] },
      { week: 2, title: 'Laboratori', hours: 80, lessons: ['Esercitazioni', 'Progetti', 'Gruppi', 'Feedback'] },
      { week: 3, title: 'Stage', hours: 120, lessons: ['Inserimento', 'Attività', 'Tutoraggio', 'Valutazione'] },
      { week: 4, title: 'Esame', hours: 40, lessons: ['Preparazione', 'Teoria', 'Pratica', 'Rilascio qualifica'] }
    ],
    learningOutcomes: ['Competenze professionali', 'Qualifica riconosciuta', 'Certificazione', 'Occupabilità']
  },
  'corsi-pa': {
    title: 'Corsi per la PA',
    image: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '20-100 ore',
    modality: 'Online / Aula',
    price: 'Convenzioni PA',
    level: 'Base - Avanzato',
    lessons: 'Varie',
    students: '500+',
    target: 'Dipendenti PA',
    overview: 'Formazione specifica per dipendenti della Pubblica Amministrazione.',
    curriculum: [
      { week: 1, title: 'Diritto amministrativo', hours: 20, lessons: ['Principi', 'Procedimento', 'Trasparenza', 'Responsabilità'] },
      { week: 2, title: 'Digitalizzazione', hours: 20, lessons: ['Processi digitali', 'Documenti informatici', 'Firma digitale', 'PEC'] },
      { week: 3, title: 'Appalti', hours: 20, lessons: ['Codice contratti', 'Procedure', 'Affidamenti', 'Esecuzione'] }
    ],
    learningOutcomes: ['Normative PA', 'Processi digitali', 'Procedure amministrative', 'Efficienza']
  },
  'corso-di-cucina': {
    title: 'Corso di Cucina Professionale',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '576 ore',
    modality: 'Laboratorio',
    price: '€ 3.500,00',
    level: 'Professionale',
    lessons: '12 moduli',
    students: '500+',
    target: 'Aspiranti chef',
    overview: 'Percorso completo di cucina professionale con qualifica.',
    curriculum: [
      { week: 1, title: 'Tecniche base', hours: 120, lessons: ['Tagli', 'Cotture', 'Pulizia', 'Organizzazione'] },
      { week: 2, title: 'Cucina avanzata', hours: 120, lessons: ['Secondi', 'Contorni', 'Salse', 'Impiattamento'] },
      { week: 3, title: 'Pasticceria', hours: 120, lessons: ['Dolci', 'Creme', 'Lievitati', 'Decorazione'] },
      { week: 4, title: 'Stage', hours: 216, lessons: ['Stage ristorante', 'Tutoraggio', 'Valutazione'] }
    ],
    learningOutcomes: ['Tecniche professionali', 'Gestione cucina', 'Stage', 'Qualifica']
  },
  'addetto-panificatore-pasticciere': {
    title: 'Addetto Panificatore e Pasticciere',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '644 ore',
    modality: 'Laboratorio',
    price: '€ 3.800,00',
    level: 'Professionale',
    lessons: '12 moduli',
    students: '400+',
    target: 'Aspiranti panificatori',
    overview: 'Corso completo per panificatore e pasticciere.',
    curriculum: [
      { week: 1, title: 'Panificazione', hours: 160, lessons: ['Impasti', 'Lievitazione', 'Cottura', 'Conservazione'] },
      { week: 2, title: 'Pasticceria', hours: 160, lessons: ['Dolci classici', 'Creme', 'Decorazioni', 'Cioccolato'] },
      { week: 3, title: 'Laboratorio', hours: 160, lessons: ['Produzione', 'Allestimento', 'Vendita', 'Gestione'] },
      { week: 4, title: 'Stage', hours: 164, lessons: ['Stage', 'Tutoraggio', 'Valutazione'] }
    ],
    learningOutcomes: ['Tecniche panificazione', 'Tecniche pasticceria', 'Stage', 'Qualifica']
  },
  'conduttore-impresa-agricola': {
    title: 'Conduttore d\'Impresa Agricola',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80',
    category: 'Settore Agricolo',
    duration: '200 ore',
    modality: 'Aula + Azienda',
    price: 'Finanziato PSR',
    level: 'Professionale',
    lessons: '8 moduli',
    students: '300+',
    target: 'Imprenditori agricoli',
    overview: 'Corso per conduttore d\'impresa agricola finanziato PSR.',
    curriculum: [
      { week: 1, title: 'Gestione', hours: 50, lessons: ['Amministrazione', 'Marketing', 'Normative', 'Sostenibilità'] },
      { week: 2, title: 'Tecniche', hours: 50, lessons: ['Tecniche innovative', 'Digitalizzazione', 'Biologico', 'Certificazioni'] },
      { week: 3, title: 'Stage', hours: 100, lessons: ['Stage azienda', 'Tutoraggio', 'Valutazione'] }
    ],
    learningOutcomes: ['Gestione azienda', 'Tecniche innovative', 'Marketing', 'Finanziamenti']
  },
  'programma-gol': {
    title: 'Programma G.O.L.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80',
    category: 'Programma GOL',
    duration: '80 ore',
    modality: 'Aula / Online',
    price: 'Gratuito',
    level: 'Base',
    lessons: '8 moduli',
    students: '1.000+',
    target: 'Lavoratori disoccupati',
    overview: 'Programma Garanzia Occupabilità Lavoratori per inserimento lavorativo.',
    curriculum: [
      { week: 1, title: 'Orientamento', hours: 20, lessons: ['Bilancio competenze', 'Orientamento', 'Piano personalizzato', 'Obiettivi'] },
      { week: 2, title: 'Formazione', hours: 40, lessons: ['Competenze', 'Formazione mirata', 'Tutoraggio', 'Supporto'] },
      { week: 3, title: 'Placement', hours: 20, lessons: ['Incontri aziende', 'Colloqui', 'Sostegno', 'Inserimento'] }
    ],
    learningOutcomes: ['Bilancio competenze', 'Formazione', 'Tutoraggio', 'Inserimento lavorativo']
  },
  'antincendio': {
    title: 'Antincendio',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '4-16 ore',
    modality: 'Aula / FAD / Videoconferenza',
    price: 'Da € 60,00',
    priceVariants: [
      { label: 'Livello 1 Nuovo 4H', amount: 90 },
      { label: 'Livello 1 Aggiornamento 2H', amount: 60 },
      { label: 'Livello 2 Nuovo 8H', amount: 150 },
      { label: 'Livello 2 Aggiornamento 5H', amount: 100 },
      { label: 'Livello 3 Nuovo 16H', amount: 200 },
      { label: 'Livello 3 Aggiornamento 8H', amount: 120 },
    ],
    level: 'Base',
    lessons: '3 livelli di rischio',
    students: '3.000+',
    target: 'Datori di lavoro e lavoratori designati alla gestione delle emergenze antincendio',
    overview: 'Il corso antincendio è obbligatorio per i lavoratori designati dal datore di lavoro alla prevenzione incendi, lotta antincendio e gestione delle emergenze, ai sensi del D.M. 02/09/2021. I corsi sono differenziati in tre livelli in base al rischio dell\'attività lavorativa: Livello 1 (rischio basso), Livello 2 (rischio medio), Livello 3 (rischio alto). L\'aggiornamento è obbligatorio ogni 5 anni.',
    curriculum: [
      { week: 1, title: 'L\'incendio e la prevenzione', hours: 2, lessons: ['Principi della combustione', 'Sostanze estinguenti', 'Cause di incendio', 'Rischi per le persone'] },
      { week: 2, title: 'Strategia antincendio', hours: 3, lessons: ['Reazione al fuoco', 'Compartimentazione', 'Vie di esodo', 'Sistemi di allarme'] },
      { week: 3, title: 'Gestione dell\'emergenza', hours: 1, lessons: ['Procedure in caso di incendio', 'Evacuazione', 'Rapporti con i VVF', 'Piano di emergenza'] },
      { week: 4, title: 'Esercitazioni pratiche', hours: 3, lessons: ['Uso estintori portatili', 'Naspi e idranti', 'DPI antincendio', 'Registro antincendio'] },
    ],
    learningOutcomes: ['Conoscere i principi della combustione', 'Utilizzare correttamente gli estintori', 'Gestire l\'evacuazione in emergenza', 'Ottenere attestato valido su tutto il territorio nazionale'],
  },
  'primo-soccorso-aziendale': {
    title: 'Primo Soccorso Aziendale',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '12-16 ore',
    modality: 'Aula',
    price: 'Da € 80,00',
    priceVariants: [
      { label: 'Gruppo A Nuovo 16H', amount: 170 },
      { label: 'Gruppo A Aggiornamento 6H', amount: 100 },
      { label: 'Gruppo B/C Nuovo 12H', amount: 140 },
      { label: 'Gruppo B/C Aggiornamento 4H', amount: 80 },
    ],
    level: 'Base',
    lessons: '2 categorie aziendali',
    students: '2.500+',
    target: 'Lavoratori designati come addetti alla squadra di primo soccorso aziendale',
    overview: 'Il corso di Primo Soccorso Aziendale è obbligatorio per i lavoratori designati dal datore di lavoro come addetti alla squadra di primo soccorso, ai sensi dell\'art. 37 c. 9 del D.Lgs. 81/08 e del D.M. 388/2003. La formazione è differenziata per categoria: Gruppo A per le aziende a rischio elevato, Gruppo B e C per le restanti. L\'aggiornamento è obbligatorio ogni 3 anni.',
    curriculum: [
      { week: 1, title: 'Allertamento e valutazione', hours: 3, lessons: ['Sistemi di emergenza', 'Valutazione infortunato', 'Funzioni vitali', 'Autoprotezione'] },
      { week: 2, title: 'Tecniche di primo soccorso', hours: 4, lessons: ['Rianimazione cardiopolmonare', 'Posizione laterale di sicurezza', 'Gestione shock', 'Emorragie'] },
      { week: 3, title: 'Patologie e traumi', hours: 3, lessons: ['Traumi osteoarticolari', 'Ustioni e lesioni', 'Intossicazioni', 'Crisi epilettiche'] },
      { week: 4, title: 'Esercitazioni pratiche', hours: 6, lessons: ['Simulazioni su manichino', 'Uso del defibrillatore', 'Bendaggi', 'Trasporto infortunato'] },
    ],
    learningOutcomes: ['Allertare correttamente i soccorsi', 'Eseguire la rianimazione cardiopolmonare', 'Gestire traumi e emergenze sanitarie', 'Ottenere attestato con aggiornamento triennale'],
  },
  'formazione-lavoratori': {
    title: 'Formazione Lavoratori',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '4-16 ore',
    modality: 'Aula / FAD / Videoconferenza',
    price: 'Da € 40,00',
    priceVariants: [
      { label: 'Generale 4H (Aula)', amount: 50 },
      { label: 'Generale 4H (FAD)', amount: 40 },
      { label: 'Rischio Basso 8H (Aula)', amount: 100 },
      { label: 'Rischio Basso 8H (FAD)', amount: 90 },
      { label: 'Rischio Medio 12H', amount: 130 },
      { label: 'Rischio Alto 16H', amount: 180 },
      { label: 'Aggiornamento 6H (Aula)', amount: 80 },
      { label: 'Aggiornamento 6H (FAD)', amount: 70 },
    ],
    level: 'Base',
    lessons: '3 livelli di rischio',
    students: '5.000+',
    target: 'Tutti i lavoratori, neoassunti, tirocinanti e stagisti',
    overview: 'La Formazione Lavoratori è obbligatoria per tutti i dipendenti ai sensi degli artt. 36 e 37 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 21/12/2011, aggiornato dal nuovo Accordo del 17/04/2025. Il percorso si articola in una parte generale (4 ore, uguale per tutti) e una parte specifica differenziata in base al rischio dell\'azienda: basso (4 ore), medio (8 ore), alto (12 ore). L\'aggiornamento è obbligatorio ogni 5 anni per 6 ore.',
    curriculum: [
      { week: 1, title: 'Formazione generale', hours: 4, lessons: ['Concetti di rischio e danno', 'Prevenzione e protezione', 'Organizzazione aziendale sicurezza', 'Diritti e doveri lavoratori'] },
      { week: 2, title: 'Formazione specifica - rischi', hours: 4, lessons: ['Rischi infortuni e meccanici', 'Rischi elettrici', 'Rischi chimici e biologici', 'Movimentazione manuale carichi'] },
      { week: 3, title: 'Formazione specifica - prevenzione', hours: 4, lessons: ['DPI e segnaletica', 'Stress lavoro-correlato', 'Videoterminali', 'Microclima e illuminazione'] },
      { week: 4, title: 'Emergenze e aggiornamento', hours: 4, lessons: ['Procedure esodo e incendi', 'Primo soccorso aziendale', 'Incidenti e infortuni mancati', 'Test finale'] },
    ],
    learningOutcomes: ['Conoscere i rischi del proprio ambiente di lavoro', 'Applicare le procedure di sicurezza', 'Utilizzare correttamente i DPI', 'Ottenere attestato valido 5 anni su tutto il territorio nazionale'],
  },
  'formazione-preposto': {
    title: 'Formazione del Preposto',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '12 ore (rinnovo 6 ore)',
    modality: 'Aula / Videoconferenza',
    price: 'Da € 90,00',
    priceVariants: [
      { label: 'Nuovo 12H', amount: 160 },
      { label: 'Aggiornamento 6H', amount: 90 },
    ],
    level: 'Intermedio',
    lessons: '4 moduli',
    students: '1.500+',
    target: 'Lavoratori con ruolo di supervisione e coordinamento di altri dipendenti',
    overview: 'Il corso per Preposto è obbligatorio per tutti i lavoratori che ricoprono una posizione di preminenza rispetto agli altri, ai sensi degli artt. 2, 19 e 37 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 17/04/2025. Il percorso da 12 ore è aggiuntivo rispetto alla formazione generale e specifica già svolta come lavoratore. L\'aggiornamento biennale di 6 ore è obbligatorio per mantenere la validità dell\'attestato.',
    curriculum: [
      { week: 1, title: 'Modulo giuridico-normativo', hours: 3, lessons: ['Ruolo e responsabilità del preposto', 'Compiti e obblighi', 'Preposto di fatto', 'Relazioni con i soggetti aziendali'] },
      { week: 2, title: 'Gestione e organizzazione', hours: 3, lessons: ['Controllo osservanza procedure', 'Comunicazione con il sistema di prevenzione', 'Gestione delle non conformità', 'Strumenti di vigilanza'] },
      { week: 3, title: 'Valutazione e controllo rischi', hours: 3, lessons: ['Misure di prevenzione e protezione', 'Gestione appalti e DUVRI', 'Sorveglianza attività lavorative', 'Incidenti e near miss'] },
      { week: 4, title: 'Comunicazione e informazione', hours: 3, lessons: ['Tecniche di comunicazione', 'Gestione lavoratori neoassunti', 'Lavoratori stranieri', 'Test finale in aula'] },
    ],
    learningOutcomes: ['Conoscere compiti e responsabilità del preposto', 'Sorvegliare e controllare le attività lavorative', 'Gestire la comunicazione con lavoratori e datori di lavoro', 'Ottenere attestato con validità biennale'],
  },
  // Famiglia "formazione-dirigente" già raggruppata automaticamente da buildCourseFamilies (il pattern
  // "modulo comune" in LEVEL_PATTERNS isola il descrittore dal titolo raw "Formazione Dirigente Modulo
  // Comune" -> famTitle "Formazione Dirigente", che combacia con "Aggiornamento Formazione Dirigente"):
  // un'unica pagina con switch Corso/Aggiornamento, nessuna modifica a coursesRaw.js/courseFamilies.js.
  'formazione-dirigente': {
    title: 'Formazione Dirigente',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '12 ore (aggiornamento 6 ore)',
    modality: 'FAD',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Modulo Comune 12H', amount: 150 },
      { label: 'Aggiornamento 6H', amount: 100 },
    ],
    level: 'Avanzato',
    lessons: '4 moduli',
    students: '700+',
    target: 'Dirigenti aziendali e responsabili di funzione o reparto con poteri organizzativi e di vigilanza',
    overview: 'Il corso di Formazione per Dirigenti è obbligatorio ai sensi dell\'art. 2 comma 1 lett. d) e dell\'art. 37 comma 7 del D.Lgs. 81/2008 e dell\'Accordo Stato-Regioni del 17/04/2025, per chi riveste in azienda un ruolo dirigenziale con responsabilità in materia di salute e sicurezza. Il corso base dura 12 ore, erogate interamente in FAD; l\'aggiornamento periodico dura 6 ore.',
    curriculum: [
      { week: 1, title: 'Modulo giuridico-normativo', hours: 3, lessons: ['Sistema legislativo', 'Soggetti della prevenzione aziendale', 'Delega di funzioni', 'Responsabilità del dirigente'] },
      { week: 2, title: 'Gestione e organizzazione della sicurezza', hours: 3, lessons: ['Modelli organizzativi', 'Sistemi di gestione della sicurezza'] },
      { week: 3, title: 'Compiti specifici del dirigente', hours: 3, lessons: ['Misure di prevenzione', 'Sorveglianza sanitaria', 'Appalti', 'Gestione emergenze'] },
      { week: 4, title: 'Comunicazione e formazione', hours: 3, lessons: ['Tecniche di comunicazione', 'Obblighi formativi', 'Rapporti con l\'RLS'] },
    ],
    learningOutcomes: ['Conoscere il sistema legislativo in materia di sicurezza', 'Esercitare correttamente i compiti di organizzazione e vigilanza', 'Gestire appalti, DUVRI ed emergenze', 'Ottenere attestato valido in tutta Italia'],
  },
  'corso-rls': {
    title: 'RLS - Rappresentante dei Lavoratori',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '32 ore (aggiornamento 4-8 ore)',
    modality: 'Aula / FAD / Videoconferenza',
    price: 'Da € 60,00',
    // NOTA: le label includono il descrittore "Più/Meno Di 50 Dipendenti" (non solo la durata) perché
    // matchPriceVariant (data/courseFamilies.js) sceglie il prezzo per sovrapposizione di token con il
    // levelLabel della variante ("Meno Di 50 Dipendenti" / "Più Di 50 Dipendenti") - senza quel
    // descrittore nessuna label avrebbe token in comune e il prezzo risulterebbe "su richiesta".
    priceVariants: [
      { label: 'Nuovo 32H (Aula/FAD)', amount: 200 },
      { label: 'Nuovo 32H (Videoconferenza)', amount: 300 },
      { label: 'Aggiornamento Più Di 50 Dipendenti (Aula/FAD)', amount: 90 },
      { label: 'Aggiornamento Più Di 50 Dipendenti (Videoconferenza)', amount: 120 },
      { label: 'Aggiornamento Meno Di 50 Dipendenti (Aula/FAD)', amount: 60 },
      { label: 'Aggiornamento Meno Di 50 Dipendenti (Videoconferenza)', amount: 70 },
    ],
    level: 'Intermedio',
    lessons: '8 moduli',
    students: '1.000+',
    target: 'Lavoratore eletto o designato come Rappresentante dei Lavoratori per la Sicurezza',
    overview: 'Il corso RLS è obbligatorio per il lavoratore eletto o designato a rappresentare i colleghi in tutti gli aspetti della salute e sicurezza sul lavoro, ai sensi dell\'art. 37 commi 10 e 11 del D.Lgs. 81/08. L\'RLS è una figura chiave nel sistema aziendale di prevenzione: partecipa alla valutazione dei rischi, consulta il datore di lavoro e promuove la cultura della sicurezza. L\'aggiornamento annuale è obbligatorio (4H per aziende fino a 50 dipendenti, 8H per aziende con più di 50 dipendenti).',
    curriculum: [
      { week: 1, title: 'Normativa e soggetti', hours: 8, lessons: ['Normativa comunitaria e nazionale', 'Soggetti del sistema di prevenzione', 'Obblighi e responsabilità', 'L\'attività dell\'RLS'] },
      { week: 2, title: 'Valutazione dei rischi', hours: 8, lessons: ['Percezione e valutazione del rischio', 'Classificazione dei rischi', 'DVR e misure preventive', 'Ricadute organizzative'] },
      { week: 3, title: 'Rischi specifici', hours: 8, lessons: ['Rischi per la sicurezza', 'Rischi per la salute', 'Rischi trasversali', 'Settori produttivi specifici'] },
      { week: 4, title: 'Comunicazione e relazioni', hours: 8, lessons: ['Tecniche di comunicazione', 'Relazioni aziendali', 'Gestione conflitti', 'Test finale'] },
    ],
    learningOutcomes: ['Conoscere la normativa in materia di sicurezza', 'Partecipare attivamente alla valutazione dei rischi', 'Rappresentare efficacemente i lavoratori', 'Ottenere attestato con aggiornamento annuale'],
  },
  // NOTA: questa entry alimenta la famiglia "rspp-datore-di-lavoro" tramite ALIAS_TO_DETAILS in
  // data/courseFamilies.js. Le label dei priceVariants includono "Modulo N <Nome> <durata>H" perché
  // matchPriceVariant sceglie il prezzo per sovrapposizione di token con il levelLabel della variante
  // (es. "Modulo 1 - Agricoltura, Silvicoltura e Zootecnia") - includere il nome del settore evita
  // ambiguità con gli altri moduli, che condividono tutti il token "modulo".
  'corso-rspp-datore-lavoro': {
    title: 'RSPP Datore di Lavoro',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '8-16 ore (aggiornamento 8 ore)',
    modality: 'Aula / Videoconferenza',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Modulo Comune 8H', amount: 100 },
      { label: 'Modulo 1 Agricoltura 16H', amount: 200 },
      { label: 'Modulo 2 Pesca 12H', amount: 180 },
      { label: 'Modulo 3 Costruzioni 16H', amount: 200 },
      { label: 'Modulo 4 Chimico 16H', amount: 200 },
      { label: 'Aggiornamento 8H', amount: 130 },
    ],
    level: 'Avanzato',
    lessons: 'Modulo Comune + 4 moduli settoriali',
    students: '800+',
    target: 'Datori di lavoro che intendono svolgere direttamente i compiti di RSPP nella propria azienda',
    overview: 'Il percorso RSPP Datore di Lavoro consente al titolare dell\'azienda di svolgere direttamente il ruolo di Responsabile del Servizio di Prevenzione e Protezione, ai sensi dell\'art. 34 del D.Lgs. 81/2008 e dell\'Accordo Stato-Regioni del 17/04/2025. Si compone del Modulo Comune (8 ore, uguale per tutti i settori) abbinato a uno dei quattro moduli integrativi settoriali (Agricoltura/Silvicoltura/Zootecnia, Pesca, Costruzioni, Chimico-Petrolchimico), scelto in base alla classificazione ATECO dell\'azienda. L\'aggiornamento è un corso unico di 8 ore valido per tutti i settori.',
    curriculum: [
      { week: 1, title: 'Modulo Comune', hours: 8, lessons: ['Individuazione e valutazione dei rischi', 'Misure di prevenzione e protezione', 'DPI e segnaletica', 'Documento di valutazione dei rischi (DVR)'] },
      { week: 2, title: 'Moduli integrativi settoriali', hours: 16, lessons: ['Agricoltura, Silvicoltura e Zootecnia (16h)', 'Pesca (12h)', 'Costruzioni (16h)', 'Chimico-Petrolchimico (16h)'] },
    ],
    learningOutcomes: ['Acquisire le competenze per gestire la sicurezza aziendale', 'Redigere e aggiornare il DVR', 'Organizzare il sistema di prevenzione e protezione', 'Ottenere abilitazione RSPP valida su tutto il territorio nazionale'],
  },
  // Famiglia "rspp-aspp" già raggruppata automaticamente da buildCourseFamilies (il pattern "esterno" di
  // LEVEL_PATTERNS isola il descrittore da "RSPP/ASPP Esterno Modulo A" -> famTitle "RSPP/ASPP", che
  // combacia con "Aggiornamento RSPP/ASPP Esterno"): un'unica pagina con switch Modulo A / Modulo B /
  // Modulo C / Aggiornamento. Nessuna alias necessaria, la chiave qui sotto è family.id esatto.
  'rspp-aspp': {
    title: 'RSPP/ASPP Esterno',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '24-48 ore (aggiornamento 40 ore)',
    modality: 'FAD / Videoconferenza',
    price: 'Da € 350,00',
    priceVariants: [
      { label: 'Modulo A 28H', amount: 350 },
      { label: 'Modulo B 48H', amount: 600 },
      { label: 'Modulo C 24H', amount: 400 },
      { label: 'Aggiornamento Esterno 40H', amount: 400 },
    ],
    level: 'Avanzato',
    lessons: 'Modulo A + Modulo B (+ Modulo C per RSPP)',
    students: '400+',
    target: 'Chi intende diventare RSPP o ASPP esterno, consulenti e professionisti della sicurezza',
    overview: 'Il percorso RSPP/ASPP Esterno abilita a svolgere il ruolo di Responsabile o Addetto al Servizio di Prevenzione e Protezione per conto terzi, ai sensi dell\'art. 32, comma 2, del D.Lgs. 81/2008 e dell\'Accordo Stato-Regioni del 17/04/2025. Si compone del Modulo A (28h, base comune), del Modulo B (48h, tecnico-specialistico) per la qualifica di ASPP, e del Modulo C (24h, gestionale-relazionale) aggiuntivo per la qualifica di RSPP. L\'aggiornamento periodico (40h) è comune a entrambe le figure.',
    curriculum: [
      { week: 1, title: 'Modulo A', hours: 28, lessons: ['Quadro normativo e sistema di prevenzione', 'Concetti di rischio, danno, prevenzione e protezione', 'Processo di valutazione dei rischi e DVR'] },
      { week: 2, title: 'Modulo B', hours: 48, lessons: ['Rischi tecnici specifici', 'Ambienti di lavoro, incendio ed emergenze', 'Agenti fisici, chimici, biologici'] },
      { week: 3, title: 'Modulo C (solo per RSPP)', hours: 24, lessons: ['Sistemi di gestione della sicurezza', 'Comunicazione e relazioni aziendali', 'Benessere organizzativo'] },
    ],
    learningOutcomes: ['Acquisire le competenze giuridico-normative e tecniche per la valutazione dei rischi', 'Conseguire la qualifica di ASPP (Modulo A+B) o RSPP (Modulo A+B+C)', 'Gestire sistemi di sicurezza e relazioni aziendali', 'Ottenere attestato valido su tutto il territorio nazionale'],
  },
  'corso-spazi-confinati': {
    title: 'Spazi Confinati',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '8-12 ore',
    modality: 'Aula',
    price: 'Da € 90,00',
    priceVariants: [
      { label: 'Corso Nuovo', amount: 180 },
      { label: 'Aggiornamento', amount: 90 },
    ],
    level: 'Specialistico',
    lessons: '4 moduli',
    students: '400+',
    target: 'Lavoratori addetti a lavori in ambienti confinati o sospetti di inquinamento',
    overview: 'Il corso per addetti ai lavori in spazi confinati è obbligatorio ai sensi del D.P.R. 177/2011, che disciplina i requisiti organizzativi e procedurali minimi per i lavori in ambienti sospetti di inquinamento o confinati. Gli ambienti confinati (fogne, cisterne, vasche, cunicoli, pozzi, silos) rappresentano uno dei rischi più elevati per la sicurezza dei lavoratori. Il percorso formativo copre teoria e addestramento pratico.',
    curriculum: [
      { week: 1, title: 'Normativa e classificazione', hours: 2, lessons: ['D.P.R. 177/2011', 'Definizione spazi confinati', 'Classificazione ambienti', 'Obblighi normativi'] },
      { week: 2, title: 'Rischi specifici', hours: 3, lessons: ['Rischio asfissia', 'Rischio esplosione', 'Rischio intossicazione', 'Valutazione atmosfera confinata'] },
      { week: 3, title: 'Procedure e DPI', hours: 3, lessons: ['Permesso di lavoro', 'DPI specifici', 'Strumenti rilevazione gas', 'Procedure di accesso'] },
      { week: 4, title: 'Emergenza e salvataggio', hours: 4, lessons: ['Procedure di emergenza', 'Tecniche di salvataggio', 'Comunicazioni', 'Esercitazioni pratiche'] },
    ],
    learningOutcomes: ['Identificare e classificare gli spazi confinati', 'Conoscere i rischi specifici degli ambienti confinati', 'Applicare le procedure di accesso in sicurezza', 'Gestire le emergenze e le operazioni di salvataggio'],
  },
  // Famiglia "lavori-in-quota" già raggruppata automaticamente da buildCourseFamilies: entrambe le
  // varianti condividono livelloKey 'default' (nessun descrittore nel titolo), quindi confluiscono in
  // un'unica pagina con lo switch a pillola Corso/Aggiornamento nidificato, stesso pattern di
  // "carrelli-elevatori-semoventi-con-conduttore-a-bordo".
  'lavori-in-quota': {
    title: 'Addetti ai Lavori in Quota e Utilizzo DPI Anticaduta (III Categoria)',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '8 ore (aggiornamento 4 ore)',
    modality: 'Aula',
    price: 'Da € 140,00',
    priceVariants: [
      { label: 'Corso 8H', amount: 250 },
      { label: 'Aggiornamento 4H', amount: 140 },
    ],
    level: 'Specialistico',
    lessons: '4 moduli',
    students: '600+',
    target: 'Lavoratori che operano in quota utilizzando DPI anticaduta di III categoria',
    overview: 'Il corso per Addetti ai Lavori in Quota e Utilizzo DPI Anticaduta di III Categoria è obbligatorio ai sensi del D.Lgs. 81/2008 coordinato con il D.Lgs. 106/2009, artt. 36, 37, 76 e 77. Il percorso fornisce le competenze teorico-pratiche per utilizzare correttamente i dispositivi di protezione individuale anticaduta di terza categoria in assenza di protezioni collettive.',
    curriculum: [
      { week: 1, title: 'Moduli teorici', hours: 4, lessons: ['Rischio di caduta dall\'alto', 'Quadro normativo', 'Caratteristiche e scelta dei DPI', 'Sistemi di ancoraggio e fattore di caduta'] },
      { week: 2, title: 'Moduli pratici', hours: 4, lessons: ['Vestizione ed equipaggiamento DPI', 'Posizionamento su struttura verticale', 'Accesso con doppio cordino', 'Soccorso dell\'operatore in quota'] },
    ],
    learningOutcomes: ['Valutare il rischio di caduta dall\'alto e scegliere i DPI idonei', 'Utilizzare correttamente sistemi di ancoraggio e posizionamento', 'Applicare le tecniche di accesso con doppio cordino', 'Ottenere attestato valido in tutta Italia'],
  },
  // Famiglia "pimus-ponteggi" già raggruppata automaticamente da buildCourseFamilies: entrambe le
  // varianti condividono livelloKey 'default' (nessun descrittore nel titolo), quindi confluiscono in
  // un'unica pagina con lo switch a pillola Corso/Aggiornamento nidificato, stesso pattern di
  // "lavori-in-quota" e "carrelli-elevatori-semoventi-con-conduttore-a-bordo".
  'pimus-ponteggi': {
    title: 'Addetti/Preposti al Montaggio, Smontaggio e Trasformazione di Ponteggi (PIMUS)',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '28 ore (aggiornamento 4 ore)',
    modality: 'Aula',
    price: 'Da € 140,00',
    priceVariants: [
      { label: 'Corso 28H', amount: 400 },
      { label: 'Aggiornamento 4H', amount: 140 },
    ],
    level: 'Specialistico',
    lessons: '3 moduli',
    students: '500+',
    target: 'Lavoratori e preposti addetti al montaggio, smontaggio e trasformazione di ponteggi',
    overview: 'Il corso di Formazione Teorico-Pratica Abilitante per Addetti e Preposti al Montaggio, Smontaggio e Trasformazione di Ponteggi (PIMUS) è obbligatorio ai sensi dell\'art. 136 e dell\'allegato XXI del D.Lgs. 81/2008. Il percorso forma gli addetti a operare in sicurezza su ponteggi a tubi e giunti (PTG), a telai prefabbricati (PTP) e a montanti e traversi prefabbricati (PMTP), in conformità al Piano di Montaggio, Uso e Smontaggio in Sicurezza (PIMUS).',
    curriculum: [
      { week: 1, title: 'Modulo giuridico-normativo', hours: 4, lessons: ['Legislazione in materia di prevenzione infortuni', 'Analisi dei rischi nei cantieri edili'] },
      { week: 2, title: 'Modulo tecnico', hours: 10, lessons: ['Piano di Montaggio, Uso e Smontaggio in Sicurezza (PIMUS)', 'DPI anticaduta', 'Tecniche di ancoraggio'] },
      { week: 3, title: 'Modulo pratico', hours: 14, lessons: ['Montaggio, smontaggio e trasformazione ponteggi PTG', 'Ponteggi PTP e PMTP', 'Gestione della prima emergenza e salvataggio'] },
    ],
    learningOutcomes: ['Interpretare e applicare il PIMUS', 'Montare, smontare e trasformare ponteggi PTG, PTP e PMTP in sicurezza', 'Utilizzare correttamente i DPI anticaduta e le tecniche di ancoraggio', 'Ottenere attestato valido in tutta Italia'],
  },
  'corso-pes-pav-pei': {
    title: 'PES / PAV / PEI - Rischio Elettrico',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '16 ore',
    modality: 'Aula / Videoconferenza',
    price: 'Da € 90,00',
    priceVariants: [
      { label: 'Corso PES/PAV', amount: 200 },
      { label: 'Aggiornamento', amount: 90 },
    ],
    level: 'Specialistico',
    lessons: '4 moduli',
    students: '500+',
    target: 'Personale che effettua lavori in prossimità, sotto e fuori tensione su impianti elettrici',
    overview: 'Il corso PES/PAV/PEI è obbligatorio per il personale che esegue lavori elettrici, ai sensi della Norma CEI 11-27 e del D.Lgs. 81/08. Le qualifiche rilasciate sono: PES (Persona Esperta), abilitata a lavori sotto tensione; PAV (Persona Avvertita), formata per lavori in prossimità di parti in tensione; PEI (Persona Idonea), autorizzata a operare su impianti elettrici. Il percorso include teoria e addestramento pratico.',
    curriculum: [
      { week: 1, title: 'Normativa e rischi elettrici', hours: 4, lessons: ['CEI 11-27 e D.Lgs. 81/08', 'Effetti della corrente elettrica', 'Classificazione lavori elettrici', 'Responsabilità'] },
      { week: 2, title: 'Qualifiche PES/PAV/PEI', hours: 4, lessons: ['Definizioni e differenze', 'Requisiti per ciascuna qualifica', 'Procedure di lavoro', 'Autorizzazioni'] },
      { week: 3, title: 'DPI e attrezzature', hours: 4, lessons: ['DPI specifici per lavori elettrici', 'Strumenti di misura', 'Attrezzature isolate', 'Manutenzione e verifica'] },
      { week: 4, title: 'Procedure operative', hours: 4, lessons: ['Messa fuori tensione', 'Distanze di sicurezza', 'Lavori in prossimità', 'Test finale e valutazione pratica'] },
    ],
    learningOutcomes: ['Conoscere i rischi specifici dei lavori elettrici', 'Acquisire la qualifica PES, PAV o PEI', 'Applicare le procedure di sicurezza su impianti elettrici', 'Ottenere attestato valido ai sensi della Norma CEI 11-27'],
  },
  'patentino-fitosanitario': {
    title: 'Patentino Fitosanitario',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '16-20 ore',
    modality: 'Aula',
    price: 'Da € 80,00',
    priceVariants: [
      { label: 'Rilascio', amount: 120 },
      { label: 'Aggiornamento', amount: 80 },
    ],
    level: 'Base',
    lessons: '4 moduli',
    students: '1.200+',
    target: 'Agricoltori, vivaisti, operatori del verde e chiunque acquisti o utilizzi prodotti fitosanitari',
    overview: 'Il Patentino Fitosanitario (certificato di abilitazione) è obbligatorio per l\'acquisto e l\'utilizzo di prodotti fitosanitari, ai sensi del D.Lgs. 150/2012 e del Piano di Azione Nazionale (PAN). Il corso fornisce le conoscenze necessarie per un uso corretto e responsabile dei fitosanitari, nel rispetto della salute degli operatori, dei consumatori e dell\'ambiente. Il rinnovo è obbligatorio ogni 5 anni.',
    curriculum: [
      { week: 1, title: 'Normativa e classificazione', hours: 4, lessons: ['D.Lgs. 150/2012 e PAN', 'Registrazione prodotti fitosanitari', 'Classificazione ed etichettatura', 'Autorizzazioni e obblighi'] },
      { week: 2, title: 'Rischi e sicurezza operatore', hours: 4, lessons: ['Tossicologia dei fitosanitari', 'Vie di penetrazione', 'DPI specifici', 'Procedure di emergenza'] },
      { week: 3, title: 'Protezione ambiente e salute', hours: 4, lessons: ['Impatto ambientale', 'Protezione acque e suolo', 'Zone tampone', 'Gestione rifiuti fitosanitari'] },
      { week: 4, title: 'Tecniche di distribuzione', hours: 8, lessons: ['Attrezzature irroratrici', 'Regolazione e taratura', 'Fasi fenologiche', 'Esame finale per il patentino'] },
    ],
    learningOutcomes: ['Conoscere la normativa sull\'uso dei fitosanitari', 'Proteggere la propria salute e l\'ambiente', 'Utilizzare correttamente le attrezzature di distribuzione', 'Ottenere il Patentino Fitosanitario con validità 5 anni'],
  },
  'carrelli-elevatori': {
    title: 'Carrelli Elevatori',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '12 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Nuovo 12H', amount: 180 },
      { label: 'Aggiornamento 4H', amount: 100 },
    ],
    level: 'Base',
    lessons: '2 moduli',
    students: '2.000+',
    target: 'Lavoratori addetti alla conduzione di carrelli elevatori semoventi con conduttore a bordo',
    overview: 'Il corso per carrellisti (patentino muletto) è obbligatorio per tutti i lavoratori che utilizzano carrelli elevatori semoventi, ai sensi dell\'art. 73 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 17/04/2025. Il percorso da 12 ore comprende una parte teorica (8 ore) e una pratica (4 ore) con prove su mezzo reale. Al termine viene rilasciato il patentino carrello elevatore, valido 5 anni su tutto il territorio nazionale.',
    curriculum: [
      { week: 1, title: 'Modulo teorico', hours: 8, lessons: ['Normativa D.Lgs. 81/08', 'Tipologie di carrelli', 'Stabilità e portata', 'Manutenzione e controlli'] },
      { week: 2, title: 'Modulo pratico', hours: 4, lessons: ['Componenti e sicurezze', 'Manovre a vuoto e a carico', 'Percorso di prova', 'Test pratico finale'] },
    ],
    learningOutcomes: ['Conoscere le norme di sicurezza per l\'uso dei carrelli', 'Valutare la stabilità e la portata del mezzo', 'Eseguire manovre in sicurezza a vuoto e a carico', 'Ottenere il patentino muletto valido 5 anni'],
  },
  'addetti-alla-conduzione-di-carriponte': {
    title: 'Addetti alla Conduzione di Carriponte',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '11 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 150,00',
    priceVariants: [
      { label: 'Nuovo 11H', amount: 270 },
      { label: 'Aggiornamento 4H', amount: 150 },
    ],
    level: 'Specialistico',
    lessons: '2 moduli',
    students: '300+',
    target: 'Lavoratori addetti alla conduzione di carriponte e gru a cavalletto con comando pensile o radiocomando',
    overview: 'Il corso per Addetti alla Conduzione di Carriponte è conforme al D.Lgs. 81/08 e al nuovo Accordo Stato-Regioni, che dal 24 maggio 2026 richiede un\'abilitazione specifica standardizzata per questa attrezzatura, con modulo teorico e prova pratica documentata.',
    curriculum: [
      { week: 1, title: 'Modulo teorico', hours: 7, lessons: ['Normativa e Accordo Stato-Regioni 2026', 'Caratteristiche costruttive del carroponte', 'Rischi da sollevamento e movimentazione carichi', 'Imbracature, ganci e accessori'] },
      { week: 2, title: 'Modulo pratico', hours: 4, lessons: ['Comando pensile e radiocomando', 'Controlli pre-operativi', 'Manovre in spazi ristretti', 'Gestione delle emergenze'] },
    ],
    learningOutcomes: ['Distinguere il carroponte dalla gru a portale', 'Condurre in sicurezza con comando pensile e radiocomando', 'Valutare i rischi di sollevamento e movimentazione', 'Ottenere l\'abilitazione valida 5 anni'],
  },
  'piattaforme-elevabili-ple': {
    title: 'Piattaforme Elevabili PLE',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '10 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 90,00',
    priceVariants: [
      { label: 'Nuovo 10H', amount: 170 },
      { label: 'Aggiornamento 4H', amount: 90 },
    ],
    level: 'Base',
    lessons: '2 moduli',
    students: '1.200+',
    target: 'Lavoratori che utilizzano piattaforme di lavoro mobili elevabili con e senza stabilizzatori',
    overview: 'Il corso PLE (Piattaforme di Lavoro Mobili Elevabili) è obbligatorio per tutti gli operatori che utilizzano piattaforme aeree, ai sensi dell\'art. 73 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 17/04/2025. Il percorso da 10 ore abilita alla conduzione di PLE con e senza stabilizzatori. L\'addestramento pratico si svolge su mezzi reali con esercitazioni di manovra in quota e procedure di emergenza. Validità 5 anni.',
    curriculum: [
      { week: 1, title: 'Modulo teorico', hours: 4, lessons: ['Tipologie di PLE', 'Componenti strutturali', 'Dispositivi di sicurezza', 'Rischi e DPI specifici'] },
      { week: 2, title: 'Modulo pratico', hours: 6, lessons: ['Controlli pre-utilizzo', 'Posizionamento e stabilizzazione', 'Manovre operative in quota', 'Procedure di emergenza'] },
    ],
    learningOutcomes: ['Conoscere tipologie e caratteristiche delle PLE', 'Eseguire i controlli pre-utilizzo', 'Operare in quota in sicurezza con e senza stabilizzatori', 'Ottenere il patentino PLE valido 5 anni'],
  },
  'gru-su-autocarro': {
    title: 'Gru su Autocarro',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '12 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Nuovo 12H', amount: 220 },
      { label: 'Aggiornamento 4H', amount: 100 },
    ],
    level: 'Specialistico',
    lessons: '2 moduli',
    students: '600+',
    target: 'Operatori addetti alla movimentazione con gru montate su autocarro',
    overview: 'Il corso per operatori di gru su autocarro è obbligatorio ai sensi dell\'art. 73 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 17/04/2025. Il percorso da 12 ore forma gli addetti al sollevamento e movimentazione di carichi con gru per autocarro, con particolare attenzione alla valutazione della stabilità, al posizionamento e alle manovre in sicurezza. Al termine viene rilasciato il patentino gru valido 5 anni.',
    curriculum: [
      { week: 1, title: 'Modulo teorico', hours: 4, lessons: ['Tipologie di gru su autocarro', 'Equilibrio e stabilità', 'Tabelle di carico', 'Normativa e responsabilità'] },
      { week: 2, title: 'Modulo pratico', hours: 8, lessons: ['Posizionamento e stabilizzazione', 'Operazioni di sollevamento', 'Codice delle manovre', 'Emergenza e messa a riposo'] },
    ],
    learningOutcomes: ['Conoscere le caratteristiche tecniche delle gru su autocarro', 'Valutare le condizioni di stabilità e i carichi', 'Eseguire manovre di sollevamento in sicurezza', 'Ottenere il patentino gru valido 5 anni'],
  },
  'macchine-movimento-terra': {
    title: 'Macchine Movimento Terra',
    image: 'https://images.unsplash.com/photo-1558618047-f4e80c7a9c7d?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '10-16 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Nuovo 10-16H', amount: 220 },
      { label: 'Aggiornamento 4H', amount: 100 },
    ],
    level: 'Specialistico',
    lessons: '2 moduli',
    students: '700+',
    target: 'Operatori di escavatori idraulici, pale caricatrici, terne e autoribaltabili',
    overview: 'Il corso per macchine movimento terra è obbligatorio per gli operatori di escavatori idraulici, pale caricatrici frontali, terne e autoribaltabili a cingoli, ai sensi dell\'art. 73 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 17/04/2025. La durata varia in base alla tipologia di macchina (10 ore per singola categoria, 16 ore per combinazioni). Il percorso comprende teoria e prove pratiche su mezzi reali.',
    curriculum: [
      { week: 1, title: 'Modulo teorico', hours: 6, lessons: ['Tipologie di macchine MMT', 'Caratteristiche tecniche', 'Rischi specifici', 'Normativa e obblighi'] },
      { week: 2, title: 'Modulo pratico', hours: 10, lessons: ['Controlli pre-operativi', 'Tecniche di scavo e movimento', 'Manovre in sicurezza', 'Prove finali teoriche e pratiche'] },
    ],
    learningOutcomes: ['Conoscere le caratteristiche tecniche delle macchine MMT', 'Eseguire i controlli di sicurezza pre-operativi', 'Condurre in sicurezza escavatori, pale e terne', 'Ottenere il patentino MMT valido 5 anni'],
  },
  // Un'unica famiglia "Trattoristi" con switch Ruote / Cingoli / Ruote e Cingoli / Aggiornamento -
  // vedi il commento sulle 4 voci raw in data/coursesRaw.js e i LEVEL_PATTERNS in data/courseFamilies.js.
  'trattori-agricoli-o-forestali': {
    title: 'Trattori Agricoli o Forestali',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '8-13 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Ruote 8H', amount: 180 },
      { label: 'Cingoli 8H', amount: 180 },
      { label: 'Ruote e Cingoli 13H', amount: 250 },
      { label: 'Aggiornamento 4H', amount: 100 },
    ],
    level: 'Base',
    lessons: '3 percorsi + aggiornamento',
    students: '900+',
    target: 'Operatori addetti alla conduzione di trattori agricoli e forestali a ruote e/o a cingoli',
    overview: 'Il corso per la conduzione di trattori agricoli o forestali è obbligatorio ai sensi dell\'art. 73 e dell\'allegato VIII del D.Lgs. 81/2008 e dell\'Accordo Stato-Regioni del 17/04/2025. È disponibile in 3 percorsi base (a ruote, a cingoli o combinato) più un aggiornamento generico di 4 ore valido per tutti.',
    curriculum: [
      { week: 1, title: 'Modulo giuridico-normativo', hours: 1, lessons: ['Normativa e responsabilità dell\'operatore', 'Obblighi del datore di lavoro'] },
      { week: 2, title: 'Modulo tecnico', hours: 3, lessons: ['Categorie e componenti dei trattori', 'Dispositivi di comando e sicurezza', 'Controlli pre-utilizzo'] },
      { week: 3, title: 'Modulo pratico', hours: 4, lessons: ['Guida su percorso di prova', 'Manovre in campo aperto o su pendenza', 'Test pratico finale'] },
    ],
    learningOutcomes: ['Conoscere le caratteristiche dei trattori a ruote e a cingoli', 'Identificare e prevenire il rischio di ribaltamento', 'Condurre in sicurezza su terreno pianeggiante o in pendenza', 'Ottenere il patentino trattori valido 5 anni'],
  },
  'pompe-calcestruzzo': {
    title: 'Pompe per Calcestruzzo',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    category: 'Formazione Obbligatoria',
    duration: '14 ore (aggiornamento 4 ore)',
    modality: 'Aula + Pratica',
    price: 'Da € 100,00',
    priceVariants: [
      { label: 'Nuovo 14H', amount: 240 },
      { label: 'Aggiornamento 4H', amount: 100 },
    ],
    level: 'Specialistico',
    lessons: '2 moduli',
    students: '300+',
    target: 'Operatori addetti all\'utilizzo di pompe per calcestruzzo autocarrate e semoventi',
    overview: 'Il corso per addetti alle pompe per calcestruzzo è obbligatorio ai sensi dell\'art. 73 del D.Lgs. 81/08 e dell\'Accordo Stato-Regioni del 17/04/2025. Il percorso da 14 ore forma gli operatori alla conduzione sicura di pompe autocarrate e stazionarie per il pompaggio di calcestruzzo in cantiere. L\'addestramento pratico copre posizionamento, operatività e gestione delle emergenze.',
    curriculum: [
      { week: 1, title: 'Modulo teorico', hours: 6, lessons: ['Tipologie di pompe calcestruzzo', 'Componenti e funzionamento', 'Stabilità e posizionamento', 'Rischi specifici e normativa'] },
      { week: 2, title: 'Modulo pratico', hours: 8, lessons: ['Allestimento e stabilizzazione', 'Operazioni di pompaggio', 'Manutenzione e pulizia', 'Emergenze e test finale'] },
    ],
    learningOutcomes: ['Conoscere le caratteristiche tecniche delle pompe per calcestruzzo', 'Eseguire il posizionamento e la stabilizzazione in sicurezza', 'Operare correttamente durante il pompaggio', 'Ottenere il patentino pompe calcestruzzo valido 5 anni'],
  },
  'icdl-base': {
    purchasable: true,
    title: 'ICDL Base',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    category: 'Certificazioni Digitali',
    duration: 'Circa 7 mesi (30 incontri da 2 ore)',
    modality: 'In sede',
    price: '€ 180,00',
    priceVariants: [
      { label: 'Corso completo + Skills Card + 4 esami', amount: 180 },
    ],
    level: 'Base',
    lessons: '4 moduli',
    students: '1.500+',
    target: 'Studenti, lavoratori e privati che desiderano certificare le competenze informatiche di base',
    overview: 'La certificazione ICDL Base è la prima e più diffusa certificazione di competenze digitali riconosciuta a livello internazionale in 148 Paesi. Alètheia Srl è Test Center AICA accreditato n. AKHF0001. Il percorso comprende 4 moduli fondamentali (Computer Essentials, Online Essentials, Word Processing, Spreadsheets) e si conclude con l\'esame presso la nostra sede. La certificazione ICDL Base è riconosciuta nei concorsi pubblici e vale come credito formativo.',
    curriculum: [
      { week: 1, title: 'Computer Essentials', hours: 10, lessons: ['Componenti hardware', 'Sistemi operativi Windows', 'Gestione file e cartelle', 'Sicurezza del computer'] },
      { week: 2, title: 'Online Essentials', hours: 10, lessons: ['Navigazione web', 'Ricerca informazioni', 'Posta elettronica', 'Comunicazione online'] },
      { week: 3, title: 'Word Processing', hours: 8, lessons: ['Creazione documenti Word', 'Formattazione testo', 'Tabelle e immagini', 'Stampa e condivisione'] },
      { week: 4, title: 'Spreadsheets', hours: 12, lessons: ['Fogli di calcolo Excel', 'Formule e funzioni', 'Grafici', 'Esami finali 4 moduli'] },
    ],
    learningOutcomes: ['Utilizzare il computer e i sistemi operativi', 'Navigare in internet e usare la posta elettronica', 'Creare documenti di testo con Word', 'Ottenere la Certificazione ICDL Base riconosciuta internazionalmente'],
  },
  'icdl-standard': {
    purchasable: true,
    title: 'ICDL Standard',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
    category: 'Certificazioni Digitali',
    duration: 'Circa 9 mesi',
    modality: 'In sede',
    price: '€ 220,00',
    priceVariants: [
      { label: 'Corso completo + Skills Card + 5 esami', amount: 220 },
    ],
    level: 'Intermedio',
    lessons: '5 moduli',
    students: '800+',
    target: 'Chi ha già la Base o vuole una certificazione più completa per il mercato del lavoro',
    overview: 'La certificazione ICDL Standard include i 4 moduli Base più un quinto modulo a scelta tra Presentation, IT Security, Online Collaboration e altri. È riconosciuta nei concorsi pubblici e dal mondo del lavoro come standard per la validazione delle competenze digitali. Alètheia Srl è Test Center AICA accreditato n. AKHF0001 e segue i candidati in tutto il percorso, dagli esami al rilascio della Skills Card.',
    curriculum: [
      { week: 1, title: 'Moduli Base (4)', hours: 40, lessons: ['Computer Essentials', 'Online Essentials', 'Word Processing', 'Spreadsheets'] },
      { week: 2, title: 'Modulo aggiuntivo a scelta', hours: 10, lessons: ['Presentation (PowerPoint)', 'IT Security', 'Online Collaboration', 'Esame 5° modulo'] },
    ],
    learningOutcomes: ['Padroneggiare i principali strumenti Microsoft Office', 'Acquisire competenze digitali avanzate', 'Ottenere la certificazione riconosciuta nei concorsi pubblici', 'Aumentare le opportunità nel mercato del lavoro'],
  },
  'icdl-update': {
    purchasable: true,
    title: 'ICDL Update',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80',
    category: 'Certificazioni Digitali',
    duration: 'Singola sessione d\'esame',
    modality: 'In sede',
    price: '€ 100,00',
    priceVariants: [
      { label: 'Esame Update', amount: 100 },
    ],
    level: 'Aggiornamento',
    lessons: '1 esame',
    students: '400+',
    target: 'Titolari di vecchia certificazione ECDL/ICDL che desiderano aggiornarla allo standard attuale',
    overview: 'L\'esame ICDL Update consente ai possessori di una vecchia certificazione ECDL o ICDL di aggiornare la propria qualifica allo standard attuale, senza dover ripetere tutti i moduli. Con un unico esame, la certificazione viene allineata alla versione corrente del Syllabus ICDL. Alètheia Srl è Test Center AICA accreditato n. AKHF0001 e organizza sessioni d\'esame periodiche presso la propria sede.',
    curriculum: [
      { week: 1, title: 'Preparazione all\'esame Update', hours: 4, lessons: ['Differenze rispetto al vecchio Syllabus', 'Nuovi argomenti introdotti', 'Simulazioni d\'esame', 'Sessione d\'esame Update'] },
    ],
    learningOutcomes: ['Aggiornare la certificazione ECDL/ICDL allo standard attuale', 'Mantenere il riconoscimento della certificazione nei concorsi pubblici', 'Completare l\'aggiornamento con un unico esame', 'Ricevere la nuova Skills Card aggiornata'],
  },
  // CORSI QUALIFICATI
  'oss-operatore-socio-sanitario': {
    enrollOnly: true,
    title: 'OSS - Operatore Socio Sanitario',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '1.000 ore',
    modality: 'Aula + Tirocinio',
    price: 'Su richiesta',
    level: 'Qualifica professionale',
    lessons: '10 moduli',
    students: '300+',
    target: 'Aspiranti operatori sociosanitari, diplomati',
    overview: 'Il corso per Operatore Socio Sanitario (OSS) è un percorso di qualifica professionale accreditato dalla Regione Siciliana che forma figure in grado di assistere persone anziane, disabili o non autosufficienti in contesti domiciliari, residenziali e ospedalieri. Il percorso include teoria, laboratorio e tirocinio presso strutture convenzionate, e si conclude con l\'esame regionale per il rilascio della qualifica OSS.',
    curriculum: [
      { week: 1, title: 'Fondamenti socio-sanitari', hours: 100, lessons: ['Anatomia e fisiologia di base', 'Principi di igiene e prevenzione', 'Ruolo e competenze dell\'OSS', 'Normativa di riferimento'] },
      { week: 2, title: 'Assistenza alla persona', hours: 150, lessons: ['Igiene personale e mobilizzazione', 'Alimentazione e idratazione', 'Assistenza nelle attività quotidiane', 'Prevenzione delle lesioni da decubito'] },
      { week: 3, title: 'Area psico-sociale e relazionale', hours: 100, lessons: ['Comunicazione e relazione d\'aiuto', 'Supporto psicologico di base', 'Lavoro in équipe multiprofessionale', 'Gestione del lutto e situazioni critiche'] },
      { week: 4, title: 'Tirocinio pratico', hours: 450, lessons: ['Tirocinio in RSA o struttura residenziale', 'Tirocinio in contesto domiciliare', 'Tutoraggio e supervisione', 'Valutazione e rilascio qualifica'] },
    ],
    learningOutcomes: [
      'Assistere in modo professionale persone anziane e non autosufficienti',
      'Operare in sicurezza in contesti residenziali, domiciliari e ospedalieri',
      'Collaborare con il personale infermieristico e medico nell\'équipe di cura',
      'Ottenere la qualifica OSS riconosciuta dalla Regione Siciliana',
    ],
  },
  'asacom-assistente-alla-comunicazione': {
    enrollOnly: true,
    title: 'ASACOM - Assistente alla Comunicazione',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&q=80',
    category: 'Formazione Professionale',
    duration: '600 ore',
    modality: 'Aula + Tirocinio',
    price: 'Su richiesta',
    level: 'Qualifica professionale',
    lessons: '8 moduli',
    students: '150+',
    target: 'Diplomati interessati al supporto educativo per alunni con disabilità sensoriali',
    overview: 'Il corso ASACOM (Assistente alla Comunicazione) forma professionisti che supportano bambini e ragazzi con disabilità sensoriali (sordità, cecità, sordocecità) nell\'integrazione scolastica e sociale. Il percorso, accreditato dalla Regione Siciliana, unisce formazione teorica, competenze in Lingua dei Segni Italiana (LIS) e tirocinio diretto nelle scuole.',
    curriculum: [
      { week: 1, title: 'Fondamenti teorici', hours: 80, lessons: ['Normativa sull\'inclusione scolastica (L. 104/92)', 'Psicologia dello sviluppo e disabilità', 'Ruolo e funzioni dell\'ASACOM', 'Lavoro con l\'équipe educativa'] },
      { week: 2, title: 'Lingua dei Segni Italiana (LIS)', hours: 150, lessons: ['LIS livello base', 'LIS livello intermedio', 'Comunicazione aumentativa alternativa (CAA)', 'Supporto alla comunicazione orale e scritta'] },
      { week: 3, title: 'Tecniche e strumenti di supporto', hours: 120, lessons: ['Ausili tecnologici e software assistivi', 'Strategie per l\'orientamento e mobilità (non vedenti)', 'Didattica inclusiva e differenziata', 'Gestione delle emergenze e del comportamento'] },
      { week: 4, title: 'Tirocinio scolastico', hours: 250, lessons: ['Affiancamento in classe con alunni DSA/disabilità sensoriale', 'Progettazione del PEI con l\'équipe', 'Supervisione e valutazione del tutor', 'Esame finale e rilascio qualifica'] },
    ],
    learningOutcomes: [
      'Supportare efficacemente alunni con disabilità sensoriali nel percorso scolastico',
      'Comunicare in Lingua dei Segni Italiana (LIS) a livello funzionale',
      'Utilizzare strumenti di comunicazione aumentativa e ausili tecnologici',
      'Ottenere la qualifica ASACOM riconosciuta dalla Regione Siciliana',
    ],
  },
};

export default function CourseDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { addToCart, setCartOpen } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'moduli' - indipendente da livello/tipo, non si resetta al cambio
  const [selectedLivelloKey, setSelectedLivelloKey] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState('corso');
  const [openFaqIndex, setOpenFaqIndex] = useState(null); // FAQ aperta nell'accordion - dipende dal livello, va resettata al cambio
  const carouselRef = useRef(null);
  const scrollCarousel = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.querySelector('.corso-correlato-card');
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Famiglie derivate automaticamente da coursesData (livelli/varianti annidati) + dettagli editoriali per prezzo/overview.
  // I vecchi slug per-livello (es. /all-courses/antincendio-rischio-basso-livello-1) sono gestiti a monte da
  // redirect 301 in next.config.js: qui arriva solo lo slug canonico di famiglia.
  const families = useMemo(() => buildCourseFamilies(coursesData, coursesDetails), []);
  const family = useMemo(() => families.find((f) => f.slug === slug), [families, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Inizializza il livello selezionato da ?livello= (indice 1-based, condivisibile/bookmarkabile) o dal primo disponibile
  useEffect(() => {
    if (!family || !router.isReady || selectedLivelloKey) return;
    const livelloKeys = Array.from(new Set(family.varianti.map((v) => v.livelloKey)));
    const fromQuery = parseInt(router.query.livello, 10);
    const initialKey = (fromQuery >= 1 && livelloKeys[fromQuery - 1]) || livelloKeys[0];
    setSelectedLivelloKey(initialKey);
  }, [family, router.isReady, router.query.livello, selectedLivelloKey]);

  // Su un caricamento diretto (refresh/URL diretto) il router non è ancora "ready" al primo render
  // server/client: router.query.slug è vuoto finché Next.js non idrata i parametri della route, quindi
  // "family" risulta temporaneamente non trovata anche per uno slug valido. Senza questo guard si vedeva
  // lampeggiare "Corso non trovato" prima del contenuto reale a ogni refresh - qui mostriamo solo l'header
  // (già con lo sfondo corretto) mentre si attende, ed il messaggio di errore vero solo a router pronto.
  if (!family) {
    if (!router.isReady) {
      return (
        <>
          <Head><title>Alètheia Srl</title></Head>
          <Header active="/all-courses" solid />
        </>
      );
    }
    return (
      <>
        <Head><title>Corso non trovato - Alètheia Srl</title></Head>
        <Header active="/all-courses" solid />
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h1 style={{ marginTop: '1rem' }}>Corso non trovato</h1>
          <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>Il corso che stai cercando non esiste o è stato rimosso.</p>
          <Link href="/all-courses">
            <button style={{ backgroundColor: '#008C95', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '9999px', marginTop: '1.5rem', cursor: 'pointer' }}>
              Torna ai corsi
            </button>
          </Link>
        </div>
      </>
    );
  }

  const livelloEntries = Array.from(new Map(family.varianti.map((v) => [v.livelloKey, v.label])).entries());
  const hasMultipleLivelli = livelloEntries.length > 1;
  const activeLivelloKey = selectedLivelloKey || livelloEntries[0]?.[0];
  const variantiLivello = family.varianti.filter((v) => v.livelloKey === activeLivelloKey);
  const hasAggiornamento = variantiLivello.length > 1;
  const varianteCorrente = variantiLivello.find((v) => v.tipo === selectedTipo) || variantiLivello[0];

  const selectLivello = (livelloKey) => {
    setSelectedLivelloKey(livelloKey);
    // Il tipo (corso/aggiornamento) resta quello attivo: se ero su "Aggiornamento" e cambio livello,
    // resto su "Aggiornamento" - non deve resettarsi a "corso". Se il nuovo livello non ha quel tipo,
    // il fallback già presente in varianteCorrente (find(...) || variantiLivello[0]) copre il caso.
    setOpenFaqIndex(null); // le FAQ cambiano con il livello: chiudo quella eventualmente aperta
    const idx = livelloEntries.findIndex(([key]) => key === livelloKey);
    router.replace({ pathname: `/all-courses/${family.slug}`, query: { livello: idx + 1 } }, undefined, { shallow: true });
  };

  const selectTipo = (tipo) => {
    setSelectedTipo(tipo);
    setOpenFaqIndex(null);
  };

  const prezzoTesto = varianteCorrente.prezzo != null ? `€ ${varianteCorrente.prezzo},00` : (family.priceLabel || varianteCorrente.prezzoLabel);

  // Contenuto editoriale completo (descrizione/FAQ/moduli) per livello+tipo selezionati: tutto-o-niente,
  // se manca per la combinazione corrente (famiglia/tipo/livello non ancora coperti) il render mostra un
  // placeholder su tutte le tab. La chiave livello è posizionale ("livello-1"/"2"/"3", come nei file in
  // data/content/), NON il livelloKey semantico derivato dal titolo (es. "rischio-basso-livello-1") - i due
  // non coincidono, quindi il lookup usa l'indice del livello nell'ordine di livelloEntries.
  const livelloIndexPerContenuto = livelloEntries.findIndex(([key]) => key === activeLivelloKey);
  const editorialLivelloKey = `livello-${livelloIndexPerContenuto + 1}`;
  // Usa varianteCorrente.tipo (con fallback già applicato sopra) e non selectedTipo direttamente:
  // per famiglie a variante unica di tipo "aggiornamento" (es. trattori-agricoli-o-forestali) lo
  // switcher corso/aggiornamento è nascosto e selectedTipo resta bloccato sul default 'corso',
  // che altrimenti farebbe fallire il lookup pur avendo contenuto editoriale disponibile.
  const contenutoLivello = EDITORIAL_CONTENT[family.id]?.[varianteCorrente.tipo]?.[editorialLivelloKey] ?? null;

  const corsiCorrelatiRisolti = (contenutoLivello?.corsiCorrelati || [])
    .map((s) => resolveRelatedCourse(s, families))
    .filter(Boolean)
    .map((c) => {
      const relatedSlug = c.href.split('/').pop();
      const relatedFamily = families.find((f) => f.slug === relatedSlug);
      return { ...c, image: relatedFamily?.image || null };
    });

  // Oggetto "course" sintetizzato dalla famiglia + variante selezionata: mantiene compatibile il resto del render sottostante
  const course = {
    title: family.titolo,
    category: family.categoria,
    image: family.image,
    duration: varianteCorrente.durataOre,
    modality: varianteCorrente.modalita,
    price: prezzoTesto,
    level: family.level,
    students: family.students,
    purchasable: family.purchasable,
    enrollOnly: family.enrollOnly,
    priceVariants: null,
  };

  return (
    <>
      <Head>
        <title>{course.title} - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <style jsx global>{`
        /* Standard architetturale unico per TUTTE le pagine corso (template dinamico + pagine dedicate):
           due colonne 7fr/3fr con la sidebar prezzo sticky (top-24) staccata di gap-16 dal contenuto.
           Il box prezzo è allineato alla riga della barra tab (Panoramica/Moduli), non al breadcrumb/
           switch soprastanti: "top" occupa da sola la prima riga, "tabs"/"price" condividono la seconda.
           Su mobile/tablet colonna singola con il box prezzo che precede le tab. */
        .cp-page-grid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas: "top" "price" "tabs";
          gap: 1.25rem;
          align-items: start;
        }
        @media (min-width: 992px) {
          .cp-page-grid {
            grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
            grid-template-areas: "top ." "tabs price";
            column-gap: 4rem; /* gap-16: distacco netto tra contenuto e sidebar */
            row-gap: 1.25rem;
          }
        }
        .cp-top-area { grid-area: top; min-width: 0; }
        .cp-tabs-area { grid-area: tabs; min-width: 0; }
        .cp-price-area { grid-area: price; min-width: 0; }
        @media (min-width: 992px) {
          .cp-price-area { position: sticky; top: 6rem; align-self: start; margin-top: 1.5rem; } /* top-24 - il margine allinea il bordo del box al testo Panoramica/Moduli, non al bordo invisibile del padding dei bottoni */
        }

        .cp-scheda-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        @media (max-width: 560px) { .cp-scheda-grid { grid-template-columns: 1fr; } }

        .cp-valore-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        @media (max-width: 768px) { .cp-valore-grid { grid-template-columns: 1fr; gap: 2rem; } }

        .cp-carousel-track {
          display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; padding-bottom: 0.5rem; scrollbar-width: none;
        }
        .cp-carousel-track::-webkit-scrollbar { display: none; }
        .cp-carousel-arrow {
          width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #E2E8F0;
          background: #fff; color: #008C95; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.85rem; transition: all 0.2s ease;
        }
        .cp-carousel-arrow:hover { background: #008C95; border-color: #008C95; color: #fff; }
        .dark .cp-carousel-arrow { background: #1F2937; border-color: rgba(255,255,255,0.15); color: #6EE7B7; }
        .dark .cp-carousel-arrow:hover { background: #008C95; border-color: #008C95; color: #fff; }
      `}</style>

      <Header active="/all-courses" solid />

      {/* LAYOUT A DUE COLONNE: colonna sinistra (tabs) 70-75% + sidebar destra (prezzo) 25-30%, sticky su
          desktop. Su mobile/tablet il box prezzo passa a larghezza intera e si posiziona subito sopra le
          tab (grid-template-areas "price" "tabs"), stessa struttura .container di tutte le pagine corso
          (es. formazione-del-preposto.js) per garantire identica larghezza colonna/sidebar. */}
      <section className="bg-white dark:bg-dark-bg" style={{ paddingTop: '120px', paddingBottom: '3rem' }}>
        <div className="container">
        <div className="cp-page-grid">

      <div className="cp-top-area">
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <Link href="/all-courses" className="text-slate-500 dark:text-gray-400" style={{ textDecoration: 'none' }}>Tutti i corsi</Link>
          <span className="text-slate-300 dark:text-gray-600">/</span>
          <span className="text-slate-600 dark:text-gray-300">{course.title}</span>
        </nav>

        {(hasMultipleLivelli || hasAggiornamento) && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {hasAggiornamento && (
            <div role="tablist" aria-label="Corso o aggiornamento" style={{ display: 'inline-flex', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
              {['corso', 'aggiornamento'].map((tipo) => {
                const durataTipo = variantiLivello.find((v) => v.tipo === tipo)?.durataOre;
                return (
                <button
                  key={tipo}
                  role="tab"
                  type="button"
                  aria-selected={selectedTipo === tipo}
                  onClick={() => selectTipo(tipo)}
                  style={{
                    padding: '0.5rem 1.1rem',
                    borderRadius: '9999px',
                    border: 'none',
                    background: selectedTipo === tipo ? '#008C95' : 'transparent',
                    color: selectedTipo === tipo ? '#fff' : '#334155',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {tipo === 'corso' ? 'Corso base' : 'Aggiornamento'}{durataTipo ? ` · ${durataTipo}` : ''}
                </button>
                );
              })}
            </div>
          )}
          {hasMultipleLivelli && (
            <div role="tablist" aria-label="Livello del corso" style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25rem', background: '#F1F5F9', borderRadius: '9999px', padding: '0.25rem' }}>
              {(() => {
                // Livelli "solo aggiornamento" (nessuna variante corso su quel livello) - la loro label
                // grezza è spesso poco leggibile in un pulsante di switch (fallback sul titolo famiglia
                // come in trattori-agricoli-o-forestali, oppure un singolo descrittore residuo come
                // "Esterno" in rspp-aspp). Quando ce n'è UNO SOLO nell'intera famiglia non c'è ambiguità
                // e lo rinominiamo sempre "Aggiornamento". Quando ce ne sono DUE O PIÙ (es. "rls": "Meno
                // Di 50 Dipendenti" / "Più Di 50 Dipendenti") le label sono distintive e vanno mostrate
                // così come sono, altrimenti diventerebbero pulsanti duplicati indistinguibili.
                const soloAggiornamentoKeys = livelloEntries
                  .filter(([k]) => family.varianti.filter((v) => v.livelloKey === k).every((v) => v.tipo === 'aggiornamento'))
                  .map(([k]) => k);
                return livelloEntries.map(([key, label]) => {
                const displayLabel = soloAggiornamentoKeys.length === 1 && soloAggiornamentoKeys[0] === key ? 'Aggiornamento' : label;
                return (
                  <button
                    key={key}
                    role="tab"
                    type="button"
                    aria-selected={activeLivelloKey === key}
                    onClick={() => selectLivello(key)}
                    style={{
                      padding: '0.5rem 1.1rem',
                      borderRadius: '9999px',
                      border: 'none',
                      background: activeLivelloKey === key ? '#008C95' : 'transparent',
                      color: activeLivelloKey === key ? '#fff' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    {displayLabel}
                  </button>
                );
                });
              })()}
            </div>
          )}
          </div>
        )}
      </div>

      <div className="cp-tabs-area">
        {/* TABS */}
        <div className="border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid', flexWrap: 'wrap' }}>
          {[
            { id: 'overview', label: 'Panoramica' },
            { id: 'moduli', label: 'Moduli' },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{ background: 'none', border: 'none', padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: activeTab === id ? '700' : '500', color: activeTab === id ? '#008C95' : '#6B7280', cursor: 'pointer', borderBottom: activeTab === id ? '3px solid #008C95' : '3px solid transparent', marginBottom: '-2px', transition: 'all 0.2s ease' }}>
              {label}
            </button>
          ))}
        </div>

      {/* TAB CONTENT - pilotato da contenutoLivello (data/content/*.js): null per le varianti "aggiornamento"
          o per famiglie senza materiale editoriale ancora pronto → placeholder invece di un tab vuoto/rotto.
          La scheda tecnica (CourseSchedaTecnica) apre sempre il tab Panoramica, come da standard comune
          a tutte le pagine corso, seguita dai testi descrittivi e infine dall'accordion FAQ. */}
      <div style={{ paddingTop: '2rem' }}>
        {!contenutoLivello ? (
          <div>
            {activeTab === 'overview' && (
              <CourseSchedaTecnica
                items={[
                  { icon: 'fas fa-clock', label: 'Durata', value: course.duration },
                  { icon: 'fas fa-chalkboard-user', label: 'Modalità', value: course.modality },
                  { icon: 'fas fa-certificate', label: 'Attestato', value: family.varianti[0]?.attestato || 'Attestato valido in tutta Italia' },
                  { icon: 'fas fa-users', label: 'Partecipanti', value: course.students ? `${course.students}` : 'Su richiesta' },
                ]}
              />
            )}
            <div className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-[rgba(255,255,255,0.08)] rounded-2xl" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <i className="fas fa-hourglass-half" style={{ fontSize: '1.5rem', color: '#94A3B8', marginBottom: '0.75rem' }}></i>
              <p className="text-slate-500 dark:text-gray-300" style={{ margin: 0, fontSize: '0.95rem' }}>
                Contenuto dettagliato in arrivo. Nel frattempo trovi qui sopra durata, modalità e attestato.
              </p>
            </div>
          </div>
        ) : activeTab === 'overview' ? (
          <div>
            <CourseSchedaTecnica
              items={[
                { icon: 'fas fa-clock', label: 'Durata', value: `${contenutoLivello.durataOre} ore` },
                { icon: 'fas fa-chalkboard-user', label: 'Modalità', value: Array.isArray(contenutoLivello.modalita) ? contenutoLivello.modalita.join(' · ') : contenutoLivello.modalita },
                { icon: 'fas fa-calendar-check', label: 'Validità', value: contenutoLivello.validita },
                { icon: 'fas fa-certificate', label: 'Attestato', value: contenutoLivello.attestato },
                { icon: 'fas fa-users', label: 'Partecipanti', value: `Max ${contenutoLivello.partecipantiMax} persone` },
              ]}
            />

            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Descrizione del corso</h2>
            {contenutoLivello.descrizione.split('\n\n').map((paragrafo, i) => (
              <p key={i} className="text-slate-600 dark:text-gray-300" style={{ lineHeight: '1.7', marginBottom: '1.25rem' }}>{paragrafo}</p>
            ))}

            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, margin: '2rem 0 1rem' }}>A chi è rivolto</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {contenutoLivello.aChiERivolto.map((riga, i) => (
                <li key={i} style={{ padding: '0.4rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-user-check" style={{ color: '#008C95', marginTop: '0.2rem' }}></i>
                  <span className="text-slate-600 dark:text-gray-300">{riga}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Cosa imparerai</h2>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {contenutoLivello.cosaImparerai.map((outcome, i) => (
                <li key={i} style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="fas fa-check-circle" style={{ color: '#008C95' }}></i>
                  <span className="text-slate-600 dark:text-gray-300">{outcome}</span>
                </li>
              ))}
            </ul>

            {/* FAQ - accordion, una sola domanda aperta alla volta */}
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Domande frequenti</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {contenutoLivello.faq.map((item, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div key={i} className="bg-white dark:bg-dark-card border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="text-slate-900 dark:text-white"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}
                    >
                      <span>{item.domanda}</span>
                      <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#008C95', flexShrink: 0 }}></i>
                    </button>
                    {isOpen && (
                      <p className="text-slate-600 dark:text-gray-300" style={{ margin: 0, padding: '0 1.25rem 1.25rem', lineHeight: 1.65, fontSize: '0.9rem' }}>
                        {item.risposta}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-slate-900 dark:text-white" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Programma Formativo</h2>
            <p className="text-slate-500 dark:text-gray-400" style={{ marginBottom: '1.5rem' }}>
              Il corso è strutturato in {contenutoLivello.moduli.length} moduli per un totale di {contenutoLivello.durataOre} ore
            </p>
            <div className="border border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="bg-slate-50 dark:bg-gray-700">
                    <th className="text-slate-900 dark:text-white" style={{ textAlign: 'left', padding: '0.85rem 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modulo</th>
                    <th className="text-slate-900 dark:text-white" style={{ textAlign: 'left', padding: '0.85rem 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Durata</th>
                    <th className="text-slate-900 dark:text-white" style={{ textAlign: 'left', padding: '0.85rem 1.25rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Argomenti</th>
                  </tr>
                </thead>
                <tbody>
                  {contenutoLivello.moduli.map((modulo, i) => (
                    <tr key={i} className="border-t border-slate-200 dark:border-[rgba(255,255,255,0.08)]">
                      <td className="text-slate-900 dark:text-white" style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.9rem', verticalAlign: 'top' }}>{modulo.titolo}</td>
                      <td style={{ padding: '1rem 1.25rem', color: '#008C95', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                        {modulo.durataOreTeoria != null
                          ? `Teoria: ${modulo.durataOreTeoria}h · Pratica: ${modulo.durataOrePratica}h`
                          : `${modulo.durataOre} ore`}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', verticalAlign: 'top' }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {modulo.argomenti.map((arg, j) => (
                            <li key={j} className="text-slate-600 dark:text-gray-300" style={{ fontSize: '0.85rem' }}>{arg}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
          </div>

          {/* BOX PREZZO: colonna destra sticky su desktop (lg+), full-width in flusso su mobile/tablet,
              subito sopra le tab. Per i corsi senza un prezzo letterale (finanziati/gratuiti) mostra
              comunque un box con CTA di contatto, mai una sidebar vuota. */}
          <aside className="cp-price-area">
            {/* CASO 1 - Corso finanziato / gratuito */}
            {/Finanziato|Gratuito/i.test(course.price) ? (
              <PricingSidebar
                buyHref={`/contatti?corso=${encodeURIComponent(course.title)}`}
                buyLabel="Richiedi informazioni"
              >
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-6" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <span style={{ display: 'inline-block', backgroundColor: '#DCFCE7', color: '#15803D', padding: '0.5rem 1.25rem', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', width: 'fit-content' }}>
                    <i className="fas fa-check-circle" style={{ marginRight: '0.4rem' }}></i>
                    Corso finanziato - gratuito per i partecipanti
                  </span>
                  <p className="text-emerald-800 dark:text-emerald-200" style={{ fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    Questo corso è completamente finanziato. Contattaci per verificare la tua eligibilità e avviare l&apos;iscrizione.
                  </p>
                </div>
              </PricingSidebar>

            /* CASO 2 - Acquistabile online (ICDL/certificazioni), prezzo della variante selezionata sopra */
            ) : course.purchasable ? (
              <PricingSidebar
                priceRows={[{ label: varianteCorrente.prezzoLabel, value: prezzoTesto }]}
                onBuyClick={() => addToCart({ id: `${slug}-${varianteCorrente.id}`, slug, title: course.title, variant: varianteCorrente.label, price: varianteCorrente.prezzo, image: course.image })}
                buyLabel="Aggiungi al carrello"
                quoteHref={`/contatti?corso=${encodeURIComponent(course.title)}&variante=${encodeURIComponent(varianteCorrente.label)}`}
                quoteLabel="Richiedi iscrizione"
              />

            /* CASO 3 - Iscrizione online senza pagamento anticipato (OSS, ASACOM) */
            ) : course.enrollOnly ? (
              <>
                <PricingSidebar
                  priceRows={[{ label: 'Quota di iscrizione', value: 'Su richiesta' }]}
                  buyHref={`/contatti?corso=${encodeURIComponent(course.title)}&tipo=iscrizione`}
                  buyLabel="Invia richiesta di iscrizione"
                >
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-xl" style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                    <i className="fas fa-info-circle" style={{ color: '#D97706', marginTop: '0.15rem', flexShrink: 0 }}></i>
                    <p className="text-amber-800 dark:text-amber-200" style={{ fontSize: '0.8rem', lineHeight: 1.55, margin: 0 }}>
                      <strong>Pagamento all&apos;avvio del corso.</strong> Inviaci la richiesta di iscrizione: ti contatteremo per definire quota e date. Non è richiesto alcun pagamento anticipato.
                    </p>
                  </div>
                </PricingSidebar>
                <p className="text-slate-400 dark:text-gray-500" style={{ fontSize: '0.75rem', margin: '0.75rem 0 0', textAlign: 'center' }}>
                  Riceverai una conferma entro 24-48 ore lavorative
                </p>
              </>

            /* CASO 4 - Prezzo fisso noto per la variante selezionata (varianteCorrente.prezzo è un
               numero): stesso flusso carrello di CASO 2, "Acquista ora" aggiunge al carrello e apre
               subito il drawer (come i bottoni "Buy now" dei negozi online) invece di puntare a un
               link statico non configurato. */
            ) : varianteCorrente.prezzo != null ? (
              <PricingSidebar
                priceRows={[{ label: 'Quota di partecipazione', value: prezzoTesto }]}
                onBuyClick={() => { addToCart({ id: `${slug}-${varianteCorrente.id}`, slug, title: course.title, variant: varianteCorrente.label, price: varianteCorrente.prezzo, image: course.image }); setCartOpen(true); }}
                buyLabel="Acquista ora"
                onAddToCartClick={() => addToCart({ id: `${slug}-${varianteCorrente.id}`, slug, title: course.title, variant: varianteCorrente.label, price: varianteCorrente.prezzo, image: course.image })}
                quoteHref={`/contatti?corso=${encodeURIComponent(course.title)}&variante=${encodeURIComponent(varianteCorrente.label)}`}
                quoteLabel="Richiedi preventivo"
              />

            /* CASO 5 - Nessun prezzo fisso (su richiesta/range/convenzioni): "Richiedi preventivo"
               resta l'unica CTA dominante, niente più "Acquista ora" verso un link statico morto. */
            ) : (
              <PricingSidebar
                priceRows={[{ label: 'Quota di partecipazione', value: course.price }]}
                buyHref={`/contatti?corso=${encodeURIComponent(course.title)}&tipo=preventivo`}
                buyLabel="Richiedi preventivo"
                whatsappHref={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
              />
            )}
          </aside>
        </div>
        </div>
      </section>

      {/* ══════════════ CORSI CORRELATI - sezione a parte dopo la descrizione del corso, carosello con
          frecce, stesso pattern di formazione-del-preposto.js ══════════════ */}
      {corsiCorrelatiRisolti.length > 0 && (
        <section className="bg-white dark:bg-dark-bg border-b border-slate-200 dark:border-[rgba(255,255,255,0.08)]" style={{ padding: '4rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
              <h2 className="text-slate-900 dark:text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: 900, margin: 0 }}>
                Corsi correlati
              </h2>
              {corsiCorrelatiRisolti.length > 3 && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => scrollCarousel(-1)} aria-label="Corsi precedenti" className="cp-carousel-arrow">
                    <i className="fas fa-arrow-left"></i>
                  </button>
                  <button type="button" onClick={() => scrollCarousel(1)} aria-label="Corsi successivi" className="cp-carousel-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>

            <div ref={carouselRef} className="cp-carousel-track">
              {corsiCorrelatiRisolti.map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  className="corso-correlato-card group bg-white dark:bg-dark-card"
                  style={{
                    flex: '0 0 260px', borderRadius: '1.25rem', overflow: 'hidden', textDecoration: 'none',
                    scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.titolo}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s ease' }}
                        className="group-hover:scale-105"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                  </div>
                  <div style={{ padding: '1rem 1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span className="text-slate-900 dark:text-white" style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.3 }}>{c.titolo}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#008C95', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: 'auto' }}>
                      Scopri di più <i className="fas fa-arrow-right" style={{ fontSize: '0.65rem' }}></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTONE RICHIEDI INFO */}
      <div style={{ position: 'fixed', right: '2rem', bottom: '2rem', zIndex: 100 }}>
        <button onClick={() => setShowForm(true)} style={{ backgroundColor: '#008C95', color: 'white', border: 'none', padding: '1rem 1.5rem', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006B73'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#008C95'}>
          Richiedi informazioni
        </button>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-dark-card" style={{ borderRadius: '1rem', maxWidth: '500px', width: '90%', padding: '2rem', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#94A3B8' }}><i className="fas fa-times"></i></button>
            <h3 className="text-slate-900 dark:text-white" style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Richiedi informazioni</h3>
            <p className="text-slate-500 dark:text-gray-300" style={{ marginBottom: '1.5rem' }}>Compila il modulo per ricevere maggiori dettagli su <strong>{course.title}</strong></p>
            <input type="text" placeholder="Nome e Cognome" className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem' }} />
            <input type="email" placeholder="Email" className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem' }} />
            <input type="tel" placeholder="Telefono" className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400" style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '0.5rem' }} />
            <textarea placeholder="Messaggio (opzionale)" rows="3" className="bg-white dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-200 dark:border-gray-600 placeholder-slate-400 dark:placeholder-gray-400" style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderRadius: '0.5rem', resize: 'vertical' }}></textarea>
            <button style={{ width: '100%', backgroundColor: '#008C95', color: 'white', padding: '0.85rem', border: 'none', borderRadius: '9999px', fontWeight: '600', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#006B73'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#008C95'}>
              Invia richiesta
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}