import type { ReactNode } from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface AppleStyleNavbarProps {
  links?: NavLink[];
  logo?: ReactNode;
  className?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: 'Formazione', href: '/formazione' },
  { label: 'Agenzia per il Lavoro', href: '/agenzia-per-il-lavoro' },
  { label: 'Corsi', href: '/all-courses' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' },
];

/**
 * Navbar minimale in stile apple.com: fissa, sottile (~48px), sfondo
 * semi-trasparente con backdrop-blur, palette e font brand Alètheia.
 */
export default function AppleStyleNavbar({
  links = DEFAULT_LINKS,
  logo,
  className = '',
}: AppleStyleNavbarProps) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-center backdrop-blur-md bg-white/70 dark:bg-dark-bg/70 border-b border-grey-100 dark:border-[rgba(255,255,255,0.08)] ${className}`}
    >
      <div className="w-full max-w-ds-container px-6 flex items-center justify-center gap-8">
        {logo ?? (
          <span className="text-primary dark:text-white font-heading text-ds-h3 font-semibold tracking-tight">
            Alètheia
          </span>
        )}
        <ul className="flex items-center gap-6 list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-ds-p2 text-grey-500 dark:text-grey-100 hover:text-primary dark:hover:text-white transition-colors duration-200 no-underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
