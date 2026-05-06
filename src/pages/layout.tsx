import { useEffect } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"

function useWeightedScroll() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    let target = window.scrollY
    let curr = target
    let raf = 0
    let wheeling = false
    let tid: ReturnType<typeof setTimeout>

    const tick = () => {
      curr += (target - curr) * 0.1
      window.scrollTo(0, curr)
      if (Math.abs(target - curr) > 0.5) raf = requestAnimationFrame(tick)
      else { curr = target; raf = 0 }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      wheeling = true
      clearTimeout(tid)
      tid = setTimeout(() => { wheeling = false }, 200)
      target = Math.max(0, Math.min(target + e.deltaY, document.body.scrollHeight - innerHeight))
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onScroll = () => { if (!wheeling) { target = window.scrollY; curr = window.scrollY } }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(tid)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])
}

export function Layout() {
  const { pathname } = useLocation()
  useWeightedScroll()
  return (
    <div id="top" className="relative bg-paper text-ink">
      <Nav />
      <main key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
