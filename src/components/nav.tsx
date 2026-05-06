import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"

const LINKS = [
  { to: "/emporio", label: "Emporio", roman: "I" },
  { to: "/mezzo", label: "Mezzo", roman: "II" },
  { to: "/tetto", label: "Il Tetto", roman: "III" },
  { to: "/events", label: "Events & Catering", roman: "" },
] as const

const RESERVE_OPTIONS = [
  {
    label: "Emporio",
    sub: "Ground floor · walk-in only",
    href: "/emporio",
    roman: "I",
    external: false,
  },
  {
    label: "Mezzo",
    sub: "Reserve via OpenTable",
    href: "https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh",
    roman: "II",
    external: true,
  },
  {
    label: "Il Tetto",
    sub: "Rooftop · climb the stairs",
    href: "/tetto",
    roman: "III",
    external: false,
  },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === "/"
  const dropdownRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastScrollY.current
      if (dy > 6 && y > 80) setHidden(true)
      else if (dy < -2) setHidden(false)
      setScrolled(y > 40)
      lastScrollY.current = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setReserveOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    if (!reserveOpen) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setReserveOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [reserveOpen])

  const transparent = onHome && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          transparent
            ? "bg-transparent"
            : "border-b border-ink/10 bg-paper/92 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
          {/* Left: Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className={`z-10 flex items-center gap-2 transition-colors ${
              transparent
                ? "text-cream hover:text-sienna-bright"
                : "text-ink hover:text-sienna"
            }`}
          >
            <i className={`ph ph-${menuOpen ? "x" : "list"} text-2xl`} />
          </button>

          {/* Center: Brand */}
          <Link
            to="/"
            className={`absolute left-1/2 -translate-x-1/2 flex items-baseline gap-2 transition-colors ${
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

          {/* Right: Reserve dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setReserveOpen((o) => !o)}
              className={`btn-lift group inline-flex items-center gap-2 bg-sienna px-5 py-2.5 font-serif text-xs tracking-[0.22em] text-cream uppercase ${
                reserveOpen ? "bg-sienna-deep" : ""
              }`}
            >
              <span>Reserve</span>
              <i
                className={`ph ph-caret-${reserveOpen ? "up" : "down"} text-xs transition-transform duration-200`}
              />
            </button>

            {reserveOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-72 border border-ink/10 bg-paper shadow-2xl">
                {RESERVE_OPTIONS.map((opt) =>
                  opt.external ? (
                    <a
                      key={opt.label}
                      href={opt.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setReserveOpen(false)}
                      className="group flex items-center gap-4 border-b border-ink/8 px-5 py-4 transition-colors last:border-b-0 hover:bg-cream"
                    >
                      <span className="w-8 font-display text-2xl text-ink/25">
                        {opt.roman}
                      </span>
                      <div className="flex-1">
                        <div className="font-serif text-sm tracking-wide text-ink transition-colors group-hover:text-sienna">
                          {opt.label}
                        </div>
                        <div className="font-italic text-2xs text-ink-soft italic">
                          {opt.sub}
                        </div>
                      </div>
                      <i className="ph ph-arrow-up-right text-sm text-sienna opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ) : (
                    <Link
                      key={opt.label}
                      to={opt.href}
                      onClick={() => setReserveOpen(false)}
                      className="group flex items-center gap-4 border-b border-ink/8 px-5 py-4 transition-colors last:border-b-0 hover:bg-cream"
                    >
                      <span className="w-8 font-display text-2xl text-ink/25">
                        {opt.roman}
                      </span>
                      <div className="flex-1">
                        <div className="font-serif text-sm tracking-wide text-ink transition-colors group-hover:text-sienna">
                          {opt.label}
                        </div>
                        <div className="font-italic text-2xs text-ink-soft italic">
                          {opt.sub}
                        </div>
                      </div>
                      <i className="ph ph-arrow-right text-sm text-sienna opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-paper transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* mirror nav header */}
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
            className="text-ink transition-colors hover:text-sienna"
          >
            <i className="ph ph-x text-2xl" />
          </button>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-2 text-ink"
          >
            <span className="font-display text-2xl leading-none tracking-[0.18em]">
              SIENNA
            </span>
            <span className="font-italic text-base leading-none italic text-sienna">
              mercato
            </span>
          </Link>
          <div className="w-6" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `group flex items-baseline gap-5 px-8 py-4 transition-colors ${
                  isActive ? "text-sienna" : "text-ink hover:text-sienna"
                }`
              }
            >
              {link.roman && (
                <span className="font-display text-2xl text-ink/25 transition-colors group-hover:text-sienna/50">
                  {link.roman}
                </span>
              )}
              <span className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none">
                {link.label}
              </span>
            </NavLink>
          ))}

          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="tel:14122812810"
              className="flex items-center gap-2 font-serif text-sm tracking-wider text-ink-soft transition-colors hover:text-sienna"
            >
              <i className="ph ph-phone text-base" />
              412.281.2810
            </a>
            <span className="font-italic text-sm text-ink/40 italic">
              942 Penn Avenue · Pittsburgh
            </span>
          </div>
        </nav>
      </div>
    </>
  )
}
