/**
 * Utilità HTML pure, utilizzabili sia lato server sia nel browser (nessun import server-only).
 */

/** Applica le classi degli stili articolo (`.article-*` in pages/news/[slug].js) all'HTML di WordPress. */
export function styleBodyHtml(html: string): string {
  return html
    .replace(/<h[23]>/g, '<h2 class="article-h2">')
    .replace(/<\/h3>/g, '</h2>')
    .replace(/<p>/g, '<p class="article-p">')
    .replace(/<ul>/g, '<ul class="article-ul">')
    .replace(/<ol>/g, '<ol class="article-ol">');
}
