module.exports = {
  branches: ["^refs/tags/publish/\\d{4}-\\d{2}-\\d{2}\\.\\d+$"],
  plugins: ["@semantic-release/commit-analyzer", "@semantic-release/release-notes-generator", "@semantic-release/github"]
}
