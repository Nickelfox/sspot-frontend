import { useState } from "react"

export const useFileController = (max_files) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles]
    let limitExceeded = false

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)

        if (uploaded.length === max_files) setFileLimit(true)
        if (uploaded.length > max_files) {
          alert(`You can only add a maximum of ${max_files} files`)
          setFileLimit(false)
          limitExceeded = true
          return true
        }
      }
    })
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles)
  }

  const handleCloseFile = (idx) => {
    setUploadedFiles((prevState) => {
      // eslint-disable-next-line no-console
      return prevState.filter((file, i) => i !== idx)
    })
  }

  function limitFileName(fileName, maxLength) {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + "..."
    }
    return fileName
  }

  const handleDropEvent = (e) => {
    e.preventDefault()

    if (e.dataTransfer && e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)
      handleFileEvent({ target: { files } })
    }
  }

  const handleDragOverEvent = (e) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeaveEvent = (e) => {
    e.preventDefault()
    setIsDraggingOver(false)
  }

  return {
    handleFileEvent,
    handleCloseFile,
    fileLimit,
    uploadedFiles,
    handleDropEvent,
    limitFileName,
    isDraggingOver,
    handleDragOverEvent,
    handleDragLeaveEvent
  }
}
