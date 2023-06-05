export function calculatePosition(activeElementPosition: DOMRect, popupElement: HTMLElement): DOMRect {
  const buffer = 5 // buffer space in pixels between active element and popup
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const popupWidth = popupElement.offsetWidth
  const popupHeight = popupElement.offsetHeight

  let left = activeElementPosition.right + buffer
  let top = activeElementPosition.top

  // Adjust position if popup will be off screen
  if (left + popupWidth > windowWidth) {
    left = windowWidth - popupWidth - buffer
  }

  if (top + popupHeight > windowHeight) {
    top = windowHeight - popupHeight - buffer
  }

  const position = new DOMRect(left, top, popupWidth, popupHeight)
  return position
}
