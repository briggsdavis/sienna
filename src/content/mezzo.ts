export const GALLERY_PHOTOS = [
  {
    id: "dining-room",
    photo: "/mezzo/individual-dish.webp",
    alt: "Plated dishes and drinks on a table at Mezzo",
  },
  {
    id: "table-setting",
    photo: "/mezzo/wine-rack.webp",
    alt: "Wine bottles in the Mezzo dining room",
  },
  {
    id: "pasta",
    photo: "/mezzo/date-night-dish.webp",
    alt: "A shared plate on a warmly lit dining table",
  },
] as const

export const HIGHLIGHTS = [
  {
    id: "pasta",
    title: "Hand-rolled pasta",
    body: "The kitchen rolls fresh pasta by hand each day for dishes like crab-stuffed ravioli.",
    photo: "/mezzo/pasta.webp",
    alt: "A fork lifting fresh pasta from a plate",
  },
  {
    id: "oven",
    title: "Wood-fired pizza",
    body: "At 800°F, the wood-fired oven gives each pizza a blistered crust and a light char.",
    photo: "/mezzo/pizza.webp",
    alt: "A slice lifted from a wood-fired pizza",
  },
  {
    id: "dining-room",
    title: "Candlelit dining",
    body: "Low light, linen and an Italian-led wine list make the second-floor dining room a place to linger.",
    photo: "/mezzo/date-night.webp",
    alt: "A guest sitting down to dinner at Mezzo",
  },
] as const

export const HOURS = [
  { day: "Wed", open: "5:00 PM", close: "9:30 PM" },
  { day: "Thu", open: "5:00 PM", close: "10:00 PM" },
  { day: "Fri", open: "5:00 PM", close: "11:00 PM" },
  { day: "Sat", open: "4:30 PM", close: "11:00 PM" },
  { day: "Sun", open: "4:30 PM", close: "9:30 PM" },
  { day: "Mon-Tue", open: "Closed" },
] as const
// Samples and fallback photos for specials, indexed from Sunday.
export const SPECIALS_SAMPLES = [
  {
    name: "Sunday Baked Lasagna",
    desc: "Layers of pasta, tomato ragù, and melted cheese.",
    image: "/mezzo/lasagna.webp",
  },
  {
    name: "Meatballs al Forno",
    desc: "Oven-baked meatballs with tomato sauce and grated Parmesan.",
    image: "/mezzo/overhead.webp",
  },
  {
    name: "Vanilla Crème Brûlée",
    desc: "Vanilla custard under a crisp layer of caramelized sugar.",
    image: "/mezzo/small-plate.webp",
  },
  {
    name: "Pasta of the Day",
    desc: "Fresh pasta tossed with the kitchen’s sauce of the day.",
    image: "/mezzo/pasta-special.webp",
  },
  {
    name: "Pasta & Chianti",
    desc: "Baked pasta served with a glass of Chianti.",
    image: "/mezzo/wine.webp",
  },
  {
    name: "Dinner for Two",
    desc: "Two plates to share with a glass of wine each.",
    image: "/mezzo/date-night-table.webp",
  },
  {
    name: "Chocolate & Berries",
    desc: "Chocolate dessert with fresh berries and a scoop of gelato.",
    image: "/mezzo/special.webp",
  },
] as const

export const MENU_SAMPLES = [
  {
    id: "crostini",
    name: "Ricotta & Radish Crostini",
    description: "Grilled bread with whipped ricotta, greens, and sliced radishes.",
    photo: "/mezzo/starter.webp",
  },
  {
    id: "calamari",
    name: "Crispy Calamari",
    description: "Lightly breaded calamari with marinara, lemon aioli, and fresh lemon.",
    photo: "/mezzo/calamari.webp",
  },
  {
    id: "short-rib-pasta",
    name: "Short Rib Pasta",
    description: "Pappardelle with braised short rib, whipped ricotta, and pickled red onion.",
    photo: "/mezzo/mezzo-pasta.webp",
  },
  {
    id: "chocolate-tortino",
    name: "Tortino al Cioccolato",
    description: "Warm chocolate cake with a molten center and vanilla gelato.",
    photo: "/mezzo/dessert.webp",
  },
  {
    id: "seasonal-dessert",
    name: "Seasonal Dessert",
    description: "A sweet finish with fresh berries and cream.",
    photo: "/mezzo/seasonal-dessert.webp",
  },
] as const
