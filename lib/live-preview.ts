import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { NewsItem } from './wp-news';
import { styleBodyHtml } from './wp-html';

/**
 * Anteprima live nell'editor di WordPress (contratto in wordpress/README.md §7, punto 4).
 *
 * Il pannello del plugin (assets/live-preview.js) mostra questo sito in un iframe e, a ogni modifica di
 * un campo, invia con postMessage i valori non ancora salvati. Qui li riceviamo e sostituiamo i dati
 * della pagina, senza salvare né ricaricare.
 *
 *   WP  → Next: { source: 'aletheia-wp',   type: 'preview', payload: LivePayload }
 *   Next → WP : { source: 'aletheia-next', type: 'ready' }   (al mount; WP risponde col suo stato corrente)
 *
 * Sicurezza: si accetta solo l'origine di WordPress (NEXT_PUBLIC_WP_ORIGIN) e solo dentro un iframe in
 * Preview Mode con `?live=1`. Il contenuto HTML arriva da editor autenticati, come quello pubblicato.
 */

export type LivePayload = {
  postId: number;
  postType: string;
  kind: 'content' | 'options';
  title: string;
  content: string;
  acf: Record<string, unknown>;
};

/** Origine di WordPress (es. https://cms.aletheiasrl.it). Vuota = anteprima live disattivata. */
const WP_ORIGIN = process.env.NEXT_PUBLIC_WP_ORIGIN || '';

/** Valida un messaggio ricevuto. Funzione pura (testabile): restituisce il payload o null. */
export function parseLiveMessage(origin: string, data: unknown, allowedOrigin: string): LivePayload | null {
  if (!allowedOrigin || origin !== allowedOrigin) return null;
  if (!data || typeof data !== 'object') return null;
  const msg = data as { source?: unknown; type?: unknown; payload?: Record<string, unknown> };
  if (msg.source !== 'aletheia-wp' || msg.type !== 'preview' || !msg.payload || typeof msg.payload !== 'object') return null;
  const p = msg.payload;
  if (p.kind !== 'content' && p.kind !== 'options') return null;
  const acf = p.acf && typeof p.acf === 'object' && !Array.isArray(p.acf) ? (p.acf as Record<string, unknown>) : {};
  return {
    postId: Number(p.postId),
    postType: typeof p.postType === 'string' ? p.postType : '',
    kind: p.kind,
    title: typeof p.title === 'string' ? p.title : '',
    content: typeof p.content === 'string' ? p.content : '',
    acf,
  };
}

/**
 * Ultimo payload di contenuto ricevuto da WordPress per `postId`, oppure null se l'anteprima live non è
 * attiva (pagina pubblica, fuori dall'iframe, origine non configurata).
 */
export function useLivePayload(postId?: number): LivePayload | null {
  const router = useRouter();
  const active = Boolean(WP_ORIGIN) && router.isPreview && router.query.live === '1';
  const [payload, setPayload] = useState<LivePayload | null>(null);

  useEffect(() => {
    if (!active || typeof window === 'undefined' || window.parent === window) return undefined;
    const onMessage = (e: MessageEvent) => {
      const p = parseLiveMessage(e.origin, e.data, WP_ORIGIN);
      if (!p || p.kind !== 'content') return;
      if (postId != null && p.postId !== postId) return; // anteprima di un altro contenuto
      setPayload(p);
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ source: 'aletheia-next', type: 'ready' }, WP_ORIGIN);
    return () => window.removeEventListener('message', onMessage);
  }, [active, postId]);

  return active ? payload : null;
}

/** Applica il payload live a una news: titolo, corpo e campi ACF extra. */
export function applyLiveToNews(article: NewsItem, live: LivePayload): NewsItem {
  const fonte = typeof live.acf.fonte === 'string' && live.acf.fonte.trim() ? live.acf.fonte.trim() : undefined;
  const tempo = Number(live.acf.tempo_lettura);
  const next: NewsItem = {
    ...article,
    title: live.title || article.title,
    bodyHtml: styleBodyHtml(live.content),
  };
  if (fonte) next.fonte = fonte;
  if (Number.isFinite(tempo) && tempo > 0) next.tempoLettura = tempo;
  return next;
}

/** Comodità per le pagine news: l'articolo da mostrare (live se attivo, altrimenti quello delle props). */
export function useLiveNews(article: NewsItem): NewsItem {
  const live = useLivePayload(article.id);
  return useMemo(() => (live ? applyLiveToNews(article, live) : article), [article, live]);
}
