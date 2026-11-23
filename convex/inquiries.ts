import { paginationOptsValidator } from "convex/server"
import { ConvexError, v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { mutation, query, type MutationCtx } from "./_generated/server"
import { recordConversion } from "./analytics"
import {
  cleanEmail,
  cleanPhone,
  cleanText,
  dayKey,
  formatMoney,
  getSettingsDoc,
  limitInquiry,
  notify,
  rateLimiter,
  rejectBots,
  requireAdmin,
} from "./lib"
import { inquiryStatus } from "./schema"

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const guard = {
  submissionId: v.string(),
  startedAt: v.number(),
  honeypot: v.optional(v.string()),
}

async function addSubscriber(ctx: MutationCtx, email: string, name: string, source: string) {
  const existing = await ctx.db
    .query("subscribers")
    .withIndex("by_email", (q) => q.eq("email", email))
    .unique()
  if (existing) return false
  const settings = await getSettingsDoc(ctx)
  await ctx.db.insert("subscribers", {
    email,
    name: name || undefined,
    source,
    consentText:
      settings?.marketingConsentText ||
      "Yes, send me Sienna Mercato news, menus and offers. Unsubscribe any time.",
  })
  return true
}

function checkDate(value: string, field: string) {
  if (!DATE_RE.test(value)) throw new ConvexError(`${field} is required`)
  if (value < dayKey()) throw new ConvexError(`${field} can't be in the past`)
  return value
}

export const submitCatering = mutation({
  args: {
    ...guard,
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    eventDate: v.string(),
    eventTime: v.string(),
    fulfillment: v.union(v.literal("pickup"), v.literal("delivery")),
    address: v.optional(v.string()),
    guests: v.optional(v.number()),
    notes: v.optional(v.string()),
    marketingConsent: v.boolean(),
    items: v.array(
      v.object({ itemId: v.id("menuItems"), optionIndex: v.number(), quantity: v.number() }),
    ),
  },
  handler: async (ctx, args) => {
    rejectBots(args.honeypot, args.startedAt)
    const existing = await ctx.db
      .query("cateringInquiries")
      .withIndex("by_submission", (q) => q.eq("submissionId", args.submissionId))
      .unique()
    if (existing) return existing._id

    const name = cleanText(args.name, "Name", 120, true)
    const email = cleanEmail(args.email)
    const phone = cleanPhone(args.phone, true)
    const eventDate = checkDate(args.eventDate, "Date")
    const eventTime = cleanText(args.eventTime, "Time", 20, true)
    const address = cleanText(args.address, "Address", 300, args.fulfillment === "delivery")
    const notes = cleanText(args.notes, "Notes", 2000)
    if (
      args.guests !== undefined &&
      (!Number.isInteger(args.guests) || args.guests < 1 || args.guests > 2000)
    ) {
      throw new ConvexError("Enter a valid guest count")
    }
    if (args.items.length === 0) throw new ConvexError("Your cart is empty")
    if (args.items.length > 60) throw new ConvexError("Too many items")

    await limitInquiry(ctx, email)

    const lines = []
    for (const line of args.items) {
      if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 100) {
        throw new ConvexError("Invalid quantity")
      }
      const item = await ctx.db.get("menuItems", line.itemId)
      if (!item || item.menu !== "catering" || item.hidden) {
        throw new ConvexError("An item in your cart is no longer offered")
      }
      if (!item.available) throw new ConvexError(`${item.name} is currently unavailable`)
      const option = item.options?.[line.optionIndex]
      if (!option) throw new ConvexError(`Pick a size for ${item.name}`)
      lines.push({
        itemId: item._id,
        name: item.name,
        option: option.label,
        unitPrice: option.price,
        quantity: line.quantity,
        lineTotal: Math.round(option.price * line.quantity * 100) / 100,
      })
    }
    const subtotal = Math.round(lines.reduce((sum, line) => sum + line.lineTotal, 0) * 100) / 100

    const id = await ctx.db.insert("cateringInquiries", {
      submissionId: args.submissionId,
      name,
      email,
      phone,
      eventDate,
      eventTime,
      fulfillment: args.fulfillment,
      address: address || undefined,
      guests: args.guests,
      notes: notes || undefined,
      items: lines,
      subtotal,
      status: "new",
      searchText: [name, email, phone, eventDate, address, notes, ...lines.map((l) => l.name)]
        .filter(Boolean)
        .join(" "),
    })

    await recordConversion(ctx, "cateringInquiry")
    if (args.marketingConsent && (await addSubscriber(ctx, email, name, "catering"))) {
      await recordConversion(ctx, "signup")
    }

    await notify(ctx, {
      subject: `Catering request: ${name}, ${eventDate}`,
      intro:
        "A new catering request came in from the website. It is a request only, not a paid order.",
      replyTo: email,
      idempotencyKey: `catering-${id}`,
      rows: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Date", eventDate],
        ["Time", eventTime],
        ["Service", args.fulfillment === "delivery" ? "Delivery" : "Pickup"],
        ["Address", address],
        ["Guests", args.guests ? String(args.guests) : ""],
        ["Notes", notes],
        ["Estimated subtotal", formatMoney(subtotal)],
      ],
      table: {
        head: ["Item", "Size", "Qty", "Price", "Total"],
        rows: lines.map((l) => [
          l.name,
          l.option,
          String(l.quantity),
          formatMoney(l.unitPrice),
          formatMoney(l.lineTotal),
        ]),
      },
    })
    return id
  },
})

export const submitContact = mutation({
  args: {
    ...guard,
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    rejectBots(args.honeypot, args.startedAt)
    const existing = await ctx.db
      .query("contactInquiries")
      .withIndex("by_submission", (q) => q.eq("submissionId", args.submissionId))
      .unique()
    if (existing) return existing._id

    const name = cleanText(args.name, "Name", 120, true)
    const email = cleanEmail(args.email)
    const phone = cleanPhone(args.phone)
    const subject = cleanText(args.subject, "Subject", 120)
    const message = cleanText(args.message, "Message", 4000, true)
    await limitInquiry(ctx, email)

    const id = await ctx.db.insert("contactInquiries", {
      submissionId: args.submissionId,
      name,
      email,
      phone: phone || undefined,
      subject: subject || undefined,
      message,
      status: "new",
      searchText: [name, email, phone, subject, message].filter(Boolean).join(" "),
    })
    await recordConversion(ctx, "contactInquiry")
    await notify(ctx, {
      subject: `Website message: ${subject || name}`,
      intro: "Someone sent a message through the contact form.",
      replyTo: email,
      idempotencyKey: `contact-${id}`,
      rows: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Subject", subject],
        ["Message", message],
      ],
    })
    return id
  },
})

export const submitPrivateEvent = mutation({
  args: {
    ...guard,
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    restaurant: v.string(),
    date: v.string(),
    partySize: v.number(),
    eventType: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    rejectBots(args.honeypot, args.startedAt)
    const existing = await ctx.db
      .query("privateEventInquiries")
      .withIndex("by_submission", (q) => q.eq("submissionId", args.submissionId))
      .unique()
    if (existing) return existing._id

    const name = cleanText(args.name, "Name", 120, true)
    const email = cleanEmail(args.email)
    const phone = cleanPhone(args.phone)
    const restaurant = cleanText(args.restaurant, "Restaurant", 60, true)
    const date = checkDate(args.date, "Date")
    const eventType = cleanText(args.eventType, "Event type", 80)
    const notes = cleanText(args.notes, "Notes", 4000)
    if (!Number.isInteger(args.partySize) || args.partySize < 1 || args.partySize > 1000) {
      throw new ConvexError("Enter a valid party size")
    }
    await limitInquiry(ctx, email)

    const id = await ctx.db.insert("privateEventInquiries", {
      submissionId: args.submissionId,
      name,
      email,
      phone: phone || undefined,
      restaurant,
      date,
      partySize: args.partySize,
      eventType: eventType || undefined,
      notes: notes || undefined,
      status: "new",
      searchText: [name, email, phone, restaurant, date, eventType, notes]
        .filter(Boolean)
        .join(" "),
    })
    await recordConversion(ctx, "privateEventInquiry")
    await notify(ctx, {
      subject: `Private event inquiry: ${name}, ${date}`,
      intro: "A new private dining or group event inquiry came in.",
      replyTo: email,
      idempotencyKey: `private-${id}`,
      rows: [
        ["Name", name],
        ["Email", email],
        ["Phone", phone],
        ["Restaurant", restaurant],
        ["Date", date],
        ["Party size", String(args.partySize)],
        ["Event type", eventType],
        ["Notes", notes],
      ],
    })
    return id
  },
})

const kind = v.union(v.literal("catering"), v.literal("contact"), v.literal("privateEvent"))

const TABLES = {
  catering: "cateringInquiries",
  contact: "contactInquiries",
  privateEvent: "privateEventInquiries",
} as const

export const list = query({
  args: {
    kind,
    status: v.optional(inquiryStatus),
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const table = TABLES[args.kind] as "contactInquiries"
    const search = args.search?.trim()
    if (search) {
      return await ctx.db
        .query(table)
        .withSearchIndex("search_text", (q) => {
          const s = q.search("searchText", search)
          return args.status ? s.eq("status", args.status) : s
        })
        .paginate(args.paginationOpts)
    }
    if (args.status) {
      const status = args.status
      return await ctx.db
        .query(table)
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .paginate(args.paginationOpts)
    }
    return await ctx.db.query(table).order("desc").paginate(args.paginationOpts)
  },
})

export const counts = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const count = async (table: (typeof TABLES)[keyof typeof TABLES]) =>
      (
        await ctx.db
          .query(table as "contactInquiries")
          .withIndex("by_status", (q) => q.eq("status", "new"))
          .take(100)
      ).length
    return {
      catering: await count("cateringInquiries"),
      contact: await count("contactInquiries"),
      privateEvent: await count("privateEventInquiries"),
    }
  },
})

const anyInquiryId = v.union(
  v.id("cateringInquiries"),
  v.id("contactInquiries"),
  v.id("privateEventInquiries"),
)

function tableFor(kindValue: keyof typeof TABLES) {
  return TABLES[kindValue] as "contactInquiries"
}

export const setStatus = mutation({
  args: { kind, id: anyInquiryId, status: inquiryStatus },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.patch(tableFor(args.kind), args.id as Id<"contactInquiries">, {
      status: args.status,
    })
    return null
  },
})

export const remove = mutation({
  args: { kind, id: anyInquiryId },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete(tableFor(args.kind), args.id as Id<"contactInquiries">)
    return null
  },
})

export const subscribe = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    source: v.string(),
    consent: v.boolean(),
    honeypot: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.honeypot) throw new ConvexError("Submission rejected")
    if (!args.consent) throw new ConvexError("Please confirm you'd like to receive emails")
    const email = cleanEmail(args.email)
    const name = cleanText(args.name, "Name", 120)
    const source = cleanText(args.source, "Source", 40) || "website"
    const limit = await rateLimiter.limit(ctx, "signupByEmail", { key: email })
    if (!limit.ok) throw new ConvexError("Please try again later")
    if (await addSubscriber(ctx, email, name, source)) await recordConversion(ctx, "signup")
    return null
  },
})

export const listSubscribers = query({
  args: { search: v.optional(v.string()), paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const search = args.search?.trim()
    if (search) {
      return await ctx.db
        .query("subscribers")
        .withSearchIndex("search_email", (q) => q.search("email", search))
        .paginate(args.paginationOpts)
    }
    return await ctx.db.query("subscribers").order("desc").paginate(args.paginationOpts)
  },
})

export const removeSubscriber = mutation({
  args: { id: v.id("subscribers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    await ctx.db.delete("subscribers", args.id)
    return null
  },
})
