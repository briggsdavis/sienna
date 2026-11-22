import { useEffect } from "react"

export function useViewportHeight() {
  useEffect(() => {
    const update = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])
}
