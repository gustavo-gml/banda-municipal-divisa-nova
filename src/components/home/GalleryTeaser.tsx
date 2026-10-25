/**
 * GalleryTeaser.js
 *
 * Seção 5 da Home: prévia da galeria (4 miniaturas).
 *
 * TODO: substituir as divs placeholder por <Image> com as fotos reais da galeria.
 * TODO: adicionar lightbox ao clicar na miniatura (usar Modal.js ou biblioteca).
 *
 * Props:
 *   - items: array de itens da galeria ({ id, thumbnailSrc, alt, caption })
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Image from "next/image";
import type { GalleryItem } from "@/types/gallery";

type GalleryTeaserProps = {
  items: GalleryItem[];
};

export default function GalleryTeaser({ items = [] }: GalleryTeaserProps) {
  const preview = items.slice(0, 4);

  return (
    <section id="galeria" aria-label="Galeria de Fotos" className="home-section bg-surface py-12">
      <Container>
        <SectionTitle subtitle="Momentos que ficam na memória">
          Galeria
        </SectionTitle>

        {preview.length === 0 ? (
          <p className="text-muted">Galeria em breve.</p>
        ) : (
          <ul
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
            role="list"
            aria-label="Prévia da galeria de fotos"
          >
            {preview.map((item) => (
              <li key={item.id}>
                <div
                  className={[
                    "relative aspect-square overflow-hidden rounded-lg",
                    "border border-border bg-background",
                  ].join(" ")}
                >
                  {item.type === "photo" ? (
                    <Image
                      src={item.thumbnailSrc}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 25vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      aria-label={`Abrir vídeo: ${item.caption ?? item.alt}`}
                    >
                      <span className="text-3xl text-accent" aria-hidden="true">▶</span>
                      <span className="line-clamp-2 text-xs text-muted">{item.caption}</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <Button href="/galeria" variant="secondary">
            Acessar Galeria Completa
          </Button>
        </div>
      </Container>
    </section>
  );
}
