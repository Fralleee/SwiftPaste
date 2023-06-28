export function isValidElement(element: HTMLElement): boolean {
  if (!element || element === document.body) {
    return false
  }
  const elementTagName = element.tagName
  const isInputElement = elementTagName === "INPUT"
  const isTextAreaElement = elementTagName === "TEXTAREA"
  const isContentEditable = element.isContentEditable || element.contentEditable === "true"
  return isInputElement || isTextAreaElement || isContentEditable
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
