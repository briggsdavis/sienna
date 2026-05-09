import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "react-router"
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
      const progress = total > 0 ? scrolled / total : 0
      bar.style.transform = `scaleX(${progress})`
      bar.style.opacity = scrolled > 0 ? "1" : "0"
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 z-[100] h-[2px] w-full origin-left bg-sienna/60 transition-opacity duration-300"
      style={{ transform: "scaleX(0)", opacity: 0 }}
    />
  )
}

function useViewportHeight() {
  useEffect(() => {
    const set = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`,
      )
    }
    set()
    window.addEventListener("resize", set)
    return () => window.removeEventListener("resize", set)
  }, [])
}

export function Layout() {
  const { pathname } = useLocation()
  useViewportHeight()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div id="top" className="relative bg-paper text-ink">
      <ScrollProgress />
      <Nav />
      <main key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
