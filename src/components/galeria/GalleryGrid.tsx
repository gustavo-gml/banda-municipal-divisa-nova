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

import Image from "next/image";
import type { GalleryItem } from "@/types/gallery";

type GalleryGridProps = {
  items: GalleryItem[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
};

function getVideoEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (parsedUrl.hostname.includes("vimeo.com")) {
      const videoId = parsedUrl.pathname.split("/").filter(Boolean).pop();
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export default function GalleryGrid({
  items = [],
  total = 0,
  page = 1,
  pageSize = 12,
  onPageChange,
}: GalleryGridProps) {
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
            <div
              className={[
                "group relative aspect-square overflow-hidden rounded-xl",
                "cursor-pointer border border-border bg-surface",
                "hover:border-accent transition-colors duration-150",
              ].join(" ")}
              aria-label={`Ver ${item.type === "video" ? "vídeo" : "foto"}: ${item.caption}`}
            >
              {item.type === "photo" && (
                <Image
                  src={item.thumbnailSrc}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              )}
              {item.type === "video" && (
                getVideoEmbedUrl(item.src) ? (
                  <iframe
                    src={getVideoEmbedUrl(item.src) ?? undefined}
                    title={item.caption ?? "Vídeo da Banda Municipal"}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 flex h-full flex-col items-center justify-center gap-2 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    aria-label={`Abrir vídeo: ${item.caption ?? item.alt}`}
                  >
                    <span className="text-4xl text-accent" aria-hidden="true">▶</span>
                    <span className="line-clamp-2 text-center text-xs text-muted">
                      {item.caption}
                    </span>
                  </a>
                )
              )}

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
