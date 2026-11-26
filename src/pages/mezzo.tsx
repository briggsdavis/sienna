import type { CSSProperties } from "react"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { HeroIntro, PageHero } from "@/components/hero"
import { MezzoSpecials } from "@/components/mezzo-specials"
import { MezzoValueIcon, useInView } from "@/components/mezzo-value-icon"
import { ParallaxImage } from "@/components/parallax-image"
import { ReservationPanel, ReserveLink } from "@/components/reserve"
import { SectionBreak } from "@/components/section-break"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { GALLERY_PHOTOS, HIGHLIGHTS, HOURS, MENU_SAMPLES, VALUES } from "@/content/mezzo"
import { useScrollScale } from "@/hooks/use-scroll-scale"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS } from "@/lib/site"

const JSON_LD = restaurantJsonLd({
  name: "Mezzo at Sienna Mercato",
  path: FLOORS.mezzo.href,
  menuPath: FLOORS.mezzo.menuHref,
  reservations: true,
})

export function Mezzo() {
  return (
    <PageContent page="mezzo">
      <div className="type-mezzo relative">
        <Seo path="/mezzo" {...PAGE_SEO["/mezzo"]} jsonLd={JSON_LD} />
        <Hero />
        <Intro />
        <Gallery />
        <Highlights />
        <MezzoSpecials />
        <FeaturedDishes />
        <Reservations />
        <ClosingStrip />
      </div>
    </PageContent>
  )
}

function Hero() {
  const floor = FLOORS.mezzo

  return (
    <EImage k="hero.image" d="/images/mezzo/hero-guest-dining.webp">
      {(src) => (
        <PageHero
          image={{ src, alt: "", className: "object-[center_52%]", zoom: false }}
          overlay={
            <>
              <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/15 to-black/35" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent" />
            </>
          }
          bottomPadding="pb-0"
        >
          <div className="my-auto flex flex-col items-center text-center">
            <img
              src={floor.logo}
              alt=""
              className="rise mb-5 h-16 w-auto max-w-[55vw] object-contain brightness-0 invert"
            />
            <HeroIntro title={floor.name} words />
            <MezzoActions hero />
          </div>
        </PageHero>
      )}
    </EImage>
  )
}

function Eyebrow({ k, d, tone = "text-sienna" }: { k: string; d: string; tone?: string }) {
  return (
    <p className={`mb-4 font-serif text-2xs tracking-[0.4em] uppercase sm:text-xs ${tone}`}>
      <EText k={k} d={d} words />
    </p>
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
    <section aria-label="About Mezzo" className="bg-cream py-14 md:py-24">
      <div className="site-container grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-12 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
          <EImage k="intro.image" d="/images/mezzo/dining-room-table.webp">
            {(src) => (
              <ParallaxImage
                src={src}
                alt="Wine and a shared plate on a candlelit table"
                speed={0.08}
              />
            )}
          </EImage>
        </div>
        <FadeIn delay={0.12} stagger>
          <Eyebrow k="intro.eyebrow" d="Sienna Mercato, Second Floor" />
          <h2 className="font-display text-3xl leading-none text-ink md:text-4xl">
            <EText k="intro.title" d="Mezzo" words={0.15} />
          </h2>
          <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink-soft">
            <EText
              k="intro.summary"
              d="Mezzo is for slowing down. On Sienna Mercato’s second floor, settle in for a candlelit dinner of hand-rolled pasta, wood-fired pizza and Italian wine, with time for another course or a second glass."
              words={0.3}
            />
          </p>
          <MezzoActions />
        </FadeIn>
      </div>
      <Values />
    </section>
  )
}

function Values() {
  const lineRef = useInView<HTMLDivElement>()
  return (
    <div className="site-container mt-14 md:mt-16">
      <div ref={lineRef} aria-hidden="true" className="draw-line h-[1.5px] bg-ink/45" />
      <ul
        aria-label="What Mezzo stands for"
        className="grid grid-cols-3 gap-4 pt-10 text-center sm:gap-8 md:pt-14"
      >
        {VALUES.map((value, index) => (
          <li key={value.id} className="flex flex-col items-center">
            <MezzoValueIcon
              name={value.icon}
              delay={0.4 + index * 0.15}
              className="h-auto w-full max-w-[11rem] text-ink-soft/80 md:max-w-[13rem]"
            />
            <p className="mt-4 font-body text-[clamp(0.85rem,2.4vw,1.15rem)] leading-snug text-ink">
              <EText k={`values.${value.id}.label`} d={value.label} words />
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Gallery() {
  const galleryRef = useScrollScale<HTMLDivElement>()

  return (
    <section aria-label="Mezzo photo gallery" className="bg-sienna-deep py-10 md:py-20">
      <div ref={galleryRef} className="site-container grid grid-cols-3 items-center gap-2 sm:gap-4">
        {GALLERY_PHOTOS.map((image, index) => (
          <div
            key={image.id}
            data-scroll-scale
            className={index === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}
          >
            <div className="relative h-full overflow-hidden bg-paper-deep motion-safe:[scale:var(--scroll-image-scale,1)]">
              <EImage k={`gallery.${image.id}.image`} d={image.photo}>
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
              <EImage k={`highlights.${feature.id}.image`} d={feature.photo}>
                {(src) => <ParallaxImage src={src} alt={feature.alt} loading="lazy" speed={0.08} />}
              </EImage>
            </div>
            <FadeIn delay={0.12} className="mezzo-highlight-copy" stagger>
              <div className={index > 0 ? "pt-3" : ""}>
                <Eyebrow k={`highlights.${feature.id}.eyebrow`} d={feature.eyebrow} />
              </div>
              <h2
                className={`font-display text-[clamp(1.16rem,calc(2.4vw*var(--site-type-scale)),2.12rem)] leading-none whitespace-nowrap text-ink`}
              >
                <EText k={`highlights.${feature.id}.title`} d={feature.title} words={0.12} />
              </h2>
              <p className="mt-4 max-w-sm font-body text-[0.9rem] leading-relaxed text-ink-soft">
                <EText k={`highlights.${feature.id}.body`} d={feature.body} words={0.3} />
              </p>
              <MezzoValueIcon
                name={feature.icon}
                delay={0.5}
                className="mt-6 h-auto w-full max-w-[10rem] text-ink-soft/80 md:mt-5 md:max-w-[7rem] lg:max-w-[9rem]"
              />
            </FadeIn>
          </article>
        ))}
      </div>
    </section>
  )
}

function FeaturedDishes() {
  const dishesRef = useScrollScale<HTMLUListElement>()

  return (
    <section aria-labelledby="mezzo-featured-dishes" className="bg-cream py-16 text-ink md:py-24">
      <div className="site-container">
        <FadeIn className="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-10" stagger>
          <div>
            <Eyebrow k="sampleMenu.eyebrow" d="From the Kitchen" />
            <h2
              id="mezzo-featured-dishes"
              className="font-display text-[clamp(2rem,calc(4vw*var(--site-type-scale)),3.5rem)] leading-none"
            >
              <EText k="sampleMenu.title" d="Featured dishes" words={0.12} />
            </h2>
          </div>
          <ELink
            k="sampleMenu.link"
            label="View the full menu"
            href={FLOORS.mezzo.menuHref}
            className="btn-lift btn-fill border border-ink/30 text-ink"
          />
        </FadeIn>
        <ul
          ref={dishesRef}
          className="grid grid-cols-2 gap-x-[0.8rem] gap-y-[1.6rem] sm:gap-x-[1.2rem] md:grid-cols-3 lg:grid-cols-5"
        >
          {MENU_SAMPLES.map((dish) => (
            <li key={dish.id}>
              <div data-scroll-scale className="aspect-[4/5]">
                <div className="relative h-full overflow-hidden bg-paper-deep motion-safe:[scale:var(--scroll-image-scale,1)]">
                  <EImage k={`sampleMenu.${dish.id}.image`} d={dish.photo}>
                    {(src) => (
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </EImage>
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight">
                <EText k={`sampleMenu.${dish.id}.name`} d={dish.name} words />
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
                <EText k={`sampleMenu.${dish.id}.description`} d={dish.description} words={0.15} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Reservations() {
  const hoursRef = useInView<HTMLUListElement>()
  return (
    <section
      id="reserve"
      className="relative scroll-mt-20 overflow-hidden bg-sienna-deep text-cream"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-2 lg:items-start lg:px-12">
        <FadeIn className="pt-0 lg:pt-2" stagger>
          <Eyebrow k="reserve.eyebrow" d="Book a Table" tone="text-cream/60" />
          <h2 className="font-display text-[clamp(2.5rem,calc(5vw*var(--site-type-scale)),4rem)] leading-[0.9]">
            <EText k="reserve.title" d="Reserve at Mezzo" words={0.12} />
          </h2>
          <p className="mt-6 mb-8 max-w-md font-body text-lg leading-relaxed text-cream/80">
            <EText
              k="reserve.body"
              d="Mezzo takes reservations online, seven days out. Bar seats are walk-in. Larger parties of six or more, call us directly."
              words={0.3}
            />
          </p>
          <ReservationPanel restaurant="mezzo" tone="dark" fillHover />
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="border-t border-cream/20 pt-12 lg:border-t-0 lg:border-l lg:border-l-cream/20 lg:pt-2 lg:pl-12">
            <div className="mb-5 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
              Hours
            </div>
            <ul ref={hoursRef} className="line-reveal divide-y divide-cream/15">
              {HOURS.map((row, i) => (
                <li
                  key={row.day}
                  className="flex items-baseline gap-4 py-3"
                  style={{ "--line": i } as CSSProperties}
                >
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
              <EText k="hours.note" d="Last seating 30 min before close. Bar pours later." words />
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
      <SectionBreak icon="stairs" className="mx-auto mb-10 max-w-[1400px] text-cream/85 md:mb-12" />
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
