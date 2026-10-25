/**
 * Card.js
 *
 * Cartão genérico com fundo surface, borda border e sombra suave.
 * Usado em eventos, galeria, destaques, etc.
 *
 * Props:
 *   - as: tag HTML (default: "article" — semântico para conteúdo independente)
 *   - className: classes adicionais
 *   - children
 *
 * Dica: envolver o Card em <li> quando for item de uma lista.
 */

import type { ElementType, ReactNode } from "react";

type CardProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export default function Card({ as: Tag = "article", className = "", children }: CardProps) {
  return (
    <Tag
      className={[
        "rounded-xl border border-border bg-surface",
        "shadow-sm transition-shadow duration-150",
        "hover:shadow-md",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
