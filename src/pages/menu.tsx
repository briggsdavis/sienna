import { useQuery } from "convex/react"
import { Link, useParams } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { PageHero } from "@/components/hero"
import { MENU_THEMES, MenuSections, SectionChips } from "@/components/menu-view"
import { ReserveLink, useReservation, useSettings } from "@/components/reserve"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, type FloorId } from "@/lib/site"
import { NotFound } from "@/pages/not-found"
import { api } from "../../convex/_generated/api"

const JSON_LD = Object.fromEntries(
  (Object.keys(FLOORS) as FloorId[]).map((id) => [
    id,
    restaurantJsonLd({
      name: `${FLOORS[id].name} at Sienna Mercato`,
      path: FLOORS[id].href,
      menuPath: FLOORS[id].menuHref,
      reservations: id === "mezzo",
    }),
  ]),
) as Record<FloorId, object>

function isFloor(value: string | undefined): value is FloorId {
  return value === "emporio" || value === "mezzo" || value === "tetto"
}

export function MenuPage() {
  const { restaurant } = useParams()
  if (!isFloor(restaurant)) return <NotFound />
  return <Menu key={restaurant} restaurant={restaurant} />
}

function Menu({ restaurant }: { restaurant: FloorId }) {
  const sections = useQuery(api.menus.get, { menu: restaurant })
  const floor = FLOORS[restaurant]
  const t = MENU_THEMES[restaurant]
  const mezzo = restaurant === "mezzo"
  const settings = useSettings()
  const reservation = useReservation(restaurant)
  const showReserve = reservation?.mode !== "walkin"
  const pickupUrl = mezzo ? undefined : settings?.orderUrl

  return (
    <div className={`min-h-screen ${t.page}`}>
      <Seo path={floor.menuHref} {...PAGE_SEO[floor.menuHref]} jsonLd={JSON_LD[restaurant]} />
      {mezzo ? (
        <MezzoMenuHero />
      ) : (
        <header
          className={`relative isolate overflow-hidden px-6 pt-32 pb-16 text-center sm:pt-36 ${t.header}`}
        >
          <div className="grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="relative flex min-h-36 items-center justify-center sm:min-h-48">
              <img
                src={floor.logo}
                alt=""
                className="pointer-events-none absolute inset-0 mx-auto h-full w-4/5 max-w-xl object-contain opacity-[0.12] brightness-0 invert"
              />
              <h1 className="relative font-display text-[clamp(3rem,calc(8vw*var(--site-type-scale)),6.5rem)] leading-[0.88] text-balance">
                {floor.name} Menu
              </h1>
            </div>
            {(showReserve || pickupUrl) && (
              <div className="mt-6 flex flex-col items-center gap-3">
                {showReserve && (
                  <ReserveLink
                    restaurant={restaurant}
                    className="btn-lift bg-cream text-ink hover:bg-paper"
                  >
                    <i className="ph ph-calendar-dots text-sm" />
                    Reserve
                  </ReserveLink>
                )}
                {pickupUrl && (
                  <ExternalLink
                    href={pickupUrl}
                    className="btn-lift border border-cream/50 hover:bg-cream/10"
                  >
                    <i className="ph ph-bag text-sm" />
                    Order pickup
                  </ExternalLink>
                )}
              </div>
            )}
          </div>
        </header>
      )}

      {sections && sections.length > 0 && (
        <nav
          className={`${
            mezzo
              ? "bg-sienna-deep"
              : `sticky top-[68px] z-30 backdrop-blur-md ${restaurant === "tetto" ? "bg-cream/90" : "bg-paper/90"}`
          }`}
          aria-label="Menu sections"
        >
          <div className="mx-auto max-w-[1400px] overflow-x-auto px-6 py-4 lg:px-12">
            <SectionChips restaurant={restaurant} sections={sections} />
          </div>
        </nav>
      )}

      <div className={mezzo ? undefined : "mx-auto max-w-[1400px] px-6 py-20 lg:px-12"}>
        {sections === undefined ? (
          <div className="h-[60vh]" />
        ) : sections.length === 0 ? (
          <p className={`py-20 text-center font-body text-xl ${t.muted}`}>
            The menu is being updated. Check back soon.
          </p>
        ) : (
          <MenuSections restaurant={restaurant} sections={sections} />
        )}
        <p
          className={`font-body text-sm ${t.muted} ${mezzo ? "mx-auto max-w-[1400px] px-6 py-10 lg:px-12" : "mt-20"}`}
        >
          Menu and prices change with the season. Please let your server know about any allergies.
        </p>
      </div>
    </div>
  )
}

function MezzoMenuHero() {
  return (
    <PageHero
      image={{
        src: "/mezzo/pasta-special.webp",
        alt: "",
        className: "object-[center_58%]",
      }}
      overlay={
        <div className="absolute inset-0 bg-linear-to-t from-sienna-deep/90 via-sienna/50 to-ink/25" />
      }
      viewportHeight={60}
      bottomPadding="pb-8"
    >
      <div className="my-auto flex flex-col items-center gap-4 text-center text-cream">
        <img
          src={FLOORS.mezzo.logo}
          alt=""
          className="h-[clamp(2.75rem,7svh,4.5rem)] w-auto max-w-[55vw] object-contain brightness-0 invert"
        />
        <h1 className="text-hero-shadow font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-none">
          Mezzo Menu
        </h1>
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          <ReserveLink restaurant="mezzo" className="btn-lift btn-fill bg-cream text-ink">
            Reserve
          </ReserveLink>
          <Link
            to={FLOORS.mezzo.href}
            className="btn-lift btn-fill btn-fill-cream border border-cream/60 text-cream"
          >
            View the Restaurant
          </Link>
        </div>
      </div>
    </PageHero>
  )
}
