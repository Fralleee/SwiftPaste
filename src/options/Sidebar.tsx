import React from "react"

const Sidebar = () => {
  return (
    <aside className="w-96 prose prose-p:text-sm flex flex-col px-4 py-8">
      <div className="flex items-center gap-4">
        <img className="m-0" src="./images/128.png" width={48} height={48} />
        <h1 className="m-0">SwiftPaste</h1>
      </div>
      <p className="mb-0">
        Personal control center for customizing the suggestions provided by our extension. Here, you can effortlessly manage your
        suggestions list.
      </p>

      <div className="my-8 mx-auto flex flex-col items-center justify-center">
        <h4>You can open the suggestions box using</h4>
        <kbd className="kbd kbd-sm">Ctrl+Space</kbd>
      </div>

      <div tabIndex={0} className="collapse collapse-arrow ">
        <div className="collapse-title font-bold select-none">👍 Add a Suggestion</div>
        <div className="collapse-content">
          <p className="p-0 m-0">To add a new suggestion, click the 'Add' button and fill in the details in the newly created row.</p>
        </div>
      </div>

      <div tabIndex={0} className="collapse collapse-arrow">
        <div className="collapse-title font-bold select-none">✏️ Edit a Suggestion</div>
        <div className="collapse-content">
          <p className="p-0 m-0">
            If you wish to modify an existing suggestion, navigate to it in the list. You'll notice that every cell in the table is
            editable, simply click on the cell you want to edit and start typing to update the content right there.
          </p>
        </div>
      </div>

      <div tabIndex={0} className="collapse collapse-arrow ">
        <div className="collapse-title font-bold select-none">❌ Remove a Suggestion</div>
        <div className="collapse-content">
          <p className="p-0 m-0">
            To delete a suggestion, select it and hit the 'Remove' button. The selected suggestion will be instantly removed from your list.
          </p>
        </div>
      </div>

      <div tabIndex={0} className="collapse collapse-arrow ">
        <div className="collapse-title font-bold select-none">🔃 Order Suggestions</div>
        <div className="collapse-content">
          <p className="p-0 m-0">
            We understand the importance of ordering your suggestions, so we have incorporated a sorting feature. Simply drag and drop the
            table rows to arrange your suggestions in your preferred order.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
