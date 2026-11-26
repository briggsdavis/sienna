export const GALLERY_PHOTOS = [
  {
    id: "dining-room",
    photo: "/images/mezzo/gnocchi-and-pizza.webp",
    alt: "Plated dishes and drinks on a table at Mezzo",
  },
  {
    id: "table-setting",
    photo: "/images/mezzo/wine-rack.webp",
    alt: "Wine bottles in the Mezzo dining room",
  },
  {
    id: "pasta",
    photo: "/images/mezzo/stuffed-shells.webp",
    alt: "A shared plate on a warmly lit dining table",
  },
] as const

export const HIGHLIGHTS = [
  {
    id: "pasta",
    eyebrow: "Made Daily",
    title: "Hand-rolled pasta",
    body: "The kitchen rolls fresh pasta by hand each day for dishes like crab-stuffed ravioli.",
    photo: "/images/mezzo/spaghetti.webp",
    alt: "A fork lifting fresh pasta from a plate",
  },
  {
    id: "oven",
    eyebrow: "From the Oven",
    title: "Wood-fired pizza",
    body: "At 800°F, the wood-fired oven gives each pizza a blistered crust and a light char.",
    photo: "/images/mezzo/pizza-slice.webp",
    alt: "A slice lifted from a wood-fired pizza",
  },
  {
    id: "dining-room",
    eyebrow: "After Dark",
    title: "Candlelit dining",
    body: "Low light, linen and an Italian-led wine list make the second-floor dining room a place to linger.",
    photo: "/images/mezzo/candlelit-dinner.webp",
    alt: "A guest sitting down to dinner at Mezzo",
  },
] as const

export const VALUES = [
  { id: "pasta", icon: "pasta", label: "Handmade Pasta" },
  { id: "oven", icon: "oven", label: "Wood-Fired Oven" },
  { id: "wine", icon: "wine", label: "Italian Wine" },
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
    image: "/images/mezzo/lasagna.webp",
  },
  {
    name: "Meatballs al Forno",
    desc: "Oven-baked meatballs with tomato sauce and grated Parmesan.",
    image: "/images/mezzo/meatballs-al-forno.webp",
  },
  {
    name: "Vanilla Crème Brûlée",
    desc: "Vanilla custard under a crisp layer of caramelized sugar.",
    image: "/images/mezzo/creme-brulee.webp",
  },
  {
    name: "Pasta of the Day",
    desc: "Fresh pasta tossed with the kitchen’s sauce of the day.",
    image: "/images/mezzo/gemelli-vodka.webp",
  },
  {
    name: "Pasta & Chianti",
    desc: "Baked pasta served with a glass of Chianti.",
    image: "/images/mezzo/chianti-and-pasta.webp",
  },
  {
    name: "Dinner for Two",
    desc: "Two plates to share with a glass of wine each.",
    image: "/images/mezzo/dinner-for-two.webp",
  },
  {
    name: "Chocolate & Berries",
    desc: "Chocolate dessert with fresh berries and a scoop of gelato.",
    image: "/images/mezzo/chocolate-and-berries.webp",
  },
] as const

export const MENU_SAMPLES = [
  {
    id: "crostini",
    name: "Ricotta & Radish Crostini",
    description: "Grilled bread with whipped ricotta, greens, and sliced radishes.",
    photo: "/images/mezzo/ricotta-radish-crostini.webp",
  },
  {
    id: "calamari",
    name: "Crispy Calamari",
    description: "Lightly breaded calamari with marinara, lemon aioli, and fresh lemon.",
    photo: "/images/mezzo/calamari.webp",
  },
  {
    id: "short-rib-pasta",
    name: "Short Rib Pasta",
    description: "Pappardelle with braised short rib, whipped ricotta, and pickled red onion.",
    photo: "/images/mezzo/short-rib-pasta.webp",
  },
  {
    id: "chocolate-tortino",
    name: "Tortino al Cioccolato",
    description: "Warm chocolate cake with a molten center and vanilla gelato.",
    photo: "/images/mezzo/chocolate-tortino.webp",
  },
  {
    id: "seasonal-dessert",
    name: "Seasonal Dessert",
    description: "A sweet finish with fresh berries and cream.",
    photo: "/images/mezzo/strawberry-crepes.webp",
  },
] as const
