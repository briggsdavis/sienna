import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import { useSmoothScroll } from "@/components/animations"

export function Layout() {
  const { pathname } = useLocation()
  useSmoothScroll()
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
