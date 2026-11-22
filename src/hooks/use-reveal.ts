import { useEffect, useRef } from "react"

const HIDDEN_TRANSFORM = "translateY(20px)"

function prepare(node: HTMLElement) {
  node.style.opacity = "0"
  node.style.transform = HIDDEN_TRANSFORM
  node.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
}

function show(node: HTMLElement) {
  node.style.opacity = "1"
  node.style.transform = "translateY(0)"
}

function hide(node: HTMLElement) {
  node.style.opacity = "0"
  node.style.transform = HIDDEN_TRANSFORM
}

export function useStaggerReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observers = Array.from(el.children as HTMLCollectionOf<HTMLElement>).map((child) => {
      prepare(child)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) show(child)
          else if (child.style.opacity === "1") hide(child)
        },
        { threshold: 0.15, rootMargin: "0px 0px -20px 0px" },
      )
      observer.observe(child)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return ref
}

export function useRevealOnce<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observers = Array.from(el.querySelectorAll<HTMLElement>(selector)).map((node) => {
      prepare(node)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          show(node)
          observer.disconnect()
        },
        { threshold: 0.2, rootMargin: "0px 0px -20px 0px" },
      )
      observer.observe(node)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [selector])

  return ref
}
