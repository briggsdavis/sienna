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
  { day: "Thu", open: "4:00 PM", close: "late" },
  { day: "Fri", open: "4:00 PM", close: "late" },
  { day: "Sat", open: "2:00 PM", close: "late" },
  { day: "Sun", open: "2:00 PM", close: "9:00 PM" },
  { day: "Mon-Wed", open: "Closed" },
] as const
