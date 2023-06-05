export default function Container(): HTMLDivElement {
  const popupContainer = document.createElement("div")
  popupContainer.classList.add("swiftPastePopup__container")
  popupContainer.style.position = "fixed"
  popupContainer.style.zIndex = "2147483647" // Set a higher z-index value
  return popupContainer
}
