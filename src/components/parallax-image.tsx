import { useEffect, useRef } from "react"

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.12,
}: {
  src: string
  alt: string
  className?: string
  speed?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const parent = el.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed
      el.style.transform = `translateY(${offset}px)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return (
    <div ref={ref} className="absolute" style={{ inset: "-22% 0" }}>
      <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />
    </div>
  )
}
