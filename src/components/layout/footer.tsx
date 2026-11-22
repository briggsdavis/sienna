import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { FLOORS, ORDER_URL, PHONE, SOCIAL_LINKS } from "@/lib/site"

const EXPLORE_LINKS = [
  { label: "Emporio · I", to: FLOORS.emporio.href },
  { label: "Mezzo · II", to: FLOORS.mezzo.href },
  { label: "Il Tetto · III", to: FLOORS.tetto.href },
  { label: "Private Events", to: "/events" },
  { label: "Catering", to: "/catering" },
]

const EXTERNAL_LINKS = [
  { label: "Order Online", href: ORDER_URL },
  { label: "Gift Cards", href: ORDER_URL },
]

function Heading({ children }: { children: string }) {
  return (
    <div className="font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-28 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-12">
        <div>
          <img
            src="/siennalogo.png"
            alt="Sienna Mercato"
            className="mb-4 h-10 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-sm font-body leading-relaxed text-paper">
            Three floors. Three rooms. One Italian house in the Cultural District, open since 2013.
          </p>
          <div className="mt-8 flex gap-4 text-paper">
            {SOCIAL_LINKS.map((social) => (
              <ExternalLink
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="transition-colors hover:text-sienna-bright"
              >
                <i className={`ph ${social.icon} text-2xl`} />
              </ExternalLink>
            ))}
          </div>
        </div>

        <div>
          <Heading>Address</Heading>
          <address className="mt-4 font-serif leading-relaxed text-paper not-italic">
            942 Penn Avenue
            <br />
            Pittsburgh, PA 15222
            <br />
            <a href={PHONE.href} className="under hover:text-sienna-bright">
              {PHONE.label}
            </a>
          </address>
        </div>

        <div>
          <Heading>Explore</Heading>
          <ul className="mt-4 space-y-2 font-serif text-paper">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.label}>
                <Link className="under hover:text-sienna-bright" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
            {EXTERNAL_LINKS.map((link) => (
              <li key={link.label}>
                <ExternalLink className="under hover:text-sienna-bright" href={link.href}>
                  {link.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading>Newsletter</Heading>
          <p className="mt-4 font-body leading-relaxed text-paper">
            Pre-release menus, ball of the month, secret cocktails.
          </p>
          <form className="mt-5 flex border-b border-paper/30 transition-colors focus-within:border-sienna-bright">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-3 font-body text-paper placeholder:text-paper/50 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 text-sienna-bright transition-colors hover:text-cream"
              aria-label="Subscribe"
            >
              <i className="ph ph-arrow-right text-2xl" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-paper/15 px-6 py-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-12">
          {Object.values(FLOORS).map((floor) => (
            <Link key={floor.href} to={floor.href} aria-label={floor.name}>
              <img
                src={floor.logo}
                alt={floor.name}
                className="h-6 w-auto opacity-40 brightness-0 invert transition-opacity hover:opacity-80"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 py-6 font-serif text-xs tracking-wider text-paper sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>© 2026 Sienna Mercato Restaurant Group · Pittsburgh, PA</span>
          <span className="flex items-center gap-2">
            <i className="ph ph-heart-straight-fill text-sm text-sienna-bright" />
            Made with love in Pennsylvania
          </span>
        </div>
      </div>
    </footer>
  )
}
