import React from "react"
import { MemoryRouter as Router, Routes, Route } from "react-router-dom"
import Options from "./Options"
import Sidebar from "./Sidebar"
import ThemeSwitch from "./ThemeSwitch"
import Navigation from "./Navigation"
import DemoForms from "./DemoForms"
import DemoEmail from "./DemoEmail"

function Main() {
  return (
    <div className="flex w-full h-full max-w-7xl">
      <Router>
        <Sidebar />
        <ThemeSwitch />
        <div className="flex flex-col w-full ml-12">
          <Navigation />
          <Routes>
            <Route path="/demo-forms" element={<DemoForms />} />
            <Route path="/demo-email" element={<DemoEmail />} />
            <Route path="/" element={<Options />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default Main
