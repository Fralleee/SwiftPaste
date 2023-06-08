import React from "react"

const Sidebar = () => {
  return (
    <aside className="w-96 prose prose-p:text-sm flex flex-col gap-4 px-4 py-8">
      <div className="flex items-center gap-3">
        <img className="m-0" src="./images/128.png" width={48} height={48} />
        <h1 className="m-0">SwiftPaste</h1>
      </div>

      <p className="mb-0">
        With just a few clicks, you'll be the master of your suggestion universe, effortlessly managing and shaping your very own
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
            <p className="p-0 m-0">
              Simply hit that shiny 'Insert' button and watch the magic unfold! A brand new row will appear, eagerly waiting for you to fill
              it with your ingenious suggestion.{" "}
            </p>
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow">
          <div className="collapse-title font-bold select-none">✏️ Edit a Suggestion</div>
          <div className="collapse-content">
            <p className="p-0 m-0">
              Navigate your way through the list and behold the wonders of our editable table. Each cell is your playground for
              customization. Just click on the cell you desire, and like a wizard with a keyboard, start typing to update the content in
              real-time. Prepare to witness the transformation as your suggestions come to life with every keystroke.
            </p>
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow ">
          <div className="collapse-title font-bold select-none">❌ Remove a Suggestion</div>
          <div className="collapse-content">
            <p className="p-0 m-0">
              With a decisive selection and a swift strike of the 'Remove' button, watch as the chosen suggestion vanishes into the digital
              abyss, never to be seen again. Poof! In an instant, your list gets a little lighter, making space for fresh inspiration.
            </p>
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-arrow ">
          <div className="collapse-title font-bold select-none">🔃 Order Suggestions</div>
          <div className="collapse-content">
            <p className="p-0 m-0">
              Simply unleash your inner master of arrangement by dragging and dropping those table rows like a pro. Reorder and rearrange
              your suggestions with the flick of a wrist, crafting the perfect sequence that suits your taste.
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
