import { useEffect, useRef, type ReactNode } from "react"

export function useSmoothScroll(lerp = 0.1) {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    let target = window.scrollY
    let current = window.scrollY
    let rafId: number
    let isWheeling = false
    let wheelTimeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const dist = target - current
      if (Math.abs(dist) > 0.5) {
        current += dist * lerp
        window.scrollTo(0, current)
      } else {
        current = target
      }
      rafId = requestAnimationFrame(tick)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      isWheeling = true
      clearTimeout(wheelTimeout)
      const multiplier =
        e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1
      target = Math.max(
        0,
        Math.min(
          target + e.deltaY * multiplier,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      )
      wheelTimeout = setTimeout(() => {
        isWheeling = false
      }, 200)
    }

    const onScroll = () => {
      if (!isWheeling) {
        target = window.scrollY
        current = window.scrollY
      }
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(wheelTimeout)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
    }
  }, [lerp])
}

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
