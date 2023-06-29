import React from "react"
import { useCommandShortcut } from "@/shared/hooks/useCommandShortcut"

function ShortcutDisplay() {
  const shortcut = useCommandShortcut("openSwiftPaste")
  return (
    <div className="flex flex-col gap-1 items-center justify-center my-2 mb-4">
      <p className="m-0 font-bold text-sm">Activate suggestions with</p>
      <kbd className="kbd kbd-sm">{shortcut}</kbd>
    </div>
  )
}

export default ShortcutDisplay
