import { Outlet, ScrollRestoration } from "react-router"
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"

export function Layout() {
  return (
    <div id="top" className="relative bg-paper text-ink">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
