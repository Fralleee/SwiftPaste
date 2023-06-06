import React from "react"

interface Props {
  isFormDirty: boolean
  onSave: () => void
  onReset: () => void
}

const TopControls = ({ isFormDirty, onSave, onReset }: Props) => (
  <>
    <div className="flex gap-2">
      <button
        tabIndex={0}
        className={`btn btn-outline btn-sm text-xs w-32 ${isFormDirty ? "btn-info" : "btn-neutral"}`}
        onClick={onSave}
        disabled={!isFormDirty}>
        Save changes
      </button>
      <button
        tabIndex={0}
        className={`btn btn-outline btn-sm text-xs w-32 ${isFormDirty ? "btn-warning" : "btn-neutral"}`}
        onClick={onReset}
        disabled={!isFormDirty}>
        Reset
      </button>
    </div>
  </>
)

export default TopControls
