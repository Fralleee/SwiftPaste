import React from "react"
import { NavLink } from "react-router-dom"

const Navigation = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg rounded-3xl mt-6">
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink className={({ isActive }) => `link-primary ${isActive ? "font-bold" : ""}`} to="/">
              Options
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `link-primary ${isActive ? "font-bold" : ""}`} to="/demo-forms">
              Demo forms
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => `link-primary ${isActive ? "font-bold" : ""}`} to="/demo-email">
              Demo email
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
