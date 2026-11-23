import { DailySpecials } from "@/components/daily-specials"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { FloorHeroIntro, HeroMeta, PageHero } from "@/components/hero"
import { MenuTeaser } from "@/components/menu-view"
import { PageShortcuts } from "@/components/page-shortcuts"
import { ReservationPanel, ReserveLink } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { HOURS, STATS } from "@/content/mezzo"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Daily Specials", icon: "ph-star", href: "#specials" },
  { label: "Menu", icon: "ph-list-magnifying-glass", href: FLOORS.mezzo.menuHref },
  { label: "Reserve", icon: "ph-calendar-dots", href: "#reserve" },
  { label: "Catering", icon: "ph-bag", href: "/catering" },
]

const JSON_LD = restaurantJsonLd({
  name: "Mezzo at Sienna Mercato",
  path: FLOORS.mezzo.href,
  menuPath: FLOORS.mezzo.menuHref,
  reservations: true,
})

export function Mezzo() {
  return (
    <PageContent page="mezzo">
      <div className="relative">
        <Seo path="/mezzo" {...PAGE_SEO["/mezzo"]} jsonLd={JSON_LD} />
        <Hero />
        <PageShortcuts shortcuts={SHORTCUTS} />
        <FloorIntro
          image={
            <EImage k="intro.image" d={unsplash("1571997478779-2adcbbe9ab2f", 1200, 80)}>
              {(src) => (
                <img
                  src={src}
                  alt="Mezzo wood-fired pizza"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
            </EImage>
          }
          hours={<EText k="intro.hours" d="Wed-Sun from 5 PM" />}
          badge={<EText k="intro.badge" d="Reservations via OpenTable" />}
          badgeClassName="bg-sienna"
          statement={
            <>
              <EText k="intro.statement1" d="A second floor is for" />
              <span className="font-italic text-sienna italic">
                {" "}
                <EText k="intro.statement2" d="slowing down." />{" "}
              </span>
              <EText
                k="intro.statement3"
                d="Candlelight, four courses, a bottle that lingers past the candle."
              />
            </>
          }
          body={
            <EText
              k="intro.body"
              d="The kitchen rolls pasta at noon and lights the wood-fired oven before dinner. The cellar is Italian-led but not Italian-only, bottles chosen for the table you're sitting at, not the spreadsheet."
            />
          }
          stats={STATS}
        />
        <Oven />
        <DailySpecials restaurant="mezzo" tone="light" />
        <MenuTeaser
          restaurant="mezzo"
          tone="dark"
          heading={
            <>
              <EText k="menu.title" d="From oven," />
              <br />
              <span className="font-italic text-sienna-bright italic">
                <EText k="menu.titleAccent" d="pan, and cellar." />
              </span>
            </>
          }
        />
        <Reservations />
        <ClosingStrip />
      </div>
    </PageContent>
  )
}

function Hero() {
  return (
    <EImage k="hero.image" d={unsplash("1571997478779-2adcbbe9ab2f", 2400, 80)}>
      {(src) => (
        <PageHero
          image={{
            src,
            alt: "A wood-fired pizza fresh from the oven at Mezzo",
            className: "opacity-80",
          }}
          overlay={
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/95" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(110,31,18,0.35),transparent_60%)]" />
            </>
          }
          meta={<HeroMeta />}
          numeral="II"
        >
          <FloorHeroIntro
            floor={FLOORS.mezzo}
            subtitle={<EText k="hero.subtitle" d="Pizza & Charcuterie." />}
            blurb={
              <EText
                k="hero.blurb"
                d="Linen, candlelight, and an oven at eight hundred degrees. Pasta hand-rolled at noon, a wine list that speaks Piemontese."
              />
            }
          />
          <div
            className="rise mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.7s" }}
          >
            <ReserveLink
              restaurant="mezzo"
              className="btn-lift group inline-flex items-center gap-2 bg-paper px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase transition-colors hover:bg-cream"
            >
              <i className="ph ph-calendar-dots text-sm" />
              <EText k="hero.reserveLabel" d="Reserve a table" />
              <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ReserveLink>
            <ELink
              k="hero.menuLink"
              label="View the menu"
              href={FLOORS.mezzo.menuHref}
              className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
            >
              {(label) => (
                <>
                  <i className="ph ph-list-magnifying-glass text-sm" />
                  {label}
                </>
              )}
            </ELink>
          </div>
        </PageHero>
      )}
    </EImage>
  )
}

function Oven() {
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-paper">
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-12">
        <FadeIn>
          <div className="relative aspect-[3/2] overflow-hidden lg:aspect-[4/3]">
            <EImage k="oven.image" d={unsplash("1593504049359-74330189a345", 1400, 80)}>
              {(src) => (
                <img
                  src={src}
                  alt="Flames in a wood-fired pizza oven"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </EImage>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.85]">
              <EText k="oven.title" d="Eight hundred" />
              <br />
              <span className="font-italic text-sienna-bright italic">
                <EText k="oven.titleAccent" d="degrees." />
              </span>
            </h2>
            <p className="mt-8 max-w-md font-body text-xl leading-relaxed text-paper/85">
              <EText
                k="oven.body"
                d="A wood-fired oven from Naples, lit at four, holding eight-hundred before service. Each pizza takes ninety seconds, leopard-spotted crust, blistered edge, mozzarella that pulls in long strings."
              />
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Reservations() {
  return (
    <section
      id="reserve"
      className="relative scroll-mt-20 overflow-hidden bg-sienna-deep text-cream"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-start lg:px-12">
        <FadeIn>
          <div className="pt-0 lg:pt-2">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.9]">
              <EText k="reserve.title" d="Book a table on Floor II." />
            </h2>
            <p className="mt-6 mb-8 max-w-md font-body text-lg leading-relaxed text-cream/80">
              <EText
                k="reserve.body"
                d="Mezzo takes reservations online, seven days out. Bar seats are walk-in. Larger parties of six or more, call us directly."
              />
            </p>
            <ReservationPanel restaurant="mezzo" tone="dark" />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="border-t border-cream/20 pt-12 lg:border-t-0 lg:border-l lg:border-l-cream/20 lg:pt-2 lg:pl-12">
            <div className="mb-5 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
              Hours
            </div>
            <ul className="divide-y divide-cream/15">
              {HOURS.map((row, i) => (
                <li key={row.day} className="flex items-baseline gap-4 py-3">
                  <span className="w-20 font-serif text-xs tracking-[0.2em] text-cream/70 uppercase">
                    <EText k={`hours.${i}.day`} d={row.day} />
                  </span>
                  <span className="font-body text-sm text-cream/85 tabular-nums">
                    <EText
                      k={`hours.${i}.time`}
                      d={"close" in row ? `${row.open} to ${row.close}` : row.open}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-body text-xs leading-relaxed text-cream/55">
              <EText k="hours.note" d="Last seating 30 min before close. Bar pours later." />
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
        <FadeIn delay={0.12}>
          <h3 className="font-display text-5xl leading-[0.9] text-ink">
            <EText k="closing.title" d="Two more flights to" />
            <br />
            <span className="font-italic text-sienna italic">
              <EText k="closing.titleAccent" d="the roof." />
            </span>
          </h3>
        </FadeIn>
        <FadeIn delay={0.24}>
          <div className="flex flex-wrap gap-4">
            <ELink
              k="closing.down"
              label="Back to Emporio"
              href="/emporio"
              className="btn-lift group inline-flex items-center gap-3 border border-ink/30 px-7 py-4 font-serif text-sm tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
            >
              {(label) => (
                <>
                  <i className="ph ph-arrow-down text-lg" />
                  {label}
                </>
              )}
            </ELink>
            <ELink
              k="closing.up"
              label="Climb to Il Tetto"
              href="/tetto"
              className="btn-lift group inline-flex items-center gap-3 bg-ink px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-deep"
            >
              {(label) => (
                <>
                  {label}
                  <i className="ph ph-arrow-up text-lg" />
                </>
              )}
            </ELink>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
