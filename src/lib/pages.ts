export type PageInfo = { name: string; title: string; description: string; editable: boolean }

export const PAGE_SEO: Record<string, PageInfo> = {
  "/": {
    name: "Home",
    title: "Sienna Mercato | Three Floors of Italian in Downtown Pittsburgh",
    description:
      "Emporio, Mezzo and Il Tetto rooftop: three floors of Italian at 942 Penn Avenue in Pittsburgh's Cultural District. Meatballs, wood-fired pizza, wine and thirty drafts.",
    editable: true,
  },
  "/tetto": {
    name: "Il Tetto",
    title: "Il Tetto | Rooftop Beer Garden in Downtown Pittsburgh | Sienna Mercato",
    description:
      "Il Tetto is Sienna Mercato's rooftop beer garden: thirty rotating drafts, whole pies and a retractable roof over the Pittsburgh skyline. Walk-ins only.",
    editable: true,
  },
  "/mezzo": {
    name: "Mezzo",
    title: "Mezzo | Wood-Fired Pizza & Wine Bar | Sienna Mercato",
    description:
      "Mezzo is the second floor of Sienna Mercato: wood-fired pizza, hand-rolled pasta, charcuterie and a 90-bottle Italian-led wine list. Reserve on OpenTable.",
    editable: true,
  },
  "/emporio": {
    name: "Emporio",
    title: "Emporio | Meatball Joint in Downtown Pittsburgh | Sienna Mercato",
    description:
      "Emporio is the ground floor of Sienna Mercato: house-ground meatballs, ten sauces, build-your-own bowls, hoagies and a loud, friendly bar. Walk-ins welcome.",
    editable: true,
  },
  "/catering": {
    name: "Catering",
    title: "Catering | Sienna Mercato, Pittsburgh",
    description:
      "Italian catering from Emporio and Mezzo: meatballs, pasta, charcuterie boards, plated mains and sweets. Build a cart and send a catering request.",
    editable: true,
  },
  "/events": {
    name: "Events",
    title: "Events & Private Dining | Sienna Mercato, Pittsburgh",
    description:
      "Live music, wine dinners and weekly nights at Sienna Mercato, plus private dining and buyouts for up to 400 guests across three floors on Penn Avenue.",
    editable: false,
  },
  "/contact": {
    name: "Contact",
    title: "Contact | Sienna Mercato, 942 Penn Avenue, Pittsburgh",
    description:
      "Send Sienna Mercato a message, call 412.281.2810, or get directions to 942 Penn Avenue in Pittsburgh's Cultural District.",
    editable: false,
  },
  "/privacy": {
    name: "Privacy policy",
    title: "Privacy Policy | Sienna Mercato",
    description: "How Sienna Mercato handles the information you share through this website.",
    editable: false,
  },
  "/menus/emporio": {
    name: "Emporio menu",
    title: "Emporio Menu | Meatballs, Bowls & Hoagies | Sienna Mercato",
    description:
      "The Emporio menu: house-ground meatballs, ten sauces, bowls, hoagies, starters, desserts and a kids menu. Floor I of Sienna Mercato, 942 Penn Ave.",
    editable: false,
  },
  "/menus/mezzo": {
    name: "Mezzo menu",
    title: "Mezzo Menu | Wood-Fired Pizza, Pasta & Wine | Sienna Mercato",
    description:
      "The Mezzo menu: wood-fired pizza, hand-rolled pasta, mains, cocktails and a 90-bottle Italian-led wine list. Floor II of Sienna Mercato.",
    editable: false,
  },
  "/menus/tetto": {
    name: "Il Tetto menu",
    title: "Il Tetto Menu | Rooftop Drafts & Pizza | Sienna Mercato",
    description:
      "The Il Tetto rooftop menu: whole pies, bar food and thirty rotating drafts under a retractable roof in downtown Pittsburgh.",
    editable: false,
  },
}
