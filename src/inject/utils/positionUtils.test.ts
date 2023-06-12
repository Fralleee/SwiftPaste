import { calculatePosition } from "./positionUtils"

describe("calculatePosition", () => {
  it("should calculate position when popup fits to the right", () => {
    const activeElementPosition = { top: 100, right: 200, bottom: 120, left: 180, width: 200, height: 20 } as DOMRect
    const windowWidth = 1920
    const windowHeight = 1080

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElementPosition, windowWidth, windowHeight)

    const expectedOffsetX = activeElementPosition.right + 4
    const expectedOffsetY = activeElementPosition.top
    const expectedExpandsUpward = false

    expect(offsetX).toBe(expectedOffsetX)
    expect(offsetY).toBe(expectedOffsetY)
    expect(expandsUpward).toBe(expectedExpandsUpward)
  })

  it("should calculate position when popup does not fit to the right", () => {
    const activeElementPosition = { top: 100, right: 1890, bottom: 120, left: 960, width: 200, height: 20 } as DOMRect
    const windowWidth = 1920
    const windowHeight = 1080
    const margin = 4
    const popupWidth = 280

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElementPosition, windowWidth, windowHeight)

    const expectedOffsetX = activeElementPosition.left - margin - popupWidth
    const expectedOffsetY = activeElementPosition.top
    const expectedExpandsUpward = false

    expect(offsetX).toBe(expectedOffsetX)
    expect(offsetY).toBe(expectedOffsetY)
    expect(expandsUpward).toBe(expectedExpandsUpward)
  })

  it("should calculate position when popup does not fit below", () => {
    const activeElementPosition = { top: 980, right: 200, bottom: 500, left: 180, width: 200, height: 20 } as DOMRect
    const windowWidth = 1920
    const windowHeight = 1080
    const popupMaxHeight = 300

    const { offsetX, offsetY, expandsUpward } = calculatePosition(activeElementPosition, windowWidth, windowHeight)

    const expectedOffsetX = activeElementPosition.right + 4
    const expectedOffsetY = windowHeight - activeElementPosition.bottom
    const expectedExpandsUpward = true

    expect(offsetX).toBe(expectedOffsetX)
    expect(offsetY).toBe(expectedOffsetY)
    expect(expandsUpward).toBe(expectedExpandsUpward)
  })
})
