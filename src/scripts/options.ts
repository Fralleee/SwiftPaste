import { renderDropdown } from "./components/dropdown"
;(document.getElementById("optionsForm") as HTMLFormElement).addEventListener("submit", e => {
  e.preventDefault()
  let myOption = (e.target as HTMLFormElement).myOption.checked
  chrome.storage.sync.set({ myOption: myOption })
})

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get("myOption", data => {
    const dropdownContainer = document.getElementById("dropdownContainer")

    if (!dropdownContainer) {
      console.error("Could not find #dropdownContainer")
      return
    }

    const dropdownOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ]

    renderDropdown(dropdownContainer, dropdownOptions)
    ;(document.getElementById("myOption") as HTMLInputElement).checked = data.myOption
  })
})
