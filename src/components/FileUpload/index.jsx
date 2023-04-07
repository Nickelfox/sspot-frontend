import React from "react"
import { Box } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DescriptionIcon from "@mui/icons-material/Description"
import CloseIcon from "@mui/icons-material/Close"
import { useFileController } from "./file.controller"

import "./FileUpload.css"

function FileUpload({ label = "Browse Files", max_files = 5, imagePreview = false }) {
  const {
    handleFileEvent,
    handleCloseFile,
    fileLimit,
    uploadedFiles,
    handleDropEvent,
    limitFileName,
    isDraggingOver,
    handleDragOverEvent,
    handleDragLeaveEvent
  } = useFileController(max_files)

  return (
    <Box className="file-container">
      <input
        className="file-input"
        id="contained-button-file"
        type="file"
        multiple
        onChange={handleFileEvent}
        disabled={fileLimit}
        style={{ display: "none" }}
      />
      <Box
        className={`file-selector cursor-pointer ${isDraggingOver ? "dragging-over" : ""}`}
        onClick={() => document.getElementById("contained-button-file").click()}
        onDrop={handleDropEvent}
        onDragOver={handleDragOverEvent}
        onDragLeave={handleDragLeaveEvent}>
        <CloudUploadIcon />
        <Box>
          <label className="cursor-pointer">{label}</label>
        </Box>
      </Box>
      <Box className="file-preview">
        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file, idx) => {
            return (
              <Box key={file.name} className="preview-row">
                <Box className="file">
                  {!imagePreview || !file.type.startsWith("image/") ? (
                    <DescriptionIcon />
                  ) : (
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                  )}
                  <span>{limitFileName(file.name, 25)}</span>
                </Box>
                <CloseIcon className="cursor-pointer" onClick={() => handleCloseFile(idx)} />
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default FileUpload
