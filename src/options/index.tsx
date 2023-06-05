import React from "react"
import { createRoot } from "react-dom/client"
import "../styles/tailwind.css"
import Options from "./Options"

function init() {
  const appContainer = document.createElement("div")
  appContainer.id = "root"

  document.body.appendChild(appContainer)

  const root = createRoot(appContainer)
  root.render(<Options />)

  const faviconLink = document.createElement("link")
  faviconLink.rel = "icon"
  faviconLink.type = "image/png"
  faviconLink.href = "images/favicon.png"
  document.head.appendChild(faviconLink)
}

init()
