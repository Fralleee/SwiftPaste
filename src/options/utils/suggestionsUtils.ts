export const fetchSuggestions = (): Promise<Suggestion[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("swiftPasteSuggestions", result => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        reject(chrome.runtime.lastError)
        return
      }
      const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
      resolve(suggestions)
    })
  })
}

export const saveSuggestions = (suggestions: Suggestion[]): Promise<void> => {
  const validatedSuggestions = suggestions.map(validateSuggestion).filter(Boolean)

  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ swiftPasteSuggestions: validatedSuggestions }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        reject(chrome.runtime.lastError)
        return
      }
      resolve()
    })
  })
}

const validateSuggestion = (suggestion: Suggestion): Suggestion | null => {
  if (suggestion.value && suggestion.label) {
    return suggestion
  }
  return null
}
