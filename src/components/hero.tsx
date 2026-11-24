import type { ReactNode } from "react"
import { useParallax } from "@/hooks/use-parallax"
import type { Floor } from "@/lib/site"

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
      <img src={src} alt={alt} className={`slow-zoom h-full w-full object-cover ${className}`} />
    </div>
  )
}

export function PageHero({
  image,
  overlay,
  numeral,
  viewportHeight,
  bottomPadding = viewportHeight ? "pb-10" : "pb-20",
  children,
}: {
  image: { src: string; alt: string; className?: string }
  overlay: ReactNode
  numeral?: string
  viewportHeight?: keyof typeof HERO_HEIGHTS
  bottomPadding?: string
  children: ReactNode
}) {
  const minHeight = viewportHeight ? HERO_HEIGHTS[viewportHeight] : undefined
  return (
    <section className={`relative w-full overflow-hidden bg-ink ${minHeight ?? "h-hero"}`}>
      <HeroImage {...image} />
      {overlay}
      <div
        className={`relative z-10 mx-auto flex max-w-[1600px] flex-col justify-end px-6 lg:px-12 ${
          minHeight ? `${minHeight} pt-28` : "h-full"
        } ${bottomPadding}`}
      >
        {children}
      </div>
      {numeral && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className={`mx-auto flex max-w-[1600px] justify-end px-6 ${bottomPadding} lg:px-12`}>
            <span className="hidden font-display text-[calc(22vw*var(--site-type-scale))] leading-none text-cream/8 select-none lg:block">
              {numeral}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

export function FloorHeroIntro({ floor, blurb }: { floor: Floor; blurb: ReactNode }) {
  return (
    <>
      <img
        src={floor.logo}
        alt={`${floor.name} logo`}
        className="rise mb-6 h-16 w-auto opacity-80 brightness-0 invert"
        style={{ animationDelay: "0s", objectFit: "contain", objectPosition: "left" }}
      />
      <h1
        className="rise text-hero-shadow font-display text-[clamp(2.5rem,calc(7vw*var(--site-type-scale)),6rem)] leading-[0.88] tracking-tight text-cream"
        style={{ animationDelay: "0.25s" }}
      >
        {floor.name}
      </h1>
      <p
        className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75"
        style={{ animationDelay: "0.55s" }}
      >
        {blurb}
      </p>
    </>
  )
}

export function HeroIntro({ title, blurb }: { title: ReactNode; blurb?: ReactNode }) {
  return (
    <>
      <h1
        className="rise text-hero-shadow font-display text-[clamp(2.5rem,calc(7vw*var(--site-type-scale)),6rem)] leading-[0.88] tracking-tight text-cream"
        style={{ animationDelay: "0.25s" }}
      >
        {title}
      </h1>
      {blurb && (
        <p
          className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75"
          style={{ animationDelay: "0.45s" }}
        >
          {blurb}
        </p>
      )}
    </>
  )
}
