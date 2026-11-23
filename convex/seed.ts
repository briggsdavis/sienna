import { internalMutation, type MutationCtx } from "./_generated/server"
import { dayKey } from "./lib"
import { MENUS } from "./seedData"

function addDays(day: string, days: number) {
  const date = new Date(`${day}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

function nextWeekday(day: string, weekday: number) {
  const date = new Date(`${day}T12:00:00Z`)
  const diff = (weekday - date.getUTCDay() + 7) % 7
  return addDays(day, diff)
}

async function seedMenus(ctx: MutationCtx) {
  for (const [menu, sections] of Object.entries(MENUS) as [
    keyof typeof MENUS,
    (typeof MENUS)["mezzo"],
  ][]) {
    const existing = await ctx.db
      .query("menuSections")
      .withIndex("by_menu_and_order", (q) => q.eq("menu", menu))
      .first()
    if (existing) continue
    let sectionOrder = 1
    for (const { items, ...section } of sections) {
      const sectionId = await ctx.db.insert("menuSections", {
        menu,
        ...section,
        order: sectionOrder++,
      })
      let itemOrder = 1
      for (const item of items) {
        await ctx.db.insert("menuItems", {
          menu,
          sectionId,
          ...item,
          available: true,
          hidden: false,
          order: itemOrder++,
        })
      }
    }
  }
}

async function seedSpecials(ctx: MutationCtx) {
  if (await ctx.db.query("specials").first()) return
  const rows = [
    {
      restaurant: "emporio" as const,
      days: [0, 1, 2, 3, 4, 5, 6],
      name: "Dragon Ball",
      desc: "Ball of the month. Fried golden, glazed in sweet chili, sesame, scallion.",
      price: "14",
      imageUrl:
        "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1200&q=75",
    },
    {
      restaurant: "emporio" as const,
      days: [2],
      name: "Two-Buck Tuesday Sliders",
      desc: "Any meatball slider, any sauce.",
      price: "2 each",
    },
    {
      restaurant: "mezzo" as const,
      days: [3, 4],
      name: "Pasta & Pour",
      desc: "Any pasta with a glass of house red or white.",
      price: "32",
    },
    {
      restaurant: "mezzo" as const,
      days: [0],
      name: "Sunday Sugo",
      desc: "Slow-braised Sunday gravy, rigatoni, meatball, sausage, whipped ricotta.",
      price: "29",
    },
    {
      restaurant: "tetto" as const,
      days: [4, 5, 6],
      name: "Beer of the Month: Big Wave",
      desc: "Kona Brewing blonde ale, 4.4%. Light, easy, beach-ready.",
      price: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=75",
    },
  ]
  let order = 1
  for (const row of rows) await ctx.db.insert("specials", { ...row, active: true, order: order++ })
}

async function seedEvents(ctx: MutationCtx) {
  if (await ctx.db.query("events").first()) return
  const today = dayKey()
  const rows = [
    {
      title: "Jazz Night on the Roof",
      date: nextWeekday(today, 0),
      startTime: "19:00",
      endTime: "22:00",
      desc: "Live trio on Il Tetto. No cover.",
      venue: "Il Tetto",
      recurrence: "weekly" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=75",
    },
    {
      title: "Trivia at Emporio",
      date: nextWeekday(today, 3),
      startTime: "19:30",
      desc: "Teams of up to six. Prizes for the top three tables.",
      venue: "Emporio",
      recurrence: "weekly" as const,
    },
    {
      title: "Barolo Night",
      date: addDays(today, 18),
      startTime: "18:30",
      desc: "Chef's wine dinner. Four courses paired with four Barolos.",
      venue: "Mezzo",
      buttonText: "Get tickets",
      buttonUrl:
        "https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh",
      recurrence: "none" as const,
      imageUrl:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=75",
    },
  ]
  for (const row of rows) await ctx.db.insert("events", row)
}

async function seedMarketing(ctx: MutationCtx) {
  if (!(await ctx.db.query("popups").first())) {
    await ctx.db.insert("popups", {
      name: "Newsletter",
      headline: "Join the table.",
      body: "Pre-release menus, ball of the month, secret cocktails. One email a month, maybe two.",
      buttonLabel: "Sign me up",
      successMessage: "You're on the list. Ci vediamo.",
      askName: true,
      delaySeconds: 12,
      frequencyDays: 14,
      pages: [],
      active: false,
    })
  }
  if (!(await ctx.db.query("announcements").first())) {
    await ctx.db.insert("announcements", {
      message: "Holiday parties are booking now. All three floors available.",
      ctaText: "Plan yours",
      ctaUrl: "/events#inquire",
      tone: "sienna",
      dismissible: true,
      active: false,
    })
  }
}

export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    await seedMenus(ctx)
    await seedSpecials(ctx)
    await seedEvents(ctx)
    await seedMarketing(ctx)
    return null
  },
})
