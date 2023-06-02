import React from "react"

const openOptionsPage = () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL("options.html"))
  }
}

function Popup() {
  return (
    <div className="w-52 h-20">
      <div>
        <h1 className="text-center p-5 text-xl">This is a popup section</h1>
        <button onClick={openOptionsPage}>Options</button>
        <h2>Hey</h2>
        <select className="px-4 py-3 rounded-full">
          <option>Bajs</option>
        </select>

        <input type="checkbox" className="rounded text-pink-500" />
      </div>
    </div>
  )
}

export default Popup
