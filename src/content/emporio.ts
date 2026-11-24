export const SAUCES = [
  {
    name: "Marinara",
    note: "the classic, slow-cooked San Marzano",
    heat: 0,
    label: { paper: "#a42625", ink: "#fff1d0", accent: "#f3bb76", fill: "#8d2011", icon: "tomato" },
  },
  {
    name: "Meat Sauce",
    note: "beef-pork ragù, twelve hours low",
    heat: 0,
    label: { paper: "#572336", ink: "#ffebd3", accent: "#eda79e", fill: "#6e2d19", icon: "pot" },
  },
  {
    name: "Vodka",
    note: "tomato cream, a splash of vodka",
    heat: 1,
    label: {
      paper: "#f1b4b9",
      ink: "#58243f",
      accent: "#833756",
      fill: "#cb6241",
      icon: "martini",
    },
  },
  {
    name: "Diablo",
    note: "calabrian chili, bring water",
    heat: 3,
    label: { paper: "#26252a", ink: "#fff0de", accent: "#ff6748", fill: "#9f240e", icon: "pepper" },
  },
  {
    name: "Buffalo",
    note: "frank's, butter, a little hot honey",
    heat: 2,
    label: { paper: "#f18b38", ink: "#462009", accent: "#87341b", fill: "#ce4810", icon: "bolt" },
  },
  {
    name: "Crack Sauce",
    note: "buffalo + ranch • the one everyone reorders",
    heat: 2,
    label: { paper: "#483b88", ink: "#fff4dc", accent: "#cdc0ff", fill: "#d67e4a", icon: "swirl" },
  },
  {
    name: "Government Cheese",
    note: "yellow, glossy, unrepentant",
    heat: 0,
    label: { paper: "#f6d84e", ink: "#3e2d15", accent: "#7c4c08", fill: "#d89115", icon: "cheese" },
  },
  {
    name: "Creamy Tuscan",
    note: "garlic cream, sun-dried tomato, spinach",
    heat: 0,
    label: { paper: "#16646e", ink: "#ffeed3", accent: "#9be1d4", fill: "#d29c67", icon: "garlic" },
  },
  {
    name: "Pesto",
    note: "basil, pine nut, pecorino",
    heat: 0,
    label: { paper: "#356736", ink: "#f5f1d6", accent: "#e0e590", fill: "#466022", icon: "leaf" },
  },
  {
    name: "Mushroom Gravy",
    note: "cremini, thyme, demi",
    heat: 0,
    label: {
      paper: "#b3d0df",
      ink: "#263a51",
      accent: "#405879",
      fill: "#69432c",
      icon: "mushroom",
    },
  },
] as const

export const BALL_TYPES = [
  {
    name: "Classic Italian",
    sub: "beef + pork blend",
    featured: false,
  },
  {
    name: "Chicken",
    sub: "ground thigh, parm",
    featured: false,
  },
  {
    name: "Pork",
    sub: "fennel, garlic, breadcrumb",
    featured: false,
  },
  {
    name: "Veggie",
    sub: "lentil + mushroom, herb",
    featured: false,
  },
  {
    name: "Ball of the Month",
    sub: "currently • Dragon Ball",
    featured: true,
  },
] as const

export const STATS = [
  { value: "5", label: "meatball varieties" },
  { value: "10", label: "house sauces" },
  { value: "$18", label: "meatball bowl" },
] as const

export const HAPPY_HOUR_DEALS = [
  { value: "½ off", label: "drafts", icon: "ph-beer-stein" },
  { value: "½ off", label: "well & call mixed drinks", icon: "ph-martini" },
  { value: "$5", label: "espresso martinis", icon: "ph-coffee" },
  { value: "½ off", label: "small plates & starters", icon: "ph-bowl-food" },
] as const
