export function calculatePosition(
  activeElementPosition: DOMRect,
  popupElement: HTMLElement
): { offsetX: number; offsetY: number; expandsUpward: boolean } {
  const margin = 4
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const popupWidth = 220
  const popupMaxHeight = 300

  let expandsUpward = false
  let left = activeElementPosition.right + margin
  let top = activeElementPosition.top
  let bottom = windowHeight - activeElementPosition.bottom

  // Adjust position if popup will be off screen
  if (left + popupWidth > windowWidth) {
    // If popup does not fit to the right, place it to the left
    left = activeElementPosition.left - margin - popupWidth
  }

  if (top + popupMaxHeight > windowHeight) {
    // If popup does not fit below, place it above
    top = bottom
    expandsUpward = true
  }

  return { offsetX: left, offsetY: top, expandsUpward }
}
