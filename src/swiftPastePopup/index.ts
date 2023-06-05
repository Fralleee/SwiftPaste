import cssStyles from "./popupStyles"
import { createInputField, createPopupContainer, createSuggestionList } from "./componentFactory"
import { handleCtrlSpaceKeyDown } from "./eventhandlers"
import { insertValue, removePopup, populateSuggestions } from "./popupUtils"
import { selectNextSuggestion, selectPreviousSuggestion } from "./selectSuggestion"
import fuzzySearch from "./fuzzySearch"

window.addEventListener("keydown", handleCtrlSpaceKeyDown)

export function activatePopup(suggestions: Suggestion[], position: DOMRect, activeElement: HTMLInputElement | HTMLTextAreaElement) {
  const popupContainer = createPopupContainer(position)
  const inputField = createInputField()
  const suggestionList = createSuggestionList()

  let selectedSuggestionIndex = 0
  let filterText = ""

  inputField.addEventListener("input", handleInputChange)
  popupContainer.addEventListener("keydown", handlePopupKeyDown)
  document.addEventListener("click", handleDocumentClickOutside)

  function handleInputChange() {
    filterText = inputField.value.toLowerCase()
    filterSuggestions()
  }

  function handlePopupKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "Escape":
        event.preventDefault()
        removePopup(popupContainer)
        break
      case "Enter":
        event.preventDefault()
        handleSuggestionSelection()
        break
      case "ArrowUp":
        event.preventDefault()
        selectPreviousSuggestion(suggestionList, selectedSuggestionIndex, updateSelectedSuggestionIndex)
        break
      case "ArrowDown":
        event.preventDefault()
        selectNextSuggestion(suggestionList, selectedSuggestionIndex, updateSelectedSuggestionIndex)
        break
    }
  }

  function handleDocumentClickOutside(event: MouseEvent) {
    if (!popupContainer.contains(event.target as Node)) {
      removePopup(popupContainer)
    }
  }

  function handleSuggestionSelection() {
    const selectedSuggestion = document.querySelector(".swiftPastePopup__suggestion.selected") as HTMLDivElement | null
    if (selectedSuggestion) {
      const value = selectedSuggestion.getAttribute("data-value")
      if (value) {
        insertValue(value, activeElement, popupContainer)
      }
    }
  }

  function updateSelectedSuggestionIndex(index: number) {
    selectedSuggestionIndex = index
  }

  function filterSuggestions() {
    const filteredSuggestions = fuzzySearch(filterText, suggestions)
    populateSuggestions(suggestionList, filteredSuggestions, activeElement, popupContainer)
  }

  populateSuggestions(suggestionList, suggestions, activeElement, popupContainer)

  // Create a shadow root and attach it to the popup container
  const shadowRoot = popupContainer.attachShadow({ mode: "open" })

  // Create a style element and set its content to the CSS styles
  const styleElement = document.createElement("style")
  styleElement.textContent = cssStyles

  // Append the style element, input field, and suggestion list to the shadow root
  shadowRoot.appendChild(styleElement)
  shadowRoot.appendChild(inputField)
  shadowRoot.appendChild(suggestionList)

  // Append the popup container to the document body
  document.body.appendChild(popupContainer)

  inputField.focus()
}
