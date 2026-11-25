import { unsplash, type FloorId } from "@/lib/site"

const SECTION_PHOTOS: Record<FloorId, Record<string, string>> = {
  emporio: {
    starters: "1529042410759-befb1204b468",
    "soups & salads": "1746211224437-8340316b288d",
    entrées: "1777333033368-6bbb5d022a08",
    "on the bun": "1550949875-181c4577566b",
    bowls: "1708184528301-b0dad28dded5",
    sides: "1630431343545-e9d2e0880487",
    desserts: "1774428755024-88024a28223c",
    "kids menu": "1713561058969-793049b01712",
  },
  mezzo: {
    antipasti: "/images/mezzo/calamari.webp",
    "wood-fired pizza": "/images/mezzo/pizza-slice.webp",
    pasta: "/images/mezzo/spaghetti.webp",
    mains: "/images/mezzo/gnocchi-and-pizza.webp",
    dessert: "/images/mezzo/strawberry-crepes.webp",
    "house bar": "/images/mezzo/dining-room-table.webp",
    "seasonal cocktails": "/images/mezzo/candlelit-dinner.webp",
    "barolo & barbaresco": "/images/mezzo/wine-rack.webp",
    "sangiovese & brunello": "/images/mezzo/chianti-and-pasta.webp",
    "the long red list": "/images/mezzo/dinner-for-two.webp",
    "whites & rosé": "/images/mezzo/stuffed-shells.webp",
  },
  tetto: {
    "rooftop kitchen": "1565299624946-b28f40a0ae38",
    "on draft": "1777558577997-cbc98feb9db0",
  },
}

export function getMenuSectionPhoto(restaurant: FloorId, title: string) {
  const photo = SECTION_PHOTOS[restaurant][title.trim().toLowerCase()]
  return photo && (photo.startsWith("/") ? photo : unsplash(photo, 1100, 78))
}
