import { ConvexError, v } from "convex/values"
import type { Doc } from "./_generated/dataModel"
import { mutation, query } from "./_generated/server"
import { requireAdmin, resolveImage } from "./lib"

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function parseDay(day: string) {
  const [y, m, d] = day.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function formatDay(date: Date) {
  return date.toISOString().slice(0, 10)
}

function occurrences(event: Doc<"events">, from: string, to: string) {
  if (event.recurrence === "none") {
    return event.date >= from && event.date <= to ? [event.date] : []
  }
  const end = event.recurUntil && event.recurUntil < to ? event.recurUntil : to
  const start = parseDay(event.date)
  const dates: string[] = []
  for (let i = 0; i < 400; i++) {
    const next = new Date(start)
    if (event.recurrence === "weekly") next.setUTCDate(start.getUTCDate() + i * 7)
    else {
      next.setUTCMonth(start.getUTCMonth() + i)
      if (next.getUTCDate() !== start.getUTCDate()) continue
    }
    const day = formatDay(next)
    if (day > end) break
    if (day >= from) dates.push(day)
  }
  return dates
}

export const range = query({
  args: { from: v.string(), to: v.string() },
  handler: async (ctx, args) => {
    if (!DATE_RE.test(args.from) || !DATE_RE.test(args.to)) throw new ConvexError("Bad range")
    const oneOff = await ctx.db
      .query("events")
      .withIndex("by_recurrence_and_date", (q) =>
        q.eq("recurrence", "none").gte("date", args.from).lte("date", args.to),
      )
      .take(300)
    const weekly = await ctx.db
      .query("events")
      .withIndex("by_recurrence_and_date", (q) => q.eq("recurrence", "weekly").lte("date", args.to))
      .take(200)
    const monthly = await ctx.db
      .query("events")
      .withIndex("by_recurrence_and_date", (q) =>
        q.eq("recurrence", "monthly").lte("date", args.to),
      )
      .take(200)

    const result = []
    for (const event of [...oneOff, ...weekly, ...monthly]) {
      const dates = occurrences(event, args.from, args.to)
      if (dates.length === 0) continue
      const image = await resolveImage(ctx, event)
      for (const date of dates) result.push({ ...event, image, occurrence: date })
    }
    result.sort((a, b) =>
      a.occurrence === b.occurrence
        ? (a.startTime ?? "").localeCompare(b.startTime ?? "")
        : a.occurrence.localeCompare(b.occurrence),
    )
    return result
  },
})

export const listForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const rows = await ctx.db.query("events").withIndex("by_date").order("desc").take(500)
    return await Promise.all(
      rows.map(async (row) => ({ ...row, image: await resolveImage(ctx, row) })),
    )
  },
})

const fields = {
  title: v.string(),
  date: v.string(),
  startTime: v.optional(v.string()),
  endTime: v.optional(v.string()),
  desc: v.optional(v.string()),
  venue: v.optional(v.string()),
  buttonText: v.optional(v.string()),
  buttonUrl: v.optional(v.string()),
  recurrence: v.union(v.literal("none"), v.literal("weekly"), v.literal("monthly")),
  recurUntil: v.optional(v.string()),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
}

function check(args: { title: string; date: string; recurUntil?: string }) {
  if (!args.title.trim()) throw new ConvexError("Title is required")
  if (!DATE_RE.test(args.date)) throw new ConvexError("Date is required")
  if (args.recurUntil && !DATE_RE.test(args.recurUntil)) throw new ConvexError("Bad end date")
}

export const create = mutation({
  args: fields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    check(args)
    return await ctx.db.insert("events", args)
  },
})

export const update = mutation({
  args: { id: v.id("events"), ...fields },
  handler: async (ctx, { id, ...rest }) => {
    await requireAdmin(ctx)
    check(rest)
    await ctx.db.replace("events", id, rest)
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete("events", args.id)
    return null
  },
})
