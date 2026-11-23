import { useQuery } from "convex/react"
import { useEffect } from "react"
import { ADDRESS, PHONE, SITE_URL } from "@/lib/site"
import { api } from "../../convex/_generated/api"

function setMeta(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  apply(el)
}

function metaTag(attr: "name" | "property", key: string, content: string) {
  setMeta(
    `meta[${attr}="${key}"]`,
    () => {
      const el = document.createElement("meta")
      el.setAttribute(attr, key)
      return el
    },
    (el) => el.setAttribute("content", content),
  )
}

export function restaurantJsonLd(options: {
  name: string
  path: string
  menuPath?: string
  reservations: boolean
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: options.name,
    url: `${SITE_URL}${options.path}`,
    ...(options.menuPath ? { hasMenu: `${SITE_URL}${options.menuPath}` } : {}),
    ...(options.image ? { image: options.image } : {}),
    servesCuisine: "Italian",
    telephone: `+1-${PHONE.label.replace(/\./g, "-")}`,
    acceptsReservations: options.reservations,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.zip,
      addressCountry: "US",
    },
  }
}

export function Seo({
  path,
  title,
  description,
  jsonLd,
  noindex = false,
}: {
  path: string
  title: string
  description: string
  jsonLd?: object
  noindex?: boolean
}) {
  const override = useQuery(api.seo.forPath, { path })
  const finalTitle = override?.title || title
  const finalDescription = override?.description || description

  useEffect(() => {
    document.title = finalTitle
    metaTag("name", "description", finalDescription)
    metaTag("property", "og:title", finalTitle)
    metaTag("property", "og:description", finalDescription)
    metaTag("property", "og:url", `${SITE_URL}${path}`)
    metaTag("property", "og:type", "website")
    metaTag("name", "robots", noindex ? "noindex, nofollow" : "index, follow")
    setMeta(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement("link")
        el.setAttribute("rel", "canonical")
        return el
      },
      (el) => el.setAttribute("href", `${SITE_URL}${path === "/" ? "/" : path}`),
    )
  }, [finalTitle, finalDescription, path, noindex])

  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.dataset.seo = "page"
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => script.remove()
  }, [jsonLd])

  return null
}
