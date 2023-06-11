module.exports = {
  branches: ["publish/.*$"],
  plugins: ["@semantic-release/commit-analyzer", "@semantic-release/release-notes-generator", "@semantic-release/github"]
}
