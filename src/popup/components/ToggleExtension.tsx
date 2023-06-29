import React from "react"

interface Props {
  isExtensionEnabled: boolean
  toggleExtension: (event: any) => void
}

function ToggleExtension({ isExtensionEnabled, toggleExtension }: Props) {
  return (
    <>
      <label className="hidden" htmlFor="toggle-extension">
        Enable/Disable SwiftPaste
      </label>
      <input
        id="toggle-extension"
        onChange={toggleExtension}
        title={`${isExtensionEnabled ? "Disable SwiftPaste" : "Enable SwiftPaste"}`}
        type="checkbox"
        className="toggle toggle-primary mx-1"
        checked={isExtensionEnabled}
      />
    </>
  )
}

export default ToggleExtension
