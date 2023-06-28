import React from "react"

const ContentEditable = () => (
  <div className="form-control">
    <label className="font-bold text-brand">ContentEditable</label>
    <div tabIndex={0} contentEditable className="input input-bordered input-secondary w-full max-w-xs p-3 text-sm overflow-hidden" />
  </div>
)

export default ContentEditable
