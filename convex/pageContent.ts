import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin, resolveImage } from "./lib"

export const forPage = query({
  args: { page: v.string() },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("pageContent")
      .withIndex("by_page_and_key", (q) => q.eq("page", args.page))
      .take(500)
    const content: Record<string, { text?: string; href?: string; image?: string | null }> = {}
    for (const row of rows) {
      content[row.key] = {
        text: row.text,
        href: row.href,
        image: row.imageId || row.imageUrl ? await resolveImage(ctx, row) : undefined,
      }
    }
    return content
  },
})

export const set = mutation({
  args: {
    page: v.string(),
    key: v.string(),
    text: v.optional(v.string()),
    href: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, { page, key, ...fields }) => {
    await requireAdmin(ctx)
    const existing = await ctx.db
      .query("pageContent")
      .withIndex("by_page_and_key", (q) => q.eq("page", page).eq("key", key))
      .unique()
    if (existing) await ctx.db.patch("pageContent", existing._id, fields)
    else await ctx.db.insert("pageContent", { page, key, ...fields })
    return null
  },
})

export const reset = mutation({
  args: { page: v.string(), key: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const existing = await ctx.db
      .query("pageContent")
      .withIndex("by_page_and_key", (q) => q.eq("page", args.page).eq("key", args.key))
      .unique()
    if (existing) await ctx.db.delete("pageContent", existing._id)
    return null
  },
})
