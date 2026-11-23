import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { env } from "./_generated/server"
import { cleanEmail, getAdmin, normalizeEmail, requireAdmin } from "./lib"

export const me = query({
  args: {},
  handler: async (ctx) => {
    const admin = await getAdmin(ctx)
    return admin ? { email: admin.email ?? "" } : null
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const rows = await ctx.db.query("admins").take(100)
    const fromEnv = (env.ADMIN_EMAILS ?? "").split(",").map(normalizeEmail).filter(Boolean)
    return {
      fromEnv,
      added: rows.map((row) => ({ _id: row._id, email: row.email })),
    }
  },
})

export const add = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const email = cleanEmail(args.email)
    const existing = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique()
    if (existing) return null
    await ctx.db.insert("admins", { email })
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("admins") },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx)
    const row = await ctx.db.get("admins", args.id)
    if (row && row.email === normalizeEmail(admin.email ?? "")) {
      throw new ConvexError("You can't remove yourself")
    }
    await ctx.db.delete("admins", args.id)
    return null
  },
})
