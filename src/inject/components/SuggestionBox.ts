import cssStyles from "../styles/popupStyles"
import { removeRoot, replaceValue, populateSuggestionList, createObserver } from "../utils/domUtils"
import { calculatePosition } from "../utils/positionUtils"
import { selectPreviousSuggestion, selectNextSuggestion, fuzzySearch } from "../utils/suggestionUtils"
import Container from "./Container"
import InputField from "./InputField"
import SuggestionList from "./SuggestionList"

export function SuggestionBox(suggestions: Suggestion[], activeElement: HTMLInputElement | HTMLTextAreaElement) {
  const rootContainer = document.createElement("div")
  rootContainer.classList.add("SwiftPaste")
  const container = Container()
  const inputField = InputField()
  const suggestionList = SuggestionList()

  let disconnectObserver
  let selectedSuggestionIndex = 0
  let filterText = ""

  inputField.addEventListener("input", handleInputChange)
  container.addEventListener("keydown", handlePopupKeyDown)
  document.addEventListener("click", handleDocumentClickOutside)

  function handleInputChange(event) {
    event.preventDefault()
    filterText = inputField.value.toLowerCase()
    filterSuggestions()
  }

  function handlePopupKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "Escape":
        removeRoot(rootContainer, disconnectObserver)
        event.preventDefault()
        break
      case "Enter":
        handleSuggestionSelection()
        event.preventDefault()
        break
      case "ArrowUp":
        selectPreviousSuggestion(suggestionList, selectedSuggestionIndex, updateSelectedSuggestionIndex)
        event.preventDefault()
        break
      case "ArrowDown":
        selectNextSuggestion(suggestionList, selectedSuggestionIndex, updateSelectedSuggestionIndex)
        event.preventDefault()
        break
    }
  }

  function handleDocumentClickOutside(event: MouseEvent) {
    if (!rootContainer.contains(event.target as Node)) {
      removeRoot(rootContainer, disconnectObserver)
    }
  }

  function handleSuggestionSelection() {
    const selectedSuggestion = suggestionList.querySelector(".swiftPastePopup__suggestion.selected") as HTMLDivElement | null
    if (selectedSuggestion) {
      const value = selectedSuggestion.getAttribute("data-value")
      if (value) {
        replaceValue(value, activeElement)
        removeRoot(rootContainer, disconnectObserver)
      }
    }
  }

  function updateSelectedSuggestionIndex(index: number) {
    selectedSuggestionIndex = index
  }

  function filterSuggestions() {
    const filteredSuggestions = fuzzySearch(filterText, suggestions)
    populateSuggestionList(suggestionList, filteredSuggestions, activeElement, rootContainer)
  }

  populateSuggestionList(suggestionList, suggestions, activeElement, rootContainer)

  const shadowRoot = rootContainer.attachShadow({ mode: "open" })
  const styleElement = document.createElement("style")
  styleElement.textContent = cssStyles

  const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElement.getBoundingClientRect(), container)

  shadowRoot.appendChild(styleElement)
  shadowRoot.appendChild(container)

  if (expandsUpward) {
    container.appendChild(suggestionList)
    container.appendChild(inputField)
    container.style.left = `${offsetX}px`
    container.style.bottom = `${offsetY}px`
  } else {
    container.appendChild(inputField)
    container.appendChild(suggestionList)
    container.style.left = `${offsetX}px`
    container.style.top = `${offsetY}px`
  }

  document.body.appendChild(rootContainer)
  disconnectObserver = createObserver(activeElement, removeRoot, rootContainer)

  inputField.focus()
}
