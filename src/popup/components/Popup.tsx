import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog, faRotate } from "@fortawesome/free-solid-svg-icons"
import { useCommandShortcut } from "../../shared/useCommandShortcut"
import ToggleExtension from "./ToggleExtension"
import { fetchEntries, syncStorage } from "../../utils/chrome"
import { timeSince } from "../../utils/dateUtils"

const openOptionsPage = () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL("options.html"))
  }
}

function Popup() {
  const [bytesUsed, setBytesUsed] = useState<number>(0)
  const [lastSyncTime, setLastSyncTime] = useState<number>(0)
  const [entriesCount, setEntriesCount] = useState<number>(0)
  const shortcut = useCommandShortcut("openSwiftPaste")
  const [isExtensionEnabled, setIsExtensionEnabled] = useState(true)

  useEffect(() => {
    chrome.storage.sync.get("extensionDisabled", result => {
      setIsExtensionEnabled(!result.extensionDisabled)
    })

    chrome.storage.sync.getBytesInUse(null, function (bytesInUse) {
      setBytesUsed(bytesInUse)
    })

    fetchEntries().then(entries => setEntriesCount(entries.length))

    chrome.storage.sync.get("lastSyncTime", result => {
      console.log(result)
      if (!chrome.runtime.lastError) {
        setLastSyncTime(result.lastSyncTime)
      }
    })
  }, [])

  const toggleExtension = event => {
    const { checked } = event.target
    setIsExtensionEnabled(checked)
    chrome.storage.sync.set({ extensionDisabled: !checked })
  }

  const refreshStorage = async () => {
    var syncTime = await syncStorage()
    setLastSyncTime(syncTime)
  }

  return (
    <div className="w-64">
      <div className={`${isExtensionEnabled ? "border-brand" : "border-[#aaa]"} border-2 rounded m-1`}>
        <div className={`flex justify-end items-center p-1 ${isExtensionEnabled ? "bg-brand" : "bg-[#aaa]"}`}>
          <button title="Sync storage" className="text-[white] text-lg btn-sm btn-circle hover:text-[#eee]" onClick={refreshStorage}>
            <FontAwesomeIcon icon={faRotate} />
          </button>
          <button title="Open settings" className="text-[white] text-lg btn-sm btn-circle hover:text-[#eee]" onClick={openOptionsPage}>
            <FontAwesomeIcon icon={faCog} />
          </button>
          <ToggleExtension isExtensionEnabled={isExtensionEnabled} toggleExtension={toggleExtension} />
        </div>
        <div className={!isExtensionEnabled ? "opacity-50" : ""}>
          <div className="flex items-center gap-3 p-3">
            <img className="m-0" src="./images/48.png" width={48} height={48} />
            <h1 className="m-0 text-2xl">SwiftPaste</h1>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center my-2 mb-4">
            <p className="m-0 font-bold text-sm">Activate suggestions with</p>
            <kbd className="kbd kbd-sm">{shortcut}</kbd>
          </div>
          <div className="stats shadow grid w-min mx-auto">
            <div className="stat">
              <div className="stat-title">{entriesCount} entries</div>
              <div className="stat-desc my-2">
                <progress
                  className="progress progress-primary w-40 mb-2 block mx-auto"
                  value={(bytesUsed / chrome.storage.sync.QUOTA_BYTES_PER_ITEM) * 100}
                  max="100"></progress>
                <em className="block w-full text-xs text-center">
                  {(Math.round((bytesUsed / chrome.storage.sync.QUOTA_BYTES_PER_ITEM) * 10000) / 100).toFixed(2)}% of total storage used
                </em>
              </div>
            </div>
          </div>

          {lastSyncTime && (
            <em className="mt-4 mb-1 block w-full text-xs text-center">Last synced {timeSince(new Date(lastSyncTime))} ago</em>
          )}
        </div>
      </div>
    </div>
  )
}

export default Popup
