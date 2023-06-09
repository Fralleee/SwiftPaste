import { isValidElement } from "./domUtils"

describe("isValidElement", () => {
  it("should return true for input elements", () => {
    const inputElement = document.createElement("input")
    expect(isValidElement(inputElement)).toBe(true)
  })

  it("should return true for textarea elements", () => {
    const textareaElement = document.createElement("textarea")
    expect(isValidElement(textareaElement)).toBe(true)
  })

  it("should return true for elements with contentEditable=true", () => {
    const editableElement = document.createElement("div")
    editableElement.contentEditable = "true"
    expect(isValidElement(editableElement)).toBe(true)
  })

  it("should return false for elements with contentEditable=false", () => {
    const editableElement = document.createElement("div")
    editableElement.contentEditable = "false"
    expect(isValidElement(editableElement)).toBe(false)
  })
})
