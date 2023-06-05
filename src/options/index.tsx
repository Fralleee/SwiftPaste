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
}

init()
