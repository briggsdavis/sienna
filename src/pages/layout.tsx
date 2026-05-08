import { useEffect, useRef } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[100] h-[2px] w-full origin-left bg-sienna/60"
      style={{ transform: "scaleX(0)" }}
    />
  )
}

function SmoothScroll() {
  useEffect(() => {
    // Skip touch/pointer-coarse devices (mobile, tablets)
    if (window.matchMedia("(pointer: coarse)").matches) return

    let target = window.scrollY
    let current = window.scrollY
    let rafId: number
    let active = false

    const onWheel = (e: WheelEvent) => {
      // Only intercept large deltaY (mouse wheel clicks), let small events (trackpad) pass
      if (e.deltaMode === 0 && Math.abs(e.deltaY) < 40) return

      e.preventDefault()
      target = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          target + e.deltaY,
        ),
      )
      if (!active) {
        active = true
        const step = () => {
          const diff = target - current
          if (Math.abs(diff) < 0.5) {
            current = target
            window.scrollTo(0, current)
            active = false
            return
          }
          current += diff * 0.14
          window.scrollTo(0, current)
          rafId = requestAnimationFrame(step)
        }
        rafId = requestAnimationFrame(step)
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", onWheel)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return null
}

export function Layout() {
  const { pathname } = useLocation()

  return (
    <div id="top" className="relative bg-paper text-ink">
      <ScrollProgress />
      <SmoothScroll />
      <Nav />
      <main key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
