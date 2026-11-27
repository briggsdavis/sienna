import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { EText, useEditablePageContent, useEditMode } from "@/components/editable"
import { SAUCES } from "@/content/emporio"
import type { createSauceBottle } from "@/lib/sauce-bottle"

const HEAT_LEVELS = ["No heat", "Mild", "Medium", "Hot"]
const SAUCE_ICONS = [
  "ph-plant",
  "ph-cooking-pot",
  "ph-martini",
  "ph-pepper",
  "ph-lightning",
  "ph-spiral",
  "ph-cheese",
  "ph-drop",
  "ph-leaf",
  "ph-mushroom",
]
const LAST_SAUCE = SAUCES.length - 1

function easePointer(current: number, target: number) {
  return Math.abs(target - current) < 0.003 ? target : current + (target - current) * 0.16
}

export function EmporioSauces() {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const display = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(0)
  const [modelReady, setModelReady] = useState(false)
  const { editing } = useEditMode()
  const content = useEditablePageContent()
  const names = useMemo(
    () => SAUCES.map((sauce, index) => content?.[`sauces.${index}.name`]?.text ?? sauce.name),
    [content],
  )
  const { label } = SAUCES[active]

  useEffect(() => {
    const region = section.current
    const frame = stage.current
    const visual = display.current
    const surface = canvas.current
    if (!region || !frame || !visual || !surface) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let disposed = false
    let renderFrame = 0
    let activeIndex = -1
    let model: ReturnType<typeof createSauceBottle>
    let contextLost = false
    let lastPosition: number | undefined
    let lastSpinning: boolean | undefined
    let pointerX = 0
    let pointerY = 0
    let targetX = 0
    let targetY = 0

    const draw = () => {
      renderFrame = 0
      const distance = Math.max(1, region.offsetHeight - frame.offsetHeight)
      const position =
        LAST_SAUCE * Math.min(1, Math.max(0, -region.getBoundingClientRect().top / distance))
      const selected = Math.round(position)
      const spinning = !motion.matches && !editing
      const bottlePosition = spinning ? position : selected
      if (selected !== activeIndex) {
        activeIndex = selected
        setActive(selected)
      }

      const nextX = spinning ? easePointer(pointerX, targetX) : 0
      const nextY = spinning ? easePointer(pointerY, targetY) : 0
      const tiltChanged = nextX !== pointerX || nextY !== pointerY
      pointerX = nextX
      pointerY = nextY
      if (spinning && (pointerX !== targetX || pointerY !== targetY)) schedule()

      if (bottlePosition === lastPosition && spinning === lastSpinning && !tiltChanged) return
      lastPosition = bottlePosition
      lastSpinning = spinning
      visual.style.setProperty(
        "--sauce-turn",
        spinning ? `${(position - selected) * 360 - 7.5}deg` : "-7.5deg",
      )
      visual.style.setProperty("--sauce-pointer-x", String(pointerX))
      visual.style.setProperty("--sauce-pointer-y", String(pointerY))
      if (!contextLost) model?.draw(bottlePosition, spinning, pointerX, pointerY)
    }

    const schedule = () => {
      if (!renderFrame) renderFrame = requestAnimationFrame(draw)
    }

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motion.matches || editing) return
      const bounds = frame.getBoundingClientRect()
      const bottle = visual.getBoundingClientRect()
      const centerX = bottle.left + bottle.width / 2
      const centerY = bottle.top + bottle.height / 2
      const x = event.clientX - centerX
      const y = event.clientY - centerY
      const reachX = x < 0 ? centerX - bounds.left : bounds.right - centerX
      const reachY = y < 0 ? centerY - bounds.top : bounds.bottom - centerY
      targetX = Math.min(1, Math.max(-1, x / reachX))
      targetY = Math.min(1, Math.max(-1, y / reachY))
      schedule()
    }

    const resetPointer = () => {
      targetX = 0
      targetY = 0
      schedule()
    }

    const resize = () => {
      const { clientWidth, clientHeight } = visual
      if (clientWidth && clientHeight) model?.resize(clientWidth, clientHeight)
      lastPosition = undefined
      schedule()
    }

    const initialize = async () => {
      try {
        const [{ createSauceBottle }] = await Promise.all([
          import("@/lib/sauce-bottle"),
          document.fonts.load('82px "Octin Vintage"'),
          document.fonts.load("700 18px Akzidenz"),
        ])
        if (disposed) return
        model = createSauceBottle(surface, names)
        if (!model) return
        resize()
        setModelReady(true)
      } catch {
        setModelReady(false)
      }
    }

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        visibility.disconnect()
        void initialize()
      },
      { rootMargin: "320px" },
    )
    const size = new ResizeObserver(resize)
    const onContextLost = () => {
      contextLost = true
      setModelReady(false)
    }
    const onContextRestored = () => {
      contextLost = false
      lastPosition = undefined
      schedule()
      setModelReady(true)
    }

    setModelReady(false)
    visibility.observe(visual)
    size.observe(visual)
    window.addEventListener("scroll", schedule, { passive: true })
    motion.addEventListener("change", resetPointer)
    frame.addEventListener("pointermove", movePointer, { passive: true })
    frame.addEventListener("pointerleave", resetPointer)
    surface.addEventListener("webglcontextlost", onContextLost)
    surface.addEventListener("webglcontextrestored", onContextRestored)
    draw()

    return () => {
      disposed = true
      visibility.disconnect()
      size.disconnect()
      window.removeEventListener("scroll", schedule)
      motion.removeEventListener("change", resetPointer)
      frame.removeEventListener("pointermove", movePointer)
      frame.removeEventListener("pointerleave", resetPointer)
      surface.removeEventListener("webglcontextlost", onContextLost)
      surface.removeEventListener("webglcontextrestored", onContextRestored)
      if (renderFrame) cancelAnimationFrame(renderFrame)
      model?.dispose()
    }
  }, [names, editing])

  const chooseSauce = (index: number) => {
    if (!section.current || !stage.current) return
    const top = window.scrollY + section.current.getBoundingClientRect().top
    const distance = section.current.offsetHeight - stage.current.offsetHeight
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({
      top: top + (distance * index) / LAST_SAUCE,
      behavior: reduceMotion || editing ? "instant" : "smooth",
    })
  }

  return (
    <section
      ref={section}
      id="sauces"
      aria-labelledby="emporio-sauces-title"
      className="emporio-sauces scroll-mt-16 bg-cream text-ink"
      style={{ "--sauce-steps": LAST_SAUCE } as CSSProperties}
    >
      <div ref={stage} className="emporio-sauces-stage">
        <div data-emporio-parallax className="site-container">
          <h2
            id="emporio-sauces-title"
            className="emporio-sauces-title text-center font-display tracking-tight"
          >
            10 sauces
          </h2>
          <p className="mt-3 text-center font-body text-lg text-ink-soft">
            All ten are made in-house.
          </p>
          <div className="emporio-sauces-layout">
            <div
              ref={display}
              aria-hidden="true"
              data-model-ready={modelReady}
              className="emporio-sauces-display"
            >
              <canvas ref={canvas} className="emporio-sauces-canvas" />
              <div
                className="emporio-sauce-fallback"
                style={
                  {
                    "--label-paper": label.paper,
                    "--label-ink": label.ink,
                    "--label-accent": label.accent,
                    "--sauce-fill": label.fill,
                  } as CSSProperties
                }
              >
                <div className="emporio-sauce-fallback-cap" />
                <div className="emporio-sauce-fallback-body">
                  <div className="emporio-sauce-fallback-label">
                    <b>Emporio</b>
                    <i className={`ph ${SAUCE_ICONS[active]}`} />
                    <strong>{names[active]}</strong>
                    <span>House-made sauce</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="emporio-sauces-details">
              <div className="emporio-sauces-notes">
                {SAUCES.map((sauce, index) => (
                  <article
                    key={sauce.name}
                    className="emporio-sauce-note"
                    data-active={index === active}
                    inert={index !== active}
                  >
                    <h3 className="font-display leading-none">
                      <EText k={`sauces.${index}.name`} d={sauce.name} />
                    </h3>
                    <p className="mt-3 font-body text-lg text-ink-soft">
                      <EText k={`sauces.${index}.note`} d={sauce.note} />
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2 font-sans text-sm">
                      <span className="inline-flex gap-0.5" aria-hidden="true">
                        {[1, 2, 3].map((level) => (
                          <i
                            key={level}
                            className={`${level <= sauce.heat ? "ph-fill text-sienna" : "ph text-ink/40"} ph-flame`}
                          />
                        ))}
                      </span>
                      <span className="text-ink-soft">{HEAT_LEVELS[sauce.heat]}</span>
                    </div>
                  </article>
                ))}
              </div>
              <nav
                aria-label="Choose a sauce"
                className="emporio-sauce-picker mt-5 flex flex-wrap gap-1.5 font-sans"
              >
                {SAUCES.map((sauce, index) => (
                  <button
                    type="button"
                    key={sauce.name}
                    aria-label={`Show ${names[index]}`}
                    aria-current={index === active ? "true" : undefined}
                    onClick={() => chooseSauce(index)}
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
