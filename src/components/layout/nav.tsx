import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { AnnouncementBar } from "@/components/marketing"
import { reserveSummary, useSettings } from "@/components/reserve"
import { useTrackClick } from "@/lib/analytics"
import { useCart } from "@/lib/cart"
import { FLOORS, PHONE, type FloorId } from "@/lib/site"

const FLOOR_IDS: FloorId[] = ["tetto", "mezzo", "emporio"]

const LINKS = [
  { to: "/", label: "Home", roman: "" },
  { to: FLOORS.tetto.href, label: FLOORS.tetto.name, roman: FLOORS.tetto.roman },
  { to: FLOORS.mezzo.href, label: FLOORS.mezzo.name, roman: FLOORS.mezzo.roman },
  { to: FLOORS.emporio.href, label: FLOORS.emporio.name, roman: FLOORS.emporio.roman },
  { to: "/catering", label: "Catering", roman: "" },
  { to: "/events", label: "Events", roman: "" },
  { to: "/contact", label: "Contact", roman: "" },
]

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

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open, close])
  return ref
}

function Dropdown({
  label,
  open,
  setOpen,
  className,
  align = "right",
  children,
}: {
  label: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  className: string
  align?: "left" | "right"
  children: ReactNode
}) {
  const ref = useDismiss(open, () => setOpen(false))
  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
        className={className}
      >
        {label}
        <i className={`ph ph-caret-${open ? "up" : "down"} text-xs`} />
      </button>
      {open && (
        <div
          className={`absolute top-full z-50 mt-2 w-72 border border-ink/10 bg-paper text-ink shadow-2xl ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

const OPTION_CLASS =
  "group flex items-center gap-4 border-b border-ink/8 px-5 py-4 transition-colors last:border-b-0 hover:bg-cream"

function FloorOption({ id, sub, external }: { id: FloorId; sub: string; external: boolean }) {
  const floor = FLOORS[id]
  return (
    <>
      <span className="w-8 font-display text-2xl text-ink/25">{floor.roman}</span>
      <div className="flex-1">
        <div className="font-serif text-sm tracking-wide text-ink transition-colors group-hover:text-sienna">
          {floor.name}
        </div>
        <div className="font-italic text-2xs text-ink-soft italic">{sub}</div>
      </div>
      <i
        className={`ph ${external ? "ph-arrow-up-right" : "ph-arrow-right"} text-sm text-sienna opacity-0 transition-opacity group-hover:opacity-100`}
      />
    </>
  )
}

function ReserveOptions({ onPick }: { onPick: () => void }) {
  const settings = useSettings()
  const track = useTrackClick()
  return (
    <>
      {FLOOR_IDS.map((id) => {
        const reservation = settings?.reservations[id]
        const sub = reserveSummary(reservation?.mode, reservation?.note)
        if (reservation?.mode === "link" && reservation.url) {
          return (
            <ExternalLink
              key={id}
              href={reservation.url}
              onClick={() => {
                track("reservationClick")
                onPick()
              }}
              className={OPTION_CLASS}
            >
              <FloorOption id={id} sub={sub} external />
            </ExternalLink>
          )
        }
        return (
          <Link
            key={id}
            to={`${FLOORS[id].href}#reserve`}
            onClick={onPick}
            className={OPTION_CLASS}
          >
            <FloorOption id={id} sub={sub} external={false} />
          </Link>
        )
      })}
    </>
  )
}

function MenuOptions({ onPick }: { onPick: () => void }) {
  return (
    <>
      {FLOOR_IDS.map((id) => (
        <Link key={id} to={FLOORS[id].menuHref} onClick={onPick} className={OPTION_CLASS}>
          <FloorOption id={id} sub={`${FLOORS[id].name} menu`} external={false} />
        </Link>
      ))}
      <Link to="/catering" onClick={onPick} className={OPTION_CLASS}>
        <span className="w-8 text-center">
          <i className="ph ph-bag text-xl text-ink/30" />
        </span>
        <div className="flex-1">
          <div className="font-serif text-sm tracking-wide text-ink group-hover:text-sienna">
            Catering
          </div>
          <div className="font-italic text-2xs text-ink-soft italic">
            Half pans, full pans, boards
          </div>
        </div>
      </Link>
    </>
  )
}

export function Nav() {
  const { scrolled, hidden } = useHideOnScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const [menusOpen, setMenusOpen] = useState(false)
  const { pathname } = useLocation()
  const { count, setOpen: setCartOpen } = useCart()
  const settings = useSettings()

  useEffect(() => {
    setMenuOpen(false)
    setReserveOpen(false)
    setMenusOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const transparent = !scrolled && !menusOpen && !reserveOpen
  const tone = transparent ? "text-cream hover:text-sienna-bright" : "text-ink hover:text-sienna"
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <AnnouncementBar />
        <div
          className={`transition-colors duration-500 ${
            transparent ? "bg-transparent" : "border-b border-ink/10 bg-paper/92 backdrop-blur-md"
          }`}
        >
          <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4 lg:px-12">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className={`z-10 flex items-center gap-2 transition-colors xl:hidden ${tone}`}
            >
              <i className={`ph ph-${menuOpen ? "x" : "list"} text-2xl`} />
            </button>

            <Link
              to="/"
              className="absolute left-1/2 flex -translate-x-1/2 items-center xl:static xl:translate-x-0"
            >
              <img
                src="/siennalogo.png"
                alt="Sienna Mercato"
                className={`h-9 w-auto transition-all duration-500 ${
                  transparent ? "brightness-0 invert" : "brightness-0"
                }`}
              />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden flex-1 items-center justify-center gap-1 xl:flex"
            >
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `px-3 py-2 font-serif text-xs tracking-[0.22em] uppercase transition-colors ${
                      isActive
                        ? transparent
                          ? "text-cream underline underline-offset-8"
                          : "text-sienna"
                        : tone
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Dropdown
                label="Menus"
                open={menusOpen}
                setOpen={(open) => {
                  setMenusOpen(open)
                  if (open) setReserveOpen(false)
                }}
                align="left"
                className={`inline-flex items-center gap-1.5 px-3 py-2 font-serif text-xs tracking-[0.22em] uppercase transition-colors ${
                  pathname.startsWith("/menus") ? "text-sienna" : tone
                }`}
              >
                <MenuOptions onPick={() => setMenusOpen(false)} />
              </Dropdown>
            </nav>

            <div className="flex items-center gap-3">
              {count > 0 && (
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  aria-label={`Catering cart, ${count} items`}
                  className={`relative hidden sm:block ${tone}`}
                >
                  <i className="ph ph-shopping-bag text-2xl" />
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sienna-bright px-1 font-serif text-[0.6rem] text-cream">
                    {count}
                  </span>
                </button>
              )}
              <Dropdown
                label={<span>Reserve</span>}
                open={reserveOpen}
                setOpen={(open) => {
                  setReserveOpen(open)
                  if (open) setMenusOpen(false)
                }}
                className={`btn-lift inline-flex items-center gap-1.5 bg-sienna px-3 py-2 font-serif text-xs tracking-[0.22em] text-cream uppercase sm:gap-2 sm:px-5 sm:py-2.5 ${
                  reserveOpen ? "bg-sienna-deep" : ""
                }`}
              >
                <ReserveOptions onPick={() => setReserveOpen(false)} />
              </Dropdown>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper transition-all duration-500 xl:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
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

        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-8"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `group flex items-baseline gap-4 px-8 py-2 transition-colors ${
                  isActive ? "text-sienna" : "text-ink hover:text-sienna"
                }`
              }
            >
              {link.roman && (
                <span className="font-display text-xl text-ink/25 group-hover:text-sienna/50">
                  {link.roman}
                </span>
              )}
              <span className="font-display text-[clamp(2rem,7vw,3.75rem)] leading-none">
                {link.label}
              </span>
            </NavLink>
          ))}

          <div className="mt-6 font-serif text-2xs tracking-[0.4em] text-ink-soft uppercase">
            Menus
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 px-6">
            {FLOOR_IDS.map((id) => (
              <Link
                key={id}
                to={FLOORS[id].menuHref}
                onClick={closeMenu}
                className="rounded-full border border-ink/20 px-4 py-2 font-serif text-xs tracking-[0.2em] text-ink uppercase hover:border-sienna hover:text-sienna"
              >
                {FLOORS[id].name}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {settings && (
              <ExternalLink
                href={settings.orderUrl}
                onClick={closeMenu}
                className="btn-lift inline-flex items-center gap-3 bg-sienna px-7 py-3 font-serif text-sm tracking-[0.25em] text-cream uppercase"
              >
                <i className="ph ph-bag text-base" />
                Order Online
              </ExternalLink>
            )}
            {count > 0 && (
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  setCartOpen(true)
                }}
                className="btn-lift inline-flex items-center gap-3 border border-ink/30 px-7 py-3 font-serif text-sm tracking-[0.25em] text-ink uppercase"
              >
                <i className="ph ph-shopping-bag text-base" />
                Cart ({count})
              </button>
            )}
          </div>

          <a
            href={PHONE.href}
            className="mt-8 flex items-center gap-2 font-serif text-sm tracking-wider text-ink-soft transition-colors hover:text-sienna"
          >
            <i className="ph ph-phone text-base" />
            {PHONE.label}
          </a>
        </nav>
      </div>
    </>
  )
}
