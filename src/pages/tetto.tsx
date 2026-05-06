import { Link } from "react-router"
import { FadeIn, useParallax } from "../components/animations"

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
  const heroParallax = useParallax(0.15)

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
        {/* sunset gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a2a4a]/65 via-[#a4341f]/35 to-ink/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_25%,rgba(232,160,74,0.4),transparent_55%)]" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <Link
            to="/"
            className="under flex items-center gap-2 hover:text-cream"
          >
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Floor III · 942 Penn Ave
          </span>
          <span className="flex items-center gap-2">
            on the roof
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-12">
          <div className="rise" style={{ animationDelay: "0.05s" }}>
            <div className="mb-4 flex items-center gap-3 font-italic text-base text-gold italic">
              <span className="mr-1 font-display text-2xl text-cream/60">
                III
              </span>
              <span className="swash" />
              <span>the rooftop garden</span>
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
                className="btn-lift group inline-flex items-center gap-2 bg-gold px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
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
        </div>

        <div className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 font-display text-[40vw] leading-none text-cream/8 select-none lg:right-12 lg:text-[28vw]">
          III
        </div>
      </section>

      {/* MANIFESTO + WEATHER */}
      <FadeIn>
      <section className="relative bg-paper py-28">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-12">
          <div>
            <div className="mb-4 font-serif text-xs tracking-[0.5em] text-sienna uppercase">
              the roof
            </div>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
              Climb three flights.
              <br />
              <span className="font-italic text-sienna italic">
                The view does the rest.
              </span>
            </h2>
            <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-ink-soft">
              No reservations, no covers, no dress code. Find a stool at the
              bar, find a corner at a long table, find a friend you didn't know
              you'd run into. The retractable roof opens by 6 if the forecast
              says yes, and stays open until the wind says otherwise.
            </p>
            <p className="mt-6 font-italic text-lg leading-relaxed text-ink-soft italic">
              Whole pies from the wood oven downstairs ride the dumbwaiter up.
              The chalkboard rotates. The bartender remembers your last pour.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-6 self-start">
            {[
              { k: "30", v: "rotating drafts", icon: "ph-beer-stein" },
              { k: "120", v: "rooftop seats", icon: "ph-armchair" },
              { k: "0", v: "reservations needed", icon: "ph-stairs" },
              { k: "weather", v: "permitting", icon: "ph-cloud-sun" },
            ].map((s) => (
              <li
                key={s.v}
                className="flex flex-col items-start gap-3 border border-ink/10 bg-cream p-6"
              >
                <i className={`ph-duotone ${s.icon} text-3xl text-sienna`} />
                <div className="font-display text-4xl leading-none text-ink">
                  {s.k}
                </div>
                <div className="font-italic text-sm text-ink-soft italic">
                  {s.v}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </FadeIn>

      {/* BEER OF THE MONTH FEATURE */}
      <FadeIn>
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="pointer-events-none absolute -top-32 -right-20 h-[480px] w-[480px] rounded-full bg-gold/40 blur-[160px]" />
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-12">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1400&q=80"
              alt="A pint of Big Wave blonde ale at sunset"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 bg-gold px-3 py-1.5 font-serif text-2xs tracking-[0.4em] text-ink uppercase">
              beer of the month
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-3 font-italic text-lg text-gold italic">
              <i className="ph-duotone ph-beer-stein text-2xl" />
              {FEATURED_DRAFT.brewery} · {FEATURED_DRAFT.origin}
            </div>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85]">
              {FEATURED_DRAFT.name}
            </h2>
            <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-paper/85">
              {FEATURED_DRAFT.notes}
            </p>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <div>
                <dt className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
                  Style
                </dt>
                <dd className="mt-1 font-display text-xl text-cream">
                  {FEATURED_DRAFT.style}
                </dd>
              </div>
              <div>
                <dt className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
                  ABV
                </dt>
                <dd className="mt-1 font-display text-xl text-gold">
                  {FEATURED_DRAFT.abv}
                </dd>
              </div>
              <div>
                <dt className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
                  IBU
                </dt>
                <dd className="mt-1 font-display text-xl text-cream">
                  {FEATURED_DRAFT.ibu}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* THE CHALKBOARD */}
      <FadeIn>
      <section id="chalkboard" className="relative bg-paper py-28">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
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

          {/* the chalkboard "hangs" on the wall, wood frame, dark inset */}
          <div className="border-[10px] border-[#3a2a1a] bg-ink shadow-[0_30px_60px_-20px_rgba(26,18,11,0.5)]">
            <ul>
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

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
            <span>Powered by Untappd · ratings on request</span>
            <span className="flex items-center gap-2">
              <i className="ph ph-flag text-base text-sienna" />
              local · brewed within 50 miles of Penn Ave
            </span>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* FOOD MENU */}
      <FadeIn>
      <section id="menu" className="relative bg-paper-deep py-28">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
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

          <ul className="divide-y divide-ink/10 border-t border-b border-ink/10">
            {FOOD.map((f) => (
              <FoodRow key={f.name} {...f} />
            ))}
          </ul>
        </div>
      </section>
      </FadeIn>

      {/* HAPPY HOUR */}
      <FadeIn>
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full bg-sienna opacity-30 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[380px] w-[380px] rounded-full bg-gold opacity-20 blur-[130px]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
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
          </div>
        </div>
      </section>
      </FadeIn>

      {/* WEATHER & HOURS */}
      <FadeIn>
      <section className="relative bg-paper py-24">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-2 lg:px-12">
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
        </div>
      </section>
      </FadeIn>

      {/* CTA STRIP, descend */}
      <FadeIn>
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
      </FadeIn>
    </div>
  )
}
