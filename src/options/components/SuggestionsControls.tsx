import React, { useContext } from "react"
import SuggestionsContext from "../context/SuggestionsContext"
import TopControls from "./TopControls"

function SuggestionsControls() {
  const { isFormDirty, handleSaveButtonClick, handleResetButtonClick, downloadSuggestions, uploadSuggestions } =
    useContext(SuggestionsContext)

  return (
    <TopControls
      isFormDirty={isFormDirty}
      onSave={handleSaveButtonClick}
      onReset={handleResetButtonClick}
      onDownload={downloadSuggestions}
      onImport={uploadSuggestions}
    />
  )
}

export default SuggestionsControls
