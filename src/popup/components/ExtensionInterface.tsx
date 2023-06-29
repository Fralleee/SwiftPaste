import React, { useState } from "react"
import { useStorageSync } from "@/hooks/useStorageSync"
import KeyboardShortcut from "@/shared/ShortcutDisplay"
import SyncStatus from "./LastSyncStatus"
import StorageStat from "./StorageUsageInfo"
import Header from "./Toolbar"

function ExtensionInterface() {
  const { bytesUsed, entriesCount, lastSyncTime, refreshStorage } = useStorageSync()
  const [isExtensionEnabled, setIsExtensionEnabled] = useState(true)

  const toggleExtension = event => {
    const { checked } = event.target
    setIsExtensionEnabled(checked)
    chrome.storage.sync.set({ extensionDisabled: !checked })
  }

  return (
    <div className="w-64">
      <div className={`${isExtensionEnabled ? "border-brand" : "border-brand-disabled"} border-2 rounded m-1`}>
        <Header isExtensionEnabled={isExtensionEnabled} refreshStorage={refreshStorage} toggleExtension={toggleExtension} />
        <div className={!isExtensionEnabled ? "opacity-50" : ""}>
          <div className="flex items-center gap-3 p-3">
            <img className="m-0" src="./images/48.png" width={48} height={48} />
            <h1 className="m-0 text-2xl">SwiftPaste</h1>
          </div>
          <KeyboardShortcut />
          <StorageStat bytesUsed={bytesUsed} entriesCount={entriesCount} />
          <SyncStatus lastSyncTime={lastSyncTime} />
        </div>
      </div>
    </div>
  )
}

export default ExtensionInterface
