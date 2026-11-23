import type { ReactNode } from "react"
import { Link } from "react-router"
import { useParallax } from "@/hooks/use-parallax"
import type { Floor } from "@/lib/site"

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

export function HeroMeta() {
  return (
    <div className="absolute top-24 right-0 left-0 z-10 mx-auto hidden max-w-[1600px] items-center px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase sm:flex lg:px-12">
      <Link to="/" className="under flex items-center gap-2 hover:text-cream">
        <i className="ph ph-arrow-left text-sm" />
        all of sienna
      </Link>
    </div>
  )
}

export function PageHero({
  image,
  overlay,
  meta,
  numeral,
  bottomPadding = "pb-20",
  children,
}: {
  image: { src: string; alt: string; className?: string }
  overlay: ReactNode
  meta: ReactNode
  numeral?: string
  bottomPadding?: string
  children: ReactNode
}) {
  return (
    <section className="h-hero relative w-full overflow-hidden bg-ink">
      <HeroImage {...image} />
      {overlay}
      {meta}
      <div
        className={`relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 ${bottomPadding} lg:px-12`}
      >
        {children}
      </div>
      {numeral && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className={`mx-auto flex max-w-[1600px] justify-end px-6 ${bottomPadding} lg:px-12`}>
            <span className="hidden font-display text-[22vw] leading-none text-cream/8 select-none lg:block">
              {numeral}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

export function FloorHeroIntro({
  floor,
  subtitle,
  blurb,
}: {
  floor: Floor
  subtitle: ReactNode
  blurb: ReactNode
}) {
  return (
    <>
      <img
        src={floor.logo}
        alt={`${floor.name} logo`}
        className="rise mb-6 h-16 w-auto opacity-80 brightness-0 invert"
        style={{ animationDelay: "0s", objectFit: "contain", objectPosition: "left" }}
      />
      <h1
        className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
        style={{ animationDelay: "0.25s" }}
      >
        {floor.name}
      </h1>
      <p className="rise mt-3 font-body text-lg text-cream/80" style={{ animationDelay: "0.4s" }}>
        {subtitle}
      </p>
      <p
        className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75"
        style={{ animationDelay: "0.55s" }}
      >
        {blurb}
      </p>
    </>
  )
}

export function HeroIntro({ title, blurb }: { title: ReactNode; blurb: ReactNode }) {
  return (
    <>
      <h1
        className="rise text-hero-shadow font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.88] tracking-tight text-cream"
        style={{ animationDelay: "0.25s" }}
      >
        {title}
      </h1>
      <p
        className="rise mt-6 max-w-xl font-body text-base leading-relaxed text-cream/75"
        style={{ animationDelay: "0.45s" }}
      >
        {blurb}
      </p>
    </>
  )
}
