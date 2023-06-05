import React, { useCallback, useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { themeChange } from "theme-change"
import Sidebar from "./Sidebar"

const themes = [
  { label: "light", value: "pastel" },
  { label: "dark", value: "night" }
]

function Options() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isFormDirty, setFormDirty] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get("swiftPasteSuggestions", result => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        return
      }
      const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
      setSuggestions(suggestions)
    })
  }, [])

  useEffect(() => {
    themeChange(false)
  }, [])

  const handleDragEnd = event => {
    if (!event.destination) return

    let tempData = Array.from(suggestions)
    let [source_data] = tempData.splice(event.source.index, 1)
    tempData.splice(event.destination.index, 0, source_data)
    setSuggestions(tempData)
    setFormDirty(true)
  }

  const handleFieldChange = (field: "label" | "value", index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuggestions(prevSuggestions =>
      prevSuggestions.map((suggestion, i) => (i === index ? { ...suggestion, [field]: event.target.value } : suggestion))
    )
    setFormDirty(true)
  }

  const validateSuggestion = (suggestion: Suggestion): Suggestion | null => {
    if (suggestion.value && suggestion.label) {
      return suggestion
    }
    return null
  }

  const handleSaveButtonClick = () => {
    chrome.storage.sync.set({ swiftPasteSuggestions: suggestions.map(validateSuggestion).filter(Boolean) }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        return
      }
      setFormDirty(false)
    })
  }

  const handleResetButtonClick = () => {
    chrome.storage.sync.get("swiftPasteSuggestions", result => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message)
        return
      }
      const suggestions: Suggestion[] = result.swiftPasteSuggestions || []
      setSuggestions(suggestions)
      setFormDirty(false)
    })
  }

  const addSuggestion = () => {
    setSuggestions([...suggestions, { label: "", value: "" }])
    setFormDirty(true)
  }

  const removeSuggestion = (index: number) => {
    setSuggestions(suggestions.filter((_, i) => i !== index))
    setFormDirty(true)
  }

  const handleBeforeUnload = useCallback(
    event => {
      if (isFormDirty) {
        event.preventDefault()
        event.returnValue = "" // Needed for Chrome
      }
    },
    [isFormDirty]
  )

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <main className="prose relative ml-12 mt-8 px-4 flex-1 max-w-5xl ">
        <div className="absolute top-2 right-2">
          <input type="checkbox" className="toggle toggle-md" data-toggle-theme="pastel,night" data-act-class="ACTIVECLASS" />
        </div>
        <div className="flex gap-2">
          <button
            tabIndex={0}
            className={`btn btn-sm text-xs w-32 ${isFormDirty ? "btn-primary" : "btn-neutral"}`}
            onClick={handleSaveButtonClick}
            disabled={!isFormDirty}>
            Save changes
          </button>
          <button
            tabIndex={0}
            className={`btn btn-sm text-xs w-32 ${isFormDirty ? "btn-warning" : "btn-neutral"}`}
            onClick={handleResetButtonClick}
            disabled={!isFormDirty}>
            Reset
          </button>
        </div>
        <div className="mt-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th className="flex justify-center">Order</th>
                  <th>Label</th>
                  <th>Value</th>
                  <th className="flex justify-end mr-2">Action</th>
                </tr>
              </thead>
              <Droppable droppableId="droppable-1">
                {(provider, snapshot) => (
                  <tbody
                    className={`text-capitalize ${snapshot.isDraggingOver ? "bg-gray-200" : ""}`}
                    ref={provider.innerRef}
                    {...provider.droppableProps}>
                    {suggestions?.map((suggestion, index) => (
                      <Draggable key={suggestion.label} draggableId={suggestion.label} index={index}>
                        {(provider, snapshot) => {
                          return (
                            <tr
                              className={`bg-base-100 ${snapshot.isDragging ? "opacity-50 flex flex-row" : ""}`}
                              {...provider.draggableProps}
                              ref={provider.innerRef}
                              style={provider.draggableProps.style}>
                              <td className="flex justify-center w-20 select-none" {...provider.dragHandleProps} tabIndex={-1}>
                                =
                              </td>
                              <td className="p-0">
                                <input
                                  tabIndex={index * 3 + 1}
                                  className="w-full bg-transparent border-none outline-none p-4 focus-within:bg-white"
                                  type="text"
                                  value={suggestion.label}
                                  onChange={handleFieldChange("label", index)}
                                />
                              </td>
                              <td className="p-0">
                                <input
                                  tabIndex={index * 3 + 2}
                                  className="w-full bg-transparent border-none outline-none p-4 focus-within:bg-white"
                                  type="text"
                                  value={suggestion.value}
                                  onChange={handleFieldChange("value", index)}
                                />
                              </td>
                              <td className="flex justify-end">
                                <button
                                  tabIndex={index * 3 + 3}
                                  className="btn btn-xs btn-error w-28"
                                  onClick={() => removeSuggestion(index)}>
                                  Remove
                                </button>
                              </td>
                            </tr>
                          )
                        }}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>
          <div className="flex mt-8 gap-4 justify-end p-4">
            <button tabIndex={99} className="btn btn-sm btn-success w-28" onClick={addSuggestion}>
              Insert
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Options
