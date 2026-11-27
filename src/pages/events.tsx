import { useMutation } from "convex/react"
import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { EventsCalendar } from "@/components/events-calendar"
import { FadeIn } from "@/components/fade-in"
import { FloorPicker } from "@/components/floor-picker"
import {
  FormError,
  Honeypot,
  SelectField,
  TextArea,
  TextField,
  useFormGuard,
} from "@/components/form"
import { HeroIntro, HeroLogos, PageHero } from "@/components/hero"
import { ParallaxImage } from "@/components/parallax-image"
import { ReserveLink } from "@/components/reserve"
import { Seo } from "@/components/seo"
import { CONTACTS, EVENT_TYPE_OPTIONS, FLOOR_OPTIONS } from "@/content/events"
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
      viewportHeight={60}
    >
      <HeroLogos arch floors={["emporio", "mezzo", "tetto"]} />
      <HeroIntro center title={<span className="uppercase">Events</span>} />
      <div
        className="rise mt-8 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "0.62s" }}
      >
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
    <section id="calendar" className="relative scroll-mt-20 bg-cream py-24 text-ink">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <FadeIn>
          <h2 className="mb-12 font-display text-[clamp(3rem,calc(6vw*var(--site-type-scale)),5rem)] leading-[0.9]">
            What's on.
          </h2>
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
          <FloorPicker />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-[1fr_auto]">
            {/* No left padding, so the text lines up with the site margin. */}
            <div className="bg-paper py-8 pr-8">
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
            <div
              className="relative hidden overflow-hidden sm:block"
              style={{ minWidth: "min(546px, 50vw)", minHeight: "312px" }}
            >
              <ParallaxImage
                src={unsplash("1519671482749-fd09be7ccebf", 1200, 80)}
                alt="Private event at Sienna Mercato"
                speed={0.15}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/30" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
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
      className="relative scroll-mt-20 overflow-hidden bg-sienna py-28 text-cream"
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
