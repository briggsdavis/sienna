import { useEffect, useRef, useState, type RefObject } from "react"
import { EImage, EText, useEditablePageContent, useEditMode } from "@/components/editable"
import { ROOFTOP_DRINKS, type DrinkShape } from "@/content/tetto"
import type { createDrinkScene } from "@/lib/drink-models"
import { unsplash } from "@/lib/site"

const DRINK_SHAPES = ROOFTOP_DRINKS.map(({ shape }) => shape)
const LAST_DRINK = DRINK_SHAPES.length - 1

function easeTilt(current: number, target: number) {
  return Math.abs(target - current) < 0.003 ? target : current + (target - current) * 0.16
}

export function TettoDrinkModel({
  shapes,
  pointerArea,
  scrollArea,
  onSelection,
  icon,
  className = "",
}: {
  shapes: readonly DrinkShape[]
  pointerArea: RefObject<HTMLElement | null>
  scrollArea?: RefObject<HTMLElement | null>
  onSelection?: (index: number) => void
  icon: string
  className?: string
}) {
  const visual = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const { editing } = useEditMode()

  useEffect(() => {
    const area = pointerArea.current
    const region = scrollArea?.current
    const container = visual.current
    const surface = canvas.current
    if (!area || !container || !surface) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let model: ReturnType<typeof createDrinkScene>
    let closed = false
    let contextLost = false
    let frame = 0
    let active = -1
    let drawnPosition = -1
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0

    const draw = () => {
      frame = 0
      const travel = region ? Math.max(1, region.offsetHeight - area.offsetHeight) : 1
      const progress = region
        ? Math.min(1, Math.max(0, -region.getBoundingClientRect().top / travel))
        : 0
      const position = progress * (shapes.length - 1)
      const selected = Math.round(position)
      if (selected !== active) {
        active = selected
        onSelection?.(selected)
      }

      const animated = !editing && !motion.matches
      const nextX = animated ? easeTilt(pointerX, targetX) : 0
      const nextY = animated ? easeTilt(pointerY, targetY) : 0
      const pointerChanged = nextX !== pointerX || nextY !== pointerY
      pointerX = nextX
      pointerY = nextY
      if (animated && (nextX !== targetX || nextY !== targetY)) schedule()

      const pose = animated ? position : selected
      if (pose === drawnPosition && !pointerChanged) return
      drawnPosition = pose
      container.style.setProperty("--drink-tilt-x", `${pointerY * 12}deg`)
      container.style.setProperty("--drink-tilt-y", `${pointerX * 18}deg`)
      if (!contextLost) model?.draw(pose, pointerX, pointerY)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || editing || motion.matches) return
      const bounds = area.getBoundingClientRect()
      const display = container.getBoundingClientRect()
      const x = display.left + display.width / 2
      const y = display.top + display.height / 2
      const dx = event.clientX - x
      const dy = event.clientY - y
      targetX = Math.max(
        -1,
        Math.min(1, dx / Math.max(1, dx < 0 ? x - bounds.left : bounds.right - x)),
      )
      targetY = Math.max(
        -1,
        Math.min(1, dy / Math.max(1, dy < 0 ? y - bounds.top : bounds.bottom - y)),
      )
      schedule()
    }

    const resetPointer = () => {
      targetX = targetY = 0
      schedule()
    }

    const resize = () => {
      if (container.clientWidth && container.clientHeight) {
        model?.resize(container.clientWidth, container.clientHeight)
      }
      drawnPosition = -1
      schedule()
    }

    const initialize = async () => {
      try {
        const { createDrinkScene } = await import("@/lib/drink-models")
        if (closed) return
        model = createDrinkScene(surface, shapes)
        if (!model) return
        resize()
        setReady(true)
      } catch {
        setReady(false)
      }
    }

    const onLost = () => {
      contextLost = true
      setReady(false)
    }
    const onRestored = () => {
      contextLost = false
      resize()
      setReady(!!model)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        void initialize()
      },
      { rootMargin: "320px" },
    )
    const size = new ResizeObserver(resize)

    setReady(false)
    observer.observe(container)
    size.observe(container)
    if (region) window.addEventListener("scroll", schedule, { passive: true })
    area.addEventListener("pointermove", movePointer, { passive: true })
    area.addEventListener("pointerleave", resetPointer)
    motion.addEventListener("change", resetPointer)
    surface.addEventListener("webglcontextlost", onLost)
    surface.addEventListener("webglcontextrestored", onRestored)
    draw()

    return () => {
      closed = true
      observer.disconnect()
      size.disconnect()
      window.removeEventListener("scroll", schedule)
      area.removeEventListener("pointermove", movePointer)
      area.removeEventListener("pointerleave", resetPointer)
      motion.removeEventListener("change", resetPointer)
      surface.removeEventListener("webglcontextlost", onLost)
      surface.removeEventListener("webglcontextrestored", onRestored)
      if (frame) cancelAnimationFrame(frame)
      model?.dispose()
    }
  }, [editing, onSelection, pointerArea, scrollArea, shapes])

  return (
    <div
      ref={visual}
      aria-hidden="true"
      data-model-ready={ready}
      className={`tetto-drink-display relative isolate ${className}`}
    >
      <canvas ref={canvas} className="absolute inset-0 size-full" />
      <i className={`tetto-drink-fallback ph-duotone ${icon}`} />
    </div>
  )
}

/** Scroll distance for the skyline to open up and the card to arrive, in svh. */
const ZOOM_SVH = 110
/** Scroll distance spent turning through the drinks, in svh. */
const DRINKS_SVH = 252
const SKYLINE = unsplash("1687707755638-01e3b6f14964", 2400, 80)

/*
 * "On the Roof": a Pittsburgh skyline starts as a rounded window at 70% of the
 * screen and opens to fill it as you scroll. Once it fills, a cream card rises
 * over it with the rooftop drinks, which then turn as you keep scrolling.
 */
export function RooftopDrinks() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [cardShown, setCardShown] = useState(false)
  const copy = useEditablePageContent()
  const { editing } = useEditMode()

  useEffect(() => {
    const el = section.current
    const view = stage.current
    if (!el || !view) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const top = el.getBoundingClientRect().top
      // Opens from when the window is half on screen until 80% of the zoom distance.
      const zoom =
        motion.matches || editing
          ? 1
          : Math.min(1, Math.max(0, (vh * 0.5 - top) / (vh * 0.5 + (ZOOM_SVH / 100) * vh * 0.8)))
      const eased = zoom * zoom * (3 - 2 * zoom)
      view.style.setProperty("--roof-zoom", eased.toFixed(4))
      const card = Math.min(1, Math.max(0, (zoom - 0.86) / 0.14))
      view.style.setProperty("--roof-card", card.toFixed(4))
      setCardShown(card > 0.5)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [editing])

  const choose = (index: number) => {
    if (!track.current || !stage.current) return
    const top = window.scrollY + track.current.getBoundingClientRect().top
    const distance = track.current.offsetHeight - stage.current.offsetHeight
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: top + (distance * index) / LAST_DRINK,
      behavior: editing || reduced ? "instant" : "smooth",
    })
  }

  return (
    <section
      ref={section}
      id="on-the-roof"
      aria-labelledby="tetto-drinks-title"
      className="relative bg-paper text-ink"
      style={{ height: `${100 + ZOOM_SVH + DRINKS_SVH}svh` }}
    >
      {/* The drinks turn while this track scrolls past, after the skyline has opened. */}
      <div
        ref={track}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ top: `${ZOOM_SVH}svh` }}
      />
      <div ref={stage} className="roof-stage sticky top-0 h-svh overflow-hidden">
        <div className="roof-window absolute inset-0 overflow-hidden bg-ink">
          <EImage k="drinks.skyline" d={SKYLINE}>
            {(src) => (
              <img
                src={src}
                alt="The Pittsburgh skyline at night"
                loading="lazy"
                className="roof-skyline h-full w-full object-cover"
              />
            )}
          </EImage>
          <div className="roof-shade absolute inset-0 bg-ink/35" />
        </div>

        <div
          className="roof-card-wrap absolute inset-0 grid place-items-center px-3 py-4 sm:px-6 md:py-8"
          inert={!cardShown}
        >
          <div className="roof-card w-full max-w-6xl bg-cream px-5 py-6 text-ink shadow-[0_30px_80px_rgba(26,18,11,0.35)] sm:px-8 md:px-12 md:py-10">
            <h2
              id="tetto-drinks-title"
              className="text-center font-display text-[clamp(2.4rem,min(6.4vw,9svh),5.5rem)] leading-[0.95] tracking-tight"
            >
              <EText k="drinks.title" d="On the Roof" />
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-center font-body text-base leading-relaxed text-ink-soft md:mt-3 md:text-lg">
              <EText
                k="drinks.body"
                d="Thirty rotating drafts, wine by the glass, cocktails, spritzes and something sparkling, all poured under the open sky."
              />
            </p>
            <div className="mt-3 grid items-center gap-3 md:mt-6 md:grid-cols-[1fr_0.95fr] md:gap-12">
              <TettoDrinkModel
                shapes={DRINK_SHAPES}
                pointerArea={stage}
                scrollArea={track}
                onSelection={setActive}
                icon={ROOFTOP_DRINKS[active].icon}
                className="roof-drink-visual"
              />
              <div>
                <div className="tetto-drink-notes">
                  {ROOFTOP_DRINKS.map((drink, index) => (
                    <article
                      key={drink.shape}
                      className="tetto-drink-note"
                      data-active={index === active}
                      inert={index !== active}
                    >
                      <h3 className="font-display leading-none">
                        <EText k={`drinks.${drink.shape}.name`} d={drink.name} />
                      </h3>
                      <p className="mt-3 font-body text-lg text-ink-soft">
                        <EText k={`drinks.${drink.shape}.note`} d={drink.note} />
                      </p>
                    </article>
                  ))}
                </div>
                <nav
                  aria-label="Choose a rooftop drink"
                  className="tetto-drink-picker mt-4 flex flex-wrap gap-1.5"
                >
                  {ROOFTOP_DRINKS.map((drink, index) => (
                    <button
                      type="button"
                      key={drink.shape}
                      aria-label={`Show ${copy?.[`drinks.${drink.shape}.name`]?.text ?? drink.name}`}
                      aria-current={index === active ? "true" : undefined}
                      onClick={() => choose(index)}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
