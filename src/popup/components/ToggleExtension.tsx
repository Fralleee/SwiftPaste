import React, { useState, useEffect } from "react"

function ToggleExtension() {
  const [isExtensionEnabled, setIsExtensionEnabled] = useState(true)

  useEffect(() => {
    chrome.storage.sync.get("extensionDisabled", result => {
      setIsExtensionEnabled(!result.extensionDisabled)
    })
  }, [])

  const toggleExtension = event => {
    const { checked } = event.target
    setIsExtensionEnabled(checked)
    chrome.storage.sync.set({ extensionDisabled: !checked })
  }

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
