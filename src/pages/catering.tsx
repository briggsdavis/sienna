import { useMemo, useState } from "react"
import { Link } from "react-router"
import { FadeIn, useParallax } from "../components/animations"

type Category =
  | "all"
  | "family-style"
  | "plated"
  | "boards"
  | "pasta"
  | "sweets"

type Kitchen = "emporio" | "mezzo"

type CateringItem = {
  id: string
  name: string
  kitchen: Kitchen
  category: Exclude<Category, "all">
  half: number
  full: number | null
  unit?: string
  note?: string
  serves?: string
  image: string
}

const ITEMS: CateringItem[] = [
  {
    id: "meatballs",
    name: "Choice of Two Meatballs",
    kitchen: "emporio",
    category: "family-style",
    half: 110,
    full: null,
    serves: "serves 25",
    note: "ten sauces",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "chicken-parm",
    name: "Chicken Parmesan",
    kitchen: "emporio",
    category: "family-style",
    half: 57.5,
    full: 115,
    image:
      "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "cheesy-bread",
    name: "Cheesy Bread",
    kitchen: "emporio",
    category: "family-style",
    half: 70,
    full: 140,
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "buffalo-balls",
    name: "Buffalo Chicken Balls",
    kitchen: "emporio",
    category: "family-style",
    half: 55,
    full: 110,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "mac",
    name: "Mac & Cheese",
    kitchen: "emporio",
    category: "family-style",
    half: 60,
    full: 120,
    image:
      "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "shepherds",
    name: "Shepherd's Pie",
    kitchen: "emporio",
    category: "family-style",
    half: 42.5,
    full: null,
    unit: "half pan",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "mashed",
    name: "Mashed Potatoes",
    kitchen: "emporio",
    category: "family-style",
    half: 60,
    full: 120,
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "brussels",
    name: "Roasted Brussels Sprouts",
    kitchen: "emporio",
    category: "family-style",
    half: 115,
    full: 230,
    image:
      "https://images.unsplash.com/photo-1438118907704-7718ee9a191a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "cookies",
    name: "Cookies",
    kitchen: "emporio",
    category: "sweets",
    half: 70,
    full: 140,
    note: "chocolate chip · oatmeal raisin",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "charcuterie",
    name: "Cheese & Charcuterie",
    kitchen: "mezzo",
    category: "boards",
    half: 100,
    full: 200,
    note: "3 meats · 3 cheeses · pickles · chutney",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "crab-cakes",
    name: "Mini Crab Cakes",
    kitchen: "mezzo",
    category: "plated",
    half: 90,
    full: 180,
    image:
      "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "caprese",
    name: "Caprese with Focaccia",
    kitchen: "mezzo",
    category: "boards",
    half: 50,
    full: 100,
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "pizza",
    name: "Hand-Tossed Pizza",
    kitchen: "mezzo",
    category: "plated",
    half: 20,
    full: 24,
    note: "one or two toppings · 8-cut",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "picatta",
    name: "Chicken · Veal Picatta",
    kitchen: "mezzo",
    category: "plated",
    half: 90,
    full: 110,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "marsala",
    name: "Chicken · Veal Marsala",
    kitchen: "mezzo",
    category: "plated",
    half: 90,
    full: 110,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "rigatoni",
    name: "Rigatoni Bolognese",
    kitchen: "mezzo",
    category: "pasta",
    half: 80,
    full: 160,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "shells",
    name: "Stuffed Shells",
    kitchen: "mezzo",
    category: "pasta",
    half: 60,
    full: 75,
    note: "cheese or sausage",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "cannoli",
    name: "Cannolis",
    kitchen: "mezzo",
    category: "sweets",
    half: 30,
    full: null,
    unit: "per dozen",
    note: "pick two flavors",
    image:
      "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=900&q=85",
  },
]

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Catering" },
  { id: "family-style", label: "Family-Style" },
  { id: "plated", label: "Plated-Ready" },
  { id: "boards", label: "Boards & Apps" },
  { id: "pasta", label: "Pasta" },
  { id: "sweets", label: "Sweets" },
]

const ORDER_LINK =
  "https://www.siennamercato.com/catering-store-v2/emporio/menu/order-settings"

function priceLabel(item: CateringItem) {
  if (item.unit === "half pan") return `$${item.half} half pan`
  if (item.unit === "per dozen") return `$${item.half} per dozen`
  if (item.full == null) return `$${item.half}`
  return `$${item.half} / $${item.full}`
}

function ProductCard({ item }: { item: CateringItem }) {
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
              item.kitchen === "emporio" ? "bg-sienna" : "bg-sienna-deep"
            }`}
          />
          {item.kitchen === "emporio" ? "Floor I" : "Floor II"}
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
            <p className="text-xs tracking-wide text-ink-soft/80 uppercase">
              {item.serves}
            </p>
          )}
        </div>
        <div className="mt-auto pt-3 font-serif text-base text-sienna tabular-nums">
          {priceLabel(item)}
        </div>
        <a
          href={ORDER_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 bg-sienna px-5 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
        >
          <i className="ph ph-plus text-sm" />
          Add to order
        </a>
      </div>
    </article>
  )
}

function Sidebar({
  category,
  setCategory,
  kitchen,
  setKitchen,
  priceMax,
  setPriceMax,
  count,
}: {
  category: Category
  setCategory: (c: Category) => void
  kitchen: Kitchen | "all"
  setKitchen: (k: Kitchen | "all") => void
  priceMax: number
  setPriceMax: (n: number) => void
  count: number
}) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="mb-10">
        <h3 className="font-display text-3xl text-ink">Browse by</h3>
        <div className="mt-3 h-px w-full bg-ink/15" />
        <ul className="mt-5 space-y-3 font-body text-lg">
          {CATEGORIES.map((c) => {
            const active = c.id === category
            return (
              <li key={c.id}>
                <button
                  onClick={() => setCategory(c.id)}
                  className={`group inline-flex items-baseline gap-3 text-left transition-colors ${
                    active ? "text-sienna" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span
                    className={`font-serif text-xs tabular-nums ${
                      active ? "text-sienna" : "text-ink-soft/50"
                    }`}
                  >
                    {String(
                      c.id === "all"
                        ? ITEMS.length
                        : ITEMS.filter((i) => i.category === c.id).length,
                    ).padStart(2, "0")}
                  </span>
                  <span
                    className={active ? "underline underline-offset-4" : ""}
                  >
                    {c.label}
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
            {(["all", "emporio", "mezzo"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setKitchen(k)}
                className={`px-2 py-2 font-serif text-2xs tracking-[0.25em] uppercase transition-colors ${
                  kitchen === k
                    ? "bg-ink text-cream"
                    : "bg-paper-deep/40 text-ink-soft hover:bg-paper-deep/70"
                }`}
              >
                {k === "all" ? "Both" : k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            <span>Max price</span>
            <span className="text-sienna tabular-nums">${priceMax}</span>
          </div>
          <input
            type="range"
            min={20}
            max={250}
            step={5}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="catering-range w-full"
          />
          <div className="mt-2 flex justify-between font-body text-xs text-ink-soft/70 tabular-nums">
            <span>$20</span>
            <span>$250</span>
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

export function Catering() {
  const heroParallax = useParallax(0.22)
  const [category, setCategory] = useState<Category>("all")
  const [kitchen, setKitchen] = useState<Kitchen | "all">("all")
  const [priceMax, setPriceMax] = useState(250)
  const [sort, setSort] = useState<"recommended" | "price-asc" | "price-desc">(
    "recommended",
  )

  const filtered = useMemo(() => {
    const out = ITEMS.filter(
      (i) =>
        (category === "all" || i.category === category) &&
        (kitchen === "all" || i.kitchen === kitchen) &&
        i.half <= priceMax,
    )
    if (sort === "price-asc") out.sort((a, b) => a.half - b.half)
    if (sort === "price-desc") out.sort((a, b) => b.half - a.half)
    return out
  }, [category, kitchen, priceMax, sort])

  return (
    <div className="relative">
      {/* HERO */}
      <section className="h-hero relative w-full overflow-hidden bg-ink">
        <div ref={heroParallax} className="parallax-hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=80"
            alt="A spread of Italian catering dishes from Sienna Mercato"
            className="slow-zoom h-full w-full object-cover opacity-75"
          />
        </div>
        <div className="absolute inset-0 bg-black/62" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto hidden max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase sm:flex lg:px-12">
          <Link
            to="/"
            className="under flex items-center gap-2 hover:text-cream"
          >
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Two kitchens · 942 Penn
            Ave
          </span>
          <span className="flex items-center gap-2">
            delivery & pickup
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-12">
          <div
            className="rise mb-4 flex items-center gap-3 font-serif text-base text-cream/80"
            style={{ animationDelay: "0.05s" }}
          >
            <span>catering · delivery & pickup</span>
          </div>
          <h1
            className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
            style={{ animationDelay: "0.25s" }}
          >
            Catering.
          </h1>
          <p
            className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75"
            style={{ animationDelay: "0.45s" }}
          >
            Two kitchens. Corporate lunches, rehearsal dinners, family
            celebrations. Browse the catalog below — half pan / full pan, plus
            charcuterie and pasta for the plated affairs.
          </p>
          <div
            className="rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.62s" }}
          >
            <a
              href="#shop"
              className="btn-lift group inline-flex items-center justify-center gap-2 bg-sienna px-6 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
            >
              <i className="ph ph-bag text-sm" />
              Browse catering menu
            </a>
            <a
              href={ORDER_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex items-center justify-center gap-2 bg-paper px-6 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
            >
              <i className="ph ph-storefront text-sm" />
              Online order · Emporio
            </a>
          </div>
        </div>
      </section>

      {/* SHOP — Yuzu-style catalog */}
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
                  <span className="font-italic text-sienna italic">
                    We'll cook the rest.
                  </span>
                </h2>
              </div>
              <p className="font-body text-lg leading-relaxed text-ink-soft">
                Meatballs rolled same-day, sauces made fresh, charcuterie
                assembled on arrival. Half pan feeds ten to twelve; full pan,
                twenty to twenty-five. Forty-eight hours notice.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            <Sidebar
              category={category}
              setCategory={setCategory}
              kitchen={kitchen}
              setKitchen={setKitchen}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              count={filtered.length}
            />

            <div>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/15 pb-5">
                <div className="font-body text-base text-ink-soft">
                  <span className="font-serif text-ink">{filtered.length}</span>{" "}
                  dishes
                  {category !== "all" && (
                    <>
                      {" "}
                      in{" "}
                      <span className="text-sienna italic">
                        {CATEGORIES.find((c) => c.id === category)?.label}
                      </span>
                    </>
                  )}
                </div>
                <label className="flex items-center gap-3 font-body text-sm text-ink-soft">
                  <span className="font-serif text-xs tracking-[0.3em] uppercase">
                    Sort
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
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
                  <div className="font-display text-3xl text-ink">
                    Nothing matches.
                  </div>
                  <p className="mt-2 font-body text-ink-soft">
                    Loosen the filters and try again.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              )}

              <p className="mt-12 font-body text-sm text-ink-soft">
                Half pan / full pan, unless noted. Online ordering is available
                from Floor I · Emporio. For Mezzo catering, contact our events
                team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEES STRIP */}
      <section className="relative bg-paper-deep/40 py-16">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  k: "20%",
                  v: "service gratuity · in-house",
                  icon: "ph-receipt",
                },
                {
                  k: "10%",
                  v: "kitchen gratuity · catering",
                  icon: "ph-chef-hat",
                },
                {
                  k: "$50 / $25",
                  v: "delivery · regular / downtown",
                  icon: "ph-truck",
                },
                {
                  k: "$55",
                  v: "serviceware per 25 guests",
                  icon: "ph-fork-knife",
                },
              ].map((f) => (
                <div key={f.v} className="flex items-center gap-5 bg-paper p-6">
                  <i className={`ph-duotone ${f.icon} text-3xl text-sienna`} />
                  <div>
                    <div className="font-display text-2xl leading-none text-ink">
                      {f.k}
                    </div>
                    <div className="mt-1 font-body text-sm text-ink-soft">
                      {f.v}
                    </div>
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

      {/* CTA STRIP */}
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
    </div>
  )
}
