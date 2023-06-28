import React, { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk, faRotateLeft, faDownload, faCloudUpload } from "@fortawesome/free-solid-svg-icons"

interface Props {
  isFormDirty: boolean
  onSave: () => void
  onReset: () => void
  onDownload: () => void
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TopControls = ({ isFormDirty, onSave, onReset, onDownload, onImport }: Props) => {
  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    onImport(event)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <button
          tabIndex={0}
          className={`btn btn-outline btn-sm text-xs ${isFormDirty ? "btn-info" : "btn-neutral"}`}
          onClick={onSave}
          disabled={!isFormDirty}>
          <FontAwesomeIcon icon={faFloppyDisk} />
          Save changes
        </button>
        <button
          tabIndex={0}
          className={`btn btn-outline btn-sm text-xs ${isFormDirty ? "btn-warning" : "btn-neutral"}`}
          onClick={onReset}
          disabled={!isFormDirty}>
          <FontAwesomeIcon icon={faRotateLeft} />
          Reset
        </button>
      </div>
      <div className="flex gap-2">
        <button tabIndex={0} className="btn btn-outline btn-sm btn-primary text-xs" onClick={onDownload}>
          <FontAwesomeIcon icon={faDownload} />
          Download
        </button>
        <button tabIndex={0} className="btn btn-outline btn-sm btn-warning text-xs" onClick={handleClick}>
          <FontAwesomeIcon icon={faCloudUpload} />
          Import
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleImport} />
        </button>
      </div>
    </div>
  )
}

export default TopControls
