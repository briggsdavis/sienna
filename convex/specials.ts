import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { requireAdmin, resolveImage, swapOrder } from "./lib"
import { restaurant } from "./schema"

export const list = query({
  args: { restaurant },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("specials")
      .withIndex("by_restaurant_and_order", (q) => q.eq("restaurant", args.restaurant))
      .take(200)
    return await Promise.all(
      rows
        .filter((row) => row.active)
        .map(async (row) => ({ ...row, image: await resolveImage(ctx, row) })),
    )
  },
})

export const listForAdmin = query({
  args: { restaurant },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const rows = await ctx.db
      .query("specials")
      .withIndex("by_restaurant_and_order", (q) => q.eq("restaurant", args.restaurant))
      .take(200)
    return await Promise.all(
      rows.map(async (row) => ({ ...row, image: await resolveImage(ctx, row) })),
    )
  },
})

const fields = {
  days: v.array(v.number()),
  name: v.string(),
  desc: v.optional(v.string()),
  price: v.optional(v.string()),
  active: v.boolean(),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
}

function checkDays(days: number[]) {
  if (days.length === 0) throw new ConvexError("Pick at least one day")
  if (days.some((day) => !Number.isInteger(day) || day < 0 || day > 6)) {
    throw new ConvexError("Invalid day")
  }
}

export const create = mutation({
  args: { restaurant, ...fields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    checkDays(args.days)
    const last = await ctx.db
      .query("specials")
      .withIndex("by_restaurant_and_order", (q) => q.eq("restaurant", args.restaurant))
      .order("desc")
      .first()
    return await ctx.db.insert("specials", { ...args, order: (last?.order ?? 0) + 1 })
  },
})

export const update = mutation({
  args: { id: v.id("specials"), ...fields },
  handler: async (ctx, { id, ...rest }) => {
    await requireAdmin(ctx)
    checkDays(rest.days)
    await ctx.db.patch("specials", id, rest)
    return null
  },
})

export const setActive = mutation({
  args: { id: v.id("specials"), active: v.boolean() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch("specials", args.id, { active: args.active })
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("specials") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete("specials", args.id)
    return null
  },
})

export const move = mutation({
  args: { id: v.id("specials"), direction: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const row = await ctx.db.get("specials", args.id)
    if (!row) throw new ConvexError("Special not found")
    const neighbor = await ctx.db
      .query("specials")
      .withIndex("by_restaurant_and_order", (q) =>
        args.direction === "up"
          ? q.eq("restaurant", row.restaurant).lt("order", row.order)
          : q.eq("restaurant", row.restaurant).gt("order", row.order),
      )
      .order(args.direction === "up" ? "desc" : "asc")
      .first()
    await swapOrder(ctx, "specials", row, neighbor)
    return null
  },
})
