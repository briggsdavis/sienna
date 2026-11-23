import { v } from "convex/values"
import { mutation } from "./_generated/server"
import { requireAdmin } from "./lib"

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const remove = mutation({
  args: { id: v.id("_storage") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.storage.delete(args.id)
    return null
  },
})
