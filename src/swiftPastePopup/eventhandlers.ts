import { activatePopup } from "./index"

export function handleCtrlSpaceKeyDown(event: KeyboardEvent) {
  console.log("KEY")
  if (event.ctrlKey && event.code === "Space") {
    const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
    if (!activeElement || activeElement === document.body || !isValidElement(activeElement)) {
      return
    }

    const position = calculateElementPosition(activeElement)

    chrome.storage.sync.get("swiftPasteSuggestions", result => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        return
      }
      const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
      activatePopup(suggestions, position, activeElement)
    })
  }
}

function isValidElement(element: HTMLInputElement | HTMLTextAreaElement): boolean {
  const elementTagName = element.tagName
  const isInputElement = elementTagName === "INPUT"
  const isTextAreaElement = elementTagName === "TEXTAREA"
  const isContentEditable = element.isContentEditable
  return isInputElement || isTextAreaElement || isContentEditable
}

function calculateElementPosition(element: Element): DOMRect {
  const rect = element.getBoundingClientRect()
  return {
    left: rect.right,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    toJSON: () => ({})
  }
}
