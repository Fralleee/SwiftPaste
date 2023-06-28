import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  reporter: [
    ["list", { outputFile: null }],
    ["junit", { outputFile: null }]
  ],
  testDir: "src", // Search for tests in this directory.
  testMatch: "**/*.spec.ts" // Run files with this glob pattern.
}

export default config
