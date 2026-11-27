import type { ReactNode } from "react"
import { EText } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { useScrollCorners } from "@/hooks/use-scroll-corners"

export type Stat = { value: string; label: string }

export function FloorIntro({
  image,
  photoDetails,
  statement,
  body,
  stats,
  tone = "paper",
  scrollCorners = false,
}: {
  image: ReactNode
  photoDetails?: { hours: ReactNode; badge: ReactNode; badgeClassName: string }
  statement: ReactNode
  body: ReactNode
  stats: readonly Stat[]
  tone?: "paper" | "sienna"
  /** Photo starts fully rounded and straightens to square corners as it scrolls to centre. */
  scrollCorners?: boolean
}) {
  const region = useScrollCorners<HTMLElement>(undefined)
  const sienna = tone === "sienna"
  const muted = sienna ? "text-cream/90" : "text-ink-soft"
  return (
    <section
      ref={region}
      className={`relative overflow-hidden py-24 ${sienna ? "text-cream" : "bg-paper text-ink"}`}
    >
      <div className="mx-auto grid max-w-[1600px] gap-0 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-12">
        <FadeIn>
          <div
            data-scroll-corners={scrollCorners || undefined}
            className="group relative mb-12 aspect-[4/5] overflow-hidden lg:mb-0"
          >
            {image}
            {photoDetails && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-8">
                  <div className="font-display text-3xl leading-tight text-cream">
                    942 Penn Avenue
                  </div>
                  <div className="mt-1 font-body text-sm text-cream/70">{photoDetails.hours}</div>
                </div>
                <div
                  className={`absolute top-6 left-6 px-3 py-1.5 font-serif text-2xs tracking-[0.35em] text-cream uppercase ${photoDetails.badgeClassName}`}
                >
                  {photoDetails.badge}
                </div>
              </>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-none text-balance">
              {statement}
            </h2>
            <p className={`mt-8 max-w-xl font-body text-xl leading-relaxed ${muted}`}>{body}</p>
            <div
              className={`mt-10 grid grid-cols-3 gap-6 border-t pt-10 ${sienna ? "border-cream/30" : "border-ink/10"}`}
            >
              {stats.map((stat, i) => (
                <div key={stat.label}>
                  <div
                    className={`font-display text-4xl leading-none ${sienna ? "text-cream" : "text-sienna"}`}
                  >
                    <EText k={`intro.stat${i}.value`} d={stat.value} />
                  </div>
                  <div className={`mt-1 font-body text-sm ${muted}`}>
                    <EText k={`intro.stat${i}.label`} d={stat.label} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
