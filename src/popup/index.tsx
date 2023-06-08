import React from "react"
import { createRoot } from "react-dom/client"
import Popup from "./components/Popup"

import "../styles/tailwind.css"

function init() {
  const appContainer = document.querySelector("#root")
  const root = createRoot(appContainer)
  root.render(<Popup />)
}

init()
