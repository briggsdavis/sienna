import { useEffect, useRef, type ReactNode } from "react"

const BASE_DELAY = 0.12

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${BASE_DELAY + delay}s`
          el.classList.add("fade-in-visible")
        } else {
          el.style.transitionDelay = "0s"
          el.classList.remove("fade-in-visible")
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`fade-in-base ${className}`}>
      {children}
    </div>
  )
}
