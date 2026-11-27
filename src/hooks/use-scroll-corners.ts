import { useEffect, useRef } from "react"

export function useScrollCorners<T extends HTMLElement>(items: readonly unknown[] | undefined) {
  const region = useRef<T>(null)

  useEffect(() => {
    const photos = region.current?.querySelectorAll<HTMLElement>("[data-scroll-corners]")
    if (!photos?.length) return

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)")
    let frame = 0

    const update = () => {
      if (!motion.matches) return

      const middle = window.innerHeight / 2
      for (const photo of photos) {
        const { top, height } = photo.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (top + height / 2 - middle) / middle))
        // data-scroll-corners-max caps the radius, so a text card never clips its content.
        const max = Number(photo.dataset.scrollCornersMax) || Infinity
        photo.style.setProperty(
          "--scroll-corner-radius",
          `${Math.min(max, (height / 2) * progress)}px`,
        )
      }
    }

    const schedule = () => {
      if (!motion.matches || frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    motion.addEventListener("change", update)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      motion.removeEventListener("change", update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [items])

  return region
}
