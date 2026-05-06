import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"

export function Layout() {
  const { pathname } = useLocation()
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
