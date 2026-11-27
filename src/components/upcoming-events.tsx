import { useQuery } from "convex/react"
import { Link } from "react-router"
import { EventDateTime } from "@/components/event-info"
import { FadeIn } from "@/components/fade-in"
import { useScrollCorners } from "@/hooks/use-scroll-corners"
import { EVENT_FALLBACK_IMAGE, eventPath, type EventOccurrence } from "@/lib/events"
import { FLOORS } from "@/lib/site"
import { addDays, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"

/** Shown until real events are scheduled in the admin. */
function sampleEvents(today: string) {
  const sample = (
    id: string,
    title: string,
    venue: string,
    desc: string,
    inDays: number,
    startTime: string,
    endTime: string,
    image: string | null,
  ) =>
    ({
      _id: `sample-${id}`,
      title,
      venue,
      desc,
      image,
      occurrence: addDays(today, inDays),
      startTime,
      endTime,
      isSample: true,
    }) as unknown as EventOccurrence & { isSample: true }
  return [
    sample(
      "wine",
      "Italian Wine Night",
      "Mezzo",
      "A guided flight of four Italian reds, with small plates from the kitchen.",
      4,
      "19:00",
      "21:00",
      "/images/mezzo/chianti-and-pasta.webp",
    ),
    sample(
      "music",
      "Live Music on the Roof",
      "Il Tetto",
      "Local acoustic sets under the open sky, with cold drafts and pies all night.",
      9,
      "18:00",
      "21:00",
      null,
    ),
    sample(
      "trivia",
      "Meatball Trivia",
      "Emporio",
      "Three rounds of team trivia. Grab a draft and bring your sharpest friends.",
      14,
      "19:30",
      "21:30",
      "/images/mezzo/meatballs-al-forno.webp",
    ),
  ]
}

export function UpcomingEvents() {
  const today = todayKey()
  const loaded = useQuery(api.events.range, { from: today, to: addDays(today, 60) })
  const events = loaded?.length === 0 ? sampleEvents(today) : loaded
  const region = useScrollCorners<HTMLElement>(events)
  const featured: EventOccurrence[] = []

  for (const event of events ?? []) {
    if (featured.some(({ _id }) => _id === event._id)) continue
    featured.push(event)
    if (featured.length === 4) break
  }

  return (
    <section
      id="upcoming-events"
      ref={region}
      aria-labelledby="upcoming-events-title"
      className="scroll-mt-20 bg-linear-to-b from-sienna-deep via-sienna to-sienna-bright py-18 text-cream md:py-24 lg:py-28"
    >
      <div className="site-container">
        <FadeIn
          stagger
          className="upcoming-event-reveal mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-10"
        >
          <h2
            id="upcoming-events-title"
            className="font-display text-[clamp(2.5rem,calc(6vw*var(--site-type-scale)),5.5rem)] leading-[0.9]"
          >
            Upcoming events
          </h2>
          <Link
            to="/events"
            className="btn-lift shrink-0 border border-cream/60 text-cream hover:bg-cream hover:text-sienna"
          >
            All events <i aria-hidden="true" className="ph ph-arrow-right" />
          </Link>
        </FadeIn>

        {events === undefined ? (
          <p role="status" className="py-8 text-cream/85">
            Loading events…
          </p>
        ) : featured.length === 0 ? (
          <p className="py-8 text-cream/85">No upcoming events are currently scheduled.</p>
        ) : (
          <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">
            {featured.map((event, index) => {
              const titleId = `upcoming-event-${event._id}`
              const venue = event.venue?.toLowerCase()
              const host = Object.values(FLOORS).find(({ name }) =>
                venue?.includes(name.toLowerCase()),
              )
              const reversed = index >= 2
              const isSample = "isSample" in event
              return (
                <article key={event._id}>
                  <Link
                    to={isSample ? "/events" : eventPath(event)}
                    aria-labelledby={titleId}
                    className={`group grid items-end gap-3 sm:gap-5 ${reversed ? "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"}`}
                  >
                    <FadeIn stagger delay={index * 0.08} className="upcoming-event-reveal min-w-0">
                      {host && (
                        <div className="mb-3">
                          <img
                            src={host.logo}
                            alt={`Hosted by ${host.name}`}
                            className="h-11 w-auto max-w-full object-contain object-left brightness-0 invert md:h-13"
                          />
                        </div>
                      )}
                      <h3
                        id={titleId}
                        className="font-display text-3xl leading-[0.95] group-hover:underline xl:text-4xl"
                      >
                        {event.title}
                        {isSample && (
                          <span className="ml-3 align-middle font-serif text-2xs tracking-[0.3em] text-cream/60 uppercase">
                            Sample
                          </span>
                        )}
                      </h3>
                      {event.desc && (
                        <p className="mt-2 font-body text-sm leading-snug text-cream/90">
                          {event.desc}
                        </p>
                      )}
                      <div className="mt-3 font-serif tracking-[0.2em] text-cream uppercase">
                        <EventDateTime {...event} />
                      </div>
                    </FadeIn>
                    <div
                      className={`aspect-[3/2] w-full overflow-hidden bg-sienna-deep ${reversed ? "order-first" : ""}`}
                      data-scroll-corners
                    >
                      <img
                        src={event.image || EVENT_FALLBACK_IMAGE}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
