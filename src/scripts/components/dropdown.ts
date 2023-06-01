interface Option {
  value: string
  label: string
}

export function renderDropdown(targetElement: HTMLElement, options: Option[]): void {
  const select = document.createElement("select")

  options.forEach(option => {
    const optionElement = document.createElement("option")
    optionElement.value = option.value
    optionElement.textContent = option.label
    select.appendChild(optionElement)
  })

  targetElement.appendChild(select)
}
