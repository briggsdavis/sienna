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
  { label: "Events & Private Dining", to: "/events" },
  { label: "Catering", to: "/catering" },
  { label: "Contact", to: "/contact" },
]

function Heading({ children }: { children: string }) {
  return (
    <div className="font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
      {children}
    </div>
  )
}

export function Footer() {
  const settings = useSettings()
  const track = useTrackClick()

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
            <ExternalLink href={ADDRESS.mapsUrl} className="under hover:text-sienna-bright">
              {ADDRESS.street}
              <br />
              {ADDRESS.city}, {ADDRESS.region} {ADDRESS.zip}
            </ExternalLink>
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
            {settings && (
              <>
                <li>
                  <ExternalLink className="under hover:text-sienna-bright" href={settings.orderUrl}>
                    Order Online
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    className="under hover:text-sienna-bright"
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
          <p className="mt-4 font-body leading-relaxed text-paper">
            Pre-release menus, ball of the month, secret cocktails.
          </p>
          <SignupForm source="footer" />
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
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-6 font-serif text-xs tracking-wider text-paper lg:px-12">
          <span>© {new Date().getFullYear()} Sienna Mercato Restaurant Group</span>
          <span className="flex gap-6">
            <Link to="/privacy" className="under hover:text-sienna-bright">
              Privacy
            </Link>
            <Link to="/admin" className="under text-paper/50 hover:text-sienna-bright">
              Staff
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
