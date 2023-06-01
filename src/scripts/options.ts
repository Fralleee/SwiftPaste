import "@material/web/button/filled-button.js"
import "@material/web/button/outlined-button.js"
import "@material/web/checkbox/checkbox.js"
;(document.getElementById("optionsForm") as HTMLFormElement).addEventListener("submit", e => {
  e.preventDefault()
  let myOption = (e.target as HTMLFormElement).myOption.checked
  chrome.storage.sync.set({ myOption: myOption })
})
