import { NavLink } from "react-router"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive text-cream">
      <div className="mx-auto max-w-[1480px] px-6 pt-24 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-6 text-eyebrow text-cream/60 uppercase">
              Trattoria · Wine bar · Brooklyn
            </p>
            <h2 className="font-display text-display leading-none italic">
              Buon
              <br />
              appetito.
            </h2>
            <p className="mt-8 max-w-md text-lg text-cream/80">
              We cook the way our grandmothers cooked: slowly, generously, and
              always with too much garlic. Pull up a chair.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md border-b border-cream/40 pb-2"
            >
              <input
                type="email"
                placeholder="email@yours.com"
                className="flex-1 bg-transparent py-2 text-base outline-none placeholder:text-cream/50"
              />
              <button
                type="submit"
                className="text-eyebrow text-rosso uppercase transition-colors hover:text-cream"
              >
                Subscribe →
              </button>
            </form>
          </div>

          <div className="md:col-span-2">
            <p className="mb-4 text-eyebrow text-cream/60 uppercase">Hours</p>
            <ul className="space-y-1.5 text-base text-cream/90">
              <li>Tue–Thu · 5–10pm</li>
              <li>Fri–Sat · 5pm–12am</li>
              <li>Sun · 11am–9pm</li>
              <li className="text-cream/50">Mon · Closed</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mb-4 text-eyebrow text-cream/60 uppercase">Visit</p>
            <address className="text-base leading-relaxed text-cream/90 not-italic">
              412 Mulberry Street
              <br />
              Brooklyn, NY 11211
              <br />
              <span className="text-cream/60">+1 (718) 555-0142</span>
            </address>
            <div className="mt-6 flex gap-4 text-sm">
              {["Instagram", "Substack", "OpenTable"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="transition-colors hover:text-rosso"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-cream/15 pt-8 text-sm text-cream/50 md:flex-row md:items-center">
          <div className="flex gap-6">
            <NavLink to="/menu" className="hover:text-cream">
              Menu
            </NavLink>
            <NavLink to="/story" className="hover:text-cream">
              Story
            </NavLink>
            <NavLink to="/visit" className="hover:text-cream">
              Visit
            </NavLink>
            <NavLink to="/reserve" className="hover:text-cream">
              Reserve
            </NavLink>
          </div>
          <p>
            © {new Date().getFullYear()} Sienna Mercato · Made with too much
            love
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="font-display pointer-events-none absolute -right-32 -bottom-32 text-cream/[0.04] italic select-none"
        style={{ fontSize: "420px", lineHeight: 1 }}
      >
        Sienna
      </div>
    </footer>
  )
}
