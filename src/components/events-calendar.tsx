import { useQuery } from "convex/react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router"
import { EventButton } from "@/components/event-info"
import { eventPath } from "@/lib/events"
import { WEEKDAYS, addDays, formatDay, formatTime, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"

function monthStart(day: string) {
  return `${day.slice(0, 7)}-01`
}

function shiftMonth(first: string, delta: number) {
  const [y, m] = first.split("-").map(Number)
  const date = new Date(Date.UTC(y, m - 1 + delta, 1))
  return date.toISOString().slice(0, 10)
}

function gridDays(first: string) {
  const start = addDays(first, -new Date(`${first}T12:00:00Z`).getUTCDay())
  return Array.from({ length: 42 }, (_, i) => addDays(start, i))
}

export function EventsCalendar() {
  const today = todayKey()
  const [month, setMonth] = useState(monthStart(today))
  const [selected, setSelected] = useState<string | null>(null)
  const days = useMemo(() => gridDays(month), [month])
  const events = useQuery(api.events.range, { from: days[0], to: days[days.length - 1] })

  const byDay = useMemo(() => {
    const map = new Map<string, NonNullable<typeof events>>()
    for (const event of events ?? []) {
      map.set(event.occurrence, [...(map.get(event.occurrence) ?? []), event])
    }
    return map
  }, [events])

  useEffect(() => {
    if (!events || selected) return
    const inMonth = events.filter((e) => e.occurrence.slice(0, 7) === month.slice(0, 7))
    const upcoming = inMonth.find((e) => e.occurrence >= today) ?? inMonth[0]
    if (upcoming) setSelected(upcoming.occurrence)
  }, [events, month, selected, today])

  const selectedEvents = selected ? (byDay.get(selected) ?? []) : []
  const monthEvents = (events ?? []).filter((e) => e.occurrence.slice(0, 7) === month.slice(0, 7))

  const go = (delta: number) => {
    setMonth(shiftMonth(month, delta))
    setSelected(null)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-4xl">
            {formatDay(month, { month: "long", year: "numeric" })}
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous month"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 hover:border-sienna hover:text-sienna"
            >
              <i className="ph ph-caret-left" />
            </button>
            <button
              type="button"
              onClick={() => {
                setMonth(monthStart(today))
                setSelected(null)
              }}
              className="rounded-full border border-ink/25 px-4 font-serif text-2xs tracking-[0.25em] uppercase hover:border-sienna hover:text-sienna"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next month"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/25 hover:border-sienna hover:text-sienna"
            >
              <i className="ph ph-caret-right" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px border border-ink/15 bg-ink/15" role="grid">
          {WEEKDAYS.map((label) => (
            <div
              key={label}
              className="bg-cream py-2 text-center font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase"
            >
              {label}
            </div>
          ))}
          {days.map((day) => {
            const inMonth = day.slice(0, 7) === month.slice(0, 7)
            const dayEvents = byDay.get(day) ?? []
            const isSelected = day === selected
            const isToday = day === today
            return (
              <button
                key={day}
                type="button"
                role="gridcell"
                aria-selected={isSelected}
                aria-label={`${formatDay(day, { weekday: "long", month: "long", day: "numeric" })}${
                  dayEvents.length
                    ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}`
                    : ""
                }`}
                onClick={() => setSelected(day)}
                className={`flex min-h-16 flex-col items-start gap-1 p-1.5 text-left transition-colors sm:min-h-24 sm:p-2 ${
                  isSelected ? "bg-sienna text-cream" : "bg-cream hover:bg-paper"
                } ${inMonth ? "" : "[&>*]:opacity-35"}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-serif text-xs tabular-nums ${
                    isToday
                      ? "bg-sienna-bright text-cream"
                      : isSelected
                        ? "text-cream"
                        : "text-ink/80"
                  }`}
                >
                  {Number(day.slice(8))}
                </span>
                <span className="hidden w-full flex-col gap-0.5 sm:flex">
                  {dayEvents.slice(0, 2).map((event) => (
                    <span
                      key={event._id}
                      className={`truncate rounded-sm px-1.5 py-0.5 font-body text-[0.7rem] leading-tight ${
                        isSelected ? "bg-cream/20 text-cream" : "bg-sienna/15 text-sienna-deep"
                      }`}
                    >
                      {event.title}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="px-1.5 font-body text-[0.7rem] opacity-60">
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </span>
                {dayEvents.length > 0 && (
                  <span className="flex gap-0.5 sm:hidden">
                    {dayEvents.slice(0, 3).map((event) => (
                      <span
                        key={event._id}
                        className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-cream" : "bg-sienna-bright"}`}
                      />
                    ))}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div aria-live="polite">
        <div className="mb-6 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
          {selected
            ? formatDay(selected, { weekday: "long", month: "long", day: "numeric" })
            : "This month"}
        </div>
        {events === undefined ? (
          <div className="h-40" />
        ) : selected && selectedEvents.length === 0 ? (
          <p className="font-body text-lg text-ink-soft">
            Nothing scheduled this day. All three floors are open for walk-ins on their regular
            hours.
          </p>
        ) : (
          <ul className="space-y-6">
            {(selected ? selectedEvents : monthEvents).map((event) => (
              <li
                key={`${event._id}-${event.occurrence}`}
                className="overflow-hidden border border-ink/10 bg-paper"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h4 className="font-display text-3xl leading-tight">
                    <Link to={eventPath(event)} className="under">
                      {event.title}
                    </Link>
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
                    {!selected && (
                      <span>{formatDay(event.occurrence, { month: "short", day: "numeric" })}</span>
                    )}
                    {event.startTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ph ph-clock text-sm" />
                        {formatTime(event.startTime)}
                        {event.endTime && ` to ${formatTime(event.endTime)}`}
                      </span>
                    )}
                    {event.venue && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ph ph-house-line text-sm" />
                        {event.venue}
                      </span>
                    )}
                    {event.recurrence !== "none" && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="ph ph-repeat text-sm" />
                        {event.recurrence}
                      </span>
                    )}
                  </div>
                  {event.desc && (
                    <p className="mt-4 font-body leading-relaxed text-ink-soft">{event.desc}</p>
                  )}
                  {event.buttonUrl && (
                    <EventButton href={event.buttonUrl} label={event.buttonText || "Learn more"} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
