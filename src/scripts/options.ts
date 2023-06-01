;(document.getElementById("optionsForm") as HTMLFormElement).addEventListener("submit", e => {
  e.preventDefault()
  let myOption = (e.target as HTMLFormElement).myOption.checked
  chrome.storage.sync.set({ myOption: myOption })
})

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("myOption", data => {
    ;(document.getElementById("myOption") as HTMLInputElement).checked = data.myOption
  })
})
