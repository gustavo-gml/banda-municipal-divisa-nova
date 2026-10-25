/**
 * Nav.js
 *
 * Lista de links de navegação principal.
 * Recebe a prop `onLinkClick` para fechar o menu mobile ao navegar.
 * Usa <nav> com aria-label para distinguir de outras navegações na página.
 *
 * Convenção: links de navegação em português (interface pt-BR).
 */

import Link from "next/link";

/** @type {Array<{label: string, href: string}>} */
const NAV_LINKS = [
  { label: "História", href: "/historia" },
  { label: "Agenda", href: "/agenda" },
  { label: "Galeria", href: "/galeria" },
  { label: "Faça Parte", href: "/faca-parte" },
  { label: "Contato", href: "/contato" },
];

/**
 * @param {{ onLinkClick?: () => void, className?: string }} props
 */
export default function Nav({ onLinkClick, className = "" }) {
  return (
    <nav aria-label="Navegação principal" className={className}>
      <ul className="flex flex-col gap-1 md:flex-row md:gap-2" role="list">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onLinkClick}
              className={[
                "block rounded-md px-3 py-2 text-base font-medium text-foreground",
                /* Alvo de toque ≥ 44px via padding vertical */
                "min-h-[2.75rem] flex items-center",
                "hover:bg-surface hover:text-primary",
                "transition-colors duration-150",
                /* foco visível definido em globals.css */
              ].join(" ")}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
