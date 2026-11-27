import { useEffect, useRef } from "react"
import { DailySpecials } from "@/components/daily-specials"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { HappyHour } from "@/components/happy-hour"
import { RestaurantHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import { ParallaxImage } from "@/components/parallax-image"
import { ReservationPanel } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { RooftopDrinks, TettoDrinkModel } from "@/components/tetto-drinks"
import { FEATURED_DRAFT, HAPPY_HOUR_DEALS, HOURS, STATS } from "@/content/tetto"
import { useScrollCorners } from "@/hooks/use-scroll-corners"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Daily Specials", icon: "ph-star", href: "#specials" },
  { label: "Food & Drafts", icon: "ph-beer-stein", href: FLOORS.tetto.menuHref },
  { label: "Happy Hour", icon: "ph-clock", href: "#happy-hour" },
]

const BEER_MODEL = ["beer"] as const

const JSON_LD = restaurantJsonLd({
  name: "Il Tetto Rooftop at Sienna Mercato",
  path: FLOORS.tetto.href,
  menuPath: FLOORS.tetto.menuHref,
  reservations: false,
})

export function Tetto() {
  return (
    <PageContent page="tetto">
      <div className="type-tetto relative">
        <Seo path="/tetto" {...PAGE_SEO["/tetto"]} jsonLd={JSON_LD} />
        <Hero />
        <div className="relative isolate overflow-hidden bg-linear-to-b from-sienna to-sienna-deep">
          <img
            src={FLOORS.tetto.logo}
            alt=""
            className="pointer-events-none absolute top-1/2 right-[-9%] w-[clamp(16rem,42vw,45.5rem)] max-w-none -translate-y-1/2 -rotate-12 opacity-[0.07] brightness-0 invert"
          />
          <PageShortcuts shortcuts={SHORTCUTS} tone="sienna" />
          <FloorIntro
            tone="sienna"
            scrollCorners
            image={
              <EImage k="intro.image" d={unsplash("1414235077428-338989a2e8c0", 1200, 80)}>
                {(src) => (
                  <ParallaxImage
                    src={src}
                    alt="Il Tetto rooftop"
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                    speed={0.12}
                  />
                )}
              </EImage>
            }
            statement={<EText k="intro.title" d="The view is the menu." />}
            body={
              <EText
                k="intro.body"
                d="No reservations, no dress code, no ceremony. The retractable roof opens when the forecast agrees. Thirty drafts on the chalkboard, whole pies riding the dumbwaiter up from below, the Pittsburgh skyline doing the rest."
              />
            }
            stats={STATS}
          />
        </div>
        <RooftopDrinks />
        <div id="specials" className="scroll-mt-16 bg-paper">
          <DailySpecials restaurant="tetto" id="rooftop-daily-specials" hideWhenEmpty />
        </div>
        <BeerOfTheMonth />
        <HappyHour
          tone="paper"
          title={<EText k="happy.title" d="Sunset hour." />}
          titleSize="text-[clamp(2.2rem,calc(5.5vw*var(--site-type-scale)),5rem)]"
          body={
            <EText
              k="happy.body"
              d="Tuesday through Friday, 4:30 to 6:30, golden hour, half-price everything that matters. Best seats on the roof go fast."
            />
          }
          schedule={<EText k="happy.schedule" d="Tue to Fri, 4:30 to 6:30 PM" />}
          deals={HAPPY_HOUR_DEALS}
          dealsDelay={0.12}
        />
        <WeatherAndHours />
        <ClosingStrip />
      </div>
    </PageContent>
  )
}

function Hero() {
  return (
    <EImage k="hero.image" d={unsplash("1563138216-f4d79398013c", 2400, 80)}>
      {(src) => (
        <RestaurantHero
          floor={FLOORS.tetto}
          image={{
            src,
            alt: "Groups of friends at tables on a rooftop terrace under string lights at dusk",
          }}
        >
          <ELink
            k="hero.menuLink"
            label="Food & drafts"
            href={FLOORS.tetto.menuHref}
            className="btn-lift bg-paper text-ink hover:bg-cream"
          >
            {(label) => (
              <>
                <i className="ph ph-beer-stein text-sm" />
                {label}
              </>
            )}
          </ELink>
        </RestaurantHero>
      )}
    </EImage>
  )
}

function BeerOfTheMonth() {
  const card = useRef<HTMLDivElement>(null)
  const section = useScrollCorners<HTMLElement>(undefined)

  // The card starts at 70% size and grows to full as the section scrolls into view.
  useEffect(() => {
    const el = section.current
    const panel = card.current
    if (!el || !panel) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      const grow = motion.matches ? 1 : Math.min(1, Math.max(0, (vh - top) / vh))
      const eased = grow * grow * (3 - 2 * grow)
      panel.style.setProperty("--botm-scale", (0.7 + 0.3 * eased).toFixed(4))
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
  }, [section])

  return (
    <section
      ref={section}
      aria-labelledby="tetto-month-title"
      className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-sienna-deep px-6 py-20 text-cream md:py-24"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <EImage k="botm.image" d={unsplash("1747003389183-86aaf6c9189b", 2200, 80)}>
          {(src) => <ParallaxImage src={src} alt="" speed={0.2} loading="lazy" />}
        </EImage>
      </div>
      <div
        ref={card}
        data-scroll-corners
        data-scroll-corners-max="48"
        className="botm-card relative isolate grid w-full max-w-[55rem] items-center gap-5 overflow-hidden bg-sienna p-6 sm:grid-cols-2 sm:p-9 lg:gap-7 lg:p-12"
      >
        <img
          src={FLOORS.tetto.logo}
          alt=""
          className="pointer-events-none absolute -right-[8%] -bottom-[26%] -z-10 w-[min(85%,31rem)] max-w-none -rotate-12 opacity-[0.1] brightness-0 invert sm:w-[55%]"
        />
        <TettoDrinkModel
          shapes={BEER_MODEL}
          pointerArea={card}
          icon="ph-beer-stein"
          className="tetto-month-beer aspect-square"
        />
        <div className="font-sans">
          <p className="mb-3 text-sm font-semibold tracking-wider uppercase">
            <EText k="botm.kicker" d="Beer of the Month" />
          </p>
          <h2
            id="tetto-month-title"
            className="text-[clamp(2.25rem,4.9vw,4.8rem)] leading-[0.95] font-black tracking-tight"
          >
            <EText k="botm.title" d={FEATURED_DRAFT.name} />
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/95">
            <EText k="botm.body" d={FEATURED_DRAFT.notes} />
          </p>
          <p className="mt-4 text-sm font-semibold text-cream/85">
            <EText
              k="botm.detail"
              d={`${FEATURED_DRAFT.brewery} • ${FEATURED_DRAFT.style} • ${FEATURED_DRAFT.abv} ABV • ${FEATURED_DRAFT.ibu} IBU`}
            />
          </p>
        </div>
      </div>
    </section>
  )
}

function WeatherAndHours() {
  return (
    <section id="reserve" className="relative scroll-mt-20 bg-paper py-24">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-2 lg:px-12">
        <FadeIn>
          <div>
            <h2 className="font-display text-[clamp(2.5rem,calc(5vw*var(--site-type-scale)),4.5rem)] leading-[0.9] text-ink">
              <EText k="weather.title" d="We open the roof" />
              <br />
              <span className="text-sienna">
                <EText k="weather.titleAccent" d="when the sky lets us." />
              </span>
            </h2>
            <p className="mt-6 mb-8 max-w-md font-body text-lg leading-relaxed text-ink-soft">
              <EText
                k="weather.body"
                d="The retractable roof closes for rain, high wind, or surprise snow. When it's closed we keep the heaters on, but the view goes away. Call the host stand before climbing if you're chasing a specific view."
              />
            </p>
            <ReservationPanel restaurant="tetto" tone="light" />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div>
            <div className="mb-6 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
              Hours
            </div>
            <ul className="divide-y divide-ink/10 border-t border-b border-ink/10">
              {HOURS.map((row, i) => (
                <li key={row.day} className="flex items-baseline gap-5 py-4">
                  <span className="w-24 font-serif text-sm tracking-[0.2em] text-ink uppercase">
                    <EText k={`hours.${i}.day`} d={row.day} />
                  </span>
                  <span className="font-body text-sm text-ink-soft tabular-nums">
                    <EText
                      k={`hours.${i}.time`}
                      d={"close" in row ? `${row.open} to ${row.close}` : row.open}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-paper text-ink">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <FadeIn delay={0.12}>
          <h3 className="font-display text-5xl leading-[0.9]">
            <EText k="closing.title" d="You've reached" />
            <br />
            <span>
              <EText k="closing.titleAccent" d="the top." />
            </span>
          </h3>
        </FadeIn>
        <FadeIn delay={0.24} className="w-full max-w-[26rem]">
          <div className="btn-pair">
            <ELink
              k="closing.down"
              label="Down to Mezzo"
              href="/mezzo"
              className="btn-lift group border border-ink/30 text-ink hover:bg-ink/5"
            >
              {(label) => (
                <>
                  <i className="ph ph-arrow-down text-lg" />
                  {label}
                </>
              )}
            </ELink>
            <ELink
              k="closing.home"
              label="All of Sienna"
              href="/"
              className="btn-lift group bg-sienna text-cream hover:bg-sienna-deep"
            >
              {(label) => (
                <>
                  {label}
                  <i className="ph ph-arrow-up-right text-lg" />
                </>
              )}
            </ELink>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
