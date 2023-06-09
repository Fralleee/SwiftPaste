import React, { useCallback, useEffect, useState } from "react"
import { themeChange } from "theme-change"
import Sidebar from "./Sidebar"
import SuggestionsTable from "./SuggestionsTable"
import TopControls from "./TopControls"
import { fetchSuggestions, saveSuggestions } from "../utils/suggestionsUtils"

const themes = [
  { label: "light", value: "light" },
  { label: "dark", value: "night" }
]

function Options() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [lastAddedIndex, setLastAddedIndex] = useState(null)
  const [isFormDirty, setFormDirty] = useState(false)

  useEffect(() => {
    fetchSuggestions().then(setSuggestions)
  }, [])

  useEffect(() => {
    themeChange(false)
  }, [])

  const handleDragEnd = event => {
    if (!event.destination) return

    let tempData = Array.from(suggestions)
    let [source_data] = tempData.splice(event.source.index, 1)
    tempData.splice(event.destination.index, 0, source_data)
    setSuggestions(tempData)
    setFormDirty(true)
  }

  const handleFieldChange = (field: "label" | "value", index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuggestions(prevSuggestions =>
      prevSuggestions.map((suggestion, i) => (i === index ? { ...suggestion, [field]: event.target.value } : suggestion))
    )
    setFormDirty(true)
  }

  const handleSaveButtonClick = () => {
    saveSuggestions(suggestions).then(() => setFormDirty(false))
  }

  const handleResetButtonClick = () => {
    fetchSuggestions().then(setSuggestions)
    setFormDirty(false)
  }

  const addSuggestion = () => {
    setSuggestions([...suggestions, { id: suggestions.length + 1, label: "", value: "" }])
    setLastAddedIndex(suggestions.length)
    setFormDirty(true)
  }

  const removeSuggestion = (index: number) => {
    setSuggestions(suggestions.filter((_, i) => i !== index))
    setFormDirty(true)
  }

  const handleBeforeUnload = useCallback(
    event => {
      if (isFormDirty) {
        event.preventDefault()
        event.returnValue = "" // Needed for Chrome
      }
    },
    [isFormDirty]
  )

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  return (
    <div className="flex w-full h-full max-w-7xl">
      <Sidebar />
      <main className="prose relative ml-12 w-full mt-8 px-4 flex-1 max-w-full">
        <input
          type="checkbox"
          className="absolute top-2 right-2 toggle toggle-md toggle-primary"
          data-toggle-theme="light,night"
          data-act-class="ACTIVECLASS"
        />
        <TopControls isFormDirty={isFormDirty} onSave={handleSaveButtonClick} onReset={handleResetButtonClick} />
        <SuggestionsTable
          suggestions={suggestions}
          lastAddedIndex={lastAddedIndex}
          onDragEnd={handleDragEnd}
          onFieldChange={handleFieldChange}
          onRemove={removeSuggestion}
          onAdd={addSuggestion}
        />
      </main>
    </div>
  )
}

export default Options
