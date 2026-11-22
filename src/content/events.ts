import { FLOORS, unsplash } from "@/lib/site"

export const SPACES = [
  {
    id: "emporio",
    ...FLOORS.emporio,
    sub: "A Meatball Joint",
    capacity: "105",
    vibe: "Energetic · industrial · loud",
    perfect: ["Corporate happy hours", "Rehearsal dinners", "Family celebrations", "Birthdays"],
    desc: "Ground floor. Modern-industrial brick and steel, the open kitchen running through service, the bar long enough to seat your whole guest list. Customizable food stations, cocktail packages, no dress code.",
    highlights: [
      "Up to 105 guests, full buyout available",
      "Twelve meatball sauces, custom stations",
      "Full craft cocktail bar & tap program",
      "No dress code, no ceremony required",
    ],
    image: unsplash("1555396273-367ea4eb4db5", 1600, 70),
    accent: "text-sienna",
  },
  {
    id: "mezzo",
    ...FLOORS.mezzo,
    sub: "Pizza & Charcuterie",
    capacity: "90",
    vibe: "Intimate · refined · candlelit",
    perfect: ["Cocktail hours", "Seated dinners", "Rehearsal dinners", "Corporate entertaining"],
    desc: "Second floor. Hardwood floors, exposed brick, a wood-beamed ceiling and open-air garage windows that look out over Penn Avenue. Custom menus, custom beverage pairings, wine list included.",
    highlights: [
      "Up to 90 guests, intimate candlelit setting",
      "Chef-built custom menus for every event",
      "90-bottle wine list with full pairings",
      "Wood-fired oven on site, live-fire cooking",
    ],
    image: unsplash("1571997478779-2adcbbe9ab2f", 1600, 70),
    accent: "text-sienna",
  },
  {
    id: "tetto",
    ...FLOORS.tetto,
    sub: "Rooftop Beer Garden",
    capacity: "200",
    vibe: "Open-air · skyline · all-season",
    perfect: ["Weddings", "Rehearsal dinners", "Corporate parties", "Award-night socials"],
    desc: "Third floor. Award-winning rooftop with a retractable glass roof, bistro lights overhead, the Pittsburgh skyline behind every photograph. Chef-crafted catering, curated beverages, a dedicated event team.",
    highlights: [
      "Up to 200 guests, Pittsburgh skyline backdrop",
      "Retractable glass roof, open in any season",
      "Dedicated events team, full-service buyout",
      "30 rotating drafts, full catering from below",
    ],
    image: unsplash("1414235077428-338989a2e8c0", 1600, 70),
    accent: "text-sienna-bright",
  },
] as const

export const UPCOMING = [
  {
    date: "May 17",
    day: "Sun",
    title: "Jazz Night on the Roof",
    sub: "Live trio · no cover",
    floor: "Il Tetto · Floor III",
    when: "7 PM → close",
    icon: "ph-music-notes",
    tag: "this week",
  },
  {
    date: "May 24",
    day: "Sat",
    title: "Summer Kickoff",
    sub: "Rooftop buyout · open to all",
    floor: "Il Tetto · Floor III",
    when: "5 PM → late",
    icon: "ph-sun-horizon",
    tag: "next week",
  },
  {
    date: "Jun 7",
    day: "Sat",
    title: "Barolo Night",
    sub: "Chef's wine dinner · four courses",
    floor: "Mezzo · Floor II",
    when: "6:30 PM · ticketed",
    icon: "ph-wine",
    tag: "upcoming",
  },
] as const

export const REVIEWS = [
  {
    quote:
      "I came here for a wedding on the rooftop and it is a beautiful venue. The food was delicious and the staff was professional and helpful.",
    by: "Jesse V.",
    stars: 5,
  },
  {
    quote:
      "When first tasked with planning our 3-day event, I had to find a hotel and entertainment too. Sienna Mercato, I could not have asked for anyone better. The venue was beautiful, the staff amazing, food delicious, drinks perfection, and the price was right. I'd give it 11 out of 10 stars.",
    by: "Tracy M.",
    stars: 5,
  },
] as const

export const CONTACTS = [
  {
    name: "Susan Certo",
    role: "Events Director",
    email: "scerto@siennapgh.com",
    phone: undefined,
  },
  {
    name: "Renee Sroka",
    role: "Private Events",
    email: "rsroka@siennapgh.com",
    phone: "412.360.9031",
  },
] as const

export const FLOOR_OPTIONS = [
  "No preference",
  "Floor I · Emporio",
  "Floor II · Mezzo",
  "Floor III · Il Tetto",
  "Whole building",
]

export const HEADCOUNT_OPTIONS = ["Under 25", "25 – 50", "50 – 100", "100 – 150", "150 – 200+"]

export const EVENT_TYPE_OPTIONS = [
  "Wedding",
  "Rehearsal dinner",
  "Corporate / company",
  "Birthday / anniversary",
  "Holiday party",
  "Catering · delivery only",
  "Something else",
]
