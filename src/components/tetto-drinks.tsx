import { useEffect, useRef, useState, type RefObject } from "react"
import { EText, useEditablePageContent, useEditMode } from "@/components/editable"
import { ROOFTOP_DRINKS, type DrinkShape } from "@/content/tetto"
import type { createDrinkScene } from "@/lib/drink-models"

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

export function RooftopDrinks() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const copy = useEditablePageContent()
  const { editing } = useEditMode()

  const choose = (index: number) => {
    if (!section.current || !stage.current) return
    const top = window.scrollY + section.current.getBoundingClientRect().top
    const distance = section.current.offsetHeight - stage.current.offsetHeight
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
      className="tetto-drinks bg-paper text-ink"
    >
      <div ref={stage} className="tetto-drinks-stage">
        <div className="site-container">
          <h2 id="tetto-drinks-title" className="tetto-drinks-title font-display tracking-tight">
            <EText k="drinks.title" d="On the Roof" />
          </h2>
          <div className="grid items-center gap-4 md:mt-3 md:grid-cols-[1fr_0.95fr] md:gap-12">
            <TettoDrinkModel
              shapes={DRINK_SHAPES}
              pointerArea={stage}
              scrollArea={section}
              onSelection={setActive}
              icon={ROOFTOP_DRINKS[active].icon}
              className="tetto-drinks-visual"
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
                className="tetto-drink-picker mt-5 flex flex-wrap gap-1.5"
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
    </section>
  )
}
