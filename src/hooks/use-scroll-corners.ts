import { useEffect, useRef, type RefObject } from "react"

/**
 * Rounds `[data-scroll-corners]` elements inside the returned region while they sit below
 * the middle of the screen. Also sets `--scroll-progress` (1 entering, 0 at the middle) so
 * CSS can scale them in step, e.g. `scale: calc(1 - 0.2 * var(--scroll-progress, 0))`.
 * Pass `existing` to use a ref the component already has.
 */
export function useScrollCorners<T extends HTMLElement>(
  items: readonly unknown[] | undefined,
  existing?: RefObject<T | null>,
) {
  const own = useRef<T>(null)
  const region = existing ?? own

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
        photo.style.setProperty("--scroll-progress", progress.toFixed(4))
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
  }, [items, region])

  return region
}
