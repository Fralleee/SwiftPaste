import { test as base, expect, chromium, type BrowserContext } from "@playwright/test"
import path from "path"

const test = base.extend<{
  context: BrowserContext
  extensionId: string
}>({
  context: async (_, use) => {
    const extensionPath = path.join(__dirname, "../dist")
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [`--disable-extensions-except=${extensionPath}`, `--load-extension=${extensionPath}`]
    })
    await use(context)
    await context.close()
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers()
    if (!background) background = await context.waitForEvent("serviceworker")

    const extensionId = background.url().split("/")[2]
    await use(extensionId)
  }
})

const extensionPath = "chrome-extension://dpeknedpgfglbbfknplheogdofhfmajm"

export { test, expect, extensionPath }
