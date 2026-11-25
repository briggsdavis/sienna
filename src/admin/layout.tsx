import { useAuthActions } from "@convex-dev/auth/react"
import { useConvexAuth, useQuery } from "convex/react"
import { Suspense, useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { Button, Field, Input, Loading } from "@/admin/ui"
import { Seo } from "@/components/seo"
import { errorMessage } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const NAV = [
  { to: "/admin", label: "Overview", icon: "ph-chart-line-up", end: true },
  { to: "/admin/inquiries", label: "Inquiries", icon: "ph-tray" },
  { to: "/admin/menus", label: "Menus", icon: "ph-book-open-text" },
  { to: "/admin/specials", label: "Daily specials", icon: "ph-star" },
  { to: "/admin/events", label: "Events", icon: "ph-calendar-dots" },
  { to: "/admin/pages", label: "Pages & SEO", icon: "ph-browsers" },
  { to: "/admin/marketing", label: "Popup & banner", icon: "ph-megaphone" },
  { to: "/admin/subscribers", label: "Subscribers", icon: "ph-envelope-simple" },
  { to: "/admin/settings", label: "Settings", icon: "ph-gear-six" },
]

export function AdminLayout() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  const me = useQuery(api.admins.me, isAuthenticated ? {} : "skip")
  const { signOut } = useAuthActions()
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const counts = useQuery(api.inquiries.counts, me ? {} : "skip")

  useEffect(() => setNavOpen(false), [pathname])

  if (isLoading || (isAuthenticated && me === undefined)) {
    return (
      <div className="min-h-screen bg-[#f6f3ee] font-sans">
        <Loading />
      </div>
    )
  }

  if (!isAuthenticated) return <Login />

  if (!me) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f3ee] p-6 font-sans">
        <div className="max-w-sm rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold">No admin access</h1>
          <p className="mt-2 text-sm text-ink-soft">
            This account isn't on the admin list. Ask an existing admin to add your email.
          </p>
          <Button className="mt-6" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </div>
    )
  }

  const newCount = counts ? counts.catering + counts.contact + counts.privateEvent : 0

  return (
    <div className="min-h-screen bg-[#f6f3ee] font-sans text-ink">
      <Seo
        path={pathname}
        title="Dashboard | Sienna Mercato"
        description="Admin dashboard"
        noindex
      />
      <div className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3 lg:hidden">
        <button type="button" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <i className="ph ph-list text-2xl" />
        </button>
        <span className="font-semibold">Sienna Mercato</span>
        <span className="w-6" />
      </div>
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-60 shrink-0 flex-col border-r border-ink/10 bg-white transition-transform lg:sticky lg:top-0 lg:flex lg:h-screen lg:translate-x-0 ${
            navOpen ? "flex translate-x-0" : "hidden -translate-x-full lg:flex"
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-5">
            <img src="/siennafav.png" alt="" className="h-7 w-7" />
            <div>
              <div className="text-sm font-semibold">Sienna Mercato</div>
              <div className="text-xs text-ink-soft">Dashboard</div>
            </div>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-sienna/10 font-medium text-sienna"
                      : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                  }`
                }
              >
                <i className={`ph ${item.icon} text-lg`} />
                <span className="flex-1">{item.label}</span>
                {item.to === "/admin/inquiries" && newCount > 0 && (
                  <span className="rounded-full bg-sienna px-1.5 text-[0.65rem] font-semibold text-white">
                    {newCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-ink/10 p-4 text-xs text-ink-soft">
            <div className="truncate">{me.email}</div>
            <div className="mt-3 flex gap-2">
              <a href="/" className="rounded-md border border-ink/15 px-2.5 py-1.5 hover:bg-ink/5">
                View site
              </a>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-md border border-ink/15 px-2.5 py-1.5 hover:bg-ink/5"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>
        {navOpen && (
          <div
            className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
            onClick={() => setNavOpen(false)}
          />
        )}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

function Login() {
  const { signIn } = useAuthActions()
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f3ee] p-6 font-sans text-ink">
      <Seo path="/admin" title="Sign in | Sienna Mercato" description="Staff sign in" noindex />
      <form
        className="w-full max-w-sm rounded-xl bg-white p-8 shadow-sm"
        onSubmit={async (e) => {
          e.preventDefault()
          setError("")
          if (password.length < 8) return setError("Passwords are at least 8 characters")
          setBusy(true)
          try {
            await signIn("password", { email, password, flow })
          } catch (err) {
            const message = errorMessage(err)
            setError(
              /admin list/i.test(message)
                ? "This email isn't on the admin list."
                : flow === "signIn"
                  ? "Wrong email or password. First time here? Create your account."
                  : "Couldn't create the account. It may already exist, try signing in.",
            )
          } finally {
            setBusy(false)
          }
        }}
      >
        <img
          src="/siennalogo.png"
          alt="Sienna Mercato"
          className="mx-auto h-9 w-auto brightness-0"
        />
        <h1 className="mt-6 text-center text-lg font-semibold">
          {flow === "signIn" ? "Staff sign in" : "Create your admin account"}
        </h1>
        <div className="mt-6 space-y-4">
          <Field label="Email">
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password" hint={flow === "signUp" ? "At least 8 characters" : undefined}>
            <Input
              type="password"
              autoComplete={flow === "signIn" ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && <p className="text-sm text-sienna">{error}</p>}
          <Button type="submit" variant="primary" disabled={busy} className="w-full">
            {busy ? "One moment..." : flow === "signIn" ? "Sign in" : "Create account"}
          </Button>
        </div>
        <p className="mt-6 text-center text-xs text-ink-soft">
          {flow === "signIn" ? "First time? " : "Already set up? "}
          <button
            type="button"
            className="text-sienna underline"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Create your account" : "Sign in"}
          </button>
        </p>
        <p className="mt-2 text-center text-xs text-ink-soft/70">
          Only emails on the admin list can create an account or sign in.
        </p>
      </form>
    </div>
  )
}
