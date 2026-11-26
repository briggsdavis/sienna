import { MezzoValueIcon, useInView, type IconName } from "@/components/mezzo-value-icon"

/**
 * A small divider: a hand-drawn icon in the middle, with a line drawing
 * outward from it to the left and right when it scrolls into view.
 */
export function SectionBreak({
  icon,
  className = "",
}: {
  icon: IconName
  /** Sets the colour (via text-*) and spacing. */
  className?: string
}) {
  const ref = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`section-break flex items-center gap-4 sm:gap-6 ${className}`}
    >
      <span className="draw-out draw-out-left h-[1.5px] flex-1 bg-current opacity-70" />
      <MezzoValueIcon name={icon} delay={0.2} className="h-auto w-20 shrink-0 sm:w-24" />
      <span className="draw-out draw-out-right h-[1.5px] flex-1 bg-current opacity-70" />
    </div>
  )
}
