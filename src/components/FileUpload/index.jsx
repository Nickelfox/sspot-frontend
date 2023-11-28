import React from "react"
import { Box, Typography } from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"
import { useFileController } from "./file.controller"
import styles from "./FileUpload.module.css"

function FileUpload({
  label = "Browse Files",
  max_files = 5,
  imagePreview = false,
  acceptedType = "All",
  size_limit = "10"
}) {
  const {
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
  } = useFileController(max_files, size_limit)

  return (
    <Box className={styles.file_container}>
      <input
        className={styles.file_input}
        id="contained-button-file"
        type="file"
        accept={acceptedType}
        multiple
        onChange={handleFileEvent}
        disabled={fileLimit}
        style={{ display: "none" }}
      />
      <Box
        className={`${styles.file_selector} ${styles.cursor_pointer} ${
          isDraggingOver ? "dragging-over" : ""
        }`}
        onClick={() => document.getElementById("contained-button-file").click()}
        onDrop={handleDropEvent}
        onDragOver={handleDragOverEvent}
        onDragLeave={handleDragLeaveEvent}>
        <CloudUploadIcon />
        <Box>
          <label className={styles.cursor_pointer}>{label}</label>
          <Typography className={styles.content}>
            Maximum file upload limit is {size_limit} MB
          </Typography>
        </Box>
      </Box>
      <Box className={styles.file_preview}>
        {uploadedFiles.length > 0 &&
          uploadedFiles.map((file, idx) => {
            return (
              <Box key={file.name} className={styles.preview_row}>
                <Box className={styles.file}>
                  {!imagePreview || !file.type.startsWith("image/") ? (
                    getFileIcon(file.type)
                  ) : (
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                  )}
                  <span>{limitFileName(file.name, 25)}</span>
                </Box>
                <CloseIcon className={styles.cursor_pointer} onClick={() => handleCloseFile(idx)} />
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default FileUpload
