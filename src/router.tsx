import { createBrowserRouter } from "react-router"
import { Emporio } from "@/pages/emporio"
import { Events } from "@/pages/events"
import { Home } from "@/pages/home"
import { Layout } from "@/pages/layout"
import { Mezzo } from "@/pages/mezzo"
import { NotFound } from "@/pages/not-found"
import { Tetto } from "@/pages/tetto"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/emporio", element: <Emporio /> },
      { path: "/mezzo", element: <Mezzo /> },
      { path: "/tetto", element: <Tetto /> },
      { path: "/events", element: <Events /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])
