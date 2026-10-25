/**
 * mock/gallery.js
 *
 * Dados de exemplo para a galeria de fotos e vídeos.
 * TODO: substituir pela busca ao Prismic com getGalleryItems() em src/lib/data.js.
 */

/** @type {Array<{id: string, type: "photo"|"video", src: string, thumbnailSrc: string, alt: string, caption: string, year: number}>} */
export const mockGalleryItems = [
  {
    id: "gal-001",
    type: "photo",
    src: "/images/placeholder-gallery-1.jpg",
    thumbnailSrc: "/images/placeholder-gallery-1.jpg",
    alt: "Banda Municipal em apresentação na Praça Central durante o Natal de 2024",
    caption: "Serenata de Natal 2024",
    year: 2024,
  },
  {
    id: "gal-002",
    type: "photo",
    src: "/images/placeholder-gallery-2.jpg",
    thumbnailSrc: "/images/placeholder-gallery-2.jpg",
    alt: "Desfile cívico com a Banda Municipal percorrendo a Avenida Principal",
    caption: "Desfile Cívico — Independência 2024",
    year: 2024,
  },
  {
    id: "gal-003",
    type: "photo",
    src: "/images/placeholder-gallery-3.jpg",
    thumbnailSrc: "/images/placeholder-gallery-3.jpg",
    alt: "Músicos durante ensaio na sede da banda",
    caption: "Ensaio semanal — outubro 2024",
    year: 2024,
  },
  {
    id: "gal-004",
    type: "photo",
    src: "/images/placeholder-gallery-4.jpg",
    thumbnailSrc: "/images/placeholder-gallery-4.jpg",
    alt: "Apresentação especial da Banda Municipal no aniversário da cidade em 2023",
    caption: "Aniversário da Cidade 2023",
    year: 2023,
  },
  {
    id: "gal-005",
    type: "photo",
    src: "/images/placeholder-gallery-5.jpg",
    thumbnailSrc: "/images/placeholder-gallery-5.jpg",
    alt: "Grupo de músicos posando para foto comemorativa após apresentação",
    caption: "Confraternização anual 2023",
    year: 2023,
  },
  {
    id: "gal-006",
    type: "photo",
    src: "/images/placeholder-gallery-6.jpg",
    thumbnailSrc: "/images/placeholder-gallery-6.jpg",
    alt: "Banda Municipal em desfile durante Festa Junina Municipal",
    caption: "Festa Junina Municipal 2023",
    year: 2023,
  },
];
