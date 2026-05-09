import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { FadeIn, ParallaxImage, useParallax, useStaggerObserver } from "../components/animations"

const SAUCES = [
  { name: "Marinara", note: "the classic, slow-cooked San Marzano", heat: 0 },
  { name: "Meat Sauce", note: "beef-pork ragù, twelve hours low", heat: 0 },
  { name: "Vodka", note: "tomato cream, a splash of vodka", heat: 1 },
  { name: "Diablo", note: "calabrian chili, bring water", heat: 3 },
  { name: "Buffalo", note: "frank's, butter, a little hot honey", heat: 2 },
  {
    name: "Crack Sauce",
    note: "buffalo + ranch · the one everyone reorders",
    heat: 2,
  },
  { name: "Government Cheese", note: "yellow, glossy, unrepentant", heat: 0 },
  {
    name: "Creamy Tuscan",
    note: "garlic cream, sun-dried tomato, spinach",
    heat: 0,
  },
  { name: "Pesto", note: "basil, pine nut, pecorino", heat: 0 },
  { name: "Mushroom Gravy", note: "cremini, thyme, demi", heat: 0 },
] as const

const BALL_TYPES = [
  {
    name: "Classic Italian",
    sub: "beef + pork blend",
    icon: "ph-circle-half-tilt",
    featured: false,
  },
  {
    name: "Chicken",
    sub: "ground thigh, parm",
    icon: "ph-egg",
    featured: false,
  },
  {
    name: "Pork",
    sub: "fennel, garlic, breadcrumb",
    icon: "ph-circle-dashed",
    featured: false,
  },
  {
    name: "Veggie",
    sub: "lentil + mushroom, herb",
    icon: "ph-leaf",
    featured: false,
  },
  {
    name: "Ball of the Month",
    sub: "currently · Dragon Ball",
    icon: "ph-flame",
    featured: true,
  },
] as const

const STARTERS = [
  {
    name: "Buffalo Fried Chicken Balls",
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
    name: "Bruschetta",
    desc: "whipped ricotta, roasted tomato, balsamic, arugula",
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
  { name: "Chicken Tenders", desc: "three tenders, fries", price: "12" },
] as const

const ENTREES = [
  {
    name: "Shrimp Vodka Pasta",
    desc: "seared shrimp, vodka cream, rigatoni",
    price: "22",
  },
  { name: "Penne Bolognese", desc: "twelve-hour ragù", price: "22" },
  {
    name: "Grilled Chicken Dinner",
    desc: "marinated breast, lemon, side",
    price: "22",
  },
  {
    name: "Chicken Parm Dinner",
    desc: "breaded, mozzarella, marinara, spaghetti",
    price: "22",
  },
] as const

const ON_THE_BUN = [
  {
    name: "Meatball Hoagie",
    desc: "three classic balls, sauce of choice",
    price: "18",
  },
  {
    name: "Chicken Parm Sandwich",
    desc: "breaded chicken, mozzarella, marinara",
    price: "18",
  },
  {
    name: "Buffalo Chicken Sandwich",
    desc: "fried, buffalo, ranch, pickles",
    price: "18",
  },
  {
    name: "Emporio Burger",
    desc: "two patties, american, special sauce",
    price: "18",
  },
] as const

const BOWLS = [
  {
    name: "Jacked Mac Bowl",
    desc: "house mac & cheese · meatballs · crack sauce",
    price: "18",
    build: false,
  },
  {
    name: "Italian Classic",
    desc: "spaghetti · classic balls · marinara",
    price: "18",
    build: false,
  },
  {
    name: "Pesto Chicken Pasta",
    desc: "penne · grilled chicken · pesto",
    price: "18",
    build: false,
  },
  {
    name: "Build Your Own",
    desc: "pick a base, three balls, a sauce, see the matrix below",
    price: "18",
    build: true,
  },
] as const

const SOUPS = [
  {
    name: "Italian Wedding",
    desc: "tiny meatballs, escarole, broth, pecorino",
    price: "10",
  },
  { name: "Caesar", desc: "romaine, parmesan shavings, croutons", price: "10" },
] as const

const SIDES = [
  { name: "French Fries", price: "8" },
  { name: "Mac n' Cheese", price: "8" },
  { name: "Roasted Vegetables", price: "8" },
] as const

const DESSERTS = [
  {
    name: "Homemade Ricotta Doughnuts",
    desc: "warm, dusted, dipped",
    price: "10",
  },
  {
    name: "Tiramisu",
    desc: "espresso-soaked lady fingers, mascarpone, cocoa",
    price: "10",
  },
] as const

const KIDS = [
  "Meatball with Sauce",
  "Mac n' Cheese",
  "Fried Chicken Balls",
  "Spaghetti",
  "Broccoli",
  "Tater Tots",
  "French Fries",
]

function HeatDots({ n }: { n: number }) {
  return (
    <span className="ml-2 inline-flex items-center gap-0.5 align-middle">
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className={`ph-fill ph-flame text-xs ${
            i < n ? "text-sienna" : "text-ink/15"
          }`}
        />
      ))}
    </span>
  )
}

function MenuRow({
  name,
  desc,
  price,
  flag,
}: {
  name: string
  desc?: string
  price: string
  flag?: string
}) {
  return (
    <li className="flex items-baseline gap-3 py-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-xl text-ink">{name}</span>
          {flag && (
            <span className="font-italic text-2xs tracking-[0.25em] text-sienna uppercase italic">
              {flag}
            </span>
          )}
        </div>
        {desc && (
          <div className="mt-0.5 font-italic text-base text-ink-soft italic">
            {desc}
          </div>
        )}
      </div>
      <span className="font-serif text-lg text-sienna tabular-nums">
        ${price}
      </span>
    </li>
  )
}

export function Emporio() {
  const heroParallax = useParallax(0.22)
  const sauceListRef = useStaggerObserver<HTMLUListElement>()

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-hero w-full overflow-hidden bg-ink">
        <div ref={heroParallax} className="parallax-hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=2400&q=80"
            alt="A platter of meatballs in red sauce"
            className="slow-zoom h-full w-full object-cover opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(201,65,42,0.35),transparent_60%)]" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <Link
            to="/"
            className="under flex items-center gap-2 hover:text-cream"
          >
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Floor I · 942 Penn Ave
          </span>
          <span className="flex items-center gap-2">
            ground floor
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-12">
          <img
            src="/emporio.avif"
            alt="Emporio logo"
            className="rise mb-6 h-16 w-auto brightness-0 invert opacity-80"
            style={{ animationDelay: "0s", objectFit: "contain", objectPosition: "left" }}
          />
          <div className="rise mb-4 flex items-center gap-3 font-italic text-base text-cream italic" style={{ animationDelay: "0.05s" }}>
            <span className="mr-1 font-display text-2xl text-cream/60">I</span>
            <span className="swash swash-white" />
            <span>meatball joint</span>
          </div>
          <h1 className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream" style={{ animationDelay: "0.25s" }}>
            Emporio
          </h1>
          <p className="rise mt-3 font-italic text-lg text-cream/80 italic" style={{ animationDelay: "0.4s" }}>
            A Meatball Joint.
          </p>
          <p className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75" style={{ animationDelay: "0.55s" }}>
            Five meats, ten sauces, one ground floor that runs loud. Pull up a
            stool, build a bowl, ask the bartender what's on the chalkboard.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.7s" }}>
            <a
              href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
            >
              <i className="ph ph-bag text-sm" />
              Order pickup
              <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Roman numeral — mirrors nav container for exact margin alignment */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex max-w-[1600px] justify-end px-6 pb-20 lg:px-12">
            <span className="hidden font-display text-[22vw] leading-none text-cream/8 select-none lg:block">
              I
            </span>
          </div>
        </div>
      </section>

      {/* PAGE SHORTCUTS */}
      <nav className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-3 px-6 py-5 lg:px-12">
          <a
            href="#happy-hour"
            className="btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"
          >
            <i className="ph ph-clock text-sm" />
            Happy Hour
          </a>
          <a
            href="#menu"
            className="btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"
          >
            <i className="ph ph-list-magnifying-glass text-sm" />
            Menu
          </a>
          <a
            href="#kids-menu"
            className="btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"
          >
            <i className="ph ph-smiley text-sm" />
            Kids Menu
          </a>
          <Link
            to="/catering"
            className="btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"
          >
            <i className="ph ph-bag text-sm" />
            Catering Menu
          </Link>
        </div>
      </nav>

      {/* PHILOSOPHY + LOCATION */}
      <section className="relative overflow-hidden bg-paper py-24">
        <div className="mx-auto grid max-w-[1600px] gap-0 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-12">
          <FadeIn>
            <div className="group relative mb-12 aspect-[4/5] overflow-hidden lg:mb-0">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80"
                alt="Emporio meatballs"
                className="transition-transform duration-700 group-hover:scale-[1.03]"
                speed={0.12}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="mb-1 font-serif text-2xs tracking-[0.4em] text-cream uppercase">
                  Floor I · Ground Floor
                </div>
                <div className="font-display text-3xl leading-tight text-cream">
                  942 Penn Avenue
                </div>
                <div className="mt-1 font-italic text-sm text-cream/70 italic">
                  Pittsburgh, PA · Open Tue–Sun from 4:30 PM
                </div>
              </div>
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-sienna px-3 py-1.5 font-serif text-2xs tracking-[0.35em] text-cream uppercase">
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
                The meatball is sacred.
                <span className="font-italic text-sienna italic">
                  {" "}
                  Everything else{" "}
                </span>
                is a delivery system, bun, bowl, hoagie, fork.
              </p>
              <div className="mt-8 flex">
                <span className="swash" />
              </div>
              <p className="mt-8 max-w-xl font-italic text-xl leading-relaxed text-ink-soft italic">
                We grind the meat in-house. We roll by hand at noon. The sauce
                list runs ten deep so the same ball can be a different dinner ten
                nights running.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
                {[
                  { k: "5", v: "meatball varieties" },
                  { k: "10", v: "house sauces" },
                  { k: "$18", v: "build-your-own bowl" },
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

      {/* THE BALLS */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 font-display text-[26vw] leading-none text-sienna/15 select-none">
          MEATBALLS
        </div>
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <FadeIn>
              <div>
                <div className="mb-2 font-italic text-lg text-sienna-bright italic">
                  five kinds
                </div>
                <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9]">
                  Five balls.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="max-w-md font-italic text-lg text-paper/70 italic">
                Pick any combination. Three to a hoagie, three to a bowl, six on a
                plate of six over polenta.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.18}>
            <div className="grid grid-cols-2 gap-px bg-paper/15 md:grid-cols-5">
              {BALL_TYPES.map((b) => (
                <div
                  key={b.name}
                  className={`hover-lift group relative bg-ink p-6 text-center transition-all hover:bg-sienna-deep ${
                    b.featured ? "bg-sienna text-cream" : ""
                  }`}
                >
                  {b.featured && (
                    <span className="absolute top-2 right-2 font-serif text-2xs tracking-[0.3em] text-cream uppercase">
                      feat.
                    </span>
                  )}
                  <i
                    className={`ph-duotone ${b.icon} text-5xl ${
                      b.featured
                        ? "text-cream"
                        : "text-sienna-bright group-hover:text-cream"
                    } transition-colors`}
                  />
                  <div className="mt-5 font-display text-2xl">{b.name}</div>
                  <div
                    className={`mt-1 font-italic text-sm italic ${
                      b.featured
                        ? "text-cream/80"
                        : "text-paper/60 group-hover:text-cream/80"
                    }`}
                  >
                    {b.sub}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SAUCE MATRIX */}
      <section className="relative bg-cream py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <FadeIn>
              <div>
                <div className="mb-2 font-italic text-lg text-sienna italic">
                  ten sauces
                </div>
                <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] text-ink">
                  Ten sauces.
                  <br />
                  <span className="font-italic text-sienna italic">
                    Pick a mood.
                  </span>
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="max-w-md font-italic text-lg text-ink-soft italic">
                From the polite (marinara, pesto) to the unrepentant (Government
                Cheese). Heat dots aren't a dare, they're a warning.
              </p>
            </FadeIn>
          </div>

          <ul
            ref={sauceListRef}
            className="grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2"
          >
            {SAUCES.map((s, i) => (
              <li
                key={s.name}
                className="hover-lift group relative bg-paper p-6 transition-colors hover:bg-cream"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-2xs tracking-[0.3em] text-ink/40 uppercase">
                    n.{String(i + 1).padStart(2, "0")}
                  </span>
                  <HeatDots n={s.heat} />
                </div>
                <div className="mt-3 font-display text-3xl text-ink">
                  {s.name}
                </div>
                <div className="mt-2 font-italic text-ink-soft italic">
                  {s.note}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BUILD-YOUR-OWN */}
      <section className="relative overflow-hidden bg-sienna py-28 text-cream">
        <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="mb-3 font-italic text-lg text-cream/80 italic">
                build your bowl
              </div>
              <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">
                Build a bowl.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl font-italic text-xl text-cream/85 italic">
                Three steps. Eighteen dollars. Hundreds of combinations.
              </p>
            </div>
          </FadeIn>

          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {[
              {
                step: "one",
                num: "01",
                title: "Pick a base",
                items: [
                  "Pasta · spaghetti · rigatoni · penne",
                  "Mac n' cheese",
                  "Salad greens",
                  "Polenta",
                ],
                icon: "ph-bowl-food",
                delay: 0.08,
              },
              {
                step: "two",
                num: "02",
                title: "Choose three balls",
                items: [
                  "Classic · chicken · pork · veggie · or the ball of the month, mix and match",
                ],
                icon: "ph-circles-three",
                delay: 0.16,
              },
              {
                step: "three",
                num: "03",
                title: "Sauce it",
                items: [
                  "Any of the ten sauces",
                  "Add bread for $2",
                  "Add parm for $1",
                ],
                icon: "ph-drop",
                delay: 0.24,
              },
            ].map((step) => (
              <FadeIn key={step.num} delay={step.delay} className="h-full">
                <div className="relative h-full border border-cream/20 p-8 backdrop-blur-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="font-italic text-cream/70 italic">
                      {step.step}
                    </span>
                    <span className="font-display text-5xl text-cream/40">
                      {step.num}
                    </span>
                  </div>
                  <i className={`ph-duotone ${step.icon} mt-6 block text-5xl`} />
                  <h3 className="mt-6 font-display text-3xl">{step.title}</h3>
                  <ul className="mt-4 space-y-2 font-italic text-cream/85 italic">
                    {step.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <i className="ph ph-dot-outline mt-1 text-sienna-bright" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BALL OF THE MONTH */}
      <section className="relative bg-paper py-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="grid overflow-hidden bg-ink text-cream lg:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-square overflow-hidden lg:aspect-auto">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1400&q=80"
                  alt="The Dragon Ball"
                  speed={0.1}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent" />
                <div className="absolute top-6 left-6 bg-sienna px-3 py-1.5 font-serif text-2xs tracking-[0.4em] text-cream/80 uppercase">
                  ball of the month · may
                </div>
                <div className="absolute right-6 bottom-6 flex items-center gap-2 font-italic text-sm text-cream italic">
                  <i className="ph-fill ph-flame text-sienna-bright" />
                  <i className="ph-fill ph-flame text-sienna-bright" />
                  medium heat
                </div>
              </div>
              <div className="flex flex-col justify-center p-10 lg:p-16">
                <div className="mb-3 font-italic text-lg text-sienna-bright italic">
                  ball of the month
                </div>
                <h2 className="font-display text-6xl leading-[0.9]">
                  Dragon Ball
                </h2>
                <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-cream/85">
                  Housemade meatballs fried golden, glazed in a glossy sweet-chili
                  sauce with a touch of heat. Available May only, through the
                  month, then she sleeps.
                </p>
                <div className="mt-10 flex items-baseline gap-6">
                  <span className="font-display text-5xl text-sienna-bright">
                    $14
                  </span>
                  <span className="font-italic text-cream/60 italic">
                    six balls · house-made glaze · sesame, scallion
                  </span>
                </div>
                <a
                  href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lift group mt-10 inline-flex w-fit items-center gap-3 bg-sienna-bright px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream hover:text-sienna"
                >
                  Order before she's gone
                  <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE FULL MENU */}
      <section id="menu" className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-4 text-center">
              <div className="mb-3 font-italic text-lg text-sienna italic">
                the whole menu
              </div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] text-ink">
                The whole menu.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-12 mt-6 flex justify-center">
              <span className="swash" />
            </div>
          </FadeIn>

          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            <MenuColumn title="Starters" italian="antipasti" rows={STARTERS} />
            <MenuColumn
              title="Soups & Salads"
              italian="zuppe & insalate"
              rows={SOUPS}
            />
            <MenuColumn title="Entrées" italian="secondi" rows={ENTREES} />
            <MenuColumn
              title="On the Bun"
              italian="al panino"
              rows={ON_THE_BUN}
            />
            <MenuColumn
              title="Bowls"
              italian="le ciotole"
              rows={BOWLS.map((b) =>
                b.build ? { ...b, flag: "build-your-own" } : b,
              )}
            />
            <MenuColumn title="Sides" italian="contorni" rows={SIDES} />
            <MenuColumn title="Desserts" italian="dolci" rows={DESSERTS} />

            <FadeIn>
              <div id="kids-menu">
                <div className="mb-6">
                  <div className="mb-1 font-italic text-base text-sienna italic">
                    for the kids
                  </div>
                  <h3 className="font-display text-4xl text-ink">Kid's Menu</h3>
                  <p className="mt-2 font-italic text-ink-soft italic">
                    Pick any two, $7 each.
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-2 font-serif text-ink/85">
                  {KIDS.map((k) => (
                    <li key={k} className="flex items-center gap-2 py-1">
                      <i className="ph ph-asterisk text-xs text-sienna" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HAPPY HOUR */}
      <section id="happy-hour" className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <FadeIn>
              <div>
                <div className="mb-3 font-italic text-lg text-sienna-bright italic">
                  aperitivo · happy hour
                </div>
                <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.9]">
                  Happy Hour.
                </h2>
                <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-paper/85">
                  Tuesday through Friday, 4:30 to 6:30. Half off the things that
                  matter, full price on the espresso martinis, except they're $5.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 border border-paper/30 px-5 py-2.5 font-serif text-xs tracking-[0.3em] uppercase">
                  <i className="ph ph-clock text-base text-sienna-bright" />
                  Tue to Fri · 4:30 to 6:30 PM
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <ul className="grid gap-px bg-paper/10 sm:grid-cols-2">
                {[
                  { k: "½ off", v: "drafts", icon: "ph-beer-stein" },
                  {
                    k: "½ off",
                    v: "well & call mixed drinks",
                    icon: "ph-martini",
                  },
                  { k: "$5", v: "espresso martinis", icon: "ph-coffee" },
                  {
                    k: "½ off",
                    v: "small plates & starters",
                    icon: "ph-bowl-food",
                  },
                ].map((row) => (
                  <li key={row.v} className="flex items-center gap-5 bg-ink p-6">
                    <i
                      className={`ph-duotone ${row.icon} text-4xl text-sienna-bright`}
                    />
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

      {/* CTA STRIP */}
      <section className="relative bg-sienna text-cream">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <div className="mb-2 font-italic text-base text-cream/80 italic">
              ground floor · I
            </div>
            <h3 className="font-display text-5xl leading-[0.9]">
              Show up hungry.
              <br />
              <span className="font-italic italic">Leave slower.</span>
            </h3>
          </div>
          <div className="flex flex-wrap justify-end gap-4">
            <a
              href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex items-center gap-3 bg-cream px-7 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper"
            >
              <i className="ph ph-bag text-lg" />
              Order Pickup
            </a>
            <Link
              to="/mezzo"
              className="btn-lift group inline-flex items-center gap-3 border border-cream/60 px-7 py-4 font-serif text-sm tracking-[0.3em] uppercase transition-colors hover:bg-cream/10"
            >
              Climb to Mezzo
              <i className="ph ph-arrow-up text-lg" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function MenuColumn({
  title,
  italian,
  rows,
}: {
  title: string
  italian: string
  rows: readonly { name: string; desc?: string; price: string; flag?: string }[]
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const header = el.firstElementChild as HTMLElement
    const items = Array.from(el.querySelectorAll("li")) as HTMLElement[]
    const all = [header, ...items]
    const observers: IntersectionObserver[] = []

    all.forEach((node) => {
      node.style.opacity = "0"
      node.style.transform = "translateY(20px)"
      node.style.transition =
        "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.style.opacity = "1"
            node.style.transform = "translateY(0)"
            obs.disconnect()
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -20px 0px" },
      )
      obs.observe(node)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <div ref={ref}>
      <div className="mb-2">
        <div className="mb-1 font-italic text-base text-sienna italic">
          {italian}
        </div>
        <h3 className="font-display text-4xl text-ink">{title}</h3>
      </div>
      <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
        {rows.map((r) => (
          <MenuRow
            key={r.name}
            name={r.name}
            desc={r.desc}
            price={r.price}
            flag={r.flag}
          />
        ))}
      </ul>
    </div>
  )
}
