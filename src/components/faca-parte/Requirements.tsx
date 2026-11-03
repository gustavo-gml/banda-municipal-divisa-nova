/**
 * Requirements.tsx — Componente da página /faca-parte
 *
 * Apresenta informações para interessados em ingressar na banda.
 *
 * TODO: substituir informações pendentes por dados oficiais.
 * TODO: integrar conteúdo ao Prismic futuramente.
 */

import Card from "@/components/ui/Card";

const REQUIREMENTS = [
 {
  id: "req-4",
  icon: "🎂",
  title: "Idade mínima",
  description:
    "Para ingressar na banda, é necessário ter mais de 10 anos de idade.",
},
  
];

const BENEFITS = [
  {
    id: "ben-1",
    icon: "🎵",
    text: "Vivência e prática musical em grupo",
  },
  {
    id: "ben-2",
    icon: "🤝",
    text: "Integração cultural e social",
  },
  {
    id: "ben-3",
    icon: "🌟",
    text: "Participação nas atividades da banda, conforme a programação",
  },
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
        O que a banda proporciona
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
