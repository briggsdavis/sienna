import { useEffect, useRef, type ReactNode } from "react"

export function useParallax(speed = 0.18) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * speed}px)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return ref
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const BASE = 0.12
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${BASE + delay}s`
          el.classList.add("fade-in-visible")
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -120px 0px" },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`fade-in-base ${className}`}>
      {children}
    </div>
  )
}
