import { useEffect, useRef } from "react"

export function useScrollScale<T extends HTMLElement>() {
  const region = useRef<T>(null)

  useEffect(() => {
    const photos = region.current?.querySelectorAll<HTMLElement>("[data-scroll-scale]")
    if (!photos?.length) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      if (motion.matches) return
      const viewport = window.innerHeight
      for (const photo of photos) {
        const { top, height } = photo.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, (viewport - top) / ((viewport + height) / 2)))
        photo.style.setProperty("--scroll-image-scale", String(0.8 + 0.2 * progress))
      }
    }

    const schedule = () => {
      if (!motion.matches && !frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", schedule)
    }
  }, [])

  return region
}
