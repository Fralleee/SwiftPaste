import React from "react"

const Sidebar = () => {
  return (
    <aside className="w-96 prose prose-p:text-sm flex flex-col gap-4 px-4 py-8">
      <div className="flex items-center gap-3">
        <img className="m-0" src="./images/128.png" width={48} height={48} />
        <h1 className="m-0">SwiftPaste</h1>
      </div>

      <p className="mb-0">
        Personal control center for customizing the suggestions provided by our extension. Here, you can effortlessly manage your
        suggestions list.
      </p>

      <div className="flex gap-2">
        <p className="m-0 font-bold">Toggle extension with</p>
        <kbd className="kbd kbd-sm">Ctrl+Space</kbd>
      </div>

      <div>
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
              To delete a suggestion, select it and hit the 'Remove' button. The selected suggestion will be instantly removed from your
              list.
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
      </div>
      <div className="text-opacity-80">
        <p>
          We're committed to open source and always welcome contributions. If you're interested in improving our extension, please check out
          our{" "}
          <a className="font-bold text-primary" href="https://github.com/Fralleee/SwiftPaste" target="_blank" rel="noopener noreferrer">
            GitHub repository{" "}
            <svg
              className="inline"
              width={16}
              height={16}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          . Any contributions, from code to ideas and feedback, are greatly appreciated!
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
