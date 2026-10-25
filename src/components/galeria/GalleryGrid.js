/**
 * GalleryGrid.js — Componente da página /galeria
 *
 * Grade de fotos e vídeos com paginação "X de N".
 *
 * TODO: implementar lightbox ao clicar em um item (abrir em Modal.js ou biblioteca).
 * TODO: substituir divs placeholder por <Image> do next/image com as fotos reais.
 * TODO: adicionar filtro por ano ou tipo (foto/vídeo).
 * TODO: implementar paginação real conectada ao estado da URL (searchParams).
 *
 * Props:
 *   - items: array de itens ({ id, type, thumbnailSrc, alt, caption, year })
 *   - total: número total de itens (para paginação)
 *   - page: página atual (1-indexed)
 *   - pageSize: itens por página
 *   - onPageChange: callback (page: number) => void
 */

"use client";

/**
 * @param {{
 *   items: Array,
 *   total: number,
 *   page: number,
 *   pageSize: number,
 *   onPageChange?: (page: number) => void
 * }} props
 */
export default function GalleryGrid({
  items = [],
  total = 0,
  page = 1,
  pageSize = 12,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      {/* ---- Grade de itens ---- */}
      <ul
        className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        role="list"
        aria-label={`Galeria — página ${page} de ${totalPages}`}
      >
        {items.map((item) => (
          <li key={item.id}>
            {/* TODO: substituir por <button> que abre o lightbox */}
            <div
              className={[
                "group relative aspect-square overflow-hidden rounded-xl",
                "cursor-pointer border border-border bg-surface",
                "hover:border-accent transition-colors duration-150",
              ].join(" ")}
              role="button"
              tabIndex={0}
              aria-label={`Ver ${item.type === "video" ? "vídeo" : "foto"}: ${item.caption}`}
              // TODO: onClick={() => openLightbox(item.id)}
              // TODO: onKeyDown={(e) => e.key === "Enter" && openLightbox(item.id)}
            >
              {/* Placeholder da imagem */}
              {/* TODO: <Image src={item.thumbnailSrc} alt={item.alt} fill className="object-cover" /> */}
              <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
                <span className="text-4xl text-accent" aria-hidden="true">
                  {item.type === "video" ? "▶" : "🎵"}
                </span>
                <span className="line-clamp-2 text-center text-xs text-muted">
                  {item.caption}
                </span>
              </div>

              {/* Badge de vídeo */}
              {item.type === "video" && (
                <div
                  className="absolute right-2 top-2 rounded bg-primary px-1.5 py-0.5 text-xs font-bold text-primary-foreground"
                  aria-hidden="true"
                >
                  VÍD
                </div>
              )}

              {/* Overlay ao hover */}
              <div
                className="absolute inset-0 flex items-end bg-foreground/0 p-3 transition-colors duration-150 group-hover:bg-foreground/30"
                aria-hidden="true"
              >
                <span className="line-clamp-1 text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {item.caption}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* ---- Paginação ---- */}
      {totalPages > 1 && (
        <nav
          className="mt-8 flex items-center justify-center gap-3"
          aria-label="Paginação da galeria"
        >
          <button
            type="button"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            aria-label="Página anterior"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <span
            className="text-sm font-medium text-foreground"
            aria-live="polite"
            aria-label={`Página ${page} de ${totalPages}`}
          >
            {page} de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            aria-label="Próxima página"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
          >
            <span aria-hidden="true">›</span>
          </button>
        </nav>
      )}
    </div>
  );
}
