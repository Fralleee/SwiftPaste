import cssStyles from "../styles/popupStyles"
import {
  insertValue,
  populateSuggestions,
  removePopup,
  fuzzySearch,
  calculatePosition,
  selectNextSuggestion,
  selectPreviousSuggestion
} from "../utils"
import Container from "./Container"
import InputField from "./InputField"
import SuggestionList from "./SuggestionList"

export function SuggestionBox(suggestions: Suggestion[], activeElement: HTMLInputElement | HTMLTextAreaElement) {
  const container = Container()
  const inputField = InputField()
  const suggestionList = SuggestionList()

  let selectedSuggestionIndex = 0
  let filterText = ""

  inputField.addEventListener("input", handleInputChange)
  container.addEventListener("keydown", handlePopupKeyDown)
  document.addEventListener("click", handleDocumentClickOutside)

  function handleInputChange() {
    filterText = inputField.value.toLowerCase()
    filterSuggestions()
  }

  function handlePopupKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "Escape":
        event.preventDefault()
        removePopup(container)
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
    if (!container.contains(event.target as Node)) {
      removePopup(container)
    }
  }

  function handleSuggestionSelection() {
    const selectedSuggestion = document.querySelector(".swiftPastePopup__suggestion.selected") as HTMLDivElement | null
    if (selectedSuggestion) {
      const value = selectedSuggestion.getAttribute("data-value")
      if (value) {
        insertValue(value, activeElement, container)
      }
    }
  }

  function updateSelectedSuggestionIndex(index: number) {
    selectedSuggestionIndex = index
  }

  function filterSuggestions() {
    const filteredSuggestions = fuzzySearch(filterText, suggestions)
    populateSuggestions(suggestionList, filteredSuggestions, activeElement, container)
  }

  populateSuggestions(suggestionList, suggestions, activeElement, container)

  // Create a shadow root and attach it to the popup container
  const shadowRoot = container.attachShadow({ mode: "open" })

  // Create a style element and set its content to the CSS styles
  const styleElement = document.createElement("style")
  styleElement.textContent = cssStyles

  // Append the style element, input field, and suggestion list to the shadow root
  shadowRoot.appendChild(styleElement)
  shadowRoot.appendChild(inputField)
  shadowRoot.appendChild(suggestionList)

  // Append the popup container to the document body
  document.body.appendChild(container)

  const position = calculatePosition(activeElement.getBoundingClientRect(), container)
  container.style.left = `${position.left}px`
  container.style.top = `${position.top}px`

  inputField.focus()
}
