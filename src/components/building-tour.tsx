import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router"
import { EText } from "@/components/editable"
import { HOME_FLOORS } from "@/content/home"

/*
 * Home page, alternate version of the "Three floors" intro: a line drawing of
 * the building pins to the screen, and each floor washes red from the bottom up
 * as you scroll, with that restaurant's details beside it.
 */

// Drawing coordinates (the traced line art is 1230 x 1110).
const VIEW_W = 1230
const VIEW_H = 1110

/** Floor outlines, bottom to top, in the order the tour visits them. */
const FLOOR_SHAPES = [
  {
    id: "emporio",
    top: 700,
    bottom: 1018,
    d: "M118 700 L1101 700 L1107 968 L1127 968 L1127 1016 L104 1016 L104 970 L113 970 Z",
  },
  {
    id: "mezzo",
    top: 443,
    bottom: 700,
    d: "M123 445 L1098 445 L1101 700 L118 700 Z",
  },
  {
    id: "tetto",
    top: 63,
    bottom: 300,
    d: "M119 300 L1103 300 L1103 281 L1035 281 L1035 209 L971 209 L971 176 L907 173 C882 96 726 64 610 64 C486 64 344 112 318 176 L230 176 L230 209 L196 209 L196 281 L119 281 Z",
  },
] as const

const BLURBS: Record<string, string> = {
  emporio:
    "The ground-floor meatball joint. Easygoing and a little loud, in the best way: build a bowl or a hoagie, grab a draft and settle in.",
  mezzo:
    "Upstairs, the pace slows down. Hand-rolled pasta, wood-fired pizza and an Italian wine list, served by candlelight.",
  tetto: "The rooftop bar. Open air, cold drafts, pizza by the pie and the city all around you.",
}

// Scroll timeline, as fractions of the pinned scroll. Each floor washes in over
// FILL, then the previous floor fades back over FADE as the next one starts.
const STARTS = [0.12, 0.38, 0.64]
const FILL = 0.2
const FADE = 0.1
/** Scroll distance while pinned, in svh, on top of one screen. */
const TRAVEL_SVH = 330

const clamp = (n: number) => Math.min(1, Math.max(0, n))
const ease = (t: number) => t * t * (3 - 2 * t)

export function BuildingTour() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const washRefs = useRef<(SVGPathElement | null)[]>([])
  const fillRefs = useRef<(SVGGElement | null)[]>([])
  const [stage, setStage] = useState(0)
  const [pinned, setPinned] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let target = 0
    let current = 0
    let frame = 0
    let isPinned = true

    const paint = (p: number) => {
      FLOOR_SHAPES.forEach((floor, i) => {
        const fill = ease(clamp((p - STARTS[i]) / FILL))
        const next = STARTS[i + 1]
        const fade = next === undefined ? 0 : ease(clamp((p - next) / FADE))
        const height = floor.bottom - floor.top + 24
        // The wave-topped wash rises from below the floor to above it.
        washRefs.current[i]?.setAttribute(
          "transform",
          `translate(0 ${floor.bottom + 12 - fill * height})`,
        )
        fillRefs.current[i]?.setAttribute("opacity", String(fill > 0 ? 1 - fade : 0))
      })
      const active = STARTS.reduce((acc, start, i) => (p >= start ? i + 1 : acc), 0)
      setStage(active)
    }

    const tick = () => {
      // Ease towards the scroll position so the wash glides rather than steps.
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.0005) current = target
      paint(current)
      frame = current === target ? 0 : requestAnimationFrame(tick)
    }

    const read = () => {
      if (!isPinned) return
      const rect = section.getBoundingClientRect()
      const travel = section.offsetHeight - window.innerHeight
      target = travel > 0 ? clamp(-rect.top / travel) : 0
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const measure = () => {
      const content =
        ((panel.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0) +
        parseFloat(getComputedStyle(panel).paddingTop) +
        parseFloat(getComputedStyle(panel).paddingBottom)
      isPinned = !motion.matches && content <= window.innerHeight
      setPinned(isPinned)
      if (isPinned) read()
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (panel.firstElementChild) observer.observe(panel.firstElementChild)
    window.addEventListener("scroll", read, { passive: true })
    window.addEventListener("resize", measure)
    motion.addEventListener("change", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", read)
      window.removeEventListener("resize", measure)
      motion.removeEventListener("change", measure)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="The building, floor by floor"
      className="relative bg-paper text-ink"
      style={pinned ? { height: `${100 + TRAVEL_SVH}svh` } : undefined}
    >
      <div
        ref={panelRef}
        className={`flex items-center overflow-hidden py-5 md:py-12 ${pinned ? "sticky top-0 min-h-svh" : ""}`}
      >
        <div className="site-container grid items-center gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-14 lg:gap-24">
          <figure className="mx-auto w-full max-w-[min(100%,calc(34svh*1230/1110))] md:max-w-[min(100%,calc(74svh*1230/1110))]">
            <div className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  {FLOOR_SHAPES.map((floor, i) => (
                    <clipPath key={floor.id} id={`building-wash-${floor.id}`}>
                      {/* A softly wavy leading edge, like paint soaking upward. */}
                      <path
                        ref={(el) => {
                          washRefs.current[i] = el
                        }}
                        transform={`translate(0 ${floor.bottom + 12})`}
                        d={`M0 6 C 150 -6 300 14 460 4 S 760 -8 920 6 S 1140 14 ${VIEW_W} 2 L${VIEW_W} ${VIEW_H} L0 ${VIEW_H} Z`}
                      />
                    </clipPath>
                  ))}
                </defs>
                {FLOOR_SHAPES.map((floor, i) => (
                  <g
                    key={floor.id}
                    ref={(el) => {
                      fillRefs.current[i] = el
                    }}
                    opacity={0}
                    clipPath={`url(#building-wash-${floor.id})`}
                  >
                    <path d={floor.d} fill="var(--color-sienna)" />
                  </g>
                ))}
              </svg>
              <img
                src="/images/home/sienna-mercato-building.svg"
                alt="Line drawing of the Sienna Mercato building on Penn Avenue: Emporio on the ground floor, Mezzo on the second floor and Il Tetto on the roof"
                className="absolute inset-0 h-full w-full"
                draggable={false}
              />
            </div>
            <img
              src="/images/brand/sienna-mercato-logo.png"
              alt="Sienna Mercato"
              className="mx-auto mt-2 h-7 w-auto opacity-80 brightness-0 md:mt-8 md:h-12"
            />
          </figure>

          <div className="grid">
            <TourPanel active={!pinned || stage === 0} stacked={!pinned}>
              <p className="font-display text-[clamp(1.9rem,calc(4.2vw*var(--site-type-scale)),3.75rem)] leading-[1.05] text-ink">
                <EText k="building.intro.line1" d="Three floors." />{" "}
                <span className="text-sienna">
                  <EText k="building.intro.line2" d="Three rooms." />
                </span>{" "}
                <EText k="building.intro.line3" d="One Italian house on Penn Avenue." />
              </p>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink-soft md:mt-8 md:text-lg">
                <EText
                  k="building.intro.body"
                  d="A Cultural District landmark since 2013. One address at 942 Penn Avenue: 230 indoor seats, 120 on the rooftop, an Italian-led wine list of 90+ bottles, and 30 rotating drafts."
                />
              </p>
            </TourPanel>

            {HOME_FLOORS.map((floor, i) => (
              <TourPanel key={floor.id} active={!pinned || stage === i + 1} stacked={!pinned}>
                <div className="flex items-center gap-3 md:block">
                  <img
                    src={floor.logo}
                    alt=""
                    className="h-10 w-auto object-contain object-left opacity-70 brightness-0 md:h-16"
                  />
                  <h2 className="font-display text-[clamp(2.2rem,calc(5.5vw*var(--site-type-scale)),5rem)] leading-[0.9] text-ink md:mt-5">
                    {floor.name}
                  </h2>
                </div>
                <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink-soft md:mt-5 md:text-lg">
                  <EText k={`building.${floor.id}.blurb`} d={BLURBS[floor.id]} />
                </p>
                <ul className="mt-4 max-w-lg divide-y divide-ink/10 border-y border-ink/10 md:mt-6">
                  {floor.items.map((item, j) => (
                    <li key={item.name} className="flex items-baseline gap-3 py-1.5 md:py-3">
                      <span className="font-serif text-sm text-ink md:text-base">
                        <EText k={`floor.${floor.id}.item${j}.name`} d={item.name} />
                      </span>
                      <span className="hidden truncate font-body text-sm text-ink-soft lg:inline">
                        <EText k={`floor.${floor.id}.item${j}.note`} d={item.note} />
                      </span>
                      <span className="ml-auto font-serif text-sm text-sienna tabular-nums md:text-base">
                        <EText
                          k={`floor.${floor.id}.item${j}.price`}
                          d={item.price ? `$${item.price}` : ""}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 max-md:[--button-letter-spacing:0.1em] max-md:[--button-text-size:0.68rem] md:mt-7 md:gap-3">
                  <Link
                    to={floor.href}
                    className="btn-lift border border-ink text-ink hover:bg-ink hover:text-cream"
                  >
                    Discover the restaurant
                  </Link>
                  <Link
                    to={floor.menuHref}
                    className="btn-lift bg-sienna text-cream hover:bg-sienna-deep"
                  >
                    View the menu
                  </Link>
                </div>
              </TourPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** One state of the right-hand column; panels share a grid cell and cross-fade. */
function TourPanel({
  active,
  stacked,
  children,
}: {
  active: boolean
  /** Unpinned fallback: panels sit one under another instead of cross-fading. */
  stacked: boolean
  children: ReactNode
}) {
  return (
    <div
      aria-hidden={!active}
      inert={!active}
      className={stacked ? "py-8" : "tour-panel col-start-1 row-start-1 self-center"}
      data-active={active || undefined}
    >
      {children}
    </div>
  )
}
