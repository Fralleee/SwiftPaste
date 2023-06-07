import React from "react"
import { createRoot } from "react-dom/client"
import Main from "./components/Main"

import "../styles/tailwind.css"

function init() {
  const appContainer = document.querySelector("#root")
  const root = createRoot(appContainer)
  root.render(<Main />)
}

init()
