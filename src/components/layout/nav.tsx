import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FLOORS, ORDER_URL, PHONE, RESERVE_URL } from "@/lib/site"

const LINKS = [
  { to: FLOORS.emporio.href, label: FLOORS.emporio.name, roman: FLOORS.emporio.roman },
  { to: FLOORS.mezzo.href, label: FLOORS.mezzo.name, roman: FLOORS.mezzo.roman },
  { to: FLOORS.tetto.href, label: FLOORS.tetto.name, roman: FLOORS.tetto.roman },
  { to: "/events", label: "Events", roman: "" },
  { to: "/catering", label: "Catering", roman: "" },
]

const RESERVE_OPTIONS = [
  { floor: FLOORS.emporio, sub: "Ground floor · walk-in only", href: FLOORS.emporio.href },
  { floor: FLOORS.mezzo, sub: "Reserve via OpenTable", href: RESERVE_URL },
  { floor: FLOORS.tetto, sub: "Rooftop · climb the stairs", href: FLOORS.tetto.href },
]

const RESERVE_OPTION_CLASS =
  "group flex items-center gap-4 border-b border-ink/8 px-5 py-4 transition-colors last:border-b-0 hover:bg-cream"

function ReserveOptionContent({
  floor,
  sub,
  external,
}: {
  floor: (typeof RESERVE_OPTIONS)[number]["floor"]
  sub: string
  external: boolean
}) {
  return (
    <>
      <span className="w-8 font-display text-2xl text-ink/25">{floor.roman}</span>
      <div className="flex-1">
        <div className="font-serif text-sm tracking-wide text-ink transition-colors group-hover:text-sienna">
          {floor.name}
        </div>
        <div className="font-italic text-2xs text-ink-soft italic">{sub}</div>
      </div>
      <img
        src={floor.logo}
        alt=""
        aria-hidden="true"
        className="h-5 w-auto opacity-30 brightness-0 transition-opacity group-hover:opacity-50"
      />
      <i
        className={`ph ${external ? "ph-arrow-up-right" : "ph-arrow-right"} text-sm text-sienna opacity-0 transition-opacity group-hover:opacity-100`}
      />
    </>
  )
}

function useHideOnScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
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

  return { scrolled, hidden }
}

export function Nav() {
  const { scrolled, hidden } = useHideOnScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const { pathname } = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const transparent = !scrolled
  const closeMenu = () => setMenuOpen(false)
  const closeReserve = () => setReserveOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          transparent ? "bg-transparent" : "border-b border-ink/10 bg-paper/92 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className={`z-10 flex items-center gap-2 transition-colors ${
              transparent ? "text-cream hover:text-sienna-bright" : "text-ink hover:text-sienna"
            }`}
          >
            <i className={`ph ph-${menuOpen ? "x" : "list"} text-2xl`} />
          </button>

          <Link to="/" className="absolute left-1/2 flex -translate-x-1/2 items-center">
            <img
              src="/siennalogo.png"
              alt="Sienna Mercato"
              className={`h-9 w-auto transition-all duration-500 ${
                transparent ? "brightness-0 invert" : "brightness-0"
              }`}
            />
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setReserveOpen((open) => !open)}
              className={`btn-lift group inline-flex items-center gap-1.5 bg-sienna px-3 py-2 font-serif text-xs tracking-[0.22em] text-cream uppercase sm:gap-2 sm:px-5 sm:py-2.5 ${
                reserveOpen ? "bg-sienna-deep" : ""
              }`}
            >
              <span>Reserve</span>
              <i
                className={`ph hidden sm:inline ph-caret-${reserveOpen ? "up" : "down"} text-xs transition-transform duration-200`}
              />
            </button>

            {reserveOpen && (
              <div className="absolute top-full right-0 z-50 mt-1 w-72 border border-ink/10 bg-paper shadow-2xl">
                {RESERVE_OPTIONS.map(({ floor, sub, href }) =>
                  href.startsWith("/") ? (
                    <Link
                      key={floor.name}
                      to={href}
                      onClick={closeReserve}
                      className={RESERVE_OPTION_CLASS}
                    >
                      <ReserveOptionContent floor={floor} sub={sub} external={false} />
                    </Link>
                  ) : (
                    <ExternalLink
                      key={floor.name}
                      href={href}
                      onClick={closeReserve}
                      className={RESERVE_OPTION_CLASS}
                    >
                      <ReserveOptionContent floor={floor} sub={sub} external />
                    </ExternalLink>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-paper transition-all duration-500 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className="text-ink transition-colors hover:text-sienna"
          >
            <i className="ph ph-x text-2xl" />
          </button>
          <Link
            to="/"
            onClick={closeMenu}
            className="absolute left-1/2 flex -translate-x-1/2 items-center"
          >
            <img src="/siennalogo.png" alt="Sienna Mercato" className="h-9 w-auto brightness-0" />
          </Link>
          <div className="w-6" />
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
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

          <div className="mt-8">
            <ExternalLink
              href={ORDER_URL}
              onClick={closeMenu}
              className="btn-lift inline-flex items-center gap-3 bg-sienna px-8 py-3 font-serif text-sm tracking-[0.25em] text-cream uppercase"
            >
              <i className="ph ph-bag text-base" />
              Order Online
              <i className="ph ph-arrow-up-right text-xs" />
            </ExternalLink>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={PHONE.href}
              className="flex items-center gap-2 font-serif text-sm tracking-wider text-ink-soft transition-colors hover:text-sienna"
            >
              <i className="ph ph-phone text-base" />
              {PHONE.label}
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
