import React, { useState, useEffect } from "react"

interface Props {
  isExtensionEnabled: boolean
  toggleExtension: (event: any) => void
}

function ToggleExtension({ isExtensionEnabled, toggleExtension }: Props) {
  return (
    <input
      onChange={toggleExtension}
      title={`${isExtensionEnabled ? "Disable SwiftPaste" : "Enable SwiftPaste"}`}
      type="checkbox"
      className="toggle toggle-primary mx-1"
      checked={isExtensionEnabled}
    />
  )
}

export default ToggleExtension
