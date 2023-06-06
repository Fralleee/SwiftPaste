import React from "react"
import { createRoot } from "react-dom/client"
import Options from "./components/Options"

import "../styles/tailwind.css"

function init() {
  const appContainer = document.createElement("div")
  appContainer.id = "root"

  document.body.appendChild(appContainer)

  const root = createRoot(appContainer)
  root.render(<Options />)

  const faviconLink = document.createElement("link")
  faviconLink.rel = "icon"
  faviconLink.type = "image/svg"
  faviconLink.href = "images/favicon.svg"
  document.head.appendChild(faviconLink)
}

init()
