import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getSettingsDoc, requireAdmin } from "./lib"
import { reservation } from "./schema"

const DEFAULTS = {
  giftCardUrl: "https://www.toasttab.com/sienna-mercato-downtown-942-penn-avenue/giftcards",
  orderUrl: "https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue",
  marketingConsentText: "Yes, send me Sienna Mercato news, menus and offers. Unsubscribe any time.",
  privacyPolicy: "",
  requireAnalyticsConsent: false,
  reservations: {
    emporio: { mode: "walkin" as const, note: "Walk-ins welcome" },
    mezzo: {
      mode: "link" as const,
      url: "https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh",
      label: "Reserve on OpenTable",
      note: "Reservations via OpenTable",
    },
    tetto: { mode: "walkin" as const, note: "Walk-ins welcome" },
  },
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    const doc = await getSettingsDoc(ctx)
    return {
      giftCardUrl: doc?.giftCardUrl || DEFAULTS.giftCardUrl,
      orderUrl: doc?.orderUrl || DEFAULTS.orderUrl,
      marketingConsentText: doc?.marketingConsentText || DEFAULTS.marketingConsentText,
      privacyPolicy: doc?.privacyPolicy ?? DEFAULTS.privacyPolicy,
      requireAnalyticsConsent: doc?.requireAnalyticsConsent ?? DEFAULTS.requireAnalyticsConsent,
      reservations: doc?.reservations ?? DEFAULTS.reservations,
    }
  },
})

export const getPrivate = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx)
    const doc = await getSettingsDoc(ctx)
    return { notificationEmail: doc?.notificationEmail ?? "" }
  },
})

export const update = mutation({
  args: {
    notificationEmail: v.optional(v.string()),
    giftCardUrl: v.optional(v.string()),
    orderUrl: v.optional(v.string()),
    privacyPolicy: v.optional(v.string()),
    marketingConsentText: v.optional(v.string()),
    requireAnalyticsConsent: v.optional(v.boolean()),
    reservations: v.optional(
      v.object({ emporio: reservation, mezzo: reservation, tetto: reservation }),
    ),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx)
    const doc = await getSettingsDoc(ctx)
    if (doc) await ctx.db.patch("settings", doc._id, args)
    else await ctx.db.insert("settings", { key: "site", ...args })
    return null
  },
})
