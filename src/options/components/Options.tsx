import React from "react"
import Sidebar from "./Sidebar"
import ThemeSwitch from "./ThemeSwitch"
import { SuggestionsProvider } from "../context/SuggestionsContext"
import SuggestionsControls from "./SuggestionsControls"
import SuggestionsList from "./SuggestionsList"
import useBeforeUnload from "../hooks/useBeforeUnload"

function Options() {
  useBeforeUnload()
  return (
    <SuggestionsProvider>
      <div className="flex w-full h-full max-w-7xl">
        <ThemeSwitch />
        <Sidebar />
        <main className="prose relative ml-12 w-full mt-8 px-4 flex-1 max-w-full min-w-[500px] pt-8">
          <SuggestionsControls />
          <SuggestionsList />
        </main>
      </div>
    </SuggestionsProvider>
  )
}

export default Options
