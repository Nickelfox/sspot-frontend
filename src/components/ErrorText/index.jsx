import React from "react"
import Grid from "@mui/material/Grid"
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"
import { Typography } from "@mui/material"

const ErrorText = ({ text }) => {
  return (
    <>
      {text ? (
        <Grid
          container
          gap={1}
          display={"flex"}
          alignItems="center"
          sx={{ marginTop: "0.75rem", width: "max-content" }}>
          <ErrorOutlineOutlinedIcon sx={{ color: "error.main" }} fontSize="medium" />
          <Typography variant="p3" color="error.main">
            {text}
          </Typography>
        </Grid>
      ) : null}
    </>
  )
}

export default ErrorText
