/**
 * Requirements.js — Componente da página /faca-parte
 *
 * Bloco de requisitos e benefícios para ingressar na banda.
 *
 * TODO: substituir os dados estáticos pelo conteúdo do Prismic.
 * TODO: adicionar acordeão (FAQ) para perguntas frequentes de candidatos.
 */

import Card from "@/components/ui/Card";

const REQUIREMENTS = [
  {
    id: "req-1",
    icon: "📍",
    title: "Residência",
    description: "Ser morador de Divisa Nova ou municípios vizinhos.",
  },
  {
    id: "req-2",
    icon: "🎂",
    title: "Idade",
    description: "Ter a partir de 10 anos de idade. Menores precisam de autorização dos responsáveis.",
  },
  {
    id: "req-3",
    icon: "🎵",
    title: "Experiência",
    description: "Não é necessária experiência prévia com instrumentos. Oferecemos formação do zero.",
  },
  {
    id: "req-4",
    icon: "📅",
    title: "Disponibilidade",
    description: "Comparecer aos ensaios semanais (dias e horários a confirmar) e às apresentações oficiais.",
  },
];

const BENEFITS = [
  { id: "ben-1", icon: "🎓", text: "Aulas gratuitas de instrumento e teoria musical" },
  { id: "ben-2", icon: "👗", text: "Uniforme fornecido pela prefeitura" },
  { id: "ben-3", icon: "🤝", text: "Convívio cultural e social" },
  { id: "ben-4", icon: "🌟", text: "Participação em eventos e festividades da cidade" },
];

export default function Requirements() {
  return (
    <section aria-label="Requisitos e benefícios para ingressar" className="py-12">
      {/* ---- Requisitos ---- */}
      <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
        Requisitos para Participar
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2" role="list">
        {REQUIREMENTS.map((req) => (
          <li key={req.id}>
            <Card as="div" className="flex gap-4 p-4">
              <span className="text-2xl" aria-hidden="true">{req.icon}</span>
              <div>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {req.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{req.description}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {/* ---- Benefícios ---- */}
      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-6">
        O que você ganha
      </h2>
      <ul className="space-y-3" role="list">
        {BENEFITS.map((ben) => (
          <li key={ben.id} className="flex items-center gap-3 text-base text-foreground">
            <span className="text-xl text-accent" aria-hidden="true">{ben.icon}</span>
            {ben.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
