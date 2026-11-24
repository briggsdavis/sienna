import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import type { EventOccurrence } from "@/lib/events"
import { formatDay, formatTime, isInternal } from "@/lib/util"

export function EventDateTime({
  occurrence,
  startTime,
  endTime,
}: Pick<EventOccurrence, "occurrence" | "startTime" | "endTime">) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />
        <time dateTime={occurrence}>
          {formatDay(occurrence, { weekday: "short", month: "short", day: "numeric" })}
        </time>
      </span>
      {startTime && (
        <span className="inline-flex flex-wrap items-center gap-x-1.5">
          <i aria-hidden="true" className="ph ph-clock text-base" />
          <time dateTime={startTime}>{formatTime(startTime)}</time>
          {endTime && (
            <>
              to <time dateTime={endTime}>{formatTime(endTime)}</time>
            </>
          )}
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
