/**
 * AgendaTeaser.js
 *
 * Seção 4 da Home: próximos eventos (3 mais próximos).
 * Lista compacta de eventos + CTA para a agenda completa.
 *
 * TODO: formatar a data em pt-BR com Intl.DateTimeFormat.
 * TODO: adicionar indicador visual de categoria (ex.: badge colorida).
 *
 * Props:
 *   - events: array dos próximos eventos ({ id, title, date, time, location, category })
 */

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/**
 * Formata data ISO (YYYY-MM-DD) em pt-BR legível: "15 de novembro de 2025"
 * @param {string} isoDate
 */
function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * @param {{ events: Array }} props
 */
export default function AgendaTeaser({ events = [] }) {
  return (
    <section aria-label="Próximos Eventos" className="bg-background py-12">
      <Container>
        <SectionTitle subtitle="Não perca nenhuma apresentação">
          Próximos Eventos
        </SectionTitle>

        {events.length === 0 ? (
          <p className="text-muted">Nenhum evento programado no momento.</p>
        ) : (
          <ul className="space-y-4" role="list">
            {events.map((event) => (
              <li key={event.id}>
                <Card className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:gap-6">
                  {/* Data destaque */}
                  <div
                    className="flex min-w-[5rem] flex-col items-center justify-center rounded-lg bg-primary px-3 py-2 text-center text-primary-foreground"
                    aria-hidden="true"
                  >
                    <span className="text-2xl font-bold leading-none">
                      {event.date.split("-")[2]}
                    </span>
                    <span className="text-xs uppercase">
                      {new Date(event.date + "T00:00:00").toLocaleDateString("pt-BR", { month: "short" })}
                    </span>
                  </div>

                  {/* Detalhes */}
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      <time dateTime={`${event.date}T${event.time}`}>
                        {formatDate(event.date)} às {event.time}
                      </time>
                    </p>
                    <p className="text-sm text-muted">{event.location}</p>
                  </div>

                  {/* Badge de categoria */}
                  <span className="self-start rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                    {event.category}
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <Button href="/agenda" variant="secondary">
            Ver Agenda Completa
          </Button>
        </div>
      </Container>
    </section>
  );
}
