import { FLOORS, unsplash } from "@/lib/site"

export const HOME_FLOORS = [
  {
    ...FLOORS.emporio,
    sub: "A Meatball Joint",
    tint: "from-[#7a2218] via-[#a4341f] to-[#c9412a]",
    image: unsplash("1529042410759-befb1204b468", 1600, 70),
    items: [
      { name: "Meatball Hoagie", price: "18", note: "choice of three meatballs" },
      { name: "Buffalo Chicken Balls", price: "12", note: "bleu cheese, celery" },
      { name: "Jacked Mac Bowl", price: "18", note: "house cheese sauce" },
    ],
  },
  {
    ...FLOORS.mezzo,
    sub: "Pizza & Charcuterie",
    tint: "from-[#3a2818] via-[#6e1f12] to-[#a4341f]",
    image: "/images/mezzo/dinner-for-two.webp",
    items: [
      { name: "Soppressata & Hot Honey", price: "25", note: "marinara, mozzarella" },
      { name: "Crab-Stuffed Ravioli", price: "29", note: "white truffle cream" },
      { name: "Braised Short Rib", price: "32", note: "demi, broccolini" },
    ],
  },
  {
    ...FLOORS.tetto,
    sub: "Rooftop Beer Garden",
    tint: "from-[#1f2a3a] via-[#a4341f] to-[#e7a04a]",
    image: unsplash("1414235077428-338989a2e8c0", 1600, 70),
    items: [
      { name: "Whole Pepperoni Pie", price: "25", note: "8 slices, baked hot" },
      { name: "Big Wave • Kona", price: "", note: "blonde • 4.4% • beer of the month" },
      { name: "Negley's Nectar Peach Cider", price: "", note: "Arsenal • Pittsburgh, 8.4%" },
    ],
  },
] as const

export type HomeFloor = (typeof HOME_FLOORS)[number]

export const FEATURED_DISHES = [
  {
    contentKey: "dishes.1",
    name: "Classic Meatballs",
    floor: "emporio",
    price: "12",
    image: unsplash("1529042410759-befb1204b468", 1100, 75),
  },
  {
    contentKey: "dishes.0",
    name: "Vanilla Crème Brûlée",
    floor: "mezzo",
    price: "12",
    image: "/images/mezzo/creme-brulee.webp",
  },
  {
    contentKey: "dishes.tetto",
    name: "Whole Pepperoni Pie",
    floor: "tetto",
    price: "25",
    image: unsplash("1565299624946-b28f40a0ae38", 1100, 75),
  },
] as const

export const FLOOR_HOURS = [
  { floor: FLOORS.emporio, days: "Tue-Sun", open: "4:30 PM", close: "11 PM" },
  { floor: FLOORS.mezzo, days: "Wed-Sun", open: "5 PM", close: "10 PM" },
  { floor: FLOORS.tetto, days: "Thu-Sat", open: "4 PM", close: "late" },
] as const
