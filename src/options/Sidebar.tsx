import React from "react"

const Sidebar = () => {
  return (
    <aside className="w-96 prose flex flex-col px-4 py-8 bg-red-50">
      <h1>SwiftPaste Options</h1>
      <p>
        👋 Welcome to the options page - your personal control center for customizing the suggestions provided by our extension. Here, you
        can effortlessly manage your suggestions list.
      </p>

      <div>
        <h4>You can open the suggestions box using:</h4>
        <kbd className="kbd kbd-md">Ctrl+Space</kbd>
      </div>

      <h4>👍 Add a Suggestion</h4>
      <p>To add a new suggestion, click the 'Add' button and fill in the details in the newly created row.</p>

      <h4>✏️ Edit a Suggestion</h4>
      <p>
        If you wish to modify an existing suggestion, navigate to it in the list. You'll notice that every cell in the table is editable,
        simply click on the cell you want to edit and start typing to update the content right there.
      </p>

      <h4>❌ Remove a Suggestion</h4>
      <p>
        To delete a suggestion, select it and hit the 'Remove' button. The selected suggestion will be instantly removed from your list.
      </p>

      <h4>🔃 Sort Suggestions</h4>
      <p>
        We understand the importance of ordering your suggestions, so we have incorporated a sorting feature. Simply drag and drop the table
        rows to arrange your suggestions in your preferred order.
      </p>
    </aside>
  )
}

export default Sidebar
