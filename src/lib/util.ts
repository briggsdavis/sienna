import { ConvexError } from "convex/values"

export function errorMessage(error: unknown) {
  if (error instanceof ConvexError) {
    return typeof error.data === "string" ? error.data : "Something went wrong"
  }
  if (error instanceof Error) {
    const match = error.message.match(/Uncaught ConvexError: (.+?)(\n|$)/)
    if (match) return match[1]
    return "Something went wrong. Please try again."
  }
  return "Something went wrong. Please try again."
}

export function newId() {
  return crypto.randomUUID()
}

export function todayKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function weekdayToday() {
  const day = todayKey()
  return new Date(`${day}T12:00:00Z`).getUTCDay()
}

export function addDays(day: string, days: number) {
  const date = new Date(`${day}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const WEEKDAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function formatTime(time?: string) {
  if (!time) return ""
  const [h, m] = time.split(":").map(Number)
  if (Number.isNaN(h)) return time
  const suffix = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`
}

export function formatDay(day: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${day}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", ...options })
}

export function money(value: number) {
  return value % 1 === 0 ? `$${value}` : `$${value.toFixed(2)}`
}

export function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#")
}
