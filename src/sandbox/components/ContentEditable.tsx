import React from "react"

const ContentEditable = () => (
  <div className="form-control">
    <label>ContenEditable</label>
    <div tabIndex={0} contentEditable className="input input-bordered input-primary w-full max-w-xs p-3 text-sm" />
  </div>
)

export default ContentEditable
