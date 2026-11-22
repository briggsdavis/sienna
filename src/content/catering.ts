import { unsplash } from "@/lib/site"

export type Category = "all" | "family-style" | "plated" | "boards" | "pasta" | "sweets"

export type Kitchen = "emporio" | "mezzo"

export type CateringItem = {
  id: string
  name: string
  kitchen: Kitchen
  category: Exclude<Category, "all">
  half: number
  full: number | null
  unit?: string
  note?: string
  serves?: string
  image: string
}

export const CATERING_ITEMS: CateringItem[] = [
  {
    id: "meatballs",
    name: "Choice of Two Meatballs",
    kitchen: "emporio",
    category: "family-style",
    half: 110,
    full: null,
    serves: "serves 25",
    note: "ten sauces",
    image: unsplash("1529042410759-befb1204b468", 900, 85),
  },
  {
    id: "chicken-parm",
    name: "Chicken Parmesan",
    kitchen: "emporio",
    category: "family-style",
    half: 57.5,
    full: 115,
    image: unsplash("1632778149955-e80f8ceca2e8", 900, 85),
  },
  {
    id: "cheesy-bread",
    name: "Cheesy Bread",
    kitchen: "emporio",
    category: "family-style",
    half: 70,
    full: 140,
    image: unsplash("1585238342024-78d387f4a707", 900, 85),
  },
  {
    id: "buffalo-balls",
    name: "Buffalo Chicken Balls",
    kitchen: "emporio",
    category: "family-style",
    half: 55,
    full: 110,
    image: unsplash("1626082927389-6cd097cdc6ec", 900, 85),
  },
  {
    id: "mac",
    name: "Mac & Cheese",
    kitchen: "emporio",
    category: "family-style",
    half: 60,
    full: 120,
    image: unsplash("1543339494-b4cd4f7ba686", 900, 85),
  },
  {
    id: "shepherds",
    name: "Shepherd's Pie",
    kitchen: "emporio",
    category: "family-style",
    half: 42.5,
    full: null,
    unit: "half pan",
    image: unsplash("1568901346375-23c9450c58cd", 900, 85),
  },
  {
    id: "mashed",
    name: "Mashed Potatoes",
    kitchen: "emporio",
    category: "family-style",
    half: 60,
    full: 120,
    image: unsplash("1600891964092-4316c288032e", 900, 85),
  },
  {
    id: "brussels",
    name: "Roasted Brussels Sprouts",
    kitchen: "emporio",
    category: "family-style",
    half: 115,
    full: 230,
    image: unsplash("1438118907704-7718ee9a191a", 900, 85),
  },
  {
    id: "cookies",
    name: "Cookies",
    kitchen: "emporio",
    category: "sweets",
    half: 70,
    full: 140,
    note: "chocolate chip · oatmeal raisin",
    image: unsplash("1499636136210-6f4ee915583e", 900, 85),
  },
  {
    id: "charcuterie",
    name: "Cheese & Charcuterie",
    kitchen: "mezzo",
    category: "boards",
    half: 100,
    full: 200,
    note: "3 meats · 3 cheeses · pickles · chutney",
    image: unsplash("1568901346375-23c9450c58cd", 900, 85),
  },
  {
    id: "crab-cakes",
    name: "Mini Crab Cakes",
    kitchen: "mezzo",
    category: "plated",
    half: 90,
    full: 180,
    image: unsplash("1626700051175-6818013e1d4f", 900, 85),
  },
  {
    id: "caprese",
    name: "Caprese with Focaccia",
    kitchen: "mezzo",
    category: "boards",
    half: 50,
    full: 100,
    image: unsplash("1608897013039-887f21d8c804", 900, 85),
  },
  {
    id: "pizza",
    name: "Hand-Tossed Pizza",
    kitchen: "mezzo",
    category: "plated",
    half: 20,
    full: 24,
    note: "one or two toppings · 8-cut",
    image: unsplash("1565299624946-b28f40a0ae38", 900, 85),
  },
  {
    id: "picatta",
    name: "Chicken · Veal Picatta",
    kitchen: "mezzo",
    category: "plated",
    half: 90,
    full: 110,
    image: unsplash("1604908176997-125f25cc6f3d", 900, 85),
  },
  {
    id: "marsala",
    name: "Chicken · Veal Marsala",
    kitchen: "mezzo",
    category: "plated",
    half: 90,
    full: 110,
    image: unsplash("1559847844-5315695dadae", 900, 85),
  },
  {
    id: "rigatoni",
    name: "Rigatoni Bolognese",
    kitchen: "mezzo",
    category: "pasta",
    half: 80,
    full: 160,
    image: unsplash("1621996346565-e3dbc646d9a9", 900, 85),
  },
  {
    id: "shells",
    name: "Stuffed Shells",
    kitchen: "mezzo",
    category: "pasta",
    half: 60,
    full: 75,
    note: "cheese or sausage",
    image: unsplash("1551183053-bf91a1d81141", 900, 85),
  },
  {
    id: "cannoli",
    name: "Cannolis",
    kitchen: "mezzo",
    category: "sweets",
    half: 30,
    full: null,
    unit: "per dozen",
    note: "pick two flavors",
    image: unsplash("1609342122563-a43ac8917a3a", 900, 85),
  },
]

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Catering" },
  { id: "family-style", label: "Family-Style" },
  { id: "plated", label: "Plated-Ready" },
  { id: "boards", label: "Boards & Apps" },
  { id: "pasta", label: "Pasta" },
  { id: "sweets", label: "Sweets" },
]

export const FEES = [
  { value: "20%", label: "service gratuity · in-house", icon: "ph-receipt" },
  { value: "10%", label: "kitchen gratuity · catering", icon: "ph-chef-hat" },
  { value: "$50 / $25", label: "delivery · regular / downtown", icon: "ph-truck" },
  { value: "$55", label: "serviceware per 25 guests", icon: "ph-fork-knife" },
] as const
