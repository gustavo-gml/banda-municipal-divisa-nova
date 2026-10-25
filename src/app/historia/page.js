/**
 * /historia/page.js — Página de História da Banda
 *
 * Exibe a linha do tempo histórica via componente Timeline.
 * Server Component: busca dados no servidor.
 *
 * TODO: adicionar texto introdutório da história (buscar do Prismic).
 * TODO: adicionar galeria de fotos históricas abaixo da timeline.
 */

import Container from "@/components/ui/Container";
import BackToHome from "@/components/layout/BackToHome";
import Timeline from "@/components/historia/Timeline";
import { getHistory } from "@/lib/data";

export const metadata = {
  title: "História",
  description:
    "Conheça a trajetória da Banda Municipal José Ângelo Vaz de Divisa Nova – MG, desde sua fundação em 1945 até os dias de hoje.",
};

export default async function HistoriaPage() {
  const history = await getHistory();

  return (
    <Container as="div" className="py-12">
      <BackToHome />
      {/* TODO: adicionar imagem de capa da página de história */}
      <Timeline items={history} />
    </Container>
  );
}
