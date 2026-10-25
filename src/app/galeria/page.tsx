/**
 * /galeria/page.js — Página de Galeria de Fotos e Vídeos
 *
 * Exibe a grade de itens com paginação.
 * Server Component para a busca inicial; paginação futura via client.
 *
 * TODO: implementar paginação real com searchParams (?pagina=2).
 * TODO: adicionar lightbox ao clicar em item (conectar ao Modal.js ou biblioteca).
 * TODO: adicionar filtro por ano e tipo (foto / vídeo).
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import BackToHome from "@/components/layout/BackToHome";
import GalleryGrid from "@/components/galeria/GalleryGrid";
import { getGalleryItems } from "@/lib/data";
import type { Metadata } from "next";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Veja fotos e vídeos das apresentações e momentos especiais da Banda Municipal José Ângelo Vaz de Divisa Nova – MG.",
};

export const instant = false;

export default async function GaleriaPage() {
  await connection();

  const { items, total, page, pageSize } = await getGalleryItems({ page: 1, pageSize: 12 });

  return (
    <Container as="div" className="py-12">
      <BackToHome />
      <SectionTitle subtitle="Momentos que ficam na memória">
        Galeria de Fotos e Vídeos
      </SectionTitle>

      {/*
       * GalleryGrid é "use client" (precisa de estado para paginação interativa).
       * TODO: converter paginação para usar searchParams (URL) e manter SSR.
       */}
      <GalleryGrid
        items={items}
        total={total}
        page={page}
        pageSize={pageSize}
        // TODO: onPageChange conectar ao router.push com searchParams
      />
    </Container>
  );
}
