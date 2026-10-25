/**
 * mock/events.js
 *
 * Dados de exemplo para eventos da agenda.
 * TODO: substituir pela busca ao Prismic com getEvents() em src/lib/data.js.
 */

/** @type {Array<{id: string, title: string, date: string, time: string, location: string, description: string, category: string}>} */
export const mockEvents = [
  {
    id: "evt-001",
    title: "Concerto de Aniversário da Cidade",
    date: "2025-11-15",
    time: "19:00",
    location: "Praça Central, Divisa Nova - MG",
    description:
      "Apresentação especial em comemoração ao aniversário de Divisa Nova, com repertório variado de marchas e canções regionais.",
    category: "Concerto",
  },
  {
    id: "evt-002",
    title: "Desfile Cívico — Proclamação da República",
    date: "2025-11-15",
    time: "08:30",
    location: "Av. Principal, Divisa Nova - MG",
    description:
      "Participação da banda no desfile cívico em homenagem à Proclamação da República.",
    category: "Desfile",
  },
  {
    id: "evt-003",
    title: "Serenata de Natal",
    date: "2025-12-20",
    time: "20:00",
    location: "Igreja Matriz, Divisa Nova - MG",
    description:
      "Apresentação especial de Natal com músicas natalinas e hinos religiosos.",
    category: "Serenata",
  },
  {
    id: "evt-004",
    title: "Apresentação na Festa Junina Municipal",
    date: "2025-06-14",
    time: "16:00",
    location: "Parque de Exposições, Divisa Nova - MG",
    description:
      "A banda participa das festividades juninas com repertório temático.",
    category: "Festa",
  },
  {
    id: "evt-005",
    title: "Ensaio Aberto ao Público",
    date: "2025-11-08",
    time: "10:00",
    location: "Sede da Banda, Divisa Nova - MG",
    description:
      "O público é convidado a assistir ao ensaio semanal e conhecer de perto o trabalho dos músicos.",
    category: "Ensaio",
  },
];
