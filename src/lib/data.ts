/**
 * data.ts — Camada de dados da aplicação
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
import { createClient } from "@/prismicio";
import {
  asText,
  asLink,
  type LinkField,
  type PrismicDocument,
  type RichTextField,
} from "@prismicio/client";
import type { Event } from "@/types/event";
import type { GalleryItem } from "@/types/gallery";
import type { Highlight } from "@/types/highlight";
import type { HistoryEntry } from "@/types/history";

type EventOptions = {
  limit?: number;
  upcoming?: boolean;
};

type GalleryOptions = {
  limit?: number;
  page?: number;
  pageSize?: number;
};

export type GalleryResult = {
  items: GalleryItem[];
  total: number;
  page: number;
  pageSize: number;
};

type PrismicImage = {
  url?: string | null;
  alt?: string | null;
};

type PrismicHighlightData = {
  title?: string | null;
  image?: PrismicImage | null;
  link?: LinkField | null;
  order?: number | null;
};

type PrismicEventData = {
  title?: string | null;
  date?: string | null;
  time?: string | null;
  location?: string | null;
  description?: RichTextField | null;
};

type PrismicGalleryData = {
  media_type?: string | null;
  image?: PrismicImage | null;
  video_url?: LinkField | null;
  caption?: string | null;
};

type HighlightDocument = PrismicDocument<PrismicHighlightData, "highlight">;
type EventDocument = PrismicDocument<PrismicEventData, "event">;
type GalleryDocument = PrismicDocument<PrismicGalleryData, "gallery_item">;

function getFallbackEvents(options: EventOptions): Event[] {
  let events = [...mockEvents];
  if (options.upcoming) {
    events = events.filter((event) => event.date >= "2025-01-01");
  }
  events.sort((a, b) => a.date.localeCompare(b.date));
  return options.limit ? events.slice(0, options.limit) : events;
}

function getFallbackGallery(options: GalleryOptions): GalleryResult {
  const items = [...mockGalleryItems];
  if (options.limit) {
    return { items: items.slice(0, options.limit), total: items.length, page: 1, pageSize: options.limit };
  }
  const page = options.page ?? 1;
  const pageSize = options.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  };
}

/* ------------------------------------------------------------------ */
/* getEvents                                                            */
/* ------------------------------------------------------------------ */

/**
 * Retorna lista de eventos da agenda, ordenados por data.
 *
 * TODO: substituir por client.getAllByType("event", { orderings: [...] }) do Prismic.
 */
export async function getEvents({ limit, upcoming = false }: EventOptions = {}): Promise<Event[]> {
  try {
    const client = createClient();
    const documents = await client.getAllByType("event", {
      orderings: { field: "my.event.date", direction: "asc" },
    }) as EventDocument[];
    const events = documents
      .filter((document) => document.data.date)
      .map((document) => ({
        id: document.id,
        title: document.data.title ?? "Evento sem título",
        date: document.data.date as Event["date"],
        time: document.data.time ?? "",
        location: document.data.location ?? "",
        description: document.data.description ? asText(document.data.description) : undefined,
        category: "Evento",
      }))
      .filter((event) => !upcoming || event.date >= "2025-01-01");

    if (events.length > 0) return limit ? events.slice(0, limit) : events;
    console.error("[Prismic] Nenhum evento publicado; usando mocks.");
  } catch (error) {
    console.error("[Prismic] Falha ao buscar eventos; usando mocks.", error);
  }
  return getFallbackEvents({ limit, upcoming });
}

/* ------------------------------------------------------------------ */
/* getHighlights                                                        */
/* ------------------------------------------------------------------ */

/**
 * Retorna os slides de destaque para o carrossel da Home.
 *
 * TODO: substituir por client.getAllByType("highlight") do Prismic.
 */
export async function getHighlights(): Promise<Highlight[]> {
  try {
    const client = createClient();
    const documents = await client.getAllByType("highlight", {
      orderings: { field: "my.highlight.order", direction: "asc" },
    }) as HighlightDocument[];
    const highlights = documents
      .filter((document) => document.data.image?.url)
      .map((document) => ({
        id: document.id,
        title: document.data.title ?? "Destaque sem título",
        subtitle: "",
        imageUrl: document.data.image?.url ?? "",
        imageAlt: document.data.image?.alt ?? document.data.title ?? "Imagem do destaque",
        ctaLabel: document.data.link ? "Saiba mais" : "",
        ctaHref: asLink(document.data.link) ?? "#",
      }));

    if (highlights.length > 0) return highlights;
    console.error("[Prismic] Nenhum destaque publicado; usando mocks.");
  } catch (error) {
    console.error("[Prismic] Falha ao buscar destaques; usando mocks.", error);
  }
  return [...mockHighlights];
}

/* ------------------------------------------------------------------ */
/* getGalleryItems                                                      */
/* ------------------------------------------------------------------ */

/**
 * Retorna os itens da galeria de fotos e vídeos.
 *
 * TODO: substituir por client.getAllByType("gallery_item", { page, pageSize }) do Prismic.
 */
export async function getGalleryItems({
  limit,
  page = 1,
  pageSize = 12,
}: GalleryOptions = {}): Promise<GalleryResult> {
  try {
    const client = createClient();
    const documents = await client.getAllByType("gallery_item", {
      orderings: { field: "document.first_publication_date", direction: "desc" },
    }) as GalleryDocument[];
    const items = documents.map((document): GalleryItem | null => {
        const isVideo = document.data.media_type === "video";
        const src = isVideo ? asLink(document.data.video_url) : document.data.image?.url;
        if (!src) return null;
        return {
          id: document.id,
          type: isVideo ? "video" : "photo",
          src,
          thumbnailSrc: document.data.image?.url ?? src,
          alt: isVideo
            ? document.data.caption ?? "Vídeo da Banda Municipal"
            : document.data.image?.alt ?? document.data.caption ?? "Imagem da Banda Municipal",
          caption: document.data.caption ?? undefined,
          year: Number(document.first_publication_date.slice(0, 4)),
        };
      })
      .filter((item): item is GalleryItem => item !== null);

    const validItems = items.filter((item): item is GalleryItem => item !== null);
    if (validItems.length > 0) {
      if (limit) return { items: validItems.slice(0, limit), total: validItems.length, page: 1, pageSize: limit };
      const start = (page - 1) * pageSize;
      return { items: validItems.slice(start, start + pageSize), total: validItems.length, page, pageSize };
    }
    console.error("[Prismic] Nenhum item de galeria publicado; usando mocks.");
  } catch (error) {
    console.error("[Prismic] Falha ao buscar galeria; usando mocks.", error);
  }
  return getFallbackGallery({ limit, page, pageSize });
}

/* ------------------------------------------------------------------ */
/* getHistory                                                           */
/* ------------------------------------------------------------------ */

/**
 * Retorna os marcos históricos da banda, ordenados por década.
 *
 * TODO: substituir por client.getAllByType("history_item", { orderings: [...] }) do Prismic.
 */
export async function getHistory(): Promise<HistoryEntry[]> {
  return [...mockHistory].sort((a, b) => a.decade.localeCompare(b.decade));
}
