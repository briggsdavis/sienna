import { useMutation, useQuery } from "convex/react"
import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { useLocation } from "react-router"
import { api } from "../../convex/_generated/api"

const VISITOR_KEY = "sm_vid"
const CONSENT_KEY = "sm_consent"

export type Consent = "granted" | "denied" | null

const listeners = new Set<() => void>()

function readConsent(): Consent {
  const value = localStorage.getItem(CONSENT_KEY)
  return value === "granted" || value === "denied" ? value : null
}

export function setConsent(value: "granted" | "denied") {
  localStorage.setItem(CONSENT_KEY, value)
  if (value === "denied") localStorage.removeItem(VISITOR_KEY)
  listeners.forEach((listener) => listener())
}

export function useConsent() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    readConsent,
    () => null,
  )
}

function visitorId() {
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

function useTrackingAllowed() {
  const consent = useConsent()
  const settings = useQuery(api.settings.get)
  if (!settings) return false
  if (consent === "denied") return false
  if (settings.requireAnalyticsConsent && consent !== "granted") return false
  return true
}

export function usePageTracking() {
  const { pathname, search } = useLocation()
  const allowed = useTrackingAllowed()
  const track = useMutation(api.analytics.track)
  const [firstReferrer] = useState(() => document.referrer)
  const [seenFirst, setSeenFirst] = useState(false)

  useEffect(() => {
    if (!allowed || pathname.startsWith("/admin")) return
    const params = new URLSearchParams(search)
    let referrer = seenFirst ? "" : firstReferrer
    try {
      if (referrer && new URL(referrer).host === window.location.host) referrer = ""
    } catch {
      referrer = ""
    }
    setSeenFirst(true)
    track({
      visitorId: visitorId(),
      path: pathname,
      referrer,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
    }).catch(() => {})
  }, [pathname, allowed])
}

export function useTrackClick() {
  const allowed = useTrackingAllowed()
  const trackConversion = useMutation(api.analytics.trackConversion)
  return useCallback(
    (key: "reservationClick" | "giftCardClick") => {
      if (!allowed) return
      trackConversion({ visitorId: visitorId(), key }).catch(() => {})
    },
    [allowed, trackConversion],
  )
}
