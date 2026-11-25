export const ORDER_URL = "https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"

export const RESERVE_URL =
  "https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"

export const CATERING_ORDER_URL =
  "https://www.siennamercato.com/catering-store-v2/emporio/menu/order-settings"

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
  emporio: {
    id: "emporio",
    name: "Emporio",
    roman: "I",
    href: "/emporio",
    menuHref: "/menus/emporio",
    logo: "/images/brand/emporio-seal.avif",
  },
  mezzo: {
    id: "mezzo",
    name: "Mezzo",
    roman: "II",
    href: "/mezzo",
    menuHref: "/menus/mezzo",
    logo: "/images/brand/mezzo-seal.avif",
  },
  tetto: {
    id: "tetto",
    name: "Il Tetto",
    roman: "III",
    href: "/tetto",
    menuHref: "/menus/tetto",
    logo: "/images/brand/il-tetto-seal.avif",
  },
} as const

export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://www.siennamercato.com"
).replace(/\/$/, "")

export const ADDRESS = {
  street: "942 Penn Avenue",
  city: "Pittsburgh",
  region: "PA",
  zip: "15222",
  mapsUrl: "https://maps.google.com/?q=942+Penn+Avenue+Pittsburgh+PA+15222",
  embedUrl: "https://www.google.com/maps?q=942+Penn+Avenue,+Pittsburgh,+PA+15222&output=embed",
}

export type FloorId = keyof typeof FLOORS

export function unsplash(id: string, width: number, quality: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export type Floor = (typeof FLOORS)[FloorId]
