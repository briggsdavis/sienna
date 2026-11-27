import { useMutation } from "convex/react"
import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FadeIn } from "@/components/fade-in"
import { FormError, Honeypot, TextArea, TextField, useFormGuard } from "@/components/form"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { CONTACTS } from "@/content/events"
import { PAGE_SEO } from "@/lib/pages"
import { ADDRESS, FLOORS, PHONE } from "@/lib/site"
import { errorMessage } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const JSON_LD = restaurantJsonLd({ name: "Sienna Mercato", path: "/contact", reservations: true })

export function Contact() {
  return (
    <div className="relative mx-auto max-w-[1300px] px-6 pt-36 pb-12 md:pb-16 lg:px-12">
      <Seo path="/contact" {...PAGE_SEO["/contact"]} jsonLd={JSON_LD} />
      <div className="mb-10 flex flex-col gap-6 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-[clamp(3rem,calc(8vw*var(--site-type-scale)),5rem)] leading-none text-ink">
          Contact
        </h1>
        <ul aria-label="Our restaurants" className="flex items-center gap-6 sm:gap-8">
          {Object.values(FLOORS).map((floor) => (
            <li key={floor.id}>
              <Link to={floor.href} className="block transition-opacity hover:opacity-70">
                <img
                  src={floor.logo}
                  alt={floor.name}
                  className="h-14 w-auto object-contain brightness-0 sm:h-16"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <section className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <Details />
        <ContactForm />
      </section>
    </div>
  )
}

type Form = { name: string; email: string; phone: string; message: string }
const EMPTY: Form = { name: "", email: "", phone: "", message: "" }

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
      <h2 className="font-display text-[clamp(2.2rem,calc(4vw*var(--site-type-scale)),3.5rem)] leading-[0.95] text-ink">
        Send a message
      </h2>
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
          <TextField
            tone="light"
            label="Phone (optional)"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
          />
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
            className="btn-lift w-fit bg-sienna text-cream hover:bg-sienna-bright disabled:opacity-60"
          >
            <i className="ph ph-paper-plane-tilt text-base" />
            {status === "sending" ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </FadeIn>
  )
}

const GENERAL_EMAIL = "info@siennapgh.com"

const CONTACT_DETAILS = [
  { label: "Phone", value: PHONE.label, href: PHONE.href },
  { label: "General inquiries", value: GENERAL_EMAIL, href: `mailto:${GENERAL_EMAIL}` },
  ...CONTACTS.map(({ role, email }) => ({ label: role, value: email, href: `mailto:${email}` })),
]

function Details() {
  return (
    <FadeIn>
      <h2 className="font-display text-3xl text-ink">Get in touch</h2>
      <dl className="mt-5 grid gap-4">
        {CONTACT_DETAILS.map(({ label, value, href }) => (
          <div key={label} className="grid grid-cols-[minmax(7rem,1fr)_1.5fr] gap-3">
            <dt className="font-body text-sm text-ink-soft">{label}</dt>
            <dd className="min-w-0 font-body text-sm break-words">
              <a href={href} className="under text-ink hover:text-sienna">
                {value}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-9 font-display text-3xl text-ink">Location</h2>
      <address className="mt-3 font-body text-sm not-italic">
        <ExternalLink href={ADDRESS.mapsUrl} className="under text-ink hover:text-sienna">
          {ADDRESS.street}, {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
        </ExternalLink>
      </address>
      <iframe
        title="Map of Sienna Mercato at 942 Penn Avenue"
        src={ADDRESS.embedUrl}
        className="mt-4 h-56 w-full rounded-lg grayscale-[40%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </FadeIn>
  )
}
