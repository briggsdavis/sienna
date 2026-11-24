import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { AnnouncementBar } from "@/components/marketing"
import { reserveSummary, useSettings } from "@/components/reserve"
import { useTrackClick } from "@/lib/analytics"
import { useCart } from "@/lib/cart"
import { FLOORS, PHONE, type FloorId } from "@/lib/site"

const FLOOR_IDS: FloorId[] = ["tetto", "mezzo", "emporio"]
const RESTAURANT_IDS: FloorId[] = ["emporio", "mezzo", "tetto"]

const LINKS = [
  { to: "/events", label: "Events" },
  { to: "/catering", label: "Catering" },
  { to: "/contact", label: "Contact" },
]
const MENU_LINK_TYPE = "font-display text-[2.35rem] leading-none"

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
  children,
}: {
  label: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  className: string
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
        <span aria-hidden="true" className="hidden text-2xs sm:inline-flex">
          <i className={`ph ph-caret-${open ? "up" : "down"}`} />
        </span>
      </button>
      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-72 border border-ink/10 bg-paper text-ink shadow-2xl">
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

function RestaurantLinks({ onPick }: { onPick: () => void }) {
  return (
    <ul className="grid w-fit max-w-full grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-5 px-3 py-3 sm:gap-x-8 sm:px-6">
      {RESTAURANT_IDS.map((id) => {
        const floor = FLOORS[id]
        return (
          <li key={id} className="col-span-2 grid grid-cols-subgrid items-baseline">
            <NavLink
              to={floor.href}
              end
              onClick={onPick}
              className={`${MENU_LINK_TYPE} justify-self-end text-right text-ink hover:text-sienna aria-[current=page]:text-sienna`}
            >
              {floor.name}
            </NavLink>
            <NavLink
              to={floor.menuHref}
              end
              onClick={onPick}
              className="justify-self-start font-serif text-[1.1rem] leading-tight text-ink-soft hover:text-sienna aria-[current=page]:text-sienna"
            >
              {floor.name} Menu
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

export function Nav() {
  const { scrolled, hidden } = useHideOnScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const menuTrigger = useRef<HTMLButtonElement>(null)
  const menuClose = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const { count, setOpen: setCartOpen } = useCart()
  const settings = useSettings()
  const currentPath = pathname.toLowerCase().replace(/\/$/, "")
  const menuFloor = RESTAURANT_IDS.find((id) => FLOORS[id].menuHref === currentPath)

  useEffect(() => {
    setMenuOpen(false)
    setReserveOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setMenuOpen(false)
      menuTrigger.current?.focus()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    menuClose.current?.focus()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const transparent = !scrolled && !reserveOpen
  const tone = transparent ? "text-cream hover:text-sienna-bright" : "text-ink hover:text-sienna"
  const mezzoPage = currentPath === FLOORS.mezzo.href || menuFloor === "mezzo"
  const reserveHover = mezzoPage
    ? `btn-fill ${transparent ? "btn-fill-cream" : "[--button-fill-color:var(--color-sienna-deep)]"}`
    : "hover:bg-sienna-bright"
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
          <div className="relative site-container flex items-center justify-between gap-6 py-4">
            <button
              ref={menuTrigger}
              type="button"
              onClick={() => {
                setReserveOpen(false)
                setMenuOpen((open) => !open)
              }}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              className={`z-10 grid h-9 w-9 shrink-0 cursor-pointer place-content-center gap-1 transition-colors hover:bg-transparent ${tone}`}
            >
              <span aria-hidden="true" className="h-px w-5 bg-current" />
              <span aria-hidden="true" className="h-px w-5 bg-current" />
              <span aria-hidden="true" className="h-px w-5 bg-current" />
            </button>

            <div className="absolute left-1/2 max-w-[22%] -translate-x-1/2 min-[400px]:max-w-[36%]">
              {menuFloor ? (
                <span
                  className={`block text-center font-display text-sm leading-none sm:text-lg ${transparent ? "text-cream" : "text-ink"}`}
                >
                  {FLOORS[menuFloor].name} Menu
                </span>
              ) : (
                <Link to="/" className="flex items-center">
                  <img
                    src="/siennalogo.png"
                    alt="Sienna Mercato"
                    className={`h-9 w-auto object-contain transition-all duration-500 ${
                      transparent ? "brightness-0 invert" : "brightness-0"
                    }`}
                  />
                </Link>
              )}
            </div>

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
                setOpen={setReserveOpen}
                className={`btn-lift nav-reserve bg-sienna text-cream [--button-letter-spacing:0.12em] ${reserveHover} ${
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
        id="site-navigation"
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-paper transition-all duration-500 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 lg:px-12">
          <button
            ref={menuClose}
            type="button"
            onClick={() => {
              closeMenu()
              menuTrigger.current?.focus()
            }}
            aria-label="Close navigation"
            className="relative grid h-9 w-9 cursor-pointer place-items-center text-ink transition-colors hover:bg-transparent hover:text-sienna"
          >
            <span aria-hidden="true" className="absolute h-px w-5 rotate-45 bg-current" />
            <span aria-hidden="true" className="absolute h-px w-5 -rotate-45 bg-current" />
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
          aria-label="Site navigation"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-8"
        >
          <RestaurantLinks onPick={closeMenu} />
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `${MENU_LINK_TYPE} px-8 py-2 text-center transition-colors ${
                  isActive ? "text-sienna" : "text-ink hover:text-sienna"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {settings && (
              <ExternalLink
                href={settings.orderUrl}
                onClick={closeMenu}
                className="btn-lift bg-sienna text-cream [--button-text-size:1.1rem] hover:bg-sienna-bright"
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
                className="btn-lift border border-ink/30 text-ink [--button-text-size:1.1rem] hover:bg-ink/5"
              >
                <i className="ph ph-shopping-bag text-base" />
                Cart ({count})
              </button>
            )}
          </div>

          <a
            href={PHONE.href}
            className="mt-8 flex items-center gap-2 font-serif text-[1.1rem] tracking-wider text-ink-soft transition-colors hover:text-sienna"
          >
            <i className="ph ph-phone text-base" />
            {PHONE.label}
          </a>
        </nav>
      </div>
    </>
  )
}
