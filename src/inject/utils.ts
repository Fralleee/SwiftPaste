export function insertValue(value: string, targetElement: HTMLInputElement | HTMLTextAreaElement, popupContainer: HTMLDivElement) {
  targetElement.value += value
  targetElement.focus()
  removePopup(popupContainer)
}

export function removePopup(popupContainer: HTMLDivElement) {
  if (popupContainer.parentElement) {
    document.body.removeChild(popupContainer)
  }
}

export function populateSuggestions(
  suggestionList: HTMLDivElement,
  suggestions: Suggestion[],
  activeElement: HTMLInputElement | HTMLTextAreaElement,
  popupContainer: HTMLDivElement
) {
  suggestionList.innerHTML = ""
  suggestions.forEach((suggestion, index) => {
    const suggestionElement = document.createElement("div")
    suggestionElement.classList.add("swiftPastePopup__suggestion")
    suggestionElement.textContent = suggestion.label
    suggestionElement.setAttribute("data-value", suggestion.value)
    suggestionElement.addEventListener("mouseenter", () => {
      const selectedSuggestion = suggestionList.querySelector(".swiftPastePopup__suggestion.selected")
      if (selectedSuggestion) {
        selectedSuggestion.classList.remove("selected")
      }
      suggestionElement.classList.add("selected")
    })
    suggestionElement.addEventListener("click", () => {
      const value = suggestionElement.getAttribute("data-value")
      if (value) {
        insertValue(value, activeElement, popupContainer)
      }
    })
    if (index === 0) {
      suggestionElement.classList.add("selected")
    }
    suggestionList.appendChild(suggestionElement)
  })
}

export function isValidElement(element: HTMLInputElement | HTMLTextAreaElement): boolean {
  const elementTagName = element.tagName
  const isInputElement = elementTagName === "INPUT"
  const isTextAreaElement = elementTagName === "TEXTAREA"
  const isContentEditable = element.isContentEditable
  return isInputElement || isTextAreaElement || isContentEditable
}

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

export function calculatePosition(activeElementPosition: DOMRect, popupElement: HTMLElement): DOMRect {
  const buffer = 5 // buffer space in pixels between active element and popup
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const popupWidth = popupElement.offsetWidth
  const popupHeight = popupElement.offsetHeight

  let left = activeElementPosition.right + buffer
  let top = activeElementPosition.top

  // Adjust position if popup will be off screen
  if (left + popupWidth > windowWidth) {
    left = windowWidth - popupWidth - buffer
  }

  if (top + popupHeight > windowHeight) {
    top = windowHeight - popupHeight - buffer
  }

  const position = new DOMRect(left, top, popupWidth, popupHeight)
  return position
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
      suggestionItem.classList.add("selected")
    } else {
      suggestionItem.classList.remove("selected")
    }
  })
}
