import { useEffect, useRef, type ReactNode } from "react"

const BASE_DELAY = 0.12

export function FadeIn({
  children,
  delay = 0,
  className = "",
  stagger = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  stagger?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.classList.add("fade-in-visible")
      return
    }
    el.style.setProperty("--fade-in-delay", `${BASE_DELAY + delay}s`)
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("fade-in-visible", entry.isIntersecting)
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`${stagger ? "fade-in-stagger" : "fade-in-base"} ${className}`}>
      {children}
    </div>
  )
}
