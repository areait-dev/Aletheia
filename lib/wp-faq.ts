import { FAQ_PAGINE } from '../data/faq';
import { CHATBOT_FAQ } from '../data/chatbot-faq';
import { htmlToText } from './wp';
import { acfOf, getCptPosts, str, titleOf } from './wp-cpt';

/**
 * FAQ (CPT `faq`) per le pagine di formazione, con ripiego sui dati locali (`data/faq.js`).
 * Una FAQ appartiene a una pagina quando il campo ACF `pagina` è uguale alla chiave di pagina
 * (es. `ecm`, `corsi-pa`, `obbligatoria`); titolo = domanda, contenuto = risposta (testo semplice).
 * SOLO lato server (getStaticProps).
 */

export type Faq = { domanda: string; risposta: string };

export async function getFaqs(pagina: string): Promise<Faq[]> {
  const local = (FAQ_PAGINE as Record<string, Faq[]>)[pagina] ?? [];
  const posts = await getCptPosts('faq');
  if (!posts) return local;
  const faqs = posts
    .filter((p) => str(acfOf(p).pagina) === pagina)
    .map((p) => ({ domanda: titleOf(p), risposta: htmlToText(p.content?.rendered ?? '') }))
    .filter((f) => f.domanda && f.risposta);
  return faqs.length > 0 ? faqs : local;
}

export type ChatbotFaqs = { formazione: Faq[]; lavoro: Faq[]; generale: Faq[] };

/**
 * FAQ del chatbot: stesso CPT `faq`, con `pagina` = `chatbot-formazione` | `chatbot-lavoro` | `chatbot-generale`
 * (ordine = ordine di pagina WP). Gruppo senza voci in WordPress → testi locali di `data/chatbot-faq.js`.
 * `null` quando WordPress è spento o non risponde: il chatbot usa allora i suoi testi locali, e le props delle
 * pagine restano identiche a prima.
 */
export async function getChatbotFaqs(): Promise<ChatbotFaqs | null> {
  const posts = await getCptPosts('faq');
  if (!posts) return null;
  const local = CHATBOT_FAQ as ChatbotFaqs;
  const gruppo = (nome: keyof ChatbotFaqs): Faq[] => {
    const faqs = posts
      .filter((p) => str(acfOf(p).pagina) === `chatbot-${nome}`)
      .map((p) => ({ domanda: titleOf(p), risposta: htmlToText(p.content?.rendered ?? '') }))
      .filter((f) => f.domanda && f.risposta);
    return faqs.length > 0 ? faqs : local[nome];
  };
  return { formazione: gruppo('formazione'), lavoro: gruppo('lavoro'), generale: gruppo('generale') };
}
