/**
 * Nav.js
 *
 * Lista de links de navegação principal.
 * Recebe a prop `onLinkClick` para fechar o menu mobile ao navegar.
 * Usa <nav> com aria-label para distinguir de outras navegações na página.
 *
 * Convenção: links de navegação em português (interface pt-BR).
 */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** @type {Array<{label: string, href: string}>} */
const NAV_LINKS = [
  { label: "História", id: "historia" },
  { label: "Agenda", id: "agenda" },
  { label: "Galeria", id: "galeria" },
  { label: "Faça Parte", id: "faca-parte" },
  { label: "Contato", id: "contato" },
];

/**
 * @param {{ onLinkClick?: () => void, className?: string }} props
 */
export default function Nav({ onLinkClick, className = "" }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const header = document.querySelector("header");
    const headerOffset = header?.getBoundingClientRect().height ?? 0;
    const firstSectionTop = sections[0]?.offsetTop ?? 0;
    let observer;

    const updateActiveSection = (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

      if (window.scrollY + headerOffset < firstSectionTop) {
        setActiveSection(null);
      } else if (visibleEntries[0]) {
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: `-${headerOffset}px 0px -55% 0px`,
      threshold: [0, 0.1, 0.5, 1],
    });
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      if (window.scrollY + headerOffset < firstSectionTop) setActiveSection(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  return (
    <nav aria-label="Navegação principal" className={className}>
      <ul className="flex flex-col gap-1 md:flex-row md:gap-2" role="list">
        {NAV_LINKS.map(({ label, id }) => {
          const href = isHome ? `#${id}` : `/#${id}`;
          const isActive = isHome && activeSection === id;

          return (
            <li key={id}>
              <Link
                href={href}
                onClick={onLinkClick}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "block rounded-md px-3 py-2 text-base font-medium text-foreground",
                  /* Alvo de toque ≥ 44px via padding vertical */
                  "min-h-[2.75rem] flex items-center",
                  "hover:bg-surface hover:text-primary",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : "",
                  "transition-colors duration-150",
                  /* foco visível definido em globals.css */
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
