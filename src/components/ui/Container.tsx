/**
 * Container.js
 *
 * Wrapper de largura máxima e padding horizontal.
 * Todos os componentes de seção devem envolver seu conteúdo com este Container
 * para garantir alinhamento consistente em toda a página.
 *
 * Props:
 *   - as: tag HTML a renderizar (default: "div")
 *   - className: classes adicionais
 *   - children
 */

import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export default function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return (
    <Tag
      className={[
        "mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}
