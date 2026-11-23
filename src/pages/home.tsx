import { useQuery } from "convex/react"
import { Link } from "react-router"
import { EImage, ELink, EText, PageContent } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { HeroImage } from "@/components/hero"
import { ParallaxImage } from "@/components/parallax-image"
import { ReserveLink, reserveSummary, useSettings } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { FEATURED_DISHES, FLOOR_HOURS, HOME_FLOORS, TONIGHT, type HomeFloor } from "@/content/home"
import { useStaggerReveal } from "@/hooks/use-reveal"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, PHONE, unsplash, type FloorId } from "@/lib/site"
import { weekdayToday } from "@/lib/util"
import { api } from "../../convex/_generated/api"

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
    </PageContent>
  )
}

function Hero() {
  return (
    <section className="h-hero relative w-full overflow-hidden bg-ink">
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
          <h1
            className="rise text-hero-shadow font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
            style={{ animationDelay: "0.35s" }}
          >
            <EText k="hero.title" d="Sienna" />{" "}
            <span className="font-italic font-light text-cream/90 italic">
              <EText k="hero.titleAccent" d="Mercato" />
            </span>
          </h1>
          <div
            className="rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "0.65s" }}
          >
            <ELink
              k="hero.reserve"
              label="Reserve a table"
              href="#visit"
              className="btn-lift group inline-flex items-center gap-2 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase"
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
      className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
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
          <p className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.1] text-ink">
            <EText k="manifesto.line1" d="Three floors." />
            <span className="font-italic text-sienna italic">
              {" "}
              <EText k="manifesto.line2" d="Three rooms." />{" "}
            </span>
            <EText k="manifesto.line3" d="One Italian house on Penn Avenue." />
          </p>
          <p className="mx-auto mt-10 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
            <EText
              k="manifesto.body"
              d="A Cultural District landmark since 2013. One address at 942 Penn Avenue: 230 indoor seats, 120 on the rooftop, an Italian-led wine list of 90+ bottles, and 30 rotating drafts."
            />
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
            <EImage k={`floor.${floor.id}.image`} d={floor.image}>
              {(src) => (
                <ParallaxImage
                  src={src}
                  alt={floor.name}
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                  speed={0.13}
                />
              )}
            </EImage>
            <div
              className={`absolute inset-0 bg-gradient-to-t ${floor.tint} opacity-25 mix-blend-multiply`}
            />
            <div
              className={`absolute ${corner} top-8 font-display text-8xl leading-none text-cream/90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:text-9xl`}
            >
              {floor.roman}
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
        <EText k={`floor.${floor.id}.sub`} d={floor.sub} />
      </div>
      <p className="mt-3 max-w-xl font-body text-lg leading-relaxed text-ink-soft">
        <EText k={`floor.${floor.id}.desc`} d={floor.desc} />
      </p>
      <ul className="mt-5 max-w-xl divide-y divide-ink/10 border-y border-ink/10">
        {floor.items.map((item, i) => (
          <li key={item.name} className="flex items-baseline gap-4 py-4">
            <span className="font-serif text-base tracking-wide text-ink">
              <EText k={`floor.${floor.id}.item${i}.name`} d={item.name} />
            </span>
            <span className="hidden font-body text-sm text-ink-soft sm:inline">
              <EText k={`floor.${floor.id}.item${i}.note`} d={item.note} />
            </span>
            <span className="font-serif text-base text-sienna tabular-nums">
              <EText
                k={`floor.${floor.id}.item${i}.price`}
                d={item.price ? `$${item.price}` : ""}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4">
        <ELink
          k={`floor.${floor.id}.link`}
          label="Explore the floor"
          href={floor.href}
          className="btn-lift group inline-flex items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
        >
          {(label) => (
            <>
              {label}
              <i className="ph ph-arrow-right text-base transition-transform group-hover:translate-x-1" />
            </>
          )}
        </ELink>
        <Link
          to={floor.menuHref}
          className="under inline-flex items-center gap-2 font-serif text-sienna hover:text-sienna-bright"
        >
          <i className="ph ph-list-magnifying-glass text-lg" />
          Menu
        </Link>
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
                <EText k="dishes.title" d="Featured" />
                <br />
                <span className="font-italic text-sienna italic">
                  <EText k="dishes.titleAccent" d="Dishes." />
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DISHES.map((dish, i) => (
              <article
                key={dish.name}
                className="dish-card group relative aspect-[4/3] overflow-hidden bg-ink"
              >
                <EImage k={`dishes.${i}.image`} d={dish.image}>
                  {(src) => (
                    <img
                      src={src}
                      alt={dish.name}
                      className="dish-img absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </EImage>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-paper/90 px-3 py-2">
                  <img
                    src={FLOORS[dish.floor].logo}
                    alt={FLOORS[dish.floor].name}
                    className="h-4 w-auto opacity-70 brightness-0"
                  />
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-3xl leading-tight text-cream">
                      <EText k={`dishes.${i}.name`} d={dish.name} />
                    </h3>
                    <span className="font-serif text-lg text-cream tabular-nums">
                      <EText k={`dishes.${i}.price`} d={`$${dish.price}`} />
                    </span>
                  </div>
                  <p className="mt-2 font-body text-sm leading-snug text-cream/75">
                    <EText k={`dishes.${i}.desc`} d={dish.desc} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function useTodaysSpecials() {
  const emporio = useQuery(api.specials.list, { restaurant: "emporio" })
  const mezzo = useQuery(api.specials.list, { restaurant: "mezzo" })
  const tetto = useQuery(api.specials.list, { restaurant: "tetto" })
  if (!emporio || !mezzo || !tetto) return undefined
  const day = weekdayToday()
  return (
    [
      ["emporio", emporio],
      ["mezzo", mezzo],
      ["tetto", tetto],
    ] as [FloorId, typeof emporio][]
  ).flatMap(([id, rows]) =>
    rows.filter((row) => row.days.includes(day)).map((row) => ({ ...row, floor: FLOORS[id] })),
  )
}

function Tonight() {
  const specials = useTodaysSpecials()

  return (
    <section id="tonight" className="scroll-mt-20 bg-sienna py-28 text-cream">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14">
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
              <EText k="tonight.title" d="Tonight at" />{" "}
              <span className="font-italic italic">
                <EText k="tonight.titleAccent" d="Sienna" />
              </span>
            </h2>
          </div>
        </FadeIn>

        {specials === undefined ? (
          <div className="h-64" />
        ) : specials.length > 0 ? (
          <div className="grid gap-px bg-cream/20 sm:grid-cols-2 lg:grid-cols-4">
            {specials.slice(0, 8).map((special, index) => (
              <FadeIn key={special._id} delay={(index % 4) * 0.1} className="h-full">
                <Link
                  to={`${special.floor.href}#specials`}
                  className="group block h-full bg-sienna p-8 transition-colors hover:bg-sienna-deep"
                >
                  <img
                    src={special.floor.logo}
                    alt={special.floor.name}
                    className="h-6 w-auto opacity-60 brightness-0 invert"
                  />
                  <div className="mt-8 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase">
                    Today's special
                  </div>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-cream">
                    {special.name}
                  </h3>
                  {special.desc && (
                    <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">
                      {special.desc}
                    </p>
                  )}
                  <div className="mt-6 font-serif text-xs tracking-[0.25em] text-cream/60 uppercase">
                    {special.price && `${/^\d/.test(special.price) ? "$" : ""}${special.price} • `}
                    {special.floor.name}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
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
                    {"until" in card && ` to ${card.until}`}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-cream/80">
                    {card.desc}
                  </p>
                  <div className="mt-6 font-serif text-xs tracking-[0.25em] text-cream/60 uppercase">
                    {card.meta}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
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
                <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
                  <EText k="events.title" d="Book a floor." />
                  <br />
                  <span className="font-italic text-sienna italic">
                    <EText k="events.titleAccent" d="Make it yours." />
                  </span>
                </h2>
                <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
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
                className="btn-lift group inline-flex w-fit items-center gap-3 border border-ink px-6 py-3 font-serif text-xs tracking-[0.3em] text-ink uppercase transition-colors hover:bg-ink hover:text-cream"
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
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col justify-between gap-10 bg-cream p-10 lg:p-14">
              <div>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.9] text-ink">
                  <EText k="catering.title" d="Two kitchens." />
                  <br />
                  <span className="font-italic text-sienna italic">
                    <EText k="catering.titleAccent" d="Delivered to you." />
                  </span>
                </h2>
                <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-ink-soft">
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
                className="btn-lift group inline-flex w-fit items-center gap-3 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
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
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const settings = useSettings()
  return (
    <section id="visit" className="relative scroll-mt-20 overflow-hidden bg-sienna text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <FadeIn>
        <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 py-28 lg:grid-cols-[1.3fr_1fr] lg:px-12">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85]">
              <EText k="visit.title" d="Reserve" />
              <br />
              <span className="font-italic italic">
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
                    className="btn-lift group inline-flex items-center gap-3 bg-cream px-6 py-3.5 font-serif text-xs tracking-[0.25em] text-sienna uppercase transition-colors hover:bg-paper"
                  >
                    <i className="ph ph-calendar-dots text-base" />
                    {FLOORS[id].name}
                    <span className="font-body text-2xs tracking-normal text-ink-soft normal-case">
                      {reserveSummary(reservation?.mode, reservation?.note)}
                    </span>
                  </ReserveLink>
                )
              })}
              <a
                href={PHONE.href}
                className="btn-lift inline-flex items-center gap-3 border border-cream/60 px-6 py-3.5 font-serif text-xs tracking-[0.25em] uppercase transition-colors hover:bg-cream/10"
              >
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
