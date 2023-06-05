export function calculatePosition(
  activeElementPosition: DOMRect,
  popupElement: HTMLElement
): { offsetX: number; offsetY: number; expandsUpward: boolean } {
  const margin = 4 // buffer space in pixels between active element and popup
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const popupWidth = popupElement.offsetWidth
  const popupMaxHeight = 400

  let expandsUpward = false
  let left = activeElementPosition.right + margin
  let top = activeElementPosition.top
  let bottom = windowHeight - activeElementPosition.bottom

  // Adjust position if popup will be off screen
  if (left + popupWidth > windowWidth) {
    left = windowWidth - popupWidth - margin
  }

  if (top + popupMaxHeight > windowHeight) {
    // If popup does not fit below, place it above
    top = bottom
    expandsUpward = true
  }

  return { offsetX: left, offsetY: top, expandsUpward }
}
