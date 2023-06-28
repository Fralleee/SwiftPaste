export async function syncStorage(): Promise<number> {
  try {
    const existingSuggestions = await fetchEntries()
    const date = Date.now()
    if (existingSuggestions.length === 0) {
      const defaultSuggestions = [
        { id: 1, label: "Name", value: "John Doe" },
        { id: 2, label: "Email", value: "john_the_doe@gmail.com" },
        { id: 3, label: "Website URL", value: "https://www.fralle.net" }
      ]

      await setStorageData({ swiftPasteSuggestions: defaultSuggestions })
      console.log("Default values have been set.")
    }

    await setStorageData({ lastSyncTime: date })

    return date
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchEntries(): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("swiftPasteSuggestions", result => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message)
      } else {
        const entries = result.swiftPasteSuggestions
        if (Array.isArray(entries)) {
          resolve(entries)
        } else {
          reject("Data retrieved is not an array")
        }
      }
    })
  })
}

async function setStorageData(data: Object): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message)
      } else {
        resolve()
      }
    })
  })
}
