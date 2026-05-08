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

export function Layout() {
  const { pathname } = useLocation()
  return (
    <div id="top" className="relative bg-paper text-ink">
      <ScrollProgress />
      <Nav />
      <main key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
