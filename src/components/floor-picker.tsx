import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { Link } from "react-router"
import { SPACES } from "@/content/events"
import { BUILDING_DRAWING, FLOOR_SHAPES, VIEW_H, VIEW_W, WASH_EDGE } from "@/lib/building-floors"

type FloorId = (typeof FLOOR_SHAPES)[number]["id"]

const WASH_MS = 750
const ease = (t: number) => t * t * (3 - 2 * t)

/*
 * Events page "Three rooms for private hire": the building drawing from the home page,
 * where each floor is a button. Hovering tints a floor; clicking one washes it red from
 * the bottom up, with its logo, and shows that room's details alongside.
 */
export function FloorPicker() {
  const [selected, setSelected] = useState<FloorId>("emporio")
  const [hovered, setHovered] = useState<FloorId | null>(null)
  const wash = useRef<SVGPathElement>(null)
  const space = SPACES.find((s) => s.id === selected) ?? SPACES[0]
  const floor = FLOOR_SHAPES.find((f) => f.id === selected) ?? FLOOR_SHAPES[0]

  // Raise the red wash through the newly selected floor.
  useEffect(() => {
    const path = wash.current
    if (!path) return
    const start = floor.bottom + 12
    const travel = floor.bottom - floor.top + 24
    const set = (progress: number) =>
      path.setAttribute("transform", `translate(0 ${start - travel * progress})`)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(1)
      return
    }
    let frame = 0
    const began = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - began) / WASH_MS)
      set(ease(t))
      if (t < 1) frame = requestAnimationFrame(step)
    }
    set(0)
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [floor])

  const onKey = (id: FloorId) => (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setSelected(id)
    }
  }

  return (
    <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
      <figure className="mx-auto w-full max-w-[min(100%,calc(78svh*1230/1110))] md:sticky md:top-24">
        <div className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          {/* Fills sit under the line drawing so its strokes hide their edges. */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <clipPath id="picker-wash">
                <path ref={wash} d={WASH_EDGE} />
              </clipPath>
              <filter id="picker-emblem-white">
                <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
              </filter>
            </defs>
            {FLOOR_SHAPES.map((shape) => (
              <path
                key={shape.id}
                d={shape.d}
                fill="var(--color-sienna)"
                opacity={hovered === shape.id && shape.id !== selected ? 0.22 : 0}
                className="transition-opacity duration-300"
              />
            ))}
            <g clipPath="url(#picker-wash)">
              <path d={floor.d} fill="var(--color-sienna)" />
            </g>
          </svg>
          <img
            src={BUILDING_DRAWING}
            alt=""
            className="absolute inset-0 h-full w-full"
            draggable={false}
          />
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 h-full w-full"
            role="group"
            aria-label="Sienna Mercato, floor by floor. Choose a floor to see its private hire details."
          >
            <g clipPath="url(#picker-wash)" className="pointer-events-none">
              <image
                href={space.logo}
                x={floor.emblem.x}
                y={floor.emblem.y}
                width={floor.emblem.size}
                height={floor.emblem.size}
                preserveAspectRatio="xMidYMid meet"
                filter="url(#picker-emblem-white)"
                opacity={0.6}
              />
            </g>
            {/* Invisible hit areas on top, one per floor. */}
            {FLOOR_SHAPES.map((shape) => {
              const name = SPACES.find((s) => s.id === shape.id)?.name ?? shape.id
              return (
                <path
                  key={shape.id}
                  d={shape.d}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={name}
                  aria-pressed={shape.id === selected}
                  className="cursor-pointer outline-none focus-visible:stroke-ink focus-visible:[stroke-width:4]"
                  onClick={() => setSelected(shape.id)}
                  onKeyDown={onKey(shape.id)}
                  onPointerEnter={() => setHovered(shape.id)}
                  onPointerLeave={() => setHovered((h) => (h === shape.id ? null : h))}
                />
              )
            })}
          </svg>
        </div>
        <figcaption className="mt-4 flex items-center justify-center gap-2 font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
          <i className="ph ph-hand-pointing text-base" aria-hidden="true" />
          Click a floor to see its details
        </figcaption>
      </figure>

      <div key={space.id} className="floor-picker-details" aria-live="polite">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="font-serif text-2xs tracking-[0.3em] text-sienna uppercase">
              {space.sub}
            </div>
            <h3 className="mt-2 font-display text-[clamp(2.5rem,calc(4.5vw*var(--site-type-scale)),4.25rem)] leading-[0.9] text-ink">
              {space.name}
            </h3>
          </div>
          <img
            src={space.logo}
            alt=""
            aria-hidden="true"
            className="h-20 w-auto shrink-0 object-contain brightness-0 lg:h-24"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-ink/10 py-4">
          <span className="font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">Up to</span>
          <span className="font-display text-5xl leading-none text-sienna">{space.capacity}</span>
          <span className="font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            guests
          </span>
          <span className="ml-auto font-body text-sm text-ink-soft">{space.vibe}</span>
        </div>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden">
          <img
            src={space.image}
            alt={`${space.name} private event space`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <p className="mt-6 font-body text-base leading-relaxed text-ink-soft">{space.desc}</p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {space.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 font-body text-sm text-ink-soft">
              <i className="ph ph-check mt-0.5 shrink-0 text-sienna" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <div className="font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
            Perfect for
          </div>
          <div className="mt-1.5 font-body text-sm text-ink">{space.perfect.join(" • ")}</div>
        </div>

        <Link
          to={space.href}
          className="btn-lift group mt-8 bg-sienna text-cream hover:bg-sienna-bright"
        >
          View {space.name}
          <i className="ph ph-arrow-right text-xs transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
