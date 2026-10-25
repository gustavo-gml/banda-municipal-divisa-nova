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

type NavLink = {
  label: string;
  id: string;
};

type NavProps = {
  onLinkClick?: () => void;
  className?: string;
};

const NAV_LINKS: NavLink[] = [
  { label: "História", id: "historia" },
  { label: "Agenda", id: "agenda" },
  { label: "Galeria", id: "galeria" },
  { label: "Faça Parte", id: "faca-parte" },
  { label: "Contato", id: "contato" },
];

export default function Nav({ onLinkClick, className = "" }: NavProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null,
    );
    const header = document.querySelector("header");
    const headerOffset = header?.getBoundingClientRect().height ?? 0;
    const updateActiveSection = () => {
      const currentPosition = window.scrollY + headerOffset + 1;
      const firstSectionTop =
        (sections[0]?.getBoundingClientRect().top ?? 0) + window.scrollY;

      if (currentPosition < firstSectionTop) {
        setActiveSection(null);
        return;
      }

      const currentSection = sections
        .map((section) => ({
          id: section.id,
          top: section.getBoundingClientRect().top + window.scrollY,
        }))
        .filter((section) => section.top <= currentPosition)
        .at(-1);

      setActiveSection(currentSection?.id ?? null);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: `-${headerOffset}px 0px -55% 0px`,
      threshold: [0, 0.1, 0.5, 1],
    });
    sections.forEach((section) => observer.observe(section));

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
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
