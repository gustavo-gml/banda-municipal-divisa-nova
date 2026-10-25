/**
 * /agenda/page.js — Página de Agenda de Eventos
 *
 * Exibe calendário mensal com dias de evento destacados + lista completa.
 * Server Component: busca dados no servidor, passa aos componentes cliente.
 *
 * TODO: implementar filtro por mês via searchParams (URL: ?mes=2025-11).
 * TODO: conectar paginação da lista ao estado da URL.
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import BackToHome from "@/components/layout/BackToHome";
import EventCalendar from "@/components/agenda/EventCalendar";
import EventList from "@/components/agenda/EventList";
import { getEvents } from "@/lib/data";

export const metadata = {
  title: "Agenda",
  description:
    "Confira os próximos eventos e apresentações da Banda Municipal José Ângelo Vaz de Divisa Nova – MG.",
};

export default async function AgendaPage() {
  const events = await getEvents();

  return (
    <Container as="div" className="py-12">
      <BackToHome />
      <SectionTitle subtitle="Não perca nenhuma apresentação">
        Agenda de Eventos
      </SectionTitle>

      {/* Layout: calendário à esquerda (desktop) + lista à direita */}
      <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
        {/* Calendário — componente cliente (precisa de estado) */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
            Calendário
          </h3>
          <EventCalendar events={events} />
        </div>

        {/* Lista completa de eventos */}
        <div>
          <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
            Todos os Eventos
          </h3>
          <EventList events={events} />
        </div>
      </div>
    </Container>
  );
}
