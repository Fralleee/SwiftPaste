export function createPopupContainer(position: DOMRect): HTMLDivElement {
  const popupContainer = document.createElement("div")
  popupContainer.classList.add("swiftPastePopup__container")
  popupContainer.style.position = "fixed"
  popupContainer.style.left = `${position.left}px`
  popupContainer.style.top = `${position.top}px`
  popupContainer.style.zIndex = "9999" // Set a higher z-index value
  return popupContainer
}

export function createInputField(): HTMLInputElement {
  const inputField = document.createElement("input")
  inputField.type = "text"
  inputField.classList.add("swiftPastePopup__input")
  inputField.placeholder = "Filter suggestions"
  return inputField
}

export function createSuggestionList(): HTMLDivElement {
  const suggestionList = document.createElement("div")
  suggestionList.classList.add("swiftPastePopup__suggestions")
  return suggestionList
}
