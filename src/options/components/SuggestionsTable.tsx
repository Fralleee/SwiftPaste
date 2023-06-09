import React, { useEffect, useRef } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons"

interface SuggestionsTableProps {
  suggestions: Suggestion[]
  lastAddedIndex: number
  onDragEnd: (event: any) => void
  onFieldChange: (field: "label" | "value", index: number) => (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: (index: number) => void
  onAdd: () => void
}

const SuggestionsTable: React.FC<SuggestionsTableProps> = ({ suggestions, lastAddedIndex, onDragEnd, onFieldChange, onRemove, onAdd }) => {
  const lastInputElement = useRef(null)

  useEffect(() => {
    if (lastInputElement.current) {
      lastInputElement.current.focus()
    }
  }, [lastAddedIndex])

  return (
    <div className="mt-4">
      <DragDropContext onDragEnd={onDragEnd}>
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
                  <Draggable key={suggestion.id} draggableId={`suggestion::${suggestion.id}`} index={index}>
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
                              ref={index === suggestions.length - 1 ? lastInputElement : null}
                              tabIndex={index * 3 + 1}
                              className="w-full bg-transparent border-none outline-none p-3 rounded-sm
                            focus-within:bg-white focus-within:outline-3 focus-within:outline-brand"
                              type="text"
                              value={suggestion.label}
                              onChange={onFieldChange("label", index)}
                            />
                          </td>
                          <td className="p-0">
                            <input
                              tabIndex={index * 3 + 2}
                              className="w-full bg-transparent border-none outline-none p-3 rounded-sm
                            focus-within:bg-white focus-within:outline-3 focus-within:outline-brand"
                              type="text"
                              value={suggestion.value}
                              onChange={onFieldChange("value", index)}
                            />
                          </td>
                          <td className="flex justify-end">
                            <button tabIndex={index * 3 + 3} className="btn btn-outline btn-xs btn-error" onClick={() => onRemove(index)}>
                              <FontAwesomeIcon icon={faRemove} />
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
        <button tabIndex={99} className="btn btn-outline btn-sm btn-success" onClick={onAdd}>
          <FontAwesomeIcon icon={faAdd} />
          Insert
        </button>
      </div>
    </div>
  )
}

export default SuggestionsTable
