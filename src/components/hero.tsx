import type { ReactNode } from "react"
import { WordReveal } from "@/components/word-reveal"
import { useParallax } from "@/hooks/use-parallax"
import { FLOORS, type Floor, type FloorId } from "@/lib/site"

const HERO_HEIGHTS = { 50: "min-h-[50svh]", 60: "min-h-[60svh]" } as const

export function HeroImage({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  const ref = useParallax()
  return (
    <div ref={ref} className="parallax-hero-wrap">
      <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
    </div>
  )
}

export function PageHero({
  image,
  overlay,
  viewportHeight,
  bottomPadding = viewportHeight ? "pb-10" : "pb-20",
  children,
}: {
  image: { src: string; alt: string; className?: string }
  overlay: ReactNode
  viewportHeight?: keyof typeof HERO_HEIGHTS
  bottomPadding?: string
  children: ReactNode
}) {
  const minHeight = viewportHeight ? HERO_HEIGHTS[viewportHeight] : undefined
  return (
    <section
      data-no-reveal
      className={`relative w-full overflow-hidden bg-ink ${minHeight ?? "h-hero"}`}
    >
      <HeroImage {...image} />
      {overlay}
      <div
        className={`relative z-10 mx-auto flex max-w-[1600px] flex-col justify-end px-6 lg:px-12 ${
          minHeight ? `${minHeight} pt-28` : "h-full"
        } ${bottomPadding}`}
      >
        {children}
      </div>
    </section>
  )
}

export function RestaurantHero({
  floor,
  image,
  children,
}: {
  floor: Floor
  image: { src: string; alt: string }
  children: ReactNode
}) {
  return (
    <section
      data-no-reveal
      className="relative isolate grid min-h-svh items-end overflow-hidden bg-ink"
    >
      <HeroImage {...image} />
      {/* A light black fade, half the strength of the old red one, keeps the logo legible. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/20 via-ink/20 to-ink/50" />
      <div className="relative site-container flex flex-col items-center pt-20 pb-[clamp(2.5rem,11.5svh,7.5rem)] text-center text-cream">
        <img
          src={floor.logo}
          alt=""
          className="rise mb-[clamp(1.5rem,5svh,3.6rem)] h-[min(49svh,69vw,32rem)] w-auto max-w-[76vw] object-contain brightness-0 invert"
        />
        <h1
          className="rise font-display text-[clamp(2.4rem,calc(5.4vw*var(--site-type-scale)),5.4rem)] leading-none tracking-[0.02em] uppercase"
          style={{ animationDelay: "0.25s" }}
        >
          {floor.name}
        </h1>
        <div
          className="rise mt-[clamp(1rem,3.5svh,2.5rem)] flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "0.45s" }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

/**
 * White restaurant seals above a hero title. `arch` fans them like a rainbow:
 * the outer seals sit lower and tilt outward, the middle one sits highest.
 */
export function HeroLogos({ floors, arch = false }: { floors: FloorId[]; arch?: boolean }) {
  const middle = (floors.length - 1) / 2
  return (
    <div
      className={`rise flex justify-center ${arch ? "mb-10 items-end gap-4 sm:mb-12 sm:gap-8" : "mb-6 items-center gap-6 sm:gap-10"}`}
      style={{ animationDelay: "0.1s" }}
    >
      {floors.map((id, index) => {
        const step = index - middle
        return (
          <img
            key={id}
            src={FLOORS[id].logo}
            alt={FLOORS[id].name}
            className="h-16 w-auto object-contain brightness-0 invert sm:h-20 lg:h-24"
            style={
              arch
                ? {
                    transform: `translateY(${Math.abs(step) * 1.5}rem) rotate(${step * 22}deg)`,
                  }
                : undefined
            }
          />
        )
      })}
    </div>
  )
}

export function HeroIntro({
  title,
  blurb,
  words = false,
  center = false,
}: {
  title: ReactNode
  blurb?: ReactNode
  /** Reveal a plain-text title word by word instead of rising as one block. */
  words?: boolean
  center?: boolean
}) {
  const wordTitle = words && typeof title === "string"
  return (
    <>
      <h1
        className={`${wordTitle ? "" : "rise"} text-hero-shadow font-display text-[clamp(2.5rem,calc(7vw*var(--site-type-scale)),6rem)] leading-[0.88] tracking-tight text-cream ${center ? "text-center" : ""}`}
        style={wordTitle ? undefined : { animationDelay: "0.25s" }}
      >
        {words && typeof title === "string" ? (
          <WordReveal text={title} delay={0.25} step={0.08} />
        ) : (
          title
        )}
      </h1>
      {blurb && (
        <p
          className={`rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75 ${center ? "mx-auto text-center" : ""}`}
          style={{ animationDelay: "0.45s" }}
        >
          {blurb}
        </p>
      )}
    </>
  )
}
