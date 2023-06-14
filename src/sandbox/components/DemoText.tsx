import React from "react"

function Main() {
  return (
    <main className="relative h-screen grid place-items-center">
      <div className="p-4">
        <h1 className="text-4xl font-bold text-[#555] py-4">Another Mundane Email Interface</h1>
        <h2 className="text-xl font-bold text-[#333] mb-12">Embrace the email monotony with our mind-numbingly ordinary design!</h2>

        <div className="form-control my-2">
          <label className="font-bold text-brand mb-2">Recipient</label>
          <input
            type="text"
            autoComplete="new-passwords"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-sm text-sm"
          />
        </div>
        <div className="form-control my-2">
          <label className="font-bold text-brand mb-2">Subject</label>
          <input
            type="text"
            autoComplete="new-passwords"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-sm text-sm"
          />
        </div>

        <div className="form-control my-4">
          <label className="font-bold text-brand mb-2">Message</label>
          <textarea rows={10} autoComplete="new-passwords" className="input input-bordered input-secondary h-48 w-full max-w-sm text-sm" />
        </div>
      </div>
    </main>
  )
}

export default Main
