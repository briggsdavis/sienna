import type { ReactNode } from "react"
import { EText } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"

export type Deal = { value: string; label: string; icon: string }

export function HappyHour({
  title,
  titleSize,
  body,
  schedule,
  deals,
  dealsDelay,
  tone = "dark",
}: {
  title: ReactNode
  titleSize: string
  body: ReactNode
  schedule: ReactNode
  deals: readonly Deal[]
  dealsDelay: number
  tone?: "dark" | "paper"
}) {
  const paper = tone === "paper"
  const muted = paper ? "text-ink-soft" : "text-paper/85"
  const accent = paper ? "text-sienna" : "text-sienna-bright"

  return (
    <section
      id="happy-hour"
      className={`relative overflow-hidden py-24 ${paper ? "bg-paper text-ink" : "bg-ink text-paper"}`}
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div>
              <h2 className={`font-display ${titleSize} leading-[0.9]`}>{title}</h2>
              <p className={`mt-6 max-w-md font-body text-xl leading-relaxed ${muted}`}>{body}</p>
              <div
                className={`mt-8 inline-flex items-center gap-3 border px-5 py-2.5 font-serif text-xs tracking-[0.3em] uppercase ${paper ? "border-ink/25" : "border-paper/30"}`}
              >
                <i className={`ph ph-clock text-base ${accent}`} />
                {schedule}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={dealsDelay}>
            <ul className={`grid gap-px sm:grid-cols-2 ${paper ? "bg-ink/10" : "bg-paper/10"}`}>
              {deals.map((deal, i) => (
                <li
                  key={deal.label}
                  className={`flex items-center gap-5 p-6 ${paper ? "bg-paper" : "bg-ink"}`}
                >
                  <i className={`ph-duotone ${deal.icon} text-4xl ${accent}`} />
                  <div>
                    <div className="font-display text-3xl">
                      <EText k={`happy.deal${i}.value`} d={deal.value} />
                    </div>
                    <div className={`font-body ${paper ? muted : "text-paper/75"}`}>
                      <EText k={`happy.deal${i}.label`} d={deal.label} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
