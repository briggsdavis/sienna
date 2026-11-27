import { useQuery } from "convex/react"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import { EImage, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { PageHero } from "@/components/hero"
import type { MenuSection } from "@/components/menu-view"
import { Seo } from "@/components/seo"
import { FEES } from "@/content/catering"
import { useCart } from "@/lib/cart"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"
import { money } from "@/lib/util"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"

type CateringItem = MenuSection["items"][number]
type KitchenFilter = "emporio" | "mezzo" | "all"
type Sort = "recommended" | "price-asc" | "price-desc"
type Filters = { category: Id<"menuSections"> | "all"; kitchen: KitchenFilter; priceMax: number }

const PRICE_MIN = 20
const PRICE_MAX = 250

function orderOption(item: CateringItem) {
  return item.options?.reduce<{ index: number; label: string; price: number } | undefined>(
    (lowest, option, index) =>
      !lowest || option.price < lowest.price ? { ...option, index } : lowest,
    undefined,
  )
}

/** Shown until real catering items are added in the admin. Samples can't be ordered. */
function sampleItem(
  section: string,
  id: string,
  name: string,
  kitchen: "emporio" | "mezzo",
  options: { label: string; price: number }[],
  image: string,
  serves: string,
) {
  return {
    _id: `sample-${id}`,
    _creationTime: 0,
    menu: "catering",
    sectionId: `sample-${section}`,
    name,
    kitchen,
    options,
    serves,
    image,
    available: true,
    hidden: false,
    order: 0,
  } as unknown as CateringItem
}

const SAMPLE_SECTIONS = [
  {
    _id: "sample-trays",
    _creationTime: 0,
    menu: "catering",
    title: "Party Trays",
    order: 0,
    image: null,
    items: [
      sampleItem(
        "trays",
        "meatballs",
        "Classic Meatball Tray",
        "emporio",
        [
          { label: "Half tray (25 balls)", price: 85 },
          { label: "Full tray (50 balls)", price: 160 },
        ],
        "/images/mezzo/meatballs-al-forno.webp",
        "Serves 10 to 20",
      ),
      sampleItem(
        "trays",
        "shells",
        "Stuffed Shells",
        "mezzo",
        [
          { label: "Half tray", price: 70 },
          { label: "Full tray", price: 130 },
        ],
        "/images/mezzo/stuffed-shells.webp",
        "Serves 10 to 20",
      ),
      sampleItem(
        "trays",
        "lasagna",
        "Lasagna al Forno",
        "mezzo",
        [
          { label: "Half tray", price: 90 },
          { label: "Full tray", price: 170 },
        ],
        "/images/mezzo/lasagna.webp",
        "Serves 10 to 20",
      ),
    ],
  },
  {
    _id: "sample-boards",
    _creationTime: 0,
    menu: "catering",
    title: "Boards & Sweets",
    order: 1,
    image: null,
    items: [
      sampleItem(
        "boards",
        "crostini",
        "Ricotta Crostini Platter",
        "mezzo",
        [{ label: "24 pieces", price: 55 }],
        "/images/mezzo/ricotta-radish-crostini.webp",
        "Serves 8 to 12",
      ),
      sampleItem(
        "boards",
        "tortino",
        "Chocolate Tortino Box",
        "mezzo",
        [{ label: "12 cakes", price: 48 }],
        "/images/mezzo/chocolate-tortino.webp",
        "Serves 12",
      ),
    ],
  },
] as unknown as MenuSection[]

const isSampleItem = (item: CateringItem) => String(item._id).startsWith("sample-")

function displayPrice(item: CateringItem) {
  return orderOption(item)?.price ?? Number.POSITIVE_INFINITY
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
          viewportHeight={60}
        >
          <div className="flex items-center justify-center gap-[clamp(1rem,4vw,3.5rem)]">
            <img
              src={FLOORS.emporio.logo}
              alt="Emporio"
              className="rise h-[clamp(3rem,9vw,7.8rem)] w-auto shrink-0 object-contain brightness-0 invert"
              style={{ animationDelay: "0.1s" }}
            />
            <h1
              className="rise text-hero-shadow font-display text-[clamp(3.5rem,calc(9.8vw*var(--site-type-scale)),8.4rem)] leading-[0.88] tracking-tight text-cream uppercase"
              style={{ animationDelay: "0.25s" }}
            >
              <EText k="hero.title" d="Catering" />
            </h1>
            <img
              src={FLOORS.mezzo.logo}
              alt="Mezzo"
              className="rise h-[clamp(3rem,9vw,7.8rem)] w-auto shrink-0 object-contain brightness-0 invert"
              style={{ animationDelay: "0.1s" }}
            />
          </div>
        </PageHero>
      )}
    </EImage>
  )
}

function Shop() {
  const loaded = useQuery(api.menus.get, { menu: "catering" })
  const sections = loaded?.length === 0 ? SAMPLE_SECTIONS : loaded
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
          (priceMax >= PRICE_MAX || displayPrice(item) <= priceMax),
      )
    if (sort === "price-asc") items.sort((a, b) => displayPrice(a) - displayPrice(b))
    if (sort === "price-desc") items.sort((a, b) => displayPrice(b) - displayPrice(a))
    return items
  }, [sections, filters, sort])

  const updateFilters = (changes: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...changes }))

  return (
    <section
      id="shop"
      aria-label="Catering menu"
      className="relative scroll-mt-24 bg-paper py-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <Sidebar
            sections={sections ?? []}
            total={all.length}
            filters={filters}
            onChange={updateFilters}
          />

          <div>
            <div className="mb-8 flex justify-end">
              <label className="flex items-center gap-3 font-body text-sm text-ink-soft">
                <span className="font-serif text-xs tracking-[0.3em] uppercase">Sort</span>
                <span className="relative inline-flex">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="min-h-10 cursor-pointer appearance-none rounded-full border border-ink/40 bg-cream py-2 pr-11 pl-4 font-serif text-sm text-ink transition-colors hover:border-sienna hover:bg-paper-deep focus-visible:border-sienna"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                  </select>
                  <i
                    aria-hidden="true"
                    className="ph ph-caret-down pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-ink"
                  />
                </span>
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
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kitchen">
            {(["all", "emporio", "mezzo"] as const).map((kitchen) => (
              <button
                key={kitchen}
                type="button"
                aria-pressed={filters.kitchen === kitchen}
                onClick={() => onChange({ kitchen })}
                className={`cursor-pointer rounded-full border px-3 py-2 font-serif text-2xs tracking-[0.12em] uppercase transition-colors ${
                  filters.kitchen === kitchen
                    ? "border-sienna bg-sienna text-white"
                    : "border-ink text-ink hover:bg-ink/5"
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
  const option = orderOption(item)

  const addToCart = () => {
    if (!option || !item.available) return
    add({
      itemId: item._id,
      optionIndex: option.index,
      quantity: 1,
      name: item.name,
      optionLabel: option.label,
      price: option.price,
      image: item.image,
    })
    setOpen(true)
  }

  return (
    <article
      className={`group relative flex h-full flex-col ${item.available && option ? "" : "opacity-60"}`}
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
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1 text-center">
        <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <h3 className="text-2xl leading-tight font-bold text-ink">{item.name}</h3>
          {option && (
            <span className="font-serif text-base text-ink tabular-nums">
              {money(option.price)}
            </span>
          )}
        </div>
        <div className="mt-auto pt-4">
          {isSampleItem(item) ? (
            <div className="btn-lift w-full border border-ink/20 text-ink-soft">Sample item</div>
          ) : item.available && option ? (
            <button
              type="button"
              onClick={addToCart}
              aria-label={`Order ${item.name}`}
              className="btn-lift w-full bg-sienna text-cream hover:bg-sienna-bright"
            >
              Order
            </button>
          ) : (
            <div className="btn-lift w-full border border-ink/20 text-ink-soft">
              Currently unavailable
            </div>
          )}
        </div>
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
    <section className="relative bg-paper-deep/40 text-ink">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <h3 className="font-display text-5xl leading-[0.9]">
            Book a floor.
            <br />
            <span>We'll handle the rest.</span>
          </h3>
        </div>
        <div className="btn-pair">
          <Link to="/events" className="btn-lift bg-sienna text-cream hover:bg-sienna-deep">
            <i className="ph ph-calendar-dots text-lg" />
            Private events
          </Link>
          <Link to="/" className="btn-lift border border-ink/30 text-ink hover:bg-ink/5">
            All of Sienna
            <i className="ph ph-arrow-up-right text-lg" />
          </Link>
        </div>
      </div>
    </section>
  )
}
