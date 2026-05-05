import { ArrowRight } from "@phosphor-icons/react"
import { useEffect } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import Footer from "./footer"
import Marquee from "./marquee"

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Marquee />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-olive/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between gap-8 px-6 lg:px-10">
        <NavLink to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-h2 leading-none text-olive italic">
            Sienna
          </span>
          <span className="font-display text-h2 leading-none text-rosso italic transition-colors group-hover:text-rosso-deep">
            Mercato
          </span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex">
          {[
            ["/menu", "Menu"],
            ["/story", "Story"],
            ["/visit", "Visit"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-base font-medium tracking-wide transition-colors ${
                  isActive ? "text-rosso" : "text-olive hover:text-rosso"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/reserve"
          className="inline-flex items-center gap-2 rounded-full bg-rosso px-5 py-2.5 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-rosso-deep"
        >
          Reserve
          <ArrowRight weight="bold" size={16} />
        </NavLink>
      </div>
    </header>
  )
}
