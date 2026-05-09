import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router"
import { FadeIn, useParallax } from "../components/animations"

const TIER_1 = [
  { name: "Cheesy Bread", price: "$70 / $140" },
  { name: "Buffalo Chicken Balls", price: "$55 / $110" },
  {
    name: "Choice of 2 Meatballs",
    price: "$110",
    note: "serves 25 · ten sauces",
  },
  { name: "Chicken Parmesan", price: "$57.50 / $115" },
  { name: "Shepherd's Pie", price: "$42.50 half pan" },
  { name: "Mac & Cheese", price: "$60 / $120" },
  { name: "Mashed Potatoes", price: "$60 / $120" },
  { name: "Roasted Brussels Sprouts", price: "$115 / $230" },
  { name: "Cookies, chocolate chip & oatmeal raisin", price: "$70 / $140" },
] as const

const TIER_2 = [
  {
    name: "Cheese & Charcuterie Display",
    price: "$100 / $200",
    note: "3 meats · 3 cheeses · pickles · chutney",
  },
  { name: "Mini Crab Cakes", price: "$90 / $180" },
  { name: "Caprese with Focaccia", price: "$50 / $100" },
  {
    name: "Hand-Tossed Pizza",
    price: "$20 / $24",
    note: "one or two toppings · 8-cut",
  },
  { name: "Chicken Picatta · Veal Picatta", price: "$90 / $110" },
  { name: "Chicken Marsala · Veal Marsala", price: "$90 / $110" },
  { name: "Rigatoni Bolognese", price: "$80 / $160" },
  { name: "Stuffed Shells, cheese or sausage", price: "$60 / $75" },
  { name: "Cannolis · pick 2 flavors", price: "$30 per dozen" },
] as const

function CateringRow({
  name,
  price,
  note,
}: {
  name: string
  price: string
  note?: string
}) {
  return (
    <li className="flex items-baseline gap-3 py-3">
      <div className="flex-1">
        <div className="font-serif text-lg text-ink">{name}</div>
        {note && (
          <div className="mt-0.5 font-body text-sm text-ink-soft">
            {note}
          </div>
        )}
      </div>
      <span className="font-serif text-base text-sienna tabular-nums">
        {price}
      </span>
    </li>
  )
}

const TIERS = [
  {
    id: "t1",
    label: "Tier 1",
    kitchen: "Emporio kitchen",
    logo: "/emporio.avif",
    headline: "Casual, family-style.",
    headlineItalic: "family-style.",
    headlinePlain: "Casual,",
    accent: "text-sienna",
    desc: "Meatballs, mac & cheese, chicken parm. Feeds a conference room or a graduation party without ceremony.",
    items: TIER_1,
  },
  {
    id: "t2",
    label: "Tier 2",
    kitchen: "Mezzo kitchen",
    logo: "/mezzo.avif",
    headlinePlain: "Refined,",
    headlineItalic: "plated-ready.",
    accent: "text-sienna-deep",
    desc: "Charcuterie boards, picatta and marsala, hand-tossed pizzas, pasta. For the dinners that need to look the part.",
    items: TIER_2,
  },
] as const

function TierPanel({ isOpen, children }: { isOpen: boolean; children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    setHeight(isOpen ? el.scrollHeight : 0)
  }, [isOpen])

  return (
    <div
      style={{
        height,
        overflow: "hidden",
        transition: "height 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  )
}

function TierAccordion() {
  const [open, setOpen] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {TIERS.map((tier) => {
        const isOpen = open.has(tier.id)
        return (
          <div key={tier.id}>
            <button
              onClick={() => toggle(tier.id)}
              className="group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors hover:text-sienna"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-4xl text-ink/20 transition-colors group-hover:text-sienna/30">
                  {tier.id === "t1" ? "I" : "II"}
                </span>
                <div>
                  <h3 className="font-display text-3xl text-ink transition-colors group-hover:text-sienna">
                    {tier.label}
                  </h3>
                  <div className="font-body text-sm text-ink-soft">
                    {tier.kitchen}
                  </div>
                </div>
              </div>
              <i
                className={`ph ph-caret-${isOpen ? "up" : "down"} shrink-0 text-xl text-ink/40`}
              />
            </button>

            <TierPanel isOpen={isOpen}>
              <div className="border-t border-ink/8 bg-cream/40 px-2 pb-8 pt-6">
                  <img
                    src={tier.logo}
                    alt=""
                    aria-hidden="true"
                    className="mb-4 h-7 w-auto brightness-0 opacity-30"
                    style={{ objectFit: "contain", objectPosition: "left" }}
                  />
                  <h4 className="font-display text-4xl leading-[0.95] text-ink">
                    {tier.headlinePlain}
                    <br />
                    <span className={`font-italic italic ${tier.accent}`}>
                      {tier.headlineItalic}
                    </span>
                  </h4>
                  <p className="mt-3 max-w-xl font-body text-base text-ink-soft">
                    {tier.desc}
                  </p>
                  <ul className="mt-5 divide-y divide-ink/10 border-t border-b border-ink/10">
                    {tier.items.map((r) => (
                      <CateringRow key={r.name} {...r} />
                    ))}
                  </ul>
                  <div className="mt-4 font-body text-xs text-ink-soft">
                    Half pan / full pan, unless noted.
                  </div>
                </div>
            </TierPanel>
          </div>
        )
      })}
    </div>
  )
}

export function Catering() {
  const heroParallax = useParallax(0.22)

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-hero w-full overflow-hidden bg-ink">
        <div ref={heroParallax} className="parallax-hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=80"
            alt="A spread of Italian catering dishes from Sienna Mercato"
            className="slow-zoom h-full w-full object-cover opacity-75"
          />
        </div>
        <div className="absolute inset-0 bg-black/62" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <Link to="/" className="under flex items-center gap-2 hover:text-cream">
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Two kitchens · 942 Penn Ave
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
            <span className="swash swash-white" />
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
            celebrations. From casual family-style to charcuterie boards and
            plated-ready pasta, delivered anywhere in the city.
          </p>
          <div
            className="rise mt-8 grid max-w-[460px] grid-cols-2 gap-3"
            style={{ animationDelay: "0.62s" }}
          >
            <a
              href="https://www.siennamercato.com/catering-store-v2/emporio/menu/order-settings"
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex w-full items-center justify-center gap-2 bg-sienna px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
            >
              <i className="ph ph-bag text-sm" />
              Order catering
              <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex w-full items-center justify-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
            >
              <i className="ph ph-storefront text-sm" />
              Order online · Emporio
            </a>
          </div>
        </div>
      </section>

      {/* TWO TIERS */}
      <section className="relative bg-cream py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <div className="mb-3 font-serif text-lg text-sienna">
                  catering · delivery & pickup
                </div>
                <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-ink">
                  Two kitchens,
                  <br />
                  <span className="font-italic text-sienna italic">
                    two tiers.
                  </span>
                </h2>
              </div>
              <div>
                <p className="font-body text-lg leading-relaxed text-ink-soft">
                  Everything comes out of our own kitchens, cooked to order. Meatballs rolled same-day, sauces made fresh, charcuterie assembled on arrival.
                </p>
                <div className="mt-6 grid max-w-[460px] grid-cols-2 gap-3">
                  <a
                    href="https://www.siennamercato.com/catering-store-v2/emporio/menu/order-settings"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-lift group inline-flex w-full items-center justify-center gap-2 bg-sienna px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
                  >
                    <i className="ph ph-bag text-sm" />
                    Order catering
                    <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-lift group inline-flex w-full items-center justify-center gap-2 border border-ink/25 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-ink/5"
                  >
                    <i className="ph ph-storefront text-sm" />
                    Order online · Emporio
                    <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
                <p className="mt-3 font-body text-xs text-ink-soft">
                  Online ordering available from Floor I · Emporio only. For Mezzo catering, contact the events team.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <TierAccordion />
          </FadeIn>

          {/* fees row */}
          <FadeIn delay={0.12}>
            <div className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: "20%", v: "service gratuity · in-house", icon: "ph-receipt" },
                { k: "10%", v: "kitchen gratuity · catering", icon: "ph-chef-hat" },
                { k: "$50 / $25", v: "delivery · regular / downtown", icon: "ph-truck" },
                { k: "$55", v: "serviceware per 25 guests", icon: "ph-fork-knife" },
              ].map((f) => (
                <div key={f.v} className="flex items-center gap-5 bg-cream p-6">
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
