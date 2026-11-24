import { useMutation, useQuery } from "convex/react"
import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link } from "react-router"
import { QuantityStepper } from "@/components/cart"
import { FormError, Honeypot, TextArea, TextField, useFormGuard } from "@/components/form"
import { useSettings } from "@/components/reserve"
import { Seo } from "@/components/seo"
import { useCart, type CartLine } from "@/lib/cart"
import { addDays, errorMessage, money, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"

type Form = {
  name: string
  email: string
  phone: string
  eventDate: string
  eventTime: string
  fulfillment: "pickup" | "delivery"
  address: string
  guests: string
  notes: string
  marketingConsent: boolean
}

const EMPTY: Form = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  eventTime: "",
  fulfillment: "pickup",
  address: "",
  guests: "",
  notes: "",
  marketingConsent: false,
}

function validate(form: Form, lines: CartLine[]) {
  if (lines.length === 0) return "Your cart is empty"
  if (!form.name.trim()) return "Add your name"
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Enter a valid email address"
  if (form.phone.replace(/\D/g, "").length < 7) return "Enter a valid phone number"
  if (!form.eventDate) return "Pick a date"
  if (form.eventDate < todayKey()) return "Pick a date in the future"
  if (!form.eventTime) return "Pick a time"
  if (form.fulfillment === "delivery" && !form.address.trim()) return "Add a delivery address"
  if (form.guests && (!/^\d+$/.test(form.guests) || Number(form.guests) < 1)) {
    return "Enter a valid guest count"
  }
  return ""
}

function useReconciledCart() {
  const cart = useCart()
  const sections = useQuery(api.menus.get, { menu: "catering" })
  const [notice, setNotice] = useState("")

  useEffect(() => {
    if (!sections) return
    const items = new Map(sections.flatMap((s) => s.items).map((item) => [item._id, item]))
    let changed = false
    const removed: string[] = []
    const next = cart.lines.flatMap((line) => {
      const item = items.get(line.itemId)
      const option = item?.options?.[line.optionIndex]
      if (!item || !item.available || !option) {
        removed.push(line.name)
        changed = true
        return []
      }
      if (
        option.price !== line.price ||
        option.label !== line.optionLabel ||
        item.name !== line.name
      ) {
        changed = true
        return [{ ...line, price: option.price, optionLabel: option.label, name: item.name }]
      }
      return [line]
    })
    if (changed) {
      cart.replace(next)
      setNotice(
        removed.length
          ? `${removed.join(", ")} ${removed.length === 1 ? "is" : "are"} no longer available and ${removed.length === 1 ? "was" : "were"} removed.`
          : "Some prices changed since you added them. Your cart has been updated.",
      )
    }
  }, [sections])

  return { ...cart, notice, loading: sections === undefined }
}

export function CateringCheckout() {
  const cart = useReconciledCart()
  const submit = useMutation(api.inquiries.submitCatering)
  const settings = useSettings()
  const guard = useFormGuard()
  const [form, setForm] = useState<Form>(EMPTY)
  const [honeypot, setHoneypot] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<null | { name: string; date: string; subtotal: number }>(null)
  const minDate = useMemo(() => addDays(todayKey(), 2), [])

  const update = (changes: Partial<Form>) => setForm((current) => ({ ...current, ...changes }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (sending) return
    const problem = validate(form, cart.lines)
    if (problem) return setError(problem)
    setError("")
    setSending(true)
    try {
      await submit({
        submissionId: guard.submissionId,
        startedAt: guard.startedAt,
        honeypot,
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventDate: form.eventDate,
        eventTime: form.eventTime,
        fulfillment: form.fulfillment,
        address: form.fulfillment === "delivery" ? form.address : undefined,
        guests: form.guests ? Number(form.guests) : undefined,
        notes: form.notes || undefined,
        marketingConsent: form.marketingConsent,
        items: cart.lines.map(({ itemId, optionIndex, quantity }) => ({
          itemId,
          optionIndex,
          quantity,
        })),
      })
      setDone({ name: form.name.split(" ")[0], date: form.eventDate, subtotal: cart.subtotal })
      cart.clear()
      guard.reset()
      setForm(EMPTY)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <section className="min-h-screen bg-paper px-6 pt-40 pb-28 lg:px-12">
        <Seo
          path="/catering/checkout"
          title="Request sent | Sienna Mercato Catering"
          description="Your catering request was sent."
          noindex
        />
        <div className="mx-auto max-w-2xl text-center" role="status">
          <i className="ph-duotone ph-check-circle text-6xl text-sienna" />
          <h1 className="mt-6 font-display text-[clamp(2.5rem,calc(6vw*var(--site-type-scale)),4.5rem)] leading-[0.9] text-ink">
            Grazie, {done.name}.
          </h1>
          <p className="mt-6 font-body text-xl leading-relaxed text-ink-soft">
            Your catering request for{" "}
            {new Date(`${done.date}T12:00:00`).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            is in, with an estimated subtotal of {money(done.subtotal)}. This isn't a confirmed
            order yet. Our team will reach out within one business day to confirm details and final
            pricing.
          </p>
          <Link
            to="/catering"
            className="btn-lift mt-10 bg-sienna text-cream hover:bg-sienna-bright"
          >
            Back to catering
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-paper px-6 pt-36 pb-28 lg:px-12">
      <Seo
        path="/catering/checkout"
        title="Catering request | Sienna Mercato"
        description="Review your catering selections and send a request to the Sienna Mercato events team."
        noindex
      />
      <div className="mx-auto max-w-[1300px]">
        <Link
          to="/catering#shop"
          className="under inline-flex items-center gap-2 font-serif text-2xs tracking-[0.4em] text-ink-soft uppercase hover:text-sienna"
        >
          <i className="ph ph-arrow-left text-sm" />
          Keep browsing
        </Link>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,calc(6vw*var(--site-type-scale)),5rem)] leading-[0.9] text-ink">
          Send a catering request.
        </h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-ink-soft">
          This is a request, not a confirmed or paid order. Nothing is charged. Our team reviews
          every request and replies within one business day with availability and final pricing.
        </p>

        {cart.notice && (
          <p
            className="mt-6 rounded-md bg-cream px-4 py-3 font-body text-sm text-ink"
            role="status"
          >
            {cart.notice}
          </p>
        )}

        <form
          onSubmit={onSubmit}
          noValidate
          className="relative mt-12 grid gap-14 lg:grid-cols-[1.2fr_1fr]"
        >
          <Honeypot value={honeypot} onChange={setHoneypot} />
          <div className="grid content-start gap-6">
            <h2 className="font-display text-3xl text-ink">Your details</h2>
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
                label="Phone"
                required
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update({ phone: e.target.value })}
              />
            </div>
            <TextField
              tone="light"
              label="Email"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
            />

            <h2 className="mt-6 font-display text-3xl text-ink">The event</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <TextField
                tone="light"
                label="Date"
                required
                type="date"
                min={minDate}
                value={form.eventDate}
                onChange={(e) => update({ eventDate: e.target.value })}
              />
              <TextField
                tone="light"
                label="Time"
                required
                type="time"
                value={form.eventTime}
                onChange={(e) => update({ eventTime: e.target.value })}
              />
              <TextField
                tone="light"
                label="Guests"
                inputMode="numeric"
                value={form.guests}
                onChange={(e) => update({ guests: e.target.value })}
              />
            </div>
            <fieldset>
              <legend className="font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
                Service *
              </legend>
              <div className="mt-3 flex gap-2">
                {(["pickup", "delivery"] as const).map((value) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-full border px-5 py-2.5 font-serif text-xs tracking-[0.2em] uppercase transition-colors ${
                      form.fulfillment === value
                        ? "border-sienna bg-sienna text-cream"
                        : "border-ink/20 text-ink hover:border-sienna"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      value={value}
                      checked={form.fulfillment === value}
                      onChange={() => update({ fulfillment: value })}
                      className="sr-only"
                    />
                    {value === "pickup" ? "Pickup at 942 Penn" : "Delivery"}
                  </label>
                ))}
              </div>
            </fieldset>
            {form.fulfillment === "delivery" && (
              <TextField
                tone="light"
                label="Delivery address"
                required
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => update({ address: e.target.value })}
              />
            )}
            <TextArea
              tone="light"
              label="Notes"
              rows={4}
              placeholder="Dietary needs, setup, sauces, anything we should know."
              value={form.notes}
              onChange={(e) => update({ notes: e.target.value })}
            />
            <label className="flex items-start gap-3 font-body text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={form.marketingConsent}
                onChange={(e) => update({ marketingConsent: e.target.checked })}
                className="mt-1 accent-sienna"
              />
              <span>
                {settings?.marketingConsentText ?? "Send me Sienna Mercato news and offers."}{" "}
                (Optional. Your request is handled the same either way.){" "}
                <Link to="/privacy" className="underline">
                  Privacy policy
                </Link>
              </span>
            </label>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-ink/10 bg-cream p-6 lg:p-8">
              <h2 className="font-display text-3xl text-ink">Your selections</h2>
              {cart.loading ? (
                <div className="h-40" />
              ) : cart.lines.length === 0 ? (
                <p className="mt-6 font-body text-ink-soft">
                  Your cart is empty.{" "}
                  <Link to="/catering#shop" className="text-sienna underline">
                    Browse catering
                  </Link>
                </p>
              ) : (
                <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                  {cart.lines.map((line) => (
                    <li key={`${line.itemId}-${line.optionIndex}`} className="py-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-lg leading-tight text-ink">
                          {line.name}
                        </span>
                        <span className="font-serif text-sienna tabular-nums">
                          {money(line.price * line.quantity)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-3">
                        <span className="font-body text-sm text-ink-soft">
                          {line.optionLabel} • {money(line.price)}
                        </span>
                        <QuantityStepper
                          value={line.quantity}
                          onChange={(q) => cart.setQuantity(line.itemId, line.optionIndex, q)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-baseline justify-between">
                <span className="font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
                  Estimated subtotal
                </span>
                <span className="font-display text-4xl text-ink tabular-nums">
                  {money(cart.subtotal)}
                </span>
              </div>
              <p className="mt-3 font-body text-xs leading-relaxed text-ink-soft">
                Estimate only, based on menu prices. Gratuity, delivery and serviceware are added
                when our team confirms. No payment is taken online.
              </p>
              <div className="mt-6 grid gap-4">
                <FormError tone="light" message={error} />
                <button
                  type="submit"
                  disabled={sending || cart.lines.length === 0}
                  className="btn-lift w-full bg-sienna text-cream hover:bg-sienna-bright disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send catering request"}
                  {!sending && <i className="ph ph-paper-plane-tilt text-sm" />}
                </button>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}
