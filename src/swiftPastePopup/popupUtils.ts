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
