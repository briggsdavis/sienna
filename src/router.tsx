import { lazy, Suspense, type ComponentType } from "react"
import { createBrowserRouter, Navigate } from "react-router"
import { Layout } from "@/components/layout/layout"
import { Catering } from "@/pages/catering"
import { CateringCheckout } from "@/pages/checkout"
import { Contact } from "@/pages/contact"
import { Emporio } from "@/pages/emporio"
import { Events } from "@/pages/events"
import { Home } from "@/pages/home"
import { MenuPage } from "@/pages/menu"
import { Mezzo } from "@/pages/mezzo"
import { NotFound } from "@/pages/not-found"
import { Order } from "@/pages/order"
import { Privacy } from "@/pages/privacy"
import { Tetto } from "@/pages/tetto"

const named = <T extends string>(load: () => Promise<Record<T, ComponentType>>, name: T) =>
  lazy(async () => ({ default: (await load())[name] }))

const AdminLayout = named(() => import("@/admin/layout"), "AdminLayout")
const Overview = named(() => import("@/admin/overview"), "Overview")
const InquiriesAdmin = named(() => import("@/admin/inquiries"), "InquiriesAdmin")
const MenusAdmin = named(() => import("@/admin/menus"), "MenusAdmin")
const SpecialsAdmin = named(() => import("@/admin/specials"), "SpecialsAdmin")
const EventsAdmin = named(() => import("@/admin/events"), "EventsAdmin")
const PagesAdmin = named(() => import("@/admin/pages"), "PagesAdmin")
const MarketingAdmin = named(() => import("@/admin/marketing"), "MarketingAdmin")
const SubscribersAdmin = named(() => import("@/admin/subscribers"), "SubscribersAdmin")
const SettingsAdmin = named(() => import("@/admin/settings"), "SettingsAdmin")

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/emporio", element: <Emporio /> },
      { path: "/mezzo", element: <Mezzo /> },
      { path: "/tetto", element: <Tetto /> },
      { path: "/menus", element: <Navigate to="/menus/mezzo" replace /> },
      { path: "/menus/:restaurant", element: <MenuPage /> },
      { path: "/events", element: <Events /> },
      { path: "/catering", element: <Catering /> },
      { path: "/catering/checkout", element: <CateringCheckout /> },
      { path: "/contact", element: <Contact /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/order", element: <Order /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={null}>
        <AdminLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Overview /> },
      { path: "inquiries", element: <Navigate to="/admin/inquiries/catering" replace /> },
      { path: "inquiries/:kind", element: <InquiriesAdmin /> },
      { path: "menus", element: <Navigate to="/admin/menus/tetto" replace /> },
      { path: "menus/:menu", element: <MenusAdmin /> },
      { path: "specials", element: <SpecialsAdmin /> },
      { path: "events", element: <EventsAdmin /> },
      { path: "pages", element: <PagesAdmin /> },
      { path: "marketing", element: <MarketingAdmin /> },
      { path: "subscribers", element: <SubscribersAdmin /> },
      { path: "settings", element: <SettingsAdmin /> },
    ],
  },
])
