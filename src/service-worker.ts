chrome.runtime.onInstalled.addListener(function () {
  const parentId = "swiftPasteContext"
  let contexts: chrome.contextMenus.ContextType[] = ["page", "selection", "link", "editable", "image", "video", "audio"]

  chrome.contextMenus.create({
    title: " SwiftPaste",
    contexts: [...contexts],
    id: parentId
  })

  chrome.contextMenus.create({
    title: "1. Personal",
    contexts: [...contexts],
    id: "personal",
    parentId
  })

  chrome.contextMenus.create({
    title: "2. Work",
    contexts: [...contexts],
    id: "work",
    parentId
  })

  chrome.contextMenus.create({
    title: "1. Name",
    contexts: [...contexts],
    id: "name",
    parentId: "personal"
  })

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === parentId) {
      // Perform the action associated with the context menu item
    } else if (info.menuItemId === "personal") {
      console.log("personal")
      sendPasteMessage(tab!, "personal")
    } else if (info.menuItemId === "work") {
      console.log("work")
      sendPasteMessage(tab!, "work")
    } else if (info.menuItemId === "name") {
      console.log("name")
      sendPasteMessage(tab!, "name")
    }
  })

  const sendPasteMessage = (tab: chrome.tabs.Tab, value: string) => {
    chrome.tabs.sendMessage(tab.id!, { command: "swiftPaste", data: value })
  }
})
