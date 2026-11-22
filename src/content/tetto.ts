export const FEATURED_DRAFT = {
  name: "Big Wave",
  brewery: "Kona Brewing",
  origin: "Kailua-Kona, HI",
  style: "Blonde Ale",
  abv: "4.4%",
  ibu: "21",
  notes:
    "Light golden ale with subtle fruitiness, delicate hop aroma, lightly roasted honey malt. Smooth, easy-drinking, beach-ready.",
}

export const DRAFTS = [
  {
    name: "Peroni Original",
    brewery: "Birra Peroni",
    origin: "Roma, IT",
    style: "Pale Lager",
    abv: "4.7%",
  },
  {
    name: "Yinzer Lager",
    brewery: "Fat Head's Brewery",
    origin: "Middleburg Heights, OH",
    style: "American Lager",
    abv: "4.8%",
    flag: "local",
  },
  {
    name: "Mango Cart",
    brewery: "Golden Road",
    origin: "Los Angeles, CA",
    style: "Fruited Wheat",
    abv: "4.0%",
  },
  {
    name: "Michelob Ultra",
    brewery: "Anheuser-Busch",
    origin: "St. Louis, MO",
    style: "Light Lager",
    abv: "4.2%",
  },
  {
    name: "Bud Light",
    brewery: "Anheuser-Busch",
    origin: "St. Louis, MO",
    style: "Light Lager",
    abv: "4.2%",
  },
  {
    name: "Miller Lite",
    brewery: "Miller Brewing",
    origin: "Milwaukee, WI",
    style: "Light Lager",
    abv: "4.2%",
  },
  {
    name: "Lil Guy",
    brewery: "Hamburg Brewing",
    origin: "Hamburg, NY",
    style: "Session IPA",
    abv: "3.9%",
  },
  {
    name: "Mexican Coffee",
    brewery: "Brew Gentlemen",
    origin: "Braddock, PA",
    style: "Coffee Oatmeal Stout",
    abv: "6.5%",
    flag: "local",
  },
  {
    name: "Negley's Nectar",
    brewery: "Arsenal Cider House",
    origin: "Pittsburgh, PA",
    style: "Semi-Sweet Peach Cider",
    abv: "8.4%",
    flag: "local",
  },
  {
    name: "Murray's Mead",
    brewery: "Arsenal Cider House",
    origin: "Pittsburgh, PA",
    style: "Traditional Mead",
    abv: "9.0%",
    flag: "local",
  },
  {
    name: "Crisp Apple",
    brewery: "Angry Orchard",
    origin: "Walden, NY",
    style: "Hard Cider",
    abv: "5.0%",
  },
  {
    name: "Autumn Blaze",
    brewery: "Captain Lawrence",
    origin: "Elmsford, NY",
    style: "Pumpkin Ale",
    abv: "5.0%",
    flag: "seasonal",
  },
] as const

export const FOOD = [
  {
    name: "Whole Pepperoni Pie",
    desc: "8 slices, baked hot from below",
    price: "25",
  },
  { name: "Whole Cheese Pie", desc: "four cheeses, marinara", price: "24" },
  {
    name: "Meatball Hoagie",
    desc: "three classic balls, sauce of choice",
    price: "18",
  },
  {
    name: "Buffalo Chicken Balls",
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
    name: "Parmesan-Herb Fries",
    desc: "parm, parsley, garlic aioli",
    price: "12",
  },
  {
    name: "Crack Fries",
    desc: "smothered in crack sauce, buffalo & ranch",
    price: "12",
  },
  { name: "Chicken Tenders", desc: "three tenders, fries", price: "14" },
  { name: "Caesar", desc: "romaine, parm shavings, croutons", price: "12" },
] as const

export const STATS = [
  { value: "30", label: "rotating drafts" },
  { value: "120", label: "rooftop seats" },
  { value: "0", label: "reservations needed" },
] as const

export const HAPPY_HOUR_DEALS = [
  { value: "½ off", label: "drafts", icon: "ph-beer-stein" },
  { value: "½ off", label: "well & call mixed", icon: "ph-martini" },
  { value: "$5", label: "espresso martinis", icon: "ph-coffee" },
  { value: "½ off", label: "small plates", icon: "ph-bowl-food" },
] as const

export const HOURS = [
  { day: "Thu", hours: "4:00 PM, late" },
  { day: "Fri", hours: "4:00 PM, late" },
  { day: "Sat", hours: "2:00 PM, late" },
  { day: "Sun", hours: "2:00 → 9:00 PM" },
  { day: "Mon to Wed", hours: "Closed" },
] as const
