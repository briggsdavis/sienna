import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { cleanText, requireAdmin } from "./lib"

export const forPath = query({
  args: { path: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("seo")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .unique()
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.db.query("seo").take(100)
  },
})

export const save = mutation({
  args: { path: v.string(), title: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const title = cleanText(args.title, "Title", 120)
    const description = cleanText(args.description, "Description", 320)
    const existing = await ctx.db
      .query("seo")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .unique()
    if (!title && !description) {
      if (existing) await ctx.db.delete("seo", existing._id)
      return null
    }
    if (existing) await ctx.db.patch("seo", existing._id, { title, description })
    else await ctx.db.insert("seo", { path: args.path, title, description })
    return null
  },
})
