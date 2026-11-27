import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { BuildingTour } from "@/components/building-tour"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { HeroImage } from "@/components/hero"
import { ParallaxImage } from "@/components/parallax-image"
import { ReserveLink, reserveSummary, useSettings } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { UpcomingEvents } from "@/components/upcoming-events"
import { FEATURED_DISHES, FLOOR_HOURS } from "@/content/home"
import { useScrollCorners } from "@/hooks/use-scroll-corners"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, PHONE, unsplash } from "@/lib/site"

const JSON_LD = {
  ...restaurantJsonLd({ name: "Sienna Mercato", path: "/", reservations: true }),
  department: (["emporio", "mezzo", "tetto"] as const).map((id) =>
    restaurantJsonLd({
      name: `${FLOORS[id].name} at Sienna Mercato`,
      path: FLOORS[id].href,
      menuPath: FLOORS[id].menuHref,
      reservations: id === "mezzo",
    }),
  ),
}

export function Home() {
  return (
    <PageContent page="home">
      <div className="relative">
        <Seo path="/" {...PAGE_SEO["/"]} jsonLd={JSON_LD} />
        <Hero />
        <BuildingTour />
        <FeaturedDishes />
        <UpcomingEvents />
        <EventsAndCatering />
        <Visit />
      </div>
    </PageContent>
  )
}

function Hero() {
  return (
    <section data-no-reveal className="h-hero relative w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <EImage k="hero.image" d={unsplash("1414235077428-338989a2e8c0", 2400, 80)}>
          {(src) => <HeroImage src={src} alt="Sienna Mercato rooftop terrace" />}
        </EImage>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/30 to-ink/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent,rgba(26,18,11,0.4))]" />
      </div>

      <div className="absolute top-24 right-0 left-0 z-10 mx-auto hidden max-w-[1600px] items-center justify-center px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase md:flex lg:px-12">
        <span className="inline-flex items-center gap-2">
          <i className="ph ph-map-pin text-sm" />
          942 Penn Avenue, Pittsburgh
        </span>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-end px-6 pb-40 text-center lg:px-12">
        <div className="mx-auto max-w-3xl">
          {/* The name stays for search engines and screen readers, not on screen. */}
          <h1 className="sr-only">Sienna Mercato</h1>
          <div
            className="rise flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.65s" }}
          >
            <ELink
              k="hero.reserve"
              label="Reserve a table"
              href="#visit"
              className="btn-lift group bg-sienna text-cream"
            >
              {(label) => (
                <>
                  <i className="ph ph-fork-knife text-base" />
                  {label}
                </>
              )}
            </ELink>
            <HeroOrder />
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-8 left-0 z-10 flex justify-center">
        <div className="text-cream/60">
          <i className="ph ph-caret-down animate-bounce text-xl" />
        </div>
      </div>
    </section>
  )
}

function HeroOrder() {
  const settings = useSettings()
  if (!settings) return <span className="h-11 w-40" />
  return (
    <ELink
      k="hero.order"
      label="Order pickup"
      href={settings.orderUrl}
      className="btn-lift group border border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
    >
      {(label) => (
        <>
          <i className="ph ph-bag text-base" />
          {label}
        </>
      )}
    </ELink>
  )
}

function FeaturedDishes() {
  const region = useScrollCorners<HTMLElement>(FEATURED_DISHES)
  const gridRef = useRef<HTMLDivElement>(null)
  const firstPhotoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    const firstPhoto = firstPhotoRef.current
    if (!grid || !firstPhoto) return

    const motion = window.matchMedia(
      "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
    )
    let frame = 0

    const update = () => {
      frame = 0
      if (!motion.matches) return

      const { top, height } = firstPhoto.getBoundingClientRect()
      const viewport = window.innerHeight
      const distance = top + height / 2 - viewport / 2
      const progress = Math.min(1, Math.max(0, distance / (viewport / 2)))
      const stagger = Math.min(140, height * 0.3)
      grid.style.setProperty("--featured-dish-offset", `${progress * stagger}px`)
    }

    const schedule = () => {
      if (motion.matches && !frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", update)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={region}
      aria-labelledby="featured-dishes"
      className="relative bg-cream py-24 lg:py-32"
    >
      <div className="site-container">
        <FadeIn className="mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2
            id="featured-dishes"
            className="font-display text-[clamp(1.4rem,calc(5.6vw*var(--site-type-scale)),4.8rem)] leading-[0.9] whitespace-nowrap text-ink uppercase"
          >
            <EText k="dishes.title" d="Featured" />{" "}
            <span className="text-sienna">
              <EText k="dishes.titleAccent" d="Dishes" />
            </span>
          </h2>
          <p className="pb-1 font-body text-sm leading-snug text-ink-soft sm:text-right md:whitespace-nowrap">
            <EText k="dishes.note" d="One favorite from every floor, picked by our chefs." />
          </p>
        </FadeIn>

        <div ref={gridRef} className="featured-dishes-grid grid gap-x-8 gap-y-10 md:grid-cols-3">
          {FEATURED_DISHES.map((dish, index) => {
            const floor = FLOORS[dish.floor]
            return (
              <article key={floor.id} className="dish-card flex flex-col">
                <div
                  ref={index === 0 ? firstPhotoRef : undefined}
                  data-scroll-corners
                  className="relative aspect-square overflow-hidden bg-paper-deep"
                >
                  <EImage k={`${dish.contentKey}.image`} d={dish.image}>
                    {(src) => (
                      <img
                        src={src}
                        alt={dish.name}
                        loading="lazy"
                        className="dish-img h-full w-full object-cover"
                      />
                    )}
                  </EImage>
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl leading-tight text-ink lg:text-3xl">
                    <EText k={`${dish.contentKey}.name`} d={dish.name} />
                  </h3>
                  <span className="font-serif text-lg text-sienna tabular-nums">
                    <EText k={`${dish.contentKey}.price`} d={`$${dish.price}`} />
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-ink-soft">
                  <img
                    src={floor.logo}
                    alt=""
                    className="h-5 w-auto max-w-20 object-contain brightness-0"
                  />
                  <span className="font-serif text-sm">{floor.name}</span>
                </div>
                <div className="mt-auto pt-5">
                  <Link
                    to={floor.menuHref}
                    aria-label={`Find more dishes at ${floor.name}`}
                    className="btn-lift group border border-ink text-ink hover:bg-ink hover:text-cream"
                  >
                    Find more
                    <i
                      aria-hidden="true"
                      className="ph ph-arrow-right text-sm transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function EventsAndCatering() {
  const section = useRef<HTMLElement>(null)
  const corners = useScrollCorners<HTMLDivElement>(undefined)

  // The photo opens from a rounded window at 60% size to full bleed as the section scrolls in.
  useEffect(() => {
    const el = section.current
    if (!el) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      const open = motion.matches ? 1 : Math.min(1, Math.max(0, (vh - top) / vh))
      el.style.setProperty("--card-photo-open", (open * open * (3 - 2 * open)).toFixed(4))
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
    <section
      ref={section}
      aria-label="Private events and catering"
      className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-paper px-6 py-24"
    >
      <div className="card-photo-window absolute inset-0 overflow-hidden bg-ink">
        <EImage k="eventsCatering.image" d={unsplash("1519671482749-fd09be7ccebf", 2400, 80)}>
          {(src) => (
            <ParallaxImage
              src={src}
              alt="A candlelit dining table set for a private event"
              speed={0.18}
              loading="lazy"
            />
          )}
        </EImage>
        <div className="pointer-events-none absolute inset-0 bg-ink/15" />
      </div>
      <div ref={corners} className="relative w-full max-w-4xl">
        <div
          data-scroll-corners
          data-scroll-corners-max="48"
          className="grid overflow-hidden bg-white shadow-2xl sm:grid-cols-2"
        >
          <div className="flex flex-col justify-between gap-8 px-8 py-12 sm:gap-12 sm:px-12 sm:py-20 lg:px-14 lg:py-24">
            <div>
              <h2 className="font-display text-[clamp(2rem,calc(4vw*var(--site-type-scale)),3.25rem)] leading-[0.95] text-ink">
                <EText k="events.title" d="Book a floor." />
                <br />
                <span className="text-sienna">
                  <EText k="events.titleAccent" d="Make it yours." />
                </span>
              </h2>
              <p className="mt-4 max-w-md font-body leading-relaxed text-ink-soft">
                <EText
                  k="events.body"
                  d="Three floors available for private hire. Up to 400 guests. The events team handles the rest."
                />
              </p>
            </div>
            <ELink
              k="events.link"
              label="Events & private dining"
              href="/events"
              className="btn-lift group w-fit bg-sienna text-cream hover:bg-sienna-deep"
            >
              {(label) => (
                <>
                  <i className="ph ph-calendar-dots text-base" />
                  {label}
                  <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
                </>
              )}
            </ELink>
          </div>
          <div className="relative flex flex-col justify-between gap-8 px-8 py-12 sm:gap-12 sm:px-12 sm:py-20 lg:px-14 lg:py-24">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-ink/10 sm:inset-y-20 sm:right-auto sm:left-0 sm:h-auto sm:w-px lg:inset-y-24"
            />
            <div>
              <h2 className="font-display text-[clamp(2rem,calc(4vw*var(--site-type-scale)),3.25rem)] leading-[0.95] text-ink">
                <EText k="catering.title" d="Two kitchens." />
                <br />
                <span className="text-sienna">
                  <EText k="catering.titleAccent" d="Delivered to you." />
                </span>
              </h2>
              <p className="mt-4 max-w-md font-body leading-relaxed text-ink-soft">
                <EText
                  k="catering.body"
                  d="Casual family-style or plated-ready charcuterie. Citywide delivery, 48-hour notice."
                />
              </p>
            </div>
            <ELink
              k="catering.link"
              label="Catering menu"
              href="/catering"
              className="btn-lift group w-fit bg-sienna text-cream hover:bg-sienna-deep"
            >
              {(label) => (
                <>
                  <i className="ph ph-bag text-base" />
                  {label}
                  <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
                </>
              )}
            </ELink>
          </div>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const settings = useSettings()
  return (
    <section id="visit" className="relative scroll-mt-20 overflow-hidden bg-ink text-cream">
      <FadeIn>
        <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1.3fr_1fr] lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,calc(6vw*var(--site-type-scale)),5.5rem)] leading-[0.85]">
              <EText k="visit.title" d="Reserve" />{" "}
              <span>
                <EText k="visit.titleAccent" d="a table." />
              </span>
            </h2>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-cream/85">
              <EText
                k="visit.body"
                d="Each floor books its own way. Pick a floor below, or give us a call."
              />
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {(["tetto", "mezzo", "emporio"] as const).map((id) => {
                const reservation = settings?.reservations[id]
                return (
                  <ReserveLink
                    key={id}
                    restaurant={id}
                    className="btn-lift group bg-cream text-sienna hover:bg-paper"
                  >
                    <i className="ph ph-calendar-dots text-base" />
                    {FLOORS[id].name}
                    <span className="font-body text-2xs tracking-normal text-ink-soft normal-case">
                      {reserveSummary(reservation?.mode, reservation?.note)}
                    </span>
                  </ReserveLink>
                )
              })}
              <a href={PHONE.href} className="btn-lift border border-cream/60 hover:bg-cream/10">
                <i className="ph ph-phone text-base" />
                {PHONE.label}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-6 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
              Hours
            </div>
            <ul className="divide-y divide-cream/20 border-y border-cream/20">
              {FLOOR_HOURS.map(({ floor, days, open, close }) => (
                <li key={floor.name} className="flex items-center gap-5 py-5">
                  <img
                    src={floor.logo}
                    alt={floor.name}
                    className="h-5 w-auto opacity-70 brightness-0 invert"
                  />
                  <span className="font-body text-sm text-cream/85 tabular-nums">
                    <EText k={`hours.${floor.id}`} d={`${days}, ${open} to ${close}`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
