export function fuzzySearch(query: string, suggestions: Suggestion[]): Suggestion[] {
  const lowerQuery = query.toLowerCase()
  return suggestions.filter(suggestion => {
    const lowerLabel = suggestion.label.toLowerCase()
    const lowerValue = suggestion.value.toLowerCase()

    if (lowerLabel.includes(lowerQuery) || lowerValue.includes(lowerQuery)) {
      return true
    }

    let queryIndex = 0
    for (let char of lowerLabel) {
      if (char === lowerQuery[queryIndex]) {
        queryIndex++
        if (queryIndex >= lowerQuery.length) {
          return true
        }
      }
    }

    queryIndex = 0
    for (let char of lowerValue) {
      if (char === lowerQuery[queryIndex]) {
        queryIndex++
        if (queryIndex >= lowerQuery.length) {
          return true
        }
      }
    }

    return false
  })
}

export function selectPreviousSuggestion(
  suggestionList: HTMLDivElement,
  selectedSuggestionIndex: number,
  updateIndex: (index: number) => void
) {
  const suggestionItems = suggestionList.querySelectorAll<HTMLElement>(".swiftPastePopup__suggestion")
  const selectedIndex = Math.max(selectedSuggestionIndex - 1, 0)
  updateIndex(selectedIndex)
  selectSuggestion(suggestionItems, selectedIndex)
}

export function selectNextSuggestion(
  suggestionList: HTMLDivElement,
  selectedSuggestionIndex: number,
  updateIndex: (index: number) => void
) {
  const suggestionItems = suggestionList.querySelectorAll<HTMLElement>(".swiftPastePopup__suggestion")
  const selectedIndex = Math.min(selectedSuggestionIndex + 1, suggestionItems.length - 1)
  updateIndex(selectedIndex)
  selectSuggestion(suggestionItems, selectedIndex)
}

function selectSuggestion(suggestionItems: NodeListOf<HTMLElement>, selectedIndex: number) {
  suggestionItems.forEach((suggestionItem, index) => {
    if (index === selectedIndex) {
      suggestionItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
      suggestionItem.classList.add("selected")
    } else {
      suggestionItem.classList.remove("selected")
    }
  })
}
