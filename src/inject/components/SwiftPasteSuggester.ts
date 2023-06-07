import cssStyles from "../styles/popupStyles"
import { createObserver } from "../utils/domUtils"
import { calculatePosition } from "../utils/positionUtils"
import { selectPreviousSuggestion, selectNextSuggestion, fuzzySearch } from "../utils/suggestionUtils"
import Container from "./Container"
import InputField from "./InputField"
import SuggestionList from "./SuggestionList"

export default class SwiftPasteSuggester {
  activeElement: HTMLInputElement | HTMLTextAreaElement
  rootContainer: HTMLElement
  container: HTMLElement
  inputField: HTMLInputElement
  suggestionList: HTMLDivElement
  suggestions: Suggestion[]
  disconnectObserver: Function | null = null
  selectedSuggestionIndex = 0
  filterText = ""

  constructor(suggestions: Suggestion[], activeElement: HTMLInputElement | HTMLTextAreaElement) {
    this.activeElement = activeElement
    this.disconnectObserver
    this.selectedSuggestionIndex = 0
    this.filterText = ""
    this.suggestions = suggestions

    this.rootContainer = document.createElement("div")
    this.rootContainer.classList.add("SwiftPaste")
    this.container = Container()
    this.inputField = InputField()
    this.suggestionList = SuggestionList()

    this.inputField.addEventListener("input", this.handleInputChange.bind(this))
    this.container.addEventListener("keydown", this.handlePopupKeyDown.bind(this))

    this.inputField.addEventListener("focusout", this.handleInputFocusOut.bind(this))
    document.addEventListener("click", this.handleDocumentClickOutside.bind(this), { once: true })

    this.updateSelectedSuggestionIndex = this.updateSelectedSuggestionIndex.bind(this)

    this.populateSuggestionList(this.suggestions)

    const shadowRoot = this.rootContainer.attachShadow({ mode: "open" })
    const styleElement = document.createElement("style")
    styleElement.textContent = cssStyles

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElement.getBoundingClientRect(), this.container)

    shadowRoot.appendChild(styleElement)
    shadowRoot.appendChild(this.container)

    if (expandsUpward) {
      this.container.appendChild(this.suggestionList)
      this.container.appendChild(this.inputField)
      this.container.style.left = `${offsetX}px`
      this.container.style.bottom = `${offsetY}px`
    } else {
      this.container.appendChild(this.inputField)
      this.container.appendChild(this.suggestionList)
      this.container.style.left = `${offsetX}px`
      this.container.style.top = `${offsetY}px`
    }

    document.body.appendChild(this.rootContainer)
    this.disconnectObserver = createObserver(this.activeElement, this.removeRoot)

    this.inputField.focus()
  }

  handleInputFocusOut(event) {
    this.handleFocusOut(event.target as Node)
  }

  handleDocumentClickOutside(event: MouseEvent) {
    this.handleFocusOut(event.target as Node)
  }

  handleFocusOut(target: Node) {
    if (!this.rootContainer.contains(target)) {
      this.removeRoot(false)
    }
  }

  handleInputChange(event) {
    event.preventDefault()
    this.filterText = this.inputField.value.toLowerCase()
    this.filterSuggestions()
  }

  handlePopupKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "Escape":
        this.removeRoot()
        event.preventDefault()
        break
      case "Enter":
        this.handleSuggestionSelection()
        event.preventDefault()
        break
      case "ArrowUp":
        selectPreviousSuggestion(this)
        event.preventDefault()
        break
      case "ArrowDown":
        selectNextSuggestion(this)
        event.preventDefault()
        break
    }
  }

  handleSuggestionSelection() {
    const selectedSuggestion = this.suggestionList.querySelector(".swiftPastePopup__suggestion.selected") as HTMLDivElement | null
    if (selectedSuggestion) {
      const value = selectedSuggestion.getAttribute("data-value")
      if (value) {
        this.replaceValue(value)
        this.removeRoot()
      }
    }
  }

  updateSelectedSuggestionIndex(index: number) {
    this.selectedSuggestionIndex = index
  }

  filterSuggestions() {
    const filteredSuggestions = fuzzySearch(this.filterText, this.suggestions)
    this.populateSuggestionList(filteredSuggestions)
  }

  populateSuggestionList(suggestions: Suggestion[]) {
    this.suggestionList.innerHTML = ""
    suggestions.forEach((suggestion, index) => {
      const suggestionElement = document.createElement("div")
      suggestionElement.classList.add("swiftPastePopup__suggestion")
      suggestionElement.textContent = suggestion.label
      suggestionElement.setAttribute("data-value", suggestion.value)
      suggestionElement.addEventListener("mouseenter", () => {
        const selectedSuggestion = this.suggestionList.querySelector(".swiftPastePopup__suggestion.selected")
        if (selectedSuggestion) {
          selectedSuggestion.classList.remove("selected")
        }
        suggestionElement.classList.add("selected")
      })
      suggestionElement.addEventListener("click", () => {
        const value = suggestionElement.getAttribute("data-value")
        if (value) {
          this.replaceValue(value)
          this.removeRoot()
        }
      })
      if (index === 0) {
        suggestionElement.classList.add("selected")
      }
      this.suggestionList.appendChild(suggestionElement)
    })
  }

  replaceValue(value: string) {
    this.activeElement.value = value
    this.activeElement.focus()
  }

  removeRoot(focusActiveElement: boolean = true) {
    if (this.rootContainer.parentElement) {
      document.body.removeChild(this.rootContainer)
    }

    if (this.disconnectObserver) {
      this.disconnectObserver()
    }

    if (focusActiveElement) {
      this.activeElement.focus()
    }
  }
}
