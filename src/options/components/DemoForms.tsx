import React from "react"

function Main() {
  return (
    <main className="relative h-screen grid place-items-center">
      <div className="p-4">
        <h1 className="text-4xl font-bold text-[#555] py-4">Another boring webpage</h1>
        <h2 className="text-xl font-bold text-[#333] mb-12">We proudly embrace confusion: our fields are a maze, your autofill's daze!</h2>

        <div className="form-control my-4">
          <label className="font-bold text-brand mb-2">Firstname</label>
          <input
            type="text"
            autoComplete="new-passwords"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs text-sm"
          />
        </div>

        <div className="form-control my-4">
          <label className="font-bold text-brand mb-2">Lastname</label>
          <input
            type="text"
            autoComplete="new-passwords"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs text-sm"
          />
        </div>

        <div className="form-control my-4">
          <label className="font-bold text-brand mb-2">Email</label>
          <input
            type="text"
            autoComplete="new-passwords"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs text-sm"
          />
        </div>

        <div className="form-control my-4">
          <label className="font-bold text-brand mb-2">Phone no</label>
          <input
            type="text"
            autoComplete="new-passwords"
            placeholder="Type here"
            className="input input-bordered input-secondary w-full max-w-xs text-sm"
          />
        </div>
      </div>
    </main>
  )
}

export default Main
