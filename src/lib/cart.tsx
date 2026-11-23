import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Id } from "../../convex/_generated/dataModel"

export type CartLine = {
  itemId: Id<"menuItems">
  optionIndex: number
  quantity: number
  name: string
  optionLabel: string
  price: number
  image?: string | null
}

type Cart = {
  lines: CartLine[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (open: boolean) => void
  add: (line: CartLine) => void
  setQuantity: (itemId: Id<"menuItems">, optionIndex: number, quantity: number) => void
  remove: (itemId: Id<"menuItems">, optionIndex: number) => void
  replace: (lines: CartLine[]) => void
  clear: () => void
}

const KEY = "sm_cart"
const CartContext = createContext<Cart | null>(null)

function load(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const same = (a: CartLine, itemId: string, optionIndex: number) =>
  a.itemId === itemId && a.optionIndex === optionIndex

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines))
  }, [lines])

  const value = useMemo<Cart>(
    () => ({
      lines,
      open,
      setOpen,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: Math.round(lines.reduce((sum, l) => sum + l.price * l.quantity, 0) * 100) / 100,
      add: (line) =>
        setLines((current) => {
          const existing = current.find((l) => same(l, line.itemId, line.optionIndex))
          if (!existing) return [...current, line]
          return current.map((l) =>
            same(l, line.itemId, line.optionIndex)
              ? { ...l, quantity: Math.min(100, l.quantity + line.quantity) }
              : l,
          )
        }),
      setQuantity: (itemId, optionIndex, quantity) =>
        setLines((current) =>
          quantity <= 0
            ? current.filter((l) => !same(l, itemId, optionIndex))
            : current.map((l) =>
                same(l, itemId, optionIndex) ? { ...l, quantity: Math.min(100, quantity) } : l,
              ),
        ),
      remove: (itemId, optionIndex) =>
        setLines((current) => current.filter((l) => !same(l, itemId, optionIndex))),
      replace: setLines,
      clear: () => setLines([]),
    }),
    [lines, open],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const cart = useContext(CartContext)
  if (!cart) throw new Error("useCart must be used inside CartProvider")
  return cart
}
