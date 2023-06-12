import cssStyles from "../styles/popupStyles"
import { createObserver, getAdjacentFocusableElement, isValidNonEditableElement } from "../utils/domUtils"
import { calculatePosition } from "../utils/positionUtils"
import { selectPreviousSuggestion, selectNextSuggestion, fuzzySearch } from "../utils/suggestionUtils"
import Container from "./Container"
import InputField from "./InputField"
import SuggestionList from "./SuggestionList"

export default class SwiftPasteSuggester {
  activeElement: HTMLInputElement | HTMLTextAreaElement
  rootContainer: HTMLElement
  container: HTMLElement
  inputWrapper: HTMLDivElement
  inputField: HTMLInputElement
  suggestionList: HTMLUListElement
  suggestions: Suggestion[]
  isUnmounting: boolean = false
  disconnectObserver: Function | null = null
  boundHandlePopupKeyDown: (event: KeyboardEvent) => void
  boundHandleDocumentClickOutside: (event: MouseEvent) => void
  selectedSuggestionIndex = 0
  filterText = ""

  constructor(suggestions: Suggestion[], activeElement: HTMLInputElement | HTMLTextAreaElement) {
    this.activeElement = activeElement
    this.suggestions = suggestions

    this.rootContainer = document.createElement("div")
    this.rootContainer.classList.add("SwiftPaste")
    this.container = Container()
    ;({ wrapperDiv: this.inputWrapper, inputField: this.inputField } = InputField())

    this.suggestionList = SuggestionList()

    this.inputField.addEventListener("input", this.handleInputChange.bind(this))
    this.rootContainer.addEventListener("focusout", this.handleRootContainerFocusOut.bind(this))

    this.boundHandlePopupKeyDown = this.handlePopupKeyDown.bind(this)
    document.addEventListener("keydown", this.boundHandlePopupKeyDown)

    this.boundHandleDocumentClickOutside = this.handleDocumentClickOutside.bind(this)
    document.addEventListener("click", this.boundHandleDocumentClickOutside)

    this.updateSelectedSuggestionIndex = this.updateSelectedSuggestionIndex.bind(this)

    this.populateSuggestionList(this.suggestions)

    const shadowRoot = this.rootContainer.attachShadow({ mode: "open" })
    const styleElement = document.createElement("style")
    styleElement.textContent = cssStyles

    const { offsetX, offsetY, expandsUpward, origin } = calculatePosition(activeElement.getBoundingClientRect())
    this.container.style.transformOrigin = origin.join(" ")

    shadowRoot.appendChild(styleElement)
    shadowRoot.appendChild(this.container)
    this.container.appendChild(this.suggestionList)
    this.container.appendChild(this.inputWrapper)

    if (expandsUpward) {
      this.container.classList.add("up")
      this.container.style.left = `${offsetX}px`
      this.container.style.bottom = `${offsetY}px`
    } else {
      this.container.style.left = `${offsetX}px`
      this.container.style.top = `${offsetY}px`
    }

    document.body.appendChild(this.rootContainer)
    this.inputField.focus()
  }

  handleDocumentClickOutside(event) {
    if (event.target instanceof HTMLElement) {
      if (!this.rootContainer.contains(event.target)) {
        this.removeRoot()
      }
    }
  }

  handleRootContainerFocusOut() {
    this.removeRoot(false)
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
      case "Tab":
        const direction = event.shiftKey ? "previous" : "next"
        var adjacentFocusableElement = getAdjacentFocusableElement(this.activeElement, direction)
        if (adjacentFocusableElement) {
          adjacentFocusableElement.focus()
        } else {
          this.rootContainer.blur()
        }
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
      case "Backspace":
        const cursorPosition = this.inputField.selectionStart
        if (cursorPosition > 0) {
          const newValue = this.inputField.value.substring(0, cursorPosition - 1) + this.inputField.value.substring(cursorPosition)
          this.inputField.value = newValue
          this.inputField.setSelectionRange(cursorPosition - 1, cursorPosition - 1)

          const inputEvent = new InputEvent("input", event)
          this.inputField.dispatchEvent(inputEvent)
        }
        event.preventDefault()
        break
      default:
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
          const char = event.key
          if (/[a-zA-Z0-9-_ ]/.test(char)) {
            const cursorPosition = this.inputField.selectionStart
            const newValue = this.inputField.value.substring(0, cursorPosition) + char + this.inputField.value.substring(cursorPosition)
            this.inputField.value = newValue
            this.inputField.setSelectionRange(cursorPosition + 1, cursorPosition + 1)

            const inputEvent = new InputEvent("input", event)
            this.inputField.dispatchEvent(inputEvent)

            event.preventDefault()
          }
        }
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
      const suggestionElement = document.createElement("li")
      suggestionElement.classList.add("swiftPastePopup__suggestion")

      const labelDiv = document.createElement("div")
      labelDiv.classList.add("label")
      labelDiv.textContent = suggestion.label
      suggestionElement.appendChild(labelDiv)

      const valueDiv = document.createElement("div")
      valueDiv.classList.add("value")
      valueDiv.textContent = suggestion.value
      suggestionElement.appendChild(valueDiv)

      suggestionElement.setAttribute("data-value", suggestion.value)
      suggestionElement.addEventListener("mouseenter", () => {
        const selectedSuggestion = this.suggestionList.querySelector(".swiftPastePopup__suggestion.selected")
        if (selectedSuggestion) {
          selectedSuggestion.classList.remove("selected")
        }
        suggestionElement.classList.add("selected")
      })
      suggestionElement.addEventListener("mousedown", event => {
        const value = suggestionElement.getAttribute("data-value")
        if (value) {
          this.replaceValue(value)
          this.removeRoot()
        }
        event.preventDefault()
      })
      if (index === 0) {
        suggestionElement.classList.add("selected")
      }
      this.suggestionList.appendChild(suggestionElement)
    })
  }

  replaceValue(value: string) {
    const element = this.activeElement
    element.focus()

    if (!document.execCommand("insertText", false, value)) {
      // this.replaceValueFallback(value)
    }
  }

  replaceValueFallback(value: string) {
    const element = this.activeElement
    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i)
      const eventOptions = {
        key: char,
        keyCode: char.charCodeAt(0),
        which: char.charCodeAt(0),
        bubbles: true,
        cancelable: true
      }

      const keydownEvent = new KeyboardEvent("keydown", eventOptions)
      element.dispatchEvent(keydownEvent)

      const keypressEvent = new KeyboardEvent("keypress", eventOptions)
      element.dispatchEvent(keypressEvent)

      if (element.isContentEditable) {
        element.innerHTML += char
      } else {
        element.value += char
      }

      const inputEvent = new InputEvent("input", eventOptions)
      element.dispatchEvent(inputEvent)

      const keyupEvent = new KeyboardEvent("keyup", eventOptions)
      element.dispatchEvent(keyupEvent)
    }

    if (element.isContentEditable) {
      const range = document.createRange()
      const sel = window.getSelection()
      range.selectNodeContents(element)
      range.collapse(false) // false means to the end of the range
      sel.removeAllRanges()
      sel.addRange(range)
    }

    const changeEvent = new Event("change", { bubbles: true, cancelable: true })
    element.dispatchEvent(changeEvent)
  }

  removeRoot(focusActiveElement: boolean = true) {
    if (this.isUnmounting) {
      return
    }

    if (this.rootContainer && this.rootContainer.parentElement && this.rootContainer.parentElement.contains(this.rootContainer)) {
      this.isUnmounting = true
      this.rootContainer.parentElement.removeChild(this.rootContainer)
    }

    if (this.disconnectObserver) {
      this.disconnectObserver()
    }

    document.removeEventListener("keydown", this.boundHandlePopupKeyDown)
    document.removeEventListener("click", this.boundHandleDocumentClickOutside)

    if (focusActiveElement) {
      this.activeElement.focus()
    }
  }
}
