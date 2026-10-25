/**
 * ContactMap.js — Componente da página /contato
 *
 * Mapa de localização via iframe do Google Maps, específico para a página de contato.
 * (Similar ao LocationMap.js da Home, mas sem o título de seção — está na página de contato.)
 *
 * TODO: substituir src pelo embed real da sede da banda.
 */

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29726.65!2d-46.6333!3d-21.0167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9b5f6ea7c8e0f%3A0x1!2sDivisa+Nova%2C+MG!5e0!3m2!1spt-BR!2sbr!4v1700000000000";

export default function ContactMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <iframe
        src={MAP_EMBED_URL}
        title="Mapa com a localização da Banda Municipal José Ângelo Vaz em Divisa Nova, MG"
        width="100%"
        height="360"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
