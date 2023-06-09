export default function SuggestionList(): HTMLUListElement {
  const suggestionList = document.createElement("ul")
  suggestionList.classList.add("swiftPastePopup__suggestions")
  return suggestionList
}
