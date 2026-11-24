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
    antipasti: "1608897013039-887f21d8c804",
    "wood-fired pizza": "1571997478779-2adcbbe9ab2f",
    pasta: "1771508558365-07e711f60270",
    mains: "1720508369404-32190186d156",
    dessert: "1496775107177-d18889b446f7",
    "house bar": "1774921676768-d89b18e32c3c",
    "seasonal cocktails": "1574449423472-4bc6a3d2473d",
    "barolo & barbaresco": "1780675520350-917559e364c0",
    "sangiovese & brunello": "1762454016515-f29750071257",
    "the long red list": "1793099922030-1210332543c5",
    "whites & rosé": "1705262058224-ed26513decab",
  },
  tetto: {
    "rooftop kitchen": "1565299624946-b28f40a0ae38",
    "on draft": "1777558577997-cbc98feb9db0",
  },
}

export function getMenuSectionPhoto(restaurant: FloorId, title: string) {
  const photo = SECTION_PHOTOS[restaurant][title.trim().toLowerCase()]
  return typeof photo === "string" ? unsplash(photo, 1100, 78) : undefined
}
