import { useQuery } from "convex/react"
import { useState } from "react"
import { FadeIn } from "@/components/fade-in"
import type { FloorId } from "@/lib/site"
import { WEEKDAYS, WEEKDAYS_LONG, weekdayToday } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const TONES = {
  light: {
    section: "bg-cream text-ink",
    muted: "text-ink-soft",
    card: "bg-paper border-ink/10",
    accent: "text-sienna",
    tab: "border-ink/20 text-ink-soft hover:border-sienna hover:text-sienna",
    tabActive: "border-sienna bg-sienna text-cream",
  },
  dark: {
    section: "bg-ink text-paper",
    muted: "text-paper/65",
    card: "bg-paper/[0.04] border-paper/15",
    accent: "text-sienna-bright",
    tab: "border-paper/25 text-paper/70 hover:border-cream hover:text-cream",
    tabActive: "border-sienna-bright bg-sienna-bright text-cream",
  },
}

export function DailySpecials({
  restaurant,
  tone = "light",
  title = "Daily specials.",
}: {
  restaurant: FloorId
  tone?: keyof typeof TONES
  title?: string
}) {
  const specials = useQuery(api.specials.list, { restaurant })
  const today = weekdayToday()
  const [day, setDay] = useState(today)
  const t = TONES[tone]
  const forDay = (specials ?? []).filter((special) => special.days.includes(day))

  return (
    <section id="specials" className={`relative py-24 ${t.section}`}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className={`mb-3 font-serif text-xs tracking-[0.4em] uppercase ${t.accent}`}>
                {day === today ? "Today" : WEEKDAYS_LONG[day]}
              </div>
              <h2 className="font-display text-[clamp(2.4rem,calc(5vw*var(--site-type-scale)),4.5rem)] leading-[0.9]">
                {title}
              </h2>
            </div>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Day of week">
              {WEEKDAYS.map((label, index) => (
                <button
                  key={label}
                  role="tab"
                  aria-selected={day === index}
                  onClick={() => setDay(index)}
                  className={`rounded-full border px-3.5 py-1.5 font-serif text-2xs tracking-[0.25em] uppercase transition-colors ${
                    day === index ? t.tabActive : t.tab
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {specials === undefined ? (
          <div className="h-40" />
        ) : forDay.length === 0 ? (
          <div className={`border border-dashed px-6 py-14 text-center ${t.card}`}>
            <p className={`font-body text-lg ${t.muted}`}>
              No specials posted for {WEEKDAYS_LONG[day]}. The full menu is always on.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {forDay.map((special) => (
              <article
                key={special._id}
                className={`flex flex-col overflow-hidden border ${t.card}`}
              >
                {special.image && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={special.image}
                      alt={special.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl leading-tight">{special.name}</h3>
                    {special.price && (
                      <span className={`font-serif text-lg tabular-nums ${t.accent}`}>
                        {/^\d/.test(special.price) ? `$${special.price}` : special.price}
                      </span>
                    )}
                  </div>
                  {special.desc && (
                    <p className={`mt-2 font-body text-base leading-relaxed ${t.muted}`}>
                      {special.desc}
                    </p>
                  )}
                  <div
                    className={`mt-auto pt-5 font-serif text-2xs tracking-[0.3em] uppercase ${t.muted}`}
                  >
                    {special.days.length === 7
                      ? "Every day"
                      : special.days.map((d) => WEEKDAYS[d]).join(" • ")}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
