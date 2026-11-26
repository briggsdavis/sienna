import { useEffect, useRef } from "react"
import hoagiePhoto from "@/assets/emporio-hoagie.jpg"
import { EImage, ELink, EText, PageContent, useEditMode } from "@/components/editable"
import { EmporioSauces } from "@/components/emporio-sauces"
import { EmporioSpecials } from "@/components/emporio-specials"
import { FloorIntro } from "@/components/floor-intro"
import { HappyHour } from "@/components/happy-hour"
import { RestaurantHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import { ParallaxImage } from "@/components/parallax-image"
import { useSettings } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { BALL_TYPES, HAPPY_HOUR_DEALS, STATS } from "@/content/emporio"
import { useScrollCorners } from "@/hooks/use-scroll-corners"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Daily Specials", icon: "ph-star", href: "#specials" },
  { label: "Menu", icon: "ph-list-magnifying-glass", href: FLOORS.emporio.menuHref },
  { label: "Happy Hour", icon: "ph-clock", href: "#happy-hour" },
  { label: "Catering", icon: "ph-bag", href: "/catering" },
]

const BALL_STRIPS = [
  { direction: "up", order: [0, 1, 2, 3, 4] },
  { direction: "down", order: [4, 2, 0, 3, 1] },
] as const

const BOWL_SECTIONS = [
  { label: "Pick a base", href: "#bases" },
  { label: "Choose your meatballs", href: "#five-balls" },
  { label: "Choose a sauce", href: "#sauces" },
] as const

const MEATBALL_PHOTO = unsplash("1529042410759-befb1204b468", 650, 80)
const FEATURED_MEATBALL_PHOTO = unsplash("1574484284002-952d92456975", 650, 80)

const BASES = [
  {
    id: "hoagie",
    name: "Meatball Hoagie",
    description: "Three meatballs on a hoagie roll with your choice of house-made sauce.",
    image: hoagiePhoto,
    alt: "Meatballs and melted cheese on a hoagie roll",
  },
  {
    id: "bowl",
    name: "Meatball Bowl",
    description:
      "Three meatballs and your choice of sauce over a base like spaghetti or mac and cheese.",
    image: unsplash("1714383611462-f730359f9145", 1200, 80),
    alt: "Spaghetti and meatballs in tomato sauce",
  },
] as const

const JSON_LD = restaurantJsonLd({
  name: "Emporio at Sienna Mercato",
  path: FLOORS.emporio.href,
  menuPath: FLOORS.emporio.menuHref,
  reservations: false,
})

export function Emporio() {
  const page = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layers = page.current?.querySelectorAll<HTMLElement>("[data-emporio-parallax]")
    if (!layers?.length) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      frame = 0
      const middle = window.innerHeight / 2
      for (const layer of layers) {
        const bounds = layer.parentElement?.getBoundingClientRect()
        if (!bounds || motion.matches) {
          layer.style.translate = ""
          continue
        }
        const offset = (middle - bounds.top - bounds.height / 2) * 0.12
        layer.style.translate = `0 ${Math.max(-48, Math.min(48, offset))}px`
      }
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <PageContent page="emporio">
      <div ref={page} className="type-emporio relative">
        <Seo path="/emporio" {...PAGE_SEO["/emporio"]} jsonLd={JSON_LD} />
        <Hero />
        <div className="relative isolate overflow-hidden bg-linear-to-b from-sienna to-sienna-bright">
          <img
            src={FLOORS.emporio.logo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-[-9%] w-[clamp(23rem,60vw,65rem)] max-w-none -translate-y-1/2 -rotate-12 opacity-[0.07] brightness-0 invert"
          />
          <PageShortcuts shortcuts={SHORTCUTS} tone="sienna" />
          <FloorIntro
            tone="sienna"
            image={
              <EImage k="intro.image" d={unsplash("1529042410759-befb1204b468", 1200, 80)}>
                {(src) => (
                  <ParallaxImage
                    src={src}
                    alt="Emporio meatballs"
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                    speed={0.12}
                  />
                )}
              </EImage>
            }
            statement={
              <>
                <EText k="intro.statement1" d="The meatball is sacred." />
                <span>
                  {" "}
                  <EText k="intro.statement2" d="Everything else" />{" "}
                </span>
                <EText k="intro.statement3" d="is a delivery system, bun, bowl, hoagie, fork." />
              </>
            }
            body={
              <>
                <EText
                  k="intro.body"
                  d="We grind the meat in-house. We roll by hand at noon. The sauce list runs ten deep so the same ball can be a different dinner ten nights running."
                />
                <span id="reserve" className="mt-3 block scroll-mt-28">
                  <EText
                    k="intro.walkIns"
                    d="Walk-ins are welcome on a first-come, first-served basis."
                  />
                </span>
              </>
            }
            stats={STATS}
          />
        </div>
        <EmporioSpecials />
        <BowlGuide />
        <Bases />
        <Balls />
        <EmporioSauces />
        <BallOfTheMonth />
        <HappyHour
          title={<EText k="happy.title" d="Happy Hour." />}
          titleSize="text-[clamp(3rem,calc(7vw*var(--site-type-scale)),5.5rem)]"
          body={
            <EText
              k="happy.body"
              d="Tuesday through Friday, 4:30 to 6:30. Half off the things that matter, full price on the espresso martinis, except they're $5."
            />
          }
          schedule={<EText k="happy.schedule" d="Tue to Fri, 4:30 to 6:30 PM" />}
          deals={HAPPY_HOUR_DEALS}
          dealsDelay={0.15}
        />
        <ClosingStrip />
      </div>
    </PageContent>
  )
}

function Hero() {
  const settings = useSettings()
  return (
    <EImage k="hero.image" d={unsplash("1529042410759-befb1204b468", 2400, 80)}>
      {(src) => (
        <RestaurantHero
          floor={FLOORS.emporio}
          image={{ src, alt: "A platter of meatballs in red sauce" }}
        >
          {settings && (
            <ELink
              k="hero.orderLink"
              label="Order pickup"
              href={settings.orderUrl}
              className="btn-lift group bg-paper text-ink hover:bg-cream"
            >
              {(label) => (
                <>
                  <i className="ph ph-bag text-sm" />
                  {label}
                  <i className="ph ph-arrow-up-right text-xs" />
                </>
              )}
            </ELink>
          )}
          <ELink
            k="hero.menuLink"
            label="View the menu"
            href={FLOORS.emporio.menuHref}
            className="btn-lift group border border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
          >
            {(label) => (
              <>
                <i className="ph ph-list-magnifying-glass text-sm" />
                {label}
              </>
            )}
          </ELink>
        </RestaurantHero>
      )}
    </EImage>
  )
}

function BowlGuide() {
  return (
    <section
      aria-labelledby="emporio-bowl-guide-title"
      className="overflow-hidden bg-cream py-20 text-center text-ink md:py-28"
    >
      <div data-emporio-parallax className="site-container">
        <h2
          id="emporio-bowl-guide-title"
          className="font-display text-[clamp(3rem,7vw,6.75rem)] leading-none"
        >
          <EText k="bowlGuide.title" d="Build Your Own Bowl" />
        </h2>
        <nav
          aria-label="Build your own bowl steps"
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {BOWL_SECTIONS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="btn-lift border border-ink/25 text-ink hover:border-sienna hover:bg-sienna hover:text-cream"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}

function Bases() {
  const region = useScrollCorners<HTMLElement>(BASES)

  return (
    <section
      ref={region}
      id="bases"
      aria-labelledby="emporio-bases-title"
      className="scroll-mt-16 overflow-hidden bg-paper py-16 text-ink md:py-24"
    >
      <div data-emporio-parallax className="site-container">
        <h2 id="emporio-bases-title" className="font-display text-5xl leading-none md:text-7xl">
          <EText k="bases.title" d="Pick a base" />
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-8">
          {BASES.map((base) => (
            <article key={base.id} className="relative">
              <EImage k={`bases.${base.id}.image`} d={base.image}>
                {(src) => (
                  <>
                    <div
                      data-scroll-corners
                      className="relative aspect-[8/5] overflow-hidden bg-paper-deep"
                    >
                      <ParallaxImage src={src} alt={base.alt} speed={0.14} loading="lazy" />
                    </div>
                    <h3 className="mt-5 font-display text-3xl leading-tight md:text-4xl">
                      <EText k={`bases.${base.id}.name`} d={base.name} />
                    </h3>
                    <p className="mt-2 max-w-md font-body text-base text-ink-soft">
                      <EText k={`bases.${base.id}.description`} d={base.description} />
                    </p>
                  </>
                )}
              </EImage>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Balls() {
  const { editing } = useEditMode()

  return (
    <section
      id="five-balls"
      aria-labelledby="emporio-balls-title"
      className="scroll-mt-16 bg-sienna"
    >
      <div className="relative isolate grid overflow-hidden bg-linear-to-b from-sienna-deep via-sienna to-sienna-bright text-cream motion-safe:lg:min-h-svh">
        <img
          src={FLOORS.emporio.logo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[-12%] w-[clamp(22rem,57vw,65rem)] max-w-none -translate-y-1/2 -rotate-12 opacity-[0.07] brightness-0 invert"
        />
        <div
          data-emporio-parallax
          className="relative z-10 site-container grid items-center pt-14 pb-12 lg:grid-cols-[1.05fr_1fr] lg:py-16"
        >
          <div className="lg:col-start-2 lg:max-w-2xl">
            <h2
              id="emporio-balls-title"
              className="font-sans text-[clamp(3rem,calc(8.6vw*var(--site-type-scale)),7rem)] leading-[0.93] font-black tracking-tight"
            >
              <EText k="balls.title" d="Five balls." />
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed uppercase lg:text-lg">
              <EText
                k="balls.body"
                d="Pick any combination. Three to a hoagie, three to a bowl, six on a plate of six over polenta."
              />
            </p>
          </div>
        </div>

        <div className={`site-container pb-12${editing ? "" : " emporio-balls-art-animated"}`}>
          {BALL_STRIPS.map(({ direction, order }) => (
            <div
              key={direction}
              className="emporio-balls-strip"
              data-direction={direction}
              inert={direction === "down"}
            >
              <div className="emporio-balls-track">
                {[false, true].map((copy) => (
                  <ul
                    key={String(copy)}
                    className={`emporio-balls-cards${copy ? " emporio-balls-copy" : ""}`}
                    inert={copy}
                  >
                    {order.map((index) => {
                      const ball = BALL_TYPES[index]
                      return (
                        <li key={ball.name} className="bg-white p-1.5 text-ink shadow-lg">
                          <img
                            src={ball.featured ? FEATURED_MEATBALL_PHOTO : MEATBALL_PHOTO}
                            alt=""
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover"
                          />
                          <div className="px-1.5 py-2.5 font-sans">
                            <div className="text-sm leading-tight font-medium uppercase">
                              <EText k={`balls.${index}.name`} d={ball.name} />
                            </div>
                            <div className="mt-1 text-xs leading-tight text-ink-soft">
                              <EText k={`balls.${index}.sub`} d={ball.sub} />
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BallOfTheMonth() {
  return (
    <section
      aria-labelledby="emporio-month-title"
      className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-sienna-deep px-6 py-20 text-cream md:py-24"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <EImage k="botm.background" d={unsplash("1775595712043-50ae4b305124", 2200, 80)}>
          {(src) => <ParallaxImage src={src} alt="" speed={0.2} loading="lazy" />}
        </EImage>
      </div>
      <div
        data-emporio-parallax
        className="relative isolate grid w-full max-w-[55rem] items-center gap-6 overflow-hidden bg-sienna p-6 sm:grid-cols-2 sm:p-9 lg:gap-7 lg:p-12"
      >
        <img
          src={FLOORS.emporio.logo}
          alt=""
          className="pointer-events-none absolute -right-[8%] -bottom-[26%] -z-10 w-[min(85%,31rem)] max-w-none -rotate-12 opacity-[0.1] brightness-0 invert sm:w-[55%]"
        />
        <div className="relative aspect-square overflow-hidden bg-sienna-deep">
          <EImage k="botm.image" d={unsplash("1529042410759-befb1204b468", 1500, 85)}>
            {(src) => (
              <ParallaxImage src={src} alt="A bowl of meatballs" speed={0.13} loading="lazy" />
            )}
          </EImage>
        </div>
        <div className="font-sans">
          <h2
            id="emporio-month-title"
            className="text-[clamp(2.25rem,4.9vw,4.8rem)] leading-[0.95] font-black tracking-tight"
          >
            <EText k="botm.title" d="Dragon Ball" />
          </h2>
          <p className="mt-3 text-xl font-semibold">
            <EText k="botm.price" d="$14" />
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-cream/95 uppercase">
            <EText
              k="botm.body"
              d="House-made meatballs fried golden and glazed with sweet chili, sesame, and scallions."
            />
          </p>
        </div>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-ink text-paper">
      <div
        data-emporio-parallax
        className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12"
      >
        <h3 className="font-display text-5xl leading-[0.9]">
          <EText k="closing.title" d="Show up hungry." />
          <br />
          <span>
            <EText k="closing.titleAccent" d="Leave slower." />
          </span>
        </h3>
        <div className="btn-pair">
          <ELink
            k="closing.menu"
            label="See the menu"
            href={FLOORS.emporio.menuHref}
            className="btn-lift group bg-cream text-sienna hover:bg-paper"
          >
            {(label) => (
              <>
                <i className="ph ph-list-magnifying-glass text-lg" />
                {label}
              </>
            )}
          </ELink>
          <ELink
            k="closing.up"
            label="Climb to Mezzo"
            href="/mezzo"
            className="btn-lift group border border-cream/60 hover:bg-cream/10"
          >
            {(label) => (
              <>
                {label}
                <i className="ph ph-arrow-up text-lg" />
              </>
            )}
          </ELink>
        </div>
      </div>
    </section>
  )
}
