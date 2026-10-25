/**
 * EventCalendar.js — Componente da página /agenda
 *
 * Calendário mensal com dias de evento destacados.
 *
 * TODO: implementar lógica de navegação entre meses (estado: ano + mês atual).
 * TODO: destacar os dias que têm evento com um ponto ou cor diferente.
 * TODO: ao clicar em um dia com evento, rolar até o card do evento na lista.
 * TODO: considerar biblioteca de calendário acessível (ex.: react-aria Calendar).
 *
 * Props:
 *   - events: array de eventos ({ id, date, title })
 *   - currentMonth: string "YYYY-MM" para o mês exibido (default: mês atual)
 */

"use client";

import { startTransition, useEffect, useState } from "react";
import type { Event } from "@/types/event";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

type EventCalendarProps = {
  events: Event[];
};

export default function EventCalendar({ events = [] }: EventCalendarProps) {
  // Inicializa com null para evitar new Date() durante o prerender (Next.js 16)
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [todayDay, setTodayDay] = useState<number | null>(null);
  const [todayMonth, setTodayMonth] = useState<number | null>(null);
  const [todayYear, setTodayYear] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    startTransition(() => {
      setYear(now.getFullYear());
      setMonth(now.getMonth());
      setTodayDay(now.getDate());
      setTodayMonth(now.getMonth());
      setTodayYear(now.getFullYear());
    });
  }, []);

  // Enquanto não hidratado, retorna placeholder acessível
  if (year === null || month === null) {
    return (
      <div className="rounded-xl border border-border bg-surface p-4 text-center text-sm text-muted">
        Carregando calendário…
      </div>
    );
  }

  /* Dias com evento neste mês */
  const eventDays = new Set(
    events
      .filter((e) => {
        const [y, m] = e.date.split("-").map(Number);
        return y === year && m - 1 === month;
      })
      .map((e) => Number(e.date.split("-")[2]))
  );

  /* Objeto "hoje" para comparar com as células do calendário */
  const today = { day: todayDay, month: todayMonth, year: todayYear };

  /* Primeiro dia do mês e total de dias */
  const firstDay = new Date(year, month, 1).getDay(); // 0=Dom
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => (y ?? 0) - 1); }
    else setMonth((m) => (m ?? 0) - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => (y ?? 0) + 1); }
    else setMonth((m) => (m ?? 0) + 1);
  }

  /* Gerar células do calendário */
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      {/* ---- Cabeçalho: navegação de mês ---- */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Mês anterior"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border hover:bg-background transition-colors"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <h3
          className="font-heading text-lg font-semibold text-foreground"
          aria-live="polite"
          aria-label={`Calendário de ${MONTHS_PT[month]} de ${year}`}
        >
          {MONTHS_PT[month]} {year}
        </h3>

        <button
          type="button"
          onClick={nextMonth}
          aria-label="Próximo mês"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-border hover:bg-background transition-colors"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      {/* ---- Dias da semana ---- */}
      <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-muted">
        {WEEKDAYS.map((d) => (
          <div key={d} aria-hidden="true">{d}</div>
        ))}
      </div>

      {/* ---- Grade do calendário ---- */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm" role="grid">
        {cells.map((day, i) => {
          const hasEvent = day && eventDays.has(day);
          const isToday = day === today.day && month === today.month && year === today.year;

          return (
            <div
              key={i}
              role="gridcell"
              aria-label={
                day
                  ? `${day} de ${MONTHS_PT[month]}${hasEvent ? " — tem evento" : ""}${isToday ? " — hoje" : ""}`
                  : undefined
              }
              className={[
                "relative flex h-9 w-full items-center justify-center rounded-lg",
                !day ? "invisible" : "",
                isToday ? "border-2 border-accent font-bold text-foreground" : "text-foreground",
                hasEvent ? "bg-primary text-primary-foreground" : "hover:bg-background",
              ].join(" ")}
            >
              {day}
              {/* Ponto indicador de evento */}
              {hasEvent && (
                <span
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-muted">
        <span className="inline-block h-2 w-2 rounded-full bg-primary align-middle" aria-hidden="true" />{" "}
        Dia com evento programado
      </p>
    </div>
  );
}
