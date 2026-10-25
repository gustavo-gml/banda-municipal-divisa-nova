/**
 * Button.js
 *
 * Botão reutilizável com variantes visuais e suporte a polimorfismo (href → <a>).
 * Todos os botões têm alvo de toque mínimo de 44px e foco visível (via globals.css).
 *
 * Variantes:
 *   - "primary": fundo primary, texto primary-foreground
 *   - "secondary": borda primary, fundo transparente
 *   - "ghost": sem borda, fundo transparente
 *
 * Props:
 *   - variant: "primary" | "secondary" | "ghost" (default: "primary")
 *   - href: se fornecido, renderiza como <a> em vez de <button>
 *   - size: "sm" | "md" | "lg" (default: "md")
 *   - fullWidth: ocupa largura total (default: false)
 *   - className: classes adicionais
 *   - children, e demais props HTML do botão/âncora
 */

import Link from "next/link";

const VARIANT_CLASSES = {
  primary: [
    "bg-primary text-primary-foreground",
    "hover:opacity-90",
    "border border-primary",
  ].join(" "),
  secondary: [
    "bg-transparent text-primary",
    "border border-primary",
    "hover:bg-primary hover:text-primary-foreground",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "border border-transparent",
    "hover:bg-surface hover:border-border",
  ].join(" "),
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm min-h-[2.75rem]",
  md: "px-6 py-3 text-base min-h-[2.75rem]",
  lg: "px-8 py-4 text-lg min-h-[2.75rem]",
};

/**
 * @param {{
 *   variant?: "primary" | "secondary" | "ghost",
 *   size?: "sm" | "md" | "lg",
 *   href?: string,
 *   fullWidth?: boolean,
 *   className?: string,
 *   children: React.ReactNode,
 *   [key: string]: any
 * }} props
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  children,
  ...rest
}) {
  const baseClasses = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
    "transition-all duration-150",
    VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={baseClasses} {...rest}>
      {children}
    </button>
  );
}
