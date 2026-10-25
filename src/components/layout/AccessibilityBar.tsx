/**
 * AccessibilityBar.js
 *
 * Barra de acessibilidade exibida logo abaixo do Header.
 * Controles (com rótulo de texto + ícone):
 *   1. Tema — alterna entre claro e escuro (via next-themes)
 *   2. Contraste — liga/desliga alto contraste (via AccessibilityContext)
 *   3. Fonte — botões + e - para aumentar/diminuir a escala de texto
 *
 * Cada botão tem aria-pressed ou aria-label descritivo.
 * Alvo de toque mínimo: 44px.
 *
 * "use client" necessário por hooks de estado/contexto.
 */

"use client";

import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { useAccessibility } from "@/hooks/useAccessibility";

export default function AccessibilityBar() {
  const { theme, setTheme } = useTheme();
  const {
    highContrast,
    toggleContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    fontScales,
  } = useAccessibility();

  /* Evitar mismatch de hidratação com next-themes */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  const isDark = mounted && theme === "dark";
  const isMaxFont = fontSize === fontScales[fontScales.length - 1];
  const isMinFont = fontSize === fontScales[0];

  return (
    <div
      className="border-b border-border bg-background"
      role="region"
      aria-label="Controles de acessibilidade"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1.5 md:px-6">
        {/* ---- Label ---- */}
        <span className="mr-2 text-xs font-medium text-muted" aria-hidden="true">
          Acessibilidade:
        </span>

        {/* ---- Botão: Tema ---- */}
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-pressed={isDark}
          aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
          className="a11y-bar-btn"
          title={isDark ? "Tema claro" : "Tema escuro"}
        >
          <span aria-hidden="true" className="text-base leading-none">
            {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
          </span>
          <span className="text-xs">Tema</span>
        </button>

        {/* ---- Separador visual ---- */}
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

        {/* ---- Botão: Alto Contraste ---- */}
        <button
          type="button"
          onClick={toggleContrast}
          aria-pressed={highContrast}
          aria-label={
            highContrast ? "Desativar alto contraste" : "Ativar alto contraste"
          }
          className="a11y-bar-btn"
          title="Alto contraste"
        >
          <span aria-hidden="true" className="text-base leading-none">◑</span>
          <span className="text-xs">Contraste</span>
        </button>

        {/* ---- Separador visual ---- */}
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

        {/* ---- Botões: Fonte - / + ---- */}
        <div
          className="flex items-center gap-1"
          role="group"
          aria-label="Tamanho da fonte"
        >
          <button
            type="button"
            onClick={decreaseFontSize}
            disabled={isMinFont}
            aria-label="Diminuir tamanho da fonte"
            className="a11y-bar-btn disabled:cursor-not-allowed disabled:opacity-40"
            title="Diminuir fonte"
          >
            <span aria-hidden="true" className="text-base font-bold leading-none">A−</span>
            <span className="text-xs">Fonte −</span>
          </button>

          {/* Indicador da escala atual */}
          <span className="text-xs text-muted" aria-live="polite" aria-label={`Tamanho atual: ${fontSize}%`}>
            {fontSize}%
          </span>

          <button
            type="button"
            onClick={increaseFontSize}
            disabled={isMaxFont}
            aria-label="Aumentar tamanho da fonte"
            className="a11y-bar-btn disabled:cursor-not-allowed disabled:opacity-40"
            title="Aumentar fonte"
          >
            <span aria-hidden="true" className="text-base font-bold leading-none">A+</span>
            <span className="text-xs">Fonte +</span>
          </button>
        </div>
      </div>
    </div>
  );
}
