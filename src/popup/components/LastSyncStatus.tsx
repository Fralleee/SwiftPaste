import React from "react"
import { timeSince } from "@/utils/dateUtils"

interface Props {
  lastSyncTime: number
}

function LastSyncStatus({ lastSyncTime }: Props) {
  return (
    lastSyncTime > 0 && <em className="mt-4 mb-1 block w-full text-xs text-center">Last synced {timeSince(new Date(lastSyncTime))} ago</em>
  )
}

export default LastSyncStatus
