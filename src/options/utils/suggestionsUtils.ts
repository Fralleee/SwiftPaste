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

export const validateSuggestions = (suggestions: Suggestion[]): boolean => {
  if (!Array.isArray(suggestions)) {
    return false
  }

  for (const suggestion of suggestions) {
    if (!validateSuggestion(suggestion)) return false
  }

  return true
}

export const indexSuggestions = (suggestions: Suggestion[]): Suggestion[] => {
  const ids = suggestions.map(obj => obj.id)
  const hasDuplicateIds = new Set(ids).size !== ids.length
  if (hasDuplicateIds) {
    return suggestions.map((suggestion, index) => ({ ...suggestion, id: index }))
  }

  return suggestions
}

const validateSuggestion = (suggestion: Suggestion): Suggestion | null => {
  if (suggestion.value && suggestion.label) {
    return suggestion
  }
  return null
}
