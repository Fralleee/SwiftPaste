interface Message {
  command: string
  context?: string
  snippet?: string
}

chrome.runtime.onMessage.addListener((message: Message, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.command === "addContext" && message.context) {
    addContext(message.context)
  } else if (message.command === "addSnippet" && message.context && message.snippet) {
    addSnippet(message.context, message.snippet)
  } else if (message.command === "getSnippets" && message.context) {
    getSnippets(message.context).then(snippets => sendResponse(snippets))
  }
  // ... handle other commands ...
  return true // to enable asynchronous sendResponse
})

function addContext(context: string): void {
  // TODO: implement adding a context to the storage
}

function addSnippet(context: string, snippet: string): void {
  // TODO: implement adding a snippet to a context in the storage
}

async function getSnippets(context: string): Promise<any[]> {
  // TODO: implement getting snippets from a context in the storage
  return []
}
