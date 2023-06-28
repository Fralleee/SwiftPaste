import { syncStorage } from "./utils/chrome"

chrome.runtime.onInstalled.addListener(_ => {
  chrome.alarms.get("syncData", alarm => {
    if (!alarm) {
      chrome.alarms.create("syncData", { periodInMinutes: 10 })
    }
  })
})

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "syncData") {
    syncStorage()
  }
})

chrome.commands.onCommand.addListener((_, tab) => {
  chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["inject.js"] }).catch(error => {
    console.log(`Could not execute script: ${error}`)
  })
})
