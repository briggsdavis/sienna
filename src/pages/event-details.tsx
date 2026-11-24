import { useQuery } from "convex/react"
import { Link, useParams } from "react-router"
import { EventButton, EventDateTime } from "@/components/event-info"
import { HeroIntro, PageHero } from "@/components/hero"
import { Seo } from "@/components/seo"
import { EVENT_FALLBACK_IMAGE, eventPath } from "@/lib/events"
import { NotFound } from "@/pages/not-found"
import { api } from "../../convex/_generated/api"

export function EventDetails() {
  const { eventId, occurrence } = useParams()
  const day = occurrence && /^\d{4}-\d{2}-\d{2}$/.test(occurrence) ? occurrence : undefined
  const events = useQuery(api.events.range, eventId && day ? { from: day, to: day } : "skip")

  if (!eventId || !day) return <NotFound />
  if (events === undefined) {
    return (
      <p role="status" className="min-h-[50svh] bg-ink px-6 pt-28 text-cream">
        Loading event…
      </p>
    )
  }

  const event = events.find((item) => item._id === eventId && item.occurrence === day)
  if (!event) return <NotFound />

  return (
    <>
      <Seo
        path={eventPath(event)}
        title={`${event.title} | Sienna Mercato`}
        description={event.desc || `Event details for ${event.title} at Sienna Mercato.`}
      />
      <PageHero
        image={{ src: event.image || EVENT_FALLBACK_IMAGE, alt: "" }}
        overlay={<div className="absolute inset-0 bg-ink/60" />}
        viewportHeight={50}
      >
        <Link to="/events" className="under mb-5 inline-flex w-fit items-center gap-2 text-cream">
          <i aria-hidden="true" className="ph ph-arrow-left" />
          All events
        </Link>
        <HeroIntro title={event.title} />
      </PageHero>
      <section aria-label="Event details" className="bg-paper py-16 text-ink md:py-20">
        <div className="site-container">
          <EventDateTime {...event} />
          {event.venue && <p className="mt-3 text-ink-soft">{event.venue}</p>}
          {event.desc && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed whitespace-pre-line">
              {event.desc}
            </p>
          )}
          {event.buttonUrl && (
            <EventButton href={event.buttonUrl} label={event.buttonText || "Learn more"} />
          )}
        </div>
      </section>
    </>
  )
}
