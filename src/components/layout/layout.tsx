import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import { Footer } from "@/components/layout/footer"
import { Nav } from "@/components/layout/nav"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { useViewportHeight } from "@/hooks/use-viewport-height"

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
