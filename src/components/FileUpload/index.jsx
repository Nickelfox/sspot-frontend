import React from "react"
import { Box } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DescriptionIcon from "@mui/icons-material/Description"
import CloseIcon from "@mui/icons-material/Close"
import { useFileController } from "./file.controller"

import "./FileUpload.css"

function FileUpload({ label, max_files = 5 }) {
  const { handleFileEvent, handleCloseFile, fileLimit, uploadedFiles } =
    useFileController(max_files)

  return (
    <Box className="file-container">
      <input
        accept="image/*"
        className="file-input"
        id="contained-button-file"
        type="file"
        multiple
        onChange={handleFileEvent}
        disabled={fileLimit}
      />
      <Box className="file-selector" htmlFor="contained-button-file">
        <CloudUploadIcon />
        <Box>
          <label htmlFor="contained-button-file">{label ? label : "Browse Files"}</label>
        </Box>
      </Box>
      <Box className="file-preview">
        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file, idx) => {
            return (
              <Box key={file.name} className="preview-row">
                <Box className="file">
                  <DescriptionIcon />
                  <span>{file.name}</span>
                </Box>
                <CloseIcon onClick={() => handleCloseFile(idx)} />
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default FileUpload
