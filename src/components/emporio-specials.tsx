import { useQuery } from "convex/react"
import { Link } from "react-router"
import { useScrollCorners } from "@/hooks/use-scroll-corners"
import { FLOORS, unsplash } from "@/lib/site"
import { formatPrice, WEEKDAYS_LONG } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const FALLBACK_IMAGE = unsplash("1529042410759-befb1204b468", 1200, 80)

/** Shown until real specials are posted in the admin (dishes from the Emporio menu). */
const SAMPLE_SPECIALS = [
  {
    _id: "sample-buffalo",
    name: "Buffalo Fried Chicken Balls",
    desc: "Seven balls with bleu cheese and celery.",
    price: "12",
    days: [1],
    image: null,
  },
  {
    _id: "sample-bruschetta",
    name: "Bruschetta",
    desc: "Whipped ricotta, roasted tomato, balsamic and arugula.",
    price: "12",
    days: [3],
    image: null,
  },
  {
    _id: "sample-crack-fries",
    name: "Crack Fries",
    desc: "Smothered in crack sauce, buffalo and ranch.",
    price: "12",
    days: [5],
    image: null,
  },
]

export function EmporioSpecials() {
  const loaded = useQuery(api.specials.list, { restaurant: "emporio" })
  const isSample = loaded?.length === 0
  const specials = isSample ? SAMPLE_SPECIALS : loaded
  const region = useScrollCorners<HTMLElement>(specials)

  return (
    <section
      id="specials"
      ref={region}
      aria-labelledby="emporio-specials-title"
      className="min-h-svh scroll-mt-20 overflow-x-clip bg-cream text-ink"
    >
      <div className="site-container grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] lg:gap-10">
        <div className="[container-type:inline-size] pt-14 lg:sticky lg:top-0 lg:flex lg:min-h-svh lg:flex-col lg:items-start lg:justify-center lg:self-start lg:py-12 lg:pl-10">
          <h2
            id="emporio-specials-title"
            className="font-display text-[clamp(2.75rem,calc(27cqi*var(--site-type-scale)),8.5rem)] leading-[0.95] tracking-tight"
          >
            <span className="lg:block">The</span> <span className="lg:block">Daily</span>{" "}
            <span className="lg:block">Specials</span>
          </h2>
          <Link
            to={FLOORS.emporio.menuHref}
            className="btn-lift mt-6 border border-ink/30 text-ink hover:border-sienna hover:bg-sienna hover:text-cream"
          >
            View the menu <i aria-hidden="true" className="ph ph-arrow-right" />
          </Link>
        </div>

        <div>
          {specials === undefined ? (
            <div
              role="status"
              className="grid min-h-[50svh] items-center text-ink-soft lg:min-h-svh"
            >
              Loading specials…
            </div>
          ) : specials.length === 0 ? (
            <p className="grid min-h-[50svh] items-center text-ink-soft lg:min-h-svh">
              No daily specials are posted right now.
            </p>
          ) : (
            specials.map((special) => {
              const days = special.days.map((day) => WEEKDAYS_LONG[day])
              return (
                <article
                  key={special._id}
                  className="grid min-h-svh content-center items-center gap-6 py-12 sm:grid-cols-[minmax(0,2fr)_minmax(0,4fr)] lg:gap-8"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="font-sans text-xl leading-tight xl:text-2xl">
                        {special.name}
                      </h3>
                      {special.price && (
                        <span className="text-lg whitespace-nowrap tabular-nums">
                          {formatPrice(special.price)}
                        </span>
                      )}
                    </div>
                    {special.desc && (
                      <p className="mt-2 leading-relaxed text-ink-soft">{special.desc}</p>
                    )}
                    <p className="mt-5 flex items-baseline gap-2 font-sans text-sm uppercase">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 self-center rounded-full bg-current"
                      />
                      {days.length === 7 ? "Every day" : days.join(", ")}
                    </p>
                  </div>
                  <div
                    data-scroll-corners
                    className="scroll-diagonal order-first aspect-[3/2] overflow-hidden bg-paper-deep sm:order-none"
                  >
                    <img
                      src={special.image || FALLBACK_IMAGE}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
