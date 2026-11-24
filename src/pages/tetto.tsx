import { DailySpecials } from "@/components/daily-specials"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { HappyHour } from "@/components/happy-hour"
import { RestaurantHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import { ReservationPanel } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { FEATURED_DRAFT, HAPPY_HOUR_DEALS, HOURS, STATS } from "@/content/tetto"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Daily Specials", icon: "ph-star", href: "#specials" },
  { label: "Food & Drafts", icon: "ph-beer-stein", href: FLOORS.tetto.menuHref },
  { label: "Happy Hour", icon: "ph-clock", href: "#happy-hour" },
  { label: "Hours", icon: "ph-sun-horizon", href: "#reserve" },
]

const JSON_LD = restaurantJsonLd({
  name: "Il Tetto Rooftop at Sienna Mercato",
  path: FLOORS.tetto.href,
  menuPath: FLOORS.tetto.menuHref,
  reservations: false,
})

export function Tetto() {
  return (
    <PageContent page="tetto">
      <div className="relative">
        <Seo path="/tetto" {...PAGE_SEO["/tetto"]} jsonLd={JSON_LD} />
        <Hero />
        <PageShortcuts shortcuts={SHORTCUTS} />
        <FloorIntro
          image={
            <EImage k="intro.image" d={unsplash("1414235077428-338989a2e8c0", 1200, 80)}>
              {(src) => (
                <img
                  src={src}
                  alt="Il Tetto rooftop"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              )}
            </EImage>
          }
          photoDetails={{
            hours: <EText k="intro.hours" d="Thu-Sun from 4 PM" />,
            badge: <EText k="intro.badge" d="Walk-in only" />,
            badgeClassName: "bg-ink",
          }}
          statement={
            <>
              <EText k="intro.statement1" d="The view is the menu." />
              <span className="font-italic text-sienna italic">
                {" "}
                <EText k="intro.statement2" d="Everything else" />{" "}
              </span>
              <EText k="intro.statement3" d="is cold pints and good company." />
            </>
          }
          body={
            <EText
              k="intro.body"
              d="No reservations, no dress code, no ceremony. The retractable roof opens when the forecast agrees. Thirty drafts on the chalkboard, whole pies riding the dumbwaiter up from below, the Pittsburgh skyline doing the rest."
            />
          }
          stats={STATS}
        />
        <DailySpecials restaurant="tetto" tone="dark" title="On the roof today." />
        <BeerOfTheMonth />
        <HappyHour
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
    <EImage k="hero.image" d={unsplash("1414235077428-338989a2e8c0", 2400, 80)}>
      {(src) => (
        <RestaurantHero
          floor={FLOORS.tetto}
          image={{
            src,
            alt: "The Il Tetto rooftop at golden hour, with the Pittsburgh skyline behind",
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
  return (
    <section className="relative bg-ink pb-16 text-paper">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="grid overflow-hidden lg:grid-cols-[1fr_2fr]">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
              <EImage k="botm.image" d={unsplash("1535958636474-b021ee887b13", 1400, 80)}>
                {(src) => (
                  <img
                    src={src}
                    alt="The beer of the month"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </EImage>
            </div>
            <div className="flex flex-col justify-center bg-paper/[0.04] p-8 lg:p-12">
              <div className="mb-2 font-serif text-base text-sienna-bright">
                <EText k="botm.kicker" d="beer of the month" />
              </div>
              <h2 className="font-display text-[clamp(2rem,calc(5vw*var(--site-type-scale)),3.5rem)] leading-[0.9]">
                <EText k="botm.title" d={FEATURED_DRAFT.name} />
              </h2>
              <p className="mt-4 max-w-lg font-body text-lg leading-relaxed text-paper/80">
                <EText k="botm.body" d={FEATURED_DRAFT.notes} />
              </p>
              <div className="mt-6 font-serif text-xs tracking-[0.3em] text-paper/55 uppercase">
                <EText
                  k="botm.detail"
                  d={`${FEATURED_DRAFT.brewery} • ${FEATURED_DRAFT.style} • ${FEATURED_DRAFT.abv} ABV • ${FEATURED_DRAFT.ibu} IBU`}
                />
              </div>
            </div>
          </div>
        </FadeIn>
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
              <span className="font-italic text-sienna italic">
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
    <section className="relative bg-sienna text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <FadeIn delay={0.12}>
          <h3 className="font-display text-5xl leading-[0.9]">
            <EText k="closing.title" d="You've reached" />
            <br />
            <span className="font-italic italic">
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
              className="btn-lift group border border-cream/40 text-cream hover:bg-cream/10"
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
              className="btn-lift group bg-cream text-sienna hover:bg-paper"
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
