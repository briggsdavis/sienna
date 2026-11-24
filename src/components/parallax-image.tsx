import { useEffect, useRef } from "react"

const OVERSCAN = 0.22

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.12,
  loading,
}: {
  src: string
  alt: string
  className?: string
  speed?: number
  loading?: "eager" | "lazy"
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onScroll = () => {
      if (motion.matches) {
        el.style.transform = ""
        return
      }
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed
      const limit = rect.height * OVERSCAN
      el.style.transform = `translateY(${Math.max(-limit, Math.min(limit, offset))}px)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    motion.addEventListener("change", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      motion.removeEventListener("change", onScroll)
    }
  }, [speed])

  return (
    <div ref={ref} className="absolute" style={{ inset: `${-OVERSCAN * 100}% 0` }}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`h-full w-full object-cover ${className}`}
      />
    </div>
  )
}
