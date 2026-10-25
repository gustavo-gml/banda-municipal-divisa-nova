/**
 * useAccessibility.js
 *
 * Hook de conveniência para acessar o AccessibilityContext.
 * Lança erro se usado fora do AccessibilityProvider.
 *
 * Uso:
 *   const { highContrast, toggleContrast, fontSize, increaseFontSize, decreaseFontSize } = useAccessibility();
 */

"use client";

import { useContext } from "react";
import { AccessibilityContext } from "@/context/AccessibilityContext";

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility deve ser usado dentro de <AccessibilityProvider>."
    );
  }
  return ctx;
}
