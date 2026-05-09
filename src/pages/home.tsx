import { Link } from "react-router"
import { FadeIn, ParallaxImage, useParallax, useStaggerObserver } from "../components/animations"

const FLOORS = [
  {
    id: "emporio",
    href: "/emporio",
    roman: "I",
    name: "Emporio",
    sub: "A Meatball Joint",
    italian: "meatball joint",
    logo: "/emporio.avif",
    color: "from-[#7a2218] via-[#a4341f] to-[#c9412a]",
    desc: "Ground floor. Twelve sauces, six meats, one rule: the meatball is sacred.",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=70",
    items: [
      { name: "Meatball Hoagie", price: "18", note: "choice of three meatballs" },
      { name: "Buffalo Chicken Balls", price: "12", note: "bleu cheese, celery" },
      { name: "Jacked Mac Bowl", price: "18", note: "house cheese sauce" },
    ],
  },
  {
    id: "mezzo",
    href: "/mezzo",
    roman: "II",
    name: "Mezzo",
    sub: "Pizza & Charcuterie",
    italian: "trattoria",
    logo: "/mezzo.avif",
    color: "from-[#3a2818] via-[#6e1f12] to-[#a4341f]",
    desc: "Linen, candlelight, an eight-hundred-degree oven. The only OpenTable reservation in the building.",
    image:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1600&q=70",
    items: [
      { name: "Soppressata & Hot Honey", price: "25", note: "marinara, mozzarella" },
      { name: "Crab-Stuffed Ravioli", price: "29", note: "white truffle cream" },
      { name: "Braised Short Rib", price: "32", note: "demi, broccolini" },
    ],
  },
  {
    id: "tetto",
    href: "/tetto",
    roman: "III",
    name: "Il Tetto",
    sub: "Rooftop Beer Garden",
    italian: "rooftop garden",
    logo: "/iltetto.avif",
    color: "from-[#1f2a3a] via-[#a4341f] to-[#e7a04a]",
    desc: "Open sky. Thirty drafts on the chalkboard. No reservations. Climb the stairs.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=70",
    items: [
      { name: "Whole Pepperoni Pie", price: "25", note: "8 slices, baked hot" },
      { name: "Big Wave · Kona", price: "", note: "blonde · 4.4% · beer of the month" },
      { name: "Negley's Nectar Peach Cider", price: "", note: "Arsenal · Pittsburgh, 8.4%" },
    ],
  },
] as const

const SIGNATURE_DISHES = [
  {
    name: "Warm Burrata",
    en: "Roasted tomatoes, basil, focaccia",
    floor: "Mezzo",
    price: "14",
    img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1100&q=75",
  },
  {
    name: "Classic Meatballs",
    en: "Beef-pork blend, crack sauce",
    floor: "Emporio",
    price: "12",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1100&q=75",
  },
  {
    name: "Soppressata Pizza",
    en: "Hot honey, mozzarella, marinara",
    floor: "Mezzo",
    price: "25",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1100&q=75",
  },
  {
    name: "Molten Chocolate",
    en: "Lava cake, vanilla gelato",
    floor: "Mezzo",
    price: "14",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1100&q=75",
  },
  {
    name: "Crack Fries",
    en: "Smothered in crack sauce, buffalo-ranch",
    floor: "Emporio",
    price: "12",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1100&q=75",
  },
  {
    name: "Carbonara",
    en: "Pancetta, pecorino, egg yolk, pepper",
    floor: "Mezzo",
    price: "27",
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1100&q=75",
  },
] as const

const FLOOR_LOGO: Record<string, string> = {
  Mezzo: "/mezzo.avif",
  Emporio: "/emporio.avif",
  "Il Tetto": "/iltetto.avif",
}

function FloorText({
  floor,
}: {
  floor: (typeof FLOORS)[number]
}) {
  const staggerRef = useStaggerObserver<HTMLDivElement>(0.1)
  return (
    <div ref={staggerRef} className="relative flex flex-col justify-center px-6 py-20 lg:px-20">
      <img
        src={floor.logo}
        alt={`${floor.name} logo`}
        className="mb-6 h-16 w-auto brightness-0 opacity-70 object-left"
        style={{ objectFit: "contain", objectPosition: "left" }}
      />
      <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
        {floor.name}
      </h2>
      <div className="mt-4 font-serif text-lg tracking-[0.3em] text-ink-soft uppercase">
        {floor.sub}
      </div>
      <p className="mt-3 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
        {floor.desc}
      </p>
      <ul className="mt-5 max-w-xl divide-y divide-ink/10 border-y border-ink/10">
        {floor.items.map((it) => (
          <li key={it.name} className="flex items-baseline gap-4 py-4">
            <span className="font-serif text-base tracking-wide text-ink">{it.name}</span>
            <span className="hidden font-body text-sm text-ink-soft sm:inline">{it.note}</span>
            <span className="font-serif text-base text-sienna tabular-nums">
              {it.price ? `$${it.price}` : ""}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          to={floor.href}
          className="btn-lift group inline-flex items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
        >
          Explore the floor
          <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href="#visit"
          className="under inline-flex items-center gap-2 font-serif text-sienna hover:text-sienna-bright"
        >
          <i className="ph ph-clock text-lg" />
          Hours
        </a>
      </div>
    </div>
  )
}

export function Home() {
  const heroParallax = useParallax(0.22)

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-hero w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <div ref={heroParallax} className="parallax-hero-wrap">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=80"
              alt="Sienna Mercato rooftop terrace"
              className="slow-zoom h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/30 to-ink/88" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent,rgba(26,18,11,0.4))]" />
        </div>

        {/* top meta strip */}
        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <span className="hidden flex-1 sm:flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-cream/40" />
            Established 2013
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-map-pin text-sm" />
            942 Penn Avenue · Pittsburgh
          </span>
          <span className="flex flex-1 justify-end items-center gap-2">
            Three floors · One roof
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        {/* center content — staggered per element */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-end px-6 pb-40 text-center lg:px-12">
          <div className="mx-auto max-w-3xl">
            <div
              className="rise mb-5 flex items-center justify-center gap-3 font-serif text-base tracking-wide text-cream/65"
              style={{ animationDelay: "0.1s" }}
            >
              <span>Trattoria · Pizzeria · Rooftop</span>
            </div>
            <h1
              className="rise text-hero-shadow font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
              style={{ animationDelay: "0.35s" }}
            >
              Sienna <span className="font-italic font-light text-cream/90 italic">Mercato</span>
            </h1>
            <div
              className="rise mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
              style={{ animationDelay: "0.65s" }}
            >
              <a
                href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
                target="_blank"
                rel="noreferrer"
                className="btn-lift group inline-flex items-center gap-2 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase"
              >
                <i className="ph ph-fork-knife text-base" />
                Reserve a table
                <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
                target="_blank"
                rel="noreferrer"
                className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
              >
                <i className="ph ph-bag text-base" />
                Order pickup
              </a>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute right-0 bottom-8 left-0 z-10 flex justify-center">
          <div className="flex flex-col items-center gap-3 text-cream/60">
            <span className="font-serif text-2xs tracking-[0.4em] uppercase">scroll</span>
            <i className="ph ph-caret-down animate-bounce text-xl" />
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="grain relative overflow-hidden bg-paper py-40 text-center">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=60"
            alt=""
            className="h-full w-full object-cover opacity-[0.045] mix-blend-multiply"
          />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <FadeIn>
            <div className="mb-8 font-serif text-xs tracking-[0.5em] text-sienna uppercase">
              the italian house
            </div>
            <p className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.1] text-ink">
              Three floors.
              <span className="font-italic text-sienna italic"> Three rooms. </span>
              One Italian house on Penn Avenue.
            </p>
            <p className="mx-auto mt-10 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
              A Cultural District landmark since 2013. One address at 942 Penn Avenue — 230 indoor seats, 120 on the rooftop, an Italian-led wine list of 90+ bottles, and 30 rotating drafts.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* THREE FLOORS */}
      <section className="relative">
        {FLOORS.map((floor, idx) => {
          const flipped = idx % 2 === 1
          return (
            <FadeIn key={floor.id} delay={0.05}>
              <div
                id={floor.id}
                className="relative overflow-hidden"
                style={{ background: idx === 1 ? "var(--color-cream)" : undefined }}
              >
                <div
                  className={`mx-auto grid max-w-[1600px] gap-0 lg:min-h-[720px] ${
                    flipped ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"
                  }`}
                >
                  {/* image side */}
                  <div
                    className={`group relative h-[420px] overflow-hidden lg:h-auto ${flipped ? "lg:order-2" : ""}`}
                  >
                    <ParallaxImage
                      src={floor.image}
                      alt={floor.name}
                      className="transition-transform duration-700 group-hover:scale-[1.04]"
                      speed={0.13}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${floor.color} opacity-25 mix-blend-multiply`}
                    />
                    <div
                      className={`absolute ${flipped ? "right-8" : "left-8"} top-8 font-display text-8xl leading-none text-cream/90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:text-9xl`}
                    >
                      {floor.roman}
                    </div>
                    <div
                      className={`absolute ${flipped ? "right-8" : "left-8"} bottom-8 flex items-center gap-3 font-serif text-xs tracking-[0.4em] text-cream/80 uppercase`}
                    >
                      <span className="inline-block h-px w-10 bg-cream/60" />
                      {`Floor ${idx + 1}`}
                    </div>
                  </div>

                  {/* text side — staggered per line */}
                  <FloorText floor={floor} />
                </div>
              </div>
            </FadeIn>
          )
        })}
      </section>

      {/* FEATURED DISHES */}
      <section className="relative bg-cream py-32">
        <FadeIn>
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
                  Featured
                  <br />
                  <span className="font-italic text-sienna italic">Dishes.</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SIGNATURE_DISHES.map((dish) => (
                <article
                  key={dish.name}
                  className="dish-card group relative aspect-[4/3] overflow-hidden bg-ink"
                >
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="dish-img absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-paper/90 px-3 py-2">
                    <img
                      src={FLOOR_LOGO[dish.floor]}
                      alt={dish.floor}
                      className="h-4 w-auto brightness-0 opacity-70"
                    />
                  </div>
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-3xl leading-tight text-cream">{dish.name}</h3>
                      <span className="font-serif text-lg text-cream tabular-nums">${dish.price}</span>
                    </div>
                    <p className="mt-2 font-body text-sm leading-snug text-cream/75">{dish.en}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* TONIGHT */}
      <section id="tonight" className="bg-sienna py-28 text-cream">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
                  Tonight at <span className="font-italic italic">Sienna</span>
                </h2>
              </div>
              <div className="max-w-sm font-serif text-sm tracking-[0.3em] text-cream/60 uppercase">
                Updated daily
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-px bg-cream/20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                tag: "Ball of the Month",
                title: "Dragon Ball",
                desc: "Fried golden, glazed in sweet chili.",
                meta: "$14 · Emporio",
                icon: "ph-bowl-food",
                delay: 0,
              },
              {
                tag: "Beer of the Month",
                title: "Big Wave",
                desc: "Kona Brewing · Hawaiian blonde ale, light and easy.",
                meta: "4.4% ABV · Il Tetto",
                icon: "ph-beer-stein",
                delay: 0.1,
              },
              {
                tag: "Happy Hour",
                title: "4:30 → 6:30",
                desc: "½-off drafts, well drinks, and small plates. $5 espresso martini.",
                meta: "Tue–Fri · floors I & III",
                icon: "ph-clock-countdown",
                delay: 0.2,
              },
              {
                tag: "Seasonal",
                title: "Spiced Kentucky Mule",
                desc: "Big Springs whiskey, ginger beer, fresh lime.",
                meta: "$13 · all floors",
                icon: "ph-wine",
                delay: 0.3,
              },
            ].map((card) => (
              <FadeIn key={card.title} delay={card.delay} className="h-full">
                <div className="group h-full bg-sienna p-8 transition-colors hover:bg-sienna-deep">
                  <i className={`ph-duotone ${card.icon} text-4xl text-cream/60`} />
                  <div className="mt-8 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
                    {card.tag}
                  </div>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-cream">{card.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">{card.desc}</p>
                  <div className="mt-6 font-serif text-xs tracking-[0.25em] text-cream/60 uppercase">
                    {card.meta}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVATE EVENTS + CATERING */}
      <section className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-px bg-ink/10 lg:grid-cols-2">
            <FadeIn>
              <div className="flex flex-col justify-between gap-10 bg-paper p-10 lg:p-14">
                <div>
                  <div className="mb-3 font-serif text-2xs tracking-[0.5em] text-sienna uppercase">
                    private events
                  </div>
                  <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
                    Book a floor.
                    <br />
                    <span className="font-italic text-sienna italic">Make it yours.</span>
                  </h2>
                  <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
                    Three floors available for private hire. Up to 400 guests. The events team handles the rest.
                  </p>
                </div>
                <Link
                  to="/events"
                  className="btn-lift group inline-flex w-fit items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
                >
                  <i className="ph ph-calendar-dots text-base" />
                  Private events
                  <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex flex-col justify-between gap-10 bg-cream p-10 lg:p-14">
                <div>
                  <div className="mb-3 font-serif text-2xs tracking-[0.5em] text-sienna uppercase">
                    catering
                  </div>
                  <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
                    Two kitchens.
                    <br />
                    <span className="font-italic text-sienna italic">Delivered to you.</span>
                  </h2>
                  <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
                    Casual family-style or plated-ready charcuterie. Citywide delivery, 48-hour notice.
                  </p>
                </div>
                <Link
                  to="/catering"
                  className="btn-lift group inline-flex w-fit items-center gap-3 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
                >
                  <i className="ph ph-bag text-base" />
                  Catering menu
                  <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* RESERVE / VISIT BAND */}
      <section id="visit" className="relative overflow-hidden bg-sienna text-cream">
        <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
        <FadeIn>
          <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1.3fr_1fr] lg:px-12">
            <div>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85]">
                Reserve
                <br />
                <span className="font-italic italic">a table.</span>
              </h2>
              <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-cream/85">
                Mezzo takes reservations via OpenTable. Emporio and Il Tetto are walk-in.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lift group inline-flex items-center gap-3 bg-cream px-8 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper"
                >
                  <i className="ph ph-calendar-dots text-lg" />
                  Reserve Mezzo
                  <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="tel:14122812810"
                  className="btn-lift inline-flex items-center gap-3 border border-cream/60 px-8 py-4 font-serif text-sm tracking-[0.3em] uppercase transition-colors hover:bg-cream/10"
                >
                  <i className="ph ph-phone text-lg" />
                  412.281.2810
                </a>
              </div>
            </div>

            <div>
              <div className="mb-6 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
                Hours · by floor
              </div>
              <ul className="divide-y divide-cream/20 border-y border-cream/20">
                {[
                  { name: "Emporio", logo: "/emporio.avif", hours: "Tue–Sun · 4:30 PM → 11 PM" },
                  { name: "Mezzo", logo: "/mezzo.avif", hours: "Wed–Sun · 5 PM → 10 PM" },
                  { name: "Il Tetto", logo: "/iltetto.avif", hours: "Thu–Sat · 4 PM → late, weather-permitting" },
                ].map((row) => (
                  <li key={row.name} className="flex items-center gap-5 py-5">
                    <img src={row.logo} alt={row.name} className="h-5 w-auto brightness-0 invert opacity-70" />
                    <span className="font-body text-sm text-cream/85 tabular-nums">{row.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-body text-sm leading-relaxed text-cream/70">
                The rooftop closes when the sky says so.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
