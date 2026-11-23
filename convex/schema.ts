import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const restaurant = v.union(v.literal("emporio"), v.literal("mezzo"), v.literal("tetto"))

export const menuKey = v.union(
  v.literal("emporio"),
  v.literal("mezzo"),
  v.literal("tetto"),
  v.literal("catering"),
)

export const inquiryStatus = v.union(v.literal("new"), v.literal("reviewed"), v.literal("archived"))

export const priceOption = v.object({ label: v.string(), price: v.number() })

export const reservation = v.object({
  mode: v.union(v.literal("walkin"), v.literal("link"), v.literal("embed")),
  url: v.optional(v.string()),
  label: v.optional(v.string()),
  note: v.optional(v.string()),
})

export const sourceCounts = v.object({
  direct: v.number(),
  search: v.number(),
  social: v.number(),
  referral: v.number(),
  email: v.number(),
})

export const conversionKey = v.union(
  v.literal("cateringInquiry"),
  v.literal("contactInquiry"),
  v.literal("privateEventInquiry"),
  v.literal("reservationClick"),
  v.literal("giftCardClick"),
  v.literal("signup"),
)

export const conversionCounts = v.object({
  cateringInquiry: v.number(),
  contactInquiry: v.number(),
  privateEventInquiry: v.number(),
  reservationClick: v.number(),
  giftCardClick: v.number(),
  signup: v.number(),
})

const image = {
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
}

export default defineSchema({
  ...authTables,

  admins: defineTable({ email: v.string() }).index("by_email", ["email"]),

  settings: defineTable({
    key: v.literal("site"),
    notificationEmail: v.optional(v.string()),
    giftCardUrl: v.optional(v.string()),
    orderUrl: v.optional(v.string()),
    privacyPolicy: v.optional(v.string()),
    marketingConsentText: v.optional(v.string()),
    requireAnalyticsConsent: v.optional(v.boolean()),
    reservations: v.optional(
      v.object({ emporio: reservation, mezzo: reservation, tetto: reservation }),
    ),
  }).index("by_key", ["key"]),

  menuSections: defineTable({
    menu: menuKey,
    title: v.string(),
    subtitle: v.optional(v.string()),
    order: v.number(),
    ...image,
  }).index("by_menu_and_order", ["menu", "order"]),

  menuItems: defineTable({
    menu: menuKey,
    sectionId: v.id("menuSections"),
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
    order: v.number(),
    ...image,
  })
    .index("by_section_and_order", ["sectionId", "order"])
    .index("by_menu", ["menu"]),

  specials: defineTable({
    restaurant,
    days: v.array(v.number()),
    name: v.string(),
    desc: v.optional(v.string()),
    price: v.optional(v.string()),
    active: v.boolean(),
    order: v.number(),
    ...image,
  }).index("by_restaurant_and_order", ["restaurant", "order"]),

  events: defineTable({
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
    ...image,
  })
    .index("by_recurrence_and_date", ["recurrence", "date"])
    .index("by_date", ["date"]),

  pageContent: defineTable({
    page: v.string(),
    key: v.string(),
    text: v.optional(v.string()),
    href: v.optional(v.string()),
    ...image,
  }).index("by_page_and_key", ["page", "key"]),

  seo: defineTable({
    path: v.string(),
    title: v.string(),
    description: v.string(),
  }).index("by_path", ["path"]),

  cateringInquiries: defineTable({
    submissionId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    eventDate: v.string(),
    eventTime: v.string(),
    fulfillment: v.union(v.literal("pickup"), v.literal("delivery")),
    address: v.optional(v.string()),
    guests: v.optional(v.number()),
    notes: v.optional(v.string()),
    items: v.array(
      v.object({
        itemId: v.id("menuItems"),
        name: v.string(),
        option: v.string(),
        unitPrice: v.number(),
        quantity: v.number(),
        lineTotal: v.number(),
      }),
    ),
    subtotal: v.number(),
    status: inquiryStatus,
    searchText: v.string(),
  })
    .index("by_submission", ["submissionId"])
    .index("by_status", ["status"])
    .searchIndex("search_text", { searchField: "searchText", filterFields: ["status"] }),

  contactInquiries: defineTable({
    submissionId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.optional(v.string()),
    message: v.string(),
    status: inquiryStatus,
    searchText: v.string(),
  })
    .index("by_submission", ["submissionId"])
    .index("by_status", ["status"])
    .searchIndex("search_text", { searchField: "searchText", filterFields: ["status"] }),

  privateEventInquiries: defineTable({
    submissionId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    restaurant: v.string(),
    date: v.string(),
    partySize: v.number(),
    eventType: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: inquiryStatus,
    searchText: v.string(),
  })
    .index("by_submission", ["submissionId"])
    .index("by_status", ["status"])
    .searchIndex("search_text", { searchField: "searchText", filterFields: ["status"] }),

  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    source: v.string(),
    consentText: v.string(),
  })
    .index("by_email", ["email"])
    .searchIndex("search_email", { searchField: "email" }),

  popups: defineTable({
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
    ...image,
  }).index("by_active", ["active"]),

  announcements: defineTable({
    message: v.string(),
    ctaText: v.optional(v.string()),
    ctaUrl: v.optional(v.string()),
    tone: v.union(v.literal("sienna"), v.literal("ink"), v.literal("cream")),
    dismissible: v.boolean(),
    active: v.boolean(),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  }).index("by_active", ["active"]),

  dailyStats: defineTable({
    day: v.string(),
    views: v.number(),
    visitors: v.number(),
    sources: sourceCounts,
    conversions: conversionCounts,
  }).index("by_day", ["day"]),

  dailyPaths: defineTable({
    day: v.string(),
    path: v.string(),
    views: v.number(),
  }).index("by_day_and_path", ["day", "path"]),

  visitorDays: defineTable({
    day: v.string(),
    visitorId: v.string(),
  }).index("by_day_and_visitor", ["day", "visitorId"]),
})
