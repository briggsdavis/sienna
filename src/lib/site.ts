export const ORDER_URL = "https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"

export const RESERVE_URL =
  "https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"

export const CATERING_ORDER_URL =
  "https://www.siennamercato.com/catering-store-v2/emporio/menu/order-settings"

export const VIRTUAL_TOUR_URL =
  "https://viewer.threshold360.com/?thresholdId=7761067-1993885746&preset=share"

export const PHONE = { label: "412.281.2810", href: "tel:14122812810" }

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/iltettorooftop/",
    icon: "ph-instagram-logo",
  },
  { label: "Facebook", href: "https://www.facebook.com/siennamercato/", icon: "ph-facebook-logo" },
  { label: "TikTok", href: "https://www.tiktok.com/@siennamercato", icon: "ph-tiktok-logo" },
  {
    label: "Yelp",
    href: "https://www.yelp.com/biz/sienna-mercato-pittsburgh",
    icon: "ph-storefront",
  },
] as const

export const FLOORS = {
  emporio: { name: "Emporio", roman: "I", href: "/emporio", logo: "/emporio.avif" },
  mezzo: { name: "Mezzo", roman: "II", href: "/mezzo", logo: "/mezzo.avif" },
  tetto: { name: "Il Tetto", roman: "III", href: "/tetto", logo: "/iltetto.avif" },
} as const

export type FloorId = keyof typeof FLOORS

export function unsplash(id: string, width: number, quality: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export type Floor = (typeof FLOORS)[FloorId]
