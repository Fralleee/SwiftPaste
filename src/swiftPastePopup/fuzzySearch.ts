export default function fuzzySearch(query: string, suggestions: Suggestion[]): Suggestion[] {
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
