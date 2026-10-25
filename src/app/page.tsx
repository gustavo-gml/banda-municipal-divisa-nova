/**
 * page.js — Home da Banda Municipal José Ângelo Vaz
 *
 * Server Component: busca todos os dados via src/lib/data.js
 * e os repassa por props aos componentes de seção.
 * Nenhum componente filho importa os mocks diretamente.
 *
 * Ordem das seções (conforme spec):
 *   1. HeroBanner     — identidade da marca (h1 único)
 *   2. Highlights     — carrossel de destaques
 *   3. HistoryTeaser  — prévia da história + CTA /historia
 *   4. AgendaTeaser   — próximos 3 eventos + CTA /agenda
 *   5. GalleryTeaser  — 4 miniaturas + CTA /galeria
 *   6. JoinTeaser     — chamada para ingressar + CTA /faca-parte
 *   7. LocationMap    — mapa de localização
 */

import HeroBanner from "@/components/home/HeroBanner";
import Highlights from "@/components/home/Highlights";
import HistoryTeaser from "@/components/home/HistoryTeaser";
import AgendaTeaser from "@/components/home/AgendaTeaser";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import JoinTeaser from "@/components/home/JoinTeaser";
import LocationMap from "@/components/home/LocationMap";

import { getEvents, getHighlights, getGalleryItems, getHistory } from "@/lib/data";

export const metadata = {
  title: "Página Inicial",
  description:
    "Bem-vindo à Banda Municipal José Ângelo Vaz de Divisa Nova – MG. Conheça nossa história, agenda de eventos, galeria e como fazer parte.",
};

export default async function HomePage() {
  /* Busca paralela dos dados (todos independentes entre si) */
  const [highlights, upcomingEvents, galleryResult, history] = await Promise.all([
    getHighlights(),
    getEvents({ limit: 3, upcoming: true }),
    getGalleryItems({ limit: 4 }),
    getHistory(),
  ]);

  return (
    <>
      {/* 1. Hero — h1 único da página */}
      <HeroBanner />

      {/* 2. Destaques (carrossel) */}
      <Highlights items={highlights} />

      {/* 3. História */}
      <HistoryTeaser history={history} />

      {/* 4. Agenda */}
      <AgendaTeaser events={upcomingEvents} />

      {/* 5. Galeria */}
      <GalleryTeaser items={galleryResult.items} />

      {/* 6. Faça Parte */}
      <JoinTeaser />

      {/* 7. Mapa */}
      <LocationMap />
    </>
  );
}
