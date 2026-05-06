import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"

const LINKS = [
  { to: "/emporio", label: "Emporio" },
  { to: "/mezzo", label: "Mezzo" },
  { to: "/tetto", label: "Il Tetto" },
  { to: "/events", label: "Events & Catering" },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const transparent = onHome && !scrolled

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "border-b border-ink/10 bg-paper/92 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
        <Link
          to="/"
          className={`flex items-baseline gap-2 ${
            transparent ? "text-cream" : "text-ink"
          }`}
        >
          <span className="font-display text-2xl leading-none tracking-[0.18em]">
            SIENNA
          </span>
          <span
            className={`font-italic text-base leading-none italic ${
              transparent ? "text-sienna-bright" : "text-sienna"
            }`}
          >
            mercato
          </span>
        </Link>

        <nav
          className={`hidden items-center gap-7 font-serif text-sm tracking-[0.22em] uppercase md:flex ${
            transparent ? "text-cream/85" : "text-ink-soft"
          }`}
        >
          {LINKS.map((link, i) => (
            <span key={link.to} className="flex items-center gap-7">
              {i > 0 && (
                <span
                  className={transparent ? "text-cream/30" : "text-sienna/40"}
                >
                  ·
                </span>
              )}
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `under transition-colors ${
                    isActive
                      ? transparent
                        ? "text-sienna-bright"
                        : "text-sienna"
                      : transparent
                        ? "hover:text-sienna-bright"
                        : "hover:text-sienna"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="tel:14122812810"
            className={`hidden items-center gap-2 transition-colors lg:inline-flex ${
              transparent
                ? "text-cream/85 hover:text-sienna-bright"
                : "text-ink-soft hover:text-sienna"
            }`}
            aria-label="Call Sienna Mercato"
          >
            <i className="ph ph-phone text-lg" />
            <span className="font-serif text-sm tracking-wider">
              412.281.2810
            </span>
          </a>
          <a
            href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 bg-sienna px-5 py-2.5 font-serif text-sm tracking-[0.2em] text-cream uppercase transition-colors hover:bg-sienna-deep"
          >
            <span>Reserve</span>
            <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  )
}
