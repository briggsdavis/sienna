import { useMutation } from "convex/react"
import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { EventsCalendar } from "@/components/events-calendar"
import { FadeIn } from "@/components/fade-in"
import {
  FormError,
  Honeypot,
  SelectField,
  TextArea,
  TextField,
  useFormGuard,
} from "@/components/form"
import { HeroIntro, PageHero } from "@/components/hero"
import { ReserveLink } from "@/components/reserve"
import { Seo } from "@/components/seo"
import { CONTACTS, EVENT_TYPE_OPTIONS, FLOOR_OPTIONS, SPACES } from "@/content/events"
import { PAGE_SEO } from "@/lib/pages"
import { unsplash } from "@/lib/site"
import { addDays, errorMessage, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"

export function Events() {
  return (
    <div className="relative">
      <Seo path="/events" {...PAGE_SEO["/events"]} />
      <Hero />
      <Calendar />
      <Venues />
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
      viewportHeight={50}
    >
      <HeroIntro
        title="Events."
        blurb="What's on across all three floors, and how to make one of them yours. Private hire for up to 400 guests."
      />
      <div
        className="rise mt-8 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "0.62s" }}
      >
        <a href="#calendar" className="btn-lift group bg-cream text-ink hover:bg-paper">
          <i className="ph ph-calendar-dots text-sm" />
          What's on
        </a>
        <a href="#inquire" className="btn-lift group bg-sienna text-cream hover:bg-sienna-bright">
          <i className="ph ph-envelope text-sm" />
          Private event inquiry
          <i className="ph ph-arrow-down text-xs transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>
    </PageHero>
  )
}

function Calendar() {
  return (
    <section id="calendar" className="relative scroll-mt-20 bg-ink py-24 text-paper">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-[clamp(3rem,calc(6vw*var(--site-type-scale)),5rem)] leading-[0.9]">
              What's on.
            </h2>
            <p className="max-w-sm font-body text-base leading-relaxed text-paper/65">
              Walk-ins welcome unless noted. Pick a day to see details and tickets.
            </p>
          </div>
        </FadeIn>
        <EventsCalendar />
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
              <h2 className="font-display text-[clamp(3rem,calc(7vw*var(--site-type-scale)),6rem)] leading-[0.9] text-ink">
                Three rooms
                <br />
                <span className="text-sienna">for private hire.</span>
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
              <h3 className="font-display text-3xl leading-tight text-ink">
                Tell us the date, the headcount,
                <br />
                <span className="text-sienna">and we'll handle the rest.</span>
              </h3>
              <p className="mt-3 max-w-lg font-body text-base text-ink-soft">
                The events team replies within one business day with a floor recommendation, a draft
                menu, and a price range. No commitment required.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#inquire"
                  className="btn-lift group bg-sienna text-cream hover:bg-sienna-bright"
                >
                  <i className="ph ph-envelope text-sm" />
                  Send an inquiry
                  <i className="ph ph-arrow-down text-xs transition-transform group-hover:translate-y-0.5" />
                </a>
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
                        {space.perfect.join(" • ")}
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

type InquiryForm = {
  name: string
  email: string
  phone: string
  date: string
  restaurant: string
  partySize: string
  eventType: string
  notes: string
}

const EMPTY_INQUIRY: InquiryForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  restaurant: "",
  partySize: "",
  eventType: "",
  notes: "",
}

function Inquiry() {
  const submit = useMutation(api.inquiries.submitPrivateEvent)
  const guard = useFormGuard()
  const [form, setForm] = useState<InquiryForm>(EMPTY_INQUIRY)
  const [honeypot, setHoneypot] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const update = (changes: Partial<InquiryForm>) => setForm((f) => ({ ...f, ...changes }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    if (!form.name.trim()) return setError("Add your name")
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email address")
    if (!form.date) return setError("Pick a date")
    if (form.date < todayKey()) return setError("Pick a date in the future")
    if (!form.restaurant) return setError("Choose a preferred restaurant")
    if (!/^\d+$/.test(form.partySize) || Number(form.partySize) < 1) {
      return setError("Enter your party size")
    }
    setError("")
    setStatus("sending")
    try {
      await submit({
        submissionId: guard.submissionId,
        startedAt: guard.startedAt,
        honeypot,
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        restaurant: form.restaurant,
        date: form.date,
        partySize: Number(form.partySize),
        eventType: form.eventType || undefined,
        notes: form.notes || undefined,
      })
      setStatus("done")
      setForm(EMPTY_INQUIRY)
      guard.reset()
    } catch (err) {
      setError(errorMessage(err))
      setStatus("idle")
    }
  }

  return (
    <section
      id="inquire"
      className="relative scroll-mt-20 overflow-hidden bg-sienna-deep py-28 text-cream"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-12">
        <div>
          <div className="mb-4 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
            Private dining & group events
          </div>
          <h2 className="font-display text-[clamp(3rem,calc(7vw*var(--site-type-scale)),5.5rem)] leading-[0.85]">
            Tell us about
            <br />
            <span>your night.</span>
          </h2>
          <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-cream/85">
            The events team replies within one business day. Send us the date, the headcount, and a
            sentence about the vibe, we'll send back a floor and a draft menu.
          </p>

          {status === "done" ? (
            <div className="mt-10 border border-cream/30 bg-sienna-deep/40 p-8" role="status">
              <i className="ph ph-check-circle text-4xl" />
              <h3 className="mt-4 font-display text-3xl">Got it. We'll be in touch.</h3>
              <p className="mt-2 font-body text-cream/85">
                Your inquiry is with our events team. Expect a reply within one business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="under mt-6 font-serif text-xs tracking-[0.25em] uppercase"
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="relative mt-10 grid gap-5" noValidate onSubmit={onSubmit}>
              <Honeypot value={honeypot} onChange={setHoneypot} />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  tone="dark"
                  label="Your name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                />
                <TextField
                  tone="dark"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  tone="dark"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                />
                <TextField
                  tone="dark"
                  label="Requested date"
                  type="date"
                  required
                  min={addDays(todayKey(), 1)}
                  value={form.date}
                  onChange={(e) => update({ date: e.target.value })}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  tone="dark"
                  label="Preferred restaurant"
                  required
                  options={FLOOR_OPTIONS}
                  value={form.restaurant}
                  onChange={(e) => update({ restaurant: e.target.value })}
                />
                <TextField
                  tone="dark"
                  label="Party size"
                  required
                  inputMode="numeric"
                  placeholder="e.g. 40"
                  value={form.partySize}
                  onChange={(e) => update({ partySize: e.target.value })}
                />
              </div>
              <SelectField
                tone="dark"
                label="Event type"
                options={EVENT_TYPE_OPTIONS}
                value={form.eventType}
                onChange={(e) => update({ eventType: e.target.value })}
              />
              <TextArea
                tone="dark"
                label="Notes"
                rows={4}
                placeholder="Tone, courses, any must-haves, music, dietary notes, the budget if you have one in mind."
                value={form.notes}
                onChange={(e) => update({ notes: e.target.value })}
              />
              <FormError tone="dark" message={error} />
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-lift mt-2 w-fit bg-cream text-sienna hover:bg-paper disabled:opacity-70"
              >
                <i className="ph ph-paper-plane-tilt text-lg" />
                {status === "sending" ? "Sending..." : "Send the inquiry"}
              </button>
            </form>
          )}
        </div>

        <aside>
          <div className="mb-6 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
            Contact
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
              Parties up to 8
            </div>
            <p className="mt-2 font-body text-cream/85">
              Mezzo (Floor II) takes regular reservations online, no inquiry form needed.
            </p>
            <ReserveLink
              restaurant="mezzo"
              className="under mt-3 inline-flex items-center gap-2 font-serif text-sm tracking-[0.2em] uppercase hover:text-paper"
            >
              Reserve Mezzo
              <i className="ph ph-arrow-up-right text-sm" />
            </ReserveLink>
          </div>
        </aside>
      </div>
    </section>
  )
}

function ClosingStrip() {
  return (
    <section className="relative bg-sienna-deep text-cream">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <h3 className="font-display text-5xl leading-[0.9]">
            Two kitchens.
            <br />
            <span>Delivered to you.</span>
          </h3>
        </div>
        <div className="btn-pair">
          <Link to="/catering" className="btn-lift bg-cream text-sienna hover:bg-paper">
            <i className="ph ph-bag text-lg" />
            Catering menu
          </Link>
          <Link to="/" className="btn-lift border border-cream/40 text-cream hover:bg-cream/10">
            All of Sienna
            <i className="ph ph-arrow-up-right text-lg" />
          </Link>
        </div>
      </div>
    </section>
  )
}
