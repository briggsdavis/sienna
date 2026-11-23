import { useQuery } from "convex/react"
import { Link, useParams } from "react-router"
import { ExternalLink } from "@/components/external-link"
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
  const settings = useSettings()
  const reservation = useReservation(restaurant)

  return (
    <div className={`min-h-screen ${t.page}`}>
      <Seo path={floor.menuHref} {...PAGE_SEO[floor.menuHref]} jsonLd={JSON_LD[restaurant]} />
      <header className={`relative overflow-hidden pt-36 pb-16 ${t.header}`}>
        <div className="grain pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <Link
            to={floor.href}
            className="under mb-8 inline-flex items-center gap-2 font-serif text-2xs tracking-[0.4em] uppercase opacity-75 hover:opacity-100"
          >
            <i className="ph ph-arrow-left text-sm" />
            {floor.name}
          </Link>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <img
                src={floor.logo}
                alt=""
                aria-hidden="true"
                className="mb-6 h-14 w-auto opacity-80 brightness-0 invert"
              />
              <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.88]">
                The menu.
              </h1>
              <p className="mt-3 font-body text-lg opacity-80">
                {floor.name} • Floor {floor.roman} • {t.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {reservation?.mode !== "walkin" && (
                <ReserveLink
                  restaurant={restaurant}
                  className="btn-lift inline-flex items-center gap-2 bg-cream px-6 py-3 font-serif text-xs tracking-[0.25em] text-ink uppercase hover:bg-paper"
                >
                  <i className="ph ph-calendar-dots text-sm" />
                  Reserve
                </ReserveLink>
              )}
              {restaurant !== "mezzo" && settings && (
                <ExternalLink
                  href={settings.orderUrl}
                  className="btn-lift inline-flex items-center gap-2 border border-cream/50 px-6 py-3 font-serif text-xs tracking-[0.25em] uppercase hover:bg-cream/10"
                >
                  <i className="ph ph-bag text-sm" />
                  Order pickup
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      </header>

      {sections && sections.length > 0 && (
        <nav
          className={`sticky top-[68px] z-30 border-b backdrop-blur-md ${t.rule} ${
            restaurant === "mezzo"
              ? "bg-ink/90"
              : restaurant === "tetto"
                ? "bg-cream/90"
                : "bg-paper/90"
          }`}
          aria-label="Menu sections"
        >
          <div className="mx-auto max-w-[1400px] overflow-x-auto px-6 py-4 lg:px-12">
            <SectionChips restaurant={restaurant} sections={sections} />
          </div>
        </nav>
      )}

      <main className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        {sections === undefined ? (
          <div className="h-[60vh]" />
        ) : sections.length === 0 ? (
          <p className={`py-20 text-center font-body text-xl ${t.muted}`}>
            The menu is being updated. Check back soon.
          </p>
        ) : (
          <MenuSections restaurant={restaurant} sections={sections} />
        )}
        <p className={`mt-20 font-body text-sm ${t.muted}`}>
          Menu and prices change with the season. Please let your server know about any allergies.
        </p>
      </main>
    </div>
  )
}
