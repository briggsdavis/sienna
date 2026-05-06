import { useEffect } from "react"
import { Link } from "react-router"

const ORDER_URL =
  "https://order.toasttab.com/online/sienna-mercato-downtown-942-penn-avenue"

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
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-ink">
          Emporio
        </h1>
        <p className="mt-4 font-italic text-xl text-ink-soft italic">
          Taking you to our online ordering system…
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={ORDER_URL}
            className="btn-lift inline-flex items-center gap-3 bg-sienna px-8 py-4 font-serif text-sm tracking-[0.25em] text-cream uppercase"
          >
            <i className="ph ph-bag text-lg" />
            Open ordering page
            <i className="ph ph-arrow-up-right text-sm" />
          </a>
          <Link
            to="/"
            className="font-italic text-sm text-ink-soft underline-offset-2 hover:underline italic"
          >
            Back to Sienna Mercato
          </Link>
        </div>
      </div>
    </div>
  )
}
