import { useQuery } from "convex/react"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import { QuantityStepper } from "@/components/cart"
import { EImage, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { HeroMeta, PageHero } from "@/components/hero"
import type { MenuSection } from "@/components/menu-view"
import { Seo } from "@/components/seo"
import { FEES } from "@/content/catering"
import { useCart } from "@/lib/cart"
import { PAGE_SEO } from "@/lib/pages"
import { unsplash } from "@/lib/site"
import { money } from "@/lib/util"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

type CateringItem = MenuSection["items"][number]
type KitchenFilter = "emporio" | "mezzo" | "all"
type Sort = "recommended" | "price-asc" | "price-desc"
type Filters = { category: Id<"menuSections"> | "all"; kitchen: KitchenFilter; priceMax: number }

const PRICE_MIN = 20
const PRICE_MAX = 250

function minPrice(item: CateringItem) {
  return Math.min(...(item.options ?? []).map((o) => o.price), Number.POSITIVE_INFINITY)
}

export function Catering() {
  return (
    <PageContent page="catering">
      <div className="relative">
        <Seo path="/catering" {...PAGE_SEO["/catering"]} />
        <Hero />
        <Shop />
        <Fees />
        <ClosingStrip />
      </div>
    </PageContent>
  )
}

function Hero() {
  return (
    <EImage k="hero.image" d={unsplash("1555396273-367ea4eb4db5", 2400, 80)}>
      {(src) => (
        <PageHero
          image={{
            src,
            alt: "A spread of Italian catering dishes from Sienna Mercato",
            className: "opacity-75",
          }}
          overlay={<div className="absolute inset-0 bg-black/62" />}
          meta={<HeroMeta />}
        >
          <h1
            className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
            style={{ animationDelay: "0.25s" }}
          >
            <EText k="hero.title" d="Catering." />
          </h1>
          <p
            className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75"
            style={{ animationDelay: "0.45s" }}
          >
            <EText
              k="hero.blurb"
              d="Two kitchens. Corporate lunches, rehearsal dinners, family celebrations. Build your order below and send it as a request. Our team confirms every detail."
            />
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.62s" }}>
            <a
              href="#shop"
              className="btn-lift group inline-flex items-center justify-center gap-2 bg-sienna px-6 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
            >
              <i className="ph ph-bag text-sm" />
              Browse catering menu
            </a>
          </div>
        </PageHero>
      )}
    </EImage>
  )
}

function Shop() {
  const sections = useQuery(api.menus.get, { menu: "catering" })
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    kitchen: "all",
    priceMax: PRICE_MAX,
  })
  const [sort, setSort] = useState<Sort>("recommended")

  const all = useMemo(() => (sections ?? []).flatMap((section) => section.items), [sections])

  const filtered = useMemo(() => {
    const { category, kitchen, priceMax } = filters
    const items = (sections ?? [])
      .filter((section) => category === "all" || section._id === category)
      .flatMap((section) => section.items)
      .filter(
        (item) =>
          (kitchen === "all" || item.kitchen === kitchen) &&
          (priceMax >= PRICE_MAX || minPrice(item) <= priceMax),
      )
    if (sort === "price-asc") items.sort((a, b) => minPrice(a) - minPrice(b))
    if (sort === "price-desc") items.sort((a, b) => minPrice(b) - minPrice(a))
    return items
  }, [sections, filters, sort])

  const updateFilters = (changes: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...changes }))

  const activeSection = sections?.find((s) => s._id === filters.category)

  return (
    <section id="shop" className="relative scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-12 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-ink">
                <EText k="shop.title" d="Pick the dishes." />
                <br />
                <span className="font-italic text-sienna italic">
                  <EText k="shop.titleAccent" d="We'll cook the rest." />
                </span>
              </h2>
            </div>
            <p className="font-body text-lg leading-relaxed text-ink-soft">
              <EText
                k="shop.body"
                d="Meatballs rolled same-day, sauces made fresh, charcuterie assembled on arrival. Half pan feeds ten to twelve; full pan, twenty to twenty-five. Forty-eight hours notice."
              />
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <Sidebar
            sections={sections ?? []}
            total={all.length}
            filters={filters}
            onChange={updateFilters}
          />

          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
              <div className="font-body text-base text-ink-soft">
                <span className="font-serif text-ink">{filtered.length}</span> dishes
                {activeSection && (
                  <>
                    {" "}
                    in <span className="text-sienna italic">{activeSection.title}</span>
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
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </div>

            {sections === undefined ? (
              <div className="h-96" />
            ) : filtered.length === 0 ? (
              <div className="border border-dashed border-ink/20 px-6 py-20 text-center">
                <div className="font-display text-3xl text-ink">Nothing matches.</div>
                <p className="mt-2 font-body text-ink-soft">Loosen the filters and try again.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            )}

            <p className="mt-12 font-body text-sm text-ink-soft">
              Prices shown are estimates before gratuity, delivery and serviceware. Sending a
              request doesn't place or pay for an order. Our events team confirms availability and
              final pricing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sidebar({
  sections,
  total,
  filters,
  onChange,
}: {
  sections: MenuSection[]
  total: number
  filters: Filters
  onChange: (changes: Partial<Filters>) => void
}) {
  const categories = [
    { id: "all" as const, label: "All Catering", count: total },
    ...sections.map((s) => ({ id: s._id, label: s.title, count: s.items.length })),
  ]
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="mb-10">
        <h3 className="font-display text-3xl text-ink">Browse by</h3>
        <div className="mt-3 h-px w-full bg-ink/15" />
        <ul className="mt-5 space-y-3 font-body text-lg">
          {categories.map((category) => {
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
                    {String(category.count).padStart(2, "0")}
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
            <span className="text-sienna tabular-nums">
              {filters.priceMax >= PRICE_MAX ? "Any" : `$${filters.priceMax}`}
            </span>
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={5}
            value={filters.priceMax}
            onChange={(e) => onChange({ priceMax: Number(e.target.value) })}
            className="catering-range w-full"
            aria-label="Maximum price"
          />
          <div className="mt-2 flex justify-between font-body text-xs text-ink-soft/70 tabular-nums">
            <span>${PRICE_MIN}</span>
            <span>${PRICE_MAX}+</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

function ProductCard({ item }: { item: CateringItem }) {
  const { add, setOpen } = useCart()
  const options = item.options ?? []
  const [optionIndex, setOptionIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const option = options[optionIndex]
  const fromEmporio = item.kitchen === "emporio"

  const addToCart = () => {
    if (!option || !item.available) return
    add({
      itemId: item._id,
      optionIndex,
      quantity,
      name: item.name,
      optionLabel: option.label,
      price: option.price,
      image: item.image,
    })
    setAdded(true)
    setQuantity(1)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article
      className={`group relative flex h-full flex-col ${item.available ? "" : "opacity-60"}`}
    >
      <div className="relative mx-auto aspect-square w-full overflow-hidden">
        <div
          className="absolute inset-0 rounded-full bg-paper-deep/40 transition-all duration-700 group-hover:scale-105 group-hover:bg-paper-deep/60"
          style={{ margin: "8%" }}
        />
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="dish-img relative h-full w-full rounded-full object-cover"
            style={{ padding: "8%" }}
          />
        )}
        {item.kitchen && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-cream/85 px-2.5 py-1 font-serif text-2xs tracking-[0.3em] text-ink uppercase backdrop-blur-sm">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                fromEmporio ? "bg-sienna" : "bg-sienna-deep"
              }`}
            />
            {fromEmporio ? "Floor I" : "Floor II"}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1 text-center">
        <h3 className="font-italic text-2xl leading-tight font-bold text-ink italic">
          {item.name}
        </h3>
        <div className="mt-2 min-h-[2.75rem] font-body text-sm text-ink-soft">
          {item.note && <p>{item.note}</p>}
          {item.serves && (
            <p className="text-xs tracking-wide text-ink-soft/80 uppercase">{item.serves}</p>
          )}
        </div>

        {options.length > 1 ? (
          <div
            className="mt-auto flex justify-center gap-1 pt-3"
            role="radiogroup"
            aria-label="Size"
          >
            {options.map((o, index) => (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={optionIndex === index}
                onClick={() => setOptionIndex(index)}
                className={`rounded-full border px-3 py-1.5 font-serif text-2xs tracking-[0.15em] uppercase transition-colors ${
                  optionIndex === index
                    ? "border-sienna bg-sienna text-cream"
                    : "border-ink/20 text-ink-soft hover:border-sienna"
                }`}
              >
                {o.label} • {money(o.price)}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-auto pt-3 font-serif text-base text-sienna tabular-nums">
            {option ? `${money(option.price)} • ${option.label.toLowerCase()}` : ""}
          </div>
        )}

        {item.available ? (
          <div className="mt-4 flex items-center gap-2">
            <QuantityStepper
              value={quantity}
              onChange={(q) => setQuantity(Math.max(1, Math.min(100, q)))}
            />
            <button
              type="button"
              onClick={addToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sienna px-4 py-2.5 font-serif text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:bg-sienna-bright"
            >
              <i className={`ph ${added ? "ph-check" : "ph-plus"} text-sm`} />
              {added ? "Added" : "Add"}
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-full border border-ink/20 px-4 py-2.5 font-serif text-xs tracking-[0.25em] text-ink-soft uppercase">
            Currently unavailable
          </div>
        )}
        {added && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-2 font-body text-sm text-sienna underline"
          >
            View cart
          </button>
        )}
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
            Delivery to downtown Pittsburgh and surrounding areas.
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
