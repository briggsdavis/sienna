import { useMemo, useState } from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import { HeroIntro, HeroMeta, PageHero } from "@/components/hero"
import {
  CATEGORIES,
  CATERING_ITEMS,
  FEES,
  type CateringItem,
  type Category,
  type Kitchen,
} from "@/content/catering"
import { CATERING_ORDER_URL, unsplash } from "@/lib/site"

type KitchenFilter = Kitchen | "all"
type Sort = "recommended" | "price-asc" | "price-desc"
type Filters = { category: Category; kitchen: KitchenFilter; priceMax: number }

const PRICE_MIN = 20
const PRICE_MAX = 250

function priceLabel(item: CateringItem) {
  if (item.unit) return `$${item.half} ${item.unit}`
  if (item.full == null) return `$${item.half}`
  return `$${item.half} / $${item.full}`
}

function countInCategory(category: Category) {
  if (category === "all") return CATERING_ITEMS.length
  return CATERING_ITEMS.filter((item) => item.category === category).length
}

export function Catering() {
  return (
    <div className="relative">
      <Hero />
      <Shop />
      <Fees />
      <ClosingStrip />
    </div>
  )
}

function Hero() {
  return (
    <PageHero
      image={{
        src: unsplash("1555396273-367ea4eb4db5", 2400, 80),
        alt: "A spread of Italian catering dishes from Sienna Mercato",
        className: "opacity-75",
      }}
      overlay={<div className="absolute inset-0 bg-black/62" />}
      meta={<HeroMeta location="Two kitchens · 942 Penn Ave" note="delivery & pickup" />}
    >
      <HeroIntro
        eyebrow="catering · delivery & pickup"
        title="Catering."
        blurb="Two kitchens. Corporate lunches, rehearsal dinners, family celebrations. Browse the catalog below — half pan / full pan, plus charcuterie and pasta for the plated affairs."
      />
      <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.62s" }}>
        <a
          href="#shop"
          className="btn-lift group inline-flex items-center justify-center gap-2 bg-sienna px-6 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
        >
          <i className="ph ph-bag text-sm" />
          Browse catering menu
        </a>
        <ExternalLink
          href={CATERING_ORDER_URL}
          className="btn-lift group inline-flex items-center justify-center gap-2 bg-paper px-6 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
        >
          <i className="ph ph-storefront text-sm" />
          Online order · Emporio
        </ExternalLink>
      </div>
    </PageHero>
  )
}

function Shop() {
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    kitchen: "all",
    priceMax: PRICE_MAX,
  })
  const [sort, setSort] = useState<Sort>("recommended")

  const filtered = useMemo(() => {
    const { category, kitchen, priceMax } = filters
    const items = CATERING_ITEMS.filter(
      (item) =>
        (category === "all" || item.category === category) &&
        (kitchen === "all" || item.kitchen === kitchen) &&
        item.half <= priceMax,
    )
    if (sort === "price-asc") items.sort((a, b) => a.half - b.half)
    if (sort === "price-desc") items.sort((a, b) => b.half - a.half)
    return items
  }, [filters, sort])

  const updateFilters = (changes: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...changes }))

  return (
    <section id="shop" className="relative bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-12 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <div className="mb-3 font-serif text-base tracking-[0.35em] text-sienna uppercase">
                the catering catalog
              </div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-ink">
                Pick the dishes.
                <br />
                <span className="font-italic text-sienna italic">We'll cook the rest.</span>
              </h2>
            </div>
            <p className="font-body text-lg leading-relaxed text-ink-soft">
              Meatballs rolled same-day, sauces made fresh, charcuterie assembled on arrival. Half
              pan feeds ten to twelve; full pan, twenty to twenty-five. Forty-eight hours notice.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <Sidebar filters={filters} onChange={updateFilters} count={filtered.length} />

          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
              <div className="font-body text-base text-ink-soft">
                <span className="font-serif text-ink">{filtered.length}</span> dishes
                {filters.category !== "all" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="text-sienna italic">
                      {CATEGORIES.find((c) => c.id === filters.category)?.label}
                    </span>
                  </>
                )}
              </div>
              <label className="flex items-center gap-3 font-body text-sm text-ink-soft">
                <span className="font-serif text-xs tracking-[0.3em] uppercase">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="border-b border-ink/30 bg-transparent py-1 font-serif text-base text-ink focus:border-sienna focus:outline-none"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price · low to high</option>
                  <option value="price-desc">Price · high to low</option>
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="border border-dashed border-ink/20 px-6 py-20 text-center">
                <div className="font-display text-3xl text-ink">Nothing matches.</div>
                <p className="mt-2 font-body text-ink-soft">Loosen the filters and try again.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )}

            <p className="mt-12 font-body text-sm text-ink-soft">
              Half pan / full pan, unless noted. Online ordering is available from Floor I ·
              Emporio. For Mezzo catering, contact our events team.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sidebar({
  filters,
  onChange,
  count,
}: {
  filters: Filters
  onChange: (changes: Partial<Filters>) => void
  count: number
}) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="mb-10">
        <h3 className="font-display text-3xl text-ink">Browse by</h3>
        <div className="mt-3 h-px w-full bg-ink/15" />
        <ul className="mt-5 space-y-3 font-body text-lg">
          {CATEGORIES.map((category) => {
            const active = category.id === filters.category
            return (
              <li key={category.id}>
                <button
                  onClick={() => onChange({ category: category.id })}
                  className={`group inline-flex items-baseline gap-3 text-left transition-colors ${
                    active ? "text-sienna" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span
                    className={`font-serif text-xs tabular-nums ${
                      active ? "text-sienna" : "text-ink-soft/50"
                    }`}
                  >
                    {String(countInCategory(category.id)).padStart(2, "0")}
                  </span>
                  <span className={active ? "underline underline-offset-4" : ""}>
                    {category.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="font-display text-3xl text-ink">Filter by</h3>
        <div className="mt-3 h-px w-full bg-ink/15" />

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            <span>Kitchen</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {(["all", "emporio", "mezzo"] as const).map((kitchen) => (
              <button
                key={kitchen}
                onClick={() => onChange({ kitchen })}
                className={`px-2 py-2 font-serif text-2xs tracking-[0.25em] uppercase transition-colors ${
                  filters.kitchen === kitchen
                    ? "bg-ink text-cream"
                    : "bg-paper-deep/40 text-ink-soft hover:bg-paper-deep/70"
                }`}
              >
                {kitchen === "all" ? "Both" : kitchen}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            <span>Max price</span>
            <span className="text-sienna tabular-nums">${filters.priceMax}</span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={5}
            value={filters.priceMax}
            onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
            className="catering-range w-full"
          />
          <div className="mt-2 flex justify-between font-body text-xs text-ink-soft/70 tabular-nums">
            <span>${PRICE_MIN}</span>
            <span>${PRICE_MAX}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/15 pt-6">
        <div className="font-display text-2xl text-ink">{count}</div>
        <div className="font-body text-sm text-ink-soft">
          {count === 1 ? "dish matches" : "dishes match"}
        </div>
      </div>
    </aside>
  )
}

function ProductCard({ item }: { item: CateringItem }) {
  const fromEmporio = item.kitchen === "emporio"

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative mx-auto aspect-square w-full overflow-hidden">
        <div
          className="absolute inset-0 rounded-full bg-paper-deep/40 transition-all duration-700 group-hover:scale-105 group-hover:bg-paper-deep/60"
          style={{ margin: "8%" }}
        />
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="dish-img relative h-full w-full rounded-full object-cover"
          style={{ padding: "8%" }}
        />
        <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-cream/85 px-2.5 py-1 font-serif text-2xs tracking-[0.3em] text-ink uppercase backdrop-blur-sm">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              fromEmporio ? "bg-sienna" : "bg-sienna-deep"
            }`}
          />
          {fromEmporio ? "Floor I" : "Floor II"}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1 text-center">
        <h3 className="font-italic text-2xl leading-tight font-bold text-ink italic">
          {item.name}
        </h3>
        <div className="mt-1 flex justify-center">
          <span className="swash" aria-hidden="true" />
        </div>
        <div className="mt-2 min-h-[2.75rem] font-body text-sm text-ink-soft">
          {item.note && <p>{item.note}</p>}
          {item.serves && (
            <p className="text-xs tracking-wide text-ink-soft/80 uppercase">{item.serves}</p>
          )}
        </div>
        <div className="mt-auto pt-3 font-serif text-base text-sienna tabular-nums">
          {priceLabel(item)}
        </div>
        <ExternalLink
          href={CATERING_ORDER_URL}
          className="mt-4 flex w-full items-center justify-center gap-2 bg-sienna px-5 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
        >
          <i className="ph ph-plus text-sm" />
          Add to order
        </ExternalLink>
      </div>
    </article>
  )
}

function Fees() {
  return (
    <section className="relative bg-paper-deep/40 py-16">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {FEES.map((fee) => (
              <div key={fee.label} className="flex items-center gap-5 bg-paper p-6">
                <i className={`ph-duotone ${fee.icon} text-3xl text-sienna`} />
                <div>
                  <div className="font-display text-2xl leading-none text-ink">{fee.value}</div>
                  <div className="mt-1 font-body text-sm text-ink-soft">{fee.label}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="mt-8 flex flex-wrap items-center gap-6 font-body text-sm text-ink-soft">
          <span className="flex items-center gap-2">
            <i className="ph ph-clock text-sienna" />
            Forty-eight hours notice for all catering requests.
          </span>
          <span className="flex items-center gap-2">
            <i className="ph ph-map-pin text-sienna" />
            Delivery available · downtown Pittsburgh & surrounding areas.
          </span>
        </div>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-ink text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <div className="mb-2 font-serif text-base text-sienna-bright">
            need a private venue too?
          </div>
          <h3 className="font-display text-5xl leading-[0.9]">
            Book a floor.
            <br />
            <span className="font-italic italic">We'll handle the rest.</span>
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/events"
            className="btn-lift inline-flex items-center gap-3 bg-sienna px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
          >
            <i className="ph ph-calendar-dots text-lg" />
            Private events
          </Link>
          <Link
            to="/"
            className="btn-lift inline-flex items-center gap-3 border border-cream/40 px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream/10"
          >
            All of Sienna
            <i className="ph ph-arrow-up-right text-lg" />
          </Link>
        </div>
      </div>
    </section>
  )
}
