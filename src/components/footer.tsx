import { Link } from "react-router"

export function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-12">
        <div>
          <img
            src="/siennalogo.png"
            alt="Sienna Mercato"
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-sm font-italic leading-relaxed text-paper/70 italic">
            Three floors. Three rooms. One Italian house in the Cultural
            District, open since 2013.
          </p>
          <div className="mt-8 flex gap-4 text-paper/70">
            <a
              href="https://www.instagram.com/iltettorooftop/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-sienna-bright"
            >
              <i className="ph ph-instagram-logo text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/siennamercato/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-sienna-bright"
            >
              <i className="ph ph-facebook-logo text-2xl" />
            </a>
            <a
              href="https://www.tiktok.com/@siennamercato"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="transition-colors hover:text-sienna-bright"
            >
              <i className="ph ph-tiktok-logo text-2xl" />
            </a>
            <a
              href="https://www.yelp.com/biz/sienna-mercato-pittsburgh"
              target="_blank"
              rel="noreferrer"
              aria-label="Yelp"
              className="transition-colors hover:text-sienna-bright"
            >
              <i className="ph ph-storefront text-2xl" />
            </a>
          </div>
        </div>

        <div>
          <div className="font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
            Address
          </div>
          <address className="mt-4 font-serif leading-relaxed text-paper/90 not-italic">
            942 Penn Avenue
            <br />
            Pittsburgh, PA 15222
            <br />
            <a
              href="tel:14122812810"
              className="under hover:text-sienna-bright"
            >
              412.281.2810
            </a>
          </address>
        </div>

        <div>
          <div className="font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
            Explore
          </div>
          <ul className="mt-4 space-y-2 font-serif text-paper/90">
            <li>
              <Link className="under hover:text-sienna-bright" to="/emporio">
                Emporio · I
              </Link>
            </li>
            <li>
              <Link className="under hover:text-sienna-bright" to="/mezzo">
                Mezzo · II
              </Link>
            </li>
            <li>
              <Link className="under hover:text-sienna-bright" to="/tetto">
                Il Tetto · III
              </Link>
            </li>
            <li>
              <Link className="under hover:text-sienna-bright" to="/events">
                Private Events
              </Link>
            </li>
            <li>
              <Link className="under hover:text-sienna-bright" to="/catering">
                Catering
              </Link>
            </li>
            <li>
              <a
                className="under hover:text-sienna-bright"
                href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
                target="_blank"
                rel="noreferrer"
              >
                Order Online
              </a>
            </li>
            <li>
              <a
                className="under hover:text-sienna-bright"
                href="https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"
                target="_blank"
                rel="noreferrer"
              >
                Gift Cards
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-serif text-xs tracking-[0.3em] text-sienna-bright uppercase">
            Newsletter
          </div>
          <p className="mt-4 font-italic leading-relaxed text-paper/70 italic">
            Pre-release menus, ball of the month, secret cocktails.
          </p>
          <form className="mt-5 flex border-b border-paper/30 transition-colors focus-within:border-sienna-bright">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-3 font-italic text-paper placeholder:text-paper/40 placeholder:italic focus:outline-none"
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

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-6 py-6 font-serif text-xs tracking-wider text-paper/50 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>© 2026 Sienna Mercato Restaurant Group · Pittsburgh, PA</span>
          <span className="flex items-center gap-2 font-italic italic">
            <i className="ph ph-heart-straight-fill text-sm text-sienna-bright" />
            Made with love in Pennsylvania
          </span>
        </div>
      </div>
    </footer>
  )
}
