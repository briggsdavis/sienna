import { useState } from "react"
import { Link } from "react-router"
import { FadeIn, useParallax } from "../components/animations"

const SPACES = [
  {
    id: "emporio",
    roman: "I",
    name: "Emporio",
    sub: "A Meatball Joint",
    logo: "/emporio.avif",
    capacity: "105",
    vibe: "Energetic · industrial · loud",
    perfect: [
      "Corporate happy hours",
      "Rehearsal dinners",
      "Family celebrations",
      "Birthdays",
    ],
    desc: "Ground floor. Modern-industrial brick and steel, the open kitchen running through service, the bar long enough to seat your whole guest list. Customizable food stations, cocktail packages, no dress code.",
    highlights: [
      "Up to 105 guests, full buyout available",
      "Twelve meatball sauces, custom stations",
      "Full craft cocktail bar & tap program",
      "No dress code, no ceremony required",
    ],
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=70",
    accent: "text-sienna",
    href: "/emporio",
  },
  {
    id: "mezzo",
    roman: "II",
    name: "Mezzo",
    sub: "Pizza & Charcuterie",
    logo: "/mezzo.avif",
    capacity: "90",
    vibe: "Intimate · refined · candlelit",
    perfect: [
      "Cocktail hours",
      "Seated dinners",
      "Rehearsal dinners",
      "Corporate entertaining",
    ],
    desc: "Second floor. Hardwood floors, exposed brick, a wood-beamed ceiling and open-air garage windows that look out over Penn Avenue. Custom menus, custom beverage pairings, wine list included.",
    highlights: [
      "Up to 90 guests, intimate candlelit setting",
      "Chef-built custom menus for every event",
      "90-bottle wine list with full pairings",
      "Wood-fired oven on site, live-fire cooking",
    ],
    image:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1600&q=70",
    accent: "text-sienna",
    href: "/mezzo",
  },
  {
    id: "tetto",
    roman: "III",
    name: "Il Tetto",
    sub: "Rooftop Beer Garden",
    logo: "/iltetto.avif",
    capacity: "200",
    vibe: "Open-air · skyline · all-season",
    perfect: [
      "Weddings",
      "Rehearsal dinners",
      "Corporate parties",
      "Award-night socials",
    ],
    desc: "Third floor. Award-winning rooftop with a retractable glass roof, bistro lights overhead, the Pittsburgh skyline behind every photograph. Chef-crafted catering, curated beverages, a dedicated event team.",
    highlights: [
      "Up to 200 guests, Pittsburgh skyline backdrop",
      "Retractable glass roof, open in any season",
      "Dedicated events team, full-service buyout",
      "30 rotating drafts, full catering from below",
    ],
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=70",
    accent: "text-sienna-bright",
    href: "/tetto",
  },
] as const

const UPCOMING = [
  {
    date: "May 17",
    day: "Sun",
    title: "Jazz Night on the Roof",
    sub: "Live trio · no cover",
    floor: "Il Tetto · Floor III",
    when: "7 PM → close",
    icon: "ph-music-notes",
    tag: "this week",
  },
  {
    date: "May 24",
    day: "Sat",
    title: "Summer Kickoff",
    sub: "Rooftop buyout · open to all",
    floor: "Il Tetto · Floor III",
    when: "5 PM → late",
    icon: "ph-sun-horizon",
    tag: "next week",
  },
  {
    date: "Jun 7",
    day: "Sat",
    title: "Barolo Night",
    sub: "Chef's wine dinner · four courses",
    floor: "Mezzo · Floor II",
    when: "6:30 PM · ticketed",
    icon: "ph-wine",
    tag: "upcoming",
  },
] as const


const REVIEWS = [
  {
    quote:
      "I came here for a wedding on the rooftop and it is a beautiful venue. The food was delicious and the staff was professional and helpful.",
    by: "Jesse V.",
    stars: 5,
  },
  {
    quote:
      "When first tasked with planning our 3-day event, I had to find a hotel and entertainment too. Sienna Mercato, I could not have asked for anyone better. The venue was beautiful, the staff amazing, food delicious, drinks perfection, and the price was right. I'd give it 11 out of 10 stars.",
    by: "Tracy M.",
    stars: 5,
  },
] as const

const CONTACTS = [
  {
    name: "Susan Certo",
    role: "Events Director",
    email: "scerto@siennapgh.com",
    phone: undefined,
  },
  {
    name: "Renee Sroka",
    role: "Private Events",
    email: "rsroka@siennapgh.com",
    phone: "412.360.9031",
  },
] as const

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-sienna">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} className="ph-fill ph-star text-base" />
      ))}
    </div>
  )
}

export function Events() {
  const [submitted, setSubmitted] = useState(false)
  const heroParallax = useParallax(0.22)

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-hero w-full overflow-hidden bg-ink">
        <div ref={heroParallax} className="parallax-hero-wrap">
          <img
            src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2400&q=80"
            alt="A long candlelit table set for a private event at Sienna Mercato"
            className="slow-zoom h-full w-full object-cover opacity-85"
          />
        </div>
        <div className="absolute inset-0 bg-black/58" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <Link
            to="/"
            className="under flex items-center gap-2 hover:text-cream"
          >
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Three floors · 942 Penn Ave
          </span>
          <span className="flex items-center gap-2">
            up to 200 guests
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-12">
          <div className="rise mb-4 flex items-center gap-3 font-serif text-base text-cream/80" style={{ animationDelay: "0.05s" }}>
            <span className="swash swash-white" />
            <span>private events</span>
          </div>
          <h1 className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream" style={{ animationDelay: "0.25s" }}>
            Private Events.
          </h1>
          <p className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75" style={{ animationDelay: "0.45s" }}>
            Three floors available for private hire: a meatball joint, a trattoria, and a rooftop with the Pittsburgh skyline. Up to 400 guests.
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.62s" }}>
            <a
              href="#inquire"
              className="btn-lift group inline-flex items-center gap-2 bg-sienna px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
            >
              <i className="ph ph-envelope text-sm" />
              Inquire now
              <i className="ph ph-arrow-down text-xs transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="https://viewer.threshold360.com/?thresholdId=7761067-1993885746&preset=share"
              target="_blank"
              rel="noreferrer"
              className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
            >
              <i className="ph-duotone ph-cube text-sm" />
              Virtual tour · 360°
              <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="relative bg-ink py-24 text-paper">
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-2 font-serif text-lg text-sienna-bright">
                  on the calendar
                </div>
                <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
                  Three nights coming up.
                </h2>
              </div>
              <p className="max-w-sm font-body text-base leading-relaxed text-paper/65">
                Walk-ins welcome unless noted. Check back for new dates.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-px bg-paper/15 sm:grid-cols-3">
            {UPCOMING.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.1} className="h-full">
                <article className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-sienna-deep/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-serif text-xs tracking-[0.35em] text-paper/50 uppercase">
                        {e.day} · {e.date}
                      </div>
                      <div className="mt-4 font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
                        {e.tag}
                      </div>
                    </div>
                    <i className={`ph-duotone ${e.icon} text-4xl text-sienna-bright/70`} />
                  </div>
                  <h3 className="mt-5 font-display text-4xl leading-tight">{e.title}</h3>
                  <p className="mt-2 font-body text-base text-paper/70">{e.sub}</p>
                  <div className="mt-auto pt-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-serif text-2xs tracking-[0.3em] text-paper/55 uppercase">
                      <i className="ph ph-house-line text-sm" />
                      {e.floor}
                    </div>
                    <div className="flex items-center gap-2 font-serif text-2xs tracking-[0.3em] text-paper/55 uppercase">
                      <i className="ph ph-clock text-sm" />
                      {e.when}
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* THREE FLOORS, accordion */}
      <section className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 font-serif text-lg text-sienna">
                  private event venues
                </div>
                <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
                  Three rooms
                  <br />
                  <span className="font-italic text-sienna italic">
                    for private hire.
                  </span>
                </h2>
              </div>
              <p className="font-body text-lg leading-relaxed text-ink-soft md:text-right">
                Each floor stands alone or stacks with the others, the whole
                building seats nearly four hundred.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <VenueAccordion spaces={SPACES} />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-[1fr_auto]">
              <div className="bg-paper px-8 py-8">
                <div className="mb-2 font-serif text-lg text-sienna">
                  ready to book a floor?
                </div>
                <h3 className="font-display text-3xl leading-tight text-ink">
                  Tell us the date, the headcount,
                  <br />
                  <span className="font-italic text-sienna italic">and we'll handle the rest.</span>
                </h3>
                <p className="mt-3 max-w-lg font-body text-base text-ink-soft">
                  The events team replies within one business day with a floor recommendation, a draft menu, and a price range. No commitment required.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#inquire"
                    className="btn-lift group inline-flex items-center gap-2 bg-sienna px-6 py-3 font-serif text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:bg-sienna-bright"
                  >
                    <i className="ph ph-envelope text-sm" />
                    Send an inquiry
                    <i className="ph ph-arrow-down text-xs transition-transform group-hover:translate-y-0.5" />
                  </a>
                  <a
                    href="https://viewer.threshold360.com/?thresholdId=7761067-1993885746&preset=share"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-lift group inline-flex items-center gap-2 border border-ink/25 px-6 py-3 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:bg-ink/5"
                  >
                    <i className="ph-duotone ph-cube text-sm" />
                    Virtual tour · 360°
                    <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
              <div className="relative hidden overflow-hidden sm:block" style={{ minWidth: "420px" }}>
                <img
                  src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80"
                  alt="Private event at Sienna Mercato"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/30" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="mb-3 font-serif text-lg text-sienna">
                from the guestbook
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] text-ink">
                The guests
                <br />
                <span className="font-italic text-sienna italic">
                  say it best.
                </span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-10 md:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <FadeIn key={r.by} delay={i * 0.12}>
              <figure
                className="relative border-l-2 border-sienna bg-cream/60 p-8 lg:p-10"
              >
                <div className="absolute -top-3 left-8 bg-paper px-3 font-display text-5xl leading-none text-sienna">
                  &ldquo;
                </div>
                <StarRow n={r.stars} />
                <blockquote className="mt-4 font-display text-2xl leading-snug text-ink lg:text-3xl">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 font-body text-sm text-ink-soft">
                  , {r.by} · five-star review
                </figcaption>
              </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM + CONTACTS */}
      <section
        id="inquire"
        className="relative overflow-hidden bg-sienna py-28 text-cream"
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
        <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-12">
          <div>
            <div className="mb-4 font-serif text-lg text-cream/85">
              inquire now
            </div>
            <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.85]">
              Tell us about
              <br />
              <span className="font-italic italic">your night.</span>
            </h2>
            <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-cream/85">
              The events team replies within one business day. Send us the date,
              the headcount, and a sentence about the vibe, we'll send back a
              floor and a draft menu.
            </p>

            <form
              className="mt-10 grid gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Event date" name="date" type="date" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Floor"
                  name="floor"
                  options={[
                    "No preference",
                    "Floor I · Emporio",
                    "Floor II · Mezzo",
                    "Floor III · Il Tetto",
                    "Whole building",
                  ]}
                />
                <SelectField
                  label="Headcount"
                  name="headcount"
                  options={[
                    "Under 25",
                    "25 – 50",
                    "50 – 100",
                    "100 – 150",
                    "150 – 200+",
                  ]}
                />
              </div>
              <SelectField
                label="Event type"
                name="type"
                options={[
                  "Wedding",
                  "Rehearsal dinner",
                  "Corporate / company",
                  "Birthday / anniversary",
                  "Holiday party",
                  "Catering · delivery only",
                  "Something else",
                ]}
              />
              <label className="block">
                <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
                  About the night
                </span>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Tone, courses, any must-haves, music, dietary notes, the budget if you have one in mind."
                  className="mt-2 w-full border-b border-cream/40 bg-transparent py-3 font-body text-cream placeholder:text-cream/50 focus:border-cream focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={submitted}
                className="group mt-2 inline-flex w-fit items-center gap-3 bg-cream px-7 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper disabled:opacity-70"
              >
                {submitted ? (
                  <>
                    <i className="ph ph-check-circle text-lg" />
                    Got it, we'll be in touch
                  </>
                ) : (
                  <>
                    <i className="ph ph-paper-plane-tilt text-lg" />
                    Send the inquiry
                    <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <aside>
            <div className="mb-6 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
              Or call · email
            </div>
            <ul className="divide-y divide-cream/20 border-y border-cream/20">
              {CONTACTS.map((c) => (
                <li key={c.email} className="py-6">
                  <div className="font-display text-2xl">{c.name}</div>
                  <div className="mt-1 font-body text-sm text-cream/75">
                    {c.role}
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <a
                      href={`mailto:${c.email}`}
                      className="under inline-flex items-center gap-2 font-serif text-sm hover:text-paper"
                    >
                      <i className="ph ph-envelope text-base" />
                      {c.email}
                    </a>
                    {c.phone && (
                      <a
                        href={`tel:1${c.phone.replace(/\./g, "")}`}
                        className="under inline-flex items-center gap-2 font-serif text-sm hover:text-paper"
                      >
                        <i className="ph ph-phone text-base" />
                        {c.phone}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-cream/30 bg-sienna-deep/40 p-6">
              <div className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
                Reservations · 1 → 8 guests
              </div>
              <p className="mt-2 font-body text-cream/85">
                Mezzo (Floor II) takes regular reservations through OpenTable,
                no inquiry form needed.
              </p>
              <a
                href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
                target="_blank"
                rel="noreferrer"
                className="under mt-3 inline-flex items-center gap-2 font-serif text-sm tracking-[0.2em] uppercase hover:text-paper"
              >
                Reserve Mezzo
                <i className="ph ph-arrow-up-right text-sm" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative bg-ink text-cream">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <div className="mb-2 font-serif text-base text-sienna-bright">
              need catering instead?
            </div>
            <h3 className="font-display text-5xl leading-[0.9]">
              Two kitchens.
              <br />
              <span className="font-italic italic">Delivered to you.</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/catering"
              className="btn-lift inline-flex items-center gap-3 bg-sienna px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-sienna-bright"
            >
              <i className="ph ph-bag text-lg" />
              Catering menu
            </Link>
            <Link
              to="/"
              className="btn-lift inline-flex items-center gap-3 border border-cream/40 px-7 py-4 font-serif text-sm tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream/10"
            >
              All of Sienna
              <i className="ph ph-arrow-up-right text-lg" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function VenueAccordion({
  spaces,
}: {
  spaces: typeof SPACES
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {spaces.map((s) => {
        const isOpen = openId === s.id
        return (
          <div key={s.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : s.id)}
              className="group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors hover:text-sienna"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-4xl text-ink/20 transition-colors group-hover:text-sienna/30">
                  {s.roman}
                </span>
                <div>
                  <h3 className="font-display text-3xl text-ink transition-colors group-hover:text-sienna">
                    {s.name}
                  </h3>
                  <div className="font-body text-sm text-ink-soft">{s.sub}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <span className="hidden font-serif text-xs tracking-[0.3em] text-ink-soft uppercase sm:block">
                  up to {s.capacity} guests
                </span>
                <i className={`ph ph-caret-${isOpen ? "up" : "down"} text-xl text-ink/40 transition-transform`} />
              </div>
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-0 border-t border-ink/8 bg-cream/40 pb-8 lg:grid-cols-[1.1fr_1fr]">
                  <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
                    <img
                      src={s.image}
                      alt={`${s.name} private event space`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute right-4 bottom-4 left-4 flex items-baseline justify-between">
                      <span className="font-body text-sm text-cream/80">{s.vibe}</span>
                      <span className={`font-display text-2xl ${s.accent}`}>{s.capacity}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-8 py-6">
                    <img
                      src={s.logo}
                      alt=""
                      aria-hidden="true"
                      className="mb-5 h-7 w-auto brightness-0 opacity-30 object-left"
                      style={{ objectFit: "contain", objectPosition: "left" }}
                    />
                    <p className="font-body text-base leading-relaxed text-ink-soft">{s.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 font-body text-sm text-ink-soft">
                          <i className="ph ph-check mt-0.5 shrink-0 text-sienna" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <div className="font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">Perfect for</div>
                      <div className="mt-1.5 font-body text-sm text-ink">
                        {s.perfect.join(" · ")}
                      </div>
                    </div>
                    <Link
                      to={s.href}
                      className="under mt-6 inline-flex w-fit items-center gap-2 font-serif text-xs tracking-[0.3em] text-sienna uppercase hover:text-sienna"
                    >
                      See the floor
                      <i className="ph ph-arrow-right text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
        {label}
        {required && <span className="ml-1 text-cream">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-cream/40 bg-transparent py-3 font-serif text-cream focus:border-cream focus:outline-none"
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: readonly string[]
}) {
  return (
    <label className="block">
      <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full appearance-none border-b border-cream/40 bg-transparent py-3 font-serif text-cream focus:border-cream focus:outline-none [&>option]:bg-sienna [&>option]:text-cream"
      >
        <option value="" disabled>
          Choose
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
