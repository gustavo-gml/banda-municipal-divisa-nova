/**
 * mock/highlights.js
 *
 * Dados de exemplo para os slides de destaque do carrossel da Home.
 * TODO: substituir pela busca ao Prismic com getHighlights() em src/lib/data.js.
 */

import type { Highlight } from "@/types/highlight";

export const mockHighlights: Highlight[] = [
  {
    id: "hl-001",
    title: "Concerto de Aniversário",
    subtitle: "15 de novembro · Praça Central · 19h",
    imageUrl: "/images/placeholder-highlight-1.jpg",
    imageAlt:
      "Músicos da Banda Municipal tocando em um palco iluminado na praça central",
    ctaLabel: "Ver na Agenda",
    ctaHref: "/agenda",
  },
  {
    id: "hl-002",
    title: "80 Anos de Tradição",
    subtitle: "Uma história de música e cultura em Divisa Nova",
    imageUrl: "/images/placeholder-highlight-2.jpg",
    imageAlt:
      "Foto histórica em preto e branco da Banda Municipal em desfile nas ruas de Divisa Nova",
    ctaLabel: "Conhecer a História",
    ctaHref: "/historia",
  },
  {
    id: "hl-003",
    title: "Faça Parte da Banda",
    subtitle: "Inscrições abertas para novos músicos",
    imageUrl: "/images/placeholder-highlight-3.jpg",
    imageAlt:
      "Jovem músico tocando clarinete durante ensaio da banda municipal",
    ctaLabel: "Saiba Como Ingressar",
    ctaHref: "/faca-parte",
  },
];
