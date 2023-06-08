import SwiftPasteSuggester from "./components/SwiftPasteSuggester"
import { isValidElement } from "./utils/domUtils"

activateSwiftPasteSuggester()

function activateSwiftPasteSuggester() {
  const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
  if (!activeElement || activeElement === document.body || !isValidElement(activeElement)) {
    return
  }

  chrome.storage.sync.get("swiftPasteSuggestions", result => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message)
      return
    }
    const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
    new SwiftPasteSuggester(suggestions, activeElement)
  })
}
