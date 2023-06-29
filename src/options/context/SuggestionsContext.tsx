import React, { createContext, useEffect, useState, useMemo } from "react"
import { fetchSuggestions, indexSuggestions, validateSuggestions } from "../../utils/suggestionsUtils"
import { saveSuggestions } from "../../utils/chrome"

const initialValue = {
  suggestions: [],
  lastAddedIndex: -1,
  isFormDirty: false,
  handleDragEnd: (event: any) => console.log("handleDragEnd - Not yet implemented"),
  handleFieldChange: (field, index) => event => console.log("handleFieldChange - Not yet implemented"),
  handleSaveButtonClick: () => console.log("handleSaveButtonClick - Not yet implemented"),
  handleResetButtonClick: () => console.log("handleResetButtonClick - Not yet implemented"),
  addSuggestion: () => console.log("addSuggestion - Not yet implemented"),
  removeSuggestion: (index: number) => console.log("removeSuggestion - Not yet implemented"),
  downloadSuggestions: () => console.log("downloadSuggestions - Not yet implemented"),
  uploadSuggestions: (event: any) => console.log("uploadSuggestions - Not yet implemented")
}
const SuggestionsContext = createContext(initialValue)

export function SuggestionsProvider({ children }) {
  const [suggestions, setSuggestions] = useState([])
  const [lastAddedIndex, setLastAddedIndex] = useState(null)
  const [isFormDirty, setFormDirty] = useState(false)

  useEffect(() => {
    fetchSuggestions().then(fetchedSuggestions => {
      if (!validateSuggestions(fetchedSuggestions)) {
        console.error("Invalid suggestions loaded from Storage.")
        return
      }
      setSuggestions(indexSuggestions(fetchedSuggestions))
    })
  }, [])

  const handleDragEnd = event => {
    if (!event.destination) return

    let tempData = Array.from(suggestions)
    let [source_data] = tempData.splice(event.source.index, 1)
    tempData.splice(event.destination.index, 0, source_data)
    setSuggestions(tempData)
    setFormDirty(true)
  }

  const handleFieldChange = (field, index) => event => {
    setSuggestions(prevSuggestions =>
      prevSuggestions.map((suggestion, i) => (i === index ? { ...suggestion, [field]: event.target.value } : suggestion))
    )
    setFormDirty(true)
  }

  const handleSaveButtonClick = () => {
    saveSuggestions(suggestions).then(() => setFormDirty(false))
  }

  const handleResetButtonClick = () => {
    fetchSuggestions().then(fetchedSuggestions => {
      setSuggestions(indexSuggestions(fetchedSuggestions))
    })
    setFormDirty(false)
  }

  const addSuggestion = () => {
    setSuggestions(prevSuggestions => [...prevSuggestions, { id: prevSuggestions.length + 1, label: "", value: "" }])
    setLastAddedIndex(suggestions.length)
    setFormDirty(true)
  }

  const removeSuggestion = index => {
    setSuggestions(prevSuggestions => prevSuggestions.filter((_, i) => i !== index))
    setFormDirty(true)
  }

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

  const uploadSuggestions = event => {
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

      if (!validateSuggestions(data)) {
        console.error("Invalid file.")
        return
      }

      if (JSON.stringify(data) !== JSON.stringify(suggestions)) {
        setSuggestions(indexSuggestions(data))
        setFormDirty(true)
      }
    }

    reader.readAsText(file)
  }

  const handleBeforeUnload = event => {
    if (isFormDirty) {
      event.preventDefault()
      event.returnValue = "" // Needed for Chrome
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  const contextValue = useMemo(
    () => ({
      suggestions,
      lastAddedIndex,
      isFormDirty,
      handleDragEnd,
      handleFieldChange,
      handleSaveButtonClick,
      handleResetButtonClick,
      addSuggestion,
      removeSuggestion,
      downloadSuggestions,
      uploadSuggestions
    }),
    [
      suggestions,
      lastAddedIndex,
      isFormDirty,
      handleDragEnd,
      handleFieldChange,
      handleSaveButtonClick,
      handleResetButtonClick,
      addSuggestion,
      removeSuggestion,
      downloadSuggestions,
      uploadSuggestions
    ]
  )

  return <SuggestionsContext.Provider value={contextValue}>{children}</SuggestionsContext.Provider>
}

export default SuggestionsContext
