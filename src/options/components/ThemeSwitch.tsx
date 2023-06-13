import React, { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { useLocalStorage } from "usehooks-ts"

const SwitchTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", "night")

  const toggleTheme = () => {
    setTheme(theme === "night" ? "light" : "night")
  }

  useEffect(() => {
    const body = document.body
    body.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <button className="absolute top-2 right-2 btn btn-circle" onClick={toggleTheme}>
      {theme === "night" ? (
        <FontAwesomeIcon icon={faMoon} className="w-4 h-4 text-primary" />
      ) : (
        <FontAwesomeIcon icon={faSun} className="w-4 h-4 text-primary" />
      )}
    </button>
  )
}

export default SwitchTheme
