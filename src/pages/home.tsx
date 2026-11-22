import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import { HeroImage } from "@/components/hero"
import { ParallaxImage } from "@/components/parallax-image"
import { FEATURED_DISHES, FLOOR_HOURS, HOME_FLOORS, TONIGHT, type HomeFloor } from "@/content/home"
import { useStaggerReveal } from "@/hooks/use-reveal"
import { FLOORS, ORDER_URL, PHONE, RESERVE_URL, unsplash } from "@/lib/site"

export function Home() {
  return (
    <div className="relative">
      <Hero />
      <Manifesto />
      <section className="relative">
        {HOME_FLOORS.map((floor, index) => (
          <FloorFeature key={floor.id} floor={floor} index={index} />
        ))}
      </section>
      <FeaturedDishes />
      <Tonight />
      <EventsAndCatering />
      <Visit />
    </div>
  )
}

function Hero() {
  return (
    <section className="h-hero relative w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <HeroImage
          src={unsplash("1414235077428-338989a2e8c0", 2400, 80)}
          alt="Sienna Mercato rooftop terrace"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/30 to-ink/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent,rgba(26,18,11,0.4))]" />
      </div>

      <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
        <span className="hidden flex-1 items-center gap-2 sm:flex">
          <span className="inline-block h-px w-8 bg-cream/40" />
          Established 2013
        </span>
        <span className="hidden items-center gap-2 md:inline-flex">
          <i className="ph ph-map-pin text-sm" />
          942 Penn Avenue · Pittsburgh
        </span>
        <span className="flex flex-1 items-center justify-end gap-2">
          Three floors · One roof
          <span className="inline-block h-px w-8 bg-cream/40" />
        </span>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-end px-6 pb-40 text-center lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div
            className="rise mb-5 flex items-center justify-center gap-3 font-serif text-base tracking-wide text-cream/65"
            style={{ animationDelay: "0.1s" }}
          >
            <span>Trattoria · Pizzeria · Rooftop</span>
          </div>
          <h1
            className="rise text-hero-shadow font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
            style={{ animationDelay: "0.35s" }}
          >
            Sienna <span className="font-italic font-light text-cream/90 italic">Mercato</span>
          </h1>
          <div
            className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.65s" }}
          >
            <ExternalLink
              href={RESERVE_URL}
              className="btn-lift group inline-flex items-center gap-2 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase"
            >
              <i className="ph ph-fork-knife text-base" />
              Reserve a table
              <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ExternalLink>
            <ExternalLink
              href={ORDER_URL}
              className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
            >
              <i className="ph ph-bag text-base" />
              Order pickup
            </ExternalLink>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-8 left-0 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-3 text-cream/60">
          <span className="font-serif text-2xs tracking-[0.4em] uppercase">scroll</span>
          <i className="ph ph-caret-down animate-bounce text-xl" />
        </div>
      </div>
    </section>
  )
}

function Manifesto() {
  return (
    <section className="grain relative overflow-hidden bg-paper py-40 text-center">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={unsplash("1555396273-367ea4eb4db5", 2000, 60)}
          alt=""
          className="h-full w-full object-cover opacity-[0.045] mix-blend-multiply"
        />
      </div>
      <div className="relative mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="mb-8 font-serif text-xs tracking-[0.5em] text-sienna uppercase">
            the italian house
          </div>
          <p className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.1] text-ink">
            Three floors.
            <span className="font-italic text-sienna italic"> Three rooms. </span>
            One Italian house on Penn Avenue.
          </p>
          <p className="mx-auto mt-10 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
            A Cultural District landmark since 2013. One address at 942 Penn Avenue — 230 indoor
            seats, 120 on the rooftop, an Italian-led wine list of 90+ bottles, and 30 rotating
            drafts.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function FloorFeature({ floor, index }: { floor: HomeFloor; index: number }) {
  const flipped = index % 2 === 1
  const corner = flipped ? "right-8" : "left-8"

  return (
    <FadeIn delay={0.05}>
      <div
        id={floor.id}
        className="relative overflow-hidden"
        style={{ background: index === 1 ? "var(--color-cream)" : undefined }}
      >
        <div
          className={`mx-auto grid max-w-[1600px] gap-0 lg:min-h-[720px] ${
            flipped ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"
          }`}
        >
          <div
            className={`group relative h-[420px] overflow-hidden lg:h-auto ${flipped ? "lg:order-2" : ""}`}
          >
            <ParallaxImage
              src={floor.image}
              alt={floor.name}
              className="transition-transform duration-700 group-hover:scale-[1.04]"
              speed={0.13}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${floor.tint} opacity-25 mix-blend-multiply`}
            />
            <div
              className={`absolute ${corner} top-8 font-display text-8xl leading-none text-cream/90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:text-9xl`}
            >
              {floor.roman}
            </div>
            <div
              className={`absolute ${corner} bottom-8 flex items-center gap-3 font-serif text-xs tracking-[0.4em] text-cream/80 uppercase`}
            >
              <span className="inline-block h-px w-10 bg-cream/60" />
              {`Floor ${index + 1}`}
            </div>
          </div>

          <FloorText floor={floor} />
        </div>
      </div>
    </FadeIn>
  )
}

function FloorText({ floor }: { floor: HomeFloor }) {
  const staggerRef = useStaggerReveal<HTMLDivElement>()

  return (
    <div ref={staggerRef} className="relative flex flex-col justify-center px-6 py-20 lg:px-20">
      <img
        src={floor.logo}
        alt={`${floor.name} logo`}
        className="mb-6 h-16 w-auto object-left opacity-70 brightness-0"
        style={{ objectFit: "contain", objectPosition: "left" }}
      />
      <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
        {floor.name}
      </h2>
      <div className="mt-4 font-serif text-lg tracking-[0.3em] text-ink-soft uppercase">
        {floor.sub}
      </div>
      <p className="mt-3 max-w-xl font-body text-lg leading-relaxed text-ink-soft">{floor.desc}</p>
      <ul className="mt-5 max-w-xl divide-y divide-ink/10 border-y border-ink/10">
        {floor.items.map((item) => (
          <li key={item.name} className="flex items-baseline gap-4 py-4">
            <span className="font-serif text-base tracking-wide text-ink">{item.name}</span>
            <span className="hidden font-body text-sm text-ink-soft sm:inline">{item.note}</span>
            <span className="font-serif text-base text-sienna tabular-nums">
              {item.price ? `$${item.price}` : ""}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          to={floor.href}
          className="btn-lift group inline-flex items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
        >
          Explore the floor
          <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href="#visit"
          className="under inline-flex items-center gap-2 font-serif text-sienna hover:text-sienna-bright"
        >
          <i className="ph ph-clock text-lg" />
          Hours
        </a>
      </div>
    </div>
  )
}

function FeaturedDishes() {
  return (
    <section className="relative bg-cream py-32">
      <FadeIn>
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
                Featured
                <br />
                <span className="font-italic text-sienna italic">Dishes.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DISHES.map((dish) => (
              <article
                key={dish.name}
                className="dish-card group relative aspect-[4/3] overflow-hidden bg-ink"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-paper/90 px-3 py-2">
                  <img
                    src={FLOORS[dish.floor].logo}
                    alt={FLOORS[dish.floor].name}
                    className="h-4 w-auto opacity-70 brightness-0"
                  />
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl leading-tight text-cream">{dish.name}</h3>
                    <span className="font-serif text-lg text-cream tabular-nums">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-snug text-cream/75">{dish.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function Tonight() {
  return (
    <section id="tonight" className="bg-sienna py-28 text-cream">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
                Tonight at <span className="font-italic italic">Sienna</span>
              </h2>
            </div>
            <div className="max-w-sm font-serif text-sm tracking-[0.3em] text-cream/60 uppercase">
              Updated daily
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-px bg-cream/20 sm:grid-cols-2 lg:grid-cols-4">
          {TONIGHT.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.1} className="h-full">
              <div className="group h-full bg-sienna p-8 transition-colors hover:bg-sienna-deep">
                <i className={`ph-duotone ${card.icon} text-4xl text-cream/60`} />
                <div className="mt-8 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
                  {card.tag}
                </div>
                <h3 className="mt-2 font-display text-3xl leading-tight text-cream">
                  {card.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">{card.desc}</p>
                <div className="mt-6 font-serif text-xs tracking-[0.25em] text-cream/60 uppercase">
                  {card.meta}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsAndCatering() {
  return (
    <section className="relative bg-paper py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-px bg-ink/10 lg:grid-cols-2">
          <FadeIn>
            <div className="flex flex-col justify-between gap-10 bg-paper p-10 lg:p-14">
              <div>
                <div className="mb-3 font-serif text-2xs tracking-[0.5em] text-sienna uppercase">
                  private events
                </div>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
                  Book a floor.
                  <br />
                  <span className="font-italic text-sienna italic">Make it yours.</span>
                </h2>
                <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
                  Three floors available for private hire. Up to 400 guests. The events team handles
                  the rest.
                </p>
              </div>
              <Link
                to="/events"
                className="btn-lift group inline-flex w-fit items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
              >
                <i className="ph ph-calendar-dots text-base" />
                Private events
                <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col justify-between gap-10 bg-cream p-10 lg:p-14">
              <div>
                <div className="mb-3 font-serif text-2xs tracking-[0.5em] text-sienna uppercase">
                  catering
                </div>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
                  Two kitchens.
                  <br />
                  <span className="font-italic text-sienna italic">Delivered to you.</span>
                </h2>
                <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
                  Casual family-style or plated-ready charcuterie. Citywide delivery, 48-hour
                  notice.
                </p>
              </div>
              <Link
                to="/catering"
                className="btn-lift group inline-flex w-fit items-center gap-3 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
              >
                <i className="ph ph-bag text-base" />
                Catering menu
                <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section id="visit" className="relative overflow-hidden bg-sienna text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <FadeIn>
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1.3fr_1fr] lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85]">
              Reserve
              <br />
              <span className="font-italic italic">a table.</span>
            </h2>
            <p className="mt-8 max-w-xl font-body text-lg leading-relaxed text-cream/85">
              Mezzo takes reservations via OpenTable. Emporio and Il Tetto are walk-in.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ExternalLink
                href={RESERVE_URL}
                className="btn-lift group inline-flex items-center gap-3 bg-cream px-8 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper"
              >
                <i className="ph ph-calendar-dots text-lg" />
                Reserve Mezzo
                <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ExternalLink>
              <a
                href={PHONE.href}
                className="btn-lift inline-flex items-center gap-3 border border-cream/60 px-8 py-4 font-serif text-sm tracking-[0.3em] uppercase transition-colors hover:bg-cream/10"
              >
                <i className="ph ph-phone text-lg" />
                {PHONE.label}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-6 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
              Hours · by floor
            </div>
            <ul className="divide-y divide-cream/20 border-y border-cream/20">
              {FLOOR_HOURS.map(({ floor, hours }) => (
                <li key={floor.name} className="flex items-center gap-5 py-5">
                  <img
                    src={floor.logo}
                    alt={floor.name}
                    className="h-5 w-auto opacity-70 brightness-0 invert"
                  />
                  <span className="font-body text-sm text-cream/85 tabular-nums">{hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-body text-sm leading-relaxed text-cream/70">
              The rooftop closes when the sky says so.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
