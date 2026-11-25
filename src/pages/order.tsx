import { useEffect } from "react"
import { Link } from "react-router"
import { ORDER_URL } from "@/lib/site"

export function Order() {
  useEffect(() => {
    window.location.href = ORDER_URL
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-ink">
      <div className="text-center">
        <div className="mb-5 font-serif text-xs tracking-[0.4em] text-sienna uppercase">
          order online
        </div>
        <h1 className="font-display text-[clamp(3rem,calc(8vw*var(--site-type-scale)),6rem)] leading-none text-ink">
          Emporio
        </h1>
        <p className="mt-4 text-xl text-ink-soft">
          Taking you to our online ordering system…
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a href={ORDER_URL} className="btn-lift bg-sienna text-cream">
            <i className="ph ph-bag text-lg" />
            Open ordering page
            <i className="ph ph-arrow-up-right text-sm" />
          </a>
          <Link
            to="/"
            className="text-sm text-ink-soft underline-offset-2 hover:underline"
          >
            Back to Sienna Mercato
          </Link>
        </div>
      </div>
    </div>
  )
}
