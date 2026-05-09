import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { FadeIn, useParallax } from "../components/animations"

const ANTIPASTO = [
  {
    name: "Burrata",
    desc: "warm burrata, roasted tomato, sautéed garlic & shallot, basil, balsamic, focaccia",
    price: "14",
  },
  { name: "Toasted Focaccia", desc: "balsamic & olive oil", price: "10" },
  {
    name: "Caesar",
    desc: "chopped romaine, focaccia croutons, pecorino · add chicken, shrimp, or salmon +5",
    price: "13",
  },
  {
    name: "House Salad",
    desc: "romaine, red onion, tomato, cucumber, olives, peppercini",
    price: "13",
  },
  {
    name: "Arancini",
    desc: "risotto, swiss, fried golden, spicy tomato",
    price: "17",
  },
  {
    name: "Calamari",
    desc: "lightly breaded, marinara, lemon aioli",
    price: "20",
  },
] as const

const PIZZA = [
  {
    name: "Margherita",
    desc: "mozzarella, ricotta, marinara, oven-roasted tomato, torn basil",
    price: "24",
  },
  { name: "Pepperoni", desc: "four cheeses, pepperoni, marinara", price: "24" },
  {
    name: "Soppressata & Hot Honey",
    desc: "marinara, hot honey, soppressata, mozzarella",
    price: "25",
    flag: "house favorite",
  },
  {
    name: "Sausage alla Vodka",
    desc: "house vodka sauce, mozzarella, italian seasoning, basil, parmesan",
    price: "25",
  },
  {
    name: "Short Rib",
    desc: "rich wine sauce, braised short rib, mozzarella, caramelized onion",
    price: "26",
  },
] as const

const PASTA = [
  {
    name: "Gemelli alla Vodka",
    desc: "gemelli, creamy vodka, blistered cherry tomato, fresh spinach",
    price: "25",
  },
  {
    name: "Spaghetti Carbonara",
    desc: "egg yolk, pecorino, black pepper, crispy pancetta, green peas",
    price: "27",
  },
  {
    name: "Gnocchi Florentine",
    desc: "roasted chicken, spinach, cherry tomato, pesto cream",
    price: "28",
  },
  {
    name: "Short Rib Pasta",
    desc: "braised short rib, pappardelle, whipped ricotta, pickled red onion",
    price: "29",
  },
  {
    name: "Crab-Stuffed Ravioli",
    desc: "jumbo lump crab, whipped ricotta, lemon zest, white truffle cream",
    price: "29",
  },
] as const

const MAINS = [
  {
    name: "Chicken Parmesan",
    desc: "breaded to order, golden, marinara & mozzarella, side of spaghetti",
    price: "32",
  },
  {
    name: "Chicken Marsala",
    desc: "chicken breast, crimini, marsala wine, heavy cream, parsley",
    price: "32",
  },
  {
    name: "Braised Short Rib",
    desc: "wine-braised beef, demi glace, pickled red onion, mashed potato, broccolini",
    price: "32",
  },
  {
    name: "Horseradish-Crusted Salmon",
    desc: "Alaskan salmon, dijon, horseradish breadcrumb, leek beurre blanc, spinach, risotto",
    price: "32",
  },
] as const

const DESSERT = [
  {
    name: "Tiramisù",
    desc: "espresso-dipped lady fingers, zabaglione, mascarpone, cocoa, cream",
    price: "14",
  },
  {
    name: "Tortino al Cioccolato",
    desc: "warm molten chocolate cake with a lava center, vanilla gelato",
    price: "14",
  },
  {
    name: "Vanilla Crème Brûlée",
    desc: "vanilla custard, caramelized sugar, mint",
    price: "12",
  },
  {
    name: "Espresso · single / double",
    desc: "from a Marzocco that runs all night",
    price: "3.50",
  },
] as const

const COCKTAILS = [
  {
    name: "House Martini",
    desc: "Tito's vodka or Iron City gin, blue cheese stuffed olives, peppercini",
    price: "15",
  },
  {
    name: "Espresso Martini",
    desc: "Tito's vodka, kahlua, espresso cold brew",
    price: "15",
  },
  {
    name: "Old Fashioned",
    desc: "rye, house simple, bitters, orange",
    price: "15",
  },
  {
    name: "Manhattan",
    desc: "bourbon, sweet vermouth, bitters, luxardo cherry",
    price: "15",
  },
  {
    name: "Peach Bellini",
    desc: "peach purée blend, prosecco, scoop of peaches",
    price: "14",
  },
] as const

const SEASONAL_COCKTAILS = [
  { name: "Sugar Cookie", desc: "vodka, amaretto, heavy cream", price: "14" },
  {
    name: "Spiced Kentucky Mule",
    desc: "Big Springs whiskey, ginger beer, lime, cinnamon",
    price: "13",
  },
  {
    name: "Snow Day",
    desc: "blanco tequila, crème de cacao, blue curaçao, cream",
    price: "13",
  },
  {
    name: "Poinsettia",
    desc: "prosecco, cranberry, orange liqueur",
    price: "12",
  },
] as const

const WINE_FEATURED = [
  {
    name: "Fratelli Ponte Barolo",
    region: "Piemonte · 2020",
    note: "medium-bodied, red berry, earthy undertone",
    price: "60",
  },
  {
    name: "Giovanni Rosso Barolo del Comune di Serralunga d'Alba",
    region: "Piemonte · 2017",
    note: "ripe fruit, oak, lingering dried orange",
    price: "110",
  },
  {
    name: "Rivetto Barbaresco Macarini",
    region: "Piemonte · 2018",
    note: "fresh tannin, ruby red, floral aromatics",
    price: "120",
  },
  {
    name: "Vietti Rocche di Castiglione Barolo",
    region: "Piemonte · 2017",
    note: "full-bodied, silky, rose, strawberry, raspberry",
    price: "180",
    flag: "cellar",
  },
] as const

const WINE_VARIETAL = [
  {
    name: "Duxoup Sangiovese",
    region: "California",
    note: "dried red fruit, oak, vanilla",
    price: "65",
  },
  {
    name: "Jacopo Biondi Santi Sassoalloro Sangiovese",
    region: "Tuscany",
    note: "rich fruit, silky tannin",
    price: "130",
  },
  {
    name: "Frescobaldi Castelgiocondo Brunello di Montalcino",
    region: "Tuscany",
    note: "dense tannic foundation, legendary vinification",
    price: "140",
  },
] as const

const WINE_REDS = [
  { name: "Aramis Shiraz", region: "McLaren Vale, AU", price: "40" },
  { name: "Resa Grenache", region: "Sonoma 2018", price: "60" },
  {
    name: "Rocca di Frassinello Red Blend",
    region: "Tuscany 2016",
    price: "60",
  },
  {
    name: "Bertani Amarone della Valpolicella Valpantena",
    region: "Veneto 2019",
    price: "75",
  },
  { name: "Rutherford Hill Merlot", region: "Napa 2017", price: "75" },
  { name: "Trione Red Blend", region: "Sonoma 2017", price: "90" },
  {
    name: "Eagle Eye Infatuation Red Blend",
    region: "Napa 2010",
    price: "90",
  },
  {
    name: "Bouquet de Monbrison Château",
    region: "Margaux 2017",
    price: "110",
  },
  { name: "Emeritus Pinot Noir", region: "Sonoma 2019", price: "120" },
  {
    name: "Trefethen Dragon's Tooth Red Blend",
    region: "Napa 2018",
    price: "130",
  },
  { name: "Trefethen Eschol Red Blend", region: "Napa 2019", price: "140" },
  {
    name: "Tenuta Arceno Valadornia Toscana Red Blend",
    region: "Tuscany 2016",
    price: "180",
  },
] as const

const WINE_WHITES = [
  { name: "Sal Do Chenin Blanc", region: "California 2020", price: "40" },
  { name: "Frescobaldi Pomino Bianco", region: "Tuscany 2021", price: "40" },
  { name: "Sauska Furmint", region: "Tokaj, Hungary 2020", price: "60" },
  { name: "Sauska Tokaji Aszú", region: "Tokaj, Hungary 2017", price: "60" },
  { name: "Rombauer Chardonnay", region: "Carneros, CA", price: "80" },
] as const

function Row({
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
            <span className="font-italic text-2xs tracking-[0.3em] text-sienna uppercase italic">
              {flag}
            </span>
          )}
        </div>
        {desc && (
          <div className="mt-0.5 font-italic text-base leading-snug text-ink-soft italic">
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

function Column({
  english,
  italian,
  rows,
}: {
  english: string
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
        <div className="mb-1 font-italic text-sm tracking-wide text-sienna italic">
          {italian}
        </div>
        <h3 className="font-display text-4xl text-ink">{english}</h3>
      </div>
      <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
        {rows.map((r) => (
          <Row
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

function WineRow({
  name,
  region,
  note,
  price,
  flag,
}: {
  name: string
  region: string
  note?: string
  price: string
  flag?: string
}) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-4">
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-lg text-paper/95">{name}</span>
          {flag && (
            <span className="bg-sienna-bright px-2 py-0.5 font-italic text-2xs tracking-[0.3em] text-cream uppercase italic">
              {flag}
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-baseline gap-2 font-italic text-sm text-paper/50 italic">
          <span>{region}</span>
          {note && (
            <>
              <span className="text-sienna-bright/70">·</span>
              <span className="leading-snug">{note}</span>
            </>
          )}
        </div>
      </div>
      <span className="font-serif text-base text-sienna-bright tabular-nums">
        ${price}
      </span>
    </li>
  )
}

export function Mezzo() {
  const heroParallax = useParallax(0.22)

  const wineLeftRef = useRef<HTMLDivElement>(null)
  const wineRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    for (const ref of [wineLeftRef, wineRightRef]) {
      const el = ref.current
      if (!el) continue
      const items = Array.from(el.querySelectorAll("li")) as HTMLElement[]
      items.forEach((node) => {
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
    }
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-hero min-h-[720px] w-full overflow-hidden bg-ink">
        <div ref={heroParallax} className="parallax-hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=2400&q=80"
            alt="A wood-fired pizza fresh from the oven at Mezzo"
            className="slow-zoom h-full w-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(110,31,18,0.35),transparent_60%)]" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <Link
            to="/"
            className="under flex items-center gap-2 hover:text-cream"
          >
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Floor II · 942 Penn Ave
          </span>
          <span className="flex items-center gap-2">
            second floor
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-12">
          <div className="rise mb-4 flex items-center gap-3 font-italic text-base text-cream/80 italic" style={{ animationDelay: "0.05s" }}>
            <span className="mr-1 font-display text-2xl text-cream/60">II</span>
            <span className="swash swash-white" />
            <span>trattoria</span>
          </div>
          <h1 className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream" style={{ animationDelay: "0.25s" }}>
            Mezzo
          </h1>
          <p className="rise mt-3 font-italic text-lg text-cream/80 italic" style={{ animationDelay: "0.4s" }}>
            Pizza & Charcuterie.
          </p>
          <p className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75" style={{ animationDelay: "0.55s" }}>
            Linen, candlelight, and an oven at eight hundred degrees.
            Pasta hand-rolled at noon, a wine list that speaks Piemontese.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.7s" }}>
            <a
              href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
            >
              <i className="ph ph-calendar-dots text-sm" />
              Reserve a table
              <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Roman numeral */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto flex max-w-[1600px] justify-end px-6 pb-20 lg:px-12">
              <span className="hidden font-display text-[22vw] leading-none text-cream/8 select-none lg:block">
                II
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE SHORTCUTS */}
      <nav className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-3 px-6 py-5 lg:px-12">
          <a
            href="#menu"
            className="btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"
          >
            <i className="ph ph-list-magnifying-glass text-sm" />
            View Menu
          </a>
          <Link
            to="/catering"
            className="btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"
          >
            <i className="ph ph-bag text-sm" />
            View Catering Menu
          </Link>
        </div>
      </nav>

      {/* PHILOSOPHY */}
      <section className="relative overflow-hidden bg-paper py-24">
        <div className="mx-auto grid max-w-[1600px] gap-0 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-12">
          <FadeIn>
            <div className="group relative mb-12 aspect-[4/5] overflow-hidden lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1200&q=80"
                alt="Mezzo wood-fired pizza"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="mb-1 font-serif text-2xs tracking-[0.4em] text-cream uppercase">
                  Floor II · Second Floor
                </div>
                <div className="font-display text-3xl leading-tight text-cream">
                  942 Penn Avenue
                </div>
                <div className="mt-1 font-italic text-sm text-cream/70 italic">
                  Pittsburgh, PA · Wed–Sun from 5 PM
                </div>
              </div>
              <div className="absolute top-6 left-6 bg-sienna px-3 py-1.5 font-serif text-2xs tracking-[0.35em] text-cream uppercase">
                Reservations via OpenTable
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col justify-center">
              <div className="mb-5 font-serif text-xs tracking-[0.5em] text-sienna uppercase">
                philosophy
              </div>
              <p className="font-display text-3xl leading-[1.15] text-ink md:text-4xl">
                A second floor is for
                <span className="font-italic text-sienna italic">
                  {" "}slowing down.{" "}
                </span>
                Candlelight, four courses, a bottle that lingers past the candle.
              </p>
              <div className="mt-8 flex">
                <span className="swash" />
              </div>
              <p className="mt-8 max-w-xl font-italic text-xl leading-relaxed text-ink-soft italic">
                The kitchen rolls pasta at noon and lights the wood-fired oven before dinner. The cellar is Italian-led but not Italian-only, bottles chosen for the table you're sitting at, not the spreadsheet.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
                {[
                  { k: "800°F", v: "oven temperature" },
                  { k: "90 sec", v: "average pizza bake" },
                  { k: "noon", v: "pasta rolled daily" },
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

      {/* THE OVEN */}
      <section className="relative overflow-hidden bg-ink py-14 text-paper">
        <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-12">
          <FadeIn>
            <div className="relative aspect-[3/2] overflow-hidden lg:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=1400&q=80"
                alt="Flames in a wood-fired pizza oven"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <div className="absolute right-6 bottom-6 left-6">
                <div className="font-serif text-2xs tracking-[0.4em] text-cream/80 uppercase">
                  <i className="ph-fill ph-flame mr-2 text-sienna-bright" />
                  live fire · oak & cherry
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div>
              <div className="mb-3 flex items-center gap-3 font-italic text-lg text-sienna-bright italic">
                <span className="swash" />
                the oven
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.85]">
                Eight hundred
                <br />
                <span className="font-italic text-sienna-bright italic">
                  degrees.
                </span>
              </h2>
              <p className="mt-8 max-w-md font-body text-xl leading-relaxed text-paper/85">
                A wood-fired oven from Naples, lit at four, holding eight-hundred before service. Each pizza takes ninety seconds, leopard-spotted crust, blistered edge, mozzarella that pulls in long strings.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE MENU */}
      <section id="menu" className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 text-center">
              <div className="mb-3 font-italic text-lg text-sienna italic">
                the menu
              </div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] text-ink">
                From oven,
                <br />
                <span className="font-italic text-sienna italic">
                  pan, and cellar.
                </span>
              </h2>
              <div className="mt-6 flex justify-center">
                <span className="swash" />
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            <Column english="Antipasti" italian="to begin" rows={ANTIPASTO} />
            <Column english="Wood-Fired Pizza" italian="dal forno" rows={PIZZA} />
            <Column english="Pasta" italian="hand-rolled at noon" rows={PASTA} />
            <Column english="Mains" italian="secondi" rows={MAINS} />
            <Column english="Dessert" italian="dolci" rows={DESSERT} />
            <FadeIn>
              <div>
                <div className="mb-2">
                  <div className="mb-1 font-italic text-sm tracking-wide text-sienna italic">
                    cocktails
                  </div>
                  <h3 className="font-display text-4xl text-ink">House Bar</h3>
                </div>
                <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
                  {COCKTAILS.map((c) => (
                    <Row key={c.name} {...c} />
                  ))}
                </ul>
                <div className="mt-10">
                  <div className="mb-1 font-italic text-sm tracking-wide text-sienna italic">
                    seasonal
                  </div>
                  <h4 className="font-display text-2xl text-ink">
                    Right now, on the chalkboard
                  </h4>
                  <ul className="mt-4 divide-y divide-ink/10 border-t border-b border-ink/10">
                    {SEASONAL_COCKTAILS.map((c) => (
                      <Row key={c.name} {...c} />
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WINE LIST */}
      <section className="relative overflow-hidden bg-ink py-28 text-paper">
        <div className="relative mx-auto max-w-[1300px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-3 font-italic text-lg text-sienna-bright italic">
                  <i className="ph-duotone ph-wine text-2xl" />
                  la cantina · the cellar
                </div>
                <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.9]">
                  Ninety bottles.{" "}
                  <span className="font-italic text-sienna-bright italic">
                    Four Barolos.
                  </span>
                </h2>
              </div>
              <p className="max-w-md font-italic text-lg leading-relaxed text-paper/75 italic">
                Ninety bottles, four Barolos, three Brunellos, and a Hungarian
                Tokaji that the sommelier won't shut up about. By the glass
                changes weekly, ask.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2">
            <div ref={wineLeftRef}>
              <div className="mb-4 flex items-baseline justify-between border-b border-paper/20 pb-3">
                  <div>
                    <div className="font-italic text-sm text-sienna-bright italic">
                      featured imports
                    </div>
                    <h3 className="font-display text-3xl">Barolo & Barbaresco</h3>
                  </div>
                  <span className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
                    Piemonte
                  </span>
                </div>
                <ul className="divide-y divide-paper/10">
                  {WINE_FEATURED.map((w) => (
                    <WineRow key={w.name} {...w} />
                  ))}
                </ul>

                <div className="mt-12 mb-4 flex items-baseline justify-between border-b border-paper/20 pb-3">
                  <div>
                    <div className="font-italic text-sm text-sienna-bright italic">
                      varietal showcase
                    </div>
                    <h3 className="font-display text-3xl">
                      Sangiovese & Brunello
                    </h3>
                  </div>
                  <span className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
                    Tuscany · CA
                  </span>
                </div>
                <ul className="divide-y divide-paper/10">
                  {WINE_VARIETAL.map((w) => (
                    <WineRow key={w.name} {...w} />
                  ))}
                </ul>

                <div className="mt-12 mb-4 flex items-baseline justify-between border-b border-paper/20 pb-3">
                  <div>
                    <div className="font-italic text-sm text-sienna-bright italic">
                      bianchi
                    </div>
                    <h3 className="font-display text-3xl">Whites & Rosé</h3>
                  </div>
                </div>
                <ul className="divide-y divide-paper/10">
                  {WINE_WHITES.map((w) => (
                    <WineRow key={w.name} {...w} />
                  ))}
                </ul>
            </div>

            <div ref={wineRightRef}>
                <div className="mb-4 flex items-baseline justify-between border-b border-paper/20 pb-3">
                  <div>
                    <div className="font-italic text-sm text-sienna-bright italic">
                      rossi
                    </div>
                    <h3 className="font-display text-3xl">The Long Red List</h3>
                  </div>
                  <span className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
                    IT · FR · CA
                  </span>
                </div>
                <ul className="divide-y divide-paper/10">
                  {WINE_REDS.map((w) => (
                    <WineRow key={w.name} {...w} />
                  ))}
                </ul>

                <div className="mt-12 rounded-none border border-paper/15 bg-paper/[0.03] p-6">
                  <div className="font-italic text-sm text-sienna-bright italic">
                    on tap · sparkling
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl">
                      Italian Sparkling Red
                    </span>
                    <span className="font-serif text-base text-cream tabular-nums">
                      $60
                    </span>
                  </div>
                  <p className="mt-2 font-italic text-sm text-paper/70 italic">
                    Lambrusco-style, on bottle. Goes with everything that came out
                    of the wood oven.
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATIONS BAND */}
      <section className="relative overflow-hidden bg-sienna-deep text-cream">
        <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-start lg:px-12">
          {/* Left: CTA */}
          <FadeIn>
            <div className="pt-0 lg:pt-2">
              <div className="mb-3 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
                the only reservation in the building
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.9]">
                Book a table on Floor II.
              </h2>
              <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-cream/80">
                Mezzo takes reservations through OpenTable, seven days out. Bar
                seats are walk-in. Larger parties of six or more, call us directly.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-lift group inline-flex items-center gap-2 bg-cream px-6 py-3 font-serif text-xs tracking-[0.25em] text-sienna uppercase transition-colors hover:bg-paper"
                >
                  <i className="ph ph-calendar-dots text-sm" />
                  Reserve on OpenTable
                  <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="tel:14122812810"
                  className="btn-lift inline-flex items-center gap-2 border border-cream/50 px-6 py-3 font-serif text-xs tracking-[0.25em] uppercase transition-colors hover:bg-cream/10"
                >
                  <i className="ph ph-phone text-sm" />
                  412.281.2810
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Right: Hours */}
          <FadeIn delay={0.12}>
            <div className="border-t border-cream/20 pt-12 lg:border-t-0 lg:border-l lg:border-l-cream/20 lg:pl-12 lg:pt-2">
              <div className="mb-5 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
                Hours · Floor II
              </div>
              <ul className="divide-y divide-cream/15">
                {[
                  { d: "Wed", h: "5:00 → 9:30 PM" },
                  { d: "Thu", h: "5:00 → 10:00 PM" },
                  { d: "Fri", h: "5:00 → 11:00 PM" },
                  { d: "Sat", h: "4:30 → 11:00 PM" },
                  { d: "Sun", h: "4:30 → 9:30 PM" },
                  { d: "Mon – Tue", h: "Closed" },
                ].map((row) => (
                  <li key={row.d} className="flex items-baseline gap-4 py-3">
                    <span className="w-20 font-serif text-xs tracking-[0.2em] text-cream/70 uppercase">
                      {row.d}
                    </span>
                    <span className="font-italic text-sm text-cream/85 italic tabular-nums">
                      {row.h}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-italic text-xs leading-relaxed text-cream/55 italic">
                Last seating 30 min before close. Bar pours later.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA STRIP, climb to the roof */}
      <section className="relative bg-paper">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <FadeIn>
              <div className="mb-2 font-italic text-base text-sienna italic">
                second floor · II
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <h3 className="font-display text-5xl leading-[0.9] text-ink">
                Two more flights to
                <br />
                <span className="font-italic text-sienna italic">the roof.</span>
              </h3>
            </FadeIn>
          </div>
          <FadeIn delay={0.24}>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/emporio"
                className="btn-lift group inline-flex items-center gap-3 border border-ink/30 px-7 py-4 font-serif text-sm tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
              >
                <i className="ph ph-arrow-down text-lg" />
                Back to Emporio
              </Link>
              <Link
                to="/tetto"
                className="btn-lift group inline-flex items-center gap-3 bg-ink px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-deep"
              >
                Climb to Il Tetto
                <i className="ph ph-arrow-up text-lg" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
