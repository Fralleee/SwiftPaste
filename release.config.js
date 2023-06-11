module.exports = {
  branches: ["publish/[0-9]{4}-[0-9]{2}-[0-9]{2}\\.[0-9]+$"],
  plugins: ["@semantic-release/commit-analyzer", "@semantic-release/release-notes-generator", "@semantic-release/github"]
}
