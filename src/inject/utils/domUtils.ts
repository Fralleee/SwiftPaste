export function replaceValue(value: string, inputElement: HTMLInputElement | HTMLTextAreaElement) {
  inputElement.value = value
  inputElement.focus()
}

export function removeRoot(rootContainer: HTMLElement, activeElement: HTMLElement, disconnectObserver: Function | null) {
  if (rootContainer.parentElement) {
    document.body.removeChild(rootContainer)
  }

  if (disconnectObserver) {
    disconnectObserver()
  }

  activeElement.focus()
}

export function populateSuggestionList(
  suggestionList: HTMLDivElement,
  suggestions: Suggestion[],
  activeElement: HTMLInputElement | HTMLTextAreaElement,
  rootContainer: HTMLElement
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
        removeRoot(rootContainer, activeElement, null)
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

export function createObserver(
  activeElement: HTMLElement,
  removeRoot: (rootContainer: HTMLElement, activeElement: HTMLElement, disconnectObserver: Function | null) => void,
  rootContainer: HTMLElement
) {
  // Start observing after rootContainer is added to document.body
  const observer = new MutationObserver(mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        // check if activeElement still exists in document
        if (!document.contains(activeElement)) {
          removeRoot(rootContainer, activeElement, null)
          observer.disconnect() // Stop observing
          break
        }
      }
    }
  })

  // Configure to listen to child removals in the document
  observer.observe(document, { childList: true, subtree: true })

  // Function to stop observation
  const disconnect = () => {
    observer.disconnect()
  }

  return disconnect
}
