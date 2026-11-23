import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "@/router"
import "./index.css"

const url = import.meta.env.VITE_CONVEX_URL as string | undefined

if (!url) {
  throw new Error("VITE_CONVEX_URL is not set. Run `bun run dev` to start Convex and Vite.")
}

const convex = new ConvexReactClient(url)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexAuthProvider>
  </StrictMode>,
)
