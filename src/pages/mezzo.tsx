import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { HeroIntro, PageHero } from "@/components/hero"
import { MezzoSpecials } from "@/components/mezzo-specials"
import { ParallaxImage } from "@/components/parallax-image"
import { ReservationPanel, ReserveLink } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { GALLERY_PHOTOS, HIGHLIGHTS, HOURS } from "@/content/mezzo"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash } from "@/lib/site"

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
        <Intro />
        <Gallery />
        <Highlights />
        <MezzoSpecials />
        <Reservations />
        <ClosingStrip />
      </div>
    </PageContent>
  )
}

function Hero() {
  const floor = FLOORS.mezzo

  return (
    <EImage k="hero.image" d={unsplash("1571997478779-2adcbbe9ab2f", 2400, 80)}>
      {(src) => (
        <PageHero
          image={{ src, alt: "Wood-fired pizza", className: "opacity-80" }}
          overlay={
            <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/50 to-ink/90" />
          }
          bottomPadding="pb-0"
        >
          <div className="my-auto flex flex-col items-center text-center">
            <img
              src={floor.logo}
              alt=""
              className="rise mb-5 h-16 w-auto max-w-[55vw] object-contain brightness-0 invert"
            />
            <HeroIntro title={floor.name} />
            <MezzoActions hero />
          </div>
        </PageHero>
      )}
    </EImage>
  )
}

function MezzoActions({ hero = false }: { hero?: boolean }) {
  const reserveTone = hero
    ? "bg-paper text-ink"
    : "bg-sienna text-cream [--button-fill-color:var(--color-sienna-deep)]"
  const menuTone = hero ? "btn-fill-cream border-cream/50 text-cream" : "border-ink/30 text-ink"

  return (
    <div
      className={`mt-8 grid w-full max-w-xs grid-cols-2 gap-3 ${hero ? "rise" : ""}`}
      style={hero ? { animationDelay: "0.45s" } : undefined}
    >
      <ReserveLink restaurant="mezzo" className={`btn-lift btn-fill ${reserveTone}`}>
        Reserve
      </ReserveLink>
      <ELink
        k="hero.menuLink"
        label="Menu"
        href={FLOORS.mezzo.menuHref}
        className={`btn-lift btn-fill border ${menuTone}`}
      />
    </div>
  )
}

function Intro() {
  return (
    <section aria-label="About Mezzo" className="bg-paper py-14 md:py-24">
      <div className="site-container grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-12 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
          <EImage k="intro.image" d={unsplash("1751563820356-a62570b187ea", 1600, 82)}>
            {(src) => (
              <ParallaxImage
                src={src}
                alt="Warm lighting and wood paneling in an Italian restaurant dining room"
                speed={0.08}
              />
            )}
          </EImage>
        </div>
        <FadeIn delay={0.12} stagger>
          <h2 className="font-display text-3xl leading-none text-ink md:text-4xl">Mezzo</h2>
          <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
            <EText
              k="intro.summary"
              d="Mezzo is for slowing down. On Sienna Mercato’s second floor, settle in for a candlelit dinner of hand-rolled pasta, wood-fired pizza and Italian wine, with time for another course or a second glass."
            />
          </p>
          <MezzoActions />
        </FadeIn>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section aria-label="Mezzo photo gallery" className="bg-cream py-10 md:py-20">
      <div className="site-container grid grid-cols-3 items-center gap-2 sm:gap-4">
        {GALLERY_PHOTOS.map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden bg-paper-deep ${index === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
          >
            <EImage k={`gallery.${image.id}.image`} d={unsplash(image.photo, 1200, 80)}>
              {(src) => (
                <ParallaxImage
                  src={src}
                  alt={image.alt}
                  loading="lazy"
                  speed={index === 1 ? 0.09 : 0.05}
                />
              )}
            </EImage>
          </div>
        ))}
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <section
      aria-label="What makes Mezzo special"
      className="overflow-hidden bg-cream py-16 md:py-24"
    >
      <div className="@container site-container flex flex-col gap-14 md:gap-0">
        {HIGHLIGHTS.map((feature, index) => (
          <article
            key={feature.id}
            className="mezzo-highlight grid items-start gap-7 md:grid-cols-2"
          >
            <div
              className={`relative aspect-[25/24] overflow-hidden bg-paper-deep shadow-xl ${
                index % 2 === 0 ? "md:order-last" : ""
              }`}
            >
              <EImage k={`highlights.${feature.id}.image`} d={unsplash(feature.photo, 1400, 80)}>
                {(src) => <ParallaxImage src={src} alt={feature.alt} loading="lazy" speed={0.08} />}
              </EImage>
            </div>
            <FadeIn delay={0.12} className="mezzo-highlight-copy" stagger>
              <h2
                className={`font-display text-[clamp(1.16rem,calc(2.4vw*var(--site-type-scale)),2.12rem)] leading-none whitespace-nowrap text-ink ${index > 0 ? "pt-3" : ""}`}
              >
                <EText k={`highlights.${feature.id}.title`} d={feature.title} />
              </h2>
              <p className="mt-4 max-w-sm font-body text-[0.9rem] leading-relaxed text-ink-soft">
                <EText k={`highlights.${feature.id}.body`} d={feature.body} />
              </p>
            </FadeIn>
          </article>
        ))}
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
        <FadeIn className="pt-0 lg:pt-2" stagger>
          <h2 className="font-display text-[clamp(2.5rem,calc(5vw*var(--site-type-scale)),4rem)] leading-[0.9]">
            <EText k="reserve.title" d="Reserve at Mezzo" />
          </h2>
          <p className="mt-6 mb-8 max-w-md font-body text-lg leading-relaxed text-cream/80">
            <EText
              k="reserve.body"
              d="Mezzo takes reservations online, seven days out. Bar seats are walk-in. Larger parties of six or more, call us directly."
            />
          </p>
          <ReservationPanel restaurant="mezzo" tone="dark" fillHover />
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
    <section
      aria-label="Explore the other floors"
      className="bg-sienna px-6 py-12 text-cream md:py-16"
    >
      <FadeIn className="flex justify-center">
        <div className="btn-pair">
          <ELink
            k="closing.up"
            label="Climb to Il Tetto"
            href={FLOORS.tetto.href}
            className="btn-lift btn-fill bg-cream whitespace-nowrap text-sienna [--button-fill-color:var(--color-sienna-deep)]"
          >
            {(label) => (
              <>
                {label}
                <i aria-hidden="true" className="ph ph-arrow-up" />
              </>
            )}
          </ELink>
          <ELink
            k="closing.down"
            label="Down to Emporio"
            href={FLOORS.emporio.href}
            className="btn-lift btn-fill btn-fill-cream border border-cream/60 whitespace-nowrap text-cream"
          >
            {(label) => (
              <>
                <i aria-hidden="true" className="ph ph-arrow-down" />
                {label}
              </>
            )}
          </ELink>
        </div>
      </FadeIn>
    </section>
  )
}
