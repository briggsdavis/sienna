import { useMutation } from "convex/react"
import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import {
  FormError,
  Honeypot,
  SelectField,
  TextArea,
  TextField,
  useFormGuard,
} from "@/components/form"
import { reserveSummary, useSettings } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { FLOOR_HOURS } from "@/content/home"
import { PAGE_SEO } from "@/lib/pages"
import { ADDRESS, FLOORS, PHONE, SOCIAL_LINKS } from "@/lib/site"
import { errorMessage } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const SUBJECTS = [
  "General question",
  "Reservations",
  "Feedback",
  "Gift cards",
  "Press & partnerships",
  "Jobs",
  "Something else",
]

const JSON_LD = restaurantJsonLd({ name: "Sienna Mercato", path: "/contact", reservations: true })

export function Contact() {
  return (
    <div className="relative bg-paper">
      <Seo path="/contact" {...PAGE_SEO["/contact"]} jsonLd={JSON_LD} />
      <header className="relative overflow-hidden bg-ink pt-40 pb-20 text-cream">
        <div className="grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
          <h1 className="rise font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.88]">
            Say <span className="font-italic italic">ciao.</span>
          </h1>
          <p
            className="rise mt-6 max-w-xl font-body text-lg text-cream/80"
            style={{ animationDelay: "0.2s" }}
          >
            Three floors, one address, one phone number. Send a note and we'll get back within one
            business day.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-12">
          <ContactForm />
          <Details />
        </div>
      </section>

      <section className="border-t border-ink/10">
        <iframe
          title="Map of Sienna Mercato at 942 Penn Avenue"
          src={ADDRESS.embedUrl}
          className="h-[420px] w-full grayscale-[40%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  )
}

type Form = { name: string; email: string; phone: string; subject: string; message: string }
const EMPTY: Form = { name: "", email: "", phone: "", subject: "", message: "" }

function ContactForm() {
  const submit = useMutation(api.inquiries.submitContact)
  const guard = useFormGuard()
  const [form, setForm] = useState<Form>(EMPTY)
  const [honeypot, setHoneypot] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const update = (changes: Partial<Form>) => setForm((f) => ({ ...f, ...changes }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === "sending") return
    if (!form.name.trim()) return setError("Add your name")
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email address")
    if (form.message.trim().length < 5) return setError("Add a message")
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
        subject: form.subject || undefined,
        message: form.message,
      })
      setStatus("done")
      setForm(EMPTY)
      guard.reset()
    } catch (err) {
      setError(errorMessage(err))
      setStatus("idle")
    }
  }

  return (
    <FadeIn>
      <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.95] text-ink">
        Send a message.
      </h2>
      <p className="mt-4 max-w-lg font-body text-lg text-ink-soft">
        Planning a party? Use the{" "}
        <Link to="/events#inquire" className="text-sienna underline">
          private events form
        </Link>
        . Feeding a crowd? Start a{" "}
        <Link to="/catering" className="text-sienna underline">
          catering request
        </Link>
        .
      </p>
      {status === "done" ? (
        <div className="mt-10 border border-ink/10 bg-cream p-8" role="status">
          <i className="ph ph-check-circle text-4xl text-sienna" />
          <h3 className="mt-4 font-display text-3xl text-ink">Thanks, message received.</h3>
          <p className="mt-2 font-body text-ink-soft">We'll reply within one business day.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="under mt-6 font-serif text-xs tracking-[0.25em] text-sienna uppercase"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative mt-10 grid gap-6">
          <Honeypot value={honeypot} onChange={setHoneypot} />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              tone="light"
              label="Name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update({ name: e.target.value })}
            />
            <TextField
              tone="light"
              label="Email"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              tone="light"
              label="Phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update({ phone: e.target.value })}
            />
            <SelectField
              tone="light"
              label="Subject"
              options={SUBJECTS}
              value={form.subject}
              onChange={(e) => update({ subject: e.target.value })}
            />
          </div>
          <TextArea
            tone="light"
            label="Message"
            required
            rows={6}
            value={form.message}
            onChange={(e) => update({ message: e.target.value })}
          />
          <FormError tone="light" message={error} />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-lift inline-flex w-fit items-center gap-3 bg-sienna px-7 py-4 font-serif text-xs tracking-[0.3em] text-cream uppercase hover:bg-sienna-bright disabled:opacity-60"
          >
            <i className="ph ph-paper-plane-tilt text-base" />
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </FadeIn>
  )
}

function Details() {
  const settings = useSettings()
  return (
    <FadeIn delay={0.12}>
      <div className="grid gap-10">
        <div>
          <div className="mb-4 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
            Visit
          </div>
          <address className="font-display text-3xl leading-snug text-ink not-italic">
            {ADDRESS.street}
            <br />
            {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
          </address>
          <div className="mt-5 flex flex-wrap gap-3">
            <ExternalLink
              href={ADDRESS.mapsUrl}
              className="btn-lift inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase hover:bg-ink/5"
            >
              <i className="ph ph-map-pin text-sm" />
              Directions
            </ExternalLink>
            <a
              href={PHONE.href}
              className="btn-lift inline-flex items-center gap-2 border border-ink/25 px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-ink uppercase hover:bg-ink/5"
            >
              <i className="ph ph-phone text-sm" />
              {PHONE.label}
            </a>
          </div>
        </div>

        <div>
          <div className="mb-4 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
            Hours
          </div>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {FLOOR_HOURS.map(({ floor, days, open, close }) => {
              const reservation = settings?.reservations[floor.id]
              return (
                <li key={floor.name} className="flex items-center justify-between gap-5 py-4">
                  <div>
                    <Link
                      to={floor.href}
                      className="under font-serif text-lg text-ink hover:text-sienna"
                    >
                      {floor.name}
                    </Link>
                    <div className="font-body text-xs text-ink-soft">
                      {reserveSummary(reservation?.mode, reservation?.note)}
                    </div>
                  </div>
                  <span className="font-body text-sm text-ink-soft tabular-nums">
                    {days}, {open} to {close}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <div className="mb-4 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
            Follow
          </div>
          <div className="flex gap-4 text-ink">
            {SOCIAL_LINKS.map((social) => (
              <ExternalLink
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="transition-colors hover:text-sienna"
              >
                <i className={`ph ${social.icon} text-3xl`} />
              </ExternalLink>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {Object.values(FLOORS).map((floor) => (
            <Link
              key={floor.id}
              to={floor.menuHref}
              className="group flex items-center justify-between border border-ink/10 bg-cream px-4 py-3 font-serif text-xs tracking-[0.2em] text-ink uppercase hover:border-sienna hover:text-sienna"
            >
              {floor.name} menu
              <i className="ph ph-arrow-right" />
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}
