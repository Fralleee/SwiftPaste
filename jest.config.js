module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"] // Location of your setupTests file
}
