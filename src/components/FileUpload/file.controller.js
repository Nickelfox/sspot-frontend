import React, { useState } from "react"
import { useUploadFileModel } from "./FileUpload.model"
import DescriptionIcon from "@mui/icons-material/Description"
import ImageIcon from "@mui/icons-material/Image"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"

export const useFileController = (max_files, size_limit) => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const model = useUploadFileModel()

  const handleUploadFiles = (files) => {
    model.handleUploadFiles(
      files,
      uploadedFiles,
      max_files,
      setFileLimit,
      setUploadedFiles,
      size_limit
    )
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

  const getFileIcon = (format) => {
    switch (format) {
      case "image/png":
      case "image/jpg":
      case "image/jpeg":
        return <ImageIcon />
      case "application/pdf":
        return <PictureAsPdfIcon />
      default:
        return <DescriptionIcon />
    }
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
    handleDragLeaveEvent,
    getFileIcon
  }
}
