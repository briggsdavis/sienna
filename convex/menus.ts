import { ConvexError, v } from "convex/values"
import type { Doc } from "./_generated/dataModel"
import { mutation, query, type QueryCtx } from "./_generated/server"
import { requireAdmin, resolveImage, swapOrder } from "./lib"
import { menuKey, priceOption } from "./schema"

async function loadMenu(ctx: QueryCtx, menu: Doc<"menuSections">["menu"], includeHidden: boolean) {
  const sections = await ctx.db
    .query("menuSections")
    .withIndex("by_menu_and_order", (q) => q.eq("menu", menu))
    .take(100)

  return await Promise.all(
    sections.map(async (section) => {
      const items = await ctx.db
        .query("menuItems")
        .withIndex("by_section_and_order", (q) => q.eq("sectionId", section._id))
        .take(300)
      const visible = includeHidden ? items : items.filter((item) => !item.hidden)
      return {
        ...section,
        image: await resolveImage(ctx, section),
        items: await Promise.all(
          visible.map(async (item) => ({ ...item, image: await resolveImage(ctx, item) })),
        ),
      }
    }),
  )
}

export const get = query({
  args: { menu: menuKey },
  handler: async (ctx, args) => loadMenu(ctx, args.menu, false),
})

export const getForAdmin = query({
  args: { menu: menuKey },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    return await loadMenu(ctx, args.menu, true)
  },
})

const sectionFields = {
  title: v.string(),
  subtitle: v.optional(v.string()),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
}

export const createSection = mutation({
  args: { menu: menuKey, ...sectionFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const last = await ctx.db
      .query("menuSections")
      .withIndex("by_menu_and_order", (q) => q.eq("menu", args.menu))
      .order("desc")
      .first()
    return await ctx.db.insert("menuSections", { ...args, order: (last?.order ?? 0) + 1 })
  },
})

export const updateSection = mutation({
  args: { id: v.id("menuSections"), ...sectionFields },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx)
    await ctx.db.patch("menuSections", id, fields)
    return null
  },
})

export const deleteSection = mutation({
  args: { id: v.id("menuSections") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const items = await ctx.db
      .query("menuItems")
      .withIndex("by_section_and_order", (q) => q.eq("sectionId", args.id))
      .take(1000)
    for (const item of items) await ctx.db.delete("menuItems", item._id)
    await ctx.db.delete("menuSections", args.id)
    return null
  },
})

export const moveSection = mutation({
  args: { id: v.id("menuSections"), direction: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const section = await ctx.db.get("menuSections", args.id)
    if (!section) throw new ConvexError("Section not found")
    const neighbor = await ctx.db
      .query("menuSections")
      .withIndex("by_menu_and_order", (q) =>
        args.direction === "up"
          ? q.eq("menu", section.menu).lt("order", section.order)
          : q.eq("menu", section.menu).gt("order", section.order),
      )
      .order(args.direction === "up" ? "desc" : "asc")
      .first()
    await swapOrder(ctx, "menuSections", section, neighbor)
    return null
  },
})

const itemFields = {
  name: v.string(),
  desc: v.optional(v.string()),
  price: v.optional(v.string()),
  flag: v.optional(v.string()),
  options: v.optional(v.array(priceOption)),
  note: v.optional(v.string()),
  serves: v.optional(v.string()),
  kitchen: v.optional(v.union(v.literal("emporio"), v.literal("mezzo"))),
  available: v.boolean(),
  hidden: v.boolean(),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
}

export const createItem = mutation({
  args: { sectionId: v.id("menuSections"), ...itemFields },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const section = await ctx.db.get("menuSections", args.sectionId)
    if (!section) throw new ConvexError("Section not found")
    const last = await ctx.db
      .query("menuItems")
      .withIndex("by_section_and_order", (q) => q.eq("sectionId", args.sectionId))
      .order("desc")
      .first()
    return await ctx.db.insert("menuItems", {
      ...args,
      menu: section.menu,
      order: (last?.order ?? 0) + 1,
    })
  },
})

export const updateItem = mutation({
  args: { id: v.id("menuItems"), sectionId: v.id("menuSections"), ...itemFields },
  handler: async (ctx, { id, ...fields }) => {
    await requireAdmin(ctx)
    const item = await ctx.db.get("menuItems", id)
    if (!item) throw new ConvexError("Item not found")
    let order = item.order
    if (fields.sectionId !== item.sectionId) {
      const last = await ctx.db
        .query("menuItems")
        .withIndex("by_section_and_order", (q) => q.eq("sectionId", fields.sectionId))
        .order("desc")
        .first()
      order = (last?.order ?? 0) + 1
    }
    await ctx.db.patch("menuItems", id, { ...fields, order })
    return null
  },
})

export const setItemFlags = mutation({
  args: {
    id: v.id("menuItems"),
    available: v.optional(v.boolean()),
    hidden: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...flags }) => {
    await requireAdmin(ctx)
    await ctx.db.patch("menuItems", id, flags)
    return null
  },
})

export const deleteItem = mutation({
  args: { id: v.id("menuItems") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete("menuItems", args.id)
    return null
  },
})

export const moveItem = mutation({
  args: { id: v.id("menuItems"), direction: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const item = await ctx.db.get("menuItems", args.id)
    if (!item) throw new ConvexError("Item not found")
    const neighbor = await ctx.db
      .query("menuItems")
      .withIndex("by_section_and_order", (q) =>
        args.direction === "up"
          ? q.eq("sectionId", item.sectionId).lt("order", item.order)
          : q.eq("sectionId", item.sectionId).gt("order", item.order),
      )
      .order(args.direction === "up" ? "desc" : "asc")
      .first()
    await swapOrder(ctx, "menuItems", item, neighbor)
    return null
  },
})
