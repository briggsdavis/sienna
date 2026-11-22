import { useState } from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import { HeroIntro, HeroMeta, PageHero } from "@/components/hero"
import {
  CONTACTS,
  EVENT_TYPE_OPTIONS,
  FLOOR_OPTIONS,
  HEADCOUNT_OPTIONS,
  REVIEWS,
  SPACES,
  UPCOMING,
} from "@/content/events"
import { RESERVE_URL, VIRTUAL_TOUR_URL, unsplash } from "@/lib/site"

export function Events() {
  return (
    <div className="relative">
      <Hero />
      <Upcoming />
      <Venues />
      <Testimonials />
      <Inquiry />
      <ClosingStrip />
    </div>
  )
}

function Hero() {
  return (
    <PageHero
      image={{
        src: unsplash("1519671482749-fd09be7ccebf", 2400, 80),
        alt: "A long candlelit table set for a private event at Sienna Mercato",
        className: "opacity-85",
      }}
      overlay={<div className="absolute inset-0 bg-black/58" />}
      meta={<HeroMeta location="Three floors · 942 Penn Ave" note="up to 200 guests" />}
    >
      <HeroIntro
        eyebrow="private events"
        title="Private Events."
        blurb="Three floors available for private hire: a meatball joint, a trattoria, and a rooftop with the Pittsburgh skyline. Up to 400 guests."
      />
      <div
        className="rise mt-8 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "0.62s" }}
      >
        <a
          href="#inquire"
          className="btn-lift group inline-flex items-center gap-2 bg-sienna px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:bg-sienna-bright"
        >
          <i className="ph ph-envelope text-sm" />
          Inquire now
          <i className="ph ph-arrow-down text-xs transition-transform group-hover:translate-y-0.5" />
        </a>
        <ExternalLink
          href={VIRTUAL_TOUR_URL}
          className="btn-lift group inline-flex items-center gap-2 border border-cream/40 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
        >
          <i className="ph-duotone ph-cube text-sm" />
          Virtual tour · 360°
          <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ExternalLink>
      </div>
    </PageHero>
  )
}

function Upcoming() {
  return (
    <section className="relative bg-ink py-24 text-paper">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 font-serif text-lg text-sienna-bright">on the calendar</div>
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
          {UPCOMING.map((event, i) => (
            <FadeIn key={event.title} delay={i * 0.1} className="h-full">
              <article className="group flex h-full flex-col bg-ink p-8 transition-colors hover:bg-sienna-deep/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-serif text-xs tracking-[0.35em] text-paper/50 uppercase">
                      {event.day} · {event.date}
                    </div>
                    <div className="mt-4 font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
                      {event.tag}
                    </div>
                  </div>
                  <i className={`ph-duotone ${event.icon} text-4xl text-sienna-bright/70`} />
                </div>
                <h3 className="mt-5 font-display text-4xl leading-tight">{event.title}</h3>
                <p className="mt-2 font-body text-base text-paper/70">{event.sub}</p>
                <div className="mt-auto flex flex-col gap-2 pt-6">
                  <div className="flex items-center gap-2 font-serif text-2xs tracking-[0.3em] text-paper/55 uppercase">
                    <i className="ph ph-house-line text-sm" />
                    {event.floor}
                  </div>
                  <div className="flex items-center gap-2 font-serif text-2xs tracking-[0.3em] text-paper/55 uppercase">
                    <i className="ph ph-clock text-sm" />
                    {event.when}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Venues() {
  return (
    <section className="relative bg-paper py-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 font-serif text-lg text-sienna">private event venues</div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
                Three rooms
                <br />
                <span className="font-italic text-sienna italic">for private hire.</span>
              </h2>
            </div>
            <p className="font-body text-lg leading-relaxed text-ink-soft md:text-right">
              Each floor stands alone or stacks with the others, the whole building seats nearly
              four hundred.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VenueAccordion />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-[1fr_auto]">
            <div className="bg-paper px-8 py-8">
              <div className="mb-2 font-serif text-lg text-sienna">ready to book a floor?</div>
              <h3 className="font-display text-3xl leading-tight text-ink">
                Tell us the date, the headcount,
                <br />
                <span className="font-italic text-sienna italic">and we'll handle the rest.</span>
              </h3>
              <p className="mt-3 max-w-lg font-body text-base text-ink-soft">
                The events team replies within one business day with a floor recommendation, a draft
                menu, and a price range. No commitment required.
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
                <ExternalLink
                  href={VIRTUAL_TOUR_URL}
                  className="btn-lift group inline-flex items-center gap-2 border border-ink/25 px-6 py-3 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:bg-ink/5"
                >
                  <i className="ph-duotone ph-cube text-sm" />
                  Virtual tour · 360°
                  <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ExternalLink>
              </div>
            </div>
            <div className="relative hidden overflow-hidden sm:block" style={{ minWidth: "420px" }}>
              <img
                src={unsplash("1519671482749-fd09be7ccebf", 800, 80)}
                alt="Private event at Sienna Mercato"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/30" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function VenueAccordion() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {SPACES.map((space) => {
        const isOpen = openId === space.id
        return (
          <div key={space.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : space.id)}
              className="group flex w-full items-center justify-between gap-6 px-2 py-6 text-left transition-colors hover:text-sienna"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-4xl text-ink/20 transition-colors group-hover:text-sienna/30">
                  {space.roman}
                </span>
                <div>
                  <h3 className="font-display text-3xl text-ink transition-colors group-hover:text-sienna">
                    {space.name}
                  </h3>
                  <div className="font-body text-sm text-ink-soft">{space.sub}</div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <span className="hidden font-serif text-xs tracking-[0.3em] text-ink-soft uppercase sm:block">
                  up to {space.capacity} guests
                </span>
                <i
                  className={`ph ph-caret-${isOpen ? "up" : "down"} text-xl text-ink/40 transition-transform`}
                />
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
                      src={space.image}
                      alt={`${space.name} private event space`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute right-4 bottom-4 left-4 flex items-baseline justify-between">
                      <span className="font-body text-sm text-cream/80">{space.vibe}</span>
                      <span className={`font-display text-2xl ${space.accent}`}>
                        {space.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center px-8 py-6">
                    <img
                      src={space.logo}
                      alt=""
                      aria-hidden="true"
                      className="mb-5 h-7 w-auto object-left opacity-30 brightness-0"
                      style={{ objectFit: "contain", objectPosition: "left" }}
                    />
                    <p className="font-body text-base leading-relaxed text-ink-soft">
                      {space.desc}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {space.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 font-body text-sm text-ink-soft"
                        >
                          <i className="ph ph-check mt-0.5 shrink-0 text-sienna" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <div className="font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
                        Perfect for
                      </div>
                      <div className="mt-1.5 font-body text-sm text-ink">
                        {space.perfect.join(" · ")}
                      </div>
                    </div>
                    <Link
                      to={space.href}
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

function Testimonials() {
  return (
    <section className="relative bg-paper py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-14 text-center">
            <div className="mb-3 font-serif text-lg text-sienna">from the guestbook</div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] text-ink">
              The guests
              <br />
              <span className="font-italic text-sienna italic">say it best.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-2">
          {REVIEWS.map((review, i) => (
            <FadeIn key={review.by} delay={i * 0.12}>
              <figure className="relative border-l-2 border-sienna bg-cream/60 p-8 lg:p-10">
                <div className="absolute -top-3 left-8 bg-paper px-3 font-display text-5xl leading-none text-sienna">
                  &ldquo;
                </div>
                <div className="flex gap-0.5 text-sienna">
                  {Array.from({ length: review.stars }, (_, star) => (
                    <i key={star} className="ph-fill ph-star text-base" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-2xl leading-snug text-ink lg:text-3xl">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-6 font-body text-sm text-ink-soft">
                  , {review.by} · five-star review
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Inquiry() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="inquire" className="relative overflow-hidden bg-sienna py-28 text-cream">
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-12">
        <div>
          <div className="mb-4 font-serif text-lg text-cream/85">inquire now</div>
          <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.85]">
            Tell us about
            <br />
            <span className="font-italic italic">your night.</span>
          </h2>
          <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-cream/85">
            The events team replies within one business day. Send us the date, the headcount, and a
            sentence about the vibe, we'll send back a floor and a draft menu.
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
              <SelectField label="Floor" name="floor" options={FLOOR_OPTIONS} />
              <SelectField label="Headcount" name="headcount" options={HEADCOUNT_OPTIONS} />
            </div>
            <SelectField label="Event type" name="type" options={EVENT_TYPE_OPTIONS} />
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
              className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-cream px-7 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper disabled:opacity-70"
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
            {CONTACTS.map((contact) => (
              <li key={contact.email} className="py-6">
                <div className="font-display text-2xl">{contact.name}</div>
                <div className="mt-1 font-body text-sm text-cream/75">{contact.role}</div>
                <div className="mt-3 flex flex-col gap-1.5">
                  <a
                    href={`mailto:${contact.email}`}
                    className="under inline-flex items-center gap-2 font-serif text-sm hover:text-paper"
                  >
                    <i className="ph ph-envelope text-base" />
                    {contact.email}
                  </a>
                  {contact.phone && (
                    <a
                      href={`tel:1${contact.phone.replace(/\./g, "")}`}
                      className="under inline-flex items-center gap-2 font-serif text-sm hover:text-paper"
                    >
                      <i className="ph ph-phone text-base" />
                      {contact.phone}
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
              Mezzo (Floor II) takes regular reservations through OpenTable, no inquiry form needed.
            </p>
            <ExternalLink
              href={RESERVE_URL}
              className="under mt-3 inline-flex items-center gap-2 font-serif text-sm tracking-[0.2em] uppercase hover:text-paper"
            >
              Reserve Mezzo
              <i className="ph ph-arrow-up-right text-sm" />
            </ExternalLink>
          </div>
        </aside>
      </div>
    </section>
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
      <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full appearance-none border-b border-cream/40 bg-transparent py-3 font-serif text-cream focus:border-cream focus:outline-none [&>option]:bg-sienna [&>option]:text-cream"
      >
        <option value="" disabled>
          Choose
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-ink text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <div className="mb-2 font-serif text-base text-sienna-bright">need catering instead?</div>
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
  )
}
