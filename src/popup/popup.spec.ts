import { test, expect, extensionPath } from "../fixtures"

test("loads the extension", async ({ page }) => {
  await page.goto(`${extensionPath}/popup.html`)
  const title = await page.title()
  expect(title).toBe("SwiftPaste")
})
