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
import BackToHome from "@/components/layout/BackToHome";
import Requirements from "@/components/faca-parte/Requirements";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça Parte",
  description:
    "Conheça os requisitos para participar da Banda Municipal José Ângelo Vaz de Divisa Nova – MG e saiba como entrar em contato com o maestro.",
};

export default function FacaPartePage() {
  return (
    <Container as="div" className="py-12">
      <BackToHome />
      <SectionTitle subtitle="Venha fazer música com a gente">
        Faça Parte da Nossa Banda
      </SectionTitle>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Requisitos e benefícios */}
        <Requirements />

        {/* Formulário de inscrição */}


        {/* Contato com o maestro */}
        <section
          aria-labelledby="contact-title"
          className="rounded-xl border border-border bg-surface p-6 sm:p-8"
        >
          <h2
            id="contact-title"
            className="font-heading text-xl font-bold text-foreground"
          >
            Como fazer parte da banda?
          </h2>

          <p className="mt-3 text-base text-muted">
            Tem interesse em participar da Banda Municipal
            de Divisa Nova? Entre em contato diretamente
            com o maestro para obter mais informações.
          </p>

          <h3 className="mt-6 font-semibold text-foreground">
            Contato do maestro
          </h3>

          <a
            href="tel:+5535999495562"
            className="mt-2 inline-block text-primary underline underline-offset-4"
          >
            +55 (35) 99949-5562
          </a>
        </section>


      </div>
    </Container>
  );
}
