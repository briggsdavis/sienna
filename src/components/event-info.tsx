import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import type { EventOccurrence } from "@/lib/events"
import { formatDay, formatTime, isInternal } from "@/lib/util"

export function EventDateTime({
  occurrence,
  startTime,
  endTime,
  iconsAfter = false,
}: Pick<EventOccurrence, "occurrence" | "startTime" | "endTime"> & {
  /** Put the icons after the text, for right-aligned layouts. */
  iconsAfter?: boolean
}) {
  const row = `inline-flex flex-wrap items-center gap-x-1.5 ${iconsAfter ? "flex-row-reverse" : ""}`
  return (
    <div className={`flex flex-col gap-y-1 text-sm ${iconsAfter ? "items-end" : "items-start"}`}>
      <span className={row}>
        <i aria-hidden="true" className="ph ph-calendar-blank text-base" />
        <time dateTime={occurrence}>
          {formatDay(occurrence, { weekday: "short", month: "short", day: "numeric" })}
        </time>
      </span>
      {startTime && (
        <span className={row}>
          <i aria-hidden="true" className="ph ph-clock text-base" />
          <span>
            <time dateTime={startTime}>{formatTime(startTime)}</time>
            {endTime && (
              <>
                {" "}
                to <time dateTime={endTime}>{formatTime(endTime)}</time>
              </>
            )}
          </span>
        </span>
      )}
    </div>
  )
}

export function EventButton({ href, label }: { href: string; label: string }) {
  const className = "btn-lift mt-5 bg-sienna-bright text-cream hover:bg-cream hover:text-sienna"
  if (isInternal(href)) {
    return (
      <Link to={href} className={className}>
        {label}
        <i aria-hidden="true" className="ph ph-arrow-right text-xs" />
      </Link>
    )
  }

  return (
    <ExternalLink href={href} className={className}>
      {label}
      <i aria-hidden="true" className="ph ph-arrow-up-right text-xs" />
    </ExternalLink>
  )
}
