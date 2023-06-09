import React from "react"
import Input from "./Input"
import Textarea from "./Textarea"
import ContentEditable from "./ContentEditable"

function Main() {
  return (
    <main className="relative h-screen grid place-items-center">
      <div className="w-96 h-96 bg-brand p-4 rounded-xl">
        <img className="m-0 filter brightness-0 invert" src="../images/logo.svg" width={512} height={512} />
      </div>

      <div className="absolute top-4 left-4 max-w-xs w-72">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>

      <div className="absolute bottom-4 left-4 max-w-xs w-72">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>

      <div className="absolute top-4 right-4 max-w-xs w-72">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>

      <div className="absolute bottom-4 right-4 max-w-xs w-72">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>
    </main>
  )
}

export default Main
