import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { useCommandShortcut } from "../../shared/useCommandShortcut"
import ToggleExtension from "./ToggleExtension"

const openOptionsPage = () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL("options.html"))
  }
}

function Popup() {
  const shortcut = useCommandShortcut("openSwiftPaste")

  return (
    <div className="w-64">
      <div className="border-brand border-2 rounded m-1">
        <div className="flex justify-end items-center p-1 gap-1 bg-brand">
          <button className="text-[white] text-lg btn-sm btn-circle hover:text-[#eee]" onClick={openOptionsPage}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          <ToggleExtension />
        </div>
        <div className="flex items-center gap-3 p-3">
          <img className="m-0" src="./images/48.png" width={48} height={48} />
          <h1 className="m-0 text-2xl">SwiftPaste</h1>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center my-2 mb-4">
          <p className="m-0 font-bold text-sm">Toggle extension with</p>
          <kbd className="kbd kbd-sm">{shortcut}</kbd>
        </div>
      </div>
    </div>
  )
}

export default Popup
