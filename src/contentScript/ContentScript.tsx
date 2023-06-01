import React, { FunctionComponent, useEffect } from "react"

export const ContentScript: FunctionComponent = () => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.command === "swiftPaste") {
        const activeElement = document.activeElement as HTMLElement

        // If no activeElement or it is the <body> element, exit early
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
    })
  }, [])

  return null
}
