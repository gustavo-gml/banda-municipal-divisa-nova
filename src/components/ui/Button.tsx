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
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
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

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[2.75rem]",
  md: "px-6 py-3 text-base min-h-[2.75rem]",
  lg: "px-8 py-4 text-lg min-h-[2.75rem]",
};

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
  } = props;
  const baseClasses = [
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold",
    "transition-all duration-150",
    VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
    SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _variant, size: _size, fullWidth: _fullWidth, className: _className, children: _children, ...rest } = props;

    return (
      <Link href={href} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, size: _size, fullWidth: _fullWidth, className: _className, children: _children, href: _href, ...rest } = props;

  return (
    <button type="button" className={baseClasses} {...rest}>
      {children}
    </button>
  );
}
