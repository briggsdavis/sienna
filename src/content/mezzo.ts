export const GALLERY_PHOTOS = [
  {
    id: "dining-room",
    photo: "1766832255363-c9f060ade8b0",
    alt: "Set tables in a warmly lit restaurant dining room",
  },
  {
    id: "table-setting",
    photo: "1774509621816-8c097e4f2d88",
    alt: "A candlelit table with wine glasses and flowers",
  },
  {
    id: "pasta",
    photo: "1678774055677-f61466b1cd5d",
    alt: "A plate of pasta at a restaurant table",
  },
] as const

export const HIGHLIGHTS = [
  {
    id: "pasta",
    title: "Hand-rolled pasta",
    body: "The kitchen rolls fresh pasta by hand each day for dishes like crab-stuffed ravioli.",
    photo: "1748797295394-73a731e54845",
    alt: "Fresh ravioli and a pasta mold on a floured work surface",
  },
  {
    id: "oven",
    title: "Wood-fired pizza",
    body: "At 800°F, the wood-fired oven gives each pizza a blistered crust and a light char.",
    photo: "1689150911817-3e27168ab6a3",
    alt: "A pizza baking beside flames in a stone oven",
  },
  {
    id: "dining-room",
    title: "Candlelit dining",
    body: "Low light, linen and an Italian-led wine list make the second-floor dining room a place to linger.",
    photo: "1772479020020-9bd8d2f577d0",
    alt: "A candlelit dinner table set with pasta and wine glasses",
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
// Unsplash photos for each weekday, indexed from Sunday.
export const SPECIALS_PHOTOS = [
  "1789898083274-6e9ef5b00f3f",
  "1775595712043-50ae4b305124",
  "1649688423692-308d2fc1027d",
  "1692071097529-320eb2b32292",
  "1777333033410-4548702116af",
  "1778008402773-f27c96136020",
  "1707870678076-40ba56a65ece",
] as const
