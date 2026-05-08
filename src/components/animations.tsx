import { useEffect, useRef, type ReactNode } from "react"

export function useStaggerObserver<T extends HTMLElement>(_stagger = 0.09) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = Array.from(el.children) as HTMLElement[]
    const observers: IntersectionObserver[] = []

    children.forEach((child) => {
      child.style.opacity = "0"
      child.style.transform = "translateY(20px)"
      child.style.transition =
        "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            child.style.opacity = "1"
            child.style.transform = "translateY(0)"
          } else {
            child.style.opacity = "0"
            child.style.transform = "translateY(20px)"
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -20px 0px" },
      )
      obs.observe(child)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

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
      const offset =
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) * speed
      el.style.transform = `translateY(${offset}px)`
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [speed])

  return (
    <div ref={ref} className="absolute" style={{ inset: "-22% 0" }}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
      />
    </div>
  )
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
        } else {
          el.style.transitionDelay = "0s"
          el.classList.remove("fade-in-visible")
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" },
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

