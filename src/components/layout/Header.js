/**
 * Header.js
 *
 * Cabeçalho global da aplicação.
 * - Desktop: logo + nome + Nav inline
 * - Mobile: logo + nome + botão hambúrguer
 *
 * Acessibilidade:
 * - aria-expanded no botão hambúrguer
 * - aria-controls referenciando o id do menu mobile
 * - Fecha ao pressionar Esc
 * - Foco retorna ao botão hambúrguer ao fechar
 * - Menu mobile como <div role="dialog" aria-modal="false"> (não é modal — não prende foco)
 *
 * "use client" necessário por useState/useEffect/eventos.
 */

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Nav from "./Nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const menuId = "mobile-menu";

  /* Fechar menu com Esc */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  /* Fechar menu ao redimensionar para desktop (evita menu oculto mas aberto) */
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* ---- Logo + Nome ---- */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md"
          aria-label="Banda Municipal José Ângelo Vaz — página inicial"
        >
          {/* Ícone de clave de sol em SVG inline (decorativo, alt vazio) */}
          <span aria-hidden="true" className="text-2xl leading-none text-accent">
            𝄞
          </span>
          <span className="font-heading text-lg font-bold leading-tight text-foreground md:text-xl">
            <span className="block text-xs font-normal text-muted md:inline md:text-base">
              Banda Municipal{" "}
            </span>
            José Ângelo Vaz
          </span>
        </Link>

        {/* ---- Nav desktop ---- */}
        <Nav className="hidden md:block" />

        {/* ---- Botão hambúrguer (mobile) ---- */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={[
            "flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md md:hidden",
            "border border-border bg-surface text-foreground",
            "hover:bg-background transition-colors duration-150",
          ].join(" ")}
        >
          {/* Três linhas do hambúrguer — animadas */}
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* ---- Menu mobile expandido ---- */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-border bg-surface px-4 py-3 md:hidden"
      >
        <Nav onLinkClick={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
