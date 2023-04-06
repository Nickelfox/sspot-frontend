import { useState } from "react"

export const useFileController = (max_files) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)

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

  return {
    handleFileEvent,
    handleCloseFile,
    fileLimit,
    uploadedFiles
  }
}
