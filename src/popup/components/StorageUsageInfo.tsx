import React from "react"

interface Props {
  bytesUsed: number
  entriesCount: number
}

function StorageUsageInfo({ bytesUsed, entriesCount }: Props) {
  return (
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
  )
}

export default StorageUsageInfo
