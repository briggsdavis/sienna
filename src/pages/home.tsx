import { Link } from "react-router"
import { FadeIn, ParallaxImage, useParallax } from "../components/animations"

const FLOORS = [
  {
    id: "emporio",
    href: "/emporio",
    roman: "I",
    name: "Emporio",
    sub: "A Meatball Joint",
    italian: "the meatball joint",
    color: "from-[#7a2218] via-[#a4341f] to-[#c9412a]",
    accent: "#c9412a",
    desc: "Ground floor. Twelve sauces, six meats, one rule: the meatball is sacred.",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=70",
    items: [
      {
        name: "Meatball Hoagie",
        price: "18",
        note: "choice of three meatballs",
      },
      {
        name: "Buffalo Chicken Balls",
        price: "12",
        note: "bleu cheese, celery",
      },
      { name: "Jacked Mac Bowl", price: "18", note: "house cheese sauce" },
      {
        name: "Dragon Ball · Ball of the Month",
        price: "14",
        note: "sweet chili glaze",
      },
    ],
  },
  {
    id: "mezzo",
    href: "/mezzo",
    roman: "II",
    name: "Mezzo",
    sub: "Pizza & Charcuterie",
    italian: "the trattoria",
    color: "from-[#3a2818] via-[#6e1f12] to-[#a4341f]",
    accent: "#a4341f",
    desc: "Linen, candlelight, an eight-hundred-degree oven. The only OpenTable reservation in the building.",
    image:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1600&q=70",
    items: [
      {
        name: "Soppressata & Hot Honey",
        price: "25",
        note: "marinara, mozzarella",
      },
      {
        name: "Crab-Stuffed Ravioli",
        price: "29",
        note: "white truffle cream",
      },
      { name: "Braised Short Rib", price: "32", note: "demi, broccolini" },
      {
        name: "Vietti Rocche di Castiglione Barolo",
        price: "180",
        note: "2017 · per bottle",
      },
    ],
  },
  {
    id: "tetto",
    href: "/tetto",
    roman: "III",
    name: "Il Tetto",
    sub: "Rooftop Beer Garden",
    italian: "the rooftop garden",
    color: "from-[#1f2a3a] via-[#a4341f] to-[#e7a04a]",
    accent: "#e7a04a",
    desc: "Open sky. Thirty drafts on the chalkboard. No reservations — climb the stairs.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=70",
    items: [
      { name: "Whole Pepperoni Pie", price: "25", note: "8 slices, baked hot" },
      {
        name: "Big Wave · Kona",
        price: "",
        note: "blonde · 4.4% · beer of the month",
      },
      {
        name: "Negley's Nectar Peach Cider",
        price: "",
        note: "Arsenal · Pittsburgh, 8.4%",
      },
      {
        name: "Espresso Martini",
        price: "5",
        note: "happy hour, Tue–Fri 4:30–6:30",
      },
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
    span: "row-span-2",
  },
  {
    name: "Classic Meatballs",
    en: "Beef-pork blend, crack sauce",
    floor: "Emporio",
    price: "12",
    img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1100&q=75",
    span: "",
  },
  {
    name: "Soppressata Pizza",
    en: "Hot honey, mozzarella, marinara",
    floor: "Mezzo",
    price: "25",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1100&q=75",
    span: "",
  },
  {
    name: "Molten Chocolate",
    en: "Lava cake, vanilla gelato",
    floor: "Mezzo",
    price: "14",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1100&q=75",
    span: "",
  },
  {
    name: "Crack Fries",
    en: "Smothered in crack sauce, buffalo-ranch",
    floor: "Emporio",
    price: "12",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1100&q=75",
    span: "",
  },
  {
    name: "Carbonara",
    en: "Pancetta, pecorino, egg yolk, pepper",
    floor: "Mezzo",
    price: "27",
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1100&q=75",
    span: "row-span-2",
  },
] as const

const MARQUEE_WORDS = [
  "meatballs",
  "wood-fired pizza",
  "rooftop garden",
  "thirty drafts",
  "carbonara",
  "tiramisù",
  "burrata",
  "soppressata",
  "espresso",
  "house cocktails",
  "barolo",
  "happy hour",
  "ricotta doughnuts",
  "private events",
  "catering",
]

export function Home() {
  const heroParallax = useParallax(0.22)

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div ref={heroParallax} className="parallax-hero-wrap">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=80"
              alt="A wood-fired Italian dining room"
              className="slow-zoom h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/30 to-ink/88" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent,rgba(26,18,11,0.4))]" />
        </div>

        {/* top meta strip */}
        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <span className="flex items-center gap-2">
            <span className="inline-block h-px w-8 bg-cream/40" />
            Established 2013
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-map-pin text-sm" />
            942 Penn Avenue · Pittsburgh
          </span>
          <span className="flex items-center gap-2">
            Three floors · One roof
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        {/* center — centered & chique */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 text-center lg:px-12">
          <div className="rise mx-auto max-w-3xl" style={{ animationDelay: "0.1s" }}>
            <div className="mb-5 flex items-center justify-center gap-3 font-italic text-base tracking-wide text-cream/65 italic">
              <span className="swash" />
              <span>Trattoria · Pizzeria · Rooftop</span>
              <span className="swash" />
            </div>
            <h1 className="text-hero-shadow font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream">
              Sienna
              <br />
              <span className="font-italic font-light text-cream/90 italic">
                Mercato
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
            <span className="font-serif text-2xs tracking-[0.4em] uppercase">
              scroll
            </span>
            <i className="ph ph-caret-down animate-bounce text-xl" />
          </div>
        </div>

      </section>

      {/* MARQUEE */}
      <FadeIn>
      <section className="relative overflow-hidden border-y border-ink/15 bg-paper-deep py-6">
        <div className="marquee-track flex whitespace-nowrap">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-8 px-8 font-italic text-3xl text-sienna italic md:text-5xl"
            >
              {word}
              <i className="ph ph-asterisk text-xl text-ink/40" />
            </span>
          ))}
        </div>
      </section>
      </FadeIn>

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
              style={{
                background: idx === 1 ? "var(--color-cream)" : undefined,
              }}
            >
              <div
                className={`mx-auto grid max-w-[1600px] gap-0 lg:min-h-[720px] ${
                  flipped
                    ? "lg:grid-cols-[1.1fr_1fr]"
                    : "lg:grid-cols-[1fr_1.1fr]"
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
                  {/* floating roman */}
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

                {/* text side */}
                <div className="relative flex flex-col justify-center px-6 py-20 lg:px-20">
                  <div className="mb-3 font-italic text-base tracking-wide text-sienna italic">
                    {floor.italian}
                  </div>
                  <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
                    {floor.name}
                  </h2>
                  <div className="mt-3 font-serif text-lg tracking-[0.3em] text-ink-soft uppercase">
                    {floor.sub}
                  </div>
                  <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
                    {floor.desc}
                  </p>

                  <ul className="mt-10 max-w-xl divide-y divide-ink/10 border-y border-ink/10">
                    {floor.items.map((it) => (
                      <li
                        key={it.name}
                        className="group flex items-baseline gap-4 py-4"
                      >
                        <span className="font-serif text-base tracking-wide text-ink">
                          {it.name}
                        </span>
                        <span
                          className="mx-2 flex-1 translate-y-[-4px] border-b border-dotted border-ink/25"
                          aria-hidden
                        />
                        <span className="hidden font-italic text-sm text-ink-soft italic sm:inline">
                          {it.note}
                        </span>
                        <span className="font-serif text-base text-sienna tabular-nums">
                          {it.price ? `$${it.price}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      to={floor.href}
                      className="btn-lift group inline-flex items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
                    >
                      Explore the floor
                      <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href="#visit"
                      className="under inline-flex items-center gap-2 font-italic text-sienna italic hover:text-sienna-deep"
                    >
                      <i className="ph ph-clock text-lg" />
                      Hours
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </FadeIn>
          )
        })}
      </section>

      {/* EDITORIAL STATEMENT */}
      <FadeIn>
      <section className="bg-paper-deep py-28 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.05] text-ink">
            Three kitchens.
            <br />
            <span className="font-italic text-sienna italic">One address.</span>
          </p>
          <div className="mt-8 flex justify-center">
            <span className="swash" />
          </div>
        </div>
      </section>
      </FadeIn>

      {/* SIGNATURE DISHES */}
      <FadeIn>
      <section className="grain relative bg-paper py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 font-italic text-lg text-sienna italic">
                the kitchen
              </div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
                Six plates,
                <br />
                <span className="font-italic text-sienna italic">
                  three floors.
                </span>
              </h2>
            </div>
            <p className="max-w-md font-italic text-lg leading-relaxed text-ink-soft italic">
              Plate by plate, floor by floor.
            </p>
          </div>

          <div className="grid auto-rows-[minmax(280px,1fr)] grid-cols-1 gap-4 md:grid-cols-3">
            {SIGNATURE_DISHES.map((dish) => (
              <article
                key={dish.name}
                className={`dish-card group relative overflow-hidden bg-ink ${dish.span}`}
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="dish-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-paper/90 px-3 py-1 font-serif text-2xs tracking-[0.3em] text-ink uppercase">
                  <i className="ph ph-house-line text-xs text-sienna" />
                  {dish.floor}
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl leading-tight text-cream">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-lg text-cream tabular-nums">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="mt-2 font-italic text-sm leading-snug text-cream/75 italic">
                    {dish.en}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* TONIGHT, happy hour & rotating */}
      <section
        id="tonight"
        className="relative overflow-hidden bg-ink py-28 text-paper"
      >
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-sienna blur-[140px]" />
          <div className="absolute -right-20 -bottom-40 h-[380px] w-[380px] rounded-full bg-gold blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-3 font-italic text-lg text-sienna-bright italic">
                  <i className="ph-fill ph-flame neon-flicker text-xl" />
                  tonight
                </div>
                <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
                  Tonight at{" "}
                  <span className="text-sienna-bright italic">Sienna</span>
                </h2>
              </div>
              <div className="max-w-sm font-serif text-sm tracking-[0.3em] text-paper/60 uppercase">
                Updated daily
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="group relative h-full bg-ink p-8 transition-colors hover:bg-sienna-deep">
                  <i
                    className={`ph-duotone ${card.icon} text-4xl text-sienna-bright transition-colors group-hover:text-cream`}
                  />
                  <div className="mt-8 font-serif text-2xs tracking-[0.4em] text-paper/50 uppercase group-hover:text-paper/80">
                    {card.tag}
                  </div>
                  <h3 className="mt-2 font-display text-3xl leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-italic text-sm leading-relaxed text-paper/70 italic group-hover:text-paper/90">
                    {card.desc}
                  </p>
                  <div className="mt-6 font-serif text-xs tracking-[0.25em] text-sienna-bright uppercase group-hover:text-cream">
                    {card.meta}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* THE BUILDING */}
      <section className="relative bg-paper py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-2 lg:px-12">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=1400&q=80"
                alt="Pittsburgh skyline"
                speed={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-8 text-cream">
                <div className="font-serif text-2xs tracking-[0.4em] text-sienna-bright uppercase">
                  the house
                </div>
                <div className="mt-1 font-display text-3xl">942 Penn Avenue</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col justify-center">
              <div className="mb-3 font-italic text-lg text-sienna italic">
                the story
              </div>
              <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-ink">
                A century of brick,
                <br />
                <span className="font-italic text-sienna italic">
                  a decade of dinner.
                </span>
              </h2>
              <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
                A Cultural District landmark since 2013. Three floors, three
                concepts — one address on Penn Avenue.
              </p>

              <div className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-6">
                {[
                  {
                    icon: "ph-house-line",
                    k: "Three floors",
                    v: "Emporio · Mezzo · Il Tetto",
                  },
                  {
                    icon: "ph-armchair",
                    k: "Seats",
                    v: "230 indoor + 120 rooftop",
                  },
                  {
                    icon: "ph-wine",
                    k: "Wine list",
                    v: "Italian-led, 90+ bottles",
                  },
                  {
                    icon: "ph-beer-bottle",
                    k: "Drafts",
                    v: "30 rotating · roof + ground",
                  },
                ].map((s) => (
                  <div key={s.k} className="flex items-start gap-3">
                    <i
                      className={`ph-duotone ${s.icon} mt-0.5 text-2xl text-sienna`}
                    />
                    <div>
                      <div className="font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
                        {s.k}
                      </div>
                      <div className="font-italic text-ink italic">{s.v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://viewer.threshold360.com/?thresholdId=7761067-1993885746&preset=share"
                target="_blank"
                rel="noreferrer"
                className="btn-lift group mt-10 inline-flex w-fit items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
              >
                <i className="ph ph-cube text-base" />
                See the building in 360°
                <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* RESERVE / VISIT BAND */}
      <FadeIn>
      <section
        id="visit"
        className="relative overflow-hidden bg-sienna text-cream"
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1.3fr_1fr] lg:px-12">
          <div>
            <div className="mb-4 font-italic text-lg text-cream/80 italic">
              come hungry
            </div>
            <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.85]">
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
                className="group inline-flex items-center gap-3 bg-cream px-8 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper"
              >
                <i className="ph ph-calendar-dots text-lg" />
                Reserve Mezzo
                <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="tel:14122812810"
                className="inline-flex items-center gap-3 border border-cream/60 px-8 py-4 font-serif text-sm tracking-[0.3em] uppercase transition-colors hover:bg-cream/10"
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
                {
                  roman: "I",
                  name: "Emporio",
                  hours: "Tue–Sun · 4:30 PM → 11 PM",
                },
                { roman: "II", name: "Mezzo", hours: "Wed–Sun · 5 PM → 10 PM" },
                {
                  roman: "III",
                  name: "Il Tetto",
                  hours: "Thu–Sat · 4 PM → late, weather-permitting",
                },
              ].map((row) => (
                <li key={row.name} className="flex items-baseline gap-5 py-5">
                  <span className="w-8 font-display text-3xl text-cream/70">
                    {row.roman}
                  </span>
                  <span className="font-display text-2xl">{row.name}</span>
                  <span
                    className="mx-2 flex-1 translate-y-[-4px] border-b border-dotted border-cream/30"
                    aria-hidden
                  />
                  <span className="font-italic text-sm text-cream/85 italic tabular-nums">
                    {row.hours}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-italic text-sm leading-relaxed text-cream/70 italic">
              The rooftop closes when the sky says so.
            </p>
          </div>
        </div>
      </section>
      </FadeIn>
    </div>
  )
}
