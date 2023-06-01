// document.getElementById("addContextForm").addEventListener("submit", e => {
//   e.preventDefault();
//   let context = e.target.elements.context.value;
//   chrome.runtime.sendMessage({ command: "addContext", context: context });
// });

// document.getElementById("addSnippetForm").addEventListener("submit", e => {
//   e.preventDefault();
//   let context = e.target.elements.context.value;
//   let snippet = e.target.elements.snippet.value;
//   chrome.runtime.sendMessage({ command: "addSnippet", context: context, snippet: snippet });
// });

// // When the popup is opened, get the snippets for the currently selected context
// chrome.runtime.sendMessage({ command: "getSnippets", context: "default" }, snippets => {
//   for (let snippet of snippets) {
//     let li = document.createElement("li");
//     li.textContent = snippet;
//     document.getElementById("snippetsList").appendChild(li);
//   }
// });

;(document.getElementById("options-btn") as HTMLButtonElement).addEventListener("click", () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL("options.html"))
  }
})
