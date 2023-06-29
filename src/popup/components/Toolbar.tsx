import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog, faRotate } from "@fortawesome/free-solid-svg-icons"
import ToggleExtension from "./ToggleExtension"

const openOptionsPage = () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL("options.html"))
  }
}

interface Props {
  isExtensionEnabled: boolean
  refreshStorage: () => void
  toggleExtension: (event: any) => void
}

function Toolbar({ isExtensionEnabled, refreshStorage, toggleExtension }: Props) {
  return (
    <div className={`flex justify-end items-center p-1 ${isExtensionEnabled ? "bg-brand" : "bg-brand-disabled"}`}>
      <button title="Sync storage" className="text-[white] text-lg btn-sm btn-circle hover:text-[#eee]" onClick={refreshStorage}>
        <FontAwesomeIcon icon={faRotate} />
      </button>
      <button title="Open settings" className="text-[white] text-lg btn-sm btn-circle hover:text-[#eee]" onClick={openOptionsPage}>
        <FontAwesomeIcon icon={faCog} />
      </button>
      <ToggleExtension isExtensionEnabled={isExtensionEnabled} toggleExtension={toggleExtension} />
    </div>
  )
}

export default Toolbar
