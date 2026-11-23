import { useEffect } from "react"
import { Outlet, useLocation } from "react-router"
import { CartButton, CartDrawer } from "@/components/cart"
import { EditModeProvider, EditToolbar } from "@/components/editable"
import { Footer } from "@/components/layout/footer"
import { Nav } from "@/components/layout/nav"
import { ScrollProgress } from "@/components/layout/scroll-progress"
import { ConsentBanner, MarketingPopup } from "@/components/marketing"
import { useViewportHeight } from "@/hooks/use-viewport-height"
import { usePageTracking } from "@/lib/analytics"
import { CartProvider } from "@/lib/cart"

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const timer = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" })
    }, 350)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}

function Tracker() {
  usePageTracking()
  return null
}

export function Layout() {
  const { pathname } = useLocation()
  useViewportHeight()

  return (
    <EditModeProvider>
      <CartProvider>
        <div id="top" className="relative bg-paper text-ink">
          <ScrollManager />
          <Tracker />
          <ScrollProgress />
          <Nav />
          <main key={pathname} className="page-enter">
            <Outlet />
          </main>
          <Footer />
          <CartButton />
          <CartDrawer />
          <MarketingPopup />
          <ConsentBanner />
          <EditToolbar />
        </div>
      </CartProvider>
    </EditModeProvider>
  )
}
