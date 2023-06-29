import React, { useContext } from "react"
import SuggestionsContext from "../context/SuggestionsContext"
import SuggestionsTable from "./SuggestionsTable"

function SuggestionsList() {
  const { suggestions, lastAddedIndex, handleDragEnd, handleFieldChange, removeSuggestion, addSuggestion } = useContext(SuggestionsContext)

  return (
    <SuggestionsTable
      suggestions={suggestions}
      lastAddedIndex={lastAddedIndex}
      onDragEnd={handleDragEnd}
      onFieldChange={handleFieldChange}
      onRemove={removeSuggestion}
      onAdd={addSuggestion}
    />
  )
}

export default SuggestionsList
