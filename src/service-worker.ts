const swiftPasteSuggestions = [
  { label: "Name", value: "Roland Chelwing-Grzybowski" },
  { label: "Email", value: "jolleee@hotmail.com" },
  { label: "Company", value: "Stack Overflow" },
  { label: "LinkedIn profile", value: "https://www.linkedin.com/in/fralle" },
  { label: "GitHub profile", value: "https://www.github.com/fralleee" }
]

chrome.storage.sync.set({ swiftPasteSuggestions }).then(() => {
  console.log("Value is set")
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.scripting.executeScript({ target: { tabId }, files: ["inject.js"] }).catch(error => {
      console.log(`Could not execute script: ${error}`)
    })
  }
})
