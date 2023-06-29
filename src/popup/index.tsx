import React from "react"
import { createRoot } from "react-dom/client"
import Popup from "./components/ExtensionInterface"

import "../styles/popup.css"

function init() {
  const appContainer = document.querySelector("#root")
  const root = createRoot(appContainer)
  root.render(<Popup />)
}

init()
