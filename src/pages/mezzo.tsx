import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { FloorHeroIntro, HeroMeta, PageHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import {
  ANTIPASTO,
  COCKTAILS,
  DESSERT,
  HOURS,
  MAINS,
  PASTA,
  PIZZA,
  SEASONAL_COCKTAILS,
  STATS,
  WINE_FEATURED,
  WINE_REDS,
  WINE_VARIETAL,
  WINE_WHITES,
} from "@/content/mezzo"
import type { MenuItem, WineItem } from "@/content/types"
import { useRevealOnce } from "@/hooks/use-reveal"
import { FLOORS, PHONE, RESERVE_URL, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "View Menu", icon: "ph-list-magnifying-glass", href: "#menu" },
  { label: "View Catering Menu", icon: "ph-bag", href: "/catering" },
]

export function Mezzo() {
  return (
    <div className="relative">
      <Hero />
      <PageShortcuts shortcuts={SHORTCUTS} />
      <FloorIntro
        image={
          <img
            src={unsplash("1571997478779-2adcbbe9ab2f", 1200, 80)}
            alt="Mezzo wood-fired pizza"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        }
        floorLabel="Floor II · Second Floor"
        hours="Pittsburgh, PA · Wed–Sun from 5 PM"
        badge="Reservations via OpenTable"
        badgeClassName="bg-sienna"
        statement={
          <>
            A second floor is for
            <span className="font-italic text-sienna italic"> slowing down. </span>
            Candlelight, four courses, a bottle that lingers past the candle.
          </>
        }
        body="The kitchen rolls pasta at noon and lights the wood-fired oven before dinner. The cellar is Italian-led but not Italian-only, bottles chosen for the table you're sitting at, not the spreadsheet."
        stats={STATS}
      />
      <Oven />
      <Menu />
      <WineList />
      <Reservations />
      <ClosingStrip />
    </div>
  )
}

function Hero() {
  return (
    <PageHero
      image={{
        src: unsplash("1571997478779-2adcbbe9ab2f", 2400, 80),
        alt: "A wood-fired pizza fresh from the oven at Mezzo",
        className: "opacity-80",
      }}
      overlay={
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(110,31,18,0.35),transparent_60%)]" />
        </>
      }
      meta={<HeroMeta location="Floor II · 942 Penn Ave" note="second floor" />}
      numeral="II"
    >
      <FloorHeroIntro
        floor={FLOORS.mezzo}
        tagline="trattoria"
        taglineClassName="text-cream/80"
        subtitle="Pizza & Charcuterie."
        blurb="Linen, candlelight, and an oven at eight hundred degrees. Pasta hand-rolled at noon, a wine list that speaks Piemontese."
      />
      <div
        className="rise mt-8 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "0.7s" }}
      >
        <ExternalLink
          href={RESERVE_URL}
          className="btn-lift group inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
        >
          <i className="ph ph-calendar-dots text-sm" />
          Reserve a table
          <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ExternalLink>
      </div>
    </PageHero>
  )
}

function Oven() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-paper">
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-12">
        <FadeIn>
          <div className="relative aspect-[3/2] overflow-hidden lg:aspect-[4/3]">
            <img
              src={unsplash("1593504049359-74330189a345", 1400, 80)}
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
            <div className="mb-3 flex items-center gap-3 font-serif text-lg text-sienna-bright">
              the oven
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.85]">
              Eight hundred
              <br />
              <span className="font-italic text-sienna-bright italic">degrees.</span>
            </h2>
            <p className="mt-8 max-w-md font-body text-xl leading-relaxed text-paper/85">
              A wood-fired oven from Naples, lit at four, holding eight-hundred before service. Each
              pizza takes ninety seconds, leopard-spotted crust, blistered edge, mozzarella that
              pulls in long strings.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Menu() {
  return (
    <section id="menu" className="relative bg-paper py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-16 text-center">
            <div className="mb-3 font-serif text-lg text-sienna">the menu</div>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,5rem)] leading-[0.9] text-ink">
              From oven,
              <br />
              <span className="font-italic text-sienna italic">pan, and cellar.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          <MenuColumn title="Antipasti" eyebrow="to begin" items={ANTIPASTO} />
          <MenuColumn title="Wood-Fired Pizza" eyebrow="dal forno" items={PIZZA} />
          <MenuColumn title="Pasta" eyebrow="hand-rolled at noon" items={PASTA} />
          <MenuColumn title="Mains" eyebrow="secondi" items={MAINS} />
          <MenuColumn title="Dessert" eyebrow="dolci" items={DESSERT} />
          <FadeIn>
            <div>
              <div className="mb-2">
                <div className="mb-1 font-serif text-sm tracking-wide text-sienna">cocktails</div>
                <h3 className="font-display text-4xl text-ink">House Bar</h3>
              </div>
              <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
                {COCKTAILS.map((item) => (
                  <MenuRow key={item.name} {...item} />
                ))}
              </ul>
              <div className="mt-10">
                <div className="mb-1 font-serif text-sm tracking-wide text-sienna">seasonal</div>
                <h4 className="font-display text-2xl text-ink">Right now, on the chalkboard</h4>
                <ul className="mt-4 divide-y divide-ink/10 border-t border-b border-ink/10">
                  {SEASONAL_COCKTAILS.map((item) => (
                    <MenuRow key={item.name} {...item} />
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function MenuColumn({
  title,
  eyebrow,
  items,
}: {
  title: string
  eyebrow: string
  items: readonly MenuItem[]
}) {
  const ref = useRevealOnce<HTMLDivElement>(":scope > :first-child, li")

  return (
    <div ref={ref}>
      <div className="mb-2">
        <div className="mb-1 font-serif text-sm tracking-wide text-sienna">{eyebrow}</div>
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
            <span className="font-serif text-2xs tracking-[0.3em] text-sienna uppercase">
              {flag}
            </span>
          )}
        </div>
        {desc && (
          <div className="mt-0.5 font-body text-base leading-snug text-ink-soft">{desc}</div>
        )}
      </div>
      <span className="font-serif text-lg text-sienna tabular-nums">${price}</span>
    </li>
  )
}

function WineList() {
  const leftRef = useRevealOnce<HTMLDivElement>("li")
  const rightRef = useRevealOnce<HTMLDivElement>("li")

  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper">
      <div className="relative mx-auto max-w-[1300px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-16 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3 font-serif text-lg text-sienna-bright">
                <i className="ph-duotone ph-wine text-2xl" />
                la cantina · the cellar
              </div>
              <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.9]">
                Ninety bottles.{" "}
                <span className="font-italic text-sienna-bright italic">Four Barolos.</span>
              </h2>
            </div>
            <p className="max-w-md font-body text-lg leading-relaxed text-paper/75">
              Ninety bottles, four Barolos, three Brunellos, and a Hungarian Tokaji that the
              sommelier won't shut up about. By the glass changes weekly, ask.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          <div ref={leftRef}>
            <WineGroup
              eyebrow="featured imports"
              title="Barolo & Barbaresco"
              region="Piemonte"
              wines={WINE_FEATURED}
              first
            />
            <WineGroup
              eyebrow="varietal showcase"
              title="Sangiovese & Brunello"
              region="Tuscany · CA"
              wines={WINE_VARIETAL}
            />
            <WineGroup eyebrow="bianchi" title="Whites & Rosé" wines={WINE_WHITES} />
          </div>

          <div ref={rightRef}>
            <WineGroup
              eyebrow="rossi"
              title="The Long Red List"
              region="IT · FR · CA"
              wines={WINE_REDS}
              first
            />
            <div className="mt-12 rounded-none border border-paper/15 bg-paper/[0.03] p-6">
              <div className="font-serif text-sm text-sienna-bright">on tap · sparkling</div>
              <div className="mt-2 flex items-baseline justify-between gap-4">
                <span className="font-display text-2xl">Italian Sparkling Red</span>
                <span className="font-serif text-base text-cream tabular-nums">$60</span>
              </div>
              <p className="mt-2 font-body text-sm text-paper/70">
                Lambrusco-style, on bottle. Goes with everything that came out of the wood oven.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function WineGroup({
  eyebrow,
  title,
  region,
  wines,
  first = false,
}: {
  eyebrow: string
  title: string
  region?: string
  wines: readonly WineItem[]
  first?: boolean
}) {
  return (
    <>
      <div
        className={`${first ? "" : "mt-12 "}mb-4 flex items-baseline justify-between border-b border-paper/20 pb-3`}
      >
        <div>
          <div className="font-serif text-sm text-sienna-bright">{eyebrow}</div>
          <h3 className="font-display text-3xl">{title}</h3>
        </div>
        {region && (
          <span className="font-serif text-2xs tracking-[0.3em] text-paper/50 uppercase">
            {region}
          </span>
        )}
      </div>
      <ul className="divide-y divide-paper/10">
        {wines.map((wine) => (
          <WineRow key={wine.name} {...wine} />
        ))}
      </ul>
    </>
  )
}

function WineRow({ name, region, note, price, flag }: WineItem) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-4">
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-serif text-lg text-paper/95">{name}</span>
          {flag && (
            <span className="bg-sienna-bright px-2 py-0.5 font-serif text-2xs tracking-[0.3em] text-cream uppercase">
              {flag}
            </span>
          )}
        </div>
        <div className="mt-0.5 flex items-baseline gap-2 font-body text-sm text-paper/50">
          <span>{region}</span>
          {note && (
            <>
              <span className="text-sienna-bright/70">·</span>
              <span className="leading-snug">{note}</span>
            </>
          )}
        </div>
      </div>
      <span className="font-serif text-base text-paper tabular-nums">${price}</span>
    </li>
  )
}

function Reservations() {
  return (
    <section className="relative overflow-hidden bg-sienna-deep text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-start lg:px-12">
        <FadeIn>
          <div className="pt-0 lg:pt-2">
            <div className="mb-3 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
              the only reservation in the building
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.9]">
              Book a table on Floor II.
            </h2>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-cream/80">
              Mezzo takes reservations through OpenTable, seven days out. Bar seats are walk-in.
              Larger parties of six or more, call us directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalLink
                href={RESERVE_URL}
                className="btn-lift group inline-flex items-center gap-2 bg-cream px-6 py-3 font-serif text-xs tracking-[0.25em] text-sienna uppercase transition-colors hover:bg-paper"
              >
                <i className="ph ph-calendar-dots text-sm" />
                Reserve on OpenTable
                <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ExternalLink>
              <a
                href={PHONE.href}
                className="btn-lift inline-flex items-center gap-2 border border-cream/50 px-6 py-3 font-serif text-xs tracking-[0.25em] uppercase transition-colors hover:bg-cream/10"
              >
                <i className="ph ph-phone text-sm" />
                {PHONE.label}
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="border-t border-cream/20 pt-12 lg:border-t-0 lg:border-l lg:border-l-cream/20 lg:pt-2 lg:pl-12">
            <div className="mb-5 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
              Hours · Floor II
            </div>
            <ul className="divide-y divide-cream/15">
              {HOURS.map((row) => (
                <li key={row.day} className="flex items-baseline gap-4 py-3">
                  <span className="w-20 font-serif text-xs tracking-[0.2em] text-cream/70 uppercase">
                    {row.day}
                  </span>
                  <span className="font-body text-sm text-cream/85 tabular-nums">{row.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-body text-xs leading-relaxed text-cream/55">
              Last seating 30 min before close. Bar pours later.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-paper">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <FadeIn>
            <div className="mb-2 font-serif text-base text-sienna">second floor · II</div>
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
  )
}
