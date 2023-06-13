import React, { useCallback, useEffect, useState } from "react"
import { themeChange } from "theme-change"
import Sidebar from "./Sidebar"
import SuggestionsTable from "./SuggestionsTable"
import TopControls from "./TopControls"
import { fetchSuggestions, saveSuggestions } from "../utils/suggestionsUtils"
import ThemeSwitch from "./ThemeSwitch"

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

  const downloadSuggestions = () => {
    const data = JSON.stringify(suggestions, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "suggestions.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const uploadSuggestions = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = function (event) {
      const contents = event.target.result as string
      let data
      try {
        data = JSON.parse(contents)
      } catch (err) {
        console.error("The uploaded file is not a valid JSON:", err)
        return
      }

      if (!Array.isArray(data)) {
        console.error("The uploaded file does not contain an array")
        return
      }

      // Verify that each item in the array is a Suggestion
      for (const item of data) {
        if (
          typeof item !== "object" ||
          !item ||
          typeof item.id !== "number" ||
          typeof item.label !== "string" ||
          typeof item.value !== "string"
        ) {
          console.error("The uploaded file contains invalid data")
          return
        }
      }

      if (JSON.stringify(data) !== JSON.stringify(suggestions)) {
        setSuggestions(data)
        setFormDirty(true)
      }
    }

    reader.readAsText(file)
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  return (
    <div className="flex w-full h-full max-w-7xl">
      <ThemeSwitch />
      <Sidebar />
      <main className="prose relative ml-12 w-full mt-8 px-4 flex-1 max-w-full min-w-[500px] pt-8">
        <TopControls
          isFormDirty={isFormDirty}
          onSave={handleSaveButtonClick}
          onReset={handleResetButtonClick}
          onDownload={downloadSuggestions}
          onImport={uploadSuggestions}
        />
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
