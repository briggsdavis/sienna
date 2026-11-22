import { FadeIn } from "@/components/fade-in"

export type Deal = { value: string; label: string; icon: string }

export function HappyHour({
  title,
  titleSize,
  body,
  schedule,
  deals,
  dealsDelay,
}: {
  title: string
  titleSize: string
  body: string
  schedule: string
  deals: readonly Deal[]
  dealsDelay: number
}) {
  return (
    <section id="happy-hour" className="relative overflow-hidden bg-ink py-24 text-paper">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div>
              <div className="mb-3 font-serif text-lg text-sienna-bright">
                aperitivo · happy hour
              </div>
              <h2 className={`font-display ${titleSize} leading-[0.9]`}>{title}</h2>
              <p className="mt-6 max-w-md font-body text-xl leading-relaxed text-paper/85">
                {body}
              </p>
              <div className="mt-8 inline-flex items-center gap-3 border border-paper/30 px-5 py-2.5 font-serif text-xs tracking-[0.3em] uppercase">
                <i className="ph ph-clock text-base text-sienna-bright" />
                {schedule}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={dealsDelay}>
            <ul className="grid gap-px bg-paper/10 sm:grid-cols-2">
              {deals.map((deal) => (
                <li key={deal.label} className="flex items-center gap-5 bg-ink p-6">
                  <i className={`ph-duotone ${deal.icon} text-4xl text-sienna-bright`} />
                  <div>
                    <div className="font-display text-3xl">{deal.value}</div>
                    <div className="font-body text-paper/75">{deal.label}</div>
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
