import { Link } from "react-router"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { HappyHour } from "@/components/happy-hour"
import { FloorHeroIntro, PageHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import { DRAFTS, FEATURED_DRAFT, FOOD, HAPPY_HOUR_DEALS, HOURS, STATS } from "@/content/tetto"
import type { MenuItem } from "@/content/types"
import { useStaggerReveal } from "@/hooks/use-reveal"
import { FLOORS, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Food Menu", icon: "ph-pizza", href: "#menu" },
  { label: "Drinks Menu", icon: "ph-beer-stein", href: "#chalkboard" },
  { label: "Happy Hour", icon: "ph-clock", href: "#happy-hour" },
]

export function Tetto() {
  return (
    <div className="relative">
      <Hero />
      <PageShortcuts shortcuts={SHORTCUTS} />
      <FloorIntro
        image={
          <img
            src={unsplash("1414235077428-338989a2e8c0", 1200, 80)}
            alt="Il Tetto rooftop"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        }
        floorLabel="Floor III · Rooftop"
        hours="Pittsburgh, PA · Thu–Sun from 4 PM"
        badge="Walk-in only · no reservations"
        badgeClassName="bg-ink"
        statement={
          <>
            The view is the menu.
            <span className="font-italic text-sienna italic"> Everything else </span>
            is cold pints and good company.
          </>
        }
        body="No reservations, no dress code, no ceremony. The retractable roof opens when the forecast agrees. Thirty drafts on the chalkboard, whole pies riding the dumbwaiter up from below, the Pittsburgh skyline doing the rest."
        stats={STATS}
      />
      <Chalkboard />
      <BeerOfTheMonth />
      <FoodMenu />
      <HappyHour
        title="Sunset hour."
        titleSize="text-[clamp(2.2rem,5.5vw,5rem)]"
        body="Tuesday through Friday, 4:30 → 6:30, golden hour, half-price everything that matters. Best seats on the roof go fast."
        schedule="Tue → Fri · 4:30 → 6:30 PM"
        deals={HAPPY_HOUR_DEALS}
        dealsDelay={0.12}
      />
      <WeatherAndHours />
      <ClosingStrip />
    </div>
  )
}

function Hero() {
  return (
    <PageHero
      image={{
        src: unsplash("1414235077428-338989a2e8c0", 2400, 80),
        alt: "The Il Tetto rooftop at golden hour, with the Pittsburgh skyline behind",
      }}
      overlay={<div className="absolute inset-0 bg-black/72" />}
      meta={
        <div className="absolute top-24 right-0 left-0 z-10 mx-auto hidden max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase sm:flex lg:px-12">
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
      }
      numeral="III"
      bottomPadding="pb-24"
    >
      <FloorHeroIntro
        floor={FLOORS.tetto}
        tagline="rooftop beer garden"
        subtitle="Rooftop Beer Garden."
        blurb="Thirty drafts on a chalkboard. A retractable roof that opens when the sky agrees. The skyline of a triangular city, lit from below, over your last pint of the night."
      />
      <div
        className="rise mt-10 flex items-center gap-4 font-serif text-xs tracking-[0.3em] text-cream/55 uppercase"
        style={{ animationDelay: "0.82s" }}
      >
        <i className="ph ph-stairs text-sm text-cream/50" />
        No reservations · climb the stairs
      </div>
    </PageHero>
  )
}

function Chalkboard() {
  const listRef = useStaggerReveal<HTMLUListElement>()

  return (
    <section id="chalkboard" className="relative bg-paper py-28">
      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3 font-serif text-lg text-sienna">
                <i className="ph ph-chalkboard-simple text-2xl" />
                tonight on tap
              </div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.85] text-ink">
                The chalkboard.
              </h2>
            </div>
            <p className="max-w-md font-body text-lg leading-relaxed text-ink-soft">
              Thirty rotating lines. Local first, then everywhere else. We update Untappd every
              morning, but the bartender's the source of truth.
            </p>
          </div>
        </FadeIn>

        <div className="border-[10px] border-[#3a2a1a] bg-ink shadow-[0_30px_60px_-20px_rgba(26,18,11,0.5)]">
          <ul ref={listRef}>
            {DRAFTS.map((draft, i) => (
              <DraftRow key={draft.name} number={String(i + 1).padStart(2, "0")} {...draft} />
            ))}
            <li className="px-6 py-6 text-center sm:px-8">
              <span className="font-body text-paper/55">
                + 17 more on rotation · ask the bartender
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
  )
}

function DraftRow({
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
        <span className="w-10 font-display text-2xl text-cream/40 tabular-nums">{number}</span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="font-display text-2xl text-cream">{name}</h3>
            {flag && (
              <span className="bg-sienna-bright px-2 py-0.5 font-serif text-2xs tracking-[0.3em] text-cream uppercase">
                {flag}
              </span>
            )}
          </div>
          <div className="mt-1 font-body text-sm text-paper/55">
            {brewery} · <span>{origin}</span>
            <span className="text-paper/30"> · </span>
            {style}
          </div>
        </div>
        <span className="font-serif text-base text-paper/55 tabular-nums">{abv}</span>
      </div>
    </li>
  )
}

function BeerOfTheMonth() {
  return (
    <section className="relative bg-ink py-16 text-paper">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="grid overflow-hidden lg:grid-cols-[1fr_2fr]">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <img
                src={unsplash("1535958636474-b021ee887b13", 1400, 80)}
                alt="A pint of Big Wave blonde ale"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center bg-paper/[0.04] p-8 lg:p-12">
              <div className="mb-2 font-serif text-base text-sienna-bright">
                beer of the month · may
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.9]">
                {FEATURED_DRAFT.name}
              </h2>
              <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-paper/80">
                {FEATURED_DRAFT.notes}
              </p>
              <div className="mt-6 flex flex-wrap gap-6 font-serif text-xs tracking-[0.3em] text-paper/55 uppercase">
                <span>{FEATURED_DRAFT.brewery}</span>
                <span>{FEATURED_DRAFT.style}</span>
                <span>{FEATURED_DRAFT.abv} ABV</span>
                <span>{FEATURED_DRAFT.ibu} IBU</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function FoodMenu() {
  const listRef = useStaggerReveal<HTMLUListElement>()

  return (
    <section id="menu" className="relative bg-cream py-28">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
            <div>
              <div className="mb-3 font-serif text-lg text-sienna">eat on the roof</div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.85] text-ink">
                Whole pies,
                <br />
                <span className="font-italic text-sienna italic">pulled hot.</span>
              </h2>
            </div>
            <p className="max-w-md font-body text-lg leading-relaxed text-ink-soft">
              The rooftop kitchen runs a tight bar menu, whole pies from the wood oven below, the
              meatball hoagie, fries that have business being on a roof.
            </p>
          </div>
        </FadeIn>

        <ul ref={listRef} className="divide-y divide-ink/10 border-t border-b border-ink/10">
          {FOOD.map((item) => (
            <FoodRow key={item.name} {...item} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function FoodRow({ name, desc, price }: MenuItem) {
  return (
    <li className="flex items-baseline gap-3 py-4">
      <div className="flex-1">
        <div className="font-serif text-xl text-ink">{name}</div>
        <div className="mt-0.5 font-body text-base text-ink-soft">{desc}</div>
      </div>
      <span className="font-serif text-lg text-sienna tabular-nums">${price}</span>
    </li>
  )
}

function WeatherAndHours() {
  return (
    <section className="relative bg-paper py-24">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-2 lg:px-12">
        <FadeIn>
          <div>
            <div className="mb-3 font-serif text-lg text-sienna">il tempo · the weather</div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] text-ink">
              We open the roof
              <br />
              <span className="font-italic text-sienna italic">when the sky lets us.</span>
            </h2>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
              The retractable roof closes for rain, high wind, or surprise snow. When it's closed we
              keep the heaters on, but the view goes away. Call the host stand before climbing if
              you're chasing a specific view.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div>
            <div className="mb-6 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
              Hours · Floor III
            </div>
            <ul className="divide-y divide-ink/10 border-t border-b border-ink/10">
              {HOURS.map((row) => (
                <li key={row.day} className="flex items-baseline gap-5 py-4">
                  <span className="w-24 font-serif text-sm tracking-[0.2em] text-ink uppercase">
                    {row.day}
                  </span>
                  <span className="font-body text-sm text-ink-soft tabular-nums">{row.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-body text-sm leading-relaxed text-ink-soft">
              "Late" is weather, crowd, and bartender's discretion. The chalkboard tells you when
              last call is.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-ink text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <FadeIn>
            <div className="mb-2 font-serif text-base text-cream/60">third floor · III</div>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h3 className="font-display text-5xl leading-[0.9]">
              You've reached
              <br />
              <span className="font-italic italic">the top.</span>
            </h3>
          </FadeIn>
        </div>
        <FadeIn delay={0.24}>
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
              className="btn-lift group inline-flex items-center gap-3 bg-sienna-bright px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream hover:text-sienna"
            >
              All of Sienna
              <i className="ph ph-arrow-up-right text-lg" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
