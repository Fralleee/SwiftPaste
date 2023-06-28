import logger from "../shared/logger"
import SwiftPasteSuggester from "./components/SwiftPasteSuggester"
import { isValidElement } from "./utils/domUtils"

removePreviousSwiftPasteInstances()
activateSwiftPasteSuggester()

interface SwiftPasteEnabledOptions {
  extensionDisabled: boolean
}

async function activateSwiftPasteSuggester() {
  try {
    const result: SwiftPasteEnabledOptions = await new Promise((resolve, reject) => {
      chrome.storage.sync.get("extensionDisabled", result => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(result as SwiftPasteEnabledOptions)
        }
      })
    })

    if (result.extensionDisabled) {
      logger.log("SwiftPaste extension is currently disabled globally.")
      return
    }
  } catch (error) {
    logger.error("Error during sync.get:", error.message)
    return
  }

  const activeElement = document.activeElement as HTMLElement
  if (!isValidElement(activeElement)) {
    logger.log("No valid active element. Exiting activation process...")
    return
  }

  chrome.storage.sync.get("swiftPasteSuggestions", result => {
    if (chrome.runtime.lastError) {
      logger.error("Error during sync.get:", chrome.runtime.lastError.message)
      return
    }
    const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
    new SwiftPasteSuggester(suggestions, activeElement as HTMLInputElement | HTMLTextAreaElement)
  })
}

function removePreviousSwiftPasteInstances() {
  try {
    let elements = Array.from(document.querySelectorAll(".SwiftPaste"))
    elements.forEach(element => {
      element.parentNode.removeChild(element)
    })

    if (elements.length > 0) {
      logger.log(`Removed ${elements.length} SwiftPaste instances.`)
    }
  } catch (exception) {
    logger.log(exception)
  }
}
