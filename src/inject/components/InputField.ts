export default function InputField(): HTMLInputElement {
  const inputField = document.createElement("input")
  inputField.type = "text"
  inputField.classList.add("swiftPastePopup__input")
  return inputField
}
