module.exports = {
  branches: ["refs/tags/publish/*"],
  plugins: ["@semantic-release/commit-analyzer", "@semantic-release/release-notes-generator", "@semantic-release/github"]
}
