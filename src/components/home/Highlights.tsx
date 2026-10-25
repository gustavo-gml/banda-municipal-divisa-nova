/**
 * Highlights.js
 *
 * Seção 2 da Home: carrossel de destaques.
 * - Mobile: 1 slide visível por vez
 * - Desktop (md+): 3 slides visíveis por vez
 * - Navegação: setas anterior/próximo + indicadores de ponto
 * - Suporte a teclado: setas esquerda/direita quando o carrossel tem foco
 *
 * TODO: implementar a lógica de slides (estado, auto-play opcional, swipe touch).
 *       Avaliar embla-carousel-react: instalar com `npm install embla-carousel-react`
 *       e descomentar os TODO abaixo para integrar.
 * TODO: substituir as divs placeholder por <Image> do next/image com as imagens reais.
 *
 * Props:
 *   - items: array de highlight ({ id, title, subtitle, imageUrl, imageAlt, ctaLabel, ctaHref })
 */

"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

/**
 * @param {{ items: import("@/lib/mock/highlights").mockHighlights }} props
 */
export default function Highlights({ items = [] }) {
  // TODO: substituir este estado simples pela lógica do embla-carousel
  const [activeIndex, setActiveIndex] = useState(0);

  const total = items.length;

  function goTo(index) {
    setActiveIndex((index + total) % total);
  }

  return (
    <section aria-label="Destaques" className="py-12 bg-background">
      <Container>
        <SectionTitle subtitle="Fique por dentro das novidades">
          Destaques
        </SectionTitle>

        {/* ---- Wrapper do carrossel ---- */}
        <div
          className="relative overflow-hidden rounded-xl"
          // TODO: adicionar ref do embla aqui quando integrar: ref={emblaRef}
          aria-roledescription="carrossel"
          aria-label="Destaques da banda"
        >
          {/* ---- Container de slides ---- */}
          {/* TODO: adicionar classe do embla: "embla__container flex" */}
          <div className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="min-w-full md:min-w-[33.333%]"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} de ${total}: ${item.title}`}
                aria-hidden={index !== activeIndex}
              >
                {/* Imagem placeholder */}
                <div
                  className={[
                    "relative h-64 rounded-xl bg-surface md:h-80",
                    "flex flex-col items-center justify-center gap-3 p-6 text-center",
                    "border border-border",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {/* TODO: substituir por:
                    <Image src={item.imageUrl} alt={item.imageAlt} fill className="object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-primary/60 rounded-xl" />
                  */}
                  <div className="text-5xl text-accent">𝄞</div>
                </div>

                {/* Conteúdo do slide */}
                <div className="mt-4 px-2">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.subtitle}</p>
                  <div className="mt-3">
                    <Button href={item.ctaHref} variant="secondary" size="sm">
                      {item.ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---- Seta: anterior ---- */}
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Slide anterior"
            className={[
              "absolute left-2 top-1/3 -translate-y-1/2",
              "flex h-11 w-11 items-center justify-center rounded-full",
              "bg-surface/90 text-foreground shadow-md",
              "hover:bg-surface transition-colors",
            ].join(" ")}
          >
            <span aria-hidden="true">‹</span>
          </button>

          {/* ---- Seta: próximo ---- */}
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Próximo slide"
            className={[
              "absolute right-2 top-1/3 -translate-y-1/2",
              "flex h-11 w-11 items-center justify-center rounded-full",
              "bg-surface/90 text-foreground shadow-md",
              "hover:bg-surface transition-colors",
            ].join(" ")}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        {/* ---- Indicadores de ponto ---- */}
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Slides de destaque"
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ir para slide ${index + 1}: ${item.title}`}
              onClick={() => goTo(index)}
              className={[
                "h-2.5 rounded-full transition-all duration-200",
                index === activeIndex
                  ? "w-6 bg-accent"
                  : "w-2.5 bg-border hover:bg-muted",
              ].join(" ")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
