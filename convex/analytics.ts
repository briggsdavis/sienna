import { ConvexError, v, type Infer } from "convex/values"
import { internal } from "./_generated/api"
import { internalMutation, mutation, query, type MutationCtx } from "./_generated/server"
import { dayKey, rateLimiter, requireAdmin } from "./lib"
import { conversionKey } from "./schema"

type Source = "direct" | "search" | "social" | "referral" | "email"
type Conversion = Infer<typeof conversionKey>

const SEARCH = ["google.", "bing.", "duckduckgo.", "yahoo.", "ecosia.", "baidu.", "yandex."]
const SOCIAL = [
  "facebook.",
  "instagram.",
  "t.co",
  "twitter.",
  "x.com",
  "tiktok.",
  "linkedin.",
  "pinterest.",
  "reddit.",
  "threads.net",
  "lnkd.in",
  "fb.me",
]

function classify(referrer: string, utmSource: string, utmMedium: string): Source {
  const medium = utmMedium.toLowerCase()
  const source = utmSource.toLowerCase()
  if (medium.includes("email") || source.includes("newsletter")) return "email"
  const host = (() => {
    try {
      return referrer ? new URL(referrer).hostname.toLowerCase() : ""
    } catch {
      return ""
    }
  })()
  const probe = source || host
  if (!probe) return "direct"
  if (medium.includes("social") || SOCIAL.some((s) => probe.includes(s))) return "social"
  if (medium.includes("cpc") || medium.includes("organic") || SEARCH.some((s) => probe.includes(s)))
    return "search"
  return "referral"
}

const EMPTY_SOURCES = { direct: 0, search: 0, social: 0, referral: 0, email: 0 }
const EMPTY_CONVERSIONS = {
  cateringInquiry: 0,
  contactInquiry: 0,
  privateEventInquiry: 0,
  reservationClick: 0,
  giftCardClick: 0,
  signup: 0,
}

async function getDay(ctx: MutationCtx, day: string) {
  const existing = await ctx.db
    .query("dailyStats")
    .withIndex("by_day", (q) => q.eq("day", day))
    .unique()
  if (existing) return existing
  const id = await ctx.db.insert("dailyStats", {
    day,
    views: 0,
    visitors: 0,
    sources: EMPTY_SOURCES,
    conversions: EMPTY_CONVERSIONS,
  })
  return (await ctx.db.get("dailyStats", id))!
}

export async function recordConversion(ctx: MutationCtx, key: Conversion) {
  const stats = await getDay(ctx, dayKey())
  await ctx.db.patch("dailyStats", stats._id, {
    conversions: { ...stats.conversions, [key]: stats.conversions[key] + 1 },
  })
}

export const track = mutation({
  args: {
    visitorId: v.string(),
    path: v.string(),
    referrer: v.string(),
    utmSource: v.string(),
    utmMedium: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.visitorId.length > 64 || args.path.length > 300) throw new ConvexError("Bad input")
    const limit = await rateLimiter.limit(ctx, "trackByVisitor", { key: args.visitorId })
    if (!limit.ok) return null

    const day = dayKey()
    const stats = await getDay(ctx, day)
    const seen = await ctx.db
      .query("visitorDays")
      .withIndex("by_day_and_visitor", (q) => q.eq("day", day).eq("visitorId", args.visitorId))
      .unique()

    const patch: Partial<typeof stats> = { views: stats.views + 1 }
    if (!seen) {
      await ctx.db.insert("visitorDays", { day, visitorId: args.visitorId })
      const source = classify(args.referrer.slice(0, 500), args.utmSource, args.utmMedium)
      patch.visitors = stats.visitors + 1
      patch.sources = { ...stats.sources, [source]: stats.sources[source] + 1 }
    }
    await ctx.db.patch("dailyStats", stats._id, patch)

    const path = args.path.split("?")[0] || "/"
    const pathRow = await ctx.db
      .query("dailyPaths")
      .withIndex("by_day_and_path", (q) => q.eq("day", day).eq("path", path))
      .unique()
    if (pathRow) await ctx.db.patch("dailyPaths", pathRow._id, { views: pathRow.views + 1 })
    else await ctx.db.insert("dailyPaths", { day, path, views: 1 })
    return null
  },
})

export const trackConversion = mutation({
  args: {
    visitorId: v.string(),
    key: v.union(v.literal("reservationClick"), v.literal("giftCardClick")),
  },
  handler: async (ctx, args) => {
    const limit = await rateLimiter.limit(ctx, "trackByVisitor", { key: args.visitorId })
    if (!limit.ok) return null
    await recordConversion(ctx, args.key)
    return null
  },
})

export const report = query({
  args: { from: v.string(), to: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const days = await ctx.db
      .query("dailyStats")
      .withIndex("by_day", (q) => q.gte("day", args.from).lte("day", args.to))
      .take(400)
    const paths = await ctx.db
      .query("dailyPaths")
      .withIndex("by_day_and_path", (q) => q.gte("day", args.from).lte("day", args.to))
      .take(8000)
    const byPath = new Map<string, number>()
    for (const row of paths) byPath.set(row.path, (byPath.get(row.path) ?? 0) + row.views)
    const topPaths = [...byPath.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([path, views]) => ({ path, views }))
    return {
      days: days.map(({ day, views, visitors, sources, conversions }) => ({
        day,
        views,
        visitors,
        sources,
        conversions,
      })),
      topPaths,
    }
  },
})

export const purgeVisitorDays = internalMutation({
  args: {},
  handler: async (ctx) => {
    const cutoff = dayKey(Date.now() - 3 * 24 * 60 * 60 * 1000)
    const old = await ctx.db
      .query("visitorDays")
      .withIndex("by_day_and_visitor", (q) => q.lt("day", cutoff))
      .take(1000)
    for (const row of old) await ctx.db.delete("visitorDays", row._id)
    if (old.length === 1000) {
      await ctx.scheduler.runAfter(0, internal.analytics.purgeVisitorDays, {})
    }
    return null
  },
})
