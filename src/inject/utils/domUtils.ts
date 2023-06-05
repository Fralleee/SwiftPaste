export function replaceValue(value: string, inputElement: HTMLInputElement | HTMLTextAreaElement) {
  inputElement.value = value
  inputElement.focus()
}

export function removeRoot(rootContainer: HTMLDivElement) {
  if (rootContainer.parentElement) {
    document.body.removeChild(rootContainer)
  }
}

export function populateSuggestionList(
  suggestionList: HTMLDivElement,
  suggestions: Suggestion[],
  activeElement: HTMLInputElement | HTMLTextAreaElement,
  rootContainer: HTMLDivElement
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
        replaceValue(value, activeElement)
        removeRoot(rootContainer)
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
