import { useEffect, useRef } from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { useSettings } from "@/components/reserve"
import { SignupForm } from "@/components/signup-form"
import { useTrackClick } from "@/lib/analytics"
import { ADDRESS, FLOORS, PHONE, SOCIAL_LINKS } from "@/lib/site"

const EXPLORE_LINKS = [
  { label: "Il Tetto", to: FLOORS.tetto.href },
  { label: "Mezzo", to: FLOORS.mezzo.href },
  { label: "Emporio", to: FLOORS.emporio.href },
  { label: "Menus", to: FLOORS.mezzo.menuHref },
  { label: "Home", to: "/" },
  { label: "Events & Private Dining", to: "/events" },
  { label: "Catering", to: "/catering" },
  { label: "Contact", to: "/contact" },
]

function Heading({ children }: { children: string }) {
  return (
    <div className="font-serif text-xs tracking-[0.3em] text-cream/85 uppercase">{children}</div>
  )
}

export function Footer() {
  const settings = useSettings()
  const track = useTrackClick()
  const footer = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = footer.current
    if (!element) return

    const measure = () => {
      // A tall footer releases once its first screen is revealed, so the rest scrolls normally.
      const inset = Math.min(0, window.innerHeight - element.offsetHeight)
      element.style.setProperty("--footer-sticky-bottom", `${inset}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  return (
    <footer
      ref={footer}
      className="relative bg-sienna text-cream motion-safe:sticky motion-safe:bottom-[var(--footer-sticky-bottom,0px)] motion-safe:has-[:focus-visible]:relative motion-safe:has-[:focus-visible]:bottom-auto"
    >
      <div className="site-container flex flex-col items-center gap-5 pt-16 lg:pt-20">
        <img
          src="/images/brand/sienna-mercato-logo.png"
          alt="Sienna Mercato"
          className="h-[2.875rem] w-auto brightness-0 invert"
        />
        <div className="flex flex-wrap justify-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <ExternalLink
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="transition-opacity hover:opacity-75"
            >
              <i className={`ph ${social.icon} text-2xl`} />
            </ExternalLink>
          ))}
        </div>
      </div>

      <div className="site-container grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[0.8fr_0.95fr_1.15fr] lg:gap-12 lg:py-14">
        <div>
          <Heading>Address</Heading>
          <address className="mt-4 font-serif leading-relaxed not-italic">
            <ExternalLink href={ADDRESS.mapsUrl} className="under">
              {ADDRESS.street}
              <br />
              {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
            </ExternalLink>
            <br />
            <a href={PHONE.href} className="under">
              {PHONE.label}
            </a>
          </address>
        </div>

        <div>
          <Heading>Explore</Heading>
          <ul className="mt-4 space-y-2 font-serif">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link className="under" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
            {settings && (
              <>
                <li>
                  <ExternalLink className="under" href={settings.orderUrl}>
                    Order Online
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    className="under"
                    href={settings.giftCardUrl}
                    onClick={() => track("giftCardClick")}
                  >
                    Gift Cards
                  </ExternalLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <Heading>Newsletter</Heading>
          <p className="mt-4 font-body leading-relaxed text-cream/90">
            Pre-release menus, ball of the month, secret cocktails.
          </p>
          <SignupForm source="footer" tone="sienna" />
        </div>
      </div>

      <div className="site-container flex flex-wrap items-center justify-center gap-8 py-6 sm:gap-12">
        {Object.values(FLOORS).map((floor) => (
          <Link key={floor.href} to={floor.href} aria-label={floor.name}>
            <img
              src={floor.logo}
              alt={floor.name}
              className="h-[1.65rem] w-auto opacity-80 brightness-0 invert transition-opacity hover:opacity-100"
            />
          </Link>
        ))}
      </div>

      <div className="site-container grid items-center justify-items-center gap-4 py-6 text-center font-serif text-xs tracking-wider text-cream/90 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <span className="md:justify-self-start md:text-left">
          © {new Date().getFullYear()} Sienna Mercato Restaurant Group
        </span>
        <ExternalLink href="https://socialsatisfaction.agency" className="under">
          Made by Social Satisfaction
        </ExternalLink>
        <span className="flex gap-6 md:justify-self-end">
          <Link to="/privacy" className="under">
            Privacy
          </Link>
          <Link to="/admin" className="under">
            Staff
          </Link>
        </span>
      </div>
    </footer>
  )
}
