/**
 * AccessibilityContext.js
 *
 * Gerencia dois estados globais de acessibilidade:
 *   1. Alto contraste (liga/desliga) → aplica `data-contrast="high"` no <html>
 *   2. Escala de fonte (100 | 112 | 125 | 150) → aplica `font-size` inline no <html>
 *
 * Ambos são persistidos em localStorage (com try/catch para SSR seguro).
 * O Provider deve envolver o <body> DENTRO do RootLayout.
 *
 * Uso:
 *   import { useAccessibility } from "@/hooks/useAccessibility";
 *   const { highContrast, toggleContrast, fontSize, setFontSize } = useAccessibility();
 */

"use client";

import { createContext, startTransition, useCallback, useEffect, useState } from "react";

/* Escalas de fonte disponíveis em % */
export const FONT_SCALES = [100, 112, 125, 150];

export const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  /* ------------------------------------------------------------------ */
  /* Estado: alto contraste                                               */
  /* ------------------------------------------------------------------ */
  const [highContrast, setHighContrast] = useState(false);

  /* ------------------------------------------------------------------ */
  /* Estado: escala de fonte (%)                                          */
  /* ------------------------------------------------------------------ */
  const [fontSize, setFontSizeState] = useState(100);

  /* ------------------------------------------------------------------ */
  /* Hidratação: ler preferências salvas no localStorage                  */
  /* Feito em useEffect para evitar mismatch SSR/cliente.                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    try {
      const savedContrast = localStorage.getItem("a11y-contrast");
      const savedFont = localStorage.getItem("a11y-font-size");

      if (savedContrast === "high") {
        document.documentElement.setAttribute("data-contrast", "high");
        startTransition(() => setHighContrast(true));
      }

      if (savedFont && FONT_SCALES.includes(Number(savedFont))) {
        const scale = Number(savedFont);
        document.documentElement.style.fontSize = `${scale}%`;
        startTransition(() => setFontSizeState(scale));
      }
    } catch {
      /* localStorage indisponível (modo privado ou SSR) — silenciar */
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /* Ação: alternar alto contraste                                        */
  /* ------------------------------------------------------------------ */
  const toggleContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      try {
        if (next) {
          document.documentElement.setAttribute("data-contrast", "high");
          localStorage.setItem("a11y-contrast", "high");
        } else {
          document.documentElement.removeAttribute("data-contrast");
          localStorage.setItem("a11y-contrast", "normal");
        }
      } catch {
        /* silenciar erros de storage */
      }
      return next;
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Ação: definir escala de fonte                                        */
  /* ------------------------------------------------------------------ */
  const setFontSize = useCallback((scale) => {
    if (!FONT_SCALES.includes(scale)) return;
    setFontSizeState(scale);
    try {
      document.documentElement.style.fontSize = `${scale}%`;
      localStorage.setItem("a11y-font-size", String(scale));
    } catch {
      /* silenciar erros de storage */
    }
  }, []);

  /* Atalhos: aumentar / diminuir fonte */
  const increaseFontSize = useCallback(() => {
    setFontSizeState((prev) => {
      const idx = FONT_SCALES.indexOf(prev);
      const next = FONT_SCALES[Math.min(idx + 1, FONT_SCALES.length - 1)];
      if (next !== prev) {
        try {
          document.documentElement.style.fontSize = `${next}%`;
          localStorage.setItem("a11y-font-size", String(next));
        } catch { /* silenciar */ }
      }
      return next;
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeState((prev) => {
      const idx = FONT_SCALES.indexOf(prev);
      const next = FONT_SCALES[Math.max(idx - 1, 0)];
      if (next !== prev) {
        try {
          document.documentElement.style.fontSize = `${next}%`;
          localStorage.setItem("a11y-font-size", String(next));
        } catch { /* silenciar */ }
      }
      return next;
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Contexto exposto                                                     */
  /* ------------------------------------------------------------------ */
  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleContrast,
        fontSize,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        fontScales: FONT_SCALES,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
