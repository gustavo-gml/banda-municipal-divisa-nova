/**
 * data.js — Camada de dados da aplicação
 *
 * Todas as funções hoje retornam os dados dos mocks.
 * Quando o Prismic for integrado, substitua APENAS o corpo de cada função,
 * mantendo as assinaturas idênticas. Os componentes não precisarão mudar.
 *
 * IMPORTANTE: os componentes NUNCA importam os mocks diretamente.
 * Eles recebem dados por props vindas das page.js,
 * que chamam essas funções (Server Components).
 *
 * Exemplo de uso em uma page.js:
 *   import { getEvents } from "@/lib/data";
 *   const events = await getEvents({ limit: 3 });
 */

import { mockEvents } from "@/lib/mock/events";
import { mockHighlights } from "@/lib/mock/highlights";
import { mockGalleryItems } from "@/lib/mock/gallery";
import { mockHistory } from "@/lib/mock/history";

/* ------------------------------------------------------------------ */
/* getEvents                                                            */
/* ------------------------------------------------------------------ */

/**
 * Retorna lista de eventos da agenda, ordenados por data.
 *
 * @param {{ limit?: number, upcoming?: boolean }} options
 * @returns {Promise<Array>}
 *
 * TODO: substituir por client.getAllByType("event", { orderings: [...] }) do Prismic.
 */
export async function getEvents({ limit, upcoming = false } = {}) {
  let events = [...mockEvents];

  if (upcoming) {
    // TODO: ao integrar o Prismic, filtrar pela data atual na query da API (ex.: my.event.date >= today)
    // Para os mocks, usamos data de referência estática para permitir pré-renderização estática (Next.js 16)
    const referenceDate = "2025-01-01";
    events = events.filter((e) => e.date >= referenceDate);
  }

  // Ordenar por data crescente
  events.sort((a, b) => a.date.localeCompare(b.date));

  if (limit) {
    events = events.slice(0, limit);
  }

  return events;
}

/* ------------------------------------------------------------------ */
/* getHighlights                                                        */
/* ------------------------------------------------------------------ */

/**
 * Retorna os slides de destaque para o carrossel da Home.
 *
 * @returns {Promise<Array>}
 *
 * TODO: substituir por client.getAllByType("highlight") do Prismic.
 */
export async function getHighlights() {
  return [...mockHighlights];
}

/* ------------------------------------------------------------------ */
/* getGalleryItems                                                      */
/* ------------------------------------------------------------------ */

/**
 * Retorna os itens da galeria de fotos e vídeos.
 *
 * @param {{ limit?: number, page?: number, pageSize?: number }} options
 * @returns {Promise<{ items: Array, total: number, page: number, pageSize: number }>}
 *
 * TODO: substituir por client.getAllByType("gallery_item", { page, pageSize }) do Prismic.
 */
export async function getGalleryItems({ limit, page = 1, pageSize = 12 } = {}) {
  let items = [...mockGalleryItems];

  if (limit) {
    return { items: items.slice(0, limit), total: items.length, page: 1, pageSize: limit };
  }

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paginated = items.slice(start, start + pageSize);

  return { items: paginated, total, page, pageSize };
}

/* ------------------------------------------------------------------ */
/* getHistory                                                           */
/* ------------------------------------------------------------------ */

/**
 * Retorna os marcos históricos da banda, ordenados por década.
 *
 * @returns {Promise<Array>}
 *
 * TODO: substituir por client.getAllByType("history_item", { orderings: [...] }) do Prismic.
 */
export async function getHistory() {
  return [...mockHistory].sort((a, b) => a.decade.localeCompare(b.decade));
}
