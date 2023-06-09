import React from "react"
import { createRoot } from "react-dom/client"
import Options from "./components/Options"

import "../styles/default.css"

function init() {
  const appContainer = document.querySelector("#root")
  const root = createRoot(appContainer)
  root.render(<Options />)

  const faviconLink = document.createElement("link")
}

init()
