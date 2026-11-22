import { FLOORS, unsplash } from "@/lib/site"

export const HOME_FLOORS = [
  {
    id: "emporio",
    ...FLOORS.emporio,
    sub: "A Meatball Joint",
    tint: "from-[#7a2218] via-[#a4341f] to-[#c9412a]",
    desc: "Ground floor. Twelve sauces, six meats, one rule: the meatball is sacred.",
    image: unsplash("1529042410759-befb1204b468", 1600, 70),
    items: [
      { name: "Meatball Hoagie", price: "18", note: "choice of three meatballs" },
      { name: "Buffalo Chicken Balls", price: "12", note: "bleu cheese, celery" },
      { name: "Jacked Mac Bowl", price: "18", note: "house cheese sauce" },
    ],
  },
  {
    id: "mezzo",
    ...FLOORS.mezzo,
    sub: "Pizza & Charcuterie",
    tint: "from-[#3a2818] via-[#6e1f12] to-[#a4341f]",
    desc: "Linen, candlelight, an eight-hundred-degree oven. The only OpenTable reservation in the building.",
    image: unsplash("1571997478779-2adcbbe9ab2f", 1600, 70),
    items: [
      { name: "Soppressata & Hot Honey", price: "25", note: "marinara, mozzarella" },
      { name: "Crab-Stuffed Ravioli", price: "29", note: "white truffle cream" },
      { name: "Braised Short Rib", price: "32", note: "demi, broccolini" },
    ],
  },
  {
    id: "tetto",
    ...FLOORS.tetto,
    sub: "Rooftop Beer Garden",
    tint: "from-[#1f2a3a] via-[#a4341f] to-[#e7a04a]",
    desc: "Open sky. Thirty drafts on the chalkboard. No reservations. Climb the stairs.",
    image: unsplash("1414235077428-338989a2e8c0", 1600, 70),
    items: [
      { name: "Whole Pepperoni Pie", price: "25", note: "8 slices, baked hot" },
      { name: "Big Wave · Kona", price: "", note: "blonde · 4.4% · beer of the month" },
      { name: "Negley's Nectar Peach Cider", price: "", note: "Arsenal · Pittsburgh, 8.4%" },
    ],
  },
] as const

export type HomeFloor = (typeof HOME_FLOORS)[number]

export const FEATURED_DISHES = [
  {
    name: "Warm Burrata",
    desc: "Roasted tomatoes, basil, focaccia",
    floor: "mezzo",
    price: "14",
    image: unsplash("1608897013039-887f21d8c804", 1100, 75),
  },
  {
    name: "Classic Meatballs",
    desc: "Beef-pork blend, crack sauce",
    floor: "emporio",
    price: "12",
    image: unsplash("1529042410759-befb1204b468", 1100, 75),
  },
  {
    name: "Soppressata Pizza",
    desc: "Hot honey, mozzarella, marinara",
    floor: "mezzo",
    price: "25",
    image: unsplash("1565299624946-b28f40a0ae38", 1100, 75),
  },
  {
    name: "Molten Chocolate",
    desc: "Lava cake, vanilla gelato",
    floor: "mezzo",
    price: "14",
    image: unsplash("1606313564200-e75d5e30476c", 1100, 75),
  },
  {
    name: "Crack Fries",
    desc: "Smothered in crack sauce, buffalo-ranch",
    floor: "emporio",
    price: "12",
    image: unsplash("1573080496219-bb080dd4f877", 1100, 75),
  },
  {
    name: "Carbonara",
    desc: "Pancetta, pecorino, egg yolk, pepper",
    floor: "mezzo",
    price: "27",
    image: unsplash("1612874742237-6526221588e3", 1100, 75),
  },
] as const

export const TONIGHT = [
  {
    tag: "Ball of the Month",
    title: "Dragon Ball",
    desc: "Fried golden, glazed in sweet chili.",
    meta: "$14 · Emporio",
    icon: "ph-bowl-food",
  },
  {
    tag: "Beer of the Month",
    title: "Big Wave",
    desc: "Kona Brewing · Hawaiian blonde ale, light and easy.",
    meta: "4.4% ABV · Il Tetto",
    icon: "ph-beer-stein",
  },
  {
    tag: "Happy Hour",
    title: "4:30 → 6:30",
    desc: "½-off drafts, well drinks, and small plates. $5 espresso martini.",
    meta: "Tue–Fri · floors I & III",
    icon: "ph-clock-countdown",
  },
  {
    tag: "Seasonal",
    title: "Spiced Kentucky Mule",
    desc: "Big Springs whiskey, ginger beer, fresh lime.",
    meta: "$13 · all floors",
    icon: "ph-wine",
  },
] as const

export const FLOOR_HOURS = [
  { floor: FLOORS.emporio, hours: "Tue–Sun · 4:30 PM → 11 PM" },
  { floor: FLOORS.mezzo, hours: "Wed–Sun · 5 PM → 10 PM" },
  { floor: FLOORS.tetto, hours: "Thu–Sat · 4 PM → late, weather-permitting" },
] as const
