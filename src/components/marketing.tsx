import { useQuery } from "convex/react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { SignupForm } from "@/components/signup-form"
import { setConsent, useConsent } from "@/lib/analytics"
import { isInternal, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const TONES = {
  sienna: "bg-sienna text-cream",
  ink: "bg-ink text-cream",
  cream: "bg-cream text-ink border-b border-ink/10",
}

export function AnnouncementBar() {
  const announcements = useQuery(api.marketing.activeAnnouncements)
  const [dismissed, setDismissed] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem("sm_dismissed") ?? "[]"),
  )
  const today = todayKey()
  const current = announcements?.find(
    (a) =>
      !dismissed.includes(a._id) &&
      (!a.startDate || a.startDate <= today) &&
      (!a.endDate || a.endDate >= today),
  )
  if (!current) return null

  const dismiss = () => {
    const next = [...dismissed, current._id]
    sessionStorage.setItem("sm_dismissed", JSON.stringify(next))
    setDismissed(next)
  }

  const cta =
    current.ctaText &&
    current.ctaUrl &&
    (isInternal(current.ctaUrl) ? (
      <Link to={current.ctaUrl} className="underline underline-offset-4 hover:opacity-80">
        {current.ctaText}
      </Link>
    ) : (
      <ExternalLink href={current.ctaUrl} className="underline underline-offset-4 hover:opacity-80">
        {current.ctaText}
      </ExternalLink>
    ))

  return (
    <div
      className={`relative z-[55] ${TONES[current.tone]}`}
      role="region"
      aria-label="Announcement"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-3 px-10 py-2.5 text-center font-body text-sm">
        <span>{current.message}</span>
        {cta && <span className="font-serif text-xs tracking-[0.2em] uppercase">{cta}</span>}
        {current.dismissible && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="absolute right-3 opacity-70 hover:opacity-100"
          >
            <i className="ph ph-x text-base" />
          </button>
        )}
      </div>
    </div>
  )
}

export function MarketingPopup() {
  const popup = useQuery(api.marketing.activePopup)
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!popup || pathname.startsWith("/admin")) return
    if (
      popup.pages.length > 0 &&
      !popup.pages.some(
        (p) => p === pathname || (p.endsWith("*") && pathname.startsWith(p.slice(0, -1))),
      )
    )
      return
    const key = `sm_popup_${popup._id}`
    const last = Number(localStorage.getItem(key) ?? 0)
    const wait = popup.frequencyDays * 24 * 60 * 60 * 1000
    if (last && (popup.frequencyDays === 0 || Date.now() - last < wait)) return
    const timer = window.setTimeout(() => {
      setOpen(true)
      localStorage.setItem(key, String(Date.now()))
    }, popup.delaySeconds * 1000)
    return () => window.clearTimeout(timer)
  }, [popup, pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  if (!open || !popup) return null

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/60 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
        className={`relative grid w-full max-w-3xl overflow-hidden bg-sienna text-cream shadow-2xl ${popup.image ? "md:grid-cols-2" : ""}`}
      >
        {popup.image && (
          <img src={popup.image} alt="" className="hidden h-full w-full object-cover md:block" />
        )}
        <div className="p-8 md:p-10">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 text-cream/80 hover:text-cream"
          >
            <i className="ph ph-x text-2xl" />
          </button>
          <h2 id="popup-title" className="font-display text-5xl leading-[0.9]">
            {popup.headline}
          </h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-cream/85">{popup.body}</p>
          <SignupForm
            source="popup"
            tone="sienna"
            askName={popup.askName}
            buttonLabel={popup.buttonLabel}
            successMessage={popup.successMessage}
          />
        </div>
      </div>
    </div>
  )
}

export function ConsentBanner() {
  const consent = useConsent()
  const { pathname } = useLocation()
  if (consent || pathname.startsWith("/admin")) return null
  return (
    <div className="fixed inset-x-4 bottom-4 z-[140] mx-auto max-w-2xl rounded-2xl bg-ink/95 p-5 text-cream shadow-2xl backdrop-blur sm:flex sm:items-center sm:gap-6">
      <p className="font-body text-sm leading-relaxed text-cream/85">
        We use a first-party, anonymous visit counter to see which pages help guests. No ad
        trackers.{" "}
        <Link to="/privacy" className="underline">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => setConsent("denied")}
          className="rounded-full border border-cream/30 px-4 py-2 font-serif text-2xs tracking-[0.2em] uppercase hover:bg-cream/10"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className="rounded-full bg-cream px-4 py-2 font-serif text-2xs tracking-[0.2em] text-ink uppercase hover:bg-paper"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
