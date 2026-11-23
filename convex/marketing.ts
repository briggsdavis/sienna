import { ConvexError, v } from "convex/values"
import { mutation, query, type MutationCtx } from "./_generated/server"
import { requireAdmin, resolveImage } from "./lib"

export const activePopup = query({
  args: {},
  handler: async (ctx) => {
    const popup = await ctx.db
      .query("popups")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("desc")
      .first()
    if (!popup) return null
    return { ...popup, image: await resolveImage(ctx, popup) }
  },
})

export const listPopups = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const rows = await ctx.db.query("popups").order("desc").take(50)
    return await Promise.all(
      rows.map(async (row) => ({ ...row, image: await resolveImage(ctx, row) })),
    )
  },
})

const popupFields = {
  name: v.string(),
  headline: v.string(),
  body: v.string(),
  buttonLabel: v.string(),
  successMessage: v.string(),
  askName: v.boolean(),
  delaySeconds: v.number(),
  frequencyDays: v.number(),
  pages: v.array(v.string()),
  active: v.boolean(),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
}

function checkPopup(args: { headline: string; delaySeconds: number; frequencyDays: number }) {
  if (!args.headline.trim()) throw new ConvexError("Headline is required")
  if (args.delaySeconds < 0 || args.delaySeconds > 600)
    throw new ConvexError("Delay must be 0-600s")
  if (args.frequencyDays < 0 || args.frequencyDays > 365)
    throw new ConvexError("Frequency must be 0-365 days")
}

async function deactivateOthers(ctx: MutationCtx, keep: string | null) {
  const active = await ctx.db
    .query("popups")
    .withIndex("by_active", (q) => q.eq("active", true))
    .take(50)
  for (const row of active)
    if (row._id !== keep) await ctx.db.patch("popups", row._id, { active: false })
}

export const createPopup = mutation({
  args: popupFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    checkPopup(args)
    if (args.active) await deactivateOthers(ctx, null)
    return await ctx.db.insert("popups", args)
  },
})

export const updatePopup = mutation({
  args: { id: v.id("popups"), ...popupFields },
  handler: async (ctx, { id, ...rest }) => {
    await requireAdmin(ctx)
    checkPopup(rest)
    if (rest.active) await deactivateOthers(ctx, id)
    await ctx.db.replace("popups", id, rest)
    return null
  },
})

export const removePopup = mutation({
  args: { id: v.id("popups") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete("popups", args.id)
    return null
  },
})

export const activeAnnouncements = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("active", true))
      .order("desc")
      .take(10)
  },
})

export const listAnnouncements = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.db.query("announcements").order("desc").take(50)
  },
})

const announcementFields = {
  message: v.string(),
  ctaText: v.optional(v.string()),
  ctaUrl: v.optional(v.string()),
  tone: v.union(v.literal("sienna"), v.literal("ink"), v.literal("cream")),
  dismissible: v.boolean(),
  active: v.boolean(),
  startDate: v.optional(v.string()),
  endDate: v.optional(v.string()),
}

export const createAnnouncement = mutation({
  args: announcementFields,
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    if (!args.message.trim()) throw new ConvexError("Message is required")
    return await ctx.db.insert("announcements", args)
  },
})

export const updateAnnouncement = mutation({
  args: { id: v.id("announcements"), ...announcementFields },
  handler: async (ctx, { id, ...rest }) => {
    await requireAdmin(ctx)
    if (!rest.message.trim()) throw new ConvexError("Message is required")
    await ctx.db.replace("announcements", id, rest)
    return null
  },
})

export const removeAnnouncement = mutation({
  args: { id: v.id("announcements") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete("announcements", args.id)
    return null
  },
})

export const setPopupActive = mutation({
  args: { id: v.id("popups"), active: v.boolean() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    if (args.active) await deactivateOthers(ctx, args.id)
    await ctx.db.patch("popups", args.id, { active: args.active })
    return null
  },
})

export const setAnnouncementActive = mutation({
  args: { id: v.id("announcements"), active: v.boolean() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("announcements", args.id, { active: args.active })
    return null
  },
})
