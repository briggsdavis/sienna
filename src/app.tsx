import { Route, Routes } from "react-router"
import Layout from "@/components/layout"
import Home from "@/pages/home"
import Menu from "@/pages/menu"
import Reserve from "@/pages/reserve"
import Story from "@/pages/story"
import Visit from "@/pages/visit"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="story" element={<Story />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="visit" element={<Visit />} />
      </Route>
    </Routes>
  )
}
