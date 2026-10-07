/**
 * Parser dei campi "lista" di WordPress (una voce per riga, colonne separate da `|`, vedi wordpress/README.md §4).
 * Funzioni pure: usabili sia lato server sia nello script di migrazione (che fa il percorso inverso).
 */

export type Link = { label: string; href: string };
export type SocialLink = { icon: string; href: string; name: string };
export type MenuGroup = { title: string; href: string; items: Link[] };
export type FooterGroup = { sottotitolo: string; links: Link[] };
export type FooterColonna = { titolo: string; gruppi: FooterGroup[] };

/** Righe non vuote, tagliate. */
export function lines(text: unknown): string[] {
  return typeof text === 'string' ? text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean) : [];
}

function cols(line: string): string[] {
  return line.split('|').map((c) => c.trim());
}

/** `Etichetta|URL` per riga. */
export function parseLinks(text: unknown): Link[] {
  return lines(text)
    .map((l) => {
      const [label = '', href = ''] = cols(l);
      return { label, href };
    })
    .filter((l) => l.label);
}

/** `Classe Font Awesome|URL|Nome` per riga (la classe è normalizzata: `fa-brands fa-facebook` → `fab fa-facebook`). */
export function parseSocial(text: unknown): SocialLink[] {
  return lines(text)
    .map((l) => {
      const [icon = '', href = '', name = ''] = cols(l);
      return { icon: icon.replace('fa-brands', 'fab').replace('fa-solid', 'fas'), href, name };
    })
    .filter((s) => s.icon && s.href);
}

/** `# Titolo|URL` apre un gruppo del mega-menu; le righe sotto sono le sue voci `Etichetta|URL`. */
export function parseMenuGroups(text: unknown): MenuGroup[] {
  const groups: MenuGroup[] = [];
  for (const line of lines(text)) {
    if (line.startsWith('#')) {
      const [title = '', href = ''] = cols(line.replace(/^#+\s*/, ''));
      if (title) groups.push({ title, href, items: [] });
    } else if (groups.length > 0) {
      const [label = '', href = ''] = cols(line);
      if (label && href) groups[groups.length - 1].items.push({ label, href });
    }
  }
  return groups;
}

/**
 * `# Titolo colonna`, `## Sottotitolo` (facoltativo; `##` da solo = gruppo senza sottotitolo), poi `Etichetta|URL`.
 * Le voci prima di qualsiasi `##` finiscono in un gruppo senza sottotitolo.
 */
export function parseFooterColonne(text: unknown): FooterColonna[] {
  const colonne: FooterColonna[] = [];
  for (const line of lines(text)) {
    if (/^#(?!#)/.test(line)) {
      colonne.push({ titolo: line.replace(/^#\s*/, ''), gruppi: [] });
    } else if (colonne.length === 0) {
      continue;
    } else if (line.startsWith('##')) {
      colonne[colonne.length - 1].gruppi.push({ sottotitolo: line.replace(/^##\s*/, ''), links: [] });
    } else {
      const col = colonne[colonne.length - 1];
      if (col.gruppi.length === 0) col.gruppi.push({ sottotitolo: '', links: [] });
      const [label = '', href = ''] = cols(line);
      if (label && href) col.gruppi[col.gruppi.length - 1].links.push({ label, href });
    }
  }
  return colonne.filter((c) => c.gruppi.some((g) => g.links.length > 0));
}
