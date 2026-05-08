import { Link } from "react-router"
import { FadeIn, useParallax, useStaggerObserver } from "../components/animations"

const FEATURED_DRAFT = {
  name: "Big Wave",
  brewery: "Kona Brewing",
  origin: "Kailua-Kona, HI",
  style: "Blonde Ale",
  abv: "4.4%",
  ibu: "21",
  notes:
    "Light golden ale with subtle fruitiness, delicate hop aroma, lightly roasted honey malt. Smooth, easy-drinking, beach-ready.",
}

const DRAFTS = [
  {
    name: "Peroni Original",
    brewery: "Birra Peroni",
    origin: "Roma, IT",
    style: "Pale Lager",
    abv: "4.7%",
  },
  {
    name: "Yinzer Lager",
    brewery: "Fat Head's Brewery",
    origin: "Middleburg Heights, OH",
    style: "American Lager",
    abv: "4.8%",
    flag: "local",
  },
  {
    name: "Mango Cart",
    brewery: "Golden Road",
    origin: "Los Angeles, CA",
    style: "Fruited Wheat",
    abv: "4.0%",
  },
  {
    name: "Michelob Ultra",
    brewery: "Anheuser-Busch",
    origin: "St. Louis, MO",
    style: "Light Lager",
    abv: "4.2%",
  },
  {
    name: "Bud Light",
    brewery: "Anheuser-Busch",
    origin: "St. Louis, MO",
    style: "Light Lager",
    abv: "4.2%",
  },
  {
    name: "Miller Lite",
    brewery: "Miller Brewing",
    origin: "Milwaukee, WI",
    style: "Light Lager",
    abv: "4.2%",
  },
  {
    name: "Lil Guy",
    brewery: "Hamburg Brewing",
    origin: "Hamburg, NY",
    style: "Session IPA",
    abv: "3.9%",
  },
  {
    name: "Mexican Coffee",
    brewery: "Brew Gentlemen",
    origin: "Braddock, PA",
    style: "Coffee Oatmeal Stout",
    abv: "6.5%",
    flag: "local",
  },
  {
    name: "Negley's Nectar",
    brewery: "Arsenal Cider House",
    origin: "Pittsburgh, PA",
    style: "Semi-Sweet Peach Cider",
    abv: "8.4%",
    flag: "local",
  },
  {
    name: "Murray's Mead",
    brewery: "Arsenal Cider House",
    origin: "Pittsburgh, PA",
    style: "Traditional Mead",
    abv: "9.0%",
    flag: "local",
  },
  {
    name: "Crisp Apple",
    brewery: "Angry Orchard",
    origin: "Walden, NY",
    style: "Hard Cider",
    abv: "5.0%",
  },
  {
    name: "Autumn Blaze",
    brewery: "Captain Lawrence",
    origin: "Elmsford, NY",
    style: "Pumpkin Ale",
    abv: "5.0%",
    flag: "seasonal",
  },
] as const

const FOOD = [
  {
    name: "Whole Pepperoni Pie",
    desc: "8 slices, baked hot from below",
    price: "25",
  },
  { name: "Whole Cheese Pie", desc: "four cheeses, marinara", price: "24" },
  {
    name: "Meatball Hoagie",
    desc: "three classic balls, sauce of choice",
    price: "18",
  },
  {
    name: "Buffalo Chicken Balls",
    desc: "seven balls, bleu cheese, celery",
    price: "12",
  },
  { name: "Fried Mozzarella", desc: "fresh mozzarella, marinara", price: "12" },
  {
    name: "Cheesy Bread",
    desc: "provolone, parmesan, garlic butter",
    price: "12",
  },
  {
    name: "Parmesan-Herb Fries",
    desc: "parm, parsley, garlic aioli",
    price: "12",
  },
  {
    name: "Crack Fries",
    desc: "smothered in crack sauce, buffalo & ranch",
    price: "12",
  },
  { name: "Chicken Tenders", desc: "three tenders, fries", price: "14" },
  { name: "Caesar", desc: "romaine, parm shavings, croutons", price: "12" },
] as const

function DraftCard({
  number,
  name,
  brewery,
  origin,
  style,
  abv,
  flag,
}: {
  number: string
  name: string
  brewery: string
  origin: string
  style: string
  abv: string
  flag?: string
}) {
  return (
    <li className="group relative border-b border-cream/10 px-6 py-5 transition-colors hover:bg-cream/[0.04] sm:px-8">
      <div className="flex items-baseline gap-5">
        <span className="w-10 font-display text-2xl text-cream/40 tabular-nums">
          {number}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="font-display text-2xl text-cream">{name}</h3>
            {flag && (
              <span className="bg-sienna-bright px-2 py-0.5 font-italic text-2xs tracking-[0.3em] text-cream uppercase italic">
                {flag}
              </span>
            )}
          </div>
          <div className="mt-1 font-italic text-sm text-paper/55 italic">
            {brewery} · <span>{origin}</span>
            <span className="text-paper/30"> · </span>
            {style}
          </div>
        </div>
        <span className="font-serif text-base text-gold tabular-nums">
          {abv}
        </span>
      </div>
    </li>
  )
}

function FoodRow({
  name,
  desc,
  price,
}: {
  name: string
  desc: string
  price: string
}) {
  return (
    <li className="flex items-baseline gap-3 py-4">
      <div className="flex-1">
        <div className="font-serif text-xl text-ink">{name}</div>
        <div className="mt-0.5 font-italic text-base text-ink-soft italic">
          {desc}
        </div>
      </div>
      <span
        className="mx-2 hidden max-w-[35%] flex-1 translate-y-[-6px] border-b border-dotted border-ink/25 sm:block"
        aria-hidden
      />
      <span className="font-serif text-lg text-sienna tabular-nums">
        ${price}
      </span>
    </li>
  )
}

export function Tetto() {
  const heroParallax = useParallax(0.22)
  const draftListRef = useStaggerObserver<HTMLUListElement>(0.05)
  const foodListRef = useStaggerObserver<HTMLUListElement>(0.07)

  return (
    <div className="relative">
      {/* HERO, sunset rooftop */}
      <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-ink">
        <div ref={heroParallax} className="parallax-hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80"
            alt="The Il Tetto rooftop at golden hour, with the Pittsburgh skyline behind"
            className="slow-zoom h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/72" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase lg:px-12">
          <span className="flex items-center gap-2">
            <span className="inline-block h-px w-6 bg-cream/30" />
            Floor III · Il Tetto
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> 942 Penn Ave · Pittsburgh
          </span>
          <span className="flex items-center gap-2">
            Rooftop · third floor
            <span className="inline-block h-px w-6 bg-cream/30" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-24 lg:px-12">
          <div className="rise" style={{ animationDelay: "0.05s" }}>
            <div className="mb-4 flex items-center gap-3 font-italic text-base text-cream italic">
              <span className="mr-1 font-display text-2xl text-cream/60">
                III
              </span>
              <span className="swash swash-white" />
              <span>the rooftop beer garden</span>
            </div>
            <h1 className="text-hero-shadow font-display text-[clamp(3rem,9vw,8rem)] leading-[0.88] tracking-tight text-cream">
              Il Tetto
            </h1>
            <p className="mt-3 font-italic text-lg text-cream/80 italic">
              Rooftop Beer Garden.
            </p>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75">
              Thirty drafts on a chalkboard. A retractable roof that opens when
              the sky agrees. The skyline of a triangular city, lit from below,
              over your last pint of the night.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#chalkboard"
                className="btn-lift group inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
              >
                <i className="ph ph-beer-stein text-sm" />
                Tonight on tap
                <i className="ph ph-arrow-down text-xs transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#menu"
                className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
              >
                <i className="ph ph-pizza text-sm" />
                Eat on the roof
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4 font-serif text-xs tracking-[0.3em] text-cream/55 uppercase">
              <i className="ph ph-stairs text-sm text-gold" />
              No reservations · climb the stairs
            </div>
          </div>

          {/* Roman numeral — mirrors nav container for exact margin alignment */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto flex max-w-[1600px] justify-end px-6 pb-24 lg:px-12">
              <span className="hidden font-display text-[22vw] leading-none text-cream/8 select-none lg:block">
                III
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative overflow-hidden bg-paper py-24">
        <div className="mx-auto grid max-w-[1600px] gap-0 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-12">
          <FadeIn>
            <div className="group relative mb-12 aspect-[4/5] overflow-hidden lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
                alt="Il Tetto rooftop"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="mb-1 font-serif text-2xs tracking-[0.4em] text-gold uppercase">
                  Floor III · Rooftop
                </div>
                <div className="font-display text-3xl leading-tight text-cream">
                  942 Penn Avenue
                </div>
                <div className="mt-1 font-italic text-sm text-cream/70 italic">
                  Pittsburgh, PA · Thu–Sun from 4 PM
                </div>
              </div>
              <div className="absolute top-6 left-6 bg-ink px-3 py-1.5 font-serif text-2xs tracking-[0.35em] text-cream uppercase">
                Walk-in only · no reservations
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col justify-center">
              <div className="mb-5 font-serif text-xs tracking-[0.5em] text-sienna uppercase">
                philosophy
              </div>
              <p className="font-display text-3xl leading-[1.15] text-ink md:text-4xl">
                The view is the menu.
                <span className="font-italic text-sienna italic">
                  {" "}Everything else{" "}
                </span>
                is cold pints and good company.
              </p>
              <div className="mt-8 flex">
                <span className="swash" />
              </div>
              <p className="mt-8 max-w-xl font-italic text-xl leading-relaxed text-ink-soft italic">
                No reservations, no dress code, no ceremony. The retractable roof opens when the forecast agrees. Thirty drafts on the chalkboard, whole pies riding the dumbwaiter up from below, the Pittsburgh skyline doing the rest.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
                {[
                  { k: "30", v: "rotating drafts" },
                  { k: "120", v: "rooftop seats" },
                  { k: "0", v: "reservations needed" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="font-display text-4xl leading-none text-sienna">
                      {s.k}
                    </div>
                    <div className="mt-1 font-italic text-sm text-ink-soft italic">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE CHALKBOARD */}
      <section id="chalkboard" className="relative bg-paper py-28">
        <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-3 font-italic text-lg text-sienna italic">
                  <i className="ph ph-chalkboard-simple text-2xl" />
                  tonight on tap
                </div>
                <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-ink">
                  The chalkboard.
                </h2>
              </div>
              <p className="max-w-md font-italic text-lg leading-relaxed text-ink-soft italic">
                Thirty rotating lines. Local first, then everywhere else. We
                update Untappd every morning, but the bartender's the source of
                truth.
              </p>
            </div>
          </FadeIn>

          {/* the chalkboard "hangs" on the wall, wood frame, dark inset */}
          <FadeIn delay={0.08}>
            <div className="border-[10px] border-[#3a2a1a] bg-ink shadow-[0_30px_60px_-20px_rgba(26,18,11,0.5)]">
              <ul ref={draftListRef}>
                {DRAFTS.map((d, i) => (
                  <DraftCard
                    key={d.name}
                    number={String(i + 1).padStart(2, "0")}
                    {...d}
                  />
                ))}
                <li className="px-6 py-6 text-center sm:px-8">
                  <span className="font-italic text-paper/55 italic">
                    + 17 more on rotation ,{" "}
                    <span className="text-gold">ask the bartender</span>
                  </span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
            <span>Powered by Untappd · ratings on request</span>
            <span className="flex items-center gap-2">
              <i className="ph ph-flag text-base text-sienna" />
              local · brewed within 50 miles of Penn Ave
            </span>
          </div>
        </div>
      </section>

      {/* BEER OF THE MONTH FEATURE */}
      <section className="relative bg-ink py-24 text-paper">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-2 font-italic text-base text-gold italic">
                  beer of the month · may
                </div>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9]">
                  {FEATURED_DRAFT.name}
                </h2>
              </div>
              <p className="font-italic text-base text-paper/65 italic">
                {FEATURED_DRAFT.brewery} · {FEATURED_DRAFT.style} · {FEATURED_DRAFT.abv} ABV
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="group relative aspect-[21/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=2400&q=80"
                alt="A pint of Big Wave blonde ale at sunset"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOD MENU */}
      <section id="menu" className="relative bg-paper-deep py-28">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
              <div>
                <div className="mb-3 font-italic text-lg text-sienna italic">
                  eat on the roof
                </div>
                <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-ink">
                  Whole pies,
                  <br />
                  <span className="font-italic text-sienna italic">
                    pulled hot.
                  </span>
                </h2>
              </div>
              <p className="max-w-md font-italic text-lg leading-relaxed text-ink-soft italic">
                The rooftop kitchen runs a tight bar menu, whole pies from the
                wood oven below, the meatball hoagie, fries that have business
                being on a roof.
              </p>
            </div>
          </FadeIn>

          <ul ref={foodListRef} className="divide-y divide-ink/10 border-t border-b border-ink/10">
            {FOOD.map((f) => (
              <FoodRow key={f.name} {...f} />
            ))}
          </ul>
        </div>
      </section>

      {/* HAPPY HOUR */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-sienna opacity-30 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full bg-gold opacity-20 blur-[130px]" />
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <FadeIn>
              <div>
                <div className="mb-3 font-italic text-lg text-gold italic">
                  aperitivo · happy hour
                </div>
                <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.9]">
                  Sunset hour.
                </h2>
                <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-paper/85">
                  Tuesday through Friday, 4:30 → 6:30, golden hour, half-price
                  everything that matters. Best seats on the roof go fast.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 border border-paper/30 px-5 py-2.5 font-serif text-xs tracking-[0.3em] uppercase">
                  <i className="ph ph-clock text-base text-gold" />
                  Tue → Fri · 4:30 → 6:30 PM
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <ul className="grid gap-px bg-paper/10 sm:grid-cols-2">
                {[
                  { k: "½ off", v: "drafts", icon: "ph-beer-stein" },
                  { k: "½ off", v: "well & call mixed", icon: "ph-martini" },
                  { k: "$5", v: "espresso martinis", icon: "ph-coffee" },
                  { k: "½ off", v: "small plates", icon: "ph-bowl-food" },
                ].map((row) => (
                  <li key={row.v} className="flex items-center gap-5 bg-ink p-6">
                    <i className={`ph-duotone ${row.icon} text-4xl text-gold`} />
                    <div>
                      <div className="font-display text-3xl">{row.k}</div>
                      <div className="font-italic text-paper/75 italic">
                        {row.v}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WEATHER & HOURS */}
      <section className="relative bg-paper py-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <FadeIn>
            <div>
              <div className="mb-3 font-italic text-lg text-sienna italic">
                il tempo · the weather
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] text-ink">
                We open the roof
                <br />
                <span className="font-italic text-sienna italic">
                  when the sky lets us.
                </span>
              </h2>
              <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
                The retractable roof closes for rain, high wind, or surprise snow.
                When it's closed we keep the heaters on, but the view goes away.
                Call the host stand before climbing if you're chasing a specific
                view.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div>
              <div className="mb-6 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
                Hours · Floor III
              </div>
              <ul className="divide-y divide-ink/10 border-t border-b border-ink/10">
                {[
                  { d: "Thu", h: "4:00 PM, late" },
                  { d: "Fri", h: "4:00 PM, late" },
                  { d: "Sat", h: "2:00 PM, late" },
                  { d: "Sun", h: "2:00 → 9:00 PM" },
                  { d: "Mon to Wed", h: "Closed" },
                ].map((row) => (
                  <li key={row.d} className="flex items-baseline gap-5 py-4">
                    <span className="w-24 font-serif text-sm tracking-[0.2em] text-ink uppercase">
                      {row.d}
                    </span>
                    <span
                      className="mx-2 hidden flex-1 translate-y-[-4px] border-b border-dotted border-ink/25 sm:block"
                      aria-hidden
                    />
                    <span className="font-italic text-sm text-ink-soft italic tabular-nums">
                      {row.h}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-italic text-sm leading-relaxed text-ink-soft italic">
                "Late" is weather, crowd, and bartender's discretion. The
                chalkboard tells you when last call is.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA STRIP, descend */}
      <section className="relative bg-ink text-cream">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <div className="mb-2 font-italic text-base text-gold italic">
              third floor · III
            </div>
            <h3 className="font-display text-5xl leading-[0.9]">
              You've reached
              <br />
              <span className="font-italic italic">the top.</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/mezzo"
              className="btn-lift group inline-flex items-center gap-3 border border-cream/40 px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream/10"
            >
              <i className="ph ph-arrow-down text-lg" />
              Down to Mezzo
            </Link>
            <Link
              to="/"
              className="btn-lift group inline-flex items-center gap-3 bg-gold px-7 py-4 font-serif text-sm tracking-[0.3em] text-ink uppercase transition-colors hover:bg-cream"
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
