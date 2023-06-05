export function selectPreviousSuggestion(
  suggestionList: HTMLDivElement,
  selectedSuggestionIndex: number,
  updateIndex: (index: number) => void
) {
  const suggestionItems = suggestionList.querySelectorAll<HTMLElement>(".swiftPastePopup__suggestion")
  const selectedIndex = Math.max(selectedSuggestionIndex - 1, 0)
  updateIndex(selectedIndex)
  selectSuggestion(suggestionItems, selectedIndex)
}

export function selectNextSuggestion(
  suggestionList: HTMLDivElement,
  selectedSuggestionIndex: number,
  updateIndex: (index: number) => void
) {
  const suggestionItems = suggestionList.querySelectorAll<HTMLElement>(".swiftPastePopup__suggestion")
  const selectedIndex = Math.min(selectedSuggestionIndex + 1, suggestionItems.length - 1)
  updateIndex(selectedIndex)
  selectSuggestion(suggestionItems, selectedIndex)
}

function selectSuggestion(suggestionItems: NodeListOf<HTMLElement>, selectedIndex: number) {
  suggestionItems.forEach((suggestionItem, index) => {
    if (index === selectedIndex) {
      suggestionItem.classList.add("selected")
    } else {
      suggestionItem.classList.remove("selected")
    }
  })
}
