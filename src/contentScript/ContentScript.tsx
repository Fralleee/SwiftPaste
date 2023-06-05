import React, { FunctionComponent, useEffect } from "react"

export const ContentScript: FunctionComponent = () => {
  // useEffect(() => {
  //   const handleKeyDown = event => {
  //     if (event.ctrlKey && event.code === "Space") {
  //       const activeElement = document.activeElement as HTMLElement
  //       if (!activeElement || activeElement === document.body) {
  //         return
  //       }

  //       const isInputElement = activeElement.tagName === "INPUT"
  //       const isTextAreaElement = activeElement.tagName === "TEXTAREA"
  //       const isContentEditable = activeElement.isContentEditable
  //       const isValidElement = isInputElement || isTextAreaElement || isContentEditable

  //       if (!isValidElement) {
  //         return
  //       }

  //       chrome.storage.sync.get("swiftPasteSuggestions", function (result) {
  //         console.log(result)
  //       })
  //     }
  //   }

  //   window.addEventListener("keydown", handleKeyDown)

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown)
  //   }
  // }, [])

  return null
}
