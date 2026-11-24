import { useEffect, useRef } from "react"
import { FadeIn } from "@/components/fade-in"
import { getMenuSectionPhoto } from "@/content/menu-photos"
import { FLOORS, type FloorId } from "@/lib/site"
import type { Doc } from "../../convex/_generated/dataModel"

export type MenuSection = Doc<"menuSections"> & {
  image: string | null
  items: (Doc<"menuItems"> & { image: string | null })[]
}

export const MENU_THEMES = {
  emporio: {
    page: "bg-paper text-ink",
    header: "bg-sienna text-cream",
    accent: "text-sienna",
    price: "text-ink",
    muted: "text-ink-soft",
    rule: "border-ink/10 divide-ink/10",
    chip: "border-ink/20 text-ink hover:border-sienna hover:text-sienna",
  },
  mezzo: {
    page: "bg-ink text-paper",
    header: "bg-sienna-deep text-cream",
    accent: "text-sienna-bright",
    price: "text-white",
    muted: "text-paper/60",
    rule: "border-paper/15 divide-paper/10",
    chip: "btn-fill btn-fill-cream border-paper/25 text-paper",
  },
  tetto: {
    page: "bg-cream text-ink",
    header: "bg-ink text-cream",
    accent: "text-sienna",
    price: "text-ink",
    muted: "text-ink-soft",
    rule: "border-ink/10 divide-ink/10",
    chip: "border-ink/20 text-ink hover:border-sienna hover:text-sienna",
  },
} as const

export function formatPrice(price?: string) {
  if (!price) return ""
  return /^\d/.test(price) ? `$${price}` : price
}

function slug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function MenuSections({
  restaurant,
  sections,
}: {
  restaurant: FloorId
  sections: MenuSection[]
}) {
  const t = MENU_THEMES[restaurant]
  const mezzo = restaurant === "mezzo"
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targets = menu.current?.querySelectorAll<HTMLElement>(
      "[data-menu-entrance]:not([data-menu-visible])",
    )
    if (!targets?.length) return

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-menu-visible", ""))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let delay = 0
        for (const { isIntersecting, target } of entries) {
          if (!isIntersecting) continue
          if (
            target instanceof HTMLElement &&
            target.matches(".menu-row-entrance, .menu-heading-entrance")
          ) {
            target.style.setProperty("--menu-entrance-delay", `${delay}ms`)
            delay += target.classList.contains("menu-heading-entrance") ? 110 : 65
          }
          target.setAttribute("data-menu-visible", "")
          observer.unobserve(target)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -20px 0px" },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [sections])

  return (
    <div ref={menu} className={`space-y-20 ${mezzo ? "[--menu-indent-duration:360ms]" : ""}`}>
      {sections.map((section, index) => {
        const image =
          section.image ??
          section.items.find((item) => item.available && item.image)?.image ??
          getMenuSectionPhoto(restaurant, section.title)
        const imageRight = index % 2 === 1
        const photoFrame = `aspect-square overflow-hidden ${imageRight ? "lg:order-last" : ""}`
        const photoContent = (
          <div
            className={`flex h-full w-full items-center justify-center ${t.header} ${mezzo ? "menu-photo-mask" : ""}`}
          >
            {image ? (
              <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <img
                src={FLOORS[restaurant].logo}
                alt=""
                loading="lazy"
                className="max-h-24 w-2/5 object-contain brightness-0 invert"
              />
            )}
          </div>
        )
        return (
          <section key={section._id} id={slug(section.title)} className="scroll-mt-32">
            <div
              className={`grid items-start gap-8 lg:gap-16 ${
                imageRight ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]"
              }`}
            >
              {mezzo ? (
                <div className={`${photoFrame} menu-photo-entrance`} data-menu-entrance>
                  {photoContent}
                </div>
              ) : (
                <FadeIn className={photoFrame}>{photoContent}</FadeIn>
              )}
              <div className="min-w-0 text-[85%]">
                <h2
                  data-menu-entrance={mezzo || undefined}
                  className={`font-display text-[clamp(2.2em,calc(3.4vw*var(--site-type-scale)),3.5em)] leading-[0.95] ${mezzo ? "menu-heading-entrance" : ""}`}
                >
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p
                    data-menu-entrance={mezzo || undefined}
                    className={`mt-3 font-body text-[1.125em] ${t.muted} ${mezzo ? "menu-heading-entrance" : ""}`}
                  >
                    {section.subtitle}
                  </p>
                )}
                <ul className={`mt-6 border-t ${t.rule}`}>
                  {section.items.map((item) => (
                    <li
                      key={item._id}
                      data-menu-entrance
                      className={`menu-row menu-row-entrance flex items-baseline gap-4 border-b py-4 ${t.rule} ${mezzo ? "mezzo-menu-row" : ""} ${
                        item.available ? "" : "opacity-50"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-3">
                          <span className="font-serif text-[1.25em]">{item.name}</span>
                          {item.flag && (
                            <span
                              className={`font-serif text-[0.625em] tracking-[0.3em] uppercase ${t.accent}`}
                            >
                              {item.flag}
                            </span>
                          )}
                          {!item.available && (
                            <span className="font-serif text-[0.625em] tracking-[0.3em] uppercase">
                              unavailable
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <div
                            className={`menu-item-description mt-0.5 font-body leading-snug ${t.muted}`}
                          >
                            {item.desc}
                          </div>
                        )}
                      </div>
                      {item.price && (
                        <span className={`font-serif text-[1.125em] tabular-nums ${t.price}`}>
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export function SectionChips({
  restaurant,
  sections,
}: {
  restaurant: FloorId
  sections: MenuSection[]
}) {
  const t = MENU_THEMES[restaurant]
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sections.map((section) => (
        <a
          key={section._id}
          href={`#${slug(section.title)}`}
          className={`rounded-full border px-4 py-1.5 font-serif text-2xs tracking-[0.25em] uppercase transition-colors ${t.chip}`}
        >
          {section.title}
        </a>
      ))}
    </div>
  )
}
