/**
 * Timeline.js — Componente da página /historia
 *
 * Linha do tempo histórica da banda, organizada por década.
 * Cada item exibe: década, título, descrição e foto opcional.
 *
 * TODO: implementar animação de entrada progressiva (Intersection Observer).
 * TODO: adicionar <Image> real quando as fotos históricas estiverem disponíveis.
 *
 * Props:
 *   - items: array de marcos ({ id, decade, title, description, imageUrl, imageAlt })
 */

import SectionTitle from "@/components/ui/SectionTitle";
import Container from "@/components/ui/Container";
import type { HistoryEntry } from "@/types/history";

type TimelineProps = {
  items: HistoryEntry[];
};

export default function Timeline({ items = [] }: TimelineProps) {
  return (
    <Container as="section" aria-label="Linha do tempo histórica">
      <SectionTitle subtitle="Uma jornada de música e tradição">
        Nossa Trajetória
      </SectionTitle>

      {/* Lista de marcos */}
      <ol className="relative space-y-12" aria-label="Marcos históricos por década">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="relative pl-8 md:pl-0 md:grid md:grid-cols-[8rem_1px_1fr] md:gap-x-8 md:items-start"
          >
            {/* ---- Década ---- */}
            <div className="flex items-center gap-4 md:flex-col md:items-end md:pt-1">
              <span
                className="font-heading text-2xl font-bold text-accent"
                aria-label={`Década de ${item.decade}`}
              >
                {item.decade}
              </span>
            </div>

            {/* ---- Linha vertical (desktop) / Ponto (mobile) ---- */}
            <div className="hidden md:flex md:flex-col md:items-center">
              <div className="h-4 w-4 rounded-full border-2 border-accent bg-background" />
              <div className="flex-1 w-px bg-border" />
            </div>
            {/* Ponto mobile */}
            <div
              className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-accent bg-background md:hidden"
              aria-hidden="true"
            />

            {/* ---- Conteúdo ---- */}
            <div className="pb-8">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {item.description}
              </p>

              {/* Foto histórica (opcional) */}
              {item.imageUrl && (
                <div className="mt-4 overflow-hidden rounded-lg border border-border">
                  {/* TODO: substituir por:
                    <Image
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      width={600}
                      height={400}
                      className="object-cover"
                    />
                  */}
                  <div
                    className="flex h-48 items-center justify-center bg-surface text-muted text-sm"
                    aria-label={item.imageAlt ?? undefined}
                  >
                    📷 {item.imageAlt}
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
