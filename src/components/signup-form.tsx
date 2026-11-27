import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import { Link } from "react-router"
import { errorMessage } from "@/lib/util"
import { api } from "../../convex/_generated/api"

export function SignupForm({
  source,
  askName = false,
  buttonLabel,
  successMessage = "You're on the list.",
  tone = "dark",
  onDone,
}: {
  source: string
  askName?: boolean
  buttonLabel?: string
  successMessage?: string
  tone?: "dark" | "light" | "sienna"
  onDone?: () => void
}) {
  const subscribe = useMutation(api.inquiries.subscribe)
  const settings = useQuery(api.settings.get)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = useState("")
  const dark = tone !== "light"
  const contrast = tone === "sienna"
  const accent = contrast ? "text-cream" : dark ? "text-sienna-bright" : "text-sienna"

  if (status === "done") {
    return (
      <p
        className={`mt-5 flex items-center gap-2 font-body ${dark ? "text-cream" : "text-ink"}`}
        role="status"
      >
        <i className={`ph ph-check-circle text-xl ${accent}`} />
        {successMessage}
      </p>
    )
  }

  const line = contrast
    ? "border-cream/60 focus-within:border-cream"
    : dark
      ? "border-paper/30 focus-within:border-sienna-bright"
      : "border-ink/25 focus-within:border-sienna"
  const input = contrast
    ? "text-cream placeholder:text-cream/80"
    : dark
      ? "text-paper placeholder:text-paper/50"
      : "text-ink placeholder:text-ink-soft/60"

  return (
    <form
      className="mt-5"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault()
        setError("")
        if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address")
        if (!consent) return setError("Tick the box to confirm you'd like our emails")
        setStatus("sending")
        try {
          await subscribe({ email, name: name || undefined, source, consent, honeypot })
          setStatus("done")
          onDone?.()
        } catch (err) {
          setError(errorMessage(err))
          setStatus("idle")
        }
      }}
    >
      <input
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0"
      />
      {askName && (
        <div className={`mb-3 border-b transition-colors ${line}`}>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            aria-label="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full bg-transparent py-3 font-body focus:outline-none ${input}`}
          />
        </div>
      )}
      <div className={`flex border-b transition-colors ${line}`}>
        <input
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`min-w-0 flex-1 bg-transparent py-3 font-body focus:outline-none ${input}`}
        />
        {buttonLabel ? (
          // A written label gets the site-wide pill; the bare form keeps its arrow.
          <button
            type="submit"
            disabled={status === "sending"}
            className={`btn-lift my-1.5 ml-3 shrink-0 disabled:opacity-50 ${
              dark
                ? "bg-cream text-sienna hover:bg-paper"
                : "bg-sienna text-cream hover:bg-sienna-deep"
            }`}
          >
            {buttonLabel}
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "sending"}
            className={`px-3 font-serif text-xs tracking-[0.2em] uppercase transition-colors disabled:opacity-50 ${accent} ${
              dark ? "hover:text-cream" : "hover:text-sienna-deep"
            }`}
            aria-label="Subscribe"
          >
            <i className="ph ph-arrow-right text-2xl" />
          </button>
        )}
      </div>
      <label
        className={`mt-4 flex items-start gap-2.5 font-body text-xs leading-relaxed ${
          dark ? "text-paper/75" : "text-ink-soft"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className={`mt-0.5 ${contrast ? "accent-cream" : "accent-sienna"}`}
        />
        <span>
          {settings?.marketingConsentText ?? "Yes, send me Sienna Mercato news and offers."}{" "}
          <Link to="/privacy" className="underline">
            Privacy policy
          </Link>
        </span>
      </label>
      {error && (
        <p role="alert" className={`mt-2 font-body text-xs ${accent}`}>
          {error}
        </p>
      )}
    </form>
  )
}
