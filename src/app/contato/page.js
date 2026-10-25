/**
 * /contato/page.js — Página de Contato
 *
 * Exibe informações de contato, redes sociais e mapa.
 * Server Component.
 *
 * TODO: adicionar formulário de contato direto (nome, e-mail, mensagem).
 * TODO: adicionar horário de funcionamento/ensaios.
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactInfo from "@/components/contato/ContactInfo";
import ContactMap from "@/components/contato/ContactMap";

export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Banda Municipal José Ângelo Vaz de Divisa Nova – MG. Endereço, telefone, e-mail e redes sociais.",
};

export default function ContatoPage() {
  return (
    <Container as="div" className="py-12">
      <SectionTitle subtitle="Estamos à disposição para atendê-lo">
        Entre em Contato
      </SectionTitle>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Informações + redes */}
        <ContactInfo />

        {/* Mapa */}
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Nossa Localização
          </h2>
          <ContactMap />
        </div>
      </div>
    </Container>
  );
}
