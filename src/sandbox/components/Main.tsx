import React from "react"
import Input from "./Input"
import Textarea from "./Textarea"
import ContentEditable from "./ContentEditable"

function Main() {
  return (
    <main className="relative bg-brand h-screen grid place-items-center">
      <div className="w-96 h-96">
        <img className="m-0 filter brightness-0 invert" src="../images/logo.svg" width={512} height={512} />
      </div>

      <div className="absolute top-4 left-4">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>

      <div className="absolute bottom-4 left-4">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>

      <div className="absolute top-4 right-4">
        <Input />
        <div className="my-2" />
        <Textarea />
        <div className="my-2" />
        <ContentEditable />
      </div>

      <div className="absolute bottom-4 right-4">
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
