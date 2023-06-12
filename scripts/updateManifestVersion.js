const fs = require("fs")
const path = require("path")

const [version, customPath] = process.argv.slice(2)
const manifestPath = path.join(__dirname, "../", customPath)

if (!version) {
  console.error("Version number is required")
  process.exit(1)
}

if (!customPath) {
  console.error("Custom path is required")
  process.exit(1)
}

fs.readFile(manifestPath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file from disk: ${err}`)
    process.exit(1)
  }

  const manifest = JSON.parse(data)
  manifest.version = version

  fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), err => {
    if (err) {
      console.error(`Error writing file on disk: ${err}`)
    }
  })
})
