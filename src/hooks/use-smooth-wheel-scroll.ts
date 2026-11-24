import { useEffect } from "react"
import { FLOORS } from "@/lib/site"

const EASING_MS = 115

function usesNativeScroll(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  if (target.closest("input, select, textarea, [contenteditable]:not([contenteditable=false])")) {
    return true
  }
  for (
    let node: Element | null = target;
    node && node !== document.body;
    node = node.parentElement
  ) {
    if (
      node.scrollHeight > node.clientHeight &&
      /^(auto|scroll)$/.test(getComputedStyle(node).overflowY)
    ) {
      return true
    }
  }
  return false
}

export function useSmoothWheelScroll(pathname: string) {
  useEffect(() => {
    const path = pathname.toLowerCase().replace(/\/+$/, "")
    const isMezzo = path === FLOORS.mezzo.href || path === FLOORS.mezzo.menuHref
    const easingMs = isMezzo ? EASING_MS * 1.4 : EASING_MS
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let current = 0
    let target = 0
    let lastPosition = 0
    let lastFrameTime = 0

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const animate = (now: number) => {
      if (
        Math.abs(window.scrollY - lastPosition) > 1 ||
        motion.matches ||
        document.body.style.overflow === "hidden"
      ) {
        stop()
        return
      }
      const elapsed = Math.max(0, now - lastFrameTime)
      lastFrameTime = now
      current += (target - current) * (1 - Math.exp(-elapsed / easingMs))
      const settled = Math.abs(target - current) < 0.5
      window.scrollTo({ top: settled ? target : current, behavior: "instant" })
      lastPosition = window.scrollY
      frame = settled ? 0 : requestAnimationFrame(animate)
    }

    const onWheel = (event: WheelEvent) => {
      const { deltaMode, deltaX, deltaY } = event
      if (!deltaY || Math.abs(deltaX) > Math.abs(deltaY)) return
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        !event.cancelable ||
        event.defaultPrevented ||
        motion.matches ||
        document.body.style.overflow === "hidden" ||
        usesNativeScroll(event.target)
      ) {
        stop()
        return
      }

      const root = document.scrollingElement
      if (!root) return
      const scale =
        deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1
      const position = window.scrollY
      const continuing = frame !== 0 && Math.abs(position - lastPosition) <= 1
      const sameDirection = deltaY * (target - current) > 0
      const base = continuing && sameDirection ? target : position
      const next = Math.max(
        0,
        Math.min(root.scrollHeight - root.clientHeight, base + deltaY * scale),
      )
      if (!frame && next === position) return

      event.preventDefault()
      if (!continuing) {
        current = lastPosition = position
        lastFrameTime = performance.now()
      }
      target = next
      if (!frame) frame = requestAnimationFrame(animate)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      stop()
      window.removeEventListener("wheel", onWheel)
    }
  }, [pathname])
}
