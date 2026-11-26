import { useQuery } from "convex/react"
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react"
import { EText, ELink } from "@/components/editable"
import { FadeIn } from "@/components/fade-in"
import { MezzoValueIcon } from "@/components/mezzo-value-icon"
import { ReserveLink } from "@/components/reserve"
import { SPECIALS_SAMPLES } from "@/content/mezzo"
import { FLOORS } from "@/lib/site"
import { formatPrice, WEEKDAYS_LONG } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const WEEK = [1, 2, 3, 4, 5, 6, 0] as const
/** Scroll distance per special while the section is pinned, in svh. */
const STEP_SVH = 60
// Curved carousel geometry, relative to the main card's width. Cards sit on
// the outside of a turning drum, cut into thin vertical slices so each image
// bends with the curve. The drum wraps, so the week loops.
const CARD_GAP = 0.04
const RADIUS = 2.25
const PERSPECTIVE = 4
/** Card height over width: 4:3 landscape. */
const CARD_ASPECT = 0.75
const SLICES = 20
/** Angle between neighbouring card centres, in radians. */
const CARD_ANGLE = (1 + CARD_GAP) / RADIUS

/** Wraps a card offset into the range -count/2 .. count/2. */
function wrapOffset(offset: number, count: number) {
  const d = ((offset % count) + count) % count
  return d > count / 2 ? d - count : d
}
const wrapIndex = (index: number, count: number) => ((index % count) + count) % count

const SWAP_MS = 280

type Card = {
  key: string
  day: number
  isSample: boolean
  name: string
  image: string
  price?: string
  desc?: string
}

export function MezzoSpecials() {
  const specials = useQuery(api.specials.list, { restaurant: "mezzo" })

  const cards = useMemo<Card[]>(
    () =>
      specials
        ? WEEK.flatMap((day) => {
            const forDay = specials.filter((special) => special.days.includes(day))
            const sample = SPECIALS_SAMPLES[day]
            return (forDay.length ? forDay : [null]).map((special) => ({
              key: `${day}-${special?._id ?? "sample"}`,
              day,
              isSample: special === null,
              name: special?.name ?? sample.name,
              image: special?.image || sample.image,
              price: special?.price,
              desc: special ? special.desc : sample.desc,
            }))
          })
        : [],
    [specials],
  )

  const count = cards.length
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const positionRef = useRef(0)
  const [pinned, setPinned] = useState(false)
  const [active, setActive] = useState(0)

  // Turn the drum so the card at `position` faces forward. Neighbours peek
  // in from each side and fade out towards the edges.
  const layout = (position: number) => {
    positionRef.current = position
    const stage = stageRef.current
    const ring = ringRef.current
    const column = stage?.parentElement
    if (!stage || !ring || !column || !count) return
    const card = Math.min(column.clientWidth * 0.8, window.innerHeight * 0.6)
    const height = card * CARD_ASPECT
    const fade = Math.max(0, (stage.offsetWidth - card) / 2 - 4)
    stage.style.height = `${height * 1.06}px`
    stage.style.setProperty("--ring-w", `${card}px`)
    stage.style.setProperty("--ring-r", `${card * RADIUS}px`)
    stage.style.perspective = `${card * PERSPECTIVE}px`
    stage.style.maskImage = `linear-gradient(to right, transparent, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent)`
    ring.style.transform = `translateZ(${-card * RADIUS}px)`
    cardRefs.current.forEach((el, index) => {
      if (!el) return
      const d = wrapOffset(index - position, count)
      el.style.visibility = Math.abs(d) < 1.7 ? "visible" : "hidden"
      el.style.transform = `rotateY(${d * CARD_ANGLE}rad)`
    })
  }

  // Pin the section and drive the ring from scroll when the panel fits on screen.
  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel || count < 2) {
      setPinned(false)
      return
    }
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let isPinned = false
    let frame = 0

    const update = () => {
      frame = 0
      if (!isPinned) return
      const rect = section.getBoundingClientRect()
      const travel = section.offsetHeight - window.innerHeight
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
      const position = progress * count
      layout(position)
      setActive(wrapIndex(Math.round(position), count))
    }

    const measure = () => {
      // Layout height only: offsetHeight ignores the transforms used by reveals.
      const style = getComputedStyle(panel)
      const content =
        ((panel.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0) +
        Number.parseFloat(style.paddingTop) +
        Number.parseFloat(style.paddingBottom)
      isPinned = !motion.matches && content <= window.innerHeight
      setPinned(isPinned)
      if (isPinned) update()
      else layout(positionRef.current)
    }

    const onScroll = () => {
      if (isPinned && !frame) frame = requestAnimationFrame(update)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(panel.firstElementChild ?? panel)
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
    // layout only touches refs; re-run when the cards change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  // Unpinned: animate the ring to the chosen card.
  useEffect(() => {
    if (pinned) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const from = positionRef.current
    // Take the short way round the drum.
    const to = count ? from + wrapOffset(active - from, count) : 0
    if (reduce || from === to) {
      layout(to)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 650)
      const eased = 1 - Math.pow(1 - t, 3)
      layout(from + (to - from) * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, pinned, count])

  /** Step one special forward (1) or back (-1); the week wraps. */
  const step = (direction: 1 | -1) => {
    const section = sectionRef.current
    if (pinned && section) {
      const travel = section.offsetHeight - window.innerHeight
      const top = section.getBoundingClientRect().top + window.scrollY
      let target = Math.round(positionRef.current) + direction
      if (target < 0) target = count - 1
      if (target > count) target = 1
      window.scrollTo({ top: top + (target / count) * travel, behavior: "smooth" })
    } else {
      setActive((current) => wrapIndex(current + direction, count))
    }
  }

  // Swipe between specials when not pinned (small screens, reduced motion).
  const swipe = useRef<number | null>(null)
  const onPointerDown = (e: PointerEvent) => {
    if (!pinned) swipe.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (swipe.current === null) return
    const dx = e.clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1)
  }

  // The slices only change with the data; keep them out of per-step re-renders.
  const ringCards = useMemo(
    () =>
      cards.map((card, index) => (
        <div
          key={card.key}
          ref={(el) => {
            cardRefs.current[index] = el
          }}
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ visibility: index < 2 || index === cards.length - 1 ? "visible" : "hidden" }}
        >
          {Array.from({ length: SLICES }, (_, slice) => {
            const along = (slice + 0.5) / SLICES - 0.5
            const angle = along / RADIUS
            return (
              <div
                key={slice}
                className="absolute top-1/2 left-1/2 overflow-hidden bg-ink/25 [backface-visibility:hidden]"
                style={{
                  width: `calc(var(--ring-w) / ${SLICES} + 0.6px)`,
                  height: `calc(var(--ring-w) * ${CARD_ASPECT})`,
                  margin: `calc(var(--ring-w) * ${-CARD_ASPECT / 2}) 0 0 calc(var(--ring-w) / ${-2 * SLICES})`,
                  transform: `rotateY(${angle}rad) translateZ(var(--ring-r))`,
                }}
              >
                <img
                  src={card.image}
                  alt=""
                  draggable={false}
                  className="h-full max-w-none object-cover"
                  style={{
                    width: "var(--ring-w)",
                    marginLeft: `calc(var(--ring-w) * ${-slice / SLICES})`,
                  }}
                />
              </div>
            )
          })}
        </div>
      )),
    [cards],
  )

  const current = useBlurSwap(Math.min(active, Math.max(0, count - 1)))
  const shown = cards[current.index]

  return (
    <section
      ref={sectionRef}
      id="specials"
      aria-labelledby="mezzo-specials-title"
      className="relative bg-sienna-deep text-cream"
      style={pinned ? { height: `${100 + count * STEP_SVH}svh` } : undefined}
    >
      <div
        ref={panelRef}
        className={`flex items-center overflow-hidden py-8 md:py-10 ${pinned ? "sticky top-0 min-h-svh" : ""}`}
      >
        <div className="site-container grid items-center gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-14 lg:gap-24">
          <FadeIn stagger className="md:self-start md:pt-6">
            <p className="mb-4 font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase sm:text-xs">
              <EText k="specials.eyebrow" d="This Week" words />
            </p>
            <h2
              id="mezzo-specials-title"
              className="font-display text-[clamp(2.25rem,calc(4.6vw*var(--site-type-scale)),4rem)] leading-[0.95]"
            >
              <EText k="specials.title" d="Daily specials" words={0.12} />
            </h2>
            <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-cream/80 md:mt-5">
              <EText
                k="specials.body"
                d="Something new from the kitchen every night of the week. Here’s what’s on at Mezzo."
                words={0.3}
              />
            </p>
            <div className="mt-8 hidden md:block">
              <ELink
                k="specials.menuLink"
                label="View the Menu"
                href={FLOORS.mezzo.menuHref}
                className="btn-lift btn-fill btn-fill-cream border border-cream/50 text-cream"
              />
              <MezzoValueIcon
                name="chalkboard"
                delay={0.3}
                className="mt-12 h-auto w-44 text-cream/80 lg:w-52"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="min-w-0">
            <div
              className="blur-swap min-h-[4rem] md:min-h-[4.5rem]"
              data-swap={current.out ? "out" : "in"}
              aria-live={pinned ? undefined : "polite"}
            >
              {shown && (
                <>
                  <p className="font-serif text-2xs tracking-[0.4em] text-cream/60 uppercase sm:text-xs">
                    {WEEKDAYS_LONG[shown.day]}
                    {shown.isSample && <span className="ml-3 text-cream/45">Sample</span>}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.5rem,calc(2.6vw*var(--site-type-scale)),2.25rem)] leading-tight">
                    {shown.name}
                  </h3>
                </>
              )}
            </div>

            <div
              ref={stageRef}
              aria-hidden="true"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipe.current = null)}
              className="relative -mx-6 mt-3 h-[45vw] touch-pan-y select-none [perspective-origin:50%_50%] md:mt-5 md:h-[30vw] lg:-mx-12"
            >
              <div ref={ringRef} className="absolute inset-0 [transform-style:preserve-3d]">
                {ringCards}
              </div>
            </div>

            <div className="mt-4 flex items-start justify-between gap-6 md:mt-6">
              <div
                className="blur-swap min-h-[3rem] max-w-md md:min-h-[3.5rem]"
                data-swap={current.out ? "out" : "in"}
              >
                {shown && (
                  <>
                    {shown.price && (
                      <p className="font-body text-base font-medium text-cream tabular-nums">
                        {formatPrice(shown.price)}
                      </p>
                    )}
                    {shown.desc && (
                      <p className="mt-1 font-body text-base leading-relaxed text-cream/80">
                        {shown.desc}
                      </p>
                    )}
                  </>
                )}
              </div>
              {count > 1 && (
                <div className="flex shrink-0 items-center gap-3 font-body text-sm text-cream/70 tabular-nums">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous special"
                    className="grid size-9 place-items-center rounded-full border border-cream/30 transition hover:bg-cream/10 disabled:opacity-30"
                  >
                    <i aria-hidden="true" className="ph ph-arrow-left" />
                  </button>
                  <span>
                    {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next special"
                    className="grid size-9 place-items-center rounded-full border border-cream/30 transition hover:bg-cream/10 disabled:opacity-30"
                  >
                    <i aria-hidden="true" className="ph ph-arrow-right" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
              <ReserveLink
                restaurant="mezzo"
                className="btn-lift btn-fill bg-cream text-ink [--button-fill-color:var(--color-paper)]"
              >
                Reserve
              </ReserveLink>
              <span className="contents md:hidden">
                <ELink
                  k="specials.menuLink"
                  label="View the Menu"
                  href={FLOORS.mezzo.menuHref}
                  className="btn-lift btn-fill btn-fill-cream border border-cream/50 text-cream"
                />
              </span>
            </div>

            <ul className="sr-only" aria-label="Mezzo specials by day">
              {cards.map((card) => (
                <li key={card.key}>
                  {WEEKDAYS_LONG[card.day]}: {card.name}
                  {card.price && `, ${formatPrice(card.price)}`}
                  {card.desc && `. ${card.desc}`}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/** Holds the shown index while the old text blurs out, then swaps it in. */
function useBlurSwap(target: number) {
  const [index, setIndex] = useState(target)
  const [out, setOut] = useState(false)

  useEffect(() => {
    if (target === index) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(target)
      return
    }
    setOut(true)
    const timer = window.setTimeout(() => {
      setIndex(target)
      setOut(false)
    }, SWAP_MS)
    return () => window.clearTimeout(timer)
  }, [target, index])

  return { index, out }
}
