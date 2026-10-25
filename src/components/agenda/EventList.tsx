/**
 * EventList.js — Componente da página /agenda
 *
 * Lista completa de eventos com data, hora, local e descrição.
 *
 * TODO: adicionar filtro por mês/categoria.
 * TODO: adicionar paginação ou infinite scroll para muitos eventos.
 * TODO: adicionar botão "Adicionar ao calendário" (Google Calendar / .ics).
 *
 * Props:
 *   - events: array de eventos
 */

import Card from "@/components/ui/Card";
import type { Event } from "@/types/event";

type EventListProps = {
  events: Event[];
};

export default function EventList({ events = [] }: EventListProps) {
  if (events.length === 0) {
    return (
      <p className="py-8 text-center text-muted">
        Nenhum evento encontrado para o período selecionado.
      </p>
    );
  }

  return (
    <ul className="space-y-4 mt-6" role="list" aria-label="Lista de eventos">
      {events.map((event) => (
        <li key={event.id}>
          <Card className="p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {event.title}
              </h3>
              {/* Badge de categoria */}
              <span className="self-start rounded-full border border-border px-3 py-1 text-xs text-muted sm:self-auto">
                {event.category}
              </span>
            </div>

            <dl className="mt-2 space-y-1 text-sm text-muted">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Data e hora</dt>
                <span aria-hidden="true">📅</span>
                <dd>
                  <time dateTime={`${event.date}T${event.time}`}>
                    {new Date(event.date + "T00:00:00").toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    às {event.time}
                  </time>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Local</dt>
                <span aria-hidden="true">📍</span>
                <dd>{event.location}</dd>
              </div>
            </dl>

            {event.description && (
              <p className="mt-3 text-sm text-muted">{event.description}</p>
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
}
