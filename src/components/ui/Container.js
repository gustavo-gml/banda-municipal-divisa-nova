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

/**
 * @param {{
 *   as?: keyof JSX.IntrinsicElements,
 *   className?: string,
 *   children: React.ReactNode
 * }} props
 */
export default function Container({ as: Tag = "div", className = "", children }) {
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
