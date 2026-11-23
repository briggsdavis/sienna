import { useQuery } from "convex/react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { FadeIn } from "@/components/fade-in"
import { FLOORS, type FloorId } from "@/lib/site"
import { api } from "../../convex/_generated/api"
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
    muted: "text-ink-soft",
    rule: "border-ink/10 divide-ink/10",
    chip: "border-ink/20 text-ink hover:border-sienna hover:text-sienna",
    tagline: "A Meatball Joint",
  },
  mezzo: {
    page: "bg-ink text-paper",
    header: "bg-sienna-deep text-cream",
    accent: "text-sienna-bright",
    muted: "text-paper/60",
    rule: "border-paper/15 divide-paper/10",
    chip: "border-paper/25 text-paper hover:border-sienna-bright hover:text-sienna-bright",
    tagline: "Pizza & Charcuterie",
  },
  tetto: {
    page: "bg-cream text-ink",
    header: "bg-ink text-cream",
    accent: "text-sienna",
    muted: "text-ink-soft",
    rule: "border-ink/10 divide-ink/10",
    chip: "border-ink/20 text-ink hover:border-sienna hover:text-sienna",
    tagline: "Rooftop Beer Garden",
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
  return (
    <div className="space-y-20">
      {sections.map((section) => (
        <section key={section._id} id={slug(section.title)} className="scroll-mt-32">
          <FadeIn>
            <div
              className={`grid gap-10 ${section.image ? "lg:grid-cols-[1fr_1.6fr]" : ""} lg:gap-16`}
            >
              <div>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.95]">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className={`mt-3 font-body text-lg ${t.muted}`}>{section.subtitle}</p>
                )}
                {section.image && (
                  <div className="mt-8 aspect-[4/3] overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <ul
                className={`grid gap-x-12 border-t ${section.image ? "" : "md:grid-cols-2"} ${t.rule}`}
              >
                {section.items.map((item) => (
                  <li
                    key={item._id}
                    className={`flex items-baseline gap-4 border-b py-4 ${t.rule} ${
                      item.available ? "" : "opacity-50"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-serif text-xl">{item.name}</span>
                        {item.flag && (
                          <span
                            className={`font-serif text-2xs tracking-[0.3em] uppercase ${t.accent}`}
                          >
                            {item.flag}
                          </span>
                        )}
                        {!item.available && (
                          <span className="font-serif text-2xs tracking-[0.3em] uppercase">
                            unavailable
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <div className={`mt-0.5 font-body text-base leading-snug ${t.muted}`}>
                          {item.desc}
                        </div>
                      )}
                    </div>
                    {item.price && (
                      <span className={`font-serif text-lg tabular-nums ${t.accent}`}>
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>
      ))}
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
    <div className="flex flex-wrap gap-2">
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

export function MenuTeaser({
  restaurant,
  tone = "light",
  heading,
}: {
  restaurant: FloorId
  tone?: "light" | "dark"
  heading: ReactNode
}) {
  const sections = useQuery(api.menus.get, { menu: restaurant })
  const floor = FLOORS[restaurant]
  const dark = tone === "dark"
  const preview = (sections ?? []).filter((s) => s.items.length > 0).slice(0, 4)

  return (
    <section
      id="menu"
      className={`relative py-28 ${dark ? "bg-ink text-paper" : "bg-paper text-ink"}`}
    >
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9]">
              {heading}
            </h2>
            <Link
              to={floor.menuHref}
              className={`btn-lift group inline-flex w-fit items-center gap-3 px-6 py-3 font-serif text-xs tracking-[0.3em] uppercase transition-colors ${
                dark
                  ? "bg-sienna-bright text-cream hover:bg-cream hover:text-sienna"
                  : "bg-ink text-cream hover:bg-sienna"
              }`}
            >
              <i className="ph ph-list-magnifying-glass text-base" />
              Full {floor.name} menu
              <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {sections === undefined
            ? [0, 1].map((i) => <div key={i} className="h-64" />)
            : preview.map((section) => (
                <FadeIn key={section._id}>
                  <div>
                    <h3 className="font-display text-3xl">{section.title}</h3>
                    <ul
                      className={`mt-5 divide-y border-y ${
                        dark ? "divide-paper/10 border-paper/15" : "divide-ink/10 border-ink/10"
                      }`}
                    >
                      {section.items.slice(0, 4).map((item) => (
                        <li key={item._id} className="flex items-baseline gap-3 py-3.5">
                          <div className="flex-1">
                            <div className="font-serif text-lg">{item.name}</div>
                            {item.desc && (
                              <div
                                className={`mt-0.5 font-body text-sm ${dark ? "text-paper/55" : "text-ink-soft"}`}
                              >
                                {item.desc}
                              </div>
                            )}
                          </div>
                          {item.price && (
                            <span
                              className={`font-serif tabular-nums ${dark ? "text-sienna-bright" : "text-sienna"}`}
                            >
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {section.items.length > 4 && (
                      <Link
                        to={`${floor.menuHref}#${slug(section.title)}`}
                        className={`under mt-3 inline-flex items-center gap-2 font-serif text-xs tracking-[0.25em] uppercase ${
                          dark ? "text-sienna-bright" : "text-sienna"
                        }`}
                      >
                        {section.items.length - 4} more
                        <i className="ph ph-arrow-right" />
                      </Link>
                    )}
                  </div>
                </FadeIn>
              ))}
        </div>
      </div>
    </section>
  )
}
