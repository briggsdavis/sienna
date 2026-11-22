export const SAUCES = [
  { name: "Marinara", note: "the classic, slow-cooked San Marzano", heat: 0 },
  { name: "Meat Sauce", note: "beef-pork ragù, twelve hours low", heat: 0 },
  { name: "Vodka", note: "tomato cream, a splash of vodka", heat: 1 },
  { name: "Diablo", note: "calabrian chili, bring water", heat: 3 },
  { name: "Buffalo", note: "frank's, butter, a little hot honey", heat: 2 },
  {
    name: "Crack Sauce",
    note: "buffalo + ranch · the one everyone reorders",
    heat: 2,
  },
  { name: "Government Cheese", note: "yellow, glossy, unrepentant", heat: 0 },
  {
    name: "Creamy Tuscan",
    note: "garlic cream, sun-dried tomato, spinach",
    heat: 0,
  },
  { name: "Pesto", note: "basil, pine nut, pecorino", heat: 0 },
  { name: "Mushroom Gravy", note: "cremini, thyme, demi", heat: 0 },
] as const

export const BALL_TYPES = [
  {
    name: "Classic Italian",
    sub: "beef + pork blend",
    icon: "ph-circle-half-tilt",
    featured: false,
  },
  {
    name: "Chicken",
    sub: "ground thigh, parm",
    icon: "ph-egg",
    featured: false,
  },
  {
    name: "Pork",
    sub: "fennel, garlic, breadcrumb",
    icon: "ph-circle-dashed",
    featured: false,
  },
  {
    name: "Veggie",
    sub: "lentil + mushroom, herb",
    icon: "ph-leaf",
    featured: false,
  },
  {
    name: "Ball of the Month",
    sub: "currently · Dragon Ball",
    icon: "ph-flame",
    featured: true,
  },
] as const

export const STARTERS = [
  {
    name: "Buffalo Fried Chicken Balls",
    desc: "seven balls, bleu cheese, celery",
    price: "12",
  },
  { name: "Fried Mozzarella", desc: "fresh mozzarella, marinara", price: "12" },
  {
    name: "Cheesy Bread",
    desc: "provolone, parmesan, garlic butter",
    price: "12",
  },
  {
    name: "Bruschetta",
    desc: "whipped ricotta, roasted tomato, balsamic, arugula",
    price: "12",
  },
  {
    name: "Parmesan-Herb Fries",
    desc: "parm, parsley, garlic aioli",
    price: "12",
  },
  {
    name: "Crack Fries",
    desc: "smothered in crack sauce, buffalo & ranch",
    price: "12",
  },
  { name: "Chicken Tenders", desc: "three tenders, fries", price: "12" },
] as const

export const ENTREES = [
  {
    name: "Shrimp Vodka Pasta",
    desc: "seared shrimp, vodka cream, rigatoni",
    price: "22",
  },
  { name: "Penne Bolognese", desc: "twelve-hour ragù", price: "22" },
  {
    name: "Grilled Chicken Dinner",
    desc: "marinated breast, lemon, side",
    price: "22",
  },
  {
    name: "Chicken Parm Dinner",
    desc: "breaded, mozzarella, marinara, spaghetti",
    price: "22",
  },
] as const

export const ON_THE_BUN = [
  {
    name: "Meatball Hoagie",
    desc: "three classic balls, sauce of choice",
    price: "18",
  },
  {
    name: "Chicken Parm Sandwich",
    desc: "breaded chicken, mozzarella, marinara",
    price: "18",
  },
  {
    name: "Buffalo Chicken Sandwich",
    desc: "fried, buffalo, ranch, pickles",
    price: "18",
  },
  {
    name: "Emporio Burger",
    desc: "two patties, american, special sauce",
    price: "18",
  },
] as const

export const BOWLS = [
  {
    name: "Jacked Mac Bowl",
    desc: "house mac & cheese · meatballs · crack sauce",
    price: "18",
  },
  {
    name: "Italian Classic",
    desc: "spaghetti · classic balls · marinara",
    price: "18",
  },
  {
    name: "Pesto Chicken Pasta",
    desc: "penne · grilled chicken · pesto",
    price: "18",
  },
  {
    name: "Build Your Own",
    desc: "pick a base, three balls, a sauce, see the matrix below",
    price: "18",
    flag: "build-your-own",
  },
] as const

export const SOUPS = [
  {
    name: "Italian Wedding",
    desc: "tiny meatballs, escarole, broth, pecorino",
    price: "10",
  },
  { name: "Caesar", desc: "romaine, parmesan shavings, croutons", price: "10" },
] as const

export const SIDES = [
  { name: "French Fries", price: "8" },
  { name: "Mac n' Cheese", price: "8" },
  { name: "Roasted Vegetables", price: "8" },
] as const

export const DESSERTS = [
  {
    name: "Homemade Ricotta Doughnuts",
    desc: "warm, dusted, dipped",
    price: "10",
  },
  {
    name: "Tiramisu",
    desc: "espresso-soaked lady fingers, mascarpone, cocoa",
    price: "10",
  },
] as const

export const KIDS_MENU = [
  "Meatball with Sauce",
  "Mac n' Cheese",
  "Fried Chicken Balls",
  "Spaghetti",
  "Broccoli",
  "Tater Tots",
  "French Fries",
]

export const STATS = [
  { value: "5", label: "meatball varieties" },
  { value: "10", label: "house sauces" },
  { value: "$18", label: "build-your-own bowl" },
] as const

export const BOWL_STEPS = [
  {
    step: "one",
    num: "01",
    title: "Pick a base",
    items: ["Pasta · spaghetti · rigatoni · penne", "Mac n' cheese", "Salad greens", "Polenta"],
    icon: "ph-bowl-food",
    delay: 0.08,
  },
  {
    step: "two",
    num: "02",
    title: "Choose three balls",
    items: ["Classic · chicken · pork · veggie · or the ball of the month, mix and match"],
    icon: "ph-circles-three",
    delay: 0.16,
  },
  {
    step: "three",
    num: "03",
    title: "Sauce it",
    items: ["Any of the ten sauces", "Add bread for $2", "Add parm for $1"],
    icon: "ph-drop",
    delay: 0.24,
  },
] as const

export const HAPPY_HOUR_DEALS = [
  { value: "½ off", label: "drafts", icon: "ph-beer-stein" },
  { value: "½ off", label: "well & call mixed drinks", icon: "ph-martini" },
  { value: "$5", label: "espresso martinis", icon: "ph-coffee" },
  { value: "½ off", label: "small plates & starters", icon: "ph-bowl-food" },
] as const
