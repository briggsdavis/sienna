import { useEffect, useRef } from "react"
import { FadeIn } from "@/components/fade-in"
import type { IconName } from "@/components/mezzo-value-icon"
import { ParallaxImage } from "@/components/parallax-image"
import { SectionBreak } from "@/components/section-break"
import { WordReveal } from "@/components/word-reveal"

// Drawings used only on the menu page, matched to a section by its title.
const BREAK_MATCHES: [RegExp, IconName][] = [
  [/antipast|starter|small|snack|olive/i, "olives"],
  [/salad|insalat|veg|side|contorn/i, "basil"],
  [/pizza/i, "tomatoes"],
  [/pasta|primi/i, "garlic"],
  [/main|second|entr|carne|pesce|fish|meat/i, "cheese"],
  [/dessert|dolci|sweet|coffee|caff/i, "espresso"],
  [/wine|vino|drink|bever|cocktail|bar|beer/i, "corkscrew"],
  [/kid|bambin|brunch|lunch/i, "lemon"],
]
const BREAK_FALLBACK: IconName[] = [
  "olives",
  "basil",
  "tomatoes",
  "garlic",
  "cheese",
  "espresso",
  "corkscrew",
  "lemon",
]

/** One drawing per section break, matched by title where possible, never repeated until all are used. */
function breakIcons(titles: string[]) {
  const used = new Set<IconName>()
  return titles.map((title) => {
    const match = BREAK_MATCHES.find(([re, icon]) => re.test(title) && !used.has(icon))?.[1]
    const icon =
      match ??
      BREAK_FALLBACK.find((i) => !used.has(i)) ??
      BREAK_FALLBACK[used.size % BREAK_FALLBACK.length]
    used.add(icon)
    return icon
  })
}
import { getMenuSectionPhoto } from "@/content/menu-photos"
import { FLOORS, type FloorId, unsplash } from "@/lib/site"
import { formatPrice } from "@/lib/util"
import type { Doc } from "../../convex/_generated/dataModel"

export type MenuSection = Doc<"menuSections"> & {
  image: string | null
  items: (Doc<"menuItems"> & { image: string | null })[]
}

export const MENU_THEMES = {
  emporio: {
    page: "bg-cream text-ink",
    header: "bg-sienna text-cream",
    accent: "text-sienna",
    price: "text-ink",
    muted: "text-ink-soft",
    rule: "border-ink/10 divide-ink/10",
    chip: "border-ink/20 text-ink hover:border-sienna hover:text-sienna",
  },
  mezzo: {
    page: "bg-sienna-deep text-cream",
    header: "bg-sienna-deep text-cream",
    accent: "text-cream/85",
    price: "text-white",
    muted: "text-cream/80",
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

const DARK_TONE = {
  text: "text-cream",
  accent: "text-cream/85",
  price: "text-white",
  muted: "text-cream/80",
  rule: "border-paper/15 divide-paper/10",
}

/**
 * Menu sections alternate a red and cream, counted from the last section.
 * Mezzo uses its darker red and ends on red; Emporio and Il Tetto use the regular red
 * and end on cream, so the last section never runs into the red footer.
 */
export function sectionTone(restaurant: FloorId, index: number, count: number) {
  const mezzo = restaurant === "mezzo"
  const fromEnd = (count - 1 - index) % 2 === 0
  const red = mezzo ? fromEnd : !fromEnd
  if (red) return { ...DARK_TONE, bg: mezzo ? "bg-sienna-deep" : "bg-sienna", dark: true }
  return {
    bg: "bg-cream",
    text: "text-ink",
    accent: mezzo ? "text-sienna-deep" : "text-sienna",
    price: "text-ink",
    muted: "text-ink-soft",
    rule: "border-ink/10 divide-ink/10",
    dark: false,
  }
}

const MEZZO_STOCK_PHOTOS = new Set([
  unsplash("1608897013039-887f21d8c804", 1400, 75),
  unsplash("1571997478779-2adcbbe9ab2f", 1400, 75),
])

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

  useEffect(() => {
    if (!mezzo) return
    const panels = menu.current?.querySelectorAll<HTMLElement>("[data-menu-parallax]")
    if (!panels?.length) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      if (motion.matches) return
      const midpoint = window.innerHeight / 2
      for (const panel of panels) {
        const { top, height } = panel.getBoundingClientRect()
        const offset = (midpoint - top - height / 2) * 0.045
        panel.style.setProperty("--menu-section-offset", `${Math.max(-24, Math.min(24, offset))}px`)
      }
    }

    const schedule = () => {
      if (!motion.matches && !frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", schedule)
    }
  }, [mezzo, sections])

  const icons = breakIcons(sections.slice(1).map((section) => section.title))

  return (
    <div ref={menu} className={mezzo ? "[--menu-indent-duration:360ms]" : undefined}>
      {sections.map((section, index) => {
        const imageRight = index % 2 === 1
        const tone = sectionTone(restaurant, index, sections.length)
        const sectionPhoto = getMenuSectionPhoto(restaurant, section.title)
        const customSectionPhoto =
          mezzo && section.image && MEZZO_STOCK_PHOTOS.has(section.image) ? null : section.image
        const itemPhoto = section.items.find((item) => item.available && item.image)?.image
        const image =
          customSectionPhoto ??
          (mezzo
            ? (sectionPhoto ?? itemPhoto ?? "/images/mezzo/hero-guest-dining.webp")
            : (itemPhoto ?? sectionPhoto))
        const photoFrame = `aspect-square overflow-hidden ${imageRight ? "lg:order-last" : ""}`
        const photoContent = (
          <div
            className={`relative flex h-full w-full items-center justify-center ${t.header} ${mezzo ? "menu-photo-mask" : ""}`}
          >
            {image ? (
              mezzo ? (
                <ParallaxImage src={image} alt="" loading="lazy" speed={0.11} />
              ) : (
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
              )
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
          <section
            key={section._id}
            id={slug(section.title)}
            data-menu-parallax={mezzo || undefined}
            className={`py-14 md:py-20 ${tone.bg} ${tone.text} ${mezzo ? "scroll-mt-16" : "scroll-mt-32"}`}
          >
            {mezzo && index > 0 && (
              <SectionBreak
                icon={icons[index - 1]}
                className={`mx-auto mb-10 max-w-[1400px] px-6 md:mb-14 lg:px-12 ${tone.muted}`}
              />
            )}
            <div
              className={`grid items-start gap-8 lg:gap-16 ${
                imageRight ? "lg:grid-cols-[1.25fr_1fr]" : "lg:grid-cols-[1fr_1.25fr]"
              } mx-auto max-w-[1400px] px-6 lg:px-12 ${mezzo ? "motion-safe:translate-y-[var(--menu-section-offset,0px)]" : ""}`}
            >
              {mezzo ? (
                <div className={`${photoFrame} menu-photo-entrance`} data-menu-entrance>
                  {photoContent}
                </div>
              ) : (
                <FadeIn className={photoFrame}>{photoContent}</FadeIn>
              )}
              <div className="min-w-0 text-[85%]">
                <h2 className="font-display text-[clamp(2.2em,calc(3.4vw*var(--site-type-scale)),3.5em)] leading-[0.95]">
                  {mezzo ? <WordReveal text={section.title} step={0.07} /> : section.title}
                </h2>
                {section.subtitle && (
                  <p className={`mt-3 font-body text-[1.125em] ${tone.muted}`}>
                    {mezzo ? <WordReveal text={section.subtitle} delay={0.2} /> : section.subtitle}
                  </p>
                )}
                <ul className={`mt-6 border-t ${tone.rule}`}>
                  {section.items.map((item) => (
                    <li
                      key={item._id}
                      data-menu-entrance
                      className={`menu-row menu-row-entrance flex items-baseline gap-4 border-b py-4 ${tone.rule} ${mezzo ? "mezzo-menu-row" : ""} ${
                        item.available ? "" : "opacity-50"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-3">
                          <span className="menu-item-name font-serif text-[1.25em]">
                            {item.name}
                          </span>
                          {item.flag && (
                            <span
                              className={`font-serif text-[0.625em] tracking-[0.3em] uppercase ${tone.accent}`}
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
                            className={`menu-item-description mt-0.5 font-body leading-snug ${tone.muted}`}
                          >
                            {item.desc}
                          </div>
                        )}
                      </div>
                      {item.price && (
                        <span
                          className={`menu-item-price font-serif text-[1.125em] tabular-nums ${tone.price}`}
                        >
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
  onCream = false,
}: {
  restaurant: FloorId
  sections: MenuSection[]
  /** Mezzo chips sit on cream when the first section is cream. */
  onCream?: boolean
}) {
  const t =
    restaurant === "mezzo" && onCream
      ? {
          chip: "btn-fill border-sienna-deep/30 text-sienna-deep [--button-fill-color:var(--color-sienna-deep)]",
        }
      : MENU_THEMES[restaurant]
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
