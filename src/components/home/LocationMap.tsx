/**
 * LocationMap.js
 *
 * Seção 7 da Home: mapa de localização via iframe do Google Maps.
 *
 * Acessibilidade:
 * - iframe com `title` descritivo para leitores de tela
 * - `aria-label` na seção
 * - Link de fallback para abrir no Google Maps diretamente
 *
 * TODO: substituir a URL do src pelo embed real do local da banda.
 *       Acesse maps.google.com → Compartilhar → Incorporar um mapa → copie o src do iframe.
 * TODO: adicionar endereço textual abaixo do mapa para SEO e usuários sem JavaScript.
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

/* URL de embed do Google Maps — centrado em Divisa Nova, MG */
/* TODO: substituir pela localização exata da sede da banda */
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29726.65!2d-46.6333!3d-21.0167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9b5f6ea7c8e0f%3A0x1!2sDivisa+Nova%2C+MG!5e0!3m2!1spt-BR!2sbr!4v1700000000000";

const MAPS_LINK =
  "https://www.google.com/maps/search/Divisa+Nova,+MG";

export default function LocationMap() {
  return (
    <section id="contato" aria-label="Localização da Banda Municipal" className="home-section bg-background py-12">
      <Container>
        <SectionTitle subtitle="Venha nos visitar em Divisa Nova – MG">
          Onde Estamos
        </SectionTitle>

        {/* Endereço textual (acessível + SEO) */}
        <address className="mb-4 text-sm not-italic text-muted">
          {/* TODO: substituir pelo endereço real da sede */}
          Praça Central, s/n — Divisa Nova, MG — CEP 00000-000
        </address>

        {/* Wrapper do mapa */}
        <div className="overflow-hidden rounded-xl border border-border shadow-sm">
          <iframe
            src={MAP_EMBED_URL}
            title="Mapa de localização da Banda Municipal José Ângelo Vaz em Divisa Nova, MG"
            width="100%"
            height="400"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Link de fallback para abrir no Maps */}
        <p className="mt-3 text-sm text-muted">
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
            aria-label="Abrir localização no Google Maps (abre em nova aba)"
          >
            Abrir no Google Maps
          </a>
        </p>
      </Container>
    </section>
  );
}
