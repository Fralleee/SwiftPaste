module.exports = {
  branches: ["publish/.*", "^refs/tags/publish/.*", "main"],
  plugins: ["@semantic-release/commit-analyzer", "@semantic-release/release-notes-generator", "@semantic-release/github"]
}
