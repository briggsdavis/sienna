import { useQuery } from "convex/react"
import { useEffect, useRef } from "react"
import { FadeIn } from "@/components/fade-in"
import { SPECIALS_PHOTOS } from "@/content/mezzo"
import { unsplash } from "@/lib/site"
import { WEEKDAYS_LONG } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const WEEK = [1, 2, 3, 4, 5, 6, 0] as const

export function MezzoSpecials() {
  const specials = useQuery(api.specials.list, { restaurant: "mezzo" })
  const areaRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const spacerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const area = areaRef.current
    const panel = panelRef.current
    const viewport = viewportRef.current
    const spacer = spacerRef.current
    if (!area || !panel || !viewport || !spacer) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let distance = 0
    let frame = 0

    const update = () => {
      frame = 0
      if (!distance) return
      const offset = panel.getBoundingClientRect().top - area.getBoundingClientRect().top
      viewport.scrollLeft = Math.max(0, Math.min(distance, offset))
    }

    const measure = () => {
      const top = Number.parseFloat(getComputedStyle(panel).top) || 0
      const fits = panel.offsetHeight + top <= window.innerHeight
      distance = !motion.matches && fits ? viewport.scrollWidth - viewport.clientWidth : 0
      panel.dataset.scrollPinned = String(distance > 0)
      spacer.style.height = `${distance}px`
      if (frame) cancelAnimationFrame(frame)
      update()
    }

    const onScroll = () => {
      if (distance && !frame) frame = requestAnimationFrame(update)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(panel)
    observer.observe(viewport)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", measure)
    motion.addEventListener("change", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", measure)
      motion.removeEventListener("change", measure)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [specials])

  const cards = specials
    ? WEEK.flatMap((day) => {
        const forDay = specials.filter((special) => special.days.includes(day))
        return (forDay.length ? forDay : [null]).map((special) => ({ day, special }))
      })
    : []

  return (
    <section
      id="specials"
      aria-labelledby="mezzo-specials-title"
      className="bg-paper py-16 md:py-24"
    >
      <div ref={areaRef} className="site-container">
        <div ref={panelRef} className="group top-8 data-[scroll-pinned=true]:sticky sm:top-16">
          <FadeIn stagger>
            <h2
              id="mezzo-specials-title"
              className="font-display text-[clamp(2rem,calc(4vw*var(--site-type-scale)),3.5rem)] leading-none"
            >
              Daily specials
            </h2>
            <p className="mt-4 text-[clamp(0.65rem,calc(3.7vw*var(--site-type-scale)),1rem)] leading-relaxed whitespace-nowrap text-ink-soft">
              See what’s on special at Mezzo throughout the week.
            </p>
          </FadeIn>
          <div
            ref={viewportRef}
            className="mt-8 overflow-x-auto group-data-[scroll-pinned=true]:overflow-hidden md:mt-10"
          >
            <ul
              aria-label="Mezzo specials by day"
              aria-busy={specials === undefined}
              className="grid min-h-36 gap-5 [--special-card-width:80%] motion-safe:auto-cols-[min(var(--special-card-width),29.6rem,52svh)] motion-safe:grid-flow-col motion-safe:grid-rows-[auto_auto_1fr] motion-reduce:grid-cols-[min(var(--special-card-width),29.6rem)] md:[--special-card-width:calc((100%_-_2rem)*4/7)] lg:[--special-card-width:calc((100%_-_3.5rem)*4/7)]"
            >
              {cards.map(({ day, special }) => (
                <li
                  key={`${day}-${special?._id ?? "empty"}`}
                  className="grid min-w-0 gap-3 motion-safe:row-span-3 motion-safe:grid-rows-subgrid"
                >
                  <h3 className="font-display text-[clamp(1.15rem,calc(2vw*var(--site-type-scale)),1.6rem)] leading-tight">
                    {special?.name ?? "No special posted"}
                  </h3>
                  <img
                    src={special?.image || unsplash(SPECIALS_PHOTOS[day], 960, 80)}
                    alt=""
                    loading="lazy"
                    className="aspect-square w-full bg-paper-deep object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-sienna">
                      {WEEKDAYS_LONG[day]}
                      {special?.price && (
                        <span className="ml-3 text-ink-soft tabular-nums">
                          {/^\d/.test(special.price) ? `$${special.price}` : special.price}
                        </span>
                      )}
                    </p>
                    {special?.desc && (
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{special.desc}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div ref={spacerRef} aria-hidden="true" />
      </div>
    </section>
  )
}
