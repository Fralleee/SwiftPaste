chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === "install") {
    chrome.storage.sync.get("swiftPasteSuggestions", result => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        return
      }
      const existingSuggestions = result.swiftPasteSuggestions || []
      if (existingSuggestions.length === 0) {
        const defaultSuggestions = [
          { label: "Name", value: "John Doe" },
          { label: "Email", value: "john_the_doe@gmail.com" },
          { label: "Website URL", value: "https://www.fralle.net" }
        ]
        chrome.storage.sync.set({ swiftPasteSuggestions: defaultSuggestions }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message)
            return
          }
          console.log("Default values have been set.")
        })
      }
    })
  }
})

chrome.commands.onCommand.addListener((command, tab) => {
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["inject.js"] }).catch(error => {
    console.log(`Could not execute script: ${error}`)
  })
})
