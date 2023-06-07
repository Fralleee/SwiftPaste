import SwiftPasteSuggester from "../components/SwiftPasteSuggester"

export function isValidElement(element: HTMLInputElement | HTMLTextAreaElement): boolean {
  const elementTagName = element.tagName
  const isInputElement = elementTagName === "INPUT"
  const isTextAreaElement = elementTagName === "TEXTAREA"
  const isContentEditable = element.isContentEditable
  return isInputElement || isTextAreaElement || isContentEditable
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
