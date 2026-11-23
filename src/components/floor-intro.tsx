import type { ReactNode } from "react"
import { EText } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"

export type Stat = { value: string; label: string }

export function FloorIntro({
  image,
  hours,
  badge,
  badgeClassName,
  statement,
  body,
  stats,
}: {
  image: ReactNode
  hours: ReactNode
  badge: ReactNode
  badgeClassName: string
  statement: ReactNode
  body: ReactNode
  stats: readonly Stat[]
}) {
  return (
    <section className="relative overflow-hidden bg-paper py-24">
      <div className="mx-auto grid max-w-[1600px] gap-0 px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-12">
        <FadeIn>
          <div className="group relative mb-12 aspect-[4/5] overflow-hidden lg:mb-0">
            {image}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-8">
              <div className="font-display text-3xl leading-tight text-cream">942 Penn Avenue</div>
              <div className="mt-1 font-body text-sm text-cream/70">{hours}</div>
            </div>
            <div
              className={`absolute top-6 left-6 px-3 py-1.5 font-serif text-2xs tracking-[0.35em] text-cream uppercase ${badgeClassName}`}
            >
              {badge}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-col justify-center">
            <p className="font-display text-3xl leading-[1.15] text-ink md:text-4xl">{statement}</p>
            <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-ink-soft">{body}</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10">
              {stats.map((stat, i) => (
                <div key={stat.label}>
                  <div className="font-display text-4xl leading-none text-sienna">
                    <EText k={`intro.stat${i}.value`} d={stat.value} />
                  </div>
                  <div className="mt-1 font-body text-sm text-ink-soft">
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
