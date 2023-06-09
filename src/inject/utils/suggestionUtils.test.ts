import { fuzzySearch } from "./suggestionUtils"

describe("fuzzySearch", () => {
  const suggestions = [
    { id: 1, label: "apple", value: "fruit" },
    { id: 2, label: "banana", value: "fruit" },
    { id: 3, label: "carrot", value: "vegetable" },
    { id: 4, label: "dog", value: "animal" }
  ]

  it("should return matched suggestions when query matches label or value", () => {
    const query = "le"
    const result = fuzzySearch(query, suggestions)
    expect(result).toEqual([
      { id: 1, label: "apple", value: "fruit" },
      { id: 3, label: "carrot", value: "vegetable" }
    ])
  })

  it("should return matched suggestions when query matches partially", () => {
    const query = "an"
    const result = fuzzySearch(query, suggestions)
    expect(result).toEqual([
      { id: 2, label: "banana", value: "fruit" },
      { id: 4, label: "dog", value: "animal" }
    ])
  })

  it("should return empty array when query does not match any suggestions", () => {
    const query = "zoo"
    const result = fuzzySearch(query, suggestions)
    expect(result).toEqual([])
  })
})
