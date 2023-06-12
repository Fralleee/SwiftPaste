export function isValidEditableElement(element: HTMLElement): boolean {
  const elementTagName = element.tagName
  const isInputElement = elementTagName === "INPUT"
  const isTextAreaElement = elementTagName === "TEXTAREA"
  const isContentEditable = element.isContentEditable || element.contentEditable === "true"
  return isInputElement || isTextAreaElement || isContentEditable
}

export function isValidNonEditableElement(element: HTMLElement): boolean {
  const elementTagName = element.tagName
  const isInputElement = elementTagName === "INPUT"
  const isTextAreaElement = elementTagName === "TEXTAREA"
  const isContentEditable = element.isContentEditable || element.contentEditable === "true"
  return !isInputElement && !isTextAreaElement && !isContentEditable
}

export function createObserver(activeElement: HTMLElement, removeRoot: Function) {
  // Start observing after rootContainer is added to document.body
  const observer = new MutationObserver(mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        // check if activeElement still exists in document
        if (!document.contains(activeElement)) {
          removeRoot()
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

export function getAdjacentFocusableElement(element: HTMLElement, direction: "next" | "previous"): HTMLElement | null {
  const focusableSelector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  const allFocusableElements = Array.from(document.querySelectorAll(focusableSelector))

  if (!allFocusableElements.length) {
    return null
  }

  // Wrap around the index if we're at the start/end of the array
  const currentIndex = allFocusableElements.indexOf(element)
  const adjacentIndex =
    direction === "next"
      ? (currentIndex + 1) % allFocusableElements.length
      : (currentIndex - 1 + allFocusableElements.length) % allFocusableElements.length

  return allFocusableElements[adjacentIndex] as HTMLElement
}
