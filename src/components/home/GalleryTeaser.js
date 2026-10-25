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

/**
 * @param {{ items: Array }} props
 */
export default function GalleryTeaser({ items = [] }) {
  const preview = items.slice(0, 4);

  return (
    <section aria-label="Galeria de Fotos" className="bg-surface py-12">
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
                {/* TODO: substituir por <button> com lightbox quando imagens reais estiverem disponíveis */}
                <div
                  className={[
                    "relative aspect-square overflow-hidden rounded-lg",
                    "flex items-center justify-center",
                    "border border-border bg-background",
                  ].join(" ")}
                >
                  {/* TODO: <Image src={item.thumbnailSrc} alt={item.alt} fill className="object-cover" /> */}
                  <div className="flex flex-col items-center gap-1 p-2 text-center">
                    <span className="text-3xl text-accent" aria-hidden="true">🎵</span>
                    <span className="line-clamp-2 text-xs text-muted">{item.caption}</span>
                  </div>
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
