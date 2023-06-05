import { isValidElement } from "./utils"
import { SuggestionBox } from "./components/SuggestionBox"

window.addEventListener("keydown", activateSuggestionBox)

function activateSuggestionBox(event: KeyboardEvent) {
  if (event.ctrlKey && event.code === "Space") {
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
      SuggestionBox(suggestions, activeElement)
    })
  }
}
