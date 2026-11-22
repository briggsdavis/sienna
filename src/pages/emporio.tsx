import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { HappyHour } from "@/components/happy-hour"
import { FloorHeroIntro, HeroMeta, PageHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import { ParallaxImage } from "@/components/parallax-image"
import {
  BALL_TYPES,
  BOWL_STEPS,
  BOWLS,
  DESSERTS,
  ENTREES,
  HAPPY_HOUR_DEALS,
  KIDS_MENU,
  ON_THE_BUN,
  SAUCES,
  SIDES,
  SOUPS,
  STARTERS,
  STATS,
} from "@/content/emporio"
import type { MenuItem } from "@/content/types"
import { useRevealOnce, useStaggerReveal } from "@/hooks/use-reveal"
import { FLOORS, ORDER_URL, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Happy Hour", icon: "ph-clock", href: "#happy-hour" },
  { label: "Menu", icon: "ph-list-magnifying-glass", href: "#menu" },
  { label: "Kids Menu", icon: "ph-smiley", href: "#kids-menu" },
  { label: "Catering Menu", icon: "ph-bag", href: "/catering" },
]

export function Emporio() {
  return (
    <div className="relative">
      <Hero />
      <PageShortcuts shortcuts={SHORTCUTS} />
      <FloorIntro
        image={
          <ParallaxImage
            src={unsplash("1529042410759-befb1204b468", 1200, 80)}
            alt="Emporio meatballs"
            className="transition-transform duration-700 group-hover:scale-[1.03]"
            speed={0.12}
          />
        }
        floorLabel="Floor I · Ground Floor"
        hours="Pittsburgh, PA · Open Tue–Sun from 4:30 PM"
        badge="Walk-in only · no reservations"
        badgeClassName="bg-sienna"
        statement={
          <>
            The meatball is sacred.
            <span className="font-italic text-sienna italic"> Everything else </span>
            is a delivery system, bun, bowl, hoagie, fork.
          </>
        }
        body="We grind the meat in-house. We roll by hand at noon. The sauce list runs ten deep so the same ball can be a different dinner ten nights running."
        stats={STATS}
      />
      <Balls />
      <Sauces />
      <BuildABowl />
      <BallOfTheMonth />
      <FullMenu />
      <HappyHour
        title="Happy Hour."
        titleSize="text-[clamp(3rem,7vw,5.5rem)]"
        body="Tuesday through Friday, 4:30 to 6:30. Half off the things that matter, full price on the espresso martinis, except they're $5."
        schedule="Tue to Fri · 4:30 to 6:30 PM"
        deals={HAPPY_HOUR_DEALS}
        dealsDelay={0.15}
      />
      <ClosingStrip />
    </div>
  )
}

function Hero() {
  return (
    <PageHero
      image={{
        src: unsplash("1529042410759-befb1204b468", 2400, 80),
        alt: "A platter of meatballs in red sauce",
        className: "opacity-90",
      }}
      overlay={
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/92" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(201,65,42,0.35),transparent_60%)]" />
        </>
      }
      meta={<HeroMeta location="Floor I · 942 Penn Ave" note="ground floor" />}
      numeral="I"
    >
      <FloorHeroIntro
        floor={FLOORS.emporio}
        tagline="meatball joint"
        subtitle="A Meatball Joint."
        blurb="Five meats, ten sauces, one ground floor that runs loud. Pull up a stool, build a bowl, ask the bartender what's on the chalkboard."
      />
      <div
        className="rise mt-8 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "0.7s" }}
      >
        <ExternalLink
          href={ORDER_URL}
          className="btn-lift group inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
        >
          <i className="ph ph-bag text-sm" />
          Order pickup
          <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ExternalLink>
      </div>
    </PageHero>
  )
}

function Balls() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper">
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 font-display text-[26vw] leading-none text-sienna/15 select-none">
        MEATBALLS
      </div>
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <FadeIn>
            <div>
              <div className="mb-2 font-serif text-lg text-sienna-bright">five kinds</div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9]">
                Five balls.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-md font-body text-lg text-paper/70">
              Pick any combination. Three to a hoagie, three to a bowl, six on a plate of six over
              polenta.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.18}>
          <div className="grid grid-cols-1 gap-px bg-paper/15 md:grid-cols-5">
            {BALL_TYPES.map((ball) => (
              <div
                key={ball.name}
                className={`hover-lift group relative bg-ink p-6 text-center transition-all hover:bg-sienna-deep ${
                  ball.featured ? "bg-sienna text-cream" : ""
                }`}
              >
                {ball.featured && (
                  <span className="absolute top-2 right-2 font-serif text-2xs tracking-[0.3em] text-cream uppercase">
                    feat.
                  </span>
                )}
                <i
                  className={`ph-duotone ${ball.icon} text-5xl ${
                    ball.featured ? "text-cream" : "text-sienna-bright group-hover:text-cream"
                  } transition-colors`}
                />
                <div className="mt-5 font-display text-2xl">{ball.name}</div>
                <div
                  className={`mt-1 font-body text-sm ${
                    ball.featured ? "text-cream/80" : "text-paper/60 group-hover:text-cream/80"
                  }`}
                >
                  {ball.sub}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function HeatDots({ heat }: { heat: number }) {
  return (
    <span className="ml-2 inline-flex items-center gap-0.5 align-middle">
      {[0, 1, 2].map((i) => (
        <i
          key={i}
          className={`ph-fill ph-flame text-xs ${i < heat ? "text-sienna" : "text-ink/15"}`}
        />
      ))}
    </span>
  )
}

function Sauces() {
  const listRef = useStaggerReveal<HTMLUListElement>()

  return (
    <section className="relative bg-cream py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <FadeIn>
            <div>
              <div className="mb-2 font-serif text-lg text-sienna">ten sauces</div>
              <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] text-ink">
                Ten sauces.
                <br />
                <span className="font-italic text-sienna italic">Pick a mood.</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-md font-body text-lg text-ink-soft">
              From the polite (marinara, pesto) to the unrepentant (Government Cheese). Heat dots
              aren't a dare, they're a warning.
            </p>
          </FadeIn>
        </div>

        <ul ref={listRef} className="grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2">
          {SAUCES.map((sauce, i) => (
            <li
              key={sauce.name}
              className="hover-lift group relative bg-paper p-6 transition-colors hover:bg-cream"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-2xs tracking-[0.3em] text-ink/40 uppercase">
                  n.{String(i + 1).padStart(2, "0")}
                </span>
                <HeatDots heat={sauce.heat} />
              </div>
              <div className="mt-3 font-display text-3xl text-ink">{sauce.name}</div>
              <div className="mt-2 font-body text-ink-soft">{sauce.note}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function BuildABowl() {
  return (
    <section className="relative overflow-hidden bg-sienna py-28 text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 text-center">
            <div className="mb-3 font-serif text-lg text-cream/80">build your bowl</div>
            <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.9]">
              Build a bowl.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-xl text-cream/85">
              Three steps. Eighteen dollars. Hundreds of combinations.
            </p>
          </div>
        </FadeIn>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {BOWL_STEPS.map((step) => (
            <FadeIn key={step.num} delay={step.delay} className="h-full">
              <div className="relative h-full border border-cream/20 p-8 backdrop-blur-sm">
                <div className="flex items-baseline justify-between">
                  <span className="font-body text-cream/70">{step.step}</span>
                  <span className="font-display text-5xl text-cream/40">{step.num}</span>
                </div>
                <i className={`ph-duotone ${step.icon} mt-6 block text-5xl`} />
                <h3 className="mt-6 font-display text-3xl">{step.title}</h3>
                <ul className="mt-4 space-y-2 font-body text-cream/85">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <i className="ph ph-dot-outline mt-1 text-sienna-bright" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function BallOfTheMonth() {
  return (
    <section className="relative bg-paper py-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="grid overflow-hidden bg-ink text-cream lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-square overflow-hidden lg:aspect-auto">
              <ParallaxImage
                src={unsplash("1574484284002-952d92456975", 1400, 80)}
                alt="The Dragon Ball"
                speed={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent" />
              <div className="absolute top-6 left-6 bg-sienna px-3 py-1.5 font-serif text-2xs tracking-[0.4em] text-cream/80 uppercase">
                ball of the month · may
              </div>
              <div className="absolute right-6 bottom-6 flex items-center gap-2 font-body text-sm text-cream">
                <i className="ph-fill ph-flame text-sienna-bright" />
                <i className="ph-fill ph-flame text-sienna-bright" />
                medium heat
              </div>
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-16">
              <div className="mb-3 font-serif text-lg text-sienna-bright">ball of the month</div>
              <h2 className="font-display text-6xl leading-[0.9]">Dragon Ball</h2>
              <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-cream/85">
                Housemade meatballs fried golden, glazed in a glossy sweet-chili sauce with a touch
                of heat. Available May only, through the month, then she sleeps.
              </p>
              <div className="mt-10 flex items-baseline gap-6">
                <span className="font-display text-5xl text-sienna-bright">$14</span>
                <span className="font-body text-cream/60">
                  six balls · house-made glaze · sesame, scallion
                </span>
              </div>
              <ExternalLink
                href={ORDER_URL}
                className="btn-lift group mt-10 inline-flex w-fit items-center gap-3 bg-sienna-bright px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream hover:text-sienna"
              >
                Order before she's gone
                <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ExternalLink>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function FullMenu() {
  return (
    <section id="menu" className="relative bg-paper py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-4 text-center">
            <div className="mb-3 font-serif text-lg text-sienna">the whole menu</div>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] text-ink">
              The whole menu.
            </h2>
          </div>
        </FadeIn>
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          <MenuColumn title="Starters" italian="antipasti" items={STARTERS} />
          <MenuColumn title="Soups & Salads" italian="zuppe & insalate" items={SOUPS} />
          <MenuColumn title="Entrées" italian="secondi" items={ENTREES} />
          <MenuColumn title="On the Bun" italian="al panino" items={ON_THE_BUN} />
          <MenuColumn title="Bowls" italian="le ciotole" items={BOWLS} />
          <MenuColumn title="Sides" italian="contorni" items={SIDES} />
          <MenuColumn title="Desserts" italian="dolci" items={DESSERTS} />

          <FadeIn>
            <div id="kids-menu">
              <div className="mb-6">
                <div className="mb-1 font-serif text-base text-sienna">for the kids</div>
                <h3 className="font-display text-4xl text-ink">Kid's Menu</h3>
                <p className="mt-2 font-body text-ink-soft">Pick any two, $7 each.</p>
              </div>
              <ul className="grid grid-cols-2 gap-2 font-serif text-ink/85">
                {KIDS_MENU.map((item) => (
                  <li key={item} className="flex items-center gap-2 py-1">
                    <i className="ph ph-asterisk text-xs text-sienna" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function MenuColumn({
  title,
  italian,
  items,
}: {
  title: string
  italian: string
  items: readonly MenuItem[]
}) {
  const ref = useRevealOnce<HTMLDivElement>(":scope > :first-child, li")

  return (
    <div ref={ref}>
      <div className="mb-2">
        <div className="mb-1 font-serif text-base text-sienna">{italian}</div>
        <h3 className="font-display text-4xl text-ink">{title}</h3>
      </div>
      <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
        {items.map((item) => (
          <MenuRow key={item.name} {...item} />
        ))}
      </ul>
    </div>
  )
}

function MenuRow({ name, desc, price, flag }: MenuItem) {
  return (
    <li className="flex items-baseline gap-3 py-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-xl text-ink">{name}</span>
          {flag && (
            <span className="font-serif text-2xs tracking-[0.25em] text-sienna uppercase">
              {flag}
            </span>
          )}
        </div>
        {desc && <div className="mt-0.5 font-body text-base text-ink-soft">{desc}</div>}
      </div>
      <span className="font-serif text-lg text-sienna tabular-nums">${price}</span>
    </li>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-sienna text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <div className="mb-2 font-serif text-base text-cream/80">ground floor · I</div>
          <h3 className="font-display text-5xl leading-[0.9]">
            Show up hungry.
            <br />
            <span className="font-italic italic">Leave slower.</span>
          </h3>
        </div>
        <div className="flex flex-wrap justify-end gap-4">
          <ExternalLink
            href={ORDER_URL}
            className="btn-lift group inline-flex items-center gap-3 bg-cream px-7 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper"
          >
            <i className="ph ph-bag text-lg" />
            Order Pickup
          </ExternalLink>
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
  )
}
