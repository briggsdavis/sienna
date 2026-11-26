import { useEffect } from "react"

const SELECTOR = ":is(main, footer) .btn-lift"

/** Fades buttons in the first time they scroll into view (styles in index.css). */
export function useButtonReveal(pathname: string) {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-btn-visible", "")
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(reveal)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    )
    const watch = () =>
      document
        .querySelectorAll(`${SELECTOR}:not([data-btn-visible])`)
        .forEach((el) => io.observe(el))
    watch()
    // Buttons that render later (data loading, menus opening) are picked up too.
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
}
