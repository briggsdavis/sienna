import type { FunctionReturnType } from "convex/server"
import { unsplash } from "@/lib/site"
import type { api } from "../../convex/_generated/api"

export type EventOccurrence = FunctionReturnType<typeof api.events.range>[number]

export const EVENT_FALLBACK_IMAGE = unsplash("1519671482749-fd09be7ccebf", 1600, 80)

export function eventPath({ _id, occurrence }: EventOccurrence) {
  return `/events/${encodeURIComponent(_id)}/${occurrence}`
}

export type SampleEvent = EventOccurrence & { isSample: true }

export function isSampleEvent(event: EventOccurrence): event is SampleEvent {
  return "isSample" in event
}

/** Placeholder events, dated relative to today, shown until real events are scheduled in the admin. */
export function sampleEvents(today: string): SampleEvent[] {
  const sample = (
    id: string,
    title: string,
    venue: string,
    desc: string,
    inDays: number,
    startTime: string,
    endTime: string,
    image: string | null,
  ) => {
    const date = new Date(`${today}T12:00:00Z`)
    date.setUTCDate(date.getUTCDate() + inDays)
    const occurrence = date.toISOString().slice(0, 10)
    return {
      _id: `sample-${id}`,
      _creationTime: 0,
      title,
      venue,
      desc,
      image,
      date: occurrence,
      occurrence,
      startTime,
      endTime,
      recurrence: "none",
      isSample: true,
    } as unknown as SampleEvent
  }
  return [
    sample(
      "wine",
      "Italian Wine Night",
      "Mezzo",
      "A guided flight of four Italian reds, with small plates from the kitchen.",
      1,
      "19:00",
      "21:00",
      "/images/mezzo/chianti-and-pasta.webp",
    ),
    sample(
      "music",
      "Live Music on the Roof",
      "Il Tetto",
      "Local acoustic sets under the open sky, with cold drafts and pies all night.",
      3,
      "18:00",
      "21:00",
      null,
    ),
    sample(
      "trivia",
      "Meatball Trivia",
      "Emporio",
      "Three rounds of team trivia. Grab a draft and bring your sharpest friends.",
      8,
      "19:30",
      "21:30",
      "/images/mezzo/meatballs-al-forno.webp",
    ),
    sample(
      "pasta",
      "Pasta Making Class",
      "Mezzo",
      "Roll, cut and fill fresh pasta with our chefs, then sit down to eat what you made.",
      18,
      "18:00",
      "20:30",
      "/images/mezzo/gnocchi-and-pizza.webp",
    ),
    sample(
      "ball",
      "Ball of the Month Launch",
      "Emporio",
      "First taste of this month's meatball, with half-price drafts from five to seven.",
      23,
      "17:00",
      "19:00",
      "/images/mezzo/spaghetti.webp",
    ),
    sample(
      "brunch",
      "Sunday Rooftop Brunch",
      "Il Tetto",
      "Bottomless mimosas, breakfast pies and a DJ spinning soul records.",
      27,
      "11:00",
      "14:00",
      null,
    ),
  ]
}
