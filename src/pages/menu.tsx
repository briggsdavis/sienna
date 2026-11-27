import { useQuery } from "convex/react"
import { Link, useParams } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { PageHero } from "@/components/hero"
import {
  MENU_THEMES,
  MenuSections,
  SectionChips,
  sectionTone,
  type MenuSection,
} from "@/components/menu-view"
import { ReserveLink, useReservation, useSettings } from "@/components/reserve"
import { SectionBreak } from "@/components/section-break"
import { Seo, restaurantJsonLd } from "@/components/seo"
import { WordReveal } from "@/components/word-reveal"
import { PAGE_SEO } from "@/lib/pages"
import { FLOORS, unsplash, type FloorId } from "@/lib/site"
import { NotFound } from "@/pages/not-found"
import { api } from "../../convex/_generated/api"
import { MENUS } from "../../convex/seedData"

/** The first two sections of each menu, shown until real sections are added in the admin. */
function sampleSections(menu: FloorId) {
  return MENUS[menu].slice(0, 2).map((section, sectionIndex) => ({
    _id: `sample-${sectionIndex}`,
    _creationTime: 0,
    menu,
    title: section.title,
    subtitle: section.subtitle,
    order: sectionIndex,
    image: null,
    items: section.items.map((item, itemIndex) => ({
      ...item,
      imageUrl: undefined,
      _id: `sample-${sectionIndex}-${itemIndex}`,
      _creationTime: 0,
      menu,
      sectionId: `sample-${sectionIndex}`,
      available: true,
      hidden: false,
      order: itemIndex,
      image: null,
    })),
  })) as unknown as MenuSection[]
}

/** Hero photo for each menu page. */
const MENU_HERO_IMAGES: Record<FloorId, { src: string; position?: string }> = {
  emporio: { src: unsplash("1515516969-d4008cc6241a", 2400, 80) },
  mezzo: { src: "/images/mezzo/gemelli-vodka.webp", position: "object-[center_58%]" },
  tetto: { src: unsplash("1570560258879-af7f8e1447ac", 2400, 80) },
}

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
  const loaded = useQuery(api.menus.get, { menu: restaurant })
  const sections = loaded?.length === 0 ? sampleSections(restaurant) : loaded
  const floor = FLOORS[restaurant]
  const t = MENU_THEMES[restaurant]
  const mezzo = restaurant === "mezzo"
  const settings = useSettings()
  const reservation = useReservation(restaurant)
  const showReserve = reservation?.mode !== "walkin"
  const pickupUrl = mezzo ? undefined : settings?.orderUrl

  return (
    <div className={`type-${restaurant} min-h-screen ${t.page}`}>
      <Seo path={floor.menuHref} {...PAGE_SEO[floor.menuHref]} jsonLd={JSON_LD[restaurant]} />
      <MenuHero restaurant={restaurant} showReserve={showReserve} pickupUrl={pickupUrl} />

      {sections && sections.length > 0 && (
        <nav
          // Same colour as the first section, and it scrolls away with the page.
          className={sectionTone(restaurant, 0, sections.length).bg}
          aria-label="Menu sections"
        >
          <div className="mx-auto max-w-[1400px] overflow-x-auto px-6 py-4 lg:px-12">
            <SectionChips
              restaurant={restaurant}
              sections={sections}
              onCream={!sectionTone(restaurant, 0, sections.length).dark}
            />
          </div>
        </nav>
      )}

      <div>
        {sections === undefined ? (
          <div className="h-[60vh]" />
        ) : sections.length === 0 ? (
          <p className={`py-20 text-center font-body text-xl ${t.muted}`}>
            The menu is being updated. Check back soon.
          </p>
        ) : (
          <MenuSections restaurant={restaurant} sections={sections} />
        )}
        {mezzo && (
          <SectionBreak
            icon="wine"
            className="mx-auto max-w-[1400px] px-6 pt-14 text-cream/80 md:pt-20 lg:px-12"
          />
        )}
        <p className={`mx-auto max-w-[1400px] px-6 py-10 font-body text-sm lg:px-12 ${t.muted}`}>
          {mezzo ? (
            <WordReveal text="Menu and prices change with the season. Please let your server know about any allergies." />
          ) : (
            "Menu and prices change with the season. Please let your server know about any allergies."
          )}
        </p>
      </div>
    </div>
  )
}

function MenuHero({
  restaurant,
  showReserve,
  pickupUrl,
}: {
  restaurant: FloorId
  showReserve: boolean
  pickupUrl?: string
}) {
  const floor = FLOORS[restaurant]
  const image = MENU_HERO_IMAGES[restaurant]
  return (
    <PageHero
      image={{ src: image.src, alt: "", className: image.position ?? "" }}
      overlay={<div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/50 to-ink/25" />}
      viewportHeight={60}
      bottomPadding="pb-8"
    >
      <div className="my-auto flex flex-col items-center gap-4 text-center text-cream">
        <img
          src={floor.logo}
          alt=""
          className="h-[clamp(2.75rem,7svh,4.5rem)] w-auto max-w-[55vw] object-contain brightness-0 invert"
        />
        <h1 className="text-hero-shadow font-display text-[clamp(2.25rem,5.5vw,4.75rem)] leading-none">
          <WordReveal text={`${floor.name} Menu`} delay={0.2} step={0.1} />
        </h1>
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          {showReserve && (
            <ReserveLink restaurant={restaurant} className="btn-lift btn-fill bg-cream text-ink">
              Reserve
            </ReserveLink>
          )}
          {pickupUrl && (
            <ExternalLink
              href={pickupUrl}
              className="btn-lift btn-fill btn-fill-cream border border-cream/60 text-cream"
            >
              Order pickup
            </ExternalLink>
          )}
          <Link
            to={floor.href}
            className="btn-lift btn-fill btn-fill-cream border border-cream/60 text-cream"
          >
            View the Restaurant
          </Link>
        </div>
      </div>
    </PageHero>
  )
}
