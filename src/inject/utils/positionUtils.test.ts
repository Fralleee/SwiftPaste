import { calculatePosition } from "./positionUtils"

describe("calculatePosition", () => {
  it("should calculate position when popup fits to the right", () => {
    const activeElementPosition = { top: 100, right: 200, bottom: 120, left: 180, width: 20, height: 20 } as DOMRect

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElementPosition)

    expect(offsetX).toBe(204) // 200 (activeElement right) + 4 (margin)
    expect(offsetY).toBe(100) // top is unchanged
    expect(expandsUpward).toBe(false) // popup does not expand upward
  })

  it("should calculate position when popup does not fit to the right", () => {
    const activeElementPosition = { top: 100, right: 980, bottom: 120, left: 960, width: 20, height: 20 } as DOMRect

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElementPosition)

    expect(offsetX).toBe(736) // 960 (activeElement left) - 4 (margin) - 220 (popupWidth)
    expect(offsetY).toBe(100) // top is unchanged
    expect(expandsUpward).toBe(false) // popup does not expand upward
  })

  it("should calculate position when popup does not fit below", () => {
    const activeElementPosition = { top: 480, right: 200, bottom: 500, left: 180, width: 20, height: 20 } as DOMRect

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElementPosition)

    expect(offsetX).toBe(204) // 200 (activeElement right) + 4 (margin)
    expect(offsetY).toBe(268) // 480 (activeElement bottom) - 212 (popupMaxHeight)
    expect(expandsUpward).toBe(true) // popup expands upward
  })
})
