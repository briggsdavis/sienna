import { DailySpecials } from "@/components/daily-specials"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { FloorIntro } from "@/components/floor-intro"
import { HappyHour } from "@/components/happy-hour"
import { FloorHeroIntro, PageHero } from "@/components/hero"
import { PageShortcuts } from "@/components/page-shortcuts"
import { ParallaxImage } from "@/components/parallax-image"
import { ReservationPanel, useSettings } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { BALL_TYPES, BOWL_STEPS, HAPPY_HOUR_DEALS, SAUCES, STATS } from "@/content/emporio"
import { useStaggerReveal } from "@/hooks/use-reveal"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"

const SHORTCUTS = [
  { label: "Daily Specials", icon: "ph-star", href: "#specials" },
  { label: "Menu", icon: "ph-list-magnifying-glass", href: FLOORS.emporio.menuHref },
  { label: "Happy Hour", icon: "ph-clock", href: "#happy-hour" },
  { label: "Catering", icon: "ph-bag", href: "/catering" },
]

const JSON_LD = restaurantJsonLd({
  name: "Emporio at Sienna Mercato",
  path: FLOORS.emporio.href,
  menuPath: FLOORS.emporio.menuHref,
  reservations: false,
})

export function Emporio() {
  return (
    <PageContent page="emporio">
      <div className="relative">
        <Seo path="/emporio" {...PAGE_SEO["/emporio"]} jsonLd={JSON_LD} />
        <Hero />
        <PageShortcuts shortcuts={SHORTCUTS} />
        <FloorIntro
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
          hours={<EText k="intro.hours" d="Tue-Sun from 4:30 PM" />}
          badge={<EText k="intro.badge" d="Walk-in only" />}
          badgeClassName="bg-sienna"
          statement={
            <>
              <EText k="intro.statement1" d="The meatball is sacred." />
              <span className="font-italic text-sienna italic">
                {" "}
                <EText k="intro.statement2" d="Everything else" />{" "}
              </span>
              <EText k="intro.statement3" d="is a delivery system, bun, bowl, hoagie, fork." />
            </>
          }
          body={
            <EText
              k="intro.body"
              d="We grind the meat in-house. We roll by hand at noon. The sauce list runs ten deep so the same ball can be a different dinner ten nights running."
            />
          }
          stats={STATS}
        />
        <DailySpecials restaurant="emporio" tone="light" />
        <Balls />
        <Sauces />
        <BuildABowl />
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
        <Visit />
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
        <PageHero
          image={{ src, alt: "A platter of meatballs in red sauce", className: "opacity-90" }}
          overlay={
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/92" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(201,65,42,0.35),transparent_60%)]" />
            </>
          }
          numeral="I"
        >
          <FloorHeroIntro
            floor={FLOORS.emporio}
            blurb={
              <EText
                k="hero.blurb"
                d="Five meats, ten sauces, one ground floor that runs loud. Pull up a stool, build a bowl, ask the bartender what's on the chalkboard."
              />
            }
          />
          <div
            className="rise mt-8 flex flex-col items-center gap-3"
            style={{ animationDelay: "0.7s" }}
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
          </div>
        </PageHero>
      )}
    </EImage>
  )
}

function Balls() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <FadeIn>
            <h2 className="font-display text-[clamp(2.2rem,calc(5.5vw*var(--site-type-scale)),5rem)] leading-[0.9]">
              <EText k="balls.title" d="Five balls." />
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-md font-body text-lg text-paper/70">
              <EText
                k="balls.body"
                d="Pick any combination. Three to a hoagie, three to a bowl, six on a plate of six over polenta."
              />
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.18}>
          <div className="grid grid-cols-1 gap-px bg-paper/15 md:grid-cols-5">
            {BALL_TYPES.map((ball, i) => (
              <div
                key={ball.name}
                className={`hover-lift group relative bg-ink p-6 text-center transition-all hover:bg-sienna-deep ${
                  ball.featured ? "bg-sienna text-cream" : ""
                }`}
              >
                <i
                  className={`ph-duotone ${ball.icon} text-5xl ${
                    ball.featured ? "text-cream" : "text-sienna-bright group-hover:text-cream"
                  } transition-colors`}
                />
                <div className="mt-5 font-display text-2xl">
                  <EText k={`balls.${i}.name`} d={ball.name} />
                </div>
                <div
                  className={`mt-1 font-body text-sm ${
                    ball.featured ? "text-cream/80" : "text-paper/60 group-hover:text-cream/80"
                  }`}
                >
                  <EText k={`balls.${i}.sub`} d={ball.sub} />
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
            <h2 className="font-display text-[clamp(2.2rem,calc(5.5vw*var(--site-type-scale)),5rem)] leading-[0.9] text-ink">
              <EText k="sauces.title" d="Ten sauces." />
              <br />
              <span className="font-italic text-sienna italic">
                <EText k="sauces.titleAccent" d="Pick a mood." />
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="max-w-md font-body text-lg text-ink-soft">
              <EText
                k="sauces.body"
                d="From the polite (marinara, pesto) to the unrepentant (Government Cheese). Heat dots aren't a dare, they're a warning."
              />
            </p>
          </FadeIn>
        </div>

        <ul ref={listRef} className="grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2">
          {SAUCES.map((sauce, i) => (
            <li
              key={sauce.name}
              className="hover-lift group relative bg-paper p-6 transition-colors hover:bg-cream"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-display text-3xl text-ink">
                  <EText k={`sauces.${i}.name`} d={sauce.name} />
                </div>
                <HeatDots heat={sauce.heat} />
              </div>
              <div className="mt-2 font-body text-ink-soft">
                <EText k={`sauces.${i}.note`} d={sauce.note} />
              </div>
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
            <h2 className="font-display text-[clamp(2.2rem,calc(6vw*var(--site-type-scale)),5.5rem)] leading-[0.9]">
              <EText k="bowl.title" d="Build a bowl." />
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-xl text-cream/85">
              <EText k="bowl.body" d="Three steps. Eighteen dollars. Hundreds of combinations." />
            </p>
          </div>
        </FadeIn>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {BOWL_STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={step.delay} className="h-full">
              <div className="relative h-full border border-cream/20 p-8 backdrop-blur-sm">
                <div className="flex items-baseline justify-between">
                  <span className="font-body text-cream/70">{step.step}</span>
                  <span className="font-display text-5xl text-cream/40">{step.num}</span>
                </div>
                <i className={`ph-duotone ${step.icon} mt-6 block text-5xl`} />
                <h3 className="mt-6 font-display text-3xl">
                  <EText k={`bowl.${i}.title`} d={step.title} />
                </h3>
                <div className="mt-4 font-body text-cream/85">
                  <EText k={`bowl.${i}.items`} d={step.items.join("\n")} multiline />
                </div>
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
              <EImage k="botm.image" d={unsplash("1574484284002-952d92456975", 1400, 80)}>
                {(src) => <ParallaxImage src={src} alt="The ball of the month" speed={0.1} />}
              </EImage>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-16">
              <div className="mb-3 font-serif text-lg text-sienna-bright">
                <EText k="botm.kicker" d="ball of the month" />
              </div>
              <h2 className="font-display text-6xl leading-[0.9]">
                <EText k="botm.title" d="Dragon Ball" />
              </h2>
              <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-cream/85">
                <EText
                  k="botm.body"
                  d="Housemade meatballs fried golden, glazed in a glossy sweet-chili sauce with a touch of heat. Here through the month, then she sleeps."
                />
              </p>
              <div className="mt-10 flex items-baseline gap-6">
                <span className="font-display text-5xl text-sienna-bright">
                  <EText k="botm.price" d="$14" />
                </span>
                <span className="font-body text-cream/60">
                  <EText k="botm.detail" d="six balls • house-made glaze • sesame, scallion" />
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section id="reserve" className="relative scroll-mt-20 bg-cream py-24">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-12">
        <FadeIn>
          <h2 className="font-display text-[clamp(2.5rem,calc(5vw*var(--site-type-scale)),4.5rem)] leading-[0.9] text-ink">
            <EText k="visit.title" d="Walk right in." />
          </h2>
          <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
            <EText
              k="visit.body"
              d="Emporio is first come, first served. Big group? Call ahead and we'll push some tables together."
            />
          </p>
          <p className="mt-4 font-serif text-sm tracking-[0.2em] text-ink uppercase">
            <EText k="visit.hours" d="Tue-Sun • 4:30 PM to 11 PM" />
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <ReservationPanel restaurant="emporio" tone="light" />
        </FadeIn>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-sienna text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <h3 className="font-display text-5xl leading-[0.9]">
          <EText k="closing.title" d="Show up hungry." />
          <br />
          <span className="font-italic italic">
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
