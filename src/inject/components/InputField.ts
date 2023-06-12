export default function InputField() {
  const inputField = document.createElement("input")
  const searchIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  const wrapperDiv = document.createElement("div")

  // Define your input field
  inputField.type = "text"
  inputField.classList.add("swiftPastePopup__input")

  // Define your search icon
  searchIcon.setAttribute("height", "24")
  searchIcon.setAttribute("viewBox", "0 0 24 24")
  searchIcon.setAttribute("width", "24")

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path1.setAttribute("d", "M0 0h24v24H0z")
  path1.setAttribute("fill", "none")

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path2.setAttribute("d", "M10 2a8 8 0 016.32 12.906l4.282 4.282-1.414 1.414-4.257-4.257A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z")

  searchIcon.appendChild(path1)
  searchIcon.appendChild(path2)

  // Define your wrapper div
  wrapperDiv.classList.add("input-wrapper")

  // Append the input field and the search icon to the wrapper div
  wrapperDiv.appendChild(searchIcon)
  wrapperDiv.appendChild(inputField)

  // Return the wrapper div (which now contains your input field and search icon)
  return { wrapperDiv, inputField }
}
