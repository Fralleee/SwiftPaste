import logger from "../shared/logger"
import SwiftPasteSuggester from "./components/SwiftPasteSuggester"
import { isValidElement } from "./utils/domUtils"

removePreviousSwiftPasteInstances()
activateSwiftPasteSuggester()

function activateSwiftPasteSuggester() {
  const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
  if (!activeElement || activeElement === document.body || !isValidElement(activeElement)) {
    logger.log("No valid active element. Exiting activation process...")
    return
  }

  chrome.storage.sync.get("swiftPasteSuggestions", result => {
    if (chrome.runtime.lastError) {
      logger.error("Error during sync.get:", chrome.runtime.lastError.message)
      return
    }
    const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
    new SwiftPasteSuggester(suggestions, activeElement)
  })
}

function removePreviousSwiftPasteInstances() {
  let elements = Array.from(document.querySelectorAll(".SwiftPaste"))
  elements.forEach(element => {
    element.parentNode.removeChild(element)
  })

  if (elements.length > 0) {
    logger.log(`Removed ${elements.length} SwiftPaste instances.`)
  }
}
