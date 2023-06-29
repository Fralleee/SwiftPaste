import { useState, useEffect } from "react"
import { fetchEntries, syncStorage } from "@/utils/chrome"

export function useStorageSync() {
  const [bytesUsed, setBytesUsed] = useState(0)
  const [entriesCount, setEntriesCount] = useState(0)
  const [lastSyncTime, setLastSyncTime] = useState(0)

  const fetchAndSetEntries = async () => {
    const entries = await fetchEntries()
    setEntriesCount(entries.length)
  }

  useEffect(() => {
    fetchAndSetEntries()

    chrome.storage.sync.getBytesInUse(null, function (bytesInUse) {
      setBytesUsed(bytesInUse)
    })

    chrome.storage.sync.get("lastSyncTime", function (result) {
      if (!chrome.runtime.lastError) {
        setLastSyncTime(result.lastSyncTime)
      }
    })
  }, [])

  const refreshStorage = async () => {
    const syncTime = await syncStorage()
    setLastSyncTime(syncTime)
  }

  return {
    bytesUsed,
    entriesCount,
    lastSyncTime,
    refreshStorage
  }
}
