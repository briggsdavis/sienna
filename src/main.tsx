import "@fontsource/barlow/400.css"
import "@fontsource/barlow/500.css"
import "@fontsource/barlow/700.css"
import "@fontsource/barlow/800.css"
import "@fontsource/barlow/900.css"
import "@fontsource/barlow/400-italic.css"
import "@fontsource-variable/fraunces"
import "@fontsource-variable/fraunces/wght-italic.css"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import "./index.css"
import App from "./app.tsx"

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexAuthProvider>
  </StrictMode>,
)
