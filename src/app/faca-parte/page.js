/**
 * /faca-parte/page.js — Página "Faça Parte"
 *
 * Exibe requisitos para ingressar + formulário de inscrição.
 * Server Component (os sub-componentes com estado são "use client").
 *
 * TODO: adicionar depoimentos de músicos atuais (buscar do Prismic).
 * TODO: adicionar seção de FAQ sobre o processo de seleção.
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Requirements from "@/components/faca-parte/Requirements";
import JoinForm from "@/components/faca-parte/JoinForm";

export const metadata = {
  title: "Faça Parte",
  description:
    "Saiba como ingressar na Banda Municipal José Ângelo Vaz de Divisa Nova – MG. Inscrições abertas para novos músicos.",
};

export default function FacaPartePage() {
  return (
    <Container as="div" className="py-12">
      <SectionTitle subtitle="Venha fazer música com a gente">
        Faça Parte da Nossa Banda
      </SectionTitle>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Requisitos e benefícios */}
        <Requirements />

        {/* Formulário de inscrição */}
        <JoinForm />
      </div>
    </Container>
  );
}
