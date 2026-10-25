export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  src: string;
  thumbnailSrc: string;
  alt: string;
  caption?: string;
  year: number;
};
