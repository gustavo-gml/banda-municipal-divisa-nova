/**
 * SectionTitle.js
 *
 * Título de seção padronizado com linha decorativa na cor accent (dourado).
 * Deve ser o único <h2> dentro de cada seção.
 *
 * Props:
 *   - children: texto do título
 *   - subtitle: texto opcional de subtítulo
 *   - centered: centralizar o texto (default: false — alinhado à esquerda)
 *   - className: classes adicionais no wrapper
 */

import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

export default function SectionTitle({
  children,
  subtitle,
  centered = false,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={["mb-8", centered ? "text-center" : "", className].join(" ")}>
      <h2
        className={[
          "font-heading text-2xl font-bold text-foreground md:text-3xl",
          "relative inline-block pb-3",
          /* Linha decorativa dourada abaixo do título */
          "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-12 after:rounded-full after:bg-accent",
          centered ? "after:left-1/2 after:-translate-x-1/2" : "",
        ].join(" ")}
      >
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-base text-muted">{subtitle}</p>
      )}
    </div>
  );
}
