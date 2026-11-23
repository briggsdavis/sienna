import { useQuery } from "convex/react"
import type { ReactNode } from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { useTrackClick } from "@/lib/analytics"
import { FLOORS, PHONE, type FloorId } from "@/lib/site"
import { api } from "../../convex/_generated/api"

export function useSettings() {
  return useQuery(api.settings.get)
}

export function useReservation(restaurant: FloorId) {
  return useSettings()?.reservations[restaurant]
}

export function reserveSummary(mode: string | undefined, note?: string) {
  if (note) return note
  if (mode === "walkin") return "Walk-ins welcome"
  return "Reserve online"
}

export function ReserveLink({
  restaurant,
  className,
  children,
  onClick,
}: {
  restaurant: FloorId
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const reservation = useReservation(restaurant)
  const track = useTrackClick()
  const floor = FLOORS[restaurant]

  if (reservation?.mode === "link" && reservation.url) {
    return (
      <ExternalLink
        href={reservation.url}
        className={className}
        onClick={() => {
          track("reservationClick")
          onClick?.()
        }}
      >
        {children}
      </ExternalLink>
    )
  }
  return (
    <Link to={`${floor.href}#reserve`} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

export function ReservationPanel({
  restaurant,
  tone = "dark",
}: {
  restaurant: FloorId
  tone?: "dark" | "light"
}) {
  const reservation = useReservation(restaurant)
  const track = useTrackClick()
  const dark = tone === "dark"
  const button = dark
    ? "bg-cream text-sienna hover:bg-paper"
    : "bg-sienna text-cream hover:bg-sienna-bright"
  const outline = dark
    ? "border-cream/50 hover:bg-cream/10"
    : "border-ink/30 text-ink hover:bg-ink/5"

  if (!reservation) return <div className="h-14" />

  if (reservation.mode === "embed" && reservation.url) {
    return (
      <div className="overflow-hidden rounded-lg bg-white">
        <iframe
          src={reservation.url}
          title={`Reserve at ${FLOORS[restaurant].name}`}
          className="h-[560px] w-full"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      {reservation.mode === "link" && reservation.url ? (
        <ExternalLink
          href={reservation.url}
          onClick={() => track("reservationClick")}
          className={`btn-lift group inline-flex items-center gap-2 px-6 py-3 font-serif text-xs tracking-[0.25em] uppercase transition-colors ${button}`}
        >
          <i className="ph ph-calendar-dots text-sm" />
          {reservation.label || "Reserve a table"}
          <i className="ph ph-arrow-up-right text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </ExternalLink>
      ) : (
        <span
          className={`inline-flex items-center gap-2 border px-6 py-3 font-serif text-xs tracking-[0.25em] uppercase ${
            dark ? "border-cream/30" : "border-ink/20 text-ink"
          } rounded-full`}
        >
          <i className="ph ph-door-open text-sm" />
          {reservation.note || "Walk-ins welcome"}
        </span>
      )}
      <a
        href={PHONE.href}
        className={`btn-lift inline-flex items-center gap-2 border px-6 py-3 font-serif text-xs tracking-[0.25em] uppercase transition-colors ${outline}`}
      >
        <i className="ph ph-phone text-sm" />
        {PHONE.label}
      </a>
    </div>
  )
}
