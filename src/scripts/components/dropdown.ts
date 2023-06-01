class DropdownComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (!this.shadowRoot) return

    const options = JSON.parse(this.getAttribute("options") as string) || []

    const dropdown = document.createElement("select")
    dropdown.id = "dropdown"

    options.forEach((option: { value: string; label: string }) => {
      const optionElement = document.createElement("option")
      optionElement.value = option.value
      optionElement.textContent = option.label
      dropdown.appendChild(optionElement)
    })

    this.shadowRoot.innerHTML = `
      <style>
        /* Add your component styles here */
      </style>
    `
    this.shadowRoot.appendChild(dropdown)
  }
}

customElements.define("dropdown-component", DropdownComponent)
