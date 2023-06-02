import { FunctionComponent, useEffect } from "react"

export const ContentScript: FunctionComponent = () => {
  useEffect(() => {
    const messageListener = (request, sender, sendResponse) => {
      if (request.command === "swiftPaste") {
        const activeElement = document.activeElement as HTMLElement
        if (!activeElement || activeElement === document.body) {
          return
        }

        const text = request.data
        const isInputElement = activeElement.tagName === "INPUT"
        const isTextAreaElement = activeElement.tagName === "TEXTAREA"
        const isContentEditable = activeElement.isContentEditable

        if (isInputElement || isTextAreaElement) {
          ;(activeElement as HTMLInputElement).value += text
        } else if (isContentEditable) {
          activeElement.textContent += text
        }
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [])

  return null
}
