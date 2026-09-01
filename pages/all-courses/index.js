import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { getLenis } from '../../lib/lenis';
import { buildCourseFamilies } from '../../data/courseFamilies';
import CourseFamilyCard from '../../components/CourseFamilyCard';
import CourseSkeleton from '../../components/CourseSkeleton';
import Reveal from '../../components/Reveal';
import SeoHead from '../../components/SeoHead';

import { coursesData } from '../../data/coursesRaw';

const GRID_SPRING = { type: 'spring', stiffness: 500, damping: 40 };

const categoryMeta = {
  'sicurezza-lavoro':    { name: 'Sicurezza sul Lavoro', icon: 'fas fa-hard-hat' },
  'decreto-attrezzature':{ name: 'Decreto Attrezzature', icon: 'fas fa-tools' },
  fitosanitario:         { name: 'Fitosanitario', icon: 'fas fa-leaf' },
  'sicurezza-alimentare':{ name: 'Sicurezza Alimentare', icon: 'fas fa-utensils' },
  regionale:             { name: 'Formazione Finanziata', icon: 'fas fa-euro-sign' },
  professionale:         { name: 'Formazione Professionale', icon: 'fas fa-briefcase' },
  digitali:              { name: 'Certificazioni Digitali', icon: 'fas fa-laptop-code' },
  agricolo:              { name: 'Settore Agricolo', icon: 'fas fa-seedling' },
  gol:                   { name: 'Programma GOL', icon: 'fas fa-rocket' },
  shop:                  { name: 'Shop', icon: 'fas fa-shopping-cart' },
};

// Sotto-categorie granulari: corrispondono ai query param ?categoria= usati nel mega menu di Formazione (Header.js)
const subCategoryMeta = {
  'fse-plus':                      'FSE+',
  'fondi-interprofessionali':      'Fondi Interprofessionali',
  'fondo-nuove-competenze':        'Fondo Nuove Competenze',
  'sicurezza-lavoro':              'Sicurezza sui luoghi di lavoro',
  'decreto-attrezzature':          'Decreto attrezzature',
  'fitosanitario':                 'Fitosanitario',
  'sicurezza-alimentare':          'Sicurezza alimentare',
  'icdl':                          'ICDL',
  'certificazioni-informatiche':   'Certificazioni Informatiche',
  'ecm':                           'ECM',
  'certificazione':                'Corsi Qualificati',
  'corsi-pa':                      'Corsi per la PA',
};

export default function AllCourses() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  // Filtro granulare attivato dal mega menu via ?categoria=<slug>
  const [selectedSub, setSelectedSub] = useState('');
  // Filtro Shop: mostra solo i corsi con shop: true
  const [shopFilter, setShopFilter] = useState(false);
  // Riferimento alla griglia corsi: usato per riportare in cima ai primi corsi al cambio categoria
  const gridRef = useRef(null);

  // framer-motion (motion.div/AnimatePresence) va renderizzato SOLO lato client: eseguirlo
  // durante il prerendering Node (SSG) manda in crash il build su alcuni ambienti
  // ("Cannot read properties of null (reading 'useContext')" dentro framer-motion).
  // Il server/primo paint mostra quindi la stessa griglia senza motion; dopo l'hydration
  // subentra la versione animata, senza mismatch (la struttura DOM di partenza è identica).
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Skeleton di cortesia sui cambi di filtro "macro" (categoria/sotto-categoria/shop),
  // non sulla ricerca testuale: digitare deve restare istantaneo.
  const [isFiltering, setIsFiltering] = useState(false);
  const filterMountRef = useRef(true);
  useEffect(() => {
    if (filterMountRef.current) {
      filterMountRef.current = false;
      return;
    }
    setIsFiltering(true);
    const t = setTimeout(() => setIsFiltering(false), 350);
    return () => clearTimeout(t);
  }, [selectedCategory, selectedSub, shopFilter]);

  // Riporta in cima alla pagina in modo ISTANTANEO. Lo scroll fluido qui è
  // controproducente: partendo dal fondo, mentre la lista si accorcia il browser
  // "clampa" l'animazione in corso sul footer per un istante (flash). Saltando
  // subito a top:0 prima del re-render, la pagina è già in cima quando la lista
  // si accorcia e il footer non compare mai.
  const scrollToCourses = () => {
    // Lo scroll del sito è gestito da Lenis (lib/lenis.js), che mantiene un proprio
    // target interno e pilota la posizione via il suo loop RAF. Usare window.scrollTo
    // non basta: Lenis, che aveva il target in fondo, lo ri-applica dopo
    // l'accorciamento della lista e riporta la pagina sul footer.
    // lenis.scrollTo(0, { immediate: true }) salta in cima E aggiorna il target di Lenis.
    const lenis = getLenis();
    if (lenis) {
      // resize() PRIMA dello scrollTo: dopo l'accorciamento della lista Lenis ha
      // ancora in cache le vecchie dimensioni del documento e il suo loop RAF
      // riporterebbe la pagina verso il fondo. resize() ricalcola i limiti, poi
      // scrollTo(0, immediate) salta in cima aggiornando il target interno.
      lenis.resize();
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback se Lenis non è attivo: behavior:'instant' ignora lo
      // scroll-behavior:smooth globale (globals.css) ed è sincrono.
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // useLayoutEffect: scatta DOPO l'aggiornamento del DOM ma PRIMA che il browser
  // dipinga. Passando da molti corsi a pochi (es. GOL, Settore Agricolo) la pagina
  // si accorcia e il browser "clampa" la posizione sul footer: riposizionando qui
  // (prima del paint) quel frame sul footer non viene mai mostrato.
  // Il flag evita lo scroll indesiderato al primo caricamento.
  const skipNextScroll = useRef(true);
  useLayoutEffect(() => {
    if (skipNextScroll.current) {
      skipNextScroll.current = false;
      return;
    }
    // Scroll in cima subito (prima del paint).
    scrollToCourses();
    // Dopo l'accorciamento della lista il browser clampa window.scrollY verso il fondo
    // (per ~1 frame) e il loop RAF di Lenis lo adotta. L'evento 'scroll' scatta PRIMA
    // del paint: ri-fissando in cima ad ogni scroll spurio per una breve finestra,
    // quel frame sul footer non viene mai dipinto. Trascorsa la finestra Lenis ha
    // ormai adottato la posizione 0 e resta stabile.
    const pinTop = () => {
      if (window.scrollY !== 0) scrollToCourses();
    };
    window.addEventListener('scroll', pinTop);
    const release = setTimeout(() => window.removeEventListener('scroll', pinTop), 250);
    return () => {
      clearTimeout(release);
      window.removeEventListener('scroll', pinTop);
    };
  }, [selectedCategory, selectedSub, shopFilter]);

  // Al mount (o quando cambia la query) leggo ?categoria= e imposto il filtro granulare corrispondente
  useEffect(() => {
    if (!router.isReady) return;
    const { categoria } = router.query;
    if (categoria && subCategoryMeta[categoria]) {
      setSelectedSub(categoria);
      setSelectedCategory(''); // i due filtri sono mutuamente esclusivi
    }
  }, [router.isReady, router.query]);

  // Reset di tutti i filtri senza ricaricare la pagina (pulisco anche il query param in modo shallow)
  const resetFilters = () => {
    scrollToCourses();
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSub('');
    setShopFilter(false);
    if (router.query.categoria) {
      router.replace('/all-courses', undefined, { shallow: true });
    }
  };

  // Selezione di una macro-categoria dalla sidebar: azzera gli altri filtri
  const selectCategory = (key) => {
    scrollToCourses();
    if (key === 'shop') {
      setShopFilter(true);
      setSelectedCategory('');
    } else {
      setShopFilter(false);
      setSelectedCategory(key);
    }
    setSelectedSub('');
    if (router.query.categoria) {
      router.replace('/all-courses', undefined, { shallow: true });
    }
  };

  // Corsi raggruppati per famiglia (es. Antincendio Livello 1/2/3 + Aggiornamenti = 1 sola card)
  const courseFamilies = buildCourseFamilies(coursesData);

  const categoryCounts = {};
  coursesData.forEach((c) => {
    categoryCounts[c.categoryKey] = (categoryCounts[c.categoryKey] || 0) + 1;
  });
  const shopCount = coursesData.filter((c) => c.shop).length;

  const filteredFamilies = courseFamilies.filter((family) => {
    const matchSearch =
      searchTerm === '' ||
      family.titolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      family.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === '' || family.categoryKey === selectedCategory;
    const matchSub = selectedSub === '' ||
      family.subKey === selectedSub ||
      (selectedSub === 'certificazioni-informatiche' && family.subKey === 'icdl');
    const matchShop = !shopFilter || family.shop === true;
    return matchSearch && matchCategory && matchSub && matchShop;
  });

  return (
    <>
      <Head>
        <title>Tutti i Corsi - Alètheia Srl</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <SeoHead
          title="Tutti i Corsi - Alètheia Srl"
          description="Scopri il catalogo completo dei corsi di formazione Alètheia Srl: sicurezza sul lavoro, fitosanitario, sicurezza alimentare, formazione finanziata e certificazioni digitali."
          url="/all-courses"
        />
      </Head>

      <Header active="/all-courses" />

      {/* HERO */}
      <div
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0a4f54 60%, #008C95 100%)' }}
        className="text-white pt-36 pb-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            Catalogo completo
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Tutti i Corsi</h1>
          <p className="text-lg text-white/75 max-w-xl leading-relaxed">
            Scopri la nostra offerta formativa completa e scegli il corso che fa per te
          </p>
        </div>
      </div>

      {/* MAIN CONTENT - wrapper full width con margine laterale DS (120px ≥1280px) */}
      <div className="dark:bg-dark-bg xl:px-[120px]">
      {/* Contenitore DS: max-width 1440px centrato + sidebar 260px sticky + gap 40px + griglia card */}
      <div className="max-w-[1680px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10" style={{ minHeight: '100vh' }}>

        {/* SIDEBAR */}
        <aside className="space-y-4" style={{ position: 'sticky', top: '5rem', height: 'fit-content' }}>
          {/* Search */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3 border border-slate-200 dark:border-gray-600 rounded-xl px-4 py-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <i className="fas fa-search text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder="Cerca corsi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none outline-none text-sm text-slate-700 dark:text-gray-200 bg-transparent placeholder:text-slate-400"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer">
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-[rgba(255,255,255,0.08)]">
            <h2 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Categorie
            </h2>
            <ul className="space-y-1">
              <li
                onClick={resetFilters}
                className={`flex justify-between items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors ${
                  selectedCategory === '' && selectedSub === '' && !shopFilter ? 'bg-[#008C95]/10 dark:bg-[#10B981]/10 text-primary dark:text-[#10B981]' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  Tutti i corsi
                </span>
                <span className="text-xs bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-300 px-2 py-0.5 rounded-full font-semibold">
                  {coursesData.length}
                </span>
              </li>
              {/* Shop - voce speciale con badge distinto */}
              <li
                onClick={() => selectCategory('shop')}
                className={`flex justify-between items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors ${
                  shopFilter ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-shopping-cart" style={{ fontSize: '0.75rem', color: shopFilter ? '#D97706' : undefined }}></i>
                  Shop
                </span>
                <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-semibold">
                  {shopCount}
                </span>
              </li>
              {/* Separatore */}
              <li className="border-t border-slate-100 dark:border-gray-700 my-1.5 pointer-events-none" />
              {Object.entries(categoryMeta).filter(([key]) => key !== 'shop').map(([key, cat]) => (
                <li
                  key={key}
                  onClick={() => selectCategory(key)}
                  className={`flex justify-between items-center px-3 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-colors ${
                    selectedCategory === key && !shopFilter ? 'bg-[#008C95]/10 dark:bg-[#10B981]/10 text-primary dark:text-[#10B981]' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {cat.name}
                  </span>
                  <span className="text-xs bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-300 px-2 py-0.5 rounded-full font-semibold">
                    {categoryCounts[key] || 0}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA box */}
          <div
            className="rounded-2xl p-5 text-white text-center"
            style={{ background: 'linear-gradient(135deg, #008C95 0%, #006B73 100%)' }}
          >
            <p className="text-sm font-semibold mb-1">Hai bisogno di aiuto?</p>
            <p className="text-xs text-white/75 mb-4">Il nostro team è a tua disposizione</p>
            <a
              href="tel:+390932862613"
              className="inline-block bg-white text-primary text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors no-underline"
            >
              <i className="fas fa-phone mr-1.5"></i> Chiamaci
            </a>
          </div>
        </aside>

        {/* COURSE GRID - min-height: garantisce spazio sufficiente per portare la
            griglia in cima anche con pochi corsi, evitando il "clamp" sul footer */}
        <main ref={gridRef} style={{ scrollMarginTop: '100px' }}>
          {/* Result header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500 dark:text-gray-400">
              <span className="font-bold text-slate-800 dark:text-gray-100">{filteredFamilies.length}</span>{' '}
              {filteredFamilies.length === 1 ? 'corso trovato' : 'corsi trovati'}
              {shopFilter && ' in "Shop"'}
              {!shopFilter && selectedCategory && ` in "${categoryMeta[selectedCategory]?.name}"`}
              {selectedSub && ` in "${subCategoryMeta[selectedSub]}"`}
            </p>
            {(searchTerm || selectedCategory || selectedSub || shopFilter) && (
              <button
                onClick={resetFilters}
                className="text-xs text-primary font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Rimuovi filtri
              </button>
            )}
          </div>

          {isFiltering ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {Array.from({ length: Math.min(filteredFamilies.length || 6, 6) }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))}
            </div>
          ) : filteredFamilies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-slate-500 dark:text-gray-300 text-lg font-medium">Nessun corso trovato</p>
              <p className="text-slate-400 dark:text-gray-500 text-sm mt-1">Prova a modificare i filtri di ricerca</p>
            </div>
          ) : mounted ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              <AnimatePresence mode="popLayout">
                {filteredFamilies.map((family, i) => (
                  <motion.div
                    key={family.slug}
                    layout
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      layout: GRID_SPRING,
                      opacity: { duration: 0.25, ease: 'easeOut', delay: Math.min(i, 8) * 0.03 },
                    }}
                  >
                    <Reveal className="h-full">
                      <CourseFamilyCard family={family} />
                    </Reveal>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            // Prerendering (SSG) e primo paint prima dell'hydration: stessa griglia,
            // senza framer-motion (vedi commento su `mounted` sopra).
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
              {filteredFamilies.map((family) => (
                <div key={family.slug} className="h-full">
                  <Reveal className="h-full">
                    <CourseFamilyCard family={family} />
                  </Reveal>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      </div>
      <Footer />
    </>
  );
}
