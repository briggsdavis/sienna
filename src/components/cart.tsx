import { useEffect } from "react"
import { Link } from "react-router"
import { useCart } from "@/lib/cart"
import { money } from "@/lib/util"

export function QuantityStepper({
  value,
  onChange,
  tone = "light",
}: {
  value: number
  onChange: (value: number) => void
  tone?: "light" | "dark"
}) {
  const border = tone === "dark" ? "border-cream/30" : "border-ink/20"
  return (
    <div className={`inline-flex items-center rounded-full border ${border}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ink/5"
      >
        <i className="ph ph-minus text-xs" />
      </button>
      <span className="w-7 text-center font-serif text-sm tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ink/5"
      >
        <i className="ph ph-plus text-xs" />
      </button>
    </div>
  )
}

export function CartButton() {
  const { count, setOpen } = useCart()
  if (count === 0) return null
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="btn-lift fixed right-5 bottom-5 z-[90] inline-flex items-center gap-3 bg-ink px-5 py-3.5 font-serif text-xs tracking-[0.25em] text-cream uppercase shadow-2xl hover:bg-sienna"
    >
      <i className="ph ph-shopping-bag text-lg" />
      Catering cart
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-sienna-bright px-1.5 text-2xs tabular-nums">
        {count}
      </span>
    </button>
  )
}

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQuantity, remove } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, setOpen])

  return (
    <div
      className={`fixed inset-0 z-[120] transition ${open ? "visible" : "invisible"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Catering cart"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-3xl text-ink">Your catering cart</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="text-ink hover:text-sienna"
          >
            <i className="ph ph-x text-2xl" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <i className="ph-duotone ph-shopping-bag text-5xl text-sienna/60" />
            <p className="font-body text-lg text-ink-soft">Nothing here yet.</p>
            <Link
              to="/catering#shop"
              onClick={() => setOpen(false)}
              className="under font-serif text-xs tracking-[0.25em] text-sienna uppercase"
            >
              Browse catering
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={`${line.itemId}-${line.optionIndex}`} className="flex gap-4 py-5">
                  {line.image && (
                    <img
                      src={line.image}
                      alt=""
                      className="h-16 w-16 shrink-0 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-serif text-lg leading-tight text-ink">{line.name}</span>
                      <span className="font-serif text-sienna tabular-nums">
                        {money(line.price * line.quantity)}
                      </span>
                    </div>
                    <div className="font-body text-sm text-ink-soft">
                      {line.optionLabel} • {money(line.price)} each
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(q) => setQuantity(line.itemId, line.optionIndex, q)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(line.itemId, line.optionIndex)}
                        className="font-body text-sm text-ink-soft underline hover:text-sienna"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 bg-cream px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
                  Estimated subtotal
                </span>
                <span className="font-display text-3xl text-ink tabular-nums">
                  {money(subtotal)}
                </span>
              </div>
              <p className="mt-2 font-body text-xs leading-relaxed text-ink-soft">
                Before gratuity, delivery and serviceware. This is a request, not a paid order. Our
                team will confirm details and final pricing.
              </p>
              <Link
                to="/catering/checkout"
                onClick={() => setOpen(false)}
                className="btn-lift mt-5 flex w-full items-center justify-center gap-2 bg-sienna px-6 py-4 font-serif text-xs tracking-[0.3em] text-cream uppercase hover:bg-sienna-bright"
              >
                Continue to request
                <i className="ph ph-arrow-right text-sm" />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
