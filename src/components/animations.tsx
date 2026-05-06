import { useEffect, useRef, type ReactNode } from "react"

export function useStaggerObserver<T extends HTMLElement>(
  stagger = 0.07,
  initialDelay = 0.05,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.children) as HTMLElement[]

    children.forEach((child) => {
      child.style.opacity = "0"
      child.style.transform = "translateY(20px)"
      child.style.transition =
        "opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
    })

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(
              () => {
                child.style.opacity = "1"
                child.style.transform = "translateY(0)"
              },
              (initialDelay + i * stagger) * 1000,
            )
          })
          obs.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" },
    )
    obs.observe(el)

    return () => obs.disconnect()
  }, [stagger, initialDelay])

  return ref
}

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
