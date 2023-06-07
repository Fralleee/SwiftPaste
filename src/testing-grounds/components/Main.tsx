import React from "react"

function Main() {
  return (
    <main className="relative bg-neutral-200 h-screen">
      <div className="absolute top-0 left-0 bg-brand w-56 h-8">
        <input type="text" />
      </div>

      <div className="absolute bottom-0 left-0 bg-brand w-56 h-8">
        <input type="text" />
      </div>

      <div className="absolute top-0 right-0 bg-brand w-56 h-8">
        <input type="text" />
      </div>

      <div className="absolute bottom-0 right-0 bg-brand w-56 h-8">
        <input type="text" />
      </div>
    </main>
  )
}

export default Main
