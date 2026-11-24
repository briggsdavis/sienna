import type { FunctionReturnType } from "convex/server"
import { unsplash } from "@/lib/site"
import type { api } from "../../convex/_generated/api"

export type EventOccurrence = FunctionReturnType<typeof api.events.range>[number]

export const EVENT_FALLBACK_IMAGE = unsplash("1519671482749-fd09be7ccebf", 1600, 80)

export function eventPath({ _id, occurrence }: EventOccurrence) {
  return `/events/${encodeURIComponent(_id)}/${occurrence}`
}
