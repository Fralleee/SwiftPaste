import { useState, useEffect } from "react"

export const useCommandShortcut = (commandName: string) => {
  const [shortcut, setShortcut] = useState<string | null>(null)

  useEffect(() => {
    chrome.commands.getAll(commands => {
      for (let { name, shortcut } of commands) {
        if (name === commandName) {
          setShortcut(shortcut)
        }
      }
    })
  }, [commandName])

  return shortcut
}
