export default function SuggestionList(): HTMLDivElement {
  const suggestionList = document.createElement("div")
  suggestionList.classList.add("swiftPastePopup__suggestions")
  return suggestionList
}
